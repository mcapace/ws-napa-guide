// Itinerary-builder lead capture with double verification:
// 1) email + confirm-email + consent + MX / disposable checks
// 2) 6-digit code emailed via Resend, then verified before unlock
// Verified leads are forwarded to Braze tagged as planner users.

import { createHmac, timingSafeEqual } from 'crypto'
import { promises as dns } from 'dns'
import { NextResponse } from 'next/server'

export const maxDuration = 15

const OTP_WINDOW_MS = 10 * 60 * 1000

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'sharklasers.com',
  '10minutemail.com',
  'temp-mail.org',
  'tempmail.com',
  'throwawaymail.com',
  'yopmail.com',
  'getnada.com',
  'trashmail.com',
  'maildrop.cc',
  'dispostable.com',
  'fakeinbox.com',
  'mintemail.com',
  'mytemp.email',
  'tempinbox.com',
])

function parseEmail(raw: unknown): { email: string; domain: string } | null {
  if (typeof raw !== 'string') return null
  const email = raw.trim().toLowerCase()
  if (!email || email.length > 254) return null
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null
  const domain = email.split('@')[1]
  if (!domain) return null
  return { email, domain }
}

async function domainAcceptsMail(domain: string): Promise<boolean> {
  try {
    const mx = await dns.resolveMx(domain)
    return mx.length > 0
  } catch {
    try {
      const a = await dns.resolve(domain)
      return a.length > 0
    } catch {
      return false
    }
  }
}

function otpSecret(): string {
  return (
    process.env.PLAN_OTP_SECRET?.trim() ||
    process.env.RESEND_API_KEY?.trim() ||
    process.env.BRAZE_API_KEY?.trim() ||
    ''
  )
}

function windowIndex(at = Date.now()): number {
  return Math.floor(at / OTP_WINDOW_MS)
}

function codeFor(email: string, window: number): string {
  const secret = otpSecret()
  const digest = createHmac('sha256', secret).update(`plan-otp:${email}:${window}`).digest()
  const n = digest.readUInt32BE(0) % 1_000_000
  return String(n).padStart(6, '0')
}

function codesMatch(a: string, b: string): boolean {
  const aa = Buffer.from(a.padStart(6, '0'))
  const bb = Buffer.from(b.padStart(6, '0'))
  if (aa.length !== bb.length) return false
  return timingSafeEqual(aa, bb)
}

function verifyOtp(email: string, code: string): boolean {
  if (!/^\d{6}$/.test(code)) return false
  if (!otpSecret()) return false
  const w = windowIndex()
  return codesMatch(code, codeFor(email, w)) || codesMatch(code, codeFor(email, w - 1))
}

async function sendOtpEmail(email: string, code: string): Promise<'ok' | 'unavailable' | 'failed'> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = process.env.RESEND_FROM_EMAIL?.trim()
  if (!apiKey || !from) return 'unavailable'

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: `${code} is your Wine Spectator Napa Guide code`,
        html: `
          <div style="font-family: Georgia, serif; color: #1a1a1a; line-height: 1.5;">
            <p>Your verification code for the Napa Valley itinerary builder:</p>
            <p style="font-size: 28px; letter-spacing: 0.2em; font-weight: bold;">${code}</p>
            <p style="color: #555;">This code expires in about 10 minutes. If you didn’t request it, you can ignore this email.</p>
            <p style="color: #888; font-size: 12px;">Wine Spectator · M. Shanken Communications</p>
          </div>
        `,
        text: `Your Wine Spectator Napa Guide verification code is ${code}. It expires in about 10 minutes.`,
      }),
    })
    if (!res.ok) {
      console.error('plan-lead: Resend responded', res.status, await res.text())
      return 'failed'
    }
    return 'ok'
  } catch (err) {
    console.error('plan-lead: Resend send failed', err)
    return 'failed'
  }
}

async function forwardToBraze(email: string): Promise<void> {
  const apiKey = process.env.BRAZE_API_KEY
  const endpointRaw = process.env.BRAZE_API_ENDPOINT
  const groupId = process.env.BRAZE_NAPA_GUIDE_GROUP_ID
  if (!apiKey?.trim() || !endpointRaw?.trim()) {
    console.warn('plan-lead: Braze env missing — lead accepted but not forwarded', email)
    return
  }
  const endpoint = endpointRaw.replace(/\/+$/, '')
  try {
    const res = await fetch(`${endpoint}/users/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        attributes: [
          {
            external_id: email,
            email,
            napa_itinerary_builder: true,
            napa_itinerary_builder_consent_at: new Date().toISOString(),
            napa_itinerary_builder_verified: true,
            ...(groupId?.trim()
              ? {
                  subscription_groups: [
                    {
                      subscription_group_id: groupId.trim(),
                      subscription_state: 'subscribed',
                    },
                  ],
                }
              : {}),
          },
        ],
      }),
    })
    if (!res.ok) {
      console.error('plan-lead: Braze responded', res.status, await res.text())
    }
  } catch (err) {
    console.error('plan-lead: Braze forward failed', err)
  }
}

async function validateLeadEmail(
  emailRaw: unknown,
  confirmRaw: unknown,
  consent: unknown,
): Promise<
  | { ok: true; email: string }
  | { ok: false; error: string; status: number }
> {
  if (consent !== true) {
    return { ok: false, error: 'consent_required', status: 400 }
  }

  const parsed = parseEmail(emailRaw)
  if (!parsed) {
    return { ok: false, error: 'invalid_email', status: 400 }
  }

  const confirm = typeof confirmRaw === 'string' ? confirmRaw.trim().toLowerCase() : ''
  if (confirm !== parsed.email) {
    return { ok: false, error: 'email_mismatch', status: 400 }
  }

  if (DISPOSABLE_DOMAINS.has(parsed.domain)) {
    return { ok: false, error: 'disposable_email', status: 400 }
  }

  if (!(await domainAcceptsMail(parsed.domain))) {
    return { ok: false, error: 'undeliverable_email', status: 400 }
  }

  return { ok: true, email: parsed.email }
}

export async function POST(request: Request) {
  let body: {
    action?: unknown
    email?: unknown
    confirmEmail?: unknown
    code?: unknown
    consent?: unknown
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const action = body.action === 'verify' ? 'verify' : 'request'

  if (action === 'request') {
    const validated = await validateLeadEmail(body.email, body.confirmEmail, body.consent)
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: validated.status })
    }

    if (!otpSecret()) {
      return NextResponse.json({ error: 'email_send_unavailable' }, { status: 503 })
    }

    const code = codeFor(validated.email, windowIndex())
    const sent = await sendOtpEmail(validated.email, code)
    if (sent === 'unavailable') {
      return NextResponse.json({ error: 'email_send_unavailable' }, { status: 503 })
    }
    if (sent === 'failed') {
      return NextResponse.json({ error: 'email_send_failed' }, { status: 502 })
    }

    const payload: { ok: true; step: 'code'; debugCode?: string } = {
      ok: true,
      step: 'code',
    }
    // Local/staging only: echo code when explicitly enabled (never on production)
    if (
      process.env.PLAN_OTP_DEV_ECHO === '1' &&
      process.env.VERCEL_ENV !== 'production'
    ) {
      payload.debugCode = code
    }

    return NextResponse.json(payload)
  }

  // verify
  const validated = await validateLeadEmail(body.email, body.confirmEmail ?? body.email, body.consent)
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: validated.status })
  }

  const code = typeof body.code === 'string' ? body.code.trim() : ''
  if (!verifyOtp(validated.email, code)) {
    return NextResponse.json({ error: 'invalid_code' }, { status: 400 })
  }

  await forwardToBraze(validated.email)
  return NextResponse.json({ ok: true, unlocked: true })
}
