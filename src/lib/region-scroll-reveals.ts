import type { RegionData } from '@/data/regions'
import { TEST_IMAGES } from '@/lib/test-images'

/**
 * Homepage appellation hover stills on the RIGHT — `public/images/homepage/region-scroll-reveals/`.
 * Source: Drive `02_Region_Scroll_Reveals` (two stills per region on the right; hero is separate).
 * @see https://drive.google.com/drive/folders/1u6ffT1gyiruBGDBgUH3to1i7wBfDTJ7n
 */
export const REGION_SCROLL_REVEAL_IMAGES: Record<string, readonly string[]> = {
  calistoga: [
    '/images/homepage/region-scroll-reveals/calistoga/calistoga-larkmead.jpg',
    '/images/homepage/region-scroll-reveals/calistoga/calistoga-sign.jpg',
  ],
  'downtown-napa': [
    '/images/homepage/region-scroll-reveals/downtown-napa/downtown-mayacamas.jpg',
    '/images/homepage/region-scroll-reveals/downtown-napa/downtown-oxbow2.jpg',
  ],
  oakville: [
    '/images/homepage/region-scroll-reveals/oakville/oakville-farniente.jpg',
    '/images/homepage/region-scroll-reveals/oakville/oakville-mondavigrapes.jpg',
  ],
  rutherford: [
    '/images/homepage/region-scroll-reveals/rutherford/rutherford-grgich.jpg',
    '/images/homepage/region-scroll-reveals/rutherford/rutherford-stsupery.jpg',
  ],
  'st-helena': [
    '/images/homepage/region-scroll-reveals/st-helena/sthelena-charlies.jpg',
    '/images/homepage/region-scroll-reveals/st-helena/sthelena-whitehall.jpg',
  ],
  yountville: [
    '/images/homepage/region-scroll-reveals/yountville/yountville-stewart.jpg',
    '/images/homepage/region-scroll-reveals/yountville/yountville-vineyard-sunrise.jpg',
  ],
}

export type AppellationRevealTriple = readonly [string, string, string]

function pickUnique(
  primary: string | undefined,
  used: Set<string>,
  alternates: readonly string[],
): string {
  if (primary && !used.has(primary)) {
    used.add(primary)
    return primary
  }
  for (const alt of alternates) {
    if (alt && !used.has(alt)) {
      used.add(alt)
      return alt
    }
  }
  for (const fallback of TEST_IMAGES) {
    if (!used.has(fallback)) {
      used.add(fallback)
      return fallback
    }
  }
  return primary ?? TEST_IMAGES[0]
}

/**
 * Browse-by-appellation hover reveal (therealhotels pattern):
 * region hero on the left, two Drive scroll stills on the right.
 */
export function getAppellationRevealImages(
  region: RegionData,
  index: number,
): AppellationRevealTriple {
  const scroll = REGION_SCROLL_REVEAL_IMAGES[region.slug] ?? []
  const testA = TEST_IMAGES[(index + 1) % TEST_IMAGES.length]
  const testB = TEST_IMAGES[(index + 3) % TEST_IMAGES.length]
  const alternates = [testA, testB, ...TEST_IMAGES]

  const used = new Set<string>([region.heroImage])
  const left = region.heroImage
  const rightTop = pickUnique(scroll[0], used, alternates)
  const rightBottom = pickUnique(scroll[1], used, alternates)

  return [left, rightTop, rightBottom]
}
