/**
 * Canonical origin for `metadataBase`, resolved OG URLs, etc.
 *
 * Resolution order:
 * 1. `NEXT_PUBLIC_SITE_URL` (trimmed, no trailing slash) if set
 * 2. Else if `NODE_ENV === 'production'`: `https://napatravel.winespectator.com`
 * 3. Else if `VERCEL_URL`: `https://${VERCEL_URL}` (preview / Vercel without step 1–2)
 * 4. Else: `http://localhost:3000`
 *
 * `next build` sets `NODE_ENV=production`; for local production builds without env vars,
 * step 2 applies. Vercel Production should always set `NEXT_PUBLIC_SITE_URL` (step 1).
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '')
  if (fromEnv) return fromEnv

  if (process.env.NODE_ENV === 'production') {
    return 'https://napatravel.winespectator.com'
  }

  if (process.env.VERCEL_URL) {
    const host = process.env.VERCEL_URL.replace(/\/+$/, '')
    return `https://${host}`
  }

  return 'http://localhost:3000'
}
