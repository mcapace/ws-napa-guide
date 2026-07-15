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
    href: w.visitInfo?.website ?? `/explore?ava=${w.region}&place=${w.slug}`,
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
    href: r.website ?? `/explore?ava=${r.region}&place=${r.slug}`,
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
    href: h.website ?? `/explore?ava=${h.region}&place=${h.slug}`,
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

// ── Taco tour taquerias — print venues surfaced in the dining directory ──
// Built from the feature content so the full list matches the story; the
// two with curated restaurant entries are skipped (already pinned above).
import { getFeatureArticleContent } from './feature-articles'

const TACO_REGION_BY_TOWN: Record<string, string> = {
  Napa: 'downtown-napa',
  'St. Helena': 'st-helena',
  Yountville: 'yountville',
  Calistoga: 'calistoga',
  Rutherford: 'rutherford',
}

const TACO_THUMBS: Record<string, string> = {
  'El Sabor Serano': '/images/features/napa-taco-tour/venue-el-sabor-serano.jpg',
  'Mother’s Tacos': '/images/features/napa-taco-tour/venue-mothers-tacos.jpg',
  'Ray Ray’s Tacos': '/images/features/napa-taco-tour/venue-ray-rays-tacos.jpg',
  'Tacos El Muchacho Alegre': '/images/features/napa-taco-tour/venue-tacos-el-muchacho-alegre.jpg',
}

function tacoTruckPins(): MapPin[] {
  const feature = getFeatureArticleContent('napa-taco-tour')
  const venues = feature?.venues ?? []
  const pins: MapPin[] = []
  for (const v of venues) {
    if (!v.coords || v.restaurantSlug) continue
    const town = Object.keys(TACO_REGION_BY_TOWN).find((t) =>
      v.addressLines[0]?.endsWith(t),
    )
    if (!town) continue
    const slug = v.name
      .toLowerCase()
      .replace(/[’']/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    pins.push({
      slug,
      name: v.name,
      category: 'dining',
      region: TACO_REGION_BY_TOWN[town],
      coords: v.coords,
      excerpt: (v.description ?? '').slice(0, 160),
      href: v.website
        ? v.website.match(/^https?:/)
          ? v.website
          : `https://${v.website}`
        : `/features/napa-taco-tour`,
      thumb: TACO_THUMBS[v.name],
      id: slug,
      type: 'restaurant',
      images: TACO_THUMBS[v.name] ? [TACO_THUMBS[v.name]] : [],
      sponsorTier: null,
    })
  }
  return pins
}

mapPins.push(...tacoTruckPins())
