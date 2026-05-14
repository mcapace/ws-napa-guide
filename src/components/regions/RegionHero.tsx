import Image from 'next/image'
import type { RegionMdxFrontmatter } from '@/lib/content/types'

export function RegionHero({ fm }: { fm: RegionMdxFrontmatter }) {
  return (
    <header className="region-editorial-hero">
      <div style={{ position: 'absolute', inset: 0 }}>
        {fm.heroImagePortrait ? (
          <>
            <Image
              src={fm.heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="hidden md:block"
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={fm.heroImagePortrait}
              alt=""
              fill
              priority
              sizes="100vw"
              className="md:hidden"
              style={{ objectFit: 'cover' }}
            />
          </>
        ) : (
          <Image
            src={fm.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(26,22,20,0.35) 0%, rgba(26,22,20,0.12) 35%, rgba(26,22,20,0.7) 100%)',
          zIndex: 1,
        }}
      />
      <div className="hero-top-scrim" aria-hidden />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: 'clamp(32px, 6vw, 72px) clamp(24px, 5vw, 64px) clamp(40px, 7vw, 88px)',
          maxWidth: 1100,
          zIndex: 3,
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(250,247,242,0.88)',
            margin: '0 0 14px',
          }}
        >
          Wine Spectator · Napa Valley Guide
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(250,247,242,0.78)',
            margin: '0 0 28px',
          }}
        >
          By {fm.byline}
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(72px, 12vw, 144px)',
            lineHeight: 0.95,
            color: '#FAF7F2',
            margin: '0 0 12px',
            letterSpacing: '-0.02em',
          }}
        >
          {fm.region}
        </h1>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(22px, 3.4vw, 34px)',
            lineHeight: 1.25,
            color: 'rgba(250,247,242,0.92)',
            margin: 0,
            maxWidth: 640,
          }}
        >
          {fm.tagline}
        </p>
      </div>
    </header>
  )
}
