import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import { HorizontalStrip } from '@/components/ui/HorizontalStrip'
import Newsletter from '@/components/ui/Newsletter'
import { restaurants } from '@/data/restaurants'
import { getRegion } from '@/data/regions'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return restaurants.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const r = restaurants.find((x) => x.slug === slug)
  if (!r) return {}
  return { title: `${r.name} — Napa Valley Dining`, description: r.excerpt, openGraph: { images: r.images } }
}

export default async function RestaurantDetailPage({ params }: Props) {
  const { slug } = await params
  const venue = restaurants.find((x) => x.slug === slug)
  if (!venue) notFound()

  const region = getRegion(venue.region)
  const regionName = region?.name ?? 'Napa Valley'
  const related = restaurants.filter((x) => x.region === venue.region && x.slug !== venue.slug)
  const reserveHref = venue.reservations ?? venue.website ?? '#'
  const bodyParagraphs = venue.description.split('\n\n').filter(Boolean)

  return (
    <div style={{ minHeight: '100vh' }}>
      <Nav />

      {/* ── DARK: hero + title + lede ── */}
      <div style={{ background: '#0D0B09', color: '#F7F3EC' }}>
        <section style={{ position: 'relative', height: '60vh', minHeight: 400, overflow: 'hidden' }}>
          <Image src={venue.images[0]} alt={venue.name} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom, transparent, #0D0B09)' }} />
        </section>

        <section style={{ padding: '48px 60px 32px', maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C4943A', marginBottom: 20 }}>
            {venue.cuisine} &middot; {venue.priceRange} &middot; {regionName}
          </p>
          <h1 data-text-split="" data-letters-rotate-in="" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(48px, 7vw, 88px)', color: '#F7F3EC', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 12 }}>
            {venue.name}
          </h1>
          {venue.address && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#9B9283', marginBottom: 28 }}>{venue.address}</p>
          )}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            {(venue.reservations || venue.website) && (
              <a href={reserveHref} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0D0B09', background: '#F7F3EC', padding: '12px 24px', textDecoration: 'none' }}>
                Make a reservation
              </a>
            )}
            <Link href="#story" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9B9283', textDecoration: 'none', padding: '12px 24px', border: '1px solid rgba(247,243,236,0.2)' }}>
              Read more
            </Link>
          </div>
        </section>

        <section style={{ padding: '0 60px 60px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p data-text-split="" data-lines-slide-up="" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px, 3.5vw, 40px)', color: 'rgba(247,243,236,0.9)', lineHeight: 1.3 }}>
            {venue.excerpt}
          </p>
        </section>
      </div>

      {/* ── LIGHT: editorial body with images ── */}
      <div id="story" style={{ background: '#F7F3EC', color: '#0D0B09' }}>
        <section style={{ padding: '80px 60px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              {bodyParagraphs.map((para, i) => (
                <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(13,11,9,0.7)', lineHeight: 1.9, marginBottom: 24 }}>{para}</p>
              ))}
            </div>
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', borderRadius: 2 }}>
              <Image src={venue.images[1 % venue.images.length]} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        <section style={{ padding: '0 60px 60px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 2 }}>
              <Image src={venue.images[2 % venue.images.length]} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <div style={{ borderTop: '1px solid rgba(13,11,9,0.1)', paddingTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4943A', marginBottom: 8 }}>Cuisine</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(13,11,9,0.6)' }}>{venue.cuisine}</p>
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4943A', marginBottom: 8 }}>Price</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(13,11,9,0.6)' }}>{venue.priceRange}</p>
                </div>
                {venue.address && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4943A', marginBottom: 8 }}>Address</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(13,11,9,0.6)' }}>{venue.address}</p>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {(venue.reservations || venue.website) && (
                  <a href={reserveHref} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#F7F3EC', background: '#0D0B09', padding: '12px 24px', textDecoration: 'none' }}>
                    Make a reservation
                  </a>
                )}
                <Link href={`/map?region=${venue.region}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B1C2A', textDecoration: 'none', padding: '12px 24px', border: '1px solid rgba(13,11,9,0.15)' }}>
                  Explore the map &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── DARK: more from region ── */}
      <div style={{ background: '#0D0B09', color: '#F7F3EC' }}>
        {related.length > 0 && (
          <section style={{ padding: '0 0 80px', borderTop: '1px solid rgba(247,243,236,0.06)' }}>
            <div style={{ padding: '60px 60px 40px' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px, 3vw, 40px)', color: '#F7F3EC' }}>More from {regionName}</h2>
            </div>
            <HorizontalStrip entries={related.map((item) => ({ type: 'dining' as const, item }))} />
          </section>
        )}
        <Newsletter />
        <Footer />
      </div>
    </div>
  )
}
