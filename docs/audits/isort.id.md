# Technical Audit — isort.id

> **In plain terms (for the team):** Your site is secure and Google can crawl it, but search performance is at high risk because Google and other search engines are likely confused about your site structure and content due to conflicting sitemaps and a misconfigured `robots.txt` file that points to an internal IP address instead of your public domain. The single biggest risk is that search engines are not seeing your most current content, as your `robots.txt` directs them to an unreachable sitemap, and your primary sitemap's last modification dates are stale.

**Server:** ce01 · **Platform:** wp · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: http://isort.id 301 -> https://isort.id; https://isort.id (non-www) 301 -> https://www.isort.id/; final canonical host https://www.isort.id/en/ (200). http->https and non-www->www both enforced correctly. nginx/1.24.0 (Ubuntu).
- robots.txt: Present, STATIC file (85 bytes, /var/www/isort/public_html/robots.txt). Contains `User-agent: *`, `Crawl-Delay: 20`, and `Sitemap: http://34.158.47.112/isort/wp-sitemap.xml` — sitemap line points to an internal IP, not the domain. Crawl-Delay 20 is also unusually aggressive (ignored by Google but throttles Bing/others).
- sitemap: TWO conflicting sitemaps live. (1) Rank Math dynamic index at /wp-sitemap.xml and /sitemap_index.xml -> /page-sitemap.xml, all with CORRECT https://www.isort.id/ locs. (2) A STATIC /sitemap.xml file (1478 bytes, Feb 2026) whose <loc> entries all use the internal IP `http://34.158.47.112/isort/...`. robots.txt references neither correct sitemap (points to IP wp-sitemap path). page-sitemap lastmod values are stale (2022-2023).
- HTTPS/headers: Valid TLS, HTTP/200 on canonical. Present: X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, X-XSS-Protection 1; mode=block, X-DNS-Prefetch-Control on. MISSING: Strict-Transport-Security (no HSTS). No noindex / X-Robots-Tag header (indexable).
- Platform/version: WordPress 6.9.4 (current). Path /var/www/isort/public_html/. Active theme: isort (custom, v1.0.0). WP_HOME and WP_SITEURL correctly defined as https://www.isort.id in wp-config.php.
- Plugins/theme: 14 active plugins. Updates pending: advanced-custom-fields 6.7.0->6.8.3, wp-asset-clean-up 1.4.0.3->1.4.0.4, classic-editor 1.6.7->1.7.0, contact-form-7 6.1.5->6.1.6, litespeed-cache 7.7->7.8.1, polylang 3.7.7->3.8.4, seo-by-rank-math 1.0.264.1->1.0.272, wpcf7-redirect 3.2.9->3.2.10, wordfence 8.1.4->8.2.2 (security plugin out of date), wp-mail-smtp 4.7.1->4.8.0. No update: acf-repeater, insert-headers-and-footers, wps-hide-login. Inactive default themes left installed: twentytwentyfive, twentytwentyfour, twentytwentythree.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Sitemap | Static /sitemap.xml file exposes internal IP (34.158.47.112) in all URLs; conflicts with Rank Math's correct dynamic sitemaps. Could leak infra IP and confuse crawlers. | High |
| robots.txt | Static robots.txt Sitemap directive points to internal IP wp-sitemap path (http://34.158.47.112/isort/wp-sitemap.xml); search engines cannot reach it and the correct domain sitemaps are not referenced. | High |
| Security | Wordfence (security/firewall plugin) running outdated 8.1.4 vs 8.2.2; security plugin lag should be prioritised. | Med |
| Plugins | 10 of 14 active plugins have pending updates (ACF, LiteSpeed, Polylang, Rank Math, CF7, etc.) — maintenance/bloat backlog. | Med |
| robots.txt | Crawl-Delay: 20 is aggressive; throttles non-Google crawlers unnecessarily. | Low |
| HTTPS/headers | No HSTS (Strict-Transport-Security) header despite full http->https enforcement. | Low |
| Theme | Three inactive default WP themes installed (extra update/attack surface). | Low |
| Sitemap freshness | page-sitemap lastmod dates are 2022-2023 (stale content signals). | Low |
| Security (good) | Table prefix is non-default (`is21_`), wps-hide-login active (wp-login.php -> 404), no WP_DEBUG/WP_DEBUG_LOG enabled, no debug.log present, full auth keys/salts defined. | Info |
| Schema (good) | Rank Math JSON-LD present on homepage: WebSite, WebPage, Article, Person, ImageObject, SearchAction. | Info |

## Could not verify (no access)
- Core Web Vitals / real page-speed field data (no PSI/CrUX pull run; only header-level checks done).
- GSC verification STATUS (GSC tool not queried in this technical pass).
- Whether the static /sitemap.xml + robots.txt are submitted/known in Search Console.
- DNS A-record exposure of the 34.158.47.112 IP (not checked).

## Top technical fixes (analysis only — NOT executed)
1. Delete or regenerate the static /var/www/isort/public_html/sitemap.xml (currently exposes internal IP 34.158.47.112 in all locs) — let Rank Math's domain-correct dynamic sitemap be authoritative.
2. Fix the static robots.txt Sitemap directive to `Sitemap: https://www.isort.id/sitemap_index.xml` (currently points to unreachable internal IP).
3. Update Wordfence 8.1.4 -> 8.2.2 first (security plugin), then clear the remaining 9 pending plugin updates (ACF, LiteSpeed, Polylang, Rank Math, CF7, wpcf7-redirect, wp-mail-smtp, classic-editor, wp-asset-clean-up).
4. Add HSTS (Strict-Transport-Security) header now that http->https is fully enforced.
5. Reduce/remove Crawl-Delay: 20 in robots.txt.
6. Remove the three unused default themes (twentytwentythree/four/five) to cut update/attack surface.
