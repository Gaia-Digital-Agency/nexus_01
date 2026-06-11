# CLAUDE.md — Gaia Nexus Platform workspace

Context for Claude Code / Hermes working in **`/var/www/nexus`** on `gda-s01`. This dir **is a git repo**
(the deployed platform). The AI command centre that builds and orchestrates it is `gda-ai01`.

## What Gaia Nexus is
AI-powered control plane for a portfolio of ~50 managed domains (40 WordPress + 10 Node.js) on GCP, to
automate SEO/AEO/SEM/SMM. **63 live sites are now audited — Wave 0 (diagnosis) is complete.** The AI
layer is **Hermes** (Claude Opus) running on a dedicated VM.
Stack = **PRVTN**: **P**ostgreSQL 18 · **R**eact 19 · **V**ite 6 (SPA) · **T**oolchain (Node/Express,
`backend/server.js`) · **N**ginx 1.24. (No Payload CMS, no SSR.)

## Repo layout (`/var/www/nexus`)
- `README.md` — master operator guide (architecture, dashboard tabs, CLI playbook).
- `HERMES.md` — how the Hermes agent controls the platform.
- `backend/` — Express API (`server.js`, `.env` chmod 600); pm2 app `gaia-nexus-backend` on `127.0.0.1:3100`.
- `frontend/` — React 19 + Vite 6 SPA; build → `dist/` (served by Nginx).
- `pipeline/` — Python metrics collector (`collect.py` — **stub**; GSC/GA4 sync not yet live).
- `docs/app_design/` — the spec (docs 01–08): concept → system/app architecture → UI brief.
- `docs/audits/` (63) + `docs/seo/` (63) — per-site technical audit + SEO analysis (Wave 0 output).
- `docs/plan/` — `action_summary.md` (summary) · `findings.md` (consolidated) · `todo.md` (backlog).
  **4-wave model:** 0 audit ✅ · 1 technical ⏳ · 2 SEO ⏳ · 3 GBP/Ads/social ⛔ (Google 2SV + GBP API).
- `docs/capabilities/` — `capabilities.md` + the `SKILLS-*.md` agent specs.
- `docs/key.txt` + `docs/keys/` — **SENSITIVE (chmod 600)**: Semrush/Discord/Anthropic keys, Google
  login, DB creds, OAuth setup checklist, infra map. Do NOT commit (gitignored).

## Infrastructure (GCP project `gda-viceroy`, region asia-southeast1)
SSH hosts (all passwordless-sudo as user **azlan**): `gda-ce01`, `gda-pn01`, `gda-s01`, `gda-ai01`,
`hostinger-wp`, `hostinger-vps`. Local gcloud is authed as `azlan@gaiada.com` and **has** compute
scopes; the VMs' own service accounts do **not** (can't resize/detach disks from on-box).

### Hermes agent — `gda-ai01`
- Installed at **`/opt/hermes`** (`HERMES_HOME`), relocated from `~/.hermes` (compat symlink left behind).
- Runs via **user systemd**: `systemctl --user … hermes-gateway.service` (needs
  `export XDG_RUNTIME_DIR=/run/user/$(id -u)` over SSH). Discord-connected gateway.
- Python venv: `/opt/hermes/hermes-agent/venv`. MCP servers configured in `/opt/hermes/config.yaml`
  under `mcp_servers:`. CLI: `python -m hermes_cli.main mcp {list,add,test,login}`.
- Caution: a pre-existing `python-dotenv` parse warning around `.env` line ~482 (not ours).

### Nexus app — `gda-s01` (MULTI-SERVER — isolate everything, never restart shared services)
- Dir `/var/www/nexus` → `backend/` (Express), `frontend/` (Vite/React SPA, build → `dist/`),
  `pipeline/` (Python stub), `docs/`.
- **Live: https://nexus.gaiada.online** (certbot cert → 2026-09-01, HTTP→HTTPS redirect).
- Backend on `127.0.0.1:3100` via **pm2** app `gaia-nexus-backend` (`pm2 restart gaia-nexus-backend`).
- DB: **PostgreSQL 18** @ `127.0.0.1:5432`, database `gaia_nexus`, user `nexus_user`, table `sites`.
  Holds all **63 live sites** (seeded 2026-06-11); `seo_score` populated for the 54 active sites
  (Semrush organic-visibility index, `us` db). `traffic_7d`/`roas` **not yet populated** — await
  GSC/GA4 + Ads; `pipeline/collect.py` is still a stub. Creds in `backend/.env` and `key.txt`.
- Other apps on this host use ports 3006/3007/3010/3080/8081 — pick free ports only; nginx config is
  the dedicated `sites-available/nexus.gaiada.online` block.

## MCP status
| MCP | Where | State |
|---|---|---|
| Semrush | Hermes config.yaml | ✅ live (`semrush-mcp`, 19 tools, real key ~2M units) |
| GSC | Hermes config.yaml | ✅ enabled (`suganthan-gsc-mcp`, 20 tools) — needs OAuth for data |
| GA4 | Hermes config.yaml | ✅ enabled (`mcp-google-analytics`, 18 tools) — needs OAuth for data |
| Google Ads | — | ⏳ not installed — server hangs without OAuth + developer token |
| GTM | — | ⏳ not installed — server hangs without OAuth |
| filesystem | local Mac Claude Code | ✅ connected |

**Open blocker → next step:** a Google **OAuth client (client_id/secret)** for `seo@gaiada.com`
(checklist in `key.txt`) unblocks GSC/GA4 live data and lets Ads + GTM install. Ads also needs a
**developer token** (Ads API Center, can take days). When all 4 are installed, refresh `capabilities.md`.

## Conventions & cautions
- Treat `key.txt` as secret; keep values out of committed docs (CLAUDE.md, capabilities.md).
- gda-s01 is shared — isolate (dedicated DB/user, free ports, own nginx block); reload nginx is OK,
  never restart Postgres or touch other vhosts.
- Moving/relocating live services: stop → move (prefer `mv`/rename on same fs) → patch absolute paths
  (venv shebangs, systemd unit) → restart → verify. Avoid `pkill -f <pattern>` when the pattern also
  matches your own shell command (it will kill your SSH session).
- Production secrets should ultimately live in **GCP Secret Manager** (per `app_design/03`), not flat files.
