'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Wine, UtensilsCrossed, BedDouble, Sparkles } from 'lucide-react'
import { REGION_SOUTH_TO_NORTH } from '@/data/region-order'
import { regionDisplayName } from '@/lib/explore'
import {
  buildPlan,
  PLAN_INTERESTS,
  type PlanInput,
  type PlanInterest,
  type PlanPace,
  type PlanVenue,
} from '@/lib/plan-itinerary'
import { PlanMap, planMapDayColor, type PlanMapStop } from '@/components/plan/PlanMap'
import { PlanChat, type AiItinerary } from './PlanChat'
import styles from './plan.module.css'

const CATEGORY_LABEL: Record<PlanVenue['category'], string> = {
  winery: 'Tasting room',
  dining: 'Dining',
  stay: 'Stay',
  do: 'Between pours',
}

const DAY_OPTIONS = [1, 2, 3, 4, 5]

type DisplayStop = {
  time: string
  label: string
  venue: PlanVenue
  note?: string
  slotKey: string
  canSwap: boolean
}

type DisplayDay = { index: number; regionLabel: string; regionSlug?: string; stops: DisplayStop[] }

type DisplayPlan = {
  source: 'form' | 'ai'
  title: string
  subtitle: string
  homeBase?: PlanVenue
  days: DisplayDay[]
}

function parseInterests(raw: string | null): PlanInterest[] {
  const valid = new Set(PLAN_INTERESTS.map((i) => i.key))
  const parsed = (raw ?? '')
    .split(',')
    .filter((i): i is PlanInterest => valid.has(i as PlanInterest))
  return parsed.length > 0 ? parsed : ['tasting', 'food']
}

function parseSwaps(raw: string | null): Record<string, number> {
  const swaps: Record<string, number> = {}
  for (const part of (raw ?? '').split('~')) {
    const [key, n] = part.split(':')
    if (key && Number(n) > 0) swaps[key] = Number(n)
  }
  return swaps
}

function encodeAiPlan(plan: AiItinerary): string {
  return btoa(encodeURIComponent(JSON.stringify(plan)))
}

function decodeAiPlan(raw: string | null): AiItinerary | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(atob(raw))) as AiItinerary
    return Array.isArray(parsed?.days) ? parsed : null
  } catch {
    return null
  }
}

export function PlanClient({ venues }: { venues: PlanVenue[] }) {
  const params = useSearchParams()
  const venueBySlug = useMemo(() => {
    const m = new Map<string, PlanVenue>()
    for (const v of venues) m.set(v.slug, v)
    return m
  }, [venues])

  const [days, setDays] = useState(() => {
    const d = Number(params.get('days'))
    return d >= 1 && d <= 5 ? d : 3
  })
  const [base, setBase] = useState<string>(() => {
    const b = params.get('base')
    return b && (REGION_SOUTH_TO_NORTH as readonly string[]).includes(b) ? b : 'auto'
  })
  const [pace, setPace] = useState<PlanPace>(() =>
    params.get('pace') === 'full' ? 'full' : 'relaxed',
  )
  const [interests, setInterests] = useState<PlanInterest[]>(() =>
    parseInterests(params.get('interests')),
  )
  const [seed, setSeed] = useState(() => {
    const s = Number(params.get('seed'))
    return Number.isFinite(s) && s > 0 ? s : 1
  })
  const [swaps, setSwaps] = useState<Record<string, number>>(() =>
    parseSwaps(params.get('swaps')),
  )
  const [generated, setGenerated] = useState(() => params.get('go') === '1')
  const [aiPlan, setAiPlan] = useState<AiItinerary | null>(() => decodeAiPlan(params.get('ai')))
  const [source, setSource] = useState<'form' | 'ai'>(() =>
    params.get('ai') ? 'ai' : 'form',
  )
  const [linkCopied, setLinkCopied] = useState(false)

  // Email gate: confirm email + 6-digit code before unlock
  const [leadEmail, setLeadEmail] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem('ws-plan-lead')
  })
  const [gateEmail, setGateEmail] = useState('')
  const [gateConfirmEmail, setGateConfirmEmail] = useState('')
  const [gateCode, setGateCode] = useState('')
  const [gateStep, setGateStep] = useState<'email' | 'code'>('email')
  const [gateConsent, setGateConsent] = useState(false)
  const [gatePending, setGatePending] = useState(false)
  const [gateError, setGateError] = useState<string | null>(null)
  const [gateHint, setGateHint] = useState<string | null>(null)

  const gateErrorMessages: Record<string, string> = {
    invalid_email: 'That doesn’t look like a valid email address.',
    email_mismatch: 'Email addresses don’t match — please re-enter both.',
    disposable_email: 'Please use a real, non-disposable email address.',
    undeliverable_email:
      'We couldn’t verify that address can receive mail — double-check the spelling.',
    consent_required: 'Please agree to the terms to continue.',
    invalid_code: 'That code isn’t valid or has expired. Request a new one.',
    email_send_unavailable:
      'Verification email isn’t configured yet. Please try again shortly.',
    email_send_failed: 'We couldn’t send the verification email — try again.',
  }

  async function requestVerificationCode() {
    if (gatePending) return
    setGateError(null)
    setGateHint(null)
    if (!gateConsent) {
      setGateError('Please agree to the terms to continue.')
      return
    }
    if (gateEmail.trim().toLowerCase() !== gateConfirmEmail.trim().toLowerCase()) {
      setGateError(gateErrorMessages.email_mismatch)
      return
    }
    setGatePending(true)
    try {
      const res = await fetch('/api/plan-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'request',
          email: gateEmail.trim(),
          confirmEmail: gateConfirmEmail.trim(),
          consent: true,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setGateError(
          gateErrorMessages[data?.error as string] ?? 'Something went wrong — try again.',
        )
        return
      }
      setGateStep('code')
      setGateCode('')
      setGateHint(
        typeof data?.debugCode === 'string'
          ? `Dev code: ${data.debugCode}`
          : `We sent a 6-digit code to ${gateEmail.trim().toLowerCase()}.`,
      )
    } catch {
      setGateError('Something went wrong — try again.')
    } finally {
      setGatePending(false)
    }
  }

  async function verifyCodeAndUnlock() {
    if (gatePending) return
    setGateError(null)
    setGatePending(true)
    try {
      const res = await fetch('/api/plan-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          email: gateEmail.trim(),
          confirmEmail: gateConfirmEmail.trim() || gateEmail.trim(),
          code: gateCode.trim(),
          consent: true,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setGateError(
          gateErrorMessages[data?.error as string] ?? 'Something went wrong — try again.',
        )
        return
      }
      const email = gateEmail.trim().toLowerCase()
      window.localStorage.setItem('ws-plan-lead', email)
      setLeadEmail(email)
    } catch {
      setGateError('Something went wrong — try again.')
    } finally {
      setGatePending(false)
    }
  }

  const input: PlanInput = useMemo(
    () => ({ days, base, pace, interests, seed, swaps }),
    [days, base, pace, interests, seed, swaps],
  )

  const formPlan = useMemo(
    () => (generated ? buildPlan(venues, input) : null),
    [generated, venues, input],
  )

  const displayPlan: DisplayPlan | null = useMemo(() => {
    if (source === 'ai' && aiPlan) {
      const daysOut: DisplayDay[] = []
      for (const [d, day] of aiPlan.days.entries()) {
        const stops: DisplayStop[] = []
        for (const [s, stop] of (day.stops ?? []).entries()) {
          const venue = venueBySlug.get(stop.slug)
          if (!venue) continue
          stops.push({
            time: stop.time ?? '',
            label: stop.label ?? CATEGORY_LABEL[venue.category],
            venue,
            note: stop.note,
            slotKey: `ai-${d}-${s}`,
            canSwap: false,
          })
        }
        if (stops.length === 0) continue
        const regionSlug =
          day.region && (REGION_SOUTH_TO_NORTH as readonly string[]).includes(day.region)
            ? day.region
            : stops[0].venue.region
        daysOut.push({
          index: d,
          regionLabel: regionDisplayName(regionSlug),
          regionSlug,
          stops,
        })
      }
      if (daysOut.length === 0) return null
      const homeBase = aiPlan.homeBase ? venueBySlug.get(aiPlan.homeBase) : undefined
      return {
        source: 'ai',
        title: aiPlan.title?.trim() || `Your ${daysOut.length}-day itinerary`,
        subtitle: 'Built by the concierge from the Wine Spectator guide',
        homeBase,
        days: daysOut,
      }
    }
    if (formPlan) {
      return {
        source: 'form',
        title: `Your ${formPlan.days.length}-day itinerary`,
        subtitle: formPlan.regionWindow.map((r) => regionDisplayName(r)).join(' · '),
        homeBase: formPlan.homeBase
          ? venueBySlug.get(formPlan.homeBase.slug) ?? undefined
          : undefined,
        days: formPlan.days.map((day) => ({
          index: day.index,
          regionLabel: regionDisplayName(day.region),
          regionSlug: day.region,
          stops: day.stops.map((stop) => ({
            time: stop.time,
            label: stop.label,
            venue: venueBySlug.get(stop.venue.slug) ?? stop.venue,
            slotKey: stop.slotKey,
            canSwap: stop.canSwap,
          })),
        })),
      }
    }
    return null
  }, [source, aiPlan, formPlan, venueBySlug])

  const mapStops: PlanMapStop[] = useMemo(() => {
    if (!displayPlan) return []
    const out: PlanMapStop[] = []
    for (const day of displayPlan.days) {
      for (const [i, stop] of day.stops.entries()) {
        out.push({
          venue: stop.venue,
          dayIndex: day.index,
          stopNumber: i + 1,
          time: stop.time,
          label: stop.label,
        })
      }
    }
    return out
  }, [displayPlan])

  function syncUrl(next: Partial<PlanInput> & { go?: boolean }) {
    const q = new URLSearchParams()
    q.set('days', String(next.days ?? days))
    q.set('base', String(next.base ?? base))
    q.set('pace', next.pace ?? pace)
    q.set('interests', (next.interests ?? interests).join(','))
    q.set('seed', String(next.seed ?? seed))
    const s = next.swaps ?? swaps
    const swapStr = Object.entries(s)
      .filter(([, n]) => n > 0)
      .map(([k, n]) => `${k}:${n}`)
      .join('~')
    if (swapStr) q.set('swaps', swapStr)
    if (next.go ?? generated) q.set('go', '1')
    window.history.replaceState(null, '', `/plan?${q.toString()}`)
  }

  function toggleInterest(key: PlanInterest) {
    setInterests((prev) => {
      const next = prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key]
      return next.length > 0 ? next : prev
    })
  }

  function generate() {
    setGenerated(true)
    setSwaps({})
    setSource('form')
    syncUrl({ go: true, swaps: {} })
    document.getElementById('plan-results')?.scrollIntoView({ behavior: 'smooth' })
  }

  function shuffle() {
    const nextSeed = seed + 1
    setSeed(nextSeed)
    setSwaps({})
    syncUrl({ seed: nextSeed, swaps: {} })
  }

  function swapStop(slotKey: string) {
    const next = { ...swaps, [slotKey]: (swaps[slotKey] ?? 0) + 1 }
    setSwaps(next)
    syncUrl({ swaps: next })
  }

  function handleAiItinerary(plan: AiItinerary) {
    setAiPlan(plan)
    setSource('ai')
    window.history.replaceState(null, '', `/plan?ai=${encodeAiPlan(plan)}`)
    document.getElementById('plan-results')?.scrollIntoView({ behavior: 'smooth' })
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2500)
    } catch {
      /* clipboard unavailable — the URL bar still has the link */
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Wine Spectator — Napa Valley Guide</p>
        <h1 className={styles.title}>
          Plan your <em>perfect trip</em>
        </h1>
        <p className={styles.lede}>
          Talk to the concierge and it will interview you, then build a day-by-day
          itinerary from the venues in this guide — or use the quick builder for an
          instant plan. Every stop is mapped, printable, and shareable.
        </p>
      </header>

      {!leadEmail ? (
        <section className={styles.gate} aria-label="Unlock the planner">
          <p className={styles.fieldLabel}>Unlock the itinerary builder</p>
          <p className={styles.gateLede}>
            {gateStep === 'email'
              ? 'The planner is free to use — enter and confirm your email, then we’ll send a one-time code so only you can unlock it.'
              : 'Enter the 6-digit code we emailed you to finish unlocking the planner.'}
          </p>
          {gateStep === 'email' ? (
            <form
              className={styles.gateForm}
              onSubmit={(e) => {
                e.preventDefault()
                void requestVerificationCode()
              }}
            >
              <input
                type="email"
                className={styles.chatInput}
                placeholder="you@example.com"
                value={gateEmail}
                onChange={(e) => setGateEmail(e.target.value)}
                disabled={gatePending}
                autoComplete="email"
                required
                aria-label="Email"
              />
              <input
                type="email"
                className={styles.chatInput}
                placeholder="Confirm email"
                value={gateConfirmEmail}
                onChange={(e) => setGateConfirmEmail(e.target.value)}
                disabled={gatePending}
                autoComplete="email"
                required
                aria-label="Confirm email"
              />
              <label className={styles.gateConsent}>
                <input
                  type="checkbox"
                  checked={gateConsent}
                  onChange={(e) => setGateConsent(e.target.checked)}
                />
                <span>
                  I agree that Wine Spectator (M. Shanken Communications) may store my
                  email address and trip preferences to build my itinerary, and may send
                  me marketing and promotional emails about the Napa Valley Guide and
                  related offers, as described in the{' '}
                  <a
                    href="https://www.winespectator.com/pages/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://www.winespectator.com/pages/terms-of-service"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>
                  . I can unsubscribe at any time.
                </span>
              </label>
              <button
                type="submit"
                className={styles.generateBtn}
                disabled={
                  gatePending || !gateEmail.trim() || !gateConfirmEmail.trim() || !gateConsent
                }
              >
                {gatePending ? 'Sending code…' : 'Send verification code'}
              </button>
            </form>
          ) : (
            <form
              className={styles.gateForm}
              onSubmit={(e) => {
                e.preventDefault()
                void verifyCodeAndUnlock()
              }}
            >
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                className={`${styles.chatInput} ${styles.gateCodeInput}`}
                placeholder="6-digit code"
                value={gateCode}
                onChange={(e) => setGateCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                disabled={gatePending}
                autoComplete="one-time-code"
                required
                aria-label="Verification code"
              />
              <div className={styles.gateRow}>
                <button
                  type="submit"
                  className={styles.generateBtn}
                  disabled={gatePending || gateCode.trim().length !== 6}
                >
                  {gatePending ? 'Verifying…' : 'Unlock the planner'}
                </button>
                <button
                  type="button"
                  className={styles.gateSecondary}
                  disabled={gatePending}
                  onClick={() => {
                    setGateStep('email')
                    setGateCode('')
                    setGateError(null)
                    setGateHint(null)
                  }}
                >
                  Use a different email
                </button>
                <button
                  type="button"
                  className={styles.gateSecondary}
                  disabled={gatePending}
                  onClick={() => void requestVerificationCode()}
                >
                  Resend code
                </button>
              </div>
            </form>
          )}
          {gateHint ? <p className={styles.gateHint}>{gateHint}</p> : null}
          {gateError ? <p className={styles.chatError}>{gateError}</p> : null}
        </section>
      ) : (
        <section className={styles.chatSection} aria-label="Napa concierge">
          <p className={styles.fieldLabel}>Napa concierge</p>
          <PlanChat onItinerary={handleAiItinerary} />
        </section>
      )}

      {leadEmail ? (
      <section className={styles.form} aria-label="Quick builder">
        <p className={styles.fieldLabel}>Quick builder</p>
        <div className={styles.fieldGroup}>
          <p className={styles.fieldLabel}>How many days?</p>
          <div className={styles.chipRow}>
            {DAY_OPTIONS.map((d) => (
              <button
                key={d}
                type="button"
                className={`${styles.chip}${days === d ? ` ${styles.chipActive}` : ''}`}
                aria-pressed={days === d}
                onClick={() => {
                  setDays(d)
                  syncUrl({ days: d })
                }}
              >
                {d} {d === 1 ? 'day' : 'days'}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <p className={styles.fieldLabel}>Home base</p>
          <div className={styles.chipRow}>
            <button
              type="button"
              className={`${styles.chip}${base === 'auto' ? ` ${styles.chipActive}` : ''}`}
              aria-pressed={base === 'auto'}
              onClick={() => {
                setBase('auto')
                syncUrl({ base: 'auto' })
              }}
            >
              Recommend for me
            </button>
            {REGION_SOUTH_TO_NORTH.map((slug) => (
              <button
                key={slug}
                type="button"
                className={`${styles.chip}${base === slug ? ` ${styles.chipActive}` : ''}`}
                aria-pressed={base === slug}
                onClick={() => {
                  setBase(slug)
                  syncUrl({ base: slug })
                }}
              >
                {regionDisplayName(slug)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <p className={styles.fieldLabel}>What do you love?</p>
          <div className={styles.chipRow}>
            {PLAN_INTERESTS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className={`${styles.chip}${interests.includes(key) ? ` ${styles.chipActive}` : ''}`}
                aria-pressed={interests.includes(key)}
                onClick={() => {
                  toggleInterest(key)
                  syncUrl({
                    interests: interests.includes(key)
                      ? interests.filter((i) => i !== key)
                      : [...interests, key],
                  })
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <p className={styles.fieldLabel}>Pace</p>
          <div className={styles.chipRow}>
            {(
              [
                ['relaxed', 'Relaxed — 4 stops a day'],
                ['full', 'Full — 6 stops a day'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`${styles.chip}${pace === key ? ` ${styles.chipActive}` : ''}`}
                aria-pressed={pace === key}
                onClick={() => {
                  setPace(key)
                  syncUrl({ pace: key })
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button type="button" className={styles.generateBtn} onClick={generate}>
          {generated ? 'Update my itinerary' : 'Build my itinerary'}
        </button>
      </section>
      ) : null}

      {displayPlan ? (
        <section id="plan-results" className={styles.results} aria-label="Your itinerary">
          <div className={styles.resultsHead}>
            <h2 className={styles.resultsTitle}>{displayPlan.title}</h2>
            <p className={styles.resultsSub}>{displayPlan.subtitle}</p>
            <div className={styles.resultsActions}>
              {displayPlan.source === 'form' ? (
                <button type="button" className={styles.actionBtn} onClick={shuffle}>
                  Shuffle alternatives
                </button>
              ) : null}
              <button type="button" className={styles.actionBtn} onClick={copyLink}>
                {linkCopied ? 'Link copied ✓' : 'Copy share link'}
              </button>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={() => window.print()}
              >
                Print / export
              </button>
            </div>
          </div>

          <div className={styles.mapPanel}>
            <PlanMap stops={mapStops} homeBase={displayPlan.homeBase} />
            <div className={styles.mapLegend}>
              {displayPlan.days.map((day) => (
                <span key={day.index} className={styles.mapLegendItem}>
                  <span
                    className={styles.mapLegendDot}
                    style={{ background: planMapDayColor(day.index) }}
                  />
                  Day {day.index + 1} · {day.regionLabel}
                </span>
              ))}
              <span className={styles.mapLegendDivider} aria-hidden />
              <span className={styles.mapLegendItem}>
                <Wine size={13} aria-hidden /> Tasting
              </span>
              <span className={styles.mapLegendItem}>
                <UtensilsCrossed size={13} aria-hidden /> Dining
              </span>
              <span className={styles.mapLegendItem}>
                <BedDouble size={13} aria-hidden /> Stay
              </span>
              <span className={styles.mapLegendItem}>
                <Sparkles size={13} aria-hidden /> Between pours
              </span>
            </div>
          </div>

          {displayPlan.homeBase ? (
            <div className={styles.homeBase}>
              <div className={styles.homeBaseMedia}>
                {displayPlan.homeBase.thumb ? (
                  <Image
                    src={displayPlan.homeBase.thumb}
                    alt=""
                    fill
                    sizes="220px"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className={styles.thumbFallback} />
                )}
              </div>
              <div className={styles.homeBaseCopy}>
                <p className={styles.stopEyebrow}>
                  Your home base · {regionDisplayName(displayPlan.homeBase.region)}
                </p>
                <h3 className={styles.stopName}>{displayPlan.homeBase.name}</h3>
                <p className={styles.stopAddress}>{displayPlan.homeBase.address}</p>
                <Link href={displayPlan.homeBase.href} className={styles.stopLink}>
                  View {displayPlan.homeBase.name} →
                </Link>
              </div>
            </div>
          ) : null}

          <div className={styles.daysGrid}>
            {displayPlan.days.map((day) => (
              <article key={day.index} className={styles.dayCard}>
                <header className={styles.dayHead}>
                  <h3 className={styles.dayTitle}>Day {day.index + 1}</h3>
                  <p className={styles.dayRegion}>{day.regionLabel}</p>
                  {day.regionSlug ? (
                    <Link href={`/explore?ava=${day.regionSlug}`} className={styles.dayMapLink}>
                      See on map →
                    </Link>
                  ) : null}
                </header>
                <ol className={styles.stopList}>
                  {day.stops.map((stop) => (
                    <li key={stop.slotKey} className={styles.stop}>
                      <div className={styles.stopTimeCol}>
                        <span className={styles.stopTime}>{stop.time}</span>
                        <span className={styles.stopSlot}>{stop.label}</span>
                      </div>
                      <div className={styles.stopMedia}>
                        {stop.venue.thumb ? (
                          <Image
                            src={stop.venue.thumb}
                            alt=""
                            fill
                            sizes="128px"
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div className={styles.thumbFallback} />
                        )}
                      </div>
                      <div className={styles.stopCopy}>
                        <p className={styles.stopEyebrow}>
                          {CATEGORY_LABEL[stop.venue.category]}
                          {day.regionSlug && stop.venue.region !== day.regionSlug
                            ? ` · ${regionDisplayName(stop.venue.region)}`
                            : ''}
                        </p>
                        <h4 className={styles.stopName}>{stop.venue.name}</h4>
                        <p className={styles.stopAddress}>{stop.venue.address}</p>
                        {stop.note ? <p className={styles.stopNote}>{stop.note}</p> : null}
                        <div className={styles.stopActions}>
                          <Link href={stop.venue.href} className={styles.stopLink}>
                            View →
                          </Link>
                          {stop.canSwap && displayPlan.source === 'form' ? (
                            <button
                              type="button"
                              className={styles.swapBtn}
                              onClick={() => swapStop(stop.slotKey)}
                            >
                              Swap
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>

          {/* Print-only sheet — a clean black-on-white document, not the dark site */}
          <div className={`ws-print-sheet ${styles.printSheet}`} aria-hidden>
            <p className={styles.printEyebrow}>Wine Spectator — Napa Valley Guide</p>
            <h2 className={styles.printTitle}>{displayPlan.title}</h2>
            {displayPlan.homeBase ? (
              <p className={styles.printHomeBase}>
                Home base: <strong>{displayPlan.homeBase.name}</strong> ·{' '}
                {displayPlan.homeBase.address} ·{' '}
                {regionDisplayName(displayPlan.homeBase.region)}
              </p>
            ) : null}
            {displayPlan.days.map((day) => (
              <div key={day.index} className={styles.printDay}>
                <h3 className={styles.printDayTitle}>
                  Day {day.index + 1} — {day.regionLabel}
                </h3>
                {day.stops.map((stop) => (
                  <div key={stop.slotKey} className={styles.printStop}>
                    <span className={styles.printStopTime}>{stop.time}</span>
                    <span className={styles.printStopBody}>
                      <strong>{stop.venue.name}</strong>
                      <span className={styles.printStopMeta}>
                        {' '}
                        · {CATEGORY_LABEL[stop.venue.category]} · {stop.venue.address}
                      </span>
                      {stop.note ? (
                        <em className={styles.printStopNote}> — {stop.note}</em>
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            ))}
            <p className={styles.printFooter}>
              Reservations recommended throughout Napa Valley. Full guide:
              napatravel.winespectator.com
            </p>
          </div>

          <div className={styles.howItWorks}>
            <p className={styles.fieldLabel}>How this planner works</p>
            <p className={styles.howText}>
              Every stop comes from the Wine Spectator Napa Valley Guide — no outside
              listings. The concierge interviews you, draws on the guide and Wine
              Spectator&rsquo;s editorial archive, and clusters each day around one town
              or area so you spend your time at tables, not on Highway 29. The quick
              builder does the same deterministically. Share the link — it rebuilds
              this exact trip — or print it for the glovebox.
            </p>
          </div>
        </section>
      ) : null}
    </div>
  )
}
