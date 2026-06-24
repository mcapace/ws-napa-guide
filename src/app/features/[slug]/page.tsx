import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import FeatureArticleLayout from '@/components/features/FeatureArticleLayout'
import { FeaturePlacesMentioned } from '@/components/features/FeaturePlacesMentioned'
import featureStyles from '@/components/features/FeatureArticleLayout.module.css'
import { articles, featuredArticles } from '@/data/articles'
import { getFeatureArticleContent } from '@/data/feature-articles'
import { getStoryHeroImage, STORY_SLUGS } from '@/data/site-stories'
import { wineries } from '@/data/wineries'
import { restaurants } from '@/data/restaurants'
import type { HorizontalStripItem } from '@/components/ui/HorizontalStrip'

type Props = { params: Promise<{ slug: string }> }

const featureSlugs: string[] = [...STORY_SLUGS]

export async function generateStaticParams() {
  return articles
    .filter((a) => featureSlugs.includes(a.slug) || a.section === 'feature' || a.section === 'dining' || a.section === 'lede')
    .map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  const featureContent = getFeatureArticleContent(slug)
  const ogImage = featureContent?.heroImage ?? article.images[0]
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { images: [ogImage] },
  }
}

function RelatedListings({ article }: { article: NonNullable<ReturnType<typeof articles.find>> }) {
  const relatedItems: HorizontalStripItem[] = []
  if (article.relatedWineries) {
    article.relatedWineries.forEach((slug) => {
      const w = wineries.find((x) => x.slug === slug)
      if (w) relatedItems.push({ type: 'winery', item: w })
    })
  }
  if (article.relatedRestaurants) {
    article.relatedRestaurants.forEach((slug) => {
      const r = restaurants.find((x) => x.slug === slug)
      if (r) relatedItems.push({ type: 'dining', item: r })
    })
  }
  if (relatedItems.length === 0) return null

  return <FeaturePlacesMentioned entries={relatedItems} />
}

function ReadNext({ slug }: { slug: string }) {
  const related = featuredArticles.filter((a) => a.slug !== slug).slice(0, 3)
  if (related.length === 0) return null

  return (
    <section style={{ padding: '60px 60px 80px', borderTop: '1px solid rgba(247,243,236,0.06)' }}>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C4943A',
          marginBottom: 32,
        }}
      >
        Read next
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {related.map((a) => (
          <Link
            key={a.slug}
            href={`/features/${a.slug}`}
            style={{
              textDecoration: 'none',
              display: 'block',
              background: '#141210',
              overflow: 'hidden',
              transition: 'background 0.3s',
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
              <Image
                src={getStoryHeroImage(a)}
                alt={a.title}
                fill
                sizes="33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '20px' }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#9B9283',
                  marginBottom: 8,
                }}
              >
                {a.author ?? 'Wine Spectator'} &middot; June 2026
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 20,
                  color: '#F7F3EC',
                  lineHeight: 1.15,
                }}
              >
                {a.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function GenericFeatureLayout({
  article,
}: {
  article: NonNullable<ReturnType<typeof articles.find>>
}) {
  const bodyParagraphs = (article.body ?? article.excerpt).split('\n\n').filter(Boolean)
  const midpoint = Math.floor(bodyParagraphs.length / 2)

  return (
    <div className={featureStyles.page} data-site-surface="dark" data-editorial-content>
      <section className={featureStyles.hero} data-nav-hero-root>
        <Image
          src={article.images[0]}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className={featureStyles.heroImage}
        />
        <div className={featureStyles.heroGradient} />
        <div className={featureStyles.heroContent}>
          <p className={featureStyles.kicker}>
            {article.section === 'feature' ? 'Feature' : article.section === 'dining' ? 'Dining' : 'Wine Spectator'} &middot; June 2026
          </p>
          <h1 className={featureStyles.title}>{article.title}</h1>
          {article.author && <p className={featureStyles.author}>By {article.author}</p>}
          <p className={featureStyles.heroDeck}>{article.excerpt}</p>
        </div>
      </section>

      <section className={featureStyles.bodySection}>
        {bodyParagraphs.slice(0, midpoint).map((para, i) => (
          <p key={i} className={featureStyles.paragraph}>{para}</p>
        ))}
      </section>

      {article.images[1] && (
        <section className={featureStyles.midImage}>
          <div className={featureStyles.midImageInner}>
            <Image src={article.images[1]} alt="" fill sizes="calc(100vw - 120px)" style={{ objectFit: 'cover' }} />
          </div>
        </section>
      )}

      <section className={featureStyles.bodySection}>
        {bodyParagraphs.slice(midpoint).map((para, i) => (
          <p key={i} className={featureStyles.paragraph}>{para}</p>
        ))}
      </section>
    </div>
  )
}

export default async function FeatureArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const featureContent = getFeatureArticleContent(slug)

  return (
    <>
      {featureContent ? (
        <FeatureArticleLayout article={article} content={featureContent} />
      ) : (
        <GenericFeatureLayout article={article} />
      )}

      <div data-site-surface="dark" style={{ background: '#0D0B09', color: '#F7F3EC' }}>
        <RelatedListings article={article} />
        <ReadNext slug={slug} />
        <Newsletter />
        <Footer />
      </div>
    </>
  )
}
