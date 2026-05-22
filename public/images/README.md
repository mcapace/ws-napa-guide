# Image assets (`public/images/`)

On-disk layout for homepage and region editorial imagery. Region heroes and featured property stills live under `{region-slug}/`; re-import from a drive zip via `scripts/import-region-drive-images.py`.

## Canonical schema

Deliverable IDs, crops, and bindings to MDX/content live in:

**[`src/data/images-schema.json`](../../src/data/images-schema.json)** (canonical when present).

If that file is not in the repo yet, add it first; this tree matches the folder layout it is intended to describe.

## Filename convention

Each file in a section folder uses:

```text
{deliverable-id}-{orientation}.jpg
```

Examples:

- `yountville-winery-stewart-cellars-landscape.jpg`
- `yountville-winery-stewart-cellars-portrait.jpg`

- `homepage-mosaic-panel-03-landscape.jpg` (IDs follow whatever the schema assigns per deliverable)

**Rules:**

- **`deliverable-id`** — Stable slug from the schema’s `filename` / id field (kebab-case, unique per asset).
- **`orientation`** — Exactly two crops per deliverable:
  - `-landscape.jpg`
  - `-portrait.jpg`

Property-level images are **not** nested in per-property subfolders: both crops sit **directly** in the section folder for that type (e.g. `yountville/wineries/` holds all winery property pairs for Yountville).

## Folder map

| Path | Role |
|------|------|
| `homepage/hero/` | Full-bleed hero: `video.mp4`, `poster.jpg` (plus any schema-defined stills) |
| `homepage/mosaic/` | Mosaic stills (`collage-*.jpg`): **portrait** (5:7) for 4 tall tiles, **landscape** (5:4) for center-wide tile; rotation is slot-filtered in `home-mosaic-images.ts` |
| `homepage/cards/` | Pinned region cards: 7 regions × 2 crops each |
| `{region-slug}/hero/` | Region hero: landscape + portrait pair per schema |
| `{region-slug}/wineries/` | Winery section images (N × 2 crops) |
| `{region-slug}/restaurants/` | Restaurant section images |
| `{region-slug}/breakfast/` | Breakfast section hero (where applicable) |
| `{region-slug}/hotels/` | Hotel section images |
| `{region-slug}/sidebar/` | Sidebar callout imagery |

**Region slugs in this repo:** `yountville`, `oakville`, `rutherford`, `st-helena`, `calistoga`, `pritchard-hill`, `downtown-napa`.

## Feature pages

Feature-specific trees are **not** scaffolded here yet. When `images-schema.json` defines feature deliverables, add e.g. `public/images/features/{slug}/...` mirroring the same `{id}-{orientation}.jpg` rule and section subfolders.
