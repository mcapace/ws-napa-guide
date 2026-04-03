'use client'

import { useState } from 'react'
import Link from 'next/link'
import detailStyles from '@/app/regions/[slug]/regionDetail.module.css'
import AVAFilterBar from '@/components/ui/AVAFilterBar'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getRegion } from '@/data/regions'
import { hotels } from '@/data/hotels'

const categoryLabel: Record<string, string> = {
  resort: 'Resort',
  boutique: 'Boutique',
  inn: 'Inn',
  villa: 'Villa',
}

const sorted = [...hotels].sort((a, b) => {
  if (a.featured && !b.featured) return -1
  if (!a.featured && b.featured) return 1
  return a.name.localeCompare(b.name)
})

export default function StayClient() {
  const [activeRegion, setActiveRegion] = useState('all')

  const filtered = activeRegion === 'all'
    ? sorted
    : sorted.filter((h) => h.region === activeRegion)

  return (
    <>
      <AVAFilterBar activeRegion={activeRegion} onFilterChange={setActiveRegion} />

      <div className={detailStyles.grid}>
        {filtered.map((h, i) => {
          const region = getRegion(h.region)
          const cat = categoryLabel[h.category] ?? h.category
          return (
            <ScrollReveal key={h.slug} delay={(i % 3) * 100}>
              <Link href={`/stay/${h.slug}`} className={detailStyles.card}>
                <div className={detailStyles.cardImg} style={{ backgroundImage: `url(${h.images[0]})` }} />
                <div className={detailStyles.cardBody}>
                  <p className={detailStyles.cardMeta}>
                    {cat} &middot; {h.priceRange}
                    {region ? ` · ${region.name}` : ''}
                  </p>
                  <h2 className={detailStyles.cardTitle}>{h.name}</h2>
                  <p className={detailStyles.cardExcerpt}>{h.excerpt}</p>
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
          No hotels in this appellation yet
        </p>
      )}
    </>
  )
}
