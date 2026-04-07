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
  const bodyParagraphs = winery.description.split('\n\n').filter(Boolean)

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Nav />

      {/* ── 1. HERO with title overlaid ── */}
      <section style={{ position: 'relative', height: '60vh', minHeight: 420, overflow: 'hidden' }}>
        <Image src={winery.images[0]} alt={winery.name} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 48, left: 0, right: 0,
          textAlign: 'center', padding: '0 24px',
        }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(40px, 6vw, 80px)',
            color: '#F7F3EC', lineHeight: 1,
            letterSpacing: '-0.02em', margin: 0,
            textShadow: '0 2px 24px rgba(0,0,0,0.3)',
          }}>
            {winery.name}
          </h1>
        </div>
      </section>

      {/* ── 2. METADATA + CTAs ── */}
      <section style={{
        textAlign: 'center', padding: '24px 24px 28px',
        borderBottom: '1px solid #E8E4DE',
        background: '#FFFFFF',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          color: '#999', margin: '0 0 4px',
        }}>
          {regionName} · Napa Valley
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 10,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: '#999', margin: '0 0 18px',
        }}>
          {winery.address}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          {winery.visitInfo?.website && (
            <a href={winery.visitInfo.website} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: '#FFFFFF', background: '#0D0B09', padding: '12px 24px',
              textDecoration: 'none',
            }}>
              Reserve a Visit
            </a>
          )}
          <Link href="#story" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: '#0D0B09', border: '1px solid #CCC', padding: '12px 24px',
            textDecoration: 'none',
          }}>
            Read More
          </Link>
        </div>
      </section>

      {/* ── 3. PULL QUOTE ── */}
      <section style={{
        padding: '72px clamp(24px, 8vw, 140px)',
        background: '#FFFFFF',
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(24px, 3vw, 36px)',
          color: '#0D0B09', lineHeight: 1.5,
          margin: 0, maxWidth: 860,
          marginLeft: 'auto', marginRight: 'auto',
        }}>
          {winery.excerpt}
        </p>
      </section>

      {/* ── 4. BODY — text + photos ── */}
      <section id="story" style={{
        padding: '0 clamp(24px, 6vw, 100px) 64px',
        background: '#FFFFFF', maxWidth: 1100,
        marginLeft: 'auto', marginRight: 'auto',
      }}>
        {/* Text left, photo right */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 40, marginBottom: 48, alignItems: 'start',
        }}>
          <div>
            {bodyParagraphs.map((para, i) => (
              <p key={i} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, fontWeight: 300,
                color: 'rgba(13,11,9,0.65)', lineHeight: 1.85,
                marginBottom: 22,
              }}>
                {para}
              </p>
            ))}
          </div>
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
            <Image src={winery.images[1 % winery.images.length]} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>

        {/* Photo left, info + CTAs right */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 40, marginBottom: 48, alignItems: 'start',
        }}>
          <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
            <Image src={winery.images[2 % winery.images.length]} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
              {winery.visitInfo?.appointment !== undefined && (
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4943A', marginBottom: 6 }}>Visits</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(0,0,0,0.5)' }}>{winery.visitInfo.appointment ? 'By appointment' : 'Walk-ins welcome'}</p>
                </div>
              )}
              {winery.address && (
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4943A', marginBottom: 6 }}>Address</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(0,0,0,0.5)' }}>{winery.address}</p>
                </div>
              )}
              {winery.visitInfo?.website && (
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4943A', marginBottom: 6 }}>Website</p>
                  <a href={winery.visitInfo.website} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: '#6B1C2A', textDecoration: 'none' }}>Visit site &nearr;</a>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {winery.visitInfo?.website && (
                <a href={winery.visitInfo.website} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  color: '#FFFFFF', background: '#0D0B09', padding: '13px 24px',
                  textDecoration: 'none',
                }}>
                  Reserve a Visit
                </a>
              )}
              <Link href={`/map?region=${winery.region}`} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                color: '#0D0B09', border: '1px solid #CCC', padding: '13px 24px',
                textDecoration: 'none',
              }}>
                Explore the Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. MORE FROM REGION — light gray listing rows ── */}
      {related.length > 0 && (
        <section style={{ background: '#F5F3EE', padding: '56px clamp(24px, 5vw, 80px)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: '#999', margin: '0 0 8px',
            }}>
              ◆ More from {regionName}
            </p>

            {related.slice(0, 8).map((w) => (
              <div key={w.slug} style={{
                display: 'grid',
                gridTemplateColumns: '120px 200px 1fr auto',
                gap: 24, alignItems: 'center',
                padding: '22px 0',
                borderBottom: '1px solid #DEDAD4',
              }}>
                {/* Thumbnail */}
                <div style={{ position: 'relative', width: 120, height: 80, overflow: 'hidden' }}>
                  <Image src={w.images[0]} alt={w.name} fill sizes="120px" style={{ objectFit: 'cover' }} />
                </div>
                {/* Name + location */}
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: 'italic', fontWeight: 400, color: '#0D0B09', margin: '0 0 3px', lineHeight: 1.2 }}>
                    {w.name}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#999', margin: 0 }}>
                    {w.address}
                  </p>
                </div>
                {/* Excerpt */}
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.55,
                  color: '#777', margin: 0, overflow: 'hidden',
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                }}>
                  {w.excerpt}
                </p>
                {/* CTAs */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link href={`/wineries/${w.slug}`} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    color: '#0D0B09', background: '#F7F3EC', padding: '10px 16px',
                    textDecoration: 'none', border: '1px solid #0D0B09',
                  }}>
                    Reserve
                  </Link>
                  <Link href={`/wineries/${w.slug}`} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    color: '#0D0B09', padding: '10px 16px',
                    textDecoration: 'none', border: '1px solid #CCC',
                  }}>
                    Read More
                  </Link>
                </div>
              </div>
            ))}

            {related.length > 8 && (
              <div style={{ textAlign: 'center', marginTop: 28 }}>
                <Link href={`/regions/${winery.region}`} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  color: '#0D0B09', border: '1px solid #0D0B09', padding: '14px 36px',
                  textDecoration: 'none',
                }}>
                  Show More
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 6. NEWSLETTER + FOOTER ── */}
      <Newsletter />
      <Footer />
    </div>
  )
}
