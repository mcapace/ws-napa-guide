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
import { articles } from '@/data/articles'
import { OpenerTwoColumn, YountvilleSpreadLayout } from './YountvilleSpreadLayout'
import { YountvillePrintProofs } from './YountvillePrintProofs'
import { YountvilleVerbatimReader } from './YountvilleVerbatimReader'
import { TRH, trhType, trhLayout } from './real-hotels-theme'

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
  const hasFeatureArticle = articles.some((a) => a.slug === region.articleSlug)
  /** The Real Hotels–style layout (centered hero, light editorial, horizontal listing rows). */
  const trh = slug === 'yountville'

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
          justifyContent: trh ? 'center' : 'flex-end',
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

        {/* AVA badge — top right (hidden on TRH-style centered hero) */}
        {!trh ? (
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
        ) : null}

        {/* Hero content — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'relative',
            zIndex: 10,
            padding: trh ? '0 32px 0' : '0 60px 64px',
            width: '100%',
            maxWidth: trh ? 920 : undefined,
            margin: trh ? '0 auto' : undefined,
            textAlign: trh ? 'center' : 'left',
          }}
        >
          {region.runningHead ? (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 9,
                fontWeight: 400,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(247,243,236,0.42)',
                marginBottom: trh ? 28 : 20,
                maxWidth: 720,
                lineHeight: 1.5,
                marginLeft: trh ? 'auto' : undefined,
                marginRight: trh ? 'auto' : undefined,
              }}
            >
              {region.runningHead}
            </p>
          ) : null}

          {trh ? (
            <>
              {/* Print page 1 masthead: YOUNTVILLE + World-Class Dining, then by-line */}
              <h1
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(40px, 7vw, 72px)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#F7F3EC',
                  lineHeight: 1,
                  margin: '0 0 12px',
                }}
              >
                {region.name}
              </h1>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(22px, 3.5vw, 34px)',
                  color: 'rgba(247,243,236,0.92)',
                  lineHeight: 1.2,
                  margin: '0 0 24px',
                }}
              >
                {heroSubtitle}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(247,243,236,0.45)',
                  marginBottom: 36,
                }}
              >
                By {region.author ?? 'Wine Spectator'}
              </p>
            </>
          ) : (
            <>
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
            </>
          )}

          {/* CTAs — pill pair like The Real Hotels */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              justifyContent: trh ? 'center' : 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href={`/map?region=${slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                background: '#F7F3EC',
                color: '#0D0B09',
                padding: trh ? '13px 32px' : '14px 28px',
                borderRadius: trh ? 9999 : 2,
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
              href={slug === 'yountville' ? '#where-to-taste' : '#intro'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: trh ? '13px 32px' : '0 0 3px 0',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: trh ? '#F7F3EC' : 'rgba(247,243,236,0.6)',
                textDecoration: 'none',
                border: trh ? '1px solid rgba(247,243,236,0.55)' : 'none',
                borderBottom: trh ? 'none' : '1px solid rgba(247,243,236,0.25)',
                borderRadius: trh ? 9999 : 0,
              }}
            >
              {slug === 'yountville' ? 'Read more' : 'Read more ↓'}
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
          background: trh ? TRH.editorialBg : '#0D0B09',
          padding: '100px 60px 80px',
          maxWidth: trh ? 1200 : 900,
          margin: '0 auto',
        }}
      >
        {!trh ? (
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
        ) : null}

        {region.runningHead && region.intro.includes('\n\n') ? (
          <OpenerTwoColumn introText={region.intro} light={trh} />
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: trh ? TRH.inkMuted : 'rgba(247,243,236,0.7)',
              lineHeight: 1.9,
              letterSpacing: '0.01em',
            }}
          >
            {region.intro}
          </motion.p>
        )}
      </section>

      {/* ── AT A GLANCE — terroir, tags, magazine feature (mirrors regions index) ── */}
      <section
        id="at-a-glance"
        style={{
          background: trh ? TRH.editorialBgAlt : '#0D0B09',
          padding: '0 60px 72px',
          borderBottom: trh ? `1px solid ${TRH.rule}` : '1px solid rgba(247,243,236,0.06)',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: trh ? TRH.accent : '#C4943A',
              marginBottom: 20,
            }}
          >
            At a glance
          </p>
          <div
            style={{
              height: 1,
              background: trh ? TRH.ink : region.accentColor,
              opacity: trh ? 0.2 : 0.45,
              maxWidth: 120,
              marginBottom: 28,
            }}
          />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: trh ? TRH.inkFaint : 'rgba(247,243,236,0.38)',
              marginBottom: 12,
            }}
          >
            Terroir & style
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              fontWeight: 300,
              color: trh ? TRH.inkMuted : 'rgba(247,243,236,0.72)',
              lineHeight: 1.85,
              marginBottom: 32,
            }}
          >
            {region.soilNote}
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: trh ? TRH.inkFaint : 'rgba(247,243,236,0.38)',
              marginBottom: 14,
            }}
          >
            Best for
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
            {region.bestFor.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  color: trh ? TRH.inkMuted : 'rgba(247,243,236,0.48)',
                  background: trh ? 'rgba(26,24,22,0.04)' : 'rgba(247,243,236,0.04)',
                  padding: '8px 14px',
                  border: trh ? `1px solid ${TRH.rule}` : '1px solid rgba(247,243,236,0.1)',
                  borderRadius: 2,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          {hasFeatureArticle ? (
            <Link
              href={`/features/${region.articleSlug}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: trh ? TRH.ink : '#F7F3EC',
                textDecoration: 'none',
                borderBottom: trh ? `1px solid ${TRH.ruleStrong}` : '1px solid rgba(247,243,236,0.35)',
                paddingBottom: 4,
                display: 'inline-block',
              }}
            >
              Read the Wine Spectator feature &rarr;
            </Link>
          ) : null}
        </div>
      </section>

      {slug === 'yountville' ? (
        <nav
          aria-label="Jump to section"
          style={{
            position: 'sticky',
            top: 72,
            zIndex: 50,
            background: trh ? 'rgba(255,255,255,0.94)' : 'rgba(13,11,9,0.92)',
            backdropFilter: 'blur(8px)',
            borderBottom: trh ? `1px solid ${TRH.rule}` : '1px solid rgba(247,243,236,0.08)',
            padding: '14px 60px',
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 28px',
              justifyContent: 'center',
            }}
          >
            {(
              [
                ['Taste', '#where-to-taste'],
                ['Oak Knoll', '#oak-knoll'],
                ['Eat', '#where-to-eat'],
                ['Stay', '#where-to-stay'],
                ['Culture', '#region-culture'],
                ['Adventure', '#adventure'],
                ['Full text', '#yountville-verbatim'],
                ['Print spreads', '#print-spreads'],
              ] as const
            ).map(([label, hash]) => (
              <a
                key={hash}
                href={hash}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: trh ? TRH.inkFaint : 'rgba(247,243,236,0.55)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}

      {/* ── EDITORIAL BODY on LIGHT background ── */}
      {region.body && (
        <Reveal>
          <div
            style={{
              background: slug === 'yountville' ? TRH.editorialBg : '#F7F3EC',
              color: slug === 'yountville' ? TRH.ink : '#0D0B09',
            }}
          >
            <section style={{ padding: '80px 60px', maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
                <div>
                  {region.body.split('\n\n').filter(Boolean).slice(0, 6).map((para, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 15,
                        fontWeight: 300,
                        color: slug === 'yountville' ? TRH.inkMuted : 'rgba(13,11,9,0.7)',
                        lineHeight: 1.9,
                        marginBottom: 24,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
                <div style={{ position: 'sticky', top: 100, aspectRatio: '3/4', overflow: 'hidden', borderRadius: 2 }}>
                  <Image
                    src={regionWineries[0]?.images[0] ?? region.heroImage}
                    alt=""
                    fill
                    sizes="50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Second block: remaining paragraphs with image left */}
              {region.body.split('\n\n').filter(Boolean).length > 6 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start', marginTop: 60 }}>
                  <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 2 }}>
                    <Image
                      src={regionWineries[1]?.images[0] ?? region.heroImage}
                      alt=""
                      fill
                      sizes="50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    {region.body.split('\n\n').filter(Boolean).slice(6, 12).map((para, i) => (
                      <p
                        key={i}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 15,
                          fontWeight: 300,
                          color: slug === 'yountville' ? TRH.inkMuted : 'rgba(13,11,9,0.7)',
                          lineHeight: 1.9,
                          marginBottom: 24,
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </Reveal>
      )}

      {/* ══════ LISTINGS ══════ */}
      {slug === 'yountville' ? (
        <Reveal>
          <YountvilleSpreadLayout
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

      {/* ── ADVENTURE / ITINERARY ── */}
      {region.adventure && (
        <Reveal>
          <section
            id="adventure"
            style={{
              padding: `${trhLayout.sectionPadYMain} ${trhLayout.sectionPadX}`,
              background: trh ? TRH.editorialBg : '#1A1612',
              margin: 0,
              borderTop: trh ? `1px solid ${TRH.rule}` : undefined,
            }}
          >
            <div
              style={{
                height: 1,
                background: trh ? TRH.rule : 'rgba(247,243,236,0.06)',
                marginBottom: 40,
              }}
            />
            <p
              style={
                trh
                  ? { ...trhType.eyebrow(TRH.accent), marginBottom: 24 }
                  : {
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 9,
                      fontWeight: 400,
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: '#C4943A',
                      marginBottom: 24,
                    }
              }
            >
              Adventure
            </p>
            <h2
              style={
                trh
                  ? {
                      ...trhType.displayRoman(TRH.ink),
                      fontSize: 'clamp(1.75rem, 3.5vw, 3.5rem)',
                      lineHeight: 1.05,
                      marginBottom: 32,
                      maxWidth: 700,
                    }
                  : {
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: 'italic',
                      fontWeight: 300,
                      fontSize: 'clamp(32px,4vw,56px)',
                      color: '#F7F3EC',
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                      marginBottom: 32,
                      maxWidth: 700,
                    }
              }
            >
              {region.adventure.title}
            </h2>
            <div style={{ maxWidth: 720 }}>
              <p
                style={
                  trh
                    ? { ...trhType.body(TRH.inkMuted), marginBottom: 24, fontStyle: 'italic' }
                    : {
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 15,
                        fontWeight: 300,
                        color: 'rgba(247,243,236,0.8)',
                        lineHeight: 1.9,
                        marginBottom: 24,
                        fontStyle: 'italic',
                      }
                }
              >
                {region.adventure.intro}
              </p>
              {region.adventure.body.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  style={
                    trh
                      ? { ...trhType.bodyTight(TRH.inkMuted), marginBottom: 20 }
                      : {
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          fontWeight: 300,
                          color: 'rgba(247,243,236,0.65)',
                          lineHeight: 1.9,
                          marginBottom: 20,
                        }
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {slug === 'yountville' ? (
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
