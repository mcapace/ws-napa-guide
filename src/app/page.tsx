'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'

// ── Data ──────────────────────────────────────────────────────
const regions = [
  { slug: 'oakville',       name: 'Oakville',       note: 'The Cabernet heartland',         video: '/videos/oakville.mp4'       },
  { slug: 'rutherford',     name: 'Rutherford',     note: 'Dust & destiny',                 video: '/videos/rutherford.mp4'     },
  { slug: 'calistoga',      name: 'Calistoga',      note: 'Heat, spas & bold reds',         video: '/videos/calistoga.mp4'      },
  { slug: 'yountville',     name: 'Yountville',     note: 'The culinary capital',           video: '/videos/yountville.mp4'     },
  { slug: 'pritchard-hill', name: 'Pritchard Hill', note: 'Cult wines above the valley',    video: '/videos/pritchard-hill.mp4' },
  { slug: 'downtown-napa',  name: 'Downtown Napa',  note: 'The city reinvented',            video: '/videos/downtown-napa.mp4'  },
]

const wineries = [
  { slug: 'opus-one',        name: 'Opus One',        region: 'Oakville',       rating: 98  },
  { slug: 'screaming-eagle', name: 'Screaming Eagle', region: 'Oakville',       rating: 100 },
  { slug: 'harlan-estate',   name: 'Harlan Estate',   region: 'Oakville',       rating: 99  },
  { slug: 'colgin-cellars',  name: 'Colgin Cellars',  region: 'Pritchard Hill', rating: 99  },
  { slug: 'inglenook',       name: 'Inglenook',       region: 'Rutherford',     rating: 96  },
  { slug: 'schramsberg',     name: 'Schramsberg',     region: 'Calistoga',      rating: 95  },
]

const hotels = [
  { slug: 'meadowood',         name: 'Meadowood Napa Valley', category: 'Resort',   price: 'From $1,200'  },
  { slug: 'auberge-du-soleil', name: 'Auberge du Soleil',     category: 'Resort',   price: 'From $900'    },
  { slug: 'poetry-inn',        name: 'Poetry Inn',             category: 'Boutique', price: 'From $900'    },
  { slug: 'bardessono',        name: 'Bardessono',             category: 'Boutique', price: 'From $600'    },
]

export default function HomePage() {
  const [activeRegion, setActiveRegion] = useState(0)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleRegionHover = useCallback((i: number) => {
    setActiveRegion(i)
    videoRefs.current.forEach((v, idx) => {
      if (!v) return
      if (idx === i) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [])

  const handleRegionStripLeave = useCallback(() => {
    setActiveRegion(-1)
    videoRefs.current.forEach((v) => {
      if (!v) return
      v.pause()
      v.currentTime = 0
    })
  }, [])

  const parallax = scrollY * 0.3

  return (
    <div style={{ background: 'var(--ivory)', overflowX: 'hidden' }}>
      <Nav />

      {/* ════════════════════════════════════════════════
          HERO — FULL VIEWPORT VIDEO
      ════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{ position: 'relative', height: '100vh', minHeight: '700px', overflow: 'hidden' }}
      >
        {/* Video layer */}
        <div style={{
          position: 'absolute', inset: '-10% 0',
          transform: `translateY(${parallax}px)`,
          willChange: 'transform',
        }}>
          <video
            autoPlay muted loop playsInline
            onCanPlay={() => setHeroLoaded(true)}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              opacity: heroLoaded ? 1 : 0,
              transition: 'opacity 1.2s ease',
            }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          {/* Poster fallback while video loads */}
          {!heroLoaded && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(160deg, #2a1a10 0%, #1C1612 100%)',
            }} />
          )}
        </div>

        {/* Gradient — fades to ivory at bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(28,22,18,0.25) 0%, rgba(28,22,18,0.1) 30%, rgba(250,247,242,0.6) 72%, var(--ivory) 100%)',
        }} />
        {/* Left warm wash for text legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(100deg, rgba(250,247,242,0.45) 0%, transparent 55%)',
        }} />

        {/* ── MASSIVE HEADLINE ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          zIndex: 2,
        }}>
          {/* Giant NAPA — bleeds right intentionally */}
          <div style={{ overflow: 'hidden', lineHeight: 0.82, paddingLeft: '2.5rem' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24vw, 28vw, 32vw)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--bordeaux)',
                lineHeight: 0.82,
                letterSpacing: '-0.03em',
                margin: 0,
                whiteSpace: 'nowrap',
                transform: `translateY(${scrollY * 0.08}px)`,
                willChange: 'transform',
                opacity: Math.max(0, 1 - scrollY / 400),
              }}
            >
              Napa
            </h1>
          </div>

          {/* VALLEY + editorial detail */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '0 2.5rem',
          }}>
            <div style={{ overflow: 'hidden' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(14vw, 18vw, 22vw)',
                fontWeight: 300,
                color: 'var(--ink)',
                letterSpacing: '-0.025em',
                lineHeight: 0.9,
                display: 'block',
                transform: `translateY(${scrollY * 0.04}px)`,
                willChange: 'transform',
                opacity: Math.max(0, 1 - scrollY / 400),
              }}>
                Valley
              </span>
            </div>

            {/* Editorial tag — bottom right */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-end', gap: '4px',
              paddingBottom: '0.75rem', flexShrink: 0,
              opacity: Math.max(0, 1 - scrollY / 300),
            }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.58rem',
                letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--bordeaux)',
              }}>Wine Spectator</span>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '1rem',
                fontStyle: 'italic', color: 'var(--ink-mid)',
              }}>The Ultimate Guide</span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.58rem',
                letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-light)',
              }}>June 2026</span>
            </div>
          </div>

          {/* Bottom strip */}
          <div style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '1.5rem 2.5rem 3rem',
            borderTop: '1px solid rgba(28,22,18,0.08)',
            marginTop: '1.25rem',
            gap: '2rem',
            opacity: Math.max(0, 1 - scrollY / 250),
          }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.95rem',
              fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.75,
              maxWidth: '48ch', margin: 0,
            }}>
              No wine region on earth compresses so much ambition, history,
              and sheer sensory pleasure into so small a space.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
              <Link href="/wineries" className="btn-primary">Explore Wineries</Link>
              <Link href="/map" className="btn-secondary">Open the Map</Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', right: '2.5rem', zIndex: 3,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          opacity: Math.max(0, 1 - scrollY / 200),
        }}>
          <div style={{
            width: '1px', height: '52px',
            background: 'linear-gradient(to bottom, transparent, var(--bordeaux))',
            animation: 'scrollDrop 2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.52rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--ink-light)', writingMode: 'vertical-rl',
          }}>Scroll</span>
        </div>
        <style>{`
          @keyframes scrollDrop {
            0%,100%{transform:scaleY(0.4);transform-origin:top;opacity:0.3}
            50%{transform:scaleY(1);opacity:1}
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          DARK TRANSITION BAND — JUDGMENT OF PARIS
      ════════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--ink)',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(6rem, 12vw, 11rem) 0',
      }}>
        {/* Giant ghost year */}
        <span style={{
          position: 'absolute',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28vw, 36vw, 44vw)',
          fontWeight: 300,
          color: 'rgba(250,247,242,0.028)',
          lineHeight: 1,
          top: '-8%', right: '-4%',
          pointerEvents: 'none', userSelect: 'none',
          letterSpacing: '-0.04em',
        }}>1976</span>

        <div style={{
          maxWidth: 'var(--container)', margin: '0 auto',
          padding: '0 2.5rem',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '6rem', alignItems: 'center',
          position: 'relative', zIndex: 1,
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.58rem',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'var(--gold)', display: 'block', marginBottom: '2rem',
            }}>Feature — June 2026</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 300, fontStyle: 'italic',
              color: 'var(--ivory)', lineHeight: 1.0,
              letterSpacing: '-0.015em', marginBottom: '2.5rem',
            }}>
              Fifty years after<br />Paris changed<br />everything
            </h2>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)', marginBottom: '2rem', opacity: 0.5 }} />
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1rem',
              color: 'rgba(250,247,242,0.5)', lineHeight: 1.85,
              marginBottom: '3rem', maxWidth: '44ch',
            }}>
              In 1976, a blind tasting in Paris shocked the wine world. Napa Valley
              Cabernets bested the finest wines of France. Half a century later — what
              did it really mean, and what has it wrought?
            </p>
            <Link href="/features/napa-judgment" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.68rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--gold)', textDecoration: 'none',
              borderBottom: '1px solid rgba(184,135,46,0.35)',
              paddingBottom: '3px',
            }}>Read the feature →</Link>
          </div>

          {/* Pull quote */}
          <div style={{ borderLeft: '1px solid rgba(250,247,242,0.08)', paddingLeft: '4rem' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(5rem, 9vw, 9rem)',
              fontWeight: 300, color: 'rgba(250,247,242,0.06)',
              lineHeight: 1, display: 'block', marginBottom: '-1.5rem',
            }}>{'\u201C'}</span>
            <blockquote style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.3rem, 2.2vw, 2rem)',
              fontWeight: 300, fontStyle: 'italic',
              color: 'rgba(250,247,242,0.7)',
              lineHeight: 1.45, margin: 0,
              letterSpacing: '-0.01em',
            }}>
              The tasting that put California on the world wine map — and never let it leave.
            </blockquote>
            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(250,247,242,0.15)' }} />
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.62rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(250,247,242,0.25)',
              }}>Wine Spectator, June 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          REGIONS — VIDEO ACCORDION FILMSTRIP
      ════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--ink)', paddingBottom: 'clamp(5rem, 8vw, 8rem)' }}>
        <div style={{
          maxWidth: 'var(--container)', margin: '0 auto',
          padding: 'clamp(4rem, 6vw, 6rem) 2.5rem 3rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.58rem',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(250,247,242,0.35)', display: 'block', marginBottom: '1rem',
            }}>Six Appellations</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300, color: 'var(--ivory)',
              lineHeight: 1.0, letterSpacing: '-0.015em',
            }}>
              Explore the <em style={{ color: 'var(--gold)' }}>valley</em>
            </h2>
          </div>
          <Link href="/regions" style={{
            fontFamily: 'var(--font-body)', fontSize: '0.62rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'rgba(250,247,242,0.35)', textDecoration: 'none',
          }}>All regions →</Link>
        </div>

        {/* Filmstrip */}
        <div
          role="presentation"
          onMouseLeave={handleRegionStripLeave}
          style={{
            display: 'flex',
            gap: '2px',
            paddingLeft: '2.5rem',
            height: 'clamp(420px, 55vw, 640px)',
            overflow: 'hidden',
          }}
        >
          {regions.map((region, i) => (
            <Link
              key={region.slug}
              href={`/regions/${region.slug}`}
              style={{ textDecoration: 'none', flexShrink: 0, display: 'block' }}
              onMouseEnter={() => handleRegionHover(i)}
            >
              <div style={{
                width: activeRegion === i
                  ? 'clamp(300px, 38vw, 480px)'
                  : 'clamp(60px, 8vw, 100px)',
                height: '100%',
                transition: 'width 0.65s cubic-bezier(0.4,0,0.2,1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}>
                {/* Video */}
                <video
                  ref={(el) => { videoRefs.current[i] = el }}
                  muted loop playsInline
                  preload="metadata"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center',
                    transform: activeRegion === i ? 'scale(1)' : 'scale(1.08)',
                    transition: 'transform 0.65s ease',
                    filter: activeRegion === i
                      ? 'brightness(0.72)'
                      : 'brightness(0.35) saturate(0.5)',
                  }}
                >
                  <source src={region.video} type="video/mp4" />
                </video>

                {/* Gradient */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(28,22,18,0.92) 0%, rgba(28,22,18,0.15) 55%, transparent 100%)',
                }} />

                {/* Collapsed label — vertical */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: activeRegion === i ? 0 : 1,
                  transition: 'opacity 0.3s',
                  pointerEvents: 'none',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8rem', fontWeight: 300,
                    color: 'rgba(250,247,242,0.6)',
                    writingMode: 'vertical-rl',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>{region.name}</span>
                </div>

                {/* Expanded content */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '2rem 2rem 2.5rem',
                  opacity: activeRegion === i ? 1 : 0,
                  transform: activeRegion === i ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.4s 0.2s, transform 0.4s 0.2s',
                  pointerEvents: 'none',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.58rem',
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'var(--gold)', display: 'block', marginBottom: '0.5rem',
                  }}>{String(i + 1).padStart(2, '0')} / 06</span>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                    fontWeight: 300, color: 'var(--ivory)',
                    lineHeight: 1.05, marginBottom: '0.5rem',
                  }}>{region.name}</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: 'rgba(250,247,242,0.55)', fontStyle: 'italic',
                    marginBottom: '1.5rem',
                  }}>{region.note}</p>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.62rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'rgba(250,247,242,0.4)',
                    borderBottom: '1px solid rgba(250,247,242,0.2)',
                    paddingBottom: '2px',
                  }}>Explore →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          COLOR TRANSITION — INK → IVORY
      ════════════════════════════════════════════════ */}
      <div style={{
        height: '12rem',
        background: 'linear-gradient(to bottom, var(--ink) 0%, var(--ivory) 100%)',
      }} />

      {/* ════════════════════════════════════════════════
          LANDMARK WINERIES — ON IVORY
      ════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--ivory)', paddingBottom: 'clamp(5rem, 8vw, 8rem)' }}>
        <div style={{
          maxWidth: 'var(--container)', margin: '0 auto',
          padding: '0 2.5rem 3.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}>
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>
              Landmark Estates
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300, color: 'var(--ink)',
              lineHeight: 1.0, letterSpacing: '-0.015em',
            }}>
              The wines that <em style={{ color: 'var(--bordeaux)' }}>defined</em> a valley
            </h2>
          </div>
          <Link href="/wineries" style={{
            fontFamily: 'var(--font-body)', fontSize: '0.62rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--ink-light)', textDecoration: 'none',
          }}>All wineries →</Link>
        </div>

        {/* 3-col grid of winery cards — minimal, type-led */}
        <div style={{
          maxWidth: 'var(--container)', margin: '0 auto', padding: '0 2.5rem',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
          background: 'var(--ivory-deep)',
        }}>
          {wineries.map((w) => (
            <Link key={w.slug} href={`/wineries/${w.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--ivory)',
                padding: '2.5rem 2rem',
                display: 'flex', flexDirection: 'column',
                gap: '0.6rem',
                transition: 'background 0.25s',
                cursor: 'pointer',
                minHeight: '180px',
                justifyContent: 'flex-end',
                position: 'relative',
              }}
                className="winery-card"
              >
                {/* Score — large, top right */}
                <span style={{
                  position: 'absolute', top: '1.5rem', right: '1.75rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '3.5rem', fontWeight: 300,
                  color: 'var(--ivory-deep)',
                  lineHeight: 1, letterSpacing: '-0.03em',
                  transition: 'color 0.25s',
                }}
                  className="winery-score"
                >{w.rating}</span>

                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'var(--gold)',
                }}>{w.region}</span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  fontWeight: 400, color: 'var(--ink)',
                  lineHeight: 1.15,
                }}>{w.name}</h3>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.62rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--bordeaux)', opacity: 0,
                  transition: 'opacity 0.25s',
                }}
                  className="winery-cta"
                >View profile →</span>
              </div>
            </Link>
          ))}
        </div>
        <style>{`
          .winery-card:hover { background: var(--bordeaux-pale) !important; }
          .winery-card:hover .winery-score { color: rgba(92,26,40,0.15) !important; }
          .winery-card:hover .winery-cta { opacity: 1 !important; }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          DINING — VIDEO BACKGROUND FULL BLEED
      ════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        height: 'clamp(520px, 65vw, 780px)',
        overflow: 'hidden',
      }}>
        <video
          autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        >
          <source src="/videos/dining.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(28,22,18,0.88) 0%, rgba(28,22,18,0.55) 50%, rgba(28,22,18,0.2) 100%)',
        }} />

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'flex-end',
          padding: 'clamp(3rem, 5vw, 5rem) clamp(2.5rem, 5vw, 5rem)',
          maxWidth: 'var(--container)', margin: '0 auto',
        }}>
          <div style={{ maxWidth: '52ch' }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.58rem',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'var(--gold)', display: 'block', marginBottom: '1.25rem',
            }}>Where to Eat</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              fontWeight: 300, color: 'var(--ivory)',
              lineHeight: 1.0, letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}>
              Tables worth<br /><em style={{ color: 'var(--gold)' }}>the journey</em>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1rem',
              color: 'rgba(250,247,242,0.6)', lineHeight: 1.8,
              marginBottom: '2.5rem', maxWidth: '44ch',
            }}>
              From Thomas Keller&apos;s legendary French Laundry to a wood-fired
              dinner at The Charter Oak, Napa&apos;s dining scene rivals any city on earth.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/dining" style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--ink)', background: 'var(--ivory)',
                padding: '0.9rem 2.25rem', textDecoration: 'none',
              }}>Explore Dining</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          IVORY TRANSITION BAND
      ════════════════════════════════════════════════ */}
      <div style={{
        height: '8rem',
        background: 'linear-gradient(to bottom, var(--ink) 0%, var(--ivory-warm) 100%)',
      }} />

      {/* ════════════════════════════════════════════════
          STAY — VIDEO + CARD GRID
      ════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--ivory-warm)', padding: 'clamp(5rem, 8vw, 8rem) 0' }}>
        <div style={{
          maxWidth: 'var(--container)', margin: '0 auto', padding: '0 2.5rem',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', marginBottom: '3.5rem',
          }}>
            <div>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>Where to Stay</span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 300, color: 'var(--ink)',
                lineHeight: 1.0, letterSpacing: '-0.015em',
              }}>
                Rooms worth<br /><em style={{ color: 'var(--gold)' }}>lingering in</em>
              </h2>
            </div>
            <Link href="/stay" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.62rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--ink-light)', textDecoration: 'none',
            }}>All hotels →</Link>
          </div>

          {/* Split: large video left + 4 cards right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2px', background: 'var(--ivory-deep)' }}>
            {/* Video panel */}
            <div style={{ position: 'relative', minHeight: '520px', overflow: 'hidden' }}>
              <video
                autoPlay muted loop playsInline
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center',
                }}
              >
                <source src="/videos/stay.mp4" type="video/mp4" />
              </video>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(28,22,18,0.65) 0%, transparent 50%)',
              }} />
              <div style={{
                position: 'absolute', bottom: '2rem', left: '2rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem', fontStyle: 'italic',
                  color: 'rgba(250,247,242,0.8)',
                }}>Napa Valley&apos;s finest retreats</span>
              </div>
            </div>

            {/* Hotel cards grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr', gap: '2px',
              background: 'var(--ivory-deep)',
            }}>
              {hotels.map((hotel) => (
                <Link key={hotel.slug} href={`/stay/${hotel.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--ivory-warm)',
                    padding: '2rem 1.75rem',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-end', height: '100%',
                    transition: 'background 0.25s',
                    cursor: 'pointer',
                    minHeight: '190px',
                  }}
                    className="hotel-card"
                  >
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.58rem',
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: 'var(--gold)', display: 'block', marginBottom: '0.35rem',
                    }}>{hotel.category}</span>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.15rem', fontWeight: 400,
                      color: 'var(--ink)', lineHeight: 1.2,
                      marginBottom: '0.4rem',
                    }}>{hotel.name}</h3>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                      color: 'var(--ink-light)',
                    }}>{hotel.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <style>{`.hotel-card:hover { background: var(--gold-pale) !important; }`}</style>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          MAP CTA — STARK DARK BAND
      ════════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--ink)',
        padding: 'clamp(5rem, 8vw, 8rem) 0',
        position: 'relative', overflow: 'hidden',
      }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${i * 18}%`, top: 0, bottom: 0,
            width: '1px', background: 'rgba(250,247,242,0.025)',
          }} />
        ))}
        <div style={{
          maxWidth: 'var(--container)', margin: '0 auto',
          padding: '0 2.5rem',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '6rem', alignItems: 'center', position: 'relative', zIndex: 1,
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.58rem',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'var(--gold)', display: 'block', marginBottom: '1.5rem',
            }}>Interactive Map</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300, fontStyle: 'italic',
              color: 'var(--ivory)', lineHeight: 1.0,
              letterSpacing: '-0.015em', marginBottom: '1.75rem',
            }}>
              Every estate,<br />every table,<br />every room
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1rem',
              color: 'rgba(250,247,242,0.45)', lineHeight: 1.85,
              marginBottom: '2.5rem', maxWidth: '44ch',
            }}>
              Thirty-plus locations mapped across six Napa Valley appellations.
              Satellite terrain, AVA boundaries, and full profiles on every pin.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/map" style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--ink)', background: 'var(--ivory)',
                padding: '0.9rem 2.25rem', textDecoration: 'none',
              }}>Open the Map</Link>
              <Link href="/plan" style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)', fontSize: '0.7rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(250,247,242,0.4)',
                border: '1px solid rgba(250,247,242,0.12)',
                padding: '0.9rem 2.25rem', textDecoration: 'none',
              }}>Plan My Visit</Link>
            </div>
          </div>
          {/* Decorative pin cluster */}
          <div style={{
            aspectRatio: '4/3',
            background: 'rgba(250,247,242,0.03)',
            border: '1px solid rgba(250,247,242,0.06)',
            position: 'relative', overflow: 'hidden',
          }}>
            {[
              { x: '32%', y: '48%', c: '#B8872E', s: 14 },
              { x: '52%', y: '36%', c: '#7D2436', s: 12 },
              { x: '22%', y: '62%', c: '#4A5E42', s: 11 },
              { x: '68%', y: '54%', c: '#B8872E', s: 13 },
              { x: '44%', y: '70%', c: '#4A5E42', s: 10 },
              { x: '75%', y: '38%', c: '#7D2436', s: 11 },
              { x: '38%', y: '28%', c: '#B8872E', s: 10 },
            ].map((pin, i) => (
              <div key={i} style={{
                position: 'absolute', left: pin.x, top: pin.y,
                transform: 'translate(-50%, -100%)',
              }}>
                <div style={{
                  width: pin.s, height: pin.s,
                  borderRadius: '50% 50% 50% 0',
                  transform: 'rotate(-45deg)',
                  background: pin.c,
                  border: '1.5px solid rgba(250,247,242,0.5)',
                  boxShadow: `0 0 12px ${pin.c}60`,
                }} />
              </div>
            ))}
            <div style={{
              position: 'absolute', bottom: '1.5rem', left: '1.5rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem', fontStyle: 'italic',
                color: 'rgba(250,247,242,0.3)',
              }}>Napa Valley, California</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          HARVEST CLOSER — VIDEO FULL BLEED
      ════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        minHeight: 'clamp(520px, 65vw, 720px)',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        {/* Reuse hero video for harvest closer */}
        <video
          autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 30%',
            filter: 'brightness(0.45) saturate(1.1)',
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Warm bordeaux tint overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(92,26,40,0.35)',
        }} />

        {/* Ghost word */}
        <span style={{
          position: 'absolute',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22vw, 30vw, 38vw)',
          fontWeight: 300, fontStyle: 'italic',
          color: 'rgba(250,247,242,0.06)',
          lineHeight: 1, right: '-3%', bottom: '-12%',
          pointerEvents: 'none', userSelect: 'none',
          whiteSpace: 'nowrap', letterSpacing: '-0.03em',
        }}>Harvest</span>

        <div style={{
          maxWidth: 'var(--container)', margin: '0 auto',
          padding: 'clamp(5rem, 8vw, 8rem) 2.5rem',
          position: 'relative', zIndex: 1,
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '6rem', alignItems: 'center', width: '100%',
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.58rem',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(250,247,242,0.4)', display: 'block', marginBottom: '1.5rem',
            }}>Plan Your Visit</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300, fontStyle: 'italic',
              color: 'var(--ivory)', lineHeight: 1.0,
              letterSpacing: '-0.015em', marginBottom: '2rem',
            }}>
              When to go &amp;<br />what not to miss
            </h2>
            <div style={{ width: '40px', height: '1px', background: 'rgba(250,247,242,0.2)', marginBottom: '1.75rem' }} />
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1rem',
              color: 'rgba(250,247,242,0.5)', lineHeight: 1.85,
              maxWidth: '44ch', marginBottom: '2.5rem',
            }}>
              From spring bloom to the drama of harvest and the quiet
              intimacy of winter barrel tastings — every season in Napa
              has its pleasures.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/plan" style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--bordeaux)', background: 'var(--ivory)',
                padding: '0.9rem 2.25rem', textDecoration: 'none',
              }}>Build My Itinerary</Link>
              <Link href="/calendar" style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)', fontSize: '0.7rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(250,247,242,0.55)',
                border: '1px solid rgba(250,247,242,0.2)',
                padding: '0.9rem 2.25rem', textDecoration: 'none',
              }}>Events Calendar</Link>
            </div>
          </div>

          {/* Seasons — typographic */}
          <div>
            {[
              { s: 'Spring',  m: 'Mar – May', n: 'Bloom, pruning, cellar tastings' },
              { s: 'Summer',  m: 'Jun – Aug', n: 'Long days, barrel visits, outdoor dining' },
              { s: 'Harvest', m: 'Sep – Oct', n: 'The valley\'s most electric season', hot: true },
              { s: 'Winter',  m: 'Nov – Feb', n: 'Quiet beauty, intimate tastings, best value' },
            ].map(({ s, m, n, hot }) => (
              <div key={s} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                padding: '1.4rem 0',
                borderBottom: '1px solid rgba(250,247,242,0.07)',
                alignItems: 'center', gap: '1rem',
              }}>
                <div>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem', fontWeight: 400,
                    color: hot ? 'var(--ivory)' : 'rgba(250,247,242,0.45)',
                    display: 'block',
                  }}>{s}</span>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.62rem',
                    letterSpacing: '0.1em', color: 'var(--gold)',
                  }}>{m}</span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                  color: hot ? 'rgba(250,247,242,0.6)' : 'rgba(250,247,242,0.3)',
                  lineHeight: 1.55, margin: 0,
                }}>{n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════ */}
      <footer style={{
        background: 'var(--ink)',
        borderTop: '1px solid rgba(250,247,242,0.05)',
        padding: '3rem 0',
      }}>
        <div style={{
          maxWidth: 'var(--container)', margin: '0 auto',
          padding: '0 2.5rem',
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          gap: '2rem', alignItems: 'center',
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.52rem',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'var(--bordeaux)', display: 'block', marginBottom: '3px',
            }}>Wine Spectator</span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem', fontStyle: 'italic',
              color: 'rgba(250,247,242,0.4)',
            }}>Napa Valley Guide — June 2026</span>
          </div>
          <div style={{ width: '1px', height: '32px', background: 'rgba(250,247,242,0.06)' }} />
          <div style={{
            display: 'flex', justifyContent: 'flex-end',
            alignItems: 'center', gap: '2.5rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.62rem',
              color: 'rgba(250,247,242,0.18)',
            }}>© {new Date().getFullYear()} M. Shanken Communications, Inc.</span>
            <a href="https://www.winespectator.com" target="_blank" rel="noopener" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.62rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--gold)', textDecoration: 'none', opacity: 0.65,
            }}>winespectator.com →</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
