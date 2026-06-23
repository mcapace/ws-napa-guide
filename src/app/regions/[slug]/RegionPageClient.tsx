'use client'

import { notFound, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { motion } from 'framer-motion'
import { useState, Suspense, type CSSProperties, type ReactNode } from 'react'
import { regions } from '@/data/regions'
import { wineries } from '@/data/wineries'
import { restaurants } from '@/data/restaurants'
import { hotels } from '@/data/hotels'
import { RegionDirectorySpread } from './RegionDirectorySpread'
import { YountvillePrintProofs } from './YountvillePrintProofs'
import { YountvilleVerbatimReader } from './YountvilleVerbatimReader'
import { TRH } from './real-hotels-theme'

function orderedWineries(winerySlugs: string[]) {
  return winerySlugs
    .map((s) => wineries.find((w) => w.slug === s))
    .filter((w): w is (typeof wineries)[number] => w != null)
}

function orderedRestaurants(restaurantSlugs: string[]) {
  return restaurantSlugs
    .map((s) => restaurants.find((r) => r.slug === s))
    .filter((r): r is (typeof restaurants)[number] => r != null)
}

function orderedHotels(hotelSlugs: string[]) {
  return hotelSlugs.map((s) => hotels.find((h) => h.slug === s)).filter((h): h is (typeof hotels)[number] => h != null)
}

function RegionPageClientContent({ slug }: { slug: string }) {
  const region = regions.find((r) => r.slug === slug)
  if (!region) notFound()

  const searchParams = useSearchParams()
  const showProofs = searchParams.get('proof') === '1'

  const regionWineries = orderedWineries(region.winerySlugs)
  const regionRestaurants = orderedRestaurants(region.restaurantSlugs)
  const regionHotels = orderedHotels(region.hotelSlugs)

  const neighborFull = region.neighborRegions
    .map((s) => regions.find((r) => r.slug === s))
    .filter((r): r is (typeof regions)[number] => r != null)
  const otherRegions =
    neighborFull.length >= 1 ? neighborFull.slice(0, 3) : regions.filter((r) => r.slug !== slug).slice(0, 3)

  const [expanded, setExpanded] = useState(false)
  const paragraphs = region.body.split(/\n\n+/).filter((p) => p.length > 0)
  const bodyP = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 17,
    lineHeight: 1.75,
    color: 'rgba(13,11,9,0.85)',
    marginBottom: 24,
    textAlign: 'left' as const,
  }

  return (
    <div data-site-surface="light">

      {/* — therealhotels-style hero: absolute layers, italic Cormorant title, no parallax — */}
      <section data-nav-hero-root style={{ position: 'relative', height: '85vh', overflow: 'hidden' }}>
        <Image
          src={region.heroImage}
          alt={region.name}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background:
              'linear-gradient(to bottom, rgba(13,11,9,0.12) 0%, rgba(13,11,9,0.35) 45%, rgba(13,11,9,0.9) 100%)',
          }}
        />
        <div className="hero-top-scrim" aria-hidden />

        <p
          style={{
            position: 'absolute',
            top: 100,
            left: 40,
            zIndex: 3,
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(247,243,236,0.85)',
          }}
        >
          WINE SPECTATOR · NAPA VALLEY GUIDE
        </p>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '42%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            textAlign: 'center',
            width: '100%',
            padding: '0 24px',
            boxSizing: 'border-box',
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(72px, 12vw, 180px)',
              lineHeight: 0.95,
              color: '#F7F3EC',
              margin: 0,
            }}
          >
            {region.name}
          </h1>
          <div
            aria-hidden
            style={{ width: 1, height: 24, margin: '16px auto', background: 'rgba(247,243,236,0.3)' }}
          />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(247,243,236,0.7)',
              margin: 0,
            }}
          >
            {region.name.toUpperCase()}, NAPA VALLEY
          </p>
        </div>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '70%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(247,243,236,0.6)',
              margin: 0,
            }}
          >
            {region.tagline.toUpperCase()}
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(247,243,236,0.6)',
              margin: '10px 0 0',
            }}
          >
            {'BY ' + (region.author ?? 'Wine Spectator').toUpperCase()}
          </p>
        </div>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '85%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
            padding: '0 16px',
            boxSizing: 'border-box',
          }}
        >
          <Link
            href={`/explore?ava=${slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#F7F3EC',
              color: '#0D0B09',
              padding: '13px 32px',
              borderRadius: 9999,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            EXPLORE ON MAP
            <span style={{ marginLeft: 6 }}>↗</span>
          </Link>
          <a
            href="#article"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '13px 32px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#F7F3EC',
              textDecoration: 'none',
              border: '1px solid rgba(247,243,236,0.55)',
              borderRadius: 9999,
            }}
          >
            READ THE ARTICLE
          </a>
        </div>
      </section>

      {/* Article reader: full region.body at #article */}
      <section
        id="article"
        style={{
          background: TRH.editorialBg,
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 60px)',
          maxWidth: 720,
          margin: '0 auto',
        }}
      >
        <header style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(13,11,9,0.55)',
              margin: '0 0 24px',
            }}
          >
            FROM THE JUNE 2026 ISSUE
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: TRH.ink,
              lineHeight: 1.1,
              margin: '0 0 16px',
              textAlign: 'center',
            }}
          >
            {region.tagline}
          </h2>
          {region.author && (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(13,11,9,0.5)',
                margin: '0 0 56px',
                textAlign: 'center',
              }}
            >
              {`BY ${region.author.toUpperCase()}`}
            </p>
          )}
        </header>

        {paragraphs.slice(0, 4).map((text, i) => {
          if (i === 0) {
            const firstChar = text.charAt(0)
            const restOfFirst = text.slice(1)
            return (
              <p key={0} style={{ ...bodyP, overflow: 'hidden' }}>
                <span
                  style={{
                    float: 'left',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontSize: '5.5em',
                    lineHeight: 0.85,
                    color: '#C4943A',
                    paddingRight: 12,
                    marginTop: 6,
                  }}
                >
                  {firstChar}
                </span>
                {restOfFirst}
              </p>
            )
          }
          return (
            <p key={i} style={bodyP}>
              {text}
            </p>
          )
        })}

        {paragraphs.length > 4 && !expanded && (
          <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <div
              style={{
                width: 60,
                height: 1,
                background: '#C4943A',
                margin: '0 auto 20px',
              }}
            />
            <button
              type="button"
              onClick={() => setExpanded(true)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C4943A',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline',
                textUnderlineOffset: 4,
              }}
            >
              CONTINUE READING ↓
            </button>
          </div>
        )}

        {expanded && (
          <div>
            {paragraphs.slice(4).map((text, j) => (
              <p key={j + 4} style={bodyP}>
                {text}
              </p>
            ))}
          </div>
        )}

        {expanded && (
          <p
            style={{
              textAlign: 'center',
              color: TRH.ink,
              fontSize: 12,
              margin: '32px 0 0',
            }}
          >
            ■
          </p>
        )}
      </section>

      {/* ══════ LISTINGS ══════ */}
      {slug === 'yountville' ? (
        <Reveal>
          <RegionDirectorySpread
            region={region}
            regionWineries={regionWineries}
            regionRestaurants={regionRestaurants}
            regionHotels={regionHotels}
          />
        </Reveal>
      ) : (
        <div style={{ background: '#F7F3EC', color: '#0D0B09' }}>
          {/* ── WHERE TO TASTE ── */}
          {regionWineries.length > 0 && (
            <Reveal>
              <section id="where-to-taste" style={{ padding: '60px 60px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
                  <SectionLabel light>Where to taste</SectionLabel>
                  <Link href="/wineries" style={{ ...seeAllStyle, color: '#6B1C2A' }}>All wineries &rarr;</Link>
                </div>

                {regionWineries.map((w) => (
                  <ListingCard
                    key={w.slug}
                    href={`/wineries/${w.slug}`}
                    imageSrc={w.images[0]}
                    title={w.name}
                    location={region.name}
                    eyebrow={w.visitInfo?.appointment ? 'By appointment' : 'Walk-ins welcome'}
                    excerpt={w.excerpt ?? w.description.slice(0, 160) + '...'}
                    primaryCta="Reserve a visit"
                    primaryHref={w.visitInfo?.website}
                  />
                ))}
              </section>
            </Reveal>
          )}

          {/* ── WHERE TO EAT ── */}
          {regionRestaurants.length > 0 && (
            <Reveal>
              <section id="where-to-eat" style={{ padding: '20px 60px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
                  <SectionLabel light>Where to eat</SectionLabel>
                  <Link href="/dining" style={{ ...seeAllStyle, color: '#6B1C2A' }}>All restaurants &rarr;</Link>
                </div>
                {regionRestaurants.map((r) => (
                  <ListingCard
                    key={r.slug}
                    href={`/dining/${r.slug}`}
                    imageSrc={r.images[0]}
                    title={r.name}
                    location={region.name}
                    eyebrow={`${r.cuisine} · ${r.priceRange}`}
                    excerpt={r.excerpt ?? r.description.slice(0, 160) + '...'}
                    primaryCta="Make a reservation"
                    primaryHref={r.reservations ?? r.website ?? undefined}
                  />
                ))}
              </section>
            </Reveal>
          )}

          {/* ── WHERE TO STAY ── */}
          {regionHotels.length > 0 && (
            <Reveal>
              <section id="where-to-stay" style={{ padding: '20px 60px 60px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
                  <SectionLabel light>Where to stay</SectionLabel>
                  <Link href="/stay" style={{ ...seeAllStyle, color: '#6B1C2A' }}>All hotels &rarr;</Link>
                </div>
                {regionHotels.map((h) => (
                  <ListingCard
                    key={h.slug}
                    href={`/stay/${h.slug}`}
                    imageSrc={h.images[0]}
                    title={h.name}
                    location={region.name}
                    eyebrow={h.priceRange}
                    excerpt={h.excerpt ?? h.description.slice(0, 160) + '...'}
                    primaryCta="Book your stay"
                    primaryHref={h.website ?? undefined}
                  />
                ))}
              </section>
            </Reveal>
          )}
        </div>
      )}

      {slug === 'yountville' && showProofs ? (
        <>
          <YountvilleVerbatimReader />
          <YountvillePrintProofs />
        </>
      ) : null}

      {/* ── MORE FROM NAPA — 3-up grid ── */}
      <Reveal>
        <section style={{ padding: '80px 60px 100px', background: '#0D0B09' }}>
          <SectionDivider />
          <SectionLabel>More appellations</SectionLabel>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              marginTop: 48,
            }}
          >
            {otherRegions.map((r, index) => (
              <Link key={r.slug} href={`/regions/${r.slug}`} style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  style={{
                    position: 'relative',
                    height: 280,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    borderRadius: 2,
                  }}
                >
                  <Image
                    src={r.heroImage}
                    alt={r.name}
                    fill
                    sizes="33vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1,
                      background: 'linear-gradient(to top, rgba(13,11,9,0.88) 0%, transparent 60%)',
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '20px 24px' }}>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: 'italic',
                        fontWeight: 300,
                        fontSize: 28,
                        color: '#F7F3EC',
                        lineHeight: 1.1,
                        marginBottom: 4,
                      }}
                    >
                      {r.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 9,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#9B9283',
                      }}
                    >
                      {r.tagline}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Newsletter />
      <Footer />
    </div>
  )
}

export default function RegionPageClient({ slug }: { slug: string }) {
  return (
    <Suspense fallback={null}>
      <RegionPageClientContent slug={slug} />
    </Suspense>
  )
}

function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

function SectionDivider({ light }: { light?: boolean }) {
  return (
    <div
      style={{
        height: 1,
        background: light ? 'rgba(247,243,236,0.06)' : 'rgba(247,243,236,0.08)',
        marginBottom: 40,
      }}
    />
  )
}

function SectionLabel({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: light ? '#6B1C2A' : '#9B9283',
        marginBottom: 0,
      }}
    >
      {children}
    </p>
  )
}

function FeaturedCard({
  href,
  eyebrow,
  title,
  body,
  cta,
  externalHref,
  imageSrc,
}: {
  href: string
  eyebrow: string
  title: string
  body: string
  cta: string
  externalHref?: string
  imageSrc: string
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        marginBottom: 2,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          minHeight: 380,
          position: 'relative',
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="50vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'rgba(13,11,9,0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 24,
            zIndex: 2,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C4943A',
          }}
        >
          {eyebrow}
        </div>
      </div>
      <div
        style={{
          background: '#1A1612',
          padding: '48px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(28px,3vw,44px)',
              color: '#F7F3EC',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 300,
              color: 'rgba(247,243,236,0.65)',
              lineHeight: 1.85,
            }}
          >
            {body.slice(0, 280)}
            {body.length > 280 ? '…' : ''}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 32 }}>
          <Link
            href={href}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#F7F3EC',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(247,243,236,0.3)',
              paddingBottom: 3,
            }}
          >
            Read more →
          </Link>
          {externalHref && (
            <a
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C4943A',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(196,148,58,0.3)',
                paddingBottom: 3,
              }}
            >
              {cta}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/** therealhotels listing card: thumbnail left | name+meta | excerpt | CTAs right */
function ListingCard({
  href,
  imageSrc,
  eyebrow,
  title,
  location,
  excerpt,
  primaryCta,
  primaryHref,
}: {
  href: string
  imageSrc: string
  eyebrow?: string
  title: string
  location?: string
  excerpt: string
  primaryCta: string
  primaryHref?: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '140px 1fr auto',
        gap: 24,
        alignItems: 'start',
        padding: '24px 0',
        borderTop: '1px solid rgba(13,11,9,0.08)',
        background: hovered ? 'rgba(13,11,9,0.03)' : 'transparent',
        transition: 'background 0.3s',
      }}
    >
      {/* Thumbnail */}
      <Link href={href} style={{ display: 'block', position: 'relative', width: 140, height: 100, overflow: 'hidden', flexShrink: 0, borderRadius: 2 }}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="140px"
          style={{
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.6s ease',
          }}
        />
      </Link>

      {/* Name + meta + excerpt */}
      <div style={{ minWidth: 0 }}>
        <Link href={href} style={{ textDecoration: 'none' }}>
          <h4
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(18px, 2vw, 26px)',
              color: '#0D0B09',
              lineHeight: 1.15,
              marginBottom: 4,
            }}
          >
            {title}
          </h4>
        </Link>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#9B9283',
            marginBottom: 8,
          }}
        >
          {location ?? ''}{eyebrow ? ` · ${eyebrow}` : ''}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 300,
            color: 'rgba(13,11,9,0.55)',
            lineHeight: 1.65,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {excerpt}
        </p>
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0, alignItems: 'flex-end' }}>
        {primaryHref && (
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#F7F3EC',
              background: '#0D0B09',
              padding: '8px 16px',
              textDecoration: 'none',
              borderRadius: 2,
              whiteSpace: 'nowrap',
              transition: 'background 0.3s',
            }}
          >
            {primaryCta}
          </a>
        )}
        <Link
          href={href}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9,
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#6B1C2A',
            textDecoration: 'none',
            padding: '8px 16px',
            border: '1px solid rgba(13,11,9,0.15)',
            borderRadius: 2,
            whiteSpace: 'nowrap',
            transition: 'border-color 0.3s, color 0.3s',
          }}
        >
          Read more
        </Link>
      </div>
    </div>
  )
}

const seeAllStyle: CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 10,
  fontWeight: 400,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#9B9283',
  textDecoration: 'none',
  borderBottom: '1px solid rgba(155,146,131,0.3)',
  paddingBottom: 3,
}
