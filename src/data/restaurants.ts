import type { Restaurant } from '@/lib/types'

export const restaurants: Restaurant[] = [
  // ── YOUNTVILLE ──
  {
    slug: 'french-laundry',
    name: 'The French Laundry',
    coords: [-122.3621, 38.4045],
    region: 'yountville',
    cuisine: 'American tasting menu',
    priceRange: '$$$$',
    description: 'Thomas Keller\'s legendary restaurant remains the pinnacle of American fine dining — a three-Michelin-star institution where nine-course tasting menus unfold with clockwork precision in a converted 19th-century steam laundry.',
    excerpt: 'The undisputed apex of American fine dining. Reserve months in advance.',
    chefName: 'Thomas Keller',
    highlights: ['Three Michelin stars', 'Garden across the street', 'Iconic cheese cart'],
    reservations: 'https://exploretock.com/thefrenchlaundry',
    sponsorTier: null,
    images: ['/placeholders/restaurant-fine.jpg'],
    featured: true,
  },
  {
    slug: 'bouchon',
    name: 'Bouchon Bistro',
    coords: [-122.3634, 38.4032],
    region: 'yountville',
    cuisine: 'French bistro',
    priceRange: '$$$',
    description: 'Keller\'s more approachable sibling to The French Laundry delivers impeccable French bistro classics — steak frites, croque monsieur, pristine oysters — in a warm, bustling room that transports you to Paris.',
    excerpt: 'Keller\'s bistro: Paris in Yountville, with the valley\'s best steak frites.',
    chefName: 'Thomas Keller',
    highlights: ['Classic French bistro', 'Exceptional wine list', 'Late-night menu'],
    sponsorTier: null,
    images: ['/placeholders/restaurant-bistro.jpg'],
    featured: true,
  },
  {
    slug: 'redd',
    name: 'Redd',
    coords: [-122.3598, 38.4039],
    region: 'yountville',
    cuisine: 'California contemporary',
    priceRange: '$$$',
    description: 'Richard Reddington\'s flagship restaurant brings Asian and Mediterranean influences to bear on the finest local ingredients, with a wine list of staggering Napa depth.',
    excerpt: 'Contemporary California cooking with a masterful local wine list.',
    chefName: 'Richard Reddington',
    sponsorTier: null,
    images: ['/placeholders/restaurant-contemporary.jpg'],
  },
  {
    slug: 'ad-hoc',
    name: 'Ad Hoc',
    coords: [-122.3612, 38.4051],
    region: 'yountville',
    cuisine: 'American family-style',
    priceRange: '$$',
    description: 'Keller\'s most casual and communal restaurant serves a single four-course family-style menu that changes nightly — the most democratic and joyful dining in Yountville.',
    excerpt: 'Keller goes casual: one menu, family-style, a different delight every night.',
    chefName: 'Thomas Keller',
    sponsorTier: null,
    images: ['/placeholders/restaurant-casual.jpg'],
  },

  // ── DOWNTOWN NAPA ──
  {
    slug: 'the-charter-oak',
    name: 'The Charter Oak',
    coords: [-122.2798, 38.2912],
    region: 'downtown-napa',
    cuisine: 'Wood-fired California',
    priceRange: '$$$',
    description: 'Christopher Kostow\'s downtown Napa restaurant channels the rugged beauty of the valley through open-fire cooking, whole-animal techniques, and produce from the restaurant\'s own farm.',
    excerpt: 'Open-fire mastery from one of Napa\'s most acclaimed chef talents.',
    chefName: 'Christopher Kostow',
    highlights: ['Wood-fired hearth', 'Own-farm produce', 'Natural wine focus'],
    sponsorTier: null,
    images: ['/placeholders/restaurant-rustic.jpg'],
    featured: true,
  },
  {
    slug: 'torc',
    name: 'Torc',
    coords: [-122.2845, 38.2978],
    region: 'downtown-napa',
    cuisine: 'Modern American',
    priceRange: '$$$',
    description: 'Sean O\'Toole\'s warmly lit downtown restaurant has become a local institution — seasonal, ingredient-focused cooking with an impressive by-the-glass selection that showcases the valley\'s smaller producers.',
    excerpt: 'Downtown Napa\'s most beloved neighborhood restaurant.',
    chefName: 'Sean O\'Toole',
    sponsorTier: null,
    images: ['/placeholders/restaurant-neighborhood.jpg'],
  },
  {
    slug: 'oxbow-public-market',
    name: 'Oxbow Public Market',
    coords: [-122.2823, 38.2989],
    region: 'downtown-napa',
    cuisine: 'Market / food hall',
    priceRange: '$',
    description: 'Napa\'s vibrant food market brings together the valley\'s best artisan producers under one roof — from Hog Island oysters and Five Dot Ranch burgers to Ca\' Momi pizza and Fieldwork beer.',
    excerpt: 'The valley\'s communal table — oysters, wine, and everything in between.',
    highlights: ['Hog Island Oyster Bar', 'Farm-to-table vendors', 'Weekend farmers market'],
    sponsorTier: null,
    images: ['/placeholders/market.jpg'],
    featured: true,
  },

  // ── CALISTOGA ──
  {
    slug: 'evangeline',
    name: 'Evangeline',
    coords: [-122.5798, 38.5789],
    region: 'calistoga',
    cuisine: 'New Orleans Creole',
    priceRange: '$$',
    description: 'A beloved Calistoga institution channeling the spirit of New Orleans — beignets, Sazeracs, and a warm, candlelit room that feels like the best kind of anachronism in wine country.',
    excerpt: 'New Orleans comes to Calistoga — beignets, Sazeracs, and pure joy.',
    highlights: ['Famous beignets', 'Full Creole menu', 'Lively bar scene'],
    sponsorTier: null,
    images: ['/placeholders/restaurant-creole.jpg'],
  },
]

export const restaurantsByRegion = (region: string) =>
  restaurants.filter((r) => r.region === region)

export const featuredRestaurants = restaurants.filter((r) => r.featured)

export const getRestaurant = (slug: string) =>
  restaurants.find((r) => r.slug === slug)
