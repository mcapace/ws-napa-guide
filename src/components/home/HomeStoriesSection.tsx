import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/types'
import { storySectionLabel } from '@/data/site-stories'
import styles from './HomeStoriesSection.module.css'

type Props = {
  stories: Article[]
  showViewAll?: boolean
}

export function HomeStoriesSection({ stories, showViewAll = true }: Props) {
  if (stories.length === 0) return null

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

      <div className={`${styles.grid} dim-siblings`}>
        {stories.map((article) => (
          <Link
            key={article.slug}
            href={`/features/${article.slug}`}
            className={styles.card}
          >
            <div className={styles.imageWrap}>
              <Image
                src={article.images[0]}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />
            </div>
            <div className={styles.body}>
              <p className={styles.cardEyebrow}>{storySectionLabel(article.section)}</p>
              <h3 className={styles.cardTitle}>{article.title}</h3>
              <p className={styles.cardExcerpt}>{article.excerpt}</p>
              <span className={styles.readLink}>Read story →</span>
            </div>
          </Link>
        ))}
      </div>

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
