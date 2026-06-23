'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

export type FeatureBlockProps = {
  name: string
  address?: string
  website?: string
  children: ReactNode
  image?: string
  /** Optional portrait crop; shown below `md` when both are set */
  imagePortrait?: string
  imagePosition?: 'left' | 'right'
  eyebrow?: string
}

function formatWebsiteLabel(url: string): string {
  return url.replace(/^https?:\/\//i, '').replace(/\/$/, '')
}

const easeOut = [0.33, 1, 0.68, 1] as const

export function FeatureBlock({
  name,
  address,
  website,
  children,
  image,
  imagePortrait,
  imagePosition = 'left',
  eyebrow,
}: FeatureBlockProps) {
  const articleRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const isInView = useInView(articleRef, { once: true, amount: 0.05 })
  const showContent = reduceMotion === true || isInView

  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start end', 'end start'],
  })
  const parallaxFull = useTransform(scrollYProgress, [0, 1], [24, -24])
  const parallaxY = useTransform(parallaxFull, (v) => (reduceMotion ? 0 : v))

  const href = website?.match(/^https?:\/\//i) ? website : website ? `https://${website}` : undefined

  const meta = (
    <div
      style={{
        marginTop: 28,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(26,22,20,0.72)',
        lineHeight: 1.6,
      }}
    >
      {address && <p style={{ margin: '0 0 8px' }}>{address}</p>}
      {href && (
        <a href={href} rel="noopener noreferrer" target="_blank" className="feature-meta-link">
          {formatWebsiteLabel(href)}
        </a>
      )}
    </div>
  )

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.02 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: reduceMotion ? 0 : 0.7, ease: easeOut },
    },
  }

  const copyVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.1, ease: easeOut },
    },
  }

  const copy = (
    <div style={{ padding: 'clamp(36px, 5vw, 72px) clamp(24px, 5vw, 48px)' }}>
      {eyebrow && (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(26,22,20,0.55)',
            margin: '0 0 12px',
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 400,
          fontSize: 'clamp(36px, 4.5vw, 56px)',
          lineHeight: 1.05,
          color: '#1A1614',
          margin: '0 0 20px',
        }}
      >
        {name}
      </h2>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 18,
          lineHeight: 1.65,
          color: '#1A1614',
        }}
      >
        {children}
      </div>
      {meta}
    </div>
  )

  const leftFirst = imagePosition === 'left'
  const gridVars: CSSProperties = {
    ['--fb-img-order' as string]: leftFirst ? 0 : 1,
    ['--fb-copy-order' as string]: leftFirst ? 1 : 0,
  }

  const yMotion = parallaxY

  const figure =
    image && imagePortrait ? (
      <motion.div
        className="feature-block-parallax-layer"
        style={{
          y: yMotion,
          position: 'absolute',
          inset: 0,
          willChange: reduceMotion ? undefined : 'transform',
        }}
      >
        <div className="feature-block-col-image__inner" style={{ position: 'relative' }}>
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 960px) 50vw, 100vw"
            className="hidden md:block"
            style={{ objectFit: 'cover' }}
          />
          <Image
            src={imagePortrait}
            alt=""
            fill
            sizes="100vw"
            className="md:hidden"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </motion.div>
    ) : image ? (
    <motion.div
      className="feature-block-parallax-layer"
      style={{
        y: yMotion,
        position: 'absolute',
        inset: 0,
        willChange: reduceMotion ? undefined : 'transform',
      }}
    >
      <div className="feature-block-col-image__inner">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 960px) 50vw, 100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </motion.div>
  ) : (
    <div
      aria-hidden
      className="feature-block-col-image__inner"
      style={{
        background: 'linear-gradient(145deg, rgba(26,22,20,0.06) 0%, rgba(114,47,55,0.12) 100%)',
      }}
    />
  )

  return (
    <article ref={articleRef} className="feature-block-editorial" style={gridVars}>
      <motion.div
        className="feature-block-col-image"
        variants={imageVariants}
        initial="hidden"
        animate={showContent ? 'visible' : 'hidden'}
      >
        <div className="feature-block-col-image__clip">{figure}</div>
      </motion.div>
      <motion.div
        className="feature-block-col-copy"
        variants={copyVariants}
        initial="hidden"
        animate={showContent ? 'visible' : 'hidden'}
      >
        {copy}
      </motion.div>
    </article>
  )
}
