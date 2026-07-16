import type { MapPin } from '@/data/map-pins'
import { regions } from '@/data/regions'
import { loadRegionMdx } from '@/lib/content/loadRegionMdx'
import { buildRegionExplorePins } from '@/lib/explore-region-pins'

/**
 * Every region's full directory as explore pins — the same rows the
 * region pages show, aggregated for the valley-wide pages
 * (/explore, /wineries, /dining, /stay). Server-side only.
 */
export async function buildAllRegionPins(): Promise<MapPin[]> {
  const perRegion = await Promise.all(
    regions.map(async (region) => {
      const data = await loadRegionMdx(region.slug)
      if (!data) return [] as MapPin[]
      return buildRegionExplorePins(region.slug, data)
    }),
  )

  const pins: MapPin[] = []
  const seen = new Set<string>()
  for (const pin of perRegion.flat()) {
    const key = `${pin.region}|${pin.slug}`
    if (seen.has(key)) continue
    seen.add(key)
    pins.push(pin)
  }
  return pins
}
