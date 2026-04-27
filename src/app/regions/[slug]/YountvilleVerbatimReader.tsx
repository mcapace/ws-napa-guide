'use client'

import {
  YOUNTVILLE_VERBATIM_MAGAZINE_TITLE,
  YOUNTVILLE_VERBATIM_PAGES,
} from '@/data/yountville-verbatim-pages'
import { TRH, trhType } from './real-hotels-theme'

/** Full verbatim transcript of all 10 draft spreads — readable on desktop and mobile. */
export function YountvilleVerbatimReader() {
  return (
    <section
      id="yountville-verbatim"
      style={{
        paddingTop: 'clamp(4rem, 9vw, 5.5rem)',
        paddingBottom: 'clamp(4rem, 10vw, 6.25rem)',
        paddingLeft: 'clamp(1rem, 4vw, 1.5rem)',
        paddingRight: 'clamp(1rem, 4vw, 1.5rem)',
        maxWidth: 680,
        margin: '0 auto',
        background: TRH.editorialBg,
        borderTop: `1px solid ${TRH.rule}`,
      }}
    >
      <p style={{ ...trhType.eyebrow(), marginBottom: 12, textAlign: 'center' }}>As in the June 2026 proof</p>
      <h2
        style={{
          ...trhType.sectionTitle(),
          textAlign: 'center',
          lineHeight: 1.2,
          margin: '0 0 8px',
        }}
      >
        Yountville guide — full text
      </h2>
      <p
        style={{
          ...trhType.body(TRH.inkMuted),
          textAlign: 'center',
          margin: '0 auto 48px',
          maxWidth: 520,
        }}
      >
        Verbatim copy from the ten Wine Spectator layout pages (draft JPEGs in{' '}
        <code style={{ fontSize: 12, color: TRH.inkFaint, fontFamily: TRH.fontSans }}>public/Yountville/</code>). One
        scrollable article per proof page.
      </p>

      {YOUNTVILLE_VERBATIM_PAGES.map((page) => (
        <article
          key={page.draftPage}
          id={`verbatim-page-${page.draftPage}`}
          style={{
            marginBottom: 56,
            paddingBottom: 48,
            borderBottom: page.draftPage < 10 ? `1px solid ${TRH.rule}` : 'none',
          }}
        >
          <p style={{ ...trhType.eyebrow(TRH.accent), marginBottom: 16 }}>
            Draft page {page.draftPage} of 10 · Wine Spectator {page.wineSpectatorPage}
          </p>
          <p
            style={{
              fontFamily: TRH.fontSans,
              fontSize: 10,
              color: TRH.inkFaint,
              letterSpacing: '0.06em',
              lineHeight: 1.5,
              marginBottom: 28,
            }}
          >
            {YOUNTVILLE_VERBATIM_MAGAZINE_TITLE}
          </p>

          {page.sections.map((sec, si) => (
            <div key={si} style={{ marginBottom: sec.paragraphs.length || sec.heading ? 28 : 8 }}>
              {sec.heading ? (
                <h3
                  style={{
                    ...trhType.displayRoman(TRH.ink),
                    fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                    margin: '0 0 8px',
                    lineHeight: 1.2,
                  }}
                >
                  {sec.heading}
                </h3>
              ) : null}
              {sec.subheading ? (
                <p
                  style={{
                    ...trhType.displayItalic(TRH.inkMuted),
                    fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                    margin: '0 0 16px',
                  }}
                >
                  {sec.subheading}
                </p>
              ) : null}
              {sec.paragraphs
                .filter((para) => para.length > 0)
                .map((para, pi) => (
                  <p
                    key={pi}
                    style={{
                      ...trhType.bodyTight(TRH.ink),
                      margin: '0 0 14px',
                    }}
                  >
                    {para}
                  </p>
                ))}
            </div>
          ))}
        </article>
      ))}
    </section>
  )
}
