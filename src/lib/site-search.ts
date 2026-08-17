import { normalizeSearchText } from '@/lib/search-normalize'

export type SearchItemKind =
  | 'town'
  | 'winery'
  | 'dining'
  | 'stay'
  | 'do'
  | 'story'
  | 'itinerary'

export interface SearchItem {
  id: string
  kind: SearchItemKind
  title: string
  subtitle: string
  href: string
  /** Extra text matched but not shown (e.g. listing excerpt). */
  keywords?: string
}

export const SEARCH_GROUP_ORDER: SearchItemKind[] = [
  'town',
  'winery',
  'dining',
  'stay',
  'do',
  'story',
  'itinerary',
]

export const SEARCH_GROUP_LABELS: Record<SearchItemKind, string> = {
  town: 'Towns',
  winery: 'Taste',
  dining: 'Dine',
  stay: 'Stay',
  do: 'Do',
  story: 'Stories',
  itinerary: 'Itineraries',
}

const PER_GROUP_CAP = 8
const TOTAL_CAP = 24

function itemMatches(item: SearchItem, q: string): boolean {
  return (
    normalizeSearchText(item.title).includes(q) ||
    normalizeSearchText(item.subtitle).includes(q) ||
    normalizeSearchText(item.keywords ?? '').includes(q)
  )
}

export function filterSearchItems(
  items: SearchItem[],
  query: string,
): SearchItem[] {
  const q = normalizeSearchText(query.trim())
  if (!q) return []

  const matched = items.filter((item) => itemMatches(item, q))
  const out: SearchItem[] = []
  const usedPerGroup = new Map<SearchItemKind, number>()

  for (const kind of SEARCH_GROUP_ORDER) {
    if (out.length >= TOTAL_CAP) break
    let count = usedPerGroup.get(kind) ?? 0
    for (const item of matched) {
      if (item.kind !== kind) continue
      if (count >= PER_GROUP_CAP) break
      if (out.length >= TOTAL_CAP) break
      out.push(item)
      count += 1
    }
    usedPerGroup.set(kind, count)
  }

  return out
}

export function groupSearchResults(
  items: SearchItem[],
): { kind: SearchItemKind; label: string; items: SearchItem[] }[] {
  return SEARCH_GROUP_ORDER.map((kind) => ({
    kind,
    label: SEARCH_GROUP_LABELS[kind],
    items: items.filter((item) => item.kind === kind),
  })).filter((group) => group.items.length > 0)
}
