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
  { label: 'Where to Taco', href: '/features/napa-taco-tour' },
  { label: 'The Judgement of Paris Tasting', href: '/features/judgment-of-paris' },
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
