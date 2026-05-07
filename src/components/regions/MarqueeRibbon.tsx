export function MarqueeRibbon({ phrase }: { phrase: string }) {
  const upper = phrase.toUpperCase()
  const chunk = `${upper} · `
  const text = chunk.repeat(14)

  return (
    <div className="region-marquee-ribbon" aria-hidden>
      <div className="region-marquee-ribbon__inner">
        <div className="region-marquee-ribbon__track">
          <span className="region-marquee-ribbon__chunk">{text}</span>
          <span className="region-marquee-ribbon__chunk">{text}</span>
        </div>
      </div>
    </div>
  )
}
