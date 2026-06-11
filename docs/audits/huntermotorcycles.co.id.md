# Technical Audit — huntermotorcycles.co.id
**Server:** ce01 · **Platform:** wp · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: Live re-verify OK. http://huntermotorcycles.co.id → 301 https://huntermotorcycles.co.id → 301 https://www.huntermotorcycles.co.id → 302 (Polylang, X-Redirect-By: Polylang) https://www.huntermotorcycles.co.id/en/ → 200. http→https, non-www→www, and language redirect chain all consistent; final canonical is /en/. Server nginx/1.24.0 (Ubuntu).
- robots.txt: 200 text/plain. Content: `User-agent: *` / `Crawl-Delay: 20` / `Sitemap: http://34.158.47.112/hunter/sitemap_index.xml`. BROKEN — sitemap line points to internal IP (34.158.47.112), which returns 404 (re-verified live). Crawl-Delay: 20 is aggressive. No Disallow directives. Static file, not Yoast-managed.
- sitemap: https://www.huntermotorcycles.co.id/sitemap_index.xml → 200 text/xml, X-Robots-Tag: noindex, follow (correct). Yoast-generated; child <loc> entries use the live https domain (NOT the IP) — valid. Several product sub-sitemaps last-modified 2023-03-29 (stale).
- HTTPS/headers: HTTPS valid, redirect to TLS enforced. Present: X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, X-XSS-Protection: 1; mode=block (XSS header seen on redirect hops). MISSING: Strict-Transport-Security (no HSTS) on live /en/ page. No noindex X-Robots-Tag on live HTML (indexable — good).
- Platform/version: WordPress 6.9.1 (verified in wp-includes/version.php on ce01). Docroot /var/www/hunter/public_html. PHP 8.1. WooCommerce store. table_prefix = hmci_ (non-default — good). WP_DEBUG false, WP_CACHE true (LiteSpeed). Auth salts are unique real values (not placeholder "put your unique phrase"). DISALLOW_FILE_EDIT / DISALLOW_FILE_MODS absent.
- Plugins/theme: From existing audit (10 Jun, ce01 SSH): 28 active plugins, 20 with updates pending (LiteSpeed Cache 7.7→7.8.1, Yoast 26.9→27.8, WooCommerce 10.5.1→10.8.1, ACF PRO, Wordfence 8.1.4→8.2.2, Polylang 3.7.7→3.8.4, etc.). 38 installed total (10 inactive). Active theme hunter-git child of hunter parent (GAIA), 5 unused default WP themes present. Wordfence + WP Hide Login active.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| robots.txt | Sitemap directive points to internal IP `http://34.158.47.112/hunter/sitemap_index.xml`, which returns 404 — crawlers cannot discover the sitemap via robots.txt. Should be `https://www.huntermotorcycles.co.id/sitemap_index.xml`. (re-verified live) | High |
| Plugin maintenance | 20 of 28 active plugins have updates pending, including security-relevant LiteSpeed Cache, Wordfence, WooCommerce, Yoast — significant patch backlog. | High |
| robots.txt | `Crawl-Delay: 20` is aggressive and can throttle Googlebot crawl rate. | Med |
| HTTPS headers | No HSTS (Strict-Transport-Security) header on live responses. | Med |
| Sitemap freshness | product-sitemap2/3/4.xml last-modified 2023-03-29 — stale product sets. | Med |
| Security hardening | DISALLOW_FILE_EDIT / DISALLOW_FILE_MODS not set in wp-config (dashboard file editor enabled). | Med |
| Plugin bloat | 10 inactive plugin directories + 5 unused default themes remain on disk (attack surface / clutter). | Low |
| Theme compat | Custom theme style.css declares "Tested up to WP 5.4" vs running 6.9.1 — compat not formally asserted (no live break observed). | Low |
| Redirect overhead | Every visit traverses a 4-hop chain (http→https→www→/en/), incl. a Polylang 302 (non-permanent) language redirect — extra latency; consider 301 for the language hop. | Low |

## Could not verify (no access)
- GSC verification status (no GSC property check performed in this technical pass).
- Core Web Vitals / field page-speed data (no PSI/CrUX query run; LiteSpeed cache + mod_expires caching confirmed via existing audit but no live CWV metric verified).
- TLS certificate issuer/expiry details (not inspected).
- Whether the wp-config salts are also shared/duplicated across other fleet sites (only confirmed they are non-placeholder on this site).

## Top technical fixes (analysis only — NOT executed)
1. Fix robots.txt Sitemap line to `https://www.huntermotorcycles.co.id/sitemap_index.xml` (currently an unreachable IP URL) — or switch to Yoast-managed robots.txt.
2. Schedule a maintenance window to apply the 20 pending plugin updates, prioritising security plugins (Wordfence, LiteSpeed Cache, WooCommerce, Yoast).
3. Reduce or remove `Crawl-Delay: 20` to lift Googlebot crawl throttling.
4. Add HSTS (Strict-Transport-Security) header now that http→https is enforced.
5. Harden wp-config: add DISALLOW_FILE_EDIT (and consider DISALLOW_FILE_MODS); remove the 10 inactive plugins and 5 unused default themes.
6. Refresh stale 2023 product sitemaps and make the Polylang language redirect a 301 to trim the redirect chain.
