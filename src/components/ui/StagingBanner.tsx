import Link from 'next/link'

/**
 * Visible only on Vercel Preview deployments (staging branch, PR previews).
 * Helps confirm you're not on production and which commit is deployed.
 */
export function StagingBanner() {
  if (process.env.VERCEL_ENV !== 'preview') return null

  const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'unknown'
  const ref = process.env.VERCEL_GIT_COMMIT_REF ?? 'preview'

  return (
    <div
      role="status"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10000,
        background: '#6B1C2A',
        color: '#F7F3EC',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 11,
        letterSpacing: '0.06em',
        textAlign: 'center',
        padding: '8px 16px',
        borderBottom: '1px solid rgba(247,243,236,0.2)',
      }}
    >
      Staging preview · branch <strong>{ref}</strong> · build <strong>{sha}</strong>
      {' · '}
      <Link href="/explore" style={{ color: '#F7F3EC', textDecoration: 'underline' }}>
        Explore map
      </Link>
      {' · '}
      <Link href="/wineries" style={{ color: '#F7F3EC', textDecoration: 'underline' }}>
        Wineries
      </Link>
    </div>
  )
}
