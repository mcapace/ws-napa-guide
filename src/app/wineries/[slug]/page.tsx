import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import { MarqueeCTA } from '@/components/ui/MarqueeCTA'
import { HorizontalStrip } from '@/components/ui/HorizontalStrip'
import { wineries } from '@/data/wineries'
import { getRegion } from '@/data/regions'
import { ghostCTA, infoLabel, infoValue, primaryCTA } from '@/lib/editorial-styles'
import { TEST_IMAGES } from '@/lib/test-images'

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
  const relatedWineries = wineries.filter((w) => w.region === winery.region && w.slug !== winery.slug)
  const slugIndex = wineries.findIndex((w) => w.slug === slug)
  const badgeLines = winery.region.replace(/-/g, '\n').toUpperCase()
  const lede = winery.excerpt || `${winery.description.slice(0, 220)}…`

  return (
    <div style={{ background: '#0D0B09', color: '#F7F3EC', minHeight: '100vh' }}>
      <Nav />

      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <Image
          src={winery.images[0]}
          alt={winery.name}
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
            {winery.region.replace(/-/g, ' ')} · Napa Valley
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
            {winery.name}
          </h1>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            {winery.visitInfo?.website ? (
              <a
                href={winery.visitInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                style={primaryCTA}
              >
                Reserve a visit
              </a>
            ) : null}
            <div style={{ flex: 1, minWidth: 200, maxWidth: 400 }}>
              <MarqueeCTA href="#story" label="read more" />
            </div>
          </div>
        </div>
      </section>

      <section id="story" style={{ padding: '100px 60px 80px', maxWidth: 860, margin: '0 auto' }}>
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
          {winery.visitInfo?.website ? (
            <a
              href={winery.visitInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              style={primaryCTA}
            >
              Reserve a visit
            </a>
          ) : null}
          <Link href="/map" style={ghostCTA}>
            Explore the map →
          </Link>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
            <Image
              src={TEST_IMAGES[(slugIndex + i) % TEST_IMAGES.length]}
              alt=""
              fill
              sizes="33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </section>

      <section style={{ padding: '80px 60px', maxWidth: 760, margin: '0 auto' }}>
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
          {winery.description}
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
                Visit site ↗
              </a>
            </div>
          )}
        </div>
      </section>

      {relatedWineries.length > 0 && (
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
          <HorizontalStrip entries={relatedWineries.map((item) => ({ type: 'winery' as const, item }))} />
        </section>
      )}

      <Footer />
    </div>
  )
}
