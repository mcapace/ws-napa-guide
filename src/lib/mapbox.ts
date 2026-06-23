/** Full street + landmark labels (Mapbox Streets v12). */
export const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12'
export const NAPA_CENTER: [number, number] = [-122.4194, 38.5]
export const NAPA_ZOOM = 10.2

export const CATEGORY_CONFIG = {
  winery: { label: 'Tasting Rooms', color: '#C4943A', glyph: '◆' },
  dining: { label: 'Restaurants', color: '#6B1C2A', glyph: '●' },
  stay: { label: 'Hotels', color: '#5C6B52', glyph: '■' },
} as const

export type Category = keyof typeof CATEGORY_CONFIG

export const REGION_CENTERS: Record<string, { center: [number, number]; zoom: number }> = {
  oakville: { center: [-122.4089, 38.4298], zoom: 12.5 },
  rutherford: { center: [-122.4289, 38.459], zoom: 12.5 },
  yountville: { center: [-122.3621, 38.4045], zoom: 13 },
  'st-helena': { center: [-122.4699, 38.5026], zoom: 12.5 },
  calistoga: { center: [-122.5798, 38.5789], zoom: 12.5 },
  'pritchard-hill': { center: [-122.39, 38.51], zoom: 12.5 },
  'downtown-napa': { center: [-122.287, 38.2975], zoom: 13 },
}

export const REGION_LABELS: Record<string, string> = {
  oakville: 'Oakville',
  rutherford: 'Rutherford',
  yountville: 'Yountville',
  'st-helena': 'St. Helena',
  calistoga: 'Calistoga',
  'pritchard-hill': 'Pritchard Hill',
  'downtown-napa': 'Downtown Napa',
}

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

export const NAPA_BOUNDS: [[number, number], [number, number]] = [
  [-122.72, 38.17],
  [-122.1, 38.72],
]
