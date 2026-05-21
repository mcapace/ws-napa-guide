'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { MOSAIC_CROSSFADE_MS } from '@/lib/home-mosaic-images'

type Props = {
  queue: readonly string[]
  intervalMs: number
  startDelayMs?: number
  sizes?: string
}

export function HomeMosaicRotatingPanel({
  queue,
  intervalMs,
  startDelayMs = 0,
  sizes = '200px',
}: Props) {
  const [topSlot, setTopSlot] = useState(0)
  const [srcA, setSrcA] = useState(queue[0])
  const [srcB, setSrcB] = useState(queue[1] ?? queue[0])
  const indexRef = useRef(0)

  const advance = useCallback(() => {
    if (queue.length < 2) return
    const nextIndex = (indexRef.current + 1) % queue.length
    indexRef.current = nextIndex
    const nextSrc = queue[nextIndex]
    setTopSlot((slot) => {
      if (slot === 0) {
        setSrcB(nextSrc)
        return 1
      }
      setSrcA(nextSrc)
      return 0
    })
  }, [queue])

  useEffect(() => {
    if (queue.length < 2) return

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileMq = window.matchMedia('(max-width: 768px)')
    if (motionMq.matches || mobileMq.matches) return

    let intervalId: ReturnType<typeof setInterval> | undefined

    const start = () => {
      if (intervalId) return
      intervalId = setInterval(advance, intervalMs)
    }

    const stop = () => {
      if (!intervalId) return
      clearInterval(intervalId)
      intervalId = undefined
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    const delayId = window.setTimeout(() => {
      start()
      document.addEventListener('visibilitychange', onVisibility)
    }, startDelayMs)

    return () => {
      clearTimeout(delayId)
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [advance, intervalMs, startDelayMs, queue.length])

  const fade = { transition: `opacity ${MOSAIC_CROSSFADE_MS}ms ease-in-out` }

  return (
    <div className="home-mosaic-panel-stack">
      <Image
        src={srcA}
        alt=""
        fill
        sizes={sizes}
        className={topSlot === 0 ? 'home-mosaic-panel-layer is-top' : 'home-mosaic-panel-layer'}
        style={{ objectFit: 'cover', objectPosition: 'center', ...fade }}
      />
      <Image
        src={srcB}
        alt=""
        fill
        sizes={sizes}
        className={topSlot === 1 ? 'home-mosaic-panel-layer is-top' : 'home-mosaic-panel-layer'}
        style={{ objectFit: 'cover', objectPosition: 'center', ...fade }}
      />
    </div>
  )
}
