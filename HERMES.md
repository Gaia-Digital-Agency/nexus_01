# HERMES.md — Gaia Nexus Platform Operator

This file defines how the **Hermes AI Agent** controls and interacts with the Gaia Nexus Platform. Use this as a reference for what Hermes can execute, what data sources are available, and how to run scenarios.

---

## 1. Identity & Scope

Hermes is the autonomous AI operator and orchestrator of the **Gaia Nexus Platform** — the SEO/AEO/SEM/SMM control plane for Gaia Digital Agency's portfolio of 50+ sites (40 WordPress + 10 Node.js).

**Platform stack (PRVTN):** PostgreSQL 18 · React 19 + Vite · Tailwind CSS · Node/Express · Nginx

| Component | Location | Access |
|---|---|---|
| **Live frontend** | https://nexus.gaiada.online | Browser / Hermes browser tool |
| **App code** | `gda-s01:/var/www/nexus/` | SSH via Hermes |
| **Operator workspace** | `gda-s01:/home/azlan/nexus/` | Docs, design specs, capabilities |
| **Hermes agent** | `gda-ai01:/opt/hermes-seo/` | MCP config, cron jobs, CLI |

---

## 2. Data Sources & MCP Tools

Hermes has direct tool-level access to 5 data sources. Each can be queried in real time.

| Source | Status | What Hermes Can Do |
|---|---|---|
| **Semrush** | ✅ LIVE | Keyword research, domain overview, competitors, backlinks, keyword difficulty, phrase questions, traffic sources, batch keyword analysis |
| **GSC** | ✅ LIVE | Site snapshot, content gaps, quick wins, CTR opportunities, traffic drops, content decay, cannibalisation, URL inspection, sitemap submission, batch indexing |
| **GA4** | ✅ LIVE | Custom reports (dimensions/metrics), funnel analysis, real-time data, event tracking (pageviews, purchases, signups, login), measurement protocol |
| **GTM** | ✅ LIVE | Container audit, list/create/publish tags & triggers, find misfiring conversion tags, fix conversion tag triggers |
| **Google Ads** | ⏳ Partial | Tools present in GTM MCP but needs `GADS_CLIENT_ID`/`SECRET`/`REFRESH_TOKEN` env vars to be set |
| **Figma** | ✅ LIVE | View nodes, post/reply to comments, read file resources |

**Verification (last checked: 2026-06-10):**
- GSC: Returning live data (25 clicks, 1,898 impressions in last 7 days)
- GA4: Returning live data (daily activeUsers, sessions, screenPageViews across last 7 days)

---

## 3. Infrastructure Access (SSH Fleet)

Hermes can SSH into any of these hosts to inspect logs, restart services, or modify configs:

| Host | Purpose | Status |
|---|---|---|
| `gda-s01` | Nexus app server + other services | ✅ Connected (Ubuntu 24.04) |
| `gda-ai01` | Hermes agent host | ✅ Connected |
| `gda-ce01` | GCP WordPress cluster | ✅ Connected |
| `gda-pn01` | Partner Node.js server | ❌ Needs SSH key registration |
| `hostinger-wp` | Hostinger shared WP hosting (53 sites) | ✅ Connected (high load ~58) |
| `hostinger-vps` | Hostinger VPS | ⚠ Host key changed |

**GCP Project:** `gda-viceroy` (asia-southeast1) — authenticated as `azlan@gaiada.com`

---

## 4. Common Scenarios Hermes Can Execute

### 🔍 SEO Audits
- "Run a GSC site snapshot" → returns clicks, impressions, CTR, position vs prior period
- "Find quick wins" → keywords at position 4-15 with high impressions
- "Check content decay" → pages with 3 consecutive months of traffic decline
- "Find cannibalisation" → keywords where multiple pages compete
- "CTR opportunities" → pages with high impressions but low CTR for their position
- "Content gaps" → queries at position 20+ with search demand

### 📊 Performance Reports
- "Generate a comprehensive report" → full GSC report with snapshot, alerts, recommendations
- "Check traffic drops" → pages with biggest click losses vs prior period
- "Multi-site dashboard" → health check across all GSC properties

### 🏗 App Modifications
- "Update the frontend nav" → modify `/var/www/nexus/frontend/src/App.jsx` then rebuild
- "Add a new API endpoint" → modify `/var/www/nexus/backend/server.js` then restart PM2
- "Deploy frontend changes" → `cd /var/www/nexus/frontend && npm run build`
- "Restart backend" → `pm2 restart gaia-nexus-backend`

### 📄 Proposals & Content
- Interact with the Proposals pipeline (Pending → Accepted → Rejected → Archived)
- Generate title/meta description rewrites through the Hermes Chat interface

### 🔧 GTM Operations
- "Audit the container" → health score 0-100 with broken/duplicate tags
- "Find misfiring conversion tags" → tags firing on All Pages instead of specific events
- "Fix conversion tag trigger" → replace broad trigger with custom event
- "Create a new trigger/tag" → full tag management

---

## 5. Running Scenarios

To run a scenario, simply tell Hermes what you want. Examples:

> "Show me the top 10 organic keywords for gaiada.com with position and volume"
> → Uses Semrush domain organic keywords tool

> "Give me the GSC site snapshot for the last 28 days with comparison"
> → Uses GSC site_snapshot tool

> "Check for any content decay on the site"
> → Uses GSC content_decay tool

> "Find pages with CTR opportunities on my site"
> → Uses GSC ctr_opportunities tool

> "Audit the GTM container and tell me if anything is broken"
> → Uses GTM container audit tools

> "Show me GA4 active users by day for the last week"
> → Uses GA4 run_report tool

---

## 6. Limitations & Blockers

| Limitation | Detail |
|---|---|
| **Google Ads** | Need `GADS_CLIENT_ID`, `GADS_CLIENT_SECRET`, `GADS_REFRESH_TOKEN` in gda-ai01 config.yaml |
| **gda-pn01** | SSH access broken — needs SSH key registration |
| **Nexus app** | Currently a scaffold with 1 placeholder site row in DB; needs data population to scale to 50 sites |
| **Payload CMS** | Not yet deployed — planned for full architecture |
| **Secrets** | Currently in flat files (`key.txt`) — should migrate to GCP Secret Manager |

---

## 7. Quick Reference

```bash
# Restart backend
pm2 restart gaia-nexus-backend

# Rebuild frontend
cd /var/www/nexus/frontend && npm run build

# Check PM2 status
pm2 list

# Reload nginx (safe — isolated config)
sudo nginx -t && sudo systemctl reload nginx

# Hermes MCP status (on gda-ai01)
cd /opt/hermes-seo && source hermes-agent/venv/bin/activate && python -m hermes_cli.main mcp list
```

> **Last updated:** 2026-06-10 by Hermes
