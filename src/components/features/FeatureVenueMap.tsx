'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Map, { Marker, NavigationControl, Popup, type MapRef } from 'react-map-gl/mapbox'
import mapboxgl from 'mapbox-gl'
import type { FeatureVenue } from '@/lib/types'
import { restaurants } from '@/data/restaurants'
import { MAPBOX_TOKEN, NAPA_CENTER, NAPA_ZOOM } from '@/lib/mapbox'
import { MapWheelScrollBridge } from '@/components/map/MapWheelScrollBridge'
import layoutStyles from './FeatureArticleLayout.module.css'
import styles from './FeatureVenueMap.module.css'

type MapPin = {
  id: string
  name: string
  index: number
  coords: [number, number]
  address: string
  restaurantSlug?: string
  label?: string
}

function formatWebsite(url: string) {
  const href = url.startsWith('http') ? url : `https://${url}`
  const label = url.replace(/^https?:\/\/(www\.)?/, '')
  return { href, label }
}

function venuePins(venues: FeatureVenue[]): MapPin[] {
  const pins: MapPin[] = []

  venues.forEach((venue, index) => {
    const listIndex = index + 1
    const address = venue.addressLines[0] ?? ''
    const fromRestaurant = venue.restaurantSlug
      ? restaurants.find((r) => r.slug === venue.restaurantSlug)
      : undefined

    const primaryCoords = venue.coords ?? fromRestaurant?.coords
    if (primaryCoords) {
      pins.push({
        id: `${venue.name}-primary`,
        name: venue.name,
        index: listIndex,
        coords: primaryCoords,
        address,
        restaurantSlug: venue.restaurantSlug,
      })
    }

    venue.extraMapLocations?.forEach((loc, extraIndex) => {
      pins.push({
        id: `${venue.name}-extra-${extraIndex}`,
        name: venue.name,
        index: listIndex,
        coords: loc.coords,
        address: loc.label ?? venue.addressLines[1] ?? address,
        restaurantSlug: venue.restaurantSlug,
        label: loc.label,
      })
    })
  })

  return pins
}

type FeatureVenueMapProps = {
  venues: FeatureVenue[]
  /** Split layout: list on left, sticky map on right (Napa Taco Tour). */
  tourLayout?: boolean
  sectionLabel?: string
  sectionTitle?: string
}

export function FeatureVenueMap({
  venues,
  tourLayout = false,
  sectionLabel,
  sectionTitle,
}: FeatureVenueMapProps) {
  const mapRef = useRef<MapRef>(null)
  const rowRefs = useRef<Record<number, HTMLLIElement | null>>({})
  const pins = useMemo(() => venuePins(venues), [venues])
  const primaryPins = useMemo(
    () => pins.filter((pin) => pin.id.endsWith('-primary')),
    [pins],
  )
  const [activePin, setActivePin] = useState<MapPin | null>(null)
  const [activeVenueIndex, setActiveVenueIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const scrollSyncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastEaseIndexRef = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const fitToPins = useCallback(() => {
    const map = mapRef.current?.getMap()
    if (!map || pins.length === 0) return

    if (pins.length === 1) {
      map.flyTo({ center: pins[0].coords, zoom: 13, duration: 800 })
      return
    }

    const bounds = new mapboxgl.LngLatBounds()
    pins.forEach((pin) => bounds.extend(pin.coords))
    map.fitBounds(bounds, { padding: 72, maxZoom: 12.2, duration: 900 })
  }, [pins])

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

  const syncMapToScroll = useCallback(() => {
    if (!tourLayout || !isDesktop) return

    let anyRowVisible = false
    for (let i = 0; i < venues.length; i++) {
      const el = rowRefs.current[i]
      if (!el) continue
      const r = el.getBoundingClientRect()
      if (r.bottom > 0 && r.top < window.innerHeight) {
        anyRowVisible = true
        break
      }
    }
    if (!anyRowVisible) return

    const viewportCenterY = window.innerHeight / 2
    let bestIndex = -1
    let bestDist = Infinity

    for (let i = 0; i < venues.length; i++) {
      const el = rowRefs.current[i]
      if (!el) continue
      const elRect = el.getBoundingClientRect()
      const elCenter = elRect.top + elRect.height / 2
      const dist = Math.abs(elCenter - viewportCenterY)
      if (dist < bestDist) {
        bestDist = dist
        bestIndex = i
      }
    }

    if (bestIndex < 0 || bestIndex === lastEaseIndexRef.current) return
    const pin = primaryPins[bestIndex]
    if (!pin) return

    lastEaseIndexRef.current = bestIndex
    setActiveVenueIndex(bestIndex)
    easeToPin(pin)
  }, [tourLayout, isDesktop, venues.length, primaryPins, easeToPin])

  useEffect(() => {
    if (!tourLayout) {
      fitToPins()
    }
  }, [fitToPins, tourLayout])

  useEffect(() => {
    if (!tourLayout || !isDesktop) return

    const onWindowScroll = () => {
      if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current)
      scrollSyncTimerRef.current = setTimeout(syncMapToScroll, 80)
    }

    window.addEventListener('scroll', onWindowScroll, { passive: true })
    onWindowScroll()

    return () => {
      window.removeEventListener('scroll', onWindowScroll)
      if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current)
    }
  }, [tourLayout, isDesktop, syncMapToScroll])

  useEffect(() => {
    return () => {
      if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current)
    }
  }, [])

  if (!MAPBOX_TOKEN || pins.length === 0) return null

  const mapColumn = (
    <div className={styles.mapColumn}>
      <div className={styles.mapShell}>
        <MapWheelScrollBridge className={styles.mapBridge}>
          <Map
            ref={mapRef}
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={{
              longitude: NAPA_CENTER[0],
              latitude: NAPA_CENTER[1],
              zoom: NAPA_ZOOM,
            }}
            onLoad={fitToPins}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/outdoors-v12"
            attributionControl={false}
          >
            <NavigationControl position="top-right" showCompass={false} />
            {pins.map((pin) => (
              <Marker
                key={pin.id}
                longitude={pin.coords[0]}
                latitude={pin.coords[1]}
                anchor="center"
                onClick={(e) => {
                  e.originalEvent.stopPropagation()
                  setActivePin(pin)
                  if (tourLayout) {
                    setActiveVenueIndex(pin.index - 1)
                    lastEaseIndexRef.current = pin.index - 1
                  }
                }}
              >
                <button
                  type="button"
                  className={`${styles.marker}${
                    tourLayout && pin.index - 1 === activeVenueIndex
                      ? ` ${styles.markerActive}`
                      : ''
                  }`}
                  aria-label={`${pin.index}. ${pin.name}`}
                >
                  {pin.index}
                </button>
              </Marker>
            ))}
            {activePin && (
              <Popup
                longitude={activePin.coords[0]}
                latitude={activePin.coords[1]}
                anchor="bottom"
                offset={[0, -14]}
                onClose={() => setActivePin(null)}
                closeButton
                className={styles.popup}
              >
                <p className={styles.popupIndex}>{activePin.index}</p>
                <p className={styles.popupName}>{activePin.name}</p>
                {activePin.label && <p className={styles.popupMeta}>{activePin.label}</p>}
                <p className={styles.popupMeta}>{activePin.address}</p>
                {activePin.restaurantSlug ? (
                  <Link href={`/dining/${activePin.restaurantSlug}`} className={styles.popupLink}>
                    View in guide →
                  </Link>
                ) : (
                  <Link href="/explore?category=dining" className={styles.popupLink}>
                    Explore map →
                  </Link>
                )}
              </Popup>
            )}
          </Map>
        </MapWheelScrollBridge>
      </div>
      {!tourLayout && (
        <p className={styles.hint}>
          {pins.length} stops across the valley · tap a number to see details
        </p>
      )}
    </div>
  )

  if (!tourLayout) {
    return (
      <div className={styles.wrap}>
        {mapColumn}
      </div>
    )
  }

  return (
    <div className={styles.tourRoot}>
      {(sectionLabel || sectionTitle) && (
        <div className={layoutStyles.venuesHead}>
          {sectionLabel && <p className={layoutStyles.sectionLabel}>{sectionLabel}</p>}
          {sectionTitle && <h2 className={layoutStyles.sectionTitle}>{sectionTitle}</h2>}
        </div>
      )}

      <div className={styles.tourGrid}>
        <div className={styles.listColumn}>
          <ol className={`${layoutStyles.venueList} ${styles.tourVenueList}`}>
            {venues.map((venue, index) => (
              <li
                key={venue.name}
                ref={(el) => {
                  rowRefs.current[index] = el
                }}
                className={`${layoutStyles.venueRow}${
                  index === activeVenueIndex ? ` ${styles.venueRowActive}` : ''
                }`}
              >
                <span className={layoutStyles.venueIndex}>{index + 1}</span>
                <article className={layoutStyles.venueArticle}>
                  {venue.image && (
                    <div className={layoutStyles.venueThumb}>
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        sizes="200px"
                        className={layoutStyles.venueThumbImg}
                      />
                    </div>
                  )}
                  <div className={layoutStyles.venueCopy}>
                    <h3 className={layoutStyles.venueName}>{venue.name}</h3>
                    <p className={layoutStyles.venueMeta}>
                      {venue.addressLines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                      {venue.website && (
                        <a
                          href={formatWebsite(venue.website).href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {formatWebsite(venue.website).label}
                        </a>
                      )}
                      {venue.phone && (
                        <>
                          {venue.website && <br />}
                          {venue.phone}
                        </>
                      )}
                    </p>
                    <p className={layoutStyles.venueDesc}>{venue.description}</p>
                    {venue.restaurantSlug && (
                      <Link
                        href={`/dining/${venue.restaurantSlug}`}
                        className={layoutStyles.venueLink}
                      >
                        View in guide
                      </Link>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>

        {mapColumn}
      </div>

      <p className={styles.tourHint}>
        {pins.length} stops across the valley · scroll the list to explore the map
      </p>
    </div>
  )
}
