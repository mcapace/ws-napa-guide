import focalManifest from '@/data/region-image-focal.json'

export type ImageFocalHint =
  | 'hero'
  | 'landscape'
  | 'portrait'
  | 'thumb'
  | 'aerial'
  | 'architecture'
  | 'showcase'

const manifest = focalManifest as Record<string, string>

/** Default object-position for full-bleed panels — 16×9 masters, horizon-biased. */
const SHOWCASE_SAFE_TOP = 'center 40%'
const PORTRAIT_SAFE_TOP = 'center top'

/** Responsive focal profiles (see FeaturedShowcase.module.css). */
const SHOWCASE_FOCAL_PROFILES: Record<string, string> = {
  '/images/oakville/restaurants/oakville-restaurant-mustards-grill-landscape.jpg':
    'subject-top',
}

/** CSS object-position value for next/image fill crops. */
export function getImageFocalPoint(
  src: string | undefined,
  hint: ImageFocalHint = 'landscape',
): string {
  if (!src) return 'center'

  if (manifest[src]) return parseFocalEntry(manifest[src]).objectPosition

  if (hint === 'showcase') return SHOWCASE_SAFE_TOP
  if (hint === 'portrait' || hint === 'architecture') return PORTRAIT_SAFE_TOP
  if (hint === 'aerial') return 'center 38%'
  if (hint === 'hero') return 'center 28%'
  if (hint === 'thumb') return 'center 22%'
  if (hint === 'landscape') return 'center 22%'

  if (src.includes('/hero/')) return 'center 28%'
  if (src.includes('-portrait')) return PORTRAIT_SAFE_TOP
  if (src.includes('/wineries/')) return SHOWCASE_SAFE_TOP
  if (src.includes('/restaurants/') || src.includes('/breakfast/')) return 'center 30%'
  if (src.includes('/hotels/')) return 'center 22%'

  return 'center 22%'
}

export type ShowcaseImageStyle = {
  objectPosition: string
  /** Nudge image down inside the frame to raise the visible crop (e.g. shift:6%). */
  shiftY?: string
}

function parseFocalEntry(raw: string): ShowcaseImageStyle {
  const [position, modifier] = raw.split('|').map((part) => part.trim())
  const objectPosition = position || SHOWCASE_SAFE_TOP
  if (!modifier?.startsWith('shift:')) {
    return { objectPosition }
  }
  return { objectPosition, shiftY: modifier.slice('shift:'.length) }
}

function showcaseStyleForSrc(
  src: string | undefined,
  fallback: string,
): ShowcaseImageStyle {
  if (!src) return { objectPosition: fallback }
  const raw = manifest[src] ?? fallback
  return parseFocalEntry(raw)
}

/** Showcase panels always bias to the top of the frame (people-safe). */
export function getShowcaseFocalPoint(
  landscapeSrc: string | undefined,
  portraitSrc?: string,
  usePortrait = false,
): string {
  return getShowcaseImageStyle(landscapeSrc, portraitSrc, usePortrait).objectPosition
}

export function getShowcaseImageStyle(
  landscapeSrc: string | undefined,
  portraitSrc?: string,
  usePortrait = false,
): ShowcaseImageStyle {
  const src = usePortrait ? portraitSrc ?? landscapeSrc : landscapeSrc
  const fallback = usePortrait ? PORTRAIT_SAFE_TOP : SHOWCASE_SAFE_TOP
  return showcaseStyleForSrc(src, fallback)
}

/** When set, responsive breakpoint rules own landscape focal (people near top of frame). */
export function getShowcaseFocalProfile(landscapeSrc: string | undefined): string | undefined {
  if (!landscapeSrc) return undefined
  return SHOWCASE_FOCAL_PROFILES[landscapeSrc]
}

/** Transform-origin for any optional motion — always top-centered on showcase. */
export function showcaseTransformOrigin(): string {
  return 'center top'
}
