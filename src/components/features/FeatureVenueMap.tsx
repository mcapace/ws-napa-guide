'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Map, { Marker, NavigationControl, Popup, type MapRef } from 'react-map-gl/mapbox'
import mapboxgl from 'mapbox-gl'
import type { FeatureVenue } from '@/lib/types'
import { restaurants } from '@/data/restaurants'
import { MAPBOX_TOKEN, NAPA_CENTER, NAPA_ZOOM } from '@/lib/mapbox'
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

export function FeatureVenueMap({ venues }: { venues: FeatureVenue[] }) {
  const mapRef = useRef<MapRef>(null)
  const pins = useMemo(() => venuePins(venues), [venues])
  const [activePin, setActivePin] = useState<MapPin | null>(null)

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

  useEffect(() => {
    fitToPins()
  }, [fitToPins])

  if (!MAPBOX_TOKEN || pins.length === 0) return null

  return (
    <div className={styles.wrap}>
      <div className={styles.mapShell}>
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
              }}
            >
              <button
                type="button"
                className={styles.marker}
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
      </div>
      <p className={styles.hint}>
        {pins.length} stops across the valley · tap a number to see details
      </p>
    </div>
  )
}
