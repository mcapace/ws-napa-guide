/** Region pages with Tiraki-style scroll polish (pilot one at a time on staging). */
export const REGION_SCROLL_ENHANCED_SLUGS = ['oakville'] as const

export type RegionScrollEnhancedSlug = (typeof REGION_SCROLL_ENHANCED_SLUGS)[number]

export function isRegionScrollEnhanced(slug: string): boolean {
  return (REGION_SCROLL_ENHANCED_SLUGS as readonly string[]).includes(slug)
}
