'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { NavMenuOverlay } from '@/components/ui/NavMenuOverlay'
import styles from './BottomTabBar.module.css'

type Tab = {
  label: string
  href: string
  /** Route prefixes that light this tab up */
  match: (pathname: string) => boolean
  icon: React.ReactNode
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const TABS: Tab[] = [
  {
    label: 'Home',
    href: '/',
    match: (p) => p === '/',
    icon: (
      // Wine-country estate: gabled roof, chimney, arched doorway
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M3.5 11.5 12 4l8.5 7.5" />
        <path d="M6 10v10h12V10" />
        <path d="M9.9 20v-4a2.1 2.1 0 0 1 4.2 0v4" />
        <path d="M16.6 6.9V5.2h1.9v3.4" />
      </svg>
    ),
  },
  {
    label: 'Towns',
    href: '/regions',
    match: (p) => p === '/regions' || p.startsWith('/regions/'),
    icon: (
      // Map pin holding a grape cluster
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M12 21c-4.5-3.9-6.8-7.3-6.8-10.4A6.8 6.8 0 0 1 12 3.9a6.8 6.8 0 0 1 6.8 6.7C18.8 13.7 16.5 17.1 12 21Z" />
        <circle cx="10.7" cy="9.6" r="1.15" />
        <circle cx="13.3" cy="9.6" r="1.15" />
        <circle cx="12" cy="11.9" r="1.15" />
        <path d="M12 8.4V6.9c.7-.8 1.7-1 2.5-.6" />
      </svg>
    ),
  },
  {
    label: 'Map',
    href: '/explore',
    match: (p) =>
      p.startsWith('/explore') ||
      p.startsWith('/wineries') ||
      p.startsWith('/dining') ||
      p.startsWith('/stay'),
    icon: (
      // Trifold map with a dotted route to a destination
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M9 4.3 3.7 6.3v13.4L9 17.7l6 2 5.3-2V4.3L15 6.3l-6-2Z" />
        <path d="M9 4.3v13.4" />
        <path d="M15 6.3v13.4" />
        <path d="M6.2 13.6c1.7-.8 2.2-2.7 3.9-3.1 1.8-.4 2.5 1.5 4.2 1.1" strokeDasharray="1.6 2.2" />
        <circle cx="16.6" cy="10.6" r="1.05" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Stories',
    href: '/features',
    match: (p) => p.startsWith('/features') || p.startsWith('/calendar'),
    icon: (
      // Open magazine spread with copy on both pages
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M12 6.1C10.1 4.9 7.4 4.5 4.4 5v13.1c3-.5 5.7-.1 7.6 1.2 1.9-1.3 4.6-1.7 7.6-1.2V5c-3-.5-5.7-.1-7.6 1.1Z" />
        <path d="M12 6.1v13.2" />
        <path d="M6.9 8.5c1.1-.1 2.2 0 3.1.3" />
        <path d="M6.9 11.2c1.1-.1 2.2 0 3.1.3" />
        <path d="M17.1 8.5c-1.1-.1-2.2 0-3.1.3" />
        <path d="M17.1 11.2c-1.1-.1-2.2 0-3.1.3" />
      </svg>
    ),
  },
]

/**
 * App-style bottom tab bar, phones only (hidden ≥768px alongside desktop
 * chrome). Persistent like a native tab bar; the Menu tab opens the same
 * overlay as the header hamburger.
 */
export function BottomTabBar() {
  const pathname = usePathname() ?? '/'
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className={styles.bar} aria-label="Primary">
        {TABS.map((tab) => {
          const active = tab.match(pathname)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`${styles.item} ${active ? styles.itemActive : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <span className={styles.icon}>{tab.icon}</span>
              <span className={styles.label}>{tab.label}</span>
            </Link>
          )
        })}
        <button
          type="button"
          className={`${styles.item} ${menuOpen ? styles.itemActive : ''}`}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className={styles.icon}>
            <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
              <path d="M4.5 7h15" />
              <path d="M4.5 12h9.5" />
              <path d="M4.5 17h15" />
              <circle cx="17.9" cy="12" r="1.05" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span className={styles.label}>Menu</span>
        </button>
      </nav>

      <NavMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
