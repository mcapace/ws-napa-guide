'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import type { RegionData } from '@/data/regions'
import type { Hotel, Restaurant, Winery } from '@/lib/types'
import { TRH, trhType, trhLayout } from './real-hotels-theme'

const bodyLight: CSSProperties = trhType.body()

function SeriesSectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <header style={{ textAlign: 'center', margin: '0 0 48px' }}>
      <div
        style={{
          width: 48,
          height: 1,
          background: TRH.ruleStrong,
          margin: '0 auto 20px',
        }}
      />
      {subtitle ? (
        <p style={{ ...trhType.eyebrow(), letterSpacing: '0.28em', marginBottom: 12 }}>{subtitle}</p>
      ) : null}
      <h2 style={trhType.sectionTitle()}>{children}</h2>
    </header>
  )
}

/** Print-style two-column opener — `light` matches The Real Hotels editorial band. */
export function OpenerTwoColumn({ introText, light }: { introText: string; light?: boolean }) {
  const [a = '', b = ''] = introText.split(/\n\n/).filter(Boolean)
  const drop = a[0]
  const aRest = a.slice(1)
  const body = light ? bodyLight : { ...bodyLight, color: 'rgba(247,243,236,0.72)' }
  const dropColor = light ? TRH.ink : '#F7F3EC'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, delay: 0.08 }}
      className="trh-opener-grid"
    >
      <p style={body}>
        {drop && (
          <span
            style={{
              float: 'left',
              fontFamily: TRH.fontDisplay,
              fontSize: 'clamp(4rem, 6vw, 5.5rem)',
              lineHeight: 0.82,
              paddingRight: 12,
              marginTop: -4,
              color: dropColor,
              fontWeight: 400,
            }}
            aria-hidden
          >
            {drop}
          </span>
        )}
        {aRest}
      </p>
      <p style={body}>{b}</p>
    </motion.div>
  )
}

function SectionEditLead({ text, dropCap }: { text: string; dropCap?: boolean }) {
  const t = text.trim()
  if (!t) return null
  if (!dropCap) {
    return <p style={{ ...bodyLight, maxWidth: 900, margin: '0 auto 48px', textAlign: 'center' as const }}>{t}</p>
  }
  const c = t[0]
  return (
    <div
      className="trh-dropcap-columns"
      style={{
        maxWidth: 1000,
        margin: '0 auto 48px',
      }}
    >
      <p style={{ ...bodyLight, marginBottom: 0 }}>
        <span
          style={{
            float: 'left',
            fontFamily: TRH.fontDisplay,
            fontSize: 'clamp(3.25rem, 5vw, 4.25rem)',
            lineHeight: 0.85,
            paddingRight: 10,
            marginTop: -2,
            color: TRH.ink,
            fontWeight: 400,
          }}
          aria-hidden
        >
          {c}
        </span>
        {t.slice(1)}
      </p>
    </div>
  )
}

function PrintCaption({ label }: { label: string }) {
  return (
    <span
      style={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        zIndex: 3,
        background: TRH.sageLabel,
        color: '#F7F3EC',
        fontFamily: TRH.fontSans,
        fontSize: 8,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        padding: '8px 12px',
      }}
    >
      {label}
    </span>
  )
}

function AlsoRecommendedRailLight({ title, items }: { title: string; items: { name: string; lines?: string[] }[] }) {
  return (
    <aside style={{ borderLeft: `1px solid ${TRH.rule}`, paddingLeft: 28 }}>
      <p style={{ ...trhType.eyebrow(), marginBottom: 20 }}>{title}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((it) => (
          <li key={it.name} style={{ marginBottom: 18 }}>
            <span
              style={{
                display: 'block',
                ...trhType.displayItalic(TRH.accent),
                fontSize: 17,
                marginBottom: 4,
              }}
            >
              {it.name}
            </span>
            {it.lines?.map((line) => (
              <span
                key={line}
                style={{
                  display: 'block',
                  fontFamily: TRH.fontSans,
                  fontSize: 11,
                  fontWeight: 300,
                  color: TRH.inkFaint,
                  lineHeight: 1.5,
                }}
              >
                {line}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </aside>
  )
}

const pillPrimary: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: TRH.pillBg,
  color: TRH.pillText,
  padding: '11px 26px',
  borderRadius: 9999,
  fontFamily: TRH.fontSans,
  fontSize: 9,
  fontWeight: 500,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  border: 'none',
}

const textLinkUpper: CSSProperties = {
  fontFamily: TRH.fontSans,
  fontSize: 9,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: TRH.ink,
  textDecoration: 'none',
  borderBottom: `1px solid ${TRH.ruleStrong}`,
  paddingBottom: 3,
}

/** The Real Hotels–style horizontal directory row. */
function SeriesListingRow({
  href,
  imageSrc,
  title,
  locationLine,
  eyebrow,
  excerpt,
  primaryCta,
  primaryHref,
  expanded,
}: {
  href: string
  imageSrc: string
  title: string
  locationLine: string
  eyebrow?: string
  excerpt: string
  primaryCta: string
  primaryHref?: string
  /** Show full excerpt (print-style flagship blurbs). */
  expanded?: boolean
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(140px, 160px) 1fr auto',
        gap: 'clamp(20px, 3vw, 36px)',
        alignItems: 'start',
        padding: '36px 0',
        borderTop: `1px solid ${TRH.rule}`,
      }}
    >
      <Link href={href} style={{ display: 'block', position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 2 }}>
        <Image src={imageSrc} alt={title} fill sizes="180px" style={{ objectFit: 'cover' }} />
      </Link>
      <div style={{ minWidth: 0 }}>
        <Link href={href} style={{ textDecoration: 'none' }}>
          <h3 style={trhType.listingTitle()}>{title}</h3>
        </Link>
        <p style={{ ...trhType.meta(), margin: '0 0 14px' }}>
          {locationLine}
          {eyebrow ? ` · ${eyebrow}` : ''}
        </p>
        <p
          style={{
            ...trhType.listingExcerpt(),
            ...(expanded
              ? {}
              : {
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }),
          }}
        >
          {excerpt}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end', flexShrink: 0, paddingTop: 4 }}>
        {primaryHref ? (
          <a href={primaryHref} target="_blank" rel="noopener noreferrer" style={pillPrimary}>
            {primaryCta}
          </a>
        ) : null}
        <Link href={href} style={textLinkUpper}>
          Read more
        </Link>
      </div>
    </div>
  )
}

function TasteQuickListGrid({ items, label }: { items: { name: string; lines?: string[] }[]; label: string }) {
  if (!items.length) return null
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto 56px' }}>
      <p style={{ ...trhType.eyebrow(), marginBottom: 28, textAlign: 'center' }}>
        {label}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px clamp(32px, 5vw, 72px)',
        }}
      >
        {items.map((it) => (
          <div key={it.name}>
            <span
              style={{
                display: 'block',
                ...trhType.displayItalic(TRH.sageLabel),
                fontSize: 20,
                marginBottom: 6,
              }}
            >
              {it.name}
            </span>
            {it.lines?.map((line) => (
              <span
                key={line}
                style={{
                  display: 'block',
                  fontFamily: TRH.fontSans,
                  fontSize: 12,
                  color: TRH.inkMuted,
                  lineHeight: 1.5,
                }}
              >
                {line}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function ShowMoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <div style={{ textAlign: 'center', marginTop: 8, paddingTop: 40 }}>
      <Link
        href={href}
        style={{
          ...pillPrimary,
          background: 'transparent',
          color: TRH.ink,
          border: `1px solid ${TRH.ruleStrong}`,
        }}
      >
        {children}
      </Link>
    </div>
  )
}

export function YountvilleSpreadLayout({
  region,
  regionWineries,
  regionRestaurants,
  regionHotels,
}: {
  region: RegionData
  regionWineries: Winery[]
  regionRestaurants: Restaurant[]
  regionHotels: Hotel[]
}) {
  const tasteIntro = region.whereToTasteIntro ?? ''
  const eatIntro = region.whereToEatIntro ?? ''
  const stayIntro = region.whereToStayIntro ?? ''
  const alsoEat = region.alsoRecommendedEat ?? []
  const alsoStay = region.alsoRecommendedStay ?? []
  const culture = region.cultureBlock
  const tasteQuick = region.tasteQuickList ?? []
  const alsoTaste = region.alsoRecommendedTaste ?? []
  const oakKnoll = region.oakKnollBlock

  const [stewart, clos, lewis] = regionWineries
  const [adHoc, clem, ...otherRest] = regionRestaurants
  const [sttupa, bard] = regionHotels

  return (
    <div style={{ background: TRH.editorialBg, color: TRH.ink }}>
      {regionWineries.length > 0 && tasteIntro && (
        <section
          id="where-to-taste"
          style={{ padding: `${trhLayout.sectionPadYMain} ${trhLayout.sectionPadX} clamp(2.5rem, 5vw, 3.5rem)` }}
        >
          <SeriesSectionTitle subtitle="More from this guide">Where to taste</SeriesSectionTitle>
          <SectionEditLead text={tasteIntro} dropCap />

          {stewart && (
            <div className="trh-feature-split">
              <div style={{ position: 'relative', minHeight: 420 }}>
                <Image src={stewart.images[0]} alt={stewart.name} fill sizes="55vw" style={{ objectFit: 'cover', borderRadius: 2 }} />
                <PrintCaption label={stewart.name.replace(' Cellars', '')} />
              </div>
              <div>
                <h3 style={{ ...trhType.displayItalic(TRH.ink), fontSize: 'clamp(1.5rem, 2.5vw, 2.625rem)', marginBottom: 8 }}>
                  {stewart.name}
                </h3>
                <p
                  style={{
                    fontFamily: TRH.fontSans,
                    fontSize: 12,
                    fontStyle: 'italic',
                    color: TRH.inkFaint,
                    marginBottom: 20,
                  }}
                >
                  6752 Washington St. · stewartscellars.com
                </p>
                <p style={{ ...bodyLight, marginBottom: 28 }}>{stewart.description}</p>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                  {stewart.visitInfo?.website ? (
                    <a href={stewart.visitInfo.website} target="_blank" rel="noopener noreferrer" style={pillPrimary}>
                      Reserve
                    </a>
                  ) : null}
                  <Link href={`/wineries/${stewart.slug}`} style={{ ...textLinkUpper, borderColor: TRH.accent, color: TRH.accent }}>
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          )}

          <TasteQuickListGrid items={tasteQuick} label="Yountville · also taste" />

          <div
            className={alsoTaste.length > 0 ? 'trh-directory-split' : undefined}
            style={{
              display: 'grid',
              ...(alsoTaste.length ? {} : { gridTemplateColumns: '1fr', maxWidth: 1180, margin: '0 auto' }),
            }}
          >
            {alsoTaste.length > 0 ? (
              <AlsoRecommendedRailLight title="Stags Leap District" items={alsoTaste} />
            ) : null}
            <div style={{ minWidth: 0 }}>
              {clos ? (
                <SeriesListingRow
                  href={`/wineries/${clos.slug}`}
                  imageSrc={clos.images[0]}
                  title={clos.name}
                  locationLine="Stags Leap District"
                  eyebrow={clos.visitInfo?.appointment ? 'By appointment' : 'Walk-ins welcome'}
                  excerpt={clos.description}
                  primaryCta="Reserve"
                  primaryHref={clos.visitInfo?.website}
                  expanded
                />
              ) : null}
              {lewis ? (
                <SeriesListingRow
                  href={`/wineries/${lewis.slug}`}
                  imageSrc={lewis.images[0]}
                  title={lewis.name}
                  locationLine="Stags Leap District"
                  eyebrow={lewis.visitInfo?.appointment ? 'By appointment' : 'Walk-ins welcome'}
                  excerpt={lewis.description}
                  primaryCta="Reserve"
                  primaryHref={lewis.visitInfo?.website}
                  expanded
                />
              ) : null}
            </div>
          </div>

          {oakKnoll ? (
            <div
              id="oak-knoll"
              style={{
                maxWidth: 1180,
                margin: '64px auto 0',
                paddingTop: 56,
                borderTop: `1px solid ${TRH.rule}`,
              }}
            >
              <p style={{ ...trhType.eyebrow(), letterSpacing: '0.28em', marginBottom: 12, textAlign: 'center' }}>
                More from this guide
              </p>
              <h3 style={{ ...trhType.displayRoman(TRH.ink), fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', textAlign: 'center', margin: '0 0 24px' }}>
                {oakKnoll.sectionTitle}
              </h3>
              {oakKnoll.intro ? (
                <p style={{ ...bodyLight, maxWidth: 720, margin: '0 auto 40px', textAlign: 'center' }}>{oakKnoll.intro}</p>
              ) : null}
              <div className="trh-rail-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                  {oakKnoll.featured.map((f) => (
                    <article key={f.name}>
                      <h4 style={{ ...trhType.displayItalic(TRH.sageLabel), fontSize: 26, margin: '0 0 8px' }}>
                        {f.name}
                      </h4>
                      <p
                        style={{
                          fontFamily: TRH.fontSans,
                          fontSize: 12,
                          fontStyle: 'italic',
                          color: TRH.inkFaint,
                          marginBottom: 14,
                        }}
                      >
                        {f.lines.join(' · ')}
                      </p>
                      <p style={{ ...bodyLight, margin: 0 }}>{f.body}</p>
                    </article>
                  ))}
                </div>
                <AlsoRecommendedRailLight title="Also recommended" items={oakKnoll.sidebar} />
              </div>
            </div>
          ) : null}

          <ShowMoreLink href="/wineries">Show more wineries</ShowMoreLink>
        </section>
      )}

      {regionRestaurants.length > 0 && eatIntro && (
        <section
          id="where-to-eat"
          style={{
            padding: `${trhLayout.sectionPadYMain} ${trhLayout.sectionPadX} clamp(2.5rem, 5vw, 3.5rem)`,
            background: TRH.editorialBgAlt,
            borderTop: `1px solid ${TRH.rule}`,
          }}
        >
          <SeriesSectionTitle subtitle="More from this guide">Where to eat</SeriesSectionTitle>
          <div className="trh-rail-grid" style={{ marginBottom: 40 }}>
            <SectionEditLead text={eatIntro} dropCap={false} />
            {alsoEat.length > 0 ? <AlsoRecommendedRailLight title="Also recommended" items={alsoEat} /> : null}
          </div>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            {adHoc ? (
              <SeriesListingRow
                href={`/dining/${adHoc.slug}`}
                imageSrc={adHoc.images[0]}
                title={adHoc.name}
                locationLine={region.name}
                eyebrow={`${adHoc.cuisine} · ${adHoc.priceRange}`}
                excerpt={adHoc.excerpt ?? adHoc.description}
                primaryCta="Reservations"
                primaryHref={adHoc.reservations ?? adHoc.website ?? undefined}
              />
            ) : null}
            {clem ? (
              <SeriesListingRow
                href={`/dining/${clem.slug}`}
                imageSrc={clem.images[0]}
                title={clem.name}
                locationLine={region.name}
                eyebrow={`${clem.cuisine} · ${clem.priceRange}`}
                excerpt={clem.excerpt ?? clem.description}
                primaryCta="Reservations"
                primaryHref={clem.reservations ?? clem.website ?? undefined}
              />
            ) : null}
            {otherRest.map((r) => (
              <SeriesListingRow
                key={r.slug}
                href={`/dining/${r.slug}`}
                imageSrc={r.images[0]}
                title={r.name}
                locationLine={region.name}
                eyebrow={`${r.cuisine} · ${r.priceRange}`}
                excerpt={r.excerpt ?? r.description}
                primaryCta="Reservations"
                primaryHref={r.reservations ?? r.website ?? undefined}
              />
            ))}
          </div>
          <ShowMoreLink href="/dining">Show more dining</ShowMoreLink>
        </section>
      )}

      {regionHotels.length > 0 && stayIntro && (
        <section
          id="where-to-stay"
          style={{
            padding: `${trhLayout.sectionPadYMain} ${trhLayout.sectionPadX} clamp(3rem, 6vw, 4rem)`,
            borderTop: `1px solid ${TRH.rule}`,
          }}
        >
          <SeriesSectionTitle subtitle="More from this guide">Where to stay</SeriesSectionTitle>
          <div className="trh-rail-grid" style={{ marginBottom: 40 }}>
            <SectionEditLead text={stayIntro} dropCap={false} />
            {alsoStay.length > 0 ? <AlsoRecommendedRailLight title="Also recommended" items={alsoStay} /> : null}
          </div>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            {sttupa ? (
              <SeriesListingRow
                href={`/stay/${sttupa.slug}`}
                imageSrc={sttupa.images[0]}
                title={sttupa.name}
                locationLine={region.name}
                eyebrow={sttupa.priceRange}
                excerpt={sttupa.excerpt ?? sttupa.description}
                primaryCta="Book"
                primaryHref={sttupa.website}
              />
            ) : null}
            {bard ? (
              <SeriesListingRow
                href={`/stay/${bard.slug}`}
                imageSrc={bard.images[0]}
                title={bard.name}
                locationLine={region.name}
                eyebrow={bard.priceRange}
                excerpt={bard.excerpt ?? bard.description}
                primaryCta="Book"
                primaryHref={bard.website}
              />
            ) : null}
          </div>
          <ShowMoreLink href="/stay">Show more hotels</ShowMoreLink>
        </section>
      )}

      {culture && (
        <section
          id="region-culture"
          style={{
            padding: `${trhLayout.sectionPadYMain} ${trhLayout.sectionPadX} clamp(4rem, 9vw, 6rem)`,
            background: TRH.editorialBgAlt,
            borderTop: `1px solid ${TRH.rule}`,
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ ...trhType.eyebrowAccent(), marginBottom: 12 }}>{culture.title}</p>
            {culture.subtitle ? (
              <h3 style={{ ...trhType.displayItalic(TRH.ink), fontSize: 'clamp(1.75rem, 3.5vw, 2.875rem)', margin: 0 }}>
                {culture.subtitle}
              </h3>
            ) : null}
          </div>
          <p style={{ ...bodyLight, maxWidth: 720, margin: '0 auto 44px', textAlign: 'center' }}>{culture.intro}</p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 28,
              maxWidth: 1180,
              margin: '0 auto',
            }}
          >
            {culture.spots.map((s) => (
              <div
                key={s.name}
                style={{
                  paddingBottom: 16,
                  borderBottom: `1px solid ${TRH.rule}`,
                }}
              >
                <span style={{ ...trhType.displayItalic(TRH.accent), fontSize: 20, display: 'block', marginBottom: 8 }}>
                  {s.name}
                </span>
                <span style={{ ...bodyLight, fontSize: 14, color: TRH.inkMuted }}>{s.detail}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
