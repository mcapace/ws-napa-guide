'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import type { MapPin } from '@/data/map-pins'
import { editorialDetailHref } from '@/lib/editorial-detail-link'
import { focalToTransformOrigin, getImageFocalPoint } from '@/lib/image-focal'
import styles from './FeaturedShowcase.module.css'

export type ShowcaseCategory = 'taste' | 'eat' | 'stay'

export type ShowcasePick = {
  key: string
  category: ShowcaseCategory
  name: string
  address?: string
  website?: string
  bodyPlain?: string
  image?: string
  imagePortrait?: string
}

const CATEGORY_EYEBROW: Record<ShowcaseCategory, string> = {
  taste: 'Tasting room',
  eat: 'Dining',
  stay: 'Stay',
}

function truncateBlurb(text: string, maxSentences = 3): string {
  const trimmed = text.trim()
  if (!trimmed) return ''

  const sentences = trimmed.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) ?? [trimmed]
  const joined = sentences.slice(0, maxSentences).join('').trim()
  if (joined.length <= 320) return joined

  const shorter = sentences.slice(0, 2).join('').trim()
  if (shorter.length <= 320) return shorter

  return `${shorter.slice(0, 297).trimEnd()}…`
}

function formatWebsiteLabel(url: string): string {
  return url.replace(/^https?:\/\//i, '').replace(/\/$/, '')
}

function normalizeWebsite(url?: string): string | undefined {
  if (!url?.trim()) return undefined
  return url.match(/^https?:\/\//i) ? url : `https://${url}`
}

type PanelProps = {
  pick: ShowcasePick
  regionSlug: string
  regionLabel: string
  index: number
  pins: MapPin[]
}

export function FeaturedShowcasePanel({
  pick,
  regionSlug,
  regionLabel,
  index,
  pins,
}: PanelProps) {
  const panelRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const isInView = useInView(panelRef, { once: true, amount: 0.12 })
  const showMotion = reduceMotion !== true && isInView

  const imageSrc = pick.image ?? pick.imagePortrait
  const anchorRight = index % 2 === 1
  const detailHref = editorialDetailHref(pins, pick.category, regionSlug, pick.name)
  const website = normalizeWebsite(pick.website)
  const blurb = truncateBlurb(pick.bodyPlain ?? '')
  const eyebrow = `${CATEGORY_EYEBROW[pick.category]} · ${regionLabel}`

  const landscapeFocal = getImageFocalPoint(pick.image, 'showcase')
  const portraitFocal = getImageFocalPoint(pick.imagePortrait, 'portrait')
  const landscapeOrigin = focalToTransformOrigin(landscapeFocal)
  const portraitOrigin = focalToTransformOrigin(portraitFocal)

  return (
    <article
      ref={panelRef}
      className={`${styles.panel}${anchorRight ? ` ${styles.panelAnchorRight}` : ''}`}
      aria-labelledby={`showcase-${pick.key}`}
    >
      <div className={styles.media}>
        {imageSrc ? (
          <>
            {pick.image ? (
              <motion.div
                className={styles.imageWrap}
                style={{ transformOrigin: landscapeOrigin }}
                initial={reduceMotion ? false : { scale: 1.04 }}
                animate={showMotion || reduceMotion ? { scale: 1 } : { scale: 1.04 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={pick.image}
                  alt=""
                  fill
                  priority={index < 2}
                  sizes="100vw"
                  className={`${styles.image} ${styles.imageLandscape}`}
                  style={{ objectPosition: landscapeFocal }}
                />
              </motion.div>
            ) : null}
            {pick.imagePortrait ? (
              <motion.div
                className={styles.imageWrap}
                style={{ transformOrigin: portraitOrigin }}
                initial={reduceMotion ? false : { scale: 1.04 }}
                animate={showMotion || reduceMotion ? { scale: 1 } : { scale: 1.04 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={pick.imagePortrait}
                  alt=""
                  fill
                  priority={index < 2}
                  sizes="100vw"
                  className={`${styles.image} ${styles.imagePortrait}`}
                  style={{ objectPosition: portraitFocal }}
                />
              </motion.div>
            ) : null}
          </>
        ) : (
          <div className={styles.imageFallback} />
        )}
        <div
          className={`${styles.scrim}${anchorRight ? ` ${styles.scrimRight}` : ` ${styles.scrimLeft}`}`}
          aria-hidden
        />
      </div>

      <motion.div
        className={`${styles.copy}${anchorRight ? ` ${styles.copyRight}` : ''}`}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={
          showMotion || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
        }
        transition={{
          duration: 0.55,
          delay: reduceMotion ? 0 : showMotion ? 0.12 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h3 id={`showcase-${pick.key}`} className={styles.name}>{pick.name}</h3>
        {blurb ? <p className={styles.blurb}>{blurb}</p> : null}
        <div className={styles.captionRow}>
          {pick.address ? <span className={styles.captionItem}>{pick.address}</span> : null}
          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.captionLink}
            >
              {formatWebsiteLabel(website)} ↗
            </a>
          ) : null}
        </div>
        <Link href={detailHref} className={styles.cta}>
          View {pick.name} →
        </Link>
      </motion.div>
    </article>
  )
}

type FeaturedShowcaseProps = {
  picks: ShowcasePick[]
  regionSlug: string
  regionLabel: string
  pins: MapPin[]
  startIndex?: number
}

export function FeaturedShowcase({
  picks,
  regionSlug,
  regionLabel,
  pins,
  startIndex = 0,
}: FeaturedShowcaseProps) {
  if (picks.length === 0) return null

  return (
    <div className={styles.stack}>
      {picks.map((pick, i) => (
        <FeaturedShowcasePanel
          key={pick.key}
          pick={pick}
          regionSlug={regionSlug}
          regionLabel={regionLabel}
          index={startIndex + i}
          pins={pins}
        />
      ))}
    </div>
  )
}
