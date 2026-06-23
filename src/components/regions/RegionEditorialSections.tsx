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
    image: feature.image,
    imagePortrait: feature.imagePortrait,
    children: feature.body,
  }
}

export function RegionEditorialSections({ data }: { data: LoadedRegionMdx }) {
  const regionLabel = data.frontmatter.region
  const slug = data.frontmatter.slug
  const phrases = data.frontmatter.marqueePhrases ?? {}
  const tasteMapRows = buildRegionTasteMapRows(data)
  const eatMapRows = buildRegionEatMapRows(data)
  const stayMapRows = buildRegionStayMapRows(data)

  const hasTaste =
    data.featuredWineries.length > 0 || data.tastingDirectory.length > 0
  const hasEat =
    data.featuredRestaurants.length > 0 ||
    data.breakfast !== null ||
    data.restaurantDirectory.length > 0 ||
    eatMapRows.length > 0
  const hasStay =
    data.featuredHotels.length > 0 ||
    data.lodgingDirectory.length > 0 ||
    stayMapRows.length > 0

  return (
    <div className="region-guide-body">
      {hasTaste && (
        <section id="region-taste" className="region-chapter region-chapter--taste">
          <SectionDivider label={phrases.taste ?? 'Where to taste'} />
          <div className="region-chapter__inner">
            {data.featuredWineries.length > 0 && (
              <div className="region-story-stack">
                {data.featuredWineries.map((feature) => (
                  <RegionStoryCard key={`winery-${feature.name}`} {...storyProps(feature)} />
                ))}
              </div>
            )}
            {tasteMapRows.length > 0 && (
              <RegionListingMapSection
                title={`More ${regionLabel} Tasting Rooms`}
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
          <div className="region-chapter__inner">
            {data.featuredRestaurants.length > 0 && (
              <div className="region-story-stack">
                {data.featuredRestaurants.map((feature) => (
                  <RegionStoryCard key={`restaurant-${feature.name}`} {...storyProps(feature)} />
                ))}
              </div>
            )}
            {data.restaurantDirectory.length > 0 && (
              <RegionListingMapSection
                title={`More ${regionLabel} Dining`}
                regionSlug={slug}
                data={data}
                mapRows={eatMapRows}
                listRows={data.restaurantDirectory}
                pinnedCategory="dining"
              />
            )}
            {data.breakfast && (
              <div className="region-story-stack region-story-stack--single">
                <RegionStoryCard key={`breakfast-${data.breakfast.name}`} {...storyProps(data.breakfast)} />
              </div>
            )}
          </div>
        </section>
      )}

      {hasStay && (
        <section id="region-stay" className="region-chapter region-chapter--stay">
          <SectionDivider label={phrases.stay ?? 'Where to stay'} />
          <div className="region-chapter__inner">
            {data.featuredHotels.length > 0 && (
              <div className="region-story-stack">
                {data.featuredHotels.map((feature) => (
                  <RegionStoryCard key={`hotel-${feature.name}`} {...storyProps(feature)} />
                ))}
              </div>
            )}
            {(data.lodgingDirectory.length > 0 || stayMapRows.length > 0) && (
              <RegionListingMapSection
                title={`More ${regionLabel} Lodging`}
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
  const phrases = data.frontmatter.marqueePhrases ?? {}
  const tasteMapRows = buildRegionTasteMapRows(data)
  const eatMapRows = buildRegionEatMapRows(data)
  const stayMapRows = buildRegionStayMapRows(data)
  const items: { id: string; label: string }[] = []

  if (data.sidebarHeading) {
    items.push({
      id: 'region-sidebar',
      label: phrases.sidebar ?? 'Aside',
    })
  }
  if (data.featuredWineries.length > 0 || data.tastingDirectory.length > 0) {
    items.push({ id: 'region-taste', label: phrases.taste ?? 'Taste' })
  }
  if (
    data.featuredRestaurants.length > 0 ||
    data.breakfast ||
    data.restaurantDirectory.length > 0 ||
    eatMapRows.length > 0
  ) {
    items.push({ id: 'region-eat', label: phrases.eat ?? 'Eat' })
  }
  if (
    data.featuredHotels.length > 0 ||
    data.lodgingDirectory.length > 0 ||
    stayMapRows.length > 0
  ) {
    items.push({ id: 'region-stay', label: phrases.stay ?? 'Stay' })
  }

  return items
}
