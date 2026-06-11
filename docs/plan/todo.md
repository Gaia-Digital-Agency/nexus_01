# Gaia Nexus — Execution Backlog (by wave)

**Compiled:** 11 June 2026 from the 63 audit docs (`docs/audits/`) + 63 SEO docs (`docs/seo/`).
**Wave model:** 0 Audit production (done) · 1 Audit scope (technical fixes) · 2 SEO scope (meta+content) · 3 GBP/Ads/social (blocked).
**Legend:** [ ] to do · [x] done · ⛔ blocked. Analysis is complete; these are the EXECUTION actions (not yet started).

---

## Wave 0 — Audit production ✅ COMPLETE
- [x] 63 technical audits (`docs/audits/<domain>.md`) — every live site on gda-ce01 (17), gda-pn01 (5), hostinger (41).
- [x] 63 SEO analyses (`docs/seo/<domain>.md`).
- [x] Consolidated `docs/plan/findings.md` (cross-site + 63-site index).
- [x] Boundary split enforced: audits = technical; seo = search. Committed `571a48c`.

---

## Wave 1 — Audit scope of work (execute technical fixes)

**Cross-cutting priorities (do first — highest severity / portfolio-wide):**
- [ ] 🔴 **Rotate shared WP auth keys/salts** — goldenmonkeysanur ↔ goldenmonkeyubud (identical = cross-site cookie forgery); make unique.
- [ ] 🔴 **viceroybali**: remove `$_GET['WP_DEBUG']` branch + enable `DISALLOW_FILE_EDIT`; drop one of WP Rocket / LiteSpeed (dual cache).
- [ ] 🔴 **balihiddenvillas**: rename the `admin` user + enforce 2FA.
- [ ] 🔴 **bimc-cosmedic-01.gaiada.com**: confirm staging; if so, `noindex` + `Disallow: /` (currently indexable).
- [ ] 🔴 **aquatir.id**: reconsider robots `Disallow: /shop/` (blocking WooCommerce products).
- [ ] 🟠 **HSTS portfolio-wide**: add `Strict-Transport-Security` (near-universally missing).
- [ ] 🟠 **Default `wp_` prefix**: ayrwater, goldenmonkeybali, motagarage, caviar.
- [ ] 🟠 **Dual SEO / caching plugins**: gaiada (3 SEO), reflexologyubud, nailsalonubud; caching on goldenmonkeyubud.

**Per-site technical checklist — sites with High-severity findings (40):**

### akoyaspabali.com  _(live)_
- [ ] Remove the public wp-config backup PHP file plus `.backup_info`/`.backup_log` from webroot (move offline); rotate DB/auth keys if that backup held live creds. (High)
- [ ] Delete the leftover test plugins (`*asd`, `OUT-*`) and any unused inactive plugins to cut attack surface and update noise.
- [ ] Activate exactly one page-cache plugin (LiteSpeed or WP Super Cache, not both) to add full-page caching; keep WP Asset Clean Up for asset optimisation.
- [ ] Apply the 4 pending plugin updates (ACF, MC4WP, Rank Math, wpcf7-recaptcha) and confirm auto-update is functioning.
- [ ] Add HSTS (Strict-Transport-Security) header at nginx; collapse the non-www HTTP redirect to a single hop to canonical https://www.
- [ ] Consolidate Google Search Console verification to a single current property/token; remove the stale verification meta tag.

### aquatir.id  _(live)_
- [ ] Reconsider `Disallow: /shop/` — if products should rank, remove it.
- [ ] Add HSTS.

### ayrwater.com  _(live)_
- [ ] Remove the duplicate ACF Pro install (`advanced-custom-fields-pro-2`); keep one.
- [ ] Delete the 5 redundant `ayrwater*` backup themes from `wp-content/themes`.
- [ ] Add HSTS on the canonical host; consolidate to one form plugin.
- [ ] (Optional) migrate off default `wp_` prefix.

### baligirls.gaiada2.online  _(live)_
- [ ] Correct the sitemap generation to output valid XML content for `https://baligirls.gaiada2.online/sitemap.xml`.
- [ ] Review and adjust the `cache-control` header to allow for appropriate browser caching of static assets and page content, improving performance for repeat visitors.
- [ ] Investigate the server root directory configuration (`/var/www/baligirls/maintenance`) to ensure it is intentional, secure, and not exposing any sensitive files or directories.

### balihiddenvillas.com  _(live (intermittent 403 challenge — accessible on retry))_
- [ ] Rename the `admin` user / enforce strong auth + 2FA.
- [ ] Enable page caching (LiteSpeed/CDN) — currently DYNAMIC.
- [ ] Exclude `sureforms_form` from the sitemap; add HSTS.

### balipropertybargains.com.au  _(live)_
- [ ] Correct the `sitemap_index.xml` URL or ensure it serves a valid XML sitemap index, or remove references to it if not intended.
- [ ] Add a unique and descriptive meta description for the homepage.
- [ ] Implement relevant JSON-LD schema markup for the site's content.
- [ ] Update the homepage title and H1 to be descriptive of the site's purpose and offerings.
- [ ] Review and optimize `Cache-Control` headers for static assets to improve caching efficiency.

### balirca.id  _(live)_
- [ ] **Resolve robots.txt and sitemap conflicts:** Align `robots.txt` disallows with sitemap inclusions. If content in disallowed sitemaps (`resource-sitemap.xml`, `member-resources-sitemap.xml`, `sustainable_partners-sitemap.xml`) is intended for indexing, remove the corresponding `Disallow` directives in `robots.txt`. If not, remove them from the sitemap.
- [ ] **Correct sitemap URL:** Ensure `sitemap.xml` redirects to `sitemap_index.xml` or update all references to use `sitemap_index.xml` consistently to avoid 404 errors.
- [ ] **Review `Crawl-Delay` directive:** Consider removing or reducing the `Crawl-Delay: 20` in `robots.txt` unless there's a specific server load concern, as it can hinder efficient crawling.
- [ ] **Add a primary H1 tag to the homepage:** Implement a clear and descriptive `<h1>` tag on the homepage for better content structure and SEO.
- [ ] **Review disallowed paths in `robots.txt`:** Evaluate if paths like `/resource/`, `/member-resources/`, `/cuisine/`, `/location/` should truly be blocked from search engines. If they contain valuable content, allow them.

### balirestaurantguide.com  _(live)_
- [ ] **Address Server Unresponsiveness and HTTP Header Delivery:** Investigate and resolve the root cause of the server timeouts and failure to deliver HTTP response headers. This is foundational for the site to function.
- [ ] **Implement Core HTML Elements:** Ensure the homepage (and other pages) render with essential HTML elements: a unique `<title>`, a descriptive `<meta description>`, and a relevant `<h1>` heading.
- [ ] **Configure Sitemaps Correctly:** Generate and properly configure sitemap_index.xml and sitemap.xml to list all indexable pages, ensuring they return a valid HTTP 200 status.
- [ ] **Implement JSON-LD Schema Markup:** Add relevant structured data (e.g., LocalBusiness, Restaurant, Article) using JSON-LD to the homepage and other relevant pages to enhance search engine understanding and potential for rich results.
- [ ] **Review and Configure robots.txt:** Populate the robots.txt file with appropriate `User-agent` and `Disallow`/`Allow` directives to guide search engine crawlers effectively.

### balispaguide.com  _(live)_
- [ ] Generate and properly configure XML sitemaps (`sitemap_index.xml`, `sitemap.xml`) to ensure all relevant pages are discoverable by search engines.
- [ ] Implement relevant JSON-LD schema markup (e.g., LocalBusiness, Spa, Article) to enhance search engine understanding and potential rich results.

### bimc-cosmedic-01.gaiada.com  _(live (staging/subdomain on gaiada.com))_
- [ ] Confirm staging vs production. If staging, add `noindex` + `Disallow: /` and/or HTTP auth.
- [ ] Enable caching; add HSTS if it becomes production.

### blossomcatering.online  _(live)_
- [ ] Address exposed server configuration details immediately.
- [ ] Correct the sitemap issue: Ensure a valid XML sitemap is generated and accessible via HTTPS on the primary domain, and update `robots.txt` to point to the correct sitemap URL.
- [ ] Implement relevant JSON-LD schema markup on key pages.

### blossomsteakhouse.com  _(live)_
- [ ] Remove/block the publicly downloadable theme archive at /wp-content/themes/blossom-git.zip (delete the .zip from the web root or deny via server config) — it leaks full custom theme source. (High)
- [ ] Add HSTS (Strict-Transport-Security) header on HTTPS responses to enforce TLS. (Med)
- [ ] Apply the 6 pending plugin updates, prioritising WP Schema Pro (2.7.20→2.11.3) and WP Social Ninja Pro (3.13.1→4.2.2) which lag by major versions. (Med)
- [ ] Remove the inactive Rank Math plugin and clean residual rank_math_* postmeta; remove other unused plugin dirs (hostinger, hostinger-ai-assistant, 2nd WhatsApp plugin, quick-pagepost-redirect). (Med)
- [ ] Serve robots.txt as a physical file with Content-Type: text/plain. (Low)
- [ ] Regenerate/refresh stale sitemaps (geo-sitemap from 2024, author-sitemap from Jan 2025). (Low)
- [ ] Set DISALLOW_FILE_EDIT (true) in wp-config.php to disable the dashboard file editor. (Low)
- [ ] Remove orphaned legacy themes (blossom, blossom-3) and unused default themes; clean stray plugin-dir files. (Low)

### cascadesbali.com  _(live)_
- [ ] Re-activate Wordfence (or confirm an equivalent active WAF) — a dormant security plugin leaves the site unprotected.
- [ ] Apply pending plugin updates: ACF Pro, Rank Math, wpcf7-recaptcha; remove/replace inactive wp-optimize.
- [ ] Clean the plugin stack: delete the orphaned `advanced-custom-fields-pro__` dir, the redundant non-pro `advanced-custom-fields`, and the unused `acf-content-analysis-for-yoast-seo`.
- [ ] Rewrite robots.txt so each Crawl-delay sits under its correct User-agent block and remove the orphan directives.
- [ ] Add HSTS (and consider CSP) at the nginx/server layer; collapse the redirect chain to a single 301 (http://* and non-www → https://www in one hop).
- [ ] Set `define('DISALLOW_FILE_EDIT', true);` in wp-config.php to disable the in-dashboard file editor.
- [ ] Remove the inactive duplicate `cascades` theme.
- [ ] Add Restaurant/LocalBusiness JSON-LD via Rank Math to cover the business type (schema-type completeness).

### cascadessuites.com  _(live)_
- [ ] Add an `<h1>` tag to the homepage for improved SEO and accessibility.
- [ ] Address the `sitemap.xml` 404 error by either redirecting it to `sitemap_index.xml` or ensuring it is not referenced by any internal or external links.

### dreamcatchervillas.com  _(redirect → instagram.com/dreamcatchervillas (302))_
- [ ] Decide intent: either build a real site, or replace the WP install with a lightweight redirect/landing page.
- [ ] If forwarding is permanent, use 301 (not 302) — though forwarding a domain to Instagram forfeits all SEO value.

### enzogelatobali.com  _(live)_
- [ ] Address site responsiveness and connectivity issues (timeouts on redirect checks, HTTP 000 for sitemap.xml).
- [ ] Implement a unique and descriptive `<title>` tag for the homepage.
- [ ] Add a relevant meta description for the homepage.
- [ ] Add a primary `<h1>` heading to the homepage.
- [ ] Implement relevant JSON-LD schema on the homepage.

### gaiada.com  _(live)_
- [ ] Review and remove or significantly reduce the `Crawl-Delay: 20` directive in `robots.txt` to allow for more efficient crawling by search engines.
- [ ] Investigate Hostinger CDN configuration for the homepage to ensure optimal caching, moving from `DYNAMIC` to a more aggressive caching strategy where appropriate to improve load times.
- [ ] Monitor WordPress and PHP versions for new updates and plan upgrades to maintain security and performance.

### gaiadaweb.gaiada2.online  _(live)_
- [ ] Investigate and resolve the `sitemap_index.xml` issue. If this URL is not intended to be a sitemap, ensure it is not linked as such. If it is, correct the configuration to serve a valid XML sitemap index.
- [ ] Implement relevant JSON-LD schema markup (e.g., Organization, LocalBusiness, WebSite) on the homepage to enhance search engine understanding and potential for rich results.

### goldenmonkeysanur.com  _(redirect → goldenmonkeybali.com/contact/#sanur)_
- [ ] Rotate AUTH keys/salts so they differ from goldenmonkeyubud.com.
- [ ] Replace the redundant WP install with a static 301; strengthen DB password.

### goldenmonkeyubud.com  _(redirect → goldenmonkeybali.com/contact/)_
- [ ] Rotate AUTH keys/salts (must differ from sanur).
- [ ] Remove one cache plugin + the git artifacts; strengthen DB password.
- [ ] Collapse to a static 301 if no standalone content is needed.

### hubblebali.com  _(live)_
- [ ] Remove/deny public access to /error_log (and rotate/delete the 10 MB file) — it leaks server paths and stack traces. Highest priority.
- [ ] Consolidate the four redirect plugins down to one (Redirection or Rank Math's built-in) to eliminate conflict and overhead.
- [ ] Apply pending plugin updates, prioritising Wordfence 8.1.4→8.2.2 and Rank Math; schedule a full update + backup (Duplicator Pro present).
- [ ] Block /readme.html and add HSTS header; define DISALLOW_FILE_EDIT and FORCE_SSL_ADMIN in wp-config.php.
- [ ] Add `Sitemap: https://www.hubblebali.com/sitemap_index.xml` to robots.txt and drop the Crawl-Delay (or lower it).
- [ ] Deactivate show-current-template (debug tool) in production and remove unused inactive themes.

### huntermotorcycles.co.id  _(live)_
- [ ] Fix robots.txt Sitemap line to `https://www.huntermotorcycles.co.id/sitemap_index.xml` (currently an unreachable IP URL) — or switch to Yoast-managed robots.txt.
- [ ] Schedule a maintenance window to apply the 20 pending plugin updates, prioritising security plugins (Wordfence, LiteSpeed Cache, WooCommerce, Yoast).
- [ ] Reduce or remove `Crawl-Delay: 20` to lift Googlebot crawl throttling.
- [ ] Add HSTS (Strict-Transport-Security) header now that http→https is enforced.
- [ ] Harden wp-config: add DISALLOW_FILE_EDIT (and consider DISALLOW_FILE_MODS); remove the 10 inactive plugins and 5 unused default themes.
- [ ] Refresh stale 2023 product sitemaps and make the Polylang language redirect a 301 to trim the redirect chain.

### institutescoffier.com  _(live)_
- [ ] Address the `sitemap.xml` 404 error by configuring Yoast SEO to output to `sitemap.xml` or ensuring `sitemap_index.xml` is correctly referenced in `robots.txt` and Google Search Console.
- [ ] Add a relevant `<h1>` tag to the homepage for improved SEO and user experience.
- [ ] Investigate and optimize the upstream response times (1.481s - 2.534s) to improve server-side performance.

### interlace.com  _(parked (GoDaddy/AWS domain-parking lander; DNS not pointed at ce01))_
- [ ] Repoint DNS A records for interlace.com (and www) from the parking edge to the ce01 server IP so the WordPress install is actually served.
- [ ] Fix WordPress home and siteurl options (currently malformed empty `https:`) to the correct https://interlace.com URL before going live.
- [ ] After repointing: enforce canonical redirects (http→https, non-www→www) and add security headers (HSTS, X-Content-Type-Options, X-Frame-Options, CSP) via .htaccess/server config.
- [ ] Replace the parking robots.txt/sitemap behaviour with the WP-generated sitemap; remove the Crawl-Delay: 20 from the on-disk robots (unnecessary throttle) and let AIOSEO emit a real sitemap.
- [ ] Update the WordPress core (7.0) check and the pending plugin updates (LiteSpeed, AIOSEO, Elementor Pro, Gravity Forms, Wordfence); remove/uninstall inactive UpdraftPlus if unused to cut bloat.
- [ ] Once live on ce01, re-run exposed-file and CWV checks that cannot be performed while the domain is parked.

### interlacenetwork.com  _(live)_
- [ ] Remove the stray `wp-config-backup-*.php`, `.htaccess.bk`, and the 47 MB `error_log` from the webroot; rotate DB/auth credentials if the backup ever leaked.
- [ ] Add security headers (HSTS, X-Frame-Options/CSP, X-Content-Type-Options, Referrer-Policy) — Really Simple SSL Pro or LiteSpeed/.htaccess can set these.
- [ ] Update Gravity Forms (2.6.4 → current) and Elementor (4.0.9 → current) to close the large version gaps and known advisories; verify The7/addon compatibility first on staging.
- [ ] Re-activate and configure UpdraftPlus (or another backup) so automated backups run.
- [ ] Add `Sitemap: https://www.interlacenetwork.com/sitemap.xml` to robots.txt and remove the `Crawl-Delay: 20` line and trailing whitespace.
- [ ] Block/remove readme.html and parking-page.shtml from public access; purge LiteSpeed cache so markup reflects WP 7.0.
- [ ] Delete the redundant free wp-mail-smtp plugin and the 6 unused bundled themes; audit the Elementor addon stack for plugins that can be consolidated/removed.

### isort.id  _(live)_
- [ ] Delete or regenerate the static /var/www/isort/public_html/sitemap.xml (currently exposes internal IP 34.158.47.112 in all locs) — let Rank Math's domain-correct dynamic sitemap be authoritative.
- [ ] Fix the static robots.txt Sitemap directive to `Sitemap: https://www.isort.id/sitemap_index.xml` (currently points to unreachable internal IP).
- [ ] Update Wordfence 8.1.4 -> 8.2.2 first (security plugin), then clear the remaining 9 pending plugin updates (ACF, LiteSpeed, Polylang, Rank Math, CF7, wpcf7-redirect, wp-mail-smtp, classic-editor, wp-asset-clean-up).
- [ ] Add HSTS (Strict-Transport-Security) header now that http->https is fully enforced.
- [ ] Reduce/remove Crawl-Delay: 20 in robots.txt.
- [ ] Remove the three unused default themes (twentytwentythree/four/five) to cut update/attack surface.

### jackaroodigital.com.au  _(live)_
- [ ] Implement a `robots.txt` file to control crawler access and prevent 404 errors for this critical file.
- [ ] Generate and implement a sitemap.xml file (and `sitemap_index.xml` if applicable) to aid search engine discovery and indexation of site pages.

### lastminuteroomsbali.com  _(parked)_
- [ ] Address server unresponsiveness and connectivity issues (indicated by `curl` timeout and `sitemap.xml HTTP 000`). Ensure the server is consistently reachable and responds to HTTP requests.
- [ ] Implement a proper `<title>` tag for the homepage.
- [ ] Ensure `sitemap.xml` is correctly generated, accessible, and returns a 200 OK status.
- [ ] Add a descriptive `meta description` for the homepage.
- [ ] Implement a clear `h1` heading on the homepage.
- [ ] Investigate and implement relevant JSON-LD schema markup for the site's content.

### luxurydefined.com.au  _(live)_
- [ ] Implement and correctly configure `sitemap.xml` and `sitemap_index.xml` to improve crawlability and indexability.
- [ ] Change the default WordPress database table prefix (`wp_`) to a custom, more secure prefix.
- [ ] Implement relevant JSON-LD schema markup (e.g., Organization, LocalBusiness) to enhance search visibility and rich results.
- [ ] Review and consolidate `advanced-custom-fields-pro` plugins to avoid potential conflicts or bloat.
- [ ] Evaluate the necessity of `Crawl-Delay: 20` in `robots.txt` and remove if not required, as it can unnecessarily slow down crawling.

### motagarage.com  _(live)_
- [ ] Install/activate a security plugin (Wordfence) on the store.
- [ ] Activate LiteSpeed caching; migrate off `wp_` prefix; add HSTS.

### pegasus.com.au  _(live)_
- [ ] Resolve the `sitemap_index.xml` 400 error and `noindex` tag to ensure proper sitemap discovery.
- [ ] Add a descriptive and unique `<title>` tag to the homepage.
- [ ] Add a compelling meta description to the homepage.
- [ ] Implement a clear and descriptive `<h1>` heading on the homepage.
- [ ] Implement relevant JSON-LD schema markup (e.g., Organization, LocalBusiness) on the homepage.

### pinstripebar.com  _(live)_
- [ ] Activate Wordfence (or another WAF/malware scanner) — currently the site has no active security plugin running.
- [ ] Add HSTS header (Strict-Transport-Security) at the nginx/server level since HTTPS is already enforced site-wide.
- [ ] Set `define('DISALLOW_FILE_EDIT', true);` in wp-config.php to disable in-dashboard file editing.
- [ ] Resolve the LiteSpeed-on-nginx mismatch: remove/replace litespeed-cache with an nginx-compatible cache (FastCGI cache / Redis) since LSCache headers are not being served.
- [ ] Apply pending plugin updates (wordpress-seo 27.8, reviews-feed 2.6.3) and remove unused inactive plugins + the redundant wordpress-seo-premium install.
- [ ] Add `Sitemap: https://www.pinstripebar.com/sitemap_index.xml` to robots.txt and reduce/remove the Crawl-Delay: 20.
- [ ] Regenerate the stale geo-sitemap (2024-05-19) and add LocalBusiness/Bar schema via wpseo-local.

### reflexologyubud.com  _(live)_
- [ ] Remove one SEO plugin and one caching plugin (keep RankMath + LiteSpeed).
- [ ] Fix the robots `Sitemap:` host to match the non-www canonical; clean empty Disallow lines.
- [ ] Convert DB to utf8mb4; add HSTS.

### russiancaviarhouse.id  _(redirect:https://www.russiancaviarhouse.id/)_
- [ ] Resolve conflicting `User-agent: *` blocks in `robots.txt` to ensure proper crawling directives.
- [ ] Investigate and resolve Hostinger CDN cache bypass (`x-hcdn-cache-status: BYPASS`) to improve performance and reduce origin server load.
- [ ] Address the slow 301 redirect response time (2.186s) to improve initial page load speed.

### schoolcatering.gaiada2.online  _(live)_
- [ ] Correct the sitemap configuration to ensure a valid, accessible, and indexable sitemap is declared and served from the primary domain.
- [ ] Implement relevant JSON-LD schema markup (e.g

### sepedamotor.com  _(live)_
- [ ] Cut the redundant caching stack down to LiteSpeed Cache only; remove Autoptimize, WP Fastest Cache, WP Compress to eliminate conflicts and overhead.
- [ ] Reduce 46-plugin footprint — remove the inactive/second page builder and duplicate backup plugin; target a lean stack.
- [ ] Add HSTS header and remove/block readme.html to close fingerprinting and transport-security gaps.
- [ ] Apply pending updates (Yoast SEO 27.7→27.8, Yoast Premium) and remove leftover debug code from jnews-child functions.php.
- [ ] Establish a verified Google Search Console property for https://www.sepedamotor.com (current GSC points at gaiada.com — domain currently has no valid verification).
- [ ] Confirm true WP core version and harden config (verify non-default table prefix, WP_DEBUG off, unique salts) once file access is available.

### suriresidence.com  _(live)_
- [ ] Address server unresponsiveness and timeouts to ensure the site is consistently accessible

### ubudbeautycentre.com  _(live)_
- [ ] Remove or significantly reduce the `Crawl-Delay: 20` directive in `robots.txt` to allow efficient crawling by search engines.
- [ ] Implement appropriate browser caching headers for static assets and potentially for the HTML document itself (if content is not highly dynamic) to improve repeat visit performance and Core Web Vitals.
- [ ] Add a relevant and descriptive `<h1>` tag to the homepage to improve on-page SEO and user experience.
- [ ] Ensure `sitemap_index.xml` is the only sitemap submitted to Google Search Console, and consider redirecting `sitemap.xml` to `sitemap_index.xml` or removing the 404.
- [ ] Consider suppressing the `x-powered-by` header to avoid exposing server-side technology details.

### viceroybali.com  _(live)_
- [ ] Remove the `$_GET['WP_DEBUG']` branch from wp-config; force debug off.
- [ ] Pick ONE caching plugin (WP Rocket or LiteSpeed) — disable the other.
- [ ] Uncomment/enable `DISALLOW_FILE_EDIT`.
- [ ] Delete `Viceroy broken link.xlsx` and the redundant `viceroy*-git` themes.

### ypi-asia.com  _(live)_
- [ ] Change default WordPress database table prefix `wp_` to a unique, random string to enhance database security.
- [ ] Review and audit active plugins, removing any unnecessary or redundant ones to reduce bloat, improve performance, and minimize potential security vulnerabilities.
- [ ] Consider restricting access to or disabling the WordPress REST API if not actively used by external applications, to reduce potential attack surface.

**Per-site technical checklist — remaining sites (23):**

### 7originfilm.com  _(live (intermittent 403 security challenge — accessible on retry))_
- [ ] Update WordPress core 6.8.5 → 7.0.
- [ ] Tune the security challenge to allow verified search-engine bots; add HSTS.
- [ ] Consolidate sitemap declarations to the AIOSEO index.

### amertaspa.com  _(live)_
- [ ] Remove the deprecated `Crawl-Delay` directive from `robots.txt`.
- [ ] Address the `sitemap.xml` 404 error by either correcting the sitemap configuration or ensuring no links point to it if it's not intended to exist.
- [ ] Review and potentially enhance the Content Security Policy for a more robust security posture.

### aperitif.com  _(live)_
- [ ] Add HSTS (`Strict-Transport-Security`) header on the canonical HTTPS host (after confirming all subdomains are HTTPS-ready).
- [ ] Apply pending plugin updates: `wp-schema-pro` 2.7.11 → 2.11.3 and Yoast `wordpress-seo` 27.7 → 27.8.
- [ ] Harden config: set `DISALLOW_FILE_EDIT` in wp-config.php and restrict/disable `xmlrpc.php` (it is still reachable and advertised via X-Pingback).
- [ ] Consolidate the two active redirect plugins (`redirection` + `eps-301-redirects`) to a single tool to avoid rule conflicts.
- [ ] Remove inactive/legacy plugins (addthis, rename-images-boomit, top-table-of-contents, boomdevs-toc-pro, cron-logger, etc.) and decide on inactive Yoast Premium (activate or remove) to cut bloat/attack surface.
- [ ] Collapse the non-www HTTP→HTTPS→www redirect into a single hop to the canonical www HTTPS host.
- [ ] Disable the stale `author-sitemap.xml` in Yoast if author archives are unused.

### balicatering.com  _(live)_
- [ ] Remove the non-Pro `wp-mail-smtp` duplicate.
- [ ] Add HSTS; disable author sitemap in Yoast.
- [ ] Confirm no Duplicator `.zip`/installer.php left in public_html.

### balihideawayvillas.com  _(redirect → balihiddenvillas.com)_
- [ ] If the domain is purely a redirect, replace the full WP install with a lightweight 301 (DNS/nginx) to cut attack surface.

### beanexchange.net  _(live)_
- [ ] Re-enable LiteSpeed page caching.
- [ ] Disable author sitemap; add HSTS.

### bruinsma-ac.com  _(live (intermittent 403 challenge — accessible on retry))_
- [ ] Allow verified bots through the security challenge; add HSTS.
- [ ] Consolidate sitemaps to AIOSEO index.

### caviar.id  _(live)_
- [ ] Review and consolidate `robots.txt` directives to remove the redundant `Disallow:` within the Yoast block.

### cloudkitchenbali.com  _(live)_
- [ ] Confirm project status (live vs dormant); add HSTS.

### dacaviar.com  _(live (intermittent 403 challenge — accessible on retry; verified via Hostinger API))_
- [ ] Allow verified search bots through the security challenge; add HSTS.
- [ ] Confirm a security/WAF plugin is active on the store (e-commerce).

### dapurraja.com  _(redirect → enzosushitrain.com)_
- [ ] Keep the 301 (good for equity) but consider collapsing the WP install to a static redirect; keep domain registered.

### enzosushitrain.com  _(live (the successor brand of dapurraja.com))_
- [ ] Add HSTS; verify page caching (avoid persistent BYPASS).
- [ ] This is the live brand — consolidate dapurraja's residual install behind a static 301.

### essentialbali.com  _(live)_
- [ ] Resolve the "Cannot GET" error for `sitemap_index.xml` or remove its declaration.
- [ ] Implement JSON-LD schema markup on the homepage and other relevant pages.
- [ ] Add a descriptive `h1` tag to the homepage.
- [ ] Review and optimize `cache-control` headers for improved performance.

### goldenmonkeybali.com  _(live (canonical Golden Monkey site))_
- [ ] Upgrade PHP to 8.2/8.3.
- [ ] Migrate off default `wp_` prefix; prune unused themes; add HSTS.

### hairsalonubud.com  _(live)_
- [ ] Investigate the reported WordPress 7.0 version to confirm its accuracy and ensure the platform is up-to-date and securely maintained.

### horizonviewsproperties.com  _(live (intermittent 403 challenge — accessible on retry))_
- [ ] Enable page caching (LiteSpeed); update WP core to 7.0.
- [ ] Add a sitemap declaration to robots; add HSTS.

### kalugaqueen.id  _(live)_
- [ ] Investigate the `x-hcdn-cache-status: BYPASS` from the Hostinger CDN to determine if further caching optimization can be implemented at the CDN level for improved performance or resource offloading.
- [ ] Verify the reported WordPress 7.0 version for accuracy, ensuring it is the latest stable release or a correctly identified custom version, to confirm the platform is up-to-date and secure.

### nailsalonubud.com  _(live)_
- [ ] Delete the inactive RankMath; trim inactive plugins (Site Kit etc.).
- [ ] Confirm DB isolation from hairsalonubud; upgrade PHP; add HSTS.

### nusapenida.org  _(redirect:https://nusapenida.org/nusa-penida-blog-guide/)_
- [ ] Review and adjust the 301 redirect from the root domain (`nusapenida.org`) to ensure it points to the intended canonical homepage, if `nusa-penida-blog-guide/` is not meant to be the primary entry point.
- [ ] Disable or restrict access to `xmlrpc.php` to enhance security and prevent potential attacks.
- [ ] Add a primary `<h1>` heading to the `https://nusapenida.org/nusa-penida-blog-guide/` page for improved content structure and accessibility.

### orison.io  _(live)_
- [ ] **Security: Hide PHP version:** Configure the web server or PHP to suppress the `x-powered-by` header to prevent exposing the PHP version, reducing information available to potential attackers.
- [ ] **Security: Limit WordPress REST API exposure:** Evaluate if the WordPress REST API endpoints (`/wp-json/`) need to be fully public. If not, consider limiting access or disabling unused endpoints to reduce the potential attack surface.
- [ ] **Sitemap: Review `sitemap.rss` declaration:** Remove the `Sitemap: https://www.orison.io/sitemap.rss` directive from `robots.txt` if it's not intended to be a valid sitemap index for search engines, as it's a non-standard format for this purpose. Ensure only the primary `sitemap.xml` is declared.

### scamcheck-global.com  _(live)_
- [ ] Investigate and optimize Hostinger CDN caching strategy, particularly for static assets, to ensure `x-hcdn-cache-status` is not consistently DYNAMIC where static content should be cached.
- [ ] Review WordPress REST API security, considering rate limiting or authentication for specific endpoints, to mitigate potential abuse.

### tacconsultancy.com  _(live (intermittent 403 challenge — accessible on retry))_
- [ ] Allow verified bots through the challenge; add HSTS.

### uniqueweightloss.com.au  _(live)_
- [ ] Remove or obfuscate the `generator` meta tag to prevent exposing WordPress and Elementor versions, reducing the attack surface.
- [ ] Review WordPress REST API exposure (`wp-json`) and consider implementing authentication or restricting access to specific endpoints if not required for public use, enhancing security.

> Execution note: ce01/pn01 sites are SSH-writable (scriptable). Hostinger sites (41) need WP-admin / phpMyAdmin / Playwright — no file SSH.

---

## Wave 2 — SEO scope of work (meta rewrites + content)

> Focus: only ~7 sites have real organic traffic — prioritise them. Redirect/parked domains (9) are excluded (no SEO value).

**Priority — the earners (real organic footprint):**

### aperitif.com  _(live)_
- [ ] Blog: Develop a content calendar focused on improving positions for existing informational content (e.g., Michelin stars, fine dining etiquette) and expanding into related topics to capture more informational traffic and establish authority.
- [ ] Meta: Review and optimize meta titles and descriptions for key pages, especially the homepage and top-ranking informational pages, to improve CTR and relevance.
- [ ] GBP: Optimize Google Business Profile with accurate business information, photos, services, hours, and encourage reviews, given the site's likely nature as a physical restaurant.
- [ ] Ads: Evaluate current ad performance (3 Adwords keywords). Consider expanding ad campaigns for transactional keywords (e.g., "aperitif bali booking", "fine dining ubud") to drive direct conversions.
- [ ] Social: Develop a social media strategy to promote content, engage with customers, and drive traffic to the website, especially for a hospitality business.

### blossomsteakhouse.com  _(live)_
- [ ] **Blog:** Develop comprehensive content clusters around "steak sides" and "what goes with steak," ensuring each piece subtly promotes Blossom Steakhouse's menu. Create new content for specific menu items, chef's specials, and unique dining experiences. Explore content around "best steak in [city]" or "steakhouse near me" to capture high-intent local searches.
- [ ] **Meta:** Implement proposed meta-rewrite strategies for the homepage and key content pages to improve CTR and better align with user intent, especially for informational queries that can lead to conversions.
- [ ] **GBP:** Optimize Google Business Profile with up-to-date information, high-quality photos, service descriptions, and actively manage reviews to enhance local search visibility.
- [ ] **Ads:** Launch targeted Google Ads campaigns focusing on branded keywords, location-specific "steakhouse [city]" terms, and specific menu items to capture immediate, high-intent traffic.
- [ ] **Social:** (No data provided, but generally recommended) Establish or enhance social media presence to engage with the audience, promote specials, and drive traffic to the website.

### cascadesbali.com  _(live)_
- [ ] **Blog:** Develop content around "Best Restaurants in Ubud with a View" (featuring Cascades prominently), "Gluten-Free Dining in Ubud," and "Ubud Dance Show & Dining Experiences" if relevant to the restaurant's offerings. Create content to support long-tail variations of top keywords.
- [ ] **Meta:** Implement proposed meta-title and description rewrites for the homepage and key service pages (e.g., Gluten-Free menu, Dance Show page if applicable). Review and optimize meta descriptions for top-ranking pages to improve CTR.
- [ ] **GBP:** Optimize Google Business Profile (GBP) listing with high-quality photos, accurate business hours, and services (e.g., "Restaurant," "Fine Dining," "Gluten-Free Options," "Live Music/Dance"). Encourage customer reviews mentioning specific aspects like "view" and "gluten-free."
- [ ] **Ads:** Consider running targeted Google Ads campaigns for high-intent keywords like "restaurant ubud," "best restaurant ubud view," and "gluten free restaurant ubud," as Semrush shows 0 current Adwords keywords.
- [ ] **Social:** Promote content related to "best views," "gluten-free options," and "dance shows" on relevant social media platforms (Instagram, Facebook). Engage with users and share user-generated content.

### pinstripebar.com  _(live)_
- [ ] **Blog:** Develop comprehensive content around the "manly cocktails" theme, expanding on existing strong positions and targeting long-tail variations. Create dedicated content to improve ranking for "types of the bar." Identify and address `keyword gaps` for broader bar-related terms, general cocktail recipes, and potentially other demographics.
- [ ] **Meta:** Implement proposed meta-title and description rewrites for the homepage and top-performing content pages to enhance relevance and click-through rates for target keywords.
- [ ] **GBP:** Could not verify.
- [ ] **Ads:** Consider initiating paid search campaigns, as `Adwords Keywords: 0` indicates no current paid presence, potentially missing out on immediate traffic for high-value terms.
- [ ] **Social:** Could not verify.

### sepedamotor.com  _(live)_
- [ ] Blog: Develop a content strategy to target high-volume, lower-ranking keywords (e.g., "harga scoopy 2021") with comprehensive articles, reviews, and comparison guides. Create content clusters around popular models and their various model years.
- [ ] Meta: Prioritize meta title and description optimization for pages targeting keywords like "harga scoopy 2021" and "harga vario 125 terbaru 2021" to improve CTR and relevance.
- [ ] GBP: Could not verify if applicable; no local business signals provided.
- [ ] Ads: Explore Google Ads campaigns for high-intent commercial keywords to capture immediate traffic and complement organic efforts.
- [ ] Social: Could not verify social presence or strategy; no social signals provided.

### viceroybali.com  _(live)_
- [ ] Blog: Develop content clusters for informational keywords (e.g., 'bali culture', 'nyepi day', 'best time to visit bali', 'is bali safe') to capture broader search intent and establish authority.
- [ ] Meta: Review and optimize homepage title/description for branded terms and luxury positioning. Implement meta-rewrite proposals for key informational pages to improve CTR and ranking.
- [ ] GBP: Optimize Google Business Profile with up-to-date information, high-quality photos, services, and regular posts. Encourage and respond to guest reviews.
- [ ] Ads: Propose a Google Ads strategy targeting branded, competitor, and high-intent transactional keywords, including remarketing.
- [ ] Social: Develop a social media content strategy (e.g., Instagram, Facebook) to showcase luxury, experiences, and cultural immersion, driving brand awareness and direct traffic.

**Secondary — the rest (48 live/low-presence sites):**

### 7originfilm.com  _(live (intermittent 403 security challenge — accessible on retry))_
- [ ] Blog: Develop foundational content strategy to build topical authority around core film/production themes.
- [ ] Meta: Implement proposed meta-rewrites for homepage to improve brand keyword relevance.
- [ ] GBP: Create and optimize Google Business Profile for local search visibility.
- [ ] Ads: Consider targeted brand awareness campaigns if organic growth remains slow.
- [ ] Social: Establish a basic social media presence to support brand visibility and content distribution.

### akoyaspabali.com  _(live)_
- [ ] Blog: Develop content around high-volume, lower-position keywords like "ubud wellness spa", "best spa in ubud", "lymph massage near me" to capture more long-tail traffic and establish authority. Create articles detailing benefits of specific treatments (e.g., lymphatic drainage, traditional Balinese lulur) and local guides to wellness in Ubud.
- [ ] Meta: Implement proposed meta title and description rewrites for homepage, lymphatic massage, lulur, and general Ubud spa service pages to improve CTR and relevance for target keywords.
- [ ] GBP: Optimize Google Business Profile with detailed service descriptions, high-quality photos, and consistent business information to improve local search visibility for "near me" and "ubud" queries. Encourage customer reviews.
- [ ] Ads: Consider targeted Google Ads campaigns for high-intent, high-volume keywords where organic ranking is weak (e.g., "best spa in ubud", "ubud wellness spa") to capture immediate traffic while organic efforts mature. The current 1 Adwords keyword suggests minimal ad presence.
- [ ] Social: Develop a content strategy for social media platforms (e.g., Instagram, Facebook) showcasing the spa's ambiance, treatments, and wellness benefits, using relevant hashtags like #UbudSpa, #BaliWellness, #LymphaticMassageUbud to drive brand awareness and traffic.

### amertaspa.com  _(live)_
- [ ] Blog: Develop content around Balinese wellness, spa treatments, Ubud attractions, and health benefits to capture long-tail keywords and establish authority.
- [ ] Meta: Implement proposed meta title/description rewrites for the homepage and key service pages to improve CTR and relevance.
- [ ] GBP: Create and optimize a Google Business Profile (GBP) listing for Amerta Spa Ubud to improve local search visibility and provide essential business information.
- [ ] Ads: Consider targeted Google Ads campaigns for high-intent keywords like "Ubud spa," "Balinese massage Ubud," and "Amerta Spa" to drive immediate traffic.
- [ ] Social: Establish a presence on relevant social media platforms (e.g., Instagram, Facebook) to showcase spa experiences, engage with potential customers, and drive traffic.

### aquatir.id  _(live)_
- [ ] Blog: Develop content around sturgeon farming, caviar types, recipes, health benefits, and sustainability to build authority and target informational keywords.
- [ ] Meta: Implement proposed meta title/description rewrites for the homepage and key product/category pages based on target keywords and user intent.
- [ ] GBP: Create and optimize a Google Business Profile (GBP) for any physical locations (e.g., "caviar cafe bali" suggests a physical presence or strong local intent). Ensure accurate business information, categories, services, and photos.
- [ ] Ads: Consider running Google Ads for high-intent transactional keywords like "jual caviar", "osetra caviar for sale", "beluga sturgeon caviar for sale" to gain immediate visibility and traffic while organic efforts mature.
- [ ] Social: Establish a presence on relevant social media platforms (e.g., Instagram, Facebook) to showcase products, engage with potential customers, and drive brand awareness.

### ayrwater.com  _(live)_
- [ ] Blog: Develop foundational content around core services/products related to "Ayr Water" and the local area. Address potential user queries related to "water of ayr" if relevant to the business.
- [ ] Meta: Implement proposed meta-rewrites for the homepage to improve clarity and search relevance.
- [ ] GBP: If applicable as a local business, create and optimize a Google Business Profile to improve local search visibility.
- [ ] Ads: Consider a minimal Google Ads campaign targeting "Ayr Water" brand terms and highly relevant service keywords to gain immediate visibility and test conversions.
- [ ] Social: Establish a basic social media presence on relevant platforms to build brand awareness and engage with the local community.

### balicatering.com  _(live)_
- [ ] **Blog:** Develop content around specific catering types (e.g., "Wedding Catering Bali," "Corporate Event Catering Bali"), local food guides, and "Private Chef Bali" experiences to capture long-tail keywords and establish authority.
- [ ] **Meta:** Review and optimize meta titles and descriptions for the homepage and key service pages to improve CTR for target keywords like "bali catering company" and "indonesian catering."
- [ ] **GBP:** Could not verify.
- [ ] **Ads:** Consider running targeted Google Ads campaigns for high-intent keywords like "bali catering company" or "private chef bali" to capture immediate traffic, especially since organic presence is low and Semrush shows 0 Adwords keywords.
- [ ] **Social:** Could not verify.

### baligirls.gaiada2.online  _(live)_
- [ ] Blog: Develop a content strategy to address keyword gaps and build topical authority around "Bali girls" and related Bali-centric themes (e.g., travel, culture, lifestyle, community).
- [ ] Meta: Implement optimized title tags and meta descriptions for the homepage and any existing key pages, focusing on clear value propositions and target keywords.
- [ ] GBP: If applicable (local business/service), create and optimize a Google Business Profile to capture local search visibility.
- [ ] Ads: Consider targeted Google Ads campaigns to drive immediate traffic and test keyword performance while organic presence is being built.
- [ ] Social: Establish a strong social media presence on relevant platforms (e.g., Instagram, TikTok, Facebook) to build brand awareness, engage with the target audience, and drive referral traffic.

### balihiddenvillas.com  _(live (intermittent 403 challenge — accessible on retry))_
- [ ] Blog: Develop content around informational keywords (e.g., "bali ceremony", "best hikes in bali", "ubud top 10 things to do") to attract top-of-funnel traffic and establish authority.
- [ ] Meta: Optimize homepage and key villa pages for relevant keywords (e.g., "hidden villas bali", "villa cocoa maya candidasa"). Investigate and resolve potential keyword cannibalisation for terms like "villa cocoa maya candidasa" and "hidden garden villas".
- [ ] GBP: No data provided.
- [ ] Ads: No active campaigns detected (Adwords Keywords: 0).
- [ ] Social: No data provided.

### balipropertybargains.com.au  _(live)_
- [ ] Blog: Develop a content strategy to target relevant keywords (e.g., "bali property for sale," "cheap bali villas") and establish topical authority, as no organic keywords were found.
- [ ] Meta: Implement clear, keyword-focused meta titles and descriptions for key pages, starting with the homepage, to improve search engine understanding and click-through potential, given the lack of current organic presence.
- [ ] GBP: Create and optimize a Google Business Profile to capture local search traffic for "Bali property" related queries, as this is a critical channel for property businesses.
- [ ] Ads: Consider targeted Google Ads campaigns to generate immediate traffic and leads for high-value keywords, given the absence of organic traffic.
- [ ] Social: Establish a social media presence to build brand awareness and drive referral traffic, especially given the low organic visibility.

### balirca.id  _(live)_
- [ ] Blog: Develop targeted content clusters around identified themes (e.g., "Canggu local services," "Sustainable dining in Bali," "Bali coffee culture") to address keyword gaps and improve rankings for weak positions.
- [ ] Meta: Implement proposed meta-rewrite proposals for the homepage and key landing pages to improve click-through rates and search relevance.
- [ ] GBP: Optimize Google Business Profile for any associated local businesses or for balirca.id itself if it has a physical presence, given the local search intent of many keywords.
- [ ] Ads: Explore targeted Google Ads campaigns for high-intent keywords like "mason canggu" to capture immediate traffic and test conversion potential.
- [ ] Social: Establish or enhance social media presence on relevant platforms to amplify content, engage with the Bali-focused audience, and drive referral traffic.

### balirestaurantguide.com  _(live)_
- [ ] Blog: Develop content around specific restaurant types, locations, cuisines, and dining experiences in Bali to address content gaps and target long-tail keywords.
- [ ] Meta: Implement proposed meta title and description rewrites for homepage and key category/location pages to improve CTR and relevance signals.
- [ ] GBP: Create and optimise a Google Business Profile for balirestaurantguide.com to enhance local search visibility and authority.
- [ ] Ads: Explore targeted Google Ads campaigns for high-value, competitive keywords to gain immediate visibility and drive traffic.
- [ ] Social: Establish a social media presence (e.g., Instagram, Facebook) to promote new content, engage with the audience, and drive traffic.

### balispaguide.com  _(live)_
- [ ] Blog: Develop content clusters around Bali spa types, locations, benefits, and experiences to expand keyword footprint and establish authority.
- [ ] Meta: Implement proposed meta title/description rewrites for key pages to improve click-through rates and search relevance.
- [ ] GBP: Investigate creating and optimizing a Google Business Profile for "Bali Spa Guide" to enhance local visibility if it operates as a physical entity or booking service.
- [ ] Ads: Explore targeted Google Ads campaigns for high-intent spa-related keywords to capture immediate traffic and leads, given current zero ad activity.
- [ ] Social: Develop a social media strategy to promote spa content, engage with potential visitors, and drive traffic to the guide.

### beanexchange.net  _(live)_
- [ ] Blog: Develop foundational content around coffee types, brewing methods, sourcing, or community topics to build topical authority and target relevant long-tail keywords.
- [ ] Meta: Implement clear, descriptive meta titles and descriptions for key pages, starting with the homepage, reflecting the site's core purpose and target audience.
- [ ] GBP: If applicable, create and optimize a Google Business Profile to capture local search intent (e.g., for a physical store, cafe, or local service).
- [ ] Ads: Consider targeted Google Ads campaigns for high-intent, low-competition keywords to drive initial traffic and test conversion pathways.
- [ ] Social: Establish a presence on relevant social media platforms (e.g., Instagram, Facebook) to build brand awareness, engage with potential customers, and drive referral traffic.

### bimc-cosmedic-01.gaiada.com  _(live (staging/subdomain on gaiada.com))_
- [ ] **Blog:** Develop content around long-tail keywords related to digital marketing services in Bali, addressing common client questions and industry trends. Target keywords like "social media marketing bali", "perusahaan advertising di bali", and "jasa digital marketing bali" with dedicated articles to improve weak positions and fill content gaps.
- [ ] **Meta:** Implement proposed meta title/description rewrites for the homepage and key service pages, focusing on brand, location, and primary services to improve CTR and relevance for target keywords.
- [ ] **GBP:** Optimize Google Business Profile (if applicable) with accurate services, hours, photos, and posts, ensuring it targets "digital marketing agency bali" and "marketing agency near me" type searches to enhance local visibility.
- [ ] **Ads:** Review existing 3 Adwords keywords. Potentially expand ad campaigns to target high-intent commercial keywords where organic ranking is weak (e.g., "digital advertising agency", "jasa digital marketing bali") to capture immediate traffic.
- [ ] **Social:** Develop a social media strategy to build brand awareness and drive traffic, especially for terms like "social media marketing bali" where organic presence is weak, and to support content distribution.

### blossomcatering.online  _(live)_
- [ ] Blog: Develop a content strategy to target relevant long-tail keywords related to catering services and event planning.
- [ ] Meta: Implement optimized title tags and meta descriptions for the homepage and any existing service pages, incorporating brand name and relevant service keywords.
- [ ] GBP: Create and optimize a Google Business Profile (GBP) listing to improve local search visibility and provide essential business information.
- [ ] Ads: Consider a targeted Google Ads campaign for branded keywords and high-intent service keywords to drive immediate, qualified traffic.
- [ ] Social: Establish a presence on relevant social media platforms to showcase catering work, engage with potential clients, and drive traffic.

### bruinsma-ac.com  _(live (intermittent 403 challenge — accessible on retry))_
- [ ] Blog: Develop foundational content targeting core service keywords and common customer questions to build topical authority.
- [ ] Meta: Implement clear, keyword-focused title tags and meta descriptions for the homepage and any existing service pages to improve relevance and potential click-through rates.
- [ ] GBP: Create and optimize a Google Business Profile to capture local search traffic and provide essential business information.
- [ ] Ads: Consider targeted Google Ads campaigns for high-intent service keywords to generate immediate leads while organic presence is being built.
- [ ] Social: Establish a basic social media presence on relevant platforms to build brand awareness and drive referral traffic.

### cascadessuites.com  _(live)_
- [ ] Blog: Develop content around 'Ubud luxury suites', 'Bali accommodation', and 'Ubud dining experiences' to expand keyword footprint.
- [ ] Meta: Implement meta-rewrite proposals for the homepage and other relevant service pages.
- [ ] GBP: Create/optimise Google Business Profile for 'Cascades Suites' and 'Cascades Restaurant Ubud' to capture local search traffic.
- [ ] Ads: Consider targeted Google Ads campaigns for high-intent terms related to 'Ubud suites' and 'Ubud restaurant' to drive immediate traffic.
- [ ] Social: Establish/optimise social media presence to promote content and engage with potential guests.

### caviar.id  _(live)_
- [ ] Blog: Develop a content programme around caviar types, origins, serving suggestions, and benefits to capture long-tail search demand and establish authority.
- [ ] Meta: Conduct a comprehensive review and optimization of meta titles and descriptions for all existing pages, ensuring they are keyword-rich and compelling.
- [ ] GBP: Establish and optimize a Google Business Profile to improve local search visibility, especially for terms like "caviar cafe bali" if relevant to a physical location.
- [ ] Ads: Explore targeted paid search campaigns for high-intent keywords where organic visibility is currently low or competitive.
- [ ] Social: Develop a social media presence to engage with potential customers, share content, and drive traffic to the site.

### cloudkitchenbali.com  _(live)_
- [ ] Blog: Develop a content strategy focusing on long-tail keywords related to "food delivery Ubud", "best [cuisine] Ubud", and "cloud kitchen concept Bali" to build authority and capture diverse search intent.
- [ ] Meta: Implement proposed meta title and description rewrites for the homepage and key service/product pages to improve click-through rates and search relevance.
- [ ] GBP: Optimize Google Business Profile for "Cloud Kitchen Bali" and any specific brands, ensuring accurate service listings, operating hours, photos, and categories to enhance local search visibility in Ubud.
- [ ] Ads: Consider targeted Google Ads campaigns for high-intent keywords such as "food delivery ubud" and "burger in ubud" to capture immediate traffic and sales, given the current low organic presence.
- [ ] Social: Establish or enhance a social media presence to promote food offerings, delivery services, and engage with the local community in Ubud, driving brand awareness and direct traffic.

### dacaviar.com  _(live (intermittent 403 challenge — accessible on retry; verified via Hostinger API))_
- [ ] Blog: Initiate a content strategy focusing on caviar types, serving suggestions, and luxury lifestyle to build topical authority and attract long-tail traffic.
- [ ] Meta: Implement unique, keyword-optimised title tags and meta descriptions for the homepage and core product/category pages to improve click-through rates and search visibility.
- [ ] GBP: Create and optimise a Google Business Profile to enhance local search visibility and provide essential business information.
- [ ] Ads: Consider a targeted Google Ads campaign for high-intent commercial keywords to generate immediate traffic and sales while organic presence is being built.
- [ ] Social: Establish a presence on relevant social media platforms (e.g., Instagram, Pinterest) to build brand awareness and engage with potential customers.

### enzogelatobali.com  _(live)_
- [ ] Blog: Develop content around gelato flavors, ingredients, and local Bali experiences to address keyword gaps and build authority.
- [ ] Meta: Implement meta-rewrite proposals for the homepage and any existing flavor-related pages to improve CTR and relevance.
- [ ] GBP: Establish and optimize Google Business Profile to improve local search visibility.
- [ ] Ads: Explore targeted Google Ads campaigns for local gelato searches to drive immediate traffic.
- [ ] Social: Establish social media presence to build brand awareness and drive traffic.

### enzosushitrain.com  _(live (the successor brand of dapurraja.com))_
- [ ] Blog: Develop foundational content around the sushi train experience, menu items, and location-specific information to build topical authority.
- [ ] Meta: Implement optimized title tags and meta descriptions for key pages, starting with the homepage, focusing on primary services and location.
- [ ] GBP: Create and optimize a Google Business Profile listing with accurate business information, photos, and service descriptions to capture local search traffic.
- [ ] Ads: Consider targeted local search ads to drive immediate traffic for high-intent keywords while organic presence is being built.
- [ ] Social: Establish a presence on relevant social media platforms to engage with potential customers and drive brand awareness.

### essentialbali.com  _(live)_
- [ ] Blog: Develop a foundational blog content strategy targeting core Bali-related topics (e.g., 'Things to do in Bali', 'Best beaches Bali', 'Bali travel guide') to build organic authority.
- [ ] Meta: Implement clear, descriptive meta titles and descriptions for the homepage and key service/destination pages, focusing on primary keywords related to Bali travel and experiences.
- [ ] GBP: If applicable, create and optimize a Google Business Profile (GBP) for any physical locations or service areas in Bali to capture local search traffic.
- [ ] Ads: Consider a targeted Google Ads campaign for high-intent keywords (e.g., 'Bali tours', 'Bali villas') to gain immediate visibility while organic presence is built.
- [ ] Social: Establish a presence on relevant social media platforms (e.g., Instagram, Facebook) to build brand awareness and drive referral traffic, leveraging Bali's visual appeal.

### gaiada.com  _(live)_
- [ ] Blog: Address content gaps identified by low keyword footprint and weak positions for relevant terms.
- [ ] Meta: Implement proposed meta-rewrite for homepage and other key service pages to improve relevance and CTR.
- [ ] GBP: Could not verify.
- [ ] Ads: Review performance of existing 3 Adwords keywords; consider expanding ad campaigns to target high-volume, low-position organic keywords.
- [ ] Social: Could not verify.

### gaiadaweb.gaiada2.online  _(live)_
- [ ] Blog: No organic keywords or content identified to inform blog strategy; initial content strategy needed.
- [ ] Meta: Develop initial meta titles and descriptions for core pages, focusing on clear value proposition.
- [ ] GBP: Could not verify presence or need for Google Business Profile.
- [ ] Ads: No organic presence detected to inform paid strategy; initial keyword research needed.
- [ ] Social: No organic presence detected to inform social strategy; initial audience research needed.

### goldenmonkeybali.com  _(live (canonical Golden Monkey site))_
- [ ] Blog: Develop content around Chinese cuisine, specific dishes (e.g., "Best Dim Sum in Ubud," "History of Peking Duck"), cultural aspects, and local Bali experiences that tie into dining. This will help address keyword gaps and build authority.
- [ ] Meta: Review and optimize meta titles and descriptions for key pages (homepage, menu pages, location pages) to reduce cannibalization and improve CTR for target keywords, following the proposals above.
- [ ] GBP: Optimize Google Business Profile with up-to-date information, high-quality photos, regular posts, and encourage customer reviews. This is crucial for local search visibility, especially for terms like "chinese food ubud" and "best chinese restaurant in ubud."
- [ ] Ads: Given 0 Adwords keywords, consider running targeted Google Ads campaigns for high-intent local keywords (e.g., "chinese restaurant ubud," "dim sum ubud") to capture immediate traffic and visibility, especially during peak tourist seasons.
- [ ] Social: Establish a consistent presence on relevant social media platforms (e.g., Instagram, Facebook) to showcase food, ambiance, promotions, and engage with the local community and tourists. Share blog content and link back to the website.

### hairsalonubud.com  _(live)_
- [ ] Blog: Develop content around specific hair treatments, beauty services, and "near me" variations. Create dedicated content for nail services if not present.
- [ ] Meta: Implement proposed meta rewrites for homepage and key service pages. Review and resolve potential cannibalization for "hair salon ubud."
- [ ] GBP: Optimize Google Business Profile for local search visibility, especially for "near me" queries and international terms.
- [ ] Ads: Explore Google Ads campaigns targeting high-intent local and service-specific keywords, given 0 current Adwords keywords.
- [ ] Social: Develop a social media strategy to increase brand awareness and drive local engagement, potentially targeting international visitors.

### horizonviewsproperties.com  _(live (intermittent 403 challenge — accessible on retry))_
- [ ] Blog: Develop a foundational content strategy to target relevant long-tail keywords in the real estate niche.
- [ ] Meta: Implement proposed meta title and description for the homepage to improve search visibility and relevance.
- [ ] GBP: Create and optimize a Google Business Profile to capture local search traffic and establish local authority.
- [ ] Ads: Consider a targeted Google Ads campaign for high-intent keywords to generate immediate leads while organic presence is built.
- [ ] Social: Establish a presence on relevant social media platforms to build brand awareness and drive referral traffic.

### hubblebali.com  _(live)_
- [ ] Blog: Develop a content strategy around Bali experiences, local attractions, and services offered by Hubble Bali to build topical authority and attract organic traffic.
- [ ] Meta: Implement proposed meta-rewrites for the homepage and any existing pages, focusing on clear value propositions, brand identity, and relevant keywords.
- [ ] GBP: Create and optimize a Google Business Profile for Hubble Bali, ensuring accurate business information, services, photos, and encouraging reviews.
- [ ] Ads: Consider a targeted Google Ads campaign for high-intent keywords related to Hubble Bali's services and location to capture immediate traffic.
- [ ] Social: Develop a social media strategy to build brand awareness, engage with potential customers, and drive traffic to the website.

### huntermotorcycles.co.id  _(live)_
- [ ] **Blog:** Develop a robust content strategy focusing on motorcycle types (e.g., in-depth articles on scramblers, cruisers, cafe racers), riding guides, maintenance tips, and comparisons. Create content targeting broader terms like "motorcycle" and "drag bar." Investigate the "clip hunter" keyword to determine its relevance and address accordingly (either optimize for it if relevant, or de-optimize if irrelevant to avoid diluting the profile).
- [ ] **Meta:** Implement proposed meta-rewrites for the homepage, key product pages (Scrambler), and dealer pages. Conduct a full site meta audit to ensure all pages have unique, compelling, and keyword-optimized titles and descriptions.
- [ ] **GBP:** Optimize Google Business Profile with comprehensive information, high-quality images, service listings, and regular posts. Actively manage reviews and Q&A to enhance local search visibility, especially for "motorbike dealers near me."
- [ ] **Ads:** Consider targeted Google Ads campaigns for high-intent, lower-volume keywords (e.g., "motorbike dealers near me," specific Hunter models) to capture immediate leads. Explore brand protection campaigns and competitor targeting (e.g., "kove" if strategically relevant).
- [ ] **Social:** Develop an active social media presence on platforms popular in Indonesia. Share blog content, new model announcements, events, and engage with the local motorcycle community to drive brand awareness and traffic.

### institutescoffier.com  _(live)_
- [ ] **Blog:** Develop a content program to target identified keyword gaps, focusing on high-intent queries like "cara menjadi executive chef", "peluang karir chef setelah lulus", and expanding on culinary concepts with practical insights from the institute. Create content to push existing P2-P7 keywords to P1.
- [ ] **Meta:** Implement proposed meta title and description rewrites for the homepage and key content pages to improve click-through rates and search relevance.
- [ ] **GBP:** Optimize Google Business Profile with up-to-date information, services, photos, and regular posts to enhance local search visibility and engagement.
- [ ] **Ads:** Explore Google Ads campaigns for high-intent, competitive keywords (e.g., "sekolah chef Jakarta", "kursus kuliner profesional") to capture immediate demand, given the current absence of Adwords keywords.
- [ ] **Social:** Develop a social media strategy to amplify blog content, showcase student work, engage with prospective students, and build brand awareness across relevant platforms.

### interlacenetwork.com  _(live)_
- [ ] Blog: Develop a content strategy focused on core services/topics, targeting relevant long-tail keywords to build initial organic presence.
- [ ] Meta: Implement clear, keyword-rich (but natural) title tags and meta descriptions for all key pages, starting with the homepage, to improve click-through rates and communicate relevance to search engines.
- [ ] GBP: Create and optimize a Google Business Profile (if applicable for local services) to capture local search visibility.
- [ ] Ads: Consider a targeted Google Ads campaign to gain immediate visibility for high-value keywords while organic efforts mature.
- [ ] Social: Develop a social media strategy to drive traffic and build brand awareness, which can indirectly support SEO efforts.

### isort.id  _(live)_
- [ ] Blog: Develop a content program to target related keywords, tutorials, use cases, and comparisons to expand the site's organic footprint beyond just "isort".
- [ ] Meta: Review and optimize existing meta titles and descriptions, starting with the homepage, to clearly communicate the site's purpose and target relevant keywords.
- [ ] GBP: N/A (no local presence indicated by signals).
- [ ] Ads: Consider exploring paid search campaigns for "isort" and related problem-solution queries to capture immediate traffic and test keyword performance.
- [ ] Social: N/A (no social signals provided).

### jackaroodigital.com.au  _(live)_
- [ ] Blog: Develop a foundational content strategy targeting core digital marketing services and relevant industry topics to build organic visibility.
- [ ] Meta: Implement meta title and description rewrites for the homepage and any existing service pages, focusing on clear value propositions and target keywords.
- [ ] GBP: Establish and optimize a Google Business Profile to enhance local search presence and drive direct inquiries.
- [ ] Ads: Consider a targeted Google Ads campaign to gain immediate visibility for high-intent service keywords while organic efforts mature.
- [ ] Social: Develop a consistent social media presence on relevant platforms to build brand awareness and drive referral traffic.

### kalugaqueen.id  _(live)_
- [ ] Blog: Develop a content strategy focusing on caviar types, serving suggestions, luxury food experiences, and product benefits to build topical authority and capture long-tail keywords.
- [ ] Meta: Implement foundational meta titles and descriptions for key pages (homepage, product pages) using descriptive, keyword-rich phrases relevant to "Kaluga caviar Indonesia" and "premium caviar."
- [ ] GBP: Create and optimize a Google Business Profile (GBP) to enhance local search visibility and provide essential business information, assuming a physical presence or service area.
- [ ] Ads: Consider targeted Google Ads campaigns for high-intent commercial keywords (e.g., "buy Kaluga caviar online Indonesia") to drive immediate, qualified traffic.
- [ ] Social: Establish a presence on relevant social media platforms (e.g., Instagram) to build brand awareness, engage with a target audience, and drive referral traffic to the site.

### luxurydefined.com.au  _(live)_
- [ ] Blog: Develop a content strategy focusing on luxury real estate trends, lifestyle, and specific property features to attract a broader audience and target long-tail keywords.
- [ ] Meta: Implement meta title and description rewrites for the homepage and any other key service pages, focusing on brand identity and relevant luxury terms.
- [ ] GBP: Create/optimise a Google Business Profile to improve local search visibility and provide essential business information for potential local clients.
- [ ] Ads: Consider a targeted Google Ads campaign for high-intent luxury real estate keywords to drive immediate, qualified traffic while organic presence is built.
- [ ] Social: Establish a presence on relevant social media platforms (e.g., Instagram, Pinterest, LinkedIn) to showcase luxury properties and engage with a high-net-worth audience.

### motagarage.com  _(live)_
- [ ] Blog: Develop foundational content targeting core services and local search terms.
- [ ] Meta: Implement basic meta titles and descriptions for the homepage and key service pages, focusing on service + location.
- [ ] GBP: Claim, verify, and fully optimise Google Business Profile with accurate services, hours, and location.
- [ ] Ads: Consider a small local ad campaign to gain initial visibility and test keyword performance.
- [ ] Social: Establish basic social media presence to support brand visibility and local engagement.

### nailsalonubud.com  _(live)_
- [ ] **Blog:** 6 articles — "Nail Art Trends Bali", "Gel vs Acrylic Guide", "Best Nail Salon Ubud", aftercare/booking guides — to defend and expand the #1 ranking.
- [ ] **Meta:** polish homepage description (CTA), add per-service titles.
- [ ] **GBP:** claim/optimise — hyperlocal salon; reviews + photos are decisive for discovery.
- [ ] **Ads:** optional $10/day Local Service Ads on "nail salon ubud".
- [ ] **Social:** Instagram 3×/wk — nail art, before/after, promos.

### orison.io  _(live)_
- [ ] Blog: Develop content around industry topics, services, and solutions to attract non-branded organic traffic and establish authority.
- [ ] Meta: Optimize homepage and key service/careers pages with clear, concise titles and descriptions incorporating branded and relevant service terms.
- [ ] GBP: Create and optimize a Google Business Profile to improve local search visibility for "Orison Solutions LLC".
- [ ] Ads: Consider targeted Google Ads campaigns for branded terms and specific service offerings to quickly gain visibility and traffic.
- [ ] Social: Establish a presence on relevant social media platforms to build brand awareness, engage with potential clients/employees, and drive referral traffic.

### pegasus.com.au  _(live)_
- [ ] **Blog:** Develop a content strategy to address identified keyword gaps and build authority around print, media, and logistics topics.
- [ ] **Meta:** Implement proposed meta-rewrites for the homepage and ensure all existing pages have unique, optimized titles and descriptions.
- [ ] **GBP:** Optimize Google Business Profile with accurate business information, services, and location (Blacktown) to capture local search intent.
- [ ] **Ads:** Explore targeted Google Ads campaigns for high-intent, non-branded keywords related to print, media, and logistics services to gain immediate visibility.
- [ ] **Social:** Establish or enhance social media presence to amplify content, engage with the target audience, and support brand visibility.

### reflexologyubud.com  _(live)_
- [ ] **Blog:** Develop content around specific reflexology benefits, types of reflexology, "what to expect from reflexology in Ubud," and local wellness guides. Create detailed articles to address long-tail queries like "massage reflexology full body oil thailand review."
- [ ] **Meta:** Implement proposed meta-title and description rewrites for the homepage and key service pages. Review existing pages for meta-data optimization, ensuring each page targets a distinct set of keywords to avoid cannibalization (e.g., for "bali reflexology" vs "reflexology bali").
- [ ] **GBP:** Optimize Google Business Profile for "reflexology ubud," "foot massage ubud," and related local terms. Ensure services, hours, photos, and reviews are up-to-date and encourage customer reviews.
- [ ] **Ads:** Currently no Adwords keywords. Consider running targeted local ads for high-volume, transactional terms like "foot massage ubud," "reflexology ubud," and "foot massage near me" to capture immediate demand.
- [ ] **Social:** Share blog content, customer testimonials, and promotions on relevant social media platforms (e.g., Instagram, Facebook) targeting tourists and locals in Ubud interested in wellness and spa services.

### scamcheck-global.com  _(live)_
- [ ] Blog: Develop a content strategy to address various scam types, "how-to" guides for scam identification, and reviews of specific services/products to build topical authority and target a broader range of keywords beyond "scamcheck".
- [ ] Meta: Implement meta title and description rewrites for the homepage, focusing on clear communication of the site's value proposition and targeting the core "scamcheck" keyword to improve search relevance and click-through rates.
- [ ] GBP: Could not verify relevance or existence of a Google Business Profile. If applicable for the service model, create and optimize a GBP to capture local search intent.
- [ ] Ads: Explore paid search campaigns targeting "scamcheck" and related high-intent keywords to generate immediate traffic and gather data on keyword performance and user intent.
- [ ] Social: Establish a foundational social media presence on relevant platforms to amplify content, engage with the target audience, and build brand awareness, compensating for the current low organic visibility.

### schoolcatering.gaiada2.online  _(live)_
- [ ] Blog: Develop foundational content around school catering services, menu options, nutritional benefits, and local service areas.
- [ ] Meta: Implement basic, keyword-focused meta titles and descriptions for the homepage and any existing service pages.
- [ ] GBP: If applicable, create and optimize a Google Business Profile to capture local search intent.
- [ ] Ads: Consider targeted Google Ads campaigns to generate immediate traffic while organic presence is built.
- [ ] Social: Establish basic social media profiles to build brand presence and share content.

### suriresidence.com  _(live)_
- [ ] Blog: Develop foundational content around property features, local attractions, and guest experiences to build topical authority and capture long-tail search.
- [ ] Meta: Conduct a full meta-tag audit and rewrite for all existing pages, focusing on clear value propositions and target keywords.
- [ ] GBP: Create and fully optimize a Google Business Profile for Suri Residence, including photos, services, and accurate contact information, to capture local search.
- [ ] Ads: Consider a small, targeted Google Ads campaign for high-intent, branded, or specific service keywords to drive immediate, qualified traffic.
- [ ] Social: Establish a presence on visual platforms (e.g., Instagram, Pinterest) to showcase the property and engage with potential guests, linking back to the website.

### tacconsultancy.com  _(live (intermittent 403 challenge — accessible on retry))_
- [ ] Blog: Develop a foundational content strategy to target relevant industry keywords, address common client pain points, and establish topical authority.
- [ ] Meta: Implement clear and concise meta titles and descriptions for the homepage and any existing core service pages, focusing on primary keywords and value propositions.
- [ ] GBP: Create and fully optimize a Google Business Profile to capture local search visibility and provide essential business information to potential clients.
- [ ] Ads: Consider a targeted Google Ads campaign to generate immediate traffic and leads, especially while organic presence is being built.
- [ ] Social: Establish a consistent presence on relevant social media platforms to build brand awareness, engage with the target audience, and drive referral traffic.

### ubudbeautycentre.com  _(live)_
- [ ] **Blog:** Develop content around beauty tips, spa experiences in Ubud, and detailed service guides to attract long-tail traffic and establish authority.
- [ ] **Meta:** Review and optimize meta titles and descriptions for the homepage and key service pages to improve CTR and relevance for target keywords, addressing potential cannibalisation.
- [ ] **GBP:** Optimize Google Business Profile with accurate services, hours, photos, and encourage reviews to capture "near me" searches and local intent.
- [ ] **Ads:** Consider running targeted local ads for high-value services (e.g., "facial ubud", "nail salon ubud") to capture immediate demand, as no Adwords keywords are currently active.
- [ ] **Social:** Develop a social media strategy to showcase salon atmosphere, services, special offers, and engage with the local community and tourists in Ubud.

### uniqueweightloss.com.au  _(live)_
- [ ] Blog: Develop foundational content around key weight loss topics relevant to the Australian market to build topical authority.
- [ ] Meta: Implement basic, descriptive meta titles and descriptions for the homepage and any existing service pages, incorporating primary service terms and location.
- [ ] GBP: Create and optimize a Google Business Profile (GBP) listing to capture local search traffic.
- [ ] Ads: Consider targeted Google Ads campaigns for high-intent keywords to generate immediate traffic while organic presence is being built.
- [ ] Social: Establish a basic social media presence to support brand visibility and drive referral traffic.

### ypi-asia.com  _(live)_
- [ ] Blog: Develop a content strategy to target relevant industry keywords beyond current brand terms, addressing identified keyword gaps.
- [ ] Meta: Review and optimize meta titles and descriptions for key pages, starting with the homepage, to improve CTR and relevance for target keywords.
- [ ] GBP: Investigate and optimize Google Business Profile for local visibility, if applicable, to capture local search demand.
- [ ] Ads: Consider targeted ad campaigns to capture immediate traffic for high-value keywords, given the current low organic presence and no existing ad activity.
- [ ] Social: Establish a social media presence to build brand awareness and drive referral traffic, complementing organic search efforts.

---

## Wave 3 — GBP / Ads / Social ⛔ BLOCKED
- [ ] 18 × Google Business Profile setup (priority hyperlocal: hairsalonubud, nailsalonubud, motagarage, cascadessuites, reflexologyubud).
- [ ] 6 × paid-ad campaigns (aperitif, nusapenida, pinstripebar, blossomsteakhouse, reflexologyubud/hairsalonubud/motagarage LSAs, cascadessuites hotel ads).
- [ ] Social posting (IG hospitality/salon, FB pinstripebar events, LinkedIn gaiada).
- ⛔ **Unblock (long-lead — start now in parallel):** clear 2SV on seo@gaiada.com (Workspace admin → backup codes) → Ads dev-token; submit Business Profile API access request → GBP. Same credential gate unblocks both.

---

## Access methods (WP-level changes)
- **ce01 / pn01:** full SSH — wp-cli, file edits, scriptable + reversible.
- **hostinger (41 sites):** no file SSH. Use Hostinger API MCP, WP-admin via Playwright, or phpMyAdmin (wp_options).
