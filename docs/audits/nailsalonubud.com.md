# Technical Audit — nailsalonubud.com

> **In plain terms (for the team):** Your site is generally secure and Google can crawl it effectively, but there's a significant risk to your business: your database might be shared with another site (shares `4bXazL_` table prefix with hairsalonubud), which is a major security vulnerability. While the site is reasonably fast due to active caching (LiteSpeed cache hit), you should also remove inactive plugins and upgrade PHP for better performance and security.

**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: `https://nailsalonubud.com/` → 200 directly (non-www canonical; no redirect hop).
- robots.txt: allows all (`Disallow:` empty); `Sitemap: .../sitemap_index.xml`.
- sitemap: Yoast index, multiple sub-sitemaps.
- HTTPS/headers: HTTP/2, LiteSpeed + hcdn (`x-litespeed-cache: hit` — caching active), CSP upgrade-insecure-requests. No HSTS.
- Platform/version: WordPress 7.0, PHP 8.1.34 (hpanel).
- Hostinger API: valid WP install (id 11375810).
- Prior audit: dual SEO plugins (RankMath inactive + Yoast), 35 plugins, Google Site Kit inactive, shared `4bXazL_` prefix with hairsalonubud.
- Schema: 1 JSON-LD block.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Plugin hygiene | RankMath installed-but-inactive alongside active Yoast — remove RankMath. | Med |
| Plugin bloat | ~35 plugins (per prior audit) incl. inactive Site Kit. | Med |
| Security | Shares `4bXazL_` table prefix with hairsalonubud — verify DB isolation. | Med |
| Performance | PHP 8.1.34 — upgrade. | Low |
| Security | No HSTS. | Med |
| Caching (good) | LiteSpeed cache hit confirmed. | Info |

## Could not verify
- Current exact plugin count/versions (no file SSH); CWV.

## Top technical fixes (analysis only — NOT executed)
1. Delete the inactive RankMath; trim inactive plugins (Site Kit etc.).
2. Confirm DB isolation from hairsalonubud; upgrade PHP; add HSTS.
