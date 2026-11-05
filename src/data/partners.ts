import type { Region } from '@/lib/types'
import { getPartnerGallery, type PartnerGalleryShot } from '@/data/partner-galleries'

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
  /** Strong editorial image for the property intro (defaults to first estate shot). */
  introImage?: string
  /** Short headline above the property description. */
  introHeadline?: string
  /** Optional brand mark for the destination hero (transparent PNG preferred). */
  logoSrc?: string
  logoAlt?: string
  gallery: PartnerGalleryShot[]
  coords: [number, number] // [lng, lat]
}

const HALL_WINE_CLUB = 'https://hallwines.com/pages/join-membership/membership-with-hall'
const WALT_WINE_CLUB = 'https://waltwines.com/pages/join-membership/membership-with-walt'

export const partners: PartnerDestination[] = [
  {
    slug: 'hall-st-helena',
    name: 'HALL St. Helena',
    brandLabel: 'HALL Wines',
    regionSlug: 'st-helena',
    regionName: 'St. Helena',
    matchNames: ['HALL Napa Valley', 'HALL St. Helena', 'HALL Wines'],
    description:
      'Located at the historic Bergfeld Vineyard at the base of the Mayacamas Mountains, HALL St.\u00a0Helena is a vibrant, 33-acre property off of Highway 29 in the charming town of St.\u00a0Helena. Guests arrive with an official welcome from (not so little) Bunny Foo-Foo and instantly experience a one-of-a-kind destination.',
    introHeadline: 'Art, architecture, and Cabernet at Bergfeld Vineyard',
    introImage: '/images/partners/hall-st-helena/gallery-18.jpg',
    featuredWines: 'Cabernet Sauvignon, Sauvignon Blanc',
    sellingPoints: [
      'HALL produces some of the most distinctive wines from Napa Valley—best known for highly awarded Cabernet Sauvignons that are pure expressions of place.',
      'Avid lifelong art collectors Craig and Kathryn Hall invite guests to enjoy expressive contemporary art alongside world-class wines.',
      'Complete your tasting journey with seasonal culinary bites crafted to complement every sip.',
      "HALL's estate vineyards span more than 500 acres planted to classic Bordeaux varietals, farmed with sustainable practices and advanced vineyard technology.",
      'The HALL St. Helena winery was the first in California to achieve LEED® Gold Certification (2009), with another gold certification for its gravity-flow facility and tasting room in 2014. Estate vineyards are certified sustainable (CSWA and Fish Friendly Farming), with 1.5 acres of rooftop solar.',
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
    gallery: getPartnerGallery('hall-st-helena'),
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
      'Tucked into the mountainside of the Vaca Mountain Range lies the HALL Rutherford Estate and Caves. Based on limited availability, you can enjoy a tour of the estate, world-class production facility, and bask in the beauty and allure of the famous Chandelier Room. Reservations are necessary, and all experiences are hosted privately. We look forward to sharing this hidden Napa Valley gem with you.',
    introHeadline: 'Caves, chandeliers, and Sacrashe Vineyard',
    introImage: '/images/partners/hall-rutherford/gallery-01.jpg',
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
        details: [
          'Daily at 12:30pm with advance reservation',
          'Shared with other guests',
          '20% off for Members (up to 4)',
          'Complimentary for Partners (up to 2)',
        ],
      },
      {
        title: 'Private Appellation Exploration',
        description:
          'The flagship private tour and tasting: estate and Sacrashe Vineyard, then a seated Chandelier Room tasting with cheese and charcuterie.',
        price: '$175 per guest',
        details: ['90 minutes', 'By appointment', '20% off for Members (up to 4)', '$100 for Partners (up to 4)'],
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
    logoSrc: '/images/partners/hall-rutherford/logo.png',
    logoAlt: 'HALL Napa Valley',
    gallery: getPartnerGallery('hall-rutherford'),
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
    introHeadline: 'Single-vineyard Pinot in the heart of the Oxbow',
    introImage: '/images/partners/walt-napa-oxbow/gallery-10.jpg',
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
        details: ['Thursday–Sunday at 11:30am & 2:30pm', 'Advance reservations required', '20% off for Members (up to four)'],
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
    hours: '11am–5:30pm · Walk-ins welcome; reservations recommended. Call for groups larger than four or same-day reservations.',
    phone: '(707) 721-8620',
    email: 'info@waltwines.com',
    website: 'https://waltwines.com/',
    bookUrl: 'https://waltwines.com/pages/book-walt-napa-oxbow',
    wineClubUrl: WALT_WINE_CLUB,
    photoCredit: 'WALT Wines',
    heroImage: '/images/partners/walt-napa-oxbow/hero.jpg',
    logoSrc: '/images/partners/walt-napa-oxbow/logo.png',
    logoAlt: 'WALT Wines',
    gallery: getPartnerGallery('walt-napa-oxbow'),
    coords: [-122.28105, 38.30116],
  },
  {
    slug: 'groth',
    name: 'Groth Vineyards & Winery',
    brandLabel: 'Groth Vineyards',
    regionSlug: 'oakville',
    regionName: 'Oakville',
    matchNames: ['Groth Vineyards & Winery', 'Groth Vineyards', 'Groth'],
    description:
      'Set among majestic oaks on Oakville Cross Road, Groth Vineyards & Winery is a family-owned and operated estate in the heart of Napa Valley’s most celebrated Cabernet country. Guests are welcomed into a landmark California Mission–style winery to taste the wines that put Oakville—and the Groth family—on the map.',
    introHeadline: 'Family-owned Cabernet country since 1981',
    introImage: '/images/partners/groth/gallery-09.jpg',
    featuredWines: 'Reserve Cabernet Sauvignon, Oakville Cabernet Sauvignon, Sauvignon Blanc, Chardonnay',
    sellingPoints: [
      'Family-owned and operated for more than four decades, with the founding Groth family still living on its Oakville estate.',
      'Oakville’s pink California Mission–style winery—a Napa Valley landmark since 1990—set among majestic oaks and estate vines.',
      'Two sustainably farmed estates totaling 165 acres in Oakville and the Oak Knoll District, producing Cabernet Sauvignon, Sauvignon Blanc and Chardonnay.',
      'The 1985 Groth Reserve Cabernet Sauvignon earned a perfect 100-point score—the first ever awarded to an American wine—and the Reserve remains the defining expression of the estate.',
      'Experiences for every kind of visitor, from a 45-minute introduction to library tastings, vineyard ATV tours, and a family-friendly tasting where kids get their own seat at the table.',
    ],
    experiences: [
      {
        title: 'A Taste of Groth',
        description:
          'The perfect introduction to the estate—a guided flight of winery-exclusive and limited-production wines that traces the Groth family’s four-decade dedication to Cabernet Sauvignon, Sauvignon Blanc and Chardonnay.',
        price: '$50 per person',
        details: ['45 minutes', 'Up to six guests', 'By reservation'],
      },
      {
        title: 'Family Table at Groth',
        description:
          'A family-friendly tasting that welcomes guests of all ages. Adults are guided through a selection of estate wines while younger guests enjoy their own place at the table with a seasonal snack and grape juice—set on the patio or overlooking the vines.',
        price: '$50 per adult · Children complimentary',
        details: ['Up to six guests, adults and children included', 'By reservation'],
      },
      {
        title: 'Oakville Roots',
        description:
          'A deeper look at the estate’s origins, centered on Oakcross, a small-production Bordeaux-style red blend tied to the family’s earliest chapter in Oakville. Taste multiple vintages of Oakcross alongside the Oakville Cabernet Sauvignon, plus a single varietal component of the blend.',
        price: '$75 per person',
        details: ['60 minutes', 'Up to six guests', 'By reservation'],
      },
      {
        title: 'Cabernet for the Ages — Library Tasting',
        description:
          'Experience more than 40 years of winemaking through a selection of library Cabernets pulled from the Groth family cellar, and discover how each vintage evolves to reveal the balance, complexity and ageability of Oakville Cabernet Sauvignon.',
        price: '$100 per person',
        details: ['90 minutes', 'Up to six guests', 'By reservation'],
      },
    ],
    addressLines: ['750 Oakville Cross Road', 'Oakville, CA 94562'],
    hours: 'Open daily by appointment',
    phone: '(707) 754-4254',
    email: 'concierge@grothwines.com',
    website: 'https://grothwines.com/',
    bookUrl: 'https://grothwines.com/visit',
    wineClubUrl: 'https://grothwines.com/club',
    photoCredit: 'Groth Vineyards & Winery',
    heroImage: '/images/partners/groth/hero.jpg',
    logoSrc: '/images/partners/groth/logo.png',
    logoAlt: 'Groth Vineyards & Winery',
    gallery: getPartnerGallery('groth'),
    coords: [-122.40182, 38.43488],
  },
  {
    slug: 'silverado',
    name: 'Silverado Vineyards',
    brandLabel: 'Silverado Vineyards',
    regionSlug: 'yountville',
    regionName: 'Stags Leap District',
    matchNames: ['Silverado Vineyards'],
    description:
      'Silverado Vineyards is a historic Napa Valley estate rooted in the Stags Leap District, where its namesake vineyard was among the first to plant Cabernet Sauvignon in the 1960s. Founded in 1981 by Ron and Diane Miller and Lillian Disney, Silverado built its reputation on estate-grown wines that express some of Napa Valley’s most celebrated vineyard sites.',
    introHeadline: 'A founding estate of the Stags Leap District',
    introImage: '/images/partners/silverado/gallery-07.jpg',
    featuredWines: 'Estate Cabernet Sauvignon, SOLO, GEO, Sauvignon Blanc, Chardonnay',
    sellingPoints: [
      'A historic Stags Leap District estate, founded in 1981 by Ron and Diane Miller and Lillian Disney, built on estate-grown wines from some of Napa Valley’s most celebrated sites.',
      'Home to the rare Disney-Silverado Heritage clone—one of only three Cabernet Sauvignon selections granted Heritage status by UC Davis, and the only one from the Stags Leap District.',
      'More than 300 acres farmed across the Stags Leap District, Yountville, Coombsville, Carneros and Napa Valley, expressed in iconic wines including SOLO and GEO.',
      'Hosted, seated tastings framed by sweeping Stags Leap District vineyard views—from an approachable Discovery flight to library Cabernets and a white-wine-and-caviar experience.',
      'A new chapter under Foley Family Wines & Spirits since 2022, with winemaker Alison Rodriguez carrying forward more than four decades of craftsmanship and vineyard stewardship.',
    ],
    experiences: [
      {
        title: 'Silverado Discovery Tasting',
        description:
          'A relaxed introduction to Silverado Vineyards in the heart of the Stags Leap District. Three estate-grown wines offer a welcoming snapshot of the historic property and its vineyard-driven winemaking, enjoyed in the salon amid sweeping vineyard views with an estate wine educator.',
        price: '$50 per guest',
        details: ['45–60 minutes', 'Walk-ins welcome'],
      },
      {
        title: 'The Estate Collection Experience',
        description:
          'A hosted, seated tasting designed to showcase the depth and character of Silverado Vineyards. Framed by sweeping views of the Stags Leap District, it features small-production, estate-grown wines that highlight the winemaking style, estate history and the distinctive qualities of each vineyard-driven bottling.',
        price: '$85 per guest',
        details: ['90 minutes', 'For parties of up to six guests'],
      },
      {
        title: 'White Wine and Caviar Experience',
        description:
          'A hosted white-wine and caviar tasting—an exquisite way to experience the portfolio of white wines alongside chef-selected caviar with house-made potato chips and indulgent crème fraîche.',
        price: '$115 per guest',
        details: ['90 minutes', 'For parties of two (up to six by request)'],
      },
      {
        title: 'Legacy Cabernet Experience',
        description:
          'Explore the top Cabernet expressions from the renowned Stags Leap District and Coombsville. Savor library estate Cabernets crafted from the Disney-Silverado Heritage clone, with a guided tour and an artisan cheese and charcuterie board.',
        price: '$145 per guest',
        details: ['90 minutes', 'Daily at 10am and 1:30pm', 'Up to six guests'],
      },
    ],
    addressLines: ['6121 Silverado Trail', 'Napa, CA 94558'],
    hours: 'Open daily 10am–3:30pm',
    phone: '(707) 257-1770',
    email: 'concierge@silveradovineyards.com',
    website: 'https://www.silveradovineyards.com/',
    bookUrl: 'https://www.silveradovineyards.com/experiences',
    wineClubUrl: 'https://www.silveradovineyards.com/membership/',
    photoCredit: 'Silverado Vineyards',
    heroImage: '/images/partners/silverado/hero.jpg',
    logoSrc: '/images/partners/silverado/logo.png',
    logoAlt: 'Silverado Vineyards',
    gallery: getPartnerGallery('silverado'),
    coords: [-122.33389, 38.39664],
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
