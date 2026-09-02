/** Emily / HALL request: tag every referral out of the guide. */
export const NAPA_GUIDE_UTM = {
  utm_source: 'winespectator',
  utm_medium: 'referral',
  utm_campaign: 'napa-valley-trip-planner',
} as const

const TRACKED_HOSTS = new Set([
  'hallwines.com',
  'www.hallwines.com',
  'waltwines.com',
  'www.waltwines.com',
  'bacawines.com',
  'www.bacawines.com',
  'michelfoch.com',
  'www.michelfoch.com',
])

function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname.toLowerCase()
  } catch {
    return null
  }
}

export function shouldApplyNapaGuideUtm(url: string): boolean {
  const host = hostOf(url)
  return Boolean(host && TRACKED_HOSTS.has(host))
}

/** Append campaign UTMs when missing; leave unrelated hosts unchanged. */
export function withNapaGuideUtm(url: string): string {
  if (!shouldApplyNapaGuideUtm(url)) return url
  try {
    const parsed = new URL(url)
    for (const [key, value] of Object.entries(NAPA_GUIDE_UTM)) {
      if (!parsed.searchParams.has(key)) parsed.searchParams.set(key, value)
    }
    return parsed.toString()
  } catch {
    return url
  }
}
