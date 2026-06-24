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
import { REGION_CENTERS } from '@/lib/mapbox'
import { useLenis, scrollToTarget } from '@/lib/smooth-scroll'
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
  if (mdx.featuredRestaurants.length > 0 || mdx.breakfast) {
    links.push({ id: 'region-eat', label: 'Eat', tab: 'story' })
  }
  if (mdx.featuredHotels.length > 0) {
    links.push({ id: 'region-stay', label: 'Stay', tab: 'story' })
  }

  links.push({ id: 'region-explore', label: 'Full list', tab: 'explore' })

  if (hasItinerary) {
    links.push({ id: 'region-itinerary', label: 'Itinerary', tab: 'itinerary' })
  }

  return links
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
  const router = useRouter()
  const pathname = usePathname()
  const lenis = useLenis()
  const hasItinerary = itineraries.length > 0
  const tabFromUrl = parseTab(searchParams.get('tab'), hasItinerary)
  const jumpLinks = useMemo(() => buildJumpLinks(mdx, hasItinerary), [mdx, hasItinerary])
  const [activeSectionId, setActiveSectionId] = useState(jumpLinks[0]?.id ?? 'region-story')
  const selectedItineraryId =
    itineraries.find((it) => it.id === searchParams.get('itinerary'))?.id ?? itineraries[0]?.id

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

      const params = new URLSearchParams()
      if (link.tab !== 'story') {
        params.set('tab', link.tab)
        if (link.tab === 'itinerary' && selectedItineraryId) {
          params.set('itinerary', selectedItineraryId)
        }
      }
      const q = params.toString()
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false })
    },
    [pathname, router, scrollToSection, selectedItineraryId],
  )

  const setItinerary = useCallback(
    (itineraryId: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('tab', 'itinerary')
      params.set('itinerary', itineraryId)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  const [showScrollHint, setShowScrollHint] = useState(true)
  const initialScrollDone = useRef(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-region-native-scroll', '')
    return () => document.documentElement.removeAttribute('data-region-native-scroll')
  }, [])

  useEffect(() => {
    const onScroll = () => setShowScrollHint(window.scrollY < 100)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (initialScrollDone.current) return
    initialScrollDone.current = true
    if (tabFromUrl === 'story') return

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
  }, [tabFromUrl, scrollToSection])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    for (const link of jumpLinks) {
      const el = document.getElementById(link.id)
      if (!el) continue

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActiveSectionId(link.id)
          }
        },
        { rootMargin: '-32% 0px -48% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    }

    return () => observers.forEach((o) => o.disconnect())
  }, [jumpLinks])

  const scrollAfterExplore = hasItinerary ? 'region-itinerary' : 'region-bottom'
  const storyLinks = jumpLinks.filter((l) => l.tab === 'story')
  const utilityLinks = jumpLinks.filter((l) => l.tab !== 'story')

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
        />
        {frontmatter.heroImagePortrait ? (
          <Image
            src={frontmatter.heroImagePortrait}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`${styles.heroImage} ${styles.heroPortrait}`}
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
        <section id="region-story" className={styles.scrollSection}>
          <RegionStoryPanel
            mdx={mdx}
            hideCompanionFeature={hasItinerary}
            storyImages={storyImages}
          />
          <div className={styles.editorialBand} data-site-surface="light">
            <RegionEditorialSections data={mdx} />
          </div>
        </section>

        <section id="region-explore" className={styles.scrollSection}>
          <div className={styles.directoryBand}>
            <div className={styles.directoryBandInner}>
              <p className={styles.directoryBandEyebrow}>Directory</p>
              <h2 className={styles.directoryBandTitle}>Browse {regionName}</h2>
              <p className={styles.directoryBandDek}>
                Need an address without reading every profile? Filter by tastings, dining, or
                hotels — or use the map to see what&apos;s nearby. Our featured picks from this
                guide appear first; the rest of the appellation&apos;s listings follow below.
              </p>
            </div>
          </div>
          <div className={`${styles.mapEmbedPanel} ${styles.explorePanel}`}>
            {pins.length > 0 ? (
              <ExploreMapSection
                pins={pins}
                scopedRegion={slug}
                showRegionFilter={false}
                embedMode
              />
            ) : (
              <p className={styles.scrollSectionEmpty}>No listings for this region yet.</p>
            )}
            <button
              type="button"
              className={styles.embedScrollMore}
              onClick={() => scrollToSection(scrollAfterExplore)}
            >
              {hasItinerary ? 'Itinerary below ↓' : 'More appellations below ↓'}
            </button>
          </div>
        </section>

        {hasItinerary ? (
          <section id="region-itinerary" className={styles.scrollSection}>
            <div
              className={`${styles.mapEmbedPanel} ${styles.itineraryEmbedPanel} ${styles.itineraryScrollyPanel}`}
            >
              <ScrollyItinerary
                itineraries={itineraries}
                regionCenter={regionCenter}
                regionName={regionName}
                selectedItineraryId={selectedItineraryId}
                onItineraryChange={setItinerary}
                embedMode
              />
              <button
                type="button"
                className={styles.embedScrollMore}
                onClick={scrollToBottom}
              >
                More appellations below ↓
              </button>
            </div>
          </section>
        ) : null}
      </div>

      <div id="region-bottom" className={styles.bottom}>
        <RegionMoreAppellations slug={slug} />
        <Footer />
      </div>

      <nav className={styles.scrollDock} aria-label="Page scroll">
        <button
          type="button"
          className={styles.scrollDockBtn}
          onClick={() => jumpTo(jumpLinks[0])}
          aria-label="Back to story"
        >
          <span aria-hidden>↑</span>
        </button>
        <span className={styles.scrollDockLabel}>Scroll</span>
        <button
          type="button"
          className={styles.scrollDockBtn}
          onClick={scrollToBottom}
          aria-label="Continue to more appellations"
        >
          <span aria-hidden>↓</span>
        </button>
      </nav>
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
