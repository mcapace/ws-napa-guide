import type { MapPin, MapPinCategory } from '@/data/map-pins'
import { CATEGORY_CONFIG, type Category } from '@/lib/mapbox'

export type ExploreCategoryFilter = 'all' | Category

export function truncateExcerpt(text: string, max = 90): string {
  const t = text.trim()
  if (t.length <= max) return t
  return `${t.slice(0, max - 1).trimEnd()}…`
}

export function categoryToUrlParam(category: MapPinCategory): Category {
  return category
}

export function urlParamToCategory(param: string | null): ExploreCategoryFilter {
  if (param === 'winery' || param === 'dining' || param === 'stay') return param
  return 'all'
}

export function filterExplorePins(
  pins: MapPin[],
  category: ExploreCategoryFilter,
  region: string | 'all',
): MapPin[] {
  return pins.filter((pin) => {
    if (category !== 'all' && pin.category !== category) return false
    if (region !== 'all' && pin.region !== region) return false
    return true
  })
}

export function countByCategory(pins: MapPin[]): Record<Category, number> {
  return {
    winery: pins.filter((p) => p.category === 'winery').length,
    dining: pins.filter((p) => p.category === 'dining').length,
    stay: pins.filter((p) => p.category === 'stay').length,
  }
}

export function exploreMapUrl(opts: {
  category?: MapPinCategory
  ava?: string
  place?: string
}): string {
  const params = new URLSearchParams()
  if (opts.category) params.set('category', opts.category)
  if (opts.ava) params.set('ava', opts.ava)
  if (opts.place) params.set('place', opts.place)
  const q = params.toString()
  return `/explore${q ? `?${q}` : ''}`
}

export function regionDisplayName(slug: string): string {
  const labels: Record<string, string> = {
    oakville: 'Oakville',
    rutherford: 'Rutherford',
    yountville: 'Yountville',
    'st-helena': 'St. Helena',
    calistoga: 'Calistoga',
    'pritchard-hill': 'Pritchard Hill',
    'downtown-napa': 'Downtown Napa',
  }
  return labels[slug] ?? slug
}

export function categoryEyebrow(category: MapPinCategory): string {
  return CATEGORY_CONFIG[category].label
}

/** True when src is real editorial photography under `/images/` (not stock placeholders). */
export function isEditorialListingImage(src?: string): boolean {
  if (!src?.trim()) return false
  if (src.includes('/test-images/')) return false
  return src.startsWith('/images/')
}

/** True when the pin has real editorial photography (not stock test placeholders). */
export function pinHasListingImage(pin: MapPin): boolean {
  return isEditorialListingImage(pin.thumb ?? pin.images[0])
}

export function partitionPinsByImage(pins: MapPin[]): {
  withImage: MapPin[]
  withoutImage: MapPin[]
} {
  const withImage: MapPin[] = []
  const withoutImage: MapPin[] = []
  for (const pin of pins) {
    if (pinHasListingImage(pin)) withImage.push(pin)
    else withoutImage.push(pin)
  }
  return { withImage, withoutImage }
}
