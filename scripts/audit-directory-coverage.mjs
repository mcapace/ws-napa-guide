#!/usr/bin/env node
/**
 * Audit region MDX directory coverage:
 * - Featured hotels vs Lodging Directory
 * - Featured wineries vs Tasting Room Directory
 * - Featured/editorial restaurants vs Restaurant Directory
 * - hotels.ts / wineries.ts / restaurants.ts vs MDX sections
 *
 * Usage: node scripts/audit-directory-coverage.mjs
 */

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const ROOT = join(import.meta.dirname, '..')
const MDX_DIR = join(ROOT, 'src/content/regions')

function loadTsEntries(file, fields) {
  const text = readFileSync(join(ROOT, `src/data/${file}`), 'utf8')
  const entries = []
  const re = new RegExp(
    `slug:\\s*'([^']+)'[\\s\\S]*?name:\\s*'([^']+)'[\\s\\S]*?region:\\s*'([^']+)'`,
    'g',
  )
  for (const m of text.matchAll(re)) {
    entries.push({ slug: m[1], name: m[2], region: m[3] })
  }
  return entries
}

const hotelEntries = loadTsEntries('hotels.ts')
const wineryEntries = loadTsEntries('wineries.ts')
const restaurantEntries = loadTsEntries('restaurants.ts')

function norm(s) {
  return s
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[-–—/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function namesOverlap(a, b) {
  const na = norm(a)
  const nb = norm(b)
  if (na === nb) return true
  if (na.length >= 4 && nb.length >= 4 && (na.includes(nb) || nb.includes(na))) return true
  return false
}

function parseTableNames(block, headerLabel) {
  const dirMatch = block.match(new RegExp(`## ${headerLabel}\\s*([\\s\\S]*?)(?=\\n## |\\n# |$)`))
  if (!dirMatch) return []
  return [...dirMatch[1].matchAll(/\| ([^|]+) \| ([^|]+) \|/g)]
    .filter((r) => !r[1].includes('---') && r[1].trim() !== 'Name')
    .map((r) => r[1].trim())
}

function sectionBlock(mdx, heading) {
  const idx = mdx.indexOf(heading)
  if (idx < 0) return ''
  const rest = mdx.slice(idx)
  const nextH1 = rest.search(/\n# [^#]/)
  return nextH1 > 0 ? rest.slice(0, nextH1) : rest
}

function parseStay(mdx) {
  const block = sectionBlock(mdx, '# Where to Stay')
  const featMatch = block.match(/## Featured Hotels\s*([\s\S]*?)(?=## Lodging Directory|$)/)
  const featured = [...(featMatch?.[1] ?? '').matchAll(/^### ([^\n]+)/gm)].map((m) =>
    m[1].trim(),
  )
  const table = parseTableNames(block, 'Lodging Directory')
  return { featured, table }
}

function parseTaste(mdx) {
  const block = sectionBlock(mdx, '# Where to Taste')
  const featMatch = block.match(/## Featured Wineries\s*([\s\S]*?)(?=## Tasting Room Directory|$)/)
  const featured = [...(featMatch?.[1] ?? '').matchAll(/^### ([^\n]+)/gm)].map((m) =>
    m[1].trim(),
  )
  const table = parseTableNames(block, 'Tasting Room Directory')
  return { featured, table }
}

function parseEat(mdx) {
  const block = sectionBlock(mdx, '# Where to Eat')
  const featMatch = block.match(/## Featured Restaurants\s*([\s\S]*?)(?=## Restaurant Directory|$)/)
  const featured = [...(featMatch?.[1] ?? '').matchAll(/^### ([^\n]+)/gm)].map((m) =>
    m[1].trim(),
  )
  const table = [
    ...parseTableNames(block, 'Restaurant Directory'),
    ...parseTableNames(block, 'Breakfast, Coffee & Snacks Directory'),
  ]
  return { featured, table }
}

function tsNotInMdx(entries, slug, allNames) {
  const missing = []
  for (const e of entries) {
    if (e.region !== slug) continue
    if (!allNames.some((n) => namesOverlap(n, e.name))) {
      missing.push({ slug: e.slug, name: e.name })
    }
  }
  return missing
}

const featuredHotelsNotInTable = []
const featuredWineriesNotInTable = []
const featuredRestaurantsNotInTable = []
const hotelsTsNotInMdx = []
const wineriesTsNotInMdx = []
const restaurantsTsNotInMdx = []

for (const file of readdirSync(MDX_DIR).filter((f) => f.endsWith('.mdx'))) {
  const slug = file.replace('.mdx', '')
  const mdx = readFileSync(join(MDX_DIR, file), 'utf8')

  const stay = parseStay(mdx)
  const taste = parseTaste(mdx)
  const eat = parseEat(mdx)

  const missingHotels = stay.featured.filter((f) => !stay.table.some((t) => namesOverlap(t, f)))
  if (missingHotels.length) featuredHotelsNotInTable.push({ region: slug, missing: missingHotels })

  const missingWineries = taste.featured.filter((f) => !taste.table.some((t) => namesOverlap(t, f)))
  if (missingWineries.length) featuredWineriesNotInTable.push({ region: slug, missing: missingWineries })

  const missingRestaurants = eat.featured.filter((f) => !eat.table.some((t) => namesOverlap(t, f)))
  if (missingRestaurants.length) featuredRestaurantsNotInTable.push({ region: slug, missing: missingRestaurants })

  const stayNames = [...stay.featured, ...stay.table]
  hotelsTsNotInMdx.push(...tsNotInMdx(hotelEntries, slug, stayNames).map((m) => ({ region: slug, ...m })))

  const tasteNames = [...taste.featured, ...taste.table]
  wineriesTsNotInMdx.push(...tsNotInMdx(wineryEntries, slug, tasteNames).map((m) => ({ region: slug, ...m })))

  const eatNames = [...eat.featured, ...eat.table]
  restaurantsTsNotInMdx.push(...tsNotInMdx(restaurantEntries, slug, eatNames).map((m) => ({ region: slug, ...m })))
}

let failures = 0

function report(label, items) {
  console.log(label)
  if (items.length === 0) console.log('  (none)')
  else {
    console.log(JSON.stringify(items, null, 2))
    failures += items.length
  }
  console.log()
}

report('Featured hotels missing from Lodging Directory:', featuredHotelsNotInTable)
report('Featured wineries missing from Tasting Room Directory:', featuredWineriesNotInTable)
report('Featured/editorial restaurants missing from Restaurant Directory:', featuredRestaurantsNotInTable)
report('hotels.ts entries missing from region MDX stay sections:', hotelsTsNotInMdx)
report('wineries.ts entries missing from region MDX taste sections:', wineriesTsNotInMdx)
report('restaurants.ts entries missing from region MDX eat sections:', restaurantsTsNotInMdx)

process.exit(failures > 0 ? 1 : 0)
