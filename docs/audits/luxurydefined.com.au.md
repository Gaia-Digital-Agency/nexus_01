# Technical Audit — luxurydefined.com.au

> **In plain terms (for the team):** Your site is secure (HTTPS) and Google can crawl it, but the missing sitemap (sitemap.xml and sitemap_index.xml return 404) is the single biggest risk, severely hindering Google's ability to discover and index your content, which directly impacts your search performance. Additionally, a `Crawl-Delay: 20` in your robots.txt is unnecessarily slowing down how Google interacts with your site, and the default WordPress database prefix (`wp_`) presents a moderate security vulnerability.

**Server:** ce01 · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: Non-HTTPS (HTTP) redirects to HTTPS (301 Moved Permanently).
- robots.txt: Present, includes `User-agent: *` and `Crawl-Delay: 20`.
- sitemap: `sitemap_index.xml` and `sitemap.xml` both return HTTP 404 Not Found.
- HTTPS/headers: Site serves over HTTPS with a 200 OK response. Server is `nginx/1.24.0 (Ubuntu)`.
- Platform/version: WordPress. Generator meta tag is not present.
- Plugins/theme/security:
    - Plugins identified: `advanced-custom-fields-pro`, `advanced-custom-fields-pro-2`, `auto-block-recovery`, `contact-form-7`, `custom-attr-block`, `duplicate-post`, `fluentform`, `seo-by-rank-math`.
    - WordPress table prefix is default (`wp_`).
    - `WP_DEBUG` is set to `false`.
    - JSON-LD schema is not present.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Sitemap | `sitemap.xml` and `sitemap_index.xml` files return HTTP 404 Not Found. | High |
| Security | WordPress database table prefix is the default `wp_`. | Medium |
| Schema | JSON-LD schema markup is not present on the homepage. | Medium |
| Plugins | Both `advanced-custom-fields-pro` and `advanced-custom-fields-pro-2` are listed, indicating potential conflict or redundancy. | Medium |
| Robots.txt | `Crawl-Delay: 20` is specified in `robots.txt`. | Info |

## Could not verify
- CMS/platform version
- Theme stack
- Plugin/theme update status
- Security: Exposed files/authentication beyond table prefix and debug mode
- Speed/Core Web Vitals signals
- Indexability status (beyond sitemap issue)
- Google Search Console verification status

## Top technical fixes (analysis only — NOT executed)
1.  Implement and correctly configure `sitemap.xml` and `sitemap_index.xml` to improve crawlability and indexability.
2.  Change the default WordPress database table prefix (`wp_`) to a custom, more secure prefix.
3.  Implement relevant JSON-LD schema markup (e.g., Organization, LocalBusiness) to enhance search visibility and rich results.
4.  Review and consolidate `advanced-custom-fields-pro` plugins to avoid potential conflicts or bloat.
5.  Evaluate the necessity of `Crawl-Delay: 20` in `robots.txt` and remove if not required, as it can unnecessarily slow down crawling.