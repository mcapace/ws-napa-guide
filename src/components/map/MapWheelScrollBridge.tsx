'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { useLenis } from '@/lib/smooth-scroll'

type MapWheelScrollBridgeProps = {
  children: ReactNode
  className?: string
}

/** Region detail pages use native document scroll for predictable map + long-form reading. */
function regionUsesNativeScroll(): boolean {
  return typeof document !== 'undefined' &&
    document.documentElement.hasAttribute('data-region-native-scroll')
}

/**
 * Mapbox captures wheel events for zoom/pan. On region embeds, forward normal wheel
 * movement to the page so users aren't stuck when the cursor is over the map.
 * Hold Ctrl/Cmd while scrolling to zoom the map (cooperativeGestures).
 */
export function MapWheelScrollBridge({ children, className }: MapWheelScrollBridgeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) return

      const scrollable = (e.target as Element | null)?.closest<HTMLElement>(
        '[data-scroll-container]',
      )
      if (scrollable && scrollable !== root) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable
        const goingDown = e.deltaY > 0
        const goingUp = e.deltaY < 0
        if (goingDown && scrollTop + clientHeight < scrollHeight - 2) return
        if (goingUp && scrollTop > 2) return
      }

      e.preventDefault()
      e.stopPropagation()

      const delta = e.deltaY
      if (regionUsesNativeScroll() || !lenis) {
        window.scrollBy({ top: delta, left: 0 })
      } else {
        lenis.scrollTo(lenis.scroll + delta, { force: true })
      }
    }

    root.addEventListener('wheel', onWheel, { passive: false })
    return () => root.removeEventListener('wheel', onWheel)
  }, [lenis])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
