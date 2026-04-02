import type { Article } from '@/lib/types'

export const articles: Article[] = [
  {
    slug: 'napa-lede',
    title: 'The Napa Valley',
    subtitle: 'An Insider\'s Ultimate Guide',
    section: 'feature',
    excerpt:
      'No wine region on earth compresses so much ambition, history, and sheer sensory pleasure into so small a space. Fifty miles of valley floor and mountain slope, and yet Napa Valley has become the benchmark against which the world\'s great wine regions measure themselves.',
    body: `[Content from WS063026_napaLede_draft.pdf]`,
    sponsorTier: null,
    images: ['/placeholders/hero-vineyard.jpg', '/placeholders/valley-aerial.jpg'],
    featured: true,
    publishedAt: '2026-06-01',
  },
  {
    slug: 'napa-landmarks',
    title: 'The Landmarks',
    subtitle: 'Wineries That Defined a Valley',
    section: 'wineries',
    excerpt:
      'These are the estates that changed everything — the pioneer Cabernets, the cult bottles, the historic châteaux that gave Napa Valley its global reputation and its enduring mystique.',
    body: `[Content from WS063026_napaLandmarks_draft.pdf]`,
    relatedWineries: ['opus-one', 'screaming-eagle', 'harlan-estate', 'colgin-cellars'],
    sponsorTier: null,
    images: ['/placeholders/winery-landmark.jpg'],
    featured: true,
    publishedAt: '2026-06-01',
  },
  {
    slug: 'napa-judgment',
    title: 'The Judgment Revisited',
    subtitle: 'Fifty Years After Paris Changed Everything',
    section: 'feature',
    excerpt:
      'In 1976, a blind tasting in Paris shocked the wine world. Napa Valley Cabernets and Chardonnays bested the finest wines of France. Half a century later, we ask: what did the Judgment of Paris really mean — and what has it wrought?',
    body: `[Content from WS063026_napaJudgment_draft.pdf]`,
    sponsorTier: null,
    images: ['/placeholders/judgment-paris.jpg'],
    featured: true,
    publishedAt: '2026-06-01',
  },
  {
    slug: 'napa-oakville',
    title: 'Oakville',
    subtitle: 'The Heart of Napa Cabernet',
    section: 'regions',
    region: 'oakville',
    excerpt:
      'The Oakville appellation produces some of the most coveted real estate in wine — a narrow benchland of volcanic and alluvial soils that coaxes extraordinary Cabernet Sauvignon from vines that have defined the valley\'s reputation.',
    body: `[Content from WS063026_napaOakville_draft.pdf]`,
    relatedWineries: ['opus-one', 'screaming-eagle', 'harlan-estate', 'far-niente', 'robert-mondavi', 'silver-oak-oakville'],
    sponsorTier: null,
    images: ['/placeholders/oakville-vineyard.jpg'],
    publishedAt: '2026-06-01',
  },
  {
    slug: 'napa-rutherford',
    title: 'Rutherford',
    subtitle: 'Dust and Destiny',
    section: 'regions',
    region: 'rutherford',
    excerpt:
      'André Tchelistcheff\'s famous phrase — "It takes Rutherford dust to make great Cabernet" — has never been more apt. The silty loam soils of this central valley appellation impart a distinctive earthiness to wines of extraordinary age-worthiness.',
    body: `[Content from WS063026_napaRutherford_draft.pdf]`,
    relatedWineries: ['inglenook', 'beaulieu-vineyard', 'caymus'],
    sponsorTier: null,
    images: ['/placeholders/rutherford-dust.jpg'],
    publishedAt: '2026-06-01',
  },
  {
    slug: 'napa-calistoga',
    title: 'Calistoga',
    subtitle: 'Where the Valley Finds Its Heat',
    section: 'regions',
    region: 'calistoga',
    excerpt:
      'At the northern extreme of the valley, where thermal activity bubbles beneath volcanic soil and summer temperatures soar, Calistoga produces bold, generous wines and offers the valley\'s most distinctive spa culture.',
    body: `[Content from WS063026_napaCalistoga_draft.pdf]`,
    relatedWineries: ['schramsberg', 'frank-family'],
    sponsorTier: null,
    images: ['/placeholders/calistoga-hot-springs.jpg'],
    publishedAt: '2026-06-01',
  },
  {
    slug: 'napa-yountville',
    title: 'Yountville',
    subtitle: 'A Village Built for Pleasure',
    section: 'towns',
    region: 'yountville',
    excerpt:
      'No town in America has more Michelin stars per capita than Yountville. In barely half a mile of Washington Street, Thomas Keller\'s culinary empire anchors a village of extraordinary restaurants, boutique hotels, and art galleries.',
    body: `[Content from WS063026_napaYountville_draft.pdf]`,
    relatedRestaurants: ['french-laundry', 'bouchon', 'ad-hoc', 'redd'],
    relatedHotels: ['bardessono'],
    sponsorTier: null,
    images: ['/placeholders/yountville-street.jpg'],
    publishedAt: '2026-06-01',
  },
  {
    slug: 'napa-pritchard-hill',
    title: 'Pritchard Hill',
    subtitle: 'Napa\'s Most Coveted Mountain Address',
    section: 'regions',
    region: 'pritchard-hill',
    excerpt:
      'High above Lake Hennessey on the eastern slopes of the Vaca Range, a handful of tiny estates produce some of California\'s most profound Cabernet Sauvignons. The waiting lists are long. The wines are worth it.',
    body: `[Content from WS063026_napaPritchard_draft.pdf]`,
    relatedWineries: ['colgin-cellars', 'bryant-family'],
    sponsorTier: null,
    images: ['/placeholders/pritchard-hill.jpg'],
    publishedAt: '2026-06-01',
  },
  {
    slug: 'napa-downtown',
    title: 'Downtown Napa',
    subtitle: 'The City Finds Its Footing',
    section: 'towns',
    region: 'downtown-napa',
    excerpt:
      'For decades, downtown Napa was the place you drove through on the way to the wineries. No longer. A generation of chefs, hoteliers, and entrepreneurs has transformed the city into a destination in its own right.',
    body: `[Content from WS063026_napaDT_draft.pdf]`,
    relatedRestaurants: ['the-charter-oak', 'torc', 'oxbow-public-market'],
    relatedWineries: ['oxbow-public-market-wines'],
    sponsorTier: null,
    images: ['/placeholders/downtown-napa.jpg'],
    publishedAt: '2026-06-01',
  },
  {
    slug: 'napa-dining',
    title: 'Where to Eat',
    subtitle: 'The Valley\'s Essential Tables',
    section: 'dining',
    excerpt:
      'From Thomas Keller\'s legendary French Laundry to a perfect taco in Calistoga, Napa Valley\'s dining scene is as layered and complex as its Cabernets. These are the restaurants worth planning your trip around.',
    body: `[Content from WS063026_napaTaco_draft.pdf]`,
    relatedRestaurants: ['french-laundry', 'bouchon', 'the-charter-oak', 'torc', 'oxbow-public-market', 'evangeline'],
    sponsorTier: null,
    images: ['/placeholders/dining-hero.jpg'],
    featured: true,
    publishedAt: '2026-06-01',
  },
  {
    slug: 'napa-stay',
    title: 'Where to Stay',
    subtitle: 'From Mountain Retreats to Village Boutiques',
    section: 'stay',
    excerpt:
      'The right hotel is half the trip. Whether you want a hillside perch above the Rutherford Bench, a private cottage in Carneros, or a design-forward boutique steps from The French Laundry, Napa delivers.',
    body: `[Content from WS063026_napaSTH_draft.pdf]`,
    relatedHotels: ['meadowood', 'auberge-du-soleil', 'carneros-resort', 'poetry-inn', 'bardessono'],
    sponsorTier: null,
    images: ['/placeholders/hotel-hero.jpg'],
    featured: true,
    publishedAt: '2026-06-01',
  },
  {
    slug: 'napa-calendar',
    title: 'The Calendar',
    subtitle: 'When to Go and What to Do',
    section: 'calendar',
    excerpt:
      'Harvest brings the drama — but every season in Napa has its pleasures. From January pruning to December barrel tastings, here\'s how the valley\'s year unfolds and the events worth planning around.',
    body: `[Content from WS063026_napaCalendar_draft.pdf]`,
    sponsorTier: null,
    images: ['/placeholders/harvest-season.jpg'],
    publishedAt: '2026-06-01',
  },
]

export const featuredArticles = articles.filter((a) => a.featured)

export const articlesBySection = (section: string) =>
  articles.filter((a) => a.section === section)

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug)
