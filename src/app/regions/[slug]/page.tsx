import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllRegionSlugs } from '@/data/regions'
import { getRegionItinerariesEditorial } from '@/data/region-itineraries'
import { enrichRegionItineraries } from '@/lib/enrich-region-itineraries'
import {
  collectRegionStoryImages,
  enrichItinerariesWithImages,
} from '@/lib/region-editorial-images'
import {
  prioritizePartnerItineraries,
  prioritizePreferredPartners,
} from '@/lib/partner-itinerary-preference'
import { buildRegionExplorePins } from '@/lib/explore-region-pins'
import { getMdxRegionSlugs, loadRegionMdxCached } from '@/lib/content/loadRegionMdx'
import RegionScrollPageClient from './RegionScrollPageClient'

/** Flip founding-partner lead placements when the 90-day window ends without a redeploy. */
export const revalidate = 86400

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const fromMdx = getMdxRegionSlugs()
  const fromTs = getAllRegionSlugs()
  const merged = [...new Set([...fromTs, ...fromMdx])]
  return merged.map((slug) => ({ slug }))
}

import { getSiteUrl } from '@/lib/site-url'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const mdxDoc = await loadRegionMdxCached(slug)
  if (mdxDoc) {
    const siteUrl = getSiteUrl()
    const canonical = `${siteUrl}/regions/${slug}`
    const heroPath = mdxDoc.frontmatter.heroImage
    const imageUrl = heroPath.startsWith('http') ? heroPath : `${siteUrl}${heroPath}`

    return {
      title: `${mdxDoc.frontmatter.region} — ${mdxDoc.frontmatter.tagline}`,
      description: mdxDoc.frontmatter.dek,
      alternates: { canonical },
      openGraph: {
        url: canonical,
        title: `${mdxDoc.frontmatter.region} — ${mdxDoc.frontmatter.tagline}`,
        description: mdxDoc.frontmatter.dek,
        images: [{ url: imageUrl, width: 1200, height: 630, alt: mdxDoc.frontmatter.region }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${mdxDoc.frontmatter.region} — ${mdxDoc.frontmatter.tagline}`,
        description: mdxDoc.frontmatter.dek,
        images: [imageUrl],
      },
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

  const mdx = {
    ...mdxDoc,
    featuredWineries: prioritizePreferredPartners(mdxDoc.featuredWineries, slug),
  }

  const itineraries = enrichItinerariesWithImages(
    prioritizePartnerItineraries(
      enrichRegionItineraries(slug, getRegionItinerariesEditorial(slug), {
        sidebarMd: mdxDoc.sidebarMd,
        sidebarHeading: mdxDoc.sidebarHeading,
        byline: mdxDoc.frontmatter.byline,
        issue: mdxDoc.frontmatter.issue,
        regionName: mdxDoc.frontmatter.region,
        regionTagline: mdxDoc.frontmatter.tagline,
        ledeParagraphs: mdxDoc.ledePlain,
        featuredListingPlain,
      }),
      slug,
    ),
    slug,
    mdx,
    regionPins,
  )

  const storyImages = collectRegionStoryImages(mdx)

  const clientProps = {
    slug,
    mdx,
    pins: regionPins,
    itineraries,
    storyImages,
  }

  return <RegionScrollPageClient {...clientProps} />
}
