# Technical Audit — goldenmonkeysanur.com
**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** redirect → goldenmonkeybali.com/contact/#sanur

## Verified signals
- HTTP/redirects: `https://goldenmonkeysanur.com/` 301 → `https://www.goldenmonkeybali.com/contact/#sanur` (200, WP 7.0, LiteSpeed).
- Hostinger API: valid WP install (id 12705860, login clients@gaiada.com) — a full redundant WP install runs behind the redirect.
- Prior audit (combined set): shares **identical WP auth keys/salts with goldenmonkeyubud.com** (cross-site cookie-forgery risk) and a weak DB password.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Security | Reuses identical AUTH keys/salts with goldenmonkeyubud.com — cross-site session forgery. | High |
| Architecture | Full WP install for a redirect-only domain — redundant attack surface. | Med |
| Security | Weak DB password (per prior audit). | Med |

## Could not verify
- Live plugin list/versions (redirect masks the WP install; needs phpMyAdmin/WP-admin).

## Top technical fixes (analysis only — NOT executed)
1. Rotate AUTH keys/salts so they differ from goldenmonkeyubud.com.
2. Replace the redundant WP install with a static 301; strengthen DB password.
