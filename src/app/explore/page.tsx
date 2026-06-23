import type { Metadata } from 'next'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import { mapPins } from '@/data/map-pins'
import { wineries } from '@/data/wineries'
import { restaurants } from '@/data/restaurants'
import { hotels } from '@/data/hotels'
import { ExploreMapSection } from '@/components/explore/ExploreMapSection'

export const metadata: Metadata = {
  title: 'Explore Napa Valley',
  description:
    'Interactive map and directory of tasting rooms, restaurants, and hotels across Napa Valley — from Wine Spectator.',
}

export default function ExplorePage() {
  const wineryCount = wineries.length
  const restaurantCount = restaurants.length
  const hotelCount = hotels.length

  return (
    <div data-site-surface="dark" style={{ minHeight: '100vh', background: '#0D0B09' }}>
      <Nav />

      <section
        style={{
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '80px clamp(24px, 5vw, 48px) 48px',
          background: 'linear-gradient(180deg, #1A1612 0%, #0D0B09 100%)',
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: '#F7F3EC',
            margin: '0 0 16px',
            lineHeight: 1.05,
          }}
        >
          Explore Napa Valley
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            lineHeight: 1.6,
            color: '#9B9283',
            maxWidth: 520,
            margin: '0 0 24px',
          }}
        >
          Scroll the directory or explore the map — every tasting room, restaurant, and hotel in
          Wine Spectator&apos;s Napa guide.
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#C4943A',
            margin: 0,
          }}
        >
          {wineryCount} tasting rooms · {restaurantCount} restaurants · {hotelCount} hotels
        </p>
      </section>

      <ExploreMapSection pins={mapPins} showRegionFilter={true} />

      <Footer />
    </div>
  )
}
