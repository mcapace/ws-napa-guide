import focalManifest from '@/data/region-image-focal.json'

export type ImageFocalHint = 'hero' | 'landscape' | 'portrait' | 'thumb' | 'aerial' | 'architecture'

/** CSS object-position value for next/image fill crops. */
export function getImageFocalPoint(
  src: string | undefined,
  hint: ImageFocalHint = 'landscape',
): string {
  if (!src) return 'center'

  const fromManifest = (focalManifest as Record<string, string>)[src]
  if (fromManifest) return fromManifest

  if (hint === 'portrait' || hint === 'architecture') return 'center top'
  if (hint === 'aerial') return 'center 40%'
  if (hint === 'hero') return 'center 35%'
  if (hint === 'thumb') return 'center'

  if (src.includes('/hero/')) return 'center 35%'
  if (src.includes('-portrait')) return 'center top'

  return 'center'
}
