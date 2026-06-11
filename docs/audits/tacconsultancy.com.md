# Technical Audit — tacconsultancy.com
**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live (intermittent 403 challenge — accessible on retry)

## Verified signals
- HTTP/redirects: `https://tacconsultancy.com/` → 200 (non-www).
- HTTPS/headers: HTTP/2, PHP 8.3.30, LiteSpeed (`x-litespeed-cache: hit`) + Hostinger CDN (HIT). No HSTS.
- robots.txt: present (2 directives incl. sitemap).
- Platform/version: WordPress 7.0. Title "TAC Consultancy — Senior Contract Consultant, Sydney | Troy Chapman" (single-consultant AU site).
- Hostinger API: valid WP install (id 28599343, account u521276830, created 2026-05-25).

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Access | Intermittent 403 challenge to crawlers. | Med |
| Security | No HSTS. | Med |
| Caching (good) | LiteSpeed + CDN HIT confirmed. | Info |
| Stack | WP 7.0 + PHP 8.3.30 current. | Info |

## Could not verify
- Plugin list/versions, SEO plugin (no file SSH); CWV.

## Top technical fixes (analysis only — NOT executed)
1. Allow verified bots through the challenge; add HSTS.
