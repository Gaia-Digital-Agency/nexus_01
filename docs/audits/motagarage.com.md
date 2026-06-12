# Technical Audit — motagarage.com

> **In plain terms (for the team):** Your site is at high risk of security breaches because it lacks essential security measures like a robust security plugin (Wordfence) and secure server settings (HSTS), which could compromise customer data and your search rankings. Google can crawl your site effectively, but its speed (page caching) is suboptimal due to inactive performance features (LiteSpeed), potentially impacting user experience and SEO. The single biggest risk is the absent security plugin (Wordfence) on your WooCommerce store, leaving it vulnerable to attacks.

**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: `http://motagarage.com/` 301 → `https://www.motagarage.com/` (200).
- robots.txt: WooCommerce-aware — disallows `/wp-content/uploads/wc-logs/`, `woocommerce_uploads/`, `*?add-to-cart=`, `/wp-admin/`. Reasonable.
- HTTPS/headers: HTTP/2, Hostinger CDN. CSP present. No HSTS.
- Platform: WordPress (generator meta suppressed), WooCommerce (motorcycles/apparel store). Title "Custom Motorcycles, Elite Apparel & Accessories — MOTA Garage".
- Hostinger API: valid WP install (id 24961420).
- Prior audit: default `wp_` table prefix; LiteSpeed inactive (no caching); Wordfence absent; draft pages.
- Schema: 1 JSON-LD block.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Security | Default `wp_` table prefix. | Med |
| Performance | LiteSpeed inactive — no page caching (per prior audit). | Med |
| Security | Wordfence absent on a WooCommerce/payment store. | High |
| Security | No HSTS. | Med |
| robots (good) | WooCommerce noise paths correctly disallowed. | Info |

## Could not verify
- Live plugin versions; whether caching/security plugins were since activated; CWV.

## Top technical fixes (analysis only — NOT executed)
1. Install/activate a security plugin (Wordfence) on the store.
2. Activate LiteSpeed caching; migrate off `wp_` prefix; add HSTS.
