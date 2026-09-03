import manifest from '@/data/partner-galleries.manifest.json'

export type PartnerGalleryCategory = 'tasting' | 'estate' | 'vineyard' | 'art'

export type PartnerGalleryShot = {
  src: string
  alt: string
  category: PartnerGalleryCategory
}

export const PARTNER_GALLERY_LABELS: Record<PartnerGalleryCategory | 'all', string> = {
  all: 'All photos',
  tasting: 'In the glass',
  estate: 'The estate',
  vineyard: 'Vineyards',
  art: 'Art & atmosphere',
}

const galleries = manifest as Record<string, PartnerGalleryShot[]>

export function getPartnerGallery(slug: string): PartnerGalleryShot[] {
  return galleries[slug] ?? []
}

export function partnerGalleryCategories(shots: PartnerGalleryShot[]): PartnerGalleryCategory[] {
  const order: PartnerGalleryCategory[] = ['tasting', 'estate', 'vineyard', 'art']
  const present = new Set(shots.map((shot) => shot.category))
  return order.filter((category) => present.has(category))
}

/** Intro still: first estate or vineyard image (not the hero duplicate). */
export function introGalleryShot(
  shots: PartnerGalleryShot[],
  heroSrc?: string,
): PartnerGalleryShot | undefined {
  const skip = new Set(heroSrc ? [heroSrc] : [])
  return (
    shots.find((shot) => !skip.has(shot.src) && (shot.category === 'estate' || shot.category === 'vineyard')) ??
    shots.find((shot) => !skip.has(shot.src)) ??
    shots[0]
  )
}

/** Five diverse preview indices for the bento collage. */
export function bentoPreviewIndices(
  shots: PartnerGalleryShot[],
  heroSrc?: string,
  excludeSrcs: string[] = [],
): number[] {
  const used = new Set([...(heroSrc ? [heroSrc] : []), ...excludeSrcs])
  const picks: number[] = []
  const categories: PartnerGalleryCategory[] = ['tasting', 'estate', 'vineyard', 'art', 'tasting']

  for (const category of categories) {
    const idx = shots.findIndex((shot, i) => !used.has(shot.src) && shot.category === category && !picks.includes(i))
    if (idx >= 0) {
      picks.push(idx)
      used.add(shots[idx].src)
    }
  }

  for (let i = 0; picks.length < 5 && i < shots.length; i += 1) {
    if (!used.has(shots[i].src) && !picks.includes(i)) {
      picks.push(i)
      used.add(shots[i].src)
    }
  }

  return picks.slice(0, 5)
}
