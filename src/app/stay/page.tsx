import type { Metadata } from 'next'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import Footer from '@/components/ui/Footer'
import Nav from '@/components/ui/Nav'
import StayClient from './StayClient'

export const metadata: Metadata = {
  title: 'Where to Stay in Napa — Wine Spectator Guide',
  description: 'Resorts, inns, and hillside retreats for wine-country nights.',
}

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
          <StayClient />
        </div>
      </section>

      <Footer />
    </div>
  )
}
