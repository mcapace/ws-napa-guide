'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useLayoutEffect } from 'react'
import { WS_LOGO_PRIMARY_SRC } from '@/lib/ws-logo'
import { useNavOverHeroImagery } from '@/hooks/useNavOverHeroImagery'
import { NavMenuOverlay } from '@/components/ui/NavMenuOverlay'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroChrome = useNavOverHeroImagery()

  /** White logo/hamburger on hero photo OR on the dark sticky bar; dark only on transparent nav over cream/light body */
  const lightOnDarkChrome = heroChrome === 'imagery' || scrolled

  const chromeClass = lightOnDarkChrome
    ? 'ws-nav--over-hero-imagery'
    : heroChrome === 'light'
      ? 'ws-nav--on-light-surface'
      : 'ws-nav--on-dark-surface'

  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`${chromeClass} ws-nav-shell`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(13, 11, 9, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(247, 243, 236, 0.06)'
            : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <nav className="ws-persistent-nav-inner ws-nav-inner">
          {/* Logo + label (left) */}
          <Link href="/" className="ws-nav-brand">
            <Image
              className="ws-nav-brand__wordmark"
              src={WS_LOGO_PRIMARY_SRC}
              alt="Wine Spectator"
              width={Math.round(36 * 4.75)}
              height={36}
              priority
              style={{
                width: 'auto',
              }}
            />
            <span className="ws-nav-brand__tagline">Napa Valley Guide</span>
          </Link>

          {/* Hamburger (right) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="ws-nav-hamburger-bar"
                style={{
                  transition: 'transform 0.3s ease, opacity 0.3s ease, background 0.28s ease, color 0.28s ease',
                  transform:
                    menuOpen && i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                    : menuOpen && i === 2 ? 'rotate(-45deg) translate(4px, -4px)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </nav>
      </header>

      <NavMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
