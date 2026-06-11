# Technical Audit — balihideawayvillas.com
**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** redirect → balihiddenvillas.com

## Verified signals
- HTTP/redirects: `https://balihideawayvillas.com/` 301 → `https://balihiddenvillas.com/` (200). Domain is a redirect to balihiddenvillas.com.
- Hostinger API: valid WP install (id 26230599, account u521276830) — a full WP install exists behind the redirect.
- robots/sitemap/title: all served from the balihiddenvillas.com target.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Architecture | Full redundant WordPress install maintained for a domain that only 301-redirects to balihiddenvillas.com — extra maintenance/attack surface. | Med |
| Redirect | 301 is clean and single-hop. | Info |

## Could not verify
- Plugin/config of the underlying WP install (masked by redirect; needs phpMyAdmin/WP-admin).

## Top technical fixes (analysis only — NOT executed)
1. If the domain is purely a redirect, replace the full WP install with a lightweight 301 (DNS/nginx) to cut attack surface.
