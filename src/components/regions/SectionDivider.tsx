/**
 * Quiet editorial divider between region page sections (replaces scrolling marquee ribbons).
 * No motion — static hairline + small caps label on page-colored field.
 */
export function SectionDivider({
  label,
  compact = false,
  enhanced = false,
}: {
  label: string
  compact?: boolean
  enhanced?: boolean
}) {
  const text = label.trim().toUpperCase()
  if (!text) return null

  return (
    <div
      className={`region-section-divider${compact ? ' region-section-divider--compact' : ''}${enhanced ? ' region-section-divider--enhanced' : ''}`}
      {...(enhanced ? { 'data-section-divider': '' } : {})}
    >
      <div className="region-section-divider__row" role="presentation">
        <span
          className="region-section-divider__rule"
          aria-hidden
          {...(enhanced ? { 'data-section-divider-rule': '' } : {})}
        />
        <span
          className="region-section-divider__label"
          {...(enhanced ? { 'data-section-divider-label': '' } : {})}
        >
          {text}
        </span>
        <span
          className="region-section-divider__rule"
          aria-hidden
          {...(enhanced ? { 'data-section-divider-rule': '' } : {})}
        />
      </div>
    </div>
  )
}
