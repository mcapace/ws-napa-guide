'use client'

import dynamic from 'next/dynamic'
import type { RegionCoordinates, TastingDirectoryRow } from '@/lib/content/types'

const TastingRoomMapClient = dynamic(
  () => import('./TastingRoomMapClient').then((m) => m.TastingRoomMapClient),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: 420,
          background: 'rgba(26,22,20,0.04)',
          borderRadius: 2,
        }}
      />
    ),
  },
)

export function TastingMapLazy({
  center,
  rows,
  regionName,
}: {
  center: RegionCoordinates
  rows: TastingDirectoryRow[]
  regionName: string
}) {
  return (
    <div style={{ height: '100%', minHeight: 420 }}>
      <TastingRoomMapClient center={center} rows={rows} regionName={regionName} />
    </div>
  )
}
