'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import type { RegionMdxFrontmatter } from '@/lib/content/types'
import styles from './region-redesign.module.css'

export type RedesignSection = {
  id: string
  /** Short jump-bar label */
  label: string
  /** Eyebrow above the section phrase */
  kicker: string
  /** Large italic display phrase */
  phrase: string
  /** Bar appearance while this section is active */
  theme: 'light' | 'dark'
  content: ReactNode
}

export type RegionRedesignClientProps = {
  fm: RegionMdxFrontmatter
  lede: ReactNode
  sections: RedesignSection[]
  adventure: {
    label: string
    kicker: string
    phrase: string
    content: ReactNode
  } | null
  /** Trailing content (newsletter + footer) rendered by the server. */
  trailing: ReactNode
}

/** Jump targets always start with Story (hero + lede). */
function buildJumpLinks(
  sections: RedesignSection[],
  adventure: RegionRedesignClientProps['adventure'],
) {
  const links: { id: string; label: string; theme: 'light' | 'dark' }[] = [
    { id: 'story', label: 'Story', theme: 'light' },
  ]
  for (const s of sections) links.push({ id: s.id, label: s.label, theme: s.theme })
  if (adventure) links.push({ id: 'adventure', label: adventure.label, theme: 'dark' })
  return links
}

export default function RegionRedesignClient({
  fm,
  lede,
  sections,
  adventure,
  trailing,
}: RegionRedesignClientProps) {
  const jumpLinks = buildJumpLinks(sections, adventure)
  const [activeId, setActiveId] = useState<string>('story')
  const ratios = useRef<Map<string, number>>(new Map())
  const activeIdRef = useRef(activeId)
  useEffect(() => {
    activeIdRef.current = activeId
  }, [activeId])

  const activeTheme =
    jumpLinks.find((l) => l.id === activeId)?.theme ?? 'light'

  // Scroll-spy: the section occupying the upper-middle band wins.
  useEffect(() => {
    const ids = jumpLinks.map((l) => l.id)
    // The hero and lede both map to "story" so reading the lede keeps Story lit.
    const spyTargets: { el: Element; key: string }[] = []
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) spyTargets.push({ el, key: id })
    }
    const ledeEl = document.getElementById('story-lede')
    if (ledeEl) spyTargets.push({ el: ledeEl, key: 'story' })

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key =
            spyTargets.find((t) => t.el === entry.target)?.key ?? entry.target.id
          ratios.current.set(
            entry.target === ledeEl ? 'story-lede' : key,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          )
        }
        // Pick the most-visible target, collapsing lede → story.
        let bestKey = activeIdRef.current
        let best = -1
        for (const t of spyTargets) {
          const storeKey = t.el === ledeEl ? 'story-lede' : t.key
          const r = ratios.current.get(storeKey) ?? 0
          if (r > best) {
            best = r
            bestKey = t.key
          }
        }
        if (best > 0) setActiveId(bestKey)
      },
      { rootMargin: '-44% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    spyTargets.forEach((t) => observer.observe(t.el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const jumpTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    setActiveId(id)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className={styles.root} data-site-surface="light">
      {/* ── HERO (dark cinematic) ── */}
      <section id="story" data-nav-hero-root className={styles.hero}>
        <div className={styles.heroMedia}>
          {fm.heroImagePortrait ? (
            <>
              <Image
                src={fm.heroImage}
                alt=""
                fill
                priority
                sizes="100vw"
                className={`${styles.heroImg} hidden md:block`}
              />
              <Image
                src={fm.heroImagePortrait}
                alt=""
                fill
                priority
                sizes="100vw"
                className={`${styles.heroImg} md:hidden`}
              />
            </>
          ) : (
            <Image
              src={fm.heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className={styles.heroImg}
            />
          )}
        </div>
        <div className={styles.heroScrim} aria-hidden />
        <div className="hero-top-scrim" aria-hidden />

        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Wine Spectator · Napa Valley Guide</p>
          <h1 className={styles.heroTitle}>{fm.region}</h1>
          <p className={styles.heroTagline}>{fm.tagline}</p>
          <div className={styles.heroMeta}>
            <span>By {fm.byline}</span>
            {fm.issue ? <span>{fm.issue}</span> : null}
          </div>
        </div>

        <div className={styles.scrollCue} aria-hidden>
          <span />
          Scroll
        </div>
      </section>

      {/* ── STICKY SCROLL-SPY JUMP BAR ── */}
      <nav
        className={`${styles.jumpBar} ${
          activeTheme === 'dark' ? styles.jumpBarDark : styles.jumpBarLight
        }`}
        aria-label="Page sections"
      >
        <div className={styles.jumpBarInner}>
          {jumpLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => jumpTo(link.id)}
              aria-current={activeId === link.id ? 'true' : undefined}
              className={`${styles.jumpLink} ${
                activeId === link.id ? styles.jumpLinkActive : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── LEDE (light editorial reading zone) ── */}
      <div className={styles.transition} aria-hidden />
      <div id="story-lede" className={styles.ledeZone}>
        <div className={styles.ledeWrap}>
          <p className={styles.dek}>{fm.dek}</p>
          <div className={styles.dekRule} aria-hidden />
          <div className={`${styles.lede} region-editorial-lede`}>{lede}</div>
        </div>
      </div>

      {/* ── TASTE / EAT / STAY ── */}
      {sections.map((s) => (
        <section key={s.id} id={s.id} className={styles.section}>
          <Reveal>
            <header className={styles.sectionHeader}>
              <p className={styles.sectionKicker}>{s.kicker}</p>
              <p className={styles.sectionPhrase}>{s.phrase}</p>
            </header>
          </Reveal>
          {s.content}
        </section>
      ))}

      {/* ── ADVENTURE (dark close, parchment itinerary card) ── */}
      {adventure ? (
        <section id="adventure" className={styles.adventure}>
          <Reveal>
            <div className={styles.adventureHeader}>
              <p className={styles.adventureKicker}>{adventure.kicker}</p>
              <p className={styles.adventurePhrase}>{adventure.phrase}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className={styles.adventureCard}>
              <div className="region-sidebar-mdx">
                <div className="region-sidebar-mdx__body">{adventure.content}</div>
              </div>
            </div>
          </Reveal>
        </section>
      ) : null}

      {trailing}
    </div>
  )
}

/** Lightweight scroll-reveal wrapper (CSS class toggle via IntersectionObserver). */
function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`${styles.reveal} ${shown ? styles.revealIn : ''}`}>
      {children}
    </div>
  )
}
