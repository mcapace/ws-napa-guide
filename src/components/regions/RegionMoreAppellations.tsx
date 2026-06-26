import Image from 'next/image'
import Link from 'next/link'
import { sortRegionsSouthToNorth } from '@/data/region-order'
import { getRegion, regions } from '@/data/regions'
import { resetScrollToTop } from '@/lib/smooth-scroll'
import styles from './region-more-appellations.module.css'

function scrollToRegionTop(): void {
  resetScrollToTop(null)
}

export function RegionMoreAppellations({ slug }: { slug: string }) {
  const current = getRegion(slug)
  if (!current) return null

  const others = sortRegionsSouthToNorth(regions.filter((r) => r.slug !== slug))

  if (others.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="more-appellations-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Continue exploring</p>
          <h2 id="more-appellations-heading" className={styles.title}>
            Beyond <em>{current.name}</em>
          </h2>
          <p className={styles.dek}>
            {others.length === 1
              ? 'One more town to discover across Napa Valley.'
              : `${others.length} more towns and areas to taste, dine, and stay across the valley.`}
          </p>
        </header>

        <ul className={styles.grid}>
          {others.map((region, index) => (
            <li key={region.slug} className={styles.gridItem}>
              <Link
                href={`/regions/${region.slug}`}
                className={styles.card}
                scroll={false}
                onClick={scrollToRegionTop}
              >
                <div className={styles.media}>
                  <Image
                    src={region.heroImage}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 28vw"
                    className={styles.image}
                  />
                  <div className={styles.mediaOverlay} aria-hidden />
                  <span className={styles.index} aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className={styles.body}>
                  <p className={styles.regionLabel}>Napa Valley</p>
                  <h3 className={styles.name}>{region.name}</h3>
                  <p className={styles.tagline}>{region.tagline}</p>
                  <span className={styles.cta}>
                    Read the guide
                    <span className={styles.ctaArrow} aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <footer className={styles.footer}>
          <Link
            href="/regions"
            className={styles.allLink}
            scroll={false}
            onClick={scrollToRegionTop}
          >
            All towns &amp; areas
            <span className={styles.allLinkArrow} aria-hidden>→</span>
          </Link>
        </footer>
      </div>
    </section>
  )
}
