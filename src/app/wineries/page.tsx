import type { Metadata } from 'next'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { ExploreMapSection } from '@/components/explore/ExploreMapSection'
import { mapPins } from '@/data/map-pins'

export const metadata: Metadata = {
  title: 'Napa Valley Wineries — Wine Spectator Guide',
  description: 'The essential tasting rooms and estates across Napa Valley, from Oakville to Calistoga.',
}

export default function WineriesIndexPage() {
  return (
    <div className={detailStyles.page} data-site-surface="light">

      <header className={detailStyles.indexHero}>
        <span className={detailStyles.eyebrow}>Taste</span>
        <h1 className={detailStyles.indexTitle}>Wineries</h1>
        <p className={detailStyles.indexIntro}>
          Stone cellars, hillside Cabernets, and reservation-only salons — the valley&apos;s most memorable places to taste.
        </p>
      </header>

      <ExploreMapSection pins={mapPins} pinnedCategory="winery" showRegionFilter={true} />

      <Newsletter />
      <Footer />
    </div>
  )
}
