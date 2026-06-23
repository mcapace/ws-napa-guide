import type { ItineraryStop } from '@/lib/types'
import { MAPBOX_TOKEN, NAPA_BOUNDS } from '@/lib/mapbox'

export type DirectionsLeg = {
  coordinates: [number, number][]
  distance: number
  duration: number
}

export type DirectionsResult = {
  legs: DirectionsLeg[]
  totalDistance: number
  totalDuration: number
  fullCoordinates: [number, number][]
}

function straightLeg(from: [number, number], to: [number, number]): DirectionsLeg {
  const distance = haversineMeters(from, to)
  const duration = distance / 13.4 // ~30 mph driving heuristic
  return { coordinates: [from, to], distance, duration }
}

function haversineMeters(a: [number, number], b: [number, number]): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const R = 6371000
  const dLat = toRad(b[1] - a[1])
  const dLng = toRad(b[0] - a[0])
  const lat1 = toRad(a[1])
  const lat2 = toRad(b[1])
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

function decodeLegGeometry(geometry: { type: string; coordinates: number[][] }): [number, number][] {
  return geometry.coordinates.map((c) => [c[0], c[1]] as [number, number])
}

export async function fetchItineraryDirections(
  stops: ItineraryStop[],
  travelMode: 'driving' | 'walking',
): Promise<DirectionsResult> {
  if (stops.length < 2) {
    return { legs: [], totalDistance: 0, totalDuration: 0, fullCoordinates: [] }
  }

  const profile = travelMode === 'walking' ? 'walking' : 'driving'
  const coordsList = stops.map((s) => `${s.coords[0]},${s.coords[1]}`).join(';')

  if (!MAPBOX_TOKEN) {
    return fallbackDirections(stops)
  }

  try {
    const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordsList}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Directions ${res.status}`)
    const data = await res.json()
    const route = data.routes?.[0]
    if (!route) throw new Error('No route')

    const fullCoordinates = decodeLegGeometry(route.geometry)
    const apiLegs = route.legs ?? []

    const legs: DirectionsLeg[] = apiLegs.map((leg: { distance: number; duration: number }, i: number) => {
      if (i === 0) {
        const endIdx = findNearestCoordIndex(fullCoordinates, stops[1].coords)
        return {
          coordinates: fullCoordinates.slice(0, endIdx + 1),
          distance: leg.distance,
          duration: leg.duration,
        }
      }
      const startIdx = findNearestCoordIndex(fullCoordinates, stops[i].coords)
      const endIdx = findNearestCoordIndex(fullCoordinates, stops[i + 1].coords)
      return {
        coordinates: fullCoordinates.slice(startIdx, endIdx + 1),
        distance: leg.distance,
        duration: leg.duration,
      }
    })

    return {
      legs,
      totalDistance: route.distance,
      totalDuration: route.duration,
      fullCoordinates,
    }
  } catch {
    return fallbackDirections(stops)
  }
}

function findNearestCoordIndex(coords: [number, number][], target: [number, number]): number {
  let best = 0
  let bestDist = Infinity
  for (let i = 0; i < coords.length; i++) {
    const d = haversineMeters(coords[i], target)
    if (d < bestDist) {
      bestDist = d
      best = i
    }
  }
  return best
}

function fallbackDirections(stops: ItineraryStop[]): DirectionsResult {
  const legs: DirectionsLeg[] = []
  let totalDistance = 0
  let totalDuration = 0
  const fullCoordinates: [number, number][] = []

  for (let i = 1; i < stops.length; i++) {
    const leg = straightLeg(stops[i - 1].coords, stops[i].coords)
    legs.push(leg)
    totalDistance += leg.distance
    totalDuration += leg.duration
    if (fullCoordinates.length === 0) fullCoordinates.push(stops[i - 1].coords)
    fullCoordinates.push(stops[i].coords)
  }

  return { legs, totalDistance, totalDuration, fullCoordinates }
}

export function metersToMiles(meters: number): number {
  return meters / 1609.344
}

export function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60)
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m > 0 ? `${h} hr ${m} min` : `${h} hr`
}

export function buildGoogleMapsRouteUrl(
  stops: ItineraryStop[],
  travelMode: 'driving' | 'walking',
): string {
  if (stops.length === 0) return 'https://www.google.com/maps'
  const mode = travelMode === 'walking' ? 'walking' : 'driving'
  const fmt = (c: [number, number]) => `${c[1]},${c[0]}`
  const origin = fmt(stops[0].coords)
  const destination = fmt(stops[stops.length - 1].coords)
  const waypoints =
    stops.length > 2
      ? stops
          .slice(1, -1)
          .map((s) => fmt(s.coords))
          .join('|')
      : ''

  const params = new URLSearchParams({
    api: '1',
    travelmode: mode,
    origin,
    destination,
  })
  if (waypoints) params.set('waypoints', waypoints)
  return `https://www.google.com/maps/dir/?${params.toString()}`
}

export const ITINERARY_MAP_BOUNDS = NAPA_BOUNDS