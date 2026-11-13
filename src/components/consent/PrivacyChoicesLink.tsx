'use client'

import type { MouseEvent, ReactNode } from 'react'
import './cookiebot'

/**
 * "Your Privacy Choices" link: reopens the Cookiebot banner so visitors can
 * change or withdraw consent. If Cookiebot has not loaded, it falls back to
 * the privacy policy page.
 */
export function PrivacyChoicesLink({
  className,
  fallbackHref,
  children = 'Your Privacy Choices',
}: {
  className?: string
  fallbackHref: string
  children?: ReactNode
}) {
  const open = (e: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window.Cookiebot?.renew !== 'function') return
    e.preventDefault()
    window.Cookiebot.renew()
  }

  return (
    <a href={fallbackHref} className={className} onClick={open}>
      {children}
    </a>
  )
}
