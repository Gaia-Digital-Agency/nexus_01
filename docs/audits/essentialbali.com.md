# Technical Audit — essentialbali.com
**Server:** pn01 · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: HTTP to HTTPS redirect (301) is correctly implemented, leading to `https://www.essentialbali.com/`.
- robots.txt: `robots.txt` is present, disallowing `/admin` and `/api/`.
- sitemap: `sitemap.xml` is declared and accessible (HTTP 200). `sitemap_index.xml` returns a "Cannot GET" error.
- HTTPS/headers: Site serves over HTTPS. Server is `nginx/1.24.0 (Ubuntu)`. `x-powered-by: Express` header is present. `cache-control: no-cache, must-revalidate` header is present.
- Platform/version: Main site (`essentialbali`) is version 1.0.0, powered by Express. CMS (`essentialbali-cms`) is version 15.1.4.
- Plugins/theme/security: No `generator` meta tag is present. `/admin` and `/api/` paths are disallowed in `robots.txt`.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Sitemap | `sitemap_index.xml` returns a "Cannot GET" error, indicating a broken sitemap index. | Medium |
| On-page Structure | Homepage is missing an `h1` tag. | Low |
| Schema | No JSON-LD schema markup is present on the homepage. | Medium |
| Caching | `cache-control: no-cache, must-revalidate` header is set, potentially limiting browser caching benefits. | Medium |

## Could not verify
- Plugin/theme stack: conflicts/bloat/updates (beyond CMS version).
- Security: table prefix/debug/exposed files/auth (beyond robots.txt disallows and generator meta).
- Speed/CWV signals (beyond cache-control header).
- Indexability (beyond robots.txt and sitemap status).
- GSC-verification STATUS.

## Top technical fixes (analysis only — NOT executed)
1. Resolve the "Cannot GET" error for `sitemap_index.xml` or remove its declaration.
2. Implement JSON-LD schema markup on the homepage and other relevant pages.
3. Add a descriptive `h1` tag to the homepage.
4. Review and optimize `cache-control` headers for improved performance.