# SEO Audit + Scope — Compiled Findings

**Source:** 32 audit reports in `docs/audits/` + `INDEX.md` + `docs/seo/seo-work-scope-20-sites.md` (gda-s01). Audits dated 2026-06-10; reconciliation 2026-06-11. Pulled verbatim from the files, not from memory.

> **RECONCILIATION (INDEX.md, 2026-06-11):** Several technical findings were verified as **FALSE POSITIVES** because the original audit didn't follow http→https / non-www redirects. Verified CLEAN:
> - "Missing robots.txt" (hairsalonubud, nailsalonubud, caviar, russiancaviarhouse, motagarage, goldenmonkeybali, beanexchange) — all serve valid robots.txt (200).
> - "Sitemap 404" (russiancaviarhouse.id, motagarage.com) — valid `sitemap_index.xml`; only bare `/sitemap.xml` alias 404s (cosmetic).
> - "IP-based sitemap URLs" (isort.id, huntermotorcycles.co.id) — sitemaps use proper domain locs.
> - "GSC not verified" ×4 (blossomsteakhouse, institutescoffier, sepedamotor, pinstripebar) — live re-check before action.
> Findings affected are annotated **[VERIFIED CLEAN]** below.

---

## Cross-site repeated issues

- **GSC misconfigured / pointing at gaiada.com:** blossomsteakhouse, aperitif, pinstripebar, sepedamotor, institutescoffier (same "wrong property" symptom). The block "94 clicks / 8,6xx imps / 1.09% CTR / pos 19.8" appears verbatim for aperitif, institutescoffier AND hairsalonubud — it's the **gaiada proxy data**, not their own.
- **CTR collapse (<1%) on high-impression pages:** viceroybali, aperitif, pinstripebar, nusapenida, cascadessuites.
- **Conflicting SEO plugins:** gaiada (3: AIOSEO+RankMath+Yoast), reflexologyubud (RankMath+Yoast), hairsalonubud, nailsalonubud, blossomsteakhouse (Rank Math residual), cascadesbali (orphaned ACF-for-Yoast under RankMath).
- **Dual/multiple caching plugins:** reflexologyubud (LiteSpeed+WP Super Cache), goldenmonkeyubud (LiteSpeed+W3TC), viceroybali (WP Rocket+LiteSpeed), sepedamotor (4 caching plugins).
- **Identical auth keys/salts (critical security):** goldenmonkeysanur ↔ goldenmonkeyubud (all 8 constants identical → cross-site cookie forgery).
- **Outdated/inactive Yoast Premium:** nusapenida (Premium 26.7), cascadessuites (Yoast 24.4, 3 majors behind), aperitif (Premium inactive), blossomsteakhouse.
- **Plugin bloat:** sepedamotor (46), nailsalonubud (35), balirca (32), hairsalonubud (31), huntermotorcycles (20/28 updates pending), ubudbeautycentre (23), amertaspa (21).
- **`Crawl-Delay: 20` (conservative):** widespread (gaiada, pinstripebar, huntermotorcycles, akoyaspabali, hubblebali, interlace, interlacenetwork, isort, amertaspa, ubudbeautycentre, dapurraja, goldenmonkey sanur/ubud…).
- **Sitemap not referenced in robots.txt:** pinstripebar, institutescoffier, akoyaspabali, hubblebali, interlacenetwork, isort, amertaspa, ubudbeautycentre.
- **Default `wp_` table prefix (security):** goldenmonkeybali, caviar, motagarage.
- **Charset utf8 (not utf8mb4):** cascadessuites, reflexologyubud.
- **Stale/abandoned content:** sepedamotor (0 posts since Sep 2022), hubblebali (~3 yrs stale), pegasus (→Wix), dapurraja (301→enzosushitrain), interlace (parked).
- **Weak homepage title / missing brand:** blossomsteakhouse, amertaspa ("Home"), sepedamotor (OG "Home"), beanexchange (missing space), interlacenetwork (double hyphen).

**Servers:** gda-ce01 (14 sites, full SSH) + hostinger-wp (18 sites, view-only SSH).

---

## TIER 1 — Deep audits

### blossomsteakhouse.com (ce01)
- GSC NOT verified — API "insufficient permission"; no verification tokens. **[VERIFIED CLEAN-adjacent: re-check live]**
- robots.txt served as `text/html` not `text/plain` (virtual, none on disk).
- Homepage title omits brand ("Steakhouse Sanur — …"); no branded search coverage.
- Stale Rank Math metadata (incomplete migration to Yoast).
- 28 active plugins; dual WhatsApp plugins; 128 MB PHP limit.
- 3 theme versions on disk; active theme `style.css` corrupted ("Snow Effect Demo").
- Stale legacy GUIDs referencing `blossombali.com`.
- Keyword gap: ranks US "steak sides" info content but not zero-difficulty local terms (steakhouse sanur, best steak bali — KD 0); `/steakhouse-sides/` = ~30-35% of traffic.
- No paid presence. Metrics: DR 104,297; 10,154 keywords; 18,099 traffic/mo; $5,424/mo. Score 7.1/10.

### aperitif.com (ce01)
- CTR collapse: imps +131% (8,631), clicks −18.3% (94), CTR 3.08%→1.09%, pos 17.8→19.8.
- Low-CTR pages: `/blog/how-many-michelin-stars…` 47,435 imps @0.13%; `…bib-gourmand` 19,470 @0.17%; `/news/michelin-star-vs-james-beard` 13,419 @0.25%.
- Title/H1/OG-title mismatch on homepage.
- Cannibalization: Michelin keywords duplicated across `/blog/` and `/news/`.
- "fine dining" at #31 (27,100/mo) — missing pillar page.
- Sitemap not submitted to GSC; author sitemap stale (Dec 2024).
- WP Schema Pro 4 versions behind; Yoast Premium inactive; residual Rank Math; unused plugins.
- Metrics: DR 423,654; 2,778 keywords; 3,505 traffic/mo. Health 6.5/10.

### pinstripebar.com (ce01)
- Single-page dependency: `/blog/what-to-order-as-a-guy…` = 64% of clicks; dominates 46/50 top keywords.
- Severe CTR: `/blog/bali-drinking-age/` 59,799 imps, 10 clicks (0.02%, pos 13.2).
- Low-CTR cluster: 6 pages = 118,632 imps / 342 clicks (avg 0.29%).
- Homepage pos 9.8, CTR 1.35%.
- robots.txt missing sitemap ref; Crawl-Delay 20; geo sitemap stale (May 2024).
- Missing LocalBusiness/Menu/Event schema (Local SEO plugin installed, schema off).
- GSC property = gaiada.com. **[re-check live]**
- Metrics: DR 578,986; 811 keywords; 2,348 traffic/mo; $667/mo. Score 71/100.

### nusapenida.org (hostinger-wp)
- Very low CTR (0.24%–1.85%) despite pos 3–7. how-to-get-to-nusa-penida 75,536 imps @0.76%; "nusa penida" 49,959 @0.24%; "kelingking beach" 28,954 @0.48%.
- robots.txt does NOT exist on server (NOT in INDEX clean-list → treat as open).
- Homepage is a blog post set as static front page (extra hop).
- Empty tagline → blank schema description.
- Yoast 27.7→27.8; Yoast Premium 26.7 (very outdated).
- Schema type = Person not Organization. Redundant analytics (Site Kit+GA+Matomo). 27 plugins.
- X-Robots-Tag: noindex,follow on sitemap (verify).
- Keyword gaps: accommodation, diving, manta point, snorkeling, best time to visit. ID pages convert better (8–14% CTR vs <1% EN).
- Metrics: DR 1,362,670; 494 keywords; ~690 traffic/mo.

### sepedamotor.com (hostinger-wp)
- Content abandonment: 0 posts since Sep 2022 (~3.75 yrs); 902-post 2021 push then stop.
- Top keywords locked to 2021 model years; no 2023–2026 content.
- GSC property wrong (gaiada.com). **[re-check live]**
- 2,267 tags (severe bloat); 27 categories.
- 46 active plugins; 4 caching plugins; 2 page builders (Elementor+WP Bakery); redundant backups.
- Homepage meta description empty; OG title "Home".
- Yoast 27.7→27.8; Yoast Premium 18.1 (very old).
- 122 images missing alt; `var_dump` debug left in child theme functions.php (production).
- 6.1 GB uploads / 127,348 files.
- Metrics: DR 15,730; 1,390 keywords; 15,719 traffic/mo; $719/mo; 1,481 posts.

### institutescoffier.com (hostinger-wp)
- GSC misconfiguration — data from gaiada.com. **[re-check live]**
- Contact-form logs in sitemap (privacy): `contact-form-log-sitemap.xml`, `form-title-sitemap.xml` indexable.
- Sitemap not in robots.txt; no HSTS.
- Stale `project-sitemap.xml` / `project_category-sitemap.xml` (June 2021).
- Very low CTR 1.09% @ pos 19.8 (suspect gaiada proxy).
- Minor: no WP_HOME/WP_SITEURL; duplicate .htaccess rewrite; WP Rocket remnant in wp-config; XML-RPC enabled; Divi heavy; obsolete WPML zips (Weglot is live multilingual).
- Keyword ops: "mastering the art of french cooking" #21 (12,100/mo); "executive chef" #23 (4,400/mo); "five mother sauces" #37 (3,600/mo).
- Metrics: DR 3,192,021; 464 keywords; 11 yrs. Score 65/100.

### cascadessuites.com (hostinger-wp)
- Yoast 3 majors behind (24.4 vs 27.8) — critical; Yoast Premium inactive.
- Very low visibility: 7 keywords, ~32 visits/mo.
- WP Schema Pro + WP Mail SMTP Pro outdated; 6 social-feed plugins (redundant).
- 2 large theme zips (~950 MB); inactive legacy themes.
- DB charset utf8 (not utf8mb4); no DISALLOW_FILE_EDIT; empty tagline.
- 5 admin users incl. cross-site emails (pr@/gm@viceroybali.com, gaiada.com).
- CTR collapse flagged at INDEX level. robots/sitemap clean (bare `/sitemap.xml` 404 cosmetic).

### huntermotorcycles.co.id (ce01)
- robots.txt sitemap pointed to internal IP `34.158.47.112`. **[VERIFIED CLEAN — uses proper domain locs]**
- 20/28 active plugins need updates (LiteSpeed, Yoast, WooCommerce, Wordfence…).
- Crawl-Delay 20; only 13 posts in 6 yrs; 31 keywords, ~35 visits/mo.
- Author sitemap exposes 6 admin accounts; product sitemaps 2–4 stale (2023).
- 5 unused default themes; 10 inactive plugins; no DISALLOW_FILE_EDIT; theme "tested to WP 5.4". 4,646 Woo products.

### viceroybali.com (ce01) — "already done" reference
- CTR crisis: imps +128%, clicks −21%, CTR 3.08%→1.07%. 8 ready meta rewrites: Best Time to Visit 225k @0.10%; Galungan&Kuningan 232k @0.20%; Bali Currency 144k @0.28%; Power Adapter 90k @0.29%; Is Bali Safe 90k @0.15%; Trip Cost 107k @0.42% (title "2025" outdated); 6-Star Hotel 44k @0.28%; Honeymoon 17k @0.85%.
- Sitemap X-Robots-Tag: noindex,follow (may block discovery).
- WP Rocket + LiteSpeed both active.
- robots.txt disallows 5 blog category paths.
- Blog→booking funnel broken; Honeymoon (high-intent) at pos 15.2.
- Luxury keywords (KD 0–40) unranked. Theme tested to WP 5.4.
- Metrics: DR 129,308; 5,545 keywords; ~14,138 traffic/mo.

---

## TIER 2 — Standard audits

### gaiada.com (hostinger-wp)
- Triple SEO plugin conflict (AIOSEO+RankMath+Yoast) — critical.
- No WP_CACHE defined (LiteSpeed maybe not operational); no WP_AUTO_UPDATE_CORE; Crawl-Delay 20; DISALLOW_FILE_EDIT false.
- Very low traffic: 7 visits/mo, 35 keywords (red flag for an SEO agency).

### reflexologyubud.com (hostinger-wp)
- Dual SEO plugins (RankMath+Yoast); dual caching (LiteSpeed+WP Super Cache).
- Overlong robots.txt (13 lines); unusual Yandex block; homepage meta description truncated; charset utf8.

### goldenmonkeybali.com (hostinger-wp)
- No robots.txt. **[VERIFIED CLEAN]**
- Default `wp_` prefix (security); 8 installed themes; WP_AUTO_UPDATE_CORE minor-only; fragmented multi-location theme (bali/ubud/canggu). On-page SEO good.

### goldenmonkeysanur.com (hostinger-wp)
- Identical auth keys/salts with goldenmonkeyubud (critical security).
- 301-redirect-only domain → goldenmonkeybali, yet full redundant WP install.
- Minimal robots.txt; weak DB password (8 chars); residual theme zips. 14 keywords, 4 visits/mo.

### goldenmonkeyubud.com (hostinger-wp)
- Identical auth keys/salts with goldenmonkeysanur (critical security).
- Dual caching (LiteSpeed+W3TC); 301-redirect-only with full WP install; minimal robots.txt; weak DB password; git artifacts on production; no WP_AUTO_UPDATE_CORE.
- 27 keywords but 2,938 traffic/mo (strong for low kw — investigate).

### hairsalonubud.com (hostinger-wp)
- No robots.txt. **[VERIFIED CLEAN]**
- Dual SEO plugins (RankMath inactive + Yoast); redundant backups; no GSC/Analytics; 31 plugins; 0 blog posts.
- GSC figures match gaiada proxy (94 clicks/8,634 imps/1.09%/pos 19.8).

### nailsalonubud.com (hostinger-wp)
- No robots.txt. **[VERIFIED CLEAN]**
- WP Super Cache inactive alongside LiteSpeed; Google Site Kit inactive; dual SEO plugins; 35 plugins; shared `4bXazL_` prefix with hairsalonubud (verify DB isolation).
- Ranks #1 for "nail salon ubud" (protect).

### caviar.id (hostinger-wp)
- No robots.txt. **[VERIFIED CLEAN]**
- Default `wp_` prefix; Wordfence inactive on ecommerce; Elementor/Pro inactive; Yoast update.
- 19 keywords, 0 monthly traffic.

### russiancaviarhouse.id (hostinger-wp)
- Sitemap 404 + no robots.txt. **[VERIFIED CLEAN — valid sitemap_index.xml; serves robots.txt]**
- Wordfence inactive (ecommerce); LiteSpeed inactive (audit internally contradictory — verify); ACF Pro major gap (5.9.8→6.8.4); Yoast update.
- 1 keyword, 1 visit/mo.

### motagarage.com (hostinger-wp)
- Sitemap 404 + no robots.txt. **[VERIFIED CLEAN]**
- Default `wp_` prefix; LiteSpeed inactive (no caching); Wordfence absent (ecommerce); draft pages; 0 keywords, 0 traffic.

### balirca.id (hostinger-wp)
- WP_DEBUG_LOG enabled (true) in production; 32 plugins (many inactive); meta grammar ("a association"); ACF Pro update; LiteSpeed inactive.
- Best-configured robots.txt in batch; sitemap 200 OK.

### cascadesbali.com (ce01)
- LiteSpeed only caching layer; homepage 301 chain (verify single hop); draft pages ("home-2" duplicate); orphaned `acf-content-analysis-for-yoast-seo` under RankMath; WP-Optimize update; Classic Editor.
- Discrepancy: scope says "no SEO plugin", audit says RankMath active. 135 keywords, ~25 visits/mo, PHP 8.3.31. Scope: 253 keywords / 1,741 traffic/mo.

---

## TIER 3 — Lite audits

### amertaspa.com — title "Home"; empty tagline; minimal robots.txt; 7 inactive themes; 21 plugins; bare `/sitemap.xml` 404 (index works).
### ubudbeautycentre.com — empty tagline; minimal robots.txt; 23 plugins (Elementor+Pro weight); all-caps title; `sitemap.xml`/`wp-sitemap.xml` 404 (index works).
### pegasus.com.au — **migrated to Wix (critical):** WP orphaned; live sitemap is Wix-generated. 3 keywords, 0 traffic. Target the Wix site.
### dapurraja.com — **full 301 → enzosushitrain.com (critical):** rebrand; no SEO work on dapurraja. Keep domain registered.
### aquatir.id — robots.txt blocks `/shop/` (unusual for Woo — review); bare `/sitemap.xml` 404 (Yoast index works); 3 inactive themes. Otherwise best-configured of lite batch.
### beanexchange.net — no robots.txt **[VERIFIED CLEAN]**; title missing space ("Roasts,Exceptional"); Yoast update; stale sitemap lastmods. Good hreflang/OG/schema.
### akoyaspabali.com — LiteSpeed inactive; no sitemap in robots.txt; 72 keywords, ~7 visits/mo; plugin updates pending. Good title/RankMath schema.
### hubblebali.com — 4 redirect plugins active (conflict); ~3 yrs stale content; no sitemap in robots.txt; plugin updates. Strong on-page (Restaurant schema, hreflang).
### interlace.com — **parked at GoDaddy (critical):** redirects to AdSense lander; WP home/siteurl malformed; no SEO possible until repointed.
### interlacenetwork.com — double-hyphen title (AIOSEO separator); no sitemap in robots.txt; stale content (Oct 2025); Gravity Forms major gap; UpdraftPlus inactive.
### isort.id — sitemap `<loc>` used internal IP `34.158.47.112` per audit, but **[VERIFIED CLEAN — INDEX 2026-06-11 says proper domain locs; conflict — verify]**; plugin updates pending. Good RankMath schema/hreflang.

---

## Stub / status-only audits (minimal actionable findings)
- **dapurraja.com** — 301 to enzosushitrain.com; nothing else.
- **interlace.com** — parked; WP offline.
- **pegasus.com.au** — migrated to Wix; WP orphaned.
- **goldenmonkeysanur.com / goldenmonkeyubud.com** — redirect-only; main finding is shared-auth-keys security issue.

---

# SEO Work-Scope (docs/seo/seo-work-scope-20-sites.md) — work-plan matters

> This is the **work plan** for the 20 active-scope sites — distinct from the diagnostic findings above. Tiers: 8 deep + 12 standard (+ viceroybali already done).

## Per-site planned work (20 sites)

| # | Site | Tier | Blog articles | Meta rewrites | GBP | Paid ads | Social |
|---|---|---|---|---|---|---|---|
| 1 | blossomsteakhouse.com | 1 | scale from 42 + local landing pages | 8 ready | P2 | $15/day local | IG 3×/wk |
| 2 | aperitif.com | 1 | 8 + "Fine Dining" pillar | refresh low-CTR | P2 | optimise $1,200/mo | IG |
| 3 | pinstripebar.com | 1 | 6 nightlife | brand keywords | P2 | scale to $10/day | IG/FB daily |
| 4 | nusapenida.org | 1 | 10 travel guides | location keywords | P2 | optimise $1,100/mo | IG |
| 5 | sepedamotor.com | 1 | refresh + 10 | 2026/27 dates | P3 | — | — |
| 6 | institutescoffier.com | 1 | 8 culinary (ID) | ID titles | P2 | — | IG |
| 7 | cascadessuites.com | 1 | 10 accommodation | homepage rewrite | P2 | $10/day hotel | IG |
| 8 | huntermotorcycles.co.id | 1 | 8 (ID) | product titles | P2 | — | IG |
| 9 | gaiada.com | 2 | 10 (marketing/case studies) | low-CTR rewrite | P2 | — | LinkedIn 2×/wk |
| 10 | reflexologyubud.com | 2 | 6 | service keywords | P1 | $10/day LSA | — |
| 11 | goldenmonkeybali.com | 2 | 6 | local keywords | P2 | — | — |
| 12 | goldenmonkeysanur.com | 2 | 6 | Sanur keywords | P2 | — | IG |
| 13 | goldenmonkeyubud.com | 2 | 4 | title CTAs | P2 | — | — |
| 14 | hairsalonubud.com | 2 | 10 | service + location | P1 | $10/day LSA | IG 3×/wk |
| 15 | nailsalonubud.com | 2 | 6 | protect #1 | P1 | — | IG 3×/wk |
| 16 | caviar.id | 2 | 6 + e-commerce | expand keywords | P2 | — | — |
| 17 | russiancaviarhouse.id | 2 | 6 + e-commerce | homepage rewrite | P3 | — | — |
| 18 | motagarage.com | 2 | 8 (ID) | SEO foundation | P1 | $10/day LSA | — |
| 19 | balirca.id | 2 | 4 | local/industry | P3 | — | — |
| 20 | cascadesbali.com | 2 | 8 waterpark | location + attraction | P2 | — | IG |

## Work volume (scope doc)

| Work type | Volume | Estimate |
|---|---|---|
| Blog articles | ~140 | 5 weeks @ 6/wk |
| Meta rewrites | ~100 | ~1 week |
| Full audits "remaining" | 16 | ⚠️ stale — all 32 already exist |
| GBP setups | 18 | ~2 days (after API) |
| Hero images | ~140 | Imagen 3, ~30s each (solved) |
| Ad campaigns | 6 | after GADS setup |

## Gaps remaining (scope doc)
- **Images** — ✅ solved (reuse OpenClaw Imagen 3).
- **Ads** — ❌ missing GADS env vars (browser setup as seo@gaiada.com).
- **GBP** — ❌ no API configured (enable Business Profile API + invite service account).

---

# Audit Coverage Gap — sites NOT audited

**Method:** live inventory — `nginx server_name` on gda-ce01 + gda-pn01, and Hostinger API WordPress-installations list, cross-referenced against the 32 audit reports.

> The 32 audits are a **curated subset**, not full coverage. **gda-pn01 was never audited** (and is reachable now — the old "SSH key not registered" blocker is out of date). These sites below have **no findings above** because they have never been audited.

| Server | Audited | Live sites hosted | Unaudited (live client) |
|---|---|---|---|
| gda-ce01 | 11 | ~18 | ~7 |
| gda-pn01 | **0** | ~5 (Node.js) | **~5 — none audited** |
| hostinger (u521276830) | 21 | **~55 WP installs** | **~20 live + ~14 staging/temp** |

## gda-ce01 — unaudited live client domains
(audited on ce01: akoyaspabali, aperitif, blossomsteakhouse, cascadesbali, hubblebali, huntermotorcycles, interlace, interlacenetwork, isort.id, pinstripebar, viceroybali)
- ayrwater.com · balicatering.com · balispaguide.com · blossomcatering.online · luxurydefined.com.au · ypi-asia.com · essentialbali.com *(also on pn01)* · isort.co.id *(separate TLD — likely alias of audited isort.id; verify)*

## gda-pn01 — unaudited (Node.js; NONE audited)
- essentialbali.com (CMS) · baligirls (baligirls.gaiada2.online) · jackaroodigital.com.au · schoolcatering (schoolcatering.gaiada2.online) · gaiadaweb (gaiada2.online)

## hostinger — unaudited live client domains
(audited on hostinger: amertaspa, aquatir, balirca, beanexchange, caviar, cascadessuites, dapurraja, gaiada, goldenmonkeybali, goldenmonkeysanur, goldenmonkeyubud, hairsalonubud, institutescoffier, motagarage, nailsalonubud, nusapenida, reflexologyubud, russiancaviarhouse, sepedamotor, ubudbeautycentre, pegasus.com.au)
- 7originfilm.com · balihiddenvillas.com · balihideawayvillas.com · balipropertybargains.com.au · balirestaurantguide.com · bruinsma-ac.com · cloudkitchenbali.com · dacaviar.com · dreamcatchervillas.com · enzogelatobali.com · enzosushitrain.com *(dapurraja.com 301s here — live successor)* · horizonviewsproperties.com · kalugaqueen.id · lastminuteroomsbali.com · orison.io · scamcheck-global.com · suriresidence.com · tacconsultancy.com · uniqueweightloss.com.au · bimc-cosmedic-01.gaiada.com *(subdomain)*

## hostinger — staging / temp / internal (probably out of scope)
`*.hostingersite.com` temp + `*.gaiada.com` test: Claisebrook Bar, Uluwatu School, Arrivi, Arrivi Legal, Christos Medicine, Luxury Bali, MST Edge, Aquatir (staging), Mota Garage (staging), staging.suriresidence.com, pegasus.gaiada.com, testmodule.gaiada.com, orangered-bat-981597.

## Caveats / to verify
- `isort.co.id` vs audited `isort.id` — same site or distinct?
- `gaiada.com` audited; ce01 has `gaiadaweb` dir and pn01 a `gaiadaweb` node app — confirm the live property.
- Hostinger ~55 = **WordPress installs**; non-WP addon websites not yet enumerated — true total may be higher.
