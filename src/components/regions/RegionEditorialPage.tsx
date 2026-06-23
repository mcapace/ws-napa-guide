import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import type { LoadedRegionMdx } from '@/lib/content/types'
import { getRegion } from '@/data/regions'
import { ExploreMapSection } from '@/components/explore/ExploreMapSection'
import { buildRegionExplorePins } from '@/lib/explore-region-pins'
import { RegionHero } from './RegionHero'
import { RegionLede } from './RegionLede'
import { SidebarCallout } from './SidebarCallout'
import { RegionAdventureBlock } from './RegionAdventureBlock'
import { RegionMoreAppellations } from './RegionMoreAppellations'
import './region-editorial.css'

export function RegionEditorialPage({ data }: { data: LoadedRegionMdx }) {
  const { frontmatter } = data
  const slug = frontmatter.slug
  const regionData = getRegion(slug)
  const regionPins = buildRegionExplorePins(slug, data)
  const regionName = frontmatter.region

  return (
    <div
      className="region-editorial-page"
      data-site-surface="light"
      style={{ minHeight: '100vh', background: '#FAF7F2', WebkitFontSmoothing: 'antialiased' as string }}
    >
      <RegionHero fm={frontmatter} />
      <RegionLede>{data.lede}</RegionLede>

      {data.sidebarHeading ? (
        <SidebarCallout heading={data.sidebarHeading}>{data.sidebar}</SidebarCallout>
      ) : null}

      <section className="region-directory-section">
        <div className="region-directory-section__head">
          <h2 className="region-directory-section__title">
            Where to taste, eat & stay in {regionName}
          </h2>
        </div>
        <ExploreMapSection
          pins={regionPins}
          scopedRegion={slug}
          showRegionFilter={false}
        />
      </section>

      {regionData?.adventure ? (
        <RegionAdventureBlock adventure={regionData.adventure} />
      ) : null}

      <RegionMoreAppellations slug={slug} />
      <Newsletter />
      <Footer />
    </div>
  )
}
