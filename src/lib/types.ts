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
  /** TRH directory layer; if absent, use truncated `description`. */
  directoryBlurb?: string
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
  /** When true, indicates this entity has substantial Wine Spectator editorial content and should link to its detail page from directory rows. Populated editorially over time. */
  wsEditorial?: boolean
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
  /** TRH directory layer; if absent, use truncated `description`. */
  directoryBlurb?: string
  highlights?: string[]
  reservations?: string
  chefName?: string
  sponsorTier: SponsorTier
  images: string[]
  featured?: boolean
  /** When true, indicates this entity has substantial Wine Spectator editorial content and should link to its detail page from directory rows. Populated editorially over time. */
  wsEditorial?: boolean
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
  /** TRH directory layer; if absent, use truncated `description`. */
  directoryBlurb?: string
  highlights?: string[]
  amenities?: string[]
  rooms?: number
  website?: string
  sponsorTier: SponsorTier
  images: string[]
  featured?: boolean
  /** When true, indicates this entity has substantial Wine Spectator editorial content and should link to its detail page from directory rows. Populated editorially over time. */
  wsEditorial?: boolean
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

/** Magazine-style feature layout blocks (Judgment of Paris, Taco Tour, etc.). */
export interface FeatureVenue {
  name: string
  addressLines: string[]
  website?: string
  phone?: string
  description: string
  restaurantSlug?: string
  image?: string
  /** Map pin — [lng, lat]. Falls back to `restaurantSlug` in restaurants data when omitted. */
  coords?: [number, number]
  /** Additional pins for multi-location venues (e.g. Azteca). */
  extraMapLocations?: Array<{ coords: [number, number]; label?: string }>
}

export interface FeatureWinePick {
  name: string
  detail: string
}

export interface FeatureTermGroup {
  title: string
  intro?: string
  items: string[]
}

export interface FeatureArticleContent {
  kicker?: string
  pullQuote?: string
  pullQuoteLines?: string[]
  introParagraphs: string[]
  outroParagraphs?: string[]
  venues?: FeatureVenue[]
  winePicks?: FeatureWinePick[]
  termGroups?: FeatureTermGroup[]
  heroImage: string
  heroObjectPosition?: string
  secondaryImage?: string
  /** Optional caption below secondary image group (e.g. Judgment bottle stills). */
  secondaryImagesCaption?: string
  secondaryImages?: Array<{ src: string; alt?: string; width?: number; height?: number }>
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

/** Explore map listing category (winery / dining / stay). */
export type MapListingCategory = 'winery' | 'dining' | 'stay'

export interface ItineraryStop {
  order: number
  name: string
  category: 'winery' | 'dining' | 'stay' | 'sight'
  coords: [number, number]
  blurb: string
  detailSlug?: string
  /** Editorial listing still (`/images/...` from Drive import). */
  image?: string
}

export interface Itinerary {
  id: string
  title: string
  intro: string
  travelMode: 'driving' | 'walking'
  stops: ItineraryStop[]
  /** Closing editorial copy after the last stop (when present in source adventure). */
  outro?: string
  /** Magazine-style eyebrow (e.g. "An Oakville Adventure"). */
  eyebrow?: string
  byline?: string
  issue?: string
  /** Parent adventure title when the region has multiple routes. */
  seriesTitle?: string
  /** Parent adventure deck when the region has multiple routes. */
  seriesIntro?: string
  /** Parent adventure deck paragraphs (sidebar preamble when present). */
  seriesIntroParagraphs?: string[]
  /** Section label from numbered adventure body (when distinct from title). */
  sectionLabel?: string
  /** Intro split into editorial paragraphs. */
  introParagraphs?: string[]
}
