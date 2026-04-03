import type { CSSProperties } from 'react'

export const primaryCTA: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
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
  cursor: 'none',
  whiteSpace: 'nowrap',
}

export const ghostCTA: CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 10,
  fontWeight: 400,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(247,243,236,0.6)',
  textDecoration: 'none',
  borderBottom: '1px solid rgba(247,243,236,0.25)',
  paddingBottom: 3,
  cursor: 'none',
}

export const sectionHeading: CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontStyle: 'italic',
  fontWeight: 300,
  fontSize: 'clamp(28px, 3.5vw, 48px)',
  color: '#F7F3EC',
  letterSpacing: '-0.02em',
}

export const seeAllLink: CSSProperties = {
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

export const infoLabel: CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 9,
  fontWeight: 400,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#C4943A',
  marginBottom: 8,
}

export const infoValue: CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 13,
  fontWeight: 300,
  color: 'rgba(247,243,236,0.7)',
  lineHeight: 1.6,
}
