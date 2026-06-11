# Gaia Nexus — SEO Action Summary

**Updated:** 11 June 2026 · Summary layer. Full backlog → `todo.md`. Per-site detail → `docs/audits/<domain>.md` + `docs/seo/<domain>.md`. Cross-site → `findings.md`.

## Wave model & status

| Wave | Scope | Status |
|---|---|---|
| **0 · Audit production** | 63 technical audits + 63 SEO analyses + findings.md | ✅ **Complete** (committed 571a48c) |
| **1 · Audit scope of work** | execute the technical fixes from the 63 audits | ⏳ not started — 40 sites carry High-severity items |
| **2 · SEO scope of work** | meta rewrites + content from the 63 SEO docs | ⏳ not started — focus the ~7 earners |
| **3 · GBP / Ads / social** | 18 GBP + 6 ad campaigns + social | ⛔ Blocked (Google 2SV + GBP API) |

## Bottom line
Diagnosis is done for all 63 live sites. Two open work-streams: **Wave 1** (security/technical hardening — cheap, high-severity, portfolio-wide) and **Wave 2** (SEO — only ~7 sites have real traffic, so concentrate there). Wave 3 is parked on a single Google credential gate; start the unblock in parallel.

## Wave 1 — top technical priorities (from the audits)
- 🔴 Shared WP auth keys (goldenmonkeysanur/ubud) · viceroybali debug-via-URL + dual cache · balihiddenvillas `admin` user · bimc-cosmedic staging indexable · aquatir robots blocks `/shop/`.
- 🟠 Add HSTS portfolio-wide · drop default `wp_` prefixes · de-duplicate SEO/caching plugins · update WP core (6.8/6.9 → 7.0 on a few).
- Execution: ce01/pn01 scriptable via SSH; hostinger (41) via WP-admin/phpMyAdmin/Playwright.

## Wave 2 — SEO priorities (from the SEO docs)
- **Earners first** (real organic): aperitif, blossomsteakhouse, cascadesbali, nusapenida, pinstripebar, sepedamotor, viceroybali — meta rewrites fix CTR collapse (highest ROI), then content.
- viceroybali (8) + aperitif (10) meta rewrites are drafted and shippable now.
- Defensive: nailsalonubud holds #1 "nail salon ubud" with no content moat.
- Exclude redirect/parked domains (no SEO value).

## Wave 3 — blocked
- Google Ads dev-token (2SV on seo@gaiada.com) + GBP API access — same credential gate. Long-lead; start the request now.

## Cross-portfolio reality
- 63 live sites; only ~7 with meaningful organic traffic. Most are low-presence → broad content spend is low-return; security hygiene (Wave 1) applies to all.
- North-star: revenue & ROAS, not raw traffic. Every change reversible, cite a source metric.
