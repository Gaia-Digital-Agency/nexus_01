# Technical Audit — aperitif.com

> **In plain terms (for the team):** Your site is generally secure and Google can crawl it well, but the biggest risk is that critical security updates for plugins like `wp-schema-pro` are overdue, leaving your site vulnerable to potential attacks (security vulnerabilities). While your site has good caching, we couldn't assess its speed (Core Web Vitals) in this audit.

**Server:** ce01 · **Platform:** wp · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: All non-canonical entry points 301 to `https://www.aperitif.com/`. Verified live: `http://aperitif.com/` → 301 → `https://aperitif.com/`; `http://www.aperitif.com/` → 301 → `https://www.aperitif.com/`; `https://aperitif.com/` → 301 → `https://www.aperitif.com/`. Canonical host responds `200 OK`. (Note: non-www HTTP redirects to non-www HTTPS first rather than straight to www — a two-hop chain.)
- robots.txt: Present and valid (HTTP 200). References `Sitemap: https://www.aperitif.com/sitemap.xml`. No `Disallow` rules for major engines (all content crawlable). `SemrushBot-SA` effectively allowed (empty Disallow). `Crawl-delay: 120` set for MJ12bot and Yandex; `Yandex` has `Allow: /en` then `Disallow: /` (Yandex largely blocked). File is messy/non-standard in formatting (blank-line-separated blocks, `Crawl-delay` placed before its user-agent in spots) but functionally non-blocking for Google/Bing.
- sitemap: Yoast-powered index at `/sitemap.xml` (200, valid XML). 5 child sitemaps: post (2026-06-09), page (2026-06-09), category (2026-06-09), author (lastmod 2024-12-12 — stale), geo (2026-05-13). All `<loc>` use absolute `https://www.aperitif.com` URLs (domain, not IP). `/sitemap_index.xml` also resolves (200) and returns `X-Robots-Tag: noindex, follow` (normal for Yoast sitemaps).
- HTTPS/headers: HTTPS enforced; valid 200 on canonical. Server `nginx/1.24.0 (Ubuntu)` + LiteSpeed Cache (`X-LiteSpeed-Cache-Control: public,max-age=604800`). Security headers present: `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection: 1; mode=block`. NO `Strict-Transport-Security` (HSTS) header. `X-Pingback: .../xmlrpc.php` exposed. No `X-Robots-Tag` noindex on homepage; no `<meta name="robots">` noindex in HTML (page is indexable).
- Platform/version: WordPress core 7.0 (verified via wp-includes/version.php; wp-cli reports "WordPress is at the latest version"). PHP 8.3.31 (CLI on ce01). DB name `aperitif_db2021`, custom table prefix `aP2021_` (not default `wp_`). WP_DEBUG = false.
- Plugins/theme: 38 plugins installed (~26 active) verified via wp-cli. Only 2 updates pending: `wp-schema-pro` 2.7.11 → 2.11.3 (4 minor versions behind) and `wordpress-seo` (Yoast) 27.7 → 27.8. Active theme: custom `aperitif` v1.0.0 (no update). `wordpress-seo-premium` v23.7 installed but INACTIVE. Several inactive/legacy plugins present: addthis, rename-images-boomit, top-table-of-contents, boomdevs-toc-pro, aperitif-gallery, advanced-cron-manager, cron-logger. Drop-ins present: advanced-cache.php, object-cache.php, maintenance.php.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Security / HTTPS | No HSTS (`Strict-Transport-Security`) header despite HTTPS being enforced site-wide. | Med |
| Security | `xmlrpc.php` reachable and advertised via `X-Pingback` header — common brute-force/DDoS/pingback vector. WPS Hide Login is active (login obscured) but xmlrpc is a separate surface. | Med |
| Security | `DISALLOW_FILE_EDIT` not set in wp-config.php — in-dashboard plugin/theme file editor remains enabled. | Med |
| Plugin stack | `wp-schema-pro` 4 versions behind (2.7.11 → 2.11.3) — pending update with security/feature fixes. | Med |
| Plugin stack | Yoast `wordpress-seo` one minor behind (27.7 → 27.8). | Low |
| Plugin bloat / hygiene | ~12 inactive plugins installed (addthis, rename-images-boomit, top-table-of-contents, boomdevs-toc-pro, aperitif-gallery, cron-logger, advanced-cron-manager, etc.) plus inactive Yoast Premium v23.7 — unused code on disk = attack surface + maintenance debt. | Low |
| Plugin stack | `duplicate-page` active — accidental content-duplication risk if misused (technical hygiene note). | Low |
| Plugin overlap | Two redirect plugins active simultaneously: `redirection` (5.7.5) and `eps-301-redirects` (2.84) — potential rule-management overlap/conflict; consolidate to one. | Med |
| Plugin overlap | Two TOC-style plugins active/installed (`floating-toc`, `wp-anchor-header`, plus inactive top-table-of-contents / boomdevs-toc-pro) — redundant functionality. | Low |
| Sitemap hygiene | `author-sitemap.xml` lastmod 2024-12-12 (stale ~18 months); if author archives are not used, disable in Yoast to keep the index clean. | Low |
| Indexability | Homepage and key pages return no noindex (meta or header) — correctly indexable. Confirmed live. | Info |
| Schema | Rich structured data present on homepage: WebSite, WebPage, BreadcrumbList, PostalAddress, GeoCoordinates, OpeningHoursSpecification, ImageObject, SearchAction (verified live). Strong technical schema coverage. | Info (good) |
| Performance / CWV | LiteSpeed full-page cache (7-day TTL) + WebP serving + 1yr static-asset browser cache + GZip (from existing audit .htaccess review). No CWV field/lab numbers captured this run. | Info |
| Redirect chain | http→https for non-www lands on non-www HTTPS before reaching www (extra hop). Minor latency/redirect-chain inefficiency; ideally one-hop to canonical www HTTPS. | Low |
| Security (good) | Custom table prefix `aP2021_` (not default `wp_`), `WP_DEBUG=false`, WP core current (7.0), PHP 8.3. DB backup .sql.gz and `backup/` dir live OUTSIDE web root (`/var/www/aperitif/`, not public_html) — both return 404 over HTTP (verified). | Info (good) |

## Could not verify (no access)
- GSC site-verification STATUS (whether ce01 property is verified in Google Search Console) — not checkable from server/HTTP signals alone this run; existing audit notes "no sitemap submitted to GSC" but verification state itself was not confirmed.
- Core Web Vitals field data (CrUX / PageSpeed lab scores) — not fetched this run; only caching/optimization configuration was confirmed.
- Whether the shared/inherited AUTH_KEY/SALTs are reused across other sites on the ce01 fleet (keys are defined; uniqueness vs. siblings not cross-checked).

## Top technical fixes (analysis only — NOT executed)
1. Add HSTS (`Strict-Transport-Security`) header on the canonical HTTPS host (after confirming all subdomains are HTTPS-ready).
2. Apply pending plugin updates: `wp-schema-pro` 2.7.11 → 2.11.3 and Yoast `wordpress-seo` 27.7 → 27.8.
3. Harden config: set `DISALLOW_FILE_EDIT` in wp-config.php and restrict/disable `xmlrpc.php` (it is still reachable and advertised via X-Pingback).
4. Consolidate the two active redirect plugins (`redirection` + `eps-301-redirects`) to a single tool to avoid rule conflicts.
5. Remove inactive/legacy plugins (addthis, rename-images-boomit, top-table-of-contents, boomdevs-toc-pro, cron-logger, etc.) and decide on inactive Yoast Premium (activate or remove) to cut bloat/attack surface.
6. Collapse the non-www HTTP→HTTPS→www redirect into a single hop to the canonical www HTTPS host.
7. Disable the stale `author-sitemap.xml` in Yoast if author archives are unused.
