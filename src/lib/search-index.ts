import { partners, partnerPathForName } from '@/data/partners'
import { regions } from '@/data/regions'
import { getRegionItineraries } from '@/data/region-itineraries'
import { getStoryArticles, storySectionLabel } from '@/data/site-stories'
import { buildAllRegionPins } from '@/lib/all-region-pins'
import { categoryEyebrow, exploreMapUrl, regionDisplayName } from '@/lib/explore'
import type { SearchItem } from '@/lib/site-search'

/**
 * Build the site-wide search catalog from the same sources as Explore / Stories.
 * Server-side only (reads MDX via buildAllRegionPins).
 */
export async function buildSearchIndex(): Promise<SearchItem[]> {
  const items: SearchItem[] = []

  for (const region of regions) {
    items.push({
      id: `town:${region.slug}`,
      kind: 'town',
      title: region.name,
      subtitle: 'Town & area',
      href: `/regions/${region.slug}`,
      keywords: region.tagline,
    })
  }

  const pins = await buildAllRegionPins()
  for (const pin of pins) {
    const town = regionDisplayName(pin.region)
    const partnerHref =
      pin.category === 'winery' ? partnerPathForName(pin.name, pin.region) : null
    items.push({
      id: `pin:${pin.region}:${pin.slug}`,
      kind: pin.category,
      title: pin.name,
      subtitle: `${town} · ${categoryEyebrow(pin.category)}`,
      href:
        partnerHref ??
        exploreMapUrl({ ava: pin.region, place: pin.slug, category: pin.category }),
      keywords: [pin.excerpt, pin.excerptFull, ...(pin.tags ?? [])]
        .filter(Boolean)
        .join(' '),
    })
  }

  for (const partner of partners) {
    items.push({
      id: `partner:${partner.slug}`,
      kind: 'winery',
      title: partner.name,
      subtitle: `${partner.regionName} · Partner destination`,
      href: `/partners/${partner.slug}`,
      keywords: [partner.description, partner.featuredWines, partner.brandLabel].join(' '),
    })
  }

  for (const article of getStoryArticles()) {
    items.push({
      id: `story:${article.slug}`,
      kind: 'story',
      title: article.title,
      subtitle: storySectionLabel(article.section),
      href: `/features/${article.slug}`,
      keywords: [article.subtitle, article.excerpt].filter(Boolean).join(' '),
    })
  }

  for (const region of regions) {
    const itineraries = getRegionItineraries(region.slug)
    for (const itinerary of itineraries) {
      items.push({
        id: `itinerary:${region.slug}:${itinerary.id}`,
        kind: 'itinerary',
        title: itinerary.title,
        subtitle: `${region.name} · Itinerary`,
        href: `/regions/${region.slug}?tab=itinerary&itinerary=${encodeURIComponent(itinerary.id)}`,
        keywords: itinerary.intro,
      })
    }
  }

  return items
}
