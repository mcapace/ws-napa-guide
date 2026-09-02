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
  const inView = useInView(ref, { once: true, amount: 0.18 })
  const show = reduceMotion === true || inView

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
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

  const highlights = partner.sellingPoints.slice(0, 3)
  const pullQuote = highlights[0]
  const showcasePanels = [
    {
      image: partner.gallery[1] ?? partner.gallery[0],
      eyebrow: 'On the grounds',
      title: partner.name,
      copy: partner.description,
      align: 'left' as const,
    },
    {
      image: partner.gallery[2] ?? partner.gallery[1] ?? partner.gallery[0],
      eyebrow: 'The experience',
      title: highlights[1] ? highlights[1].split(/[.!?]/)[0] : 'World-class Cabernet & hospitality',
      copy: highlights[1] ?? partner.description,
      align: 'right' as const,
    },
  ].filter((p) => p.image)

  const mosaic = partner.gallery.slice(0, 5)
  const experienceShots = partner.gallery

  return (
    <article className={styles.page} data-site-surface="dark">
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
          <p className={styles.partnerMark}>
            <span>Founding Partner</span>
            <span className={styles.partnerMarkRule} aria-hidden />
            <span>
              {partner.brandLabel} · {partner.regionName}
            </span>
          </p>
          <h1 className={styles.title}>{partner.name}</h1>
          <p className={styles.deck}>{heroDeck(partner.description)}</p>
          <a href={bookHref} className={styles.ctaUnderline} target="_blank" rel="noopener noreferrer">
            Book a tasting
          </a>
        </div>
      </section>

      {pullQuote ? (
        <FadeUp>
          <blockquote className={styles.pullQuote}>
            <p>{pullQuote}</p>
          </blockquote>
        </FadeUp>
      ) : null}

      {showcasePanels.map((panel, index) => (
        <section
          key={panel.image!.src + index}
          className={`${styles.showcase} ${panel.align === 'right' ? styles.showcaseRight : ''}`}
        >
          <div className={styles.showcaseMedia}>
            <Image
              src={panel.image!.src}
              alt={panel.image!.alt}
              fill
              sizes="100vw"
              className={styles.showcaseImage}
            />
            <div className={styles.showcaseScrim} />
          </div>
          <FadeUp
            className={styles.showcaseCopy}
            delay={0.08}
          >
            <p className={styles.sectionLabel}>{panel.eyebrow}</p>
            <h2 className={styles.showcaseTitle}>{panel.title}</h2>
            <p className={styles.showcaseBody}>{panel.copy}</p>
            {index === 0 ? (
              <a href={bookHref} className={styles.ctaUnderline} target="_blank" rel="noopener noreferrer">
                Reserve your visit
              </a>
            ) : (
              <p className={styles.winesInline}>
                <span>Featured wines</span>
                {partner.featuredWines}
              </p>
            )}
          </FadeUp>
        </section>
      ))}

      <section className={styles.filmstripSection} aria-label="More from the property">
        <FadeUp className={styles.filmstripHead}>
          <p className={styles.sectionLabel}>Gallery</p>
          <h2 className={styles.sectionTitle}>Moments on the estate</h2>
        </FadeUp>
        <div className={styles.filmstrip}>
          {mosaic.map((shot) => (
            <figure key={shot.src} className={styles.filmstripItem}>
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 768px) 80vw, 28vw"
                className={styles.filmstripImage}
              />
            </figure>
          ))}
        </div>
        <p className={styles.photoCredit}>Photography · {partner.photoCredit}</p>
      </section>

      <section className={styles.experiences}>
        <FadeUp className={styles.experiencesHead}>
          <p className={styles.sectionLabel}>Experiences</p>
          <h2 className={styles.sectionTitle}>Tastings &amp; tours</h2>
          <p className={styles.experiencesDeck}>
            Curated visits on the estate — appointments preferred.
          </p>
        </FadeUp>
        <ol className={styles.experienceList}>
          {partner.experiences.map((exp, index) => {
            const shot = experienceShots[index % experienceShots.length]
            return (
              <FadeUp key={exp.title} delay={Math.min(index * 0.04, 0.16)}>
                <li className={styles.experience}>
                  {shot ? (
                    <div className={styles.experienceThumb}>
                      <Image
                        src={shot.src}
                        alt=""
                        fill
                        sizes="140px"
                        className={styles.experienceThumbImage}
                      />
                    </div>
                  ) : null}
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
              </FadeUp>
            )
          })}
        </ol>
      </section>

      {highlights.length > 1 ? (
        <section className={styles.highlights}>
          <FadeUp className={styles.highlightsInner}>
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
          </FadeUp>
        </section>
      ) : null}

      <section className={styles.presenting}>
        <FadeUp className={styles.presentingInner}>
          <p className={styles.presentingMark}>Wine Spectator Partner Destination</p>
          <h2 className={styles.presentingTitle}>Plan your visit to {partner.name}</h2>
          <p className={styles.presentingAddress}>{partner.addressLines.join(', ')}</p>
          <p className={styles.presentingMeta}>
            {partner.hours}
            <span aria-hidden> · </span>
            <a href={`tel:${partner.phone.replace(/[^\d+]/g, '')}`}>{partner.phone}</a>
          </p>
          <div className={styles.presentingActions}>
            <a href={bookHref} className={styles.ctaGold} target="_blank" rel="noopener noreferrer">
              Book a tasting
            </a>
            <a href={clubHref} className={styles.ctaGhost} target="_blank" rel="noopener noreferrer">
              Join the wine club
            </a>
          </div>
          <div className={styles.presentingLinks}>
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
