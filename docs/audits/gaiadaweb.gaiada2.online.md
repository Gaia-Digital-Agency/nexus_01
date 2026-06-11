# Technical Audit — gaiadaweb.gaiada2.online
**Server:** pn01 · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: No redirect chain detected; initial request to `https://gaiadaweb.gaiada2.online/` returned 200 OK.
- robots.txt: Present. Disallows `/admin/*`. Specifies `Host: https://gaiadaweb.gaiada2.online`. Lists three sitemaps: `https://gaiadaweb.gaiada2.online/sitemap.xml`, `https://gaiadaweb.gaiada2.online/pages-sitemap.xml`, `https://gaiadaweb.gaiada2.online/posts-sitemap.xml`.
- sitemap: `sitemap.xml` returns HTTP 200.
- HTTPS/headers: Site uses HTTP/2. Strong security headers are present: `x-frame-options: SAMEORIGIN`, `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, `permissions-policy`, and `content-security-policy`. Aggressive caching is configured via `cache-control: s-maxage=31536000`.
- Platform/version: `x-powered-by: Next.js, Payload`. The server is `nginx/1.24.0 (Ubuntu)`. The `gaiadaweb` application is running via PM2.
- Plugins/theme/security: No `generator` meta tag is exposed. `/admin/` path is disallowed in `robots.txt`. Security headers are well-configured.
- Speed/CWV signals: HTTP/2 is in use. `x-nextjs-cache: HIT` and `x-nextjs-prerender: 1` indicate effective caching and prerendering. Long `cache-control` duration.
- Indexability + GSC-verification STATUS: `robots.txt` allows crawling for all user-agents (except `/admin/`). Homepage has a title and meta description.
- Schema presence: No JSON-LD schema is present.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Sitemap | The URL `sitemap_index.xml` (which is not listed in `robots.txt`) returns an HTML 404 page that includes a `<meta name="robots" content="noindex"/>` tag. This indicates a misconfiguration or an unintended page being served at a sitemap-like URL, potentially confusing crawlers. | High |
| Schema | No JSON-LD schema markup is present on the homepage. | Medium |

## Could not verify
- GSC-verification STATUS
- Specific plugin/theme conflicts or bloat
- Security: table prefix, debug mode status, exposed files, authentication mechanisms (beyond headers)
- Actual content of `pages-sitemap.xml` and `posts-sitemap.xml` (only HTTP 200 status confirmed for `sitemap.xml`)
- Specific Core Web Vitals scores (only signals of good setup were observed)

## Top technical fixes (analysis only — NOT executed)
1.  Investigate and resolve the `sitemap_index.xml` issue. If this URL is not intended to be a sitemap, ensure it is not linked as such. If it is, correct the configuration to serve a valid XML sitemap index.
2.  Implement relevant JSON-LD schema markup (e.g., Organization, LocalBusiness, WebSite) on the homepage to enhance search engine understanding and potential for rich results.