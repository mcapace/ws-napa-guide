import { regions } from '@/data/regions'
import { articles } from '@/data/articles'

export type SiteNavLink = {
  label: string
  href: string
  external?: boolean
}

/** Large display links — primary journeys through the guide */
export const navPrimaryLinks: SiteNavLink[] = [
  { label: 'Appellations', href: '/regions' },
  { label: 'Explore the Map', href: '/explore' },
  { label: 'Wineries', href: '/wineries' },
  { label: 'Dining', href: '/dining' },
  { label: 'Where to Stay', href: '/stay' },
]

/** Seven AVAs — same order as the homepage appellation list */
export const navAppellationLinks: SiteNavLink[] = regions.map((region) => ({
  label: region.name,
  href: `/regions/${region.slug}`,
}))

const storySlugs = [
  'napa-valley-guide',
  'judgment-of-paris',
  'napa-landmarks',
  'napa-taco-tour',
  'napa-calendar',
] as const

/** Magazine features with live article pages */
export const navStoryLinks: SiteNavLink[] = storySlugs
  .map((slug) => articles.find((a) => a.slug === slug))
  .filter((article): article is NonNullable<typeof article> => Boolean(article))
  .map((article) => ({
    label: article.title,
    href: `/features/${article.slug}`,
  }))

export const navMetaLinks: SiteNavLink[] = [
  { label: 'Wine Spectator', href: 'https://www.winespectator.com', external: true },
  {
    label: 'Subscribe to the Magazine',
    href: 'https://www.winespectator.com/subscribe',
    external: true,
  },
]
