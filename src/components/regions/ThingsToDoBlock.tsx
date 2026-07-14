import Image from 'next/image'
import type { ThingsToDoSection } from '@/lib/content/types'
import { normalizeWebsiteUrl } from '@/lib/content/parseRegionMdxBody'
import { SectionDivider } from './SectionDivider'

/**
 * @deprecated Unused on region scroll pages — Between Pours listings live in Explore.
 * Kept for reprint / archive layouts that still want a story-field treatment.
 */
export function ThingsToDoBlock({ section }: { section: ThingsToDoSection }) {
  if (section.features.length === 0 && !section.intro) return null

  return (
    <section className="region-chapter region-chapter--showcase" id="region-things-to-do">
      <SectionDivider label={section.heading} compact variant="magazine" />
      <div
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 48px) clamp(56px, 8vw, 96px)',
        }}
      >
        {section.intro ? (
          <div
            className="things-to-do-intro"
            style={{
              fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2.2vw, 22px)',
              lineHeight: 1.6,
              color: 'rgba(247, 243, 236, 0.82)',
              margin: '0 0 clamp(32px, 5vw, 48px)',
              textAlign: 'center',
            }}
          >
            {section.intro}
          </div>
        ) : null}

        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {section.features.map((f) => {
            const looksLikeUrl = /^[a-z0-9.-]+\.[a-z]{2,}(\/|$)/i.test(f.website ?? '')
            const href = looksLikeUrl ? normalizeWebsiteUrl(f.website) : undefined
            const isLink = Boolean(href)
            return (
              <li
                key={f.name}
                style={{
                  padding: 'clamp(28px, 4vw, 40px) 0',
                  borderTop: '1px solid rgba(247, 243, 236, 0.1)',
                }}
              >
                {f.image ? (
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '2 / 1',
                      overflow: 'hidden',
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      src={f.image}
                      alt={f.name}
                      fill
                      sizes="(min-width: 800px) 760px, 100vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : null}
                <h3
                  style={{
                    fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    lineHeight: 1.15,
                    color: '#F7F3EC',
                    margin: '0 0 8px',
                  }}
                >
                  {f.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--gold, #C4943A)',
                    margin: '0 0 14px',
                  }}
                >
                  {f.address}
                  {f.address && f.website ? ' · ' : ''}
                  {f.website ? (
                    isLink ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid rgba(196,148,58,0.4)' }}
                      >
                        {f.website.replace(/^https?:\/\//i, '')}
                      </a>
                    ) : (
                      f.website
                    )
                  ) : null}
                </p>
                <div
                  style={{
                    fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
                    fontSize: 'clamp(17px, 2vw, 19px)',
                    lineHeight: 1.65,
                    color: 'rgba(247, 243, 236, 0.78)',
                  }}
                  className="things-to-do-body"
                >
                  {f.body}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
