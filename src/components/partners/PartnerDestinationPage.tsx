import Image from 'next/image'
import Link from 'next/link'
import type { PartnerDestination } from '@/data/partners'
import { withNapaGuideUtm } from '@/lib/outbound-utm'
import styles from './PartnerDestinationPage.module.css'

export function PartnerDestinationPage({ partner }: { partner: PartnerDestination }) {
  const bookHref = withNapaGuideUtm(partner.bookUrl)
  const clubHref = withNapaGuideUtm(partner.wineClubUrl)
  const siteHref = withNapaGuideUtm(partner.website)

  return (
    <article className={styles.page} data-site-surface="dark" data-editorial-content>
      <section className={styles.hero} data-nav-hero-root>
        <Image
          src={partner.heroImage}
          alt={partner.name}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroGradient} />
        <div className={styles.heroContent}>
          <p className={styles.kicker}>{partner.brandLabel} · {partner.regionName}</p>
          <h1 className={styles.title}>{partner.name}</h1>
          <p className={styles.deck}>{partner.description}</p>
          <div className={styles.heroCtas}>
            <a href={bookHref} className={styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
              Book a tasting
            </a>
            <a href={clubHref} className={styles.ctaSecondary} target="_blank" rel="noopener noreferrer">
              Wine club
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>Gallery</p>
        <h2 className={styles.sectionTitle}>On the property</h2>
        <div className={styles.gallery}>
          {partner.gallery.map((shot) => (
            <figure key={shot.src} className={styles.galleryItem}>
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1024}
                height={682}
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.galleryImage}
              />
            </figure>
          ))}
        </div>
        <p className={styles.photoCredit}>Photography · {partner.photoCredit}</p>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>Experiences</p>
        <h2 className={styles.sectionTitle}>Tastings &amp; tours</h2>
        <div className={styles.experienceGrid}>
          {partner.experiences.map((exp) => (
            <article key={exp.title} className={styles.experience}>
              <h3 className={styles.experienceTitle}>{exp.title}</h3>
              <p className={styles.experienceBody}>{exp.description}</p>
              {exp.price && <p className={styles.experiencePrice}>{exp.price}</p>}
              {exp.details && exp.details.length > 0 && (
                <ul className={styles.experienceMeta}>
                  {exp.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
        <div className={styles.midCta}>
          <a href={bookHref} className={styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
            Reserve your visit
          </a>
        </div>
      </section>

      <section className={styles.splitSection}>
        <div>
          <p className={styles.sectionLabel}>Why visit</p>
          <h2 className={styles.sectionTitle}>Highlights</h2>
          <ul className={styles.points}>
            {partner.sellingPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className={styles.wines}>
            <span className={styles.winesLabel}>Featured wines</span>
            {partner.featuredWines}
          </p>
        </div>
        <aside className={styles.visitCard}>
          <p className={styles.sectionLabel}>Plan your visit</p>
          <h2 className={styles.visitTitle}>Visit info</h2>
          <div className={styles.visitBlock}>
            {partner.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className={styles.visitLine}>{partner.hours}</p>
          <p className={styles.visitLine}>
            <a href={`tel:${partner.phone.replace(/[^\d+]/g, '')}`}>{partner.phone}</a>
          </p>
          <p className={styles.visitLine}>
            <a href={`mailto:${partner.email}`}>{partner.email}</a>
          </p>
          <div className={styles.visitActions}>
            <a href={bookHref} className={styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
              Book a tasting
            </a>
            <a href={clubHref} className={styles.ctaGhost} target="_blank" rel="noopener noreferrer">
              Join the wine club
            </a>
            <a href={siteHref} className={styles.ctaGhost} target="_blank" rel="noopener noreferrer">
              {partner.website.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
            </a>
          </div>
          <Link href={`/regions/${partner.regionSlug}`} className={styles.regionLink}>
            Explore {partner.regionName} →
          </Link>
        </aside>
      </section>
    </article>
  )
}
