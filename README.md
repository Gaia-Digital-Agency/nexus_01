# Gaia Nexus — Scaffold Guide (`README-SCAFFOLD.md`)

A complete, reproducible reference for the **Gaia Nexus placeholder app** — the minimal **PRVTN**
stack currently running for **1 site** on `gda-s01`, and how to rebuild, run, and extend it toward the
full 50-site platform described in `app_design/`.

> **Live now:** https://nexus.gaiada.online · app dir `gda-s01:/var/www/nexus`
> **Secrets/creds:** `key.txt` (chmod 600) — never commit. This file contains **no secrets**.

---

## 1. What this scaffold is

A deliberately minimal slice of the architecture in `app_design/03–05`, proving the full request path
end-to-end for one seeded site:

```
Browser ──HTTPS──▶ nginx (nexus.gaiada.online)
                     ├── /            → frontend/dist  (React SPA, Vite build)
                     └── /api/*        → 127.0.0.1:3100 (Express)
                                              │
                                              ▼
                                   PostgreSQL 18 (gaia_nexus.sites)
        pipeline/ (Python)  ── stub for the Hermes collectors (not yet wired)
```

**PRVTN mapping:** **P**ostgreSQL · Python (pipeline stub) · **R**eact · **V**ite · **N**ode (Express).
Payload CMS and the React 19 + Vite **SSR** of the full spec are intentionally deferred — this is a CSR
placeholder to "spin it up".

---

## 2. Directory layout (`/var/www/nexus`)

```
nexus/
├── README.md                 # short in-repo readme
├── backend/
│   ├── package.json          # express, pg, cors, dotenv
│   ├── server.js             # API (ESM)
│   ├── .env                  # DB creds + PORT (chmod 600, NOT in git)
│   └── node_modules/
├── frontend/
│   ├── package.json          # react 19, react-dom, vite 6, @vitejs/plugin-react
│   ├── vite.config.js        # dev proxy /api → :3100, build → dist/
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx           # dashboard: KPIs + sites table (fetches /api/sites)
│   │   └── index.css         # design tokens from app_design/08
│   ├── dist/                 # built static assets (served by nginx)
│   └── node_modules/
└── pipeline/
    ├── collect.py            # Hermes collector stub
    └── requirements.txt
```

---

## 3. Prerequisites (already present on gda-s01)

- **Node** v20.20.2 + npm 10 + **pm2** (system, per-user daemon under `azlan`)
- **PostgreSQL 18** live on port **5432** (cluster `18/main`; note `16/main` exists on 5433, down)
- **Python** 3.12, **nginx** 1.24, **certbot**

---

## 4. Rebuild from scratch

### 4.1 Database (PostgreSQL 18 @ 5432)
Run as a script (avoids SSH quoting issues). Generates a random password, idempotent on the role:

```bash
PGPASS=$(openssl rand -hex 16)
# role (create or reset)
if sudo -u postgres psql -p 5432 -tAc "SELECT 1 FROM pg_roles WHERE rolname='nexus_user'" | grep -q 1; then
  sudo -u postgres psql -p 5432 -c "ALTER ROLE nexus_user LOGIN PASSWORD '$PGPASS';"
else
  sudo -u postgres psql -p 5432 -c "CREATE ROLE nexus_user LOGIN PASSWORD '$PGPASS';"
fi
# database (owned by nexus_user)
sudo -u postgres psql -p 5432 -tAc "SELECT 1 FROM pg_database WHERE datname='gaia_nexus'" | grep -q 1 \
  || sudo -u postgres createdb -p 5432 -O nexus_user gaia_nexus
```

Schema + seed:
```sql
-- psql -p 5432 -d gaia_nexus
CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  url VARCHAR(512) NOT NULL,
  type VARCHAR(20) NOT NULL DEFAULT 'wordpress',     -- wordpress | nodejs
  server_ip VARCHAR(45),
  status VARCHAR(20) NOT NULL DEFAULT 'active',       -- active | inactive
  seo_score INT, traffic_7d INT, ad_spend NUMERIC(12,2), roas NUMERIC(6,2),
  created_at TIMESTAMP DEFAULT now()
);
ALTER TABLE sites OWNER TO nexus_user;
INSERT INTO sites (name,url,type,server_ip,status,seo_score,traffic_7d,ad_spend,roas)
SELECT 'Nexus Placeholder Site','https://nexus.gaiada.online','wordpress','gda-s01','active',72,1240,350.00,3.80
WHERE NOT EXISTS (SELECT 1 FROM sites);
```

### 4.2 Backend `.env` (`backend/.env`, chmod 600)
```ini
PORT=3100
PGHOST=127.0.0.1
PGPORT=5432
PGUSER=nexus_user
PGPASSWORD=<generated>
PGDATABASE=gaia_nexus
DATABASE_URL=postgresql://nexus_user:<generated>@127.0.0.1:5432/gaia_nexus
```

### 4.3 Backend
```bash
cd /var/www/nexus/backend
npm install --omit=dev --no-fund --no-audit      # express, pg, cors, dotenv
pm2 start server.js --name gaia-nexus-backend
pm2 save
curl -s http://127.0.0.1:3100/api/health         # {"status":"ok","db":"up"}
```
`server.js` binds to **127.0.0.1** (nginx proxies; never expose 3100 publicly).

### 4.4 Frontend
```bash
cd /var/www/nexus/frontend
npm install --no-fund --no-audit                 # react 19 + vite 6
npm run build                                    # → dist/  (~200 KB)
```

### 4.5 nginx + SSL
Create `/etc/nginx/sites-available/nexus.gaiada.online` (then symlink into `sites-enabled/`):
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name nexus.gaiada.online;
    root /var/www/nexus/frontend/dist;
    index index.html;
    location /api/ {
        proxy_pass http://127.0.0.1:3100;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    location / { try_files $uri $uri/ /index.html; }   # SPA fallback
}
```
```bash
sudo nginx -t && sudo systemctl reload nginx
# HTTPS (adds the 443 block + 80→443 redirect; touches only this vhost):
sudo certbot --nginx -d nexus.gaiada.online --non-interactive --agree-tos -m ai@gaiada.com --redirect
```

---

## 5. API reference (current)

| Method | Path | Returns |
|---|---|---|
| GET | `/api/health` | `{ status, db }` — DB connectivity check |
| GET | `/api/sites` | array of site rows |
| GET | `/api/sites/:id` | one site row (404 if missing) |

---

## 6. Local development

```bash
# backend (hot: use `node --watch server.js` or nodemon)
cd backend && node server.js
# frontend dev server with API proxy to :3100
cd frontend && npm run dev          # http://localhost:5173  (proxy /api → 127.0.0.1:3100)
```
Production serves the built `dist/` via nginx; dev uses Vite's server + proxy (see `vite.config.js`).

---

## 7. Redeploy / operations

```bash
# update frontend
cd /var/www/nexus/frontend && git pull 2>/dev/null; npm install; npm run build   # nginx serves new dist immediately
# update backend
cd /var/www/nexus/backend && npm install; pm2 restart gaia-nexus-backend
pm2 logs gaia-nexus-backend          # tail logs
pm2 status                           # confirm 'online'
```
**Multi-server caution (gda-s01):** other apps run on 3006/3007/3010/3080/8081. Use free ports only,
keep the dedicated nginx vhost, reload (never restart) nginx, and never restart shared PostgreSQL.

---

## 8. Design system (from `app_design/08`, encoded in `frontend/src/index.css`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0F172A` | page background |
| `--surface` | `#1E293B` | cards/panels |
| `--accent` | `#6366F1` | CTAs, active nav |
| `--success` | `#10B981` | ok/approved |
| `--warning` | `#F59E0B` | pending |
| `--danger` | `#EF4444` | error/rejected |
| `--text` / `--muted` | `#F8FAFC` / `#94A3B8` | text |

Font: Inter. Layout: left sidebar + main; KPI grid; data-dense tables.

---

## 9. Extending toward the full platform

Build order that keeps the scaffold working at every step:

1. **Schema** — add the rest of `app_design/04`: `metrics_snapshots` (JSONB per source), `proposals`,
   `deployments`, `users`, `audit_logs`. Add migrations (e.g. `db/migrations/`, or Drizzle/Payload).
2. **Auth + RBAC** — `/api/auth/*`, JWT, roles admin/reviewer/viewer (middleware).
3. **Routes/pages** — implement the full sitemap in `app_design/08` (dashboard, analytics incl.
   **AEO** + **Social**, proposals, deployments, reports, settings incl. **Integrations source-health**).
4. **Data pipeline** — flesh out `pipeline/` into the Hermes collectors (Semrush/GA4/GSC/Ads/GTM) that
   write `metrics_snapshots`; the MCP servers already configured on `gda-ai01` are the dev counterpart.
5. **Payload CMS + Vite SSR** — swap the CSR placeholder for the spec's headless-CMS + SSR setup.
6. **Cloud SQL + Secret Manager** — migrate the local DB to managed Cloud SQL and move secrets out of
   `.env`/`key.txt` into GCP Secret Manager (`app_design/03`, `06`).

This placeholder is **1 site**; the production target is 50. Keep a canonical site-ID model and
per-source `last_sync` from the start.

---

## 10. AI Orchestration with Hermes (gda-ai01)

This application is built, managed, and monitored autonomously by **Hermes**, an AI agent running on the orchestration host **`gda-ai01`**.

### How Hermes Orchestrates the Platform
- **Orchestration Host:** `gda-ai01` (Installation root: `/opt/hermes/`)
- **Remote Operations:** Hermes is configured with secure, passwordless SSH access to `gda-s01` as the `azlan` user, allowing it to execute builds, manage services (PM2), and run database queries directly.
- **Data Integrations:** Hermes utilizes the Model Context Protocol (MCP) to pull live marketing and performance metrics from 5 unified data sources (Semrush, Google Search Console, Google Analytics 4, Google Tag Manager, Google Ads) connected on `gda-ai01`.
- **System Maintenance:** Hermes monitors application health, schedules cron jobs for metrics collection, and handles automated deployments.

### Developer/Operator Guidelines for Hermes
When cooperating with Hermes or triggering tasks from the orchestration host:
1. **Always plan first:** Before running deployment scripts, database updates, or modifications, Hermes is instructed to propose a comprehensive plan first and wait for approval.
2. **Platform Constraints:** Ensure all application components remain fully isolated on `gda-s01` to avoid interrupting other active services. Never restart postgresql or shared services globally.

---

## 11. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| HTTPS shows another site ("fallback") | No 443 vhost yet → run certbot (§4.5). 80-only configs fall through to the default 443 server. |
| `/api/*` returns nginx 404 right after reload | Reload race — retry; confirm the `/api/` location proxies to `:3100`. |
| `db: down` in `/api/health` | Check `backend/.env` creds; test `PGPASSWORD=… psql -h 127.0.0.1 -U nexus_user -d gaia_nexus -c 'select 1'`. |
| pm2 app missing after reboot | `pm2 save` + `pm2 startup` (per-user). |
| Lost DB password | Reset: `ALTER ROLE nexus_user LOGIN PASSWORD '…'` and update `backend/.env` + `key.txt`. |

---

*Companion docs: `CLAUDE.md` (workspace context), `capabilities.md` (MCP + strategy),
`app_design/` (full spec), `key.txt` (secrets — local only).*
