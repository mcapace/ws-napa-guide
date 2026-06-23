#!/usr/bin/env node
/**
 * Geocode wineries, restaurants, hotels from address fields.
 * Updates only `coords` lines in src/data/*.ts — no editorial text.
 *
 * Usage: npm run geocode:listings
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const ROOT = process.cwd()
const FILES = ['wineries.ts', 'restaurants.ts', 'hotels.ts'].map((f) =>
  join(ROOT, 'src/data', f),
)

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
  console.error('Set MAPBOX_TOKEN or NEXT_PUBLIC_MAPBOX_TOKEN')
  process.exit(1)
}

async function geocode(address) {
  const q = encodeURIComponent(`${address}, Napa Valley, CA`)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?access_token=${token}&limit=1&country=us`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Geocode failed: ${res.status}`)
  const data = await res.json()
  const feat = data.features?.[0]
  if (!feat) return null
  const [lng, lat] = feat.center
  return [lng, lat]
}

function extractEntries(content) {
  const entries = []
  const slugRe = /slug:\s*'([^']+)'/g
  let m
  while ((m = slugRe.exec(content)) !== null) {
    const slug = m[1]
    const start = m.index
    const nextSlug = content.indexOf('slug:', start + 1)
    const block = nextSlug > 0 ? content.slice(start, nextSlug) : content.slice(start)
    const addrM = block.match(/address:\s*'([^']+)'/)
    const coordsM = block.match(/coords:\s*\[([^\]]+)\]/)
    if (addrM) {
      entries.push({
        slug,
        address: addrM[1],
        coordsLine: coordsM ? coordsM[0] : null,
        coords: coordsM ? coordsM[1].split(',').map((n) => parseFloat(n.trim())) : null,
      })
    }
  }
  return entries
}

function replaceCoords(content, slug, lng, lat) {
  const slugIdx = content.indexOf(`slug: '${slug}'`)
  if (slugIdx < 0) return content
  const nextSlug = content.indexOf('slug:', slugIdx + 1)
  const blockEnd = nextSlug > 0 ? nextSlug : content.length
  const block = content.slice(slugIdx, blockEnd)
  const coordsRe = /coords:\s*\[[^\]]+\]/
  if (!coordsRe.test(block)) return content
  const newBlock = block.replace(coordsRe, `coords: [${lng.toFixed(4)}, ${lat.toFixed(4)}]`)
  return content.slice(0, slugIdx) + newBlock + content.slice(blockEnd)
}

async function main() {
  for (const file of FILES) {
    let content = readFileSync(file, 'utf8')
    const entries = extractEntries(content)
    console.log(`\n${file}: ${entries.length} entries`)
    for (const e of entries) {
      const coords = await geocode(e.address)
      if (!coords) {
        console.warn(`  skip ${e.slug}: no result for ${e.address}`)
        continue
      }
      const [lng, lat] = coords
      const moved =
        !e.coords ||
        Math.abs(e.coords[0] - lng) > 0.001 ||
        Math.abs(e.coords[1] - lat) > 0.001
      if (moved) {
        console.log(`  ${e.slug}: [${lng.toFixed(4)}, ${lat.toFixed(4)}] (${e.address})`)
        content = replaceCoords(content, e.slug, lng, lat)
      }
      await new Promise((r) => setTimeout(r, 120))
    }
    writeFileSync(file, content)
  }
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
