import Link from 'next/link'
import type { LoadedRegionMdx } from '@/lib/content/types'

function teaserText(plain?: string, max = 220): string {
  if (!plain) return ''
  const t = plain.trim()
  if (t.length <= max) return t
  return `${t.slice(0, max - 1).trimEnd()}…`
}

export function RegionStoryTeaser({
  data,
  slug,
}: {
  data: LoadedRegionMdx
  slug: string
}) {
  if (!data.sidebarHeading || !data.sidebar) return null

  const phrase = data.frontmatter.marqueePhrases?.sidebar
  const preview = teaserText(data.sidebarPlain)

  return (
    <section id="region-story" className="region-story-teaser">
      {phrase ? (
        <div className="region-story-teaser__divider">
          <span className="region-story-teaser__divider-line" />
          <span className="region-story-teaser__divider-label">{phrase}</span>
          <span className="region-story-teaser__divider-line" />
        </div>
      ) : null}
      <div className="region-story-teaser__card">
        <p className="region-story-teaser__eyebrow">Companion feature</p>
        <h2 className="region-story-teaser__title">{data.sidebarHeading}</h2>
        {data.frontmatter.byline ? (
          <p className="region-story-teaser__byline">{data.frontmatter.byline}</p>
        ) : null}
        {preview ? <p className="region-story-teaser__preview">{preview}</p> : null}
        <Link href={`/regions/${slug}/story`} className="region-story-teaser__link">
          Read the full story →
        </Link>
      </div>
    </section>
  )
}
