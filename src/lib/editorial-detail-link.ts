import type { MapPin } from '@/data/map-pins'
import { hotels } from '@/data/hotels'
import { restaurants } from '@/data/restaurants'
import { wineries } from '@/data/wineries'
import { directorySlug } from '@/lib/explore-region-pins'

/** Breakout detail pages exist only for these curated slugs — anything else 404s. */
const DETAIL_PAGES = new Set<string>([
  ...wineries.map((w) => `/wineries/${w.slug}`),
  ...restaurants.map((r) => `/dining/${r.slug}`),
  ...hotels.map((h) => `/stay/${h.slug}`),
])

export function detailPageExists(href: string): boolean {
  return DETAIL_PAGES.has(href)
}

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[’']/g, '')
    .trim()
}

function namesOverlap(a: string, b: string): boolean {
  const na = normalizeName(a)
  const nb = normalizeName(b)
  if (na === nb) return true
  if (na.length >= 4 && nb.length >= 4 && (na.includes(nb) || nb.includes(na))) return true
  return false
}

export function findPinForName(pins: MapPin[], name: string): MapPin | undefined {
  return pins.find((p) => namesOverlap(p.name, name))
}

export function editorialDetailHref(
  pins: MapPin[],
  category: 'taste' | 'eat' | 'stay',
  regionSlug: string,
  name: string,
): string {
  const pin = findPinForName(pins, name)
  if (
    pin?.href &&
    !pin.href.startsWith('http') &&
    !pin.href.includes('/explore') &&
    detailPageExists(pin.href)
  ) {
    return pin.href
  }

  const slug = directorySlug(regionSlug, name)
  const base =
    category === 'taste' ? '/wineries' : category === 'eat' ? '/dining' : '/stay'
  const candidate = `${base}/${slug}`
  if (detailPageExists(candidate)) return candidate

  // No breakout page for this venue — land on its pin in the explore
  // directory instead of a 404.
  return `/explore?ava=${regionSlug}&place=${slug}`
}
