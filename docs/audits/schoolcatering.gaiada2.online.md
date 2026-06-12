# Technical Audit — schoolcatering.gaiada2.online

> **In plain terms (for the team):** Your site is generally secure with good caching, but Google can't effectively discover all your pages because the sitemap (a map for search engines) is broken and points to a non-existent page. The single biggest risk is that this broken sitemap prevents Google from fully understanding and ranking your content, directly impacting your search visibility and organic traffic.

**Server:** pn01 · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: Site resolves directly to `https://schoolcatering.gaiada2.online/` with an HTTP 200 status.
- robots.txt: `User-agent: * Allow: /` (site is fully crawlable).
- sitemap: Declared sitemap `http://34.158.47.112/sitemap.xml` returns an HTTP 200 status, but the content is a 404 "This page could not be found" page with a `noindex` meta tag.
- HTTPS/headers: Site uses HTTP/2. Server is `nginx/1.24.0 (Ubuntu)`. Strong caching headers `s-maxage=31536000, stale-while-revalidate` are present.
- Platform/version: Site is powered by `Next.js` with `x-nextjs-cache: HIT`. No `generator` meta tag is present. The `schoolcatering-web` process is running via PM2.
- Plugins/theme/security: Security headers `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, and `X-XSS-Protection: 1; mode=block` are present. Nginx configuration references `/etc/nginx/disabled-sites/schoolcatering.bak_wwwfix`.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Sitemap | The declared sitemap `http://34.158.47.112/sitemap.xml` resolves to an IP address and, despite returning an HTTP 200 status, serves a 404 page with a `noindex` meta tag, making it ineffective for search engines. | High |
| Schema Markup | No JSON-LD schema markup is present on the homepage. | Med |
| Server Configuration | Nginx configuration includes a reference to `/etc/nginx/disabled-sites/schoolcatering.bak_wwwfix`, suggesting potential past configuration issues or remnants. | Low |
| Platform Versioning | The `schoolcatering-web` PM2 process shows `N/A` for its version, which can hinder tracking updates or potential vulnerabilities. | Low |
| PM2 Process Management | The `schoolcatering-web` PM2 process has `watching` status `disabled`, meaning automatic restarts on file changes are not active. | Info |

## Could not verify
- GSC-verification STATUS
- Speed/CWV signals
- Indexability status (beyond robots.txt and sitemap issues)
- Plugin/theme stack: conflicts/bloat/updates (for Next.js components)
- Security: table prefix/debug/exposed files/auth

## Top technical fixes (analysis only — NOT executed)
1.  Correct the sitemap configuration to ensure a valid, accessible, and indexable sitemap is declared and served from the primary domain.
2.  Implement relevant JSON-LD schema markup (e.g