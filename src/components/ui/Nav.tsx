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
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
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
          {/* Logo + label (left) */}
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
                filter: 'invert(1)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.55rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(247,243,236,0.55)',
                fontWeight: 500,
              }}
            >
              Napa Valley Guide
            </span>
          </Link>

          {/* Hamburger (right) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'none',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: 'rgba(247,243,236,0.7)',
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

      {/* Fullscreen menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0d0b09',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2rem',
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
              cursor: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '1.5rem',
              color: 'rgba(247,243,236,0.4)',
            }}
          >
            &times;
          </button>

          <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', lineHeight: 0 }}>
            <Image
              src={WS_LOGO_PRIMARY_SRC}
              alt="Wine Spectator"
              width={100}
              height={22}
              style={{
                height: 22,
                width: 'auto',
                filter: 'invert(1)',
              }}
            />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
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
                  borderBottom: '1px solid rgba(247,243,236,0.08)',
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
                    color: '#f7f3ec',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'color 0.3s',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li style={{ paddingTop: '2rem' }}>
              <a
                href="https://www.winespectator.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#0d0b09',
                  background: 'var(--gold)',
                  padding: '0.7rem 1.5rem',
                  textDecoration: 'none',
                }}
              >
                Subscribe
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
