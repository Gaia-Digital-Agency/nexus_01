# Technical Audit — dreamcatchervillas.com

> **In plain terms (for the team):** Your website isn't actually a website; it temporarily redirects (302) to Instagram, meaning Google can't crawl your content or index anything for search, effectively making your domain invisible to search engines. The single biggest risk is that you have no organic search presence because your domain isn't serving any website content, forfeiting all potential SEO value.

**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** redirect → instagram.com/dreamcatchervillas (302)

## Verified signals
- HTTP/redirects: `https://dreamcatchervillas.com/` **302 → https://www.instagram.com/dreamcatchervillas/**. The domain forwards to an Instagram profile, not a website.
- HTTPS/headers: HTTP/2, PHP 8.2.30, Hostinger CDN; **`strict-transport-security: max-age=31536000; preload; includeSubDomains`** (the only portfolio site with HSTS).
- Platform: a WordPress install exists (Hostinger API id 24240913) but is masked by the 302 forward; no title/generator served.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Architecture | Domain 302-forwards to Instagram — no web presence; a full WP install is retained but unused. | High |
| SEO | A **302 (temporary)** to an external social profile passes no equity and indexes nothing — if intentional forwarding, use a proper landing page instead. | Med |
| Security (good) | HSTS present with preload. | Info |

## Could not verify
- The underlying WP install's plugins/config (masked by the forward).

## Top technical fixes (analysis only — NOT executed)
1. Decide intent: either build a real site, or replace the WP install with a lightweight redirect/landing page.
2. If forwarding is permanent, use 301 (not 302) — though forwarding a domain to Instagram forfeits all SEO value.
