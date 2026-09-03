'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { PartnerDestination } from '@/data/partners'
import { introGalleryShot } from '@/data/partner-galleries'
import { withNapaGuideUtm } from '@/lib/outbound-utm'
import { PartnerPhotoCollage } from '@/components/partners/PartnerPhotoCollage'
import { PartnerScrollEnhancements } from '@/components/partners/PartnerScrollEnhancements'
import styles from './PartnerDestinationPage.module.css'

function heroDeck(description: string): string {
  const first = description.split(/(?<=[.!?])\s+/)[0]?.trim()
  return first && first.length < 220 ? first : `${description.slice(0, 160).trimEnd()}…`
}

function introParagraphs(description: string): string[] {
  const parts = description
    .split(/(?<=[.!?])\s+/)
    .map((p) => p.trim())
    .filter(Boolean)
  if (parts.length <= 2) return parts
  return [parts[0], parts.slice(1).join(' ')]
}

export function PartnerDestinationPage({ partner }: { partner: PartnerDestination }) {
  const bookHref = withNapaGuideUtm(partner.bookUrl)
  const clubHref = withNapaGuideUtm(partner.wineClubUrl)
  const siteHref = withNapaGuideUtm(partner.website)
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    [...partner.addressLines, partner.name].join(', '),
  )}`

  const paragraphs = introParagraphs(partner.description)
  const introStill = introGalleryShot(partner.gallery, partner.heroImage)

  return (
    <article className={styles.page} data-partner-page>
      <PartnerScrollEnhancements bookHref={bookHref} />

      <section className={styles.hero} data-nav-hero-root data-site-surface="dark" data-partner-hero>
        <div className={styles.heroMedia} data-partner-hero-media>
          <Image
            src={partner.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroGradient} />
        <div className={styles.heroContent} data-partner-hero-content>
          {partner.logoSrc ? (
            <div className={styles.logoWrap}>
              <Image
                src={partner.logoSrc}
                alt={partner.logoAlt ?? partner.brandLabel}
                width={220}
                height={120}
                priority
                className={styles.logoHero}
              />
              <p className={styles.logoRegion}>{partner.regionName}</p>
            </div>
          ) : (
            <p className={styles.eyebrow}>
              {partner.brandLabel} · {partner.regionName}
            </p>
          )}
          <h1 className={styles.title}>{partner.name}</h1>
          <p className={styles.deck}>{heroDeck(partner.description)}</p>
          <a href={bookHref} className={styles.ctaSolidLight} target="_blank" rel="noopener noreferrer">
            Book a tasting
          </a>
        </div>
      </section>

      <aside className={styles.stickyBook} data-partner-sticky-book>
        <p className={styles.stickyBookLabel}>{partner.brandLabel}</p>
        <a href={bookHref} className={styles.stickyBookCta} target="_blank" rel="noopener noreferrer">
          Book a tasting
        </a>
      </aside>

      <section className={styles.intro}>
        <div className={styles.introGrid} data-partner-reveal>
          <div className={styles.introCopy}>
            <p className={styles.sectionLabel}>The property</p>
            {paragraphs.map((p) => (
              <p key={p.slice(0, 48)} className={styles.introBody}>
                {p}
              </p>
            ))}
            {partner.featuredWines ? (
              <p className={styles.winesLine}>
                <span>Featured wines</span>
                {partner.featuredWines}
              </p>
            ) : null}
          </div>
          {introStill ? (
            <figure className={styles.introStill} data-partner-image-reveal>
              <div className={styles.introStillFrame} data-partner-image-frame>
                <Image
                  src={introStill.src}
                  alt={introStill.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className={styles.introStillImage}
                />
              </div>
            </figure>
          ) : null}
        </div>
      </section>

      {partner.sellingPoints.length > 0 ? (
        <section className={styles.highlights} aria-label="Why visit">
          <div className={styles.highlightsInner} data-partner-reveal>
            <p className={styles.sectionLabel}>Why visit</p>
            <h2 className={styles.sectionTitle}>What makes {partner.name} distinctive</h2>
            <ul className={styles.highlightList}>
              {partner.sellingPoints.map((point) => (
                <li key={point.slice(0, 48)} className={styles.highlightItem}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <PartnerPhotoCollage
        shots={partner.gallery}
        heroSrc={partner.heroImage}
        excludeSrcs={introStill ? [introStill.src] : []}
        photoCredit={partner.photoCredit}
        propertyName={partner.name}
        bookHref={bookHref}
      />

      <section className={styles.experiences}>
        <div className={styles.experiencesHead} data-partner-reveal>
          <p className={styles.sectionLabel}>Experiences</p>
          <h2 className={styles.sectionTitle}>Tastings &amp; tours</h2>
          <p className={styles.experiencesDeck}>
            Reserve the experience that fits your visit — from relaxed bar tastings to private cave tours.
          </p>
        </div>
        <ul className={styles.experienceList}>
          {partner.experiences.map((exp) => (
            <li key={exp.title} className={styles.experience} data-partner-experience>
              <div className={styles.experienceTop}>
                <h3 className={styles.experienceTitle}>{exp.title}</h3>
                {exp.price ? <p className={styles.experiencePrice}>{exp.price}</p> : null}
              </div>
              <p className={styles.experienceCopy}>{exp.description}</p>
              {exp.details && exp.details.length > 0 ? (
                <p className={styles.experienceMeta}>{exp.details.join(' · ')}</p>
              ) : null}
              <a href={bookHref} className={styles.experienceBook} target="_blank" rel="noopener noreferrer">
                Reserve this experience
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.bookBand} data-partner-book-band aria-label="Book your visit">
        <div className={styles.bookBandInner}>
          <p className={styles.bookBandEyebrow}>Ready when you are</p>
          <h2 className={styles.bookBandTitle}>Your table at {partner.name} awaits</h2>
          <p className={styles.bookBandCopy}>
            Tastings fill quickly in Napa — reserve now and lock in the experience that fits your trip.
          </p>
          <a href={bookHref} className={styles.bookBandCta} target="_blank" rel="noopener noreferrer">
            Book a tasting
          </a>
        </div>
      </section>

      <section className={styles.visit}>
        <div className={styles.visitInner} data-partner-reveal>
          <p className={styles.sectionLabel}>Visit</p>
          <h2 className={styles.visitTitle}>Plan your visit to {partner.name}</h2>
          <p className={styles.visitAddress}>{partner.addressLines.join(', ')}</p>
          <p className={styles.visitMeta}>
            {partner.hours}
            <span aria-hidden> · </span>
            <a href={`tel:${partner.phone.replace(/[^\d+]/g, '')}`}>{partner.phone}</a>
          </p>
          <div className={styles.visitActions}>
            <a href={bookHref} className={styles.ctaSolid} target="_blank" rel="noopener noreferrer">
              Book a tasting
            </a>
            <a href={clubHref} className={styles.ctaUnderline} target="_blank" rel="noopener noreferrer">
              Join the wine club
            </a>
          </div>
          <div className={styles.visitLinks}>
            <a href={mapsHref} target="_blank" rel="noopener noreferrer">
              Directions
            </a>
            <a href={siteHref} target="_blank" rel="noopener noreferrer">
              {partner.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </a>
            <Link href={`/regions/${partner.regionSlug}`}>Explore {partner.regionName}</Link>
          </div>
        </div>
      </section>
    </article>
  )
}
