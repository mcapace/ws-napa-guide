import type { LoadedRegionMdx } from '@/lib/content/types'
import {
  buildRegionEatMapRows,
  buildRegionStayMapRows,
  buildRegionTasteMapRows,
} from '@/lib/content/regionMapRows'
import { SectionDivider } from './SectionDivider'
import { RegionStoryCard } from './RegionStoryCard'
import { RegionListingMapSection } from './RegionListingMapSection'

function storyProps(feature: LoadedRegionMdx['featuredWineries'][number]) {
  return {
    name: feature.name,
    address: feature.address,
    website: feature.website,
    children: feature.body,
  }
}

function RegionChapterPicks({
  stories,
}: {
  stories: Array<{ key: string; props: ReturnType<typeof storyProps> }>
}) {
  if (stories.length === 0) return null

  return (
    <div className="region-chapter__picks">
      <p className="region-chapter__eyebrow">Editor&apos;s picks</p>
      <div className="region-story-group">
        {stories.map((story) => (
          <RegionStoryCard key={story.key} {...story.props} />
        ))}
      </div>
    </div>
  )
}

/** Short jump-nav labels; section dividers use full `marqueePhrases` from MDX. */
const GUIDE_NAV_LABELS = {
  taste: 'Taste',
  eat: 'Eat',
  stay: 'Stay',
  sidebar: 'Aside',
} as const

export function RegionEditorialSections({ data }: { data: LoadedRegionMdx }) {
  const regionLabel = data.frontmatter.region
  const slug = data.frontmatter.slug
  const phrases = data.frontmatter.marqueePhrases ?? {}
  const tasteMapRows = buildRegionTasteMapRows(data)
  const eatMapRows = buildRegionEatMapRows(data)
  const stayMapRows = buildRegionStayMapRows(data)

  const tastePicks = data.featuredWineries.map((feature) => ({
    key: `winery-${feature.name}`,
    props: storyProps(feature),
  }))

  const eatPicks = [
    ...data.featuredRestaurants.map((feature) => ({
      key: `restaurant-${feature.name}`,
      props: storyProps(feature),
    })),
    ...(data.breakfast
      ? [{ key: `breakfast-${data.breakfast.name}`, props: storyProps(data.breakfast) }]
      : []),
  ]

  const stayPicks = data.featuredHotels.map((feature) => ({
    key: `hotel-${feature.name}`,
    props: storyProps(feature),
  }))

  const hasTaste =
    tastePicks.length > 0 || data.tastingDirectory.length > 0
  const hasEat =
    eatPicks.length > 0 ||
    data.restaurantDirectory.length > 0 ||
    eatMapRows.length > 0
  const hasStay =
    stayPicks.length > 0 ||
    data.lodgingDirectory.length > 0 ||
    stayMapRows.length > 0

  return (
    <div className="region-guide-body">
      {hasTaste && (
        <section id="region-taste" className="region-chapter region-chapter--taste">
          <SectionDivider label={phrases.taste ?? 'Where to taste'} />
          <div className="region-chapter__content">
            <RegionChapterPicks stories={tastePicks} />
            {tasteMapRows.length > 0 && (
              <RegionListingMapSection
                title={`${regionLabel} tasting rooms`}
                regionSlug={slug}
                data={data}
                mapRows={tasteMapRows}
                pinnedCategory="winery"
              />
            )}
          </div>
        </section>
      )}

      {hasEat && (
        <section id="region-eat" className="region-chapter region-chapter--eat">
          <SectionDivider label={phrases.eat ?? 'Where to eat'} />
          <div className="region-chapter__content">
            <RegionChapterPicks stories={eatPicks} />
            {data.restaurantDirectory.length > 0 && (
              <RegionListingMapSection
                title={`${regionLabel} dining`}
                regionSlug={slug}
                data={data}
                mapRows={eatMapRows}
                listRows={data.restaurantDirectory}
                pinnedCategory="dining"
              />
            )}
          </div>
        </section>
      )}

      {hasStay && (
        <section id="region-stay" className="region-chapter region-chapter--stay">
          <SectionDivider label={phrases.stay ?? 'Where to stay'} />
          <div className="region-chapter__content">
            <RegionChapterPicks stories={stayPicks} />
            {(data.lodgingDirectory.length > 0 || stayMapRows.length > 0) && (
              <RegionListingMapSection
                title={`${regionLabel} lodging`}
                regionSlug={slug}
                data={data}
                mapRows={stayMapRows}
                listRows={data.lodgingDirectory}
                pinnedCategory="stay"
              />
            )}
          </div>
        </section>
      )}
    </div>
  )
}

/** Nav anchor targets for sticky section jump links. */
export function buildRegionGuideNavItems(data: LoadedRegionMdx): { id: string; label: string }[] {
  const tasteMapRows = buildRegionTasteMapRows(data)
  const eatMapRows = buildRegionEatMapRows(data)
  const stayMapRows = buildRegionStayMapRows(data)
  const items: { id: string; label: string }[] = []

  if (data.sidebarHeading) {
    items.push({
      id: 'region-sidebar',
      label: GUIDE_NAV_LABELS.sidebar,
    })
  }
  if (data.featuredWineries.length > 0 || data.tastingDirectory.length > 0) {
    items.push({ id: 'region-taste', label: GUIDE_NAV_LABELS.taste })
  }
  if (
    data.featuredRestaurants.length > 0 ||
    data.breakfast ||
    data.restaurantDirectory.length > 0 ||
    eatMapRows.length > 0
  ) {
    items.push({ id: 'region-eat', label: GUIDE_NAV_LABELS.eat })
  }
  if (
    data.featuredHotels.length > 0 ||
    data.lodgingDirectory.length > 0 ||
    stayMapRows.length > 0
  ) {
    items.push({ id: 'region-stay', label: GUIDE_NAV_LABELS.stay })
  }

  return items
}
