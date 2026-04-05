'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { motion } from 'framer-motion'
import { useState, useEffect, type CSSProperties, type ReactNode } from 'react'
import { regions } from '@/data/regions'
import { wineries } from '@/data/wineries'
import { restaurants } from '@/data/restaurants'
import { hotels } from '@/data/hotels'

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
        <Image
          src={region.heroImage}
          alt={region.name}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            transform: `translateY(${scrollY * 0.3}px)`,
            willChange: 'transform',
          }}
        />
        {/* Dark overlay — strong at bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(to bottom, rgba(13,11,9,0.2) 0%, rgba(13,11,9,0.5) 50%, rgba(13,11,9,0.92) 100%)',
          }}
        />

        {/* AVA badge — top right */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            right: 36,
            zIndex: 2,
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
            zIndex: 2,
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

      {/* ══════ LISTINGS: LIGHT THEME (therealhotels pattern) ══════ */}
      <div style={{ background: '#F7F3EC', color: '#0D0B09' }}>

      {/* ── WHERE TO TASTE ── */}
      {regionWineries.length > 0 && (
        <Reveal>
          <section style={{ padding: '60px 60px 40px' }}>
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
          <section style={{ padding: '20px 60px 40px' }}>
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
          <section style={{ padding: '20px 60px 60px' }}>
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

      </div>{/* close light theme listings wrapper */}

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
