'use client'

import { createContext, useContext } from 'react'
import type Lenis from 'lenis'

export const LenisContext = createContext<Lenis | null>(null)

export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}

function cssVarPx(name: string, fallback: number): number {
  if (typeof document === 'undefined') return fallback
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : fallback
}

function regionUsesNativeScroll(): boolean {
  return typeof document !== 'undefined' &&
    document.documentElement.hasAttribute('data-region-native-scroll')
}

/**
 * Region scroll pages use native document scroll (long panels, sticky map, itinerary).
 * Do not call lenis.stop() — it sets overflow:hidden and preventDefault on wheel.
 */
export function enableRegionNativeScroll(lenis: Lenis | null): () => void {
  if (typeof document === 'undefined') return () => {}

  document.documentElement.setAttribute('data-region-native-scroll', '')

  let prevSmoothWheel: boolean | undefined
  if (lenis) {
    prevSmoothWheel = lenis.options.smoothWheel
    lenis.options.smoothWheel = false
    if (lenis.isStopped) lenis.start()
  }

  return () => {
    document.documentElement.removeAttribute('data-region-native-scroll')
    if (lenis && prevSmoothWheel !== undefined) {
      lenis.options.smoothWheel = prevSmoothWheel
    }
  }
}

/** Reset document scroll (Lenis-aware). Use on route changes so new pages open at the top. */
export function resetScrollToTop(lenis: Lenis | null): void {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true })
  }
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/** Scroll so `target` sits below the site nav + region tab bar (Lenis-aware). */
export function scrollToTarget(
  target: HTMLElement | null,
  lenis: Lenis | null,
  extraOffset = 8,
): void {
  if (!target) return

  const offset =
    -(cssVarPx('--ws-site-header-height', 72) +
      cssVarPx('--region-tab-bar-height', 52) +
      extraOffset)

  if (regionUsesNativeScroll() || !lenis) {
    const top = Math.max(
      0,
      target.getBoundingClientRect().top + window.scrollY + offset,
    )
    window.scrollTo({ top, behavior: 'smooth' })
    return
  }

  lenis.scrollTo(target, { offset, duration: 0.85, force: true })
}
