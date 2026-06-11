# Technical Audit — viceroybali.com
**Server:** ce01 · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: `http://viceroybali.com/` → 301 → 301 → `https://www.viceroybali.com/en/` (200). Polylang language redirect to `/en/`.
- robots.txt: multiple empty `Disallow:` lines (Polylang/plugin generated) — effectively crawlable.
- HTTPS/headers: HTTP/1.1; 2 JSON-LD schema blocks on homepage.
- Platform/version: WordPress 7.0; DB `table_prefix = 'vb21_'` (non-default ✓). **`WP_DEBUG` is conditionally enabled via `$_GET['WP_DEBUG']`** then `define(WP_DEBUG,false)`; `DISALLOW_FILE_EDIT` line is **commented out** (verified in wp-config on ce01).
- Plugins/theme (SSH): Yoast SEO + Premium + wpseo-local, **WP Rocket AND LiteSpeed Cache both present** (dual full-page cache), Polylang, Wordfence, Redirection, UpdraftPlus, Duplicator, ACF Pro, WPForms + CF7, Microsoft Clarity, Instagram/Reviews feeds, WPCode Premium, query-monitor, simple-history. Themes: `viceroybali` (+ `viceroyblock`, `viceroy-git`×3, `viceroybali-git`) and a stray file **`Viceroy broken link.xlsx` sitting in `wp-content/themes/`**.
- Schema: 2 JSON-LD blocks.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Security | `WP_DEBUG` togglable via URL param `?WP_DEBUG=` — can expose errors/paths to anyone. | High |
| Security | `DISALLOW_FILE_EDIT` commented out — dashboard file editor enabled. | Med |
| Performance | WP Rocket **and** LiteSpeed Cache both active — conflicting full-page caches. | High |
| Hygiene | Non-theme file `Viceroy broken link.xlsx` left inside `wp-content/themes/`. | Med |
| Theme bloat | 5+ `viceroy*-git` theme variants on disk. | Low |
| Indexability | Polylang `/en/` redirect + empty robots — crawlable; confirm hreflang correctness. | Info |
| Security (good) | Non-default prefix `vb21_`, Wordfence active. | Info |

## Could not verify
- CWV field data; exact plugin versions/pending updates; whether the GET-debug branch is reachable in production config.

## Top technical fixes (analysis only — NOT executed)
1. Remove the `$_GET['WP_DEBUG']` branch from wp-config; force debug off.
2. Pick ONE caching plugin (WP Rocket or LiteSpeed) — disable the other.
3. Uncomment/enable `DISALLOW_FILE_EDIT`.
4. Delete `Viceroy broken link.xlsx` and the redundant `viceroy*-git` themes.
