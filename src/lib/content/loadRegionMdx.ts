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
  markdownToPlainText,
  parseMetaLines,
  parseTastingDirectoryTable,
  resolveFeatureSlug,
  splitH2Blocks,
  sliceAfterH2Heading,
  splitH3Blocks,
  splitTopLevelH1,
  splitWhereToStay,
  splitWhereToTaste,
} from '@/lib/content/parseRegionMdxBody'
import { attachDirectoryGeocodes } from '@/lib/content/directoryGeocode'
import { mergeDedupedMapRows } from '@/lib/content/regionMapRows'
import { isEditorialListingImage } from '@/lib/explore'

import { cache } from 'react'

function editorialOnlyImage(path?: string): string | undefined {
  return isEditorialListingImage(path) ? path!.trim() : undefined
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
  const featuredWineries = featuredWineriesBase.map((w) => ({
    ...w,
    image: editorialOnlyImage(w.image),
    imagePortrait: editorialOnlyImage(w.imagePortrait),
  }))

  const tableText = extractGfmTable(directoryRaw)
  const tastingDirectory = attachDirectoryGeocodes(
    frontmatter.slug,
    parseTastingDirectoryTable(tableText, 'winery'),
  )

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
    const { address, website, image, imagePortrait, bodyMd } = parseMetaLines(b.body)
    featuredRestaurants.push({
      name: b.title,
      address,
      website,
      image: editorialOnlyImage(image),
      imagePortrait: editorialOnlyImage(imagePortrait),
      body: await compileMarkdown(bodyMd),
      bodyPlain: markdownToPlainText(bodyMd),
      imagePosition: i % 2 === 0 ? 'left' : 'right',
    })
  }

  const featuredRestaurantsWithPhotos = featuredRestaurants

  const restaurantDirSlice = sliceAfterH2Heading(eatMd, '## Restaurant Directory')
  const breakfastDirSlice = sliceAfterH2Heading(eatMd, '## Breakfast, Coffee & Snacks Directory')
  const restaurantDirectory = attachDirectoryGeocodes(
    frontmatter.slug,
    mergeDedupedMapRows([
      ...parseTastingDirectoryTable(extractGfmTable(restaurantDirSlice), 'restaurant'),
      ...parseTastingDirectoryTable(extractGfmTable(breakfastDirSlice), 'restaurant'),
    ]),
  )

  let breakfast: EditorialFeature | null = null
  if (breakfastInner) {
    const { address, website, image, imagePortrait, bodyMd } = parseMetaLines(breakfastInner.body)
    const pos = restaurantBlocks.length % 2 === 0 ? 'left' : 'right'
    breakfast = {
      name: breakfastInner.title,
      address,
      website,
      body: await compileMarkdown(bodyMd),
      bodyPlain: markdownToPlainText(bodyMd),
      imagePosition: pos,
      image: editorialOnlyImage(image),
      imagePortrait: editorialOnlyImage(imagePortrait),
    }
  }

  let featuredHotels: EditorialFeature[] = []
  let lodgingDirectory: TastingDirectoryRow[] = []
  if (stayMd.trim()) {
    const { featuredRaw: stayFeaturedRaw, directoryRaw: stayDirectoryRaw } = splitWhereToStay(stayMd)
    const hotelBlocks = splitH3Blocks(stayFeaturedRaw)
    const featuredHotelsBase = await buildEditorialFeaturesFromH3(hotelBlocks, compileMarkdown)
    featuredHotels = featuredHotelsBase.map((h) => ({
      ...h,
      image: editorialOnlyImage(h.image),
      imagePortrait: editorialOnlyImage(h.imagePortrait),
    }))
    const stayTable = extractGfmTable(stayDirectoryRaw)
    lodgingDirectory = attachDirectoryGeocodes(
      frontmatter.slug,
      parseTastingDirectoryTable(stayTable, 'hotel'),
    )
  }

  const lede = await compileLede(ledeMd)
  const sidebar = sidebarMd.trim() ? await compileSidebar(sidebarMd) : null
  const sidebarPlain = sidebarMd.trim() ? markdownToPlainText(sidebarMd) : undefined
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
    restaurantDirectory,
    sidebar,
    sidebarPlain,
    sidebarMd: sidebarMd.trim() || undefined,
    related,
  }
}

export const loadRegionMdxCached = cache(loadRegionMdx)
