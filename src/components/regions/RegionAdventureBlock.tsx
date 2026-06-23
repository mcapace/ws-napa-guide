import type { RegionAdventure } from '@/data/regions'
import styles from './region-adventure.module.css'

export function RegionAdventureBlock({ adventure }: { adventure: RegionAdventure }) {
  const paragraphs = adventure.body.split('\n\n').filter(Boolean)

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{adventure.title}</h2>
        {adventure.intro && <p className={styles.intro}>{adventure.intro}</p>}
        {paragraphs.map((p, i) => (
          <p key={i} className={styles.body}>{p}</p>
        ))}
      </div>
    </section>
  )
}
