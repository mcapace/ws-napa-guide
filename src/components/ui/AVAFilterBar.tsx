'use client'

import { useState } from 'react'

const REGIONS = [
  { slug: 'all',            label: 'All' },
  { slug: 'oakville',       label: 'Oakville' },
  { slug: 'rutherford',     label: 'Rutherford' },
  { slug: 'yountville',     label: 'Yountville' },
  { slug: 'st-helena',      label: 'St. Helena' },
  { slug: 'calistoga',      label: 'Calistoga' },
  { slug: 'pritchard-hill', label: 'Pritchard Hill' },
  { slug: 'downtown-napa',  label: 'Downtown Napa' },
]

interface AVAFilterBarProps {
  onFilterChange: (region: string) => void
  activeRegion: string
}

export default function AVAFilterBar({ onFilterChange, activeRegion }: AVAFilterBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginBottom: 'clamp(2rem, 4vw, 3rem)',
      }}
    >
      {REGIONS.map((region) => {
        const isActive = activeRegion === region.slug
        return (
          <button
            key={region.slug}
            onClick={() => onFilterChange(region.slug)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.62rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: isActive ? '#0D0B09' : 'rgba(247,243,236,0.45)',
              background: isActive ? '#C4943A' : 'transparent',
              border: `1px solid ${isActive ? '#C4943A' : 'rgba(247,243,236,0.1)'}`,
              padding: '0.5rem 1rem',
              cursor: 'none',
              transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
              whiteSpace: 'nowrap',
              fontWeight: isActive ? 500 : 400,
            }}
          >
            {region.label}
          </button>
        )
      })}
    </div>
  )
}

// Hook for using filter state
export function useAVAFilter() {
  const [activeRegion, setActiveRegion] = useState('all')
  return { activeRegion, setActiveRegion }
}
