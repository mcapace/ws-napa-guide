import Image from 'next/image'
import Link from 'next/link'
import { getRegion, regions } from '@/data/regions'
import styles from './region-more-appellations.module.css'

export function RegionMoreAppellations({ slug }: { slug: string }) {
  const region = getRegion(slug)
  if (!region) return null

  const neighbors = region.neighborRegions
    .map((s) => getRegion(s))
    .filter((r): r is NonNullable<typeof r> => !!r)

  if (neighbors.length === 0) {
    const other = regions.filter((r) => r.slug !== slug).slice(0, 3)
    if (other.length === 0) return null
    return <AppellationsGrid regions={other} />
  }

  return <AppellationsGrid regions={neighbors} />
}

function AppellationsGrid({
  regions: items,
}: {
  regions: Array<{ slug: string; name: string; tagline: string; heroImage: string }>
}) {
  return (
    <section className={styles.section}>
      <p className={styles.label}>More appellations</p>
      <div className={styles.grid}>
        {items.map((r) => (
          <Link key={r.slug} href={`/regions/${r.slug}`} className={styles.card}>
            <Image
              src={r.heroImage}
              alt={r.name}
              fill
              sizes="33vw"
              className={styles.image}
            />
            <div className={styles.overlay} />
            <div className={styles.text}>
              <span className={styles.name}>{r.name}</span>
              <span className={styles.tagline}>{r.tagline}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
