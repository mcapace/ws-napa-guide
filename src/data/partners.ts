import type { Region } from '@/lib/types'

export type PartnerExperience = {
  title: string
  description: string
  price?: string
  details?: string[]
}

export type PartnerDestination = {
  slug: string
  name: string
  brandLabel: string
  regionSlug: Region
  regionName: string
  /** Names that should deep-link from region featured cards. */
  matchNames: string[]
  description: string
  featuredWines: string
  sellingPoints: string[]
  experiences: PartnerExperience[]
  addressLines: string[]
  hours: string
  phone: string
  email: string
  website: string
  bookUrl: string
  wineClubUrl: string
  photoCredit: string
  heroImage: string
  /** Optional brand mark for the destination hero (transparent PNG preferred). */
  logoSrc?: string
  logoAlt?: string
  gallery: Array<{ src: string; alt: string }>
  coords: [number, number] // [lng, lat]
}

const HALL_WINE_CLUB = 'https://hallwines.com/pages/join-membership/membership-with-hall'
const WALT_WINE_CLUB = 'https://waltwines.com/pages/join-membership/membership-with-walt'

function gallery(slug: string, alts: string[]) {
  return alts.map((alt, i) => ({
    src: `/images/partners/${slug}/gallery-${String(i + 1).padStart(2, '0')}.jpg`,
    alt,
  }))
}

export const partners: PartnerDestination[] = [
  {
    slug: 'hall-st-helena',
    name: 'HALL St. Helena',
    brandLabel: 'HALL Wines',
    regionSlug: 'st-helena',
    regionName: 'St. Helena',
    matchNames: ['HALL Napa Valley', 'HALL St. Helena', 'HALL Wines'],
    description:
      'Located at the historic Bergfeld Vineyard at the base of the Mayacamas Mountains, HALL St. Helena is a vibrant, 33-acre property off of Highway 29 in the charming town of St. Helena. Guests arrive with an official welcome from (not so little) Bunny Foo-Foo and instantly experience a one-of-a-kind destination.',
    featuredWines: 'Cabernet Sauvignon, Sauvignon Blanc',
    sellingPoints: [
      'HALL produces some of the most distinctive wines from Napa Valley—best known for highly awarded Cabernet Sauvignons that are pure expressions of place.',
      'Avid lifelong art collectors Craig and Kathryn Hall invite guests to enjoy expressive contemporary art alongside world-class wines.',
      'Complete your tasting journey with seasonal culinary bites crafted to complement every sip.',
      "HALL's estate vineyards span more than 500 acres planted to classic Bordeaux varietals, farmed with sustainable practices and advanced vineyard technology.",
      'The HALL St. Helena winery was the first in California to achieve LEED® Gold Certification (2009), with another gold certification for its gravity-flow facility and tasting room in 2014.',
    ],
    experiences: [
      {
        title: 'Signature Tour — A Walk Through Winemaking',
        description:
          "A guided stroll through HALL's vineyards and winemaking facilities, followed by a seated tasting of four award-winning wines paired with three seasonal culinary bites. Afterward, enjoy bocce, croquet, or cornhole on the grounds.",
        price: '$60 per person',
        details: ['Maximum of six guests', 'Must be 21+', 'Complimentary for members and Partners (up to four)'],
      },
      {
        title: 'Reflections of the Valley — Bar Tasting',
        description:
          'A curated flight of award-winning Cabernet Sauvignons at the modern gallery bar with vineyard views—a relaxed 45-minute experience. Add cheese, charcuterie, pizza, or caviar pairings.',
        price: '$45 per person',
        details: ['Maximum of six guests', 'Complimentary for members and Partners (up to four)'],
      },
      {
        title: 'Cabernet Collector Experience',
        description:
          "Explore Napa's premier mountain appellations through HALL's top-rated Cabernets, beginning with Tsar Nicoulai Osetra caviar and continuing with Appellation Cabernets paired with chef-crafted small plates.",
        price: '$90 per guest',
        details: ['Maximum of four guests', 'By appointment', '24-hour cancellation requested'],
      },
      {
        title: 'Platinum Experience — Expressions of Place',
        description:
          'An intimate seated tasting of the Platinum Collection and top-rated Artisan Collection Cabernets, each paired with an elegant progression of six chef-curated seasonal bites including Osetra caviar.',
        price: '$200 per guest',
        details: ['Maximum of four guests', 'By appointment only'],
      },
      {
        title: 'Members Lounge',
        description:
          'A vineyard-side retreat exclusively for members—limited-production wines in a relaxed lounge setting, with lawn games and optional pairing add-ons.',
        price: 'Complimentary for members (up to four)',
        details: ['Members and Partners only', '60–90 minutes', 'Maximum of six guests'],
      },
    ],
    addressLines: ['401 St. Helena Hwy. South', 'St. Helena, CA 94574'],
    hours: 'Open daily 10am–5:30pm',
    phone: '(707) 967-2626',
    email: 'info@hallwines.com',
    website: 'https://hallwines.com/',
    bookUrl: 'https://hallwines.com/pages/book-hall-st-helena',
    wineClubUrl: HALL_WINE_CLUB,
    photoCredit: 'HALL Wines',
    heroImage: '/images/partners/hall-st-helena/hero.jpg',
    logoSrc: '/images/partners/hall-st-helena/logo.png',
    logoAlt: 'HALL Napa Valley',
    gallery: gallery('hall-st-helena', [
      'Guests with Cabernet beside contemporary art at HALL St. Helena',
      'Aerial view of the HALL St. Helena estate and vineyards',
      'The modern tasting bar and gallery at HALL St. Helena',
      'Outdoor tasting with vineyard views at HALL St. Helena',
      'Private seated tasting in the HALL St. Helena lounge',
      'Contemporary sculpture on the HALL St. Helena grounds',
      'Garden sculpture path at HALL St. Helena',
      'The historic stone winery building at HALL St. Helena',
    ]),
    coords: [-122.453057, 38.488972],
  },
  {
    slug: 'hall-rutherford',
    name: 'HALL Rutherford',
    brandLabel: 'HALL Wines',
    regionSlug: 'rutherford',
    regionName: 'Rutherford',
    matchNames: ['HALL Rutherford'],
    description:
      'Tucked into the mountainside of the Vaca Mountain Range lies the HALL Rutherford Estate and Caves. Based on limited availability, you can enjoy a tour of the estate, world-class production facility, and bask in the beauty and allure of the famous Chandelier Room. Reservations are necessary, and all experiences are hosted privately.',
    featuredWines: 'Cabernet Sauvignon, Sauvignon Blanc',
    sellingPoints: [
      'The wine cave spans 14,000 square feet of repurposed Austrian bricks, centered on Donald Lipski\'s chandelier "Chilean Red"—designed to resemble the root system of an ancient vine.',
      'The caves provide stable temperature and moisture ideal for aging and storing wine in barrel.',
      'Walk among the vines of the legendary Sacrashe Vineyard, home of many 100-point wines.',
      'Create an unforgettable wine-and-food experience in the HALL Rutherford Wine Cave, with dishes thoughtfully paired to top-tier wines.',
    ],
    experiences: [
      {
        title: 'Private Valley View Tasting',
        description:
          'A seated flight of hand-selected current-release Cabernet Sauvignons with artisan cheese accompaniment in the upstairs tasting salon—panoramic vineyard views, no cave tour.',
        price: '$125 per guest',
        details: ['60–75 minutes', 'Up to six guests', 'By appointment'],
      },
      {
        title: 'Private Platinum Experience',
        description:
          'An exclusive cave and Chandelier Room tour concluding with a private tasting of the Platinum Collection—limited to just 12 barrels of the finest Cabernet Sauvignon from each vintage—paired with seasonal bites from La Toque.',
        price: '$300 per guest',
        details: ['90 minutes', 'By appointment only', '20% off for Members (up to 4)'],
      },
      {
        title: 'Shared Appellation Exploration',
        description:
          "A 90-minute shared tour including Sacrashe Vineyard, concluding with a seated tasting in the Chandelier Room accompanied by artisan cheeses and charcuterie—discovering Napa's diverse appellations through limited-production wines.",
        price: '$150 per guest',
        details: ['Daily at 12:30pm with advance reservation', 'Shared with other guests'],
      },
      {
        title: 'Private Appellation Exploration',
        description:
          'The flagship private tour and tasting: estate and Sacrashe Vineyard, then a seated Chandelier Room tasting with cheese and charcuterie.',
        price: '$175 per guest',
        details: ['90 minutes', 'By appointment', '20% off for Members (up to 4)'],
      },
    ],
    addressLines: ['56 Auberge Road', 'Rutherford, CA 94573'],
    hours: 'Open daily 10am–5:30pm',
    phone: '(707) 967-2626',
    email: 'hturner@hallwines.com',
    website: 'https://hallwines.com/',
    bookUrl: 'https://hallwines.com/pages/book-hall-rutherford',
    wineClubUrl: HALL_WINE_CLUB,
    photoCredit: 'HALL Wines',
    heroImage: '/images/partners/hall-rutherford/hero.jpg',
    gallery: gallery('hall-rutherford', [
      'HALL Rutherford estate',
      'HALL Rutherford caves',
      'Chandelier Room at HALL Rutherford',
      'Sacrashe Vineyard views',
      'HALL Rutherford tasting experience',
      'Estate grounds at HALL Rutherford',
      'Wine cave detail',
      'HALL Rutherford hospitality',
    ]),
    coords: [-122.40149, 38.49714],
  },
  {
    slug: 'walt-napa-oxbow',
    name: 'WALT Napa Oxbow',
    brandLabel: 'WALT Wines',
    regionSlug: 'downtown-napa',
    regionName: 'Downtown Napa',
    matchNames: ['WALT Napa Oxbow', 'WALT Wines'],
    description:
      "Our WALT Napa Oxbow tasting room features a beautiful bar, lovely private spaces, and modern works of art from the Hall's personal collection. This intimate venue is located in the historic Oxbow district just across the street from the Oxbow Public Market. While here, our passionate tasting room staff will guide your journey of Pinot Noir and Chardonnay wines crafted from the most expressive vineyards along the Pacific Coast.",
    featuredWines: 'Pinot Noir, Chardonnay, Champagne',
    sellingPoints: [
      'An intimate Oxbow tasting room with a beautiful bar, private spaces, and contemporary art from the Hall collection—steps from Oxbow Public Market.',
      'Experience single-vineyard Pinots spanning Oregon to California—literally tasting 1,000 Miles of Pinot.',
      'Kathryn Walt Hall grew up in the vineyard and carries family traditions into every WALT bottle.',
      'Elevate tastings with caviar, chips and dip, cheeses, and charcuterie—or explore Michel Foch Champagne.',
      'Michel Foch Champagne bridges Napa and Champagne: finesse, precision, and depth from historic French vineyards.',
    ],
    experiences: [
      {
        title: 'Member Exclusive Flight',
        description:
          'Selections from all four esteemed wine brands, with optional small bites. Non-members who book this experience receive the Current Release flight.',
        price: 'Complimentary for Members and Partners (up to four)',
        details: ['45–60 minutes', '$60 for each additional guest'],
      },
      {
        title: 'Michel Foch Champagne Flight',
        description:
          'Three exceptional Michel Foch Champagnes—from multi-vintage Brut to aged vintage cuvées—with optional caviar, charcuterie, or cream biscuits and jam.',
        price: '$80 per guest',
        details: ['Available daily 11:00am–4:30pm', 'Complimentary for Members (up to four)'],
      },
      {
        title: 'Root 101 Wine & Food Pairing',
        description:
          'A flight of single-vineyard Pinot Noirs paired with seasonal bites from Michelin-rated La Toque.',
        price: '$85 per guest',
        details: ['Thursday–Sunday at 11:30am & 2:30pm', 'Advance reservations required'],
      },
      {
        title: 'Wine & Chocolate Pairing',
        description:
          'Pinot Noir paired with hand-crafted Earth & Sky Chocolates.',
        price: '$60 per guest',
        details: ['Daily 11am–5:30pm (last tasting 4:30pm)', '20% off for Members (up to four)'],
      },
      {
        title: 'Current Release',
        description:
          "WALT's latest Pinot Noirs and Chardonnays from West Coast premier sites—add charcuterie, chips and dip, or caviar.",
        price: '$40 per guest',
        details: ['Daily 11am–5:30pm (last tasting 4:30pm)', 'Complimentary for Members (up to four)'],
      },
    ],
    addressLines: ['605 First Street', 'Napa, CA'],
    hours: '11am–5:30pm · Walk-ins welcome; reservations recommended',
    phone: '(707) 721-8620',
    email: 'info@waltwines.com',
    website: 'https://waltwines.com/',
    bookUrl: 'https://waltwines.com/pages/book-walt-napa-oxbow',
    wineClubUrl: WALT_WINE_CLUB,
    photoCredit: 'WALT Wines',
    heroImage: '/images/partners/walt-napa-oxbow/hero.jpg',
    gallery: gallery('walt-napa-oxbow', [
      'WALT Napa Oxbow tasting room',
      'WALT bar and lounge',
      'Contemporary art at WALT Oxbow',
      'WALT Pinot Noir tasting',
      'Private tasting space at WALT',
      'Oxbow district hospitality',
      'WALT tasting experience',
      'WALT Napa Oxbow interior',
    ]),
    coords: [-122.28105, 38.30116],
  },
]

export function getPartner(slug: string): PartnerDestination | undefined {
  return partners.find((p) => p.slug === slug)
}

export function getAllPartnerSlugs(): string[] {
  return partners.map((p) => p.slug)
}

function normalizePartnerName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[’']/g, '')
    .trim()
}

/** Resolve a featured listing name (and optional region) to a partner page path. */
export function partnerPathForName(name: string, regionSlug?: string): string | null {
  const n = normalizePartnerName(name)
  const candidates = partners.filter((p) => {
    if (regionSlug && p.regionSlug !== regionSlug) return false
    return p.matchNames.some((m) => {
      const nm = normalizePartnerName(m)
      return nm === n || (nm.length >= 4 && n.length >= 4 && (n.includes(nm) || nm.includes(n)))
    })
  })
  // Prefer exact region match; if "HALL" alone matched multiple, require longer name
  if (candidates.length === 1) return `/partners/${candidates[0].slug}`
  if (candidates.length > 1 && regionSlug) {
    const regional = candidates.find((c) => c.regionSlug === regionSlug)
    if (regional) return `/partners/${regional.slug}`
  }
  return null
}
