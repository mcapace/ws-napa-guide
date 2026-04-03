'use client'

export default function Newsletter() {
  return (
    <section
      style={{
        padding: '80px 60px',
        borderTop: '1px solid rgba(247,243,236,0.06)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <h2
          data-text-split=""
          data-letters-rotate-in=""
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            color: '#F7F3EC',
            marginBottom: 16,
          }}
        >
          Stay in the know
        </h2>
        <p
          data-text-split=""
          data-lines-slide-up=""
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 300,
            color: 'rgba(247,243,236,0.55)',
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          Be the first to know when new wineries, restaurants, and travel
          itineraries are added to the guide.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            display: 'flex',
            gap: 0,
            maxWidth: 420,
            margin: '0 auto',
          }}
        >
          <input
            type="email"
            placeholder="Email address"
            style={{
              flex: 1,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 300,
              color: '#F7F3EC',
              background: 'transparent',
              border: '1px solid rgba(247,243,236,0.15)',
              borderRight: 'none',
              padding: '14px 20px',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#0D0B09',
              background: '#F7F3EC',
              border: 'none',
              padding: '14px 24px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background 0.3s',
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
