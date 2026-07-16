'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Map, { Marker, NavigationControl, Popup, type MapRef } from 'react-map-gl/mapbox'
import { LocateControl } from '@/components/map/LocateControl'
import mapboxgl from 'mapbox-gl'
import type { DirectoryCategory, RegionCoordinates, TastingDirectoryRow } from '@/lib/content/types'
import { normalizeWebsiteUrl } from '@/lib/content/parseRegionMdxBody'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

const PIN_COLORS: Record<DirectoryCategory, string> = {
  winery: '#722F37',
  restaurant: '#8B5A2B',
  hotel: '#2C5282',
  do: '#9B9283',
}

const CATEGORY_LABELS: Record<DirectoryCategory, string> = {
  winery: 'Winery',
  restaurant: 'Restaurant',
  hotel: 'Hotel',
  do: 'Between Pours',
}

function categoryLabel(c: DirectoryCategory): string {
  return CATEGORY_LABELS[c]
}

type Props = {
  center: { lat: number; lng: number }
  rows: TastingDirectoryRow[]
  /** Shown on the center / overview popup when useful */
  regionName: string
}

function PinMarker({
  onClick,
  label,
  color,
}: {
  onClick: () => void
  label: string
  color: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: color,
        border: '2px solid #FAF7F2',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        padding: 0,
      }}
      aria-label={label}
    />
  )
}

type PopupState =
  | { kind: 'center' }
  | { kind: 'row'; row: TastingDirectoryRow; lng: number; lat: number }

export function TastingRoomMapClient({ center, rows, regionName }: Props) {
  const mapRef = useRef<MapRef>(null)
  const pinned = rows.filter(
    (r): r is TastingDirectoryRow & { coordinates: RegionCoordinates } => r.coordinates !== null,
  )
  const pinSignature = useMemo(() => {
    return pinned
      .map((p) => `${p.coordinates.lat.toFixed(4)}:${p.coordinates.lng.toFixed(4)}:${p.category}`)
      .sort()
      .join(',')
  }, [rows])
  const [popup, setPopup] = useState<PopupState | null>(null)

  useEffect(() => {
    const map = mapRef.current?.getMap()
    if (!map) return

    const run = () => {
      if (pinned.length === 0) {
        map.jumpTo({ center: [center.lng, center.lat], zoom: 12 })
        return
      }
      const b = new mapboxgl.LngLatBounds()
      for (const row of pinned) {
        b.extend([row.coordinates.lng, row.coordinates.lat])
      }
      if (pinned.length === 1) {
        map.easeTo({ center: [pinned[0].coordinates.lng, pinned[0].coordinates.lat], zoom: 13, duration: 0 })
        return
      }
      map.fitBounds(b, { padding: 72, maxZoom: 13.5, duration: 0 })
    }

    if (map.isStyleLoaded()) run()
    else map.once('load', run)
  }, [center.lat, center.lng, pinSignature])

  const showCenterPin = pinned.length === 0

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 420, borderRadius: 2, overflow: 'hidden' }}>
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: center.lng,
          latitude: center.lat,
          zoom: 12,
        }}
        style={{ width: '100%', height: '100%', minHeight: 420 }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        attributionControl={false}
      >
        <NavigationControl position="top-right" showCompass={false} />
        <LocateControl position="top-right" />
        {showCenterPin && (
          <Marker longitude={center.lng} latitude={center.lat} anchor="center">
            <PinMarker
              color="#722F37"
              label={`${regionName} map center`}
              onClick={() => setPopup({ kind: 'center' })}
            />
          </Marker>
        )}
        {pinned.map((row) => {
          const { lat, lng } = row.coordinates
          const color = PIN_COLORS[row.category] ?? PIN_COLORS.winery
          return (
            <Marker key={`${row.name}-${row.address}-${row.category}`} longitude={lng} latitude={lat} anchor="bottom">
              <PinMarker
                color={color}
                label={row.name}
                onClick={() => setPopup({ kind: 'row', row, lng, lat })}
              />
            </Marker>
          )
        })}
        {popup?.kind === 'center' && (
          <Popup
            longitude={center.lng}
            latitude={center.lat}
            anchor="top"
            offset={14}
            onClose={() => setPopup(null)}
            closeButton
            closeOnClick={false}
          >
            <div style={{ padding: '6px 4px', maxWidth: 200, fontFamily: 'var(--font-body)' }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1A1614' }}>{regionName}</p>
              <p style={{ margin: '6px 0 0', fontSize: 11, lineHeight: 1.4, color: '#3D3835' }}>
                Run the geocode task to plot each listing when coordinates are available.
              </p>
            </div>
          </Popup>
        )}
        {popup?.kind === 'row' && (
          <Popup
            longitude={popup.lng}
            latitude={popup.lat}
            anchor="top"
            offset={18}
            onClose={() => setPopup(null)}
            closeButton
            closeOnClick={false}
          >
            <div style={{ padding: '4px 4px 2px', maxWidth: 220, fontFamily: 'var(--font-body)' }}>
              <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: PIN_COLORS[popup.row.category] }}>
                {categoryLabel(popup.row.category)}
              </p>
              <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 13, color: '#1A1614' }}>{popup.row.name}</p>
              <p style={{ margin: '0 0 8px', fontSize: 12, lineHeight: 1.45, color: '#3D3835' }}>
                {popup.row.address}
              </p>
              {normalizeWebsiteUrl(popup.row.website) && (
                <a
                  href={normalizeWebsiteUrl(popup.row.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 11, color: 'rgba(26,22,20,0.65)', textDecoration: 'underline', textUnderlineOffset: 3 }}
                >
                  Visit website
                </a>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  )
}
