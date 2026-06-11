# Technical Audit — baligirls.gaiada2.online
**Server:** pn01 · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: Single redirect from initial request to `https://baligirls.gaiada2.online/` (200 status).
- robots.txt: Present. Disallows `/admin`, `/admin/`, `/user/logged`, `/creator/logged`, and `/api/`.
- sitemap: Declared at `https://baligirls.gaiada2.online/sitemap.xml`.
- HTTPS/headers: HTTP/2 protocol in use. `x-frame-options: SAMEORIGIN` and `x-content-type-options: nosniff` security headers are present. `cache-control: no-cache` header is present.
- Platform/version: Server is Nginx/1.24.0 (Ubuntu). Backend is powered by Express. Application components include `baligirls-api` (v0.1.0), `baligirls-web-vite`, and `essentialbali-cms` (v15.1.4).
- Plugins/theme/security: No CMS generator meta tag found. `x-frame-options` and `x-content-type-options` headers are present.
- Schema presence: JSON-LD schema is present on the homepage.
- Indexability + GSC-verification STATUS: Robots.txt allows general crawling.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Indexability/Sitemap | The declared sitemap (`sitemap.xml`) returns an HTTP 200 status, but the provided content for `sitemap_index.xml` (which is likely the actual sitemap being served or a related sitemap file) is HTML, not a valid XML sitemap. | High |
| Speed/Caching | The `cache-control: no-cache` header is present, preventing browser caching for repeat visitors and potentially impacting load times. | Medium |
| Security/Configuration | The Nginx server root directory is configured as `/var/www/baligirls/maintenance`, which is an unusual path for a live site. | Low |
| Platform/Maintenance | Multiple distinct applications (`baligirls-api` v0.1.0, `baligirls-web-vite`, `essentialbali-cms` v15.1.4) are running on the same server, indicating a complex custom application stack. | Info |

## Could not verify
- Plugin/theme stack: conflicts/bloat/updates for `baligirls` application.
- Security: table prefix, debug mode status, specific exposed files (beyond the root path observation), or authentication mechanisms.
- Full Core Web Vitals (CWV) signals.
- Google Search Console (GSC) verification status.

## Top technical fixes (analysis only — NOT executed)
1.  Correct the sitemap generation to output valid XML content for `https://baligirls.gaiada2.online/sitemap.xml`.
2.  Review and adjust the `cache-control` header to allow for appropriate browser caching of static assets and page content, improving performance for repeat visitors.
3.  Investigate the server root directory configuration (`/var/www/baligirls/maintenance`) to ensure it is intentional, secure, and not exposing any sensitive files or directories.