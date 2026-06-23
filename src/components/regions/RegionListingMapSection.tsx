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
  mapRows: TastingDirectoryRow[]
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
    <div className="region-chapter__map">
      <h3 className="region-chapter__map-title">{title}</h3>
      <ExploreMapSection
        pins={mapPins.length > 0 ? mapPins : listPins}
        listPins={listPins}
        scopedRegion={regionSlug}
        showRegionFilter={false}
        pinnedCategory={pinnedCategory}
        embedMode
      />
    </div>
  )
}
