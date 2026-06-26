import type { MapPin } from '@/data/map-pins'
import type { LoadedRegionMdx } from '@/lib/content/types'
import { MAGAZINE_SECTION_LABELS } from '@/lib/region-magazine-sections'
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
  showcaseEnhanced = false,
}: {
  data: LoadedRegionMdx
  layout?: 'classic' | 'refined' | 'showcase'
  regionSlug?: string
  regionLabel?: string
  pins?: MapPin[]
  showcaseEnhanced?: boolean
}) {
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
  const hasEat =
    eatPicks.length > 0 || data.coffeeSnackFeatures.length > 0

  const coffeeSnackPicks = data.coffeeSnackFeatures.map((feature, index) => ({
    key: `coffee-${feature.name}`,
    props: featureProps(feature),
    showcase: toShowcasePick(feature, 'eat', `coffee-${feature.name}`),
    index,
  }))
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
          <SectionDivider
            label={MAGAZINE_SECTION_LABELS.taste}
            compact={refined || showcase}
            enhanced={showcase && showcaseEnhanced}
            variant={showcase ? 'magazine' : 'caps'}
          />
          {showcase ? (
            <FeaturedShowcase
              picks={tastePicks.map((p) => p.showcase)}
              regionSlug={regionSlug ?? data.frontmatter.slug}
              regionLabel={label}
              pins={pins}
              startIndex={tasteStart}
              enhanced={showcaseEnhanced}
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
          <SectionDivider
            label={MAGAZINE_SECTION_LABELS.eat}
            compact={refined || showcase}
            enhanced={showcase && showcaseEnhanced}
            variant={showcase ? 'magazine' : 'caps'}
          />
          {showcase ? (
            <>
              {eatPicks.length > 0 ? (
                <FeaturedShowcase
                  picks={eatPicks.map((p) => p.showcase)}
                  regionSlug={regionSlug ?? data.frontmatter.slug}
                  regionLabel={label}
                  pins={pins}
                  startIndex={eatStart}
                  enhanced={showcaseEnhanced}
                />
              ) : null}
              {coffeeSnackPicks.length > 0 ? (
                <>
                  <SectionDivider
                    label="Breakfast, coffee & snacks"
                    compact={refined || showcase}
                    enhanced={showcase && showcaseEnhanced}
                  />
                  <FeaturedShowcase
                    picks={coffeeSnackPicks.map((p) => p.showcase)}
                    regionSlug={regionSlug ?? data.frontmatter.slug}
                    regionLabel={label}
                    pins={pins}
                    startIndex={eatStart + eatPicks.length}
                    enhanced={showcaseEnhanced}
                  />
                </>
              ) : null}
            </>
          ) : refined ? (
            <>
              <RegionChapterRefinedPicks stories={eatPicks} variant="eat" />
              {coffeeSnackPicks.length > 0 ? (
                <RegionChapterRefinedPicks
                  stories={coffeeSnackPicks}
                  variant="eat"
                />
              ) : null}
            </>
          ) : (
            <>
              <RegionChapterFeatures stories={eatPicks} />
              {coffeeSnackPicks.length > 0 ? (
                <RegionChapterFeatures stories={coffeeSnackPicks} />
              ) : null}
            </>
          )}
        </section>
      )}
      {hasStay && (
        <section id="region-stay" className={`${chapterClass} region-chapter--stay`}>
          <SectionDivider
            label={MAGAZINE_SECTION_LABELS.stay}
            compact={refined || showcase}
            enhanced={showcase && showcaseEnhanced}
            variant={showcase ? 'magazine' : 'caps'}
          />
          {showcase ? (
            <FeaturedShowcase
              picks={stayPicks.map((p) => p.showcase)}
              regionSlug={regionSlug ?? data.frontmatter.slug}
              regionLabel={label}
              pins={pins}
              startIndex={stayStart}
              enhanced={showcaseEnhanced}
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
  if (data.featuredRestaurants.length > 0 || data.coffeeSnackFeatures.length > 0 || data.breakfast) {
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
