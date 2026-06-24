'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import { isEditorialListingImage } from '@/lib/explore'

type RegionRefinedPickProps = {
  name: string
  address?: string
  website?: string
  image?: string
  imagePortrait?: string
  bodyPlain?: string
  children: ReactNode
  index?: number
}

function formatWebsiteLabel(url: string): string {
  return url.replace(/^https?:\/\//i, '').replace(/\/$/, '')
}

function previewText(plain?: string, max = 168): string {
  if (!plain?.trim()) return ''
  const t = plain.trim()
  if (t.length <= max) return t
  return `${t.slice(0, max - 1).trimEnd()}…`
}

export function RegionRefinedPick({
  name,
  address,
  website,
  image,
  imagePortrait,
  bodyPlain,
  children,
  index,
}: RegionRefinedPickProps) {
  const plain = bodyPlain?.trim() ?? ''
  const needsToggle = plain.length > 168
  const [open, setOpen] = useState(false)

  const landscape = isEditorialListingImage(image) ? image : undefined
  const portrait = isEditorialListingImage(imagePortrait) ? imagePortrait : undefined
  const fallback = landscape ?? portrait
  const showImage = Boolean(fallback)

  const href = website?.match(/^https?:\/\//i)
    ? website
    : website
      ? `https://${website}`
      : undefined

  return (
    <article
      className={`region-refined-pick${open ? ' region-refined-pick--open' : ''}`}
    >
      {showImage ? (
        <div className="region-refined-pick__media">
          {landscape && portrait ? (
            <>
              <Image
                src={landscape}
                alt=""
                fill
                sizes="(min-width: 960px) 800px, 100vw"
                className="region-refined-pick__img region-refined-pick__img--landscape"
              />
              <Image
                src={portrait}
                alt=""
                fill
                sizes="100vw"
                className="region-refined-pick__img region-refined-pick__img--portrait"
              />
            </>
          ) : (
            <Image
              src={fallback!}
              alt=""
              fill
              sizes="(min-width: 960px) 800px, 100vw"
              className="region-refined-pick__img"
            />
          )}
        </div>
      ) : null}

      <div className="region-refined-pick__body">
        <div className="region-refined-pick__head">
          {index != null ? (
            <span className="region-refined-pick__index" aria-hidden>
              {String(index + 1).padStart(2, '0')}
            </span>
          ) : null}
          <div className="region-refined-pick__headline">
            <p className="region-refined-pick__eyebrow">Featured pick</p>
            <h3 className="region-refined-pick__title">{name}</h3>
            {(address || href) && (
              <p className="region-refined-pick__meta">
                {address ? <span>{address}</span> : null}
                {address && href ? <span className="region-refined-pick__metaSep">·</span> : null}
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="region-refined-pick__link"
                  >
                    {formatWebsiteLabel(href)}
                  </a>
                ) : null}
              </p>
            )}
          </div>
        </div>

        {needsToggle ? (
          <>
            {!open && plain ? (
              <p className="region-refined-pick__preview">{previewText(plain)}</p>
            ) : null}
            {open ? <div className="region-refined-pick__prose">{children}</div> : null}
            <button
              type="button"
              className="region-refined-pick__toggle"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              {open ? 'Show less' : 'Read more'}
              <span className="region-refined-pick__toggleIcon" aria-hidden>
                {open ? '↑' : '↓'}
              </span>
            </button>
          </>
        ) : (
          <div className="region-refined-pick__prose">{children}</div>
        )}
      </div>
    </article>
  )
}
