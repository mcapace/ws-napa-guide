import type { MapPin } from '@/data/map-pins'

export type ParsedItineraryStep = {
  number: number
  title?: string
  text: string
  matchedPins: MapPin[]
}

function normalizeForMatch(name: string): string {
  return name
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Match listing names mentioned in step text (longest names first). */
export function matchPinsInText(text: string, pins: MapPin[]): MapPin[] {
  const lower = text.toLowerCase()
  const matched: MapPin[] = []
  const seen = new Set<string>()

  const sorted = [...pins].sort((a, b) => b.name.length - a.name.length)

  for (const pin of sorted) {
    const name = normalizeForMatch(pin.name)
    if (name.length < 4) continue
    const isMatch =
      lower.includes(name) ||
      name
        .split(' ')
        .filter((w) => w.length > 3)
        .some((word) => lower.includes(word))
    if (!isMatch) continue
    if (seen.has(pin.slug)) continue
    seen.add(pin.slug)
    matched.push(pin)
  }

  return matched.sort(
    (a, b) => lower.indexOf(normalizeForMatch(a.name)) - lower.indexOf(normalizeForMatch(b.name)),
  )
}

export function parseItineraryBody(body: string): Array<{ number: number; title?: string; text: string }> {
  const text = body.replace(/\r/g, '').trim()
  if (!text) return []

  const numbered: Array<{ number: number; title?: string; text: string }> = []
  const regex = /(?:^|\n)(\d+):\s*([^\n]*)\n?([\s\S]*?)(?=(?:\n\d+:\s)|$)/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    const stepText = match[3].trim()
    if (!stepText) continue
    numbered.push({
      number: parseInt(match[1], 10),
      title: match[2].trim() || undefined,
      text: stepText,
    })
  }

  if (numbered.length > 0) return numbered

  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter((p) => p.length > 80)

  return paragraphs.map((paragraph, index) => ({
    number: index + 1,
    text: paragraph,
  }))
}

export function buildItinerarySteps(body: string, pins: MapPin[]): ParsedItineraryStep[] {
  return parseItineraryBody(body).map((step) => ({
    ...step,
    matchedPins: matchPinsInText(step.text, pins),
  }))
}

export function collectItineraryRouteSlugs(steps: ParsedItineraryStep[]): string[] {
  const slugs: string[] = []
  const seen = new Set<string>()
  for (const step of steps) {
    for (const pin of step.matchedPins) {
      if (seen.has(pin.slug)) continue
      seen.add(pin.slug)
      slugs.push(pin.slug)
    }
  }
  return slugs
}
