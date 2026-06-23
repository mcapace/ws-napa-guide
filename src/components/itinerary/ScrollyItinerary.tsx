'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import Map, { Marker, Source, Layer, type MapRef, type LayerProps } from 'react-map-gl/mapbox'
import {
  CATEGORY_COLORS,
  MAPBOX_TOKEN,
  NAPA_BOUNDS,
  SCROLLY_MAP_STYLE,
  TERRAIN_CONFIG,
} from '@/lib/mapbox'
import {
  buildGoogleMapsRouteUrl,
  fetchItineraryDirections,
  formatDuration,
  metersToMiles,
  type DirectionsResult,
} from '@/lib/itinerary-directions'
import type { Itinerary, ItineraryStop } from '@/lib/types'
import styles from './ScrollyItinerary.module.css'

import 'mapbox-gl/dist/mapbox-gl.css'

type ScrollyItineraryProps = {
  itineraries: Itinerary[]
  regionCenter: [number, number]
  regionName?: string
  selectedItineraryId?: string
  onItineraryChange?: (id: string) => void
}

const ROUTE_GLOW_LAYER: LayerProps = {
  id: 'route-glow',
  type: 'line',
  layout: { 'line-cap': 'round', 'line-join': 'round' },
  paint: {
    'line-color': '#C4943A',
    'line-width': 8,
    'line-opacity': 0.18,
  },
}

const ROUTE_LINE_LAYER: LayerProps = {
  id: 'route-line',
  type: 'line',
  layout: { 'line-cap': 'round', 'line-join': 'round' },
  paint: {
    'line-color': '#C4943A',
    'line-width': 3,
    'line-opacity': 0.92,
  },
}

function detailHref(stop: ItineraryStop): string | null {
  if (!stop.detailSlug) return null
  if (stop.category === 'winery') return `/wineries/${stop.detailSlug}`
  if (stop.category === 'dining') return `/dining/${stop.detailSlug}`
  if (stop.category === 'stay') return `/stay/${stop.detailSlug}`
  return null
}

function categoryLabel(category: ItineraryStop['category']): string {
  switch (category) {
    case 'winery':
      return 'Tasting Room'
    case 'dining':
      return 'Restaurant'
    case 'stay':
      return 'Hotel'
    default:
      return 'Landmark'
  }
}

function formatEyebrow(itinerary: Itinerary, regionName?: string): string {
  const label = itinerary.eyebrow ?? 'Itinerary'
  if (label === 'Itinerary' && regionName) return `Itinerary · ${regionName}`
  return label
}

export default function ScrollyItinerary({
  itineraries,
  regionCenter,
  regionName,
  selectedItineraryId,
  onItineraryChange,
}: ScrollyItineraryProps) {
  const itinerary =
    itineraries.find((it) => it.id === selectedItineraryId) ?? itineraries[0]

  const mapRef = useRef<MapRef>(null)
  const stepRefs = useRef<(HTMLElement | null)[]>([])
  const flyTokenRef = useRef(0)
  const animFrameRef = useRef<number | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [directions, setDirections] = useState<DirectionsResult | null>(null)
  const [legProgress, setLegProgress] = useState(1)
  const [animatingLegIndex, setAnimatingLegIndex] = useState<number | null>(null)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const stops = useMemo(() => itinerary?.stops ?? [], [itinerary])

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 1023px)')
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMobile = () => setIsMobile(mqMobile.matches)
    const onMotion = () => setReducedMotion(mqMotion.matches)
    onMobile()
    onMotion()
    mqMobile.addEventListener('change', onMobile)
    mqMotion.addEventListener('change', onMotion)
    return () => {
      mqMobile.removeEventListener('change', onMobile)
      mqMotion.removeEventListener('change', onMotion)
    }
  }, [])

  useEffect(() => {
    if (!itinerary) return
    let cancelled = false
    setDirections(null)
    setActiveIndex(0)
    setLegProgress(1)
    setAnimatingLegIndex(null)

    fetchItineraryDirections(itinerary.stops, itinerary.travelMode).then((result) => {
      if (!cancelled) setDirections(result)
    })

    return () => {
      cancelled = true
    }
  }, [itinerary])

  const flyToStop = useCallback(
    (index: number) => {
      const stop = stops[index]
      if (!stop || !mapRef.current) return
      const token = ++flyTokenRef.current
      const pitch = reducedMotion ? 0 : isMobile ? 45 : 60
      const duration = reducedMotion ? 0 : 1800

      mapRef.current.flyTo({
        center: stop.coords,
        zoom: 14.5,
        pitch,
        bearing: -12 + index * 4,
        duration,
        essential: true,
      })

      if (duration > 0) {
        window.setTimeout(() => {
          if (flyTokenRef.current === token) {
            /* fly complete */
          }
        }, duration)
      }
    },
    [stops, isMobile, reducedMotion],
  )

  const animateLeg = useCallback(
    (legIndex: number) => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (reducedMotion || !directions?.legs[legIndex]) {
        setLegProgress(1)
        setAnimatingLegIndex(null)
        return
      }

      setAnimatingLegIndex(legIndex)
      setLegProgress(0)
      const start = performance.now()
      const duration = 1500

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        setLegProgress(t)
        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(tick)
        } else {
          setAnimatingLegIndex(null)
          setLegProgress(1)
        }
      }
      animFrameRef.current = requestAnimationFrame(tick)
    },
    [directions, reducedMotion],
  )

  useEffect(() => {
    if (stops.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = Number((entry.target as HTMLElement).dataset.stepIndex)
          if (Number.isNaN(idx)) return
          setActiveIndex((prev) => {
            if (prev === idx) return prev
            if (idx > prev) {
              animateLeg(idx - 1)
            } else {
              setAnimatingLegIndex(null)
              setLegProgress(1)
            }
            flyToStop(idx)
            return idx
          })
        })
      },
      { threshold: 0.55, rootMargin: '-12% 0px -28% 0px' },
    )

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [stops, flyToStop, animateLeg])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  const routeGeoJson = useMemo(() => {
    if (!directions || stops.length < 2) return null

    const coords: [number, number][] = []
    const legsToShow = activeIndex

    for (let i = 0; i < legsToShow; i++) {
      const leg = directions.legs[i]
      if (!leg) continue
      if (i < legsToShow - 1 || animatingLegIndex !== i) {
        leg.coordinates.forEach((c, j) => {
          if (i > 0 && j === 0) return
          coords.push(c)
        })
      } else {
        const legCoords = leg.coordinates
        const count = Math.max(2, Math.floor(legCoords.length * legProgress))
        const partial = legCoords.slice(0, count)
        partial.forEach((c, j) => {
          if (i > 0 && j === 0) return
          coords.push(c)
        })
      }
    }

    if (coords.length < 2) return null

    return {
      type: 'Feature' as const,
      properties: {},
      geometry: { type: 'LineString' as const, coordinates: coords },
    }
  }, [directions, stops.length, activeIndex, animatingLegIndex, legProgress])

  const summaryText = useMemo(() => {
    if (!directions) return null
    const miles = metersToMiles(directions.totalDistance).toFixed(1)
    const time = formatDuration(directions.totalDuration)
    const mode = itinerary.travelMode === 'walking' ? 'Walking' : 'Driving'
    return `${mode} · ${stops.length} stops · ${miles} miles · ${time}`
  }, [directions, itinerary.travelMode, stops.length])

  const handleTakeRoute = () => {
    const url = buildGoogleMapsRouteUrl(stops, itinerary.travelMode)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopyStatus('copied')
      window.setTimeout(() => setCopyStatus('idle'), 2000)
    } catch {
      setCopyStatus('error')
      window.setTimeout(() => setCopyStatus('idle'), 2000)
    }
  }

  const introParagraphs = useMemo(
    () => itinerary?.introParagraphs ?? (itinerary?.intro ? [itinerary.intro] : []),
    [itinerary],
  )

  const showCollectionHeader = itineraries.length > 1 && itinerary?.seriesTitle

  if (!itinerary || stops.length === 0) {
    return (
      <p className={styles.empty}>Itinerary stops are being prepared for this region.</p>
    )
  }

  return (
    <div className={styles.root}>
      {showCollectionHeader ? (
        <header className={styles.collectionHeader}>
          <p className={styles.eyebrow}>{formatEyebrow(itinerary, regionName)}</p>
          <h2 className={styles.collectionTitle}>{itinerary.seriesTitle}</h2>
          {itinerary.byline ? (
            <p className={styles.byline}>
              By {itinerary.byline}
              {itinerary.issue ? ` · ${itinerary.issue}` : ''}
            </p>
          ) : null}
          {itinerary.seriesIntro ? (
            <p className={styles.collectionIntro}>{itinerary.seriesIntro}</p>
          ) : null}
        </header>
      ) : null}

      {itineraries.length > 1 ? (
        <div className={styles.selector} role="tablist" aria-label="Choose itinerary">
          {itineraries.map((it) => (
            <button
              key={it.id}
              type="button"
              role="tab"
              aria-selected={it.id === itinerary.id}
              className={`${styles.selectorBtn}${it.id === itinerary.id ? ` ${styles.selectorBtnActive}` : ''}`}
              onClick={() => onItineraryChange?.(it.id)}
            >
              {it.title}
            </button>
          ))}
        </div>
      ) : null}

      <div className={styles.layout}>
        <div className={styles.storyColumn}>
          <header className={styles.storyHeader}>
            {!showCollectionHeader ? (
              <p className={styles.eyebrow}>{formatEyebrow(itinerary, regionName)}</p>
            ) : null}
            <h2 className={styles.title}>{itinerary.title}</h2>
            {itinerary.sectionLabel ? (
              <p className={styles.sectionLabel}>{itinerary.sectionLabel}</p>
            ) : null}
            {!showCollectionHeader && itinerary.byline ? (
              <p className={styles.byline}>
                By {itinerary.byline}
                {itinerary.issue ? ` · ${itinerary.issue}` : ''}
              </p>
            ) : null}
            {introParagraphs.length > 0 ? (
              <div className={styles.introProse}>
                {introParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index === 0 && introParagraphs.length > 1
                        ? styles.introLead
                        : styles.introParagraph
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </header>

          <ol className={styles.steps}>
            {stops.map((stop, index) => {
              const href = detailHref(stop)
              const isActive = index === activeIndex
              return (
                <li
                  key={stop.order}
                  ref={(el) => {
                    stepRefs.current[index] = el
                  }}
                  data-step-index={index}
                  className={`${styles.step}${isActive ? ` ${styles.stepActive}` : ''}`}
                >
                  <div className={styles.stepRail}>
                    <span className={styles.stepBadge}>{stop.order}</span>
                    {index < stops.length - 1 ? <span className={styles.stepConnector} /> : null}
                  </div>
                  <div className={styles.stepBody}>
                    <p
                      className={styles.stepCategory}
                      style={{ color: CATEGORY_COLORS[stop.category] }}
                    >
                      {categoryLabel(stop.category)}
                    </p>
                    <h3 className={styles.stepName}>{stop.name}</h3>
                    <p className={styles.stepBlurb}>{stop.blurb}</p>
                    {href ? (
                      <a className={styles.stepLink} href={href}>
                        View {stop.name} →
                      </a>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ol>

          {itinerary.outro ? (
            <div className={styles.outroBlock}>
              <p className={styles.outro}>{itinerary.outro}</p>
            </div>
          ) : null}

          <div className={styles.storyActions}>
            <button type="button" className={styles.primaryBtn} onClick={handleTakeRoute}>
              Take this route
            </button>
            <button type="button" className={styles.secondaryBtn} onClick={handleCopyLink}>
              {copyStatus === 'copied' ? 'Link copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy shareable link'}
            </button>
          </div>
        </div>

        <div className={styles.mapColumn}>
          <div className={styles.mapSticky}>
            {summaryText ? (
              <div className={styles.summaryBar}>
                <span className={styles.summaryIcon} aria-hidden>
                  {itinerary.travelMode === 'walking' ? '🚶' : '🚗'}
                </span>
                <span className={styles.summaryText}>{summaryText}</span>
                <button type="button" className={styles.summaryRouteBtn} onClick={handleTakeRoute}>
                  Take route
                </button>
              </div>
            ) : null}

            <div className={styles.mapCanvas}>
              {MAPBOX_TOKEN ? (
                <Map
                  ref={mapRef}
                  mapboxAccessToken={MAPBOX_TOKEN}
                  initialViewState={{
                    longitude: regionCenter[0],
                    latitude: regionCenter[1],
                    zoom: 12.5,
                    pitch: reducedMotion ? 0 : isMobile ? 45 : 55,
                    bearing: -12,
                  }}
                  style={{ width: '100%', height: '100%' }}
                  mapStyle={SCROLLY_MAP_STYLE}
                  maxBounds={NAPA_BOUNDS}
                  attributionControl={false}
                  terrain={{
                    source: TERRAIN_CONFIG.source,
                    exaggeration: TERRAIN_CONFIG.exaggeration,
                  }}
                  onLoad={() => {
                    const map = mapRef.current?.getMap()
                    if (!map) return
                    map.setFog({
                      color: 'rgb(20,18,16)',
                      'high-color': 'rgb(40,38,35)',
                      'horizon-blend': 0.04,
                      'space-color': 'rgb(10,8,6)',
                      'star-intensity': 0,
                    })
                    flyToStop(0)
                  }}
                >
                  <Source
                    id="scrolly-dem"
                    type="raster-dem"
                    url={TERRAIN_CONFIG.demSource.url}
                    tileSize={TERRAIN_CONFIG.demSource.tileSize}
                    maxzoom={TERRAIN_CONFIG.demSource.maxzoom}
                  />

                  {routeGeoJson ? (
                    <Source id="scrolly-route" type="geojson" data={routeGeoJson}>
                      <Layer {...ROUTE_GLOW_LAYER} />
                      <Layer {...ROUTE_LINE_LAYER} />
                    </Source>
                  ) : null}

                  {stops.map((stop, index) => (
                    <Marker
                      key={stop.order}
                      longitude={stop.coords[0]}
                      latitude={stop.coords[1]}
                      anchor="center"
                    >
                      <div
                        className={`${styles.marker}${index === activeIndex ? ` ${styles.markerActive}` : ''}${index < activeIndex ? ` ${styles.markerPast}` : ''}`}
                        style={{ '--marker-color': CATEGORY_COLORS[stop.category] } as CSSProperties}
                      >
                        <span className={styles.markerDot} />
                        {index === activeIndex ? (
                          <span className={styles.markerLabel}>{stop.name}</span>
                        ) : null}
                      </div>
                    </Marker>
                  ))}
                </Map>
              ) : (
                <p className={styles.mapFallback}>Map unavailable — configure Mapbox token.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
