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

/** Five preview tiles for the collapsed bento collage. */
const BENTO_INDICES = [0, 1, 2, 3, 4]

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

function GalleryTile({
  shot,
  onOpen,
}: {
  shot: PartnerGalleryShot
  onOpen: () => void
}) {
  return (
    <button type="button" className={styles.tile} onClick={onOpen} aria-label={`View larger: ${shot.alt}`}>
      <div className={styles.tileFrame}>
        <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 700px) 50vw, 25vw" className={styles.tileImage} />
        <span className={styles.tileOverlay}>
          <span className={styles.tileCategory}>{PARTNER_GALLERY_LABELS[shot.category]}</span>
          <span className={styles.tileCaption}>{shot.alt}</span>
        </span>
      </div>
    </button>
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

  const bentoShots = BENTO_INDICES.filter((i) => i < shots.length).map((i) => shots[i])

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
          {shots.length} photographs across tastings, vineyards, and the estate.
        </p>
      </div>

      {!expanded ? (
        <button
          type="button"
          className={styles.bentoButton}
          onClick={() => setExpanded(true)}
          aria-label={`Open full gallery of ${shots.length} photos`}
        >
          <div className={styles.bento}>
            {bentoShots.map((shot, index) => (
              <div key={shot.src} className={`${styles.bentoCell} ${styles[`bentoCell${index + 1}`] ?? ''}`}>
                <Image
                  src={shot.src}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 50vw, 30vw"
                  className={styles.bentoImage}
                />
              </div>
            ))}
            <span className={styles.bentoCta}>
              <span className={styles.bentoCtaLabel}>View all photos</span>
              <span className={styles.bentoCtaCount}>{shots.length}</span>
            </span>
          </div>
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            className={styles.expandedWrap}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
                  All ({shots.length})
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
                Close gallery
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
                      <GalleryTile key={shot.src} shot={shot} onOpen={() => openLightbox(shot)} />
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
