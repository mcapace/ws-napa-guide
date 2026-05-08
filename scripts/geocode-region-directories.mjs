#!/usr/bin/env node
/**
 * One-time / manual: geocode tasting + lodging directory rows from region MDX into
 * src/data/region-directory-geocodes.json (Mapbox Geocoding API).
 *
 * Usage: MAPBOX_TOKEN=pk... npm run geocode
 * (uses NEXT_PUBLIC_MAPBOX_TOKEN from .env.local if MAPBOX_TOKEN unset)
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'

const ROOT = join(process.cwd())
const CONTENT = join(ROOT, 'src/content/regions')
const OUT = join(ROOT, 'src/data/region-directory-geocodes.json')

function loadEnvLocal() {
  const p = join(ROOT, '.env.local')
  if (!existsSync(p)) return
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i < 1) continue
    const k = t.slice(0, i).trim()
    let v = t.slice(i + 1).trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1)
    }
    if (!process.env[k]) process.env[k] = v
  }
}

loadEnvLocal()

const token = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN
if (!token) {
  console.error('Set MAPBOX_TOKEN or NEXT_PUBLIC_MAPBOX_TOKEN (or add to .env.local)')
  process.exit(1)
}

function cacheKey(slug, name, address) {
  return `${slug}|${name.trim()}|${address.trim()}`
}

function extractSlug(content, filename) {
  const m = content.match(/^---\s*\n([\s\S]*?)\n---/)
  if (m) {
    const fm = m[1]
    const sm = fm.match(/^\s*slug:\s*(.+)\s*$/m)
    if (sm) return sm[1].trim()
  }
  return filename.replace(/\.mdx$/, '')
}

function parseTableRows(afterHeading) {
  const pipeLines = afterHeading
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('|') && !l.includes('---'))
  if (pipeLines.length < 2) return []
  const rows = []
  for (let i = 1; i < pipeLines.length; i++) {
    const cells = pipeLines[i]
      .split('|')
      .map((c) => c.trim())
      .filter(Boolean)
    if (cells.length < 3 || /^[-:]+$/.test(cells.join(''))) continue
    const [name, address, website] = cells
    if (name === 'Name') continue
    rows.push({ name, address, website })
  }
  return rows
}

function sliceAfterHeading(content, headingLine) {
  const idx = content.indexOf(headingLine)
  if (idx < 0) return ''
  const rest = content.slice(idx + headingLine.length)
  const nextH1 = rest.search(/\n# /)
  const slice = nextH1 >= 0 ? rest.slice(0, nextH1) : rest
  return slice
}

const LOCALITY_FOR_SLUG = {
  oakville: 'Oakville, Napa County',
  rutherford: 'Rutherford, Napa County',
  yountville: 'Yountville, Napa County',
  'st-helena': 'St. Helena, Napa County',
  calistoga: 'Calistoga, Napa County',
  'pritchard-hill': 'Napa County',
  'downtown-napa': 'Napa, Napa County',
}

async function geocodeAddress(address, slug) {
  const locality = LOCALITY_FOR_SLUG[slug] ?? 'Napa Valley, CA'
  const q = `${address}, ${locality}`
  const url = new URL(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json`,
  )
  url.searchParams.set('access_token', token)
  url.searchParams.set('limit', '1')
  url.searchParams.set('country', 'US')
  const res = await fetch(url)
  if (!res.ok) {
    console.warn('Geocode HTTP', res.status, q)
    return null
  }
  const data = await res.json()
  const feat = data.features?.[0]
  if (!feat?.center) return null
  const [lng, lat] = feat.center
  return { lat, lng }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function main() {
  let store = {}
  if (existsSync(OUT)) {
    try {
      store = JSON.parse(readFileSync(OUT, 'utf8'))
    } catch {
      store = {}
    }
  }

  const files = readdirSync(CONTENT).filter((f) => f.endsWith('.mdx'))
  const todo = []

  for (const f of files) {
    const content = readFileSync(join(CONTENT, f), 'utf8')
    const slug = extractSlug(content, f)

    const tasteBlock = sliceAfterHeading(content, '## Tasting Room Directory')
    const stayBlock = sliceAfterHeading(content, '## Lodging Directory')

    for (const row of parseTableRows(tasteBlock)) {
      todo.push({ slug, ...row })
    }
    for (const row of parseTableRows(stayBlock)) {
      todo.push({ slug, ...row })
    }
  }

  let added = 0
  let skipped = 0
  let failed = 0

  for (const row of todo) {
    const k = cacheKey(row.slug, row.name, row.address)
    if (store[k]?.lat != null && store[k]?.lng != null) {
      skipped++
      continue
    }
    const coords = await geocodeAddress(row.address, row.slug)
    if (!coords) {
      console.warn('FAIL', k)
      failed++
      await sleep(120)
      continue
    }
    store[k] = coords
    added++
    console.log('OK', k, coords)
    await sleep(110)
  }

  writeFileSync(OUT, JSON.stringify(store, null, 2) + '\n', 'utf8')
  console.log(`Wrote ${OUT} (added ${added}, skipped ${skipped}, failed ${failed})`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
