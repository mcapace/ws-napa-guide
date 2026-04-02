export type SponsorTier = null | 'standard' | 'featured' | 'presenting'

export type Region =
  | 'oakville'
  | 'rutherford'
  | 'calistoga'
  | 'yountville'
  | 'pritchard-hill'
  | 'downtown-napa'
  | 'st-helena'
  | 'stags-leap'
  | 'spring-mountain'
  | 'napa-valley'

export interface Winery {
  slug: string
  name: string
  coords: [number, number] // [lng, lat]
  region: Region
  address?: string
  rating?: number
  description: string
  excerpt: string
  tastingNotes?: string
  highlights?: string[]
  visitInfo?: {
    hours?: string
    appointment?: boolean
    price?: string
    phone?: string
    website?: string
  }
  sponsorTier: SponsorTier
  images: string[]
  featured?: boolean
}

export interface Restaurant {
  slug: string
  name: string
  coords: [number, number]
  region: Region
  address?: string
  website?: string | null
  cuisine: string
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  description: string
  excerpt: string
  highlights?: string[]
  reservations?: string
  chefName?: string
  sponsorTier: SponsorTier
  images: string[]
  featured?: boolean
}

export interface Hotel {
  slug: string
  name: string
  coords: [number, number]
  region: Region
  address?: string
  category: 'resort' | 'boutique' | 'inn' | 'villa'
  priceRange: string
  description: string
  excerpt: string
  highlights?: string[]
  amenities?: string[]
  rooms?: number
  website?: string
  sponsorTier: SponsorTier
  images: string[]
  featured?: boolean
}

export interface Article {
  slug: string
  title: string
  subtitle?: string
  section: string
  region?: Region
  author?: string
  excerpt: string
  body?: string
  relatedWineries?: string[]
  relatedRestaurants?: string[]
  relatedHotels?: string[]
  sponsorTier: SponsorTier
  images: string[]
  featured?: boolean
  publishedAt: string
}

export interface Event {
  slug: string
  name: string
  description: string
  date: string
  endDate?: string
  location: string
  coords?: [number, number]
  category: 'harvest' | 'tasting' | 'festival' | 'dinner' | 'auction' | 'tour'
  price?: string
  website?: string
  sponsorTier: SponsorTier
}

export interface Sponsor {
  id: string
  name: string
  logo: string
  website: string
  tier: Exclude<SponsorTier, null>
  sections: string[] // which sections this sponsor appears in
  customContent?: {
    headline?: string
    body?: string
    cta?: string
    ctaUrl?: string
    backgroundColor?: string
    textColor?: string
  }
  active: boolean
}

/** Map pins — shared with map components (single source, no circular imports). */
export type MapPinType = 'winery' | 'restaurant' | 'hotel'

export type MapPinFilterType = MapPinType | 'all'

export type MapRegionFilter = string | 'all'
