# Technical Audit — interlace.com

> **In plain terms (for the team):** Your site is completely inaccessible to Google and users because the domain is parked (DNS A records point to a GoDaddy/AWS parking page, not your WordPress server), meaning no real content can be crawled or indexed. This also means the site is not secure, as the parking page provides no security headers (no HSTS, X-Content-Type-Options, X-Frame-Options, CSP), and its speed is irrelevant since your actual WordPress site isn't being served. The single biggest risk is that your website effectively does not exist for search engines or visitors, preventing any search performance or business impact.

**Server:** ce01 · **Platform:** wp · **Audited:** 2026-06-11 · **Status:** parked (GoDaddy/AWS domain-parking lander; DNS not pointed at ce01)

## Verified signals
- HTTP/redirects: http:// and https:// both return HTTP/1.1 200 OK directly (no http→https or non-www→www redirect). www and non-www both 200. Every path (incl. nonexistent ones) returns an identical 114-byte lander body — wildcard parking response, not a real site.
- robots.txt: LIVE (parking host) serves `User-agent: * / Allow: / / LLM-Policy: /llms.txt / Sitemap: /sitemap.xml`. On-disk file at ce01 (/var/www/interlace/public_html/robots.txt) is DIFFERENT: `User-agent: * / Crawl-Delay: 20`. The on-disk WP robots is NOT what visitors/crawlers see — the parking host overrides it.
- sitemap: https://interlace.com/sitemap.xml returns 200 with a single URL `<loc>https://interlace.com/lander</loc>` (the GoDaddy parking page). Not a WordPress sitemap; no real content URLs.
- HTTPS/headers: HTTPS responds 200 but response is bare — no Server header, no HSTS, no X-* security headers, no cache headers (parking-host response). No security headers present.
- Platform/version: WordPress install exists on ce01 at /var/www/interlace/public_html/ — wp-includes/version.php reports `$wp_version = '7.0'`. The live domain does NOT serve this WP install (DNS A records 15.197.148.33 / 3.33.130.190 = AWS/parking edge; ce01 internal IP is 10.148.0.10).
- Plugins/theme: From prior on-disk inventory — LiteSpeed Cache 7.8.1, All in One SEO 4.9.7.2, Elementor Pro 4.0.9, Gravity Forms 2.6.4, Wordfence 8.2.2 (all active), UpdraftPlus 1.26.4 (inactive). Many have pending updates. All irrelevant to live visitors since WP is not served.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| DNS / hosting | Domain parked: DNS A records point to AWS/GoDaddy parking edge (15.197.148.33 / 3.33.130.190), not ce01 (10.148.0.10). The WP install on ce01 is unreachable from the public domain. | High |
| Indexability | Live site serves only a single "lander" parking page; sitemap.xml lists only /lander. No real content is crawlable/indexable. | High |
| WP config | home and siteurl options are malformed — both set to empty `https:` (verified via wp-cli on ce01). WP would not render correctly even if DNS were repointed. | High |
| HTTPS/headers | No security headers on live responses (no HSTS, X-Content-Type-Options, X-Frame-Options, CSP). Parking host provides none. | Med |
| Redirects | No canonical redirect enforcement (http and www both 200 independently via parking host); no http→https or non-www→www consolidation. | Med |
| Robots mismatch | On-disk WP robots.txt (Crawl-Delay: 20) differs from live parking robots.txt; the WP robots is not in effect. Crawl-Delay: 20 on disk would throttle crawl if ever served. | Low |
| Plugin stack | Multiple active plugins with pending updates (LiteSpeed, AIOSEO, Elementor Pro, Gravity Forms, Wordfence); UpdraftPlus inactive but installed. Bloat/update debt latent — not live-facing while parked. | Low |
| Security (positive) | Non-default table prefix `wp1d_` (not wp_) and WP_DEBUG=false on ce01 — both correct. | Low |

## Could not verify (no access)
- Exposed-file checks (error_log, readme.html, wp-config.php.bak, etc.) on the REAL WP install — every live URL returns the identical 114-byte parking lander (incl. nonexistent paths), so live probing cannot reveal ce01 file exposure. Would require DNS to point at ce01 to test.
- Core Web Vitals / page-speed signals for the actual WP site — nothing real is served to measure.
- GSC verification status — not checked (no GSC query run for this domain in this audit).
- DISALLOW_FILE_EDIT / FS_METHOD and auth-key uniqueness across sites — auth keys are present in wp-config but cross-site reuse not compared.
- Schema markup presence — no real pages served to inspect (only parking lander).

## Top technical fixes (analysis only — NOT executed)
1. Repoint DNS A records for interlace.com (and www) from the parking edge to the ce01 server IP so the WordPress install is actually served.
2. Fix WordPress home and siteurl options (currently malformed empty `https:`) to the correct https://interlace.com URL before going live.
3. After repointing: enforce canonical redirects (http→https, non-www→www) and add security headers (HSTS, X-Content-Type-Options, X-Frame-Options, CSP) via .htaccess/server config.
4. Replace the parking robots.txt/sitemap behaviour with the WP-generated sitemap; remove the Crawl-Delay: 20 from the on-disk robots (unnecessary throttle) and let AIOSEO emit a real sitemap.
5. Update the WordPress core (7.0) check and the pending plugin updates (LiteSpeed, AIOSEO, Elementor Pro, Gravity Forms, Wordfence); remove/uninstall inactive UpdraftPlus if unused to cut bloat.
6. Once live on ce01, re-run exposed-file and CWV checks that cannot be performed while the domain is parked.
