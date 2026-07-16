'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  MOSAIC_PAIR_SEQUENCE,
  MOSAIC_ROTATE_INTERVAL_MS,
  pickInitialMosaicAssets,
  pickMosaicAssetsForPanels,
  type MosaicImageAsset,
} from '@/lib/home-mosaic-images'

export function useHomeMosaicRotation(queues: MosaicImageAsset[][]) {
  const [visible, setVisible] = useState(() => pickInitialMosaicAssets(queues))
  const pairIndexRef = useRef(0)

  const advancePair = useCallback(
    (panelIndices: readonly number[]) => {
      setVisible((prev) => pickMosaicAssetsForPanels(panelIndices, prev, queues))
    },
    [queues],
  )

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileMq = window.matchMedia('(max-width: 768px)')
    if (motionMq.matches || mobileMq.matches) return

    let intervalId: number | undefined

    const stop = () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId)
        intervalId = undefined
      }
    }

    const start = () => {
      stop()
      intervalId = window.setInterval(() => {
        const pair =
          MOSAIC_PAIR_SEQUENCE[pairIndexRef.current % MOSAIC_PAIR_SEQUENCE.length]
        pairIndexRef.current += 1
        advancePair(pair)
      }, MOSAIC_ROTATE_INTERVAL_MS)
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    start()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [advancePair])

  return visible
}
