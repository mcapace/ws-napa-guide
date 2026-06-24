'use client'

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Footer from '@/components/ui/Footer'
import { ExploreMapSection } from '@/components/explore/ExploreMapSection'
import ScrollyItinerary from '@/components/itinerary/ScrollyItinerary'
import { RegionMoreAppellations } from '@/components/regions/RegionMoreAppellations'
import type { MapPin } from '@/data/map-pins'
import type { LoadedRegionMdx } from '@/lib/content/types'
import { REGION_CENTERS } from '@/lib/mapbox'
import { useLenis, scrollToTarget } from '@/lib/smooth-scroll'
import type { Itinerary } from '@/lib/types'
import styles from './region-frame.module.css'

export type RegionTab = 'story' | 'explore' | 'itinerary'

type RegionPageClientProps = {
  slug: string
  mdx: LoadedRegionMdx
  pins: MapPin[]
  itineraries?: Itinerary[]
  storyImages?: string[]
}

const PANEL_MOTION = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
}

const ITINERARY_PANEL_MOTION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35, ease: 'easeOut' as const },
}

function parseTab(param: string | null, hasItinerary: boolean): RegionTab {
  if (param === 'explore') return 'explore'
  if (param === 'itinerary' && hasItinerary) return 'itinerary'
  return 'story'
}

function buildTabSearchParams(
  tab: RegionTab,
  current: URLSearchParams,
  selectedItineraryId?: string,
  exploreOpts?: { route?: string[]; place?: string },
): URLSearchParams {
  const params = new URLSearchParams()

  if (tab === 'story') {
    return params
  }

  params.set('tab', tab)

  if (tab === 'itinerary' && selectedItineraryId) {
    params.set('itinerary', selectedItineraryId)
  }

  if (tab === 'explore') {
    const category = current.get('category')
    if (category && category !== 'all') params.set('category', category)

    if (exploreOpts?.place) {
      params.set('place', exploreOpts.place)
    } else if (exploreOpts?.route && exploreOpts.route.length > 0) {
      params.set('route', exploreOpts.route.join(','))
    } else {
      const place = current.get('place')
      const route = current.get('route')
      if (place) params.set('place', place)
      else if (route) params.set('route', route)
    }
  }

  return params
}

function RegionPageClientContent({
  slug,
  mdx,
  pins,
  itineraries = [],
  storyImages = [],
}: RegionPageClientProps) {
  const { frontmatter } = mdx
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const lenis = useLenis()
  const hasItinerary = itineraries.length > 0
  const tabFromUrl = parseTab(searchParams.get('tab'), hasItinerary)
  const [pendingTab, setPendingTab] = useState<RegionTab | null>(null)
  const activeTab = pendingTab ?? tabFromUrl
  const selectedItineraryId =
    itineraries.find((it) => it.id === searchParams.get('itinerary'))?.id ?? itineraries[0]?.id

  const explorePins = pins.map((p) => ({ ...p, editorial: undefined }))

  const regionCenter = REGION_CENTERS[slug]?.center ?? [-122.4194, 38.5]

  const setTab = useCallback(
    (tab: RegionTab, exploreOpts?: { route?: string[]; place?: string }) => {
      setPendingTab(tab)

      const params = buildTabSearchParams(
        tab,
        new URLSearchParams(searchParams.toString()),
        selectedItineraryId,
        exploreOpts,
      )
      const q = params.toString()
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams, selectedItineraryId],
  )

  useEffect(() => {
    setPendingTab(null)
  }, [searchParams])

  const setItinerary = useCallback(
    (itineraryId: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('tab', 'itinerary')
      params.set('itinerary', itineraryId)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  const scrollToPanel = useCallback(() => {
    const panel = document.getElementById('region-panel-content')
    scrollToTarget(panel, lenis)
  }, [lenis])

  const scrollToBottom = useCallback(() => {
    const el = document.getElementById('region-bottom')
    scrollToTarget(el, lenis)
  }, [lenis])

  const [showScrollHint, setShowScrollHint] = useState(true)
  const skipInitialScrollRef = useRef(true)

  useEffect(() => {
    const onScroll = () => setShowScrollHint(window.scrollY < 100)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (skipInitialScrollRef.current) {
      skipInitialScrollRef.current = false
      return
    }
    if (activeTab === 'story' || activeTab === 'itinerary') {
      const id = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(scrollToPanel)
      })
      return () => window.cancelAnimationFrame(id)
    }
  }, [activeTab, scrollToPanel])

  const tabs: { id: RegionTab; label: string }[] = [
    { id: 'story', label: 'Story' },
    { id: 'explore', label: 'Explore' },
  ]
  if (hasItinerary) tabs.push({ id: 'itinerary', label: 'Itinerary' })

  return (
    <div
      className={styles.frame}
      data-site-surface="dark"
      data-region-frame=""
      data-active-tab={activeTab}
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
        {activeTab === 'story' && showScrollHint ? (
          <button
            type="button"
            className={styles.heroScrollHint}
            onClick={scrollToPanel}
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

      <div
        id="region-panel-content"
        className={`${styles.panelZone}${
          activeTab === 'explore'
            ? ` ${styles.panelZoneExplore}`
            : activeTab === 'itinerary'
              ? ` ${styles.panelZoneItinerary}`
              : ` ${styles.panelZoneScroll}`
        }`}
      >
        <AnimatePresence mode="sync" initial={false}>
          {activeTab === 'story' ? (
            <motion.div key="story" className={styles.panel} {...PANEL_MOTION}>
              <StoryPanel mdx={mdx} hideCompanionFeature={hasItinerary} storyImages={storyImages} />
            </motion.div>
          ) : null}

          {activeTab === 'explore' ? (
            <motion.div
              key="explore"
              className={`${styles.panel} ${styles.explorePanel}`}
              {...PANEL_MOTION}
            >
              {explorePins.length > 0 ? (
                <ExploreMapSection
                  pins={explorePins}
                  scopedRegion={slug}
                  showRegionFilter={false}
                />
              ) : (
                <p style={{ padding: 48, textAlign: 'center', color: '#6b6560' }}>
                  No listings for this region yet.
                </p>
              )}
              <button
                type="button"
                className={styles.exploreScrollMore}
                onClick={scrollToBottom}
              >
                More appellations below ↓
              </button>
            </motion.div>
          ) : null}

          {activeTab === 'itinerary' && hasItinerary ? (
            <motion.div
              key="itinerary"
              className={`${styles.panel} ${styles.itineraryScrollyPanel}`}
              {...ITINERARY_PANEL_MOTION}
            >
              <ScrollyItinerary
                itineraries={itineraries}
                regionCenter={regionCenter}
                regionName={frontmatter.region}
                selectedItineraryId={selectedItineraryId}
                onItineraryChange={setItinerary}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div id="region-bottom" className={styles.bottom}>
        <RegionMoreAppellations slug={slug} />
        <Footer />
      </div>
    </div>
  )
}

function StoryPanel({
  mdx,
  hideCompanionFeature = false,
  storyImages = [],
}: {
  mdx: LoadedRegionMdx
  /** Sidebar adventures duplicate the Itinerary tab — hide there when routes exist. */
  hideCompanionFeature?: boolean
  storyImages?: string[]
}) {
  const showSidebar = !hideCompanionFeature && mdx.sidebar && mdx.sidebarHeading
  const paragraphs = mdx.ledePlain ?? []
  const mediaImages = storyImages.length > 0 ? storyImages : [mdx.frontmatter.heroImage]

  return (
    <article className={styles.storyPanel}>
      {mdx.frontmatter.dek ? (
        <p className={styles.storyDek}>{mdx.frontmatter.dek}</p>
      ) : null}

      {paragraphs.length > 0 ? (
        <div className={styles.storyBody}>
          {Array.from({ length: Math.ceil(paragraphs.length / 2) }, (_, blockIndex) => {
            const start = blockIndex * 2
            const pair = paragraphs.slice(start, start + 2)
            const imageRight = blockIndex % 2 === 1
            const image = mediaImages[blockIndex]

            return (
              <div
                key={start}
                className={`${styles.storyBlock}${imageRight ? ` ${styles.storyBlockReverse}` : ''}`}
              >
                <div className={styles.storyProse}>
                  {pair.map((paragraph, j) => (
                    <p key={j}>{paragraph}</p>
                  ))}
                </div>
                {image ? (
                  <div className={styles.storyMedia}>
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 42vw"
                      className={styles.storyMediaImg}
                    />
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      ) : (
        <div className={styles.storyProse}>{mdx.lede}</div>
      )}

      {showSidebar ? (
        <aside className={styles.storyPullout}>
          <p className={styles.pulloutEyebrow}>From the issue</p>
          <h2 className={styles.pulloutTitle}>{mdx.sidebarHeading}</h2>
          <div className={styles.pulloutBody}>{mdx.sidebar}</div>
        </aside>
      ) : null}
    </article>
  )
}

export default function RegionPageClient(props: RegionPageClientProps) {
  return (
    <Suspense fallback={null}>
      <RegionPageClientContent {...props} />
    </Suspense>
  )
}
