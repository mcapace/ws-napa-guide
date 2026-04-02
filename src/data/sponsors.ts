import type { Sponsor } from '@/lib/types'

// ─────────────────────────────────────────────────────────────
// SPONSOR CONFIGURATION
// This is the ONLY place sponsor data lives.
// Toggle active: false to disable a sponsor without touching components.
// sections[] controls which pages/sections a sponsor appears in.
// ─────────────────────────────────────────────────────────────

export const sponsors: Sponsor[] = [
  // Example presenting sponsor — uncomment and fill in when activated
  // {
  //   id: 'presenting-sponsor',
  //   name: 'Sponsor Name',
  //   logo: '/sponsors/sponsor-logo.svg',
  //   website: 'https://sponsor.com',
  //   tier: 'presenting',
  //   sections: ['home', 'map', 'wineries'],
  //   customContent: {
  //     headline: 'Discover Napa with Sponsor Name',
  //     body: 'Custom sponsor message goes here.',
  //     cta: 'Learn More',
  //     ctaUrl: 'https://sponsor.com/napa',
  //   },
  //   active: true,
  // },

  // Example featured sponsor
  // {
  //   id: 'featured-hotel-sponsor',
  //   name: 'Hotel Name',
  //   logo: '/sponsors/hotel-logo.svg',
  //   website: 'https://hotel.com',
  //   tier: 'featured',
  //   sections: ['stay', 'yountville'],
  //   customContent: {
  //     headline: 'Stay in the Heart of Wine Country',
  //     body: 'Experience Napa\'s finest hospitality.',
  //     cta: 'Book Now',
  //     ctaUrl: 'https://hotel.com/book',
  //   },
  //   active: true,
  // },
]

// Helper: get active sponsors for a given section
export const getSponsorsForSection = (section: string): Sponsor[] =>
  sponsors.filter((s) => s.active && s.sections.includes(section))

// Helper: get presenting sponsor for a section (max 1)
export const getPresentingSponsor = (section: string): Sponsor | null =>
  sponsors.find(
    (s) => s.active && s.tier === 'presenting' && s.sections.includes(section)
  ) ?? null

// Helper: get featured sponsors for a section
export const getFeaturedSponsors = (section: string): Sponsor[] =>
  sponsors.filter(
    (s) => s.active && s.tier === 'featured' && s.sections.includes(section)
  )

// Helper: check if any presenting sponsor is active sitewide
export const hasPresentingSponsor = (): boolean =>
  sponsors.some((s) => s.active && s.tier === 'presenting')
