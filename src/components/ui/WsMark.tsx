import Image from 'next/image'
import { WS_LOGO_PRIMARY_SRC } from '@/lib/ws-logo'

type WsMarkProps = {
  height: number
  /** Default 1. Footer uses 0.7; detail hero 0.6 */
  opacity?: number
  /** Primary logo is black-on-transparent; invert to white on dark UI. */
  invert?: boolean
  className?: string
  priority?: boolean
}

/**
 * Wine Spectator wordmark — always `WS_logo__1_.png` (never the white-stroke asset).
 */
export default function WsMark({
  height,
  opacity = 1,
  invert = true,
  className,
  priority,
}: WsMarkProps) {
  return (
    <Image
      src={WS_LOGO_PRIMARY_SRC}
      alt="Wine Spectator"
      width={Math.round(height * 4.75)}
      height={height}
      priority={priority}
      className={className}
      sizes={`${Math.round(height * 4.75)}px`}
      style={{
        height,
        width: 'auto',
        opacity,
        filter: invert ? 'invert(1)' : 'none',
      }}
    />
  )
}
