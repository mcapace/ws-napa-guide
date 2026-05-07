import type { ReactNode } from 'react'
import type { EditorialFeature, RegionCoordinates, TastingDirectoryRow } from '@/lib/content/types'

/** Map short references in MDX to CMS feature slugs. */
const FEATURE_SLUG_ALIASES: Record<string, string> = {
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
  const featMatch = text.match(/## Featured Wineries\s*([\s\S]*?)## Tasting Room Directory/)
  const dirMatch = text.match(/## Tasting Room Directory\s*([\s\S]*)/)
  return {
    featuredRaw: featMatch?.[1]?.trim() ?? '',
    directoryRaw: (dirMatch?.[1] ?? '').trim(),
  }
}

/** Same block pattern as tasting: featured editorial picks + markdown table for map/listings. */
export function splitWhereToStay(text: string): { featuredRaw: string; directoryRaw: string } {
  const featMatch = text.match(/## Featured Hotels\s*([\s\S]*?)## Lodging Directory/)
  const dirMatch = text.match(/## Lodging Directory\s*([\s\S]*)/)
  return {
    featuredRaw: featMatch?.[1]?.trim() ?? '',
    directoryRaw: (dirMatch?.[1] ?? '').trim(),
  }
}

export function parseMetaLines(block: string): { address?: string; website?: string; bodyMd: string } {
  const lines = block.split('\n')
  const bodyLines: string[] = []
  let address: string | undefined
  let website: string | undefined
  for (const line of lines) {
    const addr = line.match(/^- \*\*Address:\*\*\s*(.+)$/i)
    const web = line.match(/^- \*\*Website:\*\*\s*(.+)$/i)
    const coord = line.match(/^- \*\*Coordinates:\*\*\s*(.+)$/i)
    if (addr) address = addr[1].trim()
    else if (web) website = web[1].trim()
    else if (coord) {
      /* reserved for future lat/lng in MDX */
    } else {
      bodyLines.push(line)
    }
  }
  return { address, website, bodyMd: bodyLines.join('\n').trim() }
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

export function parseTastingDirectoryTable(tableMd: string): TastingDirectoryRow[] {
  const lines = tableMd.split('\n').filter((l) => l.trim().startsWith('|'))
  if (lines.length < 2) return []
  const parseRow = (line: string) =>
    line
      .split('|')
      .map((c) => c.trim())
      .filter((c) => c.length > 0 && !/^[-:]+$/.test(c))
  const rows = lines
    .slice(2)
    .map(parseRow)
    .filter((r) => r.length >= 3)
    .map(([name, address, website]) => ({
      name,
      address,
      website,
      coordinates: null as RegionCoordinates | null,
    }))
  return rows
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
      const { address, website, bodyMd } = parseMetaLines(blk.body)
      const body = await compileBody(bodyMd)
      return {
        name: blk.title,
        address,
        website,
        body,
        imagePosition: i % 2 === 0 ? 'left' : 'right',
      }
    }),
  )
}
