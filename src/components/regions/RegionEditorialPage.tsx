import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { FeatureBlock } from '@/components/FeatureBlock'
import type { LoadedRegionMdx } from '@/lib/content/types'
import { buildRegionEatMapRows, buildRegionStayMapRows, buildRegionTasteMapRows } from '@/lib/content/regionMapRows'
import { RegionHero } from './RegionHero'
import { RegionLede } from './RegionLede'
import { SectionDivider } from './SectionDivider'
import { TastingDirectoryWithMap } from './TastingDirectoryWithMap'
import { SidebarCallout } from './SidebarCallout'
import './region-editorial.css'

export function RegionEditorialPage({ data }: { data: LoadedRegionMdx }) {
  const { frontmatter } = data
  const mq = frontmatter.marqueePhrases
  const tasteMapRows = buildRegionTasteMapRows(data)
  const eatMapRows = buildRegionEatMapRows(data)
  const stayMapRows = buildRegionStayMapRows(data)

  return (
    <div
      data-site-surface="light"
      style={{ minHeight: '100vh', background: '#FAF7F2', WebkitFontSmoothing: 'antialiased' as string }}
    >
      <Nav />
      <RegionHero fm={frontmatter} />
      <RegionLede>{data.lede}</RegionLede>
      <SectionDivider label={mq?.taste ?? 'Where to Taste'} />
      {data.featuredWineries.map((f) => (
        <FeatureBlock
          key={f.name}
          name={f.name}
          address={f.address}
          website={f.website}
          image={f.image}
          imagePortrait={f.imagePortrait}
          imagePosition={f.imagePosition}
        >
          {f.body}
        </FeatureBlock>
      ))}
      {tasteMapRows.length > 0 && (
        <TastingDirectoryWithMap
          regionLabel={frontmatter.region}
          center={frontmatter.coordinates}
          rows={tasteMapRows}
        />
      )}
      {(data.featuredRestaurants.length > 0 ||
        data.breakfast ||
        data.restaurantDirectory.length > 0 ||
        eatMapRows.length > 0) && (
        <>
          <SectionDivider label={mq?.eat ?? 'Where to Eat'} />
          {data.featuredRestaurants.map((f) => (
            <FeatureBlock
              key={f.name}
              name={f.name}
              address={f.address}
              website={f.website}
              image={f.image}
              imagePortrait={f.imagePortrait}
              imagePosition={f.imagePosition}
            >
              {f.body}
            </FeatureBlock>
          ))}
          {(data.restaurantDirectory.length > 0 || eatMapRows.length > 0) && (
            <TastingDirectoryWithMap
              regionLabel={frontmatter.region}
              center={frontmatter.coordinates}
              rows={data.restaurantDirectory}
              mapRows={eatMapRows}
              directoryTitle={`More ${frontmatter.region} Dining`}
            />
          )}
          {data.breakfast && (
            <FeatureBlock
              name={data.breakfast.name}
              address={data.breakfast.address}
              website={data.breakfast.website}
              image={data.breakfast.image}
              imagePortrait={data.breakfast.imagePortrait}
              imagePosition={data.breakfast.imagePosition}
            >
              {data.breakfast.body}
            </FeatureBlock>
          )}
        </>
      )}
      {(data.featuredHotels.length > 0 ||
        data.lodgingDirectory.length > 0 ||
        stayMapRows.length > 0) && (
        <>
          <SectionDivider label={mq?.stay ?? 'Where to Stay'} />
          {data.featuredHotels.map((f) => (
            <FeatureBlock
              key={f.name}
              name={f.name}
              address={f.address}
              website={f.website}
              image={f.image}
              imagePortrait={f.imagePortrait}
              imagePosition={f.imagePosition}
            >
              {f.body}
            </FeatureBlock>
          ))}
          {(data.lodgingDirectory.length > 0 || stayMapRows.length > 0) && (
            <TastingDirectoryWithMap
              regionLabel={frontmatter.region}
              center={frontmatter.coordinates}
              rows={data.lodgingDirectory}
              mapRows={stayMapRows}
              directoryTitle={`More ${frontmatter.region} Lodging`}
            />
          )}
        </>
      )}
      {data.sidebarHeading ? (
        <>
          <SectionDivider label={mq?.sidebar ?? data.sidebarHeading} />
          <SidebarCallout heading={data.sidebarHeading}>{data.sidebar}</SidebarCallout>
        </>
      ) : null}
      <Newsletter />
      <Footer />
    </div>
  )
}
