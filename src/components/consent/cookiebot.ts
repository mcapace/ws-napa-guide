/*
 * Cookiebot (the cookie consent banner used across Wine Spectator sites).
 * The IDs and the region list match the Cookiebot tag in the
 * winespectator.com Tag Manager container (GTM-T7T9M4), so this guide
 * shows the same banner, with the same rules, as the main site.
 */

/** Main Wine Spectator Cookiebot domain group (opt-in banner). */
export const COOKIEBOT_CBID = 'e7a91bbd-585c-41a6-affc-7ff4ae184c80'

/** Opt-out domain group, served to visitors in the states listed below. */
export const COOKIEBOT_OPT_OUT_CBID = 'cfc2698b-15b6-4be6-b6f5-76e192cee055'

/** US states (FIPS codes) that get the opt-out banner; everyone else gets the main one. */
export const COOKIEBOT_OPT_OUT_REGIONS =
  'US-01, US-02, US-04, US-05, US-08, US-09, US-10, US-11, US-13, US-15, US-16, US-18, US-19, US-20, US-21, US-22, US-23, US-25, US-27, US-28, US-29, US-31, US-32, US-34, US-35, US-36, US-37, US-38, US-39, US-40, US-41, US-44, US-45, US-46, US-47, US-48, US-49, US-50, US-51, US-53, US-54, US-55, US-56'

/** Value for the uc.js data-georegions attribute. */
export const COOKIEBOT_GEOREGIONS = `{'region':'${COOKIEBOT_OPT_OUT_REGIONS}','cbid':'${COOKIEBOT_OPT_OUT_CBID}'}`

export type CookiebotApi = {
  consent?: { necessary?: boolean; preferences?: boolean; statistics?: boolean; marketing?: boolean }
  renew?: () => void
}

declare global {
  interface Window {
    Cookiebot?: CookiebotApi
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}
