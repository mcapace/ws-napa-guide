import { articles } from '@/data/articles'
import type { Article } from '@/lib/types'

/** Magazine features with live `/features/[slug]` pages — order is editorial. */
export const STORY_SLUGS = [
  'napa-valley-guide',
  'judgment-of-paris',
  'napa-landmarks',
  'napa-taco-tour',
  'napa-calendar',
] as const

export type StorySlug = (typeof STORY_SLUGS)[number]

export function getStoryArticles(): Article[] {
  return STORY_SLUGS
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((article): article is Article => Boolean(article))
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
