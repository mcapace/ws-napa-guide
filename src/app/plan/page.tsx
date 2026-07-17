import type { Metadata } from 'next'
import { Suspense } from 'react'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { buildAllRegionPins } from '@/lib/all-region-pins'
import type { PlanVenue } from '@/lib/plan-itinerary'
import { PlanClient } from './PlanClient'

export const metadata: Metadata = {
  title: 'Plan Your Trip',
  description:
    'Build a day-by-day Napa Valley itinerary from the Wine Spectator guide — tastings, restaurants, hotels, and things to do, matched to your trip.',
}

export default async function PlanPage() {
  const pins = await buildAllRegionPins()
  const venues: PlanVenue[] = pins.map((pin) => ({
    slug: pin.slug,
    name: pin.name,
    category: pin.category,
    region: pin.region,
    address: pin.excerpt,
    href: pin.href,
    coords: pin.coords,
    thumb: pin.thumb,
    editorial: pin.editorial,
  }))

  return (
    <div className="grain" style={{ minHeight: '100vh' }}>
      <Suspense fallback={null}>
        <PlanClient venues={venues} />
      </Suspense>
      <Newsletter />
      <Footer />
    </div>
  )
}
