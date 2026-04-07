'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { YOUNTVILLE_DRAFT_SPREADS } from '../proofs/yountville-draft-pages'
import { TRH } from './real-hotels-theme'

/** Full-bleed reference to the supplied June 2026 layout JPEGs in `public/Yountville/`. */
export function YountvillePrintProofs() {
  return (
    <section
      id="print-spreads"
      style={{
        padding: '88px 60px 100px',
        background: TRH.editorialBg,
        borderTop: `1px solid ${TRH.rule}`,
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto 56px', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: TRH.accent,
            marginBottom: 16,
          }}
        >
          Layout reference
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            color: TRH.ink,
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Wine Spectator draft spreads
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 300,
            color: TRH.inkMuted,
            lineHeight: 1.75,
            maxWidth: 540,
            margin: '0 auto',
          }}
        >
          Source proofs exported from <code style={{ fontSize: 12, color: TRH.inkFaint }}>WS063026_napaYountville_draft</code> — pages 1–10 in{' '}
          <code style={{ fontSize: 12, color: TRH.inkFaint }}>public/Yountville/</code>.
        </p>
      </div>

      <div
        style={{
          maxWidth: 920,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
        }}
      >
        {YOUNTVILLE_DRAFT_SPREADS.map(({ src, page }, i) => (
          <motion.figure
            key={src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, delay: Math.min(i * 0.04, 0.24) }}
            style={{ margin: 0 }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(26,24,22,0.12)',
                border: `1px solid ${TRH.rule}`,
              }}
            >
              <Image
                src={src}
                alt={`Yountville Napa guide draft — page ${page} of 10`}
                width={2400}
                height={3100}
                sizes="(max-width: 960px) 100vw, 920px"
                style={{ width: '100%', height: 'auto', verticalAlign: 'middle', display: 'block' }}
                loading={page <= 2 ? 'eager' : 'lazy'}
              />
            </div>
            <figcaption
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: TRH.inkFaint,
                marginTop: 12,
                textAlign: 'center',
              }}
            >
              Page {page} · June 15 & 30, 2026 draft
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
