'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

interface JWVideoProps {
  mediaId: string
  playerId?: string
  style?: CSSProperties
  className?: string
  onReady?: () => void
}

// JW Player property: X65hTucY
// Default player: O0V5rBgo
const PLAYER_SCRIPT = 'https://cdn.jwplayer.com/libraries/O0V5rBgo.js'

// Singleton script loader
let scriptLoaded = false
let scriptLoading = false
const callbacks: (() => void)[] = []

function loadJWScript(cb: () => void) {
  if (scriptLoaded) { cb(); return }
  callbacks.push(cb)
  if (scriptLoading) return
  scriptLoading = true
  const s = document.createElement('script')
  s.src = PLAYER_SCRIPT
  s.async = true
  s.onload = () => {
    scriptLoaded = true
    callbacks.forEach((fn) => fn())
    callbacks.length = 0
  }
  document.head.appendChild(s)
}

let instanceId = 0

/** Minimal typings for JW Player 8 embed (global `jwplayer`). */
interface JWPlayerInstance {
  remove: () => void
  on: (event: string, callback: () => void) => void
}

type JWFactory = (id: string) => { setup: (config: Record<string, unknown>) => JWPlayerInstance }

function getJwFactory(): JWFactory | undefined {
  if (typeof window === 'undefined') return undefined
  const w = window as Window & { jwplayer?: JWFactory }
  return w.jwplayer
}

export default function JWVideo({ mediaId, style, className, onReady }: JWVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<JWPlayerInstance | null>(null)
  const onReadyRef = useRef(onReady)
  const idRef = useRef(`jw-bg-${++instanceId}-${mediaId}`)

  onReadyRef.current = onReady

  useEffect(() => {
    loadJWScript(() => {
      const jw = getJwFactory()
      if (!containerRef.current || !jw) return

      // Destroy existing instance if any
      try {
        playerRef.current?.remove()
      } catch {
        /* noop */
      }

      playerRef.current = jw(idRef.current).setup({
        mediaId,
        autostart: true,
        mute: true,
        loop: true,
        controls: false,
        repeat: true,
        displaytitle: false,
        displaydescription: false,
        stretching: 'fill',        // cover behavior
        preload: 'auto',
        width: '100%',
        height: '100%',
        skin: { name: 'none' },
        cast: {},
      })

      playerRef.current.on('ready', () => {
        // Hide all JW UI chrome
        const el = containerRef.current
        if (el) {
          const chrome = el.querySelectorAll<HTMLElement>(
            '.jw-controls, .jw-title, .jw-logo, .jw-preview, .jw-captions, .jw-display-icon-container'
          )
          chrome.forEach((c) => { c.style.display = 'none' })
        }
        onReadyRef.current?.()
      })
    })

    return () => {
      try {
        playerRef.current?.remove()
      } catch {
        /* noop */
      }
    }
  }, [mediaId])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        overflow: 'hidden',
        ...style,
      }}
      className={className}
    >
      <div
        id={idRef.current}
        style={{ width: '100%', height: '100%' }}
      />
      {/* Hide all JW chrome via CSS */}
      <style>{`
        #${idRef.current} .jw-controls,
        #${idRef.current} .jw-title,
        #${idRef.current} .jw-logo,
        #${idRef.current} .jw-captions,
        #${idRef.current} .jw-display-icon-container,
        #${idRef.current} .jw-display,
        #${idRef.current} .jw-icon-display,
        #${idRef.current} .jw-nextup-container,
        #${idRef.current} .jw-overlays,
        #${idRef.current} .jw-sharing-container {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        #${idRef.current} .jw-wrapper {
          background: transparent !important;
        }
        #${idRef.current} .jw-media video {
          object-fit: cover !important;
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
    </div>
  )
}
