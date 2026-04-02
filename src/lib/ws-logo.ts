/**
 * Wine Spectator logo assets — /public/logos/
 *
 * | File | Use |
 * |------|-----|
 * | WS_logo__1_.png | **Only** file for UI — black art, transparent bg. Use with `filter: invert(1)` on dark backgrounds. |
 * | WSlogoWhite-stroke__2___4___1_.png | **OG / social metadata only** — has solid dark background; never import in components. |
 */

export const WS_LOGO_PRIMARY_SRC = '/logos/WS_logo__1_.png'

/** Open Graph / Twitter cards only — do not use in <Image> or <img> in the app UI. */
export const WS_LOGO_OG_STROKE_ONLY_SRC = '/logos/WSlogoWhite-stroke__2___4___1_.png'

/** Spec sizes (height px, width auto) */
export const WS_LOGO_HEIGHT = {
  nav: 24,
  footer: 20,
  videoOverlay: 32,
  detailHero: 20,
} as const
