import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
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
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Nav />

      {/* ── 1. HERO ── */}
      <section style={{ position: 'relative', height: '60vh', minHeight: 420, overflow: 'hidden' }}>
        <Image src={venue.images[0]} alt={venue.name} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 48, left: 0, right: 0, textAlign: 'center', padding: '0 24px' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(40px, 6vw, 80px)', color: '#F7F3EC', lineHeight: 1, letterSpacing: '-0.02em', margin: 0, textShadow: '0 2px 24px rgba(0,0,0,0.3)' }}>
            {venue.name}
          </h1>
        </div>
      </section>

      {/* ── 2. METADATA + CTAs ── */}
      <section style={{ textAlign: 'center', padding: '24px 24px 28px', borderBottom: '1px solid #E8E4DE', background: '#FFFFFF' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#999', margin: '0 0 4px' }}>
          {venue.cuisine} · {venue.priceRange} · {regionName}
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999', margin: '0 0 18px' }}>
          {venue.address}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          {(venue.reservations || venue.website) && (
            <a href={reserveHref} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#FFFFFF', background: '#0D0B09', padding: '12px 24px', textDecoration: 'none' }}>
              Make a Reservation
            </a>
          )}
          <Link href="#story" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0D0B09', border: '1px solid #CCC', padding: '12px 24px', textDecoration: 'none' }}>
            Read More
          </Link>
        </div>
      </section>

      {/* ── 3. PULL QUOTE ── */}
      <section style={{ padding: '72px clamp(24px, 8vw, 140px)', background: '#FFFFFF' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px, 3vw, 36px)', color: '#0D0B09', lineHeight: 1.5, margin: 0, maxWidth: 860, marginLeft: 'auto', marginRight: 'auto' }}>
          {venue.excerpt}
        </p>
      </section>

      {/* ── 4. BODY ── */}
      <section id="story" style={{ padding: '0 clamp(24px, 6vw, 100px) 64px', background: '#FFFFFF', maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 48, alignItems: 'start' }}>
          <div>
            {bodyParagraphs.map((para, i) => (
              <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(13,11,9,0.65)', lineHeight: 1.85, marginBottom: 22 }}>{para}</p>
            ))}
          </div>
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
            <Image src={venue.images[1 % venue.images.length]} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 48, alignItems: 'start' }}>
          <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
            <Image src={venue.images[2 % venue.images.length]} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4943A', marginBottom: 6 }}>Cuisine</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(0,0,0,0.5)' }}>{venue.cuisine}</p>
              </div>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4943A', marginBottom: 6 }}>Price</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(0,0,0,0.5)' }}>{venue.priceRange}</p>
              </div>
              {venue.address && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4943A', marginBottom: 6 }}>Address</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(0,0,0,0.5)' }}>{venue.address}</p>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {(venue.reservations || venue.website) && (
                <a href={reserveHref} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#FFFFFF', background: '#0D0B09', padding: '13px 24px', textDecoration: 'none' }}>
                  Make a Reservation
                </a>
              )}
              <Link href={`/map?region=${venue.region}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0D0B09', border: '1px solid #CCC', padding: '13px 24px', textDecoration: 'none' }}>
                Explore the Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. MORE FROM REGION ── */}
      {related.length > 0 && (
        <section style={{ background: '#F5F3EE', padding: '56px clamp(24px, 5vw, 80px)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#999', margin: '0 0 8px' }}>
              ◆ More dining in {regionName}
            </p>
            {related.slice(0, 8).map((r) => (
              <div key={r.slug} style={{ display: 'grid', gridTemplateColumns: '120px 200px 1fr auto', gap: 24, alignItems: 'center', padding: '22px 0', borderBottom: '1px solid #DEDAD4' }}>
                <div style={{ position: 'relative', width: 120, height: 80, overflow: 'hidden' }}>
                  <Image src={r.images[0]} alt={r.name} fill sizes="120px" style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: 'italic', fontWeight: 400, color: '#0D0B09', margin: '0 0 3px', lineHeight: 1.2 }}>{r.name}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#999', margin: 0 }}>{r.cuisine} · {r.priceRange}</p>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.55, color: '#777', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{r.excerpt}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link href={`/dining/${r.slug}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0D0B09', background: '#F7F3EC', padding: '10px 16px', textDecoration: 'none', border: '1px solid #0D0B09' }}>Reserve</Link>
                  <Link href={`/dining/${r.slug}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0D0B09', padding: '10px 16px', textDecoration: 'none', border: '1px solid #CCC' }}>Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Newsletter />
      <Footer />
    </div>
  )
}
