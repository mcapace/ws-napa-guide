import type { ReactNode } from 'react'

export function RegionLede({ children }: { children: ReactNode }) {
  return (
    <section className="region-intro-lede">
      <div className="region-editorial-lede region-intro-lede__inner">{children}</div>
    </section>
  )
}
