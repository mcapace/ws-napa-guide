import focalManifest from '@/data/region-image-focal.json'

export type ImageFocalHint =
  | 'hero'
  | 'landscape'
  | 'portrait'
  | 'thumb'
  | 'aerial'
  | 'architecture'
  | 'showcase'

/** CSS object-position value for next/image fill crops. */
export function getImageFocalPoint(
  src: string | undefined,
  hint: ImageFocalHint = 'landscape',
): string {
  if (!src) return 'center'

  const fromManifest = (focalManifest as Record<string, string>)[src]
  if (fromManifest) return fromManifest

  if (hint === 'showcase' || hint === 'landscape') return 'center 28%'
  if (hint === 'portrait' || hint === 'architecture') return 'center 22%'
  if (hint === 'aerial') return 'center 38%'
  if (hint === 'hero') return 'center 30%'
  if (hint === 'thumb') return 'center 28%'

  if (src.includes('/hero/')) return 'center 30%'
  if (src.includes('-portrait')) return 'center 22%'
  if (src.includes('/wineries/')) return 'center 30%'
  if (src.includes('/restaurants/') || src.includes('/breakfast/')) return 'center 38%'
  if (src.includes('/hotels/')) return 'center 28%'

  return 'center 28%'
}

/** Match transform-origin to focal point so entry scale doesn’t crop heads. */
export function focalToTransformOrigin(focal: string): string {
  return focal
}
