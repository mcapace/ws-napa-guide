import type { LoadedRegionMdx } from '@/lib/content/types'
import { FeatureBlock } from '@/components/FeatureBlock'
import { RegionRefinedPick } from './RegionRefinedPick'
import { SectionDivider } from './SectionDivider'

type EditorialFeature = LoadedRegionMdx['featuredWineries'][number]

function featureProps(feature: EditorialFeature) {
  return {
    name: feature.name,
    address: feature.address,
    website: feature.website,
    image: feature.image,
    imagePortrait: feature.imagePortrait,
    imagePosition: feature.imagePosition,
    bodyPlain: feature.bodyPlain,
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

type RefinedChapterVariant = 'taste' | 'eat' | 'stay'

function RegionChapterRefinedPicks({
  stories,
  variant,
}: {
  stories: Array<{ key: string; props: ReturnType<typeof featureProps> }>
  variant: RefinedChapterVariant
}) {
  if (stories.length === 0) return null

  return (
    <div className={`region-refined-picks region-refined-picks--${variant}`}>
      {stories.map((story, index) => (
        <RegionRefinedPick key={story.key} index={index} {...story.props} />
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

export function RegionEditorialSections({
  data,
  layout = 'classic',
}: {
  data: LoadedRegionMdx
  layout?: 'classic' | 'refined'
}) {
  const phrases = data.frontmatter.marqueePhrases ?? {}
  const refined = layout === 'refined'
  const chapterClass = refined ? 'region-chapter region-chapter--refined' : 'region-chapter'

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
        <section id="region-taste" className={`${chapterClass} region-chapter--taste`}>
          <SectionDivider label={phrases.taste ?? 'Where to taste'} compact={refined} />
          {refined ? (
            <RegionChapterRefinedPicks stories={tastePicks} variant="taste" />
          ) : (
            <RegionChapterFeatures stories={tastePicks} />
          )}
        </section>
      )}

      {hasEat && (
        <section id="region-eat" className={`${chapterClass} region-chapter--eat`}>
          <SectionDivider label={phrases.eat ?? 'Where to eat'} compact={refined} />
          {refined ? (
            <RegionChapterRefinedPicks stories={eatPicks} variant="eat" />
          ) : (
            <RegionChapterFeatures stories={eatPicks} />
          )}
        </section>
      )}

      {hasStay && (
        <section id="region-stay" className={`${chapterClass} region-chapter--stay`}>
          <SectionDivider label={phrases.stay ?? 'Where to stay'} compact={refined} />
          {refined ? (
            <RegionChapterRefinedPicks stories={stayPicks} variant="stay" />
          ) : (
            <RegionChapterFeatures stories={stayPicks} />
          )}
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
