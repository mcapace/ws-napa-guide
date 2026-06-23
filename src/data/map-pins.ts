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
  href: string
  thumb: string
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

function pinExcerpt(text: string): string {
  const t = text.trim()
  if (t.length <= 90) return t
  return `${t.slice(0, 89).trimEnd()}…`
}

export const mapPins: MapPin[] = [
  ...wineries.map((w) => ({
    slug: w.slug,
    name: w.name,
    category: 'winery' as const,
    region: w.region,
    coords: w.coords,
    excerpt: pinExcerpt(w.excerpt),
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
    excerpt: pinExcerpt(r.excerpt),
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
    excerpt: pinExcerpt(h.excerpt),
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
