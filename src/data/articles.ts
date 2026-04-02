import type { Article } from '@/lib/types'

export const articles: Article[] = [
  {
    slug: 'napa-valley-guide',
    title: 'The Ultimate Travel Guide to Napa Valley',
    section: 'lede',
    author: 'Wine Spectator Staff',
    excerpt:
      "From landmark Cabernets to world-class kitchens, geothermal spas to hillside trails — Wine Spectator's definitive guide to America's most celebrated wine region.",
    body: "From landmark Cabernets to world-class kitchens, geothermal spas to hillside trails — Wine Spectator's definitive companion to America's most celebrated wine region. This digital guide expands on the June 2026 special issue with itineraries, maps, and the estates and tables our critics return to year after year.",
    sponsorTier: null,
    featured: true,
    images: ['/placeholders/hero-vineyard.jpg', '/placeholders/valley-aerial.jpg'],
    publishedAt: '2026-06-15',
  },
  {
    slug: 'judgment-of-paris',
    title: 'The Judgment at 50',
    section: 'feature',
    author: 'Mitch Frank',
    excerpt:
      'Fifty years after the 1976 Paris tasting that shocked the wine world, we revisit the wines, the wineries, and what it all means for Napa today.',
    body: "Half a century ago, a blind tasting in Paris rearranged how the world thought about California wine. Napa's Chardonnays and Cabernets stood beside the best of France — and held their own. Today we look back at the bottles, the people, and the ripple effects still shaping how collectors chase Stag's Leap and Montelena.",
    sponsorTier: null,
    featured: true,
    images: ['/placeholders/judgment-paris.jpg'],
    publishedAt: '2026-06-15',
  },
  {
    slug: 'napa-landmarks',
    title: 'Napa Valley Landmarks',
    section: 'feature',
    author: 'Chris Cardoso',
    excerpt:
      'The Welcome Sign. The Grape Crusher. The icons that define a place before you even taste a drop.',
    body: 'Before the first pour, Napa announces itself — highway signs, vineyard sculptures, and architecture that signals you have crossed into wine country. These landmarks anchor rituals for locals and become postcards for visitors; they are part of how the valley tells its own story.',
    sponsorTier: null,
    images: ['/placeholders/winery-landmark.jpg'],
    publishedAt: '2026-06-15',
  },
  {
    slug: 'napa-taco-tour',
    title: 'Napa Valley Taco Tour',
    section: 'dining',
    author: 'Chris Cardoso',
    excerpt:
      "Napa Valley and Mexico have a long-entwined history. Twelve taquerias — from Calistoga to downtown Napa — that prove the valley's best casual meal comes on a tortilla.",
    body: `Napa Valley and Mexico have a long-entwined history that has blended their cultures together along the way. Street tacos, once serving mainly as an easy meal for workers, have become a go-to food option beloved by all. Today, taquerias are located all over the valley, whether brick-and-mortar restaurants or food trucks.\n\nA proper street taco needs just five ingredients: tortilla, meat, sauce, cilantro and onion. The magic happens in high-quality ingredients.\n\nIt all starts with the tortilla. Dough made of masa harina de maíz and water is pressed flatly and cooked to form the base of a taco dish. The best tortillas are handmade to order and warmed on a grill.`,
    sponsorTier: null,
    featured: true,
    images: ['/placeholders/restaurant-casual.jpg'],
    publishedAt: '2026-06-15',
  },
  {
    slug: 'napa-calendar',
    title: 'The Napa Valley Calendar',
    section: 'calendar',
    author: 'MaryAnn Worobiec',
    excerpt:
      "Harvest brings the drama — but every season in Napa has its pleasures. Here's how the valley's year unfolds and the events worth planning around.",
    body: "January through March rewards with mustard bloom and cellar blending trials; bud break follows as one of the year's first dramas. Summer brings concerts and long cellar tastings before veraison paints the valley. August through October is harvest — the traffic, the night picks, the press loads that define Napa's calendar. Winter slows the pace but not the appetite: barrel samples, holiday meals, and truffle dinners fill the reservation books.",
    sponsorTier: null,
    images: ['/placeholders/harvest-season.jpg'],
    publishedAt: '2026-06-15',
  },
  {
    slug: 'napa-oakville',
    title: 'Oakville',
    section: 'regions',
    region: 'oakville',
    excerpt:
      'The Oakville AVA is sacred ground for Cabernet Sauvignon — benchmark estates and legendary vineyards in barely two miles of benchland.',
    body: `Located between Yountville and Rutherford as you head north, Oakville can appear to visitors as little more than a blip, with the famed Oakville Grocery serving as its spiritual center. Yet Oakville boasts the highest concentration of benchmark estates in Napa Valley.`,
    sponsorTier: null,
    images: ['/placeholders/oakville-vineyard.jpg'],
    publishedAt: '2026-06-15',
  },
  {
    slug: 'napa-rutherford',
    title: 'Rutherford',
    section: 'regions',
    region: 'rutherford',
    excerpt:
      'Rutherford dust, historic estates, and Sauvignon Blanc routes that prove Cabernet country isn’t red-only.',
    body: `When it comes to grapevines, Rutherford is one of Napa Valley's big names. But as far as towns go, Rutherford is a blink-and-you'll-miss-it spot along Highway 29.`,
    sponsorTier: null,
    images: ['/placeholders/rutherford-dust.jpg'],
    publishedAt: '2026-06-15',
  },
  {
    slug: 'napa-yountville',
    title: 'Yountville',
    section: 'regions',
    region: 'yountville',
    excerpt:
      'Walkable, star-studded, and the valley’s default answer when dinner has to be unforgettable.',
    body: `Yountville, founded in 1855 as Sebastopol, was renamed in 1867 in honor of George C. Yount, a pioneer widely credited with planting the first wine grapes in Napa Valley.`,
    sponsorTier: null,
    images: ['/placeholders/yountville-hero.jpg'],
    publishedAt: '2026-06-15',
  },
  {
    slug: 'napa-st-helena',
    title: 'St. Helena',
    section: 'regions',
    region: 'st-helena',
    excerpt:
      'Main Street energy, mountain back roads, and the winemakers you’ll spot at the espresso bar.',
    body: `St. Helena is the second to last town as you head north along the Highway 29 corridor, with the highway itself doubling as the town's main street.`,
    sponsorTier: null,
    images: ['/placeholders/st-helena-hero.jpg'],
    publishedAt: '2026-06-15',
  },
  {
    slug: 'napa-calistoga',
    title: 'Calistoga',
    section: 'regions',
    region: 'calistoga',
    excerpt: 'Geothermal pools, Howell Mountain escapes, and the relaxed northern personality of the valley.',
    body: `Tucked away at the northern end of Napa Valley, the town of Calistoga has long held its own, unique vibe.`,
    sponsorTier: null,
    images: ['/placeholders/calistoga-hero.jpg'],
    publishedAt: '2026-06-15',
  },
  {
    slug: 'napa-pritchard-hill',
    title: 'Pritchard Hill',
    section: 'regions',
    region: 'pritchard-hill',
    excerpt: 'Volcanic slopes east of the valley floor — concentrated Cabernets built to outlive elections.',
    body: `Pritchard Hill rises above the eastern edge of Napa Valley, offering a perspective — and a wine style — that is distinctly its own.`,
    sponsorTier: null,
    images: ['/placeholders/pritchard-hill-hero.jpg'],
    publishedAt: '2026-06-15',
  },
  {
    slug: 'napa-downtown',
    title: 'Downtown Napa',
    section: 'regions',
    region: 'downtown-napa',
    excerpt: 'Oxbow, riverfront tasting rooms, and Carneros twenty minutes south.',
    body: `Downtown Napa has transformed over the past two decades from a quiet county seat into a vibrant destination in its own right.`,
    sponsorTier: null,
    images: ['/placeholders/downtown-napa-hero.jpg'],
    publishedAt: '2026-06-15',
  },
]

export const featuredArticles = articles.filter((a) => a.featured)

export const articlesBySection = (section: string) =>
  articles.filter((a) => a.section === section)

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug)
