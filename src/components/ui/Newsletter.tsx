'use client'

import { useCallback, useState } from 'react'

type Variant = 'compact' | 'hero'

const PRIVACY_HREF = 'https://www.winespectator.com/pages/privacy-policy'
const TERMS_HREF = 'https://www.winespectator.com/pages/terms-of-service'

const MARKETING_CONSENT_COPY = (
  <>
    I agree to receive marketing and promotional emails from Wine Spectator (M. Shanken
    Communications) about the Napa Valley Guide and related offers, as described in the{' '}
    <a href={PRIVACY_HREF} target="_blank" rel="noopener noreferrer">
      Privacy Policy
    </a>{' '}
    and{' '}
    <a href={TERMS_HREF} target="_blank" rel="noopener noreferrer">
      Terms of Service
    </a>
    . I can unsubscribe at any time.
  </>
)

const inputBaseCompact = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 13,
  fontWeight: 300,
  color: '#F7F3EC',
  background: 'transparent',
  border: '1px solid rgba(247,243,236,0.15)',
  padding: '12px 16px',
  outline: 'none' as const,
  width: '100%',
  boxSizing: 'border-box' as const,
}

const labelCompact = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: 'rgba(247,243,236,0.45)',
  marginBottom: 6,
  display: 'block' as const,
}

const consentLabelStyle = {
  display: 'flex',
  gap: 10,
  alignItems: 'flex-start',
  textAlign: 'left' as const,
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 12,
  fontWeight: 300,
  lineHeight: 1.55,
  color: 'rgba(247,243,236,0.55)',
  marginTop: 16,
  cursor: 'pointer',
}

export function NewsletterSubscribeForm({ variant }: { variant: Variant }) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubscribe = useCallback(async () => {
    if (!consent) return
    setError(false)
    setLoading(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName, consent: true }),
      })
      if (res.ok) {
        setSuccess(true)
        setEmail('')
        setFirstName('')
        setLastName('')
        setConsent(false)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [email, firstName, lastName, consent])

  if (success) {
    return (
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: variant === 'hero' ? 13 : 14,
          fontWeight: 300,
          color: '#C4943A',
          textAlign: 'center',
          margin: variant === 'hero' ? 0 : undefined,
        }}
      >
        Thanks. You&apos;re on the list.
      </p>
    )
  }

  const consentBlock = (
    <label className="home-newsletter-consent" style={consentLabelStyle}>
      <input
        type="checkbox"
        checked={consent}
        onChange={(e) => setConsent(e.target.checked)}
        style={{ marginTop: 3, flexShrink: 0, accentColor: '#C4943A' }}
      />
      <span>
        {MARKETING_CONSENT_COPY}
      </span>
    </label>
  )

  const errorBlock = error ? (
    <p
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        fontWeight: 400,
        color: '#c44',
        textAlign: 'center',
        marginTop: 16,
      }}
    >
      Something went wrong. Please try again.
    </p>
  ) : null

  if (variant === 'hero') {
    return (
      <div className="home-newsletter-form" style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="home-newsletter-name-row">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            autoComplete="given-name"
            className="home-newsletter-input"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            autoComplete="family-name"
            className="home-newsletter-input"
          />
        </div>
        <div className="home-newsletter-email-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            className="home-newsletter-input home-newsletter-email-input"
            aria-label="Email address"
          />
          <button
            type="button"
            disabled={loading || !consent || !email.trim()}
            onClick={handleSubscribe}
            className="home-newsletter-submit"
            aria-label="Subscribe"
          >
            <span className="home-newsletter-submit-label">
              {loading ? 'Sending…' : 'Subscribe'}
            </span>
            <svg
              className="home-newsletter-submit-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {consentBlock}
        {errorBlock}
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 420, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>
          <label htmlFor="newsletter-first" style={labelCompact}>
            First name
          </label>
          <input
            id="newsletter-first"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            style={inputBaseCompact}
          />
        </div>
        <div>
          <label htmlFor="newsletter-last" style={labelCompact}>
            Last name
          </label>
          <input
            id="newsletter-last"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
            style={inputBaseCompact}
          />
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="newsletter-email" style={labelCompact}>
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          style={inputBaseCompact}
        />
      </div>
      {consentBlock}
      <button
        type="button"
        disabled={loading || !consent || !email.trim()}
        onClick={handleSubscribe}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#0D0B09',
          background: loading || !consent ? 'rgba(247,243,236,0.7)' : '#F7F3EC',
          border: 'none',
          padding: '14px 24px',
          cursor: loading || !consent ? 'not-allowed' : 'pointer',
          width: '100%',
          transition: 'background 0.3s',
          marginTop: 16,
          opacity: !consent ? 0.7 : 1,
        }}
      >
        {loading ? 'Sending…' : 'Submit'}
      </button>
      {errorBlock}
    </div>
  )
}

export default function Newsletter() {
  return (
    <section
      style={{
        padding: '80px 60px',
        background: '#0D0B09',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: '#F7F3EC',
            marginBottom: 16,
          }}
        >
          Stay in the know
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 300,
            color: 'rgba(247,243,236,0.55)',
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          Be the first to know when new wineries, restaurants, and travel itineraries are added to the guide.
        </p>
        <NewsletterSubscribeForm variant="compact" />
      </div>
    </section>
  )
}
