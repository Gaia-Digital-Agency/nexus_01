# Gaia Nexus: File Structure

## Repository Overview

The Gaia Nexus platform is organized as a monorepo with four primary directories: `frontend`, `backend`, `hermes`, and `reference`. A root-level `README.md` covers project overview, setup, and deployment.

---

## Root Structure

```
gaia-nexus/
├── README.md
├── .env.example
├── .gitignore
├── docker-compose.yml          # Local development orchestration
├── frontend/                   # React + Vite SSR + Tailwind
├── backend/                    # Node.js API + Payload CMS
├── hermes/                     # Python AI agent + data pipeline
└── reference/                  # Documentation and markdown files
```

---

## Frontend

```
frontend/
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── index.html
├── public/
│   └── assets/
├── src/
│   ├── main.tsx                # Vite SSR entry point
│   ├── App.tsx
│   ├── router.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   └── DataTable.tsx
│   │   ├── dashboard/
│   │   │   ├── PortfolioOverview.tsx
│   │   │   ├── SiteCard.tsx
│   │   │   ├── MetricsChart.tsx
│   │   │   └── SourceSummary.tsx
│   │   ├── proposals/
│   │   │   ├── ProposalList.tsx
│   │   │   ├── ProposalDetail.tsx
│   │   │   ├── ApprovalActions.tsx
│   │   │   └── RevisionForm.tsx
│   │   └── deployments/
│   │       ├── DeploymentTimeline.tsx
│   │       ├── DeploymentStatus.tsx
│   │       └── RollbackButton.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── SiteDetail.tsx
│   │   ├── Proposals.tsx
│   │   ├── ProposalDetail.tsx
│   │   ├── Deployments.tsx
│   │   ├── Analytics.tsx
│   │   ├── Reports.tsx
│   │   ├── Settings.tsx
│   │   └── Login.tsx
│   ├── hooks/
│   │   ├── useSites.ts
│   │   ├── useMetrics.ts
│   │   ├── useProposals.ts
│   │   └── useDeployments.ts
│   ├── services/
│   │   └── api.ts              # Axios base client
│   ├── store/
│   │   └── authStore.ts        # Zustand auth state
│   └── types/
│       ├── site.ts
│       ├── metrics.ts
│       ├── proposal.ts
│       └── deployment.ts
```

---

## Backend

```
backend/
├── package.json
├── tsconfig.json
├── .env.example
├── src/
│   ├── server.ts               # Express entry point
│   ├── payload.config.ts       # Payload CMS configuration
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── sites.ts
│   │   ├── metrics.ts
│   │   ├── proposals.ts
│   │   ├── deployments.ts
│   │   └── reports.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── sitesController.ts
│   │   ├── metricsController.ts
│   │   ├── proposalsController.ts
│   │   ├── deploymentsController.ts
│   │   └── reportsController.ts
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   ├── rbacMiddleware.ts
│   │   └── errorHandler.ts
│   ├── models/
│   │   ├── Site.ts
│   │   ├── MetricsSnapshot.ts
│   │   ├── Proposal.ts
│   │   ├── Deployment.ts
│   │   ├── User.ts
│   │   └── AuditLog.ts
│   ├── payload/
│   │   └── collections/
│   │       ├── Sites.ts
│   │       ├── ContentDrafts.ts
│   │       ├── Users.ts
│   │       ├── MediaAssets.ts
│   │       └── Reports.ts
│   ├── db/
│   │   ├── index.ts            # PostgreSQL connection (pg / Drizzle)
│   │   └── migrations/
│   └── utils/
│       ├── logger.ts
│       ├── secrets.ts          # GCP Secret Manager helper
│       └── pagination.ts
```

---

## Hermes Agent

```
hermes/
├── requirements.txt
├── .env.example
├── main.py                     # Entry point
├── scheduler.py                # Cron job orchestration
├── config/
│   └── settings.py             # Environment config loader
├── collectors/
│   ├── semrush_collector.py
│   ├── ga4_collector.py
│   ├── gsc_collector.py
│   ├── google_ads_collector.py
│   └── gtm_collector.py
├── agent/
│   ├── hermes.py               # Main agent orchestrator
│   ├── claude_client.py        # Anthropic API wrapper
│   ├── proposal_engine.py      # Proposal generation logic
│   └── deployment_runner.py    # SSH + site change execution
├── db/
│   ├── connection.py           # PostgreSQL connection
│   └── queries.py              # Parameterized query helpers
├── utils/
│   ├── logger.py
│   ├── ssh_client.py           # Paramiko SSH wrapper
│   └── secrets.py              # GCP Secret Manager helper
└── tests/
    ├── test_collectors.py
    ├── test_proposal_engine.py
    └── test_deployment_runner.py
```

---

## Reference

```
reference/
├── 01_GAIA_NEXUS_CONCEPT.md
├── 02_HIGH_LEVEL_PLAN.md
├── 03_SYSTEM_ARCHITECTURE.md
├── 04_APPLICATION_ARCHITECTURE.md
├── 05_FILE_STRUCTURE.md
├── 06_GCP_DEPLOYMENT.md
├── 07_IMPLEMENTATION.md
└── 08_GAIA_NEXUS_UI_DESIGN_BRIEF.md
```

---

## Root README.md Structure

The root `README.md` should cover:
1. Project background — what Gaia Nexus is and why it exists
2. App architecture — stack overview and component relationships
3. Local development setup — prerequisites, `.env` configuration, `docker-compose up`
4. Deployment instructions — GCP VM provisioning, environment setup, go-live checklist
