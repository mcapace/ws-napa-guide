import type { Metadata } from 'next'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { ExploreMapSection } from '@/components/explore/ExploreMapSection'
import { mapPins } from '@/data/map-pins'

export const metadata: Metadata = {
  title: 'Napa Valley Dining — Wine Spectator Guide',
  description: 'Grand Award rooms, bistros, and wine-country tables worth the reservation.',
}

export default function DiningIndexPage() {
  return (
    <div className={detailStyles.page} data-site-surface="light">

      <header className={detailStyles.indexHero}>
        <span className={detailStyles.eyebrow}>Eat</span>
        <h1 className={detailStyles.indexTitle}>Dining</h1>
        <p className={detailStyles.indexIntro}>
          Keller&apos;s tasting temples, steakhouse classics, and chef-driven rooms that match the wine.
        </p>
      </header>

      <ExploreMapSection pins={mapPins} pinnedCategory="dining" showRegionFilter={true} pageFlow />

      <Newsletter />
      <Footer />
    </div>
  )
}
