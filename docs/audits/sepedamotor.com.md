# Technical Audit — sepedamotor.com

> **In plain terms (for the team):** Your site is not secure due to an exposed `readme.html` file and missing browser-level security (HSTS header), and Google cannot fully crawl or understand it because the content sitemaps are two years old and the site isn't verified in Google Search Console. The single biggest risk is that Google Search Console is connected to the wrong domain, meaning you have no visibility into how Google sees your site or its performance.

**Server:** hostinger · **Platform:** wp · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: http://sepedamotor.com → 301 → https://sepedamotor.com/ → 301 → https://www.sepedamotor.com/ → 200. http→https and non-www→www both enforced; canonical host is www. Two-hop chain (http-non-www does not jump straight to https-www).
- robots.txt: present and valid. Explicit Allow for Googlebot/Googlebot-Image/AdsBot, no Disallow rules, no crawl-delay. References 14 sitemaps (sitemap_index.xml + per-type + news-sitemap). Note: several Sitemap: lines have trailing whitespace/tabs after the URL.
- sitemap: Yoast `sitemap_index.xml` valid XML, 8 child sitemaps, all <loc> on https://www.sepedamotor.com domain (not IP). Content lastmod dates are 2022-10 to 2022-12 (post/page/category/tag); only author-sitemap shows 2026-05-15. Confirms no new content since 2022.
- HTTPS/headers: HTTPS active, served via LiteSpeed + Hostinger hCDN (server: hcdn, x-litespeed-cache: hit/miss). PHP/8.2.30. CSP = upgrade-insecure-requests only. No Strict-Transport-Security (HSTS) header. No X-Robots-Tag noindex on homepage (indexable).
- Platform/version: WordPress (generator meta reports "WordPress 7.0" — Hostinger custom version string; true core equivalent unconfirmed). Elementor 4.1.2. Theme JNews + jnews-child (per existing audit). Hostinger API confirms WP install id 12705862, user u521276830, addon domain, is_enabled=true, is_valid=true, created 2024-05-30, root /home/u521276830/domains/sepedamotor.com/public_html.
- Plugins/theme: Yoast SEO active (sitemap XSL + sitemap generator confirmed live). Elementor active (homepage rendered with Elementor). Existing audit: 46 active plugins, JNews premium theme. Live readme.html exposed (HTTP 200).

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Security | `readme.html` exposed (HTTP 200) — leaks WP fingerprint; should be removed/blocked | Med |
| Security | No HSTS header (only CSP upgrade-insecure-requests); HTTPS not strictly enforced at browser level | Med |
| Security | `wp-config.php.bak` returns 403 (blocked, good); `xmlrpc.php` returns 405 (reachable, method-blocked — XML-RPC endpoint still present) | Low |
| Security | `wp-login.php` returns 404 (login likely relocated/hidden — positive hardening signal) | Low |
| Plugin stack | 46 active plugins — severe bloat; runtime overhead, CSS/JS conflict surface | High |
| Plugin stack | Redundant caching stack: LiteSpeed Cache + Autoptimize + WP Fastest Cache + WP Compress all active — conflict-prone | High |
| Plugin stack | Two page builders present (Elementor active + WP Bakery) — residual shortcode/bloat | Med |
| Plugin stack | Redundant backup plugins (UpdraftPlus + bup) | Low |
| Pending updates | Yoast SEO outdated (existing audit: 27.7, 27.8 available); Yoast Premium v18.1 very old | Med |
| Theme | jnews-child functions.php contains leftover debug/var_dump code in production (per existing audit; not live-verifiable) | Med |
| Robots/sitemap | robots.txt Sitemap: lines have trailing whitespace/tabs — cosmetic, low parse-risk | Low |
| Sitemap freshness | All content sitemaps lastmod stuck at 2022 — confirms dormant site; crawl signal of staleness | Med (technical signal) |
| Indexability | Homepage indexable (no noindex header/meta); robots allows crawl — OK | Low |
| Schema | 5 application/ld+json blocks present on homepage (JNews JSON-LD active) — schema markup present | Low (OK) |
| Speed/CWV | 6.1 GB uploads, 46 plugins, dual page builders — page-weight/JS bloat risk despite LiteSpeed+hCDN caching | Med |
| GSC verification | Existing audit: GSC property connected is gaiada.com, NOT sepedamotor.com — no verified property for this domain (verification STATUS finding) | High |

## Could not verify (no access)
- Exact WP core version behind the "7.0" Hostinger custom generator string (no SSH/file access this run).
- Live plugin count/exact versions and active-vs-inactive status — taken from existing gda-s01 audit, not re-confirmed via SSH this run.
- wp_ table prefix, debug flags (WP_DEBUG), auth key/salt sharing — require wp-config/DB access (file SSH not available).
- jnews-child functions.php debug code — sourced from prior audit, not re-inspected.
- HSTS at origin vs CDN layer — only edge response observed.

## Top technical fixes (analysis only — NOT executed)
1. Cut the redundant caching stack down to LiteSpeed Cache only; remove Autoptimize, WP Fastest Cache, WP Compress to eliminate conflicts and overhead.
2. Reduce 46-plugin footprint — remove the inactive/second page builder and duplicate backup plugin; target a lean stack.
3. Add HSTS header and remove/block readme.html to close fingerprinting and transport-security gaps.
4. Apply pending updates (Yoast SEO 27.7→27.8, Yoast Premium) and remove leftover debug code from jnews-child functions.php.
5. Establish a verified Google Search Console property for https://www.sepedamotor.com (current GSC points at gaiada.com — domain currently has no valid verification).
6. Confirm true WP core version and harden config (verify non-default table prefix, WP_DEBUG off, unique salts) once file access is available.
