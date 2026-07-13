import { REGION_SOUTH_TO_NORTH } from '@/data/region-order'

/** Magazine region scroll pages with Tiraki-style hero/showcase polish. */
export const REGION_SCROLL_ENHANCED_SLUGS = [...REGION_SOUTH_TO_NORTH] as const

export type RegionScrollEnhancedSlug = (typeof REGION_SCROLL_ENHANCED_SLUGS)[number]

export function isRegionScrollEnhanced(slug: string): boolean {
  return (REGION_SCROLL_ENHANCED_SLUGS as readonly string[]).includes(slug)
}
