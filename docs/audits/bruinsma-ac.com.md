# Technical Audit — bruinsma-ac.com
**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live (intermittent 403 challenge — accessible on retry)

## Verified signals
- HTTP/redirects: `http://bruinsma-ac.com/` 301 → `https://www.bruinsma-ac.com/` (200).
- robots.txt: `Disallow: /wp-admin/`, `Allow: /admin-ajax.php`; declares **two** sitemaps `/sitemap.xml` and `/sitemap.rss`.
- HTTPS/headers: HTTP/2, Hostinger CDN (`x-hcdn-cache-status: HIT` then DYNAMIC), CSP upgrade-insecure-requests. No HSTS.
- Platform: WordPress, PHP 8.2.30, **AIOSEO 4.9.7.2**.
- Hostinger API: valid WP install (id 24960066, login asyrowatka@gmail.com).
- Schema: 2 JSON-LD blocks.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Access | Intermittent 403 challenge to crawlers. | Med |
| robots/sitemap | Dual sitemap (`sitemap.xml` + `.rss`) — confirm AIOSEO single source. | Low |
| Security | No HSTS. | Med |
| Security | Admin login is a personal Gmail — review account hygiene/2FA. | Med |

## Could not verify
- Plugin list/versions; CWV; cause of 403 challenge.

## Top technical fixes (analysis only — NOT executed)
1. Allow verified bots through the security challenge; add HSTS.
2. Consolidate sitemaps to AIOSEO index.
