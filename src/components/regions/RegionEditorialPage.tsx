import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { FeatureBlock } from '@/components/FeatureBlock'
import type { LoadedRegionMdx } from '@/lib/content/types'
import { RegionHero } from './RegionHero'
import { RegionLede } from './RegionLede'
import { MarqueeRibbon } from './MarqueeRibbon'
import { TastingDirectoryWithMap } from './TastingDirectoryWithMap'
import { SidebarCallout } from './SidebarCallout'
import { RelatedStoriesRail } from './RelatedStoriesRail'
import './region-editorial.css'

export function RegionEditorialPage({ data }: { data: LoadedRegionMdx }) {
  const { frontmatter } = data

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', WebkitFontSmoothing: 'antialiased' as string }}>
      <Nav />
      <RegionHero fm={frontmatter} />
      <RegionLede>{data.lede}</RegionLede>
      <MarqueeRibbon phrase="Where to Taste" />
      {data.featuredWineries.map((f) => (
        <FeatureBlock
          key={f.name}
          name={f.name}
          address={f.address}
          website={f.website}
          body={f.body}
          image={f.image}
          imagePosition={f.imagePosition}
        />
      ))}
      <TastingDirectoryWithMap
        regionLabel={frontmatter.region}
        center={frontmatter.coordinates}
        rows={data.tastingDirectory}
      />
      <MarqueeRibbon phrase="Where to Eat" />
      {data.featuredRestaurants.map((f) => (
        <FeatureBlock
          key={f.name}
          name={f.name}
          address={f.address}
          website={f.website}
          body={f.body}
          image={f.image}
          imagePosition={f.imagePosition}
        />
      ))}
      {data.breakfast && (
        <FeatureBlock
          name={data.breakfast.name}
          address={data.breakfast.address}
          website={data.breakfast.website}
          body={data.breakfast.body}
          image={data.breakfast.image}
          imagePosition={data.breakfast.imagePosition}
        />
      )}
      {(data.featuredHotels.length > 0 || data.lodgingDirectory.length > 0) && (
        <>
          <MarqueeRibbon phrase="Where to Stay" />
          {data.featuredHotels.map((f) => (
            <FeatureBlock
              key={f.name}
              name={f.name}
              address={f.address}
              website={f.website}
              body={f.body}
              image={f.image}
              imagePosition={f.imagePosition}
            />
          ))}
          {data.lodgingDirectory.length > 0 && (
            <TastingDirectoryWithMap
              regionLabel={frontmatter.region}
              center={frontmatter.coordinates}
              rows={data.lodgingDirectory}
              directoryTitle={`More ${frontmatter.region} Lodging`}
            />
          )}
        </>
      )}
      <SidebarCallout heading={data.sidebarHeading}>{data.sidebar}</SidebarCallout>
      <RelatedStoriesRail cards={data.related} />
      <Newsletter />
      <Footer />
    </div>
  )
}
