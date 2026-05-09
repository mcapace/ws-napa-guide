import { NextResponse } from 'next/server'

function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    console.error('subscribe: invalid JSON body')
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const rec = body as Record<string, unknown>
  const email = typeof rec.email === 'string' ? rec.email.trim() : ''
  const firstName = typeof rec.firstName === 'string' ? rec.firstName.trim() : ''
  const lastName = typeof rec.lastName === 'string' ? rec.lastName.trim() : ''

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const apiKey = process.env.BRAZE_API_KEY
  const endpointRaw = process.env.BRAZE_API_ENDPOINT
  const groupId = process.env.BRAZE_NAPA_GUIDE_GROUP_ID

  if (!apiKey?.trim() || !endpointRaw?.trim() || !groupId?.trim()) {
    console.error('subscribe: missing Braze env (BRAZE_API_KEY, BRAZE_API_ENDPOINT, or BRAZE_NAPA_GUIDE_GROUP_ID)')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const endpoint = endpointRaw.replace(/\/+$/, '')

  let brazeRes: Response
  try {
    brazeRes = await fetch(`${endpoint}/users/track`, {
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
            first_name: firstName,
            last_name: lastName,
            subscription_groups: [
              {
                subscription_group_id: groupId.trim(),
                subscription_state: 'subscribed',
              },
            ],
          },
        ],
      }),
    })
  } catch (err) {
    console.error('subscribe: Braze fetch failed', err)
    return NextResponse.json({ error: 'Upstream error' }, { status: 500 })
  }

  if (!brazeRes.ok) {
    const text = await brazeRes.text()
    console.error('subscribe: Braze API error', brazeRes.status, text)
    return NextResponse.json({ error: 'Upstream error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
