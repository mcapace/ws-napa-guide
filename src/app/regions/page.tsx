import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import { regions } from '@/data/regions'

export const metadata: Metadata = {
  title: 'Regions',
  description: 'Explore all seven Napa Valley appellations — from Oakville\'s Cabernet heartland to Calistoga\'s volcanic north.',
}

export default function RegionsPage() {
  return (
    <div className="grain">
      <Nav />

      {/* Page header */}
      <section
        style={{
          paddingTop: '160px',
          paddingBottom: '5rem',
          borderBottom: '1px solid rgba(247,243,236,0.06)',
        }}
      >
        <div className="container">
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.62rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Wine Spectator — Napa Valley Guide
          </span>
          <h1 className="display-xl" style={{ color: 'var(--cream)', maxWidth: '16ch' }}>
            Seven <em style={{ fontStyle: 'italic' }}>distinct</em> appellations
          </h1>
          <span className="rule" style={{ background: 'rgba(247,243,236,0.15)', margin: '1.5rem 0' }} />
          <p className="body-lg" style={{ maxWidth: '55ch' }}>
            Each of Napa Valley&apos;s principal growing regions has a distinct character shaped by
            soil, elevation, and climate. Understanding their differences is understanding Napa itself.
          </p>
        </div>
      </section>

      {/* Regions list — alternating layout on dark */}
      {regions.map((region, i) => (
        <section
          key={region.slug}
          style={{
            padding: 'var(--section-pad) 0',
            borderBottom: '1px solid rgba(247,243,236,0.06)',
          }}
        >
          <div
            className="container"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
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
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${region.heroImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
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
                      color: 'rgba(247,243,236,0.15)',
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
              <h2 className="display-lg" style={{ color: 'var(--cream)', marginBottom: '0.25rem' }}>
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
              <span className="rule" style={{ background: region.accentColor, opacity: 0.4 }} />
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 300,
                  lineHeight: 1.85,
                  color: 'rgba(247,243,236,0.55)',
                  marginBottom: '1.5rem',
                }}
              >
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
                      color: 'rgba(247,243,236,0.4)',
                      background: 'rgba(247,243,236,0.04)',
                      padding: '0.3rem 0.75rem',
                      border: '1px solid rgba(247,243,236,0.08)',
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
                  style={{ color: region.accentColor, borderColor: region.accentColor }}
                >
                  View on map &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer CTA */}
      <section
        style={{
          background: 'var(--ink-mid)',
          padding: '5rem 0',
          textAlign: 'center',
          borderTop: '1px solid rgba(247,243,236,0.06)',
        }}
      >
        <div className="container">
          <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>
            Ready to plan?
          </span>
          <h2 className="display-lg" style={{ color: 'var(--cream)', marginBottom: '1.5rem' }}>
            Build your <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>perfect itinerary</em>
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

      <Footer />

      <style>{`
        .region-img:hover { transform: scale(1.04); }
        @media (max-width: 768px) {
          .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  )
}
