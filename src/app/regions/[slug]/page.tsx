import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllRegionSlugs, getRegion } from '@/data/regions'
import { wineries } from '@/data/wineries'
import { restaurants } from '@/data/restaurants'
import { hotels } from '@/data/hotels'
import RegionPageClient from './RegionPageClient'
import RegionDetailPage from '@/components/RegionDetailPage'

// Regions that use the new therealhotels-style layout
const NEW_LAYOUT_REGIONS = ['yountville', 'oakville', 'rutherford', 'st-helena', 'calistoga', 'pritchard-hill', 'downtown-napa'];

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
  const region = getRegion(slug)
  if (!region) notFound()

  if (NEW_LAYOUT_REGIONS.includes(slug)) {
    const regionWineries = region.winerySlugs
      .map(s => wineries.find(w => w.slug === s))
      .filter((w): w is typeof wineries[number] => !!w)
      .map(w => ({ slug: w.slug, name: w.name, address: w.address, excerpt: w.excerpt, images: w.images }));

    const regionRestaurants = region.restaurantSlugs
      .map(s => restaurants.find(r => r.slug === s))
      .filter((r): r is typeof restaurants[number] => !!r)
      .map(r => ({ slug: r.slug, name: r.name, cuisine: r.cuisine, priceRange: r.priceRange, excerpt: r.excerpt, images: r.images }));

    const regionHotels = region.hotelSlugs
      .map(s => hotels.find(h => h.slug === s))
      .filter((h): h is typeof hotels[number] => !!h)
      .map(h => ({ slug: h.slug, name: h.name, category: h.category, priceRange: h.priceRange, excerpt: h.excerpt, images: h.images }));

    return (
      <RegionDetailPage data={{
        slug: region.slug,
        name: region.name,
        tagline: region.tagline,
        author: region.author ?? '',
        heroImage: region.heroImage,
        pullQuote: region.pullQuote ?? region.intro,
        intro: region.intro,
        body: region.body ?? region.intro,
        wineries: regionWineries,
        restaurants: regionRestaurants,
        hotels: regionHotels,
      }} />
    );
  }

  return <RegionPageClient slug={slug} />
}
