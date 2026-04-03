'use client'

import { useEffect, useState, type CSSProperties } from 'react'

interface JWVideoProps {
  mediaId: string
  style?: CSSProperties
  className?: string
  onReady?: () => void
}

/**
 * 720p MP4 URLs from https://cdn.jwplayer.com/v2/media/{id}
 * (JW delivery suffix for 720p on this property is -WBFwZoOE; fetch fallback resolves unknown IDs.)
 */
const STATIC_MP4_720: Record<string, string> = {
  sVn1cQyI: 'https://cdn.jwplayer.com/videos/sVn1cQyI-WBFwZoOE.mp4',
  X3Dl9rlP: 'https://cdn.jwplayer.com/videos/X3Dl9rlP-WBFwZoOE.mp4',
  eKsjbrpR: 'https://cdn.jwplayer.com/videos/eKsjbrpR-WBFwZoOE.mp4',
  fLjxpfOO: 'https://cdn.jwplayer.com/videos/fLjxpfOO-WBFwZoOE.mp4',
  A27sKx96: 'https://cdn.jwplayer.com/videos/A27sKx96-WBFwZoOE.mp4',
  Rjc3IIQX: 'https://cdn.jwplayer.com/videos/Rjc3IIQX-WBFwZoOE.mp4',
  ORdXtOpV: 'https://cdn.jwplayer.com/videos/ORdXtOpV-WBFwZoOE.mp4',
  wirI2N7n: 'https://cdn.jwplayer.com/videos/wirI2N7n-WBFwZoOE.mp4',
  PTOXPcmG: 'https://cdn.jwplayer.com/videos/PTOXPcmG-WBFwZoOE.mp4',
}

type SourceRow = { file?: string; type?: string; label?: string; height?: number }

function pick720Mp4(sources: SourceRow[] | undefined): string | undefined {
  if (!sources?.length) return undefined
  const p720 = sources.find((s) => s.type === 'video/mp4' && s.label === '720p')
  if (p720?.file) return p720.file
  const mp4 = sources.filter((s) => s.type === 'video/mp4' && s.file)
  if (!mp4.length) return undefined
  mp4.sort((a, b) => (b.height ?? 0) - (a.height ?? 0))
  return mp4[0].file
}

async function fetch720Mp4Url(mediaId: string): Promise<string | undefined> {
  const r = await fetch(`https://cdn.jwplayer.com/v2/media/${mediaId}`)
  if (!r.ok) return undefined
  const d = (await r.json()) as {
    message?: string
    playlist?: Array<{ sources?: SourceRow[] }>
  }
  if (d.message || !d.playlist?.[0]) return undefined
  return pick720Mp4(d.playlist[0].sources)
}

export default function JWVideo({ mediaId, style, className, onReady }: JWVideoProps) {
  const staticUrl = STATIC_MP4_720[mediaId]
  const [dynamic, setDynamic] = useState<{ id: string; url: string } | null>(null)

  useEffect(() => {
    if (staticUrl) return

    let cancelled = false
    void (async () => {
      const url = await fetch720Mp4Url(mediaId)
      if (!cancelled && url) setDynamic({ id: mediaId, url })
    })()

    return () => {
      cancelled = true
    }
  }, [mediaId, staticUrl])

  const src =
    staticUrl ?? (dynamic?.id === mediaId ? dynamic.url : undefined) ?? null

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        ...style,
      }}
    >
      {src ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={onReady}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(160deg, #2a1a10 0%, #1C1612 100%)',
          }}
          aria-hidden
        />
      )}
    </div>
  )
}
