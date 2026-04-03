import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import { HorizontalStrip } from '@/components/ui/HorizontalStrip'
import { restaurants } from '@/data/restaurants'
import { getRegion } from '@/data/regions'
import { primaryCTA, ghostCTA, infoLabel, infoValue } from '@/lib/editorial-styles'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return restaurants.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const r = restaurants.find((x) => x.slug === slug)
  if (!r) return {}
  return {
    title: `${r.name} — Napa Valley Dining`,
    description: r.excerpt,
    openGraph: { images: r.images },
  }
}

export default async function RestaurantDetailPage({ params }: Props) {
  const { slug } = await params
  const venue = restaurants.find((x) => x.slug === slug)
  if (!venue) notFound()

  const region = getRegion(venue.region)
  const regionName = region?.name ?? 'Napa Valley'
  const related = restaurants.filter((x) => x.region === venue.region && x.slug !== venue.slug)
  const reserveHref = venue.reservations ?? venue.website ?? '#'

  return (
    <div style={{ background: '#0D0B09', color: '#F7F3EC', minHeight: '100vh' }}>
      <Nav />

      {/* ── HERO IMAGE: clean, full-screen ── */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <Image src={venue.images[0]} alt={venue.name} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        <div
          style={{
            position: 'absolute',
            top: 28,
            right: 36,
            border: '1px solid rgba(247,243,236,0.2)',
            borderRadius: '50%',
            width: 72,
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 8,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(247,243,236,0.6)',
            lineHeight: 1.3,
            whiteSpace: 'pre-line',
          }}
        >
          {venue.region.replace(/-/g, '\n').toUpperCase()}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(to bottom, transparent, #0D0B09)',
          }}
        />
      </section>

      {/* ── TITLE + METADATA + CTAs: below hero ── */}
      <section style={{ padding: '60px 60px 48px', maxWidth: 960, margin: '0 auto' }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C4943A',
            marginBottom: 20,
          }}
        >
          {venue.cuisine} &middot; {venue.priceRange} &middot; {regionName}
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(48px, 8vw, 96px)',
            color: '#F7F3EC',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: 20,
          }}
        >
          {venue.name}
        </h1>
        {venue.address && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#9B9283', marginBottom: 32 }}>
            {venue.address}
          </p>
        )}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          {(venue.reservations || venue.website) ? (
            <a href={reserveHref} target="_blank" rel="noopener noreferrer" style={primaryCTA}>
              Make a reservation
            </a>
          ) : null}
          <Link href="#story" style={ghostCTA}>Read more</Link>
        </div>
      </section>

      {/* ── PHOTO ── */}
      <section style={{ position: 'relative', width: '100%', aspectRatio: '21/9', overflow: 'hidden' }}>
        <Image src={venue.images[1 % venue.images.length]} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
      </section>

      {/* ── BODY TEXT ── */}
      <section id="story" style={{ padding: '100px 60px', maxWidth: 860, margin: '0 auto' }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(22px, 2.8vw, 34px)',
            color: 'rgba(247,243,236,0.9)',
            lineHeight: 1.4,
            marginBottom: 48,
          }}
        >
          {venue.excerpt}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            fontWeight: 300,
            color: 'rgba(247,243,236,0.7)',
            lineHeight: 1.9,
          }}
        >
          {venue.description}
        </p>
      </section>

      {/* ── PHOTO ── */}
      <section style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
        <Image src={venue.images[2 % venue.images.length]} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
      </section>

      {/* ── PRACTICAL INFO ── */}
      <section style={{ padding: '80px 60px 100px', maxWidth: 860, margin: '0 auto' }}>
        <div
          style={{
            borderTop: '1px solid rgba(247,243,236,0.08)',
            paddingTop: 40,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
          }}
        >
          <div>
            <p style={infoLabel}>Cuisine</p>
            <p style={infoValue}>{venue.cuisine}</p>
          </div>
          <div>
            <p style={infoLabel}>Price range</p>
            <p style={infoValue}>{venue.priceRange}</p>
          </div>
          {venue.address && (
            <div>
              <p style={infoLabel}>Address</p>
              <p style={infoValue}>{venue.address}</p>
            </div>
          )}
        </div>
        <div style={{ marginTop: 48, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          {(venue.reservations || venue.website) ? (
            <a href={reserveHref} target="_blank" rel="noopener noreferrer" style={primaryCTA}>
              Make a reservation
            </a>
          ) : null}
          <Link href="/map" style={ghostCTA}>Explore the map &rarr;</Link>
        </div>
      </section>

      {/* ── MORE FROM REGION ── */}
      {related.length > 0 && (
        <section style={{ padding: '0 0 120px', borderTop: '1px solid rgba(247,243,236,0.06)' }}>
          <div style={{ padding: '80px 60px 48px' }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(24px, 3vw, 40px)',
                color: '#F7F3EC',
              }}
            >
              More from {regionName}
            </h2>
          </div>
          <HorizontalStrip entries={related.map((item) => ({ type: 'dining' as const, item }))} />
        </section>
      )}

      <Footer />
    </div>
  )
}
