import type { MapPin } from '@/data/map-pins'
import { partnerPathForName } from '@/data/partners'
import { directorySlug } from '@/lib/explore-region-pins'
import { withNapaGuideUtm } from '@/lib/outbound-utm'
import {
  absoluteWebsiteUrl,
  detailPageExists,
  venueWebsiteForDetailPath,
} from '@/lib/venue-links'

export { absoluteWebsiteUrl, detailPageExists, venueWebsiteForDetailPath }

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
  website?: string,
): string {
  // Partner destination pages take priority for Presence placements.
  if (category === 'taste') {
    const partnerPath = partnerPathForName(name, regionSlug)
    if (partnerPath) return partnerPath
  }

  // Default: venue's actual website (with campaign UTMs when applicable).
  if (website?.trim()) return withNapaGuideUtm(absoluteWebsiteUrl(website))

  const pin = findPinForName(pins, name)
  if (pin?.href?.startsWith('http')) return withNapaGuideUtm(pin.href)
  if (pin?.href && detailPageExists(pin.href)) {
    const site = venueWebsiteForDetailPath(pin.href)
    if (site) return withNapaGuideUtm(absoluteWebsiteUrl(site))
  }

  const slug = directorySlug(regionSlug, name)
  const base =
    category === 'taste' ? '/wineries' : category === 'eat' ? '/dining' : '/stay'
  const candidate = `${base}/${slug}`
  const site = venueWebsiteForDetailPath(candidate)
  if (site) return withNapaGuideUtm(absoluteWebsiteUrl(site))

  // Venue has no website anywhere on file — its explore pin, never a 404
  return `/explore?ava=${regionSlug}&place=${slug}`
}
