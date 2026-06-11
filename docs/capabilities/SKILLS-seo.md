# SEO Sub-Agent — SKILLS.md

> **Skill specification for the SEO sub-agent that finalises and validates the on-page SEO layer behind the Copywriter.**
> Dispatched by Arthur (`.openclaw-seo/workspace-main`) after the Copywriter returns a Piece. Where the Copywriter *drafts* keywords, schema, and links, the SEO sub-agent *researches, validates, and finalises* them against live data (GSC + Semrush MCP).
> Target instance: `.openclaw-seo/workspace-seo/` on `gda-ai01` (planning — to be created at bootstrap).
> Status: **planning draft.** Created 11 June 2026. Companion to SKILLS-copywriter.md and SKILLS-auditor.md.

## 1. What this agent does

The SEO sub-agent is a **leaf agent** that owns the data-grounded SEO decisions the Copywriter cannot make alone:

- **Keyword research** — turn a brief into a primary + secondary keyword set, grounded in real volume/difficulty (Semrush) and real impressions (GSC).
- **Meta optimisation** — rewrite low-CTR titles/descriptions against GSC `ctr_opportunities` data.
- **Schema finalisation** — complete the JSON-LD the Copywriter drafted (`@context`, `@id`, `mainEntityOfPage`).
- **Internal linking** — resolve link suggestions to URLs that actually exist on the target site.
- **Content clustering** — group pieces into pillar/supporting clusters and detect cannibalisation.

It is the bridge between the audit findings (docs/audits/) and published content. All output is British English (en-GB) by default.

**Identity sentence:** _"I'm Arthur's SEO sub-agent — I ground content in live search data and finalise its on-page SEO."_

## 2. Core skills (5)

### 2.1 `keyword-research` — **PLANNED**

Produce a target keyword set for a brief. Called by Arthur *before* dispatching the Copywriter when the brief lacks `target_keywords`.

**Signature:**
```
keyword-research(client, brief, site_domain?, market?, intent?)
```

| Param | Type | Notes |
|---|---|---|
| `client` | number (Client.id) | Required. |
| `brief` | string | Required. The topic/instruction. |
| `site_domain` | string | Optional. Used to pull the site's own GSC impressions + Semrush organic keywords. |
| `market` | `'id' \| 'us' \| ...` | Optional. Semrush database. Defaults to Client market. |
| `intent` | `'informational' \| 'commercial' \| 'transactional'` | Optional filter. |

**Data sources:** Semrush MCP (`semrush_keyword_overview`, `semrush_related_keywords`, `semrush_phrase_questions`, `semrush_keyword_difficulty`) + GSC MCP (`content_gaps`, `quick_wins`).

**Output:**
```jsonc
{
  "primary": { "keyword": "dim sum canggu", "volume": 480, "kd": 21, "intent": "commercial" },
  "secondaries": [
    { "keyword": "dim sum bali", "volume": 1300, "kd": 34 },
    { "keyword": "best chinese food canggu", "volume": 90, "kd": 18 }
  ],
  "questions": ["where to eat dim sum in canggu", "is dim sum halal in bali"],
  "gsc_existing": [{ "query": "dim sum canggu", "impressions": 210, "position": 18.4 }],
  "recommendation": "Target 'dim sum canggu' (low KD, existing impressions at pos 18 = quick win)."
}
```

> **Rule:** never quote Semrush "estimated traffic" as actual traffic. GSC is truth for the site's own performance; Semrush is truth for the market.

### 2.2 `optimize-meta` — **PLANNED**

Rewrite a page's title + meta description to lift CTR. Drives the ~100 portfolio meta rewrites in the action plan.

**Signature:**
```
optimize-meta(site_domain, url, primary_keyword?, current_title?, current_description?)
```

**Data sources:** GSC MCP (`ctr_opportunities`, `ctr_vs_benchmark`, `advanced_search_analytics`) to pull the page's real impressions/CTR/position.

**Output:**
```jsonc
{
  "url": "/blog/what-is-a-michelin-bib-gourmand/",
  "current": { "title": "What Is a Michelin Bib Gourmand?", "ctr": 0.0017, "impressions": 19470, "position": 8.8 },
  "proposals": [
    { "title": "What Is a Bib Gourmand? Michelin's Best-Value Award Explained", "char_count": 58, "rationale": "leads with the query, adds value promise" }
  ],
  "meta_description": "string, 140–160 chars, hook + value + soft CTA",
  "expected_ctr_uplift": "0.17% → 3–5% (benchmark for pos 8–9)"
}
```

> Prioritise pages with **high impressions + low CTR** (the portfolio's signature problem — see action_summary.md §2). All proposals ≤60 chars, en-GB.

### 2.3 `schema-markup` — **PLANNED**

Finalise the JSON-LD draft the Copywriter produced.

**Signature:**
```
schema-markup(piece, site_domain)
```

Fills `@context`, `@id`, `mainEntityOfPage`, `publisher`, and validates `@type` against content kind. Adds `FAQPage`/`HowTo` blocks where the body contains Q&A or step content (AEO lift). Returns validated JSON-LD ready to inject.

### 2.4 `internal-link` — **PLANNED**

Resolve the Copywriter's `internal_link_suggestions` to URLs that exist on the target site.

**Signature:**
```
internal-link(piece, site_domain)
```

Crawls/queries the site's sitemap to confirm each suggested anchor resolves to a live URL; replaces broken/guessed targets; proposes additional links from existing high-authority pages to the new piece. Returns the validated link set + any unresolved anchors flagged for the operator.

### 2.5 `content-cluster` — **PLANNED**

Group pieces into topic clusters and detect cannibalisation.

**Signature:**
```
content-cluster(site_domain, topic?)
```

**Data sources:** GSC `cannibalization_check` + `topic_cluster_performance` + Semrush organic keywords. Returns the pillar/supporting structure, flags pages competing for the same query (e.g. aperitif's `/blog/` vs `/news/` Michelin duplication), and recommends canonical/consolidation actions.

## 3. Coordination

Leaf agent — all dispatch via Arthur. Typical flow:

1. Brief arrives lacking keywords → Arthur runs `keyword-research`, passes result to Copywriter.
2. Copywriter returns a Piece → Arthur runs `verify-seo-checklist`.
3. On pass → Arthur dispatches SEO sub-agent's `optimize-meta`, `schema-markup`, `internal-link` to finalise.
4. Periodically → `content-cluster` sweeps the site for cannibalisation and cluster gaps.

## 4. What this skill set does NOT do

- **Write body content** — that's the Copywriter.
- **Publish** — Web Manager owns `POST /api/pieces` at `status=draft`.
- **Mutate live sites** — proposals only; site changes are human-approved (Phase 3 gate).
- **Generate images** — Imager agent (Phase 6).

# --- END ---
