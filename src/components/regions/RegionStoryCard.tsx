import type { ReactNode } from 'react'

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

/** Editorial pick — prose in the guide column; photos live in the directory map. */
export function RegionStoryCard({
  name,
  address,
  website,
  children,
}: RegionStoryCardProps) {
  const href = website?.match(/^https?:\/\//i)
    ? website
    : website
      ? `https://${website}`
      : undefined

  return (
    <article className="region-story-card">
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
    </article>
  )
}
