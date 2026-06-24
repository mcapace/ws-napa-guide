import Image from 'next/image'
import Link from 'next/link'
import { getRegion } from '@/data/regions'
import { TEST_IMAGES } from '@/lib/test-images'
import type { HorizontalStripItem } from '@/components/ui/HorizontalStrip'
import styles from './FeaturePlacesMentioned.module.css'

function hrefFor(entry: HorizontalStripItem) {
  switch (entry.type) {
    case 'winery':
      return `/wineries/${entry.item.slug}`
    case 'dining':
      return `/dining/${entry.item.slug}`
    case 'stay':
      return `/stay/${entry.item.slug}`
    case 'region':
      return `/regions/${entry.item.slug}`
  }
}

function imageFor(entry: HorizontalStripItem, index: number): string {
  if (entry.type === 'region') return entry.item.heroImage
  return entry.item.images[0] ?? TEST_IMAGES[index % TEST_IMAGES.length]
}

function typeLabel(entry: HorizontalStripItem) {
  switch (entry.type) {
    case 'winery':
      return 'Winery'
    case 'dining':
      return 'Dining'
    case 'stay':
      return 'Stay'
    case 'region':
      return 'Appellation'
  }
}

function metaFor(entry: HorizontalStripItem) {
  switch (entry.type) {
    case 'winery': {
      const region = getRegion(entry.item.region)
      const visit = entry.item.visitInfo?.appointment ? 'By appointment' : 'Walk-ins welcome'
      return [region?.name ?? entry.item.region.replace(/-/g, ' '), visit].filter(Boolean).join(' · ')
    }
    case 'dining':
      return [entry.item.cuisine, entry.item.priceRange, getRegion(entry.item.region)?.name]
        .filter(Boolean)
        .join(' · ')
    case 'stay':
      return [entry.item.priceRange, getRegion(entry.item.region)?.name].filter(Boolean).join(' · ')
    case 'region':
      return entry.item.tagline ?? ''
  }
}

function excerptFor(entry: HorizontalStripItem) {
  if (entry.type === 'region') return entry.item.intro ?? entry.item.tagline ?? ''
  return entry.item.excerpt
}

function ctaFor(entry: HorizontalStripItem) {
  switch (entry.type) {
    case 'winery':
      return 'View winery'
    case 'dining':
      return 'View restaurant'
    case 'stay':
      return 'View hotel'
    case 'region':
      return 'Explore region'
  }
}

export function FeaturePlacesMentioned({ entries }: { entries: HorizontalStripItem[] }) {
  if (entries.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="feature-places-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>From this story</p>
          <h2 id="feature-places-heading" className={styles.title}>Places mentioned</h2>
        </header>

        <ul className={styles.grid}>
          {entries.map((entry, index) => {
            const name = 'name' in entry.item ? entry.item.name : ''
            return (
              <li key={`${entry.type}-${entry.item.slug}`}>
                <Link href={hrefFor(entry)} className={styles.card}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={imageFor(entry, index)}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 280px"
                      className={styles.image}
                    />
                    <span className={styles.typeBadge}>{typeLabel(entry)}</span>
                  </div>
                  <div className={styles.body}>
                    <h3 className={styles.cardTitle}>{name}</h3>
                    {metaFor(entry) && <p className={styles.meta}>{metaFor(entry)}</p>}
                    <p className={styles.excerpt}>{excerptFor(entry)}</p>
                    <span className={styles.cta}>{ctaFor(entry)} →</span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
