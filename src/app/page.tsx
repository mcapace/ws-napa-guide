'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './home.module.css'

/** Hero 720p MP4 — same CDN asset as JW `FvwrhNa4` (no embed / license). */
const HERO_MP4 = 'https://cdn.jwplayer.com/videos/FvwrhNa4-WBFwZoOE.mp4'

const NAV_LINKS = [
  { label: 'Wineries', href: '/wineries' },
  { label: 'Regions', href: '/regions' },
  { label: 'Dining', href: '/dining' },
  { label: 'Stay', href: '/stay' },
  { label: 'Map', href: '/map' },
  { label: 'Plan Your Visit', href: '/plan' },
]

const AVA_ITEMS = [
  { slug: 'oakville', sticker: ['OAK', 'VILLE'], classBg: styles.oakville },
  { slug: 'rutherford', sticker: ['RUTH', 'ERFORD'], classBg: styles.rutherford },
  { slug: 'calistoga', sticker: ['CALIS', 'TOGA'], classBg: styles.calistoga },
  { slug: 'yountville', sticker: ['YOUNT', 'VILLE'], classBg: styles.yountville },
  { slug: 'pritchard-hill', sticker: ['PRIT', 'CHARD'], classBg: styles.pritchard },
  { slug: 'downtown-napa', sticker: ['DT', 'NAPA'], classBg: styles.downtown },
] as const

const MOSAIC_PANELS = [
  { className: `${styles.panel} ${styles.panel1} ${styles.heroAnim}`, speed: 0.06, base: 'rotate(-1.5deg)', placeholder: styles.vineyard, label: 'Vineyard' },
  { className: `${styles.panel} ${styles.panel2} ${styles.heroAnim}`, speed: 0.09, base: 'rotate(1deg)', placeholder: styles.landscape, label: 'Valley' },
  { className: `${styles.panel} ${styles.panel3} ${styles.heroAnim}`, speed: 0.04, base: 'translateX(-50%) rotate(0.5deg)', placeholder: styles.winery, label: 'Winery' },
  { className: `${styles.panel} ${styles.panel4} ${styles.heroAnim}`, speed: 0.07, base: 'rotate(-0.8deg)', placeholder: styles.dining, label: 'Dining' },
  { className: `${styles.panel} ${styles.panel5} ${styles.heroAnim}`, speed: 0.05, base: 'rotate(1.2deg)', placeholder: styles.landscape, label: 'Cellar' },
] as const

function regionTitle(slug: string): string {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function MapPreviewSvg() {
  return (
    <svg width={320} height={220} viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M160 30 C140 40 120 60 110 85 C100 110 105 140 108 160 C111 180 118 195 125 200 C135 185 145 175 155 165 C160 155 163 148 165 140 C168 130 170 118 172 108 C175 95 178 80 175 65 C172 50 165 38 160 30Z"
        stroke="rgba(247,243,236,0.2)"
        strokeWidth={1.5}
        fill="rgba(247,243,236,0.03)"
      />
      <path
        d="M160 45 C158 65 156 85 155 105 C154 125 154 145 155 165"
        stroke="rgba(196,148,58,0.4)"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <circle cx={155} cy={70} r={3} fill="rgba(196,148,58,0.8)" />
      <circle cx={154} cy={100} r={3} fill="rgba(196,148,58,0.8)" />
      <circle cx={153} cy={130} r={3} fill="rgba(247,243,236,0.5)" />
      <circle cx={156} cy={155} r={3} fill="rgba(247,243,236,0.5)" />
      <text x={162} y={73} fontFamily="var(--font-body),sans-serif" fontSize={7} fill="rgba(247,243,236,0.4)" letterSpacing={1}>
        CALISTOGA
      </text>
      <text x={162} y={103} fontFamily="var(--font-body),sans-serif" fontSize={7} fill="rgba(247,243,236,0.4)" letterSpacing={1}>
        RUTHERFORD
      </text>
      <text x={162} y={133} fontFamily="var(--font-body),sans-serif" fontSize={7} fill="rgba(247,243,236,0.4)" letterSpacing={1}>
        OAKVILLE
      </text>
      <text x={162} y={158} fontFamily="var(--font-body),sans-serif" fontSize={7} fill="rgba(247,243,236,0.4)" letterSpacing={1}>
        YOUNTVILLE
      </text>
    </svg>
  )
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursorExpanded, setCursorExpanded] = useState(false)
  const [panelTransforms, setPanelTransforms] = useState<Record<number, string>>(() => {
    const o: Record<number, string> = {}
    MOSAIC_PANELS.forEach((p, i) => {
      o[i] = `${p.base} translateY(0px)`
    })
    return o
  })
  const [heroExpand, setHeroExpand] = useState({
    w: 200,
    h: 140,
    br: 3,
    z: 10,
    panelOpacity: 1,
    expanded: false,
    overlay: false,
    fadeMosaic: 0,
  })

  const cursorRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  const onMouseMove = useCallback((e: MouseEvent) => {
    const el = cursorRef.current
    if (!el) return
    el.style.left = `${e.clientX}px`
    el.style.top = `${e.clientY}px`
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [onMouseMove])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onScroll = () => {
      const scrollY = window.scrollY
      const heroEl = heroRef.current
      if (!heroEl) return

      const triggerStart = heroEl.offsetHeight * 0.3
      const triggerEnd = heroEl.offsetHeight * 0.85

      const next: Record<number, string> = {}
      MOSAIC_PANELS.forEach((p, i) => {
        const y = reduceMotion ? 0 : scrollY * p.speed
        next[i] = `${p.base} translateY(${-y}px)`
      })
      setPanelTransforms(next)

      if (scrollY > triggerStart && scrollY < triggerEnd) {
        const progress = Math.min(1, (scrollY - triggerStart) / (triggerEnd - triggerStart))
        const startW = 200
        const startH = 140
        const endW = window.innerWidth
        const endH = window.innerHeight
        const w = startW + (endW - startW) * progress
        const h = startH + (endH - startH) * progress
        const br = 3 * (1 - progress)
        const fadeOut = Math.min(1, progress * 2)
        const expanded = progress >= 0.98

        setHeroExpand({
          w,
          h,
          br,
          z: progress > 0.5 ? 200 : 10,
          panelOpacity: expanded ? 0 : 1,
          expanded,
          overlay: expanded,
          fadeMosaic: fadeOut,
        })
      } else if (scrollY >= triggerEnd) {
        const endW = window.innerWidth
        const endH = window.innerHeight
        setHeroExpand({
          w: endW,
          h: endH,
          br: 0,
          z: 200,
          panelOpacity: 0,
          expanded: true,
          overlay: true,
          fadeMosaic: 1,
        })
      } else if (scrollY <= triggerStart) {
        setHeroExpand({
          w: 200,
          h: 140,
          br: 3,
          z: 10,
          panelOpacity: 1,
          expanded: false,
          overlay: false,
          fadeMosaic: 0,
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(`[data-cursor-expand="true"]`)
    const enter = () => setCursorExpanded(true)
    const leave = () => setCursorExpanded(false)
    els.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })
    return () => {
      els.forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  })

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(`.${styles.reveal}`)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible)
        })
      },
      { threshold: 0.1 },
    )
    nodes.forEach((n) => obs.observe(n))
    return () => obs.disconnect()
  }, [])

  const closeExpand = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.home}>
      <div ref={cursorRef} className={`${styles.cursor} ${cursorExpanded ? styles.expand : ''}`} aria-hidden />

      <nav className={styles.heroNav} aria-label="Primary">
        <Link href="/" className={styles.navLabel} style={{ textDecoration: 'none' }} data-cursor-expand="true">
          Wine Spectator
          <br />
          Napa Valley Guide
        </Link>
        <button
          type="button"
          className={styles.navHamburger}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          data-cursor-expand="true"
        >
          <span />
          <span />
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            ×
          </button>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} data-cursor-expand="true">
              {l.label}
            </Link>
          ))}
          <a
            href="https://www.winespectator.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            data-cursor-expand="true"
          >
            Subscribe
          </a>
        </div>
      )}

      <section className={styles.hero} id="hero" ref={heroRef}>
        <div className={styles.mosaic}>
          {MOSAIC_PANELS.map((p, i) => (
            <div
              key={p.label}
              className={p.className}
              style={panelTransforms[i] ? { transform: panelTransforms[i] } : undefined}
            >
              <div className={`${styles.imgPlaceholder} ${p.placeholder}`}>{p.label}</div>
            </div>
          ))}

          <div
            className={`${styles.panelHero} ${styles.heroAnim}`}
            style={{
              width: heroExpand.w,
              height: heroExpand.h,
              borderRadius: heroExpand.br,
              zIndex: heroExpand.z,
              opacity: heroExpand.panelOpacity,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <video autoPlay muted loop playsInline preload="auto">
              <source src={HERO_MP4} type="video/mp4" />
            </video>
          </div>
        </div>

        <div
          className={`${styles['hero-copy']} ${styles.heroAnim}`}
          style={{ opacity: 1 - heroExpand.fadeMosaic }}
        >
          <p className={styles['hero-headline']}>
            The valley that changed
            <br />
            American wine forever.
          </p>
          <p className={styles['hero-descriptor']}>
            Wine Spectator&apos;s definitive guide to Napa — wineries, restaurants,
            <br />
            hotels, and the roads less traveled.
          </p>
        </div>

        <div className={`${styles['hero-display']} ${styles.heroAnim}`} style={{ opacity: 1 - heroExpand.fadeMosaic }}>
          <span className={styles['hero-display-text']}>Napa Valley</span>
        </div>
      </section>

      <div className={styles.scrollTrigger} id="scrollTrigger" aria-hidden />

      <div className={`${styles.expandOverlay} ${heroExpand.overlay ? styles.visible : ''}`}>
        <video className={styles.expandVideo} autoPlay muted loop playsInline preload="auto">
          <source src={HERO_MP4} type="video/mp4" />
        </video>
        <div className={styles.expandContent}>
          <div className={styles.expandTitle}>
            Explore
            <br />
            Napa Valley
          </div>
          <Link href="/regions" className={styles.expandCta} data-cursor-expand="true">
            Browse the guide ↗
          </Link>
        </div>
        <button type="button" className={styles.expandClose} id="expandClose" onClick={closeExpand} aria-label="Close fullscreen">
          ✕
        </button>
      </div>

      <section className={`${styles.sectionAva} ${styles.reveal}`}>
        <p className={styles.sectionLabel}>Browse by appellation</p>
        <div className={styles.avaGrid}>
          {AVA_ITEMS.map((ava) => (
            <Link key={ava.slug} href={`/regions/${ava.slug}`} className={styles.avaLink} data-cursor-expand="true">
              <div className={styles.avaItem}>
                <div className={`${styles.avaBg} ${ava.classBg}`} />
                <div className={styles.avaOverlay} />
                <div className={styles.avaSticker}>
                  {ava.sticker[0]}
                  <br />
                  {ava.sticker[1]}
                </div>
                <div className={styles.avaContent}>
                  <span className={styles.avaName}>{regionTitle(ava.slug)}</span>
                  <span className={styles.avaCount}>
                    {ava.slug === 'oakville' && '12 wineries · 3 restaurants'}
                    {ava.slug === 'rutherford' && '9 wineries · 2 restaurants'}
                    {ava.slug === 'calistoga' && '8 wineries · 5 restaurants'}
                    {ava.slug === 'yountville' && '6 wineries · 8 restaurants'}
                    {ava.slug === 'pritchard-hill' && '5 wineries · 1 restaurant'}
                    {ava.slug === 'downtown-napa' && '4 wineries · 12 restaurants'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.sectionFeatured}>
        <div className={`${styles.featuredCard} ${styles.reveal}`} data-cursor-expand="true">
          <div className={styles.featuredMeta}>
            <div className={styles.featuredEyebrow}>Landmark Wineries</div>
            <h2 className={styles.featuredTitle}>The Names That Defined Napa</h2>
            <p className={styles.featuredExcerpt}>
              Before Napa was a destination, it was a dream. These are the estates — Mondavi, Opus One, Heitz — that proved
              California could stand beside Bordeaux, and changed how the world drinks.
            </p>
            <Link href="/wineries" className={styles.featuredLink} data-cursor-expand="true">
              Read the story <span className={styles.featuredLinkArrow}>→</span>
            </Link>
          </div>
          <div className={styles.featuredImage}>
            <div className={styles.featuredImageInner}>
              <div className={styles.featImgPlaceholder} style={{ background: 'linear-gradient(170deg,#1C2E12,#3A5224,#1C2E12)' }}>
                <span>Winery · Oakville</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.featuredCard} ${styles.reveal}`} data-cursor-expand="true">
          <div className={styles.featuredMeta}>
            <div className={styles.featuredEyebrow}>Where to Stay</div>
            <h2 className={styles.featuredTitle}>Sleep Well in Wine Country</h2>
            <p className={styles.featuredExcerpt}>
              From Meadowood&apos;s private valley cottages to Bardessono&apos;s platinum-certified rooms steps from The French Laundry,
              these are the stays that complete the trip.
            </p>
            <Link href="/stay" className={styles.featuredLink} data-cursor-expand="true">
              Explore hotels <span className={styles.featuredLinkArrow}>→</span>
            </Link>
          </div>
          <div className={styles.featuredImage}>
            <div className={styles.featuredImageInner}>
              <div className={styles.featImgPlaceholder} style={{ background: 'linear-gradient(170deg,#2E1A0A,#4A2C16,#1E100A)' }}>
                <span>Hotel · Yountville</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.featuredCard} ${styles.reveal}`} data-cursor-expand="true">
          <div className={styles.featuredMeta}>
            <div className={styles.featuredEyebrow}>Where to Eat</div>
            <h2 className={styles.featuredTitle}>Tables Worth the Reservation</h2>
            <p className={styles.featuredExcerpt}>
              The French Laundry needs no introduction. But beyond Keller&apos;s dining room, Napa&apos;s culinary scene has never been
              richer — from Bouchon&apos;s steak frites to Evangeline&apos;s beignets in Calistoga.
            </p>
            <Link href="/dining" className={styles.featuredLink} data-cursor-expand="true">
              See the restaurants <span className={styles.featuredLinkArrow}>→</span>
            </Link>
          </div>
          <div className={styles.featuredImage}>
            <div className={styles.featuredImageInner}>
              <div className={styles.featImgPlaceholder} style={{ background: 'linear-gradient(170deg,#141420,#2A2438,#0E0E18)' }}>
                <span>Dining · Yountville</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={`${styles.sectionMap} ${styles.reveal}`}>
        <div>
          <h2 className={styles.mapHeadline}>
            Explore the
            <br />
            valley on a map
          </h2>
          <p className={styles.mapBody}>
            Every winery, restaurant, and hotel in the guide — plotted across Napa&apos;s six appellations. Filter by category, plan your
            route, and navigate the valley with confidence.
          </p>
          <Link href="/map" className={styles.mapBtn} data-cursor-expand="true">
            Open the map →
          </Link>
        </div>
        <div className={styles.mapPreview}>
          <MapPreviewSvg />
          <span className={styles.mapBgText}>Map</span>
        </div>
      </div>

      <section className={`${styles.sectionEmail} ${styles.reveal}`}>
        <p className={styles.emailHeadline}>
          Stay in
          <br />
          the know
        </p>
        <form
          className={styles.emailForm}
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <input className={styles.emailInput} type="email" name="email" placeholder="Your email address" autoComplete="email" />
          <button type="submit" className={styles.emailSubmit} data-cursor-expand="true">
            Subscribe
          </button>
        </form>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          Wine Spectator
          <br />
          Napa Valley Guide
          <br />
          <br />© {new Date().getFullYear()} M. Shanken Communications, Inc.
          <br />
          All rights reserved.
        </div>
        <nav className={styles.footerNav} aria-label="Footer">
          <Link href="/map" data-cursor-expand="true">
            Map
          </Link>
          <Link href="/wineries" data-cursor-expand="true">
            Wineries
          </Link>
          <Link href="/dining" data-cursor-expand="true">
            Dining
          </Link>
          <Link href="/stay" data-cursor-expand="true">
            Stay
          </Link>
          <Link href="/plan" data-cursor-expand="true">
            Plan
          </Link>
        </nav>
        <div className={styles.footerLegal}>
          This guide is a companion to the
          <br />
          June 2026 issue of Wine Spectator.
          <br />
          Sponsor placements are clearly disclosed.
        </div>
      </footer>
    </div>
  )
}
