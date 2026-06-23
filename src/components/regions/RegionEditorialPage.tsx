import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import type { LoadedRegionMdx } from '@/lib/content/types'
import { getRegion } from '@/data/regions'
import { buildRegionExplorePins } from '@/lib/explore-region-pins'
import { RegionHero } from './RegionHero'
import { RegionIntro } from './RegionIntro'
import { RegionGuideExperience } from './RegionGuideExperience'
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

  return (
    <div
      className="region-editorial-page"
      data-site-surface="light"
      style={{ minHeight: '100vh', background: '#FAF7F2', WebkitFontSmoothing: 'antialiased' as string }}
    >
      <RegionHero fm={frontmatter} />

      <RegionIntro lede={data.lede} dek={frontmatter.dek} />

      <RegionGuideExperience
        data={data}
        pins={regionPins}
        regionName={regionName}
        slug={slug}
      />

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
