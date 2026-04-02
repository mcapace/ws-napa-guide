import type { Region } from '@/lib/types'

export interface RegionData {
  slug: Region | string
  name: string
  tagline: string
  heroImage: string
  accentColor: string        // CSS variable or hex for this region's accent
  intro: string              // opening paragraph
  body: string               // extended editorial
  soilNote: string           // terroir callout
  bestFor: string[]          // quick tags
  winerySlugs: string[]
  restaurantSlugs: string[]
  hotelSlugs: string[]
  articleSlug: string
  mapCenter: [number, number] // [lng, lat]
  mapZoom: number
  neighborRegions: string[]
}

export const regions: RegionData[] = [
  {
    slug: 'oakville',
    name: 'Oakville',
    tagline: 'The Cabernet Heartland',
    heroImage: '/placeholders/oakville-hero.jpg',
    accentColor: '#B8872E',   // gold
    intro:
      'No appellation in Napa Valley carries more weight than Oakville. A narrow benchland of volcanic and alluvial soils stretching barely two miles across, it produces Cabernet Sauvignon of extraordinary concentration and age-worthiness — wines that put California on the world map and have never stopped justifying their reputation.',
    body:
      'The Oakville floor sits at the valley\'s broadest point, where well-drained gravelly loams bake in afternoon sun while cool Pacific air funnels through the Carneros gap each evening. This thermal variation — warm days, cool nights — builds complexity in the vine, forcing it to work for its sugars while retaining the acidity that gives Oakville Cabernet its structure. The result is a wine that can age for decades and still surprise. At its western edge, the Mayacamas foothills produce mountain-influenced fruit of intense concentration. To the east, the Vaca Range benchland — what winemakers simply call "the bench" — delivers the most coveted addresses: Opus One, Screaming Eagle, Harlan Estate, Far Niente. These are the names that appear in auction records and on bucket lists. They are also, consistently, among the finest expressions of Cabernet Sauvignon made anywhere on earth.',
    soilNote:
      'Gravelly Bale loam and volcanic alluvium. Excellent drainage forces deep root systems, concentrating flavor while naturally limiting yields.',
    bestFor: ['Cabernet Sauvignon', 'Cult wines', 'Historic estates', 'Serious collectors'],
    winerySlugs: ['opus-one', 'screaming-eagle', 'harlan-estate', 'far-niente', 'robert-mondavi', 'silver-oak-oakville'],
    restaurantSlugs: [],
    hotelSlugs: [],
    articleSlug: 'napa-oakville',
    mapCenter: [-122.415, 38.455],
    mapZoom: 13,
    neighborRegions: ['rutherford', 'yountville'],
  },
  {
    slug: 'rutherford',
    name: 'Rutherford',
    tagline: 'Dust & Destiny',
    heroImage: '/placeholders/rutherford-hero.jpg',
    accentColor: '#5C1A28',   // bordeaux
    intro:
      'André Tchelistcheff\'s famous declaration — "It takes Rutherford dust to make great Cabernet" — has echoed through wine country for more than half a century. The silty loam soils of this central valley appellation produce wines of distinctive character: a subtle earthiness, a velvety mid-palate, a finish that lingers long after the glass is empty.',
    body:
      'Rutherford sits at the geographic heart of Napa Valley, flanked by the Mayacamas and Vaca mountain ranges. The so-called Rutherford Bench — a broad alluvial fan deposited over millennia by mountain streams — is among the most coveted real estate in American wine. Its soils are complex: volcanic ash and gravel from the west, silty loam and clay from the east, each contributing to the nuanced character that distinguishes a Rutherford Cabernet from its neighbors. The historic estates here read like a roll call of American wine history. Beaulieu Vineyard\'s Georges de Latour Private Reserve has been produced continuously since 1936, making it one of the country\'s longest-running prestige wines. Inglenook, dating to 1879 and restored by Francis Ford Coppola, is one of Napa\'s great preservation stories. Caymus Vineyards has been producing benchmark Cabernet for five decades. These are not wineries chasing trends. They are the trend.',
    soilNote:
      'The Rutherford Bench: silty loam and volcanic alluvium with exceptional water retention. The distinctive "Rutherford dust" — fine particulate matter in the soil — is credited with a unique earthy quality in the wines.',
    bestFor: ['Classic Cabernet', 'Historic estates', 'Age-worthy reds', 'Wine history'],
    winerySlugs: ['inglenook', 'beaulieu-vineyard', 'caymus'],
    restaurantSlugs: [],
    hotelSlugs: ['meadowood', 'auberge-du-soleil'],
    articleSlug: 'napa-rutherford',
    mapCenter: [-122.420, 38.488],
    mapZoom: 13,
    neighborRegions: ['oakville', 'calistoga', 'pritchard-hill'],
  },
  {
    slug: 'calistoga',
    name: 'Calistoga',
    tagline: 'Where the Valley Finds Its Heat',
    heroImage: '/placeholders/calistoga-hero.jpg',
    accentColor: '#4A5E42',   // sage
    intro:
      'At the northern extreme of Napa Valley, where the mountains close in and the Pacific influence fades, Calistoga is a world unto itself. Thermal springs bubble beneath volcanic soil. Summer temperatures regularly exceed 100°F. And the wines — bold, generous, full of volcanic personality — reflect every bit of that drama.',
    body:
      'Calistoga occupies the hottest, most geologically active corner of Napa Valley. The volcanic soils — rich in ash, pumice, and rocky material deposited by the Palisades, the dramatic cliffs that frame the town\'s northern edge — impart a distinctive mineral quality to the wines grown here. The heat produces ripe, almost opulent fruit, but the volcanic substrate and significant diurnal temperature variation ensure the wines retain structure and freshness. Schramsberg Vineyards, founded in 1862 on Diamond Mountain at the appellation\'s southern edge, is one of California\'s most historic estates and its finest producer of méthode traditionnelle sparkling wine — miles of hand-dug caves aging bottles that have appeared at White House state dinners for decades. Frank Family Vineyards, in a restored 1884 Victorian farmhouse, produces rich, generous Cabernet and excellent sparkling wine with some of the valley\'s most welcoming hospitality. Beyond the wine, Calistoga is the valley\'s spa capital. Geothermal activity means natural hot springs at every turn — volcanic mud baths, mineral pools, and historic bathhouses that have drawn visitors since the 19th century.',
    soilNote:
      'Volcanic ash and pumice from the Palisades. High heat retention and excellent drainage produce concentrated, powerful wines with distinctive mineral character.',
    bestFor: ['Bold Cabernet', 'Sparkling wine', 'Spa experiences', 'Volcanic terroir', 'Hot springs'],
    winerySlugs: ['schramsberg', 'frank-family'],
    restaurantSlugs: ['evangeline'],
    hotelSlugs: ['indian-springs-calistoga', 'mount-view-hotel'],
    articleSlug: 'napa-calistoga',
    mapCenter: [-122.580, 38.580],
    mapZoom: 13,
    neighborRegions: ['rutherford', 'pritchard-hill'],
  },
  {
    slug: 'yountville',
    name: 'Yountville',
    tagline: 'The Culinary Capital',
    heroImage: '/placeholders/yountville-hero.jpg',
    accentColor: '#B85C38',   // terracotta
    intro:
      'No town in America has more Michelin stars per capita than Yountville. In barely half a mile of Washington Street, Thomas Keller\'s culinary empire — The French Laundry, Bouchon, Ad Hoc, Bouchon Bakery — anchors a village of extraordinary restaurants, world-class boutique hotels, and art galleries that would be at home in any major city.',
    body:
      'Yountville sits in the southern Napa Valley, where the coolest growing conditions in the appellation produce wines of exceptional elegance and restraint. The Cabernets grown here tend toward finesse over power — silkier tannins, brighter acidity, more lifted aromatics than the bold expressions from the warmer northern reaches. But Yountville\'s reputation rests as much on its dining and hospitality as on its wine. The French Laundry has been a pilgrimage destination since Thomas Keller took over in 1994, producing a nine-course tasting menu that remains one of the most significant fine dining experiences in America. A reservation requires months of planning and is worth every minute of the effort. Bouchon, Keller\'s more casual bistro, delivers impeccable French classics — steak frites, croque monsieur, pristine shellfish — in a warm room that transports you to Paris. Ad Hoc serves a single four-course family-style menu that changes nightly, the most democratic expression of Keller\'s kitchen. Beyond Keller, Yountville has attracted serious chefs and serious hotels. Bardessono, LEED Platinum-certified, offers rooftop pools and an organic spa steps from every great restaurant in town. The Napa Valley Museum tells the valley\'s story in depth.',
    soilNote:
      'Cool-climate benchland soils with good drainage and moderate fertility. The southern valley position and Pacific influence produce wines of elegance and finesse.',
    bestFor: ['Fine dining', 'Thomas Keller', 'Boutique hotels', 'Elegant Cabernet', 'Art galleries'],
    winerySlugs: [],
    restaurantSlugs: ['french-laundry', 'bouchon', 'ad-hoc', 'redd'],
    hotelSlugs: ['bardessono'],
    articleSlug: 'napa-yountville',
    mapCenter: [-122.362, 38.404],
    mapZoom: 14,
    neighborRegions: ['oakville', 'downtown-napa'],
  },
  {
    slug: 'pritchard-hill',
    name: 'Pritchard Hill',
    tagline: "Napa's Most Coveted Mountain Address",
    heroImage: '/placeholders/pritchard-hill-hero.jpg',
    accentColor: '#B8872E',   // gold
    intro:
      'High above Lake Hennessey on the eastern slopes of the Vaca Range, a handful of tiny estates produce some of California\'s most profound Cabernet Sauvignons. The waiting lists are long. The wines are worth it. Pritchard Hill is where Napa Valley\'s most serious collectors turn when they want something truly rare.',
    body:
      'Pritchard Hill is not a formal AVA but a geographic designation that has become synonymous with Napa\'s most coveted cult wines. Perched at elevations between 1,200 and 2,200 feet on the eastern ridge above Rutherford, the hillside vineyards here benefit from thin, rocky soils that stress the vine, forcing deep root systems and dramatically limiting yields. The resulting wines — intensely concentrated, complex, built for decades of aging — command prices that rival Bordeaux\'s finest châteaux. Colgin Cellars, founded by Ann Colgin in 1992, produces tiny quantities of Cabernet that consistently rank among California\'s most profound. Bryant Family Vineyard, perched at Pritchard Hill\'s highest point with views across Lake Hennessey, produces a single wine of extraordinary concentration and finesse. These estates share a philosophy: minimal intervention, maximal expression of place. The mountain soils, the elevation, the diurnal temperature variation — everything at Pritchard Hill pushes toward intensity and complexity. Visits are almost exclusively by private invitation. The wines, when they appear at auction, set records.',
    soilNote:
      'Thin, rocky volcanic soils at 1,200–2,200 feet elevation. Extreme stress on the vine produces tiny yields of intensely concentrated fruit with exceptional aging potential.',
    bestFor: ['Cult Cabernet', 'Collectors', 'Mountain terroir', 'Age-worthy wines', 'Investment-grade bottles'],
    winerySlugs: ['colgin-cellars', 'bryant-family'],
    restaurantSlugs: [],
    hotelSlugs: [],
    articleSlug: 'napa-pritchard-hill',
    mapCenter: [-122.455, 38.525],
    mapZoom: 13,
    neighborRegions: ['rutherford', 'calistoga'],
  },
  {
    slug: 'downtown-napa',
    name: 'Downtown Napa',
    tagline: 'The City Reinvented',
    heroImage: '/placeholders/downtown-napa-hero.jpg',
    accentColor: '#4A5E42',   // sage
    intro:
      'For decades, downtown Napa was the place you drove through on the way to the wineries. A 2014 earthquake was, paradoxically, the catalyst for transformation. A generation of chefs, hoteliers, and entrepreneurs has since remade the city into a destination in its own right — one that rewards an afternoon of wandering as much as any tasting room on the Silverado Trail.',
    body:
      'The Napa River, once a barrier, is now the city\'s spine. The Oxbow District — built around the Oxbow Public Market, a vibrant food hall of artisan vendors — draws crowds for Hog Island oysters, Ca\' Momi pizza, and Fieldwork beer. The Charter Oak, Christopher Kostow\'s wood-fired downtown restaurant, channels the rugged beauty of the valley through open-fire cooking and produce from the restaurant\'s own farm. Torc, Sean O\'Toole\'s warmly lit neighborhood spot, has become a local institution. The Napa Valley Wine Train, a vintage rail journey through the valley, departs from downtown\'s historic depot. First Street Napa has brought independent boutiques and national names to a walkable retail district. Art galleries, cocktail bars, and farm-to-table restaurants have filled in the blocks between. Downtown Napa still lacks the marquee winery experiences of the valley\'s middle reaches, but that\'s precisely the point. It offers something different: a living city, with the energy and spontaneity that the more curated wine country experience sometimes lacks. Come for the Oxbow, stay for dinner at The Charter Oak, and you\'ll understand why this city is no longer just a pass-through.',
    soilNote:
      'Urban setting at the valley\'s southern end. The Napa River floodplain has historically shaped the city\'s development more than its viticulture.',
    bestFor: ['Dining', 'Food markets', 'Art galleries', 'Wine bars', 'City energy', 'Oxbow Market'],
    winerySlugs: ['oxbow-public-market-wines'],
    restaurantSlugs: ['the-charter-oak', 'torc', 'oxbow-public-market'],
    hotelSlugs: ['carneros-resort'],
    articleSlug: 'napa-downtown',
    mapCenter: [-122.285, 38.300],
    mapZoom: 14,
    neighborRegions: ['yountville'],
  },
]

export const getRegion = (slug: string) => regions.find((r) => r.slug === slug)
export const getAllRegionSlugs = () => regions.map((r) => r.slug)
