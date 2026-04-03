import type { Metadata } from 'next'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import Footer from '@/components/ui/Footer'
import Nav from '@/components/ui/Nav'
import DiningClient from './DiningClient'

export const metadata: Metadata = {
  title: 'Napa Valley Dining — Wine Spectator Guide',
  description: 'Grand Award rooms, bistros, and wine-country tables worth the reservation.',
}

export default function DiningIndexPage() {
  return (
    <div className={`grain ${detailStyles.page}`}>
      <Nav />

      <header className={detailStyles.indexHero}>
        <span className={detailStyles.eyebrow}>Eat</span>
        <h1 className={detailStyles.indexTitle}>Dining</h1>
        <p className={detailStyles.indexIntro}>
          Keller's tasting temples, steakhouse classics, and chef-driven rooms that match the wine.
        </p>
      </header>

      <section className={detailStyles.indexSection}>
        <div className={detailStyles.indexSectionInner}>
          <DiningClient />
        </div>
      </section>

      <Footer />
    </div>
  )
}
