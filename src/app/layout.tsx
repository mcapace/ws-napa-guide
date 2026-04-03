import type { Metadata } from 'next'
import '@/styles/globals.css'
import { WS_LOGO_OG_STROKE_ONLY_SRC } from '@/lib/ws-logo'
import CustomCursor from '@/components/ui/CustomCursor'

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
    // Social-only asset (solid background). Never use in page components — see ws-logo.ts
    images: [WS_LOGO_OG_STROKE_ONLY_SRC],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WineSpectator',
    images: [WS_LOGO_OG_STROKE_ONLY_SRC],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="grain">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
