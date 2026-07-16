import Image from 'next/image'
import type { RegionMdxFrontmatter } from '@/lib/content/types'

export function RegionHero({ fm }: { fm: RegionMdxFrontmatter }) {
  return (
    <header className="region-editorial-hero">
      <div className="region-editorial-hero__media">
        {fm.heroImagePortrait ? (
          <>
            <Image
              src={fm.heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="region-editorial-hero__img region-editorial-hero__img--landscape"
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={fm.heroImagePortrait}
              alt=""
              fill
              priority
              sizes="100vw"
              className="region-editorial-hero__img region-editorial-hero__img--portrait"
              style={{ objectFit: 'cover' }}
            />
          </>
        ) : (
          <Image
            src={fm.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="region-editorial-hero__img"
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>

      <div className="region-editorial-hero__overlay" aria-hidden />
      <div className="hero-top-scrim" aria-hidden />

      <div className="region-editorial-hero__copy">
        <p className="region-editorial-hero__eyebrow">Wine Spectator · Napa Valley Guide</p>
        <p className="region-editorial-hero__byline">By {fm.byline}</p>
        <h1 className="region-editorial-hero__title">{fm.region}</h1>
        <p className="region-editorial-hero__tagline">{fm.tagline}</p>
      </div>
    </header>
  )
}
