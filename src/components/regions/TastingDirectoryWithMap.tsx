import type { RegionCoordinates, TastingDirectoryRow } from '@/lib/content/types'
import { normalizeWebsiteUrl } from '@/lib/content/parseRegionMdxBody'
import { TastingMapLazy } from './TastingMapLazy'

export function TastingDirectoryWithMap({
  regionLabel,
  center,
  rows,
  mapRows,
  directoryTitle,
}: {
  regionLabel: string
  center: RegionCoordinates
  /** Directory list only (e.g. GFM table). Map pins may include featured picks via `mapRows`. */
  rows: TastingDirectoryRow[]
  /** Map markers; defaults to `rows` when omitted (tasting rooms). */
  mapRows?: TastingDirectoryRow[]
  /** When set, replaces the default “More {region} Tasting Rooms” heading (e.g. lodging). */
  directoryTitle?: string
}) {
  const title = directoryTitle ?? `More ${regionLabel} Tasting Rooms`
  const pins = mapRows ?? rows
  const showList = rows.length > 0

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
            fontFamily: 'var(--font-display)',
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
            gridTemplateColumns: showList
              ? 'minmax(0, 1fr) minmax(0, 1fr)'
              : '1fr',
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
          {showList ? (
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                fontFamily: 'var(--font-body)',
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
                    <p className="tasting-directory-name">{row.name}</p>
                    <p className="tasting-directory-address">{row.address}</p>
                    {href && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tasting-directory-url"
                      >
                        {row.website.replace(/^https?:\/\//i, '')}
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : null}
          <div
            className="tasting-map-sticky"
            style={{
              height: '100%',
              minHeight: 420,
              gridColumn: showList ? undefined : '1 / -1',
            }}
          >
            <TastingMapLazy center={center} rows={pins} regionName={regionLabel} />
          </div>
        </div>
      </div>
    </section>
  )
}
