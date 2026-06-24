/** Homepage hero mosaic stills — `public/images/homepage/mosaic/` */

export type MosaicOrientation = 'portrait' | 'landscape'

export type MosaicImageAsset = {
  src: string
  /** Native crop orientation (from deliverable dimensions). */
  orientation: MosaicOrientation
  /** Cover crop anchor when slotted into a matching panel. */
  objectPosition?: string
}

/**
 * Panel slot orientations (index matches `PANELS` in page.tsx).
 * TRH-style mix: portrait edge tiles + wide landscape top / bottom-left.
 */
export const MOSAIC_PANEL_SLOT_ORIENTATIONS: MosaicOrientation[] = [
  'portrait', // 148×190 top-left
  'portrait', // 118×152 mid-left
  'landscape', // 168×112 top-center
  'landscape', // 188×158 bottom-left
  'portrait', // 132×172 mid-right
  'portrait', // 128×168 bottom-right
]

/** Catalog keyed to on-disk crops (5:4 landscape vs 5:7 portrait deliverables). */
export const MOSAIC_IMAGE_CATALOG: MosaicImageAsset[] = [
  { src: '/images/homepage/mosaic/collage-alila.jpg', orientation: 'landscape' },
  { src: '/images/homepage/mosaic/collage-bardessono-pool.jpg', orientation: 'landscape' },
  { src: '/images/homepage/mosaic/collage-bella.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-bike.jpg', orientation: 'landscape' },
  { src: '/images/homepage/mosaic/collage-calistoga.jpg', orientation: 'landscape' },
  { src: '/images/homepage/mosaic/collage-charlies.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-clementine-nhr.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-grgich.jpg', orientation: 'landscape' },
  { src: '/images/homepage/mosaic/collage-grigich.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-harvestinn.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-harvestinn2.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-harvestinn3.jpg', orientation: 'landscape' },
  { src: '/images/homepage/mosaic/collage-larkmead.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-lewis.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-lewis-nhr.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-lewis-nhr2.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-mustards-nhr.jpg', orientation: 'landscape' },
  { src: '/images/homepage/mosaic/collage-outpost.jpg', orientation: 'landscape' },
  { src: '/images/homepage/mosaic/collage-outpost2.jpg', orientation: 'landscape' },
  { src: '/images/homepage/mosaic/collage-shafer.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-sign.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-stewart.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-stuppa-nhr.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-stuppa-nhr2.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-understudy.jpg', orientation: 'portrait' },
  { src: '/images/homepage/mosaic/collage-whitehall.jpg', orientation: 'landscape' },
]

/** @deprecated Use MOSAIC_IMAGE_CATALOG — kept for any legacy imports */
export const HOME_MOSAIC_IMAGES = MOSAIC_IMAGE_CATALOG.map((img) => img.src)

export const MOSAIC_ROTATE_INTERVAL_MS = 5800
export const MOSAIC_CROSSFADE_MS = 1000
/** Two panels advance together each tick; sequence spreads changes across the grid. */
export const MOSAIC_PAIR_SEQUENCE: readonly [number, number][] = [
  [0, 2],
  [1, 5],
  [0, 3],
  [1, 4],
  [3, 5],
  [0, 1],
  [2, 4],
  [0, 5],
  [1, 3],
  [2, 5],
  [4, 5],
]

const MOSAIC_BY_ORIENTATION = {
  portrait: MOSAIC_IMAGE_CATALOG.filter((img) => img.orientation === 'portrait'),
  landscape: MOSAIC_IMAGE_CATALOG.filter((img) => img.orientation === 'landscape'),
} as const

export function pickHeroVideoFallback(visible: MosaicImageAsset[]): string {
  const used = new Set(visible.map((img) => img.src))
  const landscapePick = MOSAIC_BY_ORIENTATION.landscape.find((img) => !used.has(img.src))
  if (landscapePick) return landscapePick.src
  const anyPick = MOSAIC_IMAGE_CATALOG.find((img) => !used.has(img.src))
  return anyPick?.src ?? MOSAIC_IMAGE_CATALOG[0]?.src ?? '/images/homepage/mosaic/collage-alila.jpg'
}

function shuffle<T>(items: T[]): T[] {
  const pool = [...items]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool
}

function poolForSlot(panelIndex: number): MosaicImageAsset[] {
  const orientation =
    MOSAIC_PANEL_SLOT_ORIENTATIONS[panelIndex] ?? 'portrait'
  return [...MOSAIC_BY_ORIENTATION[orientation]]
}

/** Per-panel rotation queue: only images whose native crop matches the tile aspect. */
export function buildMosaicPanelQueues(panelCount: number): MosaicImageAsset[][] {
  return Array.from({ length: panelCount }, (_, panelIndex) => {
    const pool = shuffle(poolForSlot(panelIndex))
    if (pool.length === 0) return shuffle([...MOSAIC_IMAGE_CATALOG])
    const offset = Math.floor((panelIndex * pool.length) / panelCount)
    return [...pool.slice(offset), ...pool.slice(0, offset)]
  })
}

/** Initial frame: one unique still per visible tile (no duplicates on load). */
export function pickInitialMosaicAssets(
  queues: MosaicImageAsset[][],
): MosaicImageAsset[] {
  const used = new Set<string>()
  return queues.map((queue, panelIndex) => {
    const pool = poolForSlot(panelIndex)
    const pick =
      queue.find((img) => !used.has(img.src)) ??
      pool.find((img) => !used.has(img.src)) ??
      queue.find((img) => !used.has(img.src)) ??
      pool[0]
    used.add(pick.src)
    return pick
  })
}

function pickNextFromQueue(
  panelIndex: number,
  current: MosaicImageAsset | undefined,
  used: Set<string>,
  queue: MosaicImageAsset[],
): MosaicImageAsset {
  const curIdx = Math.max(0, queue.findIndex((img) => img.src === current?.src))

  const candidates: MosaicImageAsset[] = []
  for (let step = 1; step <= queue.length; step++) {
    const candidate = queue[(curIdx + step) % queue.length]
    if (!used.has(candidate.src)) candidates.push(candidate)
  }
  if (candidates.length > 0) {
    return candidates[Math.floor(Math.random() * candidates.length)]
  }

  const pool = poolForSlot(panelIndex)
  const poolCandidates = pool.filter(
    (img) => !used.has(img.src) && img.src !== current?.src,
  )
  if (poolCandidates.length > 0) {
    return poolCandidates[Math.floor(Math.random() * poolCandidates.length)]
  }

  for (let step = 1; step <= queue.length; step++) {
    const candidate = queue[(curIdx + step) % queue.length]
    if (candidate.src !== current?.src) return candidate
  }
  return current ?? queue[0]
}

/** Next still for a tile: slot-matched pool, never duplicates another visible tile. */
export function pickNextMosaicAsset(
  panelIndex: number,
  visible: MosaicImageAsset[],
  queue: MosaicImageAsset[],
): MosaicImageAsset {
  const used = new Set(
    visible
      .filter((_, i) => i !== panelIndex)
      .map((img) => img.src),
  )
  return pickNextFromQueue(panelIndex, visible[panelIndex], used, queue)
}

/** Advance multiple tiles in one tick — each pick respects the others in the batch. */
export function pickMosaicAssetsForPanels(
  panelIndices: readonly number[],
  visible: MosaicImageAsset[],
  queues: MosaicImageAsset[][],
): MosaicImageAsset[] {
  const next = [...visible]
  const used = new Set(
    visible
      .filter((_, i) => !panelIndices.includes(i))
      .map((img) => img.src),
  )

  for (const panelIndex of panelIndices) {
    const queue = queues[panelIndex]
    if (!queue?.length || queue.length < 2) continue
    const pick = pickNextFromQueue(panelIndex, visible[panelIndex], used, queue)
    next[panelIndex] = pick
    used.add(pick.src)
  }

  return next
}
