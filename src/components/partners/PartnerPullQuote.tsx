import styles from './PartnerPullQuote.module.css'

export function PartnerPullQuote({ quote }: { quote: string }) {
  if (!quote.trim()) return null

  return (
    <blockquote className={styles.quote} data-partner-reveal>
      <p className={styles.text}>{quote}</p>
    </blockquote>
  )
}
