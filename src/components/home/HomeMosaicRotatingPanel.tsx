'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { MOSAIC_CROSSFADE_MS, type MosaicImageAsset } from '@/lib/home-mosaic-images'

type Props = {
  asset: MosaicImageAsset
  sizes?: string
}

const FADE_MS = MOSAIC_CROSSFADE_MS / 2

export function HomeMosaicRotatingPanel({ asset, sizes = '200px' }: Props) {
  const [shown, setShown] = useState(asset)
  const [visible, setVisible] = useState(true)
  const prevSrcRef = useRef(asset.src)
  const swapTimerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (asset.src === prevSrcRef.current) return
    prevSrcRef.current = asset.src

    window.clearTimeout(swapTimerRef.current)
    setVisible(false)

    swapTimerRef.current = window.setTimeout(() => {
      setShown(asset)
      requestAnimationFrame(() => setVisible(true))
    }, FADE_MS)

    return () => window.clearTimeout(swapTimerRef.current)
  }, [asset])

  return (
    <div className="home-mosaic-panel-stack">
      <Image
        src={shown.src}
        alt=""
        fill
        sizes={sizes}
        className="home-mosaic-panel-layer is-top"
        style={{
          objectFit: 'cover',
          objectPosition: shown.objectPosition ?? 'center',
          opacity: visible ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease-in-out`,
        }}
      />
    </div>
  )
}
