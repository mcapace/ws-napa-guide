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
 * (all verified 2026-04; encoding suffix is consistently -WBFwZoOE for these assets).
 */
const STATIC_MP4_720: Record<string, string> = {
  FvwrhNa4: 'https://cdn.jwplayer.com/videos/FvwrhNa4-WBFwZoOE.mp4',
  '40AxzG0G': 'https://cdn.jwplayer.com/videos/40AxzG0G-WBFwZoOE.mp4',
  tWL1fGgj: 'https://cdn.jwplayer.com/videos/tWL1fGgj-WBFwZoOE.mp4',
  xS5p1TZF: 'https://cdn.jwplayer.com/videos/xS5p1TZF-WBFwZoOE.mp4',
  ixRk7Rxw: 'https://cdn.jwplayer.com/videos/ixRk7Rxw-WBFwZoOE.mp4',
  wLOq4CgZ: 'https://cdn.jwplayer.com/videos/wLOq4CgZ-WBFwZoOE.mp4',
  '6PuhlRIs': 'https://cdn.jwplayer.com/videos/6PuhlRIs-WBFwZoOE.mp4',
  Yt32URjQ: 'https://cdn.jwplayer.com/videos/Yt32URjQ-WBFwZoOE.mp4',
  '4RTGrZfr': 'https://cdn.jwplayer.com/videos/4RTGrZfr-WBFwZoOE.mp4',
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
