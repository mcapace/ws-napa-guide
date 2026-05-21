'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { MOSAIC_CROSSFADE_MS, type MosaicImageAsset } from '@/lib/home-mosaic-images'

type Props = {
  asset: MosaicImageAsset
  sizes?: string
}

function layerStyle(asset: MosaicImageAsset) {
  return {
    objectFit: 'cover' as const,
    objectPosition: asset.objectPosition ?? 'center',
    transition: `opacity ${MOSAIC_CROSSFADE_MS}ms ease-in-out`,
  }
}

export function HomeMosaicRotatingPanel({ asset, sizes = '200px' }: Props) {
  const [topSlot, setTopSlot] = useState(0)
  const [assetA, setAssetA] = useState(asset)
  const [assetB, setAssetB] = useState(asset)
  const prevSrcRef = useRef(asset.src)

  useEffect(() => {
    if (asset.src === prevSrcRef.current) return
    prevSrcRef.current = asset.src
    setTopSlot((slot) => {
      if (slot === 0) {
        setAssetB(asset)
        return 1
      }
      setAssetA(asset)
      return 0
    })
  }, [asset])

  return (
    <div className="home-mosaic-panel-stack">
      <Image
        src={assetA.src}
        alt=""
        fill
        sizes={sizes}
        className={topSlot === 0 ? 'home-mosaic-panel-layer is-top' : 'home-mosaic-panel-layer'}
        style={layerStyle(assetA)}
      />
      <Image
        src={assetB.src}
        alt=""
        fill
        sizes={sizes}
        className={topSlot === 1 ? 'home-mosaic-panel-layer is-top' : 'home-mosaic-panel-layer'}
        style={layerStyle(assetB)}
      />
    </div>
  )
}
