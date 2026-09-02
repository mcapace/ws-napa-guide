'use client'

import { useRef, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { PartnerDestination } from '@/data/partners'
import { withNapaGuideUtm } from '@/lib/outbound-utm'
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

function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const show = reduceMotion === true || inView

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function PartnerDestinationPage({ partner }: { partner: PartnerDestination }) {
  const bookHref = withNapaGuideUtm(partner.bookUrl)
  const clubHref = withNapaGuideUtm(partner.wineClubUrl)
  const siteHref = withNapaGuideUtm(partner.website)
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    [...partner.addressLines, partner.name].join(', '),
  )}`

  const paragraphs = introParagraphs(partner.description)
  const still = partner.gallery[0]
  const galleryShots = partner.gallery.slice(0, 3)

  return (
    <article className={styles.page}>
      <section className={styles.hero} data-nav-hero-root data-site-surface="dark">
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
          <p className={styles.eyebrow}>
            {partner.brandLabel} · {partner.regionName}
          </p>
          <h1 className={styles.title}>{partner.name}</h1>
          <p className={styles.deck}>{heroDeck(partner.description)}</p>
          <a href={bookHref} className={styles.ctaUnderlineLight} target="_blank" rel="noopener noreferrer">
            Book a tasting
          </a>
        </div>
      </section>

      <section className={styles.intro}>
        <FadeUp className={styles.introGrid}>
          <div className={styles.introCopy}>
            <p className={styles.sectionLabel}>The property</p>
            {paragraphs.map((p) => (
              <p key={p.slice(0, 48)} className={styles.introBody}>
                {p}
              </p>
            ))}
          </div>
          {still ? (
            <figure className={styles.introStill}>
              <div className={styles.introStillFrame}>
                <Image
                  src={still.src}
                  alt={still.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className={styles.introStillImage}
                />
              </div>
              {partner.featuredWines ? (
                <figcaption className={styles.winesLine}>
                  <span>Featured wines</span>
                  {partner.featuredWines}
                </figcaption>
              ) : null}
            </figure>
          ) : null}
        </FadeUp>
      </section>

      <section className={styles.experiences}>
        <FadeUp className={styles.experiencesHead}>
          <p className={styles.sectionLabel}>Experiences</p>
          <h2 className={styles.sectionTitle}>Tastings &amp; tours</h2>
        </FadeUp>
        <ul className={styles.experienceList}>
          {partner.experiences.map((exp) => (
            <li key={exp.title} className={styles.experience}>
              <div className={styles.experienceTop}>
                <h3 className={styles.experienceTitle}>{exp.title}</h3>
                {exp.price ? <p className={styles.experiencePrice}>{exp.price}</p> : null}
              </div>
              <p className={styles.experienceCopy}>{exp.description}</p>
              {exp.details && exp.details.length > 0 ? (
                <p className={styles.experienceMeta}>{exp.details.join(' · ')}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {galleryShots.length > 0 ? (
        <section className={styles.gallery} aria-label="Gallery">
          <FadeUp className={styles.galleryHead}>
            <p className={styles.sectionLabel}>Gallery</p>
            <h2 className={styles.sectionTitle}>On the grounds</h2>
          </FadeUp>
          <div className={styles.galleryGrid}>
            {galleryShots.map((shot) => (
              <figure key={shot.src} className={styles.galleryItem}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                  className={styles.galleryImage}
                />
              </figure>
            ))}
          </div>
          <p className={styles.photoCredit}>Photography · {partner.photoCredit}</p>
        </section>
      ) : null}

      <section className={styles.visit}>
        <FadeUp className={styles.visitInner}>
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
        </FadeUp>
      </section>
    </article>
  )
}
