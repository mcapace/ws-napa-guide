import { articles } from '@/data/articles'
import type { Article } from '@/lib/types'
import { getFeatureArticleContent } from '@/data/feature-articles'

/** Magazine features with live `/features/[slug]` pages — order is editorial. */
export const STORY_SLUGS = [
  'judgment-of-paris',
  'napa-taco-tour',
] as const

/** Homepage spotlight pair — large cards above the rest of the issue grid. */
export const STORY_SPOTLIGHT_SLUGS = ['judgment-of-paris', 'napa-taco-tour'] as const

export type StorySlug = (typeof STORY_SLUGS)[number]

export function getStoryArticles(): Article[] {
  return STORY_SLUGS
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((article): article is Article => Boolean(article))
}

export function getStoryHeroImage(article: Article): string {
  const feature = getFeatureArticleContent(article.slug)
  return feature?.heroImage ?? article.images[0]
}

export function storySectionLabel(section: Article['section']): string {
  switch (section) {
    case 'lede':
      return 'Guide'
    case 'dining':
      return 'Dining'
    case 'feature':
      return 'Feature'
    default:
      return 'Story'
  }
}
