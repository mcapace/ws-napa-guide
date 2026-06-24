import type { Metadata } from 'next'
import Script from 'next/script'
import '@/styles/globals.css'
import { WS_LOGO_OG_STROKE_ONLY_SRC } from '@/lib/ws-logo'
import AnimationProvider from '@/components/ui/AnimationProvider'
import Nav from '@/components/ui/Nav'
import { getSiteUrl } from '@/lib/site-url'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: '/',
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
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()
  const shouldLoadGA = process.env.NODE_ENV === 'production' && Boolean(gaMeasurementId)

  return (
    <html lang="en" className="grain">
      <body>
        <AnimationProvider />
        <Nav />
        {shouldLoadGA ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaMeasurementId}');
      `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  )
}
