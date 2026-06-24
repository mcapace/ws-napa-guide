import type { MapPin, MapPinCategory } from '@/data/map-pins'
import { pinsByRegion } from '@/data/map-pins'
import type { DirectoryCategory, EditorialFeature, LoadedRegionMdx, TastingDirectoryRow } from '@/lib/content/types'
import { normalizeWebsiteUrl } from '@/lib/content/parseRegionMdxBody'
import { isEditorialListingImage, pinHasListingImage, sortExploreListPins } from '@/lib/explore'
import {
  buildRegionEatMapRows,
  buildRegionStayMapRows,
  buildRegionTasteMapRows,
} from '@/lib/content/regionMapRows'

function pinExcerpt(text: string, max = 90): string {
  const t = text.trim()
  if (t.length <= max) return t
  return `${t.slice(0, max - 1).trimEnd()}…`
}

function editorialExcerpt(text: string): string {
  return pinExcerpt(text, 150)
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

function allEditorialFeatures(data: LoadedRegionMdx): EditorialFeature[] {
  return [
    ...data.featuredWineries,
    ...data.featuredRestaurants,
    ...(data.breakfast ? [data.breakfast] : []),
    ...data.featuredHotels,
  ]
}

function editorialFeatureForName(data: LoadedRegionMdx, name: string): EditorialFeature | undefined {
  return allEditorialFeatures(data).find((f) => namesOverlap(f.name, name))
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
  const match = editorialFeatureForName(data, name)
  return editorialImagePath(match?.image)
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

function applyEditorialPinFields(
  pin: MapPin,
  data: LoadedRegionMdx,
  name: string,
): MapPin {
  const feature = editorialFeatureForName(data, name)
  if (!feature) return pin

  const excerpt = feature.bodyPlain ? editorialExcerpt(feature.bodyPlain) : pin.excerpt
  return {
    ...pin,
    editorial: true,
    excerpt,
    thumb: editorialImagePath(feature.image) ?? pin.thumb,
    images: editorialImagePath(feature.image) ? [editorialImagePath(feature.image)!] : pin.images,
  }
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

    let pin: MapPin | null = null

    if (staticMatch) {
      pin = mergeEditorialThumb(staticMatch, editorialThumb)
    } else {
      pin = directoryRowToMapPin(row, regionSlug, editorialThumb)
    }

    if (!pin) continue

    pin = applyEditorialPinFields(pin, data, row.name)
    if (staticMatch) {
      pin = { ...pin, href: staticMatch.href }
    }
    addPin(pin)
  }

  if (includeAllStatic) {
    for (const staticPin of staticPool) {
      let pin = mergeEditorialThumb(staticPin, featuredThumbForName(data, staticPin.name))
      pin = applyEditorialPinFields(pin, data, staticPin.name)
      addPin(pin)
    }
  }

  return sortExploreListPins(pins)
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
