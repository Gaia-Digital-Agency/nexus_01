# Technical Audit — blossomsteakhouse.com

> **In plain terms (for the team):** Your site is at high risk of being hacked because its entire custom theme code is publicly downloadable, exposing how it works to attackers. While Google can crawl your site and it's generally fast, the lack of a critical security header (HSTS) also leaves it vulnerable to certain attacks, and several important plugins are significantly out of date, which could lead to security holes or performance issues.

**Server:** ce01 · **Platform:** wp · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: http://blossomsteakhouse.com → 301 → https://blossomsteakhouse.com/ → 301 → https://www.blossomsteakhouse.com/ → 200. Canonical host is www+https. Clean single-hop chain per direction, both 301 permanent. (curl -sLI, 2026-06-11)
- robots.txt: HTTP 200 but served as `Content-Type: text/html` (should be text/plain). Yoast virtual file (no physical file on disk). Content valid: `User-agent: * / Disallow:` (allows all) + correct `Sitemap: https://www.blossomsteakhouse.com/sitemap_index.xml`. No crawl-delay. Note: response carries `X-Robots-Tag: noindex, follow` (normal for the robots.txt resource itself).
- sitemap: /sitemap_index.xml HTTP 200, valid XML, `Content-Type: text/xml`. 6 sub-sitemaps (post, page, event, category, author, geo). All `<loc>` use domain (https://www.blossomsteakhouse.com/...), not IP. lastmod current for post/page/category (Jun 2026); author-sitemap (2025-01-31) and geo-sitemap (2024-07-24) are stale.
- HTTPS/headers: Valid HTTPS (Let's Encrypt/AutoSSL). Security headers present: X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, X-XSS-Protection: 1; mode=block. **No HSTS (Strict-Transport-Security) header.** Server: nginx/1.24.0 (Ubuntu). LiteSpeed Cache active (X-LiteSpeed-Cache-Control). Homepage robots meta = `index, follow` (indexable, not noindexed).
- Platform/version: WordPress core 7.0 (wp core check-update: "at the latest version"). PHP 8.3.31 (CLI; old audit reported 8.1 — now upgraded). Table prefix non-default: `MFXs3sp_`. WP_DEBUG=false, FS_METHOD=direct. Auth salts defined (5+) and not placeholders. Docroot: /var/www/blossom/public_html.
- Plugins/theme: 26 active plugins (Yoast SEO+Premium, WP Schema Pro, WPSEO Local, LiteSpeed Cache, Wordfence, WPS Hide Login, CF7 + entries + reCAPTCHA, WP Mail SMTP+Logging, Polylang, Redirection, Redirect Spam, ACF Pro, CPT UI, Duplicate Post, Duplicator Pro, WP Social Ninja Pro, WP Social Reviews, Widget Google Reviews, Creame WhatsApp, Floating TOC, MS Clarity, Show Current Template, Use Any Font, Wicked Folders, WP Anchor Header). Active theme: blossom-git. 6 plugins have pending updates (see findings). Inactive plugin dirs still on disk: seo-by-rank-math, hostinger, hostinger-ai-assistant, click-to-chat-for-whatsapp, quick-pagepost-redirect-plugin.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Security / exposed file | Full theme source archive publicly downloadable: https://www.blossomsteakhouse.com/wp-content/themes/blossom-git.zip returns HTTP 200, Content-Type application/zip, 1,579,268 bytes. Exposes complete custom theme code. | High |
| Security / HSTS | No Strict-Transport-Security header on HTTPS responses. Site relies on 301s but no HSTS to enforce TLS / prevent SSL-strip. | Med |
| Plugin updates | 6 plugins outdated: WP Schema Pro 2.7.20→2.11.3 (major lag), WP Social Ninja Pro 3.13.1→4.2.2 (major lag), Yoast SEO 27.7→27.8, ACF Pro 6.8.3→6.8.4, CF7 reCAPTCHA 1.4.9→1.5.0, Rank Math 1.0.271.1→1.0.272 (inactive). WP Schema Pro & Social Ninja are several minor/major versions behind. | Med |
| Plugin hygiene / inactive | Rank Math SEO (seo-by-rank-math) still installed but inactive (Yoast is the active SEO plugin) — dual-SEO-plugin code on disk + stale rank_math_* postmeta. Audit recommendation to remove is still pending as of 2026-06-11. | Med |
| Plugin hygiene / inactive | Inactive plugin directories present on disk: hostinger, hostinger-ai-assistant, click-to-chat-for-whatsapp (a 2nd WhatsApp plugin alongside active Creame), quick-pagepost-redirect-plugin. Increase attack surface / clutter; not loaded but should be removed. | Low |
| Plugin bloat | 26 active plugins — moderately high count for a single restaurant site (redundant social/reviews stack: WP Social Ninja Pro + WP Social Reviews + Widget Google Reviews all active). Conflict/perf risk. | Low |
| Theme hygiene / exposed | Multiple themes on disk: legacy blossom, blossom-3 (orphaned), plus default twentytwentytwo/three/four/five. Only blossom-git active. blossom-git/style.css reportedly corrupted (demo markup) per prior audit. blossom-git.zip should not be in themes dir (see exposed-file finding). | Low |
| robots.txt MIME | Virtual robots.txt served with Content-Type: text/html instead of text/plain (no physical file; Yoast/PHP routing artifact). Parseable by Google but non-standard. | Low |
| Sitemap freshness | author-sitemap.xml (lastmod 2025-01-31) and geo-sitemap.xml (lastmod 2024-07-24) are stale vs post/page/category (Jun 2026). geo-sitemap (locations) not regenerated since site launch. | Low |
| Config hardening | DISALLOW_FILE_EDIT not set in wp-config.php — in-dashboard plugin/theme file editor remains enabled (admin-compromise hardening gap). | Low |
| Stray files | wp-content/plugins/index(1).php (28 bytes, harmless "Silence is golden" stub — duplicate index artifact) and empty wp-content/plugins/export/ directory. Cosmetic cruft, no functional/security impact. | Low |

## Could not verify (no access)
- HSTS preload-list submission status (header absent, so N/A).
- Core Web Vitals / field (CrUX) data — GSC not verified for this property, no field data accessible; only infra-level signals (LiteSpeed cache, 1yr browser caching from prior audit) observed, no lab/field CWV run performed here.
- GSC verification STATUS: per prior audit (2026-06-10) the property is NOT verified in Google Search Console (API returned insufficient permission) and no webmaster verification meta tokens are set in Yoast. Not independently re-checked live this run; homepage HTML shows no google-site-verification meta tag (consistent with not-verified).
- CDN presence — none detected (direct nginx serving); not separately confirmed via DNS this run.

## Top technical fixes (analysis only — NOT executed)
1. Remove/block the publicly downloadable theme archive at /wp-content/themes/blossom-git.zip (delete the .zip from the web root or deny via server config) — it leaks full custom theme source. (High)
2. Add HSTS (Strict-Transport-Security) header on HTTPS responses to enforce TLS. (Med)
3. Apply the 6 pending plugin updates, prioritising WP Schema Pro (2.7.20→2.11.3) and WP Social Ninja Pro (3.13.1→4.2.2) which lag by major versions. (Med)
4. Remove the inactive Rank Math plugin and clean residual rank_math_* postmeta; remove other unused plugin dirs (hostinger, hostinger-ai-assistant, 2nd WhatsApp plugin, quick-pagepost-redirect). (Med)
5. Serve robots.txt as a physical file with Content-Type: text/plain. (Low)
6. Regenerate/refresh stale sitemaps (geo-sitemap from 2024, author-sitemap from Jan 2025). (Low)
7. Set DISALLOW_FILE_EDIT (true) in wp-config.php to disable the dashboard file editor. (Low)
8. Remove orphaned legacy themes (blossom, blossom-3) and unused default themes; clean stray plugin-dir files. (Low)
