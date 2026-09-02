import itineraryImages from '@/data/region-itinerary-images.json'
import { isEditorialListingImage } from '@/lib/explore'
import type { ItineraryStop } from '@/lib/types'

type ItineraryImageManifest = Record<string, string>

const manifest = itineraryImages as ItineraryImageManifest

export function itineraryStopImageKey(
  regionSlug: string,
  itineraryId: string,
  stopOrder: number,
): string {
  return `${regionSlug}|${itineraryId}|${stopOrder}`
}

/** Drive-imported itinerary stop still (`/images/{region}/itineraries/...`). */
export function resolveItineraryStopImage(
  regionSlug: string,
  itineraryId: string,
  stop: ItineraryStop,
): string | undefined {
  const nameKey = stop.name
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const byName = manifest[`${regionSlug}|${itineraryId}|${nameKey}`]
  const byOrder = manifest[itineraryStopImageKey(regionSlug, itineraryId, stop.order)]
  const path = byName ?? byOrder
  return isEditorialListingImage(path) ? path!.trim() : undefined
}
