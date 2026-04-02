import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DetailHero from '@/components/detail/DetailHero'
import Footer from '@/components/ui/Footer'
import Nav from '@/components/ui/Nav'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import { getRegion } from '@/data/regions'
import { restaurants } from '@/data/restaurants'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return restaurants.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const r = restaurants.find((x) => x.slug === slug)
  if (!r) return {}
  return {
    title: `${r.name} — Napa Valley Dining`,
    description: r.excerpt,
    openGraph: { images: r.images },
  }
}

export default async function RestaurantDetailPage({ params }: Props) {
  const { slug } = await params
  const venue = restaurants.find((x) => x.slug === slug)
  if (!venue) notFound()

  const region = getRegion(venue.region)
  const badgeText = (region?.name ?? 'Napa Valley').split(' ').join('\n')
  const more = restaurants.filter((x) => x.region === venue.region && x.slug !== venue.slug).slice(0, 4)
  const gallery = [...venue.images, ...venue.images, ...venue.images].slice(0, 3)

  return (
    <div className={`grain ${detailStyles.page}`}>
      <Nav theme="ink" />

      <DetailHero
        badgeText={badgeText}
        title={venue.name}
        subtitle={`${venue.cuisine} · ${venue.priceRange}`}
        heroImage={venue.images[0]}
        accentColor={region?.accentColor ?? '#1c2e12'}
        breadcrumb={{ href: '/dining', label: 'Dining' }}
        breadcrumbCurrent={venue.name}
      />

      <section className={detailStyles.pull}>
        <blockquote className={detailStyles.pullQuote} style={{ color: '#f7f3ec' }}>
          {venue.excerpt}
        </blockquote>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {venue.reservations ? (
            <a
              href={venue.reservations}
              target="_blank"
              rel="noopener noreferrer"
              className={detailStyles.mapCta}
            >
              Reservations →
            </a>
          ) : venue.website ? (
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className={detailStyles.mapCta}
            >
              Website →
            </a>
          ) : null}
          <Link
            href={`/map?type=restaurant&focus=${venue.slug}`}
            className={detailStyles.mapCta}
            style={{ borderColor: 'rgba(247,243,236,0.12)' }}
          >
            Explore the map →
          </Link>
        </div>
      </section>

      <section className={detailStyles.section} style={{ paddingTop: 0 }}>
        <div className={detailStyles.sectionInner}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2px',
              background: 'rgba(247,243,236,0.06)',
            }}
          >
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
          {venue.description}
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
          {venue.chefName && (
            <p style={{ margin: '0 0 0.75rem' }}>
              <strong
                style={{
                  color: 'rgba(247,243,236,0.45)',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontSize: '0.65rem',
                }}
              >
                Chef
              </strong>
              <br />
              {venue.chefName}
            </p>
          )}
          {venue.address && (
            <p style={{ margin: '0 0 0.75rem' }}>
              <strong
                style={{
                  color: 'rgba(247,243,236,0.45)',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontSize: '0.65rem',
                }}
              >
                Address
              </strong>
              <br />
              {venue.address}
            </p>
          )}
          {venue.website && (
            <p style={{ margin: '0 0 0.75rem' }}>
              <strong
                style={{
                  color: 'rgba(247,243,236,0.45)',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontSize: '0.65rem',
                }}
              >
                Website
              </strong>
              <br />
              <a href={venue.website} target="_blank" rel="noopener noreferrer" style={{ color: '#c4943a' }}>
                {venue.website.replace(/^https?:\/\//, '')}
              </a>
            </p>
          )}
        </div>
      </section>

      {more.length > 0 && (
        <section className={detailStyles.section}>
          <div className={detailStyles.sectionInner}>
            <div className={detailStyles.sectionHead}>
              <div>
                <span className={detailStyles.eyebrow}>More nearby</span>
                <h2 className={detailStyles.sectionTitle}>{region?.name ?? 'Napa Valley'}</h2>
              </div>
              <Link href={`/regions/${venue.region}`} className={detailStyles.linkAll}>
                Region guide →
              </Link>
            </div>
            <div className={detailStyles.grid}>
              {more.map((x) => (
                <Link key={x.slug} href={`/dining/${x.slug}`} className={detailStyles.card}>
                  <div className={detailStyles.cardImg} style={{ backgroundImage: `url(${x.images[0]})` }} />
                  <div className={detailStyles.cardBody}>
                    <h3 className={detailStyles.cardTitle}>{x.name}</h3>
                    <p className={detailStyles.cardExcerpt}>{x.excerpt}</p>
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
