import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { articles } from '@/data/articles'
import { editorialMdxComponents, ledeMdxComponents, sidebarMdxComponents } from '@/components/regions/mdxComponents'
import type { EditorialFeature, LoadedRegionMdx, RegionMdxFrontmatter, RelatedStoryCard, TastingDirectoryRow } from '@/lib/content/types'
import {
  buildEditorialFeaturesFromH3,
  extractGfmTable,
  parseMetaLines,
  parseTastingDirectoryTable,
  resolveFeatureSlug,
  splitH2Blocks,
  splitH3Blocks,
  splitTopLevelH1,
  splitWhereToStay,
  splitWhereToTaste,
} from '@/lib/content/parseRegionMdxBody'
import { attachDirectoryGeocodes } from '@/lib/content/directoryGeocode'
import { TEST_IMAGES } from '@/lib/test-images'

import { cache } from 'react'

function assignPlaceholderPhotos(list: EditorialFeature[], startIndex: number): EditorialFeature[] {
  return list.map((item, i) => ({
    ...item,
    image: TEST_IMAGES[(startIndex + i) % TEST_IMAGES.length],
  }))
}

const CONTENT_DIR = join(process.cwd(), 'src/content/regions')

export function getMdxRegionSlugs(): string[] {
  try {
    const names = readdirSync(CONTENT_DIR)
    return names.filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
  } catch {
    return []
  }
}

async function compileMarkdown(source: string) {
  const { content } = await compileMDX({
    source,
    components: editorialMdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  })
  return content
}

async function compileLede(source: string) {
  const { content } = await compileMDX({
    source,
    components: ledeMdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  })
  return content
}

async function compileSidebar(source: string) {
  const { content } = await compileMDX({
    source,
    components: sidebarMdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  })
  return content
}

function resolveRelatedStories(refs: string[]): RelatedStoryCard[] {
  const cards: RelatedStoryCard[] = []
  for (const ref of refs) {
    const slug = resolveFeatureSlug(ref)
    const article = articles.find((a) => a.slug === slug)
    if (!article) continue
    const eyebrow =
      article.section === 'feature'
        ? 'Feature'
        : article.section === 'dining'
          ? 'Dining'
          : article.section === 'lede'
            ? 'Guide'
            : 'Wine Spectator'
    cards.push({
      href: `/features/${slug}`,
      image: article.images[0] ?? '',
      eyebrow,
      title: article.title,
      dek: article.excerpt,
    })
  }
  return cards
}

export async function loadRegionMdx(slug: string): Promise<LoadedRegionMdx | null> {
  const filePath = join(CONTENT_DIR, `${slug}.mdx`)
  if (!existsSync(filePath)) return null

  const file = readFileSync(filePath, 'utf8')
  const { data, content } = matter(file)
  const frontmatter = data as RegionMdxFrontmatter

  const sections = splitTopLevelH1(content)

  const ledeMd = sections['Lede'] ?? ''
  const tasteMd = sections['Where to Taste'] ?? ''
  const eatMd = sections['Where to Eat'] ?? ''
  const stayMd = sections['Where to Stay'] ?? ''
  const sidebarEntry = Object.entries(sections).find(([k]) => k.startsWith('Sidebar:'))
  const sidebarMd = sidebarEntry?.[1] ?? ''
  const sidebarHeading = (sidebarEntry?.[0] ?? '').replace(/^Sidebar:\s*/i, '').trim()

  const { featuredRaw, directoryRaw } = splitWhereToTaste(tasteMd)
  const wineryBlocks = splitH3Blocks(featuredRaw)
  const featuredWineriesBase = await buildEditorialFeaturesFromH3(wineryBlocks, compileMarkdown)
  let photoIdx = 0
  const featuredWineries = assignPlaceholderPhotos(featuredWineriesBase, photoIdx)
  photoIdx += featuredWineries.length

  const tableText = extractGfmTable(directoryRaw)
  const tastingDirectory = attachDirectoryGeocodes(frontmatter.slug, parseTastingDirectoryTable(tableText))

  const eatBlocks = splitH2Blocks(eatMd)
  const restaurantBlocks: { title: string; body: string }[] = []
  let breakfastInner: { title: string; body: string } | null = null

  const skipEatDirectoryH2 = new Set(['Restaurant Directory', 'Breakfast, Coffee & Snacks Directory'])

  for (const b of eatBlocks) {
    if (skipEatDirectoryH2.has(b.title.trim())) continue
    if (b.title.toLowerCase().includes('breakfast')) {
      const trimmed = b.body.trim()
      const m = trimmed.match(/^### ([^\n]+)\n([\s\S]*)$/m)
      if (m) breakfastInner = { title: m[1].trim(), body: m[2].trim() }
    } else {
      restaurantBlocks.push(b)
    }
  }

  const featuredRestaurants: EditorialFeature[] = []
  for (let i = 0; i < restaurantBlocks.length; i++) {
    const b = restaurantBlocks[i]
    const { address, website, bodyMd } = parseMetaLines(b.body)
    featuredRestaurants.push({
      name: b.title,
      address,
      website,
      body: await compileMarkdown(bodyMd),
      imagePosition: i % 2 === 0 ? 'left' : 'right',
    })
  }

  const featuredRestaurantsWithPhotos = assignPlaceholderPhotos(featuredRestaurants, photoIdx)
  photoIdx += featuredRestaurants.length

  let breakfast: EditorialFeature | null = null
  if (breakfastInner) {
    const { address, website, bodyMd } = parseMetaLines(breakfastInner.body)
    const pos = restaurantBlocks.length % 2 === 0 ? 'left' : 'right'
    breakfast = {
      name: breakfastInner.title,
      address,
      website,
      body: await compileMarkdown(bodyMd),
      imagePosition: pos,
      image: TEST_IMAGES[photoIdx % TEST_IMAGES.length],
    }
    photoIdx += 1
  }

  let featuredHotels: EditorialFeature[] = []
  let lodgingDirectory: TastingDirectoryRow[] = []
  if (stayMd.trim()) {
    const { featuredRaw: stayFeaturedRaw, directoryRaw: stayDirectoryRaw } = splitWhereToStay(stayMd)
    const hotelBlocks = splitH3Blocks(stayFeaturedRaw)
    const featuredHotelsBase = await buildEditorialFeaturesFromH3(hotelBlocks, compileMarkdown)
    featuredHotels = assignPlaceholderPhotos(featuredHotelsBase, photoIdx)
    photoIdx += featuredHotels.length
    const stayTable = extractGfmTable(stayDirectoryRaw)
    lodgingDirectory = attachDirectoryGeocodes(frontmatter.slug, parseTastingDirectoryTable(stayTable))
  }

  const lede = await compileLede(ledeMd)
  const sidebar = sidebarMd.trim() ? await compileSidebar(sidebarMd) : null
  const related = resolveRelatedStories(frontmatter.relatedFeatures ?? [])

  return {
    sidebarHeading,
    frontmatter,
    lede,
    featuredWineries,
    tastingDirectory,
    featuredRestaurants: featuredRestaurantsWithPhotos,
    breakfast,
    featuredHotels,
    lodgingDirectory,
    sidebar,
    related,
  }
}

export const loadRegionMdxCached = cache(loadRegionMdx)
