import type { ReactNode } from 'react'

export type RegionCoordinates = {
  lat: number
  lng: number
}

/** Optional editorial marquee copy per section; missing keys fall back to section labels in the template. */
export type RegionMarqueePhrases = {
  taste?: string
  eat?: string
  stay?: string
  sidebar?: string
}

export type RegionMdxFrontmatter = {
  slug: string
  region: string
  tagline: string
  byline: string
  issue: string
  dek: string
  heroImage: string
  /** Optional portrait crop for narrow viewports (art-directed hero). */
  heroImagePortrait?: string
  heroCredit?: string
  coordinates: RegionCoordinates
  relatedFeatures: string[]
  /** Reserved for online-exclusive eyebrow; ignored in UI for now. */
  exclusiveToOnline?: boolean
  marqueePhrases?: RegionMarqueePhrases
}

/** Used for map pin color / legend. */
export type DirectoryCategory = 'winery' | 'restaurant' | 'hotel'

export type TastingDirectoryRow = {
  name: string
  address: string
  website: string
  /** Null until batch geocode fills MDX */
  coordinates: RegionCoordinates | null
  category: DirectoryCategory
}

export type EditorialFeature = {
  name: string
  address?: string
  website?: string
  body: ReactNode
  /** Plain-text body for directory excerpts */
  bodyPlain?: string
  imagePosition: 'left' | 'right'
  /** From MDX `**Image:**` or placeholders */
  image?: string
  /** From MDX `**ImagePortrait:**` when both crops exist */
  imagePortrait?: string
}

export type RelatedStoryCard = {
  href: string
  image: string
  eyebrow: string
  title: string
  dek: string
}

export type LoadedRegionMdx = {
  /** Display line for magazine sidebar (derived from MDX H1 key, no “Sidebar:” prefix). */
  sidebarHeading: string
  frontmatter: RegionMdxFrontmatter
  lede: ReactNode
  featuredWineries: EditorialFeature[]
  tastingDirectory: TastingDirectoryRow[]
  featuredRestaurants: EditorialFeature[]
  /** Breakfast / coffee / snacks H3 blocks (not main restaurant picks). */
  coffeeSnackFeatures: EditorialFeature[]
  breakfast: EditorialFeature | null
  restaurantDirectory: TastingDirectoryRow[]
  featuredHotels: EditorialFeature[]
  lodgingDirectory: TastingDirectoryRow[]
  sidebar: ReactNode | null
  /** Plain-text sidebar for teasers */
  sidebarPlain?: string
  /** Raw sidebar MDX body (server-side itinerary enrichment) */
  sidebarMd?: string
  /** Plain-text lede paragraphs */
  ledePlain?: string[]
  related: RelatedStoryCard[]
}
