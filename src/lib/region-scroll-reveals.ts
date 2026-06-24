/**
 * Homepage appellation hover stills — `public/images/homepage/region-scroll-reveals/`.
 * Source: Drive `00_Homepage/02_Region_Scroll_Reveals` (3 stills per region when available).
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

/** Three images for the browse-by-appellation hover reveal (left + two on right). */
export function getAppellationRevealImages(slug: string): readonly string[] {
  return REGION_SCROLL_REVEAL_IMAGES[slug] ?? []
}
