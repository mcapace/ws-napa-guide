# Staging on Vercel

Use the **`staging`** branch for pre-production review. Production stays on **`main`** → [napatravel.winespectator.com](https://napatravel.winespectator.com).

## Workflow

1. Check out `staging` and merge or cherry-pick your work there (or commit directly on `staging`).
2. Push: `git push origin staging`
3. Vercel builds automatically (Preview environment).
4. Open the staging site:

   **https://ws-napa-guide-staging.vercel.app** (stable alias)

   Or the per-deployment preview URL from the Vercel dashboard / GitHub commit check.

5. When ready for live: merge `staging` → `main` (or cherry-pick commits). Production deploys from `main`.

## Environment variables

| Variable | Production | Preview (staging) |
|----------|------------|-------------------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | ✓ | ✓ (already set) |
| `BRAZE_*` | ✓ | ✓ (already set) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ✓ only | **omit** (no GA on staging) |
| `NEXT_PUBLIC_SITE_URL` | `https://napatravel.winespectator.com` | optional; auto from `VERCEL_URL` if unset |

Configure in [Vercel → ws-napa-guide → Settings → Environment Variables](https://vercel.com/michael-capaces-projects-f6224d63/ws-napa-guide/settings/environment-variables).

## Deployment protection (Preview)

Preview deployments may require Vercel login (HTTP 401) if **Deployment Protection** is enabled for the team.

For a shareable staging site:

1. [Vercel → ws-napa-guide → Settings → Deployment Protection](https://vercel.com/michael-capaces-projects-f6224d63/ws-napa-guide/settings/deployment-protection)
2. Under **Preview Deployments**, choose **Standard Protection** with your team, or disable protection for previews if you need a fully public staging URL.

Production (`napatravel.winespectator.com`) is unaffected.

## Optional custom domain

To use e.g. `staging.napatravel.winespectator.com`:

1. Vercel → Project → **Settings → Domains** → Add domain.
2. Assign the domain to Git branch **`staging`** (not Production).
3. Add the DNS record Vercel shows (CNAME) in your DNS provider.
4. Set Preview env `NEXT_PUBLIC_SITE_URL` to that URL.

To keep **`ws-napa-guide-staging.vercel.app`** on the latest `staging` push automatically: in **Settings → Domains**, assign that hostname to Git branch `staging` (instead of a one-off deployment alias).

## Notes

- `ws-napa-guide.vercel.app` redirects to production (by design in `vercel.json`). Use the **git-staging** URL or your custom staging domain.
- Pritchard Hill and other content-only changes deploy the same way; no separate staging project required.
