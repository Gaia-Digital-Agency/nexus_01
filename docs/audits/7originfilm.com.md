# Technical Audit — 7originfilm.com

> **In plain terms (for the team):** Your site is mostly secure and Google can crawl it, but intermittent security challenges (403 errors) could occasionally block Googlebot, potentially hurting your search visibility. The biggest risk is that your site lacks HSTS (HTTP Strict Transport Security), which means browsers might still try to connect insecurely, leaving your visitors vulnerable and potentially impacting your search ranking.

**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live (intermittent 403 security challenge — accessible on retry)

## Verified signals
- HTTP/redirects: `http://7originfilm.com/` 301 → `https://www.7originfilm.com/en/` (200). Multilingual (`/en/`).
- robots.txt: `Disallow: /wp-admin/`, `Allow: /admin-ajax.php`; declares **two** sitemaps: `/sitemap.xml` and `/en/sitemap.rss`.
- HTTPS/headers: HTTP/2, LiteSpeed + Hostinger CDN (`server: hcdn`, `x-litespeed-cache: hit`), `content-security-policy: upgrade-insecure-requests`. No HSTS.
- Platform/version: WordPress 6.8.5, PHP 8.2.30; SEO via **All in One SEO (AIOSEO) 4.9.7.2**.
- Hostinger API: valid WP install (id 26056006, account u521276830, created 2026-01-21).
- Schema: 1 JSON-LD block.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Access | Intermittent 403/security-challenge to external crawlers — may impede Googlebot if mis-tuned. | Med |
| robots/sitemap | Two heterogeneous sitemaps (`sitemap.xml` + `.rss`) declared — confirm AIOSEO is the single source. | Low |
| Security | No HSTS. | Med |
| Core | WordPress 6.8.5 (not latest 7.0) — update. | Med |
| Schema/SEO | AIOSEO active and emitting schema — OK. | Info |

## Could not verify
- Full plugin list/versions (no file SSH on hostinger); CWV field data; exact cause of the 403 challenge.

## Top technical fixes (analysis only — NOT executed)
1. Update WordPress core 6.8.5 → 7.0.
2. Tune the security challenge to allow verified search-engine bots; add HSTS.
3. Consolidate sitemap declarations to the AIOSEO index.
