# Local Marketing — SKILLS.md

> **Skill specification for the Local-Marketing agent: Google Business Profile (GBP), paid search (Google Ads), and social posting.**
> Covers the GBP / Ads / Social columns of the 20-site work scope (docs/seo/) — the "Wave 4" work in action_summary.md.
> Target instance: `.openclaw-seo/workspace-local/` on `gda-ai01` (planning).
> Status: **PLANNED — BLOCKED.** Created 11 June 2026. Cannot operate until the two credential blockers below are cleared.

## 1. What this agent does

Owns the off-page, local, and paid surfaces that sit alongside on-page SEO:

- **GBP** — claim/optimise Google Business Profiles (reviews, posts, Q&A, photos, hours, categories) for the 18 in-scope local businesses.
- **Paid search** — launch and audit Google Ads / Local Service Ads for the 6 sites with ad budget or ad opportunity.
- **Social** — schedule Instagram/Facebook/LinkedIn posts, repurposing top organic content.

All copy is British English (en-GB) and routed through the Copywriter for `kind: 'ad'` and social captions.

**Identity sentence:** _"I'm the Local-Marketing agent — I run GBP, paid search, and social for Gaiada's local clients."_

## 2. ⛔ Blockers (must clear before this agent can run)

| Blocker | Detail | Resolution |
|---|---|---|
| **Google Ads credentials** | Developer token generated in API Center but unviewable (2-Step Verification on seo@gaiada.com); `googleads.googleapis.com` not enabled on gda-viceroy | Clear 2SV via Workspace admin (admin.google.com → Users → seo@gaiada → Security → backup codes), enable API, connect the official `google_ads_mcp` |
| **GBP API access** | Not approved — quota 0 QPM; `mybusiness*` + `businessprofileperformance` APIs not enabled | Submit the Business Profile API access request (verified profile active 60+ days); on approval (quota → 300 QPM) connect a GBP MCP |

> These are the **same two credentials** that gate the standalone MCP connector work. Clearing them unblocks 18 GBP setups + 6 ad campaigns at once.

## 3. Core skills (planned)

### 3.1 `gbp-optimise` — **PLANNED (blocked)**

**Signature:** `gbp-optimise(client, location_id, actions[])`

Actions: update business info (categories, hours, attributes, services), publish posts, generate review replies, upload media, answer Q&A. Maps to GBP MCP surfaces (reviews / posts / Q&A / media / insights / business-info). Reads performance via `get_daily_metrics` / `get_search_keywords`.

> Priority per the audit: GBP is **critical** for the hyperlocal businesses — hairsalonubud, nailsalonubud, motagarage, cascadessuites, reflexologyubud — where discovery depends on the map pack more than organic rankings.

### 3.2 `ads-audit` — **PLANNED (blocked)**

**Signature:** `ads-audit(client, customer_id)`

Read-only GAQL via the official Google Ads MCP (`search`): pull campaign/ad-group performance, spend, CTR, conversions, ROAS, impression-share-lost. Flag ad-spend leakage (high-cost low-conversion search terms → negative-keyword candidates). **The official Ads MCP is read-only — all bid/budget changes stay behind human approval (Phase 3).**

Current ad spend noted in the scope: aperitif ($1,200/mo), nusapenida ($1,100/mo), pinstripebar ($150/mo); others at $0 (launch candidates at $10–15/day Local Service Ads).

### 3.3 `ads-launch` — **PLANNED (blocked, write — human-gated)**

**Signature:** `ads-launch(client, customer_id, campaign_spec)`

Propose a campaign (budget, geo, keywords, ad copy via Copywriter `kind: 'ad'`). **Never auto-executes** — emits a proposal for operator approval. Requires a write-capable Ads path (the official server is read-only; a write server or the Ads UI is used for the actual mutation).

### 3.4 `social-schedule` — **PLANNED**

**Signature:** `social-schedule(client, platform, posts[])`

Schedule captions + media. Captions drafted by Copywriter (persona-matched, en-GB), tagged with consistent UTMs so GA4 can attribute social traffic. Cadence from the scope: Instagram 3×/wk for hospitality/salon; LinkedIn 2×/wk for gaiada.com.

## 4. Measurement

- **GBP:** profile views, search keywords, calls, direction requests (`get_daily_metrics`).
- **Ads:** ROAS / CPA / impression share — optimise to value, not clicks. GTM accuracy caps Smart Bidding quality.
- **Social:** assisted conversions via GA4 attribution paths (UTM-tagged) — not last-click only.

## 5. What this skill set does NOT do

- **Write long-form content** — Copywriter (this agent only requests `kind: 'ad'` + social captions).
- **Mutate bids/budgets without approval** — all spend changes are human-gated.
- **Operate before blockers cleared** — see §2.

# --- END ---
