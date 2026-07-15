import { hotels } from '@/data/hotels'
import { restaurants } from '@/data/restaurants'
import { wineries } from '@/data/wineries'

/** Breakout detail pages exist only for these curated slugs — anything else 404s. */
const DETAIL_PAGES = new Set<string>([
  ...wineries.map((w) => `/wineries/${w.slug}`),
  ...restaurants.map((r) => `/dining/${r.slug}`),
  ...hotels.map((h) => `/stay/${h.slug}`),
])

export function detailPageExists(href: string): boolean {
  return DETAIL_PAGES.has(href)
}

/** Venue websites for the curated breakout venues, keyed by detail path. */
const DETAIL_PAGE_WEBSITES = new Map<string, string>()
for (const w of wineries) {
  const site = w.visitInfo?.website
  if (site) DETAIL_PAGE_WEBSITES.set(`/wineries/${w.slug}`, site)
}
for (const r of restaurants) if (r.website) DETAIL_PAGE_WEBSITES.set(`/dining/${r.slug}`, r.website)
for (const h of hotels) if (h.website) DETAIL_PAGE_WEBSITES.set(`/stay/${h.slug}`, h.website)

export function venueWebsiteForDetailPath(href: string): string | undefined {
  return DETAIL_PAGE_WEBSITES.get(href)
}

export function absoluteWebsiteUrl(site: string): string {
  const trimmed = site.trim().split(/[;\s]+/)[0]
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}
