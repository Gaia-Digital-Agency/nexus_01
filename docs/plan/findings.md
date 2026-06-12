# Findings — What We Found Across All 63 Sites

**Updated:** 2026-06-11 · **You are here:** Plan → **Findings** → Action Summary → Todo
**In the app:** this is the *Reports* layer — the consolidated briefing across the portfolio.
**Built from:** every `audits/<site>.md` (technical) + `seo/<site>.md` (search). **Feeds:** `action_summary.md` → `todo.md`.

This is the big-picture read: the patterns that showed up again and again across the portfolio. Per-site detail is in the audit and SEO files; the decision about what to *do* with all this is in `action_summary.md`.

> **How to read the two lists below.** We split everything we found into **Site-Health issues** (is the site safe and can Google read it?) and **Search issues** (can the site win the rankings it should?). Each item leads with what it *means* for the business, with the technical term kept in (parentheses) so the engineer doing the fix knows exactly what's meant.

**What we checked, and how:** all 63 live sites, with real live signals — the sites' own responses, server access where we have it (gda-ce01, gda-pn01), the Hostinger API, and Semrush. Anything we couldn't confirm is flagged per-site under "Could not verify". **Nothing here has been changed on a live site — this is analysis only.**

## Portfolio coverage — gap CLOSED

| Server | Sites | Access used |
|---|---|---|
| gda-ce01 | 17 | full SSH — plugin/config-level depth |
| gda-pn01 | 5 | SSH — Node.js apps (not WP) |
| hostinger | 41 | curl + Hostinger API (no file SSH) |
| **Total** | **63** | every live site has BOTH a technical audit and an SEO analysis |

**Status mix:** ~54 live · ~7 redirect-only domains · ~2 parked. The earlier "~17 blocked/403" was an **intermittent security challenge** on Hostinger CDN — all were accessible on retry and are now fully audited (no site left unverified for that reason).

## Site-Health issues (the patterns we saw again and again)

*Ordered roughly worst-first. "What it means" leads; the technical term is in (parentheses).*

- **🔴 Two sister sites can be broken into through each other.** goldenmonkeysanur and goldenmonkeyubud share the same secret login keys (identical WP auth keys & salts → cross-site cookie forgery), plus weak database passwords. This is the single most serious thing we found — fix first.
- **🔴 One site has a guessable admin login.** balihiddenvillas still uses the username `admin` — half of a break-in is already done for an attacker. Rename + add 2-factor.
- **🔴 One site leaks its inner workings through the address bar.** viceroybali turns on debug mode if you add `?WP_DEBUG=` to the URL, and its file-editor lockdown is switched off (`DISALLOW_FILE_EDIT` commented out). balirca has debug left on too.
- **🟠 Almost no site has the standard "always use HTTPS" lock.** The header that tells browsers to refuse insecure connections (HSTS / `Strict-Transport-Security`) is missing nearly everywhere (only dreamcatchervillas has it). Cheap to add across the whole portfolio.
- **🟠 We're accidentally telling Google to go away on some sites.** A few sites either block pages that should rank (e.g. aquatir blocks its own `/shop/`) or challenge Google's crawler like it's a bot (intermittent 403 on 7originfilm, balihiddenvillas, bruinsma-ac, dacaviar, enzosushitrain, tacconsultancy, horizonviewsproperties). That's lost ranking we can simply switch back on.
- **🟠 A staging/test site is publicly visible to Google.** bimc-cosmedic-01 looks like a test subdomain but is indexable — confirm and hide it (`noindex`) so it doesn't compete with the real site.
- **🟠 Default database naming makes attacks easier.** A handful still use the out-of-the-box table prefix (`wp_`): ayrwater, goldenmonkeybali, motagarage, caviar.
- **🟡 Plugins fighting each other / piling up.** Two caching plugins on the same site (viceroybali, goldenmonkeyubud, reflexologyubud) can corrupt pages; duplicate/unused plugins and themes (ayrwater has ACF Pro twice + 6 leftover themes; viceroybali has stray dev themes and a stray spreadsheet) are dead weight and extra attack surface.
- **🟡 Caching switched off** on beanexchange, balihiddenvillas, horizonviewsproperties, bimc-cosmedic — slower pages, which hurts both visitors and rankings.
- **🟡 A few sites are behind on software** (WordPress 6.8/6.9 vs current 7.0): 7originfilm, ayrwater, horizonviewsproperties, bimc-cosmedic.
- **🟡 Leftover backup/config files sitting in public view** (e.g. akoyaspabali's wp-config backup; Duplicator archives to confirm on balicatering) — these can hand an attacker the keys.

## Search issues (the patterns we saw again and again)

- **Most sites barely show up in search.** Of 63 sites, only ~7 have a real organic footprint — **aperitif, blossomsteakhouse, cascadesbali, nusapenida, pinstripebar, sepedamotor, viceroybali**. The rest are near-zero in Semrush. *This is the single most important fact for the plan: concentrate effort, don't spread it.*
- **The sites with traffic are leaving clicks on the table.** Our high-traffic sites get plenty of search impressions but a tiny share of clicks (<1% CTR) — that's a **weak page-title problem, not a ranking problem.** Rewriting titles is the cheapest, highest-return SEO move we have.
- **We hold a #1 with nothing protecting it.** nailsalonubud ranks #1 for "nail salon ubud" but has no supporting blog content — a competitor could take it. Defend it.
- **Redirect-only and parked domains earn nothing — don't invest in them.** dapurraja→enzosushitrain, goldenmonkeysanur/ubud→goldenmonkeybali, balihideawayvillas→balihiddenvillas, dreamcatchervillas→Instagram, russiancaviarhouse, interlace (parked), pegasus (Wix). Put the effort into the live site behind each.
- **A couple of sites have placeholder titles** that read as unfinished: cloudkitchenbali ("Cloud Kitchen"), beanexchange ("Roasts,Exceptional" — missing space).
- **Caveat on this round's data:** rankings/keywords are grounded in Semrush; live Google Search Console data (exact clicks/positions) wasn't connected this run — reconnecting it will sharpen the click-through picture.

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
