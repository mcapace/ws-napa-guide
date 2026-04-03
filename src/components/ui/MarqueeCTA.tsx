'use client'

import Link from 'next/link'

export function MarqueeCTA({ href, label }: { href: string; label: string }) {
  const chunk = `${label} · `
  const text = chunk.repeat(12)

  return (
    <Link href={href} style={{ display: 'block', overflow: 'hidden', textDecoration: 'none' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid rgba(247,243,236,0.2)',
          borderRadius: 2,
          padding: '14px 0',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 0,
            animation: 'marquee 20s linear infinite',
            whiteSpace: 'nowrap',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#F7F3EC',
          }}
        >
          <span>{text}</span>
          <span>{text}</span>
        </div>
      </div>
    </Link>
  )
}
