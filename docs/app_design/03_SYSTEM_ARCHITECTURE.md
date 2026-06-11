# Gaia Nexus: System Architecture

## Infrastructure Overview

All components are hosted on **Google Cloud Platform (GCP) Compute Engine** virtual machines. Two primary VM types are used: production site VMs hosting the fifty websites, and a dedicated Hermes Agent VM.

---

## GCP VM Topology

```
┌─────────────────────────────────────────────────────────┐
│                  GCP PROJECT: gaia-nexus                │
│                                                         │
│  ┌─────────────────────────┐  ┌──────────────────────┐  │
│  │  PRODUCTION VM(s)       │  │  HERMES AGENT VM     │  │
│  │                         │  │                      │  │
│  │  ├─ NGINX (Node.js)      │  │  ├─ Python Scheduler │  │
│  │  ├─ PHP-FPM (WordPress)  │  │  ├─ Hermes Agent     │  │
│  │  ├─ 40x WordPress sites  │  │  ├─ Claude API Client│  │
│  │  ├─ 10x Node.js sites    │  │  ├─ Node.js Runtime  │  │
│  │  └─ MySQL                │  │  └─ PostgreSQL Client│  │
│  └─────────────────────────┘  └──────────────────────┘  │
│                                                         │
│  ┌─────────────────────────┐  ┌──────────────────────┐  │
│  │  NEXUS PLATFORM VM      │  │  CLOUD SQL           │  │
│  │                         │  │                      │  │
│  │  ├─ Node.js Backend      │  │  ├─ PostgreSQL (Nexus)│  │
│  │  ├─ React + Vite SSR     │  │  └─ Managed Instance │  │
│  │  ├─ Payload CMS 3.0      │  └──────────────────────┘  │
│  │  └─ NGINX Reverse Proxy  │                            │
│  └─────────────────────────┘                            │
└─────────────────────────────────────────────────────────┘
```

---

## Component Descriptions

### Production VM(s)
- Hosts all fifty websites
- **NGINX** as reverse proxy routing Node.js traffic
- **PHP-FPM** handling WordPress requests
- **MySQL** instance serving both WordPress (40) and Node.js (10) sites
- SSH accessible by Hermes agent for deployment operations

### Hermes Agent VM
- Dedicated compute for the AI orchestration layer
- **Python scheduler** runs daily cron jobs for data pulls
- **Hermes agent** orchestrates analysis and proposal generation
- **Claude API client** communicates with Anthropic API (Opus 4.6 / 4.8)
- SSH client with keys to production VMs for deployment execution

### Nexus Platform VM
- Hosts the Gaia Nexus web application (dashboard, approval UI)
- **Node.js** backend API
- **React 19 + Vite SSR** frontend
- **Payload CMS 3.0** as headless CMS
- **NGINX** as reverse proxy and SSL terminator

### Cloud SQL (PostgreSQL)
- Managed PostgreSQL instance (GCP Cloud SQL)
- Central data store for all aggregated metrics, proposals, deployments
- Accessible by Nexus Platform VM and Hermes Agent VM

---

## External API Connections

```
Hermes Agent VM
    ├── → Semrush API          (daily pull — keyword, technical SEO data)
    ├── → Google Analytics 4   (daily pull — traffic, conversions)
    ├── → Google Search Console(daily pull — search performance, indexation)
    ├── → Google Ads API       (daily pull — campaign performance, spend)
    ├── → Google Tag Manager   (daily pull — event tracking, conversion data)
    └── → Anthropic Claude API (proposal generation, analysis, deployment commands)
```

---

## Data Flow

```
[External APIs]
      ↓  (daily batch — Python scheduler)
[Hermes Agent VM]
      ↓  (normalized data)
[PostgreSQL — Cloud SQL]
      ↓  (read via REST API)
[Nexus Platform — React Dashboard]
      ↓  (Phase 1: team reviews data)
[Hermes — Claude Opus Analysis]
      ↓  (Phase 2: proposals stored in PostgreSQL)
[Nexus Platform — Approval UI]
      ↓  (human approves / rejects)
[Hermes Deployment Agent]
      ↓  (Phase 3: SSH into production VMs)
[Production VMs — WordPress + Node.js Sites]
```

---

## Networking & Security

| Concern | Approach |
|---------|---------|
| VM-to-VM communication | GCP internal VPC, private IPs |
| SSH access | Key-based SSH from Hermes to production VMs |
| API credentials | GCP Secret Manager for all API keys |
| HTTPS | SSL via NGINX + Let's Encrypt or GCP Load Balancer |
| Database access | Private IP only, no public exposure |
| Anthropic API key | Stored in Secret Manager, injected at runtime |
| RBAC | Role-based access on Nexus Platform (Admin, Reviewer, Viewer) |

---

## Deployment Architecture

| VM | Machine Type (Suggested) | OS |
|----|--------------------------|-----|
| Production VM | e2-standard-4 (or higher) | Ubuntu 22.04 LTS |
| Hermes Agent VM | e2-standard-2 | Ubuntu 22.04 LTS |
| Nexus Platform VM | e2-standard-2 | Ubuntu 22.04 LTS |
| Cloud SQL | db-n1-standard-2 | Managed (PostgreSQL 15) |

---

## SSH Architecture (Hermes → Production VMs)

```
Hermes Agent VM
    ├── SSH Key Pair (ed25519)
    ├── Known hosts: all production VM IPs
    └── Paramiko (Python SSH client) for programmatic access
            ↓
    Production VM(s)
        ├── Authorized keys: Hermes public key
        ├── WordPress: wp-cli for content/DB changes
        └── Node.js: PM2 process management, direct API calls
```
