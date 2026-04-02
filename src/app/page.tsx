'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'

// ── Data (inline for RSC compat — swap to imports once confirmed) ──
const featuredWineries = [
  { slug: 'opus-one',       name: 'Opus One',       region: 'Oakville',       rating: 98, excerpt: 'The original Napa-Bordeaux alliance, still setting the standard after four decades.', image: '/placeholders/winery-landscape.jpg' },
  { slug: 'screaming-eagle',name: 'Screaming Eagle', region: 'Oakville',       rating: 100,excerpt: 'The valley\'s most coveted cult wine, produced in minuscule quantities.',             image: '/placeholders/winery-hillside.jpg'  },
  { slug: 'harlan-estate',  name: 'Harlan Estate',   region: 'Oakville',       rating: 99, excerpt: 'Hillside Cabernet of extraordinary structure and age-worthiness.',                    image: '/placeholders/winery-hillside.jpg'  },
  { slug: 'colgin-cellars', name: 'Colgin Cellars',  region: 'Pritchard Hill', rating: 99, excerpt: 'Pritchard Hill\'s most revered name — profound, age-worthy Cabernet.',               image: '/placeholders/winery-hilltop.jpg'   },
  { slug: 'inglenook',      name: 'Inglenook',       region: 'Rutherford',     rating: 96, excerpt: 'Coppola\'s magnificent restoration of Napa\'s grandest 19th-century estate.',         image: '/placeholders/winery-chateau.jpg'   },
]

const regions = [
  { slug: 'oakville',       name: 'Oakville',       note: 'The Cabernet heartland',       image: '/placeholders/oakville-hero.jpg'       },
  { slug: 'rutherford',     name: 'Rutherford',     note: 'Dust & destiny',               image: '/placeholders/rutherford-hero.jpg'     },
  { slug: 'calistoga',      name: 'Calistoga',      note: 'Heat, spas & bold reds',       image: '/placeholders/calistoga-hero.jpg'      },
  { slug: 'yountville',     name: 'Yountville',     note: 'The culinary capital',         image: '/placeholders/yountville-hero.jpg'     },
  { slug: 'pritchard-hill', name: 'Pritchard Hill', note: 'Cult wines above the valley',  image: '/placeholders/pritchard-hill-hero.jpg' },
  { slug: 'downtown-napa',  name: 'Downtown Napa',  note: 'The city reinvented',          image: '/placeholders/downtown-napa-hero.jpg'  },
]

const dining = [
  { slug: 'french-laundry',    name: 'The French Laundry', cuisine: 'American tasting menu', price: '$$$$', region: 'Yountville',    image: '/placeholders/restaurant-fine.jpg'         },
  { slug: 'bouchon',           name: 'Bouchon Bistro',     cuisine: 'French bistro',         price: '$$$',  region: 'Yountville',    image: '/placeholders/restaurant-bistro.jpg'       },
  { slug: 'the-charter-oak',   name: 'The Charter Oak',    cuisine: 'Wood-fired California', price: '$$$',  region: 'Downtown Napa', image: '/placeholders/restaurant-rustic.jpg'       },
]

const hotels = [
  { slug: 'meadowood',        name: 'Meadowood',           category: 'Resort',   price: '$1,200–$3,000', image: '/placeholders/hotel-resort.jpg'   },
  { slug: 'auberge-du-soleil',name: 'Auberge du Soleil',   category: 'Resort',   price: '$900–$2,500',   image: '/placeholders/hotel-hillside.jpg'  },
  { slug: 'poetry-inn',       name: 'Poetry Inn',          category: 'Boutique', price: '$900–$1,600',   image: '/placeholders/hotel-intimate.jpg'  },
  { slug: 'bardessono',       name: 'Bardessono',          category: 'Boutique', price: '$600–$1,400',   image: '/placeholders/hotel-modern.jpg'    },
]

// ── Animated counter ──
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const steps = 40
    const step = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return { count, ref }
}

export default function HomePage() {
  const [activeRegion, setActiveRegion] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const parallaxOffset = scrollY * 0.35

  return (
    <div style={{ background: 'var(--ivory)', overflowX: 'hidden' }}>
      <Nav />

      {/* ════════════════════════════════════════
          HERO — FULL VIEWPORT, MASSIVE TYPE
      ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: '700px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {/* Parallax image */}
        <div
          style={{
            position: 'absolute',
            inset: '-10% 0',
            backgroundImage: 'url(/placeholders/hero-vineyard.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            transform: `translateY(${parallaxOffset}px)`,
            willChange: 'transform',
          }}
        />

        {/* Gradient — ivory fade from bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(250,247,242,0) 0%, rgba(250,247,242,0) 30%, rgba(250,247,242,0.75) 65%, rgba(250,247,242,1) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(250,247,242,0.6) 0%, transparent 55%)',
        }} />

        {/* Massive type — grid-breaking */}
        <div style={{ position: 'relative', zIndex: 2, padding: '0 0 0 0', width: '100%' }}>

          {/* Issue credit — top left */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '2.5rem',
            bottom: '100%',
          }} />

          {/* Giant NAPA — crops right edge intentionally */}
          <div style={{ position: 'relative', lineHeight: 0.85, marginBottom: '-0.05em' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22vw, 26vw, 30vw)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--bordeaux)',
              display: 'block',
              lineHeight: 0.82,
              letterSpacing: '-0.03em',
              paddingLeft: '2.5rem',
              opacity: 0.92,
              whiteSpace: 'nowrap',
            }}>
              Napa
            </span>
          </div>

          {/* VALLEY — offset right, different weight */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            padding: '0 2.5rem',
            marginTop: '-0.05em',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(14vw, 17vw, 20vw)',
              fontWeight: 300,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              lineHeight: 0.85,
            }}>
              Valley
            </span>

            {/* Stacked editorial detail — right aligned */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.5rem',
              paddingBottom: '0.5rem',
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--bordeaux)',
              }}>Wine Spectator</span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: 'var(--ink-mid)',
              }}>The Ultimate Guide</span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--ink-light)',
              }}>June 2026</span>
            </div>
          </div>

          {/* Bottom strip — intro + CTAs */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '2rem 2.5rem 3.5rem',
            borderTop: '1px solid rgba(28,22,18,0.1)',
            marginTop: '1.5rem',
            gap: '2rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              fontWeight: 300,
              color: 'var(--ink-mid)',
              lineHeight: 1.7,
              maxWidth: '44ch',
              margin: 0,
            }}>
              No wine region on earth compresses so much ambition, history, and sheer
              sensory pleasure into so small a space.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
              <Link href="/wineries" className="btn-primary">Explore Wineries</Link>
              <Link href="/map" className="btn-secondary">Open the Map</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS BAND
      ════════════════════════════════════════ */}
      <StatsBand />

      {/* ════════════════════════════════════════
          JUDGMENT OF PARIS — TYPOGRAPHIC FEATURE
          No image. Pure type. Stark.
      ════════════════════════════════════════ */}
      <section style={{
        background: 'var(--ink)',
        padding: '0',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Giant year — background decoration */}
        <span style={{
          position: 'absolute',
          fontFamily: 'var(--font-display)',
          fontSize: '40vw',
          fontWeight: 300,
          color: 'rgba(250,247,242,0.03)',
          lineHeight: 1,
          top: '-5%',
          right: '-5%',
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          1976
        </span>

        <div style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vw, 9rem) 2.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'block',
              marginBottom: '2rem',
            }}>
              Feature — June 2026
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--ivory)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              marginBottom: '2.5rem',
            }}>
              Fifty years after<br />Paris changed<br />everything
            </h2>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)', marginBottom: '2rem', opacity: 0.6 }} />
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'rgba(250,247,242,0.55)',
              lineHeight: 1.85,
              marginBottom: '3rem',
              maxWidth: '42ch',
            }}>
              In 1976, a blind tasting in Paris shocked the wine world. Napa Valley Cabernets
              and Chardonnays bested the finest wines of France. Half a century later, we ask
              what it really meant — and what it wrought.
            </p>
            <Link href="/features/napa-judgment" style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(184,135,46,0.4)',
              paddingBottom: '3px',
              transition: 'border-color 0.2s',
            }}>
              Read the feature →
            </Link>
          </div>

          {/* Right: pull quote */}
          <div style={{
            borderLeft: '1px solid rgba(250,247,242,0.1)',
            paddingLeft: '4rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 7vw, 7rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(250,247,242,0.08)',
              lineHeight: 1,
              display: 'block',
              marginBottom: '-1rem',
            }}>{'\u201C'}</span>
            <blockquote style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(250,247,242,0.75)',
              lineHeight: 1.4,
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              The tasting that put California on the world wine map — and never let it leave.
            </blockquote>
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(250,247,242,0.2)' }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(250,247,242,0.3)',
              }}>
                Wine Spectator, June 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          REGIONS — INTERACTIVE FILMSTRIP
      ════════════════════════════════════════ */}
      <section style={{ background: 'var(--ivory)', padding: 'clamp(5rem, 10vw, 9rem) 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 2.5rem', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--bordeaux)',
                display: 'block',
                marginBottom: '1rem',
              }}>
                Six Appellations
              </span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 300,
                color: 'var(--ink)',
                lineHeight: 1.0,
                letterSpacing: '-0.015em',
              }}>
                Explore the<br /><em style={{ color: 'var(--bordeaux)' }}>valley</em>
              </h2>
            </div>
            <Link href="/regions" style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--ink-light)',
              textDecoration: 'none',
            }}>
              All regions →
            </Link>
          </div>
        </div>

        {/* Filmstrip */}
        <div style={{
          display: 'flex',
          gap: '0',
          paddingLeft: '2.5rem',
          overflow: 'visible',
        }}>
          {regions.map((region, i) => (
            <Link
              key={region.slug}
              href={`/regions/${region.slug}`}
              style={{ textDecoration: 'none', flexShrink: 0 }}
              onMouseEnter={() => setActiveRegion(i)}
            >
              <div style={{
                width: activeRegion === i ? 'clamp(280px, 32vw, 420px)' : 'clamp(80px, 10vw, 130px)',
                height: 'clamp(380px, 50vw, 580px)',
                transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                borderRight: '1px solid rgba(250,247,242,0.3)',
              }}>
                {/* Image */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${region.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.6s ease',
                  transform: activeRegion === i ? 'scale(1)' : 'scale(1.05)',
                  filter: activeRegion === i ? 'brightness(0.7)' : 'brightness(0.4) saturate(0.6)',
                }} />

                {/* Gradient */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(28,22,18,0.9) 0%, rgba(28,22,18,0.2) 60%, transparent 100%)',
                }} />

                {/* Collapsed state — vertical label */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: activeRegion === i ? 0 : 1,
                  transition: 'opacity 0.3s',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    color: 'rgba(250,247,242,0.7)',
                    writingMode: 'vertical-rl',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {region.name}
                  </span>
                </div>

                {/* Expanded content */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2rem',
                  opacity: activeRegion === i ? 1 : 0,
                  transform: activeRegion === i ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.4s 0.15s, transform 0.4s 0.15s',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(184,135,46,0.9)',
                    display: 'block',
                    marginBottom: '0.4rem',
                  }}>
                    {String(i + 1).padStart(2, '0')} / 06
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    fontWeight: 300,
                    color: 'var(--ivory)',
                    marginBottom: '0.4rem',
                    lineHeight: 1.1,
                  }}>
                    {region.name}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    color: 'rgba(250,247,242,0.6)',
                    marginBottom: '1.25rem',
                    fontStyle: 'italic',
                  }}>
                    {region.note}
                  </p>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(250,247,242,0.5)',
                    borderBottom: '1px solid rgba(250,247,242,0.2)',
                    paddingBottom: '2px',
                  }}>
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          LANDMARK WINERIES — MAGAZINE SPREAD
      ════════════════════════════════════════ */}
      <section style={{ background: 'var(--ivory-warm)', overflow: 'hidden' }}>

        {/* Section label — oversized, bleeds */}
        <div style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: 'clamp(5rem, 8vw, 8rem) 2.5rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '3rem',
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'block',
              marginBottom: '1rem',
            }}>
              Landmark Estates
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              color: 'var(--ink)',
              lineHeight: 1.0,
              letterSpacing: '-0.015em',
            }}>
              The wines that<br /><em style={{ color: 'var(--bordeaux)' }}>defined</em> a valley
            </h2>
          </div>
          <Link href="/wineries" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--ink-light)',
            textDecoration: 'none',
          }}>
            All wineries →
          </Link>
        </div>

        {/* Hero winery — full bleed image with type overlay */}
        <Link href={`/wineries/${featuredWineries[0].slug}`} style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{
            position: 'relative',
            height: 'clamp(420px, 55vw, 680px)',
            overflow: 'hidden',
            cursor: 'pointer',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${featuredWineries[0].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              transition: 'transform 0.8s ease',
            }}
              className="hero-winery-img"
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(28,22,18,0.85) 0%, rgba(28,22,18,0.4) 50%, rgba(28,22,18,0.1) 100%)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(2.5rem, 5vw, 5rem)',
              maxWidth: '55%',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                }}>
                  {featuredWineries[0].region}
                </span>
                <div style={{ width: '24px', height: '1px', background: 'rgba(184,135,46,0.5)' }} />
                <div style={{
                  background: 'var(--bordeaux)',
                  color: 'var(--ivory)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  padding: '0.2rem 0.6rem',
                  lineHeight: 1.2,
                }}>
                  {featuredWineries[0].rating} pts
                </div>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                fontWeight: 300,
                color: 'var(--ivory)',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}>
                {featuredWineries[0].name}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'rgba(250,247,242,0.65)',
                lineHeight: 1.7,
                maxWidth: '42ch',
                marginBottom: '1.75rem',
              }}>
                {featuredWineries[0].excerpt}
              </p>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(250,247,242,0.5)',
                borderBottom: '1px solid rgba(250,247,242,0.2)',
                paddingBottom: '3px',
                width: 'fit-content',
              }}>
                Read profile →
              </span>
            </div>
          </div>
        </Link>

        {/* Remaining 4 wineries — horizontal strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid var(--ivory-deep)',
        }}>
          {featuredWineries.slice(1).map((winery, i) => (
            <Link
              key={winery.slug}
              href={`/wineries/${winery.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                borderRight: i < 3 ? '1px solid var(--ivory-deep)' : 'none',
                padding: '2.25rem 2rem',
                transition: 'background 0.25s',
                cursor: 'pointer',
              }}
                className="winery-strip-item"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-light)',
                  }}>
                    {winery.region}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    color: 'var(--bordeaux)',
                    background: 'var(--bordeaux-pale)',
                    padding: '0.15rem 0.5rem',
                  }}>
                    {winery.rating}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 400,
                  color: 'var(--ink)',
                  lineHeight: 1.2,
                  marginBottom: '0.6rem',
                }}>
                  {winery.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  color: 'var(--ink-light)',
                  lineHeight: 1.65,
                }}>
                  {winery.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <style>{`
          .hero-winery-img:hover { transform: scale(1.03); }
          .winery-strip-item:hover { background: var(--gold-pale); }
        `}</style>
      </section>

      {/* ════════════════════════════════════════
          MAP — FULL BLEED DARK BAND
      ════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        background: 'var(--ink)',
        padding: 'clamp(5rem, 8vw, 8rem) 0',
        overflow: 'hidden',
      }}>
        {/* Decorative grid lines */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i + 1) * 20}%`,
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'rgba(250,247,242,0.03)',
            pointerEvents: 'none',
          }} />
        ))}

        <div style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '0 2.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'block',
              marginBottom: '1.5rem',
            }}>
              Interactive Map
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--ivory)',
              lineHeight: 1.0,
              letterSpacing: '-0.015em',
              marginBottom: '1.75rem',
            }}>
              Every estate,<br />every table,<br />every room
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'rgba(250,247,242,0.5)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              maxWidth: '42ch',
            }}>
              Thirty-plus locations from the guide mapped across six Napa Valley appellations.
              Satellite terrain, AVA overlays, and a sidebar that opens the full profile.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/map" style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                background: 'var(--ivory)',
                padding: '0.9rem 2.25rem',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}>
                Open the Map
              </Link>
              <Link href="/plan" style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(250,247,242,0.5)',
                border: '1px solid rgba(250,247,242,0.15)',
                padding: '0.9rem 2.25rem',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}>
                Plan Visit
              </Link>
            </div>
          </div>

          {/* Map preview card */}
          <div style={{
            position: 'relative',
            aspectRatio: '4/3',
            background: 'rgba(250,247,242,0.04)',
            border: '1px solid rgba(250,247,242,0.08)',
            overflow: 'hidden',
          }}>
            {/* Simulated map pins */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'url(/placeholders/map-preview.jpg) center/cover',
              opacity: 0.6,
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(28,22,18,0.3), rgba(28,22,18,0.6))',
            }} />
            {[
              { x: '35%', y: '45%', color: '#B8872E', label: 'Opus One'         },
              { x: '55%', y: '38%', color: '#8B2E3E', label: 'Inglenook'        },
              { x: '25%', y: '60%', color: '#4A5E42', label: 'French Laundry'   },
              { x: '70%', y: '55%', color: '#B8872E', label: 'Colgin Cellars'   },
              { x: '45%', y: '70%', color: '#4A5E42', label: 'Meadowood'        },
            ].map((pin) => (
              <div key={pin.label} style={{
                position: 'absolute',
                left: pin.x,
                top: pin.y,
                transform: 'translate(-50%, -100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50% 50% 50% 0',
                  transform: 'rotate(-45deg)',
                  background: pin.color,
                  border: '1.5px solid rgba(250,247,242,0.8)',
                  boxShadow: `0 0 8px ${pin.color}80`,
                }} />
              </div>
            ))}
            {/* Overlay label */}
            <div style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              right: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: 'rgba(250,247,242,0.6)',
              }}>
                Napa Valley, California
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(250,247,242,0.35)',
              }}>
                30+ locations
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          DINING — ASYMMETRIC LAYOUT
      ════════════════════════════════════════ */}
      <section style={{ background: 'var(--ivory)', padding: 'clamp(5rem, 8vw, 8rem) 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 2.5rem' }}>

          {/* Section label — large, left */}
          <div style={{ marginBottom: '4rem' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--terracotta)',
              display: 'block',
              marginBottom: '1rem',
            }}>
              Where to Eat
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 300,
                color: 'var(--ink)',
                lineHeight: 1.0,
                letterSpacing: '-0.015em',
              }}>
                Tables worth<br /><em style={{ color: 'var(--terracotta)' }}>the journey</em>
              </h2>
              <Link href="/dining" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--ink-light)',
                textDecoration: 'none',
              }}>All restaurants →</Link>
            </div>
          </div>

          {/* Asymmetric dining grid — 1 large + 2 stacked */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '2px', background: 'var(--ivory-deep)' }}>

            {/* Large feature */}
            <Link href={`/dining/${dining[0].slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                position: 'relative',
                aspectRatio: '4/3',
                overflow: 'hidden',
                background: 'var(--parchment)',
                cursor: 'pointer',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${dining[0].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.6s ease',
                }}
                  className="dining-img"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(28,22,18,0.9) 0%, rgba(28,22,18,0.1) 60%, transparent 100%)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2.5rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}>
                    {dining[0].cuisine} · {dining[0].price} · {dining[0].region}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                    fontWeight: 300,
                    color: 'var(--ivory)',
                    lineHeight: 1.1,
                  }}>
                    {dining[0].name}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Two stacked */}
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '2px', background: 'var(--ivory-deep)' }}>
              {dining.slice(1).map((r) => (
                <Link key={r.slug} href={`/dining/${r.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'var(--parchment)',
                    height: '100%',
                    cursor: 'pointer',
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${r.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.6s ease',
                    }}
                      className="dining-img"
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(28,22,18,0.85) 0%, transparent 60%)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '1.5rem',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.58rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'rgba(184,135,46,0.8)',
                        display: 'block',
                        marginBottom: '0.3rem',
                      }}>
                        {r.cuisine} · {r.price}
                      </span>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                        fontWeight: 300,
                        color: 'var(--ivory)',
                        lineHeight: 1.1,
                      }}>
                        {r.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <style>{`.dining-img:hover { transform: scale(1.04); }`}</style>
      </section>

      {/* ════════════════════════════════════════
          STAY — HORIZONTAL SCROLL
      ════════════════════════════════════════ */}
      <section style={{ background: 'var(--parchment)', padding: 'clamp(5rem, 8vw, 8rem) 0', overflow: 'hidden' }}>
        <div style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '0 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '3rem',
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'block',
              marginBottom: '1rem',
            }}>
              Where to Stay
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              color: 'var(--ink)',
              lineHeight: 1.0,
              letterSpacing: '-0.015em',
            }}>
              Rooms worth<br /><em style={{ color: 'var(--gold)' }}>lingering in</em>
            </h2>
          </div>
          <Link href="/stay" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--ink-light)',
            textDecoration: 'none',
          }}>All hotels →</Link>
        </div>

        {/* Horizontal strip — slight overflow to suggest scroll */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          paddingLeft: '2.5rem',
          paddingRight: '2.5rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          {hotels.map((hotel) => (
            <Link key={hotel.slug} href={`/stay/${hotel.slug}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
              <div style={{ width: 'clamp(240px, 28vw, 340px)', cursor: 'pointer' }}>
                <div style={{
                  aspectRatio: '2/3',
                  background: 'var(--ivory-deep)',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '1.25rem',
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${hotel.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.6s ease',
                  }}
                    className="hotel-img"
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    background: 'linear-gradient(to top, rgba(28,22,18,0.7), transparent)',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.7rem',
                      color: 'rgba(250,247,242,0.8)',
                    }}>
                      {hotel.price}<span style={{ opacity: 0.5 }}>/night</span>
                    </span>
                  </div>
                </div>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  display: 'block',
                  marginBottom: '0.3rem',
                }}>
                  {hotel.category}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 400,
                  color: 'var(--ink)',
                  lineHeight: 1.2,
                }}>
                  {hotel.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        <style>{`.hotel-img:hover { transform: scale(1.04); }`}</style>
      </section>

      {/* ════════════════════════════════════════
          HARVEST SEASON — FULL BLEED CLOSER
      ════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--bordeaux)',
      }}>
        {/* Massive background type */}
        <span style={{
          position: 'absolute',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(20vw, 28vw, 35vw)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'rgba(250,247,242,0.04)',
          lineHeight: 1,
          right: '-2%',
          bottom: '-15%',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>
          Harvest
        </span>

        <div style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: 'clamp(5rem, 8vw, 8rem) 2.5rem',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
          width: '100%',
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(250,247,242,0.4)',
              display: 'block',
              marginBottom: '1.5rem',
            }}>
              Plan Your Visit
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--ivory)',
              lineHeight: 1.0,
              letterSpacing: '-0.015em',
              marginBottom: '2rem',
            }}>
              When to go &<br />what not to miss
            </h2>
            <div style={{ width: '40px', height: '1px', background: 'rgba(250,247,242,0.2)', marginBottom: '1.75rem' }} />
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'rgba(250,247,242,0.55)',
              lineHeight: 1.85,
              maxWidth: '44ch',
              marginBottom: '2.5rem',
            }}>
              From spring bloom and summer barrel tastings to the drama of harvest and
              the quiet intimacy of winter — every season in Napa has its pleasures.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/plan" style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--bordeaux)',
                background: 'var(--ivory)',
                padding: '0.9rem 2.25rem',
                textDecoration: 'none',
              }}>
                Build My Itinerary
              </Link>
              <Link href="/calendar" style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(250,247,242,0.6)',
                border: '1px solid rgba(250,247,242,0.2)',
                padding: '0.9rem 2.25rem',
                textDecoration: 'none',
              }}>
                Events Calendar
              </Link>
            </div>
          </div>

          {/* Season list — vertical, typographic */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { season: 'Spring',  months: 'Mar – May', note: 'Bloom, pruning, cellar tastings' },
              { season: 'Summer',  months: 'Jun – Aug', note: 'Long days, outdoor dining, barrel visits' },
              { season: 'Harvest', months: 'Sep – Oct', note: 'The valley\'s most electric season', accent: true },
              { season: 'Winter',  months: 'Nov – Feb', note: 'Quiet beauty, intimate tastings, best value' },
            ].map(({ season, months, note, accent }) => (
              <div key={season} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1.5rem 0',
                borderBottom: '1px solid rgba(250,247,242,0.08)',
                alignItems: 'center',
              }}>
                <div>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 400,
                    color: accent ? 'var(--ivory)' : 'rgba(250,247,242,0.5)',
                    display: 'block',
                  }}>
                    {season}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    color: 'var(--gold-warm)',
                  }}>
                    {months}
                  </span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  color: accent ? 'rgba(250,247,242,0.65)' : 'rgba(250,247,242,0.35)',
                  lineHeight: 1.55,
                }}>
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer style={{
        background: 'var(--ink)',
        padding: '3rem 0',
        borderTop: '1px solid rgba(250,247,242,0.06)',
      }}>
        <div style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '0 2.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '2rem',
          alignItems: 'center',
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--bordeaux)',
              display: 'block',
              marginBottom: '3px',
            }}>
              Wine Spectator
            </span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              color: 'rgba(250,247,242,0.5)',
              fontStyle: 'italic',
            }}>
              Napa Valley Guide — June 2026
            </span>
          </div>
          <div style={{ width: '1px', height: '32px', background: 'rgba(250,247,242,0.08)' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '2rem' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              color: 'rgba(250,247,242,0.2)',
            }}>
              © {new Date().getFullYear()} M. Shanken Communications, Inc.
            </span>
            <a href="https://www.winespectator.com" target="_blank" rel="noopener" style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              textDecoration: 'none',
              opacity: 0.7,
            }}>
              winespectator.com →
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ── Stats band ──
function StatsBand() {
  const { count: wineries, ref: r1 } = useCountUp(500)
  const { count: acres,    ref: r2 } = useCountUp(45000)
  const { count: score,    ref: r3 } = useCountUp(100)

  return (
    <div style={{
      background: 'var(--ivory-warm)',
      borderTop: '1px solid var(--ivory-deep)',
      borderBottom: '1px solid var(--ivory-deep)',
      padding: '0',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
    }}>
      {[
        { ref: r1, value: `${wineries}+`,    label: 'Wineries',         sub: 'across the valley'    },
        { ref: r2, value: `${acres.toLocaleString()}`, label: 'Acres planted', sub: 'of wine country'   },
        { ref: r3, value: `${score}`,         label: 'Perfect scores',  sub: 'awarded by WS'        },
        { ref: null, value: '6',              label: 'Appellations',    sub: 'each distinct'        },
      ].map(({ ref: cellRef, value, label, sub }, i) => (
        <div key={label} ref={cellRef ?? undefined} style={{
          padding: '2.5rem 2rem',
          borderRight: i < 3 ? '1px solid var(--ivory-deep)' : 'none',
          textAlign: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300,
            color: 'var(--bordeaux)',
            display: 'block',
            lineHeight: 1,
            marginBottom: '0.4rem',
            fontStyle: 'italic',
          }}>
            {value}
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            display: 'block',
            marginBottom: '0.2rem',
          }}>
            {label}
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            color: 'var(--ink-light)',
          }}>
            {sub}
          </span>
        </div>
      ))}
    </div>
  )
}
