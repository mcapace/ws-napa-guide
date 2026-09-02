import { markdownToPlainParagraphs } from '@/lib/content/parseRegionMdxBody'

/** Sidebar subsection titles for multi-route regions (must match MDX bold section labels). */
export const ITINERARY_SIDEBAR_SECTION: Record<string, string> = {
  'culinary-delights': 'Culinary Delights',
  'stags-leap-splendor': 'Stags Leap Splendor',
  'into-the-hills': 'Into the Hills',
  'walkable-tasting-tour': 'A Walkable Tasting Tour',
  'mountain-getaway': 'Mountain Retreat',
  'off-the-grid-cabernets': 'Off-the-Grid Cabernets',
  'west-side-family-wineries': 'West Side Family Wineries',
  'st-helena-history-lesson': 'A St. Helena History Lesson',
  'modern-tasting-salons': 'Modern Tasting Salons',
  'estate-caves-cabernets': 'Estate Caves & Cabernets',
  'sauvignon-blanc-discovery': 'The Sauvignon Blanc Discovery Tour',
  'oxbow-first-street': 'Oxbow & First Street',
}

export type ParsedSidebarItinerary = {
  /** e.g. "An Oakville Adventure" */
  adventureLabel?: string
  /** e.g. "The Sauvignon Blanc Discovery Tour" */
  tourTitle?: string
  /** Paragraphs before the first numbered excursion section */
  preambleParagraphs: string[]
  /** Section body keyed by sidebar section title */
  sections: Record<string, string>
  /** Full sidebar body after metadata lines (single-route regions) */
  mainBody: string
}

function stripCompanionMeta(paragraphs: string[]): string[] {
  return paragraphs.filter((p) => !/companion feature/i.test(p))
}

function parseBylineParagraph(p: string): { label?: string } {
  const byMatch = p.match(/^(.+?)\s+By\s+([A-Z][a-zA-Z.'-]+(?:\s+[A-Z][a-zA-Z.'-]+)*)\s*$/)
  if (!byMatch) return {}
  const label = byMatch[1].trim()
  if (label.length > 100 || label.split(/\s+/).length > 14) return {}
  return { label }
}

function detectSectionTitle(paragraph: string): { title: string; rest: string } | null {
  for (const title of Object.values(ITINERARY_SIDEBAR_SECTION)) {
    if (paragraph.startsWith(`${title}. `)) {
      return { title, rest: paragraph.slice(title.length + 2).trim() }
    }
    if (paragraph === title || paragraph.startsWith(`${title} `)) {
      const rest = paragraph.slice(title.length).replace(/^\.?\s+/, '').trim()
      return { title, rest }
    }
  }
  return null
}

export function parseSidebarMd(sidebarMd: string): ParsedSidebarItinerary {
  const adventureLabelMatch = sidebarMd.match(/\*\*((?:An|A) [^*]+ Adventure)\*\*\s+By/i)
  let adventureLabel = adventureLabelMatch?.[1]?.trim()
  let tourTitle: string | undefined

  const paragraphs = stripCompanionMeta(markdownToPlainParagraphs(sidebarMd))
  const contentParagraphs: string[] = []

  for (const p of paragraphs) {
    const byline = parseBylineParagraph(p)
    if (byline.label) {
      if (/ Adventure$/i.test(byline.label)) {
        adventureLabel = byline.label
      } else if (/Tour$/i.test(byline.label) || /Excursions?$/i.test(byline.label)) {
        tourTitle = byline.label
      } else {
        contentParagraphs.push(p)
      }
      continue
    }

    contentParagraphs.push(p)
  }

  const sections: Record<string, string> = {}
  const preambleParagraphs: string[] = []
  let currentSection: string | null = null
  const currentParts: string[] = []

  const flushSection = () => {
    if (!currentSection) return
    sections[currentSection] = currentParts.join(' ')
    currentParts.length = 0
  }

  for (const p of contentParagraphs) {
    const section = detectSectionTitle(p)
    if (section) {
      flushSection()
      currentSection = section.title
      if (section.rest) currentParts.push(section.rest)
      continue
    }

    if (currentSection) {
      currentParts.push(p)
    } else {
      preambleParagraphs.push(p)
    }
  }
  flushSection()

  const mainBody = contentParagraphs.join(' ')

  return {
    adventureLabel,
    tourTitle,
    preambleParagraphs,
    sections,
    mainBody,
  }
}
