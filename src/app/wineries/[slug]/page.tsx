import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import { HorizontalStrip } from '@/components/ui/HorizontalStrip'
import Newsletter from '@/components/ui/Newsletter'
import { wineries } from '@/data/wineries'
import { getRegion } from '@/data/regions'
import { primaryCTA, ghostCTA, infoLabel, infoValue } from '@/lib/editorial-styles'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return wineries.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const winery = wineries.find((w) => w.slug === slug)
  if (!winery) return {}
  return {
    title: `${winery.name} — Napa Valley Wineries`,
    description: winery.excerpt,
    openGraph: { images: winery.images },
  }
}

export default async function WineryDetailPage({ params }: Props) {
  const { slug } = await params
  const winery = wineries.find((w) => w.slug === slug)
  if (!winery) notFound()

  const region = getRegion(winery.region)
  const regionName = region?.name ?? 'Napa Valley'
  const related = wineries.filter((w) => w.region === winery.region && w.slug !== winery.slug)

  return (
    <div style={{ background: '#0D0B09', color: '#F7F3EC', minHeight: '100vh' }}>
      <Nav />

      {/* ── HERO: clean full-viewport image ── */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <Image src={winery.images[0]} alt={winery.name} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        {/* AVA badge */}
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
          {winery.region.replace(/-/g, '\n').toUpperCase()}
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

      {/* ── TITLE + CTAs: centered below hero (therealhotels pattern) ── */}
      <section style={{ padding: '60px 60px 48px', maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
        <p
          data-text-split=""
          data-lines-slide-up=""
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C4943A',
            marginBottom: 24,
          }}
        >
          {regionName} &middot; Napa Valley
        </p>
        <h1
          data-text-split=""
          data-letters-rotate-in=""
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
          {winery.name}
        </h1>
        {winery.address && (
          <p
            data-text-split=""
            data-lines-slide-up=""
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#9B9283', marginBottom: 36 }}
          >
            {winery.address}
          </p>
        )}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {winery.visitInfo?.website ? (
            <a href={winery.visitInfo.website} target="_blank" rel="noopener noreferrer" style={primaryCTA}>
              Reserve a visit
            </a>
          ) : null}
          <Link href="#story" style={ghostCTA}>
            Read more
          </Link>
        </div>
      </section>

      {/* ── PHOTO: with horizontal padding (therealhotels pattern) ── */}
      <section style={{ padding: '0 60px' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
          <Image src={winery.images[1 % winery.images.length]} alt="" fill sizes="calc(100vw - 120px)" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      {/* ── BODY: excerpt + description ── */}
      <section id="story" style={{ padding: '80px 60px', maxWidth: 860, margin: '0 auto' }}>
        <p
          data-text-split=""
          data-lines-slide-up=""
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
          {winery.excerpt}
        </p>
        <p
          data-text-split=""
          data-lines-slide-up=""
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            fontWeight: 300,
            color: 'rgba(247,243,236,0.65)',
            lineHeight: 1.9,
          }}
        >
          {winery.description}
        </p>
      </section>

      {/* ── PHOTO ── */}
      <section style={{ padding: '0 60px' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
          <Image src={winery.images[2 % winery.images.length]} alt="" fill sizes="calc(100vw - 120px)" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      {/* ── INFO ── */}
      <section style={{ padding: '80px 60px', maxWidth: 860, margin: '0 auto' }}>
        <div
          style={{
            borderTop: '1px solid rgba(247,243,236,0.08)',
            paddingTop: 40,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
          }}
        >
          {winery.visitInfo?.appointment !== undefined && (
            <div>
              <p style={infoLabel}>Visits</p>
              <p style={infoValue}>{winery.visitInfo.appointment ? 'By appointment' : 'Walk-ins welcome'}</p>
            </div>
          )}
          {winery.address && (
            <div>
              <p style={infoLabel}>Address</p>
              <p style={infoValue}>{winery.address}</p>
            </div>
          )}
          {winery.visitInfo?.website && (
            <div>
              <p style={infoLabel}>Website</p>
              <a
                href={winery.visitInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...infoValue, color: '#C4943A', textDecoration: 'none' }}
              >
                Visit site &nearr;
              </a>
            </div>
          )}
        </div>
        <div style={{ marginTop: 48, display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {winery.visitInfo?.website ? (
            <a href={winery.visitInfo.website} target="_blank" rel="noopener noreferrer" style={primaryCTA}>
              Reserve a visit
            </a>
          ) : null}
          <Link href="/map" style={ghostCTA}>
            Explore the map &rarr;
          </Link>
        </div>
      </section>

      {/* ── MORE FROM REGION ── */}
      {related.length > 0 && (
        <section style={{ padding: '0 0 100px', borderTop: '1px solid rgba(247,243,236,0.06)' }}>
          <div style={{ padding: '60px 60px 40px' }}>
            <h2
              data-text-split=""
              data-letters-rotate-in=""
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
          <HorizontalStrip entries={related.map((item) => ({ type: 'winery' as const, item }))} />
        </section>
      )}

      <Newsletter />
      <Footer />
    </div>
  )
}
