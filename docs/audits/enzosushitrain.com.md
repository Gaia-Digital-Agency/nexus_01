# Technical Audit — enzosushitrain.com

> **In plain terms (for the team):** Your site is moderately secure, but Google's ability to consistently crawl it (intermittent 403 challenge) and its speed (CDN BYPASS) are at risk, which could hurt your search rankings. The single biggest risk is the lack of HSTS, making your site vulnerable to security attacks (no HSTS) that could compromise user data and trust.

**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live (the successor brand of dapurraja.com)

## Verified signals
- HTTP/redirects: `https://enzosushitrain.com/` 301 → `https://www.enzosushitrain.com/` (200). dapurraja.com 301s into this domain.
- HTTPS/headers: HTTP/2, PHP 8.3.30, Hostinger CDN (`x-hcdn-cache-status: BYPASS`). No HSTS.
- robots.txt: Yoast block, crawlable; `Sitemap: .../sitemap_index.xml` (post, page).
- Platform/version: WordPress 7.0, Yoast SEO. Title "Enzo Sushi Train Ubud Bali | Fresh Sushi".
- Hostinger API: valid WP install (id 27499355, account u521276830, created 2025-12-08).
- Schema: present.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Access | Intermittent 403 challenge to crawlers (shared hosting pattern). | Med |
| Performance | CDN BYPASS on homepage — confirm page caching is effective. | Low |
| Security | No HSTS. | Med |
| Stack | WP 7.0 + Yoast + PHP 8.3.30 current. | Info |

## Could not verify
- Plugin list/versions (no file SSH); CWV.

## Top technical fixes (analysis only — NOT executed)
1. Add HSTS; verify page caching (avoid persistent BYPASS).
2. This is the live brand — consolidate dapurraja's residual install behind a static 301.
