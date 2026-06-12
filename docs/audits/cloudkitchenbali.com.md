# Technical Audit — cloudkitchenbali.com

> **In plain terms (for the team):** Your site is generally fast and Google can crawl it, but the biggest risk is that it's not fully secure because it lacks HSTS (HTTP Strict Transport Security), which could leave visitors vulnerable to certain attacks. Additionally, your homepage title is just "Cloud Kitchen," which is a missed opportunity for search performance as it doesn't include important keywords or your location.

**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: `https://cloudkitchenbali.com/` → 200 (non-www).
- HTTPS/headers: HTTP/2, PHP 8.2.30, LiteSpeed (`x-litespeed-cache: hit`) + Hostinger CDN (HIT). No HSTS.
- robots.txt: present (2 directives incl. sitemap).
- Platform/version: WordPress 7.0. Title "Cloud Kitchen" (thin/placeholder brand title).
- Hostinger API: valid WP install (id 12260045, account u521276830, created 2024-05-06).

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Branding/SEO | Homepage title is just "Cloud Kitchen" — no location/keyword (note for SEO). | Low |
| Security | No HSTS. | Med |
| Caching (good) | LiteSpeed + CDN HIT. | Info |
| Stack | WP 7.0 + PHP 8.2.30 current. | Info |

## Could not verify
- Plugin list/versions; whether the site is an active project or dormant; CWV.

## Top technical fixes (analysis only — NOT executed)
1. Confirm project status (live vs dormant); add HSTS.
