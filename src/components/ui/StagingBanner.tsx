import Link from 'next/link'

/**
 * Visible only on Vercel Preview deployments (staging branch, PR previews).
 */
export function StagingBanner() {
  if (process.env.VERCEL_ENV !== 'preview') return null

  const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'unknown'
  const ref = process.env.VERCEL_GIT_COMMIT_REF ?? 'preview'

  return (
    <div role="status" className="ws-staging-banner">
      Staging preview · branch <strong>{ref}</strong> · build <strong>{sha}</strong>
      {' · '}
      <Link href="/explore" className="ws-staging-banner__link">
        Explore map
      </Link>
      {' · '}
      <Link href="/wineries" className="ws-staging-banner__link">
        Wineries
      </Link>
    </div>
  )
}
