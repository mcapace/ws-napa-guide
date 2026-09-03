'use client'

import Image from 'next/image'
import { PARTNER_GALLERY_LABELS, type PartnerGalleryShot } from '@/data/partner-galleries'
import styles from './PartnerImageSpread.module.css'

type SpreadLayout = 'trio' | 'quad'

export function PartnerImageSpread({
  shots,
  label,
  layout = 'trio',
}: {
  shots: PartnerGalleryShot[]
  label?: string
  layout?: SpreadLayout
}) {
  if (shots.length === 0) return null

  const cells = layout === 'quad' ? shots.slice(0, 4) : shots.slice(0, 3)
  if (cells.length < (layout === 'quad' ? 4 : 3)) return null

  return (
    <section className={styles.spread} aria-label={label ?? 'Photo collage'}>
      {label ? <p className={styles.label}>{label}</p> : null}
      <div
        className={`${styles.grid} ${layout === 'quad' ? styles.gridQuad : styles.gridTrio}`}
        data-partner-spread
      >
        {cells.map((shot, index) => (
          <figure
            key={shot.src}
            className={`${styles.cell} ${styles[`cell${index + 1}`] ?? ''}`}
            data-partner-spread-cell
          >
            <div className={styles.frame}>
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes={
                  layout === 'quad'
                    ? '(max-width: 700px) 100vw, 25vw'
                    : index === 0
                      ? '(max-width: 700px) 100vw, 45vw'
                      : '(max-width: 700px) 50vw, 22vw'
                }
                className={styles.image}
              />
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.captionCategory}>{PARTNER_GALLERY_LABELS[shot.category]}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
