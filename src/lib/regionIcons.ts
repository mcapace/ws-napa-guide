import type { LucideIcon } from 'lucide-react'
import { Building, Building2, Droplet, Home, Leaf, MountainSnow, Star } from 'lucide-react'

/** Homepage appellation row + future nav/sitemap use. */
export const REGION_EDITORIAL_ICONS: Record<string, LucideIcon> = {
  oakville: Leaf,
  rutherford: Building,
  yountville: Star,
  'pritchard-hill': MountainSnow,
  'st-helena': Home,
  calistoga: Droplet,
  'downtown-napa': Building2,
}

export function getRegionEditorialIcon(slug: string): LucideIcon {
  return REGION_EDITORIAL_ICONS[slug] ?? Leaf
}
