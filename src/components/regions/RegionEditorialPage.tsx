import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import type { LoadedRegionMdx } from '@/lib/content/types'
import { getRegion } from '@/data/regions'
import { RegionHero } from './RegionHero'
import { RegionIntro } from './RegionIntro'
import { RegionGuideNav } from './RegionGuideNav'
import { SectionDivider } from './SectionDivider'
import {
  RegionEditorialSections,
  buildRegionGuideNavItems,
} from './RegionEditorialSections'
import { SidebarCallout } from './SidebarCallout'
import { RelatedStoriesRail } from './RelatedStoriesRail'
import { RegionAdventureBlock } from './RegionAdventureBlock'
import { RegionMoreAppellations } from './RegionMoreAppellations'
import './region-editorial.css'

export function RegionEditorialPage({ data }: { data: LoadedRegionMdx }) {
  const { frontmatter } = data
  const slug = frontmatter.slug
  const regionData = getRegion(slug)
  const guideNav = buildRegionGuideNavItems(data)

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

      {data.sidebarHeading ? (
        <section id="region-sidebar" className="region-chapter region-chapter--sidebar">
          {frontmatter.marqueePhrases?.sidebar ? (
            <SectionDivider label={frontmatter.marqueePhrases.sidebar} />
          ) : null}
          <SidebarCallout heading={data.sidebarHeading}>{data.sidebar}</SidebarCallout>
        </section>
      ) : null}

      <RegionEditorialSections data={data} />

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
