# Gaia Nexus — SEO Action Summary

**Compiled:** 11 June 2026
**Sources:** docs/audits/ (32 reports, 2026-06-10) + docs/seo/seo-work-scope-20-sites.md + Semrush MCP + GSC MCP
**Status:** Findings consolidated and partly actioned (see Progress below).
**Standard:** All output copy in British English (en-GB) per SKILLS-copywriter.md.
**Live checklist:** `docs/todo.md` (wave-by-wave to-do with status flags).

## 0. Progress (updated 2026-06-11)

| Wave | Status | Note |
|---|---|---|
| DB seed (was §7 item 5) | ✅ **Done** | `sites` table replaced 34 demo rows → 20 active scope sites; prior data backed up |
| Wave 0 · robots.txt/sitemap | ⚠️ **Void — verified clean** | All 9 sites have valid robots.txt + sitemap_index.xml; audit findings were false positives (didn't follow http→https / non-www redirects) |
| Wave 0 · GSC unverified ×4 | 🔍 **Re-verify** | Likely also stale given the above — live-check before acting |
| Wave 0 · plugins / caching / auth keys / Yoast | ⏳ Pending | WP-level changes; hostinger-wp write path = WP admin (Playwright) or phpMyAdmin (Hostinger MCP) — direct SSH timed out |
| Wave 1 · meta rewrites | ⏳ Pending | viceroybali (8) + aperitif (10) ready to ship |
| Wave 2 · content (~140) | ⏳ Pending | via Copywriter agent |
| Wave 3 · remaining audits | ⚠️ **Mostly stale** | All 32 in-scope sites already have audit reports; scope's "16 not started" is out of date |
| Wave 4 · local/paid/social | ⛔ **Blocked** | Ads dev-token + GBP API access (see §5) |

## 1. Portfolio at a glance

The numbers across the older docs disagreed; the reconciled reality is layered, not a single figure:

| Layer | Count | Meaning |
|---|---|---|
| Managed domains (aspiration) | ~50 | 40 WordPress + 10 Node.js — the full portfolio target |
| Audited (2026-06-10) | 32 | Reports in docs/audits/ |
| Active SEO scope | 20 | The sites in the current work plan (docs/seo/) |
| Live in Nexus DB | 20 | Seeded 2026-06-11 with the active scope sites (replaced 34 demo rows; prior data backed up) |

**Hosting split (audited sites):** gda-ce01 (GCP WordPress cluster, full SSH) = 14 sites · hostinger-wp (shared, view-only SSH) = 18 sites.

**Audit tiers:**

| Tier | Sites | Depth |
|---|---|---|
| 🔴 Tier 1 — Deep | 8 | Full-stack audit (15 sections): config, plugins, meta, robots, sitemap, GSC 28-day, Semrush, prioritised issues, meta-title proposals, scorecard |
| 🟡 Tier 2 — Standard | 12 | Config + plugins + headline GSC/Semrush + issues + recommendations |
| 🟢 Tier 3 — Lite | 11 | Technical hygiene snapshot |
| ✅ Done | 1 | viceroybali.com (8 meta rewrites ready) |

## 2. Cross-portfolio critical findings

Aggregated from the audit index. These are the issues that repeat across sites and should be fixed as batch operations.

| Severity | Issue | Sites affected | Count |
|---|---|---|---|
| ⚠️ | ~~Missing robots.txt~~ **VERIFIED CLEAN** (false positive) | all 9 serve valid robots.txt (200) | 0 |
| 🔍 | GSC not verified *(re-verify — may be stale)* | blossomsteakhouse, institutescoffier, sepedamotor, pinstripebar | 4 |
| 🔴 | CTR collapse (<1% on high-impression pages) | viceroybali, aperitif, pinstripebar, nusapenida, cascadessuites | 5 |
| ⚠️ | ~~Sitemap returns 404~~ **VERIFIED CLEAN** | valid sitemap_index.xml; only bare /sitemap.xml alias 404s (cosmetic) | 0 |
| ⚠️ | ~~IP-based sitemap URLs~~ **VERIFIED CLEAN** | isort + hunter sitemaps use proper domain locs | 0 |
| 🔴 | Domain parked / migrated off WP | interlace.com, pegasus.com.au (→ Wix) | 2 |
| 🟡 | Dual/triple conflicting SEO plugins | gaiada (3: Yoast+RankMath+AIOSEO), reflexologyubud (2), hairsalonubud (2) | 3 |
| 🟡 | Dual caching plugins | reflexologyubud, goldenmonkeyubud, viceroybali | 3 |
| 🟡 | Identical WP auth keys across sites | goldenmonkeysanur + goldenmonkeyubud | 2 (security) |
| 🟡 | Outdated/inactive Yoast Premium | nusapenida (v26.7), cascadessuites (v24.4) | 2 |

**The signature problem is CTR collapse.** The clearest example (aperitif.com): a single blog page draws 47,435 impressions at 0.13% CTR — thousands of clicks lost to weak meta titles, not weak rankings. Meta rewrites are therefore the single highest-ROI play across the portfolio.

## 3. Recommended sequence (corrected order of operations)

The work plan lists tasks per site; reordered here into batched waves that fix the cheapest, highest-impact items first.

### Wave 0 — Technical hygiene (batch, ~1 week)
1. ⚠️ ~~**Create robots.txt + valid sitemap**~~ — **DONE/VOID**: verified clean, all sites already have valid robots.txt + sitemap_index.xml (audit false positive).
2. 🔍 **Verify GSC** on the 4 unverified sites (blossomsteakhouse, institutescoffier, sepedamotor, pinstripebar) — re-verify live first; likely also stale.
3. **Resolve plugin conflicts** — reduce gaiada.com to one SEO plugin (keep RankMath, the cluster standard); de-duplicate caching on the 3 affected sites.
4. **Rotate the shared WP auth keys** on goldenmonkeysanur + goldenmonkeyubud (security).
5. **Decide on parked domains** — interlace.com and pegasus.com.au are not on WordPress; confirm whether they stay in scope.

### Wave 1 — Meta rewrites (batch, ~1 week — highest ROI)
- ~100 title/description rewrites across the portfolio, prioritising the high-impression / low-CTR pages.
- viceroybali (8 ready) and aperitif (10 proposals in the audit) can ship immediately.
- Target: pages at positions 4–15 with high impressions (the GSC `quick_wins` / `ctr_opportunities` pattern).

### Wave 2 — Content programme (~5 weeks at 6/wk)
- ~140 blog articles via the Copywriter agent (personas Maya/Komang/Putu/Sari, en-GB).
- Build topic clusters around `content_gaps`; fix cannibalisation (e.g. aperitif's /blog/ vs /news/ duplication) with canonicals/consolidation.
- Hero images via Imagen 3 (reuse OpenClaw — already solved, ~30s each).

### Wave 3 — Remaining audits (~8 days at 2/day)
- ⚠️ **Mostly stale:** all 32 in-scope sites already have audit reports in `docs/audits/`; the scope's "16 not started" flags are out of date. Genuine remaining work = deepen the 11 Tier-3 lite audits, and audit the ~18 portfolio domains outside the 32-site set.

### Wave 4 — Local + paid + social (BLOCKED — see §5)
- 18 GBP setups, 6 paid-ad campaigns, ongoing social posting.

## 4. Tier 1 deep-dive highlights

| Site | Server | Semrush kw | GSC / signal | Headline finding |
|---|---|---|---|---|
| aperitif.com | ce01 | 2,778 | 94 clicks / 8,631 impr / 1.09% CTR / pos 19.8 | CTR collapse (47K-impr page at 0.13%); "fine dining" (27,100/mo) stuck at #31; needs a pillar page; /blog vs /news cannibalisation. Health 6.5/10. |
| blossomsteakhouse.com | ce01 | 10,154 | ❌ GSC unverified | Largest keyword footprint in portfolio; verify GSC first, then local landing pages (/best-steak-bali/). |
| pinstripebar.com | ce01 | 811 | CTR collapse | Nightlife; titles missing brand keywords; GSC unverified. |
| nusapenida.org | h-wp | 494 | CTR collapse | Travel guides opportunity; Yoast Premium outdated (v26.7). |
| sepedamotor.com | h-wp | 1,390 | 15,719 traffic/mo | 14-year ID-market site, strong Scoopy/Vario rankings — refresh + extend to new models. |
| institutescoffier.com | h-wp | 231 | ❌ GSC unverified | 11-year culinary school; ID-language content programme. |
| cascadessuites.com | h-wp | 6 | near-zero | Accommodation — GBP-critical; build presence from scratch. |
| huntermotorcycles.co.id | ce01 | 178 | IP-based sitemap | Full plugin stack to audit; ID-market motorcycle content. |

## 5. Blockers (and how they map to other work)

| Blocker | Status | Unblocks | Owner action |
|---|---|---|---|
| **Google Ads** — no GADS credentials configured | ❌ Dev token generated in API Center but unviewable (2SV on seo@gaiada.com); googleads API not enabled on gda-viceroy | 6 paid-ad campaigns (Wave 4) | Clear 2SV via Workspace admin → backup codes; then connect Google Ads MCP |
| **Google Business Profile** — no API access | ❌ Not approved (quota 0 QPM); mybusiness* APIs not enabled | 18 GBP setups (Wave 4) | Submit Business Profile API access request (verified profile, 60+ days); then connect GBP MCP |
| **gda-pn01** | ❌ SSH key not registered | Partner Node.js sites | Register SSH key |
| **Nexus DB** | Scaffold — 1 placeholder row | Live portfolio dashboard | Seed the 20–32 audited sites into the `sites` table |

**Key linkage:** Wave 4 (local + paid + social — the GBP and Ads columns of the work plan) is gated on the **exact same Google Ads developer token + GBP API access** that gates the standalone MCP connector work. Resolving those two credentials unblocks 18 GBP setups + 6 ad campaigns at once. Images are already solved (Imagen 3 via OpenClaw).

## 6. Work volume & cadence

| Work type | Volume | Estimate |
|---|---|---|
| Blog articles | ~140 | 5 weeks at 6/wk (Copywriter agent) |
| Meta rewrites | ~100 | ~1 week |
| Full audits remaining | 16 | ~8 days at 2/day |
| GBP setups | 18 | ~2 days (after API access) |
| Hero images | ~140 | Imagen 3, ~30s each |
| Ad campaigns | 6 | After GADS setup |

**Operating cadence (from capabilities.md):** Daily = anomaly watch (traffic/spend drops). Weekly = quick-wins + decay/cannibalisation sweep + budget reallocation. Monthly = competitive landscape + cluster performance + Core Web Vitals.

**North-star KPIs:** revenue & ROAS — not raw traffic. Every Hermes proposal must cite a source metric + a corroborating second source, predict impact, and be reversible.

## 7. Immediate next actions

1. **Ship the ready meta rewrites** — viceroybali (8) + aperitif (10) — today; no blockers. ← *next up*
2. 🔍 **Re-verify GSC** on the 4 unverified sites (live-check; likely stale) — then decide.
3. ⚠️ ~~Batch the robots.txt/sitemap fixes~~ — **DONE/VOID** (verified clean, false positives).
4. **Clear the Google Ads 2SV blocker** via Workspace admin and **submit the GBP API access request** — long-lead; start when ready (not in current round).
5. ✅ ~~Seed the Nexus DB~~ — **DONE 2026-06-11** (20 active sites; 34 demo rows replaced + backed up).

---

*Generated from the 2026-06-10 audit set and the 20-site work scope; progress tracked in `docs/todo.md`. Per-site detail lives in docs/audits/<site>-seo-audit.md; per-site work tables in docs/seo/seo-work-scope-20-sites.md.*
