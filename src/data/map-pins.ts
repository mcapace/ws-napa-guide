// Pins derived from listings — single source of truth (wineries, restaurants, hotels).

import type { MapListingCategory } from '@/lib/types'
import { wineries } from '@/data/wineries'
import { restaurants } from '@/data/restaurants'
import { hotels } from '@/data/hotels'

export type MapPinCategory = MapListingCategory

/** Legacy alias used by NapaMap. */
export type PinType = 'winery' | 'restaurant' | 'hotel'

export interface MapPin {
  slug: string
  name: string
  category: MapPinCategory
  region: string
  coords: [number, number]
  excerpt: string
  /** Full listing copy when excerpt is truncated (featured MDX listings). */
  excerptFull?: string
  href: string
  /** Editorial photography only (`/images/…`); omit for directory rows without art. */
  thumb?: string
  /** Featured in region MDX — larger card in directory list */
  editorial?: boolean
  /** Wine Spectator Restaurant Award level from the print directory. */
  award?: string
  /** Legacy fields for NapaMap compatibility. */
  id: string
  type: PinType
  images: string[]
  rating?: number
  priceRange?: string
  cuisine?: string
  hotelCategory?: string
  sponsorTier: null | 'standard' | 'featured' | 'presenting'
}

function pinExcerpt(text: string, max = 90): string {
  const t = text.trim()
  if (t.length <= max) return t
  return `${t.slice(0, max - 1).trimEnd()}…`
}

function pinCopyFields(short: string, long?: string): { excerpt: string; excerptFull?: string } {
  const excerpt = pinExcerpt(short)
  const full = (long ?? short).trim()
  const excerptFull =
    full.length > excerpt.replace(/…$/, '').trim().length ? full : undefined
  return { excerpt, excerptFull }
}

export const mapPins: MapPin[] = [
  ...wineries.map((w) => ({
    slug: w.slug,
    name: w.name,
    category: 'winery' as const,
    region: w.region,
    coords: w.coords,
    ...pinCopyFields(w.excerpt, w.description),
    href: `/wineries/${w.slug}`,
    thumb: w.images[0],
    id: w.slug,
    type: 'winery' as const,
    images: w.images,
    rating: w.rating,
    sponsorTier: w.sponsorTier,
  })),
  ...restaurants.map((r) => ({
    slug: r.slug,
    name: r.name,
    category: 'dining' as const,
    region: r.region,
    coords: r.coords,
    ...pinCopyFields(r.excerpt, r.description),
    href: `/dining/${r.slug}`,
    thumb: r.images[0],
    id: r.slug,
    type: 'restaurant' as const,
    images: r.images,
    priceRange: r.priceRange,
    cuisine: r.cuisine,
    sponsorTier: r.sponsorTier,
  })),
  ...hotels.map((h) => ({
    slug: h.slug,
    name: h.name,
    category: 'stay' as const,
    region: h.region,
    coords: h.coords,
    ...pinCopyFields(h.excerpt, h.description),
    href: `/stay/${h.slug}`,
    thumb: h.images[0],
    id: h.slug,
    type: 'hotel' as const,
    images: h.images,
    priceRange: h.priceRange,
    hotelCategory: h.category,
    sponsorTier: h.sponsorTier,
  })),
]

export const PIN_COLORS: Record<PinType, string> = {
  winery: '#C4943A',
  restaurant: '#6B1C2A',
  hotel: '#5C6B52',
}

export const PIN_LABELS: Record<PinType, string> = {
  winery: 'Winery',
  restaurant: 'Restaurant',
  hotel: 'Hotel',
}

export const pinsByRegion = (region: string) => mapPins.filter((p) => p.region === region)
