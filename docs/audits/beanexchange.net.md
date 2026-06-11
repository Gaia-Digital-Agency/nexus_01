# Technical Audit — beanexchange.net
**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: `https://beanexchange.net/` → 200 (no www redirect; non-www canonical).
- robots.txt: Yoast block, empty `Disallow:` (crawlable); `Sitemap: .../sitemap_index.xml`.
- sitemap: Yoast index — post, page, **product, product_type, category, author** (WooCommerce store).
- HTTPS/headers: HTTP/2, Hostinger CDN; **`x-litespeed-cache-control: no-cache`** (page cache disabled); `x-hcdn-cache-status: DYNAMIC`; CSP upgrade-insecure-requests. No HSTS.
- Platform/version: WordPress 7.0, PHP 8.2.30; Yoast SEO.
- Homepage `<title>`: "Distinguished Roasts,Exceptional Brews | Bean Exchange" — **missing space after the comma**.
- Hostinger API: valid WP install (id 13182523).
- Schema: 1 JSON-LD block.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Performance | LiteSpeed page cache disabled (`no-cache`) — every request hits PHP (upstream RT ~0.33s). | Med |
| Indexability | `author-sitemap.xml` exposed on a small store — disable. | Low |
| Security | No HSTS. | Med |
| Hygiene | Title punctuation: "Roasts,Exceptional" missing space (cosmetic SERP issue — note for SEO). | Low |

## Could not verify
- Plugin list/versions; why caching is disabled; CWV.

## Top technical fixes (analysis only — NOT executed)
1. Re-enable LiteSpeed page caching.
2. Disable author sitemap; add HSTS.
