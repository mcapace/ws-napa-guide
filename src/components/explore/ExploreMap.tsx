'use client'

import { useCallback, useEffect, useMemo, useRef, useState, forwardRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Map, { Marker, NavigationControl, type MapRef } from 'react-map-gl/mapbox'
import Supercluster from 'supercluster'
import { Hotel, UtensilsCrossed, Wine, type LucideIcon } from 'lucide-react'
import type { MapPin } from '@/data/map-pins'
import {
  CATEGORY_CONFIG,
  MAPBOX_TOKEN,
  MAP_STYLE,
  NAPA_BOUNDS,
  NAPA_CENTER,
  NAPA_ZOOM,
  REGION_CENTERS,
  REGION_LABELS,
  type Category,
} from '@/lib/mapbox'
import {
  countByCategory,
  filterExplorePins,
  pinHasListingImage,
  regionDisplayName,
  type ExploreCategoryFilter,
  urlParamToCategory,
} from '@/lib/explore'
import styles from './ExploreMap.module.css'
import { ExploreMapPin } from './ExploreMapPin'

import 'mapbox-gl/dist/mapbox-gl.css'

export interface ExploreMapProps {
  pins: MapPin[]
  scopedRegion?: string
  showRegionFilter?: boolean
  pinnedCategory?: Category
}

type ClusterProps = Supercluster.ClusterProperties & { pin?: MapPin }

const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  winery: Wine,
  dining: UtensilsCrossed,
  stay: Hotel,
}

const CATEGORY_ORDER: Category[] = ['winery', 'dining', 'stay']
const REGION_ORDER = [
  'oakville',
  'rutherford',
  'yountville',
  'st-helena',
  'calistoga',
  'pritchard-hill',
  'downtown-napa',
]

const DESKTOP_MAP_OFFSET: [number, number] = [200, 0]

function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://')
}

function DetailsLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

const ListingCard = forwardRef<
  HTMLButtonElement,
  {
    pin: MapPin
    isSelected: boolean
    onSelect: () => void
    onHover: (slug: string | null) => void
  }
>(function ListingCard({ pin, isSelected, onSelect, onHover }, ref) {
  const cfg = CATEGORY_CONFIG[pin.category]
  const hasImage = pinHasListingImage(pin)
  const thumb = pin.thumb ?? pin.images[0]

  return (
    <button
      ref={ref}
      type="button"
      className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
      onClick={onSelect}
      onMouseEnter={() => onHover(pin.slug)}
      onMouseLeave={() => onHover(null)}
    >
      {hasImage && thumb ? (
        <div className={styles.cardThumb}>
          <Image
            src={thumb}
            alt=""
            width={68}
            height={68}
            sizes="68px"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
      ) : (
        <span className={styles.cardAccent} style={{ background: cfg.color }} aria-hidden />
      )}
      <div className={styles.cardBody}>
        <span className={styles.cardCategory} style={{ color: cfg.color }}>
          {cfg.label}
        </span>
        <span className={styles.cardName}>{pin.name}</span>
        <span className={styles.cardMeta}>
          {regionDisplayName(pin.region)} · {pin.excerpt}
        </span>
      </div>
    </button>
  )
})

function PlaceDetail({
  pin,
  onBack,
}: {
  pin: MapPin
  onBack: () => void
}) {
  const cfg = CATEGORY_CONFIG[pin.category]
  const hasImage = pinHasListingImage(pin)
  const thumb = pin.thumb ?? pin.images[0]
  const Icon = CATEGORY_ICONS[pin.category]

  return (
    <div className={styles.detailScroll} data-lenis-prevent>
      <button type="button" className={styles.detailBack} onClick={onBack}>
        ← All places
      </button>
      {hasImage && thumb ? (
        <div className={styles.detailHero}>
          <Image
            src={thumb}
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 380px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div className={styles.detailHeroAccent}>
          <span className={styles.detailHeroGlyph} style={{ background: cfg.color }}>
            <Icon size={20} color="#FAF7F2" strokeWidth={2} aria-hidden />
          </span>
        </div>
      )}
      <div className={styles.detailContent}>
        <p className={styles.eyebrow} style={{ color: cfg.color }}>{cfg.label}</p>
        <h3 className={styles.detailName}>{pin.name}</h3>
        <p className={styles.detailRegion}>{regionDisplayName(pin.region)}</p>
        <p className={styles.detailExcerpt}>{pin.excerpt}</p>
        <DetailsLink href={pin.href} className={styles.detailsLink}>
          View details →
        </DetailsLink>
      </div>
    </div>
  )
}

export function ExploreMap({
  pins,
  scopedRegion,
  showRegionFilter = false,
  pinnedCategory,
}: ExploreMapProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const mapRef = useRef<MapRef>(null)
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const listScrollRef = useRef<HTMLDivElement>(null)

  const categoryFilter = urlParamToCategory(searchParams.get('category'))
  const regionFilter: string | 'all' = scopedRegion
    ? 'all'
    : searchParams.get('ava') || 'all'
  const placeParam = searchParams.get('place')

  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const [scrollCenterSlug, setScrollCenterSlug] = useState<string | null>(null)
  const [mapZoom, setMapZoom] = useState(NAPA_ZOOM)
  const [mapBounds, setMapBounds] = useState<[number, number, number, number] | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const scrollSyncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastEaseSlugRef = useRef<string | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const scopedPins = useMemo(() => {
    let list = scopedRegion ? pins.filter((p) => p.region === scopedRegion) : pins
    if (pinnedCategory) list = list.filter((p) => p.category === pinnedCategory)
    return list
  }, [pins, scopedRegion, pinnedCategory])

  const effectiveCategoryFilter: ExploreCategoryFilter = pinnedCategory ?? categoryFilter

  const visiblePins = useMemo(
    () => filterExplorePins(scopedPins, effectiveCategoryFilter, regionFilter),
    [scopedPins, effectiveCategoryFilter, regionFilter],
  )

  const counts = useMemo(() => countByCategory(scopedPins), [scopedPins])

  const supercluster = useMemo(() => {
    const index = new Supercluster<{ pin: MapPin }>({ radius: 56, maxZoom: 15 })
    index.load(
      visiblePins.map((pin) => ({
        type: 'Feature',
        properties: { pin },
        geometry: { type: 'Point', coordinates: pin.coords },
      })),
    )
    return index
  }, [visiblePins])

  const clusters = useMemo(() => {
    if (!mapBounds) return []
    return supercluster.getClusters(mapBounds, Math.floor(mapZoom))
  }, [supercluster, mapBounds, mapZoom])

  const selectedPin = placeParam
    ? visiblePins.find((p) => p.slug === placeParam) ?? null
    : null

  const updateUrl = useCallback(
    (opts: {
      category?: ExploreCategoryFilter
      ava?: string | 'all'
      place?: string | null
    }) => {
      const params = new URLSearchParams(searchParams.toString())
      const cat = opts.category ?? categoryFilter
      const ava = opts.ava ?? regionFilter
      const place = opts.place !== undefined ? opts.place : placeParam

      if (cat === 'all') params.delete('category')
      else params.set('category', cat)

      if (!showRegionFilter || scopedRegion) {
        params.delete('ava')
      } else if (ava === 'all') params.delete('ava')
      else params.set('ava', ava)

      if (!place) params.delete('place')
      else params.set('place', place)

      const q = params.toString()
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false })
    },
    [categoryFilter, pathname, placeParam, regionFilter, router, scopedRegion, searchParams, showRegionFilter],
  )

  const flyToPin = useCallback(
    (pin: MapPin) => {
      mapRef.current?.flyTo({
        center: pin.coords,
        zoom: 14,
        duration: 900,
        essential: false,
        offset: isDesktop ? DESKTOP_MAP_OFFSET : [0, 0],
      })
    },
    [isDesktop],
  )

  const easeToPin = useCallback(
    (pin: MapPin) => {
      const map = mapRef.current?.getMap()
      if (!map) return
      map.easeTo({
        center: pin.coords,
        zoom: Math.max(map.getZoom(), 13),
        duration: 450,
        essential: false,
        offset: isDesktop ? DESKTOP_MAP_OFFSET : [0, 0],
      })
    },
    [isDesktop],
  )

  const selectPin = useCallback(
    (pin: MapPin, scrollList = true) => {
      flyToPin(pin)
      updateUrl({ place: pin.slug })
      if (scrollList && rowRefs.current[pin.slug]) {
        rowRefs.current[pin.slug]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    },
    [flyToPin, updateUrl],
  )

  const onMapMove = useCallback(() => {
    const map = mapRef.current?.getMap()
    if (!map) return
    setMapZoom(map.getZoom())
    const b = map.getBounds()
    if (!b) return
    setMapBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()])
  }, [])

  const handleMapLoad = useCallback(() => {
    onMapMove()
    if (scopedRegion && REGION_CENTERS[scopedRegion]) {
      const { center, zoom } = REGION_CENTERS[scopedRegion]
      mapRef.current?.flyTo({
        center,
        zoom,
        duration: 0,
        offset: isDesktop ? DESKTOP_MAP_OFFSET : [0, 0],
      })
      return
    }
    if (placeParam) {
      const pin = scopedPins.find((p) => p.slug === placeParam)
      if (pin) flyToPin(pin)
    }
  }, [scopedRegion, scopedPins, placeParam, flyToPin, onMapMove, isDesktop])

  const onCategoryChange = (cat: ExploreCategoryFilter) => {
    updateUrl({ category: cat, place: null })
  }

  const onRegionChange = (region: string | 'all') => {
    updateUrl({ ava: region, place: null })
    if (region !== 'all' && REGION_CENTERS[region]) {
      const { center, zoom } = REGION_CENTERS[region]
      mapRef.current?.flyTo({
        center,
        zoom,
        duration: 1000,
        offset: isDesktop ? DESKTOP_MAP_OFFSET : [0, 0],
      })
    }
  }

  const onClusterClick = (clusterId: number, lng: number, lat: number) => {
    const expansion = supercluster.getClusterExpansionZoom(clusterId)
    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: expansion + 1,
      duration: 600,
      offset: isDesktop ? DESKTOP_MAP_OFFSET : [0, 0],
    })
  }

  const syncMapToListScroll = useCallback(() => {
    if (selectedPin) return
    const root = listScrollRef.current
    if (!root || !isDesktop) return

    const centerY = root.scrollTop + root.clientHeight / 2
    let bestSlug: string | null = null
    let bestDist = Infinity

    for (const pin of visiblePins) {
      const el = rowRefs.current[pin.slug]
      if (!el) continue
      const elCenter = el.offsetTop + el.offsetHeight / 2
      const dist = Math.abs(elCenter - centerY)
      if (dist < bestDist) {
        bestDist = dist
        bestSlug = pin.slug
      }
    }

    if (!bestSlug || bestSlug === lastEaseSlugRef.current) return
    const pin = visiblePins.find((p) => p.slug === bestSlug)
    if (!pin) return

    lastEaseSlugRef.current = bestSlug
    setScrollCenterSlug(bestSlug)
    easeToPin(pin)
  }, [visiblePins, isDesktop, easeToPin, selectedPin])

  const handleListScroll = useCallback(() => {
    if (!isDesktop || selectedPin) return
    if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current)
    scrollSyncTimerRef.current = setTimeout(syncMapToListScroll, 80)
  }, [isDesktop, syncMapToListScroll, selectedPin])

  useEffect(() => {
    return () => {
      if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current)
    }
  }, [])

  useEffect(() => {
    lastEaseSlugRef.current = null
    setScrollCenterSlug(null)
  }, [visiblePins])

  useEffect(() => {
    const map = mapRef.current?.getMap()
    if (!map) return
    const id = requestAnimationFrame(() => {
      map.resize()
      onMapMove()
    })
    return () => cancelAnimationFrame(id)
  }, [isDesktop, onMapMove])

  const initialCenter = scopedRegion && REGION_CENTERS[scopedRegion]
    ? REGION_CENTERS[scopedRegion].center
    : NAPA_CENTER
  const initialZoom = scopedRegion && REGION_CENTERS[scopedRegion]
    ? REGION_CENTERS[scopedRegion].zoom
    : NAPA_ZOOM

  const mapAvailable = Boolean(MAPBOX_TOKEN)

  return (
    <div className={styles.exploreRoot}>
      <div className={styles.exploreShell}>
        <div className={styles.mapStage}>
          <div className={styles.mapWrap}>
            {mapAvailable ? (
            <Map
              ref={mapRef}
              mapboxAccessToken={MAPBOX_TOKEN}
              initialViewState={{
                longitude: initialCenter[0],
                latitude: initialCenter[1],
                zoom: initialZoom,
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle={MAP_STYLE}
              maxBounds={NAPA_BOUNDS}
              attributionControl={false}
              onLoad={handleMapLoad}
              onMoveEnd={onMapMove}
              onClick={() => updateUrl({ place: null })}
            >
              <NavigationControl position="top-right" showCompass={false} />

              {clusters.map((feature) => {
                const [lng, lat] = feature.geometry.coordinates as [number, number]
                const props = feature.properties as ClusterProps

                if (props.cluster) {
                  const clusterId = props.cluster_id
                  if (clusterId == null) return null
                  return (
                    <Marker
                      key={`cluster-${clusterId}`}
                      longitude={lng}
                      latitude={lat}
                      anchor="center"
                      onClick={(e) => {
                        e.originalEvent.stopPropagation()
                        onClusterClick(clusterId, lng, lat)
                      }}
                    >
                      <div className={styles.cluster}>{props.point_count}</div>
                    </Marker>
                  )
                }

                const pin = props.pin
                if (!pin) return null
                const cfg = CATEGORY_CONFIG[pin.category]
                const isSelected =
                  pin.slug === placeParam || pin.slug === scrollCenterSlug
                const isHovered = pin.slug === hoveredSlug

                return (
                  <Marker
                    key={pin.slug}
                    longitude={lng}
                    latitude={lat}
                    anchor="bottom"
                    onClick={(e) => {
                      e.originalEvent.stopPropagation()
                      selectPin(pin, false)
                    }}
                  >
                    <ExploreMapPin
                      category={pin.category}
                      color={cfg.color}
                      selected={isSelected}
                      hovered={isHovered}
                    />
                  </Marker>
                )
              })}
            </Map>
            ) : (
              <div className={styles.mapUnavailable}>
                <p>Map preview unavailable.</p>
                <p className={styles.mapUnavailableHint}>Browse the directory below.</p>
              </div>
            )}
          </div>
        </div>

        <aside className={styles.directoryPanel}>
          <div className={styles.directoryHeader}>
            {!pinnedCategory && (
              <div className={styles.filterRow}>
                <button
                  type="button"
                  className={`${styles.pill} ${categoryFilter === 'all' ? styles.pillActive : ''}`}
                  onClick={() => onCategoryChange('all')}
                >
                  All ({scopedPins.length})
                </button>
                {CATEGORY_ORDER.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`${styles.pill} ${categoryFilter === cat ? styles.pillActive : ''}`}
                    onClick={() => onCategoryChange(cat)}
                  >
                    {CATEGORY_CONFIG[cat].label} ({counts[cat]})
                  </button>
                ))}
              </div>
            )}
            {showRegionFilter && (
              <div className={styles.filterRow}>
                <button
                  type="button"
                  className={`${styles.pill} ${regionFilter === 'all' ? styles.pillActive : ''}`}
                  onClick={() => onRegionChange('all')}
                >
                  All AVAs
                </button>
                {REGION_ORDER.map((slug) => (
                  <button
                    key={slug}
                    type="button"
                    className={`${styles.pill} ${regionFilter === slug ? styles.pillActive : ''}`}
                    onClick={() => onRegionChange(slug)}
                  >
                    {REGION_LABELS[slug] ?? slug}
                  </button>
                ))}
              </div>
            )}
            {!selectedPin && (
              <p className={styles.resultCount}>
                {visiblePins.length} {visiblePins.length === 1 ? 'place' : 'places'}
              </p>
            )}
          </div>

          {selectedPin ? (
            <PlaceDetail
              pin={selectedPin}
              onBack={() => updateUrl({ place: null })}
            />
          ) : (
            <div
              ref={listScrollRef}
              data-lenis-prevent
              className={styles.listScroll}
              onScroll={handleListScroll}
            >
              {visiblePins.length === 0 ? (
                <p className={styles.emptyState}>No listings match these filters.</p>
              ) : (
                visiblePins.map((pin) => {
                  const isSelected =
                    pin.slug === placeParam || pin.slug === scrollCenterSlug
                  return (
                    <ListingCard
                      key={pin.slug}
                      ref={(el) => {
                        rowRefs.current[pin.slug] = el
                      }}
                      pin={pin}
                      isSelected={isSelected}
                      onSelect={() => selectPin(pin, false)}
                      onHover={setHoveredSlug}
                    />
                  )
                })
              )}
            </div>
          )}
        </aside>
      </div>

      <style jsx global>{`
        .mapboxgl-popup-content {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
          border-radius: 0 !important;
        }
        .mapboxgl-popup-tip {
          display: none !important;
        }
        .mapboxgl-ctrl-group {
          background: rgba(255, 255, 255, 0.92) !important;
          border: 1px solid rgba(13, 11, 9, 0.1) !important;
        }
      `}</style>
    </div>
  )
}
