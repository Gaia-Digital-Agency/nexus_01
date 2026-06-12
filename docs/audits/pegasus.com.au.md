# Technical Audit — pegasus.com.au

> **In plain terms (for the team):** Your site is secure (HTTPS with HSTS) and Google can generally crawl it, but a critical error with your main sitemap index (sitemap_index.xml returns 400 error and has a `noindex` tag) means Google might not fully discover all your pages, directly impacting your search visibility. The single biggest risk is the sitemap index issue, compounded by a missing homepage title tag, which severely hinders how your site appears and ranks in search results.

**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: Site redirects from HTTP to HTTPS with a 301 redirect to `https://www.pegasus.com.au/`. The final URL returns a 200 OK status.
- robots.txt: Present. Allows all (`Allow: /`) but disallows specific paths for general user-agents (`*?lightbox=`) and specific bots (`AdsBot-Google`, `PetalBot`). Includes crawl delays for `dotbot` and `AhrefsBot`. Declares `Sitemap: https://pegasus.com.au/sitemap.xml`.
- sitemap: `sitemap.xml` returns HTTP 200.
- HTTPS/headers: Site uses HTTPS. HSTS (`Strict-Transport-Security: max-age=31556952`) is enabled. HTTP/2 is used, and HTTP/3 (h3) is supported via `alt-svc`.
- Platform/version: Wix.com Website Builder (identified by `generator meta`, `x-meta-site-id`, `server: Pepyaka`, and `static.parastorage.com` links).
- Plugins/theme/security: HSTS is enabled.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Sitemap | The `sitemap_index.xml` URL returns a 400 error and contains a `noindex` meta tag, preventing search engines from discovering the sitemap index. | High |
| On-page | The homepage is missing a `<title>` tag. | High |
| On-page | The homepage is missing a meta description. | Med |
| On-page | The homepage is missing an `<h1>` heading. | Med |
| Schema | JSON-LD schema is not present on the homepage. | Med |

## Could not verify
- CMS/platform version (beyond "Wix.com Website Builder")
- Plugin/theme stack conflicts or bloat
- Security: table prefix, debug mode status, exposed files, authentication mechanisms (beyond HSTS)
- Speed/CWV signals
- Indexability (beyond robots.txt and sitemap status)
- GSC-verification STATUS

## Top technical fixes (analysis only — NOT executed)
1.  Resolve the `sitemap_index.xml` 400 error and `noindex` tag to ensure proper sitemap discovery.
2.  Add a descriptive and unique `<title>` tag to the homepage.
3.  Add a compelling meta description to the homepage.
4.  Implement a clear and descriptive `<h1>` heading on the homepage.
5.  Implement relevant JSON-LD schema markup (e.g., Organization, LocalBusiness) on the homepage.