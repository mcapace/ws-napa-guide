'use client'

import { Suspense, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Footer from '@/components/ui/Footer'
import { ExploreMapSection } from '@/components/explore/ExploreMapSection'
import { RegionMoreAppellations } from '@/components/regions/RegionMoreAppellations'
import type { MapPin } from '@/data/map-pins'
import type { RegionAdventure } from '@/data/regions'
import type { LoadedRegionMdx } from '@/lib/content/types'
import {
  buildItinerarySteps,
  collectItineraryRouteSlugs,
  type ParsedItineraryStep,
} from '@/lib/region-itinerary'
import styles from './region-frame.module.css'

export type RegionTab = 'story' | 'explore' | 'itinerary'

type RegionPageClientProps = {
  slug: string
  mdx: LoadedRegionMdx
  pins: MapPin[]
  adventure?: RegionAdventure
}

const PANEL_MOTION = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
}

function parseTab(param: string | null, hasItinerary: boolean): RegionTab {
  if (param === 'explore') return 'explore'
  if (param === 'itinerary' && hasItinerary) return 'itinerary'
  return 'story'
}

function RegionPageClientContent({ slug, mdx, pins, adventure }: RegionPageClientProps) {
  const { frontmatter } = mdx
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const hasItinerary = Boolean(adventure)
  const activeTab = parseTab(searchParams.get('tab'), hasItinerary)

  const explorePins = pins.map((p) => ({ ...p, editorial: undefined }))

  const itinerarySteps = useMemo(
    () => (adventure ? buildItinerarySteps(adventure.body, pins) : []),
    [adventure, pins],
  )
  const itineraryRouteSlugs = useMemo(
    () => collectItineraryRouteSlugs(itinerarySteps),
    [itinerarySteps],
  )

  const setTab = useCallback(
    (tab: RegionTab, exploreOpts?: { route?: string[]; place?: string }) => {
      const params = new URLSearchParams(searchParams.toString())

      if (tab === 'story') {
        params.delete('tab')
        params.delete('category')
        params.delete('place')
        params.delete('route')
      } else {
        params.set('tab', tab)
        if (tab !== 'explore') {
          params.delete('category')
          params.delete('place')
          params.delete('route')
        }
      }

      if (tab === 'explore') {
        if (exploreOpts?.place) {
          params.set('place', exploreOpts.place)
          params.delete('route')
        } else if (exploreOpts?.route && exploreOpts.route.length > 0) {
          params.set('route', exploreOpts.route.join(','))
          params.delete('place')
        } else {
          params.delete('place')
          params.delete('route')
        }
      }

      const q = params.toString()
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  const openRouteOnMap = useCallback(
    (routeSlugs: string[]) => {
      setTab('explore', { route: routeSlugs })
    },
    [setTab],
  )

  const openPlaceOnMap = useCallback(
    (placeSlug: string) => {
      setTab('explore', { place: placeSlug })
    },
    [setTab],
  )

  const tabs: { id: RegionTab; label: string }[] = [
    { id: 'story', label: 'Story' },
    { id: 'explore', label: 'Explore' },
  ]
  if (hasItinerary) tabs.push({ id: 'itinerary', label: 'Itinerary' })

  return (
    <div className={styles.frame} data-site-surface="dark">
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

      <div className={styles.panelZone}>
        <AnimatePresence mode="wait">
          {activeTab === 'story' ? (
            <motion.div key="story" className={styles.panel} {...PANEL_MOTION}>
              <StoryPanel mdx={mdx} />
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
            </motion.div>
          ) : null}

          {activeTab === 'itinerary' && adventure ? (
            <motion.div key="itinerary" className={styles.panel} {...PANEL_MOTION}>
              <ItineraryPanel
                adventure={adventure}
                steps={itinerarySteps}
                routeSlugs={itineraryRouteSlugs}
                onOpenRoute={() => openRouteOnMap(itineraryRouteSlugs)}
                onOpenPlace={openPlaceOnMap}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className={styles.bottom}>
        <RegionMoreAppellations slug={slug} />
        <Footer />
      </div>
    </div>
  )
}

function StoryPanel({ mdx }: { mdx: LoadedRegionMdx }) {
  return (
    <article className={styles.storyPanel}>
      {mdx.frontmatter.dek ? (
        <p className={styles.storyDek}>{mdx.frontmatter.dek}</p>
      ) : null}
      <div className={styles.storyProse}>{mdx.lede}</div>
      {mdx.sidebar && mdx.sidebarHeading ? (
        <aside className={styles.storyPullout}>
          <p className={styles.pulloutEyebrow}>From the issue</p>
          <h2 className={styles.pulloutTitle}>{mdx.sidebarHeading}</h2>
          <div className={styles.pulloutBody}>{mdx.sidebar}</div>
        </aside>
      ) : null}
    </article>
  )
}

function ItineraryPanel({
  adventure,
  steps,
  routeSlugs,
  onOpenRoute,
  onOpenPlace,
}: {
  adventure: RegionAdventure
  steps: ParsedItineraryStep[]
  routeSlugs: string[]
  onOpenRoute: () => void
  onOpenPlace: (slug: string) => void
}) {
  return (
    <div className={styles.itineraryPanel}>
      <h2 className={styles.itineraryTitle}>{adventure.title}</h2>
      {adventure.intro ? <p className={styles.itineraryIntro}>{adventure.intro}</p> : null}

      {routeSlugs.length > 0 ? (
        <p className={styles.itineraryRouteSummary}>
          {routeSlugs.length} mapped stops detected in this itinerary
        </p>
      ) : null}

      <ol className={styles.steps}>
        {steps.map((step) => (
          <li key={step.number} className={styles.step}>
            <span className={styles.stepMarker}>{step.number}</span>
            <div className={styles.stepContent}>
              {step.title ? <h3 className={styles.stepTitle}>{step.title}</h3> : null}
              <p className={styles.stepText}>{step.text}</p>
              {step.matchedPins.length > 0 ? (
                <div className={styles.stepPlaces}>
                  {step.matchedPins.map((pin) => (
                    <button
                      key={pin.slug}
                      type="button"
                      className={styles.stepPlaceChip}
                      onClick={() => onOpenPlace(pin.slug)}
                    >
                      View {pin.name} on map →
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <button
        type="button"
        className={styles.itineraryMapCta}
        onClick={onOpenRoute}
        disabled={routeSlugs.length === 0}
      >
        {routeSlugs.length > 0
          ? `Open ${routeSlugs.length} stops on the map →`
          : 'No mapped stops found in this itinerary'}
      </button>
    </div>
  )
}

export default function RegionPageClient(props: RegionPageClientProps) {
  return (
    <Suspense fallback={null}>
      <RegionPageClientContent {...props} />
    </Suspense>
  )
}
