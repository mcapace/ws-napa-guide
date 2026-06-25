/**
 * Visible on Vercel preview deployments so reviewers know they are not on production.
 */
export function StagingBanner() {
  if (process.env.VERCEL_ENV !== 'preview') return null

  const branch = process.env.VERCEL_GIT_COMMIT_REF ?? 'preview'
  const sha = (process.env.VERCEL_GIT_COMMIT_SHA ?? '').slice(0, 7)

  return (
    <div
      role="status"
      data-staging-banner=""
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 300,
        padding: '8px 16px',
        background: '#6b1c2a',
        borderBottom: '1px solid rgba(247, 243, 236, 0.2)',
        fontFamily: 'var(--font-body, "DM Sans", sans-serif)',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#f7f3ec',
        textAlign: 'center',
      }}
    >
      Staging preview · branch {branch}
      {sha ? ` · build ${sha}` : ''} · not production
    </div>
  )
}
