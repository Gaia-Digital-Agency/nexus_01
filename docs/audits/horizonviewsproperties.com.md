# Technical Audit — horizonviewsproperties.com
**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live (intermittent 403 challenge — accessible on retry)

## Verified signals
- HTTP/redirects: `https://horizonviewsproperties.com/` → 200 (non-www).
- HTTPS/headers: HTTP/2, PHP 8.2.30, Hostinger CDN **`x-hcdn-cache-status: DYNAMIC`** (uncached). No HSTS.
- robots.txt: present (1 directive — minimal).
- Platform/version: WordPress 6.8.5 (not latest). Title "Horizon Views Properties".
- Hostinger API: valid WP install (id 26559887, account u521276830, created 2026-02-13).

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Performance | CDN DYNAMIC — no page caching; every hit goes to PHP. | Med |
| Core | WordPress 6.8.5 — update to 7.0. | Med |
| robots | Minimal robots (1 directive) — no sitemap declared. | Low |
| Security | No HSTS; intermittent 403 challenge. | Med |

## Could not verify
- Plugin list/versions, SEO plugin presence (no file SSH); CWV.

## Top technical fixes (analysis only — NOT executed)
1. Enable page caching (LiteSpeed); update WP core to 7.0.
2. Add a sitemap declaration to robots; add HSTS.
