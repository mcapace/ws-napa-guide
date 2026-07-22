import { sortRegionsSouthToNorth } from '@/data/region-order'
import { regions } from '@/data/regions'

export type SiteNavLink = {
  label: string
  href: string
  external?: boolean
}

/** Hamburger menu — mirrors June issue structure (James / edit team). */
export const navPrimaryLinks: SiteNavLink[] = [
  { label: 'Explore the Map', href: '/explore' },
  { label: 'Where to Taste', href: '/wineries' },
  { label: 'Where to Dine', href: '/dining' },
  { label: 'Where to Stay', href: '/stay' },
  { label: 'Plan Your Trip', href: '/plan' },
  { label: 'Events Calendar', href: '/calendar' },
]

/** Feature stories — grouped under "Stories" in the menu so they're findable. */
export const navStoryLinks: SiteNavLink[] = [
  { label: 'The Judgment of Paris Tasting', href: '/features/judgment-of-paris' },
  { label: 'The Napa Valley Taco Tour', href: '/features/napa-taco-tour' },
  { label: 'Napa Valley Landmarks', href: '/features/napa-landmarks' },
  { label: 'All Features', href: '/features' },
]

/** Towns & areas — south to north, same order as the print guide. */
export const navTownLinks: SiteNavLink[] = sortRegionsSouthToNorth(regions).map((region) => ({
  label: region.name,
  href: `/regions/${region.slug}`,
}))

export const navMetaLinks: SiteNavLink[] = [
  { label: 'Wine Spectator', href: 'https://www.winespectator.com', external: true },
  {
    label: 'Subscribe to the Magazine',
    href: 'https://www.winespectator.com/subscribe',
    external: true,
  },
]
