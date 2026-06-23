'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  FooterFacebookIcon,
  FooterInstagramIcon,
  FooterPinterestIcon,
  FooterXIcon,
  FooterYoutubeIcon,
} from './FooterSocialLucide'
import styles from './NavMenuOverlay.module.css'

const external = {
  target: '_blank' as const,
  rel: 'noopener noreferrer' as const,
}

const primaryLinks = [
  { label: 'Regions', href: '/regions' },
  { label: 'Features', href: '/features/napa-valley-guide' },
  { label: 'Search', href: 'https://www.winespectator.com/search' },
]

const secondaryLinks = [
  { label: 'Wineries', href: '/wineries' },
  { label: 'Dining', href: '/dining' },
  { label: 'Stay', href: '/stay' },
  { label: 'Map', href: '/map' },
]

const metaLinks = [
  { label: 'About this Guide', href: '/plan' },
  { label: 'WineSpectator.com', href: 'https://www.winespectator.com' },
]

const socialLinks: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/WineSpectator/?rf=100968456611081', Icon: FooterFacebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/wine_spectator/?hl=en', Icon: FooterInstagramIcon },
  { label: 'X', href: 'https://x.com/winespectator?lang=en', Icon: FooterXIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/WineSpectatorVideo', Icon: FooterYoutubeIcon },
  { label: 'Pinterest', href: 'https://www.pinterest.com/winespectator/', Icon: FooterPinterestIcon },
]

export type NavMenuOverlayProps = {
  open: boolean
  onClose: () => void
}

export function NavMenuOverlay({ open, onClose }: NavMenuOverlayProps) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          onClick={onClose}
        >
          <motion.div
            className={styles.inner}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
              <X size={28} strokeWidth={1.5} aria-hidden />
            </button>

            <ul className={styles.primaryList}>
              {primaryLinks.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                >
                  {item.href.startsWith('http') ? (
                    <a href={item.href} className={styles.primaryLink} {...external} onClick={onClose}>
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={styles.primaryLink} onClick={onClose}>
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>

            <div className={styles.secondarySection}>
              <p className={styles.sectionLabel}>Explore</p>
              <ul className={styles.secondaryGrid}>
                {secondaryLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.secondaryLink} onClick={onClose}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.metaSection}>
              <p className={styles.sectionLabel}>More</p>
              <ul className={styles.metaList}>
                {metaLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={styles.metaLink} {...external} onClick={onClose}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.socialBlock}>
              <p className={styles.socialLabel}>Follow Wine Spectator</p>
              <div className={styles.socialRow}>
                {socialLinks.map(({ href, label, Icon }) => (
                  <a key={href} href={href} className={styles.socialIconLink} aria-label={label} {...external}>
                    <Icon size={22} strokeWidth={1.65} aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
