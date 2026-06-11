# Gaia Nexus: UI Design Brief

## Purpose

This document provides the sitemap URL structure and detailed prompts for generating Gaia Nexus UI mockups using **Claude Design**. Each prompt is self-contained and ready to paste directly.

---

## Design System Specifications

**Color Palette:**
- Primary: `#0F172A` (dark navy) — backgrounds
- Accent: `#6366F1` (indigo) — CTAs, active states
- Success: `#10B981` (emerald) — approved, deployed
- Warning: `#F59E0B` (amber) — pending review
- Danger: `#EF4444` (red) — rejected, failed
- Surface: `#1E293B` — cards and panels
- Text Primary: `#F8FAFC`
- Text Muted: `#94A3B8`

**Typography:**
- Font: Inter (sans-serif)
- Headings: 600 weight
- Body: 400 weight

**Style:** Dark mode dashboard, data-dense, professional SaaS

---

## Sitemap URL Structure

```
/
├── /login                          # Authentication
│
├── /dashboard                      # Phase 1 — Portfolio Overview
│   ├── /dashboard/sites            # All 50 sites overview
│   └── /dashboard/sites/:siteId    # Single site drill-down
│
├── /analytics                      # Aggregated analytics
│   ├── /analytics/seo              # SEO metrics (Semrush + GSC)
│   ├── /analytics/aeo              # AI / Answer-Engine visibility (GSC AI Overviews, Semrush AI, GA4 AI-assistant channel)
│   ├── /analytics/ads              # Ads performance (Google Ads)
│   ├── /analytics/social           # Social / SMM (GA4 assisted conversions, UTM campaigns)
│   ├── /analytics/traffic          # Traffic (GA4)
│   └── /analytics/profitability    # Revenue and ROI
│
├── /proposals                      # Phase 2 — Human Review
│   ├── /proposals/pending          # Awaiting review
│   ├── /proposals/approved         # Approved, staged
│   ├── /proposals/rejected         # Rejected with notes
│   └── /proposals/:proposalId      # Single proposal detail + actions
│
├── /deployments                    # Phase 3 — Execution Tracking
│   ├── /deployments/timeline       # Chronological change log
│   ├── /deployments/active         # In-progress deployments
│   └── /deployments/:deploymentId  # Deployment detail + rollback
│
├── /reports                        # AI-generated performance reports
│   └── /reports/:reportId          # Single report view
│
├── /settings                       # Platform configuration
│   ├── /settings/sites             # Site registry and credentials
│   ├── /settings/integrations      # API key management
│   └── /settings/users             # User roles and access
│
└── /admin                          # Admin only
    └── /admin/audit-log            # Full audit trail
```

---

## Claude Design Prompts

---

### Prompt 1: Login Page

```
Design a login page for Gaia Nexus, an AI-powered SEO and advertising management platform for a portfolio of 50 websites.

Layout: centered card on a dark navy (#0F172A) full-screen background.
Card contents:
- Gaia Nexus logo (text-based, "GN" monogram in indigo)
- Heading: "Welcome back"
- Subheading: "Sign in to your platform"
- Email input field
- Password input field
- "Sign In" button (indigo, full width)
- "Forgot password?" link

Style: dark mode, Inter font, minimal and professional. No illustrations.
Size: 1440x900 desktop mockup.
```

---

### Prompt 2: Main Dashboard — Portfolio Overview

```
Design the main dashboard for Gaia Nexus, a dark-mode SaaS platform managing SEO and advertising across 50 websites.

Layout: left sidebar navigation (collapsed icon view) + main content area.

Sidebar items (icons + labels): Dashboard, Analytics, Proposals, Deployments, Reports, Settings.

Main content:
- Top bar: page title "Portfolio Dashboard", date range picker, user avatar
- KPI row (4 cards): Total Organic Traffic, Average Ad ROAS, Pending Proposals, Active Deployments
- Section: "Sites Overview" — a filterable data table with columns: Site Name, Type (WordPress/Node), SEO Score, Traffic (7d), Ad Spend, Proposals Pending, Last Deployed
- Section: "Top Opportunities" — cards driven by the live data tools, one per type:
  Quick Wins (keywords ranking 4–15), CTR Opportunities, Content Decay, Cannibalization,
  Content Gaps (each maps to a GSC tool). Each card tags its data source (Semrush/GA4/GSC/Ads/GTM).
- Each KPI/metric tile shows a small source badge (provenance) to support cross-source triangulation

Color palette:
- Background: #0F172A
- Cards: #1E293B
- Accent: #6366F1
- Success: #10B981
- Warning: #F59E0B
- Text: #F8FAFC / #94A3B8

Style: dark mode, data-dense, Inter font, no gradients. Size: 1440x900 desktop.
```

---

### Prompt 3: Single Site Detail Page

```
Design a single site detail page for Gaia Nexus (dark mode SaaS dashboard).

Page title: "site-name.com" with WordPress or Node.js badge.

Layout: left sidebar (same as dashboard) + main content.

Main content sections:
1. Top metrics row: Organic Traffic, Keyword Rankings, Ad Spend, ROAS — each as a stat card with 7-day trend sparkline
2. Tabbed section with tabs: SEO | AEO | Ads | Social | Traffic | Proposals | Deployments
3. Active tab (SEO): keyword rankings table (Keyword, Position, Volume, Change), Core Web Vitals row (LCP, INP, CLS), a "Site Audit Issues" panel (Semrush), a "Quick Wins" list (GSC), and a "Submit to Index" action button (GSC Indexing API)
4. Side panel (right): "Recent Proposals" — list of 3 latest AI proposals for this site with status badges

Color and style: same as portfolio dashboard. Size: 1440x900 desktop.
```

---

### Prompt 4: Proposals — Pending Review List

```
Design the Proposals page (Pending tab) for Gaia Nexus, a dark-mode AI-powered platform.

Layout: left sidebar + main content.

Main content:
- Page title: "Proposals" with tab bar: Pending | Approved | Rejected
- Active tab: Pending (showing count badge)
- Filter bar: filter by Site, Type (ad_copy / blog / seo_fix / image / campaign), Priority
- Proposal cards list — each card contains:
  - Site name and URL
  - Proposal type badge (color-coded)
  - Priority badge: High (red) / Medium (amber) / Low (grey)
  - Short title and one-line summary
  - Created timestamp
  - Action buttons: "Review" (indigo), "Quick Approve" (green), "Reject" (red outline)
- Show at least 5 proposal cards in the mockup

Style: dark mode, Inter font, card-based layout. Size: 1440x900 desktop.
```

---

### Prompt 5: Proposal Detail — Review & Approval

```
Design the Proposal Detail page for Gaia Nexus (dark mode SaaS).

Layout: left sidebar + main content (no right panel needed).

Main content:
- Breadcrumb: Proposals > Pending > Proposal Title
- Page title: proposal title
- Metadata row: Site name | Type badge | Priority badge | Created timestamp | Created by: Hermes AI | "Verified ✓" badge (green — Hermes self-checked the numeric claims via GSC verify_claim)
- Two-column layout:
  - Left (60%): "Proposal Content" — rendered markdown or structured content (ad copy, article text, or SEO recommendation depending on type). Show a blog article example.
  - Right (40%):
    - "AI Reasoning" card — paragraph explaining why Hermes generated this, with a "Sources" line citing the primary metric + a corroborating second source (golden rule: never act on a single source)
    - "Impact Prediction" card — expected traffic or ROAS improvement
    - "Action Panel":
      - Approve button (green, full width)
      - Reject button (red outline, full width)
      - Request Revision button (amber outline, full width) + textarea for revision notes

Style: dark mode, Inter font. Size: 1440x900 desktop.
```

---

### Prompt 6: Deployments — Timeline View

```
Design the Deployments Timeline page for Gaia Nexus (dark mode SaaS).

Layout: left sidebar + main content.

Main content:
- Page title: "Deployments"
- Tab bar: Timeline | Active | History
- Filter bar: filter by Site, Status, Date Range
- Vertical timeline component showing deployment events — each event contains:
  - Timestamp
  - Site name and type badge
  - Proposal type that was deployed (e.g., "Blog Article Published")
  - Status badge: Completed (green) | In Progress (indigo) | Failed (red) | Rolled Back (amber)
  - "View Details" link
  - For Completed items: show a small before/after metric delta (e.g., "Organic Traffic +12%")
- Show at least 6 timeline entries in the mockup
- "Rollback" action button visible on completed deployments

Style: dark mode, Inter font, timeline layout. Size: 1440x900 desktop.
```

---

### Prompt 7: Settings — Site Registry

```
Design the Settings > Sites page for Gaia Nexus (dark mode SaaS).

Layout: left sidebar + main content with a settings sub-navigation on the left inner panel.

Settings sub-nav items: Sites | Integrations | Users

Active section: Sites.

Main content:
- Page title: "Site Registry"
- "Add New Site" button (top right, indigo)
- Searchable and filterable table with columns:
  - Site Name
  - URL
  - Type (WordPress / Node.js)
  - Server IP
  - Status (Active / Inactive)
  - Last Sync
  - Actions: Edit | Test Connection | Remove
- Show 8 rows in the table

Style: dark mode, Inter font, table layout. Size: 1440x900 desktop.
```

---

### Prompt 8: Analytics — AEO / AI Visibility

```
Design the Analytics > AEO (Answer-Engine Optimization) page for Gaia Nexus (dark mode SaaS).

Layout: left sidebar + main content with the analytics sub-tabs:
SEO | AEO | Ads | Social | Traffic | Profitability (AEO active).

Main content:
- KPI row (4 cards): AI Overview Impressions (GSC), Share of AI Citations (Semrush),
  AI-Assistant Referral Sessions (GA4), Conversions from AI Referrals
- Section "AI Assistants Channel" — table of referrers (chatgpt.com, perplexity.ai,
  gemini.google.com, copilot.microsoft.com) with sessions, engagement rate, conversions
- Section "Questions Triggering AI Answers" — table: Query, AI-Overview present (Y/N),
  Your citation (Y/N), Impressions, Position
- Section "Answer-Block Opportunities" — pages to rewrite answer-first + add schema

Color palette and style: same dark dashboard as the portfolio. Size: 1440x900 desktop.
```

---

### Prompt 9: Analytics — Social / SMM

```
Design the Analytics > Social page for Gaia Nexus (dark mode SaaS).

Layout: left sidebar + main content, analytics sub-tabs (Social active).

Main content:
- KPI row (4 cards): Social Sessions (GA4), Assisted Conversions, Engaged Sessions Rate,
  Top Social Source
- Section "Channel Breakdown" — table by utm_source/medium: sessions, engagement,
  assisted vs last-click conversions, revenue
- Section "UTM Campaigns" — campaign table with naming-convention validation flags
- Note: emphasise assisted/path conversions (social is upper-funnel), not just last-click

Color palette and style: same dark dashboard. Size: 1440x900 desktop.
```

---

### Prompt 10: Settings — Integrations (Source Health)

```
Design the Settings > Integrations page for Gaia Nexus (dark mode SaaS).

Layout: left sidebar + settings sub-nav (Sites | Integrations | Users), Integrations active.

Main content:
- Page title: "Data Source Integrations"
- A card per source: Semrush, Google Analytics 4, Google Search Console, Google Ads,
  Google Tag Manager. Each card shows:
  - Source name + icon
  - Connection status badge: Connected (green) / Needs Auth (amber) / Error (red)
  - Last sync timestamp + tool count
  - Action: "Connect / Re-authenticate" button (OAuth) or "Edit key"
- Example state: Semrush = Connected; GSC + GA4 = Connected; Google Ads + GTM = Needs Auth

Style: dark mode, card grid, Inter font. Size: 1440x900 desktop.
```

---

## Mobile Considerations

For responsive views, the sidebar collapses to a bottom navigation bar. Key pages to design for mobile: Dashboard overview, Proposal detail (approval actions), Deployment status.

---

## Handoff Notes for Claude Design

- All screens should use the same dark navy background `#0F172A` and card surface `#1E293B`
- Indigo `#6366F1` is the only accent color for interactive elements
- Status colors: green = approved/success, amber = pending/warning, red = rejected/failed
- Inter font throughout at 14px base size
- Icons: use Lucide or Heroicons style (outlined)
- Spacing: 16px base grid, 24px section padding
- After generating each screen, iterate by adding "Make the data table rows more compact and increase the sidebar icon size"
