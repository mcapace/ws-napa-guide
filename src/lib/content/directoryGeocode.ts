import type { RegionCoordinates, TastingDirectoryRow } from '@/lib/content/types'
import geocodesJson from '@/data/region-directory-geocodes.json'

type GeocodeStore = Record<string, RegionCoordinates>

const store = geocodesJson as GeocodeStore

export function directoryRowGeocodeKey(slug: string, name: string, address: string): string {
  return `${slug}|${name.trim()}|${address.trim()}`
}

export function attachDirectoryGeocodes(slug: string, rows: TastingDirectoryRow[]): TastingDirectoryRow[] {
  return rows.map((row) => {
    const key = directoryRowGeocodeKey(slug, row.name, row.address)
    const coords = store[key]
    if (coords && typeof coords.lat === 'number' && typeof coords.lng === 'number') {
      return { ...row, coordinates: coords }
    }
    return row
  })
}
