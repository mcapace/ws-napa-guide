import Link from 'next/link'
import WsMark from '@/components/ui/WsMark'
import { WS_LOGO_HEIGHT } from '@/lib/ws-logo'
import styles from './Footer.module.css'

const footerLinks = [
  { label: 'Map', href: '/map' },
  { label: 'Wineries', href: '/wineries' },
  { label: 'Dining', href: '/dining' },
  { label: 'Stay', href: '/stay' },
  { label: 'Plan', href: '/plan' },
]

export default function Footer() {
  return (
    <footer className={styles.footerDark}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logoLink} aria-label="Wine Spectator Napa Valley Guide home">
            <WsMark
              height={WS_LOGO_HEIGHT.footer}
              opacity={0.7}
              invert
            />
          </Link>
          <p className={styles.brandText}>
            Napa Valley Guide
            <br />
            <br />&copy; {new Date().getFullYear()} M. Shanken Communications, Inc.
            <br />
            All rights reserved.
          </p>
        </div>
        <nav className={styles.nav} aria-label="Footer">
          {footerLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navLinkDark}>
              {l.label}
            </Link>
          ))}
        </nav>
        <p className={styles.legalDark}>
          This guide is a companion to the
          <br />
          June 2026 issue of Wine Spectator.
          <br />
          Sponsor placements are clearly disclosed.
        </p>
      </div>
    </footer>
  )
}
