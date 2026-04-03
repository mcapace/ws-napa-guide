'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { regions } from '@/data/regions'
import { wineries } from '@/data/wineries'
import { restaurants } from '@/data/restaurants'
import { hotels } from '@/data/hotels'

const TEST_IMAGES = [
  '/test-images/AdobeStock_39828282.jpeg',
  '/test-images/AdobeStock_85747125.jpeg',
  '/test-images/AdobeStock_86969265.jpeg',
  '/test-images/AdobeStock_164779985.jpeg',
  '/test-images/AdobeStock_286007082.jpeg',
  '/test-images/AdobeStock_291250504.jpeg',
  '/test-images/AdobeStock_805204520.jpeg',
]

// ── JW Player (test media; swap IDs when final assets land) ───────────
// Catalog also in src/components/video/JWVideo.tsx STATIC_MP4_720
const HERO_MEDIA_ID = 'sVn1cQyI'
const HERO_MP4 = `https://cdn.jwplayer.com/videos/${HERO_MEDIA_ID}-WBFwZoOE.mp4`
const HERO_POSTER = `https://cdn.jwplayer.com/v2/media/${HERO_MEDIA_ID}/poster.jpg`

// ── Mosaic panel positions (mirroring therealhotels) ─────────────────
const PANELS = [
  { id: 1, style: { width: 148, height: 190, top: '11%', left: '7%', rotate: -1.5 }, speed: 0.06, imageIndex: 5 },
  { id: 2, style: { width: 110, height: 145, top: '29%', left: '13%', rotate: 1.0 }, speed: 0.09, imageIndex: 2 },
  { id: 3, style: { width: 150, height: 100, top: '8%', left: '50%', rotate: 0.5, translateX: '-50%' }, speed: 0.04, imageIndex: 0 },
  { id: 4, style: { width: 190, height: 160, top: '9%', right: '7%', rotate: -0.8 }, speed: 0.07, imageIndex: 3 },
  { id: 5, style: { width: 130, height: 170, bottom: '22%', right: '8%', rotate: 1.2 }, speed: 0.05, imageIndex: 6 },
]

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const avaRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayVideoRef = useRef<HTMLVideoElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollY_val, setScrollY_val] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current
      if (!hero) return
      const heroH = hero.offsetHeight
      const scrolled = window.scrollY
      setScrollY_val(scrolled)
      const start = heroH * 0.3
      const end = heroH * 0.8

      if (scrolled >= end) {
        setOverlayVisible(true)
        setExpanded(true)
      } else if (scrolled <= start) {
        setOverlayVisible(false)
        setExpanded(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Parallax offset per panel
  const panelOffset = (speed: number) => -scrollY_val * speed

  return (
    <>
      {/* ── GLOBAL CURSOR ── */}
      <Cursor />

      {/* ── NAV ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: '24px 36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mixBlendMode: 'difference',
        }}
      >
        <Link href="/" style={{ display: 'inline-block' }}>
          <Image
            src="/logos/WS_logo__1_.png"
            alt="Wine Spectator"
            width={160}
            height={24}
            style={{ filter: 'invert(1)', height: '22px', width: 'auto' }}
          />
        </Link>
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'none',
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}
          aria-label="Open menu"
          type="button"
        >
          <span style={{ display: 'block', width: 28, height: 1, background: '#F7F3EC' }} />
          <span style={{ display: 'block', width: 28, height: 1, background: '#F7F3EC' }} />
        </button>
      </nav>

      {/* ── SLIDE-OUT MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 500,
              background: 'rgba(13,11,9,0.97)',
              display: 'flex',
              flexDirection: 'column',
              padding: '80px 60px',
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              type="button"
              style={{
                position: 'absolute',
                top: 28,
                right: 36,
                background: 'none',
                border: 'none',
                color: '#F7F3EC',
                fontSize: 24,
                cursor: 'none',
                opacity: 0.6,
              }}
            >
              ✕
            </button>
            {[
              { label: 'Wineries', href: '/wineries' },
              { label: 'Regions', href: '/regions' },
              { label: 'Dining', href: '/dining' },
              { label: 'Stay', href: '/stay' },
              { label: 'Map', href: '/map' },
              { label: 'Plan', href: '/plan' },
              { label: 'Subscribe', href: 'https://winespectator.com/subscribe' },
            ].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    marginBottom: 24,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 'clamp(36px,5vw,64px)',
                    color: '#F7F3EC',
                    textDecoration: 'none',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0D0B09',
        }}
      >
        {/* Scattered mosaic panels */}
        {PANELS.map((panel) => (
          <div
            key={panel.id}
            style={{
              position: 'absolute',
              width: panel.style.width,
              height: panel.style.height,
              top: panel.style.top,
              left: (panel.style as { left?: string; right?: string; bottom?: string; translateX?: string }).left,
              right: (panel.style as { right?: string }).right,
              bottom: (panel.style as { bottom?: string }).bottom,
              transform: `translateY(${panelOffset(panel.speed)}px) translateX(${(panel.style as { translateX?: string }).translateX ?? '0'}) rotate(${panel.style.rotate}deg)`,
              borderRadius: 3,
              overflow: 'hidden',
              opacity: expanded ? 0 : 1,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          >
            <Image
              src={TEST_IMAGES[panel.imageIndex]}
              alt=""
              fill
              sizes="200px"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        ))}

        {/* Center hero video panel — expands on scroll */}
        <div
          style={{
            position: 'absolute',
            width: expanded ? '100vw' : 200,
            height: expanded ? '100vh' : 140,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: expanded ? 0 : 3,
            overflow: 'hidden',
            zIndex: expanded ? 50 : 10,
            transition:
              'width 0.7s cubic-bezier(0.77,0,0.175,1), height 0.7s cubic-bezier(0.77,0,0.175,1), border-radius 0.7s ease',
            opacity: overlayVisible ? 0 : 1,
          }}
        >
          <Image
            src={TEST_IMAGES[4]}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
          />
          <video
            ref={videoRef}
            src={HERO_MP4}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Editorial copy — centered */}
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            textAlign: 'center',
            padding: '0 20px',
            marginTop: 180,
            opacity: expanded ? 0 : 1,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(22px,3vw,36px)',
              color: '#F7F3EC',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              marginBottom: 14,
            }}
          >
            The valley that changed
            <br />
            American wine forever.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 300,
              letterSpacing: '0.08em',
              color: 'rgba(247,243,236,0.55)',
              lineHeight: 1.6,
            }}
          >
            Wine Spectator&apos;s definitive guide to Napa —
            <br />
            wineries, restaurants, hotels, and the roads less traveled.
          </p>
        </div>

        {/* Massive display type at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '-0.12em',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 5,
            pointerEvents: 'none',
            overflow: 'hidden',
            opacity: expanded ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: 'clamp(100px,18vw,260px)',
              color: '#F7F3EC',
              letterSpacing: '-0.02em',
              lineHeight: 0.85,
              whiteSpace: 'nowrap',
              display: 'block',
            }}
          >
            Napa Valley
          </span>
        </div>
      </section>

      {/* Scroll spacer to drive expansion */}
      <div style={{ height: '100vh', background: '#0D0B09' }} />

      {/* ── FULLSCREEN VIDEO OVERLAY ── */}
      <AnimatePresence>
        {overlayVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              background: '#0D0B09',
            }}
          >
            <video
              ref={overlayVideoRef}
              src={HERO_MP4}
              poster={HERO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 1,
                filter: 'brightness(1.3) contrast(1.1)',
              }}
            />
            {/* WS logo top-left */}
            <div style={{ position: 'absolute', top: 28, left: 36 }}>
              <Image
                src="/logos/WS_logo__1_.png"
                alt="Wine Spectator"
                width={160}
                height={24}
                style={{ filter: 'invert(1)', height: '24px', width: 'auto' }}
              />
            </div>
            {/* Bottom content */}
            <div
              style={{
                position: 'absolute',
                bottom: 60,
                left: 60,
                right: 60,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    fontWeight: 400,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(247,243,236,0.5)',
                    marginBottom: 12,
                  }}
                >
                  Wine Spectator · June 2026
                </p>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 'clamp(42px,6vw,86px)',
                    color: '#F7F3EC',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Explore
                  <br />
                  Napa Valley
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end' }}>
                <Link
                  href="/regions"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 400,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#F7F3EC',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(247,243,236,0.3)',
                    paddingBottom: 4,
                  }}
                >
                  Browse the guide ↗
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOverlayVisible(false)
                    setExpanded(false)
                    requestAnimationFrame(() => {
                      avaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(247,243,236,0.4)',
                    cursor: 'none',
                  }}
                >
                  ✕ Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: 1 }}>
      {/* ── BROWSE BY AVA ── */}
      <RevealSection>
        <section
          ref={avaRef}
          style={{ position: 'relative', zIndex: 1, padding: '100px 0 0', background: '#0D0B09' }}
        >
          <p style={styles.sectionLabel}>Browse by appellation</p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 1,
              background: 'rgba(247,243,236,0.06)',
              borderTop: '1px solid rgba(247,243,236,0.06)',
              borderBottom: '1px solid rgba(247,243,236,0.06)',
            }}
          >
            {regions.map((region, regionIndex) => (
              <AVACard key={region.slug} region={region} regionIndex={regionIndex} />
            ))}
          </div>
        </section>
      </RevealSection>

      {/* ── FEATURED WINERIES ── */}
      <RevealSection>
        <section style={{ position: 'relative', zIndex: 1, padding: '100px 60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 56 }}>
            <p style={styles.sectionLabel}>Landmark wineries</p>
            <Link href="/wineries" style={styles.seeAllLink}>
              All wineries →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1 }}>
            {wineries.slice(0, 3).map((w, i) => (
              <EditorialCard
                key={w.slug}
                href={`/wineries/${w.slug}`}
                eyebrow={w.region.replace(/-/g, ' ')}
                title={w.name}
                excerpt={(w.excerpt ?? `${w.description.slice(0, 100)}…`)}
                cardIndex={i}
                tall={i === 0}
              />
            ))}
          </div>
        </section>
      </RevealSection>

      {/* ── MAP CTA ── */}
      <RevealSection>
        <section
          style={{
            margin: '0 60px 100px',
            border: '1px solid rgba(247,243,236,0.08)',
            borderRadius: 3,
            padding: '80px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'center',
            background: '#1A1612',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              position: 'absolute',
              bottom: '-0.1em',
              right: '-0.05em',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 240,
              fontWeight: 400,
              color: 'rgba(247,243,236,0.03)',
              lineHeight: 1,
              pointerEvents: 'none',
              letterSpacing: '-0.04em',
            }}
          >
            Map
          </span>
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(40px,5vw,70px)',
                color: '#F7F3EC',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                marginBottom: 20,
              }}
            >
              Explore the
              <br />
              valley on a map
            </h2>
            <p style={{ ...styles.bodyText, marginBottom: 36 }}>
              Every winery, restaurant, and hotel — plotted across Napa&apos;s seven appellations. Filter by category, plan your route.
            </p>
            <Link href="/map" style={styles.primaryBtn}>
              Open the map →
            </Link>
          </div>
          {/* Simple SVG Napa preview */}
          <div
            style={{
              aspectRatio: '16/10',
              background: '#0D0B09',
              borderRadius: 3,
              border: '1px solid rgba(247,243,236,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="280" height="190" viewBox="0 0 280 190" fill="none">
              <path
                d="M140 20 C125 32 110 52 102 76 C94 100 98 128 101 148 C104 168 112 182 118 188 C128 174 138 162 146 150 C152 140 155 130 157 118 C160 104 162 88 160 72 C158 56 150 36 140 20Z"
                stroke="rgba(247,243,236,0.15)"
                strokeWidth="1.5"
                fill="rgba(247,243,236,0.03)"
              />
              <path
                d="M140 36 C138 58 136 80 135 102 C134 122 134 142 135 160"
                stroke="rgba(196,148,58,0.4)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              {[36, 70, 102, 132, 158].map((y, i) => (
                <circle key={i} cx={136} cy={y} r={3} fill={i < 2 ? 'rgba(196,148,58,0.8)' : 'rgba(247,243,236,0.4)'} />
              ))}
              {[
                [144, 39, 'CALISTOGA'],
                [144, 73, 'ST. HELENA'],
                [144, 105, 'RUTHERFORD'],
                [144, 135, 'OAKVILLE'],
                [144, 161, 'YOUNTVILLE'],
              ].map(([x, y, label]) => (
                <text key={label as string} x={x as number} y={y as number} fontFamily="DM Sans" fontSize="6" fill="rgba(247,243,236,0.35)" letterSpacing="1">
                  {label as string}
                </text>
              ))}
            </svg>
          </div>
        </section>
      </RevealSection>

      {/* ── WHERE TO EAT ── */}
      <RevealSection>
        <section style={{ position: 'relative', zIndex: 1, padding: '0 60px 100px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 56 }}>
            <p style={styles.sectionLabel}>Where to eat</p>
            <Link href="/dining" style={styles.seeAllLink}>
              All restaurants →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
            {restaurants
              .filter((r) => r.featured)
              .slice(0, 4)
              .map((r, i) => (
                <EditorialCard
                  key={r.slug}
                  href={`/dining/${r.slug}`}
                  eyebrow={r.cuisine}
                  title={r.name}
                  excerpt={r.excerpt ?? `${r.description.slice(0, 90)}…`}
                  cardIndex={i}
                  meta={r.priceRange}
                />
              ))}
          </div>
        </section>
      </RevealSection>

      {/* ── WHERE TO STAY ── */}
      <RevealSection>
        <section style={{ position: 'relative', zIndex: 1, padding: '0 60px 100px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 56 }}>
            <p style={styles.sectionLabel}>Where to stay</p>
            <Link href="/stay" style={styles.seeAllLink}>
              All hotels →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
            {hotels
              .filter((h) => h.featured)
              .slice(0, 4)
              .map((h, i) => (
                <EditorialCard
                  key={h.slug}
                  href={`/stay/${h.slug}`}
                  eyebrow={h.region.replace(/-/g, ' ')}
                  title={h.name}
                  excerpt={`${h.description.slice(0, 110)}…`}
                  cardIndex={i}
                  tall={i === 0 || i === 3}
                />
              ))}
          </div>
        </section>
      </RevealSection>

      {/* ── EMAIL SIGNUP ── */}
      <RevealSection>
        <section
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '80px 60px 100px',
            borderTop: '1px solid rgba(247,243,236,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 60,
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(28px,3vw,42px)',
              color: '#F7F3EC',
              lineHeight: 1.1,
              flexShrink: 0,
            }}
          >
            Stay in
            <br />
            the know
          </h2>
          <EmailForm />
        </section>
      </RevealSection>

      {/* ── FOOTER ── */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid rgba(247,243,236,0.08)',
          padding: '56px 60px 48px',
          background: '#0D0B09',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 40,
            alignItems: 'start',
            marginBottom: 48,
          }}
        >
          <div>
            <Link href="/" style={{ display: 'inline-block', marginBottom: 16 }}>
              <Image
                src="/logos/WS_logo__1_.png"
                alt="Wine Spectator"
                width={160}
                height={24}
                style={{ filter: 'invert(1)', height: '22px', width: 'auto', opacity: 0.75 }}
              />
            </Link>
            <p style={{ ...styles.microLabel, color: '#9B9283', marginBottom: 8 }}>Napa Valley Guide · June 2026</p>
            <p style={{ ...styles.microLabel, color: 'rgba(155,146,131,0.4)' }}>
              © 2026 M. Shanken Communications, Inc.
              <br />
              All rights reserved.
            </p>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
            {[
              ['Map', '/map'],
              ['Wineries', '/wineries'],
              ['Dining', '/dining'],
              ['Stay', '/stay'],
              ['Plan', '/plan'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ ...styles.microLabel, color: '#9B9283', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </nav>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end' }}>
            {[
              ['Privacy', '/privacy'],
              ['Contact', '/contact'],
              ['winespectator.com ↗', 'https://winespectator.com'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ ...styles.microLabel, color: 'rgba(155,146,131,0.45)', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div
          style={{
            borderTop: '1px solid rgba(247,243,236,0.05)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p style={{ ...styles.microLabel, color: 'rgba(155,146,131,0.3)' }}>
            A companion to the June 15 &amp; 30, 2026 issue of Wine Spectator. Sponsor placements are clearly disclosed.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'none',
              border: '1px solid rgba(247,243,236,0.12)',
              borderRadius: 2,
              padding: '8px 16px',
              cursor: 'none',
              ...styles.microLabel,
              color: 'rgba(155,146,131,0.5)',
            }}
          >
            Back to top ↑
          </button>
        </div>
      </footer>
      </div>
    </>
  )
}

// ── Sub-components ───────────────────────────────────────────────────

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [big, setBig] = useState(false)
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const over = () => setBig(true)
    const out = () => setBig(false)
    window.addEventListener('mousemove', move)
    document.querySelectorAll('a,button').forEach((el) => {
      el.addEventListener('mouseenter', over)
      el.addEventListener('mouseleave', out)
    })
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        width: big ? 40 : 8,
        height: big ? 40 : 8,
        borderRadius: '50%',
        background: '#F7F3EC',
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
        mixBlendMode: 'difference',
        transition: 'width 0.3s, height 0.3s',
      }}
    />
  )
}

function RevealSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

function AVACard({ region, regionIndex }: { region: (typeof regions)[0]; regionIndex: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={`/regions/${region.slug}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          height: 420,
          overflow: 'hidden',
          cursor: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        >
          <Image
            src={TEST_IMAGES[regionIndex % 7]}
            alt={region.name}
            fill
            sizes="(max-width: 768px) 50vw, 14vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: '#0D0B09',
            opacity: hovered ? 0.5 : 0.65,
            transition: 'opacity 0.5s',
          }}
        />
        {/* AVA abbreviation badge */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 16,
            zIndex: 2,
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '1px solid rgba(247,243,236,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 7,
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(247,243,236,0.4)',
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          {region.slug.replace(/-/g, '\n').toUpperCase().slice(0, 8)}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '24px 20px' }}>
          <span
            style={{
              display: 'block',
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 20,
              color: '#F7F3EC',
              lineHeight: 1.1,
              marginBottom: 6,
            }}
          >
            {region.name}
          </span>
          <span style={{ ...styles.microLabel, color: '#9B9283' }}>{region.tagline}</span>
        </div>
      </div>
    </Link>
  )
}

function EditorialCard({
  href,
  eyebrow,
  title,
  excerpt,
  cardIndex,
  tall,
  meta,
}: {
  href: string
  eyebrow: string
  title: string
  excerpt: string
  cardIndex: number
  tall?: boolean
  meta?: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          height: tall ? 520 : 380,
          overflow: 'hidden',
          cursor: 'none',
          borderRadius: 2,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        >
          <Image
            src={TEST_IMAGES[cardIndex % 7]}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(to top, rgba(13,11,9,0.95) 0%, rgba(13,11,9,0.2) 60%, transparent 100%)',
          }}
        />
        {/* Eyebrow */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 2,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9,
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C4943A',
          }}
        >
          {eyebrow}
          {meta ? ` · ${meta}` : ''}
        </div>
        {/* Bottom content */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '0 24px 28px' }}>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(22px,2.5vw,32px)',
              color: '#F7F3EC',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: 10,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 300,
              color: 'rgba(247,243,236,0.55)',
              lineHeight: 1.6,
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s, transform 0.4s',
              marginBottom: 14,
            }}
          >
            {excerpt}
          </p>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#F7F3EC',
              borderBottom: '1px solid rgba(247,243,236,0.3)',
              paddingBottom: 3,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          >
            Read more →
          </span>
        </div>
      </div>
    </Link>
  )
}

function EmailForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return done ? (
    <p style={{ ...styles.bodyText, color: '#C4943A' }}>You&apos;re in. Watch your inbox.</p>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (email) setDone(true)
      }}
      style={{
        display: 'flex',
        flex: 1,
        maxWidth: 480,
        borderBottom: '1px solid rgba(247,243,236,0.25)',
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        style={{
          flex: 1,
          background: 'none',
          border: 'none',
          outline: 'none',
          color: '#F7F3EC',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 300,
          padding: '12px 0',
          letterSpacing: '0.02em',
        }}
      />
      <button
        type="submit"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'none',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10,
          fontWeight: 400,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(247,243,236,0.6)',
          padding: '12px 0 12px 24px',
        }}
      >
        Subscribe
      </button>
    </form>
  )
}

// ── Shared style objects ─────────────────────────────────────────────
const styles = {
  sectionLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    fontWeight: 400,
    letterSpacing: '0.25em',
    textTransform: 'uppercase' as const,
    color: '#9B9283',
    marginBottom: 0,
    padding: '0 60px 48px',
  },
  seeAllLink: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    fontWeight: 400,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#9B9283',
    textDecoration: 'none',
    borderBottom: '1px solid rgba(155,146,131,0.3)',
    paddingBottom: 3,
  },
  bodyText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 300,
    color: '#9B9283',
    lineHeight: 1.8,
  },
  primaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    background: '#F7F3EC',
    color: '#0D0B09',
    padding: '16px 32px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    textDecoration: 'none',
    borderRadius: 2,
  },
  microLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 9,
    fontWeight: 400,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    lineHeight: 1.7,
  },
}
