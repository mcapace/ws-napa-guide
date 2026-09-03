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
