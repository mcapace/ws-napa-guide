import type { Metadata } from 'next'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import Footer from '@/components/ui/Footer'
import Nav from '@/components/ui/Nav'
import WineriesClient from './WineriesClient'

export const metadata: Metadata = {
  title: 'Napa Valley Wineries — Wine Spectator Guide',
  description: 'The essential tasting rooms and estates across Napa Valley, from Oakville to Calistoga.',
}

export default function WineriesIndexPage() {
  return (
    <div className={`grain ${detailStyles.page}`}>
      <Nav />

      <header className={detailStyles.indexHero}>
        <span className={detailStyles.eyebrow}>Taste</span>
        <h1 className={detailStyles.indexTitle}>Wineries</h1>
        <p className={detailStyles.indexIntro}>
          Stone cellars, hillside Cabernets, and reservation-only salons — the valley's most memorable places to taste.
        </p>
      </header>

      <section className={detailStyles.indexSection}>
        <div className={detailStyles.indexSectionInner}>
          <WineriesClient />
        </div>
      </section>

      <Footer />
    </div>
  )
}
