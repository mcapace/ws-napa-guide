// Itinerary-builder lead capture: validates the email is real (syntax +
// MX-record check + disposable-domain blocklist), requires consent, and
// forwards the lead to Braze tagged as a planner user.

import { promises as dns } from 'dns'
import { NextResponse } from 'next/server'

export const maxDuration = 15

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
    // No MX — fall back to an A/AAAA lookup (some domains receive mail that way)
    try {
      const a = await dns.resolve(domain)
      return a.length > 0
    } catch {
      return false
    }
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

export async function POST(request: Request) {
  let body: { email?: unknown; consent?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  if (body.consent !== true) {
    return NextResponse.json({ error: 'consent_required' }, { status: 400 })
  }

  const parsed = parseEmail(body.email)
  if (!parsed) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  if (DISPOSABLE_DOMAINS.has(parsed.domain)) {
    return NextResponse.json({ error: 'disposable_email' }, { status: 400 })
  }

  if (!(await domainAcceptsMail(parsed.domain))) {
    return NextResponse.json({ error: 'undeliverable_email' }, { status: 400 })
  }

  // Fire-and-forget is unsafe on serverless — await the forward
  await forwardToBraze(parsed.email)

  return NextResponse.json({ ok: true })
}
