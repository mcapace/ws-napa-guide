import { PIN_COLORS, PIN_LABELS, type PinType } from '@/data/map-pins'

const PIN_TYPES: PinType[] = ['winery', 'restaurant', 'hotel']

export default function MapLegend() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '3rem',
        right: '1rem',
        background: 'rgba(13,11,9,0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(247,243,236,0.08)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        padding: '1rem 1.1rem',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        minWidth: '148px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.55rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C4943A',
          display: 'block',
          marginBottom: '0.1rem',
        }}
      >
        Legend
      </span>

      {PIN_TYPES.map((type) => (
        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)',
              background: PIN_COLORS[type],
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              color: '#9b9283',
            }}
          >
            {PIN_LABELS[type]}
          </span>
        </div>
      ))}

      <div
        style={{
          borderTop: '1px solid rgba(247,243,236,0.08)',
          paddingTop: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
        }}
      >
        <div
          style={{
            width: '16px',
            height: '0',
            borderTop: '2px dashed #5C6B52',
            opacity: 0.6,
            flexShrink: 0,
          }}
        />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#9b9283' }}>
          AVA boundary
        </span>
      </div>
    </div>
  )
}
