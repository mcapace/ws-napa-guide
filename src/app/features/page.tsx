import type { Metadata } from 'next'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { HomeStoriesSection } from '@/components/home/HomeStoriesSection'
import { getStoryArticles } from '@/data/site-stories'

export const metadata: Metadata = {
  title: 'From the Issue',
  description:
    'Magazine features from Wine Spectator\'s June 2026 Napa Valley guide — Judgment of Paris, landmarks, taco tour, and more.',
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
      <HomeStoriesSection stories={stories} showViewAll={false} />
      <Newsletter />
      <Footer />
    </div>
  )
}
