# Action Summary — What We're Going to Do, and Why

**Updated:** 12 June 2026 · **You are here:** Plan → Findings → **Action Summary** → Todo
**In the app:** this is the *Proposals* layer — the changes we're recommending for approval.
**Reads from:** `findings.md` (the evidence). **Feeds:** `todo.md` (the task list).

> **The whole plan in three sentences.** We checked all ~63 sites; most get little traffic, ~7 earn almost all of it. So we'll spend cheaply on security/health fixes everywhere, and spend our real SEO effort on the few sites that can move revenue. One more opportunity (Google Ads, Business Profiles, social) is ready but blocked on a single Google permission — we should start unblocking it now.

---

## The reality we're working with

- **~63 live sites. ~7 earn real organic traffic** — aperitif, blossomsteakhouse, cascadesbali, nusapenida, pinstripebar, sepedamotor, viceroybali. The rest are near-zero in search.
- That means **broad content spending is low-return.** The win is to *concentrate* SEO on the earners, and treat the rest with cheap, portfolio-wide hygiene.
- **Our north-star is revenue, not raw traffic.** Every recommended change is reversible and tied to a real metric.

---

## What we'll do — three streams

### Stream 1 — Site Health (cheap, everywhere, do first)
Fix the security and crawlability problems found in the audits. These are low-effort, high-protection, and apply across the whole portfolio.

- **Close the security holes.** Two sister sites share the same login keys (a break-in on one could forge logins on the other); one site still has a guessable `admin` user; one leaks debug info through the address bar. These are the first things a non-technical owner should care about — they're the difference between "secure" and "breachable."
- **Stop blocking Google by accident.** A few sites tell search engines to stay away from pages that *should* rank (e.g. a shop section), or challenge Google's crawler as if it were a bot. Fixing this is free traffic recovered.
- **Tidy the plumbing.** Add the standard security header (HSTS) almost everywhere it's missing, remove duplicate SEO/caching plugins that fight each other, and bring a few sites up to the current software version.

*Why it leads:* it protects the business, it's quick, and it clears the ground so SEO work actually gets indexed.

### Stream 2 — SEO (concentrated on the earners)
Spend the real content and optimisation effort where it can actually move revenue.

- **Fix the titles first — highest return.** Our high-traffic sites get lots of search impressions but very few clicks, because their page titles are weak. Rewriting titles is the cheapest way to convert traffic we *already* rank for. **viceroybali (8 rewrites) and aperitif (10) are drafted and ready to ship now.**
- **Then build content** on the Tier-1 sites (full scope and timelines in `seo/seo-work-scope-20-sites.md`).
- **Defend what we lead.** nailsalonubud holds #1 for "nail salon ubud" with no supporting content — easy for a competitor to take. Protect it.
- **Skip the dead weight.** Redirect-only and parked domains carry no SEO value; effort goes to the live site behind them.

### Stream 3 — Local + Paid + Social (ready, but blocked)
Google Business Profiles (18 sites), Google Ads (6 campaigns), and social posting are scoped and ready — but they all wait on **one Google permission gate** (a login/2-step-verification + Ads developer token on `seo@gaiada.com`). It's long-lead, so **start the request now** even though execution comes later.

---

## Order of play

| Priority | Stream | Why now |
|---|---|---|
| **1** | Site Health — security items | Protects the business; cheap; fast |
| **2** | SEO — title rewrites on earners | Highest ROI; some already drafted |
| **3** | Site Health — remaining hygiene | Portfolio-wide; clears the ground |
| **4** | SEO — content on Tier-1 sites | Real revenue movement, slower payoff |
| **5** | Local/Paid/Social | Start the credential unblock in parallel now |

---

## What we need from the team
1. **Sign-off** on the order above.
2. **Approve the drafted title rewrites** (viceroybali, aperitif) — these can ship immediately.
3. **Kick off the Google permission request** for `seo@gaiada.com` so Stream 3 isn't waiting on it later.

*Detailed evidence behind every claim: `findings.md`. The full task list, site by site: `todo.md`.*
