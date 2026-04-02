import Nav from '@/components/ui/Nav'
import Link from 'next/link'
import { featuredArticles } from '@/data/articles'
import { featuredWineries } from '@/data/wineries'
import { featuredRestaurants } from '@/data/restaurants'
import { featuredHotels } from '@/data/hotels'
import { getPresentingSponsor } from '@/data/sponsors'
import SponsorBlock from '@/components/sponsor/SponsorBlock'

const regions = [
  { slug: 'oakville', label: 'Oakville', note: 'The Cabernet heartland', articleSlug: 'napa-oakville' },
  { slug: 'rutherford', label: 'Rutherford', note: 'Dust and destiny', articleSlug: 'napa-rutherford' },
  { slug: 'calistoga', label: 'Calistoga', note: 'Heat, spas & bold reds', articleSlug: 'napa-calistoga' },
  { slug: 'yountville', label: 'Yountville', note: 'The culinary capital', articleSlug: 'napa-yountville' },
  { slug: 'pritchard-hill', label: 'Pritchard Hill', note: 'Cult wines above the valley', articleSlug: 'napa-pritchard-hill' },
  { slug: 'downtown-napa', label: 'Downtown Napa', note: 'The city reinvented', articleSlug: 'napa-downtown' },
]

export default function HomePage() {
  const presentingSponsor = getPresentingSponsor('home')
  const ledeArticle = featuredArticles.find((a) => a.slug === 'napa-lede')
  const judgmentArticle = featuredArticles.find((a) => a.slug === 'napa-judgment')

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* Placeholder hero image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/placeholders/hero-vineyard.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%',
            filter: 'brightness(0.5)',
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(26,22,18,0.2) 0%, rgba(26,22,18,0.1) 40%, rgba(26,22,18,0.85) 80%, #1A1612 100%)',
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem 6rem',
            width: '100%',
          }}
        >
          <span className="eyebrow" style={{ display: 'block', marginBottom: '1.5rem' }}>
            Wine Spectator — June 2026
          </span>
          <h1 className="display-xl" style={{ color: 'var(--cream)', maxWidth: '14ch' }}>
            The Ultimate{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Napa Valley</em>{' '}
            Guide
          </h1>
          <span className="rule-gold" style={{ margin: '2rem 0' }} />
          <p
            className="body-lg"
            style={{ color: 'var(--dust)', maxWidth: '55ch', marginBottom: '2.5rem' }}
          >
            {ledeArticle?.excerpt}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="/wineries"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                background: 'var(--gold)',
                padding: '1rem 2.5rem',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              Explore Wineries
            </Link>
            <Link
              href="/map"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--cream)',
                border: '1px solid rgba(247,243,236,0.3)',
                padding: '1rem 2.5rem',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
            >
              Open the Map
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--mist)',
              writingMode: 'vertical-rl',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '48px',
              background: 'linear-gradient(to bottom, var(--mist), transparent)',
            }}
          />
        </div>
      </section>

      {/* ── PRESENTING SPONSOR (if active) ── */}
      {presentingSponsor && (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <SponsorBlock sponsor={presentingSponsor} context="section-header" />
        </div>
      )}

      {/* ── ISSUE INTRO ── */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '6rem 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
        }}
      >
        <div>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>
            From the June Issue
          </span>
          <h2 className="display-md" style={{ color: 'var(--cream)', marginBottom: '1.5rem' }}>
            Fifty years after the{' '}
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Judgment of Paris</em>{' '}
            changed everything
          </h2>
          <span className="rule-gold" />
          <p style={{ color: 'var(--mist)', lineHeight: 1.8, marginBottom: '2rem' }}>
            {judgmentArticle?.excerpt}
          </p>
          <Link
            href={`/features/${judgmentArticle?.slug}`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(196,148,58,0.4)',
              paddingBottom: '3px',
            }}
          >
            Read the feature →
          </Link>
        </div>
        <div
          style={{
            aspectRatio: '4/5',
            background: 'var(--ink-light)',
            border: '1px solid rgba(196,148,58,0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/placeholders/judgment-paris.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2rem',
              background: 'linear-gradient(to top, rgba(26,22,18,0.9), transparent)',
            }}
          >
            <span className="eyebrow" style={{ fontSize: '0.6rem' }}>Feature</span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--cream)', marginTop: '0.25rem' }}>
              The Judgment Revisited
            </p>
          </div>
        </div>
      </section>

      {/* ── REGIONS GRID ── */}
      <section style={{ background: 'var(--ink-light)', padding: '6rem 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
              Explore by Region
            </span>
            <h2 className="display-md" style={{ color: 'var(--cream)' }}>
              Six{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>distinct</em>{' '}
              appellations
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'rgba(196,148,58,0.1)',
            }}
          >
            {regions.map((region, i) => (
              <Link
                key={region.slug}
                href={`/regions/${region.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="region-card"
                  style={{
                    padding: '3rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    minHeight: '200px',
                    justifyContent: 'flex-end',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '3rem',
                      fontWeight: 300,
                      color: 'rgba(196,148,58,0.12)',
                      position: 'absolute',
                      top: '1rem',
                      right: '1.5rem',
                      lineHeight: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 400,
                      color: 'var(--cream)',
                      lineHeight: 1.2,
                    }}
                  >
                    {region.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: 'var(--mist)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {region.note}
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                    }}
                  >
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANDMARK WINERIES ── */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
          }}
        >
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
              Landmark Wineries
            </span>
            <h2 className="display-md" style={{ color: 'var(--cream)' }}>
              The estates that{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>defined</em> Napa
            </h2>
          </div>
          <Link
            href="/wineries"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--mist)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            All wineries →
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
          }}
        >
          {featuredWineries.slice(0, 3).map((winery) => (
            <Link
              key={winery.slug}
              href={`/wineries/${winery.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <article
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    aspectRatio: '4/3',
                    background: 'var(--ink-light)',
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
                  />
                  {winery.rating && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'var(--bordeaux)',
                        color: 'var(--cream)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 400,
                        padding: '0.4rem 0.75rem',
                        lineHeight: 1,
                      }}
                    >
                      {winery.rating}
                    </div>
                  )}
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      display: 'block',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {winery.region.replace(/-/g, ' ')}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      fontWeight: 400,
                      color: 'var(--cream)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {winery.name}
                  </h3>
                  <p style={{ color: 'var(--mist)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    {winery.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* ── MAP CTA ── */}
      <section
        style={{
          background: 'var(--bordeaux-dark)',
          borderTop: '1px solid rgba(196,148,58,0.2)',
          borderBottom: '1px solid rgba(196,148,58,0.2)',
          padding: '5rem 2rem',
          textAlign: 'center',
        }}
      >
        <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>
          Interactive Map
        </span>
        <h2
          className="display-md"
          style={{ color: 'var(--cream)', marginBottom: '1rem', maxWidth: '20ch', margin: '0 auto 1rem' }}
        >
          Plan your visit with our{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>interactive</em> valley map
        </h2>
        <p
          style={{
            color: 'var(--dust)',
            maxWidth: '50ch',
            margin: '1rem auto 2.5rem',
            fontSize: '1rem',
            lineHeight: 1.7,
          }}
        >
          Every winery, restaurant, and hotel from the guide — mapped across Napa Valley&apos;s six
          appellations. Filter by type, region, or Wine Spectator score.
        </p>
        <Link
          href="/map"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            background: 'var(--gold)',
            padding: '1rem 3rem',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Open the Map
        </Link>
      </section>

      {/* ── DINING ── */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
          }}
        >
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
              Where to Eat
            </span>
            <h2 className="display-md" style={{ color: 'var(--cream)' }}>
              Tables worth{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>the journey</em>
            </h2>
          </div>
          <Link
            href="/dining"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--mist)',
              textDecoration: 'none',
            }}
          >
            All restaurants →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem' }}>
          {featuredRestaurants.slice(0, 3).map((restaurant, i) => (
            <Link
              key={restaurant.slug}
              href={`/dining/${restaurant.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <article style={{ cursor: 'pointer' }}>
                <div
                  style={{
                    aspectRatio: i === 0 ? '3/2' : '1/1',
                    background: 'var(--ink-light)',
                    marginBottom: '1rem',
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
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'rgba(26,22,18,0.8)',
                      padding: '0.25rem 0.6rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--cream)',
                    }}
                  >
                    {restaurant.priceRange}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    display: 'block',
                    marginBottom: '0.3rem',
                  }}
                >
                  {restaurant.cuisine}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: i === 0 ? '1.5rem' : '1.2rem',
                    fontWeight: 400,
                    color: 'var(--cream)',
                    marginBottom: '0.4rem',
                  }}
                >
                  {restaurant.name}
                </h3>
                <p style={{ color: 'var(--mist)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {restaurant.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* ── STAY ── */}
      <section style={{ background: 'var(--ink-light)', padding: '6rem 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '3rem',
            }}
          >
            <div>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
                Where to Stay
              </span>
              <h2 className="display-md" style={{ color: 'var(--cream)' }}>
                From{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>hillside retreats</em>{' '}
                to village boutiques
              </h2>
            </div>
            <Link
              href="/stay"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--mist)',
                textDecoration: 'none',
              }}
            >
              All hotels →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
            }}
          >
            {featuredHotels.slice(0, 4).map((hotel) => (
              <Link
                key={hotel.slug}
                href={`/stay/${hotel.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <article style={{ cursor: 'pointer' }}>
                  <div
                    style={{
                      aspectRatio: '3/4',
                      background: 'var(--ink)',
                      marginBottom: '1rem',
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
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '1.5rem 1rem',
                        background: 'linear-gradient(to top, rgba(26,22,18,0.95), transparent)',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.65rem',
                          color: 'var(--gold)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {hotel.priceRange}
                      </p>
                    </div>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.15rem',
                      fontWeight: 400,
                      color: 'var(--cream)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {hotel.name}
                  </h3>
                  <p style={{ color: 'var(--mist)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                    {hotel.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALENDAR TEASER ── */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '6rem 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        <div>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>
            Plan Your Visit
          </span>
          <h2 className="display-md" style={{ color: 'var(--cream)', marginBottom: '1.5rem' }}>
            When to go &amp; what{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>not to miss</em>
          </h2>
          <span className="rule-gold" />
          <p style={{ color: 'var(--mist)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Every season in Napa Valley offers its own pleasures — from spring bloom to harvest
            drama to the quiet intimacy of winter barrel tastings. Our events calendar keeps you
            ahead of the valley&apos;s most unmissable moments.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/plan"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                background: 'var(--gold)',
                padding: '0.85rem 2rem',
                textDecoration: 'none',
              }}
            >
              Build My Itinerary
            </Link>
            <Link
              href="/calendar"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--cream)',
                border: '1px solid rgba(247,243,236,0.25)',
                padding: '0.85rem 2rem',
                textDecoration: 'none',
              }}
            >
              Events Calendar
            </Link>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}
        >
          {['Spring Bloom', 'Harvest Season', 'Winter Tastings', 'Summer Festivals'].map((season) => (
            <div
              key={season}
              style={{
                background: 'var(--ink-light)',
                border: '1px solid rgba(196,148,58,0.1)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--cream)' }}>
                {season}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--mist)' }}>
                View events →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: '1px solid rgba(196,148,58,0.15)',
          padding: '3rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              color: 'var(--cream)',
              display: 'block',
            }}
          >
            Wine Spectator Napa Valley Guide
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--mist)' }}>
            © {new Date().getFullYear()} M. Shanken Communications, Inc.
          </span>
        </div>
        <Link
          href="https://www.winespectator.com"
          target="_blank"
          rel="noopener"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            textDecoration: 'none',
          }}
        >
          winespectator.com →
        </Link>
      </footer>
    </>
  )
}
