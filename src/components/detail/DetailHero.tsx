import Link from 'next/link'
import WsMark from '@/components/ui/WsMark'
import { WS_LOGO_HEIGHT } from '@/lib/ws-logo'
import styles from './DetailHero.module.css'

export type DetailHeroProps = {
  /** Short label inside the circular badge (e.g. AVA name, “Winery”) */
  badgeText: string
  title: string
  subtitle?: string
  /** Optional hero photo; gradient fallback if missing */
  heroImage?: string
  /** Tint under image — typically region accent */
  accentColor?: string
  breadcrumb?: { href: string; label: string }
  breadcrumbCurrent?: string
  kicker?: string
}

export default function DetailHero({
  badgeText,
  title,
  subtitle,
  heroImage,
  accentColor = '#c4943a',
  breadcrumb,
  breadcrumbCurrent,
  kicker = 'Napa Valley Guide',
}: DetailHeroProps) {
  return (
    <section className={styles.shell}>
      
      {heroImage ? (
        <div className={styles.bg} style={{ backgroundImage: `url(${heroImage})` }} />
      ) : (
        <div
          className={styles.bg}
          style={{
            background: `linear-gradient(160deg, ${accentColor}33 0%, #0d0b09 55%, #0d0b09 100%)`,
          }}
        />
      )}
      <div className={styles.overlay} />

      <div className={styles.logoRow}>
        <Link href="/" aria-label="Wine Spectator — home">
          <WsMark height={WS_LOGO_HEIGHT.detailHero} opacity={0.6} invert />
        </Link>
      </div>

      <div className={styles.badge}>{badgeText}</div>

      <div className={styles.inner}>
        {breadcrumb && (
          <div className={styles.breadcrumb}>
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            <span>→</span>
            {breadcrumbCurrent && <em>{breadcrumbCurrent}</em>}
          </div>
        )}
        <p className={styles.kicker}>{kicker}</p>
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>

      <div className={styles.scrollCue} aria-hidden>
        <span>Scroll</span>
        <div className={styles.chevr} />
      </div>
    </section>
  )
}
