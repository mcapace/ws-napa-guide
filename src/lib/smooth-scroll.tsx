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

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 0.85, force: true })
    return
  }

  const top = target.getBoundingClientRect().top + window.scrollY - Math.abs(offset)
  window.scrollTo({ top, behavior: 'smooth' })
}
