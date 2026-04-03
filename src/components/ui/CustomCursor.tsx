'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    let x = 0
    let y = 0
    let dotX = 0
    let dotY = 0
    let raf: number

    const onMouse = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const animate = () => {
      dotX += (x - dotX) * 0.15
      dotY += (y - dotY) * 0.15
      dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouse, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={dotRef} className="cursor-dot" />
}
