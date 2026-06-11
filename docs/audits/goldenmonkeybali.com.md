# Technical Audit — goldenmonkeybali.com
**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live (canonical Golden Monkey site)

## Verified signals
- HTTP/redirects: `http://goldenmonkeybali.com/` 301 → `https://www.goldenmonkeybali.com/` (200). This is the live target of the sanur/ubud redirects.
- robots.txt: `Disallow: /wp-admin/`; `Sitemap: .../sitemap_index.xml`.
- HTTPS/headers: HTTP/2, PHP 8.1.34, LiteSpeed + hcdn (`x-litespeed-cache: hit`), CSP upgrade-insecure-requests. No HSTS.
- Platform/version: WordPress 7.0; title "Best Cantonese Restaurant in Bali — Golden Monkey Restaurant".
- Hostinger API: valid WP install (id 27565453).
- Prior audit: default `wp_` table prefix; 8 installed themes; `WP_AUTO_UPDATE_CORE` minor-only.
- Schema: 1 JSON-LD block.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Security | Default `wp_` table prefix (per prior audit). | Med |
| Performance | PHP 8.1.34 — older than the 8.2/8.3 used elsewhere in the portfolio; upgrade. | Med |
| Theme bloat | ~8 installed themes (goldenmonkey variants + defaults). | Low |
| Security | No HSTS. | Med |
| On-page (good) | Title/schema/sitemap correctly configured. | Info |

## Could not verify
- Live plugin versions (no file SSH); CWV.

## Top technical fixes (analysis only — NOT executed)
1. Upgrade PHP to 8.2/8.3.
2. Migrate off default `wp_` prefix; prune unused themes; add HSTS.
