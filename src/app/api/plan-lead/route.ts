// Itinerary-builder lead capture with double verification:
// 1) email + confirm-email + consent + MX / disposable checks
// 2) 6-digit code emailed via SendGrid, then verified before unlock
// Leads are stored in Supabase (consent on request, verified on success).

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

// ── OTP (stateless, HMAC over a 10-minute window; no server-side storage) ──

function otpSecret(): string {
  return (
    process.env.PLAN_OTP_SECRET?.trim() ||
    process.env.SENDGRID_API_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
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

// ── Email delivery via SendGrid ──

const OTP_EMAIL_HTML = (code: string) => `
  <div style="font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; line-height: 1.6; max-width: 480px;">
    <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #8a6d2f; margin: 0 0 12px;">Wine Spectator · Napa Valley Guide</p>
    <p>Your verification code for the Napa Valley itinerary builder:</p>
    <p style="font-size: 30px; letter-spacing: 0.24em; font-weight: bold; margin: 16px 0;">${code}</p>
    <p style="color: #555;">This code expires in about 10 minutes. If you didn&rsquo;t request it, you can ignore this email.</p>
    <p style="color: #888; font-size: 12px; margin-top: 20px;">Wine Spectator · M. Shanken Communications</p>
  </div>
`

const OTP_EMAIL_TEXT = (code: string) =>
  `Your Wine Spectator Napa Guide verification code is ${code}. It expires in about 10 minutes.`

async function sendOtpEmail(email: string, code: string): Promise<'ok' | 'unavailable' | 'failed'> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim()
  const from = process.env.SENDGRID_FROM_EMAIL?.trim()
  if (!apiKey || !from) return 'unavailable'
  const fromName = process.env.SENDGRID_FROM_NAME?.trim() || 'Wine Spectator Napa Valley Guide'

  try {
    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email }] }],
        from: { email: from, name: fromName },
        subject: `${code} is your Wine Spectator Napa Guide code`,
        content: [
          { type: 'text/plain', value: OTP_EMAIL_TEXT(code) },
          { type: 'text/html', value: OTP_EMAIL_HTML(code) },
        ],
        // Transactional: never route through a suppression/unsub group
        mail_settings: { bypass_list_management: { enable: true } },
      }),
    })
    // SendGrid returns 202 Accepted on success
    if (res.status === 202) return 'ok'
    console.error('plan-lead: SendGrid responded', res.status, await res.text())
    return 'failed'
  } catch (err) {
    console.error('plan-lead: SendGrid send failed', err)
    return 'failed'
  }
}

// ── Lead storage in Supabase (PostgREST upsert, service-role key) ──

function supabaseConfig(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !key) return null
  return { url: url.replace(/\/+$/, ''), key }
}

/** Upsert a lead row. `patch` sets only the columns provided; email is the
 *  conflict key, so re-requests refresh consent without clobbering `verified`. */
async function upsertLead(email: string, patch: Record<string, unknown>): Promise<void> {
  const sb = supabaseConfig()
  if (!sb) {
    console.warn('plan-lead: Supabase env missing — lead not stored', email)
    return
  }
  try {
    const res = await fetch(`${sb.url}/rest/v1/plan_leads?on_conflict=email`, {
      method: 'POST',
      headers: {
        apikey: sb.key,
        Authorization: `Bearer ${sb.key}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({ email, updated_at: new Date().toISOString(), ...patch }),
    })
    if (!res.ok) {
      console.error('plan-lead: Supabase upsert', res.status, await res.text())
    }
  } catch (err) {
    console.error('plan-lead: Supabase upsert failed', err)
  }
}

// ── Shared validation ──

async function validateLeadEmail(
  emailRaw: unknown,
  confirmRaw: unknown,
  consent: unknown,
): Promise<{ ok: true; email: string } | { ok: false; error: string; status: number }> {
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

    // Capture the lead with consent as soon as the code is sent — even
    // visitors who never enter the code are recorded (with verified=false).
    await upsertLead(validated.email, {
      consent: true,
      consent_at: new Date().toISOString(),
      source: 'itinerary_builder',
    })

    const payload: { ok: true; step: 'code'; debugCode?: string } = {
      ok: true,
      step: 'code',
    }
    // Local/staging only: echo the code when explicitly enabled (never in production)
    if (process.env.PLAN_OTP_DEV_ECHO === '1' && process.env.VERCEL_ENV !== 'production') {
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

  await upsertLead(validated.email, {
    consent: true,
    verified: true,
    verified_at: new Date().toISOString(),
    source: 'itinerary_builder',
  })

  return NextResponse.json({ ok: true, unlocked: true })
}
