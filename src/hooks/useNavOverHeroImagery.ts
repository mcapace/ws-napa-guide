'use client'

import { useCallback, useLayoutEffect, useState } from 'react'

const HERO_SELECTOR = '.region-editorial-hero, [data-nav-hero-root]'

function getHeroBottomY(): number | null {
  const el = document.querySelector(HERO_SELECTOR)
  if (!el) return null
  const rect = el.getBoundingClientRect()
  return window.scrollY + rect.bottom
}

function getSurfaceAfterHero(): 'light' | 'dark' {
  const surface = document.querySelector('[data-site-surface]')?.getAttribute('data-site-surface')
  if (surface === 'light') return 'light'
  if (surface === 'dark') return 'dark'
  if (document.querySelector('.region-editorial-hero')) return 'light'
  return 'dark'
}

export type NavHeroChrome = 'imagery' | 'light' | 'dark'

export function useNavOverHeroImagery(): NavHeroChrome {
  const [mode, setMode] = useState<NavHeroChrome>('dark')

  const update = useCallback(() => {
    const bottom = getHeroBottomY()
    if (bottom === null) {
      setMode(getSurfaceAfterHero())
      return
    }
    if (window.scrollY < bottom) {
      setMode('imagery')
      return
    }
    setMode(getSurfaceAfterHero())
  }, [])

  useLayoutEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        update()
      })
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [update])

  return mode
}
