import type { Metadata } from 'next'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { ExploreMapSection } from '@/components/explore/ExploreMapSection'
import { buildAllRegionPins } from '@/lib/all-region-pins'

export const metadata: Metadata = {
  title: 'Where to Stay in Napa — Wine Spectator Guide',
  description: 'Resorts, inns, and hillside retreats for wine-country nights.',
}

export default async function StayIndexPage() {
  const pins = await buildAllRegionPins()
  return (
    <div className={detailStyles.page} data-site-surface="light">

      <header className={detailStyles.indexHero}>
        <span className={detailStyles.eyebrow}>Rest</span>
        <h1 className={detailStyles.indexTitle}>Stay</h1>
        <p className={detailStyles.indexIntro}>
          LEED-platinum boutiques, Spanish hacienda inns, and pool decks made for golden hour.
        </p>
      </header>

      <ExploreMapSection pins={pins} pinnedCategory="stay" showRegionFilter={true} pageFlow />

      <Newsletter />
      <Footer />
    </div>
  )
}
