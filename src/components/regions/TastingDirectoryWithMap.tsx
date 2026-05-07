import type { RegionCoordinates, TastingDirectoryRow } from '@/lib/content/types'
import { normalizeWebsiteUrl } from '@/lib/content/parseRegionMdxBody'
import { TastingMapLazy } from './TastingMapLazy'

export function TastingDirectoryWithMap({
  regionLabel,
  center,
  rows,
  directoryTitle,
}: {
  regionLabel: string
  center: RegionCoordinates
  rows: TastingDirectoryRow[]
  /** When set, replaces the default “More {region} Tasting Rooms” heading (e.g. lodging). */
  directoryTitle?: string
}) {
  const title = directoryTitle ?? `More ${regionLabel} Tasting Rooms`

  return (
    <section
      style={{
        background: '#FAF7F2',
        padding: 'clamp(64px, 10vw, 110px) clamp(24px, 4vw, 48px)',
        borderTop: '1px solid rgba(26,22,20,0.06)',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(36px, 4.5vw, 52px)',
            color: '#1A1614',
            margin: '0 0 40px',
            textAlign: 'center',
          }}
        >
          {title}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: 'clamp(32px, 5vw, 56px)',
            alignItems: 'start',
          }}
          className="tasting-directory-grid"
        >
          <style>{`
            @media (max-width: 960px) {
              .tasting-directory-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {rows.map((row) => {
              const href = normalizeWebsiteUrl(row.website)
              return (
                <li
                  key={`${row.name}-${row.address}`}
                  style={{
                    padding: '22px 0',
                    borderBottom: '1px solid rgba(26,22,20,0.1)',
                  }}
                >
                  <p style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 600, color: '#1A1614' }}>{row.name}</p>
                  <p style={{ margin: '0 0 10px', fontSize: 13, lineHeight: 1.55, color: 'rgba(26,22,20,0.72)' }}>
                    {row.address}
                  </p>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="feature-meta-link"
                      style={{ fontSize: 11 }}
                    >
                      {row.website.replace(/^https?:\/\//i, '')}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
          <div className="tasting-map-sticky" style={{ height: '100%', minHeight: 420 }}>
            <TastingMapLazy center={center} rows={rows} regionName={regionLabel} />
          </div>
        </div>
      </div>
    </section>
  )
}
