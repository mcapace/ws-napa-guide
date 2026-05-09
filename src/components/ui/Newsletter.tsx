'use client'

import { useCallback, useState } from 'react'

type Variant = 'compact' | 'hero'

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

export function NewsletterSubscribeForm({ variant }: { variant: Variant }) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubscribe = useCallback(async () => {
    setError(false)
    setLoading(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName }),
      })
      if (res.ok) {
        setSuccess(true)
        setEmail('')
        setFirstName('')
        setLastName('')
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [email, firstName, lastName])

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

  if (variant === 'hero') {
    return (
      <div className="home-newsletter-form" style={{ maxWidth: 700, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginBottom: 12,
          }}
        >
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="FIRST NAME"
            autoComplete="given-name"
            style={{
              background: 'none',
              border: '1px solid rgba(247,243,236,0.2)',
              outline: 'none',
              color: '#F7F3EC',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '14px 18px',
            }}
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="LAST NAME"
            autoComplete="family-name"
            style={{
              background: 'none',
              border: '1px solid rgba(247,243,236,0.2)',
              outline: 'none',
              color: '#F7F3EC',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '14px 18px',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            border: '1px solid rgba(247,243,236,0.2)',
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL ADDRESS"
            autoComplete="email"
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#F7F3EC',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '18px 24px',
            }}
          />
          <button
            type="button"
            disabled={loading}
            onClick={handleSubscribe}
            style={{
              background: 'none',
              border: 'none',
              borderLeft: '1px solid rgba(247,243,236,0.2)',
              cursor: loading ? 'wait' : 'pointer',
              color: 'rgba(247,243,236,0.6)',
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.3s',
              opacity: loading ? 0.6 : 1,
            }}
            aria-label="Subscribe"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {error ? (
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
        ) : null}
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
      <button
        type="button"
        disabled={loading}
        onClick={handleSubscribe}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#0D0B09',
          background: loading ? 'rgba(247,243,236,0.7)' : '#F7F3EC',
          border: 'none',
          padding: '14px 24px',
          cursor: loading ? 'wait' : 'pointer',
          width: '100%',
          transition: 'background 0.3s',
        }}
      >
        {loading ? 'Sending…' : 'Submit'}
      </button>
      {error ? (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 300,
            color: '#e88',
            textAlign: 'center',
            marginTop: 16,
          }}
        >
          Something went wrong. Please try again.
        </p>
      ) : null}
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
