import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Napa Valley | Wine Spectator\'s Ultimate Guide',
    template: '%s | Napa Valley Guide — Wine Spectator',
  },
  description:
    'Wine Spectator\'s definitive guide to Napa Valley — the landmark wineries, essential restaurants, best hotels, and insider knowledge from America\'s most trusted wine authority.',
  keywords: ['Napa Valley', 'wine', 'wineries', 'Cabernet Sauvignon', 'Wine Spectator', 'travel', 'dining'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Wine Spectator Napa Valley Guide',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WineSpectator',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="grain">
      <body>{children}</body>
    </html>
  )
}
