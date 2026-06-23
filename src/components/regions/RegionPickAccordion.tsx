'use client'

import { useState, type ReactNode } from 'react'

export type RegionPick = {
  key: string
  name: string
  address?: string
  website?: string
  body: ReactNode
}

function formatWebsiteLabel(url: string): string {
  return url.replace(/^https?:\/\//i, '').replace(/\/$/, '')
}

export function RegionPickAccordion({
  picks,
  accent = 'default',
}: {
  picks: RegionPick[]
  accent?: 'taste' | 'eat' | 'stay' | 'default'
}) {
  const [openKey, setOpenKey] = useState<string | null>(null)

  if (picks.length === 0) return null

  return (
    <div className={`region-pick-accordion region-pick-accordion--${accent}`}>
      {picks.map((pick, index) => {
        const isOpen = openKey === pick.key
        const href = pick.website?.match(/^https?:\/\//i)
          ? pick.website
          : pick.website
            ? `https://${pick.website}`
            : undefined

        return (
          <div
            key={pick.key}
            className={`region-pick-accordion__item${isOpen ? ' region-pick-accordion__item--open' : ''}`}
          >
            <button
              type="button"
              className="region-pick-accordion__trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenKey(isOpen ? null : pick.key)}
            >
              <span className="region-pick-accordion__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="region-pick-accordion__trigger-main">
                <span className="region-pick-accordion__name">{pick.name}</span>
                {!isOpen ? (
                  <div className="region-pick-accordion__preview">{pick.body}</div>
                ) : null}
              </span>
              <span className="region-pick-accordion__chevron" aria-hidden>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen ? (
              <div className="region-pick-accordion__panel">
                <div className="region-pick-accordion__prose">{pick.body}</div>
                {(pick.address || href) && (
                  <div className="region-pick-accordion__meta">
                    {pick.address ? (
                      <p className="region-pick-accordion__address">{pick.address}</p>
                    ) : null}
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="feature-meta-link"
                      >
                        {formatWebsiteLabel(href)}
                      </a>
                    ) : null}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
