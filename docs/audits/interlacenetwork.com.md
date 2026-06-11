# Technical Audit — interlacenetwork.com
**Server:** ce01 · **Platform:** wp · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: http://interlacenetwork.com → 301 → https://www.interlacenetwork.com/ (single hop, final HTTP/2 200). Non-www HTTPS also 301 → www. Redirects issued by WordPress (X-Redirect-By: WordPress). Correct canonical host enforcement.
- robots.txt: Present at /robots.txt. Content: `User-agent: *` + `Crawl-Delay: 20`. No `Sitemap:` directive. Trailing whitespace after `User-agent: *`. Crawl-Delay 20s is ignored by Google and needlessly throttles Bing.
- sitemap: Present, valid AIOSEO sitemap index at /sitemap.xml (HTTP 200, dynamically generated). All `<loc>` use the canonical https://www.interlacenetwork.com domain (not IP). Sub-sitemaps: post (2025-10-28), page (2025-10-28), attachment x3 (oldest 2023-01), category/tag (2026-01-14). Three attachment sitemaps bloat the index with media URLs.
- HTTPS/headers: Valid HTTPS (HTTP/2, LiteSpeed, HTTP/3 advertised via alt-svc). NO security headers present on the final 200 response: no Strict-Transport-Security (HSTS), no X-Frame-Options, no X-Content-Type-Options, no Content-Security-Policy, no Referrer-Policy. Server header exposes "LiteSpeed".
- Platform/version: WordPress 7.0 (wp-includes/version.php). Note: live HTML `<meta generator>` reported WordPress 6.9.4 / Elementor 4.1.1 — stale LiteSpeed page cache; on-disk versions are authoritative (WP 7.0, Elementor 4.0.9). table_prefix = `wp1d_` (non-default, good). WP_DEBUG = false (good). Auth keys/salts populated (no default "put your unique phrase here" placeholders).
- Plugins/theme: 22 active plugins. Active theme: dt-the7 (child of The7 stack via dt-the7-core). Heavy Elementor stack: Elementor 4.0.9 + Pro/pro-elements 3.27.0 + Essential Addons + Addon Elements + anwp post grid + startklar forms widgets. Gravity Forms 2.6.4 + 5 GF add-ons. Security: Wordfence 8.2.2, Really Simple SSL 9.5.11, WPS Hide Login 1.9.18. Both wp-mail-smtp (4.8.0, inactive) and wp-mail-smtp-pro (4.7.1, active) installed. UpdraftPlus 1.26.4 installed but INACTIVE. 7 themes present (only dt-the7 needed; 6 default/hello bundled).

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Security headers | No HSTS, X-Frame-Options, X-Content-Type-Options, CSP, or Referrer-Policy on responses despite Really Simple SSL + Wordfence being active. | High |
| Exposed file | wp-config backup `wp-config-backup-61a616bba42e90.67980203.php` sits in webroot; reachable at its URL (returns HTTP 500 — PHP-parsed not source-leaked, but a stray credentials backup in webroot is a leak risk). A second `.htaccess.bk` and `wp-config-backup-...php` exist on disk. | High |
| Plugin updates | Gravity Forms 2.6.4 (current branch is 2.9+; large version gap, known security advisories on old GF). Elementor 4.0.9 (behind). Akismet 5.7, AIOSEO 4.9.7.2 — review for pending updates. | High |
| Backups | UpdraftPlus installed but INACTIVE — no automated backups running. | High |
| Exposed file | readme.html (WP version disclosure) and parking-page.shtml publicly accessible (HTTP 200). error_log is blocked (403 — good) but a 47 MB error_log exists in webroot. | Med |
| Plugin bloat/conflict | Both wp-mail-smtp free (inactive) and pro (active) installed — redundant; remove free copy. 22 active plugins with a very heavy Elementor add-on stack (5+ Elementor extension plugins) increases attack surface, page weight, and conflict risk. | Med |
| robots.txt | Missing `Sitemap:` reference; `Crawl-Delay: 20` throttles Bing unnecessarily and is ignored by Google; trailing whitespace. | Med |
| CWV/speed | Heavy Elementor + The7 + multiple addon plugins typically inflate CSS/JS payload; large attachment sitemaps. LiteSpeed Cache active (mitigates). Stale cache served WP 6.9.4 meta while disk is 7.0 — cache may be serving outdated markup. | Med |
| Theme bloat | 6 unused themes bundled (twentytwentytwo→twentytwentyfive, twentyseventeen, hello-elementor) alongside the active dt-the7. Unused themes are an update/security liability. | Low |
| Sitemap hygiene | 3 attachment sitemaps (incl. 2023-dated) expose media-attachment URLs in the index. | Low |
| Indexability | Homepage robots meta = `max-image-preview:large` only (no noindex). No X-Robots-Tag noindex header. Site is indexable. | Info |

## Could not verify (no access)
- GSC verification STATUS (no GSC property data fetched for this domain in this run).
- Pending-update target versions for each plugin (no wp-cli `plugin list --update=available` run; gaps inferred from installed versions vs known current branches).
- PHP version / server-level config (not queried).
- Whether security headers are intentionally stripped by LiteSpeed vs simply unconfigured.

## Top technical fixes (analysis only — NOT executed)
1. Remove the stray `wp-config-backup-*.php`, `.htaccess.bk`, and the 47 MB `error_log` from the webroot; rotate DB/auth credentials if the backup ever leaked.
2. Add security headers (HSTS, X-Frame-Options/CSP, X-Content-Type-Options, Referrer-Policy) — Really Simple SSL Pro or LiteSpeed/.htaccess can set these.
3. Update Gravity Forms (2.6.4 → current) and Elementor (4.0.9 → current) to close the large version gaps and known advisories; verify The7/addon compatibility first on staging.
4. Re-activate and configure UpdraftPlus (or another backup) so automated backups run.
5. Add `Sitemap: https://www.interlacenetwork.com/sitemap.xml` to robots.txt and remove the `Crawl-Delay: 20` line and trailing whitespace.
6. Block/remove readme.html and parking-page.shtml from public access; purge LiteSpeed cache so markup reflects WP 7.0.
7. Delete the redundant free wp-mail-smtp plugin and the 6 unused bundled themes; audit the Elementor addon stack for plugins that can be consolidated/removed.
