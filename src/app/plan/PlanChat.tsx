'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './plan.module.css'

export type AiItinerary = {
  title?: string
  homeBase?: string | null
  days: {
    label?: string
    region?: string
    stops: { time?: string; label?: string; slug: string; note?: string }[]
  }[]
}

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const ITINERARY_RE = /<itinerary>([\s\S]*?)<\/itinerary>/

function extractItinerary(text: string): { display: string; itinerary: AiItinerary | null } {
  const match = text.match(ITINERARY_RE)
  if (!match) return { display: text.trim(), itinerary: null }
  const display = text.replace(ITINERARY_RE, '').trim()
  try {
    const parsed = JSON.parse(match[1]) as AiItinerary
    if (Array.isArray(parsed?.days)) return { display, itinerary: parsed }
  } catch {
    /* malformed block — show the prose, skip the render */
  }
  return { display, itinerary: null }
}

const OPENER =
  "Welcome — I'm the guide's concierge. Tell me about the trip you're dreaming up: how long are you coming for, who's coming with you, and what does a perfect Napa day look like to you? I'll ask a couple of quick questions, then build your itinerary from the venues in this guide."

export function PlanChat({
  onItinerary,
}: {
  onItinerary: (itinerary: AiItinerary) => void
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const threadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, pending])

  async function send() {
    const text = input.trim()
    if (!text || pending) return
    setError(null)
    setInput('')
    const next: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setPending(true)
    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      if (res.status === 503) {
        const data = await res.json().catch(() => ({}))
        if (data?.error === 'not_configured') {
          setUnavailable(true)
          return
        }
        setError('The concierge is busy right now — give it a moment and try again.')
        return
      }
      if (!res.ok) {
        setError('Something went wrong — try that again.')
        return
      }
      const data = (await res.json()) as { reply: string }
      const { display, itinerary } = extractItinerary(data.reply ?? '')
      setMessages([...next, { role: 'assistant', content: display }])
      if (itinerary) onItinerary(itinerary)
    } catch {
      setError('Something went wrong — try that again.')
    } finally {
      setPending(false)
    }
  }

  if (unavailable) {
    return (
      <div className={styles.chatUnavailable}>
        The concierge isn&rsquo;t connected yet — it needs the site&rsquo;s Claude API key
        configured. Meanwhile, the quick builder below works instantly.
      </div>
    )
  }

  return (
    <div className={styles.chat}>
      <div className={styles.chatThread} ref={threadRef}>
        <div className={`${styles.chatBubble} ${styles.chatBubbleAssistant}`}>{OPENER}</div>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${styles.chatBubble} ${
              m.role === 'user' ? styles.chatBubbleUser : styles.chatBubbleAssistant
            }`}
          >
            {m.content}
          </div>
        ))}
        {pending ? (
          <div className={`${styles.chatBubble} ${styles.chatBubbleAssistant} ${styles.chatPending}`}>
            Planning<span className={styles.chatDots} aria-hidden>…</span>
          </div>
        ) : null}
        {error ? <div className={styles.chatError}>{error}</div> : null}
      </div>
      <form
        className={styles.chatInputRow}
        onSubmit={(e) => {
          e.preventDefault()
          void send()
        }}
      >
        <input
          className={styles.chatInput}
          value={input}
          placeholder="Tell the concierge about your trip…"
          onChange={(e) => setInput(e.target.value)}
          disabled={pending}
        />
        <button type="submit" className={styles.chatSend} disabled={pending || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}
