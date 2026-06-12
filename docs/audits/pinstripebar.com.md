# Technical Audit — pinstripebar.com

> **In plain terms (for the team):** Your site is at high risk of being hacked because there's no active firewall or malware protection (Wordfence is installed but inactive), which could lead to downtime or Google delisting your site. While Google can crawl your site, a very conservative (Crawl-Delay: 20) setting in your robots.txt might be slowing down how quickly new content is discovered. The biggest risk is the inactive security plugin, leaving your site vulnerable to attacks that could severely impact your search performance and business operations.

**Server:** ce01 · **Platform:** wp · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: http://pinstripebar.com → 301 → https://pinstripebar.com → 301 → https://www.pinstripebar.com (final 200). http://www → 301 → https://www. All variants converge on https://www. canonical host. (live curl)
- robots.txt: present, serves 200. Content: `User-agent: *` / `Disallow: /cdn-cgi/` / `Crawl-Delay: 20`. No `Sitemap:` directive. Crawl-Delay: 20 is very conservative. (live curl)
- sitemap: Yoast `sitemap_index.xml` valid, 200, locs use https://www. domain (not IP). 4 sub-sitemaps: post (2026-06-10), page (2026-06-10), category (2026-06-10), geo (2024-05-19, ~2yr stale). (live curl)
- HTTPS/headers: HTTPS enforced via 301. Server: nginx/1.24.0 (Ubuntu). X-Frame-Options: SAMEORIGIN and X-Content-Type-Options: nosniff present. NO Strict-Transport-Security (HSTS) header. No x-robots-tag noindex (indexable). (live curl)
- Platform/version: WordPress 7.0 (latest, core up to date). PHP 8.3-FPM (nginx fastcgi). Served from /var/www/pinstripebar/public_html under nginx alias /pinstripebar/. Active theme: aperitif-bar v1.0.0. (SSH ce01)
- Plugins/theme: 19 active plugins. Pending updates: wordpress-seo 27.7→27.8, reviews-feed 2.6.2→2.6.3 (reviews-feed inactive). Inactive/bloat: akismet, disable-gutenberg, rename-images-boomit, reviews-feed, wordfence, wp-mail-smtp, wordpress-seo-premium. (SSH wp-cli)

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Security – WAF | Wordfence is installed but INACTIVE; no active firewall/malware plugin running. | High |
| Security – HSTS | No Strict-Transport-Security header on HTTPS responses (HSTS not enforced). | Med |
| Security – file edit | DISALLOW_FILE_EDIT / DISALLOW_FILE_MODS not set in wp-config.php; in-dashboard plugin/theme editing allowed. | Med |
| Plugin stack – conflict | litespeed-cache plugin installed but server is nginx; no x-litespeed/x-lscache headers served — LSCache largely ineffective on this stack (SEO doc assumed LiteSpeed server; live server is nginx). | Med |
| Plugin stack – duplicate | wordpress-seo (free, active) AND wordpress-seo-premium (inactive) both present — redundant/stale install. | Low |
| Plugin stack – updates | Pending updates: wordpress-seo (27.7→27.8); reviews-feed (2.6.2→2.6.3). | Low |
| Plugin stack – bloat | 7 inactive plugins left installed (akismet, disable-gutenberg, rename-images-boomit, reviews-feed, wordfence, wp-mail-smtp, wordpress-seo-premium) — attack surface / clutter. | Low |
| Security – data exposure | DB backup `pinstripebar_db_20260226_094021.sql.gz` sits in /var/www/pinstripebar/ (one level ABOVE docroot — not web-reachable, returns 404 live). Acceptable location but a plaintext-ish DB dump on disk. | Low |
| robots.txt | No Sitemap: directive; Crawl-Delay: 20 (very conservative, may slow crawl). | Low |
| sitemap | geo-sitemap.xml lastmod 2024-05-19 (~2 years stale). | Low |
| Schema | LD+JSON present (WebSite, WebPage, BreadcrumbList, SearchAction, ImageObject). No LocalBusiness/Restaurant/Bar schema despite physical venue + wpseo-local installed. | Low |
| Security – hardening (OK) | xmlrpc.php blocked (000 / connection refused). wp-login.php → 404 and wp-admin → 404 redirect (WPS Hide Login active). Custom table prefix `ap2023_` (not default wp_). WP_DEBUG false. wp-config.php → 403. Auth keys appear set (not placeholders). | Low |

## Could not verify (no access)
- Core Web Vitals / PageSpeed field data (PSI not queried this run; SEO doc noted prior 429 rate-limit).
- GSC verification STATUS for the www.pinstripebar.com property (SEO doc noted GSC default property is gaiada.com; ownership of a dedicated pinstripebar property not confirmed here).
- Whether the .sql.gz backup directory has any web-server alias making it reachable by an alternate path (only the canonical docroot path was tested live — returned 404).

## Top technical fixes (analysis only — NOT executed)
1. Activate Wordfence (or another WAF/malware scanner) — currently the site has no active security plugin running.
2. Add HSTS header (Strict-Transport-Security) at the nginx/server level since HTTPS is already enforced site-wide.
3. Set `define('DISALLOW_FILE_EDIT', true);` in wp-config.php to disable in-dashboard file editing.
4. Resolve the LiteSpeed-on-nginx mismatch: remove/replace litespeed-cache with an nginx-compatible cache (FastCGI cache / Redis) since LSCache headers are not being served.
5. Apply pending plugin updates (wordpress-seo 27.8, reviews-feed 2.6.3) and remove unused inactive plugins + the redundant wordpress-seo-premium install.
6. Add `Sitemap: https://www.pinstripebar.com/sitemap_index.xml` to robots.txt and reduce/remove the Crawl-Delay: 20.
7. Regenerate the stale geo-sitemap (2024-05-19) and add LocalBusiness/Bar schema via wpseo-local.
