import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import { getRegion, getAllRegionSlugs, regions } from '@/data/regions'
import { wineries } from '@/data/wineries'
import { restaurants } from '@/data/restaurants'
import { hotels } from '@/data/hotels'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllRegionSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const region = getRegion(slug)
  if (!region) return {}
  return {
    title: `${region.name} — ${region.tagline}`,
    description: region.intro,
    openGraph: { images: [region.heroImage] },
  }
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params
  const region = getRegion(slug)
  if (!region) notFound()

  // Pull related content
  const regionWineries = wineries.filter((w) => region.winerySlugs.includes(w.slug))
  const regionRestaurants = restaurants.filter((r) => region.restaurantSlugs.includes(r.slug))
  const regionHotels = hotels.filter((h) => region.hotelSlugs.includes(h.slug))
  const neighborRegions = regions.filter((r) => region.neighborRegions.includes(r.slug))

  return (
    <div className="grain">
      <Nav />

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${region.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
          }}
        />
        {/* Warm gradient fade */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(250,247,242,0.05) 0%, rgba(250,247,242,0.1) 35%, rgba(250,247,242,0.82) 72%, var(--ivory) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(250,247,242,0.45) 0%, transparent 65%)',
          }}
        />

        <div
          className="container"
          style={{ position: 'relative', zIndex: 2, paddingBottom: '5rem', paddingTop: '140px' }}
        >
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Link
              href="/regions"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--ink-light)',
                textDecoration: 'none',
              }}
            >
              All Regions
            </Link>
            <span style={{ color: 'var(--ink-light)', fontSize: '0.75rem' }}>→</span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: region.accentColor,
              }}
            >
              {region.name}
            </span>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: region.accentColor,
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            Napa Valley Appellation
          </span>
          <h1 className="display-xl" style={{ color: 'var(--ink)', marginBottom: '0.5rem' }}>
            {region.name}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              fontStyle: 'italic',
              color: region.accentColor,
              marginBottom: '2rem',
            }}
          >
            {region.tagline}
          </p>

          {/* Best for tags */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {region.bestFor.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  color: 'var(--ink-mid)',
                  background: 'rgba(250,247,242,0.85)',
                  padding: '0.3rem 0.75rem',
                  border: '1px solid var(--ivory-deep)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL BODY ── */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--ivory)' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 2fr',
            gap: '6rem',
            alignItems: 'start',
          }}
        >
          {/* Main text */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
                fontWeight: 300,
                lineHeight: 1.65,
                color: 'var(--ink)',
                marginBottom: '2rem',
              }}
            >
              {region.intro}
            </p>
            <span className="rule" style={{ background: region.accentColor, opacity: 0.5 }} />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.9,
                color: 'var(--ink-mid)',
              }}
            >
              {region.body}
            </p>
          </div>

          {/* Sidebar */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              position: 'sticky',
              top: '100px',
            }}
          >
            {/* Terroir callout */}
            <div
              style={{
                background: 'var(--ivory-warm)',
                border: `1px solid ${region.accentColor}30`,
                borderLeft: `3px solid ${region.accentColor}`,
                padding: '1.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: region.accentColor,
                  display: 'block',
                  marginBottom: '0.75rem',
                }}
              >
                The Soil
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: 'var(--ink)',
                  lineHeight: 1.65,
                }}
              >
                {region.soilNote}
              </p>
            </div>

            {/* Quick stats */}
            <div
              style={{
                background: 'var(--ivory-warm)',
                border: '1px solid var(--ivory-deep)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-light)',
                  display: 'block',
                }}
              >
                At a Glance
              </span>
              {[
                { label: 'Wineries', value: regionWineries.length || 'Multiple' },
                { label: 'Key Varietals', value: region.slug === 'calistoga' ? 'Cab, Sparkling' : region.slug === 'yountville' ? 'Cab, Chard' : 'Cabernet Sauvignon' },
                { label: 'Best Season', value: region.slug === 'calistoga' ? 'Fall harvest' : 'Spring & Fall' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--ink-light)' }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--ink)', fontWeight: 400 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Map CTA */}
            <Link
              href={`/map?region=${region.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: region.accentColor,
                padding: '1.25rem 1.5rem',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(250,247,242,0.65)',
                    display: 'block',
                    marginBottom: '3px',
                  }}
                >
                  Interactive Map
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    color: 'var(--ivory)',
                  }}
                >
                  Explore {region.name} on the map
                </span>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(250,247,242,0.7)" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WINERIES ── */}
      {regionWineries.length > 0 && (
        <section style={{ padding: 'var(--section-pad) 0', background: 'var(--ivory-warm)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <div>
                <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>Wineries</span>
                <h2 className="display-md" style={{ color: 'var(--ink)' }}>
                  The estates of{' '}
                  <em style={{ color: region.accentColor, fontStyle: 'italic' }}>{region.name}</em>
                </h2>
              </div>
              <Link href="/wineries" className="btn-ghost">All wineries →</Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(regionWineries.length, 3)}, 1fr)`,
                gap: '2rem',
              }}
            >
              {regionWineries.map((winery) => (
                <Link key={winery.slug} href={`/wineries/${winery.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="card" style={{ overflow: 'hidden' }}>
                    <div
                      style={{
                        aspectRatio: '3/2',
                        background: 'var(--parchment)',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${winery.images[0]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          transition: 'transform 0.6s ease',
                        }}
                        className="card-img"
                      />
                      {winery.rating && (
                        <div
                          className="rating-badge"
                          style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
                        >
                          {winery.rating}
                          <span style={{ fontSize: '0.6rem', opacity: 0.7, marginLeft: '2px' }}>pts</span>
                        </div>
                      )}
                      {winery.sponsorTier === 'featured' || winery.sponsorTier === 'presenting' ? (
                        <div
                          style={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                            background: 'var(--gold)',
                            color: 'var(--ivory)',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.55rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            padding: '0.2rem 0.5rem',
                          }}
                        >
                          Featured Partner
                        </div>
                      ) : null}
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <h3 className="display-sm" style={{ color: 'var(--ink)', marginBottom: '0.5rem' }}>
                        {winery.name}
                      </h3>
                      <p className="caption" style={{ lineHeight: 1.7, marginBottom: '1rem' }}>
                        {winery.excerpt}
                      </p>
                      {winery.visitInfo?.appointment !== undefined && (
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.62rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: winery.visitInfo.appointment ? 'var(--terracotta)' : 'var(--sage)',
                          }}
                        >
                          {winery.visitInfo.appointment ? 'By appointment' : 'Walk-ins welcome'}
                        </span>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
          <style>{`.card:hover .card-img { transform: scale(1.04); }`}</style>
        </section>
      )}

      {/* ── RESTAURANTS ── */}
      {regionRestaurants.length > 0 && (
        <section style={{ padding: 'var(--section-pad) 0', background: 'var(--ivory)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <div>
                <span className="eyebrow" style={{ color: 'var(--terracotta)', display: 'block', marginBottom: '0.75rem' }}>
                  Where to Eat
                </span>
                <h2 className="display-md" style={{ color: 'var(--ink)' }}>
                  Dining in{' '}
                  <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>{region.name}</em>
                </h2>
              </div>
              <Link href="/dining" className="btn-ghost">All restaurants →</Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(regionRestaurants.length, 3)}, 1fr)`,
                gap: '2rem',
              }}
            >
              {regionRestaurants.map((restaurant) => (
                <Link key={restaurant.slug} href={`/dining/${restaurant.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="card" style={{ overflow: 'hidden' }}>
                    <div
                      style={{
                        aspectRatio: '3/2',
                        background: 'var(--parchment)',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${restaurant.images[0]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          transition: 'transform 0.6s ease',
                        }}
                        className="card-img"
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          background: 'var(--ivory)',
                          padding: '0.2rem 0.55rem',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.6rem',
                          letterSpacing: '0.08em',
                          color: 'var(--ink-mid)',
                        }}
                      >
                        {restaurant.priceRange}
                      </div>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.62rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--terracotta)',
                          display: 'block',
                          marginBottom: '0.3rem',
                        }}
                      >
                        {restaurant.cuisine}
                      </span>
                      <h3 className="display-sm" style={{ color: 'var(--ink)', marginBottom: '0.5rem' }}>
                        {restaurant.name}
                      </h3>
                      <p className="caption" style={{ lineHeight: 1.7 }}>
                        {restaurant.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── HOTELS ── */}
      {regionHotels.length > 0 && (
        <section style={{ padding: 'var(--section-pad) 0', background: 'var(--parchment)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <div>
                <span className="eyebrow" style={{ color: 'var(--gold)', display: 'block', marginBottom: '0.75rem' }}>
                  Where to Stay
                </span>
                <h2 className="display-md" style={{ color: 'var(--ink)' }}>
                  Hotels in{' '}
                  <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{region.name}</em>
                </h2>
              </div>
              <Link href="/stay" className="btn-ghost">All hotels →</Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(regionHotels.length, 3)}, 1fr)`,
                gap: '2rem',
              }}
            >
              {regionHotels.map((hotel) => (
                <Link key={hotel.slug} href={`/stay/${hotel.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="card" style={{ overflow: 'hidden' }}>
                    <div
                      style={{
                        aspectRatio: '2/3',
                        background: 'var(--parchment)',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${hotel.images[0]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          transition: 'transform 0.6s ease',
                        }}
                        className="card-img"
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0, left: 0, right: 0,
                          padding: '1.25rem 1rem',
                          background: 'linear-gradient(to top, rgba(28,22,18,0.55), transparent)',
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'rgba(250,247,242,0.85)' }}>
                          {hotel.priceRange}<span style={{ opacity: 0.6 }}>/night</span>
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.62rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--gold)',
                          display: 'block',
                          marginBottom: '0.3rem',
                        }}
                      >
                        {hotel.category}
                      </span>
                      <h3 className="display-sm" style={{ color: 'var(--ink)', marginBottom: '0.5rem' }}>
                        {hotel.name}
                      </h3>
                      <p className="caption" style={{ lineHeight: 1.7 }}>
                        {hotel.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEIGHBOR REGIONS ── */}
      {neighborRegions.length > 0 && (
        <section style={{ padding: '4rem 0', background: 'var(--ivory)', borderTop: '1px solid var(--ivory-deep)' }}>
          <div className="container">
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1.5rem' }}>
              Nearby Appellations
            </span>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {neighborRegions.map((neighbor) => (
                <Link
                  key={neighbor.slug}
                  href={`/regions/${neighbor.slug}`}
                  className="neighbor-region-link"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    padding: '1rem 1.75rem',
                    background: 'var(--ivory-warm)',
                    border: '1px solid var(--ivory-deep)',
                    transition: 'border-color 0.25s, color 0.25s',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    minWidth: '180px',
                    ['--hover-accent' as string]: neighbor.accentColor,
                  }}
                >
                  {neighbor.name}
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--ink-light)', fontStyle: 'normal' }}>
                    {neighbor.tagline}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER NAV ── */}
      <section style={{ background: 'var(--bordeaux)', padding: '3rem 0' }}>
        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(250,247,242,0.7)' }}>
              Continue exploring Napa Valley
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/map" style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.6)', textDecoration: 'none' }}>
              Open Map
            </Link>
            <Link href="/plan" style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.6)', textDecoration: 'none' }}>
              Plan Visit
            </Link>
            <Link href="/dining" style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.6)', textDecoration: 'none' }}>
              Dining
            </Link>
            <Link href="/stay" style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.6)', textDecoration: 'none' }}>
              Stay
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
