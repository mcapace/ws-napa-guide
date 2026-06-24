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

  const hasVenues = Boolean(content.venues?.length)
  const splitIntro = !hasVenues && content.introParagraphs.length > 1
  const midpoint = splitIntro ? Math.ceil(content.introParagraphs.length / 2) : content.introParagraphs.length
  const firstHalf = content.introParagraphs.slice(0, midpoint)
  const secondHalf = splitIntro ? content.introParagraphs.slice(midpoint) : []

  const showDeckOnHero = article.excerpt && !content.pullQuoteLines

  return (
    <div className={styles.page} data-site-surface="dark" data-editorial-content>
      <section
        className={`${styles.hero} ${hasVenues ? styles.heroEditorial : ''}`}
        data-nav-hero-root
      >
        <Image
          src={content.heroImage}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
          style={{
            objectFit: 'cover',
            objectPosition: content.heroObjectPosition ?? 'center center',
          }}
        />
        <div className={styles.heroGradient} />
        <div className={styles.heroContent}>
          <p className={styles.kicker}>
            {content.kicker ?? sectionLabel} &middot; June 2026
          </p>
          <h1 className={styles.title}>{article.title}</h1>
          {article.author && <p className={styles.author}>By {article.author}</p>}
          {showDeckOnHero && <p className={styles.heroDeck}>{article.excerpt}</p>}
        </div>
      </section>

      {(content.pullQuote || content.pullQuoteLines) && (
        <blockquote className={styles.pullQuote}>
          {content.pullQuote && <p className={styles.pullQuoteLead}>{content.pullQuote}</p>}
          {content.pullQuoteLines && (
            <p className={styles.pullQuoteLines}>
              {content.pullQuoteLines.map((line) => (
                <span key={line} className={styles.pullQuoteLine}>{line}</span>
              ))}
            </p>
          )}
        </blockquote>
      )}

      <section className={styles.bodySection}>
        {firstHalf.map((para, i) => (
          <p key={i} className={styles.paragraph}>{para}</p>
        ))}
      </section>

      {content.secondaryImages && content.secondaryImages.length > 0 && (
        <section className={styles.pointsSection}>
          <p className={styles.sectionLabel}>Points of interest</p>
          {content.secondaryImagesCaption && (
            <p className={styles.pointsIntro}>{content.secondaryImagesCaption}</p>
          )}
          <div className={styles.midImagePair}>
            {content.secondaryImages.map((img) => (
              <figure key={img.src} className={styles.midImageStrip}>
                <Image
                  src={img.src}
                  alt=""
                  width={img.width ?? 224}
                  height={img.height ?? 550}
                  sizes="220px"
                  className={styles.midImageStripImg}
                />
              </figure>
            ))}
          </div>
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
            <p key={i} className={styles.paragraph}>{para}</p>
          ))}
        </section>
      )}

      {content.outroParagraphs?.map((para, i) => (
        <section key={i} className={styles.bodySection}>
          <p className={styles.paragraph}>{para}</p>
        </section>
      ))}

      {content.venues && content.venues.length > 0 && (
        <section className={styles.venuesSection}>
          <div className={styles.venuesHead}>
            <p className={styles.sectionLabel}>Where to eat</p>
            <h2 className={styles.sectionTitle}>Taquerias worth the line</h2>
          </div>
          <ol className={styles.venueList}>
            {content.venues.map((venue, index) => (
              <li key={venue.name} className={styles.venueRow}>
                <span className={styles.venueIndex}>{index + 1}</span>
                <article className={styles.venueArticle}>
                  {venue.image && (
                    <div className={styles.venueThumb}>
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        sizes="200px"
                        className={styles.venueThumbImg}
                      />
                    </div>
                  )}
                  <div className={styles.venueCopy}>
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
              </li>
            ))}
          </ol>
        </section>
      )}

      {(content.winePicks?.length || content.termGroups?.length) && (
        <section className={styles.referenceSection}>
          <div className={styles.referenceGrid}>
            {content.winePicks && content.winePicks.length > 0 && (
              <div className={styles.referenceBlock}>
                <p className={styles.sectionLabel}>Pairing picks</p>
                <h2 className={styles.referenceTitle}>Wines to pair</h2>
                <ul className={styles.wineList}>
                  {content.winePicks.map((wine) => (
                    <li key={wine.name} className={styles.wineItem}>
                      <span className={styles.wineName}>{wine.name}</span>
                      <span className={styles.wineDetail}>{wine.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {content.termGroups && content.termGroups.length > 0 && (
              <div className={styles.referenceBlock}>
                <p className={styles.sectionLabel}>Reference</p>
                <h2 className={styles.referenceTitle}>Taco terms</h2>
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
            )}
          </div>
        </section>
      )}
    </div>
  )
}
