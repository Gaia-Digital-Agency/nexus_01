# Gaia Nexus — placeholder app (1 site)

Minimal PRVTN-stack spin-up on **gda-s01** (`/var/www/nexus`).

- **PostgreSQL** — DB `gaia_nexus`, table `sites` (1 seeded site), PG18 @ 5432
- **Node/Express** — `backend/` API on `127.0.0.1:3100` (`/api/health`, `/api/sites`, `/api/sites/:id`)
- **React + Vite** — `frontend/` dark dashboard (design brief: doc 08)
- **Python** — `pipeline/` collector stub (Hermes layer, not yet wired)
- **nginx** — serves `frontend/dist` + proxies `/api` → :3100 for `nexus.gaiada.online`

## Run
```bash
# backend
cd backend && npm install && pm2 start server.js --name gaia-nexus-backend && pm2 save
# frontend
cd ../frontend && npm install && npm run build   # outputs dist/, served by nginx
```

DB credentials live in `backend/.env` (and `key.txt` on the operator machine).
This is a placeholder for 1 site — not the full 50-site platform.
