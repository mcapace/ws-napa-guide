'use client'

import { PIN_COLORS, PIN_LABELS, type PinType } from '@/data/map-pins'
import type { MapPinFilterType } from '@/lib/types'

const REGIONS = [
  { slug: 'oakville',       label: 'Oakville' },
  { slug: 'rutherford',     label: 'Rutherford' },
  { slug: 'calistoga',      label: 'Calistoga' },
  { slug: 'yountville',     label: 'Yountville' },
  { slug: 'st-helena',      label: 'St. Helena' },
  { slug: 'pritchard-hill', label: 'Pritchard Hill' },
  { slug: 'downtown-napa',  label: 'Downtown Napa' },
]

const PIN_TYPES: PinType[] = ['winery', 'restaurant', 'hotel']

interface MapFilterBarProps {
  filterType: MapPinFilterType
  filterRegion: string
  showAVAs: boolean
  onTypeChange: (type: MapPinFilterType) => void
  onRegionChange: (region: string) => void
  onToggleAVAs: () => void
  onReset: () => void
  visibleCount: number
}

export default function MapFilterBar({
  filterType,
  filterRegion,
  showAVAs,
  onTypeChange,
  onRegionChange,
  onToggleAVAs,
  onReset,
  visibleCount,
}: MapFilterBarProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Type filter pill */}
      <div
        style={{
          display: 'flex',
          background: 'rgba(13,11,9,0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(247,243,236,0.08)',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          pointerEvents: 'auto',
        }}
      >
        <FilterBtn active={filterType === 'all'} onClick={() => onTypeChange('all')} activeColor="#6B1C2A">
          All
        </FilterBtn>

        {PIN_TYPES.map((type) => (
          <FilterBtn
            key={type}
            active={filterType === type}
            onClick={() => onTypeChange(filterType === type ? 'all' : type)}
            activeColor={PIN_COLORS[type]}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: filterType === type ? '#F7F3EC' : PIN_COLORS[type],
                  flexShrink: 0,
                  transition: 'background 0.2s',
                }}
              />
              {PIN_LABELS[type]}s
            </span>
          </FilterBtn>
        ))}

        <div style={{ width: '1px', background: 'rgba(247,243,236,0.08)', margin: '8px 0' }} />

        <FilterBtn active={showAVAs} onClick={onToggleAVAs} activeColor="#5C6B52">
          AVA Regions
        </FilterBtn>

        <FilterBtn active={false} onClick={onReset} activeColor="#9b9283">
          Reset
        </FilterBtn>
      </div>

      {/* Region chips */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          pointerEvents: 'auto',
        }}
      >
        {REGIONS.map((region) => (
          <button
            key={region.slug}
            onClick={() => onRegionChange(filterRegion === region.slug ? 'all' : region.slug)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: filterRegion === region.slug ? '#F7F3EC' : '#9b9283',
              background: filterRegion === region.slug ? '#6B1C2A' : 'rgba(13,11,9,0.85)',
              border: '1px solid rgba(247,243,236,0.08)',
              padding: '0.35rem 0.8rem',
              cursor: 'none',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            {region.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.62rem',
          color: '#9b9283',
          background: 'rgba(13,11,9,0.85)',
          padding: '0.25rem 0.8rem',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(247,243,236,0.08)',
          letterSpacing: '0.08em',
          pointerEvents: 'auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        {visibleCount} location{visibleCount !== 1 ? 's' : ''} shown
      </div>
    </div>
  )
}

interface FilterBtnProps {
  active: boolean
  onClick: () => void
  activeColor: string
  children: React.ReactNode
}

function FilterBtn({ active, onClick, activeColor, children }: FilterBtnProps) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.62rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: active ? '#F7F3EC' : '#9b9283',
        background: active ? activeColor : 'transparent',
        border: 'none',
        padding: '0.65rem 1rem',
        cursor: 'none',
        transition: 'all 0.3s',
        whiteSpace: 'nowrap',
        fontWeight: active ? 500 : 400,
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = '#F7F3EC' }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = '#9b9283' }}
    >
      {children}
    </button>
  )
}
