import { REGION_SOUTH_TO_NORTH } from '@/data/region-order'
import { partnerPreferenceRankBoost } from '@/lib/partner-itinerary-preference'

// Day-by-day itinerary generator — pure and seeded so a shared URL
// reproduces the exact same plan.

export type PlanPace = 'relaxed' | 'full'

export type PlanInterest = 'tasting' | 'food' | 'wellness' | 'culture' | 'outdoors'

export const PLAN_INTERESTS: { key: PlanInterest; label: string }[] = [
  { key: 'tasting', label: 'Wine tasting' },
  { key: 'food', label: 'Restaurants & food' },
  { key: 'wellness', label: 'Spa & wellness' },
  { key: 'culture', label: 'Art & shopping' },
  { key: 'outdoors', label: 'Outdoor adventures' },
]

/** Slim pin shape the planner needs — serialized server → client. */
export type PlanVenue = {
  slug: string
  name: string
  category: 'winery' | 'dining' | 'stay' | 'do'
  region: string
  address: string
  href: string
  coords: [number, number]
  thumb?: string
  editorial?: boolean
}

export type PlanInput = {
  days: number
  base: string | 'auto'
  pace: PlanPace
  interests: PlanInterest[]
  seed: number
  /** Per-slot swap counters (`${day}-${slot}` → clicks) for "Swap this stop". */
  swaps?: Record<string, number>
}

export type PlanStop = {
  time: string
  label: string
  venue: PlanVenue
  slotKey: string
  /** More candidates exist, so the swap button has somewhere to go. */
  canSwap: boolean
}

export type PlanDay = { index: number; region: string; stops: PlanStop[] }

export type PlanResult = {
  days: PlanDay[]
  homeBase?: PlanVenue
  regionWindow: string[]
}

/** mulberry32 — tiny deterministic PRNG. */
function makeRng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function seededShuffle<T>(items: T[], rng: () => number): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Keyword hints for "Between pours" venues — the dataset has no
 *  subtype tags, so names/addresses are the best signal we have. */
const DO_HINTS: Record<Exclude<PlanInterest, 'tasting' | 'food'>, RegExp> = {
  wellness: /spa|bath|springs|wellness|yoga|mineral/i,
  culture: /art|gallery|museum|studio|shop|book|market|theater|theatre|sculpture/i,
  outdoors: /balloon|bike|cycl|hike|trail|kayak|paddle|golf|horse|garden|park/i,
}

function neighborsFirst(region: string): string[] {
  const order = REGION_SOUTH_TO_NORTH as readonly string[]
  const i = order.indexOf(region)
  if (i === -1) return [...order]
  return [...order].sort(
    (a, b) => Math.abs(order.indexOf(a) - i) - Math.abs(order.indexOf(b) - i),
  )
}

/** Contiguous run of regions (south→north) sized to the trip, chosen to
 *  contain the home base — or, on auto, the window richest in editorial
 *  venues. One region hosts each day, so days stay geographically tight. */
export function pickRegionWindow(
  venues: PlanVenue[],
  days: number,
  base: string | 'auto',
): string[] {
  const order = REGION_SOUTH_TO_NORTH as readonly string[]
  const size = Math.min(days, order.length)

  const editorialCount = new Map<string, number>()
  for (const v of venues) {
    if (v.editorial && v.thumb) {
      editorialCount.set(v.region, (editorialCount.get(v.region) ?? 0) + 1)
    }
  }

  let bestStart = 0
  let bestScore = -1
  for (let start = 0; start + size <= order.length; start++) {
    const window = order.slice(start, start + size)
    if (base !== 'auto' && !window.includes(base)) continue
    const score = window.reduce((s, r) => s + (editorialCount.get(r) ?? 0), 0)
    if (score > bestScore) {
      bestScore = score
      bestStart = start
    }
  }
  if (bestScore === -1) {
    // Base exists but no valid window contained it (shouldn't happen) —
    // fall back to the densest window overall.
    return pickRegionWindow(venues, days, 'auto')
  }
  return [...order.slice(bestStart, bestStart + size)]
}

type SlotSpec = {
  time: string
  label: string
  category: PlanVenue['category']
  /** Bias candidate ordering toward these interest keywords. */
  hint?: Exclude<PlanInterest, 'tasting' | 'food'>[]
}

function daySlots(pace: PlanPace, interests: PlanInterest[], dayIndex: number): SlotSpec[] {
  const doHints = interests.filter(
    (i): i is Exclude<PlanInterest, 'tasting' | 'food'> =>
      i !== 'tasting' && i !== 'food',
  )
  // Afternoons alternate: second tasting one day, between-pours the next —
  // unless the visitor picked no non-wine interests, in which case keep pouring.
  const afternoonIsDo = doHints.length > 0 && dayIndex % 2 === 1

  const slots: SlotSpec[] = []
  if (pace === 'full') {
    slots.push({ time: '9:00 AM', label: 'Morning stroll', category: 'do', hint: doHints })
  }
  slots.push({ time: '10:30 AM', label: 'Morning tasting', category: 'winery' })
  slots.push({ time: '1:00 PM', label: 'Lunch', category: 'dining' })
  slots.push(
    afternoonIsDo
      ? { time: '3:30 PM', label: 'Between pours', category: 'do', hint: doHints }
      : { time: '3:30 PM', label: 'Afternoon tasting', category: 'winery' },
  )
  if (pace === 'full') {
    slots.push({ time: '5:00 PM', label: 'Golden hour', category: 'do', hint: doHints })
  }
  slots.push({ time: '7:00 PM', label: 'Dinner', category: 'dining' })
  return slots
}

function candidatesFor(
  venues: PlanVenue[],
  slot: SlotSpec,
  region: string,
  used: Set<string>,
  rng: () => number,
): PlanVenue[] {
  const pool = venues.filter((v) => v.category === slot.category && !used.has(v.slug))

  const rank = (v: PlanVenue): number => {
    let score = 0
    const regionDistance = neighborsFirst(region).indexOf(v.region)
    score += (regionDistance === -1 ? 10 : regionDistance) * 100
    if (!(v.editorial && v.thumb)) score += 40
    else if (!v.thumb) score += 60
    if (slot.hint?.length) {
      const text = `${v.name} ${v.address}`
      if (!slot.hint.some((h) => DO_HINTS[h].test(text))) score += 20
    }
    score += partnerPreferenceRankBoost({
      name: v.name,
      region: v.region,
      dayRegion: region,
      category: v.category,
    })
    return score
  }

  // Shuffle first so equal-rank venues rotate between seeds, then order by fit.
  return seededShuffle(pool, rng).sort((a, b) => rank(a) - rank(b))
}

export function buildPlan(venues: PlanVenue[], input: PlanInput): PlanResult {
  const days = Math.max(1, Math.min(7, Math.floor(input.days)))
  const rng = makeRng(input.seed * 2654435761 + days)
  const regionWindow = pickRegionWindow(venues, days, input.base)
  const used = new Set<string>()

  const baseRegion =
    input.base !== 'auto' && regionWindow.includes(input.base)
      ? input.base
      : regionWindow[Math.floor(regionWindow.length / 2)]

  // Home base: an editorial stay near the middle of the trip.
  const stayCandidates = candidatesFor(
    venues,
    { time: '', label: '', category: 'stay' },
    baseRegion,
    used,
    rng,
  )
  const homeBase = stayCandidates[0]
  if (homeBase) used.add(homeBase.slug)

  const planDays: PlanDay[] = []
  for (let d = 0; d < days; d++) {
    const region = regionWindow[d % regionWindow.length]
    const stops: PlanStop[] = []
    for (const [s, slot] of daySlots(input.pace, input.interests, d).entries()) {
      const slotKey = `${d}-${s}`
      const candidates = candidatesFor(venues, slot, region, used, rng)
      if (candidates.length === 0) continue
      const offset = (input.swaps?.[slotKey] ?? 0) % candidates.length
      const venue = candidates[offset]
      used.add(venue.slug)
      stops.push({
        time: slot.time,
        label: slot.label,
        venue,
        slotKey,
        canSwap: candidates.length > 1,
      })
    }
    planDays.push({ index: d, region, stops })
  }

  return { days: planDays, homeBase, regionWindow }
}
