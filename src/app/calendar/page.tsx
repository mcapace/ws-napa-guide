import type { Metadata } from 'next'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import {
  CALENDAR_BYLINE,
  CALENDAR_DEK,
  CALENDAR_KICKER,
  CALENDAR_SEASONS,
  CALENDAR_TITLE,
} from '@/data/wine-country-calendar'

export const metadata: Metadata = {
  title: 'Wine Country Calendar — Wine Spectator Napa Valley Guide',
  description:
    'A seasonal guide to things to see and do in Napa Valley, from mustard season and Restaurant Month to BottleRock, harvest parties and the Lighted Tractor Parade.',
}

export default function CalendarPage() {
  return (
    <div
      className="grain"
      data-site-surface="dark"
      style={{
        background: '#0D0B09',
        minHeight: '100vh',
        paddingTop: 'calc(var(--ws-site-header-height, 72px) + 8px)',
      }}
    >
      <header
        style={{
          maxWidth: 820,
          margin: '0 auto',
          padding: 'clamp(56px, 9vw, 104px) clamp(24px, 5vw, 40px) clamp(24px, 4vw, 48px)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            margin: '0 0 20px',
          }}
        >
          {CALENDAR_KICKER}
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(44px, 7vw, 84px)',
            lineHeight: 0.98,
            letterSpacing: '-0.02em',
            color: 'var(--cream)',
            margin: '0 0 18px',
          }}
        >
          {CALENDAR_TITLE}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(18px, 2.4vw, 24px)',
            color: 'rgba(247, 243, 236, 0.75)',
            margin: '0 0 16px',
          }}
        >
          {CALENDAR_DEK}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(247, 243, 236, 0.55)',
            margin: 0,
          }}
        >
          By {CALENDAR_BYLINE}
        </p>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '0 clamp(24px, 5vw, 40px) clamp(72px, 10vw, 120px)' }}>
        {CALENDAR_SEASONS.map((season) => (
          <section
            key={season.months}
            style={{
              padding: 'clamp(36px, 6vw, 56px) 0',
              borderTop: '1px solid rgba(247, 243, 236, 0.1)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(30px, 4.4vw, 44px)',
                lineHeight: 1.05,
                color: 'var(--cream)',
                margin: '0 0 6px',
              }}
            >
              {season.months}
            </h2>
            <span
              aria-hidden
              style={{ display: 'block', width: 48, height: 2, background: 'var(--gold)', margin: '14px 0 26px' }}
            />
            {season.paragraphs.map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(17px, 2vw, 19px)',
                  lineHeight: 1.7,
                  color: 'rgba(247, 243, 236, 0.82)',
                  margin: '0 0 1.2em',
                }}
              >
                {para}
              </p>
            ))}
          </section>
        ))}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(247, 243, 236, 0.5)',
            textAlign: 'right',
            margin: '24px 0 0',
          }}
        >
          — {CALENDAR_BYLINE}
        </p>
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
