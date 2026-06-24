import { getRegion } from '@/data/regions'
import type { RegionAdventure } from '@/data/regions'
import type { Itinerary, ItineraryStop } from '@/lib/types'
import { parseItineraryBody } from '@/lib/region-itinerary'
import {
  ITINERARY_SIDEBAR_SECTION,
  parseSidebarMd,
  type ParsedSidebarItinerary,
} from '@/lib/parse-sidebar-itinerary'

/** Numbered adventure subsection for multi-route regions (Yountville, Calistoga, St. Helena). */
const ITINERARY_SECTION_NUM: Record<string, number> = {
  'culinary-delights': 1,
  'stags-leap-splendor': 2,
  'into-the-hills': 3,
  'walkable-tasting-tour': 1,
  'mountain-getaway': 2,
  'off-the-grid-cabernets': 1,
  'west-side-family-wineries': 2,
  'st-helena-history-lesson': 3,
  'modern-tasting-salons': 4,
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
  'Salvestrin Winery': ['Salvestrin Winery', 'sign that says Salvestrin'],
  'Corison Winery': ['Corison Winery', 'to Corison Winery', 'minutes to Corison'],
  'Under-Study': ['Under-Study', 'try Under-Study'],
  'Freemark Abbey': ["Freemark Abbey's history", 'Freemark Abbey'],
  'Spring Mountain Vineyard': ['Spring Mountain Vineyard', 'Spring Mountain, which had'],
  "Charlie's Napa Valley": ["take it to Charlie", "Charlie's to have"],
  'Royal We Wines': ['Royal We Wines', 'Start your morning at Royal We', 'Royal We, a tasting salon'],
  'Wheeler Farms': ['Wheeler Farms', 'to Wheeler Farms', 'down Zinfandel Lane'],
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
  minStartForFirstStop = 0,
): { introExtra: string; blurbs: string[]; outro: string } {
  const text = normalizeText(sectionText)
  const blurbs: string[] = []
  const positions: number[] = []

  for (let i = 0; i < stops.length; i++) {
    const from =
      i === 0
        ? minStartForFirstStop
        : positions.length > 0
          ? positions[positions.length - 1] + 1
          : 0
    const idx = findAnchorIndex(text, anchorsForStop(stops[i]), from)
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

function buildIntroParagraphs(adventureIntro: string, introExtra: string, mergedIntro: string): string[] {
  const intro = adventureIntro.trim()
  const extra = introExtra.trim()
  if (intro && extra && intro !== extra) return [intro, extra]
  return mergedIntro ? [mergedIntro] : []
}

function getSectionTitle(itineraryId: string, adventure: RegionAdventure): string | undefined {
  const sectionNum = ITINERARY_SECTION_NUM[itineraryId]
  if (sectionNum === undefined) return undefined
  const parsed = parseItineraryBody(adventure.body)
  return parsed.find((p) => p.number === sectionNum)?.title
}

function applyStopBlurbs(
  itinerary: Itinerary,
  blurbs: string[],
): Itinerary['stops'] {
  return itinerary.stops.map((stop, i) => ({
    ...stop,
    blurb: blurbs[i]?.length > 20 ? blurbs[i] : stop.blurb,
  }))
}

function isMultiRouteSidebar(parsed: ParsedSidebarItinerary): boolean {
  return Object.keys(parsed.sections).length > 0
}

function enrichFromSidebar(
  itinerary: Itinerary,
  parsed: ParsedSidebarItinerary,
  adventure?: RegionAdventure,
): Itinerary {
  const sectionTitle = ITINERARY_SIDEBAR_SECTION[itinerary.id]
  const hasSection = sectionTitle && parsed.sections[sectionTitle]

  if (hasSection) {
    const sectionText = parsed.sections[sectionTitle]
    const { introExtra, blurbs, outro } = splitTextByStops(sectionText, itinerary.stops)
    const introParagraphs = introExtra ? [introExtra] : []

    return {
      ...itinerary,
      intro: introExtra || itinerary.intro,
      introParagraphs,
      outro: outro || undefined,
      stops: applyStopBlurbs(itinerary, blurbs),
    }
  }

  const introParagraphs =
    parsed.preambleParagraphs.length >= 2
      ? parsed.preambleParagraphs.slice(0, 2)
      : parsed.preambleParagraphs.length > 0
        ? parsed.preambleParagraphs.slice(0, 1)
        : []

  const preambleChars = parsed.preambleParagraphs.join(' ').length
  const { introExtra, blurbs, outro } = splitTextByStops(
    parsed.mainBody,
    itinerary.stops,
    preambleChars > 0 ? preambleChars : 0,
  )
  const finalIntroParagraphs =
    introParagraphs.length > 0
      ? introParagraphs
      : introExtra
        ? [introExtra]
        : buildIntroParagraphs(adventure?.intro ?? '', '', adventure?.intro ?? itinerary.intro)

  return {
    ...itinerary,
    intro: finalIntroParagraphs.join(' '),
    introParagraphs: finalIntroParagraphs,
    outro: outro || undefined,
    stops: applyStopBlurbs(itinerary, blurbs),
  }
}

type EnrichOptions = {
  sidebarMd?: string
  sidebarHeading?: string
  byline?: string
  issue?: string
  regionName?: string
  regionTagline?: string
  ledeParagraphs?: string[]
  featuredListingPlain?: Record<string, string>
}

function findListingProse(stopName: string, listings: Record<string, string>): string | undefined {
  if (listings[stopName]) return listings[stopName]
  const stopKey = stopName.toLowerCase().replace(/^the /, '')
  for (const [name, prose] of Object.entries(listings)) {
    const listingKey = name.toLowerCase().replace(/^the /, '')
    if (listingKey === stopKey || listingKey.includes(stopKey) || stopKey.includes(listingKey)) {
      return prose
    }
  }
  return undefined
}

function enrichFromFeaturedListings(
  itinerary: Itinerary,
  listings: Record<string, string>,
): Itinerary {
  return {
    ...itinerary,
    stops: itinerary.stops.map((stop) => {
      const prose = findListingProse(stop.name, listings)
      return prose && prose.length > 40 ? { ...stop, blurb: prose } : stop
    }),
  }
}

function resolveEyebrow(
  options?: EnrichOptions,
  parsed?: ParsedSidebarItinerary,
): string {
  if (parsed?.adventureLabel) return parsed.adventureLabel

  const heading = options?.sidebarHeading?.trim()
  if (heading && /adventure|excursion/i.test(heading)) {
    return heading
  }

  if (parsed?.tourTitle) return parsed.tourTitle

  if (heading) return 'From the issue'

  if (options?.regionTagline) return options.regionTagline

  return 'Itinerary'
}

function applyEditorialMeta(
  itinerary: Itinerary,
  slug: string,
  adventure: RegionAdventure | undefined,
  itineraryCount: number,
  options?: EnrichOptions,
  parsedSidebar?: ParsedSidebarItinerary,
): Itinerary {
  const region = getRegion(slug)
  const byline = options?.byline ?? region?.author
  const issue = options?.issue ?? region?.issue
  const eyebrow = resolveEyebrow(options, parsedSidebar)

  const sectionTitle = adventure ? getSectionTitle(itinerary.id, adventure) : undefined
  const sectionLabel =
    sectionTitle && sectionTitle.toLowerCase() !== itinerary.title.toLowerCase() ? sectionTitle : undefined

  const isMultiRoute = itineraryCount > 1 && adventure
  const introParagraphs =
    itinerary.introParagraphs ??
    (itinerary.intro ? buildIntroParagraphs('', '', itinerary.intro) : undefined)

  const preamble = parsedSidebar?.preambleParagraphs ?? []
  const seriesIntroParagraphs = isMultiRoute
    ? preamble.length > 0
      ? preamble
      : adventure.intro
        ? [adventure.intro]
        : undefined
    : undefined

  return {
    ...itinerary,
    eyebrow,
    byline,
    issue,
    sectionLabel,
    seriesTitle: isMultiRoute ? adventure.title : undefined,
    seriesIntro: seriesIntroParagraphs?.join(' ') ?? (isMultiRoute ? adventure.intro : undefined),
    seriesIntroParagraphs,
    introParagraphs,
  }
}

function enrichFromAdventure(
  itinerary: Itinerary,
  adventure: RegionAdventure,
  isMultiRoute: boolean,
): Itinerary {
  const sectionText = pickSectionText(itinerary.id, adventure)
  const { introExtra, blurbs, outro } = splitTextByStops(sectionText, itinerary.stops)
  const mergedIntro = isMultiRoute ? introExtra.trim() : mergeIntro(adventure.intro, introExtra)
  const introParagraphs = isMultiRoute
    ? introExtra.trim()
      ? [introExtra.trim()]
      : []
    : buildIntroParagraphs(adventure.intro, introExtra, mergedIntro)

  return {
    ...itinerary,
    intro: mergedIntro,
    introParagraphs,
    outro: outro || undefined,
    stops: applyStopBlurbs(itinerary, blurbs),
  }
}

export function enrichRegionItineraries(
  slug: string,
  itineraries: Itinerary[],
  options?: EnrichOptions,
): Itinerary[] {
  const region = getRegion(slug)
  const adventure = region?.adventure
  const count = itineraries.length
  const parsedSidebar = options?.sidebarMd?.trim() ? parseSidebarMd(options.sidebarMd) : undefined
  const useSidebar = parsedSidebar && (parsedSidebar.mainBody.length > 80 || Object.keys(parsedSidebar.sections).length > 0)

  return itineraries.map((it) => {
    let result = it

    if (useSidebar && parsedSidebar) {
      const sectionTitle = ITINERARY_SIDEBAR_SECTION[it.id]
      const canUseSidebar =
        !sectionTitle ||
        parsedSidebar.sections[sectionTitle] ||
        !isMultiRouteSidebar(parsedSidebar)

      if (canUseSidebar) {
        result = enrichFromSidebar(it, parsedSidebar, adventure)
      } else if (adventure) {
        result = enrichFromAdventure(it, adventure, count > 1)
      }
    } else if (adventure) {
      result = enrichFromAdventure(it, adventure, count > 1)
    }

    if (slug === 'pritchard-hill' && options?.featuredListingPlain) {
      result = enrichFromFeaturedListings(result, options.featuredListingPlain)
    }
    if (slug === 'pritchard-hill' && options?.ledeParagraphs?.length) {
      result = {
        ...result,
        intro: options.ledeParagraphs.join(' '),
        introParagraphs: options.ledeParagraphs,
      }
    }

    return applyEditorialMeta(result, slug, adventure, count, options, parsedSidebar)
  })
}
