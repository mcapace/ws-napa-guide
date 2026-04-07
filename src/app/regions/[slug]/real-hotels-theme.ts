import type { CSSProperties } from 'react'

/** Palette / tokens inspired by The Real Hotels editorial + directory rhythm. */
export const TRH = {
  editorialBg: '#E8E6E1',
  editorialBgAlt: '#E3E0D9',
  ink: '#1A1816',
  inkMuted: 'rgba(26, 24, 22, 0.58)',
  inkFaint: 'rgba(26, 24, 22, 0.38)',
  rule: 'rgba(26, 24, 22, 0.12)',
  ruleStrong: 'rgba(26, 24, 22, 0.2)',
  accent: '#6B1C2A',
  sageLabel: '#5C6B52',
  pillBg: '#0D0B09',
  pillText: '#F7F3EC',
  /** Same pairing as site-wide `globals.css` — one editorial system. */
  fontDisplay: "'Cormorant Garamond', Georgia, serif",
  fontSans: "'DM Sans', system-ui, sans-serif",
} as const

/** Shared typography presets so Yountville reads as one Real Hotels–style page. */
export const trhType = {
  eyebrow: (color: string = TRH.inkFaint): CSSProperties => ({
    fontFamily: TRH.fontSans,
    fontSize: 'clamp(0.5rem, 0.58rem + 0.12vw, 0.6875rem)',
    fontWeight: 500,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color,
  }),
  eyebrowAccent: (): CSSProperties => trhType.eyebrow(TRH.accent),
  meta: (color: string = TRH.inkFaint): CSSProperties => ({
    fontFamily: TRH.fontSans,
    fontSize: 'clamp(0.5625rem, 0.6rem + 0.08vw, 0.625rem)',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color,
  }),
  body: (color: string = TRH.inkMuted): CSSProperties => ({
    fontFamily: TRH.fontSans,
    fontSize: 'clamp(0.875rem, 0.82rem + 0.2vw, 0.9375rem)',
    fontWeight: 300,
    color,
    lineHeight: 1.9,
    margin: 0,
  }),
  bodyTight: (color: string = TRH.ink): CSSProperties => ({
    fontFamily: TRH.fontSans,
    fontSize: 'clamp(0.875rem, 0.82rem + 0.2vw, 0.9375rem)',
    fontWeight: 300,
    color,
    lineHeight: 1.75,
  }),
  displayItalic: (color: string = TRH.ink): CSSProperties => ({
    fontFamily: TRH.fontDisplay,
    fontStyle: 'italic',
    fontWeight: 400,
    color,
  }),
  displayRoman: (color: string = TRH.ink): CSSProperties => ({
    fontFamily: TRH.fontDisplay,
    fontStyle: 'normal',
    fontWeight: 400,
    letterSpacing: '-0.02em',
    color,
  }),
  /** Section H2 — centered rail (series page). */
  sectionTitle: (): CSSProperties => ({
    fontFamily: TRH.fontDisplay,
    fontWeight: 400,
    fontSize: 'clamp(1.75rem, 3.5vw, 3.25rem)',
    letterSpacing: '-0.02em',
    color: TRH.ink,
    lineHeight: 1.08,
    margin: 0,
  }),
  /** Listing property name. */
  listingTitle: (): CSSProperties => ({
    ...trhType.displayItalic(TRH.ink),
    fontSize: 'clamp(1.2rem, 1.5rem + 1vw, 1.75rem)',
    lineHeight: 1.15,
    margin: '0 0 8px',
  }),
  /** Listing descriptive blurb — serif for editorial continuity (TRH-style excerpt). */
  listingExcerpt: (): CSSProperties => ({
    fontFamily: TRH.fontDisplay,
    fontSize: 'clamp(0.9375rem, 0.88rem + 0.2vw, 1rem)',
    fontWeight: 400,
    color: TRH.inkMuted,
    lineHeight: 1.65,
    margin: 0,
  }),
} as const

export const trhLayout = {
  sectionPadX: 'clamp(1.25rem, 4vw, 3.75rem)',
  sectionPadYMain: 'clamp(3.5rem, 8vw, 5.5rem)',
  contentMax: 1180,
  narrowMax: 920,
} as const
