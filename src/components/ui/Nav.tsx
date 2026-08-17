'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useLayoutEffect, useEffect, useCallback } from 'react'
import { Search } from 'lucide-react'
import { WS_LOGO_PRIMARY_SRC } from '@/lib/ws-logo'
import { useSiteNavChrome } from '@/hooks/useSiteNavChrome'
import { NavMenuOverlay } from '@/components/ui/NavMenuOverlay'
import { SiteSearchOverlay } from '@/components/ui/SiteSearchOverlay'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const chrome = useSiteNavChrome()

  const chromeClass =
    chrome === 'light' ? 'ws-nav--on-light-surface' : 'ws-nav--on-dark-surface'

  const openSearch = useCallback(() => {
    setMenuOpen(false)
    setSearchOpen(true)
  }, [])

  const openMenu = useCallback(() => {
    setSearchOpen(false)
    setMenuOpen((open) => !open)
  }, [])

  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setMenuOpen(false)
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <header
        className={`${chromeClass} ws-nav-shell ${scrolled ? 'ws-nav-shell--scrolled' : ''}`}
      >
        <nav className="ws-persistent-nav-inner ws-nav-inner">
          <Link href="/" className="ws-nav-brand">
            <Image
              className="ws-nav-brand__wordmark"
              src={WS_LOGO_PRIMARY_SRC}
              alt="Wine Spectator"
              width={120}
              height={28}
              priority
              style={{ width: 'auto' }}
            />
            <span className="ws-nav-brand__tagline">Napa Valley Guide</span>
          </Link>

          <div className="ws-nav-actions">
            <button
              type="button"
              className="ws-nav-toolbar-icon"
              aria-label="Search the guide"
              aria-keyshortcuts="Meta+K Control+K"
              onClick={openSearch}
            >
              <Search size={20} strokeWidth={1.75} aria-hidden />
            </button>

            <button
              onClick={openMenu}
              type="button"
              aria-label="Toggle menu"
              className="ws-nav-menu-btn"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="ws-nav-hamburger-bar"
                  style={{
                    transform:
                      menuOpen && i === 0 ? 'rotate(45deg) translate(3px, 3px)'
                      : menuOpen && i === 2 ? 'rotate(-45deg) translate(3px, -3px)'
                      : 'none',
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>

      <NavMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SiteSearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
