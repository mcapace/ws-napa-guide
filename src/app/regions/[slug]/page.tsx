import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllRegionSlugs } from '@/data/regions'
import { getRegionItineraries } from '@/data/region-itineraries'
import { enrichRegionItineraries } from '@/lib/enrich-region-itineraries'
import { buildRegionExplorePins } from '@/lib/explore-region-pins'
import { getMdxRegionSlugs, loadRegionMdxCached } from '@/lib/content/loadRegionMdx'
import RegionPageClient from './RegionPageClient'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const fromMdx = getMdxRegionSlugs()
  const fromTs = getAllRegionSlugs()
  const merged = [...new Set([...fromTs, ...fromMdx])]
  return merged.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const mdxDoc = await loadRegionMdxCached(slug)
  if (mdxDoc) {
    return {
      title: `${mdxDoc.frontmatter.region} — ${mdxDoc.frontmatter.tagline}`,
      description: mdxDoc.frontmatter.dek,
      openGraph: { images: [mdxDoc.frontmatter.heroImage] },
    }
  }
  return {}
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params
  const mdxDoc = await loadRegionMdxCached(slug)
  if (!mdxDoc) notFound()

  const regionPins = buildRegionExplorePins(slug, mdxDoc)
  const featuredListingPlain = Object.fromEntries(
    mdxDoc.featuredWineries
      .filter((w) => w.bodyPlain && w.bodyPlain.length > 40)
      .map((w) => [w.name, w.bodyPlain!]),
  )

  const itineraries = enrichRegionItineraries(slug, getRegionItineraries(slug), {
    sidebarMd: mdxDoc.sidebarMd,
    sidebarHeading: mdxDoc.sidebarHeading,
    byline: mdxDoc.frontmatter.byline,
    issue: mdxDoc.frontmatter.issue,
    regionName: mdxDoc.frontmatter.region,
    regionTagline: mdxDoc.frontmatter.tagline,
    ledeParagraphs: mdxDoc.ledePlain,
    featuredListingPlain,
  })

  return (
    <RegionPageClient
      slug={slug}
      mdx={mdxDoc}
      pins={regionPins}
      itineraries={itineraries}
    />
  )
}
