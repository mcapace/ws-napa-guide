import type { MapPin, MapPinCategory } from '@/data/map-pins'
import { pinsByRegion } from '@/data/map-pins'
import type { DirectoryCategory, LoadedRegionMdx, TastingDirectoryRow } from '@/lib/content/types'
import { normalizeWebsiteUrl } from '@/lib/content/parseRegionMdxBody'
import { isEditorialListingImage, pinHasListingImage } from '@/lib/explore'
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
  return isEditorialListingImage(path) ? path!.trim() : undefined
}

function featuredThumbForName(data: LoadedRegionMdx, name: string): string | undefined {
  const match = [
    ...data.featuredWineries,
    ...data.featuredRestaurants,
    ...(data.breakfast ? [data.breakfast] : []),
    ...data.featuredHotels,
  ].find((f) => namesOverlap(f.name, name))
  return editorialImagePath(match?.image)
}

function directoryRowToMapPin(
  row: TastingDirectoryRow,
  regionSlug: string,
  thumb?: string,
): MapPin | null {
  if (!row.coordinates) return null

  const category = directoryCategoryToPinCategory(row.category)
  const slug = directorySlug(regionSlug, row.name)
  const lng = row.coordinates.lng
  const lat = row.coordinates.lat
  const website = normalizeWebsiteUrl(row.website)
  const excerpt = pinExcerpt(row.address)
  const editorialThumb = editorialImagePath(thumb)

  const type = category === 'dining' ? 'restaurant' : category === 'stay' ? 'hotel' : 'winery'

  return {
    slug,
    name: row.name,
    category,
    region: regionSlug,
    coords: [lng, lat],
    excerpt,
    href: website ?? `/explore?ava=${regionSlug}&place=${slug}`,
    thumb: editorialThumb,
    id: slug,
    type,
    images: editorialThumb ? [editorialThumb] : [],
    sponsorTier: null,
  }
}

function stripNonEditorialThumb(pin: MapPin): MapPin {
  if (!pinHasListingImage(pin)) {
    const { thumb: _t, ...rest } = pin
    return { ...rest, thumb: undefined, images: [] }
  }
  const thumb = pin.thumb ?? pin.images[0]
  return { ...pin, thumb, images: thumb ? [thumb] : [] }
}

function mergeEditorialThumb(staticPin: MapPin, editorialThumb?: string): MapPin {
  const base = stripNonEditorialThumb(staticPin)
  const thumb = editorialImagePath(editorialThumb)
  if (!thumb) return base
  return { ...base, thumb, images: [thumb] }
}

function buildPinsFromRows(
  regionSlug: string,
  data: LoadedRegionMdx,
  rows: TastingDirectoryRow[],
  includeAllStatic = false,
): MapPin[] {
  const staticPool = pinsByRegion(regionSlug)
  const pins: MapPin[] = []

  const alreadyAdded = (name: string) => pins.some((p) => namesOverlap(p.name, name))

  const addPin = (pin: MapPin) => {
    if (alreadyAdded(pin.name)) return
    pins.push(stripNonEditorialThumb(pin))
  }

  for (const row of rows) {
    const editorialThumb = featuredThumbForName(data, row.name)
    const staticMatch = staticPool.find((p) => namesOverlap(p.name, row.name))

    if (staticMatch) {
      addPin(mergeEditorialThumb(staticMatch, editorialThumb))
      continue
    }

    const fromRow = directoryRowToMapPin(row, regionSlug, editorialThumb)
    if (fromRow) addPin(fromRow)
  }

  if (includeAllStatic) {
    for (const staticPin of staticPool) {
      addPin(staticPin)
    }
  }

  return pins
}

/** Pins for a single section (taste / eat / stay) from MDX map rows. */
export function buildRegionPinsFromRows(
  regionSlug: string,
  data: LoadedRegionMdx,
  rows: TastingDirectoryRow[],
): MapPin[] {
  return buildPinsFromRows(regionSlug, data, rows, false)
}

/**
 * Region ExploreMap pins: MDX featured + directory rows with geocodes,
 * merged with every static listing for the AVA (wineries/restaurants/hotels.ts).
 */
export function buildRegionExplorePins(regionSlug: string, data: LoadedRegionMdx): MapPin[] {
  const tasteRows = buildRegionTasteMapRows(data)
  const eatRows = buildRegionEatMapRows(data)
  const stayRows = buildRegionStayMapRows(data)
  return buildPinsFromRows(
    regionSlug,
    data,
    [...tasteRows, ...eatRows, ...stayRows],
    true,
  )
}
