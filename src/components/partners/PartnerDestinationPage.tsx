'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { PartnerDestination } from '@/data/partners'
import { withNapaGuideUtm } from '@/lib/outbound-utm'
import styles from './PartnerDestinationPage.module.css'

type GalleryShot = PartnerDestination['gallery'][number]

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

function GalleryLightbox({
  shots,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  shots: GalleryShot[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const shot = shots[index]

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onNext, onPrev])

  return (
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Gallery image viewer">
      <button type="button" className={styles.lightboxBackdrop} onClick={onClose} aria-label="Close gallery" />
      <div className={styles.lightboxFrame}>
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="100vw"
          className={styles.lightboxImage}
          priority
        />
      </div>
      <p className={styles.lightboxCaption}>{shot.alt}</p>
      <div className={styles.lightboxControls}>
        <button type="button" className={styles.lightboxNav} onClick={onPrev} aria-label="Previous image">
          ←
        </button>
        <span className={styles.lightboxCount}>
          {index + 1} / {shots.length}
        </span>
        <button type="button" className={styles.lightboxNav} onClick={onNext} aria-label="Next image">
          →
        </button>
      </div>
      <button type="button" className={styles.lightboxClose} onClick={onClose} aria-label="Close gallery">
        Close
      </button>
    </div>
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
  const introStill = partner.gallery[0]
  const wineMoments = partner.gallery.slice(1, 4)
  const galleryShots = partner.gallery
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevLightbox = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? null : (current - 1 + galleryShots.length) % galleryShots.length,
    )
  }, [galleryShots.length])
  const nextLightbox = useCallback(() => {
    setLightboxIndex((current) => (current === null ? null : (current + 1) % galleryShots.length))
  }, [galleryShots.length])

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
          {introStill ? (
            <figure className={styles.introStill}>
              <button
                type="button"
                className={styles.introStillButton}
                onClick={() => openLightbox(0)}
                aria-label={`View larger: ${introStill.alt}`}
              >
                <div className={styles.introStillFrame}>
                  <Image
                    src={introStill.src}
                    alt={introStill.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 48vw"
                    className={styles.introStillImage}
                  />
                </div>
              </button>
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

      {wineMoments.length > 0 ? (
        <section className={styles.wineStrip} aria-label="In the glass">
          <FadeUp className={styles.wineStripHead}>
            <p className={styles.sectionLabel}>In the glass</p>
            <h2 className={styles.sectionTitle}>Tasting moments</h2>
          </FadeUp>
          <div className={styles.wineStripTrack}>
            {wineMoments.map((shot, index) => (
              <button
                key={shot.src}
                type="button"
                className={styles.wineStripItem}
                onClick={() => openLightbox(index + 1)}
                aria-label={`View larger: ${shot.alt}`}
              >
                <div className={styles.wineStripFrame}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 700px) 88vw, 34vw"
                    className={styles.wineStripImage}
                  />
                </div>
                <span className={styles.wineStripCaption}>{shot.alt}</span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

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
            <p className={styles.galleryDeck}>
              A full look at the estate, tasting rooms, and wine experiences at {partner.name}.
            </p>
          </FadeUp>
          <div className={styles.galleryMosaic}>
            {galleryShots.map((shot, index) => (
              <button
                key={shot.src}
                type="button"
                className={`${styles.galleryTile} ${styles[`galleryTile${index + 1}`] ?? ''}`}
                onClick={() => openLightbox(index)}
                aria-label={`View larger: ${shot.alt}`}
              >
                <div className={styles.galleryTileFrame}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                    className={styles.galleryTileImage}
                  />
                </div>
                <span className={styles.galleryTileCaption}>{shot.alt}</span>
              </button>
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

      {lightboxIndex !== null ? (
        <GalleryLightbox
          shots={galleryShots}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      ) : null}
    </article>
  )
}
