'use client'

import { useState } from 'react'
import Link from 'next/link'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import AVAFilterBar from '@/components/ui/AVAFilterBar'
import { getRegion } from '@/data/regions'
import { restaurants } from '@/data/restaurants'

const sorted = [...restaurants].sort((a, b) => {
  if (a.featured && !b.featured) return -1
  if (!a.featured && b.featured) return 1
  return a.name.localeCompare(b.name)
})

export default function DiningClient() {
  const [activeRegion, setActiveRegion] = useState('all')

  const filtered = activeRegion === 'all'
    ? sorted
    : sorted.filter((r) => r.region === activeRegion)

  return (
    <>
      <AVAFilterBar activeRegion={activeRegion} onFilterChange={setActiveRegion} />

      <div className={detailStyles.grid}>
        {filtered.map((r) => {
          const region = getRegion(r.region)
          return (
            <Link key={r.slug} href={`/dining/${r.slug}`} className={detailStyles.card}>
              <div className={detailStyles.cardImg} style={{ backgroundImage: `url(${r.images[0]})` }} />
              <div className={detailStyles.cardBody}>
                <p className={detailStyles.cardMeta}>
                  {r.cuisine} &middot; {r.priceRange}
                  {region ? ` · ${region.name}` : ''}
                </p>
                <h2 className={detailStyles.cardTitle}>{r.name}</h2>
                <p className={detailStyles.cardExcerpt}>{r.excerpt}</p>
              </div>
            </Link>
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
          No restaurants in this appellation yet
        </p>
      )}
    </>
  )
}
