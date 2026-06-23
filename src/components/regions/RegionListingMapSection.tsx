import { ExploreMapSection } from '@/components/explore/ExploreMapSection'
import type { Category } from '@/lib/mapbox'
import { buildRegionPinsFromRows } from '@/lib/explore-region-pins'
import type { LoadedRegionMdx, TastingDirectoryRow } from '@/lib/content/types'

export function RegionListingMapSection({
  title,
  regionSlug,
  data,
  mapRows,
  listRows,
  pinnedCategory,
}: {
  title: string
  regionSlug: string
  data: LoadedRegionMdx
  /** Rows plotted on the map (featured + directory). */
  mapRows: TastingDirectoryRow[]
  /** Optional narrower list (e.g. directory table only for dining). */
  listRows?: TastingDirectoryRow[]
  pinnedCategory: Category
}) {
  const mapPins = buildRegionPinsFromRows(regionSlug, data, mapRows)
  const listPins =
    listRows && listRows.length > 0
      ? buildRegionPinsFromRows(regionSlug, data, listRows)
      : mapPins

  if (listPins.length === 0 && mapPins.length === 0) return null

  return (
    <section
      style={{
        background: '#FAF7F2',
        padding: 'clamp(48px, 8vw, 80px) clamp(16px, 3vw, 32px) clamp(40px, 6vw, 64px)',
        borderTop: '1px solid rgba(26, 22, 20, 0.06)',
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            color: '#1A1614',
            margin: '0 0 28px',
            textAlign: 'center',
          }}
        >
          {title}
        </h2>
        <ExploreMapSection
          pins={mapPins.length > 0 ? mapPins : listPins}
          listPins={listPins}
          scopedRegion={regionSlug}
          showRegionFilter={false}
          pinnedCategory={pinnedCategory}
          embedMode
        />
      </div>
    </section>
  )
}
