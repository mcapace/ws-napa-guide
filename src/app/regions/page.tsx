import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { sortRegionsSouthToNorth } from '@/data/region-order'
import { regions } from '@/data/regions'
import styles from './regions.module.css'

export const metadata: Metadata = {
  title: 'Towns & Areas',
  description:
    'Explore Napa Valley town and area guides — from downtown Napa to Calistoga, with taste, dine, and stay listings from Wine Spectator.',
}

const guideRegions = sortRegionsSouthToNorth(regions)

export default function RegionsPage() {
  return (
    <div className="grain">

      {/* Page header */}
      <section
        style={{
          paddingTop: 'clamp(112px, 14vh, 144px)',
          paddingBottom: '3.5rem',
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
            Towns &amp; <em style={{ fontStyle: 'italic' }}>areas</em>
          </h1>
          <span className="rule" style={{ background: 'rgba(247,243,236,0.15)', margin: '1.5rem 0' }} />
        </div>
      </section>

      {/* Regions list — alternating layout on dark */}
      {guideRegions.map((region, i) => (
        <ScrollReveal key={region.slug}>
        <section
          style={{
            padding: 'var(--section-pad) 0',
            borderBottom: '1px solid rgba(247,243,236,0.06)',
          }}
        >
          <div
            className={`container ${styles.regionGrid}${i % 2 !== 0 ? ` ${styles.regionGridAlt}` : ''}`}
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
                    style={{ backgroundImage: `url(${region.heroImage})` }}
                    className={styles.regionImg}
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
              <span className={styles.appellationEyebrow}>
                Appellation 0{i + 1}
              </span>
              <h2 className="display-lg" style={{ color: 'var(--cream)', marginBottom: '0.25rem' }}>
                {region.name}
              </h2>
              <p className={styles.tagline}>
                {region.tagline}
              </p>
              <span className="rule" style={{ background: 'var(--gold)', opacity: 0.55 }} />
              <p className={styles.intro}>
                {region.intro}
              </p>

              {/* Best for tags */}
              <div className={styles.tagList}>
                {region.bestFor.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link href={`/regions/${region.slug}`} className="btn-primary">
                  Explore {region.name}
                </Link>
                <Link href={`/explore?ava=${region.slug}`} className="btn-ghost">
                  View on map &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>
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
          <p className={`${styles.pageIntro} ${styles.pageIntroCentered}`}>
            Tell us your dates, interests, and how many days you have — our planner will
            build a day-by-day Napa itinerary from the guide.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/plan" className="btn-primary">Build My Itinerary</Link>
            <Link href="/explore" className="btn-secondary">Open the Map</Link>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />

    </div>
  )
}
