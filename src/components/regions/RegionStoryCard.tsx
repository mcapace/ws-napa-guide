import type { ReactNode } from 'react'
import Image from 'next/image'
import { isEditorialListingImage } from '@/lib/explore'

type RegionStoryCardProps = {
  name: string
  address?: string
  website?: string
  image?: string
  imagePortrait?: string
  children: ReactNode
}

function formatWebsiteLabel(url: string): string {
  return url.replace(/^https?:\/\//i, '').replace(/\/$/, '')
}

export function RegionStoryCard({
  name,
  address,
  website,
  image,
  imagePortrait,
  children,
}: RegionStoryCardProps) {
  const landscape = isEditorialListingImage(image) ? image : undefined
  const portrait = isEditorialListingImage(imagePortrait) ? imagePortrait : undefined
  const hasPhoto = landscape || portrait
  const href = website?.match(/^https?:\/\//i)
    ? website
    : website
      ? `https://${website}`
      : undefined

  return (
    <article className="region-story-card">
      {hasPhoto ? (
        <div className="region-story-card__media">
          {landscape && portrait ? (
            <>
              <Image
                src={landscape}
                alt=""
                fill
                sizes="(min-width: 900px) 320px, 100vw"
                className="region-story-card__img region-story-card__img--landscape"
                style={{ objectFit: 'cover' }}
              />
              <Image
                src={portrait}
                alt=""
                fill
                sizes="100vw"
                className="region-story-card__img region-story-card__img--portrait"
                style={{ objectFit: 'cover' }}
              />
            </>
          ) : (
            <Image
              src={landscape ?? portrait!}
              alt=""
              fill
              sizes="(min-width: 900px) 320px, 100vw"
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
      ) : (
        <div className="region-story-card__media region-story-card__media--empty" aria-hidden />
      )}

      <div className="region-story-card__body">
        <h3 className="region-story-card__title">{name}</h3>
        <div className="region-story-card__prose">{children}</div>
        {(address || href) && (
          <div className="region-story-card__meta">
            {address && <p className="region-story-card__address">{address}</p>}
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="feature-meta-link"
              >
                {formatWebsiteLabel(href)}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
