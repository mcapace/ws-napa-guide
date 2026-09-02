import Image from 'next/image'
import Link from 'next/link'
import type { PartnerDestination } from '@/data/partners'
import { withNapaGuideUtm } from '@/lib/outbound-utm'
import styles from './PartnerDestinationPage.module.css'

function heroDeck(description: string): string {
  const first = description.split(/(?<=[.!?])\s+/)[0]?.trim()
  return first && first.length < 220 ? first : description.slice(0, 160).trimEnd() + '…'
}

export function PartnerDestinationPage({ partner }: { partner: PartnerDestination }) {
  const bookHref = withNapaGuideUtm(partner.bookUrl)
  const clubHref = withNapaGuideUtm(partner.wineClubUrl)
  const siteHref = withNapaGuideUtm(partner.website)
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    [...partner.addressLines, partner.name].join(', '),
  )}`
  const highlights = partner.sellingPoints.slice(0, 3)
  const leadShot = partner.gallery[0]
  const mosaic = partner.gallery.slice(0, 6)

  return (
    <article className={styles.page} data-site-surface="dark" data-editorial-content>
      <section className={styles.hero} data-nav-hero-root>
        <Image
          src={partner.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroGradient} />
        <div className={styles.heroContent}>
          <p className={styles.kicker}>
            {partner.brandLabel}
            <span className={styles.kickerDot} aria-hidden />
            {partner.regionName}
          </p>
          <h1 className={styles.title}>{partner.name}</h1>
          <p className={styles.deck}>{heroDeck(partner.description)}</p>
          <a href={bookHref} className={styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
            Book a tasting
          </a>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.introInner}>
          <p className={styles.introEyebrow}>The property</p>
          <p className={styles.introCopy}>{partner.description}</p>
          <p className={styles.winesLine}>
            <span>Featured wines</span>
            {partner.featuredWines}
          </p>
        </div>
        {leadShot ? (
          <figure className={styles.introFigure}>
            <Image
              src={leadShot.src}
              alt={leadShot.alt}
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              className={styles.introImage}
            />
          </figure>
        ) : null}
      </section>

      <section className={styles.gallerySection} aria-label="On the property">
        <div className={styles.galleryHead}>
          <p className={styles.sectionLabel}>Gallery</p>
          <h2 className={styles.sectionTitle}>On the property</h2>
        </div>
        <div className={styles.mosaic}>
          {mosaic.map((shot, i) => {
            const spanClass =
              i === 0
                ? styles.mosaicItem1
                : i === 1
                  ? styles.mosaicItem2
                  : i === 2
                    ? styles.mosaicItem3
                    : i === 3
                      ? styles.mosaicItem4
                      : i === 4
                        ? styles.mosaicItem5
                        : styles.mosaicItem6
            return (
              <figure key={shot.src} className={`${styles.mosaicItem} ${spanClass}`}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.mosaicImage}
                />
              </figure>
            )
          })}
        </div>
        <p className={styles.photoCredit}>Photography · {partner.photoCredit}</p>
      </section>

      <section className={styles.experiences}>
        <div className={styles.experiencesHead}>
          <p className={styles.sectionLabel}>Experiences</p>
          <h2 className={styles.sectionTitle}>Tastings &amp; tours</h2>
          <p className={styles.experiencesDeck}>
            Private and shared experiences on the estate — reserve ahead.
          </p>
        </div>
        <ol className={styles.experienceList}>
          {partner.experiences.map((exp, index) => (
            <li key={exp.title} className={styles.experience}>
              <div className={styles.experienceIndex} aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className={styles.experienceBody}>
                <div className={styles.experienceTop}>
                  <h3 className={styles.experienceTitle}>{exp.title}</h3>
                  {exp.price ? <p className={styles.experiencePrice}>{exp.price}</p> : null}
                </div>
                <p className={styles.experienceCopy}>{exp.description}</p>
                {exp.details && exp.details.length > 0 ? (
                  <p className={styles.experienceMeta}>{exp.details.join(' · ')}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
        <a href={bookHref} className={styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
          Reserve your visit
        </a>
      </section>

      <section className={styles.highlights}>
        <div className={styles.highlightsInner}>
          <p className={styles.sectionLabel}>Why visit</p>
          <h2 className={styles.sectionTitle}>What sets it apart</h2>
          <ul className={styles.highlightList}>
            {highlights.map((point, i) => (
              <li key={point} className={styles.highlightItem}>
                <span className={styles.highlightNum} aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p>{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.visit}>
        <div className={styles.visitCopy}>
          <p className={styles.sectionLabel}>Plan your visit</p>
          <h2 className={styles.visitTitle}>Come taste with us</h2>
          <p className={styles.visitAddress}>
            {partner.addressLines.join(', ')}
          </p>
          <p className={styles.visitMeta}>
            {partner.hours}
            <span aria-hidden> · </span>
            <a href={`tel:${partner.phone.replace(/[^\d+]/g, '')}`}>{partner.phone}</a>
          </p>
        </div>
        <div className={styles.visitActions}>
          <a href={bookHref} className={styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
            Book a tasting
          </a>
          <a href={clubHref} className={styles.ctaSecondary} target="_blank" rel="noopener noreferrer">
            Wine club
          </a>
          <a href={mapsHref} className={styles.ctaText} target="_blank" rel="noopener noreferrer">
            Directions
          </a>
          <a href={siteHref} className={styles.ctaText} target="_blank" rel="noopener noreferrer">
            {partner.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </a>
          <Link href={`/regions/${partner.regionSlug}`} className={styles.ctaText}>
            Explore {partner.regionName}
          </Link>
        </div>
      </section>
    </article>
  )
}
