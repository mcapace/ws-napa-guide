import type { ReactNode } from 'react'

export type RegionCoordinates = {
  lat: number
  lng: number
}

export type RegionMdxFrontmatter = {
  slug: string
  region: string
  tagline: string
  byline: string
  issue: string
  dek: string
  heroImage: string
  heroCredit?: string
  coordinates: RegionCoordinates
  relatedFeatures: string[]
  /** Reserved for online-exclusive eyebrow; ignored in UI for now. */
  exclusiveToOnline?: boolean
}

export type TastingDirectoryRow = {
  name: string
  address: string
  website: string
  /** Null until batch geocode fills MDX */
  coordinates: RegionCoordinates | null
}

export type EditorialFeature = {
  name: string
  address?: string
  website?: string
  body: ReactNode
  imagePosition: 'left' | 'right'
  /** From MDX later; until then loadRegionMdx assigns /public test placeholders */
  image?: string
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
  breakfast: EditorialFeature | null
  featuredHotels: EditorialFeature[]
  lodgingDirectory: TastingDirectoryRow[]
  sidebar: ReactNode
  related: RelatedStoryCard[]
}
