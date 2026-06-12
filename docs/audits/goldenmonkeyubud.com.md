# Technical Audit — goldenmonkeyubud.com

> **In plain terms (for the team):** Your site is currently redirecting to a contact page on another domain, which means Google can't crawl any content on goldenmonkeyubud.com itself, and it's not secure due to identical authentication keys (AUTH keys/salts) with your Sanur site, creating a major cross-site forgery risk. The biggest risk is the security vulnerability, as it leaves your site open to serious attacks.

**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** redirect → goldenmonkeybali.com/contact/

## Verified signals
- HTTP/redirects: `https://goldenmonkeyubud.com/` 301 → `https://www.goldenmonkeybali.com/contact/` (200, WP 7.0, LiteSpeed).
- Hostinger API: valid WP install (id 12705861) behind the redirect.
- Prior audit: **identical auth keys/salts with goldenmonkeysanur.com**; dual caching (LiteSpeed + W3 Total Cache); git artifacts on production; weak DB password; no `WP_AUTO_UPDATE_CORE`.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Security | Identical AUTH keys/salts with goldenmonkeysanur.com — cross-site forgery. | High |
| Performance | Dual caching (LiteSpeed + W3 Total Cache) on the underlying install. | Med |
| Hygiene | `goldenmonkey-ubud-git` artifacts on production; weak DB password. | Med |
| Architecture | Full WP install for a redirect-only domain. | Med |

## Could not verify
- Current live plugin versions (redirect masks install).

## Top technical fixes (analysis only — NOT executed)
1. Rotate AUTH keys/salts (must differ from sanur).
2. Remove one cache plugin + the git artifacts; strengthen DB password.
3. Collapse to a static 301 if no standalone content is needed.
