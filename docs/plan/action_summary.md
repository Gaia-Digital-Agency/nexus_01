# Gaia Nexus — SEO Action Summary

**Updated:** 11 June 2026
**This is the summary layer.** Full task list → `todo.md`. Per-site detail → `docs/seo/seo-work-scope-20-sites.md` + `docs/audits/<site>-seo-audit.md`.
**Copy standard:** British English (en-GB).

---

## Bottom line

**Audits are done for every site. SEO execution has not started** — only 2 of 20 sites are prepped to ship. The portfolio's signature problem is **CTR collapse, not weak rankings**: e.g. aperitif has a page pulling 47,435 impressions at 0.13% CTR — thousands of clicks lost to weak meta titles. So **meta rewrites are the highest-ROI move**.

| Layer | Count |
|---|---|
| Managed portfolio (target) | ~50 (40 WordPress + 10 Node.js) |
| Audited (2026-06-10) | 32 reports in `docs/audits/` |
| Active SEO scope | 20 sites (`docs/seo/`) |
| Seeded in Nexus DB | 20 (2026-06-11) |

---

## Status by wave

> Every wave spans the **whole 20-site scope** unless stated. **"Ready now"** = work already drafted and shippable. **"Needs drafting"** = in scope, not yet written. Naming a couple of sites in a row does *not* mean the wave is only those sites.

| Wave | Full scope | Status | Ready now |
|---|---|---|---|
| **0 · Technical hygiene** | batch fixes on affected sites only | ⏳ mostly void/pending | — (see breakdown below) |
| **1 · Meta rewrites** | **~100 titles/descs across all 20 sites** | ⏳ Pending | viceroybali (8) + aperitif (10) drafted; **other 18 sites need drafting** |
| **2 · Content programme** | **~140 articles across all 20 sites** | ⏳ Pending | none — all need writing |
| **3 · Remaining audits** | — | ✅ effectively complete | all 32 reports exist; the scope's "16 not started" was **stale** |
| **4 · Local / paid / social** | 18 GBP + 6 ad campaigns + social | ⛔ Blocked | blocked on Google approvals (see Blockers) |

---

## Wave 0 — technical hygiene (breakdown)

| Item | Sites | Status |
|---|---|---|
| robots.txt / sitemap-404 / IP-sitemap | 9 flagged | ⚠️ **VOID — false positives** (all serve valid robots.txt + sitemap_index.xml; audit didn't follow http→https / non-www redirects) |
| GSC not verified | blossomsteakhouse, institutescoffier, sepedamotor, pinstripebar | 🔍 re-verify live (likely also stale) |
| Conflicting SEO plugins | gaiada (Yoast+RankMath+AIOSEO → keep RankMath), reflexologyubud, hairsalonubud | ⏳ pending |
| Duplicate caching plugins | reflexologyubud, goldenmonkeyubud, viceroybali | ⏳ pending |
| Shared WP auth keys (security) | goldenmonkeysanur + goldenmonkeyubud (identical) | ⏳ pending |
| Outdated Yoast Premium | nusapenida (v26.7), cascadessuites (v24.4) | ⏳ pending |
| Parked / migrated domains | interlace.com (parked), pegasus.com.au (→ Wix) | ⏳ confirm scope |

---

## Blockers

| Blocker | Status | Unblocks |
|---|---|---|
| **Google Ads dev token** | 2SV on seo@gaiada.com; googleads API not enabled | 6 paid-ad campaigns (Wave 4) |
| **GBP API access** | not approved (quota 0 QPM) | 18 GBP setups (Wave 4) |
| **hostinger-wp write path** | direct SSH view-only / unreachable | all WP-level fixes (Wave 0/1/2) on 18 hostinger sites → use Hostinger API MCP, WP admin (Playwright), or phpMyAdmin |
| **gda-pn01 SSH** | key not registered | partner Node.js sites |

Google Ads + GBP are gated on the **same** seo@gaiada.com credential work; clearing it unblocks both at once. Hero images are already solved (Imagen 3 via OpenClaw).

---

## Volume & cadence

| Work | Volume | Estimate |
|---|---|---|
| Meta rewrites | ~100 | ~1 week |
| Blog articles | ~140 | 5 weeks @ 6/wk (Copywriter agent) |
| GBP setups | 18 | ~2 days (after API access) |
| Hero images | ~140 | Imagen 3, ~30s each (solved) |
| Ad campaigns | 6 | after GADS setup |

**Cadence:** daily anomaly watch · weekly quick-wins + decay/cannibalisation sweep · monthly competitive + Core Web Vitals. **North-star: revenue & ROAS, not raw traffic.** Every proposal cites a source metric + a corroborating second source, predicts impact, and is reversible.

---

## Next actions

1. **Ship the ready rewrites** — viceroybali (8) + aperitif (10). No blockers.
2. **Draft Wave 1 for the other 18 sites** — GSC `quick_wins` / `ctr_opportunities` per site.
3. **Re-verify GSC** on the 4 unverified sites, then act.
4. **Clear Google Ads 2SV + submit GBP API request** — long-lead; start when ready.

---

*Sources: 2026-06-10 audit set (`docs/audits/`) + 20-site work scope (`docs/seo/`). Live checklist: `docs/plan/todo.md`.*
