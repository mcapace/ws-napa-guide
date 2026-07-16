import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/types'
import { featuredArticles } from '@/data/articles'
import { getStoryHeroImage, storySectionLabel } from '@/data/site-stories'
import styles from './ReadNextSection.module.css'

function ReadNextCard({ article }: { article: Article }) {
  return (
    <li>
      <Link href={`/features/${article.slug}`} className={styles.card}>
        <div className={styles.imageWrap}>
          <Image
            src={getStoryHeroImage(article)}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 340px"
            className={styles.image}
          />
          <div className={styles.imageScrim} />
          <span className={styles.sectionBadge}>{storySectionLabel(article.section)}</span>
        </div>
        <div className={styles.body}>
          <p className={styles.meta}>
            {article.author ?? 'Wine Spectator'} · June 2026
          </p>
          <h3 className={styles.cardTitle}>{article.title}</h3>
          <p className={styles.excerpt}>{article.excerpt}</p>
          <span className={styles.cta}>Read story →</span>
        </div>
      </Link>
    </li>
  )
}

export function ReadNextSection({ slug }: { slug: string }) {
  const related = featuredArticles.filter((a) => a.slug !== slug).slice(0, 3)
  if (related.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="read-next-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Continue reading</p>
          <h2 id="read-next-heading" className={styles.title}>Read next</h2>
          <p className={styles.intro}>
            More from Wine Spectator&apos;s June 2026 Napa Valley guide.
          </p>
        </header>

        <ul className={`${styles.grid} dim-siblings`}>
          {related.map((article) => (
            <ReadNextCard key={article.slug} article={article} />
          ))}
        </ul>
      </div>
    </section>
  )
}
