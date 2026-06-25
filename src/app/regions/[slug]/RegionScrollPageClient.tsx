'use client'

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Footer from '@/components/ui/Footer'
import { ExploreMapSection } from '@/components/explore/ExploreMapSection'
import ScrollyItinerary from '@/components/itinerary/ScrollyItinerary'
import { RegionMoreAppellations } from '@/components/regions/RegionMoreAppellations'
import { RegionEditorialSections } from '@/components/regions/RegionEditorialSections'
import type { MapPin } from '@/data/map-pins'
import type { LoadedRegionMdx } from '@/lib/content/types'
import { getImageFocalPoint } from '@/lib/image-focal'
import { REGION_CENTERS } from '@/lib/mapbox'
import { useLenis, scrollToTarget, enableRegionNativeScroll } from '@/lib/smooth-scroll'
import { replaceUrlQuery } from '@/lib/update-url-query'
import type { Itinerary } from '@/lib/types'
import { RegionStoryPanel, type RegionTab } from './RegionPageClient'
import styles from './region-frame.module.css'
import '@/components/regions/region-editorial.css'

type RegionScrollPageClientProps = {
  slug: string
  mdx: LoadedRegionMdx
  pins: MapPin[]
  itineraries?: Itinerary[]
  storyImages?: string[]
}

type JumpLink = {
  id: string
  label: string
  tab: RegionTab
}

/** Avoid re-scrolling on soft remounts when the same deep-link tab is already handled. */
const handledRegionDeepLinks = new Set<string>()

function parseTab(param: string | null, hasItinerary: boolean): RegionTab {
  if (param === 'explore') return 'explore'
  if (param === 'itinerary' && hasItinerary) return 'itinerary'
  return 'story'
}

function buildJumpLinks(mdx: LoadedRegionMdx, hasItinerary: boolean): JumpLink[] {
  const links: JumpLink[] = [{ id: 'region-story', label: 'Story', tab: 'story' }]

  if (mdx.featuredWineries.length > 0) {
    links.push({ id: 'region-taste', label: 'Taste', tab: 'story' })
  }
  if (mdx.featuredRestaurants.length > 0 || mdx.coffeeSnackFeatures.length > 0 || mdx.breakfast) {
    links.push({ id: 'region-eat', label: 'Eat', tab: 'story' })
  }
  if (mdx.featuredHotels.length > 0) {
    links.push({ id: 'region-stay', label: 'Stay', tab: 'story' })
  }

  links.push({ id: 'region-explore', label: 'Full list', tab: 'explore' })

  if (hasItinerary) {
    links.push({ id: 'region-itinerary', label: "Editor's picks", tab: 'itinerary' })
  }

  return links
}

type ScrollSectionMarkerProps = {
  variant: 'dark' | 'light' | 'cue' | 'transition'
  title: string
  eyebrow?: string
  dek?: string
}

function regionScrollSpyOffset(): number {
  if (typeof document === 'undefined') return 132
  const root = document.documentElement
  const header = parseFloat(
    getComputedStyle(root).getPropertyValue('--ws-site-header-height').trim(),
  )
  const tabs = parseFloat(
    getComputedStyle(root).getPropertyValue('--region-tab-bar-height').trim(),
  )
  return (Number.isFinite(header) ? header : 72) + (Number.isFinite(tabs) ? tabs : 52) + 12
}

function pickActiveJumpSection(links: JumpLink[]): string {
  const offset = regionScrollSpyOffset()
  let bestId = links[0]?.id ?? 'region-story'
  let bestScore = -1

  for (const link of links) {
    const el = document.getElementById(link.id)
    if (!el) continue

    const rect = el.getBoundingClientRect()
    const visibleTop = Math.max(rect.top, offset)
    const visibleBottom = Math.min(rect.bottom, window.innerHeight)
    const visible = Math.max(0, visibleBottom - visibleTop)
    const inReadingBand = rect.top <= offset + 96 && rect.bottom > offset + 48
    const score = inReadingBand ? visible * 1.35 : visible

    if (score > bestScore) {
      bestScore = score
      bestId = link.id
    }
  }

  return bestId
}

function ScrollSectionMarker({ eyebrow, title, dek, variant }: ScrollSectionMarkerProps) {
  if (variant === 'transition') {
    return (
      <div className={styles.sectionTransition} aria-hidden>
        <span className={styles.sectionTransitionRule} />
        <span className={styles.sectionTransitionLabel}>{title}</span>
        <span className={styles.sectionTransitionRule} />
      </div>
    )
  }

  if (variant === 'cue') {
    return (
      <div className={styles.scrollMarkerCue} aria-hidden>
        <span className={styles.scrollMarkerCueLine} />
        <span className={styles.scrollMarkerCueLabel}>{title}</span>
        <span className={styles.scrollMarkerCueLine} />
      </div>
    )
  }

  return (
    <div
      className={`${styles.scrollMarker} ${
        variant === 'light' ? styles.scrollMarkerLight : styles.scrollMarkerDark
      }`}
    >
      <div className={styles.scrollMarkerInner}>
        <div className={styles.scrollMarkerRule} aria-hidden />
        {eyebrow ? <p className={styles.scrollMarkerEyebrow}>{eyebrow}</p> : null}
        <h2 className={styles.scrollMarkerTitle}>{title}</h2>
        {dek ? <p className={styles.scrollMarkerDek}>{dek}</p> : null}
      </div>
    </div>
  )
}

function RegionScrollPageClientContent({
  slug,
  mdx,
  pins,
  itineraries = [],
  storyImages = [],
}: RegionScrollPageClientProps) {
  const { frontmatter } = mdx
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const lenis = useLenis()
  const hasItinerary = itineraries.length > 0
  const tabFromUrl = parseTab(searchParams.get('tab'), hasItinerary)
  const jumpLinks = useMemo(() => buildJumpLinks(mdx, hasItinerary), [mdx, hasItinerary])
  const [activeSectionId, setActiveSectionId] = useState(jumpLinks[0]?.id ?? 'region-story')
  const itineraryIdFromUrl = searchParams.get('itinerary')
  const [selectedItineraryId, setSelectedItineraryId] = useState(
    () =>
      itineraries.find((it) => it.id === itineraryIdFromUrl)?.id ?? itineraries[0]?.id,
  )

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search)
      const fromUrl = itineraries.find((it) => it.id === params.get('itinerary'))?.id
      if (fromUrl) setSelectedItineraryId(fromUrl)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [itineraries])

  const regionCenter = REGION_CENTERS[slug]?.center ?? [-122.4194, 38.5]
  const regionName = frontmatter.region

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const el = document.getElementById(sectionId)
      scrollToTarget(el, lenis)
    },
    [lenis],
  )

  const scrollToBottom = useCallback(() => {
    scrollToTarget(document.getElementById('region-bottom'), lenis)
  }, [lenis])

  const jumpTo = useCallback(
    (link: JumpLink) => {
      setActiveSectionId(link.id)
      scrollToSection(link.id)

      const params = new URLSearchParams(window.location.search)
      if (link.tab === 'story') {
        params.delete('tab')
        params.delete('itinerary')
      } else {
        params.set('tab', link.tab)
        if (link.tab === 'itinerary' && selectedItineraryId) {
          params.set('itinerary', selectedItineraryId)
        } else {
          params.delete('itinerary')
        }
      }
      replaceUrlQuery(pathname, params)
    },
    [pathname, scrollToSection, selectedItineraryId],
  )

  const setItinerary = useCallback(
    (itineraryId: string) => {
      if (itineraryId === selectedItineraryId) return
      setSelectedItineraryId(itineraryId)
      const params = new URLSearchParams(window.location.search)
      params.set('tab', 'itinerary')
      params.set('itinerary', itineraryId)
      replaceUrlQuery(pathname, params)
    },
    [pathname, selectedItineraryId],
  )

  const [showScrollHint, setShowScrollHint] = useState(true)
  const [dockAtTop, setDockAtTop] = useState(true)
  const [dockAtBottom, setDockAtBottom] = useState(false)
  const initialScrollDone = useRef(false)
  const heroLandscapeFocal = getImageFocalPoint(frontmatter.heroImage, 'hero')
  const heroPortraitFocal = getImageFocalPoint(frontmatter.heroImagePortrait, 'portrait')

  useEffect(() => enableRegionNativeScroll(lenis), [lenis])

  useEffect(() => {
    const onScroll = () => {
      setShowScrollHint(window.scrollY < 100)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setDockAtTop(window.scrollY < 160)
      setDockAtBottom(window.scrollY > max - 160)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (tabFromUrl === 'story') return

    const deepLinkKey = `${pathname}:${tabFromUrl}`
    if (handledRegionDeepLinks.has(deepLinkKey)) return
    handledRegionDeepLinks.add(deepLinkKey)

    if (initialScrollDone.current) return
    initialScrollDone.current = true

    const sectionId =
      tabFromUrl === 'explore'
        ? 'region-explore'
        : tabFromUrl === 'itinerary'
          ? 'region-itinerary'
          : 'region-story'

    setActiveSectionId(sectionId)
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToSection(sectionId))
    })
    return () => window.cancelAnimationFrame(id)
  }, [pathname, tabFromUrl, scrollToSection])

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        setActiveSectionId(pickActiveJumpSection(jumpLinks))
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [jumpLinks])

  const storyLinks = jumpLinks.filter((l) => l.tab === 'story')
  const utilityLinks = jumpLinks.filter((l) => l.tab !== 'story')
  const phrases = frontmatter.marqueePhrases ?? {}
  const hasGuidePicks =
    mdx.featuredWineries.length > 0 ||
    mdx.featuredRestaurants.length > 0 ||
    mdx.coffeeSnackFeatures.length > 0 ||
    mdx.breakfast ||
    mdx.featuredHotels.length > 0

  return (
    <div
      className={styles.frame}
      data-site-surface="dark"
      data-region-frame=""
      data-scroll-unified=""
    >
      <header className={styles.hero}>
        <Image
          src={frontmatter.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`${styles.heroImage} ${styles.heroLandscape}`}
          style={{ objectPosition: heroLandscapeFocal }}
        />
        {frontmatter.heroImagePortrait ? (
          <Image
            src={frontmatter.heroImagePortrait}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`${styles.heroImage} ${styles.heroPortrait}`}
            style={{ objectPosition: heroPortraitFocal }}
          />
        ) : null}
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroCopy}>
          <p className={styles.heroByline}>
            By {frontmatter.byline} · {frontmatter.issue}
          </p>
          <h1 className={styles.heroTitle}>{frontmatter.region}</h1>
          <p className={styles.heroAva}>{frontmatter.region.toUpperCase()} AVA</p>
          <p className={styles.heroTagline}>{frontmatter.tagline}</p>
        </div>
        {showScrollHint ? (
          <button
            type="button"
            className={styles.heroScrollHint}
            onClick={() => jumpTo(jumpLinks[0])}
            aria-label="Scroll to article"
          >
            <span className={styles.heroScrollHintLabel}>Scroll to read</span>
            <span className={styles.heroScrollHintIcon} aria-hidden>↓</span>
          </button>
        ) : null}
      </header>

      <nav className={styles.jumpNav} aria-label="Page sections">
        <div className={styles.jumpNavInner}>
          <div className={styles.jumpNavGroup}>
            {storyLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`${styles.jumpLink}${activeSectionId === link.id ? ` ${styles.jumpLinkActive}` : ''}`}
                aria-current={activeSectionId === link.id ? 'true' : undefined}
                onClick={() => jumpTo(link)}
              >
                {link.label}
              </button>
            ))}
          </div>
          {utilityLinks.length > 0 ? <span className={styles.jumpNavRule} aria-hidden /> : null}
          <div className={styles.jumpNavGroup}>
            {utilityLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`${styles.jumpLink}${activeSectionId === link.id ? ` ${styles.jumpLinkActive}` : ''}`}
                aria-current={activeSectionId === link.id ? 'true' : undefined}
                onClick={() => jumpTo(link)}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div id="region-panel-content" className={styles.scrollPage}>
        <section id="region-story" className={styles.scrollSectionStory}>
          <RegionStoryPanel
            mdx={mdx}
            hideCompanionFeature={hasItinerary}
            textOnly
          />
          {hasGuidePicks ? (
            <ScrollSectionMarker
              variant="dark"
              eyebrow="In this guide"
              title="Where to taste, eat & stay"
              dek={
                phrases.taste
                  ? `${phrases.taste}. Scroll for long-form profiles — the alphabetical directory follows.`
                  : 'Editorial profiles from the guide. The full alphabetical directory follows below.'
              }
            />
          ) : null}
          <div className={styles.showcaseRegion}>
            <RegionEditorialSections
              data={mdx}
              layout="showcase"
              regionSlug={slug}
              regionLabel={regionName}
              pins={pins}
            />
          </div>
          <ScrollSectionMarker variant="transition" title="The full list" />
        </section>

        <section id="region-explore" className={`${styles.scrollSection} ${styles.scrollSectionExplore}`}>
          <ScrollSectionMarker
            variant="dark"
            eyebrow="Quick reference"
            title="The full list"
            dek={`Filter tastings, dining, or hotels — or pan the map. Every listing in ${regionName}, sorted alphabetically.`}
          />
          <div className={styles.exploreFlowWrap}>
            {pins.length > 0 ? (
              <ExploreMapSection
                pins={pins}
                scopedRegion={slug}
                showRegionFilter={false}
                embedMode
                theme="dark"
                lazyMap
                pageFlow
              />
            ) : (
              <p className={styles.scrollSectionEmpty}>No listings for this region yet.</p>
            )}
          </div>
          {hasItinerary ? (
            <ScrollSectionMarker variant="transition" title="Editor's picks" />
          ) : (
            <ScrollSectionMarker variant="transition" title="More towns & areas" />
          )}
        </section>

        {hasItinerary ? (
          <section id="region-itinerary" className={`${styles.scrollSection} ${styles.scrollSectionItinerary}`}>
            <ScrollSectionMarker
              variant="dark"
              eyebrow="Editor's picks"
              title={phrases.sidebar ?? `Plan your day in ${regionName}`}
              dek="Half-day routes with map and stops — scroll through each leg or open the full route in Google Maps."
            />
            <div className={styles.itineraryFlowWrap}>
              <ScrollyItinerary
                itineraries={itineraries}
                regionCenter={regionCenter}
                regionName={regionName}
                selectedItineraryId={selectedItineraryId}
                onItineraryChange={setItinerary}
                hideSeriesHeader
                pageFlow
              />
            </div>
            <ScrollSectionMarker variant="transition" title="More towns & areas" />
          </section>
        ) : null}
      </div>

      <div id="region-bottom" className={styles.bottom}>
        <RegionMoreAppellations slug={slug} />
        <Footer />
      </div>

      {(!dockAtTop || !dockAtBottom) &&
      activeSectionId !== 'region-itinerary' &&
      activeSectionId !== 'region-explore' ? (
        <nav className={styles.scrollDock} aria-label="Page scroll">
          {!dockAtTop ? (
            <button
              type="button"
              className={styles.scrollDockBtn}
              onClick={() => jumpTo(jumpLinks[0])}
              aria-label="Back to story"
            >
              <span aria-hidden>↑</span>
            </button>
          ) : null}
          <span className={styles.scrollDockLabel}>Scroll</span>
          {!dockAtBottom ? (
            <button
              type="button"
              className={styles.scrollDockBtn}
              onClick={scrollToBottom}
              aria-label="Continue to more towns and areas"
            >
              <span aria-hidden>↓</span>
            </button>
          ) : null}
        </nav>
      ) : null}
    </div>
  )
}

export default function RegionScrollPageClient(props: RegionScrollPageClientProps) {
  return (
    <Suspense fallback={null}>
      <RegionScrollPageClientContent {...props} />
    </Suspense>
  )
}
