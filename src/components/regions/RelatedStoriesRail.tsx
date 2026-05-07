import Image from 'next/image'
import Link from 'next/link'
import type { RelatedStoryCard } from '@/lib/content/types'

export function RelatedStoriesRail({ cards }: { cards: RelatedStoryCard[] }) {
  if (cards.length === 0) return null

  const col =
    cards.length >= 3 ? 'repeat(3, minmax(0, 1fr))' : cards.length === 2 ? 'repeat(2, minmax(0, 1fr))' : '1fr'

  return (
    <section
      style={{
        background: '#FAF7F2',
        padding: 'clamp(56px, 9vw, 96px) clamp(24px, 4vw, 48px)',
        borderTop: '1px solid rgba(26,22,20,0.06)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 44px)',
            color: '#1A1614',
            margin: '0 0 40px',
            textAlign: 'center',
          }}
        >
          Related stories
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: col,
            gap: 'clamp(20px, 3vw, 32px)',
          }}
          className="related-stories-grid"
        >
          <style>{`
            @media (max-width: 900px) {
              .related-stories-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                background: '#F5F0E8',
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid rgba(26,22,20,0.08)',
                transition: 'box-shadow 0.25s ease',
              }}
              className="related-story-card"
            >
              <div style={{ position: 'relative', aspectRatio: '16 / 10', width: '100%' }}>
                <Image src={c.image} alt="" fill sizes="(min-width: 900px) 33vw, 100vw" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '20px 22px 24px' }}>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(26,22,20,0.5)',
                    margin: '0 0 10px',
                  }}
                >
                  {c.eyebrow}
                </p>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 400,
                    fontSize: 'clamp(22px, 2.2vw, 28px)',
                    lineHeight: 1.2,
                    margin: '0 0 12px',
                    color: '#1A1614',
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 15,
                    lineHeight: 1.55,
                    margin: 0,
                    color: 'rgba(26,22,20,0.78)',
                  }}
                >
                  {c.dek}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .related-story-card:hover { box-shadow: 0 8px 28px rgba(26,22,20,0.08); }
      `}</style>
    </section>
  )
}
