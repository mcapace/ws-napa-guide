import type { MapPin, MapPinCategory } from '@/data/map-pins'
import { pinsByRegion } from '@/data/map-pins'
import regionDirectoryImages from '@/data/region-directory-images.json'
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
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function namesOverlap(a: string, b: string): boolean {
  const na = normalizeName(a)
  const nb = normalizeName(b)
  if (na === nb) return true
  if (na.length >= 4 && nb.length >= 4 && (na.includes(nb) || nb.includes(na))) return true
  return false
}

/** MDX editorial picks only — matches production featured blocks, not directory tables. */
function editorialFeaturesForCategory(
  data: LoadedRegionMdx,
  category: MapPinCategory,
): EditorialFeature[] {
  if (category === 'dining') return [...data.featuredRestaurants, ...data.coffeeSnackFeatures]
  if (category === 'stay') return data.featuredHotels
  return data.featuredWineries
}

function editorialFeatureForName(
  data: LoadedRegionMdx,
  name: string,
  category: MapPinCategory,
): EditorialFeature | undefined {
  return editorialFeaturesForCategory(data, category).find((f) => namesOverlap(f.name, name))
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

export { directorySlug }

function editorialImagePath(path?: string): string | undefined {
  return isEditorialListingImage(path) ? path!.trim() : undefined
}

const DIRECTORY_LISTING_IMAGES = regionDirectoryImages as Record<string, string>

function directoryListingImage(regionSlug: string, name: string): string | undefined {
  const normalized = normalizeName(name)
  const exactKey = `${regionSlug}|${normalized}`
  const exact = DIRECTORY_LISTING_IMAGES[exactKey]
  if (isEditorialListingImage(exact)) return exact.trim()

  const prefix = `${regionSlug}|`
  for (const [key, path] of Object.entries(DIRECTORY_LISTING_IMAGES)) {
    if (!key.startsWith(prefix)) continue
    const manifestLabel = key.slice(prefix.length)
    if (namesOverlap(manifestLabel, normalized) || namesOverlap(manifestLabel, name)) {
      if (isEditorialListingImage(path)) return path.trim()
    }
  }
  return undefined
}

function stripNonEditorialThumb(pin: MapPin): MapPin {
  if (!pinHasListingImage(pin)) {
    const { thumb: _t, ...rest } = pin
    return { ...rest, thumb: undefined, images: [] }
  }
  const thumb = pin.thumb ?? pin.images[0]
  return { ...pin, thumb, images: thumb ? [thumb] : [] }
}

function pinWithoutListingPhoto(pin: MapPin): MapPin {
  const base = stripNonEditorialThumb(pin)
  return {
    ...base,
    thumb: undefined,
    images: [],
    editorial: undefined,
    excerptFull: undefined,
  }
}

function applyEditorialPinFields(pin: MapPin, data: LoadedRegionMdx): MapPin {
  const directoryThumb = directoryListingImage(pin.region, pin.name)
  const feature = editorialFeatureForName(data, pin.name, pin.category)
  if (!feature) {
    if (directoryThumb) {
      return {
        ...pin,
        thumb: directoryThumb,
        images: [directoryThumb],
      }
    }
    return pinWithoutListingPhoto(pin)
  }

  const bodyPlain = feature.bodyPlain?.trim()
  const excerpt = bodyPlain ? editorialExcerpt(bodyPlain) : pin.excerpt
  const excerptFull =
    bodyPlain && bodyPlain.length > excerpt.replace(/…$/, '').trim().length
      ? bodyPlain
      : undefined
  const thumb = directoryThumb ?? editorialImagePath(feature.image)

  return {
    ...pin,
    editorial: true,
    excerpt,
    excerptFull,
    thumb,
    images: thumb ? [thumb] : [],
  }
}

/** Listing photos only for MDX featured picks (production editorial blocks). */
function finalizeExplorePin(pin: MapPin, data: LoadedRegionMdx): MapPin {
  return applyEditorialPinFields(stripNonEditorialThumb(pin), data)
}

function directoryRowToMapPin(row: TastingDirectoryRow, regionSlug: string): MapPin | null {
  if (!row.coordinates) return null

  const category = directoryCategoryToPinCategory(row.category)
  const slug = directorySlug(regionSlug, row.name)
  const lng = row.coordinates.lng
  const lat = row.coordinates.lat
  const website = normalizeWebsiteUrl(row.website)
  const excerpt = pinExcerpt(row.address)

  const type = category === 'dining' ? 'restaurant' : category === 'stay' ? 'hotel' : 'winery'

  return {
    slug,
    name: row.name,
    award: row.award,
    category,
    region: regionSlug,
    coords: [lng, lat],
    excerpt,
    href: website ?? `/explore?ava=${regionSlug}&place=${slug}`,
    id: slug,
    type,
    images: [],
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
    pins.push(finalizeExplorePin(pin, data))
  }

  for (const row of rows) {
    const staticMatch = staticPool.find((p) => namesOverlap(p.name, row.name))

    let pin: MapPin | null = null

    if (staticMatch) {
      pin = { ...stripNonEditorialThumb(staticMatch) }
    } else {
      pin = directoryRowToMapPin(row, regionSlug)
    }

    if (!pin) continue

    if (staticMatch) {
      pin = { ...pin, href: staticMatch.href }
    }
    addPin(pin)
  }

  if (includeAllStatic) {
    for (const staticPin of staticPool) {
      addPin(stripNonEditorialThumb(staticPin))
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
