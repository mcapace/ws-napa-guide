import type { Metadata } from 'next'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { HomeStoriesSection } from '@/components/home/HomeStoriesSection'
import { getStoryArticles } from '@/data/site-stories'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Wine Spectator Napa Valley guide features — The Judgement of Paris tasting and the Napa Valley taco tour.',
}

export default function FeaturesIndexPage() {
  const stories = getStoryArticles()

  return (
    <div
      data-site-surface="dark"
      style={{
        background: '#0D0B09',
        minHeight: '100vh',
        paddingTop: 'calc(var(--ws-site-header-height, 72px) + 8px)',
      }}
    >
      <HomeStoriesSection
        stories={stories}
        title="Features"
        intro="The Judgement of Paris tasting and a valley-wide taco tour — online exclusives from Wine Spectator."
      />
      <Newsletter />
      <Footer />
    </div>
  )
}
