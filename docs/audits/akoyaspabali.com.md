# Technical Audit — akoyaspabali.com

> **In plain terms (for the team):** Your site is at high risk of a security breach because a backup of your critical configuration file (wp-config) is publicly accessible, potentially exposing sensitive database credentials and allowing attackers to take over your site. While Google can crawl your site and it uses HTTPS, it's not as fast as it could be because no full-page caching is active, which impacts user experience and search performance. The biggest risk is the exposed `wp-config` backup file, which needs immediate removal and a credential rotation.

**Server:** ce01 · **Platform:** wp · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: http://akoyaspabali.com → 301 https://akoyaspabali.com/ → 301 https://www.akoyaspabali.com/ → 200. Canonical host is www over HTTPS. http→https and non-www→www both enforced, but non-www HTTP takes two 301 hops (extra redirect) instead of going straight to canonical www HTTPS. Server: nginx/1.24.0 (Ubuntu).
- robots.txt: Present. Only `User-agent: *` + `Crawl-Delay: 20`. No `Disallow` and (significantly) no `Sitemap:` directive. Crawl-Delay 20s is high and ignored by Google but throttles Bing/others.
- sitemap: Present and valid. Rank Math index at /sitemap_index.xml (also served at /sitemap.xml) → post-sitemap.xml (lastmod 2026-06-08) + page-sitemap.xml (lastmod 2026-05-13). All <loc> use https://www.akoyaspabali.com (domain, not IP). Well-formed XML.
- HTTPS/headers: Valid TLS, 200 on www. Present: X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, X-XSS-Protection. MISSING: Strict-Transport-Security (no HSTS). No X-Robots noindex header (indexable).
- Platform/version: WordPress 7.0 (core up to date). PHP 8.3.31. Table prefix custom (`4bXazL_`, not default wp_). WP_DEBUG=false. Auth-key placeholders: 0 (keys are set, not default).
- Plugins/theme: 32 plugin entries (many inactive/duplicate test copies); active theme `akoya-git` (child of GeneratePress/GP Premium stack). Pending updates: advanced-custom-fields 6.8.2→6.8.3, mailchimp-for-wp 4.12.6→4.13.0, seo-by-rank-math 1.0.271→1.0.272, wpcf7-recaptcha 1.4.9→1.5.0, plus inactive salon-booking-system & wp-smushit. Schema: Rank Math graph present (WebSite, Organization, WebPage, Article, Person, ImageObject, SearchAction).

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Security / exposed file | wp-config backup `wp-config-backup-644941bfe14da0.68757139.php` (Oct 2022) sits in the public webroot. Over HTTP it returns 500 (not 404), confirming the file is present and served by PHP — a stale config backup in webroot is a credential-leak risk. Also `.backup_info` and `.backup_log` dotfiles in webroot. | High |
| Plugin hygiene / bloat | Leftover dev/test plugin copies installed: `acf-repeaterasd`, `contact-form-extra-fieldasd`, `OUT-contact-form-extra-field-v2`. Plus a `maintenance.php` plugin drop-in listed. Dead code increases attack surface and update noise. | Med |
| Caching conflict | Three caching/optimisation plugins present but ALL inactive: litespeed-cache 7.8.1, wp-super-cache 3.1.1, wp-asset-clean-up (active). No page-cache layer is currently active → no full-page caching. Two competing cache plugins installed risks a conflict if both activated. | Med |
| Pending updates | 4 active plugins have updates pending (ACF, MC4WP, Rank Math, wpcf7-recaptcha). Security/recaptcha plugin among them. Auto-update is "on" but updates have not applied. | Med |
| HTTPS / HSTS | No Strict-Transport-Security header. HTTPS works but browsers are not told to enforce it; leaves SSL-strip window. | Med |
| Redirect chain | non-www HTTP → 2 hops (https non-www → https www) before 200. Adds latency; ideally single 301 straight to canonical www HTTPS. | Low |
| Security plugins inactive | limit-login-attempts-reloaded is inactive (Wordfence is active, so brute-force cover exists, but dedicated login limiter is off). wps-hide-login active (login URL obscured). | Low |
| robots.txt | No Sitemap directive; Crawl-Delay 20 may slow non-Google crawlers. (Technical robots config only — copy/strategy is SEO.) | Low |
| GSC verification status | Verified. Page exposes TWO google-site-verification meta tags (pfsM66Qx... and _Gn0myRj...) plus Bing msvalidate.01 — multiple GSC properties/owners verified; consolidate to avoid stale-owner confusion. | Low |

## Could not verify (no access)
- Core Web Vitals / field PageSpeed data (no CrUX/PSI pull performed this run; flagged only that no active page cache exists).
- Whether the exposed wp-config backup contains live (vs rotated) DB credentials — file not opened (read-only scope; would require reading credentials).
- HSTS at edge/CDN layer (checked origin nginx headers only; no CDN detected in headers).

## Top technical fixes (analysis only — NOT executed)
1. Remove the public wp-config backup PHP file plus `.backup_info`/`.backup_log` from webroot (move offline); rotate DB/auth keys if that backup held live creds. (High)
2. Delete the leftover test plugins (`*asd`, `OUT-*`) and any unused inactive plugins to cut attack surface and update noise.
3. Activate exactly one page-cache plugin (LiteSpeed or WP Super Cache, not both) to add full-page caching; keep WP Asset Clean Up for asset optimisation.
4. Apply the 4 pending plugin updates (ACF, MC4WP, Rank Math, wpcf7-recaptcha) and confirm auto-update is functioning.
5. Add HSTS (Strict-Transport-Security) header at nginx; collapse the non-www HTTP redirect to a single hop to canonical https://www.
6. Consolidate Google Search Console verification to a single current property/token; remove the stale verification meta tag.
