import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllRegionSlugs } from '@/data/regions'
import { RegionEditorialPage } from '@/components/regions/RegionEditorialPage'
import { getMdxRegionSlugs, loadRegionMdxCached } from '@/lib/content/loadRegionMdx'

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

/** All seven appellations render through the shared MDX editorial template. */
export default async function RegionPage({ params }: Props) {
  const { slug } = await params
  const mdxDoc = await loadRegionMdxCached(slug)
  if (!mdxDoc) notFound()

  return <RegionEditorialPage data={mdxDoc} />
}
