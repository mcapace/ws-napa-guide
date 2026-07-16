import type { FC, ReactNode } from 'react'

export type RegionMarkProps = {
  /** Region slug — unique SVG filter id */
  slug: string
  /** Optional; some marks blend with illustration palette */
  accentColor?: string
  /** Set to 100% when parent fixes size via em box */
  className?: string
}

function hexToRgb(hex: string): { r: number; g: number; b: number} | null {
  const n = hex.replace('#', '')
  if (n.length !== 6 || !/^[0-9a-f]+$/i.test(n)) return null
  return {
    r: parseInt(n.slice(0, 2), 16),
    g: parseInt(n.slice(2, 4), 16),
    b: parseInt(n.slice(4, 6), 16),
  }
}

/** Boost saturation / brightness vs print accent for “sticker” pop on dark bg */
function punchUp(hex: string) {
  const rgb = hexToRgb(hex)
  if (!rgb) return '#E8A598'
  const { r, g, b } = rgb
  const mix = (c: number) => Math.round(c + (255 - c) * 0.22)
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`
}

const WHITE = '#FFFFFF'

/** Flat illustration fills per region (therealhotels-style, not wireframe) */
const ILLU: Record<
  string,
  { berry?: string; leaf?: string; soil?: string; gold?: string; plate?: string; steam?: string; peak?: string; brick?: string; spring?: string; grid?: string; stem?: string }
> = {
  oakville: { berry: '#7C5CB8', leaf: '#3FA86C', stem: '#5AD18C' },
  rutherford: { soil: '#C1783E', gold: '#F2D08A', berry: '#8D5B2C' },
  yountville: { plate: '#FCE8D4', steam: '#FF9B7A', gold: '#E8785E', leaf: '#7CB342' },
  'pritchard-hill': { peak: '#6B8C6B', soil: '#A88B5A', gold: '#F0E6C8' },
  'st-helena': { brick: '#D8735C', gold: '#FFF3D8', grid: '#F5E6C8' },
  calistoga: { spring: '#52B4D3', steam: '#B8EAFF', gold: '#E8F4FC' },
  'downtown-napa': { grid: '#58B39A', gold: '#D4F5ED', brick: '#7FDCC4' },
  'beyond-napa': { leaf: '#6B8F71', gold: '#D4B896', soil: '#8A7A5C' },
}

function ill(slug: string) {
  return ILLU[slug] ?? ILLU.oakville
}

type LayerProps = {
  children: ReactNode
  filterId: string
}

function OutlinedGroup({ children, filterId }: LayerProps) {
  return (
    <>
      <defs>
        <filter
          id={filterId}
          x="-35%"
          y="-35%"
          width="170%"
          height="170%"
          colorInterpolationFilters="sRGB"
        >
          <feMorphology in="SourceAlpha" operator="dilate" radius="0.65" result="spread" />
          <feFlood floodColor={WHITE} floodOpacity="1" result="white" />
          <feComposite in="white" in2="spread" operator="in" result="outline" />
          <feMerge>
            <feMergeNode in="outline" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>{children}</g>
    </>
  )
}

const OakvilleMark: FC<RegionMarkProps> = ({ slug, accentColor }) => {
  const c = ill(slug)
  const leaf = accentColor ? punchUp(accentColor) : c.leaf!
  const fid = `rm-${slug.replace(/[^a-z0-9-]/gi, '')}-oak`
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      aria-hidden
      className="region-inline-mark"
      style={{ display: 'block' }}
    >
      <OutlinedGroup filterId={fid}>
        <circle cx="12" cy="12.5" r="2.35" fill={c.berry} />
        <circle cx="9.1" cy="15.8" r="2.35" fill={c.berry} opacity={0.92} />
        <circle cx="14.9" cy="15.8" r="2.35" fill={c.berry} opacity={0.88} />
        <path
          d="M12 12.5V8.8M12 8.8c.4-1.4 1.6-2.4 3-2.2"
          fill="none"
          stroke={leaf}
          strokeWidth={1.85}
          strokeLinecap="round"
        />
        <ellipse cx="13.2" cy="7.2" rx="1.8" ry="1.05" fill={leaf} transform="rotate(-28 13.2 7.2)" />
      </OutlinedGroup>
    </svg>
  )
}

const RutherfordMark: FC<RegionMarkProps> = ({ slug }) => {
  const c = ill(slug)
  const fid = `rm-${slug}-ruth`
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      aria-hidden
      className="region-inline-mark"
      style={{ display: 'block' }}
    >
      <OutlinedGroup filterId={fid}>
        <path d="M3.5 19h17v2.2H3.5z" fill={c.soil} />
        <path d="M4.5 16.2h15M6 13h12M8 9.5h8" fill="none" stroke={c.gold} strokeWidth={1.6} strokeLinecap="round" />
        <path
          d="M5 20.8c3.2-.7 10.8-.7 14 0"
          fill="none"
          stroke={c.berry ?? c.soil}
          strokeWidth={1.25}
          strokeLinecap="round"
          opacity={0.85}
        />
      </OutlinedGroup>
    </svg>
  )
}

const YountvilleMark: FC<RegionMarkProps> = ({ slug }) => {
  const c = ill(slug)
  const fid = `rm-${slug}-yvn`
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      aria-hidden
      className="region-inline-mark"
      style={{ display: 'block' }}
    >
      <OutlinedGroup filterId={fid}>
        <ellipse cx="12" cy="15.8" rx="7.2" ry="3.1" fill={c.plate} />
        <path d="M7.8 15.8H5M19 15.8h2.2" fill="none" stroke={c.gold} strokeWidth={1.4} strokeLinecap="round" />
        <circle cx="12" cy="8.5" r="3.2" fill={c.steam} />
        <path
          d="M10.2 5.8 Q12 4 13.8 5.8"
          fill="none"
          stroke={c.leaf}
          strokeWidth={1.35}
          strokeLinecap="round"
        />
        <circle cx="12" cy="8.5" r="1.35" fill={c.gold} opacity={0.9} />
      </OutlinedGroup>
    </svg>
  )
}

const PritchardHillMark: FC<RegionMarkProps> = ({ slug }) => {
  const c = ill(slug)
  const fid = `rm-${slug}-ph`
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      aria-hidden
      className="region-inline-mark"
      style={{ display: 'block' }}
    >
      <OutlinedGroup filterId={fid}>
        <path d="M3.5 20L12 4.5l4 8.5L20.5 20z" fill={c.peak} />
        <path d="M16 12.5L20.5 20H14" fill={c.soil} opacity={0.65} />
        <path d="M8 20L12 10.5l2.5 5.5" fill={c.gold} opacity={0.35} />
      </OutlinedGroup>
    </svg>
  )
}

const StHelenaMark: FC<RegionMarkProps> = ({ slug }) => {
  const c = ill(slug)
  const fid = `rm-${slug}-sh`
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      aria-hidden
      className="region-inline-mark"
      style={{ display: 'block' }}
    >
      <OutlinedGroup filterId={fid}>
        <path d="M12 6l7.5 5v11h-15V11z" fill={c.brick} />
        <path d="M12 6L4.5 11h15z" fill={c.gold} />
        <path d="M9 14.2v5M15 14.2v5" fill="none" stroke={c.grid} strokeWidth={1.5} strokeLinecap="round" />
      </OutlinedGroup>
    </svg>
  )
}

const CalistogaMark: FC<RegionMarkProps> = ({ slug }) => {
  const c = ill(slug)
  const fid = `rm-${slug}-cal`
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      aria-hidden
      className="region-inline-mark"
      style={{ display: 'block' }}
    >
      <OutlinedGroup filterId={fid}>
        <ellipse cx="12" cy="17.5" rx="8" ry="2.8" fill={c.spring} opacity={0.45} />
        <path
          d="M2.5 12.5 Q6 10 9.5 12.5 T15.5 12.5 T21 12.5"
          fill="none"
          stroke={c.spring}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d="M3 16.2 Q6.5 14 10 16.2 T16 16.2 T21 16.2"
          fill="none"
          stroke={c.steam}
          strokeWidth={1.65}
          strokeLinecap="round"
        />
        <circle cx="12" cy="19.5" r="2" fill={c.gold} opacity={0.85} />
      </OutlinedGroup>
    </svg>
  )
}

const DowntownNapaMark: FC<RegionMarkProps> = ({ slug }) => {
  const c = ill(slug)
  const fid = `rm-${slug}-dn`
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      aria-hidden
      className="region-inline-mark"
      style={{ display: 'block' }}
    >
      <OutlinedGroup filterId={fid}>
        <rect x="5.5" y="5.5" width="13" height="13" rx="1.2" fill={c.grid} />
        <path
          d="M12 5.5v13M5.5 12h13"
          fill="none"
          stroke={c.gold}
          strokeWidth={1.55}
          strokeLinecap="round"
          opacity={0.95}
        />
        <rect x="8.5" y="8.5" width="2.8" height="2.8" rx="0.35" fill={c.brick} opacity={0.55} />
        <rect x="12.7" y="14" width="2.8" height="2.8" rx="0.35" fill={c.brick} opacity={0.55} />
      </OutlinedGroup>
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
  'beyond-napa': DowntownNapaMark,
}

export function getRegionEditorialMark(slug: string): FC<RegionMarkProps> {
  return REGION_MARKS[slug] ?? DEFAULT_MARK
}
