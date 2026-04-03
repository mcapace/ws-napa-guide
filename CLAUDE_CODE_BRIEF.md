# WS Napa Guide — Claude Code Project Brief
# For: claude code agent
# Project: Wine Spectator Napa Valley Ultimate Guide microsite
# Repo: github.com/mcapace/ws-napa-guide
# Live: https://ws-napa-guide.vercel.app/
# Owner: Michael Capace, VP Digital, M. Shanken Communications

---

## WHAT THIS IS

A Next.js microsite that is the digital companion to Wine Spectator's 
June 2026 print issue — a Napa Valley Ultimate Guide covering wineries, 
restaurants, hotels, and travel itineraries across 7 appellations.

The UX inspiration is therealhotels.com — dark, cinematic, editorial.
Every page should feel like a magazine spread, not a website listing.

---

## TECH STACK

- Next.js 14 App Router
- TypeScript
- Tailwind CSS (minimal usage — most styling is inline)
- Framer Motion
- Mapbox GL / react-map-gl
- Deployed on Vercel
- Git repo: github.com/mcapace/ws-napa-guide

---

## DESIGN SYSTEM (NEVER CHANGE THESE)

### Colors (CSS variables in globals.css)
```css
--ink: #0D0B09          /* primary background — always dark */
--ink-mid: #1A1612      /* slightly lighter dark */
--cream: #F7F3EC        /* primary text */
--bordeaux: #6B1C2A     /* accent */
--gold: #C4943A         /* eyebrows, highlights */
--sage: #5C6B52         /* secondary accent */
--mist: #9B9283         /* secondary text */
--dust: #2A2520         /* card backgrounds */
```

### Typography
- Display / headlines: `Cormorant Garamond`, italic, weight 300–400
- Body / UI: `DM Sans`, weight 300–400
- Loaded via Google Fonts in layout.tsx

### Rules
- Background is ALWAYS dark (#0D0B09) — no white pages anywhere
- Grain overlay on body via CSS noise filter in globals.css
- Custom cursor: 8px circle, mix-blend-mode: difference
- No blue Tailwind defaults — always use brand palette
- No card shadows — use subtle borders only (rgba(247,243,236,0.08))
- Images always use next/image with fill + objectFit: cover

### Logo
- `/public/logos/WS_logo__1_.png` — black text, transparent bg
- Always use with `filter: invert(1)` on dark backgrounds
- Height 22–28px in nav, 18–20px in footer
- NEVER use the white-stroke PNG version in rendered components

---

## SITE ARCHITECTURE

```
src/app/
├── page.tsx                    ← Homepage (sticky scroll hero + content)
├── layout.tsx                  ← Root layout, fonts, globals.css
├── regions/
│   ├── page.tsx                ← Regions index
│   └── [slug]/
│       ├── page.tsx            ← Server: generateStaticParams + metadata
│       └── RegionPageClient.tsx ← Client: full region detail page
├── wineries/
│   ├── page.tsx                ← Wineries index (horizontal browse)
│   └── [slug]/page.tsx         ← Winery detail page
├── dining/
│   ├── page.tsx                ← Dining index
│   └── [slug]/page.tsx         ← Restaurant detail page
├── stay/
│   ├── page.tsx                ← Hotels index
│   └── [slug]/page.tsx         ← Hotel detail page
├── features/
│   └── [slug]/page.tsx         ← Long-form editorial features
├── map/page.tsx                ← Interactive Mapbox map
├── plan/page.tsx               ← Trip planner
└── calendar/page.tsx           ← Seasonal events calendar

src/data/
├── regions.ts      ← 7 AVA regions with full editorial content
├── wineries.ts     ← 20 wineries with coords, descriptions, visit info
├── restaurants.ts  ← 15 restaurants with full descriptions
├── hotels.ts       ← 10 hotels with full descriptions
├── articles.ts     ← 5 feature articles
├── map-pins.ts     ← Generated from listings for Mapbox
└── sponsors.ts     ← Sponsor tier system (null/standard/featured/presenting)

src/components/
├── ui/
│   ├── Nav.tsx              ← Fixed nav, mix-blend-mode: difference
│   ├── Footer.tsx           ← 3-column footer with WS logo
│   ├── MarqueeCTA.tsx       ← Repeating scroll CTA ("explore · explore ·")
│   └── HorizontalStrip.tsx  ← Drag-to-scroll card strip (used everywhere)
├── cards/
│   ├── WineryCard.tsx
│   ├── RestaurantCard.tsx
│   └── HotelCard.tsx
├── map/
│   └── NapaMap.tsx          ← Mapbox component
└── sponsor/
    └── SponsorBlock.tsx     ← Renders sponsor tiers

src/lib/
├── types.ts              ← All TypeScript interfaces
├── test-images.ts        ← TEST_IMAGES array (7 placeholder photos)
├── editorial-styles.ts   ← Shared style constants (primaryCTA, etc.)
└── mapbox.ts             ← Mapbox config, PIN_COLORS, NAPA_CENTER
```

---

## PLACEHOLDER IMAGES

7 test images in `/public/test-images/`:
```
AdobeStock_39828282.jpeg
AdobeStock_85747125.jpeg
AdobeStock_86969265.jpeg
AdobeStock_164779985.jpeg
AdobeStock_286007082.jpeg
AdobeStock_291250504.jpeg
AdobeStock_805204520.jpeg
```
These are Adobe Stock watermarked placeholders — rotate with `index % 7`.
Real photography will replace these. Do not remove or rename them.

---

## THE HOMEPAGE SCROLL MECHANIC (CRITICAL)

The homepage uses a `position: sticky` scroll system to drive the 
hero expand effect — do not change this architecture.

```
[scroll-container: height 400vh, position relative]
  [sticky-hero: height 100vh, position sticky, top 0]
    [5 scattered mosaic photo panels]
    [center video panel — GROWS from 200x140 → 100vw x 100vh]
    [hero copy + "Napa Valley" display type — FADES as expand happens]
    [fullscreen overlay — FADES IN at end of expand]
[content sections flow here in normal document flow]
```

JavaScript reads scroll progress 0→1 through the container using 
`getBoundingClientRect()` and drives all properties via `lerp()`:

```js
// Phase breakdown:
// 0.00 → 0.25: mosaic parallax, everything normal
// 0.25 → 0.85: center panel GROWS, mosaic + copy fade
// 0.85 → 1.00: fullscreen overlay fades in

const expandProgress = clamp((progress - 0.25) / 0.6, 0, 1)
const expandEased    = easeInOut(expandProgress) // cubic easing

// Easing (cubic — slow start, fast middle, slow end):
function easeInOut(t) {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2
}
```

NO React state toggles for the expand — it's driven by raw JS.

JW Player video: `FvwrhNa4` (720p MP4 CDN URL — check page.tsx for exact URL)

---

## THE THEREALHOTELS UX PATTERN

Every page is built to match therealhotels.com in feel:

### Homepage content sections (after the hero):
1. Centered italic intro paragraph + MarqueeCTA
2. Horizontal drag-to-scroll AVA strip (7 regions, 280×520 cards)
3. Alternating region editorial rows (split: photo left | content right)
4. "From the June Issue" feature rows (full-width, alternating)
5. Single winery spotlight (full-bleed 720px block)
6. Horizontal dining strip
7. Horizontal stay strip
8. Email signup + footer

### Detail page pattern (wineries/[slug], dining/[slug], stay/[slug]):
1. Full-bleed 100vh hero image (no padding, edge to edge)
2. AVA badge top-right (small circle sticker)
3. Name bottom-left in massive Cormorant italic (56–120px)
4. Two CTAs: primary (cream bg) + ghost (underlined text)
5. Pull quote section with gold left border
6. Repeat CTAs
7. 3-up photo gallery row (full width, edge to edge)
8. Body copy + practical info (3-column grid)
9. "More from [Region]" HorizontalStrip at bottom

### Region detail page (regions/[slug]):
Same hero pattern then:
- Pull quote (blockquote with gold border)
- Full intro text
- WHERE TO TASTE: FeaturedCard + CompactCard list
- WHERE TO EAT: same pattern
- WHERE TO STAY: CompactCard list
- ADVENTURE: full editorial itinerary text
- More appellations 3-up grid

---

## CONTENT DATA (from June 2026 PDFs)

All article content comes from 12 Wine Spectator PDF articles 
converted from Google Drive. The data is already in src/data/:

| Data file | Author | Content |
|---|---|---|
| regions.ts → oakville | MaryAnn Worobiec | Far Niente, Mondavi, Opus One reopenings |
| regions.ts → rutherford | MaryAnn Worobiec | Inglenook, Staglin, Quintessa, Sauvignon Blanc tour |
| regions.ts → yountville | Aaron Romano | French Laundry, Bouchon, Bardessono, 3 itineraries |
| regions.ts → st-helena | James Molesworth | 100 wineries, Charlie's, Cook, Model Bakery, 4 adventures |
| regions.ts → calistoga | Mitch Frank | Indian Springs, Schramsberg, walkable tasting tour |
| regions.ts → pritchard-hill | James Molesworth | Chappellet, Continuum, David Arthur |
| regions.ts → downtown-napa | MaryAnn Worobiec | Oxbow, Angele, Torc, Carneros adventure |

Key features articles:
- `judgment-of-paris` — Mitch Frank, 50th anniversary of 1976 Paris tasting
- `napa-taco-tour` — Chris Cardoso, 12 taquerias across the valley
- `napa-landmarks` — Chris Cardoso, Welcome Sign + Grape Crusher

---

## MAPBOX SETUP

```
Token: NEXT_PUBLIC_MAPBOX_TOKEN in .env.local
Style: mapbox://styles/mapbox/dark-v11
Center: [-122.4194, 38.4800]
Zoom: 10.5

Pin colors:
  winery → #C4943A (gold)
  dining → #6B1C2A (bordeaux)
  stay   → #5C6B52 (sage)
```

---

## SPONSOR SYSTEM

All sponsor config lives in `src/data/sponsors.ts`.
Four tiers — never hardcode sponsor content in page components:

```
null          → organic editorial (no treatment)
'standard'    → gold "Featured Partner" badge on card
'featured'    → elevated card with custom color strip + logo
'presenting'  → full section takeover — banner, custom copy, logo lockup
```

Sponsor placement is always handled by `SponsorBlock.tsx`.

---

## WHAT'S WORKING

- Homepage sticky scroll hero with video expand ✓
- Smooth cubic easing on expand ✓
- MarqueeCTA component ✓
- HorizontalStrip component (drag-to-scroll) ✓
- Region detail pages (RegionPageClient.tsx) ✓
- All data files populated with real editorial content ✓
- Test images wired throughout ✓
- WS logo with filter:invert(1) ✓
- Footer ✓
- npm run build + lint pass ✓

---

## WHAT STILL NEEDS WORK (priority order)

1. **Winery/dining/stay detail pages** — confirm they render correctly 
   with full-bleed hero, pull quote, gallery row, info block, related strip

2. **AVA drag behavior** — homepage AVA strip needs same drag-to-scroll 
   as HorizontalStrip (extract a shared `useDragScroll(ref)` hook)

3. **Winery/dining/stay INDEX pages** — should be a dark editorial 
   browse page with filter by AVA, not a simple list

4. **Map page** — interactive Mapbox map with category filters, 
   slide-in sidebar on pin click

5. **Features pages** — /features/[slug] for Judgment of Paris, 
   Taco Tour, Landmarks — long-form editorial layout

6. **Calendar page** — /calendar with seasonal events month by month

7. **Plan page** — /plan trip planner tool

8. **Real images** — placeholder Adobe Stock images need replacing 
   with actual Napa photography when available

9. **Mobile responsiveness** — all pages need mobile breakpoints

10. **Performance** — lazy load images below the fold, optimize video

---

## COMMUNICATION PREFERENCES

- No em dashes
- Direct and concise
- No fluff
- Run npm run build after every file
- Fix all TypeScript errors before committing
- Commit messages: "feat:", "fix:", "chore:" prefix
- Always push to main branch
