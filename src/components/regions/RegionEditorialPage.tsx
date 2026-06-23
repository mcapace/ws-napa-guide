import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import type { LoadedRegionMdx } from '@/lib/content/types'
import { getRegion } from '@/data/regions'
import { buildRegionExplorePins } from '@/lib/explore-region-pins'
import { ExploreMapSection } from '@/components/explore/ExploreMapSection'
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
      data-site-surface="light"
      style={{ minHeight: '100vh', background: '#FAF7F2', WebkitFontSmoothing: 'antialiased' as string }}
    >
      <Nav />
      <RegionHero fm={frontmatter} />
      <RegionLede>{data.lede}</RegionLede>

      {data.sidebarHeading ? (
        <SidebarCallout heading={data.sidebarHeading}>{data.sidebar}</SidebarCallout>
      ) : null}

      <section style={{ background: '#FAF7F2', paddingBottom: 48 }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '48px clamp(24px, 5vw, 40px) 24px',
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: '#0D0B09',
              margin: 0,
              lineHeight: 1.15,
            }}
          >
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
