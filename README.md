# Gaia Nexus Platform — Master Operator Guide

Welcome to the master control panel and developer reference for the **Gaia Nexus Platform** (located at `/var/www/nexus` on `gda-s01`). This platform provides a unified SaaS-grade interface enabling search engine, conversational search (AEO), paid marketing analytics, and on-page SEO optimization across Gaia Digital Agency's (GDA) portfolio of **34 luxury properties** in Bali, Jakarta, and internationally.

The platform is designed, built, and autonomously orchestrated from the AI command center on **`gda-ai01`** using the **Hermes AI Agent**.

> **Live Production URL:** https://nexus.gaiada.online
> **Secrets/Credentials:** `key.txt` (chmod 600) — local only, NEVER commit.

---

## 🚀 1. Platform Architecture

The Gaia Nexus Platform uses the **PRVTN** stack to deliver extreme speed, responsive visualization, and seamless AI orchestration:

```
Browser ──HTTPS (SSL)──▶ Nginx (nexus.gaiada.online)
                             ├── /             → frontend/dist (React SPA, Vite Build)
                             └── /api/*        → 127.0.0.1:3100 (Express Node API)
                                                      │
                                                      ▼
                                           PostgreSQL 18 (gaia_nexus DB)
                                                      ▲
                                                      │ (Database Queries / Updates)
   Orchestration Host (gda-ai01) ──[SSH/MCP]──▶ Hermes Agent
```

*   **P**ostgreSQL 18 — Active, relational master database mapping all 34 real-world properties and marketing states.
*   **R**eact 19 — High-performance, single-page application (SPA) client interface.
*   **V**ite 6 — Extreme-speed bundler compiling static assets for production deployment.
*   **T**oolchain (Node/Express) — Robust backend API handling secure database operations and platform state.
*   **N**ginx 1.24 — Acts as the front-line reverse proxy and TLS/SSL termination point.

---

## 📂 2. Repository Layout (`/var/www/nexus`)

```
nexus/
├── README.md                 # This Master Guide and System Reference
├── README-SCAFFOLD.md        # Technical guide for local rebuilds / DB setup
├── CLAUDE.md                 # Workspace playbook and operational guidelines
├── backend/                  # Node.js + Express API
│   ├── server.js             # ESM Express API entrypoint
│   ├── package.json          # Dependencies: pg, cors, dotenv, express
│   └── .env                  # Port, database URL, credentials (chmod 600, untracked)
├── frontend/                 # React 19 Client Dashboard
│   ├── index.html            # Main HTML wrapper
│   ├── vite.config.js        # Vite compilation rules and dev API proxy to Port 3100
│   ├── package.json          # Dependencies: react 19, tailwind css, lucide-react
│   ├── src/
│   │   ├── main.jsx          # DOM rendering entrypoint
│   │   ├── App.jsx           # Core SaaS UI Layout (All interactive tabs)
│   │   └── index.css         # Styling framework, responsive queries, circular PABS gauges
│   └── dist/                 # Vite production build (served directly by Nginx)
├── docs/                     # Centralized Documentation
│   ├── app_design/           # Design briefs, Concept plans, and System specs (Docs 01-09)
│   └── capabilities/
│       ├── capabilities.md   # Live deployment status and MCP credentials audit
│       └── SKILLS-copywriter.md # GDA British English (en-GB) and copywriting standards
└── pipeline/                 # Automated Collectors & AI Integrations
    ├── collect.py            # Metrics collectors stub
    └── requirements.txt
```

---

## 🎛️ 3. Core Workspace Tabs & Features

The live application features an elegant, dark-mode, mobile-responsive dashboard containing six dedicated control centers:

### 📊 A. Global Dashboard
Provides a consolidated high-level portfolio overview of GDA's properties.
- **Unified KPI Counters**: Live metrics representing cumulative Active Properties, Total Monthly Clicks, Average CTR, and Total Paid Ads Spend across the entire agency footprint.
- **Row-to-Focus Transitions**: Clicking on any key property name automatically transitions the view to the **Focus** tab and pre-selects the corresponding property.

### 🌐 B. Global Property Directory
Displays all **34 production properties** mapped directly to their hosting topology:
- **Server Tracking**: Filterable by Node Groups: `gda-ce01` (GCP WordPress Cluster), `hostinger-wp` (Hostinger Shared), and `gda-pn01` (Partner NodeJS).
- **Competitor Analytics**: Displays high-level organic search competitors, domain authority (DA) comparison, keyword overlap counts, and GDA's current competitive DA lead.

### 🎯 C. Dynamic Focus Inspector
A site-by-site, deep-dive panel enabling granular analysis of individual properties:
- **Property Selector**: Dropdown to select any of GDA's 34 properties.
- **SEO & Search Console**: Loads top-performing Google Search Console (GSC) organic keywords, query volumes, average impressions, and CTR metrics.
- **Tracking & Tagging**: Displays active Google Tag Manager (GTM) Container IDs and specific setup verification (e.g. ecommerce vs generic tags).
- **AEO (Conversational Search)**: Visualizes incoming conversational search and AI reference referrals (ChatGPT, Gemini, Perplexity) categorized by traffic source.

### 📝 D. Staging Proposals & Chat Drawer
- **Recommendations Pipeline**: A structured 4-lifecycle recommendations board (Pending, Accepted, Rejected, Archived) enabling operators to accept or dismiss on-page SEO recommendations.
- **Hermes Chat Slide-Over**: A sliding chat drawer that lets operators consult with the Hermes AI Agent directly to refine, rewrite, or shorten titles, meta descriptions, and copy according to GDA on-page SEO checklist standards.

### 🚨 E. Lighthouse (PABS Audits & Alerts)
- **Circular PABS Gauges**: Renders interactive, SVG-driven circular gauges representing Google Lighthouse scores for **P**erformance, **A**ccessibility, **B**est Practices, and **S**EO.
- **Critical PABS Alerts**: A real-time alerting panel identifying any properties scoring in the **Red** (below `50`) for any metric. Includes pre-seeded anomaly test cases like *Nail Salon Ubud* and *Bali Spa Guide*. Clicking any flagged alert automatically populates and expands that property's details.

### 📖 F. Interactive Guide
A step-by-step Operator Playbook walking managers through daily auditing workflows, proposal reviews, database schema alterations, and Hermes execution parameters.

---

## 🤖 4. AI Orchestration with Hermes (`gda-ai01`)

The platform's frontend, database, and background processes are built and autonomously maintained by the **Hermes AI Agent** operating from the orchestration host **`gda-ai01`**.

### How Hermes Operates & Compiles
1.  **Secure Passwordless SSH**: Hermes uses cryptographic key auth to log in to `gda-s01` as the `azlan` user, allowing it to modify backend code, alter schemas, run SQL seeds, and rebuild assets.
2.  **Remote Vite Compilation**: When code modifications are made to `App.jsx` or `index.css`, Hermes issues a remote command to rebuild the client bundle on the server:
    ```bash
    ssh gda-s01 "cd /var/www/nexus/frontend && npm run build"
    ```
    Nginx immediately picks up and serves the newly generated `dist/` bundle live.
3.  **Active MCP Integration**: Hermes utilizes the **Model Context Protocol (MCP)** inside `/home/azlan/.hermes/config.yaml` to securely query GDA's marketing credentials from `gda-ai01`:
    -   **Semrush MCP**: Connected with live API keys for keyword overlap sweeps.
    -   **Google Search Console MCP**: Authenticated via Master OAuth (`~/.gsc-mcp/oauth-token.json`).
    -   **Google Analytics 4 MCP**: Deployed using the Master Service Account Key (`ga4-user-credentials.json`).
    -   **Google Tag Manager MCP**: Consolidated using the Master Service Account key for real-time tracking audits.

### Automated Cron Routines
Hermes executes automated sync schedules on `gda-ai01` to fetch metrics and keep the PostgreSQL database on `gda-s01` fresh:
-   **Daily Sync Routine**: Triggers at **3:00 AM GMT+8** (Singapore Time) to execute GSC and GA4 sweeps.
-   **Monthly Competitor Sweep**: Runs on the **last day of every month at 4:00 AM GMT+8** to refresh Semrush domain overlap statistics.

---

## 🛠️ 5. Operator CLI Playbook

### A. Deploying Frontend Updates
To make frontend adjustments live manually:
```bash
# Log in to gda-s01
ssh gda-s01

# Navigate and rebuild
cd /var/www/nexus/frontend
npm run build
```

### B. Managing Backend API
To view API logs or restart the backend service:
```bash
# View active processes
pm2 list

# View live backend log streams
pm2 logs gaia-nexus-backend

# Restart API
pm2 restart gaia-nexus-backend
```

### C. Seeding the Database
To reset or re-seed the 34 production properties inside PostgreSQL 18:
```bash
# From gda-ai01, copy the seed script
scp /home/azlan/seed.sql gda-s01:/tmp/seed.sql

# SSH into gda-s01 and execute seed
ssh gda-s01 "psql -U nexus_user -d gaia_nexus -h 127.0.0.1 -f /tmp/seed.sql"
```

---

## ⚠️ 6. Key Operator Constraints
1.  **Plan First, Execute Second**: In compliance with agency policy, the AI Agent must propose and receive explicit approval before running code updates, server configurations, or database actions.
2.  **No Global Restarts**: Never execute global restarts on PostgreSQL or shared system services on `gda-s01` to prevent interrupting other active agency sites. Only restart individual PM2 containers or reload Nginx.
3.  **British English Standard**: All system copy, user interface titles, and recommendations must strictly conform to **British English (`en-GB`)** spelling conventions, adhering to guidelines in `SKILLS-copywriter.md`.
4.  **Raw URLs Only**: Roger's terminal client completely strips formatted markdown links. Always output raw, plain-text URLs rather than markdown anchors in reports or terminal readouts.
