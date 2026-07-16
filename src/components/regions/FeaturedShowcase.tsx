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
import { getShowcaseFocalProfile, getShowcaseImageStyle } from '@/lib/image-focal'
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
  photoCredit?: string
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
  enhanced?: boolean
}

export function FeaturedShowcasePanel({
  pick,
  regionSlug,
  regionLabel,
  index,
  pins,
  enhanced = false,
}: PanelProps) {
  const panelRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const isInView = useInView(panelRef, { once: true, amount: 0.12 })
  const useFramerMotion = !enhanced && reduceMotion !== true
  const showMotion = useFramerMotion && isInView

  const imageSrc = pick.image ?? pick.imagePortrait
  const anchorRight = index % 2 === 1
  const detailHref = editorialDetailHref(pins, pick.category, regionSlug, pick.name, pick.website)
  const website = normalizeWebsite(pick.website)
  const blurb = truncateBlurb(pick.bodyPlain ?? '')
  const eyebrow = `${CATEGORY_EYEBROW[pick.category]} · ${regionLabel}`

  const landscapeStyle = getShowcaseImageStyle(pick.image, pick.imagePortrait, false)
  const portraitStyle = getShowcaseImageStyle(pick.image, pick.imagePortrait, true)
  const focalProfile = getShowcaseFocalProfile(pick.image)

  const copyClassName = `${styles.copy}${anchorRight ? ` ${styles.copyRight}` : ''}${enhanced ? ` ${styles.copyEnhanced}` : ''}`
  const copyContent = (
    <>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h3
        id={`showcase-${pick.key}`}
        className={`${styles.name}${enhanced ? ` ${styles.nameEnhanced}` : ''}`}
        {...(enhanced ? { 'data-showcase-name': '' } : {})}
      >
        {pick.name}
      </h3>
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
        {pick.photoCredit ? (
          <span className={styles.captionCredit}>{pick.photoCredit}</span>
        ) : null}
      </div>
      <Link
        href={detailHref}
        className={styles.cta}
        {...(detailHref.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        View {pick.name} {detailHref.startsWith('http') ? '↗' : '→'}
      </Link>
    </>
  )

  return (
    <article
      ref={panelRef}
      className={`${styles.panel}${anchorRight ? ` ${styles.panelAnchorRight}` : ''}${enhanced ? ` ${styles.panelEnhanced}` : ''}`}
      aria-labelledby={`showcase-${pick.key}`}
      style={
        !focalProfile && landscapeStyle.objectPosition
          ? ({
              '--showcase-landscape-focal': landscapeStyle.objectPosition,
            } as React.CSSProperties)
          : undefined
      }
      {...(focalProfile ? { 'data-focal-profile': focalProfile } : {})}
      {...(enhanced ? { 'data-showcase-panel': '' } : {})}
    >
      <div
        className={styles.media}
        {...(enhanced ? { 'data-showcase-media': '' } : {})}
      >
        {imageSrc ? (
          <>
            {pick.image ? (
              <div
                className={styles.imageWrap}
                {...(enhanced ? { 'data-showcase-parallax': '' } : {})}
              >
                <Image
                  src={pick.image}
                  alt=""
                  fill
                  priority={index < 2}
                  // Phone cards are 4:3 but the masters are ultra-wide: covering
                  // the box needs up to ~1.9x the viewport width in source pixels.
                  sizes="(max-width: 767px) 190vw, 100vw"
                  className={`${styles.image} ${styles.imageLandscape}`}
                  style={
                    landscapeStyle.shiftY
                      ? { transform: `translateY(${landscapeStyle.shiftY})` }
                      : undefined
                  }
                />
              </div>
            ) : null}
            {pick.imagePortrait ? (
              <div
                className={styles.imageWrap}
                {...(enhanced ? { 'data-showcase-parallax': '' } : {})}
              >
                <Image
                  src={pick.imagePortrait}
                  alt=""
                  fill
                  priority={index < 2}
                  sizes="100vw"
                  className={`${styles.image} ${styles.imagePortrait}`}
                  style={
                    portraitStyle.shiftY
                      ? { transform: `translateY(${portraitStyle.shiftY})` }
                      : undefined
                  }
                />
              </div>
            ) : null}
          </>
        ) : (
          <div className={styles.imageFallback} />
        )}
      </div>

      <div
        className={`${styles.scrim}${anchorRight ? ` ${styles.scrimRight}` : ` ${styles.scrimLeft}`}`}
        aria-hidden
      />

      {enhanced ? (
        <div className={copyClassName} data-showcase-copy="">
          {copyContent}
        </div>
      ) : (
        <motion.div
          className={copyClassName}
          initial={useFramerMotion ? { opacity: 0, y: 24 } : false}
          animate={
            showMotion || !useFramerMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
          }
          transition={{
            duration: 0.55,
            delay: useFramerMotion && showMotion ? 0.12 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {copyContent}
        </motion.div>
      )}
    </article>
  )
}

type FeaturedShowcaseProps = {
  picks: ShowcasePick[]
  regionSlug: string
  regionLabel: string
  pins: MapPin[]
  startIndex?: number
  enhanced?: boolean
}

export function FeaturedShowcase({
  picks,
  regionSlug,
  regionLabel,
  pins,
  startIndex = 0,
  enhanced = false,
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
          enhanced={enhanced}
        />
      ))}
    </div>
  )
}
