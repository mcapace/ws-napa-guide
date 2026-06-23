/**
 * Canonical origin for `metadataBase`, resolved OG URLs, etc.
 *
 * Resolution order:
 * 1. `NEXT_PUBLIC_SITE_URL` (trimmed, no trailing slash) if set
 * 2. Else if `VERCEL_ENV === 'preview'`: `https://${VERCEL_URL}` (staging / PR previews)
 * 3. Else if `NODE_ENV === 'production'`: `https://napatravel.winespectator.com`
 * 4. Else if `VERCEL_URL`: `https://${VERCEL_URL}`
 * 5. Else: `http://localhost:3000`
 *
 * Vercel Production should set `NEXT_PUBLIC_SITE_URL` to the live domain (step 1).
 * Staging branch previews use step 2 unless you override with Preview env vars.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '')
  if (fromEnv) return fromEnv

  // Preview / staging deployments — never fall through to production canonical
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) {
    const host = process.env.VERCEL_URL.replace(/\/+$/, '')
    return `https://${host}`
  }

  if (process.env.NODE_ENV === 'production') {
    return 'https://napatravel.winespectator.com'
  }

  if (process.env.VERCEL_URL) {
    const host = process.env.VERCEL_URL.replace(/\/+$/, '')
    return `https://${host}`
  }

  return 'http://localhost:3000'
}
