import { regions } from '@/data/regions'
import { getStoryArticles } from '@/data/site-stories'

export type SiteNavLink = {
  label: string
  href: string
  external?: boolean
}

/** Large display links — primary journeys through the guide */
export const navPrimaryLinks: SiteNavLink[] = [
  { label: 'Appellations', href: '/regions' },
  { label: 'From the Issue', href: '/features' },
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

/** Magazine features with live article pages */
export const navStoryLinks: SiteNavLink[] = getStoryArticles().map((article) => ({
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
