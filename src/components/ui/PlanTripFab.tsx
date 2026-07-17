'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import styles from './PlanTripFab.module.css'

/** Floating "Plan my trip" bubble — the itinerary builder's site-wide door. */
export function PlanTripFab() {
  const pathname = usePathname()
  if (pathname?.startsWith('/plan')) return null

  return (
    <Link href="/plan" className={styles.fab} aria-label="Plan my trip">
      <Sparkles size={15} strokeWidth={2.2} aria-hidden className={styles.icon} />
      <span className={styles.label}>Plan my trip</span>
    </Link>
  )
}
