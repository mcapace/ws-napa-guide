import type { MapPin } from '@/data/map-pins'
import type { LoadedRegionMdx } from '@/lib/content/types'
import { isEditorialListingImage } from '@/lib/explore'
import { resolveItineraryStopImage } from '@/lib/region-itinerary-images'
import type { Itinerary, ItineraryStop } from '@/lib/types'

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/['’]/g, '')
    .trim()
}

export function namesOverlap(a: string, b: string): boolean {
  const na = normalizeName(a)
  const nb = normalizeName(b)
  if (na === nb) return true
  if (na.length >= 4 && nb.length >= 4 && (na.includes(nb) || nb.includes(na))) return true
  return false
}

function allEditorialFeatures(mdx: LoadedRegionMdx) {
  return [
    ...mdx.featuredWineries,
    ...mdx.featuredRestaurants,
    ...mdx.coffeeSnackFeatures,
    ...mdx.featuredHotels,
  ]
}

function editorialImageForName(mdx: LoadedRegionMdx, name: string): string | undefined {
  const feature = allEditorialFeatures(mdx).find((f) => namesOverlap(f.name, name))
  const src = feature?.image
  return isEditorialListingImage(src) ? src!.trim() : undefined
}

function pinImageForName(pins: MapPin[], name: string): string | undefined {
  const pin = pins.find((p) => namesOverlap(p.name, name))
  const src = pin?.thumb ?? pin?.images[0]
  return isEditorialListingImage(src) ? src!.trim() : undefined
}

export function resolveStopEditorialImage(
  _regionSlug: string,
  stop: ItineraryStop,
  mdx: LoadedRegionMdx,
  pins: MapPin[],
): string | undefined {
  return editorialImageForName(mdx, stop.name) ?? pinImageForName(pins, stop.name)
}

/** Hero + featured listing stills from MDX (Drive-imported `/images/` paths). */
export function collectRegionStoryImages(mdx: LoadedRegionMdx): string[] {
  const images: string[] = []
  const seen = new Set<string>()

  const add = (src?: string) => {
    if (!isEditorialListingImage(src)) return
    const path = src!.trim()
    if (seen.has(path)) return
    seen.add(path)
    images.push(path)
  }

  add(mdx.frontmatter.heroImage)
  for (const feature of allEditorialFeatures(mdx)) {
    add(feature.image)
  }

  return images
}

export function enrichItinerariesWithImages(
  itineraries: Itinerary[],
  regionSlug: string,
  mdx: LoadedRegionMdx,
  pins: MapPin[],
): Itinerary[] {
  return itineraries.map((itinerary) => ({
    ...itinerary,
    stops: itinerary.stops.map((stop) => {
      const image =
        resolveItineraryStopImage(regionSlug, itinerary.id, stop) ??
        resolveStopEditorialImage(regionSlug, stop, mdx, pins)
      return image ? { ...stop, image } : stop
    }),
  }))
}
