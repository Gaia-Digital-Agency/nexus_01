# Technical Audit — tacconsultancy.com

> **In plain terms (for the team):** Your site's search performance is at risk because Google might struggle to consistently access your pages due to an intermittent security challenge (403 challenge), which also means your site isn't fully secure without HTTP Strict Transport Security (HSTS). While your site is generally fast thanks to good caching, the biggest risk is Google's ability to reliably crawl your content, potentially impacting your rankings and visibility.

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
