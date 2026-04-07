import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllRegionSlugs, getRegion } from '@/data/regions'
import { getRegionMagazineData, hasRegionMagazineData } from '@/data/regions/index'
import RegionPageClient from './RegionPageClient'
import RegionMagazinePage from '@/components/RegionMagazinePage'

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

  // Use new magazine layout for regions with structured data
  const magazineData = getRegionMagazineData(slug);
  if (magazineData) {
    return <RegionMagazinePage data={magazineData} />;
  }

  return <RegionPageClient slug={slug} />
}
