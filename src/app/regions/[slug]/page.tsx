import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DetailHero from '@/components/detail/DetailHero'
import Footer from '@/components/ui/Footer'
import Nav from '@/components/ui/Nav'
import { getRegion, getAllRegionSlugs, regions } from '@/data/regions'
import { wineries } from '@/data/wineries'
import { restaurants } from '@/data/restaurants'
import { hotels } from '@/data/hotels'
import styles from './regionDetail.module.css'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllRegionSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const region = getRegion(slug)
  if (!region) return {}
  return {
    title: `${region.name} — ${region.tagline}`,
    description: region.intro,
    openGraph: { images: [region.heroImage] },
  }
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params
  const region = getRegion(slug)
  if (!region) notFound()

  const regionWineries = wineries.filter((w) => region.winerySlugs.includes(w.slug))
  const regionRestaurants = restaurants.filter((r) => region.restaurantSlugs.includes(r.slug))
  const regionHotels = hotels.filter((h) => region.hotelSlugs.includes(h.slug))
  const neighborRegions = regions.filter((r) => region.neighborRegions.includes(r.slug))

  const badgeLines = region.name.split(' ').join('\n')

  return (
    <div className={`grain ${styles.page}`}>
      <Nav theme="ink" />

      <DetailHero
        badgeText={badgeLines}
        title={region.name}
        subtitle={region.tagline}
        heroImage={region.heroImage}
        accentColor={region.accentColor}
        breadcrumb={{ href: '/regions', label: 'All Regions' }}
        breadcrumbCurrent={region.name}
      />

      <section className={styles.pull}>
        {region.pullQuote ? <blockquote className={styles.pullQuote}>{region.pullQuote}</blockquote> : null}
        {region.author ? (
          <p className={styles.byline}>
            {region.author}
            {region.issue ? ` · ${region.issue}` : ''}
          </p>
        ) : null}
        <p className={styles.intro}>{region.intro}</p>
        <p className={styles.body}>{region.body}</p>
        <Link href={`/map?region=${region.slug}`} className={styles.mapCta}>
          Explore on the map →
        </Link>
      </section>

      {regionWineries.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>Where to taste</span>
                <h2 className={styles.sectionTitle}>The estates of {region.name}</h2>
              </div>
              <Link href="/wineries" className={styles.linkAll}>
                All wineries →
              </Link>
            </div>
            <div className={styles.grid}>
              {regionWineries.map((w) => (
                <Link key={w.slug} href={`/wineries/${w.slug}`} className={styles.card}>
                  <div className={styles.cardImg} style={{ backgroundImage: `url(${w.images[0]})` }} />
                  <div className={styles.cardBody}>
                    {w.visitInfo?.appointment !== undefined && (
                      <div className={styles.cardMeta}>
                        {w.visitInfo.appointment ? 'By appointment' : 'Walk-ins welcome'}
                        {w.address ? ` · ${w.address}` : ''}
                      </div>
                    )}
                    <h3 className={styles.cardTitle}>{w.name}</h3>
                    <p className={styles.cardExcerpt}>{w.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {regionRestaurants.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>Where to eat</span>
                <h2 className={styles.sectionTitle}>Dining in {region.name}</h2>
              </div>
              <Link href="/dining" className={styles.linkAll}>
                All restaurants →
              </Link>
            </div>
            <div className={styles.grid}>
              {regionRestaurants.map((r) => (
                <Link key={r.slug} href={`/dining/${r.slug}`} className={styles.card}>
                  <div className={styles.cardImg} style={{ backgroundImage: `url(${r.images[0]})` }} />
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      {r.cuisine} · {r.priceRange}
                    </div>
                    <h3 className={styles.cardTitle}>{r.name}</h3>
                    <p className={styles.cardExcerpt}>{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {regionHotels.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>Where to stay</span>
                <h2 className={styles.sectionTitle}>Hotels in {region.name}</h2>
              </div>
              <Link href="/stay" className={styles.linkAll}>
                All hotels →
              </Link>
            </div>
            <div className={styles.grid}>
              {regionHotels.map((h) => (
                <Link key={h.slug} href={`/stay/${h.slug}`} className={styles.card}>
                  <div className={styles.cardImg} style={{ backgroundImage: `url(${h.images[0]})` }} />
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      {h.category} · {h.priceRange}
                    </div>
                    <h3 className={styles.cardTitle}>{h.name}</h3>
                    <p className={styles.cardExcerpt}>{h.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {region.adventure && (
        <section className={`${styles.section} ${styles.adventure}`}>
          <div className={styles.sectionInner}>
            <span className={styles.eyebrow}>Adventure itinerary</span>
            <h2 className={styles.adventureTitle}>{region.adventure.title}</h2>
            <p className={styles.adventureIntro}>{region.adventure.intro}</p>
            <p className={styles.adventureBody}>{region.adventure.body}</p>
          </div>
        </section>
      )}

      {neighborRegions.length > 0 && (
        <section className={styles.neighbors}>
          <div className={styles.sectionInner}>
            <span className={styles.eyebrow}>More from Napa</span>
            <div className={styles.neighborGrid}>
              {neighborRegions.map((n) => (
                <Link key={n.slug} href={`/regions/${n.slug}`} className={styles.neighbor}>
                  {n.name}
                  <span>{n.tagline}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className={styles.ctaBar}>
        <div className={styles.ctaInner}>
          <span className={styles.ctaText}>Continue exploring the valley</span>
          <div className={styles.ctaLinks}>
            <Link href="/map">Map</Link>
            <Link href="/plan">Plan</Link>
            <Link href="/dining">Dining</Link>
            <Link href="/stay">Stay</Link>
          </div>
        </div>
      </div>

      <Footer variant="dark" />
    </div>
  )
}
