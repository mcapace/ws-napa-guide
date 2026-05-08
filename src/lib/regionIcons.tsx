import type { FC } from 'react'

export type RegionMarkProps = {
  size?: number
  strokeWidth?: number
  /** From `RegionData.accentColor`; lightened for legibility on dark backgrounds */
  accentColor?: string
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const n = hex.replace('#', '')
  if (n.length !== 6 || !/^[0-9a-f]+$/i.test(n)) return null
  return {
    r: parseInt(n.slice(0, 2), 16),
    g: parseInt(n.slice(2, 4), 16),
    b: parseInt(n.slice(4, 6), 16),
  }
}

function rgbToString(r: number, g: number, b: number) {
  return `rgb(${r},${g},${b})`
}

function rgbaString(r: number, g: number, b: number, a: number) {
  return `rgba(${r},${g},${b},${a})`
}

/** Pulls region hue forward so marks read on #0D0B09; adds soft fill tint. */
function markPalette(accent?: string) {
  const base = accent && hexToRgb(accent) ? accent : '#C4943A'
  const { r, g, b } = hexToRgb(base)!
  const mix = (t: number) =>
    rgbToString(
      Math.round(r + (255 - r) * t),
      Math.round(g + (255 - g) * t),
      Math.round(b + (255 - b) * t),
    )
  return {
    stroke: mix(0.42),
    strokeMuted: rgbaString(r, g, b, 0.55),
    fill: rgbaString(r, g, b, 0.28),
    fillDeep: rgbaString(r, g, b, 0.4),
    glow: rgbaString(
      Math.round(r + (255 - r) * 0.35),
      Math.round(g + (255 - g) * 0.35),
      Math.round(b + (255 - b) * 0.35),
      0.55,
    ),
  }
}

/** Cabernet country — tight grape cluster with tinted berries */
const OakvilleMark: FC<RegionMarkProps> = ({ size = 40, strokeWidth = 1.35, accentColor }) => {
  const c = markPalette(accentColor)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="11" r="2.2" fill={c.fillDeep} stroke={c.stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="9" cy="14.5" r="2.2" fill={c.fill} stroke={c.stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="15" cy="14.5" r="2.2" fill={c.fill} stroke={c.stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path
        d="M12 11V7.5M12 7.5c.5-1.8 2.2-2.8 3.8-2.2"
        fill="none"
        stroke={c.stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Benchlands — strata with soil band fill */
const RutherfordMark: FC<RegionMarkProps> = ({ size = 40, strokeWidth = 1.35, accentColor }) => {
  const c = markPalette(accentColor)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M4 19.5h16v1H4z" fill={c.fill} stroke="none" opacity={0.9} />
      <path d="M5 17.5h14M7 14h10M9 10.5h6" fill="none" stroke={c.stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M6 20.5c3-.8 9-.8 12 0" fill="none" stroke={c.strokeMuted} strokeWidth={strokeWidth * 0.9} strokeLinecap="round" />
    </svg>
  )
}

/** Town & tables — plate fill + steam */
const YountvilleMark: FC<RegionMarkProps> = ({ size = 40, strokeWidth = 1.35, accentColor }) => {
  const c = markPalette(accentColor)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <ellipse cx="12" cy="15" rx="6.5" ry="2.8" fill={c.fill} stroke={c.stroke} strokeWidth={strokeWidth} />
      <path d="M8.5 15H6M18 15h2.5" fill="none" stroke={c.strokeMuted} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path
        d="M9.5 8.5c.6 1.2 1.4 2 2.5 2s1.9-.8 2.5-2M10.8 6.5c.8.9 1.8 1.5 3.2 1.5 1.4 0 2.4-.6 3.2-1.5"
        fill="none"
        stroke={c.stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Ridge — peak with mountain face tint */
const PritchardHillMark: FC<RegionMarkProps> = ({ size = 40, strokeWidth = 1.35, accentColor }) => {
  const c = markPalette(accentColor)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M4 19.5L12 5l3.5 8L20 19.5H4z" fill={c.fill} stroke={c.stroke} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" />
      <path d="M15.5 13L20 19.5" fill="none" stroke={c.strokeMuted} strokeWidth={strokeWidth * 0.85} strokeLinecap="round" />
    </svg>
  )
}

/** Main St — awning + façade fill */
const StHelenaMark: FC<RegionMarkProps> = ({ size = 40, strokeWidth = 1.35, accentColor }) => {
  const c = markPalette(accentColor)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 7 L18 11 V19.5 H6 V11 Z"
        fill={c.fill}
        stroke={c.stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M9.5 14.5v4M14.5 14.5v4"
        fill="none"
        stroke={c.strokeMuted}
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Ripples — teal/copper strokes */
const CalistogaMark: FC<RegionMarkProps> = ({ size = 40, strokeWidth = 1.35, accentColor }) => {
  const c = markPalette(accentColor)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M3 11.5 Q6.5 9.5 10 11.5 T17 11.5 T21 11.5"
        fill="none"
        stroke={c.stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M3 15.5 Q6.5 13.5 10 15.5 T17 15.5 T20 15.5"
        fill="none"
        stroke={c.glow}
        strokeWidth={strokeWidth * 0.95}
        strokeLinecap="round"
      />
      <path
        d="M4 19.5 Q7.5 17.8 11 19.5 T18 19.5"
        fill="none"
        stroke={c.strokeMuted}
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Grid — tinted window */
const DowntownNapaMark: FC<RegionMarkProps> = ({ size = 40, strokeWidth = 1.35, accentColor }) => {
  const c = markPalette(accentColor)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <rect
        x="6.5"
        y="6.5"
        width="11"
        height="11"
        rx="0.5"
        fill={c.fill}
        stroke={c.stroke}
        strokeWidth={strokeWidth}
      />
      <path d="M12 6.5v11M6.5 12h11" fill="none" stroke={c.strokeMuted} strokeWidth={strokeWidth * 0.9} strokeLinecap="round" />
    </svg>
  )
}

const DEFAULT_MARK = OakvilleMark

const REGION_MARKS: Record<string, FC<RegionMarkProps>> = {
  oakville: OakvilleMark,
  rutherford: RutherfordMark,
  yountville: YountvilleMark,
  'pritchard-hill': PritchardHillMark,
  'st-helena': StHelenaMark,
  calistoga: CalistogaMark,
  'downtown-napa': DowntownNapaMark,
}

/** Homepage appellation row + future nav use */
export function getRegionEditorialMark(slug: string): FC<RegionMarkProps> {
  return REGION_MARKS[slug] ?? DEFAULT_MARK
}
