import type { ReactNode } from 'react'

export function RegionLede({ children }: { children: ReactNode }) {
  return (
    <section
      style={{
        background: '#FAF7F2',
        padding: 'clamp(48px, 8vw, 80px) clamp(24px, 5vw, 40px)',
      }}
    >
      <div
        className="region-editorial-lede"
        style={{
          maxWidth: 680,
          margin: '0 auto',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 20,
          lineHeight: 1.65,
          color: '#1A1614',
        }}
      >
        {children}
      </div>
    </section>
  )
}
