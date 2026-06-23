import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import type { LoadedRegionMdx } from '@/lib/content/types'
import { getRegion } from '@/data/regions'
import { RegionHero } from './RegionHero'
import { RegionLede } from './RegionLede'
import { SectionDivider } from './SectionDivider'
import { RegionEditorialSections } from './RegionEditorialSections'
import { SidebarCallout } from './SidebarCallout'
import { RelatedStoriesRail } from './RelatedStoriesRail'
import { RegionAdventureBlock } from './RegionAdventureBlock'
import { RegionMoreAppellations } from './RegionMoreAppellations'
import './region-editorial.css'

export function RegionEditorialPage({ data }: { data: LoadedRegionMdx }) {
  const { frontmatter } = data
  const slug = frontmatter.slug
  const regionData = getRegion(slug)

  return (
    <div
      data-site-surface="light"
      style={{ minHeight: '100vh', background: '#FAF7F2', WebkitFontSmoothing: 'antialiased' as string }}
    >
      <RegionHero fm={frontmatter} />
      <RegionLede>{data.lede}</RegionLede>

      <RegionEditorialSections data={data} />

      {data.sidebarHeading ? (
        <>
          {data.frontmatter.marqueePhrases?.sidebar ? (
            <SectionDivider label={data.frontmatter.marqueePhrases.sidebar} />
          ) : null}
          <SidebarCallout heading={data.sidebarHeading}>{data.sidebar}</SidebarCallout>
        </>
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
