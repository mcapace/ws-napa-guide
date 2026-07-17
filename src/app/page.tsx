'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { WS_LOGO_PRIMARY_SRC } from '@/lib/ws-logo'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sortRegionsSouthToNorth } from '@/data/region-order'
import { regions, type RegionData } from '@/data/regions'
import { buildMosaicPanelQueues, pickHeroVideoFallback } from '@/lib/home-mosaic-images'
import { getAppellationRevealImages } from '@/lib/region-scroll-reveals'
import { HomeMosaicRotatingPanel } from '@/components/home/HomeMosaicRotatingPanel'
import { useHomeMosaicRotation } from '@/components/home/useHomeMosaicRotation'
import { getRegionEditorialMark } from '@/lib/regionIcons'
import { NewsletterSubscribeForm } from '@/components/ui/Newsletter'
import Footer from '@/components/ui/Footer'
import { NavMenuOverlay } from '@/components/ui/NavMenuOverlay'
import { HomeStoriesSection } from '@/components/home/HomeStoriesSection'
import { getStoryArticles } from '@/data/site-stories'

const featuredRegions = sortRegionsSouthToNorth(regions)
const browseRegions = sortRegionsSouthToNorth(regions)

// ── Homepage hero video (4 Adobe Stock clips stitched with crossfades) ──
const HERO_VIDEO = '/images/homepage/hero/video.mp4'
const HERO_POSTER = '/images/homepage/hero/poster.jpg'

// ── Mosaic panel positions (TRH: perimeter tiles, open center, lifted off bottom edge) ──
// Tiles live on a fixed 1440px design canvas that scales as one unit below
// that width — true TRH behavior: the whole collage gets photographically
// smaller with spacing and overlaps intact.
const MOSAIC_DESIGN_WIDTH = 1440
const MOSAIC_DESIGN_HEIGHT = 810

const PANELS = [
  { id: 1, width: 196, height: 250, style: { top: '5%', left: '5%' } },
  { id: 2, width: 156, height: 200, style: { top: '20%', left: '11%' } },
  { id: 3, width: 222, height: 148, style: { top: '3%', left: '48%' } },
  { id: 4, width: 248, height: 208, style: { bottom: '30%', left: '4%', zIndex: 13 } },
  { id: 5, width: 174, height: 228, style: { top: '28%', right: '5%' } },
  { id: 6, width: 170, height: 222, style: { bottom: '32%', right: '6%', zIndex: 15 } },
]

const SPEEDS = [0.06, 0.09, 0.04, 0.07, 0.05, 0.06] as const
const PANEL_ROTS = ['-1.5deg', '1deg', '0.5deg', '-0.8deg', '1.2deg', '-0.6deg'] as const

/** Pixel geometry for hero video panel — always position with `left`, never `right` (avoids GSAP horizontal bounce). */
function heroPanelStart() {
  const narrow = window.innerWidth <= 768
  const width = narrow ? Math.min(260, window.innerWidth - 28) : 220
  const height = narrow
    ? Math.min(188, Math.round((width * 165) / 220))
    : 165
  const top = narrow ? window.innerHeight * 0.08 : window.innerHeight * 0.06
  const rightInset = narrow ? window.innerWidth * 0.05 : window.innerWidth * 0.07
  const left = window.innerWidth - width - rightInset
  return { width, height, top, left, borderRadius: 3 }
}

function heroPanelEnd() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    top: 0,
    left: 0,
    borderRadius: 0,
  }
}

export default function HomePage() {
  const avaRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const mosaicRef = useRef<HTMLDivElement>(null)
  const mosaicCanvasRef = useRef<HTMLDivElement>(null)
  const centerPanelRef = useRef<HTMLDivElement>(null)
  const heroCopyRef = useRef<HTMLDivElement>(null)
  const heroDisplayRef = useRef<HTMLDivElement>(null)
  const fullscreenOverlayRef = useRef<HTMLDivElement>(null)
  const homeNavRef = useRef<HTMLElement>(null)
  const heroTopScrimRef = useRef<HTMLDivElement>(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroVideoReady, setHeroVideoReady] = useState(false)
  /** null until mounted; phones never mount the hero video (no fetch) */
  const [isPhone, setIsPhone] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsPhone(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  /** Slot-matched crops; rotation never shows the same still on two tiles at once */
  const mosaicPanelQueues = useMemo(() => buildMosaicPanelQueues(PANELS.length), [])
  const mosaicVisible = useHomeMosaicRotation(mosaicPanelQueues)
  const heroCenterFallback = pickHeroVideoFallback(mosaicVisible)

  useLayoutEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return
    const centerPanel = centerPanelRef.current
    if (!centerPanel) return
    const start = heroPanelStart()
    gsap.set(centerPanel, { ...start, right: 'auto' })
  }, [])

  /** TRH wordmark: full width; keep full letterforms visible (no bottom clip on descenders) */
  useLayoutEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return
    const container = heroDisplayRef.current
    const title = container?.querySelector<HTMLSpanElement>('.home-hero-display__title')
    if (!container || !title) return

    const fitTitle = () => {
      title.style.fontSize = ''
      title.style.transform = 'none'

      const maxWidth = container.clientWidth
      const maxVisibleHeight = window.innerHeight * (window.innerWidth <= 768 ? 0.22 : 0.25)
      let size = parseFloat(getComputedStyle(title).fontSize)
      const minSize = window.innerWidth <= 768 ? 56 : 88

      while (size > minSize) {
        title.style.fontSize = `${size}px`
        if (title.scrollWidth <= maxWidth && title.offsetHeight <= maxVisibleHeight) break
        size -= 1
      }
    }

    fitTitle()
    window.addEventListener('resize', fitTitle)
    return () => window.removeEventListener('resize', fitTitle)
  }, [])

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return

    const markReadyAndPlay = () => {
      setHeroVideoReady(true)
      video.muted = true
      video.play().catch(() => {
        /* autoplay blocked — poster / fallback remain */
      })
    }

    video.addEventListener('loadeddata', markReadyAndPlay)
    video.addEventListener('playing', markReadyAndPlay)
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      markReadyAndPlay()
    }

    return () => {
      video.removeEventListener('loadeddata', markReadyAndPlay)
      video.removeEventListener('playing', markReadyAndPlay)
    }
  }, [isPhone])

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return
    gsap.registerPlugin(ScrollTrigger)

    const scrollContainer = scrollContainerRef.current
    const centerPanel = centerPanelRef.current
    const mosaic = mosaicRef.current
    const heroCopy = heroCopyRef.current
    const heroDisplay = heroDisplayRef.current
    const fullscreenOverlay = fullscreenOverlayRef.current
    const homeNav = homeNavRef.current
    const heroTopScrim = heroTopScrimRef.current
    const panels = panelRefs.current

    if (!scrollContainer || !centerPanel) return

    gsap.set(centerPanel, { ...heroPanelStart(), right: 'auto' })

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

    // Center panel: tween left/top/width/height only (never right → left; that caused a pre-expand snap)
    heroTl.fromTo(
      centerPanel,
      {
        width: () => heroPanelStart().width,
        height: () => heroPanelStart().height,
        top: () => heroPanelStart().top,
        left: () => heroPanelStart().left,
        borderRadius: 0,
      },
      {
        width: () => heroPanelEnd().width,
        height: () => heroPanelEnd().height,
        top: () => heroPanelEnd().top,
        left: () => heroPanelEnd().left,
        borderRadius: 0,
        ease: 'power3.inOut',
        duration: 0.5,
      },
      0.15,
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

    // Hide fixed nav + top scrim during fullscreen video (avoids double-nav with overlay logo)
    if (homeNav) {
      heroTl.to(
        homeNav,
        { opacity: 0, pointerEvents: 'none', duration: 0.18, ease: 'power2.out' },
        0.15,
      )
      heroTl.to(
        homeNav,
        { opacity: 1, pointerEvents: 'auto', duration: 0.18, ease: 'power2.out' },
        0.82,
      )
    }
    if (heroTopScrim) {
      heroTl.to(heroTopScrim, { opacity: 0, duration: 0.18, ease: 'power2.out' }, 0.15)
      heroTl.to(heroTopScrim, { opacity: 1, duration: 0.18, ease: 'power2.out' }, 0.82)
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
      const drift = window.innerHeight * 2 * SPEEDS[i]
      heroTl.fromTo(
        panel,
        { y: 0, x: tx, rotation: parseFloat(rot) },
        { y: -drift, x: tx, rotation: parseFloat(rot), ease: 'none', duration: 1 },
        0
      )
    })

    const applyMosaicScale = () => {
      const canvas = mosaicCanvasRef.current
      if (!canvas) return
      // Uniform scale bounded by BOTH dimensions — short or narrow windows
      // shrink the whole collage together, so tiles never crowd vertically
      const scale = Math.min(
        window.innerWidth / MOSAIC_DESIGN_WIDTH,
        window.innerHeight / MOSAIC_DESIGN_HEIGHT,
      )
      canvas.style.transform = `translateX(-50%) scale(${scale})`
    }
    applyMosaicScale()

    const onResize = () => {
      gsap.set(centerPanel, { ...heroPanelStart(), right: 'auto' })
      applyMosaicScale()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      heroTl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === scrollContainer) st.kill()
      })
    }
  }, [])

  return (
    <div data-page="home-hero">
      {/* ── NAV (TRH: compact uppercase label + hamburger) ── */}
      <nav ref={homeNavRef} className="home-nav ws-nav--on-dark-surface">
        <Link href="/" className="ws-nav-brand">
          <Image
            className="ws-nav-brand__wordmark"
            src={WS_LOGO_PRIMARY_SRC}
            alt="Wine Spectator"
            width={Math.round(36 * 4.75)}
            height={36}
            priority
            style={{ width: 'auto' }}
          />
          <span className="ws-nav-brand__tagline">Napa Valley Guide</span>
        </Link>
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          type="button"
        >
          <span className="home-nav__hamburger-bar" />
          <span className="home-nav__hamburger-bar" />
        </button>
      </nav>

      <NavMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── MOBILE COVER — phones skip the 400vh video hero entirely ── */}
      <section className="home-mobile-cover" aria-label="Explore Napa Valley">
        <Image
          src={HERO_POSTER}
          alt=""
          fill
          priority
          sizes="100vw"
          className="home-mobile-cover__image"
        />
        <div className="home-mobile-cover__scrim" aria-hidden />
        <div className="home-mobile-cover__copy">
          <p className="home-mobile-cover__eyebrow">Wine Spectator · June 2026</p>
          <h2 className="home-mobile-cover__title">
            Explore
            <br />
            Napa Valley
          </h2>
          <p className="home-mobile-cover__dek">
            Our guide to exploring America&apos;s most famous wine region
          </p>
          <Link href="#main-content" className="home-mobile-cover__cta">
            Browse the guide ↓
          </Link>
        </div>
      </section>

      {/* ── STICKY SCROLL HERO (400vh) — desktop only; display:none <768px ── */}
      <div ref={scrollContainerRef} className="home-hero-desktop" style={{ position: 'relative', height: '400vh' }}>
        <div
          className="home-hero-sticky"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            background: '#0D0B09',
            zIndex: 10,
          }}
        >
          <div className="hero-top-scrim hero-top-scrim--home-sticky" ref={heroTopScrimRef} aria-hidden />
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
            {/* Fixed 1440px design canvas — the whole collage scales as one
                unit on narrower windows (TRH behavior), so tile spacing and
                overlap never distort */}
            <div
              ref={mosaicCanvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: MOSAIC_DESIGN_WIDTH,
                height: MOSAIC_DESIGN_HEIGHT,
                transform: 'translateX(-50%)',
                transformOrigin: 'top center',
                willChange: 'transform',
              }}
            >
              {PANELS.map((panel, i) => (
                <div
                  key={panel.id}
                  ref={(el) => {
                    panelRefs.current[i] = el
                  }}
                  className={`home-hero-mosaic-panel home-hero-mosaic-panel--p${panel.id}`}
                  style={{
                    position: 'absolute',
                    width: panel.width,
                    height: panel.height,
                    top: (panel.style as { top?: string }).top,
                    left: (panel.style as { left?: string; right?: string; bottom?: string }).left,
                    right: (panel.style as { right?: string }).right,
                    bottom: (panel.style as { bottom?: string }).bottom,
                    zIndex: (panel.style as { zIndex?: number }).zIndex ?? 1,
                    overflow: 'hidden',
                    willChange: 'transform',
                    transform: i === 2 ? 'translateX(-50%)' : undefined,
                  }}
                >
                  <HomeMosaicRotatingPanel
                    asset={mosaicVisible[i]}
                    // Canvas can scale up to ~1.5x on wide monitors — request
                    // enough source pixels to stay sharp
                    sizes={`${Math.round(panel.width * 1.5)}px`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            ref={centerPanelRef}
            className="home-hero-center"
            style={{
              position: 'absolute',
              width: 220,
              height: 165,
              borderRadius: 3,
              overflow: 'hidden',
              zIndex: 20,
              willChange: 'width, height, top, left',
            }}
          >
            <Image
              className={`home-hero-center-fallback${heroVideoReady ? ' home-hero-center-fallback--hidden' : ''}`}
              src={heroCenterFallback}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            {isPhone === false ? (
              <video
                ref={heroVideoRef}
                className={`home-hero-video${heroVideoReady ? ' home-hero-video--ready' : ''}`}
                src={HERO_VIDEO}
                poster={HERO_POSTER}
                muted
                loop
                autoPlay
                playsInline
                preload="auto"
              />
            ) : null}
          </div>

          <div ref={heroCopyRef} className="home-hero-tagline">
            <p className="home-hero-tagline__text">
              Our guide to exploring
              <br />
              America&apos;s most famous wine region
            </p>
          </div>

          <div ref={heroDisplayRef} className="home-hero-display">
            <span className="home-hero-display__title">Napa Valley</span>
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
            {/* Bottom scrim: keeps eyebrow/CTAs legible over bright video frames */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '46%',
                background:
                  'linear-gradient(to top, rgba(13,11,9,0.78) 0%, rgba(13,11,9,0.42) 55%, transparent 100%)',
              }}
            />
            <div
              className="home-hero-fullscreen-overlay__footer"
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
                    fontSize: 11,
                    fontWeight: 400,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(247,243,236,0.85)',
                    textShadow: '0 1px 8px rgba(13,11,9,0.5)',
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
                    textShadow: '0 2px 20px rgba(13,11,9,0.45)',
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
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#F7F3EC',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(247,243,236,0.55)',
                    paddingBottom: 4,
                    textShadow: '0 1px 8px rgba(13,11,9,0.5)',
                  }}
                >
                  Browse the guide ↗
                </Link>
                <Link
                  href="/regions"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(247,243,236,0.85)',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(247,243,236,0.4)',
                    paddingBottom: 4,
                    textShadow: '0 1px 8px rgba(13,11,9,0.5)',
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
        <section ref={avaRef} className="home-intro">
          <p className="home-intro__eyebrow">Wine Spectator · June 2026</p>
          <p className="home-intro__lead">
            Drawing on five decades of experience covering Napa, we&apos;ve created the definitive
            guide to help you explore, navigate, and make the most of your visit.
          </p>
          <p className="home-intro__body">
            No wine region on earth compresses so much ambition, beauty and sensual pleasure into so
            small a space.
          </p>
          <p className="home-intro__service">
            Our tips on wineries, restaurants and accommodations will let you experience the best of
            what Napa has to offer.
          </p>
          <div className="home-intro__pick-block">
            <p className="home-intro__pick">
              Our editors&apos; picks for where to taste, eat, stay and more across America&apos;s
              premier wine region.
            </p>
            <p className="home-intro__pick">
              Plus, fun-filled side trips near each town, up valley or down.
            </p>
          </div>
        </section>
      </RevealSection>

      {/* ── BROWSE BY APPELLATION (therealhotels vertical list with huge serif names) ── */}
      <RevealSection>
        <section className="home-appellation-wrap" style={{ padding: '80px 0 100px' }}>
          <div className="dim-siblings" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {browseRegions.map((region, i) => (
              <AppellationLink key={region.slug} region={region} index={i} />
            ))}
          </div>
        </section>
      </RevealSection>

      </div>{/* close main-content */}

      {/* ── FEATURED REGIONS: GSAP pinned stacking cards — desktop only ── */}
      <div className="home-region-pins" style={{ background: '#0D0B09' }}>
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
              {/* Light resting scrim so photography stays vivid; deepens on hover for text pop */}
              <div
                className="home-region-pin-scrim"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.1) 50%, transparent 80%)',
                  transition: 'opacity 0.5s ease',
                  zIndex: 1,
                }}
              />
              <div className="hero-top-scrim" aria-hidden />
              {/* Name + tagline centered on image */}
              <div className="home-region-pin-copy" style={{
                position: 'absolute', top: '50%', left: 0, right: 0,
                transform: 'translateY(-50%)',
                textAlign: 'center', zIndex: 3, padding: '0 40px',
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
                  fontSize: 15, fontWeight: 500, letterSpacing: '0.16em',
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

      <HomeStoriesSection
        stories={getStoryArticles()}
        title="Features"
        intro="Valley-wide stories beyond the town guides — including the Napa Valley taco tour."
      />

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
            fontSize: 15,
            fontWeight: 300,
            color: 'rgba(247,243,236,0.55)',
            marginBottom: 48,
          }}
        >
          Be the first to know when new wineries, restaurants, and travel guides are added
        </p>
        <NewsletterSubscribeForm variant="hero" />
        </section>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </div>
      </div>
    </div>
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

  // Hero left; Drive 02_Region_Scroll_Reveals stills on the right (top + bottom)
  const [imgLeft, imgRightTop, imgRightBottom] = getAppellationRevealImages(region, index)
  const st = APP_MARK_STAGGER[index % APP_MARK_STAGGER.length]
  const hoverTilt = st.deg + (st.deg >= 0 ? 5 : -5)

  return (
    <Link
      href={`/regions/${region.slug}`}
      className={`home-appellation-link${hovered ? ' home-appellation-link--active' : ''}`}
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
        className="home-appellation-reveal"
        style={{
          position: 'absolute',
          left: 'clamp(30px, 5vw, 80px)',
          top: '50%',
          transform: `translateY(-50%) ${hovered ? 'scale(1)' : 'scale(0.85)'}`,
          width: 'clamp(120px, 14vw, 220px)',
          aspectRatio: '4/3',
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          visibility: hovered ? 'visible' : 'hidden',
          clipPath: hovered ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)',
          transition: `clip-path 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease, transform 0.5s ease, visibility 0s linear ${hovered ? '0s' : '0.4s'}`,
          pointerEvents: 'none',
          borderRadius: 2,
        }}
      >
        <Image src={imgLeft} alt="" fill sizes="220px" style={{ objectFit: 'cover' }} />
      </div>

      {/* Image 2: right side, offset up */}
      <div
        className="home-appellation-reveal"
        style={{
          position: 'absolute',
          right: 'clamp(30px, 5vw, 80px)',
          top: '20%',
          transform: `${hovered ? 'scale(1)' : 'scale(0.85)'}`,
          width: 'clamp(100px, 12vw, 180px)',
          aspectRatio: '3/4',
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          visibility: hovered ? 'visible' : 'hidden',
          clipPath: hovered ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)',
          transition: `clip-path 0.5s cubic-bezier(0.4,0,0.2,1) 0.08s, opacity 0.4s ease 0.08s, transform 0.5s ease, visibility 0s linear ${hovered ? '0s' : '0.48s'}`,
          pointerEvents: 'none',
          borderRadius: 2,
        }}
      >
        <Image src={imgRightTop} alt="" fill sizes="180px" style={{ objectFit: 'cover' }} />
      </div>

      {/* Image 3: right side, offset down */}
      <div
        className="home-appellation-reveal"
        style={{
          position: 'absolute',
          right: 'clamp(180px, 22vw, 340px)',
          bottom: '-10%',
          transform: `${hovered ? 'scale(1)' : 'scale(0.85)'}`,
          width: 'clamp(80px, 10vw, 150px)',
          aspectRatio: '1/1',
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          visibility: hovered ? 'visible' : 'hidden',
          clipPath: hovered ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
          transition: `clip-path 0.5s cubic-bezier(0.4,0,0.2,1) 0.15s, opacity 0.4s ease 0.15s, transform 0.5s ease, visibility 0s linear ${hovered ? '0s' : '0.55s'}`,
          pointerEvents: 'none',
          borderRadius: 2,
        }}
      >
        <Image src={imgRightBottom} alt="" fill sizes="150px" style={{ objectFit: 'cover' }} />
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
    fontSize: 14,
    fontWeight: 300,
    color: '#9B9283',
    lineHeight: 1.8,
  },
  microLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    fontWeight: 400,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    lineHeight: 1.7,
  },
}
