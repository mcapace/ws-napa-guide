'use client'

import { useEffect } from 'react'
import './cookiebot'

const COOKIEBOT_EVENTS = ['CookiebotOnConsentReady', 'CookiebotOnAccept', 'CookiebotOnDecline'] as const

/**
 * Loads Google Analytics (gtag.js) only once the visitor has given
 * statistics consent in the Cookiebot banner. Nothing is requested from
 * Google before that. If consent is withdrawn later, GA's own opt-out flag
 * is set so no further hits are sent for the rest of the page view.
 */
export function ConsentGatedAnalytics({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    if (!measurementId) return
    const flags = window as unknown as Record<string, unknown>
    const disableKey = `ga-disable-${measurementId}`
    let loaded = false

    const sync = () => {
      const allowed = window.Cookiebot?.consent?.statistics === true
      flags[disableKey] = !allowed
      if (!allowed || loaded) return
      loaded = true

      window.dataLayer = window.dataLayer || []
      if (!window.gtag) {
        window.gtag = function gtag() {
          // gtag.js reads the arguments object itself, not a copied array.
          window.dataLayer!.push(arguments) // eslint-disable-line prefer-rest-params
        }
      }
      window.gtag('js', new Date())
      window.gtag('config', measurementId)

      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
      document.head.appendChild(script)
    }

    sync()
    COOKIEBOT_EVENTS.forEach((name) => window.addEventListener(name, sync))
    return () => COOKIEBOT_EVENTS.forEach((name) => window.removeEventListener(name, sync))
  }, [measurementId])

  return null
}
