import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { FeatureBlock } from '@/components/FeatureBlock'
import { TastingDirectoryWithMap } from '@/components/regions/TastingDirectoryWithMap'
import {
  buildRegionEatMapRows,
  buildRegionStayMapRows,
  buildRegionTasteMapRows,
} from '@/lib/content/regionMapRows'
import { getMdxRegionSlugs, loadRegionMdxCached } from '@/lib/content/loadRegionMdx'
import '@/components/regions/region-editorial.css'
import RegionRedesignClient, {
  type RedesignSection,
} from './RegionRedesignClient'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getMdxRegionSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const mdxDoc = await loadRegionMdxCached(slug)
  if (!mdxDoc) return {}
  return {
    title: `${mdxDoc.frontmatter.region} — ${mdxDoc.frontmatter.tagline} (Redesign Preview)`,
    description: mdxDoc.frontmatter.dek,
    robots: { index: false, follow: false },
  }
}

export default async function RegionRedesignPage({ params }: Props) {
  const { slug } = await params
  const data = await loadRegionMdxCached(slug)
  if (!data) notFound()

  const { frontmatter: fm } = data
  const mq = fm.marqueePhrases
  const tasteMapRows = buildRegionTasteMapRows(data)
  const eatMapRows = buildRegionEatMapRows(data)
  const stayMapRows = buildRegionStayMapRows(data)

  const sections: RedesignSection[] = []

  // ── Where to Taste ──
  if (data.featuredWineries.length > 0 || tasteMapRows.length > 0) {
    sections.push({
      id: 'taste',
      label: 'Taste',
      kicker: 'Where to Taste',
      phrase: mq?.taste ?? 'Where to Taste',
      theme: 'light',
      content: (
        <>
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
              regionLabel={fm.region}
              center={fm.coordinates}
              rows={tasteMapRows}
            />
          )}
        </>
      ),
    })
  }

  // ── Where to Eat ──
  if (
    data.featuredRestaurants.length > 0 ||
    data.breakfast ||
    data.restaurantDirectory.length > 0 ||
    eatMapRows.length > 0
  ) {
    sections.push({
      id: 'eat',
      label: 'Eat',
      kicker: 'Where to Eat',
      phrase: mq?.eat ?? 'Where to Eat',
      theme: 'light',
      content: (
        <>
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
              regionLabel={fm.region}
              center={fm.coordinates}
              rows={data.restaurantDirectory}
              mapRows={eatMapRows}
              directoryTitle={`More ${fm.region} Dining`}
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
      ),
    })
  }

  // ── Where to Stay ──
  if (
    data.featuredHotels.length > 0 ||
    data.lodgingDirectory.length > 0 ||
    stayMapRows.length > 0
  ) {
    sections.push({
      id: 'stay',
      label: 'Stay',
      kicker: 'Where to Stay',
      phrase: mq?.stay ?? 'Where to Stay',
      theme: 'light',
      content: (
        <>
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
              regionLabel={fm.region}
              center={fm.coordinates}
              rows={data.lodgingDirectory}
              mapRows={stayMapRows}
              directoryTitle={`More ${fm.region} Lodging`}
            />
          )}
        </>
      ),
    })
  }

  const adventure = data.sidebarHeading
    ? {
        label: 'Adventure',
        kicker: data.sidebarHeading,
        phrase: mq?.sidebar ?? data.sidebarHeading,
        content: data.sidebar,
      }
    : null

  return (
    <>
      <Nav />
      <RegionRedesignClient
        fm={fm}
        lede={data.lede}
        sections={sections}
        adventure={adventure}
        trailing={
          <>
            <Newsletter />
            <Footer />
          </>
        }
      />
    </>
  )
}
