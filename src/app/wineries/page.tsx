import type { Metadata } from 'next'
import Link from 'next/link'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import Footer from '@/components/ui/Footer'
import Nav from '@/components/ui/Nav'
import { getRegion } from '@/data/regions'
import { wineries } from '@/data/wineries'

export const metadata: Metadata = {
  title: 'Napa Valley Wineries — Wine Spectator Guide',
  description: 'The essential tasting rooms and estates across Napa Valley, from Oakville to Calistoga.',
}

const sorted = [...wineries].sort((a, b) => {
  if (a.featured && !b.featured) return -1
  if (!a.featured && b.featured) return 1
  return a.name.localeCompare(b.name)
})

export default function WineriesIndexPage() {
  return (
    <div className={`grain ${detailStyles.page}`}>
      <Nav theme="ink" />

      <header className={detailStyles.indexHero}>
        <span className={detailStyles.eyebrow}>Taste</span>
        <h1 className={detailStyles.indexTitle}>Wineries</h1>
        <p className={detailStyles.indexIntro}>
          Stone cellars, hillside Cabernets, and reservation-only salons — the valley’s most memorable places to taste.
        </p>
      </header>

      <section className={detailStyles.indexSection}>
        <div className={detailStyles.indexSectionInner}>
          <div className={detailStyles.grid}>
            {sorted.map((w) => {
              const region = getRegion(w.region)
              return (
                <Link key={w.slug} href={`/wineries/${w.slug}`} className={detailStyles.card}>
                  <div className={detailStyles.cardImg} style={{ backgroundImage: `url(${w.images[0]})` }} />
                  <div className={detailStyles.cardBody}>
                    {region ? (
                      <p className={detailStyles.cardMeta}>{region.name}</p>
                    ) : null}
                    <h2 className={detailStyles.cardTitle}>{w.name}</h2>
                    <p className={detailStyles.cardExcerpt}>{w.excerpt}</p>
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
