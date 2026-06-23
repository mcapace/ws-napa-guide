import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import type { LoadedRegionMdx } from '@/lib/content/types'
import { getRegion } from '@/data/regions'
import { ExploreMapSection } from '@/components/explore/ExploreMapSection'
import { buildRegionExplorePins } from '@/lib/explore-region-pins'
import { buildRegionGuideNavItems } from '@/lib/content/regionGuideNav'
import { RegionHero } from './RegionHero'
import { RegionIntro } from './RegionIntro'
import { RegionGuideNav } from './RegionGuideNav'
import { RegionStoryTeaser } from './RegionStoryTeaser'
import { RelatedStoriesRail } from './RelatedStoriesRail'
import { RegionAdventureBlock } from './RegionAdventureBlock'
import { RegionMoreAppellations } from './RegionMoreAppellations'
import './region-editorial.css'

export function RegionEditorialPage({ data }: { data: LoadedRegionMdx }) {
  const { frontmatter } = data
  const slug = frontmatter.slug
  const regionData = getRegion(slug)
  const regionPins = buildRegionExplorePins(slug, data)
  const regionName = frontmatter.region
  const guideNav = buildRegionGuideNavItems(data, regionPins.length > 0)

  return (
    <div
      className="region-editorial-page"
      data-site-surface="light"
      style={{ minHeight: '100vh', background: '#FAF7F2', WebkitFontSmoothing: 'antialiased' as string }}
    >
      <RegionHero fm={frontmatter} />

      <RegionIntro lede={data.lede} dek={frontmatter.dek} />

      {guideNav.length > 0 ? (
        <div className="region-guide-nav-bar">
          <RegionGuideNav items={guideNav} />
        </div>
      ) : null}

      <RegionStoryTeaser data={data} slug={slug} />

      {regionPins.length > 0 ? (
        <section id="region-map" className="region-directory-section">
          <div className="region-directory-section__head">
            <p className="region-directory-section__eyebrow">Interactive directory</p>
            <h2 className="region-directory-section__title">Explore {regionName}</h2>
            <p className="region-directory-section__dek">
              Featured picks appear as larger cards with editorial photography. Scroll the list or
              pan the map — filter by tasting rooms, dining, or hotels.
            </p>
          </div>
          <ExploreMapSection
            pins={regionPins}
            scopedRegion={slug}
            showRegionFilter={false}
          />
        </section>
      ) : null}

      {data.related.length > 0 ? (
        <RelatedStoriesRail cards={data.related} />
      ) : null}

      {regionData?.adventure ? (
        <RegionAdventureBlock adventure={regionData.adventure} />
      ) : null}

      <RegionMoreAppellations slug={slug} />
      <Newsletter />
      <Footer />
    </div>
  )
}
