'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { WS_LOGO_HEIGHT, WS_LOGO_PRIMARY_SRC } from '@/lib/ws-logo'

const navLinks = [
  { label: 'Wineries', href: '/wineries' },
  { label: 'Regions', href: '/regions' },
  { label: 'Dining', href: '/dining' },
  { label: 'Stay', href: '/stay' },
  { label: 'Map', href: '/map' },
  { label: 'Plan Your Visit', href: '/plan' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      setAtTop(window.scrollY < 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const logoInvertSolidHeader = scrolled

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled
            ? 'rgba(250,247,242,0.97)'
            : 'rgba(250,247,242,0.0)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid var(--ivory-deep)'
            : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {atTop && (
          <div
            style={{
              background: 'var(--bordeaux)',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(250,247,242,0.7)',
              }}
            >
              From the June 2026 Issue of
            </span>
            <a
              href="https://www.winespectator.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', lineHeight: 0 }}
            >
              <Image
                src={WS_LOGO_PRIMARY_SRC}
                alt="Wine Spectator"
                width={90}
                height={18}
                style={{
                  height: 18,
                  width: 'auto',
                  filter: 'none',
                  opacity: 0.95,
                }}
              />
            </a>
          </div>
        )}

        <nav
          style={{
            maxWidth: 'var(--container)',
            margin: '0 auto',
            padding: '0 2rem',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <Image
              src={WS_LOGO_PRIMARY_SRC}
              alt="Wine Spectator"
              width={Math.round(WS_LOGO_HEIGHT.nav * 4.75)}
              height={WS_LOGO_HEIGHT.nav}
              priority
              style={{
                height: WS_LOGO_HEIGHT.nav,
                width: 'auto',
                filter: logoInvertSolidHeader ? 'none' : 'invert(1)',
                transition: 'filter 0.35s ease',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: scrolled ? 'var(--bordeaux)' : 'rgba(250,247,242,0.75)',
                  fontWeight: 500,
                  transition: 'color 0.35s ease',
                }}
              >
                Napa Valley Guide
              </span>
            </div>
          </Link>

          <ul
            style={{
              display: 'flex',
              gap: '2rem',
              listStyle: 'none',
              alignItems: 'center',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://www.winespectator.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '0.55rem 1.25rem', fontSize: '0.62rem' }}
              >
                Subscribe
              </a>
            </li>
          </ul>

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
            className="mobile-btn"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: 'var(--ink)',
                  transition: 'transform 0.3s, opacity 0.3s',
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

      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--ivory)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2rem',
            gap: '0',
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '1.5rem',
              color: 'var(--ink-light)',
            }}
          >
            ×
          </button>

          <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', lineHeight: 0 }}>
            <Image
              src={WS_LOGO_PRIMARY_SRC}
              alt="Wine Spectator"
              width={100}
              height={22}
              style={{ height: 22, width: 'auto', filter: 'none' }}
            />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--bordeaux)',
              marginBottom: '2rem',
              marginTop: '3rem',
            }}
          >
            Wine Spectator — Napa Valley Guide
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
            {navLinks.map((link) => (
              <li
                key={link.href}
                style={{
                  borderBottom: '1px solid var(--ivory-deep)',
                  padding: '1.1rem 0',
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 300,
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'color 0.2s',
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
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
