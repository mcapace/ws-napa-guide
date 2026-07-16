'use client'

import { useEffect, useRef, useState } from 'react'
import { GeolocateControl } from 'react-map-gl/mapbox'
import type { GeolocateControl as GeolocateControlInstance } from 'mapbox-gl'

type LocateControlProps = {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  /** Follow mode; off for scroll-driven itinerary maps whose camera is synced to the story. */
  track?: boolean
}

/**
 * Find-my-location button with honest failure states. The guide maps are
 * clamped to Napa Valley (`maxBounds`), so a visitor pressing this from
 * outside the valley gets a notice instead of a spinner that never resolves.
 */
export function LocateControl({ position = 'top-right', track = true }: LocateControlProps) {
  const controlRef = useRef<GeolocateControlInstance | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = (msg: string) => {
    setNotice(msg)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setNotice(null), 6000)
  }

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  return (
    <>
      <GeolocateControl
        ref={controlRef}
        position={position}
        positionOptions={{ enableHighAccuracy: false, timeout: 10000, maximumAge: 120000 }}
        trackUserLocation={track}
        showUserHeading={track}
        onOutOfMaxBounds={() => {
          show(
            'You’re outside Napa Valley — the locate button pins your spot once you’re in the valley.',
          )
          // No in-bounds position to fly to; toggle the control back off so
          // the button doesn't sit in a stuck waiting state.
          if (track) controlRef.current?.trigger()
        }}
        onError={(e) => {
          show(
            e.code === 1
              ? 'Location is blocked for this site — allow it in your browser settings and try again.'
              : 'Couldn’t get a location fix — check that location services are on and try again.',
          )
        }}
      />
      {notice ? (
        <div
          role="status"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 18,
            zIndex: 10,
            maxWidth: 'min(340px, 86%)',
            padding: '10px 14px',
            borderRadius: 3,
            background: 'rgba(13, 11, 9, 0.92)',
            border: '1px solid rgba(247, 243, 236, 0.14)',
            color: '#f7f3ec',
            fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
            fontSize: 12,
            lineHeight: 1.5,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          {notice}
        </div>
      ) : null}
    </>
  )
}
