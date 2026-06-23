import { getRegion } from '@/data/regions'
import type { RegionAdventure } from '@/data/regions'
import type { Itinerary, ItineraryStop } from '@/lib/types'
import { parseItineraryBody } from '@/lib/region-itinerary'

/** Numbered adventure subsection for multi-route regions (Yountville, Calistoga, St. Helena). */
const ITINERARY_SECTION_NUM: Record<string, number> = {
  'culinary-delights': 1,
  'stags-leap-splendor': 2,
  'into-the-hills': 3,
  'walkable-tasting-tour': 1,
  'mountain-getaway': 2,
  'off-the-grid-cabernets': 1,
}

const STOP_ANCHORS: Record<string, string[]> = {
  'Robert Mondavi Winery': ['At RMW,', 'At RMW ', 'Robert Mondavi Winery'],
  'Beaulieu Vineyard': ['Five minutes down the road, BV', 'BV too has', 'BV has also', 'Beaulieu Vineyard'],
  'Groth Vineyards & Winery': ['Start at Groth', 'Groth in Oakville'],
  'St. Supéry Estate Vineyards & Winery': ['St. Supéry', 'St Supery', '3 miles away, Rutherford'],
  'Mustards Grill': ['Mustards Grill', 'hunger strikes, head down Highway 29'],
  'Grgich Hills Estate': ['Grgich Hills Estate', 'Finish your Sauvignon Blanc tour at Grgich'],
  'Chandon Napa Valley': ['Chandon Napa Valley', 'to Chandon Napa Valley', 'This pioneering sparkling wine house'],
  'Darioush': ['to Darioush', 'Darioush adventure', 'Darioush. Here'],
  'Cliff Lede Vineyards': ['Cliff Lede', 'Cliff Lede’s', "Cliff Lede's"],
  'Shafer Vineyards': ["It's a five-minute drive to Shafer", 'five-minute drive to Shafer', 'Shafer, one of Napa'],
  'Antinori Napa Valley': ['Antinori Napa Valley', 'to Antinori Napa Valley', 'Yes, that An'],
  'Bouchon Bistro': ['Bouchon Bistro', "Thomas Keller's Bouchon"],
  'Mayacamas': ['to Mayacamas', 'drive up Mount Veeder to Mayacamas', 'Mayacamas. Here'],
  'Seavey Vineyard': ['Seavey Vineyard', 'to Seavey Vineyard'],
  'Forman Vineyard': ['Ric Forman', 'Forman Vineyard', 'to Ric Forman Vineyard'],
  'The Charter Oak': ['Charter Oak', 'smash burger at the Charter Oak'],
  'Rivers-Marie': ['Rivers Marie', 'Rivers-Marie', 'to Rivers Marie'],
  'Lola Wines': ['Lola Wines', 'Lola Head back', 'your next destination: Lola'],
  'Tank Garage Winery': ['Tank Garage Winery', 'Tank Garage', 'your next stop looks like a gas station'],
  "Buster's Southern BBQ": ["Buster's BBQ", 'Buster’s BBQ', 'lunch at Buster'],
  'CADE Estate': ['CADE Estate', 'entrance to CADE Estate', 'to CADE Estate'],
  'Outpost Wines': ['Outpost Wines', 'to Outpost Wines', '5 miles uphill to Outpost'],
  'Chappellet Winery': ['Begin at Chappellet', 'Chappellet,'],
  'Continuum Estate': ['Continuum,', 'to Continuum,', 'Continuum Estate'],
  'David Arthur Vineyards': ['David Arthur', 'David Arthur follows'],
  'The Howard Backen Estate': ['Howard Backen Estate', 'End at Howard Backen'],
  'Boon Fly Café': ['Boon Fly Café', 'Boon Fly Cafe', 'famous ones at Boon Fly'],
  'Bouchaine Vineyards': ['Bouchaine Winery', 'Bouchaine Vineyards', 'to Bouchaine Winery'],
  'Domaine Carneros': ['Domaine Carneros', 'five minutes away, Domaine Carneros'],
}

function anchorsForStop(stop: ItineraryStop): string[] {
  return STOP_ANCHORS[stop.name] ?? [stop.name, stop.name.split(' ')[0]]
}

function normalizeText(text: string): string {
  return text.replace(/\r/g, '').replace(/\u2019/g, "'").replace(/\u2018/g, "'")
}

function collapseWhitespace(text: string): string {
  return normalizeText(text).replace(/\s+/g, ' ').trim()
}

function findAnchorIndex(text: string, anchors: string[], from = 0): number {
  const lower = text.toLowerCase()
  let best = -1
  for (const anchor of anchors) {
    const idx = lower.indexOf(anchor.toLowerCase(), from)
    if (idx !== -1 && (best === -1 || idx < best)) best = idx
  }
  return best
}

function splitTextByStops(
  sectionText: string,
  stops: ItineraryStop[],
): { introExtra: string; blurbs: string[]; outro: string } {
  const text = normalizeText(sectionText)
  const blurbs: string[] = []
  const positions: number[] = []

  for (const stop of stops) {
    const from = positions.length > 0 ? positions[positions.length - 1] + 1 : 0
    const idx = findAnchorIndex(text, anchorsForStop(stop), from)
    positions.push(idx === -1 ? from : idx)
  }

  const firstHit = positions.find((p) => p >= 0) ?? 0
  const introExtra = collapseWhitespace(text.slice(0, firstHit > 0 ? firstHit : 0))

  for (let i = 0; i < stops.length; i++) {
    const start = positions[i]
    if (start < 0) {
      blurbs.push('')
      continue
    }
    let end = text.length
    for (let j = i + 1; j < stops.length; j++) {
      if (positions[j] > start) {
        end = positions[j]
        break
      }
    }
    blurbs.push(collapseWhitespace(text.slice(start, end)))
  }

  const lastStart = positions[stops.length - 1]
  let outro = ''
  if (lastStart >= 0 && blurbs[stops.length - 1]) {
    const lastBlurb = blurbs[stops.length - 1]
    const lastEnd = lastStart + lastBlurb.length
    const trailing = collapseWhitespace(text.slice(lastEnd))
    if (trailing.length > 40 && trailing !== lastBlurb) {
      outro = trailing
    }
  }

  return { introExtra, blurbs, outro }
}

function pickSectionText(itineraryId: string, adventure: RegionAdventure): string {
  const parsed = parseItineraryBody(adventure.body)
  const sectionNum = ITINERARY_SECTION_NUM[itineraryId]

  if (sectionNum !== undefined) {
    const section = parsed.find((p) => p.number === sectionNum)
    if (section?.text) return section.text
  }

  if (parsed.length === 1) return parsed[0].text
  if (parsed.length > 1 && sectionNum === undefined) {
    return adventure.body
  }

  return adventure.body
}

function mergeIntro(adventureIntro: string, introExtra: string): string {
  const parts = [adventureIntro.trim(), introExtra.trim()].filter(Boolean)
  return parts.join(' ')
}

function enrichOakvilleFromSidebar(
  itinerary: Itinerary,
  sidebarPlain: string,
  adventure?: RegionAdventure,
): Itinerary {
  const paragraphs = sidebarPlain
    .split(/\n+/)
    .map((p) => collapseWhitespace(p))
    .filter((p) => p.length > 30)

  const introParts = paragraphs.slice(0, 2)
  const rmw = paragraphs.find((p) => p.startsWith('At RMW')) ?? paragraphs[2] ?? ''
  const bv = paragraphs.find((p) => p.startsWith('Five minutes')) ?? ''
  const closing =
    paragraphs.find((p) => p.startsWith('When historic wineries')) ?? paragraphs[paragraphs.length - 1] ?? ''

  const bvBlurb = [bv, closing].filter(Boolean).join(' ')

  return {
    ...itinerary,
    intro: mergeIntro(adventure?.intro ?? itinerary.intro, introParts.join(' ')),
    stops: itinerary.stops.map((stop, i) => {
      if (i === 0 && rmw) return { ...stop, blurb: rmw }
      if (i === 1 && bvBlurb) return { ...stop, blurb: bvBlurb }
      return stop
    }),
  }
}

function enrichFromAdventure(itinerary: Itinerary, adventure: RegionAdventure): Itinerary {
  const sectionText = pickSectionText(itinerary.id, adventure)
  const { introExtra, blurbs, outro } = splitTextByStops(sectionText, itinerary.stops)

  return {
    ...itinerary,
    intro: mergeIntro(adventure.intro, introExtra),
    outro: outro || undefined,
    stops: itinerary.stops.map((stop, i) => ({
      ...stop,
      blurb: blurbs[i]?.length > 20 ? blurbs[i] : stop.blurb,
    })),
  }
}

export function enrichRegionItineraries(
  slug: string,
  itineraries: Itinerary[],
  options?: { sidebarPlain?: string },
): Itinerary[] {
  const region = getRegion(slug)
  const adventure = region?.adventure

  return itineraries.map((it) => {
    if (slug === 'oakville' && options?.sidebarPlain) {
      return enrichOakvilleFromSidebar(it, options.sidebarPlain, adventure)
    }
    if (!adventure) return it
    return enrichFromAdventure(it, adventure)
  })
}
