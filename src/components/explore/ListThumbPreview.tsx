'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import styles from './ListThumbPreview.module.css'

const PREVIEW_W = 280
const PREVIEW_H = 210
const GAP = 14
const PAD = 12

type ListThumbPreviewProps = {
  src: string
  anchorEl: HTMLElement | null
  visible: boolean
}

export function ListThumbPreview({ src, anchorEl, visible }: ListThumbPreviewProps) {
  const [box, setBox] = useState<{ top: number; left: number } | null>(null)

  useEffect(() => {
    if (!visible || !anchorEl) {
      setBox(null)
      return
    }

    const update = () => {
      const rect = anchorEl.getBoundingClientRect()
      let left = rect.right + GAP
      let top = rect.top + rect.height / 2 - PREVIEW_H / 2

      if (left + PREVIEW_W > window.innerWidth - PAD) {
        left = rect.left - PREVIEW_W - GAP
      }
      left = Math.max(PAD, Math.min(left, window.innerWidth - PREVIEW_W - PAD))
      top = Math.max(PAD, Math.min(top, window.innerHeight - PREVIEW_H - PAD))

      setBox({ left, top })
    }

    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [visible, anchorEl])

  if (!visible || !box) return null

  return createPortal(
    <div
      className={styles.preview}
      style={{
        top: box.top,
        left: box.left,
        width: PREVIEW_W,
        height: PREVIEW_H,
      }}
      aria-hidden
    >
      <Image src={src} alt="" fill sizes="300px" className={styles.previewImg} />
    </div>,
    document.body,
  )
}
