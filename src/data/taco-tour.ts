// src/data/taco-tour.ts
// Source: WS063026_napaTaco_draft — "Napa Valley Taco Tour" by Chris Cardoso
// June 15 & 30, 2026. All copy verbatim/condensed from the print article.
// Coordinates are approximate from street addresses — GEOCODE + spot-check each
// against Google Maps before shipping. Trucks without a fixed street number use the
// intersection/area described in the article.

export interface TacoSpot {
  slug: string
  name: string
  town: string
  address: string
  website?: string
  phone?: string
  coords: [number, number]   // [lng, lat] — GEOCODE ACCURATELY
  type: 'truck' | 'brick-and-mortar' | 'market-counter'
  blurb: string
  thumb?: string
}

export const tacoIntro = {
  title: 'The Napa Valley Taco Tour',
  author: 'Chris Cardoso',
  issue: 'June 15 & 30, 2026',
  standfirst:
    "Napa Valley and Mexico have a long-entwined history that has blended their cultures together along the way. Street tacos, once mainly a quick meal for workers, have become a food beloved by all, and taquerias now dot the valley from Calistoga to downtown Napa.",
  anatomy:
    "A proper street taco needs just five ingredients: tortilla, meat, sauce, cilantro and onion. The magic is in the quality. It starts with the tortilla, masa harina de maíz and water pressed flat and cooked, best handmade to order and warmed on a grill. Then the meat: pollo asado, the many cuts of carne (asada, suadero, cabeza, lengua), and pork's big three, al pastor, carnitas and chorizo. Sauces bring spice and acidity, salsa roja (smoky), verde (tangy) or aguacate (creamy). Cilantro for freshness, raw onion for crunch.",
}

export const tacoSpots: TacoSpot[] = [
  {
    slug: 'azteca-market-taqueria',
    name: 'Azteca Market & Taqueria',
    town: 'St. Helena',
    address: '789 Main St., St. Helena (also 2995 Jefferson St., Napa)',
    website: 'https://aztecanapavalley.com',
    coords: [-122.4699, 38.5040],
    type: 'market-counter',
    blurb:
      "This Mexican grocery store in St. Helena is home to one of the valley's most popular taco counters, with a second location in Napa. The hedonistic street-style lineup runs from pollo asado, carnitas and chorizo to traditional buche, lengua and suadero.",
  },
  {
    slug: 'el-rodeo',
    name: 'El Rodeo',
    town: 'Napa',
    address: '1850 Soscol Ave., Napa',
    phone: '(707) 415-9800',
    coords: [-122.2895, 38.3095],
    type: 'truck',
    blurb:
      "This truck specializes in fresh seafood like shrimp or fish tacos, aguachile and seafood cocktail. Try the tripa for an adventurous bite, or the gobernadora, with shrimp, cheese and grilled onions, for something heartier.",
  },
  {
    slug: 'el-sabor-serano',
    name: 'El Sabor Serano',
    town: 'Napa',
    address: '1017 Coombsville Road, Suite B, Napa',
    website: 'https://elsaborserano.com',
    coords: [-122.2770, 38.2960],
    type: 'brick-and-mortar',
    thumb: '/images/features/napa-taco-tour/venue-el-sabor-serano.jpg',
    blurb:
      "On the east side of Napa heading to Coombsville, next to Fairview Market. Sit down for your meal. The suadero stands out for juicy, tender beef, and you'll want as much salsa verde as possible, made with fire-roasted tomatillos for a smoky depth.",
  },
  {
    slug: 'el-taco-feliz',
    name: 'El Taco Feliz',
    town: 'Calistoga',
    address: 'Lake Street, Calistoga (past Silverado Trail & Lake St.)',
    coords: [-122.5760, 38.5790],
    type: 'truck',
    thumb: '/images/features/napa-taco-tour/venue-el-taco-feliz.jpg',
    blurb:
      "This taco truck just past the intersection of Silverado Trail and Lake Street has long lines for a reason, and the service is always friendly. The carnes are tender, juicy and full of flavor; the cabeza stands out for its generous seasoning and melt-in-your-mouth braised beef.",
  },
  {
    slug: 'la-condesa-taqueria',
    name: 'La Condesa Taqueria',
    town: 'Napa',
    address: '1745 Soscol Ave., Napa',
    website: 'https://lacondesataquerianapa.com',
    coords: [-122.2900, 38.3080],
    type: 'brick-and-mortar',
    blurb:
      "Open early, La Condesa offers breakfast tacos and licuados alongside traditional street tacos. The chorizo stands out for its seasoning and spices, served on a toasted tortilla that holds together nicely. There may be no better way to start the day.",
  },
  {
    slug: 'la-luna-market-taqueria',
    name: 'La Luna Market & Taqueria',
    town: 'Rutherford',
    address: '1153 Rutherford Road, Rutherford',
    website: 'https://lalunamarket.com',
    coords: [-122.4180, 38.4560],
    type: 'market-counter',
    blurb:
      "Right in front of the Rancho Caymus Inn, this market and taqueria is one-stop shopping for a taco picnic. The pastor and pollo adobado tacos shine, with excellent seasoning and juicy meat, and picnic tables surround the exterior.",
  },
  {
    slug: 'la-taquiza-fish-tacos',
    name: 'La Taquiza Fish Tacos',
    town: 'Napa',
    address: '2007 Redwood Road, Napa',
    website: 'https://lataquizafishtacos.com',
    coords: [-122.3170, 38.3210],
    type: 'brick-and-mortar',
    blurb:
      "In Redwood Plaza, this taqueria is known for fresh seafood: shrimp, fish and octopus as ceviche or seafood cocktail. The fish taco comes battered and fried or grilled, topped with pico de gallo, cabbage and chipotle crema. The grilled octopus is a standout, tender and meaty.",
  },
  {
    slug: 'mothers-tacos',
    name: "Mother's Tacos",
    town: 'Napa',
    address: '3150 A Jefferson St., Napa',
    website: 'https://madebymothers.com',
    coords: [-122.2960, 38.3170],
    type: 'brick-and-mortar',
    thumb: '/images/features/napa-taco-tour/venue-mothers-tacos.jpg',
    blurb:
      "Napa's newest taco joint is a fast-casual spot in the Grape Yard shopping center. In-house tortillas anchor traditional carne asada, suadero or pollo asado, but the mushroom taco outperforms for melt-in-your-mouth sweetness. Try the oil-based macha sauce for acidity and crunch.",
  },
  {
    slug: 'ray-rays-tacos',
    name: "Ray Ray's Tacos",
    town: 'St. Helena',
    address: '1304 Main St., St. Helena',
    website: 'https://rayrays.com',
    coords: [-122.4695, 38.5030],
    type: 'brick-and-mortar',
    thumb: '/images/features/napa-taco-tour/venue-ray-rays-tacos.jpg',
    blurb:
      "Ray Ray's offers convenience with tacos to go, build-your-own kits, and a 16-taco tray where all you do is pick the meat. The spiced carrot taco should not be missed, and there's plenty of seating for dining in.",
  },
  {
    slug: 'tacos-el-muchacho-alegre',
    name: 'Tacos El Muchacho Alegre',
    town: 'Napa',
    address: '751 Jackson St., Napa',
    website: 'https://tacoselmuchachoalegre.com',
    coords: [-122.2905, 38.2985],
    type: 'truck',
    thumb: '/images/features/napa-taco-tour/venue-tacos-el-muchacho-alegre.jpg',
    blurb:
      "This truck just off Soscol has plenty of parking and picnic tables. The spiced shrimp taco is filled to capacity with fresh slaw, pico de gallo and creamy aioli, and traditional meats like the al pastor are seasoned perfectly.",
  },
  {
    slug: 'tacos-garcia',
    name: 'Tacos Garcia (Truck)',
    town: 'Yountville',
    address: '6792 Washington St., Yountville',
    phone: '(707) 980-4896',
    coords: [-122.3625, 38.4055],
    type: 'truck',
    blurb:
      "Yountville's only taco truck sits at Washington Street and Champagne Drive, a block from picnic tables, bocce and volleyball. Tortillas are lightly toasted for a firm base, the lengua is a specialty, and the to-die-for red tomatillo sauce belongs on everything.",
  },
  {
    slug: 'tacos-los-compadres',
    name: 'Tacos Los Compadres',
    town: 'Napa',
    address: 'Claremont Way, Napa',
    phone: '(707) 339-2305',
    coords: [-122.2990, 38.3060],
    type: 'truck',
    blurb:
      "Open until midnight, Los Compadres is great for late-night munchies. The al pastor is among the best in the valley, spun on a trompo, crisped and topped with rotating grilled pineapple. A salad bar lets you load up on cilantro, onions and sauce.",
  },
  {
    slug: 'tacos-michoacan',
    name: 'Tacos Michoacan',
    town: 'Napa',
    address: '1800 Pueblo Ave., Napa',
    phone: '(707) 812-9963',
    coords: [-122.2925, 38.3130],
    type: 'brick-and-mortar',
    blurb:
      "One of the longest-running taquerias in Napa (since the 1990s), with a brick-and-mortar and two trucks. House-made tortillas, traditional meats and three sauces make for archetypal Mexican street food. The carnitas are spot on, salty and rich; don't overlook the sweet carrot side.",
  },
]
