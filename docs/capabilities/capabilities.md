# Gaia Nexus — MCP Capabilities

Reference for the MCP servers that back the five Gaia Nexus data sources, plus supporting MCPs.
Each section lists the recommended server, auth requirements, the tools it exposes, and how it maps
to the Hermes Python collectors (`hermes/collectors/*.py`).

> **Note on maturity:** Only `filesystem` and the official Google/Semrush endpoints are
> first-party. Several SEO/marketing MCPs are community-maintained and vary in quality. For
> production Hermes, prefer the **official/read-only** servers; use community servers for
> development/prototyping only.

| Data source | Recommended MCP | Auth | Mode |
|---|---|---|---|
| Semrush | `mcp.semrush.com/v1/mcp` (official) or `mrkooblu/semrush-mcp` (community) | API key / OAuth | read-only (official) |
| GA4 | `googleanalytics/google-analytics-mcp` (official) | OAuth / service account | read-only |
| Search Console | `Suganthans-GSC-MCP` (community) | OAuth | read + Indexing API |
| Google Ads | `google-marketing-solutions/google_ads_mcp` (official) | OAuth + developer token | read-only by default |
| Tag Manager | `stape-io/google-tag-manager-mcp-server` (community) | OAuth | read + publish |
| Business Profile (GBP) | `jmdurant/gbp-mcp-server` (community, 28 tools) | OAuth + GBP API access | read + publish |

> See also the agent skill specs in this folder: `SKILLS-copywriter.md`, `SKILLS-seo.md`,
> `SKILLS-auditor.md`, `SKILLS-local-marketing.md`. The consolidated SEO findings + action plan
> live in `../action_summary.md`.

---

## Deployment Status (Verified 2026-06-04)

What is **actually configured on the Hermes agent** (gda-ai01, `/home/azlan/.hermes/config.yaml`). The deployed servers and tools are active and verified.

| MCP | Package (`npx -y …`) | Tools | Status |
|---|---|---|---|
| **Semrush** | `semrush-mcp` | 19 | ✅ **LIVE** — Authenticated with active API key (~2M units) |
| **GSC** | `suganthan-gsc-mcp` | 20 | ✅ **LIVE** — Fully authenticated via OAuth (Master Token) |
| **GA4** | `mcp-google-analytics` | 18 | ✅ **LIVE** — Configured and authenticated via Service Account key |
| **Google Ads** | `@ainative/gtm-mcp` (merged) | 4 | ✅ **LIVE** — Merged with GTM, active and authenticated via Service Account key |
| **GTM** | `@ainative/gtm-mcp` | 18 | ✅ **LIVE** — Deployed, active and authenticated via Service Account key |
| **filesystem** | `@modelcontextprotocol/server-filesystem` | — | ✅ **LIVE** — Connected and mapped to workspace paths |
| **figma** | `figma-mcp` | all | ✅ **LIVE** — Active with FIGMA_API_KEY |

**Current Deployment Details:**
- **No remaining credential blockers:** All five primary data sources are fully configured, authenticated, and live.
- **Search Console (GSC):** Connected via a Master OAuth Token Client ID/Secret.
- **Google Analytics 4 (GA4):** Fully integrated via a service account key file (`/home/azlan/google-oauth/ga4-user-credentials.json`).
- **Google Tag Manager (GTM) & Google Ads:** Deployed concurrently under a unified server utilizing the `@ainative/gtm-mcp` package, sharing credentials from the same service account JSON. This bypasses separate OAuth setups and enables seamless campaign auditing and trigger creation.
- **Semrush:** Active and operating with an enterprise key containing ~2M units.

### Addendum — current status (Updated 2026-06-11)

The 2026-06-04 record above reflects the Hermes agent deployment. Two gaps remain for the **full
SEO/SEM/local programme** (see `../action_summary.md` §5):

- **Google Ads (standalone, write-capable):** the GTM-merged `@ainative/gtm-mcp` exposes only 4
  read tools. A dedicated **`google_ads_mcp`** (official, read-only by default) is the recommended
  path for campaign reporting/management. ⛔ Blocked: a Google Ads **developer token** was generated
  in API Center but cannot be viewed because seo@gaiada.com requires 2-Step Verification (resolve via
  Workspace admin → backup codes); `googleads.googleapis.com` is not yet enabled on `gda-viceroy`.
- **Google Business Profile (GBP):** not configured. ⛔ Blocked: GBP API access is not approved
  (quota 0 QPM); `mybusiness*` + `businessprofileperformance` APIs not enabled on `gda-viceroy`.
  Required for the 18 GBP setups in the work scope.

Both blockers are long-lead (Google-side approval) — start them now. Figma is also live.

---

## 1. Semrush

**Collector:** `hermes/collectors/semrush_collector.py` — keyword rankings, backlinks, technical SEO, competitor analysis.

**Two options:**
- **Official** (`https://mcp.semrush.com/v1/mcp`) — discovery pattern: `organic_research`, `keyword_research`,
  `backlink_research`, `trends_research`, `get_report_schema`, `execute_report`. Read-only. Requires SEO
  Starter/Pro+ or Classic Pro/Guru plan (50k API units included). Auth: `Authorization: Apikey <KEY>` or OAuth.
- **Community** `mrkooblu/semrush-mcp` — **~77 explicit tools in 8 groups** (this is the "30+" server). Can also *write* (create/delete projects, launch audits).

### Community server — ~77 tools by group

**Domain Analytics (13)** — `semrush_domain_overview`, `semrush_domain_rank`, `semrush_domain_rank_history`,
`semrush_rank_difference`, `semrush_domain_organic_keywords`, `semrush_domain_paid_keywords`,
`semrush_competitors`, `semrush_paid_competitors`, `semrush_domain_ads_history`,
`semrush_domain_organic_unique`, `semrush_domain_adwords_unique`, `semrush_domain_shopping`,
`semrush_domain_shopping_unique`

**Keyword Research (10)** — `semrush_keyword_overview`, `semrush_keyword_overview_single_db`,
`semrush_batch_keyword_overview` (up to 100 kw), `semrush_related_keywords`, `semrush_broad_match_keywords`,
`semrush_phrase_questions`, `semrush_keyword_organic_results`, `semrush_keyword_paid_results`,
`semrush_keyword_ads_history`, `semrush_keyword_difficulty`

**Backlinks (7)** — `semrush_backlinks`, `semrush_backlinks_domains`, `semrush_backlinks_overview`,
`semrush_backlinks_pages`, `semrush_backlinks_anchors`, `semrush_backlinks_tld`, `semrush_backlinks_categories`

**Traffic & Audience (17, requires .Trends)** — `semrush_traffic_summary`, `semrush_traffic_sources`,
`semrush_traffic_destinations`, `semrush_traffic_geo`, `semrush_traffic_subdomains`,
`semrush_traffic_subfolders`, `semrush_traffic_top_pages`, `semrush_traffic_rank`,
`semrush_traffic_social_media`, `semrush_audience_insights`, `semrush_purchase_conversion`,
`semrush_household_distribution`, `semrush_income_distribution`, `semrush_education_distribution`,
`semrush_occupation_distribution`, `semrush_audience_interests`, `semrush_traffic_accuracy`

**URL Analytics (5)** — `semrush_url_organic`, `semrush_url_adwords`, `semrush_url_rank`,
`semrush_url_rank_history`, `semrush_url_ranks`

**Subdomain Analytics (4)** — `semrush_subdomain_rank`, `semrush_subdomain_ranks`,
`semrush_subdomain_rank_history`, `semrush_subdomain_organic`

**Subfolder Analytics (7)** — `semrush_subfolder_organic`, `semrush_subfolder_adwords`,
`semrush_subfolder_rank`, `semrush_subfolder_ranks`, `semrush_subfolder_rank_history`,
`semrush_subfolder_organic_unique`, `semrush_subfolder_adwords_unique`

**Projects & Site Audit (13)** — `semrush_list_projects`, `semrush_get_project`, `semrush_create_project`,
`semrush_update_project`, `semrush_delete_project`, `semrush_site_audit_info`,
`semrush_site_audit_snapshots`, `semrush_site_audit_snapshot_detail`, `semrush_site_audit_issues`,
`semrush_site_audit_pages`, `semrush_site_audit_page_detail`, `semrush_site_audit_history`,
`semrush_site_audit_launch`

**Utility (1)** — `semrush_api_units_balance`

> Most relevant to Gaia Nexus: domain overview, organic keywords, keyword difficulty, competitors,
> backlinks overview, traffic summary, site audit issues.

---

## 2. Google Analytics 4 (GA4)

**Collector:** `hermes/collectors/ga4_collector.py` — traffic, user behavior, conversions, revenue.
**Server:** `googleanalytics/google-analytics-mcp` (official, Apache-2.0, v0.4.0). Read-only.
**Auth:** OAuth or service account with GA4 read access.

**Tools (7):**
- `get_account_summaries` — list the user's GA accounts and properties
- `get_property_details` — metadata for a property
- `list_google_ads_links` — Google Ads accounts linked to a property
- `run_report` — standard reports via the Data API (sessions, users, conversions, revenue…)
- `run_funnel_report` — funnel analysis
- `get_custom_dimensions_and_metrics` — custom dimension/metric config
- `run_realtime_report` — live user activity

---

## 3. Google Search Console (GSC)

**Collector:** `hermes/collectors/gsc_collector.py` — search performance, indexation, Core Web Vitals.
**Server:** `Suganthan-Mohanadasan/Suganthans-GSC-MCP` (community, npm). **20 tools.**
**Auth:** OAuth (Search Console + Indexing API scopes).

**Analysis (14):** `site_snapshot`, `quick_wins` (rank 4–15, high impressions), `ctr_opportunities`,
`traffic_drops`, `content_gaps`, `cannibalization_check`, `content_decay`, `topic_cluster_performance`,
`ctr_vs_benchmark`, `inspect_url`, `check_alerts`, `content_recommendations`, `advanced_search_analytics`,
`generate_report`

**Indexing API (4):** `submit_url`, `submit_batch` (≤200 URLs/day), `submit_sitemap`, `list_sitemaps`

**Multi-site & safety (2):** `multi_site_dashboard` (health across all 50 properties), `verify_claim`
(re-queries GSC to self-check numeric claims)

> `multi_site_dashboard` and `quick_wins` map directly onto the Phase 1 portfolio dashboard and the
> Phase 2 "Top Opportunities" proposals.

---

## 4. Google Ads

**Collector:** `hermes/collectors/google_ads_collector.py` — campaign performance, spend, ROAS, CTR.
**Server:** `googleads/google-ads-mcp` (official). **Strictly read-only** — cannot modify bids, pause
campaigns, or create assets.
**Auth:** OAuth + Google Ads **developer token** + customer ID.

**Tools (official):**
- `list_accessible_customers` — customer IDs accessible to the authenticated user
- `get_resource_metadata` — metadata for a resource type (e.g. `campaign`)
- `search` — run **GAQL** queries to fetch metrics, budgets, status (impressions, clicks,
  cost_micros, conversions, conversion value…)

> The Hermes collector's GAQL (`SELECT campaign.id, metrics.impressions, metrics.cost_micros … FROM campaign`)
> maps 1:1 onto the `search` tool.
>
> **Community alternatives** (more tools, can *write*): `cohnen/mcp-google-ads`, `gomarble-ai/google-ads-mcp-server`,
> `google-marketing-solutions/google_ads_mcp` (some expose 160+ tools across assets/targeting/bidding/
> reporting). Use only if write/management is required — higher risk.

---

## 5. Google Tag Manager (GTM)

**Collector:** `hermes/collectors/gtm_collector.py` — event tracking, conversion validation, custom metrics.
**Server:** `stape-io/google-tag-manager-mcp-server` (community) or `paolobietolini/gtm-mcp-server`.
Read + publish (GTM API v2).
**Auth:** OAuth (Tag Manager scopes), token persistence.

**Common tools:**
- Accounts/containers: `list_accounts`, `list_containers`, `list_workspaces`, `get_workspace_status`
- Tags: `list_tags`, `get_tag`
- Triggers: `list_triggers`, `get_trigger`
- Variables: `list_variables`, `get_variable`, `list_built_in_variables`
- Organization: `list_folders`, `get_folder_entities`, `list_templates`, `get_template`
- Versions/publish: `list_versions` (and publish workflows on write-capable servers)

> Read tools cover Phase 1/2 (conversion validation, custom metrics). Publishing is a Phase 3
> deployment action — gate behind human approval like all other Hermes mutations.

---

## 6. Google Business Profile (GBP)

**Collector:** `hermes/collectors/gbp_collector.py` (planned) — local presence, reviews, posts, insights.
**Server:** `jmdurant/gbp-mcp-server` (community, node, **28 tools across 6 surfaces**) — forked/extended
from `satheeshds/gbp-review-agent`. Read + publish.
**Auth:** OAuth (`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`) **+ approved Google Business Profile API
access** (the gating requirement — see below).

**Surfaces & tools:**
- **Reviews (5):** `list_locations`, `get_unreplied_reviews`, `generate_reply`, `post_reply`, `delete_review_reply`
- **Posts (4):** `get_local_posts`, `create_local_post`, `update_local_post`, `delete_local_post`
- **Q&A (4):** `get_questions`, `upsert_answer`, `delete_answer`, `delete_question`
- **Media (4):** `get_media`, `create_media`, `start_media_upload`, `delete_media`
- **Insights (3):** `get_daily_metrics`, `get_multi_daily_metrics`, `get_search_keywords`
- **Business Info (7):** location details, attributes, services, categories, verifications

> ⛔ **Blocked — not yet configured.** GBP API access requires a verified profile active 60+ days and
> an approved access request; quota flips from 0 → 300 QPM on approval. Required for the **18 GBP
> setups** in the work scope. GBP is critical for hyperlocal clients (salons, garages, accommodation)
> where the map pack drives discovery more than organic rankings. See `SKILLS-local-marketing.md`.

---

## Supporting MCPs (not data sources)

### filesystem — `@modelcontextprotocol/server-filesystem` (official)
No credentials. Scoped to allowed directories. Use for navigating/editing the `gaia-nexus` monorepo
(`frontend/`, `backend/`, `hermes/`). The only server safe to install immediately.

### Discord — `mcp-discord` (community, npm) / `barryyip0625/mcp-discord`
Auth: Discord **bot token** (scope to minimum permissions). Maps to the platform's notification
system — Phase 2 "pending review" alerts and Phase 3 deployment outcomes. The Hermes gateway on
`gda-ai01` is already Discord-connected.

---

## Expert Best Practices — Using the Five Sources for SEO / AEO / SEM / SMM

The five sources are not five separate reports — experts run them as **one measurement stack**.
GTM is the foundation (it defines what gets measured), GA4 is the source of truth for on-site
behavior and revenue, GSC and Semrush cover organic demand and competitive landscape, and Google
Ads covers paid. Hermes should always **triangulate** across at least two sources before proposing a
change, and attribute every metric to a canonical site ID.

### The data foundation (do this first)
- **GTM is the contract.** Nothing is trustworthy until tagging is right. Standardize the **GA4 event
  schema** (consistent event + parameter names) across all 50 sites via GTM container templates, use a
  **server-side GTM** container where possible (resilient to ad-blockers / ITP, cleaner first-party
  data), and validate with GTM Preview + GA4 DebugView before trusting any downstream metric.
- **Define conversions once.** Mark the same key events as conversions in GA4 and import them into
  Google Ads (don't double-count GA4 import vs the Ads tag). Consistent conversion definitions are what
  make ROAS comparable across the portfolio.
- **Consent & quality.** Implement Consent Mode v2 in GTM; deduplicate conversions; filter internal/bot
  traffic. Garbage tagging → garbage proposals.

### SEO (organic) — GSC + Semrush + GA4
- **GSC is truth for *your* search performance; Semrush is truth for *the market*.** Use GSC for actual
  clicks/impressions/position/CTR; use Semrush for keyword volume, difficulty, SERP features, and
  competitor gaps. Never quote Semrush "estimated traffic" as actual traffic.
- **Quick wins first.** Prioritize keywords ranking **positions 4–15 with high impressions**
  (`quick_wins` / `ctr_opportunities`) — small ranking or CTR (title/meta) improvements yield the
  fastest gains. This is the single highest-ROI SEO play.
- **Defend before you attack.** Run `content_decay` and `traffic_drops` to find pages losing ground;
  refreshing decaying winners usually beats writing net-new content.
- **Fix cannibalization.** `cannibalization_check` — when multiple pages compete for one query,
  consolidate or differentiate intent.
- **Topical authority.** Build content **clusters** (pillar + supporting pages) around
  `content_gaps`; measure with `topic_cluster_performance`. Match **search intent** (informational vs
  transactional) to page type.
- **Technical hygiene.** Semrush Site Audit (`site_audit_issues`) + GSC `inspect_url` for indexation;
  watch Core Web Vitals (LCP/INP/CLS). Submit fresh/updated URLs via the Indexing API (`submit_url`,
  `submit_sitemap`).
- **Close the loop with money.** Join GSC queries → GA4 landing-page conversions/revenue so SEO is
  optimized for **revenue per page**, not vanity clicks.

### AEO (answer-engine / generative optimization) — GSC + Semrush + GA4 + GTM
Optimizing to be **cited and surfaced inside AI answers** — Google AI Overviews / AI Mode, ChatGPT,
Perplexity, Gemini, Copilot — not just ranked in ten blue links. (Also called GEO/LLMO.) AEO sits on
top of solid SEO; you can't be cited if you can't be crawled and understood.

- **Make content machine-extractable.** Lead with a **direct, self-contained answer** (40–60 words)
  under a question-phrased H2/H3, then expand. AI engines lift concise, factual, well-structured
  passages. Use lists, tables, definitions, and clear entities.
- **Structured data is non-negotiable.** Ship `FAQPage`, `HowTo`, `Article`, `Product`, and
  `Organization`/`Person` schema (E-E-A-T signals: author, credentials, sources). Keep entity and
  brand naming consistent across all 50 sites so engines resolve you to one entity.
- **Target question & conversational queries.** Use Semrush `phrase_questions` + GSC question queries;
  AI answers are built from question intent and long-tail, natural-language phrasing.
- **Earn off-site citations.** LLMs disproportionately cite high-authority/third-party sources
  (Wikipedia, Reddit, industry roundups, review sites). Digital PR + being referenced elsewhere raises
  citation probability more than on-page tweaks alone.
- **Crawlability for AI.** Don't block reputable AI crawlers you want citations from
  (GPTBot, PerplexityBot, Google-Extended) unless you have a reason; consider an emerging **`llms.txt`**
  to guide them. Fast, server-rendered HTML beats JS-only content for extraction.
- **Measure AI visibility (the new rank tracking):**
  - **GSC** — track queries that trigger AI Overviews and your impressions/clicks from AI surfaces;
    expect high-impression / lower-CTR patterns as answers are shown inline.
  - **Semrush AI/AEO toolkit** — monitor presence and **brand mentions/citations in AI answers** and
    AI Overview coverage per keyword vs competitors.
  - **GA4 + GTM** — build a custom **"AI Assistants" channel grouping** (referrers like `chatgpt.com`,
    `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`); GTM identifies the referrer, GA4
    measures sessions, engagement, and conversions from AI referrals.
- **North-star for AEO:** **share of AI citations / answer presence** for your priority questions, and
  **conversions from AI-assistant referral traffic** — not just classic position. Hermes should propose
  answer-block rewrites + schema additions and verify uplift in GSC AI impressions and GA4 AI-channel
  conversions.

### SEM (paid search) — Google Ads + GA4 + Semrush + GTM
- **Optimize to value, not clicks.** Use **conversion-value / ROAS** bidding, not CPC. Feed offline/
  high-value conversions back where possible. GTM accuracy directly caps Smart Bidding quality.
- **Structure for signal.** Tight ad-group/theme structure, strong negative-keyword lists, and
  match-type discipline. Mine **Semrush paid competitors + `keyword_ads_history`** for competitor copy
  and gaps; mine GSC/Semrush for high-intent terms to add or exclude.
- **SEO ⇄ SEM synergy.** Don't pay for terms you already rank #1 organically (unless defending);
  conversely, use **paid search-term data as fast keyword research for SEO**. Look at combined organic
  + paid SERP coverage per query.
- **Landing-page ROAS.** Tie Ads spend to GA4 landing-page conversion rate; the cheapest ROAS win is
  often a better landing page, not a higher bid. A/B test via GTM-driven experiments.
- **Budget allocation across 50 sites.** Rank campaigns by ROAS and marginal return; shift budget from
  saturated/low-ROAS to under-funded high-ROAS — the core Hermes "ad spend efficiency" proposal.
- **Guardrails.** Watch impression share lost (budget vs rank), CPA caps, and Quality Score (CTR +
  relevance + LP experience). The official Ads MCP is **read-only** — keep all bid/budget *changes*
  behind Phase 3 human approval.

### SMM (social) — GA4 + GTM + Semrush + UTMs
- **Tag everything with UTMs.** Consistent `utm_source/medium/campaign` is the only way GA4 can
  attribute social traffic; enforce a naming convention. GTM captures the click → GA4 reports the
  outcome.
- **Measure assisted/last-click both ways.** Social is often an **upper-funnel assist**; use GA4
  attribution paths and conversion-path reports, not just last-click, or you'll undervalue social.
- **Benchmark share of voice.** Use Semrush `traffic_social_media` and audience demographics
  (interests, income, geo) to size the social opportunity and profile competitors' social mix.
- **Content feedback loop.** Top organic/landing pages (GA4 + GSC) → repurpose as social content;
  high-engagement social topics → feed the SEO `content_gaps` pipeline. SEO and SMM share a content
  calendar.
- **On-site engagement of social visitors.** Segment GA4 by social source: engagement rate, scroll,
  events (via GTM), conversion rate — decide which channels are worth the effort.

### Cross-channel cadence & KPIs (how the portfolio is actually run)
- **Daily:** anomaly watch — traffic/spend/conversion spikes or drops (`traffic_drops`, `check_alerts`,
  Ads spend pacing). This is the daily Hermes pull.
- **Weekly:** quick-wins, ad-group/negative review, budget reallocation, decay/cannibalization sweep.
- **Monthly:** competitive landscape (Semrush), content-cluster performance, attribution review,
  Core Web Vitals.
- **North-star KPIs:** **revenue & ROAS** (not traffic). Per-channel: organic = revenue/clicks per
  cluster; paid = ROAS / CPA / impression share; social = assisted conversions / engaged sessions.
  Portfolio: blended CAC and profitability per site (the Gaia Nexus `/analytics/profitability` view).
- **Golden rule for Hermes:** every proposal cites the **source metric + a corroborating second
  source**, predicts an impact, and is reversible. Correlation from one dashboard is a hypothesis, not
  a mandate.

---

## 4. Views and Usage (Detailed Mappings)

Each of the five core datasources provides specialized views, charts, and reports that map directly to specific marketing, engineering, and business user operations.

### A. Google Tag Manager (GTM)
* **Foundation View & Workspace Status:**
  * **Exposed Views & Charts:** Workspace Change Log, Tag/Trigger/Variable List, Version History, Release Timeline, Preview/Debug Mode Workspace.
  * **Key Findings & Metrics:** Unsubmitted/Unsaved tags, duplicate container triggers, custom Javascript tags missing validation, load latency/event-order waterfalls.
  * **How Users Use It:**
    * *Analytics Engineers:* Deploy new GA4 measurement triggers, verify container variables, and validate that tracking events are fired in the correct sequence before going live.
    * *Performance Marketers:* Verify that external marketing pixels (Facebook, TikTok, LinkedIn) and custom HTML tags are loaded asynchronously without dragging down page performance.
    * *QA Specialists:* Run GTM Preview Mode to step through click and form submission events in real time to ensure metadata values are scraped correctly.
* **Tag & Trigger Logic Views:**
  * **Exposed Views & Charts:** Tag Configuration Panel, Trigger Definition Builder, User-Defined Variables Table, Custom Templates Manager.
  * **Key Findings & Metrics:** Misfiring conversion tags (e.g., a "Purchase" tag firing on `/blog` instead of `/thank-you`), unbound trigger variables, unmapped dataLayer elements.
  * **How Users Use It:**
    * *Conversion Rate Optimizers (CROs):* Bind click tracking triggers to CTA buttons and form-submission elements to track exact conversion drop-offs.
    * *Web Developers:* Map custom `dataLayer.push` events on server-side actions (such as booking validations) to expose transactional variables directly to GTM.

### B. Google Analytics 4 (GA4)
* **Realtime Reporting:**
  * **Exposed Views & Charts:** Realtime User Map, Active Users per Minute (last 30 minutes), Top Page Title Views, Event Count by Event Name.
  * **Key Findings & Metrics:** Instant spike in traffic, broken user journeys (e.g., immediate page exits on a new checkout path), missing custom variables during active campaigns.
  * **How Users Use It:**
    * *Launch Managers:* Monitor live traffic behavior immediately following a product release, system deploy, or a major marketing blast to ensure API routes and frontend forms are functioning flawlessly.
* **Acquisition Reports:**
  * **Exposed Views & Charts:** Traffic Acquisition Trend Line, User Acquisition Cohorts, Campaign Attribution Bar Charts, Organic Search vs. Paid Search channel breakdowns.
  * **Key Findings & Metrics:** Session Source/Medium, Campaign-level conversion rates, First User Source, Bounce and Engagement Rates.
  * **How Users Use It:**
    * *Digital Marketers:* Audit budget allocations across channels by identifying which campaigns are bringing in engaged sessions versus high-bounce traffic.
    * *SEO Managers:* Track the direct percentage of traffic arriving via organic search to evaluate search visibility and overall brand awareness.
* **Engagement & Monetization Reports:**
  * **Exposed Views & Charts:** Page & Screen Views, Conversion Event Counts, Landing Page Profitability Table, Ecommerce Purchase Journey Funnels, Checkout Progression Funnels.
  * **Key Findings & Metrics:** Average engagement time per page, page-exit rates, shopping cart abandonment points, lifetime value (LTV) cohorts, average order value (AOV).
  * **How Users Use It:**
    * *Product Owners:* Use purchase journey and checkout funnels to pin down the exact step where users drop off during checkout to optimize UI/UX.
    * *Content Marketers:* Analyze Landing Page reports to evaluate the engagement level of high-traffic blog entries and place conversion widgets on top-performing pages.

### C. Google Search Console (GSC)
* **Search Results Performance:**
  * **Exposed Views & Charts:** Click/Impression/CTR/Position Over-Time Trend Lines, Queries Table, Pages List, Device & Country geo-charts, Search Appearance breakdowns (FAQ schema, Rich Snippets, Web Light).
  * **Key Findings & Metrics:** Search query-level impressions, average position trends, click-through rate collapses (CTR dropping below expected benchmarks), position drops.
  * **How Users Use It:**
    * *SEOs & Content Strategists:*
      * *Identify Quick Wins:* Filter queries ranking in positions 4–15 with high impressions to prioritize on-page content updates and metadata optimizations.
      * *Detect CTR Collapses:* Find keywords with high search impressions but extremely low CTR to run meta-title and description rewrites.
      * *Diagnose Traffic Drops:* Compare search periods (e.g., past 28 days vs. previous period) to determine if a traffic drop is due to a decline in search demand or a ranking position loss.
* **Indexing & URL Inspection:**
  * **Exposed Views & Charts:** Page Indexing Status Chart, Sitemap Status Log, Discovered/Crawled URL Lists, Mobile Usability Report, Core Web Vitals Speed Metrics (LCP, INP, CLS sparklines).
  * **Key Findings & Metrics:** Crawled but not indexed pages, redirect loops, sitemap parser errors, mobile-unfriendly text sizing, Core Web Vitals "Needs Improvement" status.
  * **How Users Use It:**
    * *Technical SEOs:*
      * Resolve sitemap discovery errors and submit bulk URL indexing requests via the Indexing API.
      * Inspect individual URLs to verify that Google is rendering the correct canonical tag and that no page elements are blocking mobile crawler access.
    * *Web Developers:* Track Core Web Vitals speed graphs to locate pages failing LCP (Largest Contentful Paint) or INP (Interaction to Next Paint) to optimize asset load-orders.

### D. Semrush
* **Domain Overview & Organic Research:**
  * **Exposed Views & Charts:** Authority Score, Organic vs. Paid Traffic Trend Lines, Backlinks Sizer, Keyword Position Distribution (Top 3, 10, 20, 100), Organic Competitors Quadrant, Subdomains and Subfolders traffic splits.
  * **Key Findings & Metrics:** Estimated competitor search traffic, competitor keyword overlap, newly discovered search competitors, ranking position shifts, authority score trends.
  * **How Users Use It:**
    * *SEO Managers:* Benchmark site performance against the top 5 direct competitors in the industry, identify competitor domains rising or falling in search share, and detect subfolder configurations driving competitor growth.
* **Keyword Research & Keyword Magic Tool:**
  * **Exposed Views & Charts:** Search Volume trends, Keyword Difficulty Index (KD%), Keyword Search Intent Tagging (Informational, Navigational, Commercial, Transactional), SERP Features breakdown, Related Terms tree, Phrase Questions matrix.
  * **Key Findings & Metrics:** Monthly search volume, KD% rating, cost-per-click (CPC) values, competitive density, question-based search queries.
  * **How Users Use It:**
    * *Content Strategists:* Generate targeted content ideas by finding keywords with high search volume, low KD% (under 30%), and high commercial intent.
    * *AEO & FAQ Authors:* Query the "Phrase Questions" database to capture conversational queries to write direct Q&A blocks and implement FAQ schemas.
* **Backlink Analytics & Site Audit:**
  * **Exposed Views & Charts:** Total Backlinks, Referring Domains trend, Anchor Text Cloud, Link Attributes (Follow, NoFollow, Sponsored, UGC), Toxic Score, Site Audit Health Score (0-100), Errors/Warnings/Notices breakdown.
  * **Key Findings & Metrics:** New/lost backlinks, toxic domain links, duplicate meta tags, broken link counts, orphan pages, slow-loading assets.
  * **How Users Use It:**
    * *Link Builders:* Clean up toxic links to prevent algorithmic penalties and run link-building outreach by finding competitor backlink domains.
    * *Front-End Engineers:* Run technical audits to clean up 404 broken links, add missing alt text to images, and fix duplicate title tags.

### E. Google Ads
* **Campaign & Ad Group Performance:**
  * **Exposed Views & Charts:** Ad Spend/Cost Trend Line, Impression Share, Click-Through Rate (CTR) Bar Chart, Conversions Trend, Conversion Value (ROAS) line, Recommendation Score.
  * **Key Findings & Metrics:** CPC, Cost-per-acquisition (CPA), Return on Ad Spend (ROAS), Impression Share lost to budget/rank, Campaign Optimization Score.
  * **How Users Use It:**
    * *PPC Campaign Managers:* Shift budgets dynamically from low-ROAS, saturated campaigns to high-ROAS ad groups, and monitor spend pacing to prevent budget exhaustion.
    * *A/B Performance Testers:* Run experiment paths on ad creative versions to find which headline and description combinations yield the highest CTR and conversion value.
* **Keyword Planner & Search Terms Report:**
  * **Exposed Views & Charts:** Search Terms List, Impressions/Clicks/CPC by search term, Keyword Match Type distribution.
  * **Key Findings & Metrics:** High-cost, low-conversion search terms (ad-spend leak), new high-converting query opportunities.
  * **How Users Use It:**
    * *PPC Buyers:* Review actual user search term reports to identify non-converting, irrelevant search queries and add them to negative keyword lists to eliminate ad-spend leakage.
    * *SEO Strategists:* Extract paid search terms showing high conversion rates and pass them directly to the content team to prioritize organic rankings on those terms.

---

## Credential checklist (GCP Secret Manager)

All secrets belong in GCP Secret Manager (`03_SYSTEM_ARCHITECTURE.md`), not on disk:

- [ ] `semrush-api-key` (+ SEO plan with API units)
- [ ] Google OAuth client / service-account JSON with scopes for GA4, GSC (+ Indexing API), Ads, GTM
- [ ] Google Ads **developer token** + customer IDs
- [ ] `discord-bot-token`
- [ ] `claude-api-key` (already specced for Hermes)

## Sources
- Semrush: <https://www.semrush.com/kb/1618-mcp> · <https://developer.semrush.com/api/introduction/semrush-mcp/> · <https://github.com/mrkooblu/semrush-mcp>
- GA4: <https://github.com/googleanalytics/google-analytics-mcp> · <https://developers.google.com/analytics/devguides/MCP>
- GSC: <https://github.com/Suganthan-Mohanadasan/Suganthans-GSC-MCP>
- Google Ads: <https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server> · <https://github.com/googleads/google-ads-mcp>
- GTM: <https://github.com/stape-io/google-tag-manager-mcp-server> · <https://github.com/paolobietolini/gtm-mcp-server>
