/**
 * Quiet editorial divider between region page sections (replaces scrolling marquee ribbons).
 * No motion — static hairline + small caps label on page-colored field.
 */
export function SectionDivider({
  label,
  compact = false,
  enhanced = false,
  variant = 'caps',
}: {
  label: string
  compact?: boolean
  enhanced?: boolean
  variant?: 'caps' | 'magazine'
}) {
  const text = label.trim()
  if (!text) return null
  const displayLabel = variant === 'magazine' ? text : text.toUpperCase()

  return (
    <div
      className={`region-section-divider${compact ? ' region-section-divider--compact' : ''}${enhanced ? ' region-section-divider--enhanced' : ''}${variant === 'magazine' ? ' region-section-divider--magazine' : ''}`}
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
          {displayLabel}
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
