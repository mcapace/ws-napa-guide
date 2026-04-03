import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllRegionSlugs, getRegion } from '@/data/regions'
import RegionPageClient from './RegionPageClient'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllRegionSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const region = getRegion(slug)
  if (!region) return {}
  return {
    title: `${region.name} — ${region.tagline}`,
    description: region.intro,
    openGraph: { images: [region.heroImage] },
  }
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params
  if (!getRegion(slug)) notFound()
  return <RegionPageClient slug={slug} />
}
