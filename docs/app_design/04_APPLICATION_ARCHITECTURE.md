# Gaia Nexus: Application Architecture

## Overview

Gaia Nexus is a full-stack web application with three logical layers: the **Data Pipeline** (Python), the **Backend API** (Node.js), and the **Frontend** (React + Vite SSR). Payload CMS 3.0 serves as the headless CMS layer.

---

## Application Layers

```
┌──────────────────────────────────────────┐
│           FRONTEND (React + Vite SSR)    │
│  Dashboard │ Proposals │ Deployments     │
│  Analytics │ Settings  │ Admin           │
└──────────────────┬───────────────────────┘
                   │ REST / GraphQL
┌──────────────────▼───────────────────────┐
│           BACKEND API (Node.js)          │
│  Auth │ Sites │ Metrics │ Proposals      │
│  Deployments │ Reports │ Audit Logs      │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│         PAYLOAD CMS 3.0 (Headless)       │
│  Collections: Sites, Content, Users      │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│         POSTGRESQL (Cloud SQL)           │
│  Core data store for all Nexus data      │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│         HERMES AGENT (Python)            │
│  Scheduler │ Data Collector │ Claude API  │
│  Proposal Generator │ Deployment Runner  │
└──────────────────────────────────────────┘
```

---

## Database Schema (PostgreSQL)

### `sites`
```sql
id            UUID PRIMARY KEY
name          VARCHAR(255)
url           VARCHAR(512)
type          ENUM('wordpress', 'nodejs')
server_ip     VARCHAR(45)
ssh_user      VARCHAR(100)
mysql_db      VARCHAR(100)
status        ENUM('active', 'inactive')
created_at    TIMESTAMP
```

### `metrics_snapshots`
```sql
id            UUID PRIMARY KEY
site_id       UUID REFERENCES sites(id)
source        ENUM('semrush', 'ga4', 'gsc', 'google_ads', 'gtm')
snapshot_date DATE
data          JSONB
created_at    TIMESTAMP
```

### `proposals`
```sql
id            UUID PRIMARY KEY
site_id       UUID REFERENCES sites(id)
type          ENUM('ad_copy', 'blog', 'seo_fix', 'image', 'campaign')
status        ENUM('pending', 'approved', 'rejected', 'revision_requested', 'deployed')
content       JSONB
ai_reasoning  TEXT
created_by    VARCHAR(50)  -- 'hermes'
reviewed_by   UUID REFERENCES users(id)
review_note   TEXT
created_at    TIMESTAMP
reviewed_at   TIMESTAMP
```

### `deployments`
```sql
id            UUID PRIMARY KEY
proposal_id   UUID REFERENCES proposals(id)
site_id       UUID REFERENCES sites(id)
status        ENUM('scheduled', 'in_progress', 'completed', 'failed', 'rolled_back')
deployed_by   VARCHAR(50)  -- 'hermes'
deployed_at   TIMESTAMP
rollback_data JSONB
log           TEXT
```

### `users`
```sql
id            UUID PRIMARY KEY
email         VARCHAR(255) UNIQUE
name          VARCHAR(255)
role          ENUM('admin', 'reviewer', 'viewer')
created_at    TIMESTAMP
```

### `audit_logs`
```sql
id            UUID PRIMARY KEY
entity_type   VARCHAR(100)
entity_id     UUID
action        VARCHAR(100)
actor         VARCHAR(255)
details       JSONB
created_at    TIMESTAMP
```

### `chat_history` ✅ implemented
```sql
id            UUID PRIMARY KEY
question      TEXT          -- <= 1550 chars
answer        TEXT          -- <= 150 chars
created_at    TIMESTAMPTZ   -- rows older than 30 days are auto-purged
```

### `audit_runs` ✅ implemented
```sql
id            UUID PRIMARY KEY
started_at    TIMESTAMPTZ
completed_at  TIMESTAMPTZ
status        VARCHAR(20)   -- 'running' | 'completed'
site_count    INTEGER
audit_md      TEXT          -- compiled Technical Audit report (docs/audits/*)
seo_md        TEXT          -- compiled SEO report (docs/seo/*)
plan_md       TEXT          -- compiled Execution Plan (docs/plan/*)
triggered_by  VARCHAR(120)
```

> Both tables are auto-created on backend boot by `backend/init-db.js`. The rest of the schema above
> remains the aspirational design target (only `sites` + these two are live today).

---

## Backend API Endpoints (Node.js)

### Authentication
```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### Sites
```
GET    /api/sites                    -- List all sites
GET    /api/sites/:id                -- Single site detail
POST   /api/sites                    -- Register new site
PUT    /api/sites/:id                -- Update site config
DELETE /api/sites/:id                -- Remove site
```

### Metrics
```
GET    /api/metrics/:siteId          -- Latest metrics for site
GET    /api/metrics/:siteId/history  -- Historical snapshots
GET    /api/metrics/portfolio        -- Aggregated across all sites
```

### Proposals
```
GET    /api/proposals                -- List (filter by status, site, type)
GET    /api/proposals/:id            -- Single proposal detail
PUT    /api/proposals/:id/approve    -- Approve proposal
PUT    /api/proposals/:id/reject     -- Reject with note
PUT    /api/proposals/:id/revise     -- Request revision with feedback
```

### Deployments
```
GET    /api/deployments              -- List all deployments
GET    /api/deployments/:id          -- Deployment detail + log
POST   /api/deployments/:id/rollback -- Trigger rollback
```

### Reports
```
GET    /api/reports/portfolio        -- Portfolio summary report
GET    /api/reports/site/:id         -- Per-site report
POST   /api/reports/generate         -- Trigger AI report generation
```

### AI Assistant ✅ implemented
```
POST   /api/chat                     -- Read-only Q&A over app/DB data (Gemini); <=1550 in / <=150 out
GET    /api/chat/history             -- Chat log; purges rows older than 30 days
```

### Audit ✅ implemented
```
GET    /api/audit/status             -- Last run, 24h cooldown, report availability
POST   /api/audit/run                -- Compile docs/{audits,seo,plan} into audit_runs (429 within 24h)
GET    /api/audit/download/:kind.:fmt -- kind = audit|seo|plan, fmt = md|pdf (latest completed run)
```

---

## Payload CMS Collections

| Collection | Purpose |
|------------|---------|
| `Sites` | Site registry with metadata |
| `ContentDrafts` | Staged content before deployment |
| `Users` | Platform user management |
| `MediaAssets` | AI-generated images and media |
| `Reports` | Generated reports storage |

---

## Hermes Agent Services (Python)

| Service | Description |
|---------|-------------|
| `DataCollector` | Pulls daily from all 5 APIs, writes to PostgreSQL |
| `ProposalEngine` | Sends data to Claude API, receives proposals, stores them |
| `DeploymentRunner` | SSH into production VMs, executes approved changes |
| `Scheduler` | Cron-based daily trigger for DataCollector and ProposalEngine |
| `AuditLogger` | Records all Hermes actions to audit_logs table |

---

## Authentication & Authorization

- **JWT-based authentication** for Nexus platform users
- **OAuth 2.0** for Google API connections (GA4, GSC, Ads, GTM)
- **API key** for Semrush and Anthropic Claude
- **GCP Secret Manager** for all credentials at runtime
- **RBAC**: Admin (full access), Reviewer (proposals + approvals), Viewer (read-only dashboard)

---

## Caching Strategy

| Layer | Technology | TTL |
|-------|-----------|-----|
| API response cache | Redis (optional) | 1 hour |
| Metrics snapshots | PostgreSQL | Daily |
| Proposal content | PostgreSQL | Until deployed |
| Dashboard data | Client-side React Query | 5 minutes |
