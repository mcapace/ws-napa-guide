import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import { HorizontalStrip } from '@/components/ui/HorizontalStrip'
import { hotels } from '@/data/hotels'
import { getRegion } from '@/data/regions'
import { primaryCTA, ghostCTA, infoLabel, infoValue } from '@/lib/editorial-styles'

type Props = { params: Promise<{ slug: string }> }

const categoryLabel: Record<string, string> = {
  resort: 'Resort',
  boutique: 'Boutique hotel',
  inn: 'Country inn',
  villa: 'Private villa',
}

export async function generateStaticParams() {
  return hotels.map((h) => ({ slug: h.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const h = hotels.find((x) => x.slug === slug)
  if (!h) return {}
  return {
    title: `${h.name} — Where to Stay in Napa`,
    description: h.excerpt,
    openGraph: { images: h.images },
  }
}

export default async function HotelDetailPage({ params }: Props) {
  const { slug } = await params
  const place = hotels.find((x) => x.slug === slug)
  if (!place) notFound()

  const region = getRegion(place.region)
  const regionName = region?.name ?? 'Napa Valley'
  const related = hotels.filter((x) => x.region === place.region && x.slug !== place.slug)
  const cat = categoryLabel[place.category] ?? place.category

  return (
    <div style={{ background: '#0D0B09', color: '#F7F3EC', minHeight: '100vh' }}>
      <Nav />

      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <Image src={place.images[0]} alt={place.name} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
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
            transform: 'rotate(8deg)',
          }}
        >
          {place.region.replace(/-/g, '\n').toUpperCase()}
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

      <section style={{ padding: '60px 60px 48px', maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C4943A',
            marginBottom: 24,
          }}
        >
          {cat} &middot; {place.priceRange} &middot; {regionName}
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(48px, 7vw, 88px)',
            color: '#F7F3EC',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: 16,
          }}
        >
          {place.name}
        </h1>
        {place.address && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#9B9283', marginBottom: 36 }}>
            {place.address}
          </p>
        )}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {place.website ? (
            <a href={place.website} target="_blank" rel="noopener noreferrer" style={primaryCTA}>Book your stay</a>
          ) : null}
          <Link href="#story" style={ghostCTA}>Read more</Link>
        </div>
      </section>

      <section style={{ padding: '0 60px' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
          <Image src={place.images[1 % place.images.length]} alt="" fill sizes="calc(100vw - 120px)" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      <section id="story" style={{ padding: '80px 60px', maxWidth: 860, margin: '0 auto' }}>
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
          {place.excerpt}
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, color: 'rgba(247,243,236,0.65)', lineHeight: 1.9 }}>
          {place.description}
        </p>
      </section>

      <section style={{ padding: '0 60px' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
          <Image src={place.images[2 % place.images.length]} alt="" fill sizes="calc(100vw - 120px)" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      <section style={{ padding: '80px 60px', maxWidth: 860, margin: '0 auto' }}>
        <div style={{ borderTop: '1px solid rgba(247,243,236,0.08)', paddingTop: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          <div><p style={infoLabel}>Category</p><p style={infoValue}>{cat}</p></div>
          <div><p style={infoLabel}>Price range</p><p style={infoValue}>{place.priceRange}</p></div>
          <div><p style={infoLabel}>Location</p><p style={infoValue}>{regionName}</p></div>
          {place.address && <div style={{ gridColumn: '1 / -1' }}><p style={infoLabel}>Address</p><p style={infoValue}>{place.address}</p></div>}
        </div>
        <div style={{ marginTop: 48, display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {place.website ? (
            <a href={place.website} target="_blank" rel="noopener noreferrer" style={primaryCTA}>Book your stay</a>
          ) : null}
          <Link href="/map" style={ghostCTA}>Explore the map &rarr;</Link>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ padding: '0 0 100px', borderTop: '1px solid rgba(247,243,236,0.06)' }}>
          <div style={{ padding: '60px 60px 40px' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px, 3vw, 40px)', color: '#F7F3EC' }}>
              More from {regionName}
            </h2>
          </div>
          <HorizontalStrip entries={related.map((item) => ({ type: 'stay' as const, item }))} />
        </section>
      )}

      <Footer />
    </div>
  )
}
