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

function scrollPageBy(deltaY: number): void {
  window.scrollBy({ top: deltaY, left: 0 })
}

/**
 * Split-panel region embeds trap wheel events in list/story columns. At scroll
 * edges (or over non-scrollable embed chrome), forward movement to the document
 * so users can always scroll past the map section.
 */
export function useRegionDocumentScrollBridge(): void {
  useEffect(() => {
    if (!document.documentElement.hasAttribute('data-region-native-scroll')) return

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) return

      const target = e.target as Element | null
      if (target?.closest('.mapboxgl-canvas-container')) return

      const embedPanel = target?.closest<HTMLElement>('[data-region-embed-panel]')
      const scrollable = findScrollableAncestor(target)

      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable
        const goingDown = e.deltaY > 0
        const goingUp = e.deltaY < 0

        if (goingDown && scrollTop + clientHeight < scrollHeight - 2) return
        if (goingUp && scrollTop > 2) return

        e.preventDefault()
        scrollPageBy(e.deltaY)
        return
      }

      if (embedPanel) {
        e.preventDefault()
        scrollPageBy(e.deltaY)
      }
    }

    document.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () => document.removeEventListener('wheel', onWheel, { capture: true })
  }, [])
}
