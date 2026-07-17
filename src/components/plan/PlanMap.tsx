'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  Source,
  Layer,
  type MapRef,
  type LayerProps,
} from 'react-map-gl/mapbox'
import { Wine, UtensilsCrossed, BedDouble, Sparkles, type LucideIcon } from 'lucide-react'
import { SCROLLY_MAP_STYLE } from '@/lib/mapbox'
import type { PlanVenue } from '@/lib/plan-itinerary'
import styles from './PlanMap.module.css'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

/** One color per day — gold first, then complementary editorial tones. */
const DAY_COLORS = ['#c4943a', '#a06bc4', '#4aa08f', '#d97757', '#5f8fd9', '#c4b13a', '#d95f9e']

const CATEGORY_ICON: Record<PlanVenue['category'], LucideIcon> = {
  winery: Wine,
  dining: UtensilsCrossed,
  stay: BedDouble,
  do: Sparkles,
}

const CATEGORY_LABEL: Record<PlanVenue['category'], string> = {
  winery: 'Tasting room',
  dining: 'Dining',
  stay: 'Stay',
  do: 'Between pours',
}

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

type Selected = { stop: PlanMapStop | null; home: PlanVenue | null }

// Soft glow underlay + solid dashed line per day
const routeGlowLayer: LayerProps = {
  id: 'plan-route-glow',
  type: 'line',
  layout: { 'line-cap': 'round', 'line-join': 'round' },
  paint: {
    'line-color': ['get', 'color'],
    'line-width': 7,
    'line-opacity': 0.22,
    'line-blur': 3,
  },
}

const routeLineLayer: LayerProps = {
  id: 'plan-route-line',
  type: 'line',
  layout: { 'line-cap': 'round', 'line-join': 'round' },
  paint: {
    'line-color': ['get', 'color'],
    'line-width': 2,
    'line-opacity': 0.85,
    'line-dasharray': [0.5, 2],
  },
}

export function PlanMap({
  stops,
  homeBase,
}: {
  stops: PlanMapStop[]
  homeBase?: PlanVenue
}) {
  const mapRef = useRef<MapRef>(null)
  const [selected, setSelected] = useState<Selected>({ stop: null, home: null })

  const routes = useMemo(() => {
    const byDay = new Map<number, PlanMapStop[]>()
    for (const s of stops) {
      const list = byDay.get(s.dayIndex) ?? []
      list.push(s)
      byDay.set(s.dayIndex, list)
    }
    const features = []
    for (const [day, dayStops] of byDay) {
      const ordered = [...dayStops].sort((a, b) => a.stopNumber - b.stopNumber)
      const coords = ordered
        .map((s) => s.venue.coords)
        .filter(([lng, lat]) => Number.isFinite(lng) && Number.isFinite(lat))
      if (coords.length < 2) continue
      features.push({
        type: 'Feature' as const,
        properties: { color: planMapDayColor(day) },
        geometry: { type: 'LineString' as const, coordinates: coords },
      })
    }
    return { type: 'FeatureCollection' as const, features }
  }, [stops])

  const bounds = useMemo(() => {
    const points = [
      ...stops.map((s) => s.venue.coords),
      ...(homeBase ? [homeBase.coords] : []),
    ].filter(([lng, lat]) => Number.isFinite(lng) && Number.isFinite(lat))
    if (points.length === 0) return null
    let minLng = Infinity
    let minLat = Infinity
    let maxLng = -Infinity
    let maxLat = -Infinity
    for (const [lng, lat] of points) {
      minLng = Math.min(minLng, lng)
      minLat = Math.min(minLat, lat)
      maxLng = Math.max(maxLng, lng)
      maxLat = Math.max(maxLat, lat)
    }
    return [
      [minLng, minLat],
      [maxLng, maxLat],
    ] as [[number, number], [number, number]]
  }, [stops, homeBase])

  useEffect(() => {
    if (bounds) {
      mapRef.current?.fitBounds(bounds, {
        padding: 80,
        maxZoom: 13,
        duration: 1400,
        pitch: 32,
      })
    }
  }, [bounds])

  if (!MAPBOX_TOKEN || stops.length === 0) return null

  return (
    <div className={styles.wrap}>
      <MapGL
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={SCROLLY_MAP_STYLE}
        initialViewState={{ longitude: -122.36, latitude: 38.44, zoom: 9.4, pitch: 32 }}
        onLoad={() => {
          if (bounds) {
            mapRef.current?.fitBounds(bounds, {
              padding: 80,
              maxZoom: 13,
              duration: 1800,
              pitch: 32,
            })
          }
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" showCompass={false} />

        <Source id="plan-routes" type="geojson" data={routes}>
          <Layer {...routeGlowLayer} />
          <Layer {...routeLineLayer} />
        </Source>

        {homeBase ? (
          <Marker
            longitude={homeBase.coords[0]}
            latitude={homeBase.coords[1]}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setSelected({ stop: null, home: homeBase })
            }}
          >
            <div className={styles.homeMarker} title={`Home base: ${homeBase.name}`}>
              <BedDouble size={19} strokeWidth={2.2} aria-hidden />
            </div>
          </Marker>
        ) : null}

        {stops.map((stop, i) => {
          const Icon = CATEGORY_ICON[stop.venue.category]
          return (
            <Marker
              key={`${stop.dayIndex}-${stop.stopNumber}-${stop.venue.slug}`}
              longitude={stop.venue.coords[0]}
              latitude={stop.venue.coords[1]}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation()
                setSelected({ stop, home: null })
              }}
            >
              <div
                className={styles.marker}
                title={stop.venue.name}
                style={{
                  background: planMapDayColor(stop.dayIndex),
                  animationDelay: `${Math.min(i * 70, 900)}ms`,
                }}
              >
                <Icon size={15} strokeWidth={2.4} aria-hidden />
                <span className={styles.markerBadge}>{stop.stopNumber}</span>
              </div>
            </Marker>
          )
        })}

        {selected.stop ? (
          <Popup
            longitude={selected.stop.venue.coords[0]}
            latitude={selected.stop.venue.coords[1]}
            anchor="bottom"
            offset={20}
            onClose={() => setSelected({ stop: null, home: null })}
            closeButton={false}
            className={styles.popup}
          >
            <p className={styles.popupEyebrow}>
              Day {selected.stop.dayIndex + 1} · {selected.stop.time} ·{' '}
              {CATEGORY_LABEL[selected.stop.venue.category]}
            </p>
            <p className={styles.popupName}>{selected.stop.venue.name}</p>
            <p className={styles.popupAddress}>{selected.stop.venue.address}</p>
          </Popup>
        ) : null}
        {selected.home ? (
          <Popup
            longitude={selected.home.coords[0]}
            latitude={selected.home.coords[1]}
            anchor="bottom"
            offset={26}
            onClose={() => setSelected({ stop: null, home: null })}
            closeButton={false}
            className={styles.popup}
          >
            <p className={styles.popupEyebrow}>Your home base</p>
            <p className={styles.popupName}>{selected.home.name}</p>
            <p className={styles.popupAddress}>{selected.home.address}</p>
          </Popup>
        ) : null}
      </MapGL>
    </div>
  )
}
