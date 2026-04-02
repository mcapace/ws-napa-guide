import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import { regions } from '@/data/regions'

export const metadata: Metadata = {
  title: 'Regions',
  description: 'Explore all six Napa Valley appellations — from Oakville\'s Cabernet heartland to Calistoga\'s volcanic north.',
}

export default function RegionsPage() {
  return (
    <div className="grain">
      <Nav />

      {/* Page header */}
      <section
        style={{
          background: 'var(--bordeaux)',
          paddingTop: '140px',
          paddingBottom: '5rem',
        }}
      >
        <div className="container">
          <span
            className="eyebrow"
            style={{ color: 'rgba(250,247,242,0.5)', display: 'block', marginBottom: '1rem' }}
          >
            Wine Spectator — Napa Valley Guide
          </span>
          <h1 className="display-xl" style={{ color: 'var(--ivory)', maxWidth: '16ch' }}>
            Six <em style={{ fontStyle: 'italic' }}>distinct</em> appellations
          </h1>
          <span className="rule" style={{ background: 'rgba(250,247,242,0.3)', margin: '1.5rem 0' }} />
          <p className="body-lg" style={{ color: 'rgba(250,247,242,0.65)', maxWidth: '55ch' }}>
            Each of Napa Valley&apos;s six principal growing regions has a distinct character shaped by
            soil, elevation, and climate. Understanding their differences is understanding Napa itself.
          </p>
        </div>
      </section>

      {/* Regions list — alternating layout */}
      {regions.map((region, i) => (
        <section
          key={region.slug}
          style={{
            background: i % 2 === 0 ? 'var(--ivory)' : 'var(--ivory-warm)',
            padding: 'var(--section-pad) 0',
            borderBottom: '1px solid var(--ivory-deep)',
          }}
        >
          <div
            className="container"
            style={{
              display: 'grid',
              gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
              gap: '5rem',
              alignItems: 'center',
              direction: i % 2 !== 0 ? 'rtl' : 'ltr',
            }}
          >
            {/* Image */}
            <div style={{ direction: 'ltr' }}>
              <Link href={`/regions/${region.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  style={{
                    aspectRatio: '4/3',
                    background: 'var(--parchment)',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 16px 48px rgba(28,22,18,0.1)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${region.heroImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.6s ease',
                    }}
                    className="region-img"
                  />
                  {/* Number overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1.5rem',
                      left: '1.5rem',
                      fontFamily: 'var(--font-display)',
                      fontSize: '4rem',
                      fontWeight: 300,
                      color: 'rgba(250,247,242,0.25)',
                      lineHeight: 1,
                    }}
                  >
                    0{i + 1}
                  </div>
                </div>
              </Link>
            </div>

            {/* Text */}
            <div style={{ direction: 'ltr' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: region.accentColor,
                  display: 'block',
                  marginBottom: '0.75rem',
                }}
              >
                Appellation 0{i + 1}
              </span>
              <h2 className="display-lg" style={{ color: 'var(--ink)', marginBottom: '0.25rem' }}>
                {region.name}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontStyle: 'italic',
                  color: region.accentColor,
                  marginBottom: '1.5rem',
                }}
              >
                {region.tagline}
              </p>
              <span className="rule" style={{ background: region.accentColor, opacity: 0.5 }} />
              <p className="body-lg" style={{ marginBottom: '1.5rem' }}>
                {region.intro}
              </p>

              {/* Best for tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {region.bestFor.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      color: 'var(--ink-mid)',
                      background: 'var(--ivory-deep)',
                      padding: '0.3rem 0.75rem',
                      border: '1px solid var(--parchment)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link href={`/regions/${region.slug}`} className="btn-primary">
                  Explore {region.name}
                </Link>
                <Link
                  href={`/map?region=${region.slug}`}
                  className="btn-ghost"
                  style={{ color: region.accentColor }}
                >
                  View on map →
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer CTA */}
      <section style={{ background: 'var(--parchment)', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>
            Ready to plan?
          </span>
          <h2 className="display-lg" style={{ color: 'var(--ink)', marginBottom: '1.5rem' }}>
            Build your <em style={{ color: 'var(--bordeaux)', fontStyle: 'italic' }}>perfect itinerary</em>
          </h2>
          <p className="body-lg" style={{ maxWidth: '50ch', margin: '0 auto 2.5rem' }}>
            Tell us your dates, interests, and how many days you have — our planner will
            build a day-by-day Napa itinerary from the guide.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/plan" className="btn-primary">Build My Itinerary</Link>
            <Link href="/map" className="btn-secondary">Open the Map</Link>
          </div>
        </div>
      </section>

      <style>{`
        .region-img:hover { transform: scale(1.04); }
      `}</style>
    </div>
  )
}
