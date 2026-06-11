# Technical Audit — balipropertybargains.com.au
**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: Site resolves to `https://balipropertybargains.com.au/` with a 200 OK status.
- robots.txt: Present and disallows `/404`.
- sitemap: `sitemap.xml` returns HTTP 200. `sitemap_index.xml` returns an HTML 404 page.
- HTTPS/headers: HTTPS is enforced with `Strict-Transport-Security` (HSTS) header, including `preload` directive. `Cache-Control: max-age=30` is set. `Content-Security-Policy` header is present.
- Platform/version: Go Daddy Website Builder 8.0.0000.
- Plugins/theme/security: HSTS and CSP headers are present. No specific plugin/theme details available beyond the platform.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Indexability | `sitemap_index.xml` URL serves an HTML 404 page instead of an XML sitemap index. | High |
| Indexability | Homepage has no meta description. | Med |
| Indexability | Homepage title is generic (`balipropertybargains.com.au`). | Med |
| Indexability | Homepage H1 is generic ("Launching Soon"). | Med |
| Schema | No JSON-LD schema markup detected. | Med |
| Speed/Caching | `Cache-Control` max-age is set to a very short 30 seconds. | Low |

## Could not verify
- CMS/platform specific plugin/theme conflicts, bloat, or update status (beyond the version number).
- Security: table prefix, debug mode, exposed files, authentication mechanisms.
- Content of `sitemap.xml`.
- Detailed Core Web Vitals metrics or other speed performance indicators.
- Google Search Console verification status.

## Top technical fixes (analysis only — NOT executed)
1.  Correct the `sitemap_index.xml` URL or ensure it serves a valid XML sitemap index, or remove references to it if not intended.
2.  Add a unique and descriptive meta description for the homepage.
3.  Implement relevant JSON-LD schema markup for the site's content.
4.  Update the homepage title and H1 to be descriptive of the site's purpose and offerings.
5.  Review and optimize `Cache-Control` headers for static assets to improve caching efficiency.