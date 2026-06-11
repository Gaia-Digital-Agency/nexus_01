# Gaia Portfolio — Audit + SEO Findings (consolidated)

**Updated:** 2026-06-11 · **Coverage:** 63 live sites across gda-ce01, gda-pn01, hostinger. Per-site detail: `docs/audits/<domain>.md` (technical) + `docs/seo/<domain>.md` (search).
**Boundary:** audits = technical/site-health only; seo = search/content only (no overlap). Analysis only — nothing executed.
**Method:** signals gathered live (curl + ce01/pn01 SSH + Hostinger API + Semrush). Items not verifiable are flagged per-site under "Could not verify".

## Wave model (how these findings become work)

| Wave | Scope | This doc feeds it via | Status |
|---|---|---|---|
| **0 · Audit production** | the 63 audits + 63 SEO analyses + this rollup | — (this IS Wave 0) | ✅ Complete |
| **1 · Audit scope of work** | execute the **technical** fixes | the *Cross-site TECHNICAL issues* section + each audit's "Top technical fixes" | ⏳ not started |
| **2 · SEO scope of work** | execute **meta rewrites + content** | the *Cross-site SEO issues* section + each SEO doc's "Work plan" | ⏳ not started |
| **3 · GBP / Ads / social** | local + paid + social | the *Blockers* section | ⛔ Google 2SV + GBP API |

Backlog: `docs/plan/todo.md`. Summary: `docs/plan/action_summary.md`.

## Portfolio coverage — gap CLOSED

| Server | Sites | Access used |
|---|---|---|
| gda-ce01 | 17 | full SSH — plugin/config-level depth |
| gda-pn01 | 5 | SSH — Node.js apps (not WP) |
| hostinger | 41 | curl + Hostinger API (no file SSH) |
| **Total** | **63** | every live site has BOTH a technical audit and an SEO analysis |

**Status mix:** ~54 live · ~7 redirect-only domains · ~2 parked. The earlier "~17 blocked/403" was an **intermittent security challenge** on Hostinger CDN — all were accessible on retry and are now fully audited (no site left unverified for that reason).

## Cross-site TECHNICAL issues (recurring)

- **No HSTS header — near-universal:** almost every HTTPS site enforces TLS but omits `Strict-Transport-Security` (only dreamcatchervillas has it). Portfolio-wide quick win.
- **Identical/shared WP auth keys & salts:** goldenmonkeysanur ↔ goldenmonkeyubud reuse key material (cross-site cookie forgery) — **highest-severity security item**; plus weak DB passwords on that family.
- **Default `wp_` table prefix:** ayrwater, goldenmonkeybali, motagarage, caviar class.
- **Debug/file-edit hardening gaps:** viceroybali exposes `WP_DEBUG` via `?WP_DEBUG=` URL param and has `DISALLOW_FILE_EDIT` commented out; balirca has `WP_DEBUG` on.
- **Dual caching plugins:** viceroybali (WP Rocket + LiteSpeed), goldenmonkeyubud (LiteSpeed + W3TC), reflexologyubud (LiteSpeed + WP Super Cache).
- **Dual/conflicting SEO plugins:** gaiada (AIOSEO+RankMath+Yoast), reflexologyubud & nailsalonubud (RankMath+Yoast).
- **Caching left off / uncached (CDN DYNAMIC):** beanexchange, balihiddenvillas, horizonviewsproperties, bimc-cosmedic — page cache disabled or bypassed.
- **Intermittent 403 security challenge to crawlers:** 7originfilm, balihiddenvillas, bruinsma-ac, dacaviar, enzosushitrain, tacconsultancy, horizonviewsproperties — can block Googlebot if mis-tuned.
- **Plugin/theme bloat & duplicates:** ayrwater (ACF Pro installed twice; 6 backup themes), viceroybali (`viceroy*-git` themes + a stray `.xlsx` in the themes dir), mail-smtp duplicated on balicatering.
- **Generic/weak admin accounts:** balihiddenvillas login is `admin`; several use personal Gmail logins.
- **WordPress core not latest (6.8.x/6.9.x vs 7.0):** 7originfilm, ayrwater, horizonviewsproperties, bimc-cosmedic.
- **Exposed config/backup risk:** akoyaspabali wp-config backup php; Duplicator archives to confirm on balicatering.

## Cross-site SEO issues (recurring)

- **Overwhelmingly low-presence:** of 63 sites, only ~7 have a real organic footprint — **aperitif, blossomsteakhouse, cascadesbali, nusapenida, pinstripebar, sepedamotor, viceroybali**. Most others return near-zero / "NOTHING FOUND" in Semrush.
- **CTR collapse on the earners:** the high-impression sites draw large volume at <1% CTR — weak meta titles, not weak rankings → meta rewrites = highest ROI.
- **Defensive #1s with no content moat:** nailsalonubud ranks #1 for "nail salon ubud" but has no blog — vulnerable.
- **Redirect/parked domains carry no SEO value:** dapurraja→enzosushitrain, goldenmonkeysanur/ubud→goldenmonkeybali, balihideawayvillas→balihiddenvillas, **dreamcatchervillas→Instagram (302)**, russiancaviarhouse, interlace (parked), pegasus (Wix). Effort belongs on the live successor.
- **Thin/placeholder titles:** cloudkitchenbali ("Cloud Kitchen"), beanexchange ("Roasts,Exceptional" missing space).
- **GSC not available this run:** SEO docs are Semrush-grounded; reconnect GSC for CTR/position depth.

## Per-site index (63)

| Site | Server | Status | Top technical fix | Top SEO move |
|---|---|---|---|---|
| 7originfilm.com | hostinger | live (intermittent 403 securit | Update WordPress core 6.8.5 → 7.0. | Blog: Develop foundational content strategy to build topical authority around core film/ |
| akoyaspabali.com | ce01 | live | Remove the public wp-config backup PHP file plus `.backup_info`/`.backup_log` from webro | Blog: Develop content around high-volume, lower-position keywords like "ubud wellness sp |
| amertaspa.com | hostinger | live | Remove the deprecated `Crawl-Delay` directive from `robots.txt`. | Blog: Develop content around Balinese wellness, spa treatments, Ubud attractions, and he |
| aperitif.com | ce01 | live | Add HSTS (`Strict-Transport-Security`) header on the canonical HTTPS host (after confirm | Blog: Develop a content calendar focused on improving positions for existing information |
| aquatir.id | hostinger | live | Reconsider `Disallow: /shop/` — if products should rank, remove it. | Blog: Develop content around sturgeon farming, caviar types, recipes, health benefits, a |
| ayrwater.com | ce01 | live | Remove the duplicate ACF Pro install (`advanced-custom-fields-pro-2`); keep one. | Blog: Develop foundational content around core services/products related to "Ayr Water"  |
| balicatering.com | ce01 | live | Remove the non-Pro `wp-mail-smtp` duplicate. | **Blog:** Develop content around specific catering types (e.g., "Wedding Catering Bali," |
| baligirls.gaiada2.online | pn01 | live | Correct the sitemap generation to output valid XML content for `https://baligirls.gaiada | Blog: Develop a content strategy to address keyword gaps and build topical authority aro |
| balihiddenvillas.com | hostinger | live (intermittent 403 challen | Rename the `admin` user / enforce strong auth + 2FA. | Blog: Develop content around informational keywords (e.g., "bali ceremony", "best hikes  |
| balihideawayvillas.com | hostinger | redirect → balihiddenvillas.co | If the domain is purely a redirect, replace the full WP install with a lightweight 301 ( | Blog: Develop content around Bali travel guides, luxury villa experiences, and specific  |
| balipropertybargains.com.au | hostinger | live | Correct the `sitemap_index.xml` URL or ensure it serves a valid XML sitemap index, or re | Blog: Develop a content strategy to target relevant keywords (e.g., "bali property for s |
| balirca.id | hostinger | live | **Resolve robots.txt and sitemap conflicts:** Align `robots.txt` disallows with sitemap  | Blog: Develop targeted content clusters around identified themes (e.g., "Canggu local se |
| balirestaurantguide.com | hostinger | live | **Address Server Unresponsiveness and HTTP Header Delivery:** Investigate and resolve th | Blog: Develop content around specific restaurant types, locations, cuisines, and dining  |
| balispaguide.com | ce01 | live | Generate and properly configure XML sitemaps (`sitemap_index.xml`, `sitemap.xml`) to ens | Blog: Develop content clusters around Bali spa types, locations, benefits, and experienc |
| beanexchange.net | hostinger | live | Re-enable LiteSpeed page caching. | Blog: Develop foundational content around coffee types, brewing methods, sourcing, or co |
| bimc-cosmedic-01.gaiada.com | hostinger | live (staging/subdomain on gai | Confirm staging vs production. If staging, add `noindex` + `Disallow: /` and/or HTTP aut | **Blog:** Develop content around long-tail keywords related to digital marketing service |
| blossomcatering.online | ce01 | live | Address exposed server configuration details immediately. | Blog: Develop a content strategy to target relevant long-tail keywords related to cateri |
| blossomsteakhouse.com | ce01 | live | Remove/block the publicly downloadable theme archive at /wp-content/themes/blossom-git.z | **Blog:** Develop comprehensive content clusters around "steak sides" and "what goes wit |
| bruinsma-ac.com | hostinger | live (intermittent 403 challen | Allow verified bots through the security challenge; add HSTS. | Blog: Develop foundational content targeting core service keywords and common customer q |
| cascadesbali.com | ce01 | live | Re-activate Wordfence (or confirm an equivalent active WAF) — a dormant security plugin  | **Blog:** Develop content around "Best Restaurants in Ubud with a View" (featuring Casca |
| cascadessuites.com | hostinger | live | Add an `<h1>` tag to the homepage for improved SEO and accessibility. | Blog: Develop content around 'Ubud luxury suites', 'Bali accommodation', and 'Ubud dinin |
| caviar.id | hostinger | live | Review and consolidate `robots.txt` directives to remove the redundant `Disallow:` withi | Blog: Develop a content programme around caviar types, origins, serving suggestions, and |
| cloudkitchenbali.com | hostinger | live | Confirm project status (live vs dormant); add HSTS. | Blog: Develop a content strategy focusing on long-tail keywords related to "food deliver |
| dacaviar.com | hostinger | live (intermittent 403 challen | Allow verified search bots through the security challenge; add HSTS. | Blog: Initiate a content strategy focusing on caviar types, serving suggestions, and lux |
| dapurraja.com | hostinger | redirect → enzosushitrain.com | Keep the 301 (good for equity) but consider collapsing the WP install to a static redire | Blog: Develop a content strategy focusing on Balinese and Chinese cuisine, local Ubud ex |
| dreamcatchervillas.com | hostinger | redirect → instagram.com/dream | Decide intent: either build a real site, or replace the WP install with a lightweight re | Blog: Develop a content strategy focusing on villa features, destinations, experiences,  |
| enzogelatobali.com | hostinger | live | Address site responsiveness and connectivity issues (timeouts on redirect checks, HTTP 0 | Blog: Develop content around gelato flavors, ingredients, and local Bali experiences to  |
| enzosushitrain.com | hostinger | live (the successor brand of d | Add HSTS; verify page caching (avoid persistent BYPASS). | Blog: Develop foundational content around the sushi train experience, menu items, and lo |
| essentialbali.com | pn01 | live | Resolve the "Cannot GET" error for `sitemap_index.xml` or remove its declaration. | Blog: Develop a foundational blog content strategy targeting core Bali-related topics (e |
| gaiada.com | hostinger | live | Review and remove or significantly reduce the `Crawl-Delay: 20` directive in `robots.txt | Blog: Address content gaps identified by low keyword footprint and weak positions for re |
| gaiadaweb.gaiada2.online | pn01 | live | Investigate and resolve the `sitemap_index.xml` issue. If this URL is not intended to be | Blog: No organic keywords or content identified to inform blog strategy; initial content |
| goldenmonkeybali.com | hostinger | live (canonical Golden Monkey  | Upgrade PHP to 8.2/8.3. | Blog: Develop content around Chinese cuisine, specific dishes (e.g., "Best Dim Sum in Ub |
| goldenmonkeysanur.com | hostinger | redirect → goldenmonkeybali.co | Rotate AUTH keys/salts so they differ from goldenmonkeyubud.com. | **Blog:** Develop a content strategy focused on Chinese cuisine, Sanur dining experience |
| goldenmonkeyubud.com | hostinger | redirect → goldenmonkeybali.co | Rotate AUTH keys/salts (must differ from sanur). | **Blog:** Develop a content program focusing on "Things to do in Ubud," "Ubud Dining Gui |
| hairsalonubud.com | hostinger | live | Investigate the reported WordPress 7.0 version to confirm its accuracy and ensure the pl | Blog: Develop content around specific hair treatments, beauty services, and "near me" va |
| horizonviewsproperties.com | hostinger | live (intermittent 403 challen | Enable page caching (LiteSpeed); update WP core to 7.0. | Blog: Develop a foundational content strategy to target relevant long-tail keywords in t |
| hubblebali.com | ce01 | live | Remove/deny public access to /error_log (and rotate/delete the 10 MB file) — it leaks se | Blog: Develop a content strategy around Bali experiences, local attractions, and service |
| huntermotorcycles.co.id | ce01 | live | Fix robots.txt Sitemap line to `https://www.huntermotorcycles.co.id/sitemap_index.xml` ( | **Blog:** Develop a robust content strategy focusing on motorcycle types (e.g., in-depth |
| institutescoffier.com | hostinger | live | Address the `sitemap.xml` 404 error by configuring Yoast SEO to output to `sitemap.xml`  | **Blog:** Develop a content program to target identified keyword gaps, focusing on high- |
| interlace.com | ce01 | parked (GoDaddy/AWS domain-par | Repoint DNS A records for interlace.com (and www) from the parking edge to the ce01 serv | Blog: Develop a content strategy to create keyword-targeted articles addressing user int |
| interlacenetwork.com | ce01 | live | Remove the stray `wp-config-backup-*.php`, `.htaccess.bk`, and the 47 MB `error_log` fro | Blog: Develop a content strategy focused on core services/topics, targeting relevant lon |
| isort.id | ce01 | live | Delete or regenerate the static /var/www/isort/public_html/sitemap.xml (currently expose | Blog: Develop a content program to target related keywords, tutorials, use cases, and co |
| jackaroodigital.com.au | pn01 | live | Implement a `robots.txt` file to control crawler access and prevent 404 errors for this  | Blog: Develop a foundational content strategy targeting core digital marketing services  |
| kalugaqueen.id | hostinger | live | Investigate the `x-hcdn-cache-status: BYPASS` from the Hostinger CDN to determine if fur | Blog: Develop a content strategy focusing on caviar types, serving suggestions, luxury f |
| lastminuteroomsbali.com | hostinger | parked | Address server unresponsiveness and connectivity issues (indicated by `curl` timeout and | Blog: Develop a content strategy to address keyword gaps and build topical authority aro |
| luxurydefined.com.au | ce01 | live | Implement and correctly configure `sitemap.xml` and `sitemap_index.xml` to improve crawl | Blog: Develop a content strategy focusing on luxury real estate trends, lifestyle, and s |
| motagarage.com | hostinger | live | Install/activate a security plugin (Wordfence) on the store. | Blog: Develop foundational content targeting core services and local search terms. |
| nailsalonubud.com | hostinger | live | Delete the inactive RankMath; trim inactive plugins (Site Kit etc.). | **Blog:** 6 articles — "Nail Art Trends Bali", "Gel vs Acrylic Guide", "Best Nail Salon  |
| nusapenida.org | hostinger | redirect:https://nusapenida.or | Review and adjust the 301 redirect from the root domain (`nusapenida.org`) to ensure it  | Blog: Develop new content targeting long-tail keywords related to existing attractions ( |
| orison.io | hostinger | live | **Security: Hide PHP version:** Configure the web server or PHP to suppress the `x-power | Blog: Develop content around industry topics, services, and solutions to attract non-bra |
| pegasus.com.au | hostinger | live | Resolve the `sitemap_index.xml` 400 error and `noindex` tag to ensure proper sitemap dis | **Blog:** Develop a content strategy to address identified keyword gaps and build author |
| pinstripebar.com | ce01 | live | Activate Wordfence (or another WAF/malware scanner) — currently the site has no active s | **Blog:** Develop comprehensive content around the "manly cocktails" theme, expanding on |
| reflexologyubud.com | hostinger | live | Remove one SEO plugin and one caching plugin (keep RankMath + LiteSpeed). | **Blog:** Develop content around specific reflexology benefits, types of reflexology, "w |
| russiancaviarhouse.id | hostinger | redirect:https://www.russianca | Resolve conflicting `User-agent: *` blocks in `robots.txt` to ensure proper crawling dir | Blog: Develop content around "caviar indonesia" and related topics to expand footprint a |
| scamcheck-global.com | hostinger | live | Investigate and optimize Hostinger CDN caching strategy, particularly for static assets, | Blog: Develop a content strategy to address various scam types, "how-to" guides for scam |
| schoolcatering.gaiada2.online | pn01 | live | Correct the sitemap configuration to ensure a valid, accessible, and indexable sitemap i | Blog: Develop foundational content around school catering services, menu options, nutrit |
| sepedamotor.com | hostinger | live | Cut the redundant caching stack down to LiteSpeed Cache only; remove Autoptimize, WP Fas | Blog: Develop a content strategy to target high-volume, lower-ranking keywords (e.g., "h |
| suriresidence.com | hostinger | live | Address server unresponsiveness and timeouts to ensure the site is consistently accessib | Blog: Develop foundational content around property features, local attractions, and gues |
| tacconsultancy.com | hostinger | live (intermittent 403 challen | Allow verified bots through the challenge; add HSTS. | Blog: Develop a foundational content strategy to target relevant industry keywords, addr |
| ubudbeautycentre.com | hostinger | live | Remove or significantly reduce the `Crawl-Delay: 20` directive in `robots.txt` to allow  | **Blog:** Develop content around beauty tips, spa experiences in Ubud, and detailed serv |
| uniqueweightloss.com.au | hostinger | live | Remove or obfuscate the `generator` meta tag to prevent exposing WordPress and Elementor | Blog: Develop foundational content around key weight loss topics relevant to the Austral |
| viceroybali.com | ce01 | live | Remove the `$_GET['WP_DEBUG']` branch from wp-config; force debug off. | Blog: Develop content clusters for informational keywords (e.g., 'bali culture', 'nyepi  |
| ypi-asia.com | ce01 | live | Change default WordPress database table prefix `wp_` to a unique, random string to enhan | Blog: Develop a content strategy to target relevant industry keywords beyond current bra |

## Blockers / not-verified

- **No file SSH on hostinger (41 sites):** plugin lists/versions inferred from HTTP + prior audits + Hostinger API (which confirms WP-install validity but not plugins). True plugin-level depth needs phpMyAdmin / WP-admin (Playwright).
- **GSC live data:** not pulled this run — reconnect GSC (verify properties) for CTR/position/impressions.
- **Staging vs production:** `bimc-cosmedic-01.gaiada.com` appears to be a staging subdomain that is currently indexable — confirm intent.
- **CWV field data:** not captured this run.
