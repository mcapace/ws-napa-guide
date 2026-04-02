import type { Metadata } from 'next'
import Link from 'next/link'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import Footer from '@/components/ui/Footer'
import Nav from '@/components/ui/Nav'
import { getRegion } from '@/data/regions'
import { restaurants } from '@/data/restaurants'

export const metadata: Metadata = {
  title: 'Napa Valley Dining — Wine Spectator Guide',
  description: 'Grand Award rooms, bistros, and wine-country tables worth the reservation.',
}

const sorted = [...restaurants].sort((a, b) => {
  if (a.featured && !b.featured) return -1
  if (!a.featured && b.featured) return 1
  return a.name.localeCompare(b.name)
})

export default function DiningIndexPage() {
  return (
    <div className={`grain ${detailStyles.page}`}>
      <Nav theme="ink" />

      <header className={detailStyles.indexHero}>
        <span className={detailStyles.eyebrow}>Eat</span>
        <h1 className={detailStyles.indexTitle}>Dining</h1>
        <p className={detailStyles.indexIntro}>
          Keller’s tasting temples, steakhouse classics, and chef-driven rooms that match the wine.
        </p>
      </header>

      <section className={detailStyles.indexSection}>
        <div className={detailStyles.indexSectionInner}>
          <div className={detailStyles.grid}>
            {sorted.map((r) => {
              const region = getRegion(r.region)
              return (
                <Link key={r.slug} href={`/dining/${r.slug}`} className={detailStyles.card}>
                  <div className={detailStyles.cardImg} style={{ backgroundImage: `url(${r.images[0]})` }} />
                  <div className={detailStyles.cardBody}>
                    <p className={detailStyles.cardMeta}>
                      {r.cuisine} · {r.priceRange}
                      {region ? ` · ${region.name}` : ''}
                    </p>
                    <h2 className={detailStyles.cardTitle}>{r.name}</h2>
                    <p className={detailStyles.cardExcerpt}>{r.excerpt}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  )
}
