# Technical Audit — balispaguide.com

> **In plain terms (for the team):** Your site is secure and Google can crawl it, but the biggest risk is that Google might not find all your pages because your sitemaps are missing (return 404 errors), which directly impacts your ability to rank for all your content. Additionally, implementing structured data (schema markup) would help Google better understand your content and potentially show richer results.

**Server:** ce01 · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: Site redirects from HTTP to HTTPS (301 Moved Permanently) to `https://www.balispaguide.com/`.
- robots.txt: Present. Standard Drupal configuration, allows core CSS/JS/images, disallows `/core/`, `/profiles/`, and `/README.txt`.
- sitemap: `sitemap_index.xml` and `sitemap.xml` both return HTTP 404 "Page not found".
- HTTPS/headers: Site serves over HTTPS. Server is `nginx/1.24.0 (Ubuntu)`. Includes caching headers (`Cache-Control: max-age=86400, public`) and security headers (`X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection: 1; mode=block`).
- Platform/version: Drupal 10.
- Plugins/theme/security: Security headers are present.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Indexability | XML sitemaps (`sitemap_index.xml`, `sitemap.xml`) return 404 errors. | High |
| Schema | JSON-LD schema markup is not present on the homepage. | Medium |

## Could not verify
- Drupal plugin/theme stack (beyond core modules).
- Drupal security configurations (e.g., table prefix, debug mode status, exposed files, authentication mechanisms).
- Speed/Core Web Vitals signals.
- Overall indexability status (beyond robots.txt and sitemap presence).
- Google Search Console verification status.
- The WordPress platform, plugin list, table prefix, and `WP_DEBUG` status provided in the `server probe` are for `akoyaspabali.com` and not applicable to `balispaguide.com` (which runs Drupal 10).

## Top technical fixes (analysis only — NOT executed)
1. Generate and properly configure XML sitemaps (`sitemap_index.xml`, `sitemap.xml`) to ensure all relevant pages are discoverable by search engines.
2. Implement relevant JSON-LD schema markup (e.g., LocalBusiness, Spa, Article) to enhance search engine understanding and potential rich results.