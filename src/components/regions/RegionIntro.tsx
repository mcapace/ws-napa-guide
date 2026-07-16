import type { ReactNode } from 'react'

export function RegionIntro({
  lede,
  dek,
}: {
  lede: ReactNode
  dek?: string
}) {
  return (
    <section className="region-intro">
      <div className="region-intro__inner">
        {dek ? <p className="region-intro__dek">{dek}</p> : null}
        <div className="region-editorial-lede region-intro__lede">{lede}</div>
      </div>
    </section>
  )
}
