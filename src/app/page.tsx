'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { regions, type RegionData } from '@/data/regions'
import { wineries } from '@/data/wineries'
import { TEST_IMAGES } from '@/lib/test-images'
import { getRegionEditorialMark } from '@/lib/regionIcons'
import { NewsletterSubscribeForm } from '@/components/ui/Newsletter'

const featuredRegions = regions

// ── JW Player (test media; swap IDs when final assets land) ───────────
// Catalog also in src/components/video/JWVideo.tsx STATIC_MP4_720
const HERO_MEDIA_ID = 'sVn1cQyI'
const HERO_MP4 = `https://cdn.jwplayer.com/videos/${HERO_MEDIA_ID}-WBFwZoOE.mp4`
const HERO_POSTER = `https://cdn.jwplayer.com/v2/media/${HERO_MEDIA_ID}/poster.jpg`

// ── Mosaic panel positions (mirroring therealhotels) ─────────────────
const PANELS = [
  { id: 1, style: { width: 200, height: 260, top: '8%', left: '5%' }, imageIndex: 5 },
  { id: 2, style: { width: 160, height: 210, top: '30%', left: '12%' }, imageIndex: 2 },
  { id: 3, style: { width: 280, height: 220, top: '15%', left: '38%' }, imageIndex: 0 },
  { id: 4, style: { width: 180, height: 240, bottom: '15%', right: '12%' }, imageIndex: 3 },
  { id: 5, style: { width: 160, height: 200, bottom: '25%', left: '50%' }, imageIndex: 6 },
]

const SPEEDS = [0.06, 0.09, 0.04, 0.07, 0.05] as const
const PANEL_ROTS = ['-1.5deg', '1deg', '0.5deg', '-0.8deg', '1.2deg'] as const

export default function HomePage() {
  const avaRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const mosaicRef = useRef<HTMLDivElement>(null)
  const centerPanelRef = useRef<HTMLDivElement>(null)
  const heroCopyRef = useRef<HTMLDivElement>(null)
  const heroDisplayRef = useRef<HTMLDivElement>(null)
  const fullscreenOverlayRef = useRef<HTMLDivElement>(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [homeNavOverImagery, setHomeNavOverImagery] = useState(true)

  useLayoutEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    let ticking = false
    const sync = () => {
      ticking = false
      const bottom = el.offsetTop + el.offsetHeight
      setHomeNavOverImagery(window.scrollY < bottom)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(sync)
      }
    }

    sync()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

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
        scrub: true, // direct scroll tie, no lag
        invalidateOnRefresh: true,
      },
    })

    // Phase 1 (0-15%): mosaic parallax, gentle start
    // Phase 2 (15-65%): panel expands smoothly from top-right to full
    // Phase 3 (65-82%): DEAD AIR — fullscreen video plays uninterrupted
    // Phase 4 (82-100%): editorial overlay fades in

    // Center panel expand
    heroTl.fromTo(
      centerPanel,
      { width: 280, height: 200, top: '8%', right: '5%', borderRadius: 0 },
      { width: vw, height: vh, top: 0, right: 0, borderRadius: 0, ease: 'power3.inOut', duration: 0.5 },
      0.15
    )

    // Mosaic fade out (starts with expand, fades quickly)
    if (mosaic) {
      heroTl.to(mosaic, { opacity: 0, duration: 0.2, ease: 'power2.out' }, 0.15)
    }

    // Hero copy fade out
    if (heroCopy) {
      heroTl.to(heroCopy, { opacity: 0, duration: 0.2, ease: 'power2.out' }, 0.15)
    }

    // Hero display text fade out
    if (heroDisplay) {
      heroTl.to(heroDisplay, { opacity: 0, duration: 0.2, ease: 'power2.out' }, 0.15)
    }

    // Fullscreen overlay fade in (after the dead-air pause beat)
    if (fullscreenOverlay) {
      heroTl.fromTo(
        fullscreenOverlay,
        { opacity: 0, pointerEvents: 'none' },
        { opacity: 1, pointerEvents: 'all', duration: 0.18, ease: 'power2.out' },
        0.82
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

    // ── Lazy-load the hero video after first paint ──
    // Defers video network request so it doesn't compete with critical assets
    // (mosaic images, fonts, JS bundles). Video starts playing once loaded —
    // user sees the poster during the brief load window. Saves ~200ms TTI.
    const videoLoadTimer = window.setTimeout(() => {
      const video = heroVideoRef.current
      if (video && !video.src) {
        video.src = HERO_MP4
        video.load()
        video.play().catch(() => {
          // Autoplay blocked; poster remains visible — acceptable fallback
        })
      }
    }, 400)

    return () => {
      heroTl.kill()
      window.clearTimeout(videoLoadTimer)
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === scrollContainer) st.kill()
      })
    }
  }, [])

  return (
    <>
      {/* ── NAV (therealhotels: branded label left, hamburger right) ── */}
      <nav
        className={homeNavOverImagery ? 'home-nav home-nav--over-imagery' : 'home-nav'}
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
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              display: 'block',
              width: 2,
              flexShrink: 0,
            }}
            aria-hidden
          />
          <div>
            <Image
              src="/logos/WS_logo__1_.png"
              alt="Wine Spectator"
              width={180}
              height={36}
              style={{ width: 'auto' }}
            />
            <span>Napa Valley Guide</span>
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
          <span className="home-nav__hamburger-bar" style={{ display: 'block', width: 28, height: 1.5 }} />
          <span className="home-nav__hamburger-bar" style={{ display: 'block', width: 28, height: 1.5 }} />
          <span className="home-nav__hamburger-bar" style={{ display: 'block', width: 28, height: 1.5 }} />
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
            className="home-hero-mosaic"
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
                  borderRadius: 0,
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
            className="home-hero-center"
            style={{
              position: 'absolute',
              top: '8%',
              right: '5%',
              width: 280,
              height: 200,
              borderRadius: 0,
              overflow: 'hidden',
              zIndex: 20,
              willChange: 'width, height, top, right',
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
              ref={heroVideoRef}
              poster={HERO_POSTER}
              muted
              loop
              playsInline
              preload="none"
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
            className="home-hero-tagline"
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
          </div>

          <div
            ref={heroDisplayRef}
            className="home-hero-display"
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
            className="home-hero-fullscreen-overlay"
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
                width={171}
                height={36}
                style={{ filter: 'invert(1)', width: 'auto' }}
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
                <span
                  style={{
                    display: 'block',
                    width: 60,
                    height: 1,
                    background: '#C4943A',
                    marginBottom: 18,
                  }}
                  aria-hidden="true"
                />
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
          className="home-intro"
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
        </section>
      </RevealSection>

      {/* ── BROWSE BY APPELLATION (therealhotels vertical list with huge serif names) ── */}
      <RevealSection>
        <section className="home-appellation-wrap" style={{ padding: '80px 0 100px' }}>
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
            <div style={{ position: 'absolute', inset: 0 }}>
              {/* Full-screen image */}
              <div data-image-scale="" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                <Image
                  src={region.heroImage}
                  alt={region.name}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              {/* Gradient overlay for text readability */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 50%, transparent 80%)',
                zIndex: 1,
              }} />
              {/* Metadata top center */}
              <div className="home-region-pin-label" style={{
                position: 'absolute', top: 80, left: 0, right: 0,
                textAlign: 'center', zIndex: 2,
              }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10, letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(247,243,236,0.7)',
                }}>
                  Napa Valley Appellation
                </p>
              </div>
              {/* Name + tagline centered on image */}
              <div className="home-region-pin-copy" style={{
                position: 'absolute', top: '50%', left: 0, right: 0,
                transform: 'translateY(-50%)',
                textAlign: 'center', zIndex: 2, padding: '0 40px',
              }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic', fontWeight: 300,
                  fontSize: 'clamp(56px, 9vw, 120px)',
                  color: '#F7F3EC', lineHeight: 0.9,
                  letterSpacing: '-0.03em', marginBottom: 12,
                  textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                }}>
                  {region.name}
                </h2>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#C4943A',
                }}>
                  {region.tagline}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 5, background: '#0D0B09' }}>

      {/* ── "IN THE WILD" / FROM THE JUNE ISSUE ── */}
      <RevealSection>
        <section className="home-wild-section" style={{ padding: '120px 60px', textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
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

      {/* ── NEWSLETTER (therealhotels style: massive serif heading + full-width input) ── */}
      <section className="home-newsletter-section" style={{ padding: '120px 60px 100px', borderTop: '1px solid rgba(247,243,236,0.06)', textAlign: 'center' }}>
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
        <NewsletterSubscribeForm variant="hero" />
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
          className="home-footer-grid"
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
          className="home-footer-legal"
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

/** Per-row overlap (therealhotels-style): anchor along the word with mixed left/right % so marks aren’t one vertical column */
type MarkStagger = {
  edge: 'left' | 'right'
  inset: string
  top: string
  dx: number
  dy: number
  deg: number
}

/** Keep top ≥ ~0.08em and dy biased downward so marks sit on cap height / x-height, not in the gap above. */
const APP_MARK_STAGGER: readonly MarkStagger[] = [
  { edge: 'left', inset: '10%', top: '0.14em', dx: 0.1, dy: 0.14, deg: -11 },
  { edge: 'right', inset: '16%', top: '0.26em', dx: -0.14, dy: 0.2, deg: 9 },
  { edge: 'left', inset: '46%', top: '0.3em', dx: 0.08, dy: 0.18, deg: -7 },
  { edge: 'right', inset: '10%', top: '0.18em', dx: 0.04, dy: 0.12, deg: 6 },
  { edge: 'left', inset: '56%', top: '0.22em', dx: -0.1, dy: 0.16, deg: -5 },
  { edge: 'right', inset: '34%', top: '0.34em', dx: 0.16, dy: 0.22, deg: 8 },
  { edge: 'left', inset: '28%', top: '0.2em', dx: -0.18, dy: 0.12, deg: -8 },
]

/** therealhotels "browse by series" pattern:
 *  Vertical stack of HUGE serif names, centered.
 *  On hover: name turns white, multiple images appear scattered,
 *  a fun icon/sticker appears on the text. */
function AppellationLink({ region, index }: { region: RegionData; index: number }) {
  const [hovered, setHovered] = useState(false)
  const RegionMark = getRegionEditorialMark(region.slug)

  // Get 2-3 images for this region from its wineries
  const regionWineries = wineries.filter((w) => w.region === region.slug)
  const img1 = region.heroImage
  const img2 = regionWineries[0]?.images[0] ?? TEST_IMAGES[(index + 1) % TEST_IMAGES.length]
  const img3 = regionWineries[1]?.images[0] ?? TEST_IMAGES[(index + 3) % TEST_IMAGES.length]
  const st = APP_MARK_STAGGER[index % APP_MARK_STAGGER.length]
  const hoverTilt = st.deg + (st.deg >= 0 ? 5 : -5)

  return (
    <Link
      href={`/regions/${region.slug}`}
      className="home-appellation-link"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        padding: 'clamp(5px, 0.9vw, 11px) clamp(24px, 5vw, 60px)',
        overflow: 'visible',
      }}
    >
      {/* Image 1: left side */}
      <div
        style={{
          position: 'absolute',
          left: 'clamp(30px, 5vw, 80px)',
          top: '50%',
          transform: `translateY(-50%) ${hovered ? 'scale(1)' : 'scale(0.85)'}`,
          width: 'clamp(120px, 14vw, 220px)',
          aspectRatio: '4/3',
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          clipPath: hovered ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)',
          transition: 'clip-path 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease, transform 0.5s ease',
          pointerEvents: 'none',
          borderRadius: 2,
        }}
      >
        <Image src={img1} alt="" fill sizes="220px" style={{ objectFit: 'cover' }} />
      </div>

      {/* Image 2: right side, offset up */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(30px, 5vw, 80px)',
          top: '20%',
          transform: `${hovered ? 'scale(1)' : 'scale(0.85)'}`,
          width: 'clamp(100px, 12vw, 180px)',
          aspectRatio: '3/4',
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          clipPath: hovered ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)',
          transition: 'clip-path 0.5s cubic-bezier(0.4,0,0.2,1) 0.08s, opacity 0.4s ease 0.08s, transform 0.5s ease',
          pointerEvents: 'none',
          borderRadius: 2,
        }}
      >
        <Image src={img2} alt="" fill sizes="180px" style={{ objectFit: 'cover' }} />
      </div>

      {/* Image 3: right side, offset down */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(180px, 22vw, 340px)',
          bottom: '-10%',
          transform: `${hovered ? 'scale(1)' : 'scale(0.85)'}`,
          width: 'clamp(80px, 10vw, 150px)',
          aspectRatio: '1/1',
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          clipPath: hovered ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
          transition: 'clip-path 0.5s cubic-bezier(0.4,0,0.2,1) 0.15s, opacity 0.4s ease 0.15s, transform 0.5s ease',
          pointerEvents: 'none',
          borderRadius: 2,
        }}
      >
        <Image src={img3} alt="" fill sizes="150px" style={{ objectFit: 'cover' }} />
      </div>

      {/* Name + staggered sticker — mark overlaps type at varied heights / tilts (therealhotels) */}
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          fontSize: 'clamp(48px, 8vw, 120px)',
          lineHeight: 0.92,
          paddingTop: 0,
          paddingBottom: '0.08em',
          paddingRight: '0.5em',
          paddingLeft: '0.08em',
        }}
      >
        <span
          className="home-appellation-name"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            ...(hovered ? { color: '#F7F3EC' } : {}),
            letterSpacing: '-0.03em',
            transition: 'color 0.4s ease',
            textAlign: 'center',
          }}
        >
          {region.name}
        </span>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: st.top,
            ...(st.edge === 'left'
              ? { left: st.inset, right: 'auto' }
              : { right: st.inset, left: 'auto' }),
            width: '0.58em',
            height: '0.58em',
            minWidth: 34,
            minHeight: 34,
            display: 'block',
            zIndex: 2,
            isolation: 'isolate',
            pointerEvents: 'none',
            opacity: hovered ? 1 : 0,
            transform: hovered
              ? `translate(calc(${st.dx}em + 0.02em), calc(${st.dy}em + 0.03em)) rotate(${hoverTilt}deg) scale(1.06)`
              : `translate(${st.dx}em, ${st.dy}em) rotate(${st.deg}deg) scale(0.88)`,
            transformOrigin: '50% 78%',
            transition:
              'opacity 0.28s ease, transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <RegionMark slug={String(region.slug)} accentColor={region.accentColor} />
        </span>
      </span>
    </Link>
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
