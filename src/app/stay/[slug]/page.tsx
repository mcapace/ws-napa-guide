import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import { MarqueeCTA } from '@/components/ui/MarqueeCTA'
import { HorizontalStrip } from '@/components/ui/HorizontalStrip'
import { hotels } from '@/data/hotels'
import { getRegion } from '@/data/regions'
import { ghostCTA, infoLabel, infoValue, primaryCTA } from '@/lib/editorial-styles'

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
  const badgeLines = place.region.replace(/-/g, '\n').toUpperCase()
  const lede = place.excerpt || `${place.description.slice(0, 220)}…`
  const cat = categoryLabel[place.category] ?? place.category

  return (
    <div style={{ background: '#0D0B09', color: '#F7F3EC', minHeight: '100vh' }}>
      <Nav />

      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <Image
          src={place.images[0]}
          alt={place.name}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(13,11,9,0.1) 0%, rgba(13,11,9,0.7) 70%, rgba(13,11,9,0.95) 100%)',
          }}
        />
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
          {badgeLines}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 60px 56px' }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(247,243,236,0.5)',
              marginBottom: 12,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {place.region.replace(/-/g, ' ')} · Napa Valley
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(56px, 9vw, 120px)',
              color: '#F7F3EC',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              marginBottom: 32,
            }}
          >
            {place.name}
          </h1>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            {place.website ? (
              <a href={place.website} target="_blank" rel="noopener noreferrer" style={primaryCTA}>
                Book your stay
              </a>
            ) : null}
            <div style={{ flex: 1, minWidth: 200, maxWidth: 400 }}>
              <MarqueeCTA href="#story" label="read more" />
            </div>
          </div>
        </div>
      </section>

      <section id="story" style={{ padding: '120px 60px 100px', maxWidth: 860, margin: '0 auto' }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(24px, 3vw, 40px)',
            color: '#F7F3EC',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            borderLeft: '2px solid #C4943A',
            paddingLeft: 40,
            marginBottom: 48,
          }}
        >
          {lede}
        </p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          {place.website ? (
            <a href={place.website} target="_blank" rel="noopener noreferrer" style={primaryCTA}>
              Book your stay
            </a>
          ) : null}
          <Link href="/map" style={ghostCTA}>
            Explore the map →
          </Link>
        </div>
      </section>

      <section>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', overflow: 'hidden' }}>
          <Image
            src={place.images[0]}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginTop: 2 }}>
          {[1, 2].map((i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '3/2', overflow: 'hidden' }}>
              <Image
                src={place.images[i % place.images.length]}
                alt=""
                fill
                sizes="50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 60px 120px', maxWidth: 760, margin: '0 auto' }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            fontWeight: 300,
            color: 'rgba(247,243,236,0.75)',
            lineHeight: 1.9,
            marginBottom: 32,
          }}
        >
          {place.description}
        </p>
        <div
          style={{
            borderTop: '1px solid rgba(247,243,236,0.1)',
            paddingTop: 32,
            marginTop: 32,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
          }}
        >
          <div>
            <p style={infoLabel}>Price range</p>
            <p style={infoValue}>{place.priceRange}</p>
          </div>
          <div>
            <p style={infoLabel}>Location</p>
            <p style={infoValue}>{regionName}</p>
          </div>
          <div>
            <p style={infoLabel}>Category</p>
            <p style={infoValue}>{cat}</p>
          </div>
          {place.address && (
            <div style={{ gridColumn: '1 / -1' }}>
              <p style={infoLabel}>Address</p>
              <p style={infoValue}>{place.address}</p>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ padding: '0 0 100px' }}>
          <div style={{ padding: '0 60px', marginBottom: 40 }}>
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
          <HorizontalStrip entries={related.map((item) => ({ type: 'stay' as const, item }))} />
        </section>
      )}

      <Footer />
    </div>
  )
}
