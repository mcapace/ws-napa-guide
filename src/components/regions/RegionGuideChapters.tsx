import type { LoadedRegionMdx } from '@/lib/content/types'
import { SectionDivider } from './SectionDivider'
import { RegionPickAccordion, type RegionPick } from './RegionPickAccordion'

const GUIDE_NAV_LABELS = {
  taste: 'Taste',
  eat: 'Eat',
  stay: 'Stay',
  sidebar: 'Aside',
  map: 'Directory',
} as const

function toPick(
  feature: LoadedRegionMdx['featuredWineries'][number],
  prefix: string,
): RegionPick {
  return {
    key: `${prefix}-${feature.name}`,
    name: feature.name,
    address: feature.address,
    website: feature.website,
    body: feature.body,
  }
}

export function buildRegionGuideNavItems(
  data: LoadedRegionMdx,
  hasMap = true,
): { id: string; label: string }[] {
  const items: { id: string; label: string }[] = []

  if (data.sidebarHeading) {
    items.push({ id: 'region-sidebar', label: GUIDE_NAV_LABELS.sidebar })
  }
  if (data.featuredWineries.length > 0) {
    items.push({ id: 'region-taste', label: GUIDE_NAV_LABELS.taste })
  }
  if (data.featuredRestaurants.length > 0 || data.breakfast) {
    items.push({ id: 'region-eat', label: GUIDE_NAV_LABELS.eat })
  }
  if (data.featuredHotels.length > 0) {
    items.push({ id: 'region-stay', label: GUIDE_NAV_LABELS.stay })
  }
  if (hasMap) {
    items.push({ id: 'region-map', label: GUIDE_NAV_LABELS.map })
  }

  return items
}

export function RegionGuideChapters({ data }: { data: LoadedRegionMdx }) {
  const phrases = data.frontmatter.marqueePhrases ?? {}

  const tastePicks = data.featuredWineries.map((f) => toPick(f, 'winery'))
  const eatPicks: RegionPick[] = [
    ...data.featuredRestaurants.map((f) => toPick(f, 'restaurant')),
    ...(data.breakfast ? [toPick(data.breakfast, 'breakfast')] : []),
  ]
  const stayPicks = data.featuredHotels.map((f) => toPick(f, 'hotel'))

  const hasTaste = tastePicks.length > 0
  const hasEat = eatPicks.length > 0
  const hasStay = stayPicks.length > 0

  if (!hasTaste && !hasEat && !hasStay) return null

  return (
    <>
      {hasTaste ? (
        <section
          id="region-taste"
          data-region-chapter="taste"
          className="region-chapter region-chapter--taste region-guide-chapter"
        >
          <SectionDivider label={phrases.taste ?? 'Where to taste'} />
          <div className="region-guide-chapter__body">
            <RegionPickAccordion picks={tastePicks} accent="taste" />
          </div>
        </section>
      ) : null}

      {hasEat ? (
        <section
          id="region-eat"
          data-region-chapter="eat"
          className="region-chapter region-chapter--eat region-guide-chapter"
        >
          <SectionDivider label={phrases.eat ?? 'Where to eat'} />
          <div className="region-guide-chapter__body">
            <RegionPickAccordion picks={eatPicks} accent="eat" />
          </div>
        </section>
      ) : null}

      {hasStay ? (
        <section
          id="region-stay"
          data-region-chapter="stay"
          className="region-chapter region-chapter--stay region-guide-chapter"
        >
          <SectionDivider label={phrases.stay ?? 'Where to stay'} />
          <div className="region-guide-chapter__body">
            <RegionPickAccordion picks={stayPicks} accent="stay" />
          </div>
        </section>
      ) : null}
    </>
  )
}
