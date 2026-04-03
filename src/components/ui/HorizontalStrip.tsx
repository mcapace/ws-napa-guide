'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Hotel, Restaurant, Winery } from '@/lib/types'
import type { RegionData } from '@/data/regions'
import { TEST_IMAGES } from '@/lib/test-images'

export type HorizontalStripItem =
  | { type: 'winery'; item: Winery }
  | { type: 'dining'; item: Restaurant }
  | { type: 'stay'; item: Hotel }
  | { type: 'region'; item: RegionData }

function hrefFor(entry: HorizontalStripItem) {
  switch (entry.type) {
    case 'winery':
      return `/wineries/${entry.item.slug}`
    case 'dining':
      return `/dining/${entry.item.slug}`
    case 'stay':
      return `/stay/${entry.item.slug}`
    case 'region':
      return `/regions/${entry.item.slug}`
  }
}

function imageFor(entry: HorizontalStripItem, fallbackIndex: number): string {
  if (entry.type === 'region') {
    return entry.item.heroImage
  }
  return entry.item.images[0] ?? TEST_IMAGES[fallbackIndex % TEST_IMAGES.length]
}

function eyebrowFor(entry: HorizontalStripItem) {
  switch (entry.type) {
    case 'dining':
      return entry.item.cuisine ?? ''
    case 'stay':
      return entry.item.priceRange ?? ''
    case 'winery':
      return entry.item.region.replace(/-/g, ' ')
    case 'region':
      return entry.item.tagline ?? ''
  }
}

function sublineFor(entry: HorizontalStripItem) {
  switch (entry.type) {
    case 'dining':
      return entry.item.priceRange
    case 'stay':
      return entry.item.region.replace(/-/g, ' ')
    case 'winery':
      return entry.item.visitInfo?.appointment ? 'By appointment' : 'Walk-ins welcome'
    case 'region':
      return 'Explore →'
  }
}

export function HorizontalStrip({ entries }: { entries: HorizontalStripItem[] }) {
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = stripRef.current
    if (!el) return
    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const onDown = (e: MouseEvent) => {
      isDown = true
      el.style.cursor = 'grabbing'
      startX = e.pageX
      scrollLeft = el.scrollLeft
    }
    const onEnd = () => {
      isDown = false
      el.style.cursor = 'grab'
    }
    const onMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      el.scrollLeft = scrollLeft - (e.pageX - startX) * 1.5
    }

    el.addEventListener('mousedown', onDown)
    el.addEventListener('mouseleave', onEnd)
    el.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onEnd)

    return () => {
      el.removeEventListener('mousedown', onDown)
      el.removeEventListener('mouseleave', onEnd)
      el.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onEnd)
    }
  }, [])

  return (
    <div
      ref={stripRef}
      className="strip-scroll dim-siblings"
      style={{
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingLeft: 60,
        paddingRight: 60,
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        cursor: 'grab',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {entries.map((entry, i) => (
        <Link
          key={`${entry.type}-${entry.item.slug}`}
          href={hrefFor(entry)}
          style={{
            flexShrink: 0,
            width: 300,
            height: 420,
            scrollSnapAlign: 'start',
            textDecoration: 'none',
            display: 'block',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image
            src={imageFor(entry, i)}
            alt={'name' in entry.item ? entry.item.name : ''}
            fill
            sizes="300px"
            style={{
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(13,11,9,0.92) 0%, rgba(13,11,9,0.15) 60%, transparent 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              fontSize: 8,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C4943A',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {eyebrowFor(entry)}
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 20px 24px' }}>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(20px, 2.2vw, 28px)',
                color: '#F7F3EC',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: 6,
              }}
            >
              {'name' in entry.item ? entry.item.name : ''}
            </h3>
            <span
              style={{
                fontSize: 9,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#9B9283',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {sublineFor(entry)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
