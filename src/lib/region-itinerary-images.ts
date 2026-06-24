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
  const path = manifest[itineraryStopImageKey(regionSlug, itineraryId, stop.order)]
  return isEditorialListingImage(path) ? path!.trim() : undefined
}
