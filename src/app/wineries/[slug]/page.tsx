import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DetailHero from '@/components/detail/DetailHero'
import Footer from '@/components/ui/Footer'
import Nav from '@/components/ui/Nav'
import { wineries } from '@/data/wineries'
import { getRegion } from '@/data/regions'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return wineries.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const winery = wineries.find((w) => w.slug === slug)
  if (!winery) return {}
  return {
    title: `${winery.name} — Napa Valley Wineries`,
    description: winery.excerpt,
    openGraph: { images: winery.images },
  }
}

export default async function WineryDetailPage({ params }: Props) {
  const { slug } = await params
  const winery = wineries.find((w) => w.slug === slug)
  if (!winery) notFound()

  const region = getRegion(winery.region)
  const badgeText = (region?.name ?? 'Napa Valley').split(' ').join('\n')
  const more = wineries.filter((w) => w.region === winery.region && w.slug !== winery.slug).slice(0, 4)

  const gallery = [...winery.images, ...winery.images, ...winery.images].slice(0, 3)

  return (
    <div className={`grain ${detailStyles.page}`}>
      <Nav theme="ink" />

      <DetailHero
        badgeText={badgeText}
        title={winery.name}
        subtitle={region ? `${region.name}` : undefined}
        heroImage={winery.images[0]}
        accentColor={region?.accentColor ?? '#1c2e12'}
        breadcrumb={{ href: '/wineries', label: 'Wineries' }}
        breadcrumbCurrent={winery.name}
      />

      <section className={detailStyles.pull}>
        <blockquote className={detailStyles.pullQuote} style={{ color: '#f7f3ec' }}>
          {winery.excerpt}
        </blockquote>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {winery.visitInfo?.website ? (
            <a
              href={winery.visitInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className={detailStyles.mapCta}
            >
              Reserve a visit →
            </a>
          ) : null}
          <Link
            href={`/map?type=winery&focus=${winery.slug}`}
            className={detailStyles.mapCta}
            style={{ borderColor: 'rgba(247,243,236,0.12)' }}
          >
            Explore the map →
          </Link>
        </div>
      </section>

      <section className={detailStyles.section} style={{ paddingTop: 0 }}>
        <div className={detailStyles.sectionInner}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'rgba(247,243,236,0.06)' }}>
            {gallery.map((src, i) => (
              <div
                key={`${src}-${i}`}
                style={{
                  aspectRatio: '4/3',
                  background: '#2a2520',
                  backgroundImage: `url(${src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={detailStyles.pull}>
        <p className={detailStyles.body} style={{ color: 'rgba(247,243,236,0.65)' }}>
          {winery.description}
        </p>
        <div
          style={{
            marginTop: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(247,243,236,0.1)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem',
            lineHeight: 1.85,
            color: 'rgba(247,243,236,0.5)',
          }}
        >
          {winery.address && (
            <p style={{ margin: '0 0 0.75rem' }}>
              <strong style={{ color: 'rgba(247,243,236,0.45)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.65rem' }}>Address</strong>
              <br />
              {winery.address}
            </p>
          )}
          {winery.visitInfo?.website && (
            <p style={{ margin: '0 0 0.75rem' }}>
              <strong style={{ color: 'rgba(247,243,236,0.45)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.65rem' }}>Website</strong>
              <br />
              <a href={winery.visitInfo.website} target="_blank" rel="noopener noreferrer" style={{ color: '#c4943a' }}>
                {winery.visitInfo.website.replace(/^https?:\/\//, '')}
              </a>
            </p>
          )}
          {winery.visitInfo?.hours && (
            <p style={{ margin: '0 0 0.75rem' }}>
              <strong style={{ color: 'rgba(247,243,236,0.45)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.65rem' }}>Hours</strong>
              <br />
              {winery.visitInfo.hours}
            </p>
          )}
          {winery.visitInfo?.appointment !== undefined && (
            <p style={{ margin: 0 }}>
              <strong style={{ color: 'rgba(247,243,236,0.45)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.65rem' }}>Visits</strong>
              <br />
              {winery.visitInfo.appointment ? 'By appointment' : 'Walk-ins welcome'}
            </p>
          )}
        </div>
      </section>

      {more.length > 0 && (
        <section className={detailStyles.section}>
          <div className={detailStyles.sectionInner}>
            <div className={detailStyles.sectionHead}>
              <div>
                <span className={detailStyles.eyebrow}>More from the region</span>
                <h2 className={detailStyles.sectionTitle}>{region?.name ?? 'Napa Valley'}</h2>
              </div>
              <Link href={`/regions/${winery.region}`} className={detailStyles.linkAll}>
                Region guide →
              </Link>
            </div>
            <div className={detailStyles.grid}>
              {more.map((w) => (
                <Link key={w.slug} href={`/wineries/${w.slug}`} className={detailStyles.card}>
                  <div className={detailStyles.cardImg} style={{ backgroundImage: `url(${w.images[0]})` }} />
                  <div className={detailStyles.cardBody}>
                    <h3 className={detailStyles.cardTitle}>{w.name}</h3>
                    <p className={detailStyles.cardExcerpt}>{w.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer variant="dark" />
    </div>
  )
}
