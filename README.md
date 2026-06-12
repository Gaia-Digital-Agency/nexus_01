# Gaia Nexus Platform — Master Operator Guide

Master control panel and developer reference for the **Gaia Nexus Platform** (`/var/www/nexus` on `gda-s01`). Gaia Nexus is the unified SEO / AEO / SEM / SMM control plane for Gaia Digital Agency's (GDA) property portfolio across Bali, Jakarta, and internationally. It is designed, built, and autonomously orchestrated from the AI command centre on **`gda-ai01`** by the **Hermes AI Agent**.

> **Live Production URL:** https://nexus.gaiada.online
> **Secrets/Credentials:** `docs/keys/` + `docs/key.txt` (chmod 600) — local only, NEVER commit.
> **Last updated:** 12 June 2026

---

## 📐 0. Portfolio scope (read this first)

The portfolio is **layered**, not a single number:

| Layer | Count | Meaning |
|---|---|---|
| Managed domains (target) | ~50 | 40 WordPress + 10 Node.js — the full portfolio ambition |
| **Live sites audited (2026-06-11)** | **63** | **Wave 0 complete** — every live site has BOTH a technical audit (`docs/audits/`) and an SEO analysis (`docs/seo/`). Spread: gda-ce01 (17) · gda-pn01 (5) · hostinger (41) |
| Active SEO work scope | ~7 earners | Sites with meaningful organic traffic — where Wave 2 effort concentrates |
| Seeded in Nexus DB | 63 | The `sites` table holds all 63 live sites (seeded 2026-06-11). `seo_score` is populated for the 54 active sites from Semrush organic visibility (`us` db); `traffic_7d`/`roas` remain **not yet populated** — they await the GSC/GA4/Ads pipeline (`pipeline/collect.py` is still a stub). |

Diagnosis (Wave 0) is done for all 63 live sites, and the DB now mirrors the full portfolio with Semrush-derived SEO scores. The one remaining data-layer item is the live pipeline that populates `traffic_7d` (GSC/GA4) and `roas` (Ads) — blocked on Google OAuth. See `docs/plan/action_summary.md` and `docs/plan/findings.md`.

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

- **P**ostgreSQL 18 — relational master DB (`gaia_nexus`, user `nexus_user`; tables `sites`, `chat_history`, `audit_runs` — the latter two auto-created on backend boot via `backend/init-db.js`).
- **R**eact 19 — single-page dashboard client (SPA, not SSR).
- **V**ite 6 — production bundler (`frontend/dist`, served by Nginx).
- **T**oolchain (Node/Express) — backend API on `127.0.0.1:3100` via pm2 (`gaia-nexus-backend`, entry `backend/server.js`).
- **N**ginx 1.24 — reverse proxy + TLS termination (dedicated `sites-available/nexus.gaiada.online` block).

---

## 📂 2. Repository Layout (`/var/www/nexus` — git repo)

```
nexus/
├── README.md                 # This master guide
├── CLAUDE.md                 # Workspace playbook + operational guardrails
├── HERMES.md                 # How the Hermes agent controls the platform
├── backend/                  # Node.js + Express API (server.js + chat.js, audit.js, pdf.js, init-db.js; .env [chmod 600])
├── frontend/                 # React 19 + Vite 6 SPA client
│   ├── src/ (main.jsx, App.jsx, index.css)
│   └── dist/                 # Vite production build (served by Nginx)
├── pipeline/                 # Python metrics collectors (collect.py — stub)
└── docs/
    ├── app_design/           # Design specs, docs 01–08 (concept → UI brief)
    ├── audits/               # 63 technical audit reports (one per live site)
    ├── seo/                  # 63 SEO analyses (one per live site)
    ├── capabilities/         # capabilities.md + the SKILLS-*.md agent specs
    ├── plan/                 # action_summary.md · findings.md · todo.md (the 4-wave plan)
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
6. **🧾 Audit** — compile the portfolio report (Technical Audit + SEO + Plan) from `docs/audits`, `docs/seo`, `docs/plan`. The **Run Audit** button is rate-limited to once per 24h (a full live pass takes ~2h); each run is versioned in `audit_runs`, and only the latest is downloadable as **Markdown + PDF** (server-side PDF via `pdfkit`).
7. **💬 Chat History** — log of every AI Assistant question + answer; **auto-clears after 30 days**.
8. **📖 Interactive Guide** — operator playbook for daily workflows.

### Floating AI Assistant (all pages)
A "✦ AI Chat" button (bottom-right, on every tab) opens **Nexus Assistant** — a **read-only, info-only** Q&A over the app/DB data (sites, SEO scores, portfolio aggregates), powered by **Gemini** (`gemini-2.5-flash`). Questions are capped at **1550 characters**, answers at **150 characters**; it refuses any request to take an action (deploy/change/run). Key in `backend/.env` as `GEMINI_API_KEY` (+ optional `GEMINI_MODEL`).

### Feature API endpoints
```
POST   /api/chat                       -- Ask the assistant (info-only; <=1550 in / <=150 out)
GET    /api/chat/history               -- Chat log (purges rows older than 30 days)
GET    /api/audit/status               -- Last run, cooldown, whether a report is available
POST   /api/audit/run                  -- Compile a new report (429 if run within last 24h)
GET    /api/audit/download/:kind.:fmt  -- kind = audit|seo|plan, fmt = md|pdf (latest run)
```

---

## 🤖 4. AI Orchestration with Hermes (`gda-ai01`)

The frontend, DB, and background processes are built and maintained by **Hermes** (Claude Opus) from `gda-ai01:/opt/hermes`.

- **Passwordless SSH** as `azlan` into `gda-s01` — modify code, alter schemas, run seeds, rebuild assets.
- **Remote Vite build:** `ssh gda-s01 "cd /var/www/nexus/frontend && npm run build"` — Nginx serves the new `dist/` immediately.
- **MCP data tools** (config in `gda-ai01:/opt/hermes/config.yaml`): Semrush, GSC, GA4 live; GTM/Google Ads pending OAuth + developer token. See `docs/capabilities/capabilities.md`.

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

## 📈 6. Current SEO Programme — the 4-wave model

Wave 0 (diagnosis) is **complete** for all 63 live sites. Start here:

- **`docs/plan/action_summary.md`** — the summary layer: wave model + status.
- **`docs/plan/findings.md`** — consolidated cross-site technical + SEO findings.
- **`docs/plan/todo.md`** — the full prioritised backlog (regenerated from the 63 docs).
- Per-site detail: `docs/audits/<domain>.md` (technical) + `docs/seo/<domain>.md` (search).

| Wave | Scope | Status |
|---|---|---|
| **0 · Audit production** | 63 technical audits + 63 SEO analyses + findings | ✅ **Complete** |
| **1 · Technical scope of work** | execute the technical fixes (HSTS portfolio-wide, shared WP auth keys, `wp_` prefixes, debug flags, dual-plugin cleanup) | ⏳ not started |
| **2 · SEO scope of work** | meta rewrites + content, focused on the ~7 earners | ⏳ not started |
| **3 · GBP / Ads / social** | GBP + ad campaigns + social | ⛔ blocked (Google 2SV + GBP API) |

**Two long-lead blockers** gate Wave 3 (worth starting now): the Google Ads **developer token** (2SV on seo@gaiada.com blocks viewing it) and **GBP API access** (approval pending). Both detailed in `docs/plan/action_summary.md`.

---

## ⚠️ 7. Key Operator Constraints
1. **Plan first, execute second** — propose and get explicit approval before code, server, or DB changes.
2. **No global restarts** — `gda-s01` is shared. Never restart PostgreSQL or shared services; only restart individual pm2 apps or reload Nginx.
3. **British English (en-GB)** — all UI copy, titles, and recommendations. See `docs/capabilities/SKILLS-copywriter.md`.
4. **Raw URLs only** — Roger's terminal strips formatted markdown links. Output plain-text URLs in reports and terminal readouts.
5. **Secrets stay out of committed docs** — `key.txt` / `keys/` only; target is GCP Secret Manager (per `docs/app_design/03_SYSTEM_ARCHITECTURE.md`).
