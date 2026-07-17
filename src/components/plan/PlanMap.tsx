'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Map, { Marker, Popup, NavigationControl, type MapRef } from 'react-map-gl/mapbox'
import { MAP_STYLE } from '@/lib/mapbox'
import type { PlanVenue } from '@/lib/plan-itinerary'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

/** One color per day — gold first, then complementary editorial tones. */
const DAY_COLORS = ['#c4943a', '#7a4a8f', '#2f6f66', '#b0513a', '#3a6ab0', '#8f7a2a', '#a03a6b']

export type PlanMapStop = {
  venue: PlanVenue
  dayIndex: number
  stopNumber: number
  time: string
  label: string
}

export function planMapDayColor(dayIndex: number): string {
  return DAY_COLORS[dayIndex % DAY_COLORS.length]
}

export function PlanMap({ stops }: { stops: PlanMapStop[] }) {
  const mapRef = useRef<MapRef>(null)
  const [selected, setSelected] = useState<PlanMapStop | null>(null)

  const bounds = useMemo(() => {
    if (stops.length === 0) return null
    let minLng = Infinity
    let minLat = Infinity
    let maxLng = -Infinity
    let maxLat = -Infinity
    for (const s of stops) {
      const [lng, lat] = s.venue.coords
      if (!Number.isFinite(lng) || !Number.isFinite(lat)) continue
      minLng = Math.min(minLng, lng)
      minLat = Math.min(minLat, lat)
      maxLng = Math.max(maxLng, lng)
      maxLat = Math.max(maxLat, lat)
    }
    if (!Number.isFinite(minLng)) return null
    return [
      [minLng, minLat],
      [maxLng, maxLat],
    ] as [[number, number], [number, number]]
  }, [stops])

  useEffect(() => {
    if (bounds) {
      mapRef.current?.fitBounds(bounds, { padding: 70, maxZoom: 13, duration: 800 })
    }
  }, [bounds])

  if (!MAPBOX_TOKEN || stops.length === 0) return null

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={MAP_STYLE}
        initialViewState={{ longitude: -122.36, latitude: 38.44, zoom: 10.2 }}
        onLoad={() => {
          if (bounds) {
            mapRef.current?.fitBounds(bounds, { padding: 70, maxZoom: 13, duration: 0 })
          }
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" showCompass={false} />
        {stops.map((stop) => (
          <Marker
            key={`${stop.dayIndex}-${stop.stopNumber}-${stop.venue.slug}`}
            longitude={stop.venue.coords[0]}
            latitude={stop.venue.coords[1]}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setSelected(stop)
            }}
          >
            <div
              title={stop.venue.name}
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: planMapDayColor(stop.dayIndex),
                border: '2px solid #fff',
                boxShadow: '0 1px 6px rgba(13,11,9,0.4)',
                color: '#fff',
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: 12,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {stop.stopNumber}
            </div>
          </Marker>
        ))}
        {selected ? (
          <Popup
            longitude={selected.venue.coords[0]}
            latitude={selected.venue.coords[1]}
            anchor="bottom"
            offset={16}
            onClose={() => setSelected(null)}
            closeButton={false}
          >
            <div style={{ fontFamily: 'var(--font-body, sans-serif)', color: '#1a1612' }}>
              <p style={{ margin: 0, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a7a55' }}>
                Day {selected.dayIndex + 1} · {selected.time} · {selected.label}
              </p>
              <p style={{ margin: '3px 0 2px', fontSize: 14, fontWeight: 600 }}>
                {selected.venue.name}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: '#6b6257' }}>{selected.venue.address}</p>
            </div>
          </Popup>
        ) : null}
      </Map>
    </div>
  )
}
