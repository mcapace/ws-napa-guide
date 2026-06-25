import type { MapPin } from '@/data/map-pins'
import type { LoadedRegionMdx } from '@/lib/content/types'
import { FeatureBlock } from '@/components/FeatureBlock'
import { RegionRefinedPick } from './RegionRefinedPick'
import { SectionDivider } from './SectionDivider'
import {
  FeaturedShowcase,
  type ShowcaseCategory,
  type ShowcasePick,
} from './FeaturedShowcase'

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

function toShowcasePick(
  feature: EditorialFeature,
  category: ShowcaseCategory,
  key: string,
): ShowcasePick {
  return {
    key,
    category,
    name: feature.name,
    address: feature.address,
    website: feature.website,
    bodyPlain: feature.bodyPlain,
    image: feature.image,
    imagePortrait: feature.imagePortrait,
  }
}

export function RegionEditorialSections({
  data,
  layout = 'classic',
  regionSlug,
  regionLabel,
  pins = [],
}: {
  data: LoadedRegionMdx
  layout?: 'classic' | 'refined' | 'showcase'
  regionSlug?: string
  regionLabel?: string
  pins?: MapPin[]
}) {
  const phrases = data.frontmatter.marqueePhrases ?? {}
  const refined = layout === 'refined'
  const showcase = layout === 'showcase'
  const chapterClass = refined
    ? 'region-chapter region-chapter--refined'
    : showcase
      ? 'region-chapter region-chapter--showcase'
      : 'region-chapter'

  const tastePicks = data.featuredWineries.map((feature) => ({
    key: `winery-${feature.name}`,
    props: featureProps(feature),
    showcase: toShowcasePick(feature, 'taste', `winery-${feature.name}`),
  }))

  const eatPicks = [
    ...data.featuredRestaurants.map((feature) => ({
      key: `restaurant-${feature.name}`,
      props: featureProps(feature),
      showcase: toShowcasePick(feature, 'eat', `restaurant-${feature.name}`),
    })),
    ...(data.breakfast &&
    !data.featuredRestaurants.some((r) => r.name === data.breakfast!.name)
      ? [
          {
            key: `breakfast-${data.breakfast.name}`,
            props: featureProps(data.breakfast),
            showcase: toShowcasePick(data.breakfast, 'eat', `breakfast-${data.breakfast.name}`),
          },
        ]
      : []),
  ]

  const stayPicks = data.featuredHotels.map((feature) => ({
    key: `hotel-${feature.name}`,
    props: featureProps(feature),
    showcase: toShowcasePick(feature, 'stay', `hotel-${feature.name}`),
  }))

  const hasTaste = tastePicks.length > 0
  const hasEat = eatPicks.length > 0
  const hasStay = stayPicks.length > 0

  if (!hasTaste && !hasEat && !hasStay) return null

  const label = regionLabel ?? data.frontmatter.region
  const tasteStart = 0
  const eatStart = hasTaste ? tastePicks.length : 0
  const stayStart = eatStart + (hasEat ? eatPicks.length : 0)

  return (
    <div className={showcase ? 'region-guide-body region-guide-body--showcase' : 'region-guide-body'}>
      {hasTaste && (
        <section id="region-taste" className={`${chapterClass} region-chapter--taste`}>
          <SectionDivider label={phrases.taste ?? 'Where to taste'} compact={refined || showcase} />
          {showcase ? (
            <FeaturedShowcase
              picks={tastePicks.map((p) => p.showcase)}
              regionSlug={regionSlug ?? data.frontmatter.slug}
              regionLabel={label}
              pins={pins}
              startIndex={tasteStart}
            />
          ) : refined ? (
            <RegionChapterRefinedPicks stories={tastePicks} variant="taste" />
          ) : (
            <RegionChapterFeatures stories={tastePicks} />
          )}
        </section>
      )}
      {hasEat && (
        <section id="region-eat" className={`${chapterClass} region-chapter--eat`}>
          <SectionDivider label={phrases.eat ?? 'Where to eat'} compact={refined || showcase} />
          {showcase ? (
            <FeaturedShowcase
              picks={eatPicks.map((p) => p.showcase)}
              regionSlug={regionSlug ?? data.frontmatter.slug}
              regionLabel={label}
              pins={pins}
              startIndex={eatStart}
            />
          ) : refined ? (
            <RegionChapterRefinedPicks stories={eatPicks} variant="eat" />
          ) : (
            <RegionChapterFeatures stories={eatPicks} />
          )}
        </section>
      )}
      {hasStay && (
        <section id="region-stay" className={`${chapterClass} region-chapter--stay`}>
          <SectionDivider label={phrases.stay ?? 'Where to stay'} compact={refined || showcase} />
          {showcase ? (
            <FeaturedShowcase
              picks={stayPicks.map((p) => p.showcase)}
              regionSlug={regionSlug ?? data.frontmatter.slug}
              regionLabel={label}
              pins={pins}
              startIndex={stayStart}
            />
          ) : refined ? (
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
