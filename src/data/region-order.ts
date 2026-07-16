/** Editorial order per the print guide: Beyond Napa follows Downtown (it ran
 *  as “Nearby Napa” at the end of the Napa chapter), then south to north with
 *  Pritchard Hill between Rutherford and St. Helena. */
export const REGION_SOUTH_TO_NORTH = [
  'downtown-napa',
  'beyond-napa',
  'yountville',
  'oakville',
  'rutherford',
  'pritchard-hill',
  'st-helena',
  'calistoga',
] as const

export type RegionGuideSlug = (typeof REGION_SOUTH_TO_NORTH)[number]

export function regionGuideSortIndex(slug: string): number {
  const i = REGION_SOUTH_TO_NORTH.indexOf(slug as RegionGuideSlug)
  return i === -1 ? REGION_SOUTH_TO_NORTH.length : i
}

export function sortRegionsSouthToNorth<T extends { slug: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => regionGuideSortIndex(a.slug) - regionGuideSortIndex(b.slug))
}
