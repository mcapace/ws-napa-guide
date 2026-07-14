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
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M4 11.5 12 4.5l8 7" />
        <path d="M6.5 10v9h11v-9" />
      </svg>
    ),
  },
  {
    label: 'Towns',
    href: '/regions',
    match: (p) => p === '/regions' || p.startsWith('/regions/'),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M12 21s-6.5-5.4-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.6 12 21 12 21Z" />
        <circle cx="12" cy="10.6" r="2.1" />
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
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <path d="M9 4.5 4 6.5v13l5-2 6 2 5-2v-13l-5 2-6-2Z" />
        <path d="M9 4.5v13M15 6.5v13" />
      </svg>
    ),
  },
  {
    label: 'Stories',
    href: '/features',
    match: (p) => p.startsWith('/features') || p.startsWith('/calendar'),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden {...stroke}>
        <rect x="4.5" y="4.5" width="15" height="15" rx="1.5" />
        <path d="M8 9h8M8 12.5h8M8 16h5" />
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
              <path d="M4.5 8.5h15M4.5 15.5h15" />
            </svg>
          </span>
          <span className={styles.label}>Menu</span>
        </button>
      </nav>

      <NavMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
