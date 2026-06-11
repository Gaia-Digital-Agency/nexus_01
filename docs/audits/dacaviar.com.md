# Technical Audit — dacaviar.com
**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live (intermittent 403 challenge — accessible on retry; verified via Hostinger API)

## Verified signals
- HTTP/redirects: `https://dacaviar.com/` 301 → `https://www.dacaviar.com/` (200).
- HTTPS/headers: HTTP/2, PHP 8.3.30, LiteSpeed (`x-litespeed-cache: hit`) + Hostinger CDN. No HSTS.
- robots.txt: present (3 directives incl. sitemap).
- Platform: WordPress, **AIOSEO 4.9.7.2**; luxury caviar e-commerce ("Premium Beluga & Ossetra").
- Hostinger API: valid WP install (id 28044887, account u521276830, created 2026-04-27).
- Schema: present.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Access | Intermittent 403 challenge to crawlers. | Med |
| Security | No HSTS. | Med |
| Stack | WP + AIOSEO + PHP 8.3.30 current. | Info |

## Could not verify
- Plugin list/versions, security plugin presence (no file SSH on hostinger); CWV.

## Top technical fixes (analysis only — NOT executed)
1. Allow verified search bots through the security challenge; add HSTS.
2. Confirm a security/WAF plugin is active on the store (e-commerce).
