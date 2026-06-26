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
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/** Sticky chrome above region jump-nav targets (staging bar + site nav + jump nav). */
export function getRegionScrollJumpOffset(extraGap = 4): number {
  if (typeof document === 'undefined') return 136

  const stagingBanner = document.querySelector<HTMLElement>('[data-staging-banner]')
  const navShell = document.querySelector<HTMLElement>('.ws-nav-shell')
  const jumpNav = document.querySelector<HTMLElement>('[data-region-jump-nav]')

  let offset = extraGap
  if (stagingBanner) offset += stagingBanner.offsetHeight
  if (navShell) offset += navShell.offsetHeight
  if (jumpNav) offset += jumpNav.offsetHeight

  return offset
}

/** Scroll a region section to sit directly below sticky site nav + jump nav. */
export function scrollToRegionSection(target: HTMLElement | null): void {
  if (!target) return

  const run = () => {
    const offset = getRegionScrollJumpOffset()
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset)
    window.scrollTo({ top, behavior: 'smooth' })
  }

  requestAnimationFrame(() => requestAnimationFrame(run))
}

export const REGION_JUMP_SECTION_EVENT = 'region-jump-section'

export function dispatchRegionJumpSection(sectionId: string): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(REGION_JUMP_SECTION_EVENT, { detail: { sectionId } }))
}

/** Scroll so `target` sits below the site nav + region tab bar (Lenis-aware). */
export function scrollToTarget(
  target: HTMLElement | null,
  lenis: Lenis | null,
  extraOffset = 8,
): void {
  if (!target) return

  if (regionUsesNativeScroll() || !lenis) {
    scrollToRegionSection(target)
    return
  }

  const offset =
    -(cssVarPx('--ws-site-header-height', 72) +
      cssVarPx('--region-tab-bar-height', 52) +
      extraOffset)

  lenis.scrollTo(target, { offset, duration: 0.85, force: true })
}
