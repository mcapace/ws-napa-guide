// Napa Concierge — Claude-powered itinerary chat, grounded in the guide's
// own venue catalog plus winespectator.com via domain-restricted web search.

import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'
import { REGION_SOUTH_TO_NORTH } from '@/data/region-order'
import { buildAllRegionPins } from '@/lib/all-region-pins'
import {
  isPartnerItineraryPreferenceActive,
  isPreferredPartnerVenue,
  partnerItineraryPreferencePrompt,
} from '@/lib/partner-itinerary-preference'

export const maxDuration = 60

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const MAX_TURNS = 40
const MAX_MESSAGE_CHARS = 4000

let catalogPromise: Promise<string[]> | null = null

/** Base catalog lines (no preference flags) — safe to cache for the process life. */
async function baseCatalogLines(): Promise<string[]> {
  catalogPromise ??= buildAllRegionPins().then((pins) =>
    pins.map(
      (p) =>
        `${p.slug} | ${p.name} | ${p.category} | ${p.region} | ${p.excerpt}${p.editorial ? ' | featured' : ''}`,
    ),
  )
  return catalogPromise
}

/** Compact venue catalog for the system prompt — one line per venue, keyed by
 *  slug so the model can only recommend places that exist in the guide. */
async function venueCatalog(): Promise<string> {
  const lines = [...(await baseCatalogLines())]
  if (!isPartnerItineraryPreferenceActive()) return lines.join('\n')

  const marked = lines.map((line) => {
    // slug | name | category | region | excerpt [| featured]
    const parts = line.split(' | ')
    const name = parts[1] ?? ''
    const category = parts[2] ?? ''
    const region = parts[3] ?? ''
    if (
      isPreferredPartnerVenue({
        name,
        region,
        category,
      })
    ) {
      return line.includes('preferred-partner') ? line : `${line} | preferred-partner`
    }
    return line
  })

  marked.sort((a, b) => {
    const ap = a.includes('preferred-partner') ? 0 : 1
    const bp = b.includes('preferred-partner') ? 0 : 1
    return ap - bp
  })
  return marked.join('\n')
}

function systemPrompt(catalog: string): Anthropic.Messages.TextBlockParam[] {
  const preferenceActive = isPartnerItineraryPreferenceActive()
  const preferenceCatalogNote = preferenceActive
    ? ' Catalog rows marked preferred-partner should be used for tasting stops when that day\'s region matches.'
    : ''

  return [
    {
      type: 'text',
      text: `You are the Wine Spectator Napa Valley Guide concierge — a warm, knowledgeable trip planner who builds day-by-day Napa Valley itineraries exclusively from the venues in this guide.

## How to work

1. QUALIFY FIRST. Before proposing an itinerary, learn what you need through at most two short rounds of questions. Cover whatever is still unknown of: trip length and rough dates/season, whether lodging is already booked (and where), wine tastes (Cabernet devotee? bubbles? boutique producers?), food style and budget, pace (leisurely vs. packed), the occasion (anniversary, first visit, group trip), and any non-wine interests (spa, art, cycling, ballooning). Ask only what's missing — if the visitor already told you, don't re-ask. Keep questions conversational, 2-4 at a time, never a form.
2. THEN PROPOSE. Build a day-by-day plan: one town or area per day so guests aren't zigzagging Highway 29 (regions south to north: ${REGION_SOUTH_TO_NORTH.join(', ')}). Typical rhythm: morning tasting (~10:30 AM), lunch (~1 PM), afternoon tasting or between-pours activity (~3:30 PM), dinner (~7 PM). Recommend one hotel as home base unless lodging is booked. Reservations are the norm in Napa — note when a pick is famously hard to book (e.g. The French Laundry) and give a fallback.
3. ITERATE. After proposing, refine on feedback — swap venues, rebalance days, adjust pace.

## Hard rules

- Recommend ONLY venues from the catalog below, referenced by their exact slug. Never invent a venue, and never recommend one that isn't listed.
- You may use web search (restricted to winespectator.com) to enrich recommendations with Wine Spectator editorial context — wine ratings, producer stories, dining awards. Search at most when it genuinely helps; never cite other websites.
- Keep prose tight and warm. No bullet-point walls during questioning.
${partnerItineraryPreferencePrompt()}
## Output contract

Every time you present or revise a full itinerary, end your message with the machine-readable block (the visitor never sees it — the site renders it as day cards and a map):

<itinerary>{"title":"...","homeBase":"<stay-slug or null>","days":[{"label":"Day 1","region":"<region-slug>","stops":[{"time":"10:30 AM","label":"Morning tasting","slug":"<venue-slug>","note":"one sentence on why this pick, tailored to the visitor"}]}]}</itinerary>

JSON must be valid, single-line, using only slugs from the catalog and region slugs from: ${REGION_SOUTH_TO_NORTH.join(', ')}. Include the block only with a full proposal or revision — never during questioning.${preferenceCatalogNote}

## Venue catalog (slug | name | category | region | address)

${catalog}`,
      cache_control: { type: 'ephemeral' },
    },
  ]
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  let body: { messages?: ChatMessage[] }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const messages = (body.messages ?? [])
    .filter(
      (m): m is ChatMessage =>
        (m?.role === 'user' || m?.role === 'assistant') &&
        typeof m?.content === 'string' &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }))

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const client = new Anthropic()

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4096,
      thinking: { type: 'adaptive' },
      output_config: { effort: 'medium' },
      system: systemPrompt(await venueCatalog()),
      tools: [
        {
          type: 'web_search_20260209',
          name: 'web_search',
          max_uses: 2,
          allowed_domains: ['winespectator.com'],
        },
      ],
      messages,
    })

    const reply = response.content
      .filter((block): block is Anthropic.Messages.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('')

    if (response.stop_reason === 'refusal' || !reply.trim()) {
      return NextResponse.json({
        reply:
          "I wasn't able to answer that one — let's keep it to planning your Napa trip. What would you like to adjust?",
      })
    }

    return NextResponse.json({ reply })
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError || err instanceof Anthropic.InternalServerError) {
      return NextResponse.json({ error: 'busy' }, { status: 503 })
    }
    console.error('concierge error', err)
    return NextResponse.json({ error: 'upstream' }, { status: 502 })
  }
}
