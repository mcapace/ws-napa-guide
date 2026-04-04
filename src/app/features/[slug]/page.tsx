import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { articles, featuredArticles } from '@/data/articles'
import { wineries } from '@/data/wineries'
import { restaurants } from '@/data/restaurants'
import { HorizontalStrip, type HorizontalStripItem } from '@/components/ui/HorizontalStrip'

type Props = { params: Promise<{ slug: string }> }

const featureSlugs = ['judgment-of-paris', 'napa-taco-tour', 'napa-landmarks', 'napa-calendar', 'napa-valley-guide']

export async function generateStaticParams() {
  return articles
    .filter((a) => featureSlugs.includes(a.slug) || a.section === 'feature' || a.section === 'dining' || a.section === 'lede')
    .map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { images: article.images },
  }
}

export default async function FeatureArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const related = featuredArticles.filter((a) => a.slug !== slug).slice(0, 3)

  // Split body into paragraphs for interspersing with images
  const bodyParagraphs = (article.body ?? article.excerpt).split('\n\n').filter(Boolean)
  const midpoint = Math.floor(bodyParagraphs.length / 2)

  return (
    <div style={{ background: '#0D0B09', color: '#F7F3EC', minHeight: '100vh' }}>
      <Nav />

      {/* ── HERO IMAGE ── */}
      <section style={{ position: 'relative', height: '70vh', minHeight: 400, overflow: 'hidden' }}>
        <Image
          src={article.images[0]}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to bottom, transparent, #0D0B09)',
          }}
        />
      </section>

      {/* ── TITLE + BYLINE (centered, below hero) ── */}
      <section style={{ padding: '48px 60px 40px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C4943A',
            marginBottom: 20,
          }}
        >
          {article.section === 'feature' ? 'Feature' : article.section === 'dining' ? 'Dining' : 'Wine Spectator'} &middot; June 2026
        </p>
        <h1
          data-text-split=""
          data-letters-rotate-in=""
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(40px, 7vw, 80px)',
            color: '#F7F3EC',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: 20,
          }}
        >
          {article.title}
        </h1>
        {article.author && (
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: '#9B9283',
              marginBottom: 8,
            }}
          >
            By {article.author}
          </p>
        )}
      </section>

      {/* ── EDITORIAL EXCERPT (large italic serif) ── */}
      <section style={{ padding: '0 60px 60px', maxWidth: 800, margin: '0 auto' }}>
        <p
          data-text-split=""
          data-lines-slide-up=""
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(22px, 3vw, 36px)',
            color: 'rgba(247,243,236,0.9)',
            lineHeight: 1.35,
            textAlign: 'center',
          }}
        >
          {article.excerpt}
        </p>
      </section>

      {/* ── BODY TEXT (first half) ── */}
      <section style={{ padding: '40px 60px', maxWidth: 760, margin: '0 auto' }}>
        {bodyParagraphs.slice(0, midpoint).map((para, i) => (
          <p
            key={i}
            data-text-split=""
            data-lines-slide-up=""
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: 'rgba(247,243,236,0.7)',
              lineHeight: 1.9,
              marginBottom: 28,
            }}
          >
            {para}
          </p>
        ))}
      </section>

      {/* ── MID-ARTICLE PHOTO ── */}
      {article.images[1] && (
        <section style={{ padding: '20px 60px' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
            <Image src={article.images[1]} alt="" fill sizes="calc(100vw - 120px)" style={{ objectFit: 'cover' }} />
          </div>
        </section>
      )}

      {/* ── BODY TEXT (second half) ── */}
      <section style={{ padding: '40px 60px', maxWidth: 760, margin: '0 auto' }}>
        {bodyParagraphs.slice(midpoint).map((para, i) => (
          <p
            key={i}
            data-text-split=""
            data-lines-slide-up=""
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: 'rgba(247,243,236,0.7)',
              lineHeight: 1.9,
              marginBottom: 28,
            }}
          >
            {para}
          </p>
        ))}
      </section>

      {/* ── RELATED LISTINGS ── */}
      {(() => {
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
        return (
          <section style={{ padding: '60px 0 80px', borderTop: '1px solid rgba(247,243,236,0.06)' }}>
            <div style={{ padding: '0 60px', marginBottom: 32 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#C4943A',
                  marginBottom: 12,
                }}
              >
                From this story
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  color: '#F7F3EC',
                }}
              >
                Places mentioned
              </h3>
            </div>
            <HorizontalStrip entries={relatedItems} />
          </section>
        )
      })()}

      {/* ── READ NEXT ── */}
      {related.length > 0 && (
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
                    src={a.images[0]}
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
      )}

      <Newsletter />
      <Footer />
    </div>
  )
}
