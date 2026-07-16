import type { LoadedRegionMdx } from '@/lib/content/types'

const GUIDE_NAV_LABELS = {
  story: 'Story',
  map: 'Directory',
} as const

export function buildRegionGuideNavItems(
  data: LoadedRegionMdx,
  hasMap = true,
): { id: string; label: string }[] {
  const items: { id: string; label: string }[] = []

  if (data.sidebarHeading && data.sidebar) {
    items.push({ id: 'region-story', label: GUIDE_NAV_LABELS.story })
  }
  if (hasMap) {
    items.push({ id: 'region-map', label: GUIDE_NAV_LABELS.map })
  }

  return items
}
