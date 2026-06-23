import type { LoadedRegionMdx } from '@/lib/content/types'
import {
  buildRegionEatMapRows,
  buildRegionStayMapRows,
  buildRegionTasteMapRows,
} from '@/lib/content/regionMapRows'
import { FeatureBlock } from '@/components/FeatureBlock'
import { SectionDivider } from './SectionDivider'
import { RegionListingMapSection } from './RegionListingMapSection'

function featureToBlockProps(feature: LoadedRegionMdx['featuredWineries'][number]) {
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
    <>
      {hasTaste && (
        <>
          <SectionDivider label={phrases.taste ?? 'Where to taste'} />
          {data.featuredWineries.map((feature) => (
            <FeatureBlock key={`winery-${feature.name}`} {...featureToBlockProps(feature)} />
          ))}
          {tasteMapRows.length > 0 && (
            <RegionListingMapSection
              title={`More ${regionLabel} Tasting Rooms`}
              regionSlug={slug}
              data={data}
              mapRows={tasteMapRows}
              pinnedCategory="winery"
            />
          )}
        </>
      )}

      {hasEat && (
        <>
          <SectionDivider label={phrases.eat ?? 'Where to eat'} />
          {data.featuredRestaurants.map((feature) => (
            <FeatureBlock key={`restaurant-${feature.name}`} {...featureToBlockProps(feature)} />
          ))}
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
            <FeatureBlock key={`breakfast-${data.breakfast.name}`} {...featureToBlockProps(data.breakfast)} />
          )}
        </>
      )}

      {hasStay && (
        <>
          <SectionDivider label={phrases.stay ?? 'Where to stay'} />
          {data.featuredHotels.map((feature) => (
            <FeatureBlock key={`hotel-${feature.name}`} {...featureToBlockProps(feature)} />
          ))}
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
        </>
      )}
    </>
  )
}
