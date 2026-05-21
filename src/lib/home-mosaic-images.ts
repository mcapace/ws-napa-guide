/** Homepage hero mosaic stills — `public/images/homepage/mosaic/` */
export const HOME_MOSAIC_IMAGES = [
  '/images/homepage/mosaic/collage-alila.jpg',
  '/images/homepage/mosaic/collage-bardessono-pool.jpg',
  '/images/homepage/mosaic/collage-bella.jpg',
  '/images/homepage/mosaic/collage-bike.jpg',
  '/images/homepage/mosaic/collage-calistoga.jpg',
  '/images/homepage/mosaic/collage-charlies.jpg',
  '/images/homepage/mosaic/collage-clementine-nhr.jpg',
  '/images/homepage/mosaic/collage-grgich.jpg',
  '/images/homepage/mosaic/collage-grigich.jpg',
  '/images/homepage/mosaic/collage-harvestinn.jpg',
  '/images/homepage/mosaic/collage-harvestinn2.jpg',
  '/images/homepage/mosaic/collage-harvestinn3.jpg',
  '/images/homepage/mosaic/collage-larkmead.jpg',
  '/images/homepage/mosaic/collage-lewis.jpg',
  '/images/homepage/mosaic/collage-lewis-nhr.jpg',
  '/images/homepage/mosaic/collage-lewis-nhr2.jpg',
  '/images/homepage/mosaic/collage-mustards-nhr.jpg',
  '/images/homepage/mosaic/collage-outpost.jpg',
  '/images/homepage/mosaic/collage-outpost2.jpg',
  '/images/homepage/mosaic/collage-shafer.jpg',
  '/images/homepage/mosaic/collage-sign.jpg',
  '/images/homepage/mosaic/collage-stewart.jpg',
  '/images/homepage/mosaic/collage-stuppa-nhr.jpg',
  '/images/homepage/mosaic/collage-stuppa-nhr2.jpg',
  '/images/homepage/mosaic/collage-understudy.jpg',
  '/images/homepage/mosaic/collage-whitehall.jpg',
] as const

export const MOSAIC_ROTATE_INTERVAL_MS = 5200
export const MOSAIC_CROSSFADE_MS = 900
export const MOSAIC_STAGGER_MS = 1100

function shuffle<T>(items: T[]): T[] {
  const pool = [...items]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool
}

/** One starting image per panel (unique when pool is large enough). */
export function pickMosaicForPanels(panelCount: number): string[] {
  const pool = shuffle([...HOME_MOSAIC_IMAGES])
  return Array.from({ length: panelCount }, (_, i) => pool[i % pool.length])
}

/** Per-panel full-pool cycle (offset per tile so panels do not flip in sync). */
export function buildMosaicPanelQueues(panelCount: number): string[][] {
  const pool = shuffle([...HOME_MOSAIC_IMAGES])
  return Array.from({ length: panelCount }, (_, panelIndex) => {
    const offset = Math.floor((panelIndex * pool.length) / panelCount)
    return [...pool.slice(offset), ...pool.slice(0, offset)]
  })
}
