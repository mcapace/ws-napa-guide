import Nav from '@/components/ui/Nav'
import Link from 'next/link'
import { featuredArticles } from '@/data/articles'
import { featuredWineries } from '@/data/wineries'
import { featuredRestaurants } from '@/data/restaurants'
import { featuredHotels } from '@/data/hotels'
import { getPresentingSponsor } from '@/data/sponsors'
import SponsorBlock from '@/components/sponsor/SponsorBlock'

const regions = [
  { slug: 'oakville',       label: 'Oakville',       note: 'The Cabernet heartland',          num: '01' },
  { slug: 'rutherford',     label: 'Rutherford',     note: 'Dust &amp; destiny',              num: '02' },
  { slug: 'calistoga',      label: 'Calistoga',      note: 'Heat, spas &amp; bold reds',      num: '03' },
  { slug: 'yountville',     label: 'Yountville',     note: 'The culinary capital',            num: '04' },
  { slug: 'pritchard-hill', label: 'Pritchard Hill', note: 'Cult wines above the valley',     num: '05' },
  { slug: 'downtown-napa',  label: 'Downtown Napa',  note: 'The city reinvented',             num: '06' },
]

export default function HomePage() {
  const presentingSponsor = getPresentingSponsor('home')
  const ledeArticle       = featuredArticles.find((a) => a.slug === 'napa-lede')
  const judgmentArticle   = featuredArticles.find((a) => a.slug === 'napa-judgment')

  return (
    <div className="grain">
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
        {/* Full bleed hero image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/placeholders/hero-vineyard.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />

        {/* Warm light gradient — bottom up, ivory toned */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(250,247,242,0.05) 0%, rgba(250,247,242,0.15) 40%, rgba(250,247,242,0.88) 78%, var(--ivory) 100%)',
          }}
        />

        {/* Left vignette for text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(250,247,242,0.5) 0%, transparent 60%)',
          }}
        />

        {/* Hero content */}
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 2,
            paddingBottom: 'clamp(4rem, 8vw, 7rem)',
            paddingTop: '140px',
          }}
        >
          {/* Issue tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
            <span className="eyebrow-bordeaux">Wine Spectator</span>
            <div style={{ width: '24px', height: '1px', background: 'var(--bordeaux)', opacity: 0.4 }} />
            <span className="eyebrow" style={{ color: 'var(--ink-light)' }}>June 2026</span>
          </div>

          {/* Headline */}
          <h1
            className="display-2xl"
            style={{ color: 'var(--ink)', maxWidth: '12ch', marginBottom: '1.5rem' }}
          >
            The Ultimate
            <br />
            <em style={{ color: 'var(--bordeaux)', fontStyle: 'italic' }}>Napa Valley</em>
            <br />
            Guide
          </h1>

          <span className="rule" />

          <p
            className="body-lg"
            style={{ maxWidth: '52ch', marginBottom: '2.5rem', color: 'var(--ink-mid)' }}
          >
            {ledeArticle?.excerpt}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/wineries" className="btn-primary">
              Explore Wineries
            </Link>
            <Link href="/map" className="btn-secondary">
              Open the Map
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            right: '2.5rem',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '56px',
              background: 'linear-gradient(to bottom, transparent, var(--bordeaux))',
              animation: 'scrollCue 1.8s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ink-light)',
              writingMode: 'vertical-rl',
              marginTop: '4px',
            }}
          >
            Scroll
          </span>
        </div>

        <style>{`
          @keyframes scrollCue {
            0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
            50% { opacity: 1; transform: scaleY(1); }
          }
        `}</style>
      </section>

      {/* ── PRESENTING SPONSOR ── */}
      {presentingSponsor && (
        <div className="container">
          <SponsorBlock sponsor={presentingSponsor} context="section-header" />
        </div>
      )}

      {/* ── INTRO EDITORIAL STRIP ── */}
      <section style={{ background: 'var(--bordeaux)', padding: '1.5rem 0' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'rgba(250,247,242,0.6)',
              flexShrink: 0,
            }}
          >
            In this guide —
          </span>
          {['Landmark Wineries', 'The Judgment of Paris', 'Where to Eat', 'Where to Stay', 'Events Calendar', 'Trip Planner'].map((item, i) => (
            <span
              key={item}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: i === 0 ? 'var(--ivory)' : 'rgba(250,247,242,0.55)',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── FEATURE: JUDGMENT OF PARIS ── */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--ivory)' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '5fr 4fr',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          {/* Image */}
          <div
            className="img-wrap"
            style={{ aspectRatio: '4/5', boxShadow: '0 24px 64px rgba(28,22,18,0.12)' }}
          >
            <div
              className="img-fill"
              style={{ backgroundImage: 'url(/placeholders/judgment-paris.jpg)' }}
            />
            {/* Caption strip */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.5rem',
                background: 'linear-gradient(to top, rgba(28,22,18,0.65), transparent)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(250,247,242,0.7)',
                }}
              >
                Feature
              </span>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>
              From the June Issue
            </span>
            <h2 className="display-lg" style={{ color: 'var(--ink)', marginBottom: '0.25rem' }}>
              Fifty Years After
            </h2>
            <h2
              className="display-lg"
              style={{ color: 'var(--bordeaux)', fontStyle: 'italic', marginBottom: '1.5rem' }}
            >
              Paris Changed Everything
            </h2>
            <span className="rule" />
            <p className="body-lg" style={{ marginBottom: '2rem' }}>
              {judgmentArticle?.excerpt}
            </p>
            <Link href={`/features/${judgmentArticle?.slug}`} className="btn-secondary">
              Read the Feature
            </Link>
          </div>
        </div>
      </section>

      {/* ── REGIONS GRID ── */}
      <section style={{ background: 'var(--parchment)', padding: 'var(--section-pad) 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
                Explore by Region
              </span>
              <h2 className="display-lg" style={{ color: 'var(--ink)' }}>
                Six{' '}
                <em style={{ color: 'var(--bordeaux)', fontStyle: 'italic' }}>distinct</em>{' '}
                appellations
              </h2>
            </div>
            <Link href="/map" className="btn-ghost">
              View on map →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5px',
              background: 'var(--ivory-deep)',
            }}
          >
            {regions.map((region) => (
              <Link key={region.slug} href={`/regions/${region.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  className="region-card"
                  style={{
                    background: 'var(--ivory)',
                    padding: '2.5rem 2rem',
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    gap: '0.5rem',
                    position: 'relative',
                    transition: 'background 0.3s',
                    cursor: 'pointer',
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      right: '1.5rem',
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.5rem',
                      fontWeight: 300,
                      color: 'var(--ivory-deep)',
                      lineHeight: 1,
                    }}
                  >
                    {region.num}
                  </span>
                  <h3 className="display-sm" style={{ color: 'var(--ink)' }}>
                    {region.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: 'var(--ink-light)',
                    }}
                    dangerouslySetInnerHTML={{ __html: region.note }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--bordeaux)',
                      marginTop: '0.5rem',
                    }}
                  >
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          .region-card:hover { background: var(--gold-pale) !important; }
        `}</style>
      </section>

      {/* ── LANDMARK WINERIES ── */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--ivory)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
                Landmark Wineries
              </span>
              <h2 className="display-lg" style={{ color: 'var(--ink)' }}>
                The estates that{' '}
                <em style={{ color: 'var(--bordeaux)', fontStyle: 'italic' }}>defined</em> Napa
              </h2>
            </div>
            <Link href="/wineries" className="btn-ghost">
              All wineries →
            </Link>
          </div>

          {/* Featured large + two small */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', alignItems: 'start' }}>
            {/* Large card */}
            {featuredWineries[0] && (
              <Link href={`/wineries/${featuredWineries[0].slug}`} style={{ textDecoration: 'none' }}>
                <article className="card" style={{ overflow: 'hidden' }}>
                  <div className="img-wrap" style={{ aspectRatio: '3/2' }}>
                    <div
                      className="img-fill"
                      style={{ backgroundImage: `url(${featuredWineries[0].images[0]})` }}
                    />
                    {featuredWineries[0].rating && (
                      <div
                        className="rating-badge"
                        style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
                      >
                        {featuredWineries[0].rating}
                        <span style={{ fontSize: '0.65rem', opacity: 0.7, marginLeft: '2px' }}>pts</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1.75rem' }}>
                    <span className="eyebrow" style={{ display: 'block', marginBottom: '0.4rem' }}>
                      {featuredWineries[0].region.replace(/-/g, ' ')}
                    </span>
                    <h3 className="display-md" style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>
                      {featuredWineries[0].name}
                    </h3>
                    <p className="caption" style={{ lineHeight: 1.7 }}>
                      {featuredWineries[0].excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            )}

            {/* Two stacked small cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {featuredWineries.slice(1, 3).map((winery) => (
                <Link key={winery.slug} href={`/wineries/${winery.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="card" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', overflow: 'hidden' }}>
                    <div className="img-wrap" style={{ aspectRatio: '1/1' }}>
                      <div
                        className="img-fill"
                        style={{ backgroundImage: `url(${winery.images[0]})` }}
                      />
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <span className="eyebrow" style={{ display: 'block', marginBottom: '0.3rem' }}>
                        {winery.region.replace(/-/g, ' ')}
                      </span>
                      <h3 className="display-sm" style={{ color: 'var(--ink)', marginBottom: '0.4rem' }}>
                        {winery.name}
                      </h3>
                      {winery.rating && (
                        <span className="rating-badge" style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}>
                          {winery.rating}pts
                        </span>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP CTA BAND ── */}
      <section
        style={{
          background: 'var(--sage-pale)',
          borderTop: '1px solid rgba(74,94,66,0.15)',
          borderBottom: '1px solid rgba(74,94,66,0.15)',
          padding: '4rem 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: 'var(--sage)', display: 'block', marginBottom: '0.75rem' }}>
              Interactive Map
            </span>
            <h2 className="display-md" style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>
              Every winery, restaurant &amp; hotel —
              {' '}<em style={{ color: 'var(--sage)', fontStyle: 'italic' }}>mapped across the valley</em>
            </h2>
            <p style={{ color: 'var(--ink-light)', fontSize: '0.9rem', maxWidth: '55ch' }}>
              Filter by type, fly to any AVA region, and explore Napa Valley in satellite 3D.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexShrink: 0 }}>
            <Link href="/map" className="btn-primary" style={{ background: 'var(--sage)', textAlign: 'center' }}>
              Open the Map
            </Link>
            <Link href="/plan" className="btn-ghost" style={{ textAlign: 'center', color: 'var(--sage)' }}>
              Plan my itinerary →
            </Link>
          </div>
        </div>
      </section>

      {/* ── DINING ── */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--ivory)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
                Where to Eat
              </span>
              <h2 className="display-lg" style={{ color: 'var(--ink)' }}>
                Tables worth{' '}
                <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>the journey</em>
              </h2>
            </div>
            <Link href="/dining" className="btn-ghost">All restaurants →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {featuredRestaurants.slice(0, 4).map((r, i) => (
              <Link key={r.slug} href={`/dining/${r.slug}`} style={{ textDecoration: 'none' }}>
                <article className="card" style={{ overflow: 'hidden' }}>
                  <div className="img-wrap" style={{ aspectRatio: i === 0 ? '3/2' : '1/1' }}>
                    <div className="img-fill" style={{ backgroundImage: `url(${r.images[0]})` }} />
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: '0.75rem',
                        background: 'var(--ivory)',
                        padding: '0.2rem 0.5rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.1em',
                        color: 'var(--ink-mid)',
                      }}
                    >
                      {r.priceRange}
                    </div>
                  </div>
                  <div style={{ padding: '1.1rem 1.25rem 1.25rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--terracotta)',
                        display: 'block',
                        marginBottom: '0.3rem',
                      }}
                    >
                      {r.cuisine}
                    </span>
                    <h3 className="display-sm" style={{ color: 'var(--ink)', marginBottom: '0.4rem' }}>
                      {r.name}
                    </h3>
                    <p className="caption">{r.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAY ── */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--ivory-warm)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>Where to Stay</span>
              <h2 className="display-lg" style={{ color: 'var(--ink)' }}>
                From{' '}
                <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>hillside retreats</em>
                {' '}to village boutiques
              </h2>
            </div>
            <Link href="/stay" className="btn-ghost">All hotels →</Link>
          </div>

          {/* Horizontal scroll strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
            }}
          >
            {featuredHotels.slice(0, 4).map((h) => (
              <Link key={h.slug} href={`/stay/${h.slug}`} style={{ textDecoration: 'none' }}>
                <article className="card" style={{ overflow: 'hidden' }}>
                  <div className="img-wrap" style={{ aspectRatio: '2/3' }}>
                    <div className="img-fill" style={{ backgroundImage: `url(${h.images[0]})` }} />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '1.25rem 1rem',
                        background: 'linear-gradient(to top, rgba(28,22,18,0.6), transparent)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.65rem',
                          color: 'rgba(250,247,242,0.85)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {h.priceRange}<span style={{ opacity: 0.6 }}>/night</span>
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '1.1rem 1.25rem 1.25rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.12em',
                        textTransform: 'capitalize',
                        color: 'var(--gold)',
                        display: 'block',
                        marginBottom: '0.3rem',
                      }}
                    >
                      {h.category}
                    </span>
                    <h3 className="display-sm" style={{ color: 'var(--ink)', marginBottom: '0.4rem' }}>
                      {h.name}
                    </h3>
                    <p className="caption">{h.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALENDAR BAND ── */}
      <section
        style={{
          background: 'var(--bordeaux)',
          padding: 'var(--section-pad) 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          <div>
            <span
              className="eyebrow"
              style={{ color: 'rgba(250,247,242,0.5)', display: 'block', marginBottom: '1rem' }}
            >
              Plan Your Visit
            </span>
            <h2
              className="display-lg"
              style={{ color: 'var(--ivory)', marginBottom: '1.5rem', fontStyle: 'italic' }}
            >
              When to go &amp; what not to miss
            </h2>
            <div style={{ width: '40px', height: '1px', background: 'rgba(250,247,242,0.3)', marginBottom: '1.5rem' }} />
            <p style={{ color: 'rgba(250,247,242,0.7)', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1rem' }}>
              From spring bloom and summer barrel tastings to the drama of harvest and the quiet
              intimacy of winter — every season in Napa has its pleasures. Our calendar keeps
              you ahead of the valley&apos;s most unmissable moments.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                href="/plan"
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--bordeaux)',
                  background: 'var(--ivory)',
                  padding: '0.9rem 2rem',
                  textDecoration: 'none',
                }}
              >
                Build My Itinerary
              </Link>
              <Link
                href="/calendar"
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--ivory)',
                  border: '1px solid rgba(250,247,242,0.3)',
                  padding: '0.9rem 2rem',
                  textDecoration: 'none',
                }}
              >
                Events Calendar
              </Link>
            </div>
          </div>

          {/* Season grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { season: 'Spring', months: 'Mar – May', note: 'Wildflower bloom, pruning complete, cellar tastings' },
              { season: 'Summer', months: 'Jun – Aug', note: 'Long days, barrel tastings, open-air dining' },
              { season: 'Harvest', months: 'Sep – Oct', note: 'The valley\'s most electric season', highlight: true },
              { season: 'Winter', months: 'Nov – Feb', note: 'Quiet beauty, best value, intimate tastings' },
            ].map(({ season, months, note, highlight }) => (
              <div
                key={season}
                style={{
                  padding: '1.5rem',
                  background: highlight ? 'rgba(250,247,242,0.12)' : 'rgba(250,247,242,0.06)',
                  border: highlight ? '1px solid rgba(250,247,242,0.25)' : '1px solid rgba(250,247,242,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    color: highlight ? 'var(--ivory)' : 'rgba(250,247,242,0.8)',
                  }}
                >
                  {season}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    color: 'var(--gold-warm)',
                  }}
                >
                  {months}
                </span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(250,247,242,0.5)', lineHeight: 1.5 }}>
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: 'var(--ivory-warm)',
          borderTop: '1px solid var(--ivory-deep)',
          padding: '2.5rem 0',
        }}
      >
        <div
          className="container"
          style={{
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
                color: 'var(--ink)',
                display: 'block',
                marginBottom: '2px',
              }}
            >
              Wine Spectator — Napa Valley Guide
            </span>
            <span className="caption">
              © {new Date().getFullYear()} M. Shanken Communications, Inc. All rights reserved.
            </span>
          </div>
          <a
            href="https://www.winespectator.com"
            target="_blank"
            rel="noopener"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--bordeaux)',
              textDecoration: 'none',
            }}
          >
            winespectator.com →
          </a>
        </div>
      </footer>
    </div>
  )
}
