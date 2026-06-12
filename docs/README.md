# Gaia Portfolio — SEO & Site-Health Docs

**Who this is for:** the team. You don't need to be technical to follow it — if you understand SEO, you can read every step. This folder is the **evidence and plan** behind the work we're proposing across our ~63 sites.

---

## How to read this folder (the flow)

We looked at every live site, wrote down what we found, then turned it into a plan. It reads in three stages — **Audit → SEO → Plan** — and each stage narrows from raw evidence down to a concrete to-do list:

```
        THE EVIDENCE                      THE PLAN  (docs/plan/)
   (one file per site)
 ┌──────────────────────────┐     ┌───────────┐   ┌────────────────┐   ┌────────────┐
 │ 1. AUDIT — site health   │     │ FINDINGS  │   │ ACTION SUMMARY │   │   TODO     │
 │    docs/audits/          │ ──▶ │ what we   │──▶│ what we'll do  │──▶│ the work,  │
 │ 2. SEO — search strategy │     │ found     │   │  and why       │   │ site by    │
 │    docs/seo/             │     │ (overall) │   │  (the pitch)   │   │ site       │
 └──────────────────────────┘     └───────────┘   └────────────────┘   └────────────┘
   the detailed results            ── read these three in order, top to bottom ──
```

| Step | Folder / file | What it answers | Read it when |
|---|---|---|---|
| **1. Audit** | `audits/<site>.md` | Is the site healthy, secure, and crawlable by Google? | You want the technical results for one site |
| **2. SEO** | `seo/<site>.md` | What are this site's keywords, rankings, and content opportunities? | You want the search results for one site |
| **3a. Findings** | `plan/findings.md` | Across all 63 sites, what did we find? | **Start here** for the big picture |
| **3b. Action Summary** | `plan/action_summary.md` | What are we going to do, in what order, and why? | You want the decision and the reasoning |
| **3c. Todo** | `plan/todo.md` | The actual task list, grouped by site | You're doing or tracking the work |

> Every audit and SEO file opens with a plain-language **"What this means / Why it matters"** box, so you get the point before any technical detail.

---

## How this maps to the Nexus app

The app and these docs are two views of the same thing. **In the app you see the live numbers; in these docs you see the results and the plan behind them.** When you're in Nexus and think *"okay — so what's the story behind this?"*, the matching doc is here:

| In the Nexus app… | …is backed by these docs |
|---|---|
| **Monitor** (Dashboard, Directory, Focus, Lighthouse) — site-by-site health & traffic | **Audit** files (`audits/`) |
| **Data** (Semrush, GSC, GA4) — the search & analytics feeds | **SEO** files (`seo/`) |
| **Decide → Reports** — the period briefing | **Findings** (`plan/findings.md`) |
| **Decide → Proposals** — the changes staged for approval | **Action Summary** (`plan/action_summary.md`) |
| **Act → Deployments** — changes being executed | **Todo** (`plan/todo.md`) |

So the loop is the same in both places: **look at the results → decide what to change → approve it → ship it.**

---

## The bottom line (one paragraph)

We have **~63 live sites, but only ~7 earn meaningful organic traffic.** Two streams of work come out of that: **(1) Site health** — cheap, high-impact security and crawlability fixes that apply across the whole portfolio; and **(2) SEO** — concentrated on the handful of sites that can actually move revenue. A third stream (Google Ads + Business Profiles + social) is ready to go but waiting on one Google login/permission gate. Full reasoning is in `plan/action_summary.md`.

---

*Scope note: `audits/` and `seo/` are kept separate on purpose — audit = technical site-health only; SEO = search/content only, no overlap. Everything here is **analysis** — nothing has been changed on any live site yet.*
