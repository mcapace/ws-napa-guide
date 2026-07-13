import type { ReactNode } from 'react'
import type {
  DirectoryCategory,
  EditorialFeature,
  RegionCoordinates,
  TastingDirectoryRow,
} from '@/lib/content/types'

/** Map short references in MDX to CMS feature slugs. */
const FEATURE_SLUG_ALIASES: Record<string, string> = {
  tacos: 'napa-taco-tour',
  'taco-truck-tour': 'napa-taco-tour',
  landmarks: 'napa-landmarks',
}

export function resolveFeatureSlug(ref: string): string {
  return FEATURE_SLUG_ALIASES[ref] ?? ref
}

export function splitTopLevelH1(md: string): Record<string, string> {
  const trimmed = md.trim()
  const parts = trimmed.split(/^# ([^\n]+)\n/m)
  const out: Record<string, string> = {}
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim()
    const body = (parts[i + 1] ?? '').trim()
    out[title] = body
  }
  return out
}

export function splitWhereToTaste(text: string): { featuredRaw: string; directoryRaw: string } {
  if (/## Tasting Room Directory\b/.test(text)) {
    const featMatch = text.match(/## Featured Wineries\s*([\s\S]*?)## Tasting Room Directory/)
    const dirMatch = text.match(/## Tasting Room Directory\s*([\s\S]*)/)
    return {
      featuredRaw: featMatch?.[1]?.trim() ?? '',
      directoryRaw: (dirMatch?.[1] ?? '').trim(),
    }
  }
  const featOnly = text.match(/## Featured Wineries\s*([\s\S]*)/)
  return {
    featuredRaw: (featOnly?.[1] ?? '').trim(),
    directoryRaw: '',
  }
}

/** Same block pattern as tasting: featured editorial picks + markdown table for map/listings. */
export function splitWhereToStay(text: string): { featuredRaw: string; directoryRaw: string } {
  const dirMatch = text.match(/## Lodging Directory\s*([\s\S]*)/)
  if (dirMatch) {
    const featMatch = text.match(/## Featured Hotels\s*([\s\S]*?)## Lodging Directory/)
    return {
      featuredRaw: featMatch?.[1]?.trim() ?? '',
      directoryRaw: (dirMatch[1] ?? '').trim(),
    }
  }
  const featOnly = text.match(/## Featured Hotels\s*([\s\S]*)/)
  return {
    featuredRaw: (featOnly?.[1] ?? '').trim(),
    directoryRaw: '',
  }
}

/** Slice from after `heading` (full line e.g. `## Restaurant Directory`) until the next `## ` heading or EOF. */
export function sliceAfterH2Heading(md: string, headingLine: string): string {
  const idx = md.indexOf(headingLine)
  if (idx < 0) return ''
  const rest = md.slice(idx + headingLine.length)
  const next = rest.search(/\n## /)
  const slice = next >= 0 ? rest.slice(0, next) : rest
  return slice.trim()
}

export function parseMetaLines(block: string): {
  address?: string
  website?: string
  image?: string
  imagePortrait?: string
  bodyMd: string
} {
  const lines = block.split('\n')
  const bodyLines: string[] = []
  let address: string | undefined
  let website: string | undefined
  let image: string | undefined
  let imagePortrait: string | undefined
  for (const line of lines) {
    const addr = line.match(/^- \*\*Address:\*\*\s*(.+)$/i)
    const web = line.match(/^- \*\*Website:\*\*\s*(.+)$/i)
    const img = line.match(/^- \*\*Image:\*\*\s*(.+)$/i)
    const imgPortrait = line.match(/^- \*\*ImagePortrait:\*\*\s*(.+)$/i)
    const coord = line.match(/^- \*\*Coordinates:\*\*\s*(.+)$/i)
    if (addr) address = addr[1].trim()
    else if (web) website = web[1].trim()
    else if (img) image = img[1].trim()
    else if (imgPortrait) imagePortrait = imgPortrait[1].trim()
    else if (coord) {
      /* reserved for future lat/lng in MDX */
    } else {
      bodyLines.push(line)
    }
  }
  return { address, website, image, imagePortrait, bodyMd: bodyLines.join('\n').trim() }
}

export function splitH3Blocks(md: string): { title: string; body: string }[] {
  const parts = md.split(/^### ([^\n]+)\n/m)
  const result: { title: string; body: string }[] = []
  for (let i = 1; i < parts.length; i += 2) {
    result.push({
      title: parts[i].trim(),
      body: (parts[i + 1] ?? '').trim(),
    })
  }
  return result
}

export function splitH2Blocks(md: string): { title: string; body: string }[] {
  const parts = md.split(/^## ([^\n]+)\n/m)
  const result: { title: string; body: string }[] = []
  for (let i = 1; i < parts.length; i += 2) {
    result.push({
      title: parts[i].trim(),
      body: (parts[i + 1] ?? '').trim(),
    })
  }
  return result
}

export function extractGfmTable(text: string): string {
  const idx = text.indexOf('|')
  if (idx < 0) return ''
  return text.slice(idx).trim()
}

export function parseTastingDirectoryTable(tableMd: string, category: DirectoryCategory): TastingDirectoryRow[] {
  const lines = tableMd.split('\n').filter((l) => l.trim().startsWith('|'))
  if (lines.length < 2) return []
  // Positional cells (leading/trailing pipes stripped) so an optional 4th
  // Award column survives rows with empty websites.
  const parseRow = (line: string) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim())
  const rows = lines
    .slice(2)
    .map(parseRow)
    .filter((r) => r.filter((c) => c.length > 0 && !/^[-:]+$/.test(c)).length >= 2)
    .map((cells) => ({
      name: cells[0] ?? '',
      address: cells[1] ?? '',
      website: cells[2] ?? '',
      award: cells[3]?.trim() || undefined,
      coordinates: null as RegionCoordinates | null,
      category,
    }))
    .filter((r) => r.name.length > 0)
  return rows
}

export function markdownToPlainText(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim()
}

/** Plain-text paragraphs preserving MDX paragraph breaks (for itinerary sidebar parsing). */
export function markdownToPlainParagraphs(md: string): string[] {
  return md
    .replace(/^#{1,6}\s+/gm, '')
    .split(/\n\s*\n+/)
    .map((block) =>
      block
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/^[-*]\s+/gm, '')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter((p) => p.length > 20)
}

export function normalizeWebsiteUrl(website: string | undefined): string | undefined {
  if (!website) return undefined
  const trimmed = website.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export function buildEditorialFeaturesFromH3(
  blocks: { title: string; body: string }[],
  compileBody: (md: string) => Promise<ReactNode>,
): Promise<EditorialFeature[]> {
  return Promise.all(
    blocks.map(async (blk, i) => {
      const { address, website, image, imagePortrait, bodyMd } = parseMetaLines(blk.body)
      const body = await compileBody(bodyMd)
      return {
        name: blk.title,
        address,
        website,
        image,
        imagePortrait,
        body,
        bodyPlain: markdownToPlainText(bodyMd),
        imagePosition: i % 2 === 0 ? 'left' : 'right',
      }
    }),
  )
}
