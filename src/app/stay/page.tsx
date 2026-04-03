import type { Metadata } from 'next'
import Link from 'next/link'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import Footer from '@/components/ui/Footer'
import Nav from '@/components/ui/Nav'
import { getRegion } from '@/data/regions'
import { hotels } from '@/data/hotels'

export const metadata: Metadata = {
  title: 'Where to Stay in Napa — Wine Spectator Guide',
  description: 'Resorts, inns, and hillside retreats for wine-country nights.',
}

const categoryLabel: Record<string, string> = {
  resort: 'Resort',
  boutique: 'Boutique',
  inn: 'Inn',
  villa: 'Villa',
}

const sorted = [...hotels].sort((a, b) => {
  if (a.featured && !b.featured) return -1
  if (!a.featured && b.featured) return 1
  return a.name.localeCompare(b.name)
})

export default function StayIndexPage() {
  return (
    <div className={`grain ${detailStyles.page}`}>
      <Nav />

      <header className={detailStyles.indexHero}>
        <span className={detailStyles.eyebrow}>Rest</span>
        <h1 className={detailStyles.indexTitle}>Stay</h1>
        <p className={detailStyles.indexIntro}>
          LEED-platinum boutiques, Spanish hacienda inns, and pool decks made for golden hour.
        </p>
      </header>

      <section className={detailStyles.indexSection}>
        <div className={detailStyles.indexSectionInner}>
          <div className={detailStyles.grid}>
            {sorted.map((h) => {
              const region = getRegion(h.region)
              const cat = categoryLabel[h.category] ?? h.category
              return (
                <Link key={h.slug} href={`/stay/${h.slug}`} className={detailStyles.card}>
                  <div className={detailStyles.cardImg} style={{ backgroundImage: `url(${h.images[0]})` }} />
                  <div className={detailStyles.cardBody}>
                    <p className={detailStyles.cardMeta}>
                      {cat} · {h.priceRange}
                      {region ? ` · ${region.name}` : ''}
                    </p>
                    <h2 className={detailStyles.cardTitle}>{h.name}</h2>
                    <p className={detailStyles.cardExcerpt}>{h.excerpt}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
