'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { regions, getRegion, type RegionData } from '@/data/regions'
import { wineries } from '@/data/wineries'
import { restaurants } from '@/data/restaurants'
import { hotels } from '@/data/hotels'
import { getArticle } from '@/data/articles'
import { MarqueeCTA } from '@/components/ui/MarqueeCTA'
import { HorizontalStrip } from '@/components/ui/HorizontalStrip'
import { sectionHeading, seeAllLink } from '@/lib/editorial-styles'
import { TEST_IMAGES } from '@/lib/test-images'
import type { Article, Winery } from '@/lib/types'

const featuredRegions = regions.slice(0, 3)
const featuredJuneSlugs = ['judgment-of-paris', 'napa-taco-tour', 'napa-landmarks'] as const
const featuredArticleRows: Article[] = featuredJuneSlugs
  .map((slug) => getArticle(slug))
  .filter((a): a is Article => Boolean(a))

const articleHref: Record<string, string> = {
  'judgment-of-paris': '/features/napa-judgment',
  'napa-taco-tour': '/dining',
  'napa-landmarks': '/map',
}

const spotlightWinery = wineries.find((w) => w.slug === 'opus-one') ?? wineries[0]
const featuredRestaurants = restaurants.some((r) => r.featured)
  ? restaurants.filter((r) => r.featured)
  : restaurants.slice(0, 8)
const featuredHotels = hotels.some((h) => h.featured) ? hotels.filter((h) => h.featured) : hotels.slice(0, 6)

// ── JW Player (test media; swap IDs when final assets land) ───────────
// Catalog also in src/components/video/JWVideo.tsx STATIC_MP4_720
const HERO_MEDIA_ID = 'sVn1cQyI'
const HERO_MP4 = `https://cdn.jwplayer.com/videos/${HERO_MEDIA_ID}-WBFwZoOE.mp4`
const HERO_POSTER = `https://cdn.jwplayer.com/v2/media/${HERO_MEDIA_ID}/poster.jpg`

// ── Mosaic panel positions (mirroring therealhotels) ─────────────────
const PANELS = [
  { id: 1, style: { width: 220, height: 280, top: '6%', left: '5%' }, imageIndex: 5 },
  { id: 2, style: { width: 180, height: 230, top: '25%', left: '14%' }, imageIndex: 2 },
  { id: 3, style: { width: 240, height: 160, top: '5%', left: '50%' }, imageIndex: 0 },
  { id: 4, style: { width: 280, height: 240, top: '6%', right: '5%' }, imageIndex: 3 },
  { id: 5, style: { width: 200, height: 260, bottom: '18%', right: '6%' }, imageIndex: 6 },
]

const SPEEDS = [0.06, 0.09, 0.04, 0.07, 0.05] as const
const PANEL_ROTS = ['-1.5deg', '1deg', '0.5deg', '-0.8deg', '1.2deg'] as const

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}
function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function HomePage() {
  const avaRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const mosaicRef = useRef<HTMLDivElement>(null)
  const centerPanelRef = useRef<HTMLDivElement>(null)
  const heroCopyRef = useRef<HTMLDivElement>(null)
  const heroDisplayRef = useRef<HTMLDivElement>(null)
  const fullscreenOverlayRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const scrollContainer = scrollContainerRef.current
    const centerPanel = centerPanelRef.current
    const mosaic = mosaicRef.current
    const heroCopy = heroCopyRef.current
    const heroDisplay = heroDisplayRef.current
    const fullscreenOverlay = fullscreenOverlayRef.current
    const panels = panelRefs.current

    if (!scrollContainer || !centerPanel) return

    const vw = window.innerWidth
    const vh = window.innerHeight

    // ── GSAP scrub timeline (therealhotels pattern from 19766.js) ──
    // scrub: true ties animation progress directly to scroll position
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // 1 second smoothing
        invalidateOnRefresh: true,
      },
    })

    // Phase 1 (0-25%): mosaic parallax, nothing expands yet
    // Phase 2 (25-85%): center panel expands, mosaic + copy fade
    // Phase 3 (85-100%): fullscreen overlay fades in

    // Center panel expand
    heroTl.fromTo(
      centerPanel,
      { width: 200, height: 140, borderRadius: 3 },
      { width: vw, height: vh, borderRadius: 0, ease: 'power2.inOut', duration: 0.6 },
      0.25 // starts at 25% progress
    )

    // Mosaic fade out
    if (mosaic) {
      heroTl.to(mosaic, { opacity: 0, duration: 0.3, ease: 'none' }, 0.25)
    }

    // Hero copy fade out
    if (heroCopy) {
      heroTl.to(heroCopy, { opacity: 0, duration: 0.2, ease: 'none' }, 0.25)
    }

    // Hero display text fade out
    if (heroDisplay) {
      heroTl.to(heroDisplay, { opacity: 0, duration: 0.3, ease: 'none' }, 0.25)
    }

    // Fullscreen overlay fade in
    if (fullscreenOverlay) {
      heroTl.fromTo(
        fullscreenOverlay,
        { opacity: 0, pointerEvents: 'none' },
        { opacity: 1, pointerEvents: 'all', duration: 0.15, ease: 'none' },
        0.85
      )
    }

    // Mosaic panel parallax (runs throughout)
    panels.forEach((panel, i) => {
      if (!panel) return
      const rot = PANEL_ROTS[i]
      const tx = i === 2 ? '-50%' : '0'
      const drift = vh * 2 * SPEEDS[i]
      heroTl.fromTo(
        panel,
        { y: 0, x: tx, rotation: parseFloat(rot) },
        { y: -drift, x: tx, rotation: parseFloat(rot), ease: 'none', duration: 1 },
        0
      )
    })

    return () => {
      heroTl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === scrollContainer) st.kill()
      })
    }
  }, [])

  return (
    <>
      {/* ── NAV (therealhotels: branded label left, hamburger right) ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '24px 36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mixBlendMode: 'difference',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              display: 'block',
              width: 2,
              height: 32,
              background: '#C4943A',
              flexShrink: 0,
            }}
          />
          <div>
            <Image
              src="/logos/WS_logo__1_.png"
              alt="Wine Spectator"
              width={120}
              height={20}
              style={{ filter: 'invert(1)', height: '18px', width: 'auto', marginBottom: 4 }}
            />
            <span
              style={{
                display: 'block',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 8,
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(247,243,236,0.6)',
              }}
            >
              Napa Valley Guide
            </span>
          </div>
        </Link>
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
          aria-label="Open menu"
          type="button"
        >
          <span style={{ display: 'block', width: 28, height: 1.5, background: '#F7F3EC' }} />
          <span style={{ display: 'block', width: 28, height: 1.5, background: '#F7F3EC' }} />
          <span style={{ display: 'block', width: 28, height: 1.5, background: '#F7F3EC' }} />
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
                cursor: 'pointer',
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

      {/* ── STICKY SCROLL HERO (400vh) — progress drives panel via JS, not React state ── */}
      <div ref={scrollContainerRef} style={{ position: 'relative', height: '400vh' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            background: '#0D0B09',
            zIndex: 10,
          }}
        >
          <div
            ref={mosaicRef}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              willChange: 'opacity',
            }}
          >
            {PANELS.map((panel, i) => (
              <div
                key={panel.id}
                ref={(el) => {
                  panelRefs.current[i] = el
                }}
                style={{
                  position: 'absolute',
                  width: panel.style.width,
                  height: panel.style.height,
                  top: panel.style.top,
                  left: (panel.style as { left?: string; right?: string; bottom?: string }).left,
                  right: (panel.style as { right?: string }).right,
                  bottom: (panel.style as { bottom?: string }).bottom,
                  borderRadius: 3,
                  overflow: 'hidden',
                  willChange: 'transform',
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
          </div>

          <div
            ref={centerPanelRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 200,
              height: 140,
              transform: 'translate(-50%, -50%)',
              borderRadius: 3,
              overflow: 'hidden',
              zIndex: 20,
              willChange: 'width, height, border-radius',
            }}
          >
            <Image
              src={TEST_IMAGES[4]}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <video
              src={HERO_MP4}
              poster={HERO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(1.3) contrast(1.1)',
              }}
            />
          </div>

          <div
            ref={heroCopyRef}
            style={{
              position: 'absolute',
              left: '50%',
              top: '34%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 15,
              width: '100%',
              maxWidth: 600,
              padding: '0 20px',
              pointerEvents: 'none',
              willChange: 'opacity',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(24px, 3vw, 40px)',
                color: '#F7F3EC',
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                marginBottom: 16,
              }}
            >
              The valley that changed
              <br />
              American wine forever.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 300,
                letterSpacing: '0.12em',
                color: 'rgba(247,243,236,0.45)',
                lineHeight: 1.7,
              }}
            >
              Wine Spectator &middot; June 2026
            </p>
          </div>

          <div
            ref={heroDisplayRef}
            style={{
              position: 'absolute',
              bottom: '-0.08em',
              left: '-2%',
              right: '-2%',
              textAlign: 'center',
              zIndex: 12,
              pointerEvents: 'none',
              overflow: 'hidden',
              willChange: 'opacity',
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(140px, 22vw, 380px)',
                color: '#F7F3EC',
                letterSpacing: '-0.03em',
                lineHeight: 0.82,
                whiteSpace: 'nowrap',
                display: 'block',
              }}
            >
              Napa Valley
            </span>
          </div>

          <div
            ref={fullscreenOverlayRef}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 25,
              pointerEvents: 'none',
              opacity: 0,
              willChange: 'opacity',
            }}
          >
            <div style={{ position: 'absolute', top: 28, left: 36 }}>
              <Image
                src="/logos/WS_logo__1_.png"
                alt="Wine Spectator"
                width={160}
                height={24}
                style={{ filter: 'invert(1)', height: '24px', width: 'auto' }}
              />
            </div>
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
                  href="#main-content"
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
                <Link
                  href="/regions"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 400,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(247,243,236,0.55)',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(247,243,236,0.2)',
                    paddingBottom: 4,
                  }}
                >
                  All regions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="main-content" style={{ position: 'relative', zIndex: 5, background: '#0D0B09' }}>
      {/* ── INTRO ── */}
      <RevealSection>
        <section
          ref={avaRef}
          style={{ padding: '120px 60px 80px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(22px, 2.8vw, 36px)',
              color: 'rgba(247,243,236,0.85)',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
              marginBottom: 48,
            }}
          >
            No wine region on earth compresses so much ambition, beauty, and sensory pleasure into so small a space.
            Fifty miles of valley floor and mountain slope — and yet Napa Valley has become the benchmark against
            which the world measures itself.
          </p>
          <MarqueeCTA href="/regions" label="explore the guide" />
        </section>
      </RevealSection>

      {/* ── BROWSE BY APPELLATION (therealhotels vertical list with huge serif names) ── */}
      <RevealSection>
        <section style={{ padding: '80px 0 100px' }}>
          <div className="dim-siblings" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {regions.map((region, i) => (
              <AppellationLink key={region.slug} region={region} index={i} />
            ))}
          </div>
        </section>
      </RevealSection>

      </div>{/* close main-content */}

      {/* ── FEATURED REGIONS: GSAP pinned stacking cards ── */}
      <div style={{ background: '#0D0B09' }}>
        {featuredRegions.map((region, i) => (
          <Link
            key={region.slug}
            href={`/regions/${region.slug}`}
            data-pin-section=""
            style={{
              textDecoration: 'none',
              display: 'block',
              height: '100vh',
              position: 'relative',
              zIndex: i + 1,
            }}
          >
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <div data-image-scale="" style={{ position: 'absolute', inset: 0 }}>
                <Image
                  src={region.heroImage}
                  alt={region.name}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              {/* Gradient for text readability */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,11,9,0.2) 0%, rgba(13,11,9,0.1) 40%, rgba(13,11,9,0.6) 85%, rgba(13,11,9,0.9) 100%)', zIndex: 1 }} />
              {/* Metadata top center */}
              <div
                style={{
                  position: 'absolute',
                  top: 80,
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  zIndex: 2,
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(247,243,236,0.7)',
                  }}
                >
                  Napa Valley Appellation
                </p>
                <p
                  data-text-split=""
                  data-lines-slide-up=""
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(247,243,236,0.5)',
                    marginTop: 4,
                  }}
                >
                  {region.tagline}
                </p>
              </div>
              {/* Name anchored at bottom (therealhotels pattern) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  zIndex: 2,
                  padding: '0 60px 80px',
                }}
              >
                <h2
                  data-text-split=""
                  data-letters-rotate-in=""
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 'clamp(64px, 10vw, 140px)',
                    color: '#F7F3EC',
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {region.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 5, background: '#0D0B09' }}>

      {/* ── "IN THE WILD" / FROM THE JUNE ISSUE ── */}
      <RevealSection>
        <section style={{ padding: '120px 60px', textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
          <p
            data-text-split=""
            data-lines-slide-up=""
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(247,243,236,0.7)',
              lineHeight: 2.2,
              marginBottom: 40,
            }}
          >
            From vineyard to table, the definitive companion to Wine Spectator&apos;s June 2026 special issue.
            Wineries, restaurants, hotels, and the roads less traveled.
          </p>
          <Link
            href="/features/napa-judgment"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#F7F3EC',
              textDecoration: 'none',
              border: '1px solid rgba(247,243,236,0.25)',
              borderRadius: 40,
              padding: '16px 36px',
              display: 'inline-block',
              transition: 'border-color 0.6s',
            }}
          >
            Read the features
          </Link>
        </section>
      </RevealSection>

      {/* ── WINERY SPOTLIGHT (full-bleed) ── */}
      <WinerySpotlight winery={spotlightWinery} />

      {/* ── DINING STRIP ── */}
      <RevealSection>
        <section style={{ padding: '80px 0 60px' }}>
          <div style={{ padding: '0 60px', display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
            <h2 style={{ ...sectionHeading, fontSize: 'clamp(28px, 3.5vw, 48px)' }}>Tables worth the journey</h2>
            <Link href="/dining" style={seeAllLink}>All restaurants &rarr;</Link>
          </div>
          <HorizontalStrip entries={featuredRestaurants.map((item) => ({ type: 'dining' as const, item }))} />
        </section>
      </RevealSection>

      {/* ── STAY STRIP ── */}
      <RevealSection>
        <section style={{ padding: '0 0 60px' }}>
          <div style={{ padding: '0 60px', display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
            <h2 style={{ ...sectionHeading, fontSize: 'clamp(28px, 3.5vw, 48px)' }}>Where to sleep in wine country</h2>
            <Link href="/stay" style={seeAllLink}>All hotels &rarr;</Link>
          </div>
          <HorizontalStrip entries={featuredHotels.map((item) => ({ type: 'stay' as const, item }))} />
        </section>
      </RevealSection>

      {/* ── NEWSLETTER (therealhotels style: massive serif heading + full-width input) ── */}
      <section style={{ padding: '120px 60px 100px', borderTop: '1px solid rgba(247,243,236,0.06)', textAlign: 'center' }}>
        <h2
          data-text-split=""
          data-letters-rotate-in=""
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(64px, 10vw, 140px)',
            color: '#F7F3EC',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            marginBottom: 24,
          }}
        >
          Stay in the know
        </h2>
        <p
          data-text-split=""
          data-lines-slide-up=""
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 300,
            color: 'rgba(247,243,236,0.55)',
            marginBottom: 48,
          }}
        >
          Be the first to know when new wineries, restaurants, and travel guides are added
        </p>
        <EmailForm />
        </section>

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
            gridTemplateColumns: '1.1fr 1fr 1fr 1fr',
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
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
            {[
              ['Wineries', '/wineries'],
              ['Regions', '/regions'],
              ['Dining', '/dining'],
              ['Stay', '/stay'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ ...styles.microLabel, color: '#9B9283', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </nav>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
            {[
              ['Map', '/map'],
              ['Plan', '/plan'],
              ['Calendar', '/calendar'],
              ['Subscribe', 'https://winespectator.com/subscribe'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ ...styles.microLabel, color: '#9B9283', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </nav>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
            {[
              ['Privacy', '/privacy'],
              ['Contact', '/contact'],
              ['WineSpectator.com', 'https://winespectator.com'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ ...styles.microLabel, color: 'rgba(155,146,131,0.45)', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </nav>
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
              cursor: 'pointer',
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

function RevealSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      {children}
    </motion.div>
  )
}

/** therealhotels "browse by series" pattern:
 *  Vertical stack of HUGE serif names, centered,
 *  with small thumbnails scattered to sides.
 *  Non-hovered items are dim gray, hovered item is bright white. */
function AppellationLink({ region, index }: { region: RegionData; index: number }) {
  const [hovered, setHovered] = useState(false)
  // Alternate thumbnail position: left for even, right for odd
  const thumbSide = index % 2 === 0 ? 'left' : 'right'

  return (
    <Link
      href={`/regions/${region.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        padding: '8px 60px',
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Thumbnail (appears on hover, scattered position) */}
      <div
        style={{
          position: 'absolute',
          [thumbSide]: 'clamp(40px, 8vw, 120px)',
          width: 'clamp(100px, 12vw, 200px)',
          aspectRatio: '4/3',
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.9)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          pointerEvents: 'none',
        }}
      >
        <Image
          src={region.heroImage}
          alt=""
          fill
          sizes="200px"
          style={{ objectFit: 'cover' }}
        />
      </div>
      {/* Name */}
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(48px, 8vw, 120px)',
          color: hovered ? '#F7F3EC' : 'rgba(247,243,236,0.2)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          transition: 'color 0.5s ease',
          textAlign: 'center',
        }}
      >
        {region.name}
      </span>
    </Link>
  )
}

function AVAStrip({ region, index }: { region: RegionData; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={`/regions/${region.slug}`}
      style={{
        flexShrink: 0,
        width: 280,
        height: 520,
        scrollSnapAlign: 'start',
        textDecoration: 'none',
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        <Image
          src={region.heroImage}
          alt={region.name}
          fill
          sizes="280px"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? 'linear-gradient(to top, rgba(13,11,9,0.88) 0%, rgba(13,11,9,0.25) 55%, transparent 100%)'
            : 'linear-gradient(to top, rgba(13,11,9,0.94) 0%, rgba(13,11,9,0.35) 55%, transparent 100%)',
          transition: 'opacity 0.45s',
        }}
      />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 24px', zIndex: 1 }}>
        <span
          style={{
            display: 'block',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(24px,2.5vw,34px)',
            color: '#F7F3EC',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 8,
          }}
        >
          {region.name}
        </span>
        <span style={{ ...styles.microLabel, color: '#9B9283' }}>{region.tagline}</span>
      </div>
    </Link>
  )
}

function RegionEditorialCard({ region, index }: { region: RegionData; index: number }) {
  const photoLeft = index % 2 === 0
  const [imgHovered, setImgHovered] = useState(false)

  const textVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  }
  const lineUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  }
  const imgReveal = {
    hidden: { scale: 1.08, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      style={{
        display: 'flex',
        flexDirection: photoLeft ? 'row' : 'row-reverse',
        width: '100%',
        marginBottom: index < featuredRegions.length - 1 ? 2 : 0,
        background: '#0D0B09',
      }}
    >
      <motion.div
        variants={imgReveal}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
        style={{ flex: '0 0 58%', position: 'relative', minHeight: 700, overflow: 'hidden' }}
      >
        <Image
          src={region.heroImage}
          alt={region.name}
          fill
          sizes="58vw"
          style={{
            objectFit: 'cover',
            transform: imgHovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
      </motion.div>
      <motion.div
        variants={textVariants}
        style={{
          flex: '1 1 42%',
          padding: '72px 60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0D0B09',
        }}
      >
        <motion.p
          variants={lineUp}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C4943A',
            marginBottom: 20,
          }}
        >
          Napa Valley Appellation
        </motion.p>
        <motion.h3
          variants={lineUp}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(40px, 4vw, 64px)',
            color: '#F7F3EC',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            marginBottom: 16,
          }}
        >
          {region.name}
        </motion.h3>
        <motion.p variants={lineUp} style={{ ...styles.microLabel, color: '#9B9283', marginBottom: 28 }}>
          Napa Valley, California
        </motion.p>
        <motion.p
          variants={lineUp}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: 'rgba(247,243,236,0.72)',
            lineHeight: 1.85,
            marginBottom: 36,
          }}
        >
          {region.intro.length > 200 ? region.intro.slice(0, 200).replace(/\s+\S*$/, '') + '...' : region.intro}
        </motion.p>
        <motion.div variants={lineUp}>
          <Link
            href={`/regions/${region.slug}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#F7F3EC',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(247,243,236,0.25)',
              paddingBottom: 4,
              width: 'fit-content',
              display: 'inline-block',
              transition: 'border-color 0.6s, color 0.6s',
            }}
          >
            Explore {region.name} &rarr;
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function ArticleFeatureRow({ article, index, href }: { article: Article; index: number; href: string }) {
  const imageSrc = article.images[0] && article.images[0].length > 0 ? article.images[0] : TEST_IMAGES[index % 7]
  const photoLeft = index % 2 === 0
  const [imgHovered, setImgHovered] = useState(false)
  const sectionEyebrow =
    article.section === 'dining'
      ? 'Dining'
      : article.section === 'feature'
        ? 'Feature'
        : article.section === 'lede'
          ? 'Guide'
          : article.section.replace(/-/g, ' ')

  const textVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  }
  const lineUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  }
  const imgReveal = {
    hidden: { scale: 1.06, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={{
        display: 'flex',
        flexDirection: photoLeft ? 'row' : 'row-reverse',
        width: '100%',
        minHeight: 500,
        marginBottom: 2,
      }}
    >
      <motion.div
        variants={imgReveal}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
        style={{ flex: '0 0 58%', position: 'relative', minHeight: 500, overflow: 'hidden' }}
      >
        <Image
          src={imageSrc}
          alt={article.title}
          fill
          sizes="58vw"
          style={{
            objectFit: 'cover',
            transform: imgHovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
      </motion.div>
      <motion.div
        variants={textVariants}
        style={{
          flex: '1 1 42%',
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0D0B09',
        }}
      >
        <motion.p
          variants={lineUp}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C4943A',
            marginBottom: 16,
          }}
        >
          {sectionEyebrow}
        </motion.p>
        <motion.h3
          variants={lineUp}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(32px, 3.5vw, 56px)',
            color: '#F7F3EC',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 20,
          }}
        >
          {article.title}
        </motion.h3>
        <motion.p
          variants={lineUp}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 300,
            color: 'rgba(247,243,236,0.55)',
            lineHeight: 1.75,
            marginBottom: 24,
          }}
        >
          {article.excerpt}
        </motion.p>
        <motion.p variants={lineUp} style={{ ...styles.microLabel, color: 'rgba(155,146,131,0.55)', marginBottom: 28 }}>
          {article.author ?? 'Wine Spectator'} &middot; June 2026
        </motion.p>
        <motion.div variants={lineUp}>
          <Link
            href={href}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#F7F3EC',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(247,243,236,0.25)',
              paddingBottom: 4,
              width: 'fit-content',
              display: 'inline-block',
            }}
        >
            Read the feature &rarr;
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function WinerySpotlight({ winery }: { winery: Winery }) {
  const r = getRegion(winery.region)
  const ava = r?.name ?? winery.region.replace(/-/g, ' ')
  const appt = winery.visitInfo?.appointment

  return (
    <div style={{ position: 'relative', height: '85vh', minHeight: 600, overflow: 'hidden' }}>
      <Image src={winery.images[0]} alt={winery.name} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(13,11,9,0.5) 45%, rgba(13,11,9,0.92) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '56px 60px',
          zIndex: 1,
        }}
      >
        <p style={{ ...styles.microLabel, color: '#C4943A', marginBottom: 16 }}>
          {ava.toUpperCase()}
          {appt !== undefined ? ` · ${appt ? 'BY APPOINTMENT' : 'WALK-INS WELCOME'}` : ''}
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(56px, 8vw, 112px)',
            color: '#F7F3EC',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: 16,
          }}
        >
          {winery.name}
        </h2>
        {winery.address ? (
          <p style={{ ...styles.microLabel, color: '#9B9283', marginBottom: 24 }}>{winery.address}</p>
        ) : null}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 22,
            color: 'rgba(247,243,236,0.85)',
            lineHeight: 1.45,
            maxWidth: 640,
            marginBottom: 32,
          }}
        >
          {winery.excerpt}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          {winery.visitInfo?.website ? (
            <a
              href={winery.visitInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#0D0B09',
                background: '#F7F3EC',
                padding: '14px 28px',
                borderRadius: 2,
                textDecoration: 'none',
              }}
            >
              Reserve a visit →
            </a>
          ) : null}
          <Link
            href={`/wineries/${winery.slug}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#F7F3EC',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(247,243,236,0.3)',
              paddingBottom: 4,
            }}
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  )
}

function EmailForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return done ? (
    <p style={{ ...styles.bodyText, color: '#C4943A', textAlign: 'center' }}>You&apos;re in. Watch your inbox.</p>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (email) setDone(true)
      }}
      style={{
        display: 'flex',
        maxWidth: 700,
        margin: '0 auto',
        border: '1px solid rgba(247,243,236,0.2)',
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="EMAIL ADDRESS"
        style={{
          flex: 1,
          background: 'none',
          border: 'none',
          outline: 'none',
          color: '#F7F3EC',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '18px 24px',
        }}
      />
      <button
        type="submit"
        style={{
          background: 'none',
          border: 'none',
          borderLeft: '1px solid rgba(247,243,236,0.2)',
          cursor: 'pointer',
          color: 'rgba(247,243,236,0.6)',
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          transition: 'color 0.3s',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  )
}

// ── Shared style objects ─────────────────────────────────────────────
const styles = {
  bodyText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 300,
    color: '#9B9283',
    lineHeight: 1.8,
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
