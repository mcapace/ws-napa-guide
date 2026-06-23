'use client'

import { useEffect, useState } from 'react'

export type RegionGuideNavItem = {
  id: string
  label: string
}

export function RegionGuideInlineNav({ items }: { items: RegionGuideNavItem[] }) {
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
        { rootMargin: '-18% 0px -62% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    }

    return () => observers.forEach((o) => o.disconnect())
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="region-guide-inline-nav" aria-label="Guide sections">
      <ul className="region-guide-inline-nav__list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`region-guide-inline-nav__link${
                active === item.id ? ' region-guide-inline-nav__link--active' : ''
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
