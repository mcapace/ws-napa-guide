import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'

export type FeatureBlockProps = {
  name: string
  address?: string
  website?: string
  body: ReactNode
  image?: string
  imagePosition?: 'left' | 'right'
  eyebrow?: string
}

function formatWebsiteLabel(url: string): string {
  return url.replace(/^https?:\/\//i, '').replace(/\/$/, '')
}

export function FeatureBlock({
  name,
  address,
  website,
  body,
  image,
  imagePosition = 'left',
  eyebrow,
}: FeatureBlockProps) {
  const href = website?.match(/^https?:\/\//i) ? website : website ? `https://${website}` : undefined

  const meta = (
    <div
      style={{
        marginTop: 28,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(26,22,20,0.72)',
        lineHeight: 1.6,
      }}
    >
      {address && <p style={{ margin: '0 0 8px' }}>{address}</p>}
      {href && (
        <a href={href} rel="noopener noreferrer" target="_blank" className="feature-meta-link">
          {formatWebsiteLabel(href)}
        </a>
      )}
    </div>
  )

  const copy = (
    <div style={{ padding: 'clamp(48px, 8vw, 120px) clamp(24px, 5vw, 56px)' }}>
      {eyebrow && (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(26,22,20,0.55)',
            margin: '0 0 12px',
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 400,
          fontSize: 'clamp(42px, 5.5vw, 72px)',
          lineHeight: 1.05,
          color: '#1A1614',
          margin: '0 0 20px',
        }}
      >
        {name}
      </h2>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 18,
          lineHeight: 1.65,
          color: '#1A1614',
        }}
      >
        {body}
      </div>
      {meta}
    </div>
  )

  const leftFirst = imagePosition === 'left'
  const gridVars: CSSProperties = {
    ['--fb-img-order' as string]: leftFirst ? 0 : 1,
    ['--fb-copy-order' as string]: leftFirst ? 1 : 0,
  }

  const figure = image ? (
    <div className="feature-block-col-image__inner">
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 960px) 50vw, 100vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
  ) : (
    <div
      aria-hidden
      className="feature-block-col-image__inner"
      style={{
        background: 'linear-gradient(145deg, rgba(26,22,20,0.06) 0%, rgba(114,47,55,0.12) 100%)',
      }}
    />
  )

  return (
    <article className="feature-block-editorial" style={gridVars}>
      <div className="feature-block-col-image">{figure}</div>
      <div className="feature-block-col-copy">{copy}</div>
    </article>
  )
}
