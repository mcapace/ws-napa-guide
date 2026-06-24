'use client'

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Footer from '@/components/ui/Footer'
import { ExploreMapSection } from '@/components/explore/ExploreMapSection'
import ScrollyItinerary from '@/components/itinerary/ScrollyItinerary'
import { RegionMoreAppellations } from '@/components/regions/RegionMoreAppellations'
import {
  buildRegionGuideNavItems,
  RegionEditorialSections,
} from '@/components/regions/RegionEditorialSections'
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

function parseTab(param: string | null, hasItinerary: boolean): RegionTab {
  if (param === 'explore') return 'explore'
  if (param === 'itinerary' && hasItinerary) return 'itinerary'
  return 'story'
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
  const [activeTab, setActiveTab] = useState<RegionTab>(tabFromUrl)
  const selectedItineraryId =
    itineraries.find((it) => it.id === searchParams.get('itinerary'))?.id ?? itineraries[0]?.id

  const explorePins = pins.map((p) => ({ ...p, editorial: undefined }))
  const regionCenter = REGION_CENTERS[slug]?.center ?? [-122.4194, 38.5]
  const regionName = frontmatter.region

  const subNavItems = buildRegionGuideNavItems(mdx, false).filter((item) =>
    ['region-taste', 'region-eat', 'region-stay'].includes(item.id),
  )
  const hasSubNav = subNavItems.length > 0

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

  const setTab = useCallback(
    (tab: RegionTab) => {
      setActiveTab(tab)
      const sectionId =
        tab === 'story' ? 'region-story' : tab === 'explore' ? 'region-explore' : 'region-itinerary'
      scrollToSection(sectionId)

      const params = new URLSearchParams()
      if (tab !== 'story') {
        params.set('tab', tab)
        if (tab === 'itinerary' && selectedItineraryId) {
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

    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToSection(sectionId))
    })
    return () => window.cancelAnimationFrame(id)
  }, [tabFromUrl, scrollToSection])

  useEffect(() => {
    const sectionIds = [
      'region-story',
      'region-explore',
      ...(hasItinerary ? ['region-itinerary'] : []),
    ]
    const observers: IntersectionObserver[] = []

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue

      const tab: RegionTab =
        id === 'region-explore' ? 'explore' : id === 'region-itinerary' ? 'itinerary' : 'story'

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActiveTab(tab)
          }
        },
        { rootMargin: '-35% 0px -45% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    }

    return () => observers.forEach((o) => o.disconnect())
  }, [hasItinerary])

  const tabs: { id: RegionTab; label: string }[] = [
    { id: 'story', label: 'Story' },
    { id: 'explore', label: 'Explore' },
  ]
  if (hasItinerary) tabs.push({ id: 'itinerary', label: 'Itinerary' })

  const scrollAfterExplore = hasItinerary ? 'region-itinerary' : 'region-bottom'

  return (
    <div
      className={styles.frame}
      data-site-surface="dark"
      data-region-frame=""
      data-scroll-unified=""
      data-has-subnav={hasSubNav ? '' : undefined}
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
            onClick={() => scrollToSection('region-story')}
            aria-label="Scroll to article"
          >
            <span className={styles.heroScrollHintLabel}>Scroll to read</span>
            <span className={styles.heroScrollHintIcon} aria-hidden>↓</span>
          </button>
        ) : null}
      </header>

      <nav className={styles.tabBar} aria-label="Region sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab}${activeTab === tab.id ? ` ${styles.tabActive}` : ''}`}
            aria-selected={activeTab === tab.id}
            onClick={() => setTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {hasSubNav ? (
        <nav className={styles.scrollSubNav} aria-label="Guide sections">
          <ul className={styles.scrollSubNavList}>
            {subNavItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={styles.scrollSubNavLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

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
          <div className={styles.scrollSectionHead}>
            <p className={styles.scrollSectionEyebrow}>Interactive directory</p>
            <h2 className={styles.scrollSectionTitle}>Explore {regionName}</h2>
            <p className={styles.scrollSectionDek}>
              Featured picks appear as larger cards with editorial photography. Filter by
              tasting rooms, dining, or hotels — or scan the map for a quick look.
            </p>
          </div>
          <div className={`${styles.mapEmbedPanel} ${styles.explorePanel}`}>
            {explorePins.length > 0 ? (
              <ExploreMapSection
                pins={explorePins}
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
          onClick={() => scrollToSection('region-story')}
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
