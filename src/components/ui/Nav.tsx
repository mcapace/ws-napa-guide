'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Wineries', href: '/wineries' },
  { label: 'Regions', href: '/regions' },
  { label: 'Dining', href: '/dining' },
  { label: 'Stay', href: '/stay' },
  { label: 'Map', href: '/map' },
  { label: 'Plan', href: '/plan' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled ? 'rgba(26, 22, 18, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(196, 148, 58, 0.15)' : 'none',
      }}
    >
      <nav
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontWeight: 500,
              }}
            >
              Wine Spectator
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 300,
                color: 'var(--cream)',
                letterSpacing: '0.02em',
                lineHeight: 1,
              }}
            >
              Napa Valley Guide
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul
          style={{
            display: 'flex',
            gap: '2.5rem',
            listStyle: 'none',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--mist)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cream)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--mist)')}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="https://www.winespectator.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                background: 'var(--gold)',
                padding: '0.5rem 1.25rem',
                textDecoration: 'none',
                transition: 'background 0.2s',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--gold-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--gold)')}
            >
              Wine Spectator
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            flexDirection: 'column',
            gap: '5px',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '24px',
                height: '1px',
                background: 'var(--cream)',
                transition: 'transform 0.3s, opacity 0.3s',
                transform:
                  menuOpen && i === 0
                    ? 'rotate(45deg) translate(4px, 4px)'
                    : menuOpen && i === 2
                    ? 'rotate(-45deg) translate(4px, -4px)'
                    : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(26, 22, 18, 0.98)',
            padding: '2rem',
            borderTop: '1px solid rgba(196, 148, 58, 0.2)',
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    color: 'var(--cream)',
                    textDecoration: 'none',
                    fontWeight: 300,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
