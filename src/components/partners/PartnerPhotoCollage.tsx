'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import styles from './PartnerPhotoCollage.module.css'

export type CollageShot = {
  src: string
  alt: string
}

const COLLAGE_INDICES = [0, 2, 4, 6, 8, 10, 12]

const COLLAGE_PLACEMENTS = [
  { left: '4%', top: '8%', width: '38%', rotate: -4.5, z: 3 },
  { left: '52%', top: '2%', width: '34%', rotate: 3.5, z: 4 },
  { left: '68%', top: '38%', width: '26%', rotate: -2, z: 2 },
  { left: '8%', top: '48%', width: '30%', rotate: 2.5, z: 5 },
  { left: '42%', top: '44%', width: '24%', rotate: -1.5, z: 1 },
  { left: '34%', top: '12%', width: '28%', rotate: 4, z: 2 },
  { left: '58%', top: '58%', width: '36%', rotate: -3, z: 6 },
]

function GalleryLightbox({
  shots,
  index,
  onClose,
  onSelect,
}: {
  shots: CollageShot[]
  index: number
  onClose: () => void
  onSelect: (index: number) => void
}) {
  const shot = shots[index]

  const prev = useCallback(() => {
    onSelect((index - 1 + shots.length) % shots.length)
  }, [index, onSelect, shots.length])

  const next = useCallback(() => {
    onSelect((index + 1) % shots.length)
  }, [index, onSelect, shots.length])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') prev()
      if (event.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [next, onClose, prev])

  return (
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Photo viewer">
      <button type="button" className={styles.lightboxBackdrop} onClick={onClose} aria-label="Close viewer" />
      <button type="button" className={styles.lightboxClose} onClick={onClose}>
        Close
      </button>
      <div className={styles.lightboxStage}>
        <button type="button" className={styles.lightboxNav} onClick={prev} aria-label="Previous photo">
          ←
        </button>
        <div className={styles.lightboxFrame}>
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="100vw"
            className={styles.lightboxImage}
            priority
          />
        </div>
        <button type="button" className={styles.lightboxNav} onClick={next} aria-label="Next photo">
          →
        </button>
      </div>
      <p className={styles.lightboxCaption}>{shot.alt}</p>
      <p className={styles.lightboxCount}>
        {index + 1} of {shots.length}
      </p>
      <div className={styles.lightboxThumbs} aria-label="Photo thumbnails">
        {shots.map((thumb, thumbIndex) => (
          <button
            key={thumb.src}
            type="button"
            className={`${styles.lightboxThumb} ${thumbIndex === index ? styles.lightboxThumbActive : ''}`}
            onClick={() => onSelect(thumbIndex)}
            aria-label={`View photo ${thumbIndex + 1}`}
            aria-current={thumbIndex === index}
          >
            <Image src={thumb.src} alt="" fill sizes="64px" className={styles.lightboxThumbImage} />
          </button>
        ))}
      </div>
    </div>
  )
}

export function PartnerPhotoCollage({
  shots,
  photoCredit,
  propertyName,
}: {
  shots: CollageShot[]
  photoCredit: string
  propertyName: string
}) {
  const reduceMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const collageShots = COLLAGE_INDICES.filter((i) => i < shots.length).map((i) => ({
    shot: shots[i],
    index: i,
  }))

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  if (shots.length === 0) return null

  return (
    <section className={styles.section} aria-label="Photo gallery">
      <div className={styles.head}>
        <p className={styles.label}>Gallery</p>
        <h2 className={styles.title}>A look inside {propertyName}</h2>
        <p className={styles.deck}>
          {shots.length} photographs from tastings, vineyards, and the estate — tap the collage to explore every
          image.
        </p>
      </div>

      {!expanded ? (
        <div className={styles.collageStage}>
          <button
            type="button"
            className={styles.collageButton}
            onClick={() => setExpanded(true)}
            aria-label={`Open full gallery of ${shots.length} photos`}
          >
            <div className={styles.collagePile}>
              {collageShots.map(({ shot, index }, placementIndex) => {
                const placement = COLLAGE_PLACEMENTS[placementIndex % COLLAGE_PLACEMENTS.length]
                return (
                  <motion.div
                    key={shot.src}
                    className={styles.collagePrint}
                    style={{
                      left: placement.left,
                      top: placement.top,
                      width: placement.width,
                      zIndex: placement.z,
                      rotate: reduceMotion ? 0 : `${placement.rotate}deg`,
                    }}
                    whileHover={reduceMotion ? undefined : { scale: 1.03, zIndex: 10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className={styles.collagePrintFrame}>
                      <Image
                        src={shot.src}
                        alt=""
                        fill
                        sizes="(max-width: 700px) 40vw, 22vw"
                        className={styles.collagePrintImage}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
            <span className={styles.collageOverlay}>
              <span className={styles.collageOverlayTitle}>View gallery</span>
              <span className={styles.collageOverlayCount}>{shots.length} photos</span>
            </span>
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            className={styles.expandedWrap}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.expandedToolbar}>
              <p className={styles.expandedCount}>{shots.length} photos</p>
              <button type="button" className={styles.expandedClose} onClick={() => setExpanded(false)}>
                Collapse gallery
              </button>
            </div>
            <div className={styles.expandedGrid}>
              {shots.map((shot, index) => (
                <button
                  key={shot.src}
                  type="button"
                  className={styles.expandedTile}
                  onClick={() => openLightbox(index)}
                  aria-label={`View larger: ${shot.alt}`}
                >
                  <div className={styles.expandedTileFrame}>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 700px) 50vw, 25vw"
                      className={styles.expandedTileImage}
                    />
                  </div>
                  <span className={styles.expandedTileCaption}>{shot.alt}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      <p className={styles.credit}>Photography · {photoCredit}</p>

      {lightboxIndex !== null ? (
        <GalleryLightbox
          shots={shots}
          index={lightboxIndex}
          onClose={closeLightbox}
          onSelect={setLightboxIndex}
        />
      ) : null}
    </section>
  )
}
