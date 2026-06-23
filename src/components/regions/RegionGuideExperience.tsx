'use client'

import { useEffect, useRef, useState } from 'react'
import type { LoadedRegionMdx } from '@/lib/content/types'
import type { MapPin } from '@/data/map-pins'
import type { ExploreCategoryFilter } from '@/lib/explore'
import { ExploreMapSection } from '@/components/explore/ExploreMapSection'
import { SidebarCallout } from './SidebarCallout'
import { SectionDivider } from './SectionDivider'
import {
  RegionGuideChapters,
  buildRegionGuideNavItems,
} from './RegionGuideChapters'
import { RegionGuideInlineNav } from './RegionGuideInlineNav'

const CHAPTER_SYNC: Record<string, ExploreCategoryFilter> = {
  'region-taste': 'winery',
  'region-eat': 'dining',
  'region-stay': 'stay',
}

const SYNC_LABELS: Record<ExploreCategoryFilter, string> = {
  all: 'All listings',
  winery: 'Tasting rooms',
  dining: 'Dining',
  stay: 'Hotels & stays',
}

export function RegionGuideExperience({
  data,
  pins,
  regionName,
  slug,
}: {
  data: LoadedRegionMdx
  pins: MapPin[]
  regionName: string
  slug: string
}) {
  const hasMap = pins.length > 0
  const guideNav = buildRegionGuideNavItems(data, false)
  const phrases = data.frontmatter.marqueePhrases ?? {}

  const [mobilePanel, setMobilePanel] = useState<'guide' | 'map'>('guide')
  const [syncCategory, setSyncCategory] = useState<ExploreCategoryFilter>('all')
  const guideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = guideRef.current
    if (!root || !hasMap) return

    const chapters = root.querySelectorAll<HTMLElement>('[data-region-chapter]')
    if (chapters.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const top = visible[0]?.target as HTMLElement | undefined
        if (!top?.id) return

        const cat = CHAPTER_SYNC[top.id]
        if (cat) setSyncCategory(cat)
      },
      { root: null, rootMargin: '-22% 0px -48% 0px', threshold: [0, 0.15, 0.35, 0.55] },
    )

    chapters.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [hasMap, data])

  return (
    <div className="region-guide-experience">
      {hasMap ? (
        <div className="region-guide-experience__mobile-tabs" role="tablist" aria-label="Guide or map">
          <button
            type="button"
            role="tab"
            aria-selected={mobilePanel === 'guide'}
            className={`region-guide-experience__mobile-tab${
              mobilePanel === 'guide' ? ' region-guide-experience__mobile-tab--active' : ''
            }`}
            onClick={() => setMobilePanel('guide')}
          >
            Guide
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mobilePanel === 'map'}
            className={`region-guide-experience__mobile-tab${
              mobilePanel === 'map' ? ' region-guide-experience__mobile-tab--active' : ''
            }`}
            onClick={() => setMobilePanel('map')}
          >
            Map
          </button>
        </div>
      ) : null}

      <div className="region-guide-experience__split">
        <div
          ref={guideRef}
          className={`region-guide-experience__guide${
            hasMap && mobilePanel === 'map' ? ' region-guide-experience__panel--hidden' : ''
          }`}
        >
          {guideNav.length > 0 ? (
            <div className="region-guide-experience__nav-wrap">
              <RegionGuideInlineNav items={guideNav} />
            </div>
          ) : null}

          {data.sidebarHeading ? (
            <section
              id="region-sidebar"
              data-region-chapter="sidebar"
              className="region-chapter region-chapter--sidebar region-guide-chapter"
            >
              {phrases.sidebar ? <SectionDivider label={phrases.sidebar} /> : null}
              <div className="region-guide-chapter__body region-guide-chapter__body--sidebar">
                <SidebarCallout heading={data.sidebarHeading}>{data.sidebar}</SidebarCallout>
              </div>
            </section>
          ) : null}

          <RegionGuideChapters data={data} />
        </div>

        {hasMap ? (
          <aside
            className={`region-guide-experience__map${
              mobilePanel === 'guide' ? ' region-guide-experience__panel--hidden' : ''
            }`}
            aria-label={`Explore ${regionName} on the map`}
          >
            <div className="region-guide-experience__map-head">
              <div>
                <p className="region-guide-experience__map-eyebrow">Live directory</p>
                <h2 className="region-guide-experience__map-title">Explore {regionName}</h2>
              </div>
              <p className="region-guide-experience__map-sync" aria-live="polite">
                Showing {SYNC_LABELS[syncCategory]}
              </p>
            </div>
            <div className="region-guide-experience__map-frame">
              <ExploreMapSection
                pins={pins}
                scopedRegion={slug}
                showRegionFilter={false}
                embedMode
                syncCategory={syncCategory}
              />
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  )
}
