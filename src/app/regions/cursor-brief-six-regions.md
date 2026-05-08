# Cursor Brief: Add the Remaining Six Region MDX Files

## Context

Oakville is rendering correctly using the editorial template. We're now adding the six remaining region MDX files. Each file matches the schema we locked with Oakville (frontmatter + Lede + Where to Taste + Where to Eat + Sidebar sections).

## What I'm adding

Six files dropping into `src/content/regions/`:

- `yountville.mdx`
- `rutherford.mdx`
- `st-helena.mdx`
- `calistoga.mdx`
- `pritchard-hill.mdx`
- `downtown-napa.mdx`

## What I want you to do

1. **Add the files.** Drop each one into `src/content/regions/`. The schema matches Oakville's exactly.

2. **Migrate Yountville off the legacy `RegionPageClient` template.** Currently `yountville` has a special branch in `src/app/regions/[slug]/page.tsx` that renders `RegionPageClient`. With this MDX file, Yountville should now render through `RegionEditorialPage` like Oakville. Remove the special-case branch for yountville in the route's logic. The MDX takes precedence.

3. **Verify each route renders.** Run `npm run build` and confirm all seven region routes generate (oakville, yountville, rutherford, st-helena, calistoga, pritchard-hill, downtown-napa). Then `npm run dev` and curl each URL to confirm 200 status:
   - `/regions/yountville`
   - `/regions/rutherford`
   - `/regions/st-helena`
   - `/regions/calistoga`
   - `/regions/pritchard-hill`
   - `/regions/downtown-napa`

4. **Note one schema variation.** Pritchard Hill has an additional frontmatter field `exclusiveToOnline: true`. This is a piece I'll use later to render an "Online Exclusive" eyebrow or badge above the hero. For this pass, just ignore the field if it doesn't conflict with parsing. Don't strip it.

5. **Note: each region has slightly different content density.** Yountville is the longest (it includes Where to Stay since the lodging is significant there). Pritchard Hill is shortest (it's a held-from-print exclusive with fewer listings). The template should handle the variation gracefully. Where to Stay sections in Yountville and Calistoga should render with the same FeatureBlock + Directory pattern as Where to Taste and Where to Eat.

## What you don't need to do

- Don't touch the existing legacy templates for Rutherford, St. Helena, Calistoga, Pritchard Hill, Downtown Napa. Those were probably never built since the route falls through to `RegionDetailPage` which expects entries in `data/regions.ts`. Now that MDX exists for these slugs, the MDX branch wins.
- Don't add coordinates to the tasting room directory entries. We'll geocode in batch later.
- Don't replace placeholder hero images. They're using `/test-images/AdobeStock_39828282.jpeg` consistently. We'll swap to real photography after Cordelia's team supplies assets from the InDesign files.

## After this is done

Send me a confirmation that the build passed and all seven region routes render. Then we move on to the four feature pages (Tacos, Judgment of Paris, Landmarks, Calendar), each of which will need its own template variation distinct from the region template.
