import type { MapPin } from '@/data/map-pins'
import { directorySlug } from '@/lib/explore-region-pins'

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

export function findPinForName(pins: MapPin[], name: string): MapPin | undefined {
  return pins.find((p) => namesOverlap(p.name, name))
}

export function editorialDetailHref(
  pins: MapPin[],
  category: 'taste' | 'eat' | 'stay',
  regionSlug: string,
  name: string,
): string {
  const pin = findPinForName(pins, name)
  if (pin?.href && !pin.href.startsWith('http') && !pin.href.includes('/explore')) {
    return pin.href
  }

  const slug = directorySlug(regionSlug, name)
  const base =
    category === 'taste' ? '/wineries' : category === 'eat' ? '/dining' : '/stay'
  return `${base}/${slug}`
}
