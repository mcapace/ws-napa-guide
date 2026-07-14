'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Map, { Marker, NavigationControl, type MapRef } from 'react-map-gl/mapbox'
import Supercluster from 'supercluster'
import { Compass, Hotel, UtensilsCrossed, Wine, type LucideIcon } from 'lucide-react'
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
  sortExploreListPins,
  regionDisplayName,
  type ExploreCategoryFilter,
  urlParamToCategory,
} from '@/lib/explore'
import { getImageFocalPoint } from '@/lib/image-focal'
import { useLenis, REGION_JUMP_SECTION_EVENT } from '@/lib/smooth-scroll'
import styles from './ExploreMap.module.css'
import { ExploreMapPin } from './ExploreMapPin'
import { MapWheelScrollBridge } from '@/components/map/MapWheelScrollBridge'

import 'mapbox-gl/dist/mapbox-gl.css'

const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  winery: Wine,
  dining: UtensilsCrossed,
  stay: Hotel,
  do: Compass,
}

export interface ExploreMapProps {
  pins: MapPin[]
  scopedRegion?: string
  showRegionFilter?: boolean
  pinnedCategory?: Category
  /** Region embed: local selection, optional scroll-synced category filter. */
  embedMode?: boolean
  syncCategory?: ExploreCategoryFilter
  /** Dark ink surface for region scroll embeds. */
  theme?: 'light' | 'dark'
  /** Defer Mapbox init until the map column is near the viewport. */
  lazyMap?: boolean
  /** Unified scroll page: list grows with page, map column sticky (no nested scroll trap). */
  pageFlow?: boolean
}

type ClusterProps = Supercluster.ClusterProperties & { pin?: MapPin }

const CATEGORY_ORDER: Category[] = ['winery', 'dining', 'stay', 'do']
const REGION_ORDER = [
  'oakville',
  'rutherford',
  'yountville',
  'st-helena',
  'calistoga',
  'pritchard-hill',
  'downtown-napa',
  'beyond-napa',
]

function listingCopyCanExpand(pin: MapPin): boolean {
  return Boolean(pin.excerptFull && pin.excerptFull.length > pin.excerpt.length + 4)
}

function listingDisplayCopy(pin: MapPin, expanded: boolean): string {
  if (expanded && pin.excerptFull) return pin.excerptFull
  return pin.excerpt
}

export function ExploreMap({
  pins,
  scopedRegion,
  showRegionFilter = false,
  pinnedCategory,
  embedMode = false,
  syncCategory,
  theme = 'light',
  lazyMap = false,
  pageFlow = false,
}: ExploreMapProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lenis = useLenis()
  const mapRef = useRef<MapRef>(null)
  const mapColumnRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const listScrollRef = useRef<HTMLDivElement>(null)
  const exploreRootRef = useRef<HTMLDivElement>(null)
  const [mapMounted, setMapMounted] = useState(!lazyMap || embedMode)

  const placeParam = embedMode ? null : searchParams.get('place')
  const [embeddedPlace, setEmbeddedPlace] = useState<string | null>(null)
  const [overrideCategory, setOverrideCategory] = useState<ExploreCategoryFilter | null>(null)
  const activePlace = embedMode ? embeddedPlace : placeParam

  const categoryFilter: ExploreCategoryFilter = embedMode
    ? (overrideCategory ?? syncCategory ?? 'all')
    : (pinnedCategory ?? urlParamToCategory(searchParams.get('category')))

  const regionFilter: string | 'all' = scopedRegion
    ? 'all'
    : searchParams.get('ava') || 'all'

  const routeParam = searchParams.get('route')
  const routeSlugs = useMemo(
    () => (routeParam ? routeParam.split(',').map((s) => s.trim()).filter(Boolean) : []),
    [routeParam],
  )

  useEffect(() => {
    if (embedMode) setOverrideCategory(null)
  }, [embedMode, syncCategory])

  useEffect(() => {
    if (!embedMode) return

    const onRegionJump = (event: Event) => {
      const sectionId = (event as CustomEvent<{ sectionId: string }>).detail?.sectionId
      if (sectionId !== 'region-explore') return
      setEmbeddedPlace(null)
      setScrollCenterSlug(null)
      lastEaseSlugRef.current = null
      if (listScrollRef.current) listScrollRef.current.scrollTop = 0
    }

    window.addEventListener(REGION_JUMP_SECTION_EVENT, onRegionJump)
    return () => window.removeEventListener(REGION_JUMP_SECTION_EVENT, onRegionJump)
  }, [embedMode])
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const [expandedCopySlugs, setExpandedCopySlugs] = useState<Set<string>>(() => new Set())
  const [scrollCenterSlug, setScrollCenterSlug] = useState<string | null>(null)
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list')
  const [mapZoom, setMapZoom] = useState(NAPA_ZOOM)
  const [mapBounds, setMapBounds] = useState<[number, number, number, number] | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const scrollSyncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastEaseSlugRef = useRef<string | null>(null)
  const toggleListingCopy = useCallback((slug: string) => {
    setExpandedCopySlugs((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!lazyMap || mapMounted || embedMode) return
    const el = mapColumnRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMapMounted(true)
          observer.disconnect()
        }
      },
      { rootMargin: '240px 0px', threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [lazyMap, mapMounted, embedMode])

  useEffect(() => {
    if (!mapMounted) return
    const el = mapColumnRef.current
    if (!el) return

    const resizeMap = () => {
      mapRef.current?.getMap()?.resize()
    }

    resizeMap()
    const ro = new ResizeObserver(() => resizeMap())
    ro.observe(el)
    return () => ro.disconnect()
  }, [mapMounted])

  const scopedPins = useMemo(() => {
    let list = scopedRegion ? pins.filter((p) => p.region === scopedRegion) : pins
    if (pinnedCategory) list = list.filter((p) => p.category === pinnedCategory)
    return list
  }, [pins, scopedRegion, pinnedCategory])

  const filteredPins = useMemo(
    () => sortExploreListPins(filterExplorePins(scopedPins, categoryFilter, regionFilter)),
    [scopedPins, categoryFilter, regionFilter],
  )

  const visiblePins = useMemo(() => {
    if (routeSlugs.length === 0) return filteredPins
    const routePins = routeSlugs
      .map((slug) => filteredPins.find((p) => p.slug === slug))
      .filter((p): p is MapPin => p != null)
    const rest = filteredPins.filter((p) => !routeSlugs.includes(p.slug))
    return [...routePins, ...rest]
  }, [filteredPins, routeSlugs])

  const routeIndexBySlug = useMemo(() => {
    const map: Record<string, number> = {}
    routeSlugs.forEach((slug, i) => {
      map[slug] = i + 1
    })
    return map
  }, [routeSlugs])

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

  const selectedPin = activePlace
    ? visiblePins.find((p) => p.slug === activePlace) ?? null
    : null

  const updateUrl = useCallback(
    (opts: {
      category?: ExploreCategoryFilter
      ava?: string | 'all'
      place?: string | null
      route?: string | null
    }) => {
      if (embedMode) {
        if (opts.category !== undefined) setOverrideCategory(opts.category)
        if (opts.place !== undefined) setEmbeddedPlace(opts.place)
        return
      }
      const params = new URLSearchParams(searchParams.toString())
      const cat = opts.category ?? categoryFilter
      const ava = opts.ava ?? regionFilter
      const place = opts.place !== undefined ? opts.place : activePlace

      if (cat === 'all') params.delete('category')
      else params.set('category', cat)

      if (!showRegionFilter || scopedRegion) {
        params.delete('ava')
      } else if (ava === 'all') params.delete('ava')
      else params.set('ava', ava)

      if (!place) params.delete('place')
      else params.set('place', place)

      if (opts.route === null || opts.route === '') params.delete('route')
      else if (opts.route) params.set('route', opts.route)

      const q = params.toString()
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false })
    },
    [categoryFilter, pathname, activePlace, regionFilter, router, scopedRegion, searchParams, showRegionFilter, embedMode],
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

  const fitBoundsToPins = useCallback((pinList: MapPin[]) => {
    if (pinList.length === 0) return
    const map = mapRef.current?.getMap()
    if (!map) return

    if (pinList.length === 1) {
      flyToPin(pinList[0])
      return
    }

    let minLng = pinList[0].coords[0]
    let maxLng = pinList[0].coords[0]
    let minLat = pinList[0].coords[1]
    let maxLat = pinList[0].coords[1]

    for (const pin of pinList) {
      minLng = Math.min(minLng, pin.coords[0])
      maxLng = Math.max(maxLng, pin.coords[0])
      minLat = Math.min(minLat, pin.coords[1])
      maxLat = Math.max(maxLat, pin.coords[1])
    }

    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 72, duration: 900, maxZoom: 14 },
    )
  }, [flyToPin])

  const handleMapLoad = useCallback(() => {
    onMapMove()
    const map = mapRef.current?.getMap()
    if (map) {
      map.scrollZoom.enable()
      map.doubleClickZoom.enable()
      requestAnimationFrame(() => map.resize())
    }
    if (scopedRegion && REGION_CENTERS[scopedRegion]) {
      const { center, zoom } = REGION_CENTERS[scopedRegion]
      mapRef.current?.flyTo({ center, zoom, duration: 0 })
    }
    if (routeSlugs.length > 0) {
      const routePins = routeSlugs
        .map((slug) => scopedPins.find((p) => p.slug === slug))
        .filter((p): p is MapPin => p != null)
      if (routePins.length > 0) {
        fitBoundsToPins(routePins)
        return
      }
    }
    if (activePlace) {
      const pin = scopedPins.find((p) => p.slug === activePlace)
      if (pin) flyToPin(pin)
    }
  }, [scopedRegion, scopedPins, activePlace, flyToPin, onMapMove, routeSlugs, fitBoundsToPins])

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
    if (activePlace) return
    if (!isDesktop) return

    const listRoot = listScrollRef.current
    if (!pageFlow && !listRoot) return

    if (pageFlow) {
      let anyRowVisible = false
      for (const pin of visiblePins) {
        const el = rowRefs.current[pin.slug]
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.bottom > 0 && r.top < window.innerHeight) {
          anyRowVisible = true
          break
        }
      }
      if (!anyRowVisible) return
    }

    const viewportCenterY = pageFlow
      ? window.innerHeight / 2
      : listRoot!.scrollTop + listRoot!.clientHeight / 2

    let bestSlug: string | null = null
    let bestDist = Infinity

    for (const pin of visiblePins) {
      const el = rowRefs.current[pin.slug]
      if (!el) continue

      const elRect = el.getBoundingClientRect()
      const elCenter = pageFlow
        ? elRect.top + elRect.height / 2
        : elRect.top -
          listRoot!.getBoundingClientRect().top +
          listRoot!.scrollTop +
          el.offsetHeight / 2
      const dist = Math.abs(elCenter - viewportCenterY)
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
  }, [visiblePins, isDesktop, easeToPin, activePlace, pageFlow])

  const handleListScroll = useCallback(() => {
    if (!isDesktop || activePlace) return
    if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current)
    scrollSyncTimerRef.current = setTimeout(syncMapToListScroll, 80)
  }, [isDesktop, syncMapToListScroll, activePlace])

  useEffect(() => {
    return () => {
      if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!embedMode || !isDesktop || visiblePins.length === 0) return
    if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current)
    scrollSyncTimerRef.current = setTimeout(syncMapToListScroll, 120)
  }, [embedMode, isDesktop, visiblePins, syncMapToListScroll, categoryFilter])

  useEffect(() => {
    if (!pageFlow || !isDesktop) return

    const onWindowScroll = () => {
      if (activePlace) return
      if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current)
      scrollSyncTimerRef.current = setTimeout(syncMapToListScroll, 80)
    }

    window.addEventListener('scroll', onWindowScroll, { passive: true })
    document.addEventListener('scroll', onWindowScroll, { passive: true })
    onWindowScroll()

    if (lenis) {
      lenis.on('scroll', onWindowScroll)
    }

    return () => {
      window.removeEventListener('scroll', onWindowScroll)
      document.removeEventListener('scroll', onWindowScroll)
      if (lenis) lenis.off('scroll', onWindowScroll)
      if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current)
    }
  }, [pageFlow, isDesktop, syncMapToListScroll, activePlace, lenis])

  useEffect(() => {
    if (!pageFlow || !isDesktop || visiblePins.length === 0) return

    const observer = new IntersectionObserver(
      () => {
        if (activePlace) return
        syncMapToListScroll()
      },
      {
        root: null,
        rootMargin: '-18% 0px -32% 0px',
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    )

    visiblePins.forEach((pin) => {
      const el = rowRefs.current[pin.slug]
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [pageFlow, isDesktop, visiblePins, syncMapToListScroll, activePlace, categoryFilter])

  useEffect(() => {
    lastEaseSlugRef.current = null
    setScrollCenterSlug(null)
  }, [visiblePins])

  useEffect(() => {
    if (routeSlugs.length === 0) return
    const routePins = routeSlugs
      .map((slug) => scopedPins.find((p) => p.slug === slug))
      .filter((p): p is MapPin => p != null)
    if (routePins.length > 0) fitBoundsToPins(routePins)
  }, [routeSlugs, scopedPins, fitBoundsToPins])

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
    <div
      ref={exploreRootRef}
      className={`${styles.exploreRoot} ${embedMode ? ` ${styles.exploreRootEmbed} explore-embed-root` : ''}${
        theme === 'dark' ? ` ${styles.exploreRootDark}` : ''
      }${pageFlow ? ` ${styles.exploreRootPageFlow} explore-page-flow` : ''}`}
      data-explore-page-flow={pageFlow ? true : undefined}
    >
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

      <div
        className={`${styles.exploreGrid}${embedMode ? ' explore-embed-grid region-split-grid' : ''}${
          pageFlow ? ' explore-grid region-split-grid' : ''
        }`}
      >
        <div className={`${styles.listColumn}${pageFlow ? ' explore-list-column' : ''}`}>
          <div className={`${styles.filtersSticky}${pageFlow ? ' explore-filters-sticky' : ''}`}>
            {routeSlugs.length > 0 ? (
              <div className={styles.routeBanner}>
                <span className={styles.routeBannerLabel}>
                  Itinerary route · {routeSlugs.length} stops
                </span>
                <button
                  type="button"
                  className={styles.routeBannerClear}
                  onClick={() => updateUrl({ route: null })}
                >
                  Show all listings
                </button>
              </div>
            ) : null}
            {!pinnedCategory && (
              <div className={styles.filterRow}>
                <button
                  type="button"
                  className={`${styles.pill} ${categoryFilter === 'all' ? styles.pillActive : ''}`}
                  onClick={() => onCategoryChange('all')}
                >
                  All ({scopedPins.length})
                </button>
                {CATEGORY_ORDER.map((cat) => {
                  const CatIcon = CATEGORY_ICONS[cat]
                  return (
                    <button
                      key={cat}
                      type="button"
                      className={`${styles.pill} ${categoryFilter === cat ? styles.pillActive : ''}`}
                      onClick={() => onCategoryChange(cat)}
                    >
                      <CatIcon className={styles.pillIcon} size={13} strokeWidth={2} aria-hidden />
                      {CATEGORY_CONFIG[cat].label} ({counts[cat]})
                    </button>
                  )
                })}
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
          </div>

          <div
            ref={listScrollRef}
            data-scroll-container={embedMode || pageFlow ? true : undefined}
            data-region-embed-scroll={embedMode ? true : undefined}
            data-lenis-prevent={embedMode && !pageFlow ? true : undefined}
            className={`${styles.listScroll} ${mobileView === 'map' ? styles.listScrollMobileHidden : ''}${
              pageFlow ? ` ${styles.listScrollPageFlow} explore-list-scroll` : ''
            }${embedMode && !pageFlow ? ' explore-embed-list-scroll' : ''}`}
            onScroll={handleListScroll}
          >
            {visiblePins.length === 0 ? (
              <p className={styles.emptyState}>No listings match these filters.</p>
            ) : (
              visiblePins.map((pin) => {
                const cfg = CATEGORY_CONFIG[pin.category]
                const CatIcon = CATEGORY_ICONS[pin.category]
                const hasListingPhoto = Boolean(pin.thumb)
                const showLongCopy = pin.editorial && pin.excerptFull
                const routeStop = routeIndexBySlug[pin.slug]
                const isSelected =
                  pin.slug === activePlace || pin.slug === scrollCenterSlug
                const copyExpanded = expandedCopySlugs.has(pin.slug)
                const canExpandCopy = listingCopyCanExpand(pin)
                const displayCopy = listingDisplayCopy(pin, copyExpanded)
                return (
                  <button
                    key={pin.slug}
                    type="button"
                    ref={(el) => {
                      rowRefs.current[pin.slug] = el
                    }}
                    className={`${styles.row} ${isSelected ? styles.rowSelected : ''}${
                      hasListingPhoto ? ` ${styles.rowWithPhoto}` : ''
                    }${routeStop ? ` ${styles.rowRouteStop}` : ''}`}
                    onClick={() => selectPin(pin, false)}
                    onMouseEnter={() => setHoveredSlug(pin.slug)}
                    onMouseLeave={() => setHoveredSlug(null)}
                  >
                    <div className={styles.thumbWrap}>
                      <div className={styles.thumb}>
                        {routeStop ? (
                          <span className={styles.routeStopBadge}>{routeStop}</span>
                        ) : null}
                        {pin.thumb ? (
                          <Image
                            src={pin.thumb}
                            alt=""
                            width={hasListingPhoto ? 112 : 96}
                            height={hasListingPhoto ? 112 : 96}
                            sizes={hasListingPhoto ? '140px' : '120px'}
                            className={styles.thumbImage}
                            style={{ objectPosition: getImageFocalPoint(pin.thumb, 'thumb') }}
                          />
                        ) : (
                          <div
                            className={styles.thumbPlaceholder}
                            style={{ background: cfg.color }}
                            aria-hidden
                          >
                            <CatIcon className={styles.thumbIcon} size={28} strokeWidth={1.75} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.rowCopy}>
                      <p className={styles.eyebrow} style={{ color: cfg.color }}>
                        <CatIcon className={styles.eyebrowIcon} size={11} strokeWidth={2.25} aria-hidden />
                        {cfg.label}
                      </p>
                      <p className={styles.name}>{pin.name}</p>
                      {pin.award ? (
                        <p
                          style={{
                            fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                            fontSize: 9,
                            fontWeight: 600,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--gold, #C4943A)',
                            margin: '2px 0 4px',
                          }}
                        >
                          Wine Spectator {pin.award}
                        </p>
                      ) : null}
                      <p
                        className={`${styles.meta}${showLongCopy ? ` ${styles.metaEditorial}` : ''}${
                          copyExpanded ? ` ${styles.metaExpanded}` : ''
                        }`}
                      >
                        {showLongCopy
                          ? displayCopy
                          : `${regionDisplayName(pin.region)} · ${displayCopy}`}
                      </p>
                      {canExpandCopy ? (
                        <button
                          type="button"
                          className={styles.copyToggle}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleListingCopy(pin.slug)
                          }}
                        >
                          {copyExpanded ? 'Show less' : 'Read more'}
                        </button>
                      ) : null}
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
          ref={mapColumnRef}
          className={`${styles.mapColumn} ${mobileView === 'map' ? styles.mapColumnMobileOpen : ''}${
            embedMode ? ` ${styles.mapColumnEmbed} explore-embed-map` : ''
          }${pageFlow ? ` ${styles.mapColumnPageFlow} explore-map-panel` : ''}`}
          data-explore-map-panel={pageFlow ? true : undefined}
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
          <MapWheelScrollBridge
            className={`${styles.mapWrap}${embedMode || pageFlow ? ' explore-map-canvas' : ''}`}
          >
            {mapMounted ? (
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
              scrollZoom
              doubleClickZoom
              cooperativeGestures
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
                  pin.slug === activePlace || pin.slug === scrollCenterSlug
                const isHovered = pin.slug === hoveredSlug

                return (
                  <Marker
                    key={pin.slug}
                    longitude={lng}
                    latitude={lat}
                    anchor="bottom"
                    onClick={(e) => {
                      e.originalEvent.stopPropagation()
                      selectPin(pin)
                      if (!isDesktop) setMobileView('map')
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
              <div className={styles.mapPlaceholder} aria-hidden />
            )}
            {selectedPin && isDesktop ? (
              <div
                className={styles.mapDetailCard}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className={styles.mapDetailClose}
                  onClick={() => updateUrl({ place: null })}
                  aria-label="Close listing details"
                >
                  ×
                </button>
                {selectedPin.thumb ? (
                  <div className={styles.mapDetailHero}>
                    <Image
                      src={selectedPin.thumb}
                      alt=""
                      fill
                      sizes="300px"
                      className={styles.mapDetailHeroImage}
                      style={{ objectPosition: getImageFocalPoint(selectedPin.thumb, 'thumb') }}
                    />
                  </div>
                ) : null}
                <div className={styles.mapDetailBody}>
                  <p
                    className={styles.eyebrow}
                    style={{ color: CATEGORY_CONFIG[selectedPin.category].color }}
                  >
                    {CATEGORY_CONFIG[selectedPin.category].label}
                  </p>
                  <p className={styles.popupName}>{selectedPin.name}</p>
                  <p className={styles.popupExcerpt}>{selectedPin.excerpt}</p>
                  <Link href={selectedPin.href} className={styles.popupLink}>
                    View details →
                  </Link>
                </div>
              </div>
            ) : null}
            <p className={styles.mapAttribution}>© Mapbox © OpenStreetMap</p>
            {(embedMode || pageFlow) && !selectedPin ? (
              <p className={styles.mapScrollHint} aria-hidden>
                {pageFlow
                  ? 'Scroll the page · Ctrl + scroll to zoom map'
                  : 'Scroll to explore · Ctrl + scroll to zoom map'}
              </p>
            ) : null}
          </MapWheelScrollBridge>
        </div>
      </div>

      {selectedPin && !isDesktop && mobileView === 'map' && (
        <div className={`${styles.bottomSheet} ${styles.bottomSheetOpen}`}>
          <div className={styles.bottomSheetInner}>
            {selectedPin.thumb ? (
              <div className={styles.bottomSheetMedia}>
                <Image
                  src={selectedPin.thumb}
                  alt=""
                  fill
                  sizes="100vw"
                  className={styles.bottomSheetMediaImage}
                />
              </div>
            ) : null}
            <div className={styles.bottomSheetCopy}>
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
          </div>
        </div>
      )}

      <style jsx global>{`
        .mapboxgl-ctrl-group {
          background: rgba(255, 255, 255, 0.94) !important;
          border: 1px solid rgba(13, 11, 9, 0.12) !important;
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
