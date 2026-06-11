# Technical Audit — reflexologyubud.com
**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: `https://reflexologyubud.com/` → 200 (non-www canonical).
- robots.txt: disallows `/servicecategory/`, `/author/`, plus several empty/whitespace `Disallow:` lines (messy); **`Sitemap:` points to the `www.` host** while the site canonical is non-www (mismatch).
- HTTPS/headers: HTTP/2, LiteSpeed + hcdn (`x-litespeed-cache: hit`), CSP upgrade-insecure-requests. No HSTS.
- Platform: WordPress (generator suppressed); LiteSpeed.
- Hostinger API: valid WP install (id 11375775).
- Prior audit: dual SEO plugins (RankMath + Yoast), dual caching (LiteSpeed + WP Super Cache), charset utf8 (not utf8mb4), truncated homepage meta description.
- Schema: 1 JSON-LD block.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Plugin conflict | Dual SEO plugins (RankMath + Yoast) both active (prior audit). | High |
| Performance | Dual caching (LiteSpeed + WP Super Cache). | Med |
| robots/sitemap | Sitemap declared on `www.` host vs non-www canonical — host mismatch; messy empty Disallow lines. | Med |
| Database | Charset `utf8` not `utf8mb4` (prior audit). | Low |
| Security | No HSTS. | Med |

## Could not verify
- Current live plugin versions; whether one SEO/cache plugin was since removed; CWV.

## Top technical fixes (analysis only — NOT executed)
1. Remove one SEO plugin and one caching plugin (keep RankMath + LiteSpeed).
2. Fix the robots `Sitemap:` host to match the non-www canonical; clean empty Disallow lines.
3. Convert DB to utf8mb4; add HSTS.
