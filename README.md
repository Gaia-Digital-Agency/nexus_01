# Gaia Nexus Platform — Master Operator Guide

Master control panel and developer reference for the **Gaia Nexus Platform** (`/var/www/nexus` on `gda-s01`). Gaia Nexus is the unified SEO / AEO / SEM / SMM control plane for Gaia Digital Agency's (GDA) property portfolio across Bali, Jakarta, and internationally. It is designed, built, and autonomously orchestrated from the AI command centre on **`gda-ai01`** by the **Hermes AI Agent**.

> **Live Production URL:** https://nexus.gaiada.online
> **Secrets/Credentials:** `docs/key.txt` (chmod 600) — local only, NEVER commit.
> **Last updated:** 11 June 2026

---

## 📐 0. Portfolio scope (read this first)

Earlier drafts of this guide quoted different portfolio sizes. The reconciled reality is **layered**, not a single number:

| Layer | Count | Meaning |
|---|---|---|
| Managed domains (target) | ~50 | 40 WordPress + 10 Node.js — the full portfolio ambition |
| Audited (2026-06-10) | 32 | Reports in `docs/audits/` |
| Active SEO work scope | 20 | Sites in the current work plan (`docs/seo/`) |
| Seeded in Nexus DB | 20 | Active scope sites — seeded 2026-06-11 (replaced 34 demo rows; prior data backed up) |

The UI, API, DB, and orchestration are live, and the `sites` table now holds the 20 active scope sites (identity + ad-spend where known; `seo_score`/`traffic_7d`/`roas` populate via the daily GSC/GA4 sync). The earlier 34 rows were demo/placeholder data and have been replaced. See `docs/action_summary.md`.

---

## 🚀 1. Platform Architecture

Gaia Nexus uses the **PRVTN** stack:

```
Browser ──HTTPS (SSL)──▶ Nginx (nexus.gaiada.online)
                             ├── /             → frontend/dist (React SPA, Vite build)
                             └── /api/*        → 127.0.0.1:3100 (Express Node API)
                                                      │
                                                      ▼
                                           PostgreSQL 18 (gaia_nexus DB)
                                                      ▲
                                                      │ (queries / updates)
   Orchestration Host (gda-ai01) ──[SSH/MCP]──▶ Hermes Agent
```

- **P**ostgreSQL 18 — relational master DB (`gaia_nexus`, user `nexus_user`, table `sites`).
- **R**eact 19 — single-page dashboard client.
- **V**ite 6 — production bundler (`frontend/dist`, served by Nginx).
- **T**oolchain (Node/Express) — backend API on `127.0.0.1:3100` via pm2 (`gaia-nexus-backend`).
- **N**ginx 1.24 — reverse proxy + TLS termination (dedicated `sites-available/nexus.gaiada.online` block).

---

## 📂 2. Repository Layout (`/var/www/nexus`)

```
nexus/
├── README.md                 # This master guide
├── CLAUDE.md                 # Workspace playbook + operational guardrails
├── HERMES.md                 # How the Hermes agent controls the platform
├── backend/                  # Node.js + Express API (server.js, .env [chmod 600])
├── frontend/                 # React 19 + Vite client
│   ├── src/ (main.jsx, App.jsx, index.css)
│   └── dist/                 # Vite production build (served by Nginx)
├── pipeline/                 # Python metrics collectors (collect.py stub)
└── docs/
    ├── app_design/           # Design specs, docs 01–08 (concept → UI brief)
    ├── audits/               # 32 tiered SEO audit reports + INDEX.md
    ├── seo/                  # seo-work-scope-20-sites.md — the work plan
    ├── capabilities/         # capabilities.md + the SKILLS-*.md agent specs
    ├── action_summary.md     # Consolidated audit + scope findings & action plan
    ├── key.txt               # SENSITIVE (chmod 600) — secrets
    └── keys/                 # SENSITIVE — credential store
```

### Agent skill specs (`docs/capabilities/`)

| File | Agent | Status |
|---|---|---|
| `SKILLS-copywriter.md` | Copywriter — on-page SEO content (4 personas, en-GB) | Planning draft |
| `SKILLS-seo.md` | SEO sub-agent — keyword research, meta, schema, internal links, clustering | Planning draft |
| `SKILLS-auditor.md` | Auditor — the tiered audit methodology behind `docs/audits/` | Planning draft |
| `SKILLS-local-marketing.md` | Local Marketing — GBP, paid search, social | **Planned — blocked** (Ads + GBP credentials) |

---

## 🎛️ 3. Core Dashboard Tabs

1. **📊 Global Dashboard** — portfolio KPI counters (active properties, monthly clicks, avg CTR, total ad spend); row-to-focus transitions.
2. **🌐 Property Directory** — all properties mapped to hosting topology (gda-ce01 / hostinger-wp / gda-pn01); competitor analytics (DA comparison, keyword overlap).
3. **🎯 Focus Inspector** — per-site deep dive: GSC keywords, GTM container IDs, AEO (ChatGPT/Gemini/Perplexity referrals).
4. **📝 Staging Proposals + Hermes Chat** — 4-stage recommendations board (Pending → Accepted → Rejected → Archived) + a slide-over chat to consult Hermes on rewrites.
5. **🚨 Lighthouse (PABS)** — circular gauges for Performance / Accessibility / Best Practices / SEO; red-score (<50) alerting.
6. **📖 Interactive Guide** — operator playbook for daily workflows.

---

## 🤖 4. AI Orchestration with Hermes (`gda-ai01`)

The frontend, DB, and background processes are built and maintained by **Hermes** (Claude Opus) from `gda-ai01:/opt/hermes-seo`.

- **Passwordless SSH** as `azlan` into `gda-s01` — modify code, alter schemas, run seeds, rebuild assets.
- **Remote Vite build:** `ssh gda-s01 "cd /var/www/nexus/frontend && npm run build"` — Nginx serves the new `dist/` immediately.
- **MCP data tools** (config in `gda-ai01:/opt/hermes-seo/config.yaml`): Semrush, GSC, GA4, GTM, Figma — all live. Google Ads is partial (needs developer token). See `docs/capabilities/capabilities.md`.

### Cron routines
- **Daily 03:00 GMT+8** — GSC + GA4 sweeps.
- **Last day of month 04:00 GMT+8** — Semrush competitor refresh.

---

## 🛠️ 5. Operator CLI Playbook

```bash
# Deploy frontend
ssh gda-s01 "cd /var/www/nexus/frontend && npm run build"

# Backend API
pm2 list
pm2 logs gaia-nexus-backend
pm2 restart gaia-nexus-backend

# Reload nginx (safe — isolated config)
ssh gda-s01 "sudo nginx -t && sudo systemctl reload nginx"

# Seed the database
ssh gda-s01 "psql -U nexus_user -d gaia_nexus -h 127.0.0.1 -f /tmp/seed.sql"
```

---

## 📈 6. Current SEO Programme

The portfolio has been audited and a 20-site work plan drawn up. Start here:

- **`docs/action_summary.md`** — the consolidated findings + prioritised waves (technical hygiene → meta rewrites → content → audits → local/paid/social).
- **`docs/audits/INDEX.md`** — all 32 reports + the cross-site issue rollup.
- **`docs/seo/seo-work-scope-20-sites.md`** — per-site work tables.

**Two long-lead blockers** gate the local/paid/social wave (and are worth starting now): the Google Ads **developer token** (2SV on seo@gaiada.com blocks viewing it) and **GBP API access** (approval pending). Both are detailed in `docs/action_summary.md` §5.

---

## ⚠️ 7. Key Operator Constraints
1. **Plan first, execute second** — propose and get explicit approval before code, server, or DB changes.
2. **No global restarts** — `gda-s01` is shared. Never restart PostgreSQL or shared services; only restart individual pm2 apps or reload Nginx.
3. **British English (en-GB)** — all UI copy, titles, and recommendations. See `docs/capabilities/SKILLS-copywriter.md`.
4. **Raw URLs only** — Roger's terminal strips formatted markdown links. Output plain-text URLs in reports and terminal readouts.
5. **Secrets stay out of committed docs** — `key.txt` / `keys/` only; target is GCP Secret Manager (per `docs/app_design/03_SYSTEM_ARCHITECTURE.md`).
