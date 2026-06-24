import { Hotel, MapPin, UtensilsCrossed, Wine, type LucideIcon } from 'lucide-react'
import { type Category } from '@/lib/mapbox'
import styles from './ExploreMapPin.module.css'

export type MapMarkerCategory = Category | 'sight'

const CATEGORY_ICONS: Record<MapMarkerCategory, LucideIcon> = {
  winery: Wine,
  dining: UtensilsCrossed,
  stay: Hotel,
  sight: MapPin,
}

export interface ExploreMapPinProps {
  category: MapMarkerCategory
  color: string
  selected?: boolean
  hovered?: boolean
}

export function ExploreMapPin({ category, color, selected, hovered }: ExploreMapPinProps) {
  const Icon = CATEGORY_ICONS[category]
  const scale = selected ? 1.32 : hovered ? 1.18 : 1

  return (
    <div
      className={`${styles.pinShell} ${selected ? styles.pinSelected : ''}`}
      style={{ transform: `scale(${scale})` }}
    >
      <svg
        className={styles.pinShape}
        viewBox="0 0 40 48"
        width="40"
        height="48"
        aria-hidden
      >
        <path
          className={styles.pinBody}
          d="M20 46 C20 46 5.5 27.5 5.5 17 C5.5 9.4 11.9 3 20 3 C28.1 3 34.5 9.4 34.5 17 C34.5 27.5 20 46 20 46 Z"
          fill={color}
        />
        <path
          className={styles.pinRim}
          d="M20 46 C20 46 5.5 27.5 5.5 17 C5.5 9.4 11.9 3 20 3 C28.1 3 34.5 9.4 34.5 17 C34.5 27.5 20 46 20 46 Z"
          fill="none"
          stroke="rgba(250, 247, 242, 0.5)"
          strokeWidth="1.25"
        />
      </svg>
      <span className={styles.pinIcon}>
        <Icon size={15} strokeWidth={2.15} color="#FAF7F2" aria-hidden />
      </span>
    </div>
  )
}
