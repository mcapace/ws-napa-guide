import type { DirectoryCategory, EditorialFeature, LoadedRegionMdx, TastingDirectoryRow } from '@/lib/content/types'
import { attachDirectoryGeocodes } from '@/lib/content/directoryGeocode'

function rowKey(r: Pick<TastingDirectoryRow, 'name' | 'address'>): string {
  return `${r.name.trim().toLowerCase()}|${r.address.trim().toLowerCase()}`
}

/** De-duplicate by name + address; first occurrence wins (featured before directory). */
export function mergeDedupedMapRows(rows: TastingDirectoryRow[]): TastingDirectoryRow[] {
  const seen = new Set<string>()
  const out: TastingDirectoryRow[] = []
  for (const r of rows) {
    if (!r.address?.trim()) continue
    const k = rowKey(r)
    if (seen.has(k)) continue
    seen.add(k)
    out.push(r)
  }
  return out
}

export function editorialFeaturesToRows(
  features: EditorialFeature[],
  category: DirectoryCategory,
): TastingDirectoryRow[] {
  return features
    .filter((f) => f.address?.trim())
    .map((f) => ({
      name: f.name,
      address: f.address!.trim(),
      website: f.website?.trim() ?? '',
      coordinates: null,
      category,
    }))
}

export function buildRegionTasteMapRows(data: LoadedRegionMdx): TastingDirectoryRow[] {
  const fromFeatured = editorialFeaturesToRows(data.featuredWineries, 'winery')
  return attachDirectoryGeocodes(
    data.frontmatter.slug,
    mergeDedupedMapRows([...fromFeatured, ...data.tastingDirectory]),
  )
}

export function buildRegionEatMapRows(data: LoadedRegionMdx): TastingDirectoryRow[] {
  const fromFeatured = editorialFeaturesToRows(data.featuredRestaurants, 'restaurant')
  const fromCoffeeSnack = editorialFeaturesToRows(data.coffeeSnackFeatures, 'restaurant')
  const fromBreakfast = data.breakfast?.address?.trim()
    ? editorialFeaturesToRows([data.breakfast], 'restaurant')
    : []
  return attachDirectoryGeocodes(
    data.frontmatter.slug,
    mergeDedupedMapRows([
      ...fromFeatured,
      ...fromCoffeeSnack,
      ...fromBreakfast,
      ...data.restaurantDirectory,
    ]),
  )
}

export function buildRegionStayMapRows(data: LoadedRegionMdx): TastingDirectoryRow[] {
  const fromFeatured = editorialFeaturesToRows(data.featuredHotels, 'hotel')
  return attachDirectoryGeocodes(
    data.frontmatter.slug,
    mergeDedupedMapRows([...fromFeatured, ...data.lodgingDirectory]),
  )
}

/** Shopping / culture / cocktails (Between Pours) from town Things to Do sections. */
export function buildRegionDoMapRows(data: LoadedRegionMdx): TastingDirectoryRow[] {
  if (!data.thingsToDo?.features.length) return []
  const fromFeatures = editorialFeaturesToRows(data.thingsToDo.features, 'do')
  return attachDirectoryGeocodes(data.frontmatter.slug, mergeDedupedMapRows(fromFeatures))
}
