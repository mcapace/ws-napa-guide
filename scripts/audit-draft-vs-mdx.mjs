/**
 * Compare June 2026 Word drafts (reference/pdfs/*.docx) to region MDX structure.
 * Run: node scripts/audit-draft-vs-mdx.mjs
 */
import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const ROOT = join(import.meta.dirname, '..')
const REF = join(ROOT, 'reference/pdfs')
const MDX_DIR = join(ROOT, 'src/content/regions')

const REGION_MAP = {
  yountville: 'WS063026_napaYountville_draft.docx',
  oakville: 'WS063026_napaOakville_draft.docx',
  'st-helena': 'WS063026_napaSTH_draft.docx',
  rutherford: 'WS063026_napaRutherford_draft.docx',
  calistoga: 'WS063026_napaCalistoga_draft.docx',
  'downtown-napa': 'WS063026_napaDT_draft.docx',
  'pritchard-hill': 'WS063026_napaPritchard_draft.docx',
}

function docxText(file) {
  const path = join(REF, file)
  if (!existsSync(path)) return ''
  return execSync(`textutil -convert txt -stdout "${path}"`, { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 })
}

function normalizeName(s) {
  return s
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function namesOverlap(a, b) {
  const na = normalizeName(a)
  const nb = normalizeName(b)
  if (!na || !nb) return false
  if (na === nb) return true
  if (na.length >= 4 && nb.length >= 4 && (na.includes(nb) || nb.includes(na))) return true
  return false
}

function parseMdxLists(slug) {
  const path = join(MDX_DIR, `${slug}.mdx`)
  const raw = readFileSync(path, 'utf8')

  const featuredWineries = [...raw.matchAll(/^### (.+)$/gm)]
    .filter((_, i, arr) => {
      const idx = raw.indexOf(arr[i][0])
      return idx > raw.indexOf('## Featured Wineries') && idx < (raw.indexOf('## Tasting Room Directory') || raw.length)
    })
    .map((m) => m[1].trim())

  const eatStart = raw.indexOf('# Where to Eat')
  const stayStart = raw.indexOf('# Where to Stay')
  const eatBody = eatStart >= 0 ? raw.slice(eatStart, stayStart >= 0 ? stayStart : raw.length) : ''

  const featuredRestaurants = []
  const coffeeSnack = []
  let inCoffee = false
  for (const line of eatBody.split('\n')) {
    if (/^## Breakfast, Coffee & Snacks\s*$/i.test(line)) {
      inCoffee = true
      continue
    }
    if (/^## /.test(line) && !/^### /.test(line)) {
      if (!/^## Breakfast, Coffee & Snacks/i.test(line)) inCoffee = false
    }
    const h2 = line.match(/^## (.+)$/)
    const h3 = line.match(/^### (.+)$/)
    if (h3 && inCoffee) coffeeSnack.push(h3[1].trim())
    if (h2 && !inCoffee && !/Directory|Breakfast/i.test(h2[1])) featuredRestaurants.push(h2[1].trim())
  }

  const featuredHotels = [...raw.matchAll(/^### (.+)$/gm)]
    .filter((_, i, arr) => {
      const idx = raw.indexOf(arr[i][0])
      return idx > raw.indexOf('## Featured Hotels') && idx < (raw.indexOf('## Lodging Directory') || raw.length)
    })
    .map((m) => m[1].trim())

  return { featuredWineries, featuredRestaurants, coffeeSnack, featuredHotels }
}

function draftFeaturedWineries(text) {
  const names = []
  const tasteIdx = text.indexOf('WHERE TO TASTE')
  const eatIdx = text.indexOf('WHERE TO EAT')
  const slice = tasteIdx >= 0 ? text.slice(tasteIdx, eatIdx >= 0 ? eatIdx : text.length) : text
  const blocks = slice.split(/\n{2,}/)
  for (const block of blocks) {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
    if (lines.length < 2) continue
    const body = lines.slice(1).join(' ')
    if (body.length > 280 && !/WHERE TO|WINE SPECTATOR|WS063026/i.test(block)) {
      names.push(lines[0].replace(/\s+/g, ' '))
    }
  }
  return [...new Set(names)]
}

function draftEatFeatured(text) {
  const names = []
  const eatIdx = text.indexOf('WHERE TO EAT')
  const stayIdx = text.indexOf('WHERE TO STAY')
  const breakfastIdx = text.indexOf('BREAKFAST/COFFEE')
  const end = breakfastIdx >= 0 ? breakfastIdx : stayIdx >= 0 ? stayIdx : text.length
  const slice = eatIdx >= 0 ? text.slice(eatIdx, end) : ''
  const blocks = slice.split(/\n{2,}/)
  for (const block of blocks) {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
    if (lines.length < 2) continue
    const body = lines.slice(1).join(' ')
    if (body.length > 200 && !/Also Recommended|RESTAURANTS|WHERE TO/i.test(block)) {
      names.push(lines[0].replace(/\s+/g, ' '))
    }
  }
  return [...new Set(names)]
}

function draftCoffeeSnack(text) {
  const names = []
  const start = text.indexOf('BREAKFAST/COFFEE')
  const stayIdx = text.indexOf('WHERE TO STAY')
  const slice = start >= 0 ? text.slice(start, stayIdx >= 0 ? stayIdx : text.length) : ''
  const lines = slice.split('\n').map((l) => l.trim()).filter(Boolean)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^(Model Bakery|Under-Study|Roman Holiday|Erosion)/i.test(line)) {
      names.push(line.split(/\s{2,}| \| /)[0])
    }
  }
  return [...new Set(names)]
}

function reportSection(title, draftNames, mdxNames) {
  console.log(`\n### ${title}`)
  const missingInMdx = draftNames.filter((d) => !mdxNames.some((m) => namesOverlap(d, m)))
  const extraInMdx = mdxNames.filter((m) => !draftNames.some((d) => namesOverlap(d, m)))
  console.log(`  Draft (${draftNames.length}): ${draftNames.join(', ') || '—'}`)
  console.log(`  MDX  (${mdxNames.length}): ${mdxNames.join(', ') || '—'}`)
  if (missingInMdx.length) console.log(`  ⚠ Missing in MDX: ${missingInMdx.join(', ')}`)
  if (extraInMdx.length) console.log(`  ⚠ Extra in MDX (check production): ${extraInMdx.join(', ')}`)
  if (!missingInMdx.length && !extraInMdx.length) console.log('  ✓ Names align')
}

console.log('June 2026 draft vs MDX audit\nSource: reference/pdfs/*.docx')

for (const [slug, docx] of Object.entries(REGION_MAP)) {
  console.log(`\n## ${slug}`)
  const text = docxText(docx)
  if (!text.trim()) {
    console.log('  (no draft text)')
    continue
  }
  const mdx = parseMdxLists(slug)
  reportSection('Featured wineries', draftFeaturedWineries(text), mdx.featuredWineries)
  reportSection('Featured restaurants', draftEatFeatured(text), mdx.featuredRestaurants)
  if (mdx.coffeeSnack.length || draftCoffeeSnack(text).length) {
    reportSection('Breakfast / coffee blocks', draftCoffeeSnack(text), mdx.coffeeSnack)
  }
}
