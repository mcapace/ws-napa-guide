'use client'

import { useState } from 'react'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl/mapbox'
import type { RegionCoordinates, TastingDirectoryRow } from '@/lib/content/types'
import { normalizeWebsiteUrl } from '@/lib/content/parseRegionMdxBody'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

type Props = {
  center: { lat: number; lng: number }
  rows: TastingDirectoryRow[]
  /** Shown on the always-visible center marker popup */
  regionName: string
}

/** Burgundy marker; used for geocoded rows and region center. */
function PinMarker({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: '#722F37',
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
  const pinned = rows.filter(
    (r): r is TastingDirectoryRow & { coordinates: RegionCoordinates } => r.coordinates !== null,
  )
  const [popup, setPopup] = useState<PopupState | null>(null)

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 420, borderRadius: 2, overflow: 'hidden' }}>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: center.lng,
          latitude: center.lat,
          zoom: 12,
        }}
        style={{ width: '100%', height: '100%', minHeight: 420 }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
      >
        <NavigationControl position="top-right" showCompass={false} />
        <Marker longitude={center.lng} latitude={center.lat} anchor="center">
          <PinMarker label={`${regionName} map center`} onClick={() => setPopup({ kind: 'center' })} />
        </Marker>
        {pinned.map((row) => {
          const { lat, lng } = row.coordinates
          return (
            <Marker key={`${row.name}-${row.address}`} longitude={lng} latitude={lat} anchor="bottom">
              <PinMarker
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
            <div style={{ padding: '6px 4px', maxWidth: 200, fontFamily: "'DM Sans', sans-serif" }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1A1614' }}>{regionName}</p>
              <p style={{ margin: '6px 0 0', fontSize: 11, lineHeight: 1.4, color: '#3D3835' }}>
                Regional map. Tasting rooms with coordinates appear as additional pins when available.
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
            <div style={{ padding: '4px 4px 2px', maxWidth: 220, fontFamily: "'DM Sans', sans-serif" }}>
              <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 13, color: '#1A1614' }}>{popup.row.name}</p>
              <p style={{ margin: '0 0 8px', fontSize: 12, lineHeight: 1.45, color: '#3D3835' }}>{popup.row.address}</p>
              {normalizeWebsiteUrl(popup.row.website) && (
                <a
                  href={normalizeWebsiteUrl(popup.row.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 11, color: '#722F37', textDecoration: 'underline', textUnderlineOffset: 3 }}
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
