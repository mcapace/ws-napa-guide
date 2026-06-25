'use client'

import { useEffect } from 'react'

function findScrollableAncestor(start: Element | null): HTMLElement | null {
  let el = start instanceof HTMLElement ? start : null
  while (el) {
    if (el === document.body || el === document.documentElement) break
    const style = getComputedStyle(el)
    const overflowY = style.overflowY
    const canScroll =
      (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
      el.scrollHeight > el.clientHeight + 2
    if (canScroll) return el
    el = el.parentElement
  }
  return null
}

/**
 * On region scroll pages, forward wheel events at the edges of nested scroll
 * containers to the document so users never get stuck in list/map embed traps.
 */
export function useRegionDocumentScrollBridge(): void {
  useEffect(() => {
    if (!document.documentElement.hasAttribute('data-region-native-scroll')) return

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) return

      const target = e.target as Element | null
      if (target?.closest('.mapboxgl-canvas-container')) return

      const scrollable = findScrollableAncestor(target)
      if (!scrollable) return

      const { scrollTop, scrollHeight, clientHeight } = scrollable
      const goingDown = e.deltaY > 0
      const goingUp = e.deltaY < 0

      if (goingDown && scrollTop + clientHeight < scrollHeight - 2) return
      if (goingUp && scrollTop > 2) return

      e.preventDefault()
      window.scrollBy({ top: e.deltaY, left: 0 })
    }

    document.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () => document.removeEventListener('wheel', onWheel, { capture: true })
  }, [])
}
