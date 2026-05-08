# Cursor Brief: Region Page and Homepage Polish Round

## Context

Seven region pages are rendering through MDX with the editorial template. The bones are right, but several polish items have surfaced from review. This brief covers eight changes ranging from content cleanup to motion design. Apply them in roughly the order listed since some have dependencies.

Verify Oakville, Yountville (most content), Rutherford (where the data bug surfaced), and Pritchard Hill (sparsest) after each change. Build must pass at the end.

---

## 1. Diagnose the Rutherford tasting room directory data bug (do this first)

The Rutherford page is rendering tasting rooms with addresses that don't match the MDX file. Specifically, "Bella Union Winery" appears with address "864 Rue Notre Dame" (which is in Montreal, not Napa). The page is also showing Flora Springs, Peju Province Winery, Raymond Vineyards, and Round Pond Estate, none of which appear in the Rutherford MDX directory with those addresses.

The intended Rutherford tasting room directory from `src/content/regions/rutherford.mdx` is exactly: Mumm Napa, Round Pond Cellars, Rutherford Hill Winery, Sequoia Grove Winery, St. Supéry Estate Vineyards & Winery, Sullivan Rutherford Estate.

Before fixing anything, please diagnose: where is the data on the page coming from? Possibilities:

- The page is reading from `src/data/regions.ts` (legacy) instead of (or in addition to) the MDX
- The page is merging both sources
- A different region's directory is leaking into Rutherford's render
- The MDX parser is failing silently and falling back to legacy data

Show me what you find before applying any fix. Once we know the cause, the fix is: MDX must be the single source of truth for region content. Legacy data should not render alongside or instead of MDX. Other regions may have the same problem; verify after fixing Rutherford.

## 2. Remove the Related Stories rail from all region pages

Currently every region page ends with a "Related stories" section showing cards for Judgment of Paris, Landmarks, etc. Those features don't exist as pages yet, so the cards link to either 404s or placeholders.

Remove the `RelatedStoriesRail` component rendering from `RegionEditorialPage`. Leave the `relatedFeatures` field intact in the MDX frontmatter (we'll use it again later when feature pages are built), just don't render the rail. Pages should end with the sidebar callout, then the global footer.

## 3. Replace marquee phrases on region pages with editorial copy

The marquee currently renders the section name repeated, e.g. "WHERE TO TASTE · WHERE TO TASTE · WHERE TO TASTE". This reads as templated. Replace with editorial phrases that have voice.

Add a `marqueePhrases` field to the MDX frontmatter that maps section keys to display phrases. Example:

```yaml
marqueePhrases:
  taste: The filet mignon of the valley
  eat: Tables worth the journey
  stay: Where to wake up tomorrow
  sidebar: While you're here
```

The `MarqueeRibbon` component should accept the phrase as a prop, falling back to the section name if no phrase is provided. Don't change the animation behavior or 95s timing, only the text.

For Oakville's MDX, set:
- taste: "The filet mignon of the valley"
- eat: "Tables worth the journey"
- sidebar: "An aside on Mondavi and BV"

For other regions, leave the field blank for now. I'll provide phrases for the other six in a follow-up. The fallback to section name should kick in for them until I do.

## 4. Kill the marquee on the homepage entirely

The homepage currently shows an "EXPLORE THE GUIDE · EXPLORE THE GUIDE" marquee inside a thin bordered rectangle. The bordered box looks like a UI element rather than editorial punctuation, and the repeated phrase doesn't add value.

Remove the marquee from the homepage. The section transitions on the homepage should rely on the editorial flow alone (whitespace, headlines, image scale). Don't replace it with a different marquee, just remove it. The marquee remains on region pages with the new phrasing from item 3.

## 5. Replace homepage region icons with deliberate per-region symbols

As you scroll the homepage, each region's name slides in with a small icon next to it. Currently those icons are placeholders (wine glass, Greek temple, etc.) that don't reflect anything specific about the region.

Replace them with this mapping using Lucide icons (already in the stack via `lucide-react`):

- **Oakville:** `Leaf` (or `TreePine` if Leaf reads too small) — references the oak in the name
- **Rutherford:** `Wine` or `Building` — leans into the storied-vineyard, château identity
- **Yountville:** `Star` — culinary hub, French Laundry is a Grand Award winner
- **Pritchard Hill:** `Mountain` or `MountainSnow` — elevation, above the fog line
- **St. Helena:** `Home` or `Trees` — the prettiest town in the valley, fruit tree heritage
- **Calistoga:** `Droplet` or `Waves` — geothermal hot springs, wellness retreat
- **Downtown Napa:** `Building2` or a bridge icon — urban gateway, walkable downtown

Use `Leaf`, `Building`, `Star`, `MountainSnow`, `Home`, `Droplet`, `Building2` as the first-pass set. If any of these read poorly at the rendered size (probably 24-32px), suggest alternatives from Lucide's set.

The icon-to-region mapping should be a deliberate object, not random. Centralize it somewhere reusable (a `regionIcons.ts` file or similar) since this same mapping may be needed elsewhere later (sitemap, navigation, etc.).

## 6. Tasting room directory typography

Once item 1's data issue is resolved, increase the size of the tasting room list:

- **Names:** ~22-24px, weight 600, dark text (current looks like ~16px bold)
- **Addresses:** ~16-18px, weight 400, dark text at 70% opacity
- **URLs:** ~14-15px, small caps, letter-spacing 0.1em, weight 500, in a muted dark color (NOT the bright burgundy currently used). Underline on hover.

The list should feel like primary editorial content, not a footer. Currently the burgundy URLs are the brightest element on the page in that section, which inverts the visual hierarchy.

Same treatment applies to the lodging directory in Yountville and Calistoga.

## 7. Geocode and add map pins for tasting rooms

Each tasting room currently has no map pin. The map shows only the region center. Add a pin for each entry in every directory.

Build a one-time geocoding script that:
1. Reads all tasting room and lodging entries from every region MDX file
2. Calls the Mapbox Geocoding API for each address (with city/region context: append "Napa Valley, CA" to each query)
3. Writes the resulting `lat/lng` back into the MDX file as structured data on each entry
4. Commits the result

The script should be runnable manually (e.g. `npm run geocode`), not run at build time. Cache results so re-running doesn't re-query already-resolved addresses. Handle failures gracefully (log them, leave the entry without coordinates rather than blocking the build).

After geocoding completes, update the `TastingRoomDirectoryMap` to render a pin per entry, with a popup on click showing name, address, and website link. Center the map on the bounding box of all pins per region rather than the static region center.

If a one-time script is too much scope for this round, an alternative is inline build-time geocoding cached to a JSON file in the repo. Either approach is fine. The output requirement is the same: visible pins on the map.

## 8. FeatureBlock motion and scroll smoothness

The FeatureBlocks scroll past as static rectangles, making the page read as a sequence of slides rather than a flowing editorial scroll. Three changes to add scroll-driven life:

**Parallax on images.** Each FeatureBlock's image should translate vertically as the block passes through the viewport. Use Framer Motion's `useScroll` and `useTransform`. Range: -40px at top of viewport to +40px at bottom. The image moves at roughly 60% the rate of the surrounding scroll. Don't apply parallax to the text column, just the image.

**Reveal on entry.** When a FeatureBlock crosses the 20% viewport threshold (use `useInView` with `once: true` so it doesn't replay on scroll-back), the image fades from opacity 0 to 1 and scales from 1.02 to 1.0 over 700ms with an ease-out curve. The text column fades from opacity 0 to 1 and translates from y:20 to y:0, staggered 100ms after the image, same duration and easing. Apply to every FeatureBlock on the regions, not just the first one.

**Lenis tuning.** Check the Lenis configuration. If at default values, try `lerp: 0.08`, `duration: 1.2`, `smoothWheel: true`. Test the scroll feel. If too floaty, dial back to `lerp: 0.1`. Goal: gliding scroll, not laggy scroll. Reference: therealhotels.com.

Performance constraints: animations must run on `transform` and `opacity` only, never `top`/`left` or anything that triggers layout. Use `will-change` sparingly and only on actively animating elements. If this introduces stutter on Safari or mobile, prioritize performance over polish.

Don't add: Ken Burns zoom on images, crossfades between blocks, animation on the marquee/hero/sidebar/directory list. Those areas are working.

---

## Verification checklist

After all changes, verify:

1. Rutherford tasting room directory shows the correct six wineries with the correct addresses
2. No Related Stories rail at the bottom of any region page
3. Marquee on Oakville reads "The filet mignon of the valley" before featured wineries (and the other custom phrases on their respective sections)
4. Other regions still render marquees with section name as fallback
5. Homepage has no marquee
6. Homepage region icons match the mapping above (Oakville with leaf, Yountville with star, etc.)
7. Tasting room list type is larger, URLs are no longer bright burgundy
8. Map shows a pin per tasting room (or describe what blocked geocoding if not done this round)
9. FeatureBlocks fade and slightly scale on entry, images parallax as you scroll
10. Lenis scroll feels smoother than before
11. `npm run build` passes without errors

For items 8 and 9 specifically, test on Chrome desktop and Safari mobile if possible. Animations that look smooth on Chrome can stutter on Safari, especially on older iPhones.

## What to send me back

A single confirmation message after you've completed everything, including:

- What the Rutherford data bug turned out to be (item 1)
- Which Lenis values you ended up with (item 8)
- Any items you couldn't complete or had to scope back, with reason
- Any of the Lucide icon picks you replaced and why
- Build status

Don't ping me for clarification on individual items unless you hit a real blocker. The brief is intended to be self-contained.
