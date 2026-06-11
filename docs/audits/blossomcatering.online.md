# Technical Audit — blossomcatering.online
**Server:** ce01 · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: `HTTP/2 301` redirect from non-HTTPS to `https://www.blossomcatering.online/`. The final URL `https://www.blossomcatering.online/` serves `HTTP/2 200`.
- robots.txt: `User-agent: * Allow: /` (allows all crawling).
- sitemap: Declared sitemap `http://34.158.47.112/sitemap.xml` returns a 404 HTML page with `meta name="robots" content="noindex"`.
- HTTPS/headers: Site serves over HTTPS (`HTTP/2 200`). Security headers `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection: 1; mode=block` are present. `cache-control: s-maxage=31536000, stale-while-revalidate` is set.
- Platform/version: Next.js (`x-powered-by: Next.js`, `x-nextjs-cache: HIT`). Server is `nginx/1.24.0 (Ubuntu)`.
- Plugins/theme/security: No specific plugin/theme stack details. Security headers are implemented. Server configuration details are exposed.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Sitemap | Declared sitemap `http://34.158.47.112/sitemap.xml` returns a 404 HTML page instead of an XML sitemap. The 404 page itself contains a `noindex` meta tag. | High |
| Security | Server probe reveals exposed configuration details (`CONF=/etc/nginx/backup/multisite.bak-1776835570 ROOT=/var/www/html`). | High |
| Schema | No JSON-LD schema markup is present on the homepage. | Low |
| Canonicalization | The 404 sitemap page contains a canonical tag `http://34.158.47.112`, which is an IP address and uses HTTP. | Med |
| Sitemap Protocol | The declared sitemap URL uses HTTP (`http://34.158.47.112/sitemap.xml`) while the main site redirects to HTTPS. | Low |

## Could not verify
- CMS version (beyond Next.js framework)
- Specific plugin/theme stack details (beyond Next.js framework)
- Core Web Vitals metrics (only caching headers provided)
- Google Search Console verification status
- Internal linking structure
- Broken links
- Image optimization
- JavaScript rendering issues
- Mobile-friendliness
- Accessibility

## Top technical fixes (analysis only — NOT executed)
1.  Address exposed server configuration details immediately.
2.  Correct the sitemap issue: Ensure a valid XML sitemap is generated and accessible via HTTPS on the primary domain, and update `robots.txt` to point to the correct sitemap URL.
3.  Implement relevant JSON-LD schema markup on key pages.