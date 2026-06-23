'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Map, { Marker, Popup, NavigationControl, type MapRef } from 'react-map-gl/mapbox'
import Supercluster from 'supercluster'
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
  regionDisplayName,
  type ExploreCategoryFilter,
  urlParamToCategory,
} from '@/lib/explore'
import styles from './ExploreMap.module.css'

import 'mapbox-gl/dist/mapbox-gl.css'

export interface ExploreMapProps {
  pins: MapPin[]
  scopedRegion?: string
  showRegionFilter?: boolean
}

type ClusterProps = Supercluster.ClusterProperties & { pin?: MapPin }

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

export function ExploreMap({
  pins,
  scopedRegion,
  showRegionFilter = false,
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
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list')
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

  const scopedPins = useMemo(
    () => (scopedRegion ? pins.filter((p) => p.region === scopedRegion) : pins),
    [pins, scopedRegion],
  )

  const visiblePins = useMemo(
    () => filterExplorePins(scopedPins, categoryFilter, regionFilter),
    [scopedPins, categoryFilter, regionFilter],
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

  const flyToPin = useCallback((pin: MapPin) => {
    mapRef.current?.flyTo({
      center: pin.coords,
      zoom: 14,
      duration: 900,
      essential: false,
    })
  }, [])

  const easeToPin = useCallback((pin: MapPin) => {
    const map = mapRef.current?.getMap()
    if (!map) return
    map.easeTo({
      center: pin.coords,
      zoom: Math.max(map.getZoom(), 13),
      duration: 450,
      essential: false,
    })
  }, [])

  const selectPin = useCallback(
    (pin: MapPin, scrollList = true) => {
      flyToPin(pin)
      updateUrl({ place: pin.slug })
      if (scrollList && rowRefs.current[pin.slug]) {
        rowRefs.current[pin.slug]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
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
      mapRef.current?.flyTo({ center, zoom, duration: 0 })
      return
    }
    if (placeParam) {
      const pin = scopedPins.find((p) => p.slug === placeParam)
      if (pin) flyToPin(pin)
    }
  }, [scopedRegion, scopedPins, placeParam, flyToPin, onMapMove])

  const onCategoryChange = (cat: ExploreCategoryFilter) => {
    updateUrl({ category: cat, place: null })
  }

  const onRegionChange = (region: string | 'all') => {
    updateUrl({ ava: region, place: null })
    if (region !== 'all' && REGION_CENTERS[region]) {
      const { center, zoom } = REGION_CENTERS[region]
      mapRef.current?.flyTo({ center, zoom, duration: 1000 })
    }
  }

  const onClusterClick = (clusterId: number, lng: number, lat: number) => {
    const expansion = supercluster.getClusterExpansionZoom(clusterId)
    mapRef.current?.flyTo({ center: [lng, lat], zoom: expansion + 1, duration: 600 })
  }

  const syncMapToListScroll = useCallback(() => {
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
  }, [visiblePins, isDesktop, easeToPin])

  const handleListScroll = useCallback(() => {
    if (!isDesktop) return
    if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current)
    scrollSyncTimerRef.current = setTimeout(syncMapToListScroll, 80)
  }, [isDesktop, syncMapToListScroll])

  useEffect(() => {
    return () => {
      if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current)
    }
  }, [])

  useEffect(() => {
    lastEaseSlugRef.current = null
    setScrollCenterSlug(null)
  }, [visiblePins])

  const initialCenter = scopedRegion && REGION_CENTERS[scopedRegion]
    ? REGION_CENTERS[scopedRegion].center
    : NAPA_CENTER
  const initialZoom = scopedRegion && REGION_CENTERS[scopedRegion]
    ? REGION_CENTERS[scopedRegion].zoom
    : NAPA_ZOOM

  if (!MAPBOX_TOKEN) {
    return (
      <div className={styles.exploreRoot} style={{ padding: 48, textAlign: 'center' }}>
        <p>Map unavailable — set NEXT_PUBLIC_MAPBOX_TOKEN.</p>
      </div>
    )
  }

  return (
    <div className={styles.exploreRoot}>
      <div className={styles.mobileToggle}>
        <button
          type="button"
          className={`${styles.mobileToggleBtn} ${mobileView === 'list' ? styles.mobileToggleBtnActive : ''}`}
          onClick={() => setMobileView('list')}
        >
          List
        </button>
        <button
          type="button"
          className={`${styles.mobileToggleBtn} ${mobileView === 'map' ? styles.mobileToggleBtnActive : ''}`}
          onClick={() => setMobileView('map')}
        >
          Map
        </button>
      </div>

      <div className={styles.exploreGrid}>
        <div className={styles.listColumn}>
          <div className={styles.filtersSticky}>
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
          </div>

          <div
            ref={listScrollRef}
            className={`${styles.listScroll} ${mobileView === 'map' ? styles.listScrollMobileHidden : ''}`}
            onScroll={handleListScroll}
          >
            {visiblePins.length === 0 ? (
              <p className={styles.emptyState}>No listings match these filters.</p>
            ) : (
              visiblePins.map((pin) => {
                const cfg = CATEGORY_CONFIG[pin.category]
                const isSelected =
                  pin.slug === placeParam || pin.slug === scrollCenterSlug
                return (
                  <button
                    key={pin.slug}
                    type="button"
                    ref={(el) => {
                      rowRefs.current[pin.slug] = el
                    }}
                    className={`${styles.row} ${isSelected ? styles.rowSelected : ''}`}
                    onClick={() => selectPin(pin, false)}
                    onMouseEnter={() => setHoveredSlug(pin.slug)}
                    onMouseLeave={() => setHoveredSlug(null)}
                  >
                    <div className={styles.thumb}>
                      <Image
                        src={pin.thumb}
                        alt=""
                        width={96}
                        height={96}
                        sizes="120px"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                    <div>
                      <p className={styles.eyebrow} style={{ color: cfg.color }}>
                        {cfg.label}
                      </p>
                      <p className={styles.name}>{pin.name}</p>
                      <p className={styles.meta}>
                        {regionDisplayName(pin.region)} · {pin.excerpt}
                      </p>
                      <Link href={pin.href} className={styles.detailsLink} onClick={(e) => e.stopPropagation()}>
                        View details →
                      </Link>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        <div
          className={`${styles.mapColumn} ${mobileView === 'map' ? styles.mapColumnMobileOpen : ''}`}
        >
          {mobileView === 'map' && (
            <button
              type="button"
              className={styles.mobileBack}
              onClick={() => setMobileView('list')}
            >
              ← Back to list
            </button>
          )}
          <div className={styles.mapWrap}>
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
              onClick={() => {
                if (!isDesktop) return
                updateUrl({ place: null })
              }}
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
                    anchor="center"
                    onClick={(e) => {
                      e.originalEvent.stopPropagation()
                      selectPin(pin)
                      if (!isDesktop) setMobileView('map')
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <div
                        className={`${styles.marker} ${isHovered ? styles.markerHovered : ''} ${isSelected ? styles.markerSelected : ''}`}
                        style={{ background: cfg.color }}
                      >
                        <span className={styles.markerGlyph}>{cfg.glyph}</span>
                      </div>
                      {isSelected && <span className={styles.markerLabel}>{pin.name}</span>}
                    </div>
                  </Marker>
                )
              })}

              {selectedPin && isDesktop && (
                <Popup
                  longitude={selectedPin.coords[0]}
                  latitude={selectedPin.coords[1]}
                  anchor="bottom"
                  offset={20}
                  closeButton={false}
                  closeOnClick={false}
                  onClose={() => updateUrl({ place: null })}
                >
                  <div className={styles.popupCard}>
                    <div className={styles.popupThumb}>
                      <Image
                        src={selectedPin.thumb}
                        alt=""
                        fill
                        sizes="260px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <p
                      className={styles.eyebrow}
                      style={{ color: CATEGORY_CONFIG[selectedPin.category].color }}
                    >
                      {CATEGORY_CONFIG[selectedPin.category].label}
                    </p>
                    <p className={styles.popupName}>{selectedPin.name}</p>
                    <p className={styles.popupExcerpt}>{selectedPin.excerpt}</p>
                    <Link href={selectedPin.href} className={styles.detailsLink}>
                      View details →
                    </Link>
                  </div>
                </Popup>
              )}
            </Map>
            <p className={styles.mapAttribution}>© Mapbox © OpenStreetMap</p>
          </div>
        </div>
      </div>

      {selectedPin && !isDesktop && mobileView === 'map' && (
        <div className={`${styles.bottomSheet} ${styles.bottomSheetOpen}`}>
          <p
            className={styles.eyebrow}
            style={{ color: CATEGORY_CONFIG[selectedPin.category].color }}
          >
            {CATEGORY_CONFIG[selectedPin.category].label}
          </p>
          <p className={styles.popupName}>{selectedPin.name}</p>
          <p className={styles.popupExcerpt}>{selectedPin.excerpt}</p>
          <Link href={selectedPin.href} className={styles.detailsLink}>
            View details →
          </Link>
        </div>
      )}

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
          background: rgba(13, 11, 9, 0.92) !important;
          border: 1px solid rgba(247, 243, 236, 0.08) !important;
        }
        .mapboxgl-ctrl-logo,
        .mapboxgl-ctrl-attrib,
        .mapboxgl-compact {
          display: none !important;
        }
      `}</style>
    </div>
  )
}
