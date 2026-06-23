# Staging on Vercel

Use the **`staging`** branch for pre-production review. Production stays on **`main`** → [napatravel.winespectator.com](https://napatravel.winespectator.com).

## Workflow

1. Check out `staging` and merge or cherry-pick your work there (or commit directly on `staging`).
2. Push: `git push origin staging`
3. Vercel builds automatically (Preview environment).
4. Open the stable branch URL (updates on each push to `staging`):

   **https://ws-napa-guide-git-staging-michael-capaces-projects-f6224d63.vercel.app**

5. When ready for live: merge `staging` → `main` (or cherry-pick commits). Production deploys from `main`.

## Environment variables

| Variable | Production | Preview (staging) |
|----------|------------|-------------------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | ✓ | ✓ (already set) |
| `BRAZE_*` | ✓ | ✓ (already set) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ✓ only | **omit** (no GA on staging) |
| `NEXT_PUBLIC_SITE_URL` | `https://napatravel.winespectator.com` | optional; auto from `VERCEL_URL` if unset |

Configure in [Vercel → ws-napa-guide → Settings → Environment Variables](https://vercel.com/michael-capaces-projects-f6224d63/ws-napa-guide/settings/environment-variables).

## Optional custom domain

To use e.g. `staging.napatravel.winespectator.com`:

1. Vercel → Project → **Settings → Domains** → Add domain.
2. Assign the domain to Git branch **`staging`** (not Production).
3. Add the DNS record Vercel shows (CNAME) in your DNS provider.
4. Set Preview env `NEXT_PUBLIC_SITE_URL` to that URL.

## Notes

- `ws-napa-guide.vercel.app` redirects to production (by design in `vercel.json`). Use the **git-staging** URL or your custom staging domain.
- Pritchard Hill and other content-only changes deploy the same way; no separate staging project required.
