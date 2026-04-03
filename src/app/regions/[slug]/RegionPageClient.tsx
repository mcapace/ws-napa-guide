'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, type CSSProperties, type ReactNode } from 'react'
import { regions } from '@/data/regions'
import { wineries } from '@/data/wineries'
import { restaurants } from '@/data/restaurants'
import { hotels } from '@/data/hotels'

const REGION_COLORS: Record<string, string> = {
  oakville: 'linear-gradient(160deg,#1C2E12 0%,#2D4A1E 50%,#1A2610 100%)',
  rutherford: 'linear-gradient(160deg,#2E1A0A 0%,#4A2C16 50%,#1E110A 100%)',
  yountville: 'linear-gradient(160deg,#1E0A2E 0%,#2C1044 50%,#140820 100%)',
  'st-helena': 'linear-gradient(160deg,#1A2E10 0%,#2C4A1C 50%,#122010 100%)',
  calistoga: 'linear-gradient(160deg,#0A1E2E 0%,#102C3A 50%,#081418 100%)',
  'pritchard-hill': 'linear-gradient(160deg,#2E2A0A 0%,#44401C 50%,#201E08 100%)',
  'downtown-napa': 'linear-gradient(160deg,#0A2E20 0%,#104A32 50%,#082018 100%)',
}

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

export default function RegionPageClient({ slug }: { slug: string }) {
  const region = regions.find((r) => r.slug === slug)
  if (!region) notFound()

  const regionWineries = orderedWineries(region.winerySlugs)
  const regionRestaurants = orderedRestaurants(region.restaurantSlugs)
  const regionHotels = orderedHotels(region.hotelSlugs)

  const neighborFull = region.neighborRegions
    .map((s) => regions.find((r) => r.slug === s))
    .filter((r): r is (typeof regions)[number] => r != null)
  const otherRegions =
    neighborFull.length >= 1 ? neighborFull.slice(0, 3) : regions.filter((r) => r.slug !== slug).slice(0, 3)

  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const pullQuote = region.pullQuote ?? region.intro
  const heroSubtitle = region.tagline

  return (
    <>
      {/* ── NAV ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: '24px 36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mixBlendMode: 'difference',
        }}
      >
        <Link href="/">
          <Image
            src="/logos/WS_logo__1_.png"
            alt="Wine Spectator"
            width={140}
            height={20}
            style={{ filter: 'invert(1)', height: '20px', width: 'auto' }}
          />
        </Link>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Link href="/regions" style={navLink}>
            ← All Regions
          </Link>
          <Link href="/map" style={navLink}>
            Map
          </Link>
        </div>
      </nav>

      {/* ── HERO — full bleed, therealhotels style ── */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: REGION_COLORS[slug] ?? 'linear-gradient(160deg,#1C2E12,#2D4A1E)',
            transform: `translateY(${scrollY * 0.3}px)`,
            willChange: 'transform',
          }}
        />
        {/* Dark overlay — strong at bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(13,11,9,0.2) 0%, rgba(13,11,9,0.5) 50%, rgba(13,11,9,0.92) 100%)',
          }}
        />

        {/* AVA badge — top right */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            right: 36,
            padding: '8px 16px',
            border: '1px solid rgba(247,243,236,0.2)',
            borderRadius: 2,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9,
            fontWeight: 400,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(247,243,236,0.6)',
          }}
        >
          Napa Valley Appellation
        </div>

        {/* Hero content — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'relative',
            zIndex: 10,
            padding: '0 60px 64px',
          }}
        >
          {/* Author + issue */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(247,243,236,0.45)',
              marginBottom: 16,
            }}
          >
            By {region.author ?? 'Wine Spectator'} · {region.issue ?? 'June 2026'}
          </p>

          {/* Region name — massive */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(64px,10vw,140px)',
              color: '#F7F3EC',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              marginBottom: 20,
            }}
          >
            {region.name}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 300,
              color: 'rgba(247,243,236,0.55)',
              letterSpacing: '0.04em',
              marginBottom: 36,
            }}
          >
            {heroSubtitle}
          </p>

          {/* Two CTAs — therealhotels pattern */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link
              href={`/map?region=${slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#F7F3EC',
                color: '#0D0B09',
                padding: '14px 28px',
                borderRadius: 2,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Explore on map
            </Link>
            <a
              href="#intro"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(247,243,236,0.6)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(247,243,236,0.25)',
                paddingBottom: 3,
              }}
            >
              Read more ↓
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(247,243,236,0.3)',
          }}
        >
          scroll
        </motion.div>
      </section>

      {/* ── INTRO / PULL QUOTE ── */}
      <section
        id="intro"
        style={{
          background: '#0D0B09',
          padding: '100px 60px 80px',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(26px,3.5vw,44px)',
            color: '#F7F3EC',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            borderLeft: '2px solid #C4943A',
            paddingLeft: 40,
            marginBottom: 48,
          }}
        >
          {pullQuote}
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            fontWeight: 300,
            color: 'rgba(247,243,236,0.7)',
            lineHeight: 1.9,
            letterSpacing: '0.01em',
          }}
        >
          {region.intro}
        </motion.p>
      </section>

      {/* ── WHERE TO TASTE ── */}
      {regionWineries.length > 0 && (
        <Reveal>
          <section style={{ padding: '0 60px 80px', background: '#0D0B09' }}>
            <SectionDivider />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48 }}>
              <SectionLabel>Where to taste</SectionLabel>
              <Link href="/wineries" style={seeAllStyle}>
                All wineries →
              </Link>
            </div>

            {regionWineries.slice(0, 1).map((w) => (
              <FeaturedCard
                key={w.slug}
                href={`/wineries/${w.slug}`}
                eyebrow={w.visitInfo?.appointment ? 'By appointment' : 'Walk-ins welcome'}
                title={w.name}
                body={w.description}
                cta="Reserve a visit →"
                externalHref={w.visitInfo?.website}
                bg={REGION_COLORS[slug] ?? 'linear-gradient(160deg,#1C2E12,#2D4A1E)'}
              />
            ))}

            {regionWineries.slice(1).length > 0 && (
              <div style={{ marginTop: 2 }}>
                {regionWineries.slice(1).map((w) => (
                  <CompactCard
                    key={w.slug}
                    href={`/wineries/${w.slug}`}
                    title={w.name}
                    meta={w.visitInfo?.appointment ? 'By appointment' : 'Walk-ins welcome'}
                    excerpt={w.excerpt ?? `${w.description.slice(0, 120)}…`}
                  />
                ))}
              </div>
            )}
          </section>
        </Reveal>
      )}

      {/* ── WHERE TO EAT ── */}
      {regionRestaurants.length > 0 && (
        <Reveal>
          <section style={{ padding: '0 60px 80px', background: '#0D0B09' }}>
            <SectionDivider />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48 }}>
              <SectionLabel>Where to eat</SectionLabel>
              <Link href="/dining" style={seeAllStyle}>
                All restaurants →
              </Link>
            </div>
            {regionRestaurants.slice(0, 1).map((r) => (
              <FeaturedCard
                key={r.slug}
                href={`/dining/${r.slug}`}
                eyebrow={`${r.cuisine} · ${r.priceRange}`}
                title={r.name}
                body={r.description}
                cta="Make a reservation →"
                externalHref={r.reservations ?? r.website ?? undefined}
                bg="linear-gradient(160deg,#141420,#2A2438)"
              />
            ))}
            {regionRestaurants.slice(1).map((r) => (
              <CompactCard
                key={r.slug}
                href={`/dining/${r.slug}`}
                title={r.name}
                meta={`${r.cuisine} · ${r.priceRange}`}
                excerpt={`${r.description.slice(0, 120)}…`}
              />
            ))}
          </section>
        </Reveal>
      )}

      {/* ── WHERE TO STAY ── */}
      {regionHotels.length > 0 && (
        <Reveal>
          <section style={{ padding: '0 60px 80px', background: '#0D0B09' }}>
            <SectionDivider />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48 }}>
              <SectionLabel>Where to stay</SectionLabel>
              <Link href="/stay" style={seeAllStyle}>
                All hotels →
              </Link>
            </div>
            {regionHotels.map((h) => (
              <CompactCard
                key={h.slug}
                href={`/stay/${h.slug}`}
                title={h.name}
                meta={h.priceRange}
                excerpt={`${h.description.slice(0, 140)}…`}
              />
            ))}
          </section>
        </Reveal>
      )}

      {/* ── ADVENTURE / ITINERARY ── */}
      {region.adventure && (
        <Reveal>
          <section
            style={{
              padding: '80px 60px',
              background: '#1A1612',
              margin: '0 0 0 0',
            }}
          >
            <SectionDivider light />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 9,
                fontWeight: 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C4943A',
                marginBottom: 24,
              }}
            >
              Adventure
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(32px,4vw,56px)',
                color: '#F7F3EC',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: 32,
                maxWidth: 700,
              }}
            >
              {region.adventure.title}
            </h2>
            <div style={{ maxWidth: 720 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 300,
                  color: 'rgba(247,243,236,0.8)',
                  lineHeight: 1.9,
                  marginBottom: 24,
                  fontStyle: 'italic',
                }}
              >
                {region.adventure.intro}
              </p>
              {region.adventure.body.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 300,
                    color: 'rgba(247,243,236,0.65)',
                    lineHeight: 1.9,
                    marginBottom: 20,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </section>
        </Reveal>
      )}

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
            {otherRegions.map((r) => (
              <Link key={r.slug} href={`/regions/${r.slug}`} style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  style={{
                    position: 'relative',
                    height: 280,
                    background: REGION_COLORS[r.slug as string] ?? '#1C2E12',
                    overflow: 'hidden',
                    cursor: 'none',
                    borderRadius: 2,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(13,11,9,0.88) 0%, transparent 60%)',
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px' }}>
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

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: '1px solid rgba(247,243,236,0.08)',
          padding: '48px 60px',
          background: '#0D0B09',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/">
          <Image
            src="/logos/WS_logo__1_.png"
            alt="Wine Spectator"
            width={140}
            height={20}
            style={{ filter: 'invert(1)', height: '18px', width: 'auto', opacity: 0.6 }}
          />
        </Link>
        <div style={{ display: 'flex', gap: 32 }}>
          {[
            ['Map', '/map'],
            ['Wineries', '/wineries'],
            ['Dining', '/dining'],
            ['Stay', '/stay'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 9,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(155,146,131,0.5)',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9,
            color: 'rgba(155,146,131,0.3)',
            letterSpacing: '0.06em',
          }}
        >
          © 2026 M. Shanken Communications, Inc.
        </p>
      </footer>
    </>
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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 10,
        fontWeight: 400,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#9B9283',
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
  bg,
}: {
  href: string
  eyebrow: string
  title: string
  body: string
  cta: string
  externalHref?: string
  bg: string
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
          background: bg,
          minHeight: 380,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(13,11,9,0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 24,
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

function CompactCard({ href, title, meta, excerpt }: { href: string; title: string; meta: string; excerpt: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 40,
          alignItems: 'start',
          padding: '28px 0',
          borderTop: '1px solid rgba(247,243,236,0.07)',
          cursor: 'none',
          background: hovered ? 'rgba(247,243,236,0.02)' : 'transparent',
          transition: 'background 0.3s',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 9,
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C4943A',
              marginBottom: 8,
            }}
          >
            {meta}
          </p>
          <h4
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(20px,2vw,28px)',
              color: '#F7F3EC',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              marginBottom: 10,
            }}
          >
            {title}
          </h4>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 300,
              color: 'rgba(247,243,236,0.5)',
              lineHeight: 1.7,
            }}
          >
            {excerpt}
          </p>
        </div>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 18,
            color: '#F7F3EC',
            opacity: hovered ? 1 : 0.2,
            transition: 'opacity 0.3s',
            marginTop: 6,
          }}
        >
          →
        </span>
      </div>
    </Link>
  )
}

const navLink: CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 10,
  fontWeight: 400,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#F7F3EC',
  textDecoration: 'none',
  opacity: 0.7,
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
