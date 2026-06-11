# Auditor — SKILLS.md

> **Skill specification for the SEO Auditor agent that produces the tiered site audits in `docs/audits/`.**
> Codifies the methodology actually used to generate the 32-report audit set on 2026-06-10, so future audits are consistent and repeatable.
> Target instance: `.openclaw-seo/workspace-auditor/` on `gda-ai01` (planning).
> Status: **planning draft** (reverse-engineered from the live 2026-06-10 audits). Created 11 June 2026. Companion to SKILLS-seo.md.

## 1. What this agent does

The Auditor performs an end-to-end SEO audit of a single site by triangulating **live HTTP inspection + SSH server inspection + GSC MCP + Semrush MCP**, and emits a Markdown report into `docs/audits/<site>-seo-audit.md`. Every numeric claim is sourced; nothing is asserted from one tool alone.

**Identity sentence:** _"I'm the Auditor — I produce the evidence base the SEO plan is built on."_

## 2. The three tiers

Audit depth is chosen from the site's footprint and access level.

| Tier | When | Sections | Typical length |
|---|---|---|---|
| 🔴 Deep | High keyword/traffic footprint or strategic site; full SSH access | All 15 (see §3) | 240–450 lines |
| 🟡 Standard | Moderate footprint | Overview, config, plugins, headline GSC/Semrush, issues, recommendations | 30–60 lines |
| 🟢 Lite | Low footprint or view-only access | Overview, technical hygiene snapshot, top issues | 30–80 lines |

## 3. Deep-audit template (15 sections)

The canonical structure (from the aperitif/blossomsteakhouse reports):

1. **Site Overview** — Semrush rank/keywords/traffic, GSC 28-day totals, sitemap page count, age, theme, CMS, server, SSL.
2. **WordPress Configuration** — DB name, home/site URL, PHP version, memory, permalinks.
3. **Active Plugins** — full list with versions; flag conflicts (multiple SEO plugins, dual caching) and outdated/inactive premium plugins.
4. **Homepage SEO Health** — title/H1/OG-title alignment, meta description, canonical, schema types, robots meta, Twitter card.
5. **robots.txt Analysis** — disallows, crawl-delay, sitemap reference; flag missing/over-restrictive rules.
6. **XML Sitemap Analysis** — per-sitemap URL counts + last-modified; flag stale/404/IP-based sitemaps; check GSC submission.
7. **.htaccess / Technical Infrastructure** — caching, compression, WebP, response headers.
8. **Theme & Content Architecture** — theme, framework, template files, trackers loaded (GTM/GA4/Clarity/etc.).
9. **GSC Analysis (28-day)** — period comparison (clicks/impressions/CTR/position), top pages, top queries, **critical CTR issues** (high-impression low-CTR pages with estimated lost clicks).
10. **Semrush Keyword Analysis** — top keywords, cannibalisation risk, competitors with traffic gap.
11. **Critical Issues** — prioritised P1–P4 with impact + fix.
12. **GSC Content-Gap Analysis** — queries with demand but position >20.
13. **What's Working Well** — preserve-list.
14. **Recommendations** — immediate / short-term / medium-term.
15. **Meta Title Proposals + Scorecard + Quick-Win Tracker** — ready-to-ship title rewrites; 7-category scorecard /10; effort×impact table.

## 4. Skill

### `audit-site` — **PLANNED**

**Signature:**
```
audit-site(site_domain, tier?, server?)
```

| Param | Type | Notes |
|---|---|---|
| `site_domain` | string | Required. |
| `tier` | `'deep' \| 'standard' \| 'lite'` | Optional. Auto-selected from footprint + access if omitted. |
| `server` | `'gda-ce01' \| 'hostinger-wp' \| ...` | Optional. Determines SSH access (full vs view-only). |

**Data sources:** live HTTP (curl/headless), SSH (wp-config, plugins, .htaccess, robots/sitemap), GSC MCP (`site_snapshot`, `quick_wins`, `ctr_opportunities`, `content_gaps`, `traffic_drops`), Semrush MCP (`domain_overview`, `domain_organic_keywords`, `competitors`).

**Output:** Markdown report written to `docs/audits/<site>-seo-audit.md`, plus a row appended to `docs/audits/INDEX.md` (site, server, tier, file, size) and the cross-site issue rollup updated.

**Rules:**
- Every metric attributed to its source; never present Semrush estimates as actual traffic.
- en-GB spelling in all prose.
- View-only servers (hostinger-wp): skip SSH-write checks; note reduced access in the report.

## 5. Cross-site rollup (INDEX.md)

After each audit, maintain `docs/audits/INDEX.md`: the tier tables and the **Critical Issues Found Across Portfolio** matrix (missing robots.txt, 404 sitemaps, IP-based sitemaps, GSC-unverified, CTR collapse, plugin conflicts, shared auth keys). This rollup is the direct input to `action_summary.md`.

## 6. What this skill set does NOT do

- **Fix issues** — the Auditor diagnoses; remediation is proposed and human-approved.
- **Write content** — Copywriter.
- **Rank-track continuously** — that's the daily/weekly GSC cadence in capabilities.md, not a per-audit task.

# --- END ---
