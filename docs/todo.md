# Gaia Nexus — SEO To-Do (by wave)

**Compiled:** 11 June 2026 — from `docs/audits/` + `docs/seo/seo-work-scope-20-sites.md` (consolidated in `action_summary.md`).
**Legend:** [x] done · ⚠️ void/stale (verified) · 🔍 needs re-verify · ⛔ blocked

---

## ✅ Completed this session
- [x] **Seed Nexus DB** with the 20 active scope sites (replaced 34 demo rows; backup in `/tmp/sites_backup_20260611.sql` + local `wip/`)
- [x] **robots.txt / sitemap fixes** — ⚠️ VOID: all 9 sites have valid robots.txt + sitemap_index.xml; audit findings were false positives (didn't follow http→https / non-www redirects)

---

## Wave 0 — Technical hygiene (batch)
- [ ] 🔍 Re-verify GSC on 4 sites (blossomsteakhouse, institutescoffier, sepedamotor, pinstripebar) — may also be stale
- [ ] Resolve SEO-plugin conflicts — gaiada.com (3: Yoast+RankMath+AIOSEO → keep RankMath), reflexologyubud (Yoast+RankMath), hairsalonubud (dual)
- [ ] De-duplicate caching plugins — reflexologyubud, goldenmonkeyubud, viceroybali
- [ ] Rotate shared WP auth keys (security) — goldenmonkeysanur + goldenmonkeyubud (identical)
- [ ] Update outdated Yoast Premium — nusapenida (v26.7), cascadessuites (v24.4)
- [ ] Decide on parked/migrated domains — interlace.com (parked), pegasus.com.au (→ Wix)
- Note: write method for hostinger-wp sites — see "Access methods" below

---

## Wave 1 — Meta rewrites (~100; highest ROI)
- [ ] Ship ready rewrites — viceroybali (8), aperitif (10 in audit)
- [ ] blossomsteakhouse — 8 ready; homepage missing brand name
- [ ] hairsalonubud — 8.6k impressions at pos 19.8; service + location keywords
- [ ] nailsalonubud — protect #1 for "nail salon ubud"
- [ ] pinstripebar — titles missing brand keywords
- [ ] nusapenida — titles lack location keywords
- [ ] sepedamotor — update titles with 2026/2027 dates
- [ ] russiancaviarhouse — full homepage SEO rewrite
- [ ] Remaining: gaiada, golden monkey ×3, caviar, balirca, cascades ×2, reflexologyubud, institutescoffier, huntermotorcycles, motagarage — target pos 4–15 high-impression pages

---

## Wave 2 — Content programme (~140 articles) + clustering
- [ ] blossomsteakhouse — scale from 42 posts + local landing pages (/best-steak-bali/, /steakhouse-bali/, /best-restaurant-sanur/)
- [ ] aperitif — 8 articles + "Best Fine Dining in Bali" pillar (27,100/mo kw at #31)
- [ ] pinstripebar — 6 nightlife/entertainment
- [ ] nusapenida — 10 travel guides
- [ ] sepedamotor — refresh old + 10 new (ID motorcycle)
- [ ] institutescoffier — 8 culinary (ID)
- [ ] cascadessuites — 10 (Ubud accommodation)
- [ ] huntermotorcycles — 8 (ID motorcycle)
- [ ] gaiada — 10 (digital marketing / case studies)
- [ ] reflexologyubud — 6 · goldenmonkeybali — 6 · goldenmonkeysanur — 6 · goldenmonkeyubud — 4
- [ ] hairsalonubud — 10 · nailsalonubud — 6
- [ ] caviar — 6 + e-commerce content · russiancaviarhouse — 6 + e-commerce content
- [ ] motagarage — 8 (ID) · balirca — 4 · cascadesbali — 8 (waterpark)
- [ ] Fix cannibalisation — aperitif /blog/ vs /news/ Michelin duplication (canonicals/consolidate)
- [ ] Hero images (~140) via Imagen 3 (OpenClaw — solved)

---

## Wave 3 — Remaining audits
- [ ] ⚠️ Scope says "16 audits not started," but `docs/audits/` already holds all 32 reports (Tier 1/2/3) — the "not started" flags are STALE.
- [ ] Genuine remaining: deepen the 11 Tier-3 lite audits if wanted; audit the ~18 portfolio domains not in the 32-site set.

---

## Wave 4 — Local + paid + social ⛔ BLOCKED (Ads dev-token + GBP API access)
- [ ] GBP setup ×18 — priority hyperlocal: hairsalonubud, nailsalonubud, motagarage, cascadessuites, reflexologyubud; + restaurants/cafes/accommodation
- [ ] Paid ads ×6 — aperitif ($1,200/mo optimise), nusapenida ($1,100/mo optimise), pinstripebar ($150→$10/day), blossomsteakhouse ($15/day), reflexologyubud/hairsalonubud/motagarage ($10/day LSA), cascadessuites ($10/day hotel ads)
- [ ] Social — IG 3×/wk (hospitality/salon), FB (pinstripebar events), LinkedIn 2×/wk (gaiada)
- ⛔ Unblock: clear 2SV on seo@gaiada.com (Workspace admin → backup codes) + submit GBP API access request

---

## Access methods (for WP-level changes on hostinger-wp)
hostinger-wp was documented as **view-only SSH**. Candidate write paths, in order of preference:
1. **Hostinger API MCP** — manages WP installations, deploy plugin/theme, phpMyAdmin link (DB-level edits). No generic file/robots editor.
2. **WP admin UI** (Playwright/browser) — plugin activation, Yoast/RankMath robots editor, settings.
3. **WP-CLI over SSH** — if SSH is actually read-write (re-verify; other doc claims proved stale).
4. **phpMyAdmin** (via Hostinger MCP link) — wp_options edits (active_plugins, etc.) — last resort.
