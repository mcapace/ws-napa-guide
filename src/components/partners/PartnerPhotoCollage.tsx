'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  PARTNER_GALLERY_LABELS,
  type PartnerGalleryCategory,
  type PartnerGalleryShot,
  partnerGalleryCategories,
} from '@/data/partner-galleries'
import styles from './PartnerPhotoCollage.module.css'

type FilterKey = 'all' | PartnerGalleryCategory

const COLLAGE_INDICES = [0, 3, 5, 8, 11, 14, 17, 20]

const COLLAGE_PLACEMENTS = [
  { left: '2%', top: '6%', width: '36%', rotate: -5, z: 2 },
  { left: '46%', top: '0%', width: '32%', rotate: 4, z: 4 },
  { left: '64%', top: '34%', width: '28%', rotate: -2.5, z: 3 },
  { left: '6%', top: '44%', width: '28%', rotate: 3, z: 5 },
  { left: '36%', top: '40%', width: '24%', rotate: -1.5, z: 1 },
  { left: '30%', top: '10%', width: '26%', rotate: 4.5, z: 2 },
  { left: '54%', top: '54%', width: '34%', rotate: -3.5, z: 6 },
  { left: '12%', top: '68%', width: '30%', rotate: 2, z: 4 },
]

function GalleryLightbox({
  shots,
  index,
  onClose,
  onSelect,
}: {
  shots: PartnerGalleryShot[]
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
      <p className={styles.lightboxCategory}>{PARTNER_GALLERY_LABELS[shot.category]}</p>
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
  shots: PartnerGalleryShot[]
  photoCredit: string
  propertyName: string
}) {
  const reduceMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(false)
  const [filter, setFilter] = useState<FilterKey>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const categories = useMemo(() => partnerGalleryCategories(shots), [shots])

  const filteredShots = useMemo(() => {
    if (filter === 'all') return shots
    return shots.filter((shot) => shot.category === filter)
  }, [filter, shots])

  const collageShots = COLLAGE_INDICES.filter((i) => i < shots.length).map((i) => ({
    shot: shots[i],
    index: i,
  }))

  const groupedShots = useMemo(() => {
    if (filter !== 'all') {
      return [{ category: filter, items: filteredShots }]
    }
    return categories.map((category) => ({
      category,
      items: shots.filter((shot) => shot.category === category),
    }))
  }, [categories, filter, filteredShots, shots])

  const openLightbox = useCallback(
    (shot: PartnerGalleryShot) => {
      const index = shots.findIndex((item) => item.src === shot.src)
      if (index >= 0) setLightboxIndex(index)
    },
    [shots],
  )

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  if (shots.length === 0) return null

  return (
    <section className={styles.section} aria-label="Photo gallery">
      <div className={styles.head}>
        <p className={styles.label}>Gallery</p>
        <h2 className={styles.title}>A look inside {propertyName}</h2>
        <p className={styles.deck}>
          {shots.length} photographs across tastings, vineyards, and the estate. Open the collage to browse
          everything — or filter by theme once expanded.
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
              {collageShots.map(({ shot }, placementIndex) => {
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
                    whileHover={reduceMotion ? undefined : { scale: 1.04, zIndex: 12 }}
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
              <span className={styles.collageOverlayTitle}>Open gallery</span>
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
              <div className={styles.filterRow} role="tablist" aria-label="Gallery filters">
                <button
                  type="button"
                  role="tab"
                  aria-selected={filter === 'all'}
                  className={`${styles.filterChip} ${filter === 'all' ? styles.filterChipActive : ''}`}
                  onClick={() => setFilter('all')}
                >
                  {PARTNER_GALLERY_LABELS.all} ({shots.length})
                </button>
                {categories.map((category) => {
                  const count = shots.filter((shot) => shot.category === category).length
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={filter === category}
                      className={`${styles.filterChip} ${filter === category ? styles.filterChipActive : ''}`}
                      onClick={() => setFilter(category)}
                    >
                      {PARTNER_GALLERY_LABELS[category]} ({count})
                    </button>
                  )
                })}
              </div>
              <button type="button" className={styles.expandedClose} onClick={() => setExpanded(false)}>
                Collapse
              </button>
            </div>

            <div className={styles.expandedBody}>
              {groupedShots.map((group) => (
                <section key={group.category} className={styles.groupSection}>
                  {filter === 'all' ? (
                    <h3 className={styles.groupTitle}>{PARTNER_GALLERY_LABELS[group.category]}</h3>
                  ) : null}
                  <div className={styles.expandedGrid}>
                    {group.items.map((shot) => (
                      <button
                        key={shot.src}
                        type="button"
                        className={styles.expandedTile}
                        onClick={() => openLightbox(shot)}
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
                </section>
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
