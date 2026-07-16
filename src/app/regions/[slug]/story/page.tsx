import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { loadRegionMdxCached, getMdxRegionSlugs } from '@/lib/content/loadRegionMdx'
import '@/components/regions/region-editorial.css'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getMdxRegionSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await loadRegionMdxCached(slug)
  if (!data?.sidebarHeading) return {}
  return {
    title: `${data.sidebarHeading} — ${data.frontmatter.region}`,
    description: data.sidebarPlain?.slice(0, 160) ?? data.frontmatter.dek,
  }
}

export default async function RegionStoryPage({ params }: Props) {
  const { slug } = await params
  const data = await loadRegionMdxCached(slug)
  if (!data?.sidebarHeading || !data.sidebar) notFound()

  const regionName = data.frontmatter.region

  return (
    <div
      className="region-story-page"
      data-site-surface="light"
      style={{ minHeight: '100vh', background: '#FAF7F2', WebkitFontSmoothing: 'antialiased' as string }}
    >
      <header className="region-story-page__header">
        <div className="region-story-page__header-inner">
          <Link href={`/regions/${slug}`} className="region-story-page__back">
            ← Back to {regionName}
          </Link>
          {data.frontmatter.marqueePhrases?.sidebar ? (
            <p className="region-story-page__eyebrow">{data.frontmatter.marqueePhrases.sidebar}</p>
          ) : null}
          <h1 className="region-story-page__title">{data.sidebarHeading}</h1>
          {data.frontmatter.byline ? (
            <p className="region-story-page__byline">{data.frontmatter.byline}</p>
          ) : null}
        </div>
      </header>

      <article className="region-story-page__article">
        <div className="region-sidebar-mdx region-story-page__body">
          <div className="region-sidebar-mdx__body">{data.sidebar}</div>
        </div>
      </article>

      <div className="region-story-page__footer-cta">
        <Link href={`/regions/${slug}#region-explore`} className="region-story-page__map-link">
          Explore the {regionName} directory →
        </Link>
      </div>

      <Newsletter />
      <Footer />
    </div>
  )
}
