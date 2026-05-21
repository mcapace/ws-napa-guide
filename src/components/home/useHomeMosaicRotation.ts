'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  MOSAIC_ROTATE_INTERVAL_MS,
  MOSAIC_STAGGER_MS,
  pickInitialMosaicAssets,
  pickNextMosaicAsset,
  type MosaicImageAsset,
} from '@/lib/home-mosaic-images'

export function useHomeMosaicRotation(queues: MosaicImageAsset[][]) {
  const [visible, setVisible] = useState(() => pickInitialMosaicAssets(queues))

  const advancePanel = useCallback(
    (panelIndex: number) => {
      setVisible((prev) => {
        const queue = queues[panelIndex]
        if (!queue?.length) return prev
        const next = [...prev]
        next[panelIndex] = pickNextMosaicAsset(panelIndex, prev, queue)
        return next
      })
    },
    [queues]
  )

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileMq = window.matchMedia('(max-width: 768px)')
    if (motionMq.matches || mobileMq.matches) return

    const intervalIds: number[] = []
    const timeoutIds: number[] = []

    const stopAll = () => {
      intervalIds.forEach(clearInterval)
      intervalIds.length = 0
    }

    const startAll = () => {
      stopAll()
      queues.forEach((queue, panelIndex) => {
        if (queue.length < 2) return
        const timeoutId = window.setTimeout(() => {
          intervalIds.push(
            window.setInterval(
              () => advancePanel(panelIndex),
              MOSAIC_ROTATE_INTERVAL_MS
            )
          )
        }, panelIndex * MOSAIC_STAGGER_MS)
        timeoutIds.push(timeoutId)
      })
    }

    const onVisibility = () => {
      if (document.hidden) stopAll()
      else startAll()
    }

    startAll()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      timeoutIds.forEach(clearTimeout)
      stopAll()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [advancePanel, queues])

  return visible
}
