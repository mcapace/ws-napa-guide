import type { LoadedRegionMdx } from '@/lib/content/types'
import { FeatureBlock } from '@/components/FeatureBlock'
import { SectionDivider } from './SectionDivider'

function featureProps(feature: LoadedRegionMdx['featuredWineries'][number]) {
  return {
    name: feature.name,
    address: feature.address,
    website: feature.website,
    image: feature.image,
    imagePortrait: feature.imagePortrait,
    imagePosition: feature.imagePosition,
    children: feature.body,
  }
}

function RegionChapterFeatures({
  stories,
}: {
  stories: Array<{ key: string; props: ReturnType<typeof featureProps> }>
}) {
  if (stories.length === 0) return null

  return (
    <div className="region-chapter__features">
      {stories.map((story) => (
        <FeatureBlock key={story.key} {...story.props} />
      ))}
    </div>
  )
}

/** Short jump-nav labels; section dividers use full `marqueePhrases` from MDX. */
const GUIDE_NAV_LABELS = {
  taste: 'Taste',
  eat: 'Eat',
  stay: 'Stay',
  sidebar: 'Aside',
  map: 'Directory',
} as const

export function RegionEditorialSections({ data }: { data: LoadedRegionMdx }) {
  const phrases = data.frontmatter.marqueePhrases ?? {}

  const tastePicks = data.featuredWineries.map((feature) => ({
    key: `winery-${feature.name}`,
    props: featureProps(feature),
  }))

  const eatPicks = [
    ...data.featuredRestaurants.map((feature) => ({
      key: `restaurant-${feature.name}`,
      props: featureProps(feature),
    })),
    ...(data.breakfast
      ? [{ key: `breakfast-${data.breakfast.name}`, props: featureProps(data.breakfast) }]
      : []),
  ]

  const stayPicks = data.featuredHotels.map((feature) => ({
    key: `hotel-${feature.name}`,
    props: featureProps(feature),
  }))

  const hasTaste = tastePicks.length > 0
  const hasEat = eatPicks.length > 0
  const hasStay = stayPicks.length > 0

  if (!hasTaste && !hasEat && !hasStay) return null

  return (
    <div className="region-guide-body">
      {hasTaste && (
        <section id="region-taste" className="region-chapter region-chapter--taste">
          <SectionDivider label={phrases.taste ?? 'Where to taste'} />
          <RegionChapterFeatures stories={tastePicks} />
        </section>
      )}

      {hasEat && (
        <section id="region-eat" className="region-chapter region-chapter--eat">
          <SectionDivider label={phrases.eat ?? 'Where to eat'} />
          <RegionChapterFeatures stories={eatPicks} />
        </section>
      )}

      {hasStay && (
        <section id="region-stay" className="region-chapter region-chapter--stay">
          <SectionDivider label={phrases.stay ?? 'Where to stay'} />
          <RegionChapterFeatures stories={stayPicks} />
        </section>
      )}
    </div>
  )
}

/** Nav anchor targets for sticky section jump links. */
export function buildRegionGuideNavItems(
  data: LoadedRegionMdx,
  hasMap = true,
): { id: string; label: string }[] {
  const items: { id: string; label: string }[] = []

  if (data.sidebarHeading) {
    items.push({
      id: 'region-sidebar',
      label: GUIDE_NAV_LABELS.sidebar,
    })
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
