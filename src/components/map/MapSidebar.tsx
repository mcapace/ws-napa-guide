'use client'

import Link from 'next/link'
import { type MapPin, PIN_COLORS, PIN_LABELS } from '@/data/map-pins'

interface MapSidebarProps {
  pin: MapPin | null
  isOpen: boolean
  onClose: () => void
}

export default function MapSidebar({ pin, isOpen, onClose }: MapSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 19,
            display: 'none',
          }}
          className="sidebar-backdrop"
        />
      )}

      <aside
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '380px',
          background: 'rgba(13,11,9,0.97)',
          backdropFilter: 'blur(16px)',
          borderRight: '1px solid rgba(247,243,236,0.06)',
          boxShadow: '4px 0 32px rgba(0,0,0,0.3)',
          zIndex: 20,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: '1px solid rgba(247,243,236,0.1)',
            color: '#9b9283',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'none',
            fontSize: '1.1rem',
            zIndex: 1,
            transition: 'border-color 0.6s, color 0.6s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#C4943A'
            e.currentTarget.style.color = '#C4943A'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(247,243,236,0.1)'
            e.currentTarget.style.color = '#9b9283'
          }}
        >
          &times;
        </button>

        {pin ? (
          <>
            {/* Image */}
            <div
              style={{
                aspectRatio: '16/9',
                background: '#1A1612',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${pin.images[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.7s ease',
                }}
              />
              {/* Type badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: PIN_COLORS[pin.type],
                  color: '#F7F3EC',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.65rem',
                  fontWeight: 500,
                }}
              >
                {PIN_LABELS[pin.type]}
              </div>
              {/* Rating */}
              {pin.rating && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: '#6B1C2A',
                    color: '#F7F3EC',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 400,
                    padding: '0.3rem 0.65rem',
                    lineHeight: 1,
                  }}
                >
                  {pin.rating}
                  <span style={{ fontSize: '0.65rem', opacity: 0.7, marginLeft: '2px' }}>pts</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: '1.75rem', flex: 1 }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C4943A',
                  display: 'block',
                  marginBottom: '0.4rem',
                }}
              >
                {pin.region.replace(/-/g, ' ')}
              </span>

              <h2
                className="display-md"
                style={{ color: '#F7F3EC', marginBottom: '0.5rem' }}
              >
                {pin.name}
              </h2>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                {pin.cuisine && (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#9b9283' }}>
                    {pin.cuisine}
                  </span>
                )}
                {pin.priceRange && (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#9b9283' }}>
                    {pin.priceRange}
                  </span>
                )}
                {pin.category && (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#9b9283', textTransform: 'capitalize' }}>
                    {pin.category}
                  </span>
                )}
              </div>

              <div style={{ width: '32px', height: '1px', background: '#C4943A', marginBottom: '1.25rem', opacity: 0.7 }} />

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'rgba(247,243,236,0.55)',
                  lineHeight: 1.8,
                  marginBottom: '2rem',
                }}
              >
                {pin.excerpt}
              </p>

              <Link
                href={pin.href}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginBottom: '0.75rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#0D0B09',
                  background: '#F7F3EC',
                  padding: '0.9rem 2.25rem',
                  textDecoration: 'none',
                  transition: 'background 0.6s ease',
                }}
              >
                Read Full Profile &rarr;
              </Link>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${pin.coords[1]},${pin.coords[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#9b9283',
                  padding: '0.75rem',
                  textDecoration: 'none',
                  border: '1px solid rgba(247,243,236,0.1)',
                  transition: 'border-color 0.6s, color 0.6s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C4943A'
                  e.currentTarget.style.color = '#C4943A'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(247,243,236,0.1)'
                  e.currentTarget.style.color = '#9b9283'
                }}
              >
                Get Directions &nearr;
              </a>
            </div>
          </>
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              textAlign: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                border: '1px solid rgba(247,243,236,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B1C2A" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: '#9b9283',
              }}
            >
              Select a pin to explore
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#9b9283', lineHeight: 1.5 }}>
              Click any winery, restaurant, or hotel on the map
            </p>
          </div>
        )}
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .sidebar-backdrop { display: block !important; }
          aside {
            width: 100% !important;
            top: auto !important;
            bottom: 0 !important;
            height: 70vh !important;
            transform: ${isOpen ? 'translateY(0)' : 'translateY(100%)'} !important;
          }
        }
      `}</style>
    </>
  )
}
