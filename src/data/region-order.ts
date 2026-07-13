/** South-to-north order as in the June 2026 print guide (valley floor, then Pritchard Hill). */
export const REGION_SOUTH_TO_NORTH = [
  'downtown-napa',
  'yountville',
  'oakville',
  'rutherford',
  'st-helena',
  'calistoga',
  'pritchard-hill',
  'beyond-napa',
] as const

export type RegionGuideSlug = (typeof REGION_SOUTH_TO_NORTH)[number]

export function regionGuideSortIndex(slug: string): number {
  const i = REGION_SOUTH_TO_NORTH.indexOf(slug as RegionGuideSlug)
  return i === -1 ? REGION_SOUTH_TO_NORTH.length : i
}

export function sortRegionsSouthToNorth<T extends { slug: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => regionGuideSortIndex(a.slug) - regionGuideSortIndex(b.slug))
}
