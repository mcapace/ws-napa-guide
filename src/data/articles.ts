import type { Article } from '@/lib/types'
import { TEST_IMAGES } from '@/lib/test-images'

export const articles: Article[] = [
  {
    slug: 'judgment-of-paris',
    title: 'The Judgment at 50',
    section: 'feature',
    author: 'Mitch Frank',
    relatedWineries: ['opus-one'],
    excerpt:
      'Fifty years after the 1976 Paris tasting, we revisit the wines, the wineries, and what it all means for Napa today.',
    sponsorTier: null,
    featured: true,
    images: [
      '/images/features/judgment-of-paris/hero.jpg',
      '/images/features/judgment-of-paris/points-montelena.jpg',
      '/images/features/judgment-of-paris/points-stags-leap.jpg',
      '/images/features/judgment-of-paris/tasting-judges.png',
    ],
    publishedAt: '2026-06-15',
  },
  {
    slug: 'napa-taco-tour',
    title: 'Napa Valley Taco Tour',
    section: 'dining',
    author: 'Chris Cardoso',
    excerpt:
      "Napa Valley and Mexico have a long-entwined history. Thirteen taquerias — from Calistoga to downtown Napa — that prove the valley's best casual meal comes on a tortilla.",
    sponsorTier: null,
    featured: true,
    images: [
      '/images/features/napa-taco-tour/hero.jpg',
      '/images/features/napa-taco-tour/venue-el-sabor-serano.jpg',
      '/images/features/napa-taco-tour/venue-mothers-tacos.jpg',
      '/images/features/napa-taco-tour/venue-el-taco-feliz.jpg',
      '/images/features/napa-taco-tour/venue-ray-rays-tacos.jpg',
      '/images/features/napa-taco-tour/venue-tacos-el-muchacho-alegre.jpg',
    ],
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
    images: [TEST_IMAGES[0]],
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
    images: [TEST_IMAGES[1]],
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
    images: [TEST_IMAGES[2]],
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
    images: [TEST_IMAGES[3]],
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
    images: [TEST_IMAGES[4]],
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
    images: [TEST_IMAGES[5]],
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
    images: [TEST_IMAGES[6]],
    publishedAt: '2026-06-15',
  },
]

export const featuredArticles = articles.filter((a) => a.featured)

export const articlesBySection = (section: string) =>
  articles.filter((a) => a.section === section)

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug)
