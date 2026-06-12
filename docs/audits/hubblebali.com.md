# Technical Audit — hubblebali.com

> **In plain terms (for the team):** Your site is vulnerable to hackers because a publicly accessible error log (/error_log) exposes sensitive server information, and 16 of 19 active plugins, including your security plugin (Wordfence), are outdated. While Google can crawl your site and it uses HTTPS, the biggest risk is this critical security flaw, which could lead to a full site compromise.

**Server:** ce01 · **Platform:** wp · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: http→https 301; non-www→www 301; canonical host https://www.hubblebali.com/ returns 200. Chain correct (single hop to canonical). Server: nginx/1.24.0 (Ubuntu).
- robots.txt: Present at /robots.txt. Content: `User-agent: *` + `Crawl-Delay: 20`. No `Sitemap:` directive. Crawl-Delay 20 is high and ignored by Google but throttles other crawlers.
- sitemap: Rank Math index at /sitemap_index.xml (valid XML, locs use https://www.hubblebali.com domain, not IP). Sub-sitemaps: post (lastmod 2023-03-24), page (2023-11-28), event (2023-09-12), location (2023-03-23), news (2023-10-13), category (2023-03-24). All lastmods in 2023.
- HTTPS/headers: Valid TLS, 200 on canonical. Security headers present: X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, X-XSS-Protection, X-DNS-Prefetch-Control. NO Strict-Transport-Security (HSTS) header. No X-Robots-Tag noindex (indexable).
- Platform/version: WordPress 6.9.1 (current). Active theme: hubble v1.0 (custom child). PHP error log indicates prior cPanel/Plesk wp-toolkit environment.
- Plugins/theme: 19 active plugins. 16 plugins have pending updates (see findings). Inactive themes present (generatepress, twentytwentyfour/five).

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Security / exposed file | /error_log is publicly fetchable (HTTP 200, application/octet-stream, 10.4 MB). Leaks full server filesystem paths (e.g. /usr/local/cpanel/3rdparty/wp-toolkit/...) and PHP fatal/stack traces. | High |
| Plugin stack / conflicts | Four redirect plugins active simultaneously: eps-301-redirects, redirection, redirect-redirection, quick-pagepost-redirect-plugin. Overlapping function — rule conflicts, redirect-chain risk, overhead. | High |
| Plugin updates | 16 of 19 active plugins have updates pending, incl. Wordfence 8.1.4→8.2.2, Rank Math 1.0.264.1→1.0.272, LiteSpeed Cache 7.7→7.8.1, Polylang 3.7.7→3.8.4, ACF 6.7.0→6.8.3, CF7 6.1.5→6.1.6, wp-mail-smtp 4.7.1→4.8.0, plus others. Security plugin (Wordfence) being out of date is most pressing. | High |
| Security / info disclosure | /readme.html exposed (HTTP 200) — discloses WordPress version to attackers. | Med |
| Security / config hardening | wp-config.php has no DISALLOW_FILE_EDIT (dashboard file editor enabled) and no FORCE_SSL_ADMIN defined. | Med |
| Transport security | No HSTS (Strict-Transport-Security) header despite full HTTPS + redirect setup. | Med |
| robots.txt | No Sitemap directive; Crawl-Delay: 20 throttles non-Google crawlers unnecessarily. | Low |
| Plugin bloat | 19 active plugins including show-current-template (developer/debug tool left active in production) and two mail plugins (wp-mail-logging + wp-mail-smtp). | Low |
| Inactive themes | Two default themes (twentytwentyfour, twentytwentyfive) inactive with updates available — unused attack surface. | Low |
| Positive: auth/keys | wp-config table_prefix is custom non-default (MFXs3sp_); auth salts customized (0 default placeholders); WP_DEBUG false. Good. | Info |
| Positive: login hardening | wps-hide-login active — wp-login.php returns 404, wp-admin 302-redirects. Login URL obscured. | Info |

## Could not verify (no access)
- xmlrpc.php status: POST returned curl code 000 (timeout/connection reset) — inconclusive whether disabled or just slow/blocked at edge.
- GSC site-verification status: no google-site-verification meta tag on homepage and no GSC MCP status endpoint available; verification may be via DNS/file/GA — could not confirm verified state. (Note: GSC performance metrics belong to the SEO audit.)
- Core Web Vitals / field data: no PSI/CrUX signal pulled in this pass; LiteSpeed Cache active suggests caching in place but real CWV not measured.
- DNS / hosting infra ownership (Hostinger vs ce01 origin): not cross-checked this pass.

## Top technical fixes (analysis only — NOT executed)
1. Remove/deny public access to /error_log (and rotate/delete the 10 MB file) — it leaks server paths and stack traces. Highest priority.
2. Consolidate the four redirect plugins down to one (Redirection or Rank Math's built-in) to eliminate conflict and overhead.
3. Apply pending plugin updates, prioritising Wordfence 8.1.4→8.2.2 and Rank Math; schedule a full update + backup (Duplicator Pro present).
4. Block /readme.html and add HSTS header; define DISALLOW_FILE_EDIT and FORCE_SSL_ADMIN in wp-config.php.
5. Add `Sitemap: https://www.hubblebali.com/sitemap_index.xml` to robots.txt and drop the Crawl-Delay (or lower it).
6. Deactivate show-current-template (debug tool) in production and remove unused inactive themes.
