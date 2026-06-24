import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/types'
import type { FeatureArticleContent } from '@/lib/types'
import styles from './FeatureArticleLayout.module.css'

function formatWebsite(url: string) {
  const href = url.startsWith('http') ? url : `https://${url}`
  const label = url.replace(/^https?:\/\/(www\.)?/, '')
  return { href, label }
}

export default function FeatureArticleLayout({
  article,
  content,
}: {
  article: Article
  content: FeatureArticleContent
}) {
  const sectionLabel =
    article.section === 'feature' ? 'Feature' : article.section === 'dining' ? 'Dining' : 'Wine Spectator'

  const midpoint = Math.ceil(content.introParagraphs.length / 2)
  const firstHalf = content.introParagraphs.slice(0, midpoint)
  const secondHalf = content.introParagraphs.slice(midpoint)

  return (
    <div className={styles.page} data-site-surface="dark">
      <section className={styles.hero} data-nav-hero-root>
        <Image
          src={content.heroImage}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.heroOverlay} />
      </section>

      <section className={styles.header}>
        <p className={styles.kicker}>
          {content.kicker ?? sectionLabel} &middot; June 2026
        </p>
        <h1 className={styles.title} data-text-split="" data-letters-rotate-in="">
          {article.title}
        </h1>
        {article.author && <p className={styles.author}>By {article.author}</p>}
      </section>

      {article.excerpt && (
        <p className={styles.excerpt} data-text-split="" data-lines-slide-up="">
          {article.excerpt}
        </p>
      )}

      {(content.pullQuote || content.pullQuoteLines) && (
        <blockquote className={styles.pullQuote}>
          {content.pullQuote && <p className={styles.pullQuoteLead}>{content.pullQuote}</p>}
          {content.pullQuoteLines && (
            <p className={styles.pullQuoteLines} data-text-split="" data-lines-slide-up="">
              {content.pullQuoteLines.join(' ')}
            </p>
          )}
        </blockquote>
      )}

      <section className={styles.bodySection}>
        {firstHalf.map((para, i) => (
          <p
            key={i}
            className={styles.paragraph}
            data-text-split=""
            data-lines-slide-up=""
          >
            {para}
          </p>
        ))}
      </section>

      {content.secondaryImages && content.secondaryImages.length > 0 && (
        <section className={styles.midImagePair}>
          {content.secondaryImages.map((img) => (
            <div key={img.src} className={styles.midImageStrip}>
              <Image
                src={img.src}
                alt={img.alt ?? ''}
                width={img.width ?? 224}
                height={img.height ?? 550}
                sizes="220px"
                className={styles.midImageStripImg}
              />
            </div>
          ))}
        </section>
      )}

      {content.secondaryImage && !content.secondaryImages?.length && (
        <section className={styles.midImage}>
          <div className={styles.midImageInner}>
            <Image
              src={content.secondaryImage}
              alt=""
              fill
              sizes="calc(100vw - 120px)"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </section>
      )}

      {secondHalf.length > 0 && (
        <section className={styles.bodySection}>
          {secondHalf.map((para, i) => (
            <p
              key={i}
              className={styles.paragraph}
              data-text-split=""
              data-lines-slide-up=""
            >
              {para}
            </p>
          ))}
        </section>
      )}

      {content.outroParagraphs?.map((para, i) => (
        <section key={i} className={styles.bodySection}>
          <p className={styles.paragraph} data-text-split="" data-lines-slide-up="">
            {para}
          </p>
        </section>
      ))}

      {content.venues && content.venues.length > 0 && (
        <section className={styles.venuesSection}>
          <div className={styles.venuesHead}>
            <p className={styles.sectionLabel}>Where to eat</p>
            <h2 className={styles.sectionTitle}>Taquerias worth the line</h2>
          </div>
          <div className={styles.venueGrid}>
            {content.venues.map((venue) => (
              <article key={venue.name} className={styles.venueCard}>
                {venue.image && (
                  <div className={styles.venueImage}>
                    <Image
                      src={venue.image}
                      alt={venue.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className={styles.venueBody}>
                  <h3 className={styles.venueName}>{venue.name}</h3>
                  <p className={styles.venueMeta}>
                    {venue.addressLines.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                    {venue.website && (
                      <a
                        href={formatWebsite(venue.website).href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {formatWebsite(venue.website).label}
                      </a>
                    )}
                    {venue.phone && (
                      <>
                        {venue.website && <br />}
                        {venue.phone}
                      </>
                    )}
                  </p>
                  <p className={styles.venueDesc}>{venue.description}</p>
                  {venue.restaurantSlug && (
                    <Link
                      href={`/dining/${venue.restaurantSlug}`}
                      className={styles.venueLink}
                    >
                      View in guide
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {content.winePicks && content.winePicks.length > 0 && (
        <section className={styles.wineSection}>
          <div className={styles.wineInner}>
            <p className={styles.sectionLabel}>Pairing picks</p>
            <h2 className={styles.sectionTitle}>Recommended wines to pair</h2>
            <ul className={styles.wineList}>
              {content.winePicks.map((wine) => (
                <li key={wine.name} className={styles.wineItem}>
                  <span className={styles.wineName}>{wine.name}</span>
                  <span className={styles.wineDetail}>{wine.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {content.termGroups && content.termGroups.length > 0 && (
        <section className={styles.termsSection}>
          <div className={styles.venuesHead}>
            <p className={styles.sectionLabel}>Reference</p>
            <h2 className={styles.sectionTitle}>Taco terms</h2>
          </div>
          <div className={styles.termsGrid}>
            {content.termGroups.map((group) => (
              <div key={group.title} className={styles.termGroup}>
                <h3 className={styles.termTitle}>{group.title}</h3>
                {group.intro && <p className={styles.termIntro}>{group.intro}</p>}
                <ul className={styles.termList}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.termItem}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
