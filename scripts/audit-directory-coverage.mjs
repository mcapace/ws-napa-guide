#!/usr/bin/env node
/**
 * Audit region MDX: featured hotels vs Lodging Directory table,
 * and hotels.ts entries vs MDX stay sections.
 *
 * Usage: node scripts/audit-directory-coverage.mjs
 */

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const ROOT = join(import.meta.dirname, '..')
const MDX_DIR = join(ROOT, 'src/content/regions')
const hotelsTs = readFileSync(join(ROOT, 'src/data/hotels.ts'), 'utf8')

const hotelBySlug = {}
for (const m of hotelsTs.matchAll(
  /slug:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?region:\s*'([^']+)'/g,
)) {
  hotelBySlug[m[1]] = { name: m[2], region: m[3] }
}

function norm(s) {
  return s.toLowerCase().replace(/['']/g, '').replace(/\s+/g, ' ').trim()
}

function namesOverlap(a, b) {
  const na = norm(a)
  const nb = norm(b)
  if (na === nb) return true
  if (na.length >= 4 && nb.length >= 4 && (na.includes(nb) || nb.includes(na))) return true
  return false
}

function parseStay(mdx) {
  const idx = mdx.indexOf('# Where to Stay')
  if (idx < 0) return { featured: [], table: [] }
  const rest = mdx.slice(idx)
  const nextH1 = rest.search(/\n# [^#]/)
  const block = nextH1 > 0 ? rest.slice(0, nextH1) : rest
  const featMatch = block.match(/## Featured Hotels\s*([\s\S]*?)(?=## Lodging Directory|$)/)
  const featured = [...(featMatch?.[1] ?? '').matchAll(/^### ([^\n]+)/gm)].map((m) =>
    m[1].trim(),
  )
  const dirMatch = block.match(/## Lodging Directory\s*([\s\S]*)/)
  const table = [...(dirMatch?.[1] ?? '').matchAll(/\| ([^|]+) \| ([^|]+) \| ([^|]+) \|/g)]
    .filter((r) => !r[1].includes('---') && r[1].trim() !== 'Name')
    .map((r) => r[1].trim())
  return { featured, table }
}

const featuredNotInTable = []
const hotelsTsNotInMdx = []

for (const file of readdirSync(MDX_DIR).filter((f) => f.endsWith('.mdx'))) {
  const slug = file.replace('.mdx', '')
  const mdx = readFileSync(join(MDX_DIR, file), 'utf8')
  const { featured, table } = parseStay(mdx)
  const missing = featured.filter((f) => !table.some((t) => namesOverlap(t, f)))
  if (missing.length) featuredNotInTable.push({ region: slug, missing })

  const allNames = [...featured, ...table]
  for (const [hs, info] of Object.entries(hotelBySlug)) {
    if (info.region !== slug) continue
    if (!allNames.some((n) => namesOverlap(n, info.name))) {
      hotelsTsNotInMdx.push({ region: slug, slug: hs, name: info.name })
    }
  }
}

console.log('Featured hotels missing from Lodging Directory:')
if (featuredNotInTable.length === 0) console.log('  (none)')
else console.log(JSON.stringify(featuredNotInTable, null, 2))

console.log('\nhotels.ts entries missing from region MDX stay sections:')
if (hotelsTsNotInMdx.length === 0) console.log('  (none)')
else console.log(JSON.stringify(hotelsTsNotInMdx, null, 2))

process.exit(featuredNotInTable.length + hotelsTsNotInMdx.length > 0 ? 1 : 0)
