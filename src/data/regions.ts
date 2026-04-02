import type { Region } from '@/lib/types'

export interface RegionAdventure {
  title: string
  intro: string
  body: string
}

export interface RegionData {
  slug: Region | string
  name: string
  tagline: string
  author?: string
  issue?: string
  pullQuote?: string
  adventure?: RegionAdventure
  heroImage: string
  accentColor: string
  intro: string
  body: string
  soilNote: string
  bestFor: string[]
  winerySlugs: string[]
  restaurantSlugs: string[]
  hotelSlugs: string[]
  articleSlug: string
  mapCenter: [number, number]
  mapZoom: number
  neighborRegions: string[]
}

export const regions: RegionData[] = [
  {
    slug: 'oakville',
    name: 'Oakville',
    tagline: 'The Spirit of Cabernet',
    author: 'MaryAnn Worobiec',
    issue: 'June 15 & 30, 2026',
    heroImage: '/placeholders/oakville-hero.jpg',
    accentColor: '#1C2E12',
    pullQuote:
      'The Oakville AVA is sacred ground for Cabernet Sauvignon. Its vineyards are considered the filet mignon of the valley because of how the grape performs in the terroir.',
    intro: `Located between Yountville and Rutherford as you head north, Oakville can appear to visitors as little more than a blip, with the famed Oakville Grocery serving as its spiritual center. Yet Oakville boasts the highest concentration of benchmark estates in Napa Valley—Harlan Estate, Robert Mondavi, Opus One, Silver Oak, Far Niente and Heitz Cellar to name a few. It is also home to two of California's most renowned vineyards, To Kalon and Martha's.`,
    body: `Two of the most anticipated re-openings this year are the Robert Mondavi Winery and Beaulieu Vineyard. Both are scheduled to open soon; RMW in May and BV by July.\n\nAt RMW, the renovation preserves the iconic 1966 Cliff May design, including the signature arch and tower that echo California's Spanish missions. The team has added new structures on either side, including a hospitality wing wrapped in glass walls that bring guests visually closer to the vineyards. Designers lined the ceiling with oak staves salvaged from old fermentation vats—wine stains and all—adding texture and authenticity to the modern space.\n\nFive minutes down the road, BV has also chosen restoration over replacement. The team reinforced the original stone walls instead of rebuilding them and repurposed redwood from old tanks to clad the ceilings, even preserving boards marked with handwritten notes. During construction, the winery recycled 98% of its materials.`,
    adventure: {
      title: 'The Everything Old Is New Again Tour',
      intro: `Two of the most anticipated re-openings this year are the Robert Mondavi Winery and Beaulieu Vineyard. Both are scheduled to open soon; RMW in May and BV by July.`,
      body: `At RMW, the renovation preserves the iconic 1966 Cliff May design, including the signature arch and tower that echo California's Spanish missions. The team has added new structures on either side, including a hospitality wing wrapped in glass walls that bring guests visually closer to the vineyards. Designers lined the ceiling with oak staves salvaged from old fermentation vats—wine stains and all—adding texture and authenticity to the modern space.\n\nFive minutes down the road, BV has also chosen restoration over replacement. The team reinforced the original stone walls instead of rebuilding them and repurposed redwood from old tanks to clad the ceilings, even preserving boards marked with handwritten notes. During construction, the winery recycled 98% of its materials.`,
    },
    soilNote:
      'Gravelly Bale loam and volcanic alluvium. Excellent drainage forces deep root systems, concentrating flavor while naturally limiting yields.',
    bestFor: ['Cabernet Sauvignon', 'Cult wines', 'Historic estates', 'To Kalon'],
    winerySlugs: ['far-niente', 'nickel-and-nickel', 'cardinale', 'rudd-estate', 'opus-one'],
    restaurantSlugs: ['brix', 'mustards-grill'],
    hotelSlugs: [],
    articleSlug: 'napa-oakville',
    mapCenter: [-122.4089, 38.4298],
    mapZoom: 13,
    neighborRegions: ['rutherford', 'yountville', 'st-helena'],
  },
  {
    slug: 'rutherford',
    name: 'Rutherford',
    tagline: 'Storied Vineyards',
    author: 'MaryAnn Worobiec',
    issue: 'June 15 & 30, 2026',
    heroImage: '/placeholders/rutherford-hero.jpg',
    accentColor: '#2E1A0A',
    pullQuote: `Tchelistcheff coined the term "Rutherford Dust," in reference to dusty, powdery alluvial soils on the west side, and the distinct subtle grain and minerality they imbue in the AVA's Cabernets.`,
    intro: `When it comes to grapevines, Rutherford is one of Napa Valley's big names. But as far as towns go, Rutherford is a blink-and-you'll-miss-it spot along Highway 29 about halfway up the valley. As you drive past a former railroad station you might catch the smoky aromas of expertly grilled food at Rutherford Grill without realizing you've just passed through the heart of a town with a population of only about 100.`,
    body: `Napa may be Cabernet country, but many of its red wine specialists also craft exceptional Sauvignon Blancs. White wine lovers have plenty to celebrate with these refreshing, expressive wines.\n\nStart at Groth in Oakville and choose a tasting that features the estate Sauvignon Blanc. Just 3 miles away, Rutherford's St. Supéry welcomes guests with one of the valley's most approachable tasting experiences. The winery farms its Sauvignon Blanc at Dollarhide Ranch in Pope Valley and has championed distinctive expressions of the grape since the 1980s.\n\nWhen hunger strikes, head down Highway 29 to Mustards Grill. Finish your Sauvignon Blanc tour at Grgich Hills Estate. This historic family-run winery continues to earn attention for its role in the Judgment of Paris anniversary, but its Sauvignon Blancs deserve equal acclaim.`,
    adventure: {
      title: 'The Sauvignon Blanc Discovery Tour',
      intro: `Napa may be Cabernet country, but many of its red wine specialists also craft exceptional Sauvignon Blancs. White wine lovers have plenty to celebrate with these refreshing, expressive wines.`,
      body: `Start at Groth in Oakville and choose a tasting that features the estate Sauvignon Blanc. Just 3 miles away, Rutherford's St. Supéry welcomes guests with one of the valley's most approachable tasting experiences. The winery farms its Sauvignon Blanc at Dollarhide Ranch in Pope Valley and has championed distinctive expressions of the grape since the 1980s.\n\nWhen hunger strikes, head down Highway 29 to Mustards Grill. Finish your Sauvignon Blanc tour at Grgich Hills Estate. This historic family-run winery continues to earn attention for its role in the Judgment of Paris anniversary, but its Sauvignon Blancs deserve equal acclaim.`,
    },
    soilNote:
      'The Rutherford Bench: silty loam and volcanic alluvium with exceptional water retention. The distinctive "Rutherford dust" is credited with a unique earthy quality in the wines.',
    bestFor: ['Classic Cabernet', 'Historic estates', 'Sauvignon Blanc'],
    winerySlugs: ['bella-union', 'inglenook', 'quintessa', 'staglin-family-vineyard', 'cathiard-family-estate'],
    restaurantSlugs: ['rutherford-grill', 'la-luna-market-taqueria'],
    hotelSlugs: ['rancho-caymus-inn', 'auberge-du-soleil'],
    articleSlug: 'napa-rutherford',
    mapCenter: [-122.4289, 38.459],
    mapZoom: 13,
    neighborRegions: ['oakville', 'calistoga', 'pritchard-hill', 'st-helena'],
  },
  {
    slug: 'yountville',
    name: 'Yountville',
    tagline: 'World-Class Dining',
    author: 'Aaron Romano',
    issue: 'June 15 & 30, 2026',
    heroImage: '/placeholders/yountville-hero.jpg',
    accentColor: '#1E0A2E',
    pullQuote: `Yountville makes an ideal home base for a quintessential Napa Valley vacation, offering visitors a jumping off point in the heart of the valley. Totaling just 1.5 square miles, it is an entirely walkable town.`,
    intro: `Yountville, founded in 1855 as Sebastopol, was renamed in 1867 in honor of George C. Yount, a pioneer widely credited with planting the first wine grapes in Napa Valley. Tiny and charming, the town has long counted just a modest population (3,500 today), growing slowly even with the arrival of the railroad and eventually becoming an incorporated town in 1965. Over the past few decades, Yountville has evolved into arguably Napa Valley's most celebrated culinary hub.`,
    body: `Three distinct adventures — culinary, Stags Leap, and into the hills — each offering a different lens on this remarkable corner of the valley.\n\nCulinary Delights: Begin at Chandon Napa Valley, established in 1973, recently modernized with a full culinary program. Then head to Darioush for warm Persian hospitality and an epicurean adventure with wood-fired barbari bread and four-course plated meals.\n\nStags Leap Splendor: Start at Cliff Lede Vineyards with the "Morning Walk in the Vineyard" through 60 acres spanning hillside and valley floor vines. Then drive to Shafer for the "Shafer Hillside Experience" — a Polaris Ranger tour culminating in library vintage tastings.\n\nInto the Hills: Drive to Antinori Napa Valley, nestled at 1,600 feet in the Vaca Mountains, then cross to Mayacamas on Mount Veeder for an all-terrain vehicle journey through rugged mountain terrain.`,
    adventure: {
      title: 'Three Ways to Experience Yountville',
      intro: `Three distinct adventures — culinary, Stags Leap, and into the hills — each offering a different lens on this remarkable corner of the valley.`,
      body: `Culinary Delights: Begin at Chandon Napa Valley, established in 1973, recently modernized with a full culinary program. Then head to Darioush for warm Persian hospitality and an epicurean adventure with wood-fired barbari bread and four-course plated meals.\n\nStags Leap Splendor: Start at Cliff Lede Vineyards with the "Morning Walk in the Vineyard" through 60 acres spanning hillside and valley floor vines. Then drive to Shafer for the "Shafer Hillside Experience" — a Polaris Ranger tour culminating in library vintage tastings.\n\nInto the Hills: Drive to Antinori Napa Valley, nestled at 1,600 feet in the Vaca Mountains, then cross to Mayacamas on Mount Veeder for an all-terrain vehicle journey through rugged mountain terrain.`,
    },
    soilNote:
      'Cool-climate benchland soils with good drainage and moderate fertility. The southern valley position and Pacific influence produce wines of elegance and finesse.',
    bestFor: ['Fine dining', 'Thomas Keller', 'Walkable village', 'Elegant Cabernet'],
    winerySlugs: ['stewart-cellars', 'clos-du-val', 'lewis-cellars'],
    restaurantSlugs: ['the-french-laundry', 'bouchon-bistro', 'ad-hoc', 'clementine'],
    hotelSlugs: ['bardessono', 'sttupa-estate'],
    articleSlug: 'napa-yountville',
    mapCenter: [-122.3621, 38.4045],
    mapZoom: 14,
    neighborRegions: ['oakville', 'downtown-napa', 'st-helena'],
  },
  {
    slug: 'st-helena',
    name: 'St. Helena',
    tagline: 'Historic and Bustling',
    author: 'James Molesworth',
    issue: 'June 15 & 30, 2026',
    heroImage: '/placeholders/st-helena-hero.jpg',
    accentColor: '#1A2E10',
    pullQuote: `St. Helena has become the valley's beating heart, with many prominent winemakers and vintners calling it home. Get up early enough and you may bump into some of them at the local coffee shops.`,
    intro: `St. Helena is the second to last town as you head north along the Highway 29 corridor, with the highway itself doubling as the town's main street. That can mean a bit of traffic, especially during afternoon school dismissal. It's a small price to pay, though, for what can be an ideal base camp for your Napa Valley excursion.`,
    body: `St. Helena and Spring Mountain are inextricably linked historically and geographically. Four half-day routes provide for both a similar undercurrent of back story and the ability to compare and contrast fine details.\n\nOff-the-Grid Cabernets: Head east to Seavey Vineyard, housed in a restored 1880s stone dairy barn 15 minutes from town. Then wind up Big Rock Road to Ric Forman Vineyard, a stone-walled tasting room built dramatically into the hillside. For lunch, the smash burger at Charter Oak.\n\nWest Side Family Wineries: South to Salvestrin, then Corison Winery — Cathy Corison's nearly 50 vintages of experience, bright high-toned Cabernets under 14% alcohol.\n\nA St. Helena History Lesson: Freemark Abbey (founded 1881, two wines in the Paris tasting), then Spring Mountain Vineyard (1973 Chardonnay at Paris, library vintages from the '79 and '88 Cabernets).\n\nModern Tasting Salons: Royal We Wines — Thomas Rivers Brown's salon. Then Wheeler Farms — Suzanne Deal Booth's property with in-house chef Bruce Marder, dining family-style in the outdoor olive grove.`,
    adventure: {
      title: 'Four St. Helena Excursions',
      intro: `St. Helena and Spring Mountain are inextricably linked historically and geographically. Four half-day routes provide for both a similar undercurrent of back story and the ability to compare and contrast fine details.`,
      body: `Off-the-Grid Cabernets: Head east to Seavey Vineyard, housed in a restored 1880s stone dairy barn 15 minutes from town. Then wind up Big Rock Road to Ric Forman Vineyard, a stone-walled tasting room built dramatically into the hillside. For lunch, the smash burger at Charter Oak.\n\nWest Side Family Wineries: South to Salvestrin, then Corison Winery — Cathy Corison's nearly 50 vintages of experience, bright high-toned Cabernets under 14% alcohol.\n\nA St. Helena History Lesson: Freemark Abbey (founded 1881, two wines in the Paris tasting), then Spring Mountain Vineyard (1973 Chardonnay at Paris, library vintages from the '79 and '88 Cabernets).\n\nModern Tasting Salons: Royal We Wines — Thomas Rivers Brown's salon. Then Wheeler Farms — Suzanne Deal Booth's property with in-house chef Bruce Marder, dining family-style in the outdoor olive grove.`,
    },
    soilNote: 'Benchland and hillside soils at the valley’s upper reach; diverse exposures from Spring Mountain to the valley floor.',
    bestFor: ['Cabernet', 'Historic Main Street', 'Collectors', 'Coffee culture'],
    winerySlugs: ['spottswoode', 'corison-winery', 'faust-haus'],
    restaurantSlugs: ['charlies-napa-valley', 'cook-st-helena', 'model-bakery'],
    hotelSlugs: ['alila-napa-valley', 'harvest-inn', 'wydown-hotel'],
    articleSlug: 'napa-st-helena',
    mapCenter: [-122.4699, 38.5026],
    mapZoom: 13,
    neighborRegions: ['calistoga', 'rutherford', 'yountville', 'oakville'],
  },
  {
    slug: 'calistoga',
    name: 'Calistoga',
    tagline: 'A Wine Country Retreat',
    author: 'Mitch Frank',
    issue: 'June 15 & 30, 2026',
    heroImage: '/placeholders/calistoga-hero.jpg',
    accentColor: '#0A1E2E',
    pullQuote: `Calistoga today still offers that rustic, relaxed feel paired with sophisticated escape. You can stroll the old downtown stretch of Lincoln Road, which feels like an 1800s California town, despite the coffee shops and art galleries.`,
    intro: `Tucked away at the northern end of Napa Valley, the town of Calistoga has long held its own, unique vibe. For those looking for a more relaxed version of wine country, Calistoga is a haven. One reason for that vibe is location: 30 miles north of downtown Napa, where the valley narrows and turns west.`,
    body: `Two journeys that are a little outside the box — a walkable tasting tour through town, and a mountain getaway to Howell Mountain.\n\nA Walkable Tasting Tour: Rivers-Marie (Thomas Rivers Brown's personal winery, glass-enclosed tasting room), then Lola Wines (Seth Cripe's eclectic portfolio including Vermentino and Charbono, $35 for five wines), then Tank Garage Winery (a restored 1930s gas station). Finish with lunch at Buster's BBQ — bring a bottle with corkage.\n\nMountain Getaway: Drive 12 miles to CADE Estate on Howell Mountain, past a fire pit to gorgeous redwood views. Then another 5 miles uphill to Outpost Wines, perched on a ridge with Napa Valley on one side and Pope Valley on the other — Thomas Rivers Brown makes the wines here too.`,
    adventure: {
      title: 'Two Calistoga Adventures',
      intro: `Two journeys that are a little outside the box — a walkable tasting tour through town, and a mountain getaway to Howell Mountain.`,
      body: `A Walkable Tasting Tour: Rivers-Marie (Thomas Rivers Brown's personal winery, glass-enclosed tasting room), then Lola Wines (Seth Cripe's eclectic portfolio including Vermentino and Charbono, $35 for five wines), then Tank Garage Winery (a restored 1930s gas station). Finish with lunch at Buster's BBQ — bring a bottle with corkage.\n\nMountain Getaway: Drive 12 miles to CADE Estate on Howell Mountain, past a fire pit to gorgeous redwood views. Then another 5 miles uphill to Outpost Wines, perched on a ridge with Napa Valley on one side and Pope Valley on the other — Thomas Rivers Brown makes the wines here too.`,
    },
    soilNote:
      'Volcanic ash and pumice from the Palisades. High heat retention and excellent drainage produce concentrated, powerful wines with distinctive mineral character.',
    bestFor: ['Bold Cabernet', 'Sparkling wine', 'Spas', 'Howell Mountain'],
    winerySlugs: ['schramsberg', 'larkmead-vineyards', 'lola-wines', 'hourglass'],
    restaurantSlugs: ['calistoga-inn-brewery', 'lovina', 'picobar-solage', 'el-taco-feliz'],
    hotelSlugs: ['solage', 'indian-springs-resort', 'francis-house-inn'],
    articleSlug: 'napa-calistoga',
    mapCenter: [-122.5798, 38.5789],
    mapZoom: 13,
    neighborRegions: ['rutherford', 'pritchard-hill', 'st-helena'],
  },
  {
    slug: 'pritchard-hill',
    name: 'Pritchard Hill',
    tagline: 'Above the Valley Floor',
    author: 'James Molesworth',
    issue: 'June 15 & 30, 2026',
    heroImage: '/placeholders/pritchard-hill-hero.jpg',
    accentColor: '#2E2A0A',
    pullQuote: `To understand Pritchard Hill is to understand what elevation and volcanic soil do to Cabernet Sauvignon — something transformative, something that takes decades to reveal itself.`,
    intro: `Pritchard Hill rises above the eastern edge of Napa Valley, offering a perspective — and a wine style — that is distinctly its own. The volcanic soils and elevation produce Cabernet Sauvignons of extraordinary concentration and longevity.`,
    body: `A morning drive up the eastern hills rewards with some of Napa's most singular wines and views that stretch across the entire valley.\n\nBegin at Chappellet, one of the valley's most storied mountain estates, founded in 1967 by Donn and Molly Chappellet. Then to Continuum, Tim Mondavi's family project, where the elevation and rocky soils produce wines of extraordinary precision. David Arthur follows — among the most consistent producers on the hill. End at Howard Backen Estate, the architect who designed many of Napa's great wineries having now created his own.`,
    adventure: {
      title: 'The Pritchard Hill Pilgrimage',
      intro: `A morning drive up the eastern hills rewards with some of Napa's most singular wines and views that stretch across the entire valley.`,
      body: `Begin at Chappellet, one of the valley's most storied mountain estates, founded in 1967 by Donn and Molly Chappellet. Then to Continuum, Tim Mondavi's family project, where the elevation and rocky soils produce wines of extraordinary precision. David Arthur follows — among the most consistent producers on the hill. End at Howard Backen Estate, the architect who designed many of Napa's great wineries having now created his own.`,
    },
    soilNote:
      'Thin, rocky volcanic soils at elevation. Extreme stress on the vine produces tiny yields of intensely concentrated fruit with exceptional aging potential.',
    bestFor: ['Cult Cabernet', 'Mountain terroir', 'Collectors'],
    winerySlugs: [],
    restaurantSlugs: [],
    hotelSlugs: [],
    articleSlug: 'napa-pritchard-hill',
    mapCenter: [-122.39, 38.51],
    mapZoom: 13,
    neighborRegions: ['rutherford', 'calistoga'],
  },
  {
    slug: 'downtown-napa',
    name: 'Downtown Napa',
    tagline: "The Valley's Urban Core",
    author: 'MaryAnn Worobiec',
    issue: 'June 15 & 30, 2026',
    heroImage: '/placeholders/downtown-napa-hero.jpg',
    accentColor: '#0A2E20',
    pullQuote: `The best argument for spending time in downtown Napa is the sheer variety — from Michelin-starred restaurants to taco trucks, from $20 tasting flights to library pours of legendary Cabernet.`,
    intro: `Downtown Napa has transformed over the past two decades from a quiet county seat into a vibrant destination in its own right. The Oxbow Public Market anchors the culinary scene, while more than 40 tasting rooms line the riverfront and downtown streets.`,
    body: `Head south from downtown into Carneros, where the cool influence of San Pablo Bay shapes an entirely different style of wine.\n\nCarneros sits at the southern end of both Napa and Sonoma counties, cooled by morning fog and afternoon winds from the bay. The climate favors Chardonnay and Pinot Noir above all. Start at Domaine Carneros, then work north through the Oxbow district before finishing with dinner at Angele or Torc.`,
    adventure: {
      title: 'The Carneros Adventure',
      intro: `Head south from downtown into Carneros, where the cool influence of San Pablo Bay shapes an entirely different style of wine.`,
      body: `Carneros sits at the southern end of both Napa and Sonoma counties, cooled by morning fog and afternoon winds from the bay. The climate favors Chardonnay and Pinot Noir above all. Start at Domaine Carneros, then work north through the Oxbow district before finishing with dinner at Angele or Torc.`,
    },
    soilNote:
      'Urban riverfront; Carneros to the south offers fog-cooled clay-loam soils ideal for Pinot and Chardonnay.',
    bestFor: ['Dining', 'Oxbow Market', 'Tasting rooms', 'Carneros day trips'],
    winerySlugs: [],
    restaurantSlugs: [],
    hotelSlugs: [],
    articleSlug: 'napa-downtown',
    mapCenter: [-122.2823, 38.2989],
    mapZoom: 14,
    neighborRegions: ['yountville'],
  },
]

export const getRegion = (slug: string) => regions.find((r) => r.slug === slug)
export const getAllRegionSlugs = () => regions.map((r) => r.slug)
