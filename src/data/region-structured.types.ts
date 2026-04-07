/* ── Region Magazine Data Types ─────────────────────────────────────
 * Models the Wine Spectator magazine layout: featured listings with
 * full editorial + photos, "Also Recommended" sidebar listings,
 * sub-regions, adventures, and special sections.
 * ──────────────────────────────────────────────────────────────────── */

export interface FeaturedListing {
  name: string;
  slug?: string;              // links to /wineries/[slug], /dining/[slug], etc.
  address: string;
  website?: string;
  phone?: string;
  category?: string;          // e.g. "Breakfast/Coffee/Sandwiches/Snacks"
  image: string;              // placeholder path for now
  writeup: string;            // full editorial paragraph
}

export interface SidebarListing {
  name: string;
  slug?: string;
  address: string;
  website?: string;
}

export interface SubRegion {
  name: string;               // e.g. "Stags Leap District", "Carneros"
  intro?: string;
  featured: FeaturedListing[];
  alsoRecommended: SidebarListing[];
}

export interface TasteSection {
  intro: string;
  subRegions?: SubRegion[];   // if region has sub-AVAs (Yountville, Downtown Napa)
  featured: FeaturedListing[];
  alsoRecommended: SidebarListing[];
}

export interface EatSection {
  intro: string;
  featured: FeaturedListing[];
  alsoRecommended: SidebarListing[];
  breakfastCoffee?: {
    featured: FeaturedListing[];
    alsoRecommended: SidebarListing[];
  };
}

export interface StaySection {
  intro: string;
  featured: FeaturedListing[];
  alsoRecommended: SidebarListing[];
}

export interface Adventure {
  title: string;              // e.g. "Culinary Delights"
  number: number;             // 1, 2, 3...
  image: string;
  narrative: string;          // full text with **bold** venue names
}

export interface SpecialSection {
  title: string;              // e.g. "Public Art & Rural Charm", "The Oxbow Market"
  intro?: string;
  narrative: string;
  featured?: FeaturedListing[];
  alsoRecommended?: SidebarListing[];
}

export interface RegionMagazineData {
  slug: string;
  title: string;              // e.g. "YOUNTVILLE"
  subtitle: string;           // e.g. "World-Class Dining"
  author: string;
  heroImage: string;
  lede: string;               // opening editorial paragraphs
  tip?: string;               // callout box tip
  taste: TasteSection;
  eat: EatSection;
  stay?: StaySection;         // Pritchard Hill has no stay section
  adventures: Adventure[];
  specialSections?: SpecialSection[];
}
