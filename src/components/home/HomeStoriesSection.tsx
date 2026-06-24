import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/types'
import {
  STORY_SPOTLIGHT_SLUGS,
  getStoryHeroImage,
  storySectionLabel,
} from '@/data/site-stories'
import styles from './HomeStoriesSection.module.css'

type Props = {
  stories: Article[]
  showViewAll?: boolean
}

function StoryCard({
  article,
  variant = 'default',
}: {
  article: Article
  variant?: 'default' | 'spotlight' | 'compact'
}) {
  return (
    <Link
      href={`/features/${article.slug}`}
      className={`${styles.card} ${styles[`card_${variant}`]}`}
    >
      <div className={styles.imageWrap}>
        <Image
          src={getStoryHeroImage(article)}
          alt=""
          fill
          sizes={
            variant === 'spotlight'
              ? '(max-width: 768px) 100vw, 50vw'
              : variant === 'compact'
                ? '(max-width: 768px) 100vw, 33vw'
                : '(max-width: 768px) 100vw, 50vw'
          }
          className={styles.image}
        />
        <div className={styles.imageScrim} />
      </div>
      <div className={styles.body}>
        <p className={styles.cardEyebrow}>{storySectionLabel(article.section)}</p>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        {variant !== 'compact' && (
          <p className={styles.cardExcerpt}>{article.excerpt}</p>
        )}
        <span className={styles.readLink}>Read story →</span>
      </div>
    </Link>
  )
}

export function HomeStoriesSection({ stories, showViewAll = true }: Props) {
  if (stories.length === 0) return null

  const spotlightSet = new Set<string>(STORY_SPOTLIGHT_SLUGS)
  const spotlight = stories.filter((s) => spotlightSet.has(s.slug))
  const rest = stories.filter((s) => !spotlightSet.has(s.slug))

  return (
    <section className={styles.section} aria-labelledby="home-stories-heading">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Wine Spectator · June 2026</p>
        <h2 id="home-stories-heading" className={styles.title}>
          From the issue
        </h2>
        <p className={styles.intro}>
          Features, history, and the stories behind the valley — beyond the appellations and listings.
        </p>
      </header>

      {spotlight.length > 0 && (
        <div className={`${styles.spotlightGrid} dim-siblings`}>
          {spotlight.map((article) => (
            <StoryCard key={article.slug} article={article} variant="spotlight" />
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div className={`${styles.grid} ${styles.gridCompact} dim-siblings`}>
          {rest.map((article) => (
            <StoryCard key={article.slug} article={article} variant="compact" />
          ))}
        </div>
      )}

      {showViewAll ? (
        <div className={styles.footer}>
          <Link href="/features" className={styles.allLink}>
            All stories from the issue
          </Link>
        </div>
      ) : null}
    </section>
  )
}
