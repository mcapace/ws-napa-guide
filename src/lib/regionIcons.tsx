import type { FC } from 'react'

export type RegionMarkProps = {
  size?: number
  strokeWidth?: number
}

function ink(strokeWidth: number) {
  return {
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
}

/** Cabernet country — tight grape cluster. */
const OakvilleMark: FC<RegionMarkProps> = ({ size = 28, strokeWidth = 1.15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <circle cx="12" cy="11" r="2.2" {...ink(strokeWidth)} />
    <circle cx="9" cy="14.5" r="2.2" {...ink(strokeWidth)} />
    <circle cx="15" cy="14.5" r="2.2" {...ink(strokeWidth)} />
    <path d="M12 11V7.5M12 7.5c.5-1.8 2.2-2.8 3.8-2.2" {...ink(strokeWidth)} />
  </svg>
)

/** Benchlands — quiet horizontal strata. */
const RutherfordMark: FC<RegionMarkProps> = ({ size = 28, strokeWidth = 1.15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M5 17.5h14M7 14h10M9 10.5h6" {...ink(strokeWidth)} />
    <path d="M6 20.5c3-.8 9-.8 12 0" {...ink(strokeWidth)} opacity={0.65} />
  </svg>
)

/** Town & tables — minimal plate + steam. */
const YountvilleMark: FC<RegionMarkProps> = ({ size = 28, strokeWidth = 1.15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <ellipse cx="12" cy="15" rx="6.5" ry="2.8" {...ink(strokeWidth)} />
    <path d="M8.5 15H6M18 15h2.5" {...ink(strokeWidth)} />
    <path d="M9.5 8.5c.6 1.2 1.4 2 2.5 2s1.9-.8 2.5-2M10.8 6.5c.8.9 1.8 1.5 3.2 1.5 1.4 0 2.4-.6 3.2-1.5" {...ink(strokeWidth)} />
  </svg>
)

/** Ridge & elevation — single sharp peak. */
const PritchardHillMark: FC<RegionMarkProps> = ({ size = 28, strokeWidth = 1.15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M4 19.5L12 5l3.5 8L20 19.5H4z" {...ink(strokeWidth)} />
    <path d="M15.5 13L20 19.5" {...ink(strokeWidth)} opacity={0.5} />
  </svg>
)

/** Small-town Main St — awning + facade. */
const StHelenaMark: FC<RegionMarkProps> = ({ size = 28, strokeWidth = 1.15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M6 19.5V11h12v8.5M6 11l6-4 6 4" {...ink(strokeWidth)} />
    <path d="M9.5 14.5v4M14.5 14.5v4" {...ink(strokeWidth)} opacity={0.7} />
  </svg>
)

/** Spa & warm water — ripples. */
const CalistogaMark: FC<RegionMarkProps> = ({ size = 28, strokeWidth = 1.15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M3 11.5 Q6.5 9.5 10 11.5 T17 11.5 T21 11.5" {...ink(strokeWidth)} />
    <path d="M3 15.5 Q6.5 13.5 10 15.5 T17 15.5 T20 15.5" {...ink(strokeWidth)} opacity={0.72} />
    <path d="M4 19.5 Q7.5 17.8 11 19.5 T18 19.5" {...ink(strokeWidth)} opacity={0.55} />
  </svg>
)

/** Urban grid — cross streets. */
const DowntownNapaMark: FC<RegionMarkProps> = ({ size = 28, strokeWidth = 1.15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <rect x="6.5" y="6.5" width="11" height="11" rx="0.5" {...ink(strokeWidth)} />
    <path d="M12 6.5v11M6.5 12h11" {...ink(strokeWidth)} opacity={0.85} />
  </svg>
)

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

/** Homepage appellation row + future nav use. */
export function getRegionEditorialMark(slug: string): FC<RegionMarkProps> {
  return REGION_MARKS[slug] ?? DEFAULT_MARK
}
