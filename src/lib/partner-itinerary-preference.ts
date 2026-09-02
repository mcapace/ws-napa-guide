import { partners } from '@/data/partners'

/**
 * Presence campaign: when the planner / AI concierge recommends tastings
 * in a partner's region, prefer that partner for ~90 days from go-live.
 *
 * After `endsOn`, every helper below returns a no-op / false / 0 — ranking and
 * the concierge prompt go back to the default (no partner boost) with no
 * redeploy required.
 */
export const PARTNER_ITINERARY_PREFERENCE = {
  /** Inclusive start (UTC date). */
  startsOn: '2026-09-01',
  /** Inclusive end (UTC date) — ~90 days from Sept 1. After this day: normal. */
  endsOn: '2026-11-29',
} as const

function utcDayStamp(d = new Date()): string {
  return d.toISOString().slice(0, 10)
}

export function isPartnerItineraryPreferenceActive(now = new Date()): boolean {
  const day = utcDayStamp(now)
  return (
    day >= PARTNER_ITINERARY_PREFERENCE.startsOn &&
    day <= PARTNER_ITINERARY_PREFERENCE.endsOn
  )
}

function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

/** Partner venue names keyed by the region they should be favored in. */
const PREFERRED_BY_REGION: Record<string, string[]> = {}
for (const partner of partners) {
  const names = partner.matchNames.map(normalize)
  PREFERRED_BY_REGION[partner.regionSlug] = [
    ...(PREFERRED_BY_REGION[partner.regionSlug] ?? []),
    ...names,
    normalize(partner.name),
  ]
}

export function isPreferredPartnerVenue(opts: {
  name: string
  region: string
  category?: string
  now?: Date
}): boolean {
  if (!isPartnerItineraryPreferenceActive(opts.now)) return false
  if (opts.category && opts.category !== 'winery') return false
  const preferred = PREFERRED_BY_REGION[opts.region]
  if (!preferred?.length) return false
  const n = normalize(opts.name)
  return preferred.some(
    (p) => n === p || (p.length >= 4 && n.length >= 4 && (n.includes(p) || p.includes(n))),
  )
}

/** Concierge system-prompt block — empty string outside the campaign window. */
export function partnerItineraryPreferencePrompt(now = new Date()): string {
  if (!isPartnerItineraryPreferenceActive(now)) return ''

  const lines = partners.map(
    (p) =>
      `- In ${p.regionName} (${p.regionSlug}): prefer ${p.name} as a tasting stop when the day is set in that area (slug will appear in the catalog; match by name/region).`,
  )

  return `

## Founding partner preference (active through ${PARTNER_ITINERARY_PREFERENCE.endsOn})

HALL Wines is a founding partner for this guide. When building or revising itineraries, favor their properties for tasting stops in the matching town — do not skip them in favor of a random peer unless the visitor's constraints clearly rule them out (e.g. they asked only for Pinot and the day is in Cabernet country with no fit, or they already visited, or they explicitly asked to avoid). Still recommend ONLY catalog venues; never invent.

${lines.join('\n')}

When a preferred partner fits, include them as the morning or afternoon tasting for that region's day and mention them naturally in the note. If the visitor is based nearby (St. Helena / Rutherford / Downtown Napa), lean the region window toward those areas when other signals are equal.
`
}

/** Lower = better for plan-itinerary ranking. */
export function partnerPreferenceRankBoost(opts: {
  name: string
  region: string
  dayRegion: string
  category: string
  now?: Date
}): number {
  if (opts.region !== opts.dayRegion) return 0
  if (!isPreferredPartnerVenue(opts)) return 0
  // Stronger than editorial (+40) and region-distance steps (*100) for the home region.
  return -250
}
