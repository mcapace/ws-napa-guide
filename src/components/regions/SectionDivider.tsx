/**
 * Quiet editorial divider between region page sections (replaces scrolling marquee ribbons).
 * No motion — static hairline + small caps label on page-colored field.
 */
export function SectionDivider({ label }: { label: string }) {
  const text = label.trim().toUpperCase()
  if (!text) return null

  return (
    <div className="region-section-divider">
      <div className="region-section-divider__row" role="presentation">
        <span className="region-section-divider__rule" aria-hidden />
        <span className="region-section-divider__label">{text}</span>
        <span className="region-section-divider__rule" aria-hidden />
      </div>
    </div>
  )
}
