import type { TastingDirectoryRow } from '@/lib/content/types'
import { normalizeWebsiteUrl } from '@/lib/content/parseRegionMdxBody'
import { partnerPathForName } from '@/data/partners'

export function DirectoryTextList({
  title,
  rows,
}: {
  title: string
  rows: TastingDirectoryRow[]
}) {
  if (rows.length === 0) return null

  return (
    <section
      style={{
        background: '#FAF7F2',
        padding: 'clamp(48px, 8vw, 88px) clamp(24px, 4vw, 48px)',
        borderTop: '1px solid rgba(26, 22, 20, 0.06)',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 48px)',
            color: '#1A1614',
            margin: '0 0 36px',
            textAlign: 'center',
          }}
        >
          {title}
        </h2>
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            maxWidth: 720,
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: 'var(--font-body)',
          }}
        >
          {rows.map((row) => {
            const href = normalizeWebsiteUrl(row.website)
            const partnerPath = partnerPathForName(row.name)
            return (
              <li
                key={`${row.name}-${row.address}`}
                style={{
                  padding: '22px 0',
                  borderBottom: '1px solid rgba(26, 22, 20, 0.1)',
                }}
              >
                <p className="tasting-directory-name">{row.name}</p>
                <p className="tasting-directory-address">{row.address}</p>
                {partnerPath && (
                  <a href={partnerPath} className="tasting-directory-url" style={{ display: 'block' }}>
                    View guide page &rarr;
                  </a>
                )}
                {href && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tasting-directory-url"
                    style={partnerPath ? { display: 'block', marginTop: 4 } : undefined}
                  >
                    {row.website.replace(/^https?:\/\//i, '')}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
