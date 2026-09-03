import { partners } from '@/data/partners'
import type { Itinerary, ItineraryStop } from '@/lib/types'

/**
 * Presence campaign: when the planner / AI concierge recommends tastings
 * in a partner's region, prefer that partner for ~90 days from go-live.
 *
 * The same window also drives sponsor-first featured showcase order,
 * itinerary tab / stop order, and featured showcase order. After `endsOn`,
 * every helper below returns a no-op / false / 0 / editorial order — ranking,
 * concierge prompt, and region placements go back to default with no redeploy.
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

/** True if the name matches a founding partner, ignoring the campaign window. */
export function isFoundingPartnerVenueName(name: string, region?: string): boolean {
  const n = normalize(name)
  const regions = region ? [region] : Object.keys(PREFERRED_BY_REGION)
  for (const slug of regions) {
    const preferred = PREFERRED_BY_REGION[slug] ?? []
    if (
      preferred.some(
        (p) => n === p || (p.length >= 4 && n.length >= 4 && (n.includes(p) || p.includes(n))),
      )
    ) {
      return true
    }
  }
  return false
}

/**
 * During the campaign: preferred partners lead.
 * Outside the window: list is unchanged (callers should store editorial order).
 */
export function prioritizePreferredPartners<T extends { name: string }>(
  items: T[],
  region: string,
  now = new Date(),
): T[] {
  if (!isPartnerItineraryPreferenceActive(now) || items.length < 2) return items

  const preferred: T[] = []
  const rest: T[] = []
  for (const item of items) {
    if (isPreferredPartnerVenue({ name: item.name, region, category: 'winery', now })) {
      preferred.push(item)
    } else {
      rest.push(item)
    }
  }
  if (preferred.length === 0) return items
  return [...preferred, ...rest]
}

/** Narrative blurbs when a route is reordered so a partner leads (campaign only). */
const CAMPAIGN_STOP_BLURBS: Record<string, Record<string, string>> = {
  'modern-tasting-salons': {
    'HALL St. Helena':
      'Start at HALL St. Helena on the historic Bergfeld Vineyard. Pair award-winning Cabernets with contemporary art and seasonal culinary bites on a LEED Gold–certified estate—Bunny Foo-Foo included.',
    'Royal We Wines':
      'Head into town for Royal We Wines, a tasting salon from winemaker Thomas Rivers Brown and partner Matt Hardin. The space is comfy/swanky with a bar counter and side rooms that offer varying seating configurations.',
    'Wheeler Farms':
      'Continue south and turn left down Zinfandel Lane to Wheeler Farms. Winemaker Nigel Kinsman makes Accendo here, along with Kinsman Eades, Bella Oaks, Annulus and other labels.',
  },
}

/** Reorder itinerary stops so preferred partners lead; renumber `order`. */
export function prioritizePreferredItineraryStops(
  stops: ItineraryStop[],
  region: string,
  itineraryId?: string,
  now = new Date(),
): ItineraryStop[] {
  const ordered = prioritizePreferredPartners(stops, region, now)
  if (ordered === stops) return stops

  const blurbMap = itineraryId ? CAMPAIGN_STOP_BLURBS[itineraryId] : undefined
  return ordered.map((stop, index) => ({
    ...stop,
    order: index + 1,
    ...(blurbMap?.[stop.name] ? { blurb: blurbMap[stop.name] } : {}),
  }))
}

/**
 * During the campaign: itineraries that contain a preferred partner lead the tabs.
 * Outside the window: editorial order is unchanged.
 */
export function prioritizePartnerItineraries(
  itineraries: Itinerary[],
  region: string,
  now = new Date(),
): Itinerary[] {
  const withStops = itineraries.map((it) => ({
    ...it,
    stops: prioritizePreferredItineraryStops(it.stops, region, it.id, now),
  }))

  if (!isPartnerItineraryPreferenceActive(now) || withStops.length < 2) {
    return withStops
  }

  const preferred: Itinerary[] = []
  const rest: Itinerary[] = []
  for (const it of withStops) {
    const hasPartner = it.stops.some((stop) =>
      isPreferredPartnerVenue({
        name: stop.name,
        region,
        category: stop.category,
        now,
      }),
    )
    if (hasPartner) preferred.push(it)
    else rest.push(it)
  }
  return preferred.length > 0 ? [...preferred, ...rest] : withStops
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
