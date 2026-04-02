import type { Sponsor } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

interface SponsorBlockProps {
  sponsor: Sponsor
  context?: 'inline' | 'section-header' | 'card'
}

export default function SponsorBlock({ sponsor }: SponsorBlockProps) {
  if (!sponsor.active) return null

  if (sponsor.tier === 'standard') {
    return (
      <div className="sponsor-standard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--mist)',
          }}
        >
          Presented by
        </span>
        <Link href={sponsor.website} target="_blank" rel="noopener sponsored">
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={80}
            height={24}
            style={{ objectFit: 'contain', opacity: 0.7, filter: 'brightness(0) invert(1)' }}
          />
        </Link>
      </div>
    )
  }

  if (sponsor.tier === 'featured') {
    return (
      <div
        className="sponsor-featured"
        style={{
          padding: '2rem',
          marginTop: '2rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '1.5rem',
          alignItems: 'center',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            Featured Partner
          </span>
          {sponsor.customContent?.headline && (
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 300,
                color: 'var(--cream)',
                marginBottom: '0.5rem',
              }}
            >
              {sponsor.customContent.headline}
            </h3>
          )}
          {sponsor.customContent?.body && (
            <p style={{ color: 'var(--mist)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {sponsor.customContent.body}
            </p>
          )}
          {sponsor.customContent?.cta && (
            <Link
              href={sponsor.customContent.ctaUrl ?? sponsor.website}
              target="_blank"
              rel="noopener sponsored"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(196, 148, 58, 0.4)',
                paddingBottom: '2px',
              }}
            >
              {sponsor.customContent.cta} →
            </Link>
          )}
        </div>
        <Link href={sponsor.website} target="_blank" rel="noopener sponsored">
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={120}
            height={40}
            style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.85 }}
          />
        </Link>
      </div>
    )
  }

  if (sponsor.tier === 'presenting') {
    return (
      <div
        className="sponsor-presenting"
        style={{
          background: sponsor.customContent?.backgroundColor ?? 'rgba(107, 28, 42, 0.15)',
          borderTop: '1px solid rgba(196, 148, 58, 0.3)',
          borderBottom: '1px solid rgba(196, 148, 58, 0.3)',
          padding: '3rem 2rem',
          textAlign: 'center',
          marginBottom: '4rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            display: 'block',
            marginBottom: '1.5rem',
          }}
        >
          Presenting Sponsor
        </span>
        <Link href={sponsor.website} target="_blank" rel="noopener sponsored">
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={200}
            height={60}
            style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', margin: '0 auto 1.5rem' }}
          />
        </Link>
        {sponsor.customContent?.headline && (
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 300,
              color: 'var(--cream)',
              marginBottom: '1rem',
              fontStyle: 'italic',
            }}
          >
            {sponsor.customContent.headline}
          </h2>
        )}
        {sponsor.customContent?.body && (
          <p style={{ color: 'var(--mist)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            {sponsor.customContent.body}
          </p>
        )}
        {sponsor.customContent?.cta && (
          <Link
            href={sponsor.customContent.ctaUrl ?? sponsor.website}
            target="_blank"
            rel="noopener sponsored"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              background: 'var(--gold)',
              padding: '0.75rem 2rem',
              textDecoration: 'none',
            }}
          >
            {sponsor.customContent.cta}
          </Link>
        )}
      </div>
    )
  }

  return null
}
