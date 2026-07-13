'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FooterFacebookIcon,
  FooterInstagramIcon,
  FooterPinterestIcon,
  FooterXIcon,
  FooterYoutubeIcon,
} from './FooterSocialLucide'
import {
  navMetaLinks,
  navPrimaryLinks,
  navTownLinks,
  type SiteNavLink,
} from '@/data/site-nav'
import styles from './NavMenuOverlay.module.css'

const external = {
  target: '_blank' as const,
  rel: 'noopener noreferrer' as const,
}

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/WineSpectator/?rf=100968456611081', Icon: FooterFacebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/wine_spectator/?hl=en', Icon: FooterInstagramIcon },
  { label: 'X', href: 'https://x.com/winespectator?lang=en', Icon: FooterXIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/WineSpectatorVideo', Icon: FooterYoutubeIcon },
  { label: 'Pinterest', href: 'https://www.pinterest.com/winespectator/', Icon: FooterPinterestIcon },
] as const

function OverlayLink({
  item,
  className,
  onClose,
}: {
  item: SiteNavLink
  className: string
  onClose: () => void
}) {
  if (item.external || item.href.startsWith('http')) {
    return (
      <a href={item.href} className={className} {...external} onClick={onClose}>
        {item.label}
      </a>
    )
  }

  return (
    <Link href={item.href} className={className} onClick={onClose}>
      {item.label}
    </Link>
  )
}

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
          className={`${styles.backdrop} grain`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          onClick={onClose}
        >
          <motion.div
            className={styles.inner}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.34, ease: [0.34, 1.2, 0.64, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className={styles.header}>
              <Link href="/" className={styles.brand} onClick={onClose}>
                <span>Wine Spectator</span>
                <span className={styles.brandRule} aria-hidden="true" />
                <span>Napa Valley Guide</span>
              </Link>
              <button type="button" className={styles.closeBtn} onClick={onClose}>
                Close
              </button>
            </header>

            <div className={styles.columns}>
              <section className={styles.column}>
                <p className={styles.sectionLabel}>Towns &amp; areas</p>
                <ul className={styles.columnList}>
                  {navTownLinks.map((item) => (
                    <li key={item.href}>
                      <OverlayLink item={item} className={styles.columnLink} onClose={onClose} />
                    </li>
                  ))}
                </ul>
                <OverlayLink
                  item={{ label: 'All towns & areas', href: '/regions' }}
                  className={styles.columnLinkMuted}
                  onClose={onClose}
                />
              </section>

              <section className={styles.column}>
                <p className={styles.sectionLabel}>Explore the guide</p>
                <ul className={styles.columnList}>
                  {navPrimaryLinks.map((item) => (
                    <li key={item.href}>
                      <OverlayLink item={item} className={styles.columnLink} onClose={onClose} />
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.column}>
                <p className={styles.sectionLabel}>Wine Spectator</p>
                <ul className={styles.columnList}>
                  {navMetaLinks.map((item) => (
                    <li key={item.href}>
                      <OverlayLink item={item} className={styles.columnLink} onClose={onClose} />
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <footer className={styles.footer}>
              <p className={styles.socialLabel}>Follow Wine Spectator</p>
              <div className={styles.socialRow}>
                {socialLinks.map(({ href, label, Icon }) => (
                  <a key={href} href={href} className={styles.socialIconLink} aria-label={label} {...external}>
                    <Icon size={20} strokeWidth={1.65} aria-hidden />
                  </a>
                ))}
              </div>
            </footer>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
