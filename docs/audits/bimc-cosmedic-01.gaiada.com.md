# Technical Audit — bimc-cosmedic-01.gaiada.com
**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live (staging/subdomain on gaiada.com)

## Verified signals
- HTTP/redirects: `https://bimc-cosmedic-01.gaiada.com/` → 200.
- HTTPS/headers: HTTP/2, PHP 8.3.30, Hostinger CDN **`x-hcdn-cache-status: DYNAMIC`** (uncached). No HSTS.
- robots.txt: present (2 directives incl. sitemap).
- Platform/version: WordPress 6.9.4. Title "BIMC CosMedic".
- Hostinger API: valid WP install (id 28166222, account u521276830, created 2026-05-03).

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Environment | `*-01.gaiada.com` subdomain — appears to be a staging/build site, not a production domain. Confirm whether it should be indexable at all. | High |
| Indexability | If staging, it should be `noindex` / disallowed — currently crawlable. | High |
| Performance | CDN DYNAMIC (uncached). | Med |
| Security | No HSTS. | Med |

## Could not verify
- Whether this is intended as production or a staging build; plugin list/versions; CWV.

## Top technical fixes (analysis only — NOT executed)
1. Confirm staging vs production. If staging, add `noindex` + `Disallow: /` and/or HTTP auth.
2. Enable caching; add HSTS if it becomes production.
