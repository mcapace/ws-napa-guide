import type { MapPin, MapPinCategory } from '@/data/map-pins'
import { mapPins, pinsByRegion } from '@/data/map-pins'
import type { DirectoryCategory, LoadedRegionMdx, TastingDirectoryRow } from '@/lib/content/types'
import { normalizeWebsiteUrl } from '@/lib/content/parseRegionMdxBody'
import { pinHasListingImage } from '@/lib/explore'
import {
  buildRegionEatMapRows,
  buildRegionStayMapRows,
  buildRegionTasteMapRows,
} from '@/lib/content/regionMapRows'

function pinExcerpt(text: string): string {
  const t = text.trim()
  if (t.length <= 90) return t
  return `${t.slice(0, 89).trimEnd()}…`
}

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[’']/g, '')
    .trim()
}

function namesOverlap(a: string, b: string): boolean {
  const na = normalizeName(a)
  const nb = normalizeName(b)
  if (na === nb) return true
  if (na.length >= 4 && nb.length >= 4 && (na.includes(nb) || nb.includes(na))) return true
  return false
}

function directoryCategoryToPinCategory(category: DirectoryCategory): MapPinCategory {
  if (category === 'restaurant') return 'dining'
  if (category === 'hotel') return 'stay'
  return 'winery'
}

function directorySlug(region: string, name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
  return `${region}-${base}`
}

function editorialImagePath(path?: string): string | undefined {
  if (!path?.trim()) return undefined
  const p = path.trim()
  if (!p.startsWith('/images/')) return undefined
  return p
}

function findStaticPin(row: TastingDirectoryRow, regionSlug: string): MapPin | undefined {
  const cat = directoryCategoryToPinCategory(row.category)
  const candidates = mapPins.filter(
    (p) => p.region === regionSlug && p.category === cat,
  )
  return candidates.find((p) => namesOverlap(p.name, row.name))
}

function directoryRowToMapPin(
  row: TastingDirectoryRow,
  regionSlug: string,
  featuredThumb?: string,
): MapPin | null {
  if (!row.coordinates) return null

  const staticMatch = findStaticPin(row, regionSlug)
  if (staticMatch) return null

  const category = directoryCategoryToPinCategory(row.category)
  const slug = directorySlug(regionSlug, row.name)
  const lng = row.coordinates.lng
  const lat = row.coordinates.lat
  const website = normalizeWebsiteUrl(row.website)
  const excerpt = pinExcerpt(row.address)
  const thumb = editorialImagePath(featuredThumb)

  const type = category === 'dining' ? 'restaurant' : category === 'stay' ? 'hotel' : 'winery'

  return {
    slug,
    name: row.name,
    category,
    region: regionSlug,
    coords: [lng, lat],
    excerpt,
    href: website ?? `/explore?ava=${regionSlug}&place=${slug}`,
    thumb,
    id: slug,
    type,
    images: thumb ? [thumb] : [],
    sponsorTier: null,
  }
}

function mergeDirectoryPins(staticPins: MapPin[], directoryPins: MapPin[]): MapPin[] {
  const merged = [...staticPins]
  for (const pin of directoryPins) {
    const dup = merged.some((p) => namesOverlap(p.name, pin.name))
    if (!dup) merged.push(pin)
  }
  return merged
}

function featuredThumbForName(data: LoadedRegionMdx, name: string): string | undefined {
  const all = [
    ...data.featuredWineries,
    ...data.featuredRestaurants,
    ...(data.breakfast ? [data.breakfast] : []),
    ...data.featuredHotels,
  ]
  const match = all.find((f) => namesOverlap(f.name, name))
  return editorialImagePath(match?.image)
}

/**
 * Region ExploreMap pins: static listings (wineries/restaurants/hotels.ts)
 * plus MDX directory + featured rows with geocodes (matches production region maps).
 */
export function buildRegionExplorePins(regionSlug: string, data: LoadedRegionMdx): MapPin[] {
  const staticPins = pinsByRegion(regionSlug).map((pin) => {
    if (!pinHasListingImage(pin)) {
      const { thumb: _t, ...rest } = pin
      return { ...rest, thumb: undefined, images: [] }
    }
    return pin
  })

  const tasteRows = buildRegionTasteMapRows(data)
  const eatRows = buildRegionEatMapRows(data)
  const stayRows = buildRegionStayMapRows(data)

  const directoryPins: MapPin[] = []
  for (const row of [...tasteRows, ...eatRows, ...stayRows]) {
    const pin = directoryRowToMapPin(row, regionSlug, featuredThumbForName(data, row.name))
    if (pin) directoryPins.push(pin)
  }

  return mergeDirectoryPins(staticPins, directoryPins)
}
