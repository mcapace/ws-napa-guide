import type { Metadata } from 'next'
import NapaMap from '@/components/map/NapaMap'
import Nav from '@/components/ui/Nav'

export const metadata: Metadata = {
  title: 'Interactive Map',
  description:
    'Explore every winery, restaurant, and hotel from Wine Spectator’s Napa Valley Guide on our interactive map.',
}

export default function MapPage() {
  return (
    <>
      <Nav />
      <main style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
        <NapaMap />
      </main>
    </>
  )
}
