'use client'

import { useEffect, useState } from 'react'

export type RegionGuideNavItem = {
  id: string
  label: string
}

export function RegionGuideNav({ items }: { items: RegionGuideNavItem[] }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (items.length === 0) return

    const observers: IntersectionObserver[] = []

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (!el) continue

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(item.id)
          }
        },
        { rootMargin: '-20% 0px -55% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    }

    return () => observers.forEach((o) => o.disconnect())
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="region-guide-nav" aria-label="Guide sections">
      <ul className="region-guide-nav__list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`region-guide-nav__link${active === item.id ? ' region-guide-nav__link--active' : ''}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
