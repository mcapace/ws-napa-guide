import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DetailHero from '@/components/detail/DetailHero'
import Footer from '@/components/ui/Footer'
import Nav from '@/components/ui/Nav'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import { getRegion } from '@/data/regions'
import { hotels } from '@/data/hotels'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return hotels.map((h) => ({ slug: h.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const h = hotels.find((x) => x.slug === slug)
  if (!h) return {}
  return {
    title: `${h.name} — Where to Stay in Napa`,
    description: h.excerpt,
    openGraph: { images: h.images },
  }
}

const categoryLabel: Record<string, string> = {
  resort: 'Resort',
  boutique: 'Boutique hotel',
  inn: 'Country inn',
  villa: 'Private villa',
}

export default async function HotelDetailPage({ params }: Props) {
  const { slug } = await params
  const place = hotels.find((x) => x.slug === slug)
  if (!place) notFound()

  const region = getRegion(place.region)
  const badgeText = (region?.name ?? 'Napa Valley').split(' ').join('\n')
  const more = hotels.filter((x) => x.region === place.region && x.slug !== place.slug).slice(0, 4)
  const gallery = [...place.images, ...place.images, ...place.images].slice(0, 3)
  const cat = categoryLabel[place.category] ?? place.category

  return (
    <div className={`grain ${detailStyles.page}`}>
      <Nav theme="ink" />

      <DetailHero
        badgeText={badgeText}
        title={place.name}
        subtitle={`${cat} · ${place.priceRange}`}
        heroImage={place.images[0]}
        accentColor={region?.accentColor ?? '#1c2e12'}
        breadcrumb={{ href: '/stay', label: 'Stay' }}
        breadcrumbCurrent={place.name}
      />

      <section className={detailStyles.pull}>
        <blockquote className={detailStyles.pullQuote} style={{ color: '#f7f3ec' }}>
          {place.excerpt}
        </blockquote>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {place.website ? (
            <a href={place.website} target="_blank" rel="noopener noreferrer" className={detailStyles.mapCta}>
              Book / visit →
            </a>
          ) : null}
          <Link
            href={`/map?type=hotel&focus=${place.slug}`}
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
          {place.description}
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
          {place.address && (
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
              {place.address}
            </p>
          )}
          {place.rooms != null && (
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
                Rooms
              </strong>
              <br />
              {place.rooms}
            </p>
          )}
          {place.website && (
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
              <a href={place.website} target="_blank" rel="noopener noreferrer" style={{ color: '#c4943a' }}>
                {place.website.replace(/^https?:\/\//, '')}
              </a>
            </p>
          )}
          {place.amenities && place.amenities.length > 0 && (
            <p style={{ margin: 0 }}>
              <strong
                style={{
                  color: 'rgba(247,243,236,0.45)',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontSize: '0.65rem',
                }}
              >
                Amenities
              </strong>
              <br />
              {place.amenities.join(' · ')}
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
              <Link href={`/regions/${place.region}`} className={detailStyles.linkAll}>
                Region guide →
              </Link>
            </div>
            <div className={detailStyles.grid}>
              {more.map((x) => (
                <Link key={x.slug} href={`/stay/${x.slug}`} className={detailStyles.card}>
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
