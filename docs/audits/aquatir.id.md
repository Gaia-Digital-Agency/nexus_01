# Technical Audit — aquatir.id
**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: `http://aquatir.id/` 301 → `https://www.aquatir.id/` (200).
- robots.txt: `Disallow: /wp-admin/`, `/cart/`, `/checkout/`, `/my-account/`, **`/shop/`**; `Allow: /admin-ajax.php`; `Sitemap: .../sitemap_index.xml`.
- sitemap: Yoast index (post, page).
- HTTPS/headers: HTTP/2, LiteSpeed + hcdn, `content-security-policy: upgrade-insecure-requests`. No HSTS.
- Platform/version: WordPress 7.0, WooCommerce 10.8.1, PHP 8.2.30.
- Hostinger API: valid WP install (id 13492393).
- Schema: 1 JSON-LD block.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Indexability | robots `Disallow: /shop/` on a WooCommerce store — blocks product/category pages from indexing (likely unintended). | High |
| Security | No HSTS. | Med |
| Hygiene | Bare `/sitemap.xml` not used (Yoast index is `sitemap_index.xml`) — cosmetic. | Low |
| Stack | WP 7.0 + Woo 10.8.1 current. | Info |

## Could not verify
- Plugin list/versions (no file SSH); whether `/shop/` block is intentional; CWV.

## Top technical fixes (analysis only — NOT executed)
1. Reconsider `Disallow: /shop/` — if products should rank, remove it.
2. Add HSTS.
