// Pins derived from listings — single source of truth (wineries, restaurants, hotels).

import type { MapPinType } from '@/lib/types'
import { wineries } from '@/data/wineries'
import { restaurants } from '@/data/restaurants'
import { hotels } from '@/data/hotels'

export type PinType = MapPinType

export interface MapPin {
  id: string
  type: PinType
  name: string
  slug: string
  region: string
  coords: [number, number]
  excerpt: string
  rating?: number
  detail?: string
  priceRange?: string
  cuisine?: string
  category?: string
  sponsorTier: null | 'standard' | 'featured' | 'presenting'
  images: string[]
  href: string
}

export const mapPins: MapPin[] = [
  ...wineries.map((w) => ({
    id: w.slug,
    type: 'winery' as const,
    name: w.name,
    slug: w.slug,
    region: w.region,
    coords: w.coords,
    excerpt: w.excerpt,
    rating: w.rating,
    sponsorTier: w.sponsorTier,
    images: w.images,
    href: `/wineries/${w.slug}`,
  })),
  ...restaurants.map((r) => ({
    id: r.slug,
    type: 'restaurant' as const,
    name: r.name,
    slug: r.slug,
    region: r.region,
    coords: r.coords,
    excerpt: r.excerpt,
    priceRange: r.priceRange,
    cuisine: r.cuisine,
    sponsorTier: r.sponsorTier,
    images: r.images,
    href: `/dining/${r.slug}`,
  })),
  ...hotels.map((h) => ({
    id: h.slug,
    type: 'hotel' as const,
    name: h.name,
    slug: h.slug,
    region: h.region,
    coords: h.coords,
    excerpt: h.excerpt,
    priceRange: h.priceRange,
    category: h.category,
    sponsorTier: h.sponsorTier,
    images: h.images,
    href: `/stay/${h.slug}`,
  })),
]

export const PIN_COLORS: Record<PinType, string> = {
  winery: '#C4943A',
  restaurant: '#8B2E3E',
  hotel: '#5C6B52',
}

export const PIN_LABELS: Record<PinType, string> = {
  winery: 'Winery',
  restaurant: 'Restaurant',
  hotel: 'Hotel',
}
