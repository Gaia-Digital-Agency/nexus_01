# Technical Audit — jackaroodigital.com.au
**Server:** pn01 · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: Initial request (e.g., HTTP or non-www) redirects via HTTP/2 301 to `https://www.jackaroodigital.com.au/`, which then serves a HTTP/2 200 response.
- robots.txt: Returns a 404 Not Found error.
- sitemap: `sitemap_index.xml` and `sitemap.xml` both return 404 Not Found errors.
- HTTPS/headers: Site serves over HTTPS (HTTP/2 200). Server is `nginx/1.24.0 (Ubuntu)`.
- Platform/version: No `generator` meta tag present. Server probe indicates `ROOT=/var/www/jackaroo`. The server runs `pm2` processes, suggesting a Node.js-based application, but no specific CMS for jackaroodigital is identified.
- Plugins/theme/security: JSON-LD schema is present. A server configuration file `jackaroodigital.bak_wwwfix` is located in `/etc/nginx/disabled-sites/`.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Indexability | `robots.txt` file is missing (returns 404 Not Found). | High |
| Indexability | Sitemap (both `sitemap_index.xml` and `sitemap.xml`) is missing (returns 404 Not Found). | High |
| Platform | No explicit CMS identified via `generator` meta tag. Site appears to be a custom Node.js application based on `pm2` process manager. | Info |
| Server Configuration | An Nginx configuration backup file related to jackaroodigital (`jackaroodigital.bak_wwwfix`) is present in the `/etc/nginx/disabled-sites/` directory. | Low |

## Could not verify
- CMS/platform specific version (beyond "no generator meta" and "Node.js based on pm2")
- Plugin/theme stack: conflicts/bloat/updates
- Security: table prefix/debug/exposed files/auth (beyond the config file path)
- Speed/Core Web Vitals signals
- GSC-verification STATUS

## Top technical fixes (analysis only — NOT executed)
1.  Implement a `robots.txt` file to control crawler access and prevent 404 errors for this critical file.
2.  Generate and implement a sitemap.xml file (and `sitemap_index.xml` if applicable) to aid search engine discovery and indexation of site pages.