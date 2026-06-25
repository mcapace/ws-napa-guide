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

/** Default object-position for full-bleed panels — anchor high so heads stay in frame. */
const SHOWCASE_SAFE_TOP = 'center top'
const PORTRAIT_SAFE_TOP = 'center top'

/** CSS object-position value for next/image fill crops. */
export function getImageFocalPoint(
  src: string | undefined,
  hint: ImageFocalHint = 'landscape',
): string {
  if (!src) return 'center'

  if (manifest[src]) return manifest[src]

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

/** Showcase panels always bias to the top of the frame (people-safe). */
export function getShowcaseFocalPoint(
  landscapeSrc: string | undefined,
  portraitSrc?: string,
  usePortrait = false,
): string {
  const src = usePortrait ? portraitSrc ?? landscapeSrc : landscapeSrc
  if (!src) return SHOWCASE_SAFE_TOP
  if (manifest[src]) return manifest[src]
  return usePortrait ? PORTRAIT_SAFE_TOP : SHOWCASE_SAFE_TOP
}

/** Transform-origin for any optional motion — always top-centered on showcase. */
export function showcaseTransformOrigin(): string {
  return 'center top'
}
