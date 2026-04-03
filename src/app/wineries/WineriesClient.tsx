'use client'

import { useState } from 'react'
import Link from 'next/link'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import AVAFilterBar from '@/components/ui/AVAFilterBar'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getRegion } from '@/data/regions'
import { wineries } from '@/data/wineries'

const sorted = [...wineries].sort((a, b) => {
  if (a.featured && !b.featured) return -1
  if (!a.featured && b.featured) return 1
  return a.name.localeCompare(b.name)
})

export default function WineriesClient() {
  const [activeRegion, setActiveRegion] = useState('all')

  const filtered = activeRegion === 'all'
    ? sorted
    : sorted.filter((w) => w.region === activeRegion)

  return (
    <>
      <AVAFilterBar activeRegion={activeRegion} onFilterChange={setActiveRegion} />

      <div className={detailStyles.grid}>
        {filtered.map((w, i) => {
          const region = getRegion(w.region)
          return (
            <ScrollReveal key={w.slug} delay={(i % 3) * 100}>
              <Link href={`/wineries/${w.slug}`} className={detailStyles.card}>
                <div className={detailStyles.cardImg} style={{ backgroundImage: `url(${w.images[0]})` }} />
                <div className={detailStyles.cardBody}>
                  {region ? (
                    <p className={detailStyles.cardMeta}>{region.name}</p>
                  ) : null}
                  <h2 className={detailStyles.cardTitle}>{w.name}</h2>
                  <p className={detailStyles.cardExcerpt}>{w.excerpt}</p>
                </div>
              </Link>
            </ScrollReveal>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontStyle: 'italic',
            color: 'rgba(247,243,236,0.35)',
            textAlign: 'center',
            padding: '4rem 0',
          }}
        >
          No wineries in this appellation yet
        </p>
      )}
    </>
  )
}
