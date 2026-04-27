'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { RegionData } from '@/data/regions'
import type { Hotel, Restaurant, Winery } from '@/lib/types'
import { TRH, trhType, trhLayout } from './real-hotels-theme'

const bodyLight: CSSProperties = trhType.body()
const trhSectionGapY = 120
const trhEntryGapY = 80
const trhDirectoryRowGapY = 36
const trhImageHover = '0.6s cubic-bezier(0.25,0.46,0.45,0.94)'

const hotelCategoryLabel: Record<Hotel['category'], string> = {
  resort: 'Resort',
  boutique: 'Boutique hotel',
  inn: 'Country inn',
  villa: 'Private villa',
}

function truncateForDirectory(fallback: string): string {
  const t = fallback.trim()
  if (!t) return ''
  const sents = t.match(/[^.!?]+[.!?]+/g) || []
  const from3 = sents.slice(0, 3).join(' ').replace(/\s+/g, ' ').trim()
  const candidate = from3 && from3.length ? from3 : t
  if (candidate.length <= 400) return candidate
  const sub = candidate.slice(0, 400)
  const e = Math.max(sub.lastIndexOf('.'), sub.lastIndexOf('!'), sub.lastIndexOf('?'))
  if (e > 20) return candidate.slice(0, e + 1).trim()
  return sub.trim() + '…'
}

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

const directoryEyebrow: CSSProperties = {
  fontFamily: TRH.fontSans,
  fontSize: 11,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#C4943A',
  marginBottom: 8,
  fontWeight: 500,
}

const directoryTitle: CSSProperties = {
  fontFamily: TRH.fontDisplay,
  fontStyle: 'italic',
  fontWeight: 300,
  fontSize: 'clamp(26px, 2.2vw, 30px)',
  color: TRH.ink,
  lineHeight: 1.2,
  margin: '0 0 10px',
}

const directoryBody: CSSProperties = {
  fontFamily: TRH.fontSans,
  fontSize: 15,
  lineHeight: 1.7,
  color: TRH.inkMuted,
  margin: 0,
  flex: '1 1 auto',
  minHeight: 0,
}

const readMoreDirectory: CSSProperties = {
  fontFamily: TRH.fontSans,
  fontSize: 10,
  color: TRH.ink,
  textDecoration: 'underline',
  textUnderlineOffset: 4,
}

/** Dense single-column directory row: image left ~40%, content right; Read more only when `wsEditorial === true`. */
function SeriesListingRow({
  href,
  imageSrc,
  title,
  eyebrowText,
  body,
  primaryLabel,
  primaryHref,
  wsEditorial,
}: {
  href: string
  imageSrc: string
  title: string
  eyebrowText: string
  body: string
  primaryLabel: string
  primaryHref?: string
  wsEditorial?: boolean
}) {
  const [imgHover, setImgHover] = useState(false)
  const showReadMore = wsEditorial === true
  return (
    <article className="trh-directory-row">
      <div className="trh-directory-row__image">
        <Link
          href={href}
          onMouseEnter={() => setImgHover(true)}
          onMouseLeave={() => setImgHover(false)}
          aria-label={title}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 699px) 100vw, 38vw"
            style={{
              objectFit: 'cover',
              transform: imgHover ? 'scale(1.03)' : 'scale(1)',
              transition: `transform ${trhImageHover}`,
            }}
          />
        </Link>
      </div>
      <div className="trh-directory-row__content" style={{ background: TRH.editorialBg }}>
        <p style={directoryEyebrow}>{eyebrowText}</p>
        <h3 style={directoryTitle}>{title}</h3>
        <p style={directoryBody}>{body}</p>
        <div
          className="trh-directory-row__ctaRow"
          style={{
            justifyContent: primaryHref && showReadMore ? 'space-between' : 'flex-start',
          }}
        >
          {primaryHref ? (
            <a href={primaryHref} target="_blank" rel="noopener noreferrer" style={pillPrimary}>
              {primaryLabel}
            </a>
          ) : null}
          {showReadMore ? (
            <Link href={href} style={readMoreDirectory}>
              Read more
            </Link>
          ) : null}
        </div>
      </div>
    </article>
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

export function RegionDirectorySpread({
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
  const isYountville = region.slug === 'yountville'
  const tasteIntro = region.whereToTasteIntro ?? ''
  const eatIntro = region.whereToEatIntro ?? ''
  const stayIntro = region.whereToStayIntro ?? ''
  const alsoEat = region.alsoRecommendedEat ?? []
  const alsoStay = region.alsoRecommendedStay ?? []
  const culture = region.cultureBlock
  const tasteQuick = region.tasteQuickList ?? []
  const alsoTaste = region.alsoRecommendedTaste ?? []
  const oakKnoll = region.oakKnollBlock

  const [firstWinery, ...moreWineries] = regionWineries

  return (
    <div style={{ background: TRH.editorialBg, color: TRH.ink }}>
      {regionWineries.length > 0 && (
        <section
          id="where-to-taste"
          style={{ padding: `${trhLayout.sectionPadYMain} ${trhLayout.sectionPadX} clamp(2.5rem, 5vw, 3.5rem)` }}
        >
          <SeriesSectionTitle>Where to taste</SeriesSectionTitle>
          {tasteIntro.trim() ? <SectionEditLead text={tasteIntro} dropCap /> : null}

          {firstWinery && (
            <div className="trh-feature-split">
              <div style={{ position: 'relative', minHeight: 420 }}>
                <Image src={firstWinery.images[0]} alt={firstWinery.name} fill sizes="55vw" style={{ objectFit: 'cover', borderRadius: 2 }} />
                <PrintCaption label={firstWinery.name.replace(' Cellars', '')} />
              </div>
              <div>
                <h3 style={{ ...trhType.displayItalic(TRH.ink), fontSize: 'clamp(1.5rem, 2.5vw, 2.625rem)', marginBottom: 8 }}>
                  {firstWinery.name}
                </h3>
                {isYountville ? (
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
                ) : firstWinery.address ? (
                  <p
                    style={{
                      fontFamily: TRH.fontSans,
                      fontSize: 12,
                      fontStyle: 'italic',
                      color: TRH.inkFaint,
                      marginBottom: 20,
                    }}
                  >
                    {firstWinery.address}
                  </p>
                ) : null}
                <p style={{ ...bodyLight, marginBottom: 28 }}>{firstWinery.description}</p>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                  {firstWinery.visitInfo?.website ? (
                    <a href={firstWinery.visitInfo.website} target="_blank" rel="noopener noreferrer" style={pillPrimary}>
                      Reserve
                    </a>
                  ) : null}
                  <Link href={`/wineries/${firstWinery.slug}`} style={{ ...textLinkUpper, borderColor: TRH.accent, color: TRH.accent }}>
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          )}

          <TasteQuickListGrid
            items={tasteQuick}
            label={isYountville ? 'Yountville · also taste' : `${region.name} · also taste`}
          />

          <div
            className={alsoTaste.length > 0 ? 'trh-directory-split' : undefined}
            style={{
              display: 'grid',
              ...(alsoTaste.length ? {} : { gridTemplateColumns: '1fr', maxWidth: 1180, margin: '0 auto' }),
            }}
          >
            {alsoTaste.length > 0 ? (
              <AlsoRecommendedRailLight
                title={isYountville ? 'Stags Leap District' : 'Also recommended'}
                items={alsoTaste}
              />
            ) : null}
            <div
              style={{
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: trhDirectoryRowGapY,
              }}
            >
              {moreWineries.map((w, idx) => {
                const visit = w.visitInfo?.appointment ? 'By appointment' : 'Walk-ins welcome'
                const stagsCorrection = isYountville && idx < 2
                const loc = stagsCorrection ? 'Stags Leap District' : region.name
                return (
                  <SeriesListingRow
                    key={w.slug}
                    href={`/wineries/${w.slug}`}
                    imageSrc={w.images[0]}
                    title={w.name}
                    eyebrowText={`${visit} · ${loc}`}
                    body={w.directoryBlurb?.trim() || truncateForDirectory(w.description)}
                    primaryLabel="Reserve"
                    primaryHref={w.visitInfo?.website}
                    wsEditorial={w.wsEditorial}
                  />
                )
              })}
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

      {regionRestaurants.length > 0 && (
        <section
          id="where-to-eat"
          style={{
            marginTop: regionWineries.length > 0 ? trhSectionGapY : 0,
            padding: `${trhLayout.sectionPadYMain} ${trhLayout.sectionPadX} clamp(2.5rem, 5vw, 3.5rem)`,
            background: TRH.editorialBgAlt,
            borderTop: `1px solid ${TRH.rule}`,
          }}
        >
          <SeriesSectionTitle>Where to eat</SeriesSectionTitle>
          {eatIntro.trim() && alsoEat.length > 0 ? (
            <div className="trh-rail-grid" style={{ marginBottom: 40 }}>
              <SectionEditLead text={eatIntro} dropCap={false} />
              <AlsoRecommendedRailLight title="Also recommended" items={alsoEat} />
            </div>
          ) : null}
          {eatIntro.trim() && alsoEat.length === 0 ? <SectionEditLead text={eatIntro} dropCap={false} /> : null}
          {!eatIntro.trim() && alsoEat.length > 0 ? (
            <div style={{ maxWidth: 1180, margin: '0 auto 40px' }}>
              <AlsoRecommendedRailLight title="Also recommended" items={alsoEat} />
            </div>
          ) : null}

          <div style={{ display: 'flex', flexDirection: 'column', gap: trhDirectoryRowGapY, maxWidth: 1180, margin: '0 auto' }}>
            {regionRestaurants.map((r) => (
              <SeriesListingRow
                key={r.slug}
                href={`/dining/${r.slug}`}
                imageSrc={r.images[0]}
                title={r.name}
                eyebrowText={`${r.cuisine} · ${r.priceRange}`}
                body={
                  r.directoryBlurb?.trim() || (r.excerpt?.trim() ? r.excerpt : truncateForDirectory(r.description))
                }
                primaryLabel="Reservations"
                primaryHref={r.reservations ?? r.website ?? undefined}
                wsEditorial={r.wsEditorial}
              />
            ))}
          </div>
          <ShowMoreLink href="/dining">Show more dining</ShowMoreLink>
        </section>
      )}

      {regionHotels.length > 0 && (
        <section
          id="where-to-stay"
          style={{
            marginTop: regionWineries.length > 0 || regionRestaurants.length > 0 ? trhSectionGapY : 0,
            padding: `${trhLayout.sectionPadYMain} ${trhLayout.sectionPadX} clamp(3rem, 6vw, 4rem)`,
            borderTop: `1px solid ${TRH.rule}`,
          }}
        >
          <SeriesSectionTitle>Where to stay</SeriesSectionTitle>
          {stayIntro.trim() && alsoStay.length > 0 ? (
            <div className="trh-rail-grid" style={{ marginBottom: 40 }}>
              <SectionEditLead text={stayIntro} dropCap={false} />
              <AlsoRecommendedRailLight title="Also recommended" items={alsoStay} />
            </div>
          ) : null}
          {stayIntro.trim() && alsoStay.length === 0 ? <SectionEditLead text={stayIntro} dropCap={false} /> : null}
          {!stayIntro.trim() && alsoStay.length > 0 ? (
            <div style={{ maxWidth: 1180, margin: '0 auto 40px' }}>
              <AlsoRecommendedRailLight title="Also recommended" items={alsoStay} />
            </div>
          ) : null}

          <div style={{ display: 'flex', flexDirection: 'column', gap: trhDirectoryRowGapY, maxWidth: 1180, margin: '0 auto' }}>
            {regionHotels.map((h) => {
              const categoryLabel = hotelCategoryLabel[h.category] ?? h.category
              return (
                <SeriesListingRow
                  key={h.slug}
                  href={`/stay/${h.slug}`}
                  imageSrc={h.images[0]}
                  title={h.name}
                  eyebrowText={`${categoryLabel} · ${h.priceRange}`}
                  body={
                    h.directoryBlurb?.trim() || (h.excerpt?.trim() ? h.excerpt : truncateForDirectory(h.description))
                  }
                  primaryLabel="Book"
                  primaryHref={h.website}
                  wsEditorial={h.wsEditorial}
                />
              )
            })}
          </div>
          <ShowMoreLink href="/stay">Show more hotels</ShowMoreLink>
        </section>
      )}

      {culture && (
        <section
          id="region-culture"
          style={{
            marginTop:
              regionWineries.length + regionRestaurants.length + regionHotels.length > 0 ? trhSectionGapY : 0,
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
