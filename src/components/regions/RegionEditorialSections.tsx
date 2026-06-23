import type { LoadedRegionMdx } from '@/lib/content/types'
import { FeatureBlock } from '@/components/FeatureBlock'
import { SectionDivider } from './SectionDivider'

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
  const phrases = data.frontmatter.marqueePhrases ?? {}
  const hasTaste =
    data.featuredWineries.length > 0 || data.tastingDirectory.length > 0
  const hasEat =
    data.featuredRestaurants.length > 0 ||
    data.breakfast !== null ||
    data.restaurantDirectory.length > 0
  const hasStay =
    data.featuredHotels.length > 0 || data.lodgingDirectory.length > 0

  return (
    <>
      {hasTaste && (
        <>
          <SectionDivider label={phrases.taste ?? 'Where to taste'} />
          {data.featuredWineries.map((feature) => (
            <FeatureBlock key={`winery-${feature.name}`} {...featureToBlockProps(feature)} />
          ))}
        </>
      )}

      {hasEat && (
        <>
          <SectionDivider label={phrases.eat ?? 'Where to eat'} />
          {data.featuredRestaurants.map((feature) => (
            <FeatureBlock key={`restaurant-${feature.name}`} {...featureToBlockProps(feature)} />
          ))}
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
        </>
      )}
    </>
  )
}
