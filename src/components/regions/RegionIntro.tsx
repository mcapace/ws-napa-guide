import type { ReactNode } from 'react'
import { RegionGuideNav, type RegionGuideNavItem } from './RegionGuideNav'

export function RegionIntro({
  lede,
  dek,
  navItems,
}: {
  lede: ReactNode
  dek?: string
  navItems: RegionGuideNavItem[]
}) {
  return (
    <section className="region-intro">
      <div className="region-intro__inner">
        {dek ? <p className="region-intro__dek">{dek}</p> : null}
        <div className="region-editorial-lede region-intro__lede">{lede}</div>
        <RegionGuideNav items={navItems} />
      </div>
    </section>
  )
}
