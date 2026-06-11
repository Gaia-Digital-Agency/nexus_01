# ViceroyBali.com — SEO Audit Summary

**Date:** 2026-06-10 | **Tooling:** Semrush MCP, GSC MCP, WordPress inspection (gda-ce01) | **Status:** View-only audit, no changes made

---

## 1. Critical — Fix Immediately

| Area | Finding | Impact | Action |
|---|---|---|---|
| **CTR Crisis** | Impressions up 128% but clicks down 21%. CTR collapsed from 3.08% → 1.07%. | **Thousands of lost clicks/month** from existing rankings | Rewrite meta titles & descriptions on 7 high-impression pages (see section 4) |
| **Sitemap noindex** | Sitemap returns `X-Robots-Tag: noindex, follow` | May be blocking search engines from discovering new content | Check Yoast SEO > General > Features, toggle sitemap off/on to regenerate |
| **Cache Conflict** | **WP Rocket + LiteSpeed Cache** both active as full-page caches | Stale cache, purging conflicts, unpredictable behaviour | Disable one (keep LiteSpeed as it's server-level) |
| **Category Pages Blocked** | `robots.txt` disallows 5 blog category paths from crawling | Category archives can't rank or pass link equity | Review intent — if categories have quality content, remove those Disallow lines |

---

## 2. High Impact — Do This Month

| Area | Finding | Impact | Action |
|---|---|---|---|
| **Honeymoon Page** | Booking page at avg position 15.2 (page 2). Only ranks #3 for exact "bali honeymoon package" | **Low visibility for highest-intent commercial page** | Rewrite title, add pricing into meta desc, build internal links from blog, add FAQ schema |
| **Blog → Booking Funnel** | Top 10 pages by clicks are ALL blog posts. None funnel users to booking | Blog drives 90%+ of traffic but **none converts to bookings** | Add contextual internal links in top 20 blog posts pointing to honeymoon package / room booking |
| **Nyepi Content** | Ranks #1-#4 for multiple Nyepi terms (nyepi what island, nyepi bali 2025, nyepi day) | **Strong existing rankings that need refreshing** | Update Nyepi blog with 2026/2027 dates, meta refresh, and seasonal CTAs |
| **Best Time to Visit Bali** | 225k impressions at position 8.6 but **0.10% CTR** — ranks #13 for 8,100/mo keyword | **Massive untapped traffic opportunity** | Rewrite title + desc (see section 4) and improve content depth to push toward position 5-10 |

---

## 3. Medium Impact — This Quarter

| Area | Finding | Impact | Action |
|---|---|---|---|
| **Luxury Keywords** | "luxury resort ubud" (30/mo), "five star hotel bali", "best resort in ubud" all have **low competition** (KD 0-40) | Viceroy doesn't rank for these at all | Create/optimise dedicated pages targeting luxury long-tail terms |
| **Galungan Page** | 232k impressions at position 6.5 but **0.20% CTR** — people search for dates, get vague answer | **232k people see your link and don't click** | Rewrite title to include "2026/2027 Dates & Meaning", add prominent CTA about Viceroy experience |
| **Backlink Profile** | Competitors (bali.com, finnsbeachclub.com) have stronger link profiles | Viceroy missing authority that helps all pages rank higher | Leverage Nyepi, Galungan, and Balinese Culture content as linkable assets for outreach |
| **Bali Trip Cost** | Meta title says "2025 Guide" — **outdated year in title** | Hurts CTR and trust signal | Update title to 2026 and refresh any pricing data |
| **Yoast SEO Settings** | SEO plugin is current (Premium 27.7) but category pages are blocked | Potential misconfiguration in Yoast > Search Appearance > Taxonomies | Verify category archive settings aren't set to "noindex" |
| **Theme Base** | Custom theme based on Underscores, last tested up to WP 5.4 | May not be optimised for modern Core Web Vitals standards | Audit theme performance with Lighthouse |
| **Structured Data** | WP Schema Pro is installed but not verified which schemas are active | Missing opportunity for rich results (Hotel, Product, FAQ, Breadcrumb) | Audit active schemas and add Hotel schema to booking pages |

---

## 4. Proposed Meta Title Changes (Ready to Apply)

These target the highest-impression, lowest-CTR pages. Expected lift: **2-5x CTR** based on industry benchmarks.

| Page | Current Title | Proposed Title | Impressions | Current CTR |
|---|---|---|---|---|
| Best Time to Visit | Your Guide to the Best time to visit Bali 2026 | **Best & Worst Months to Visit Bali 2026: Month-by-Month Weather Guide** | 225k | 0.10% |
| Galungan & Kuningan | Galungan and Kuningan in Bali - Everything... | **Galungan & Kuningan 2026/2027: Complete Guide to Bali's Most Important Festival** | 232k | 0.20% |
| Bali Currency | Bali Currency \| The Ultimate Guide to Money in Bali | **Bali Currency Guide 2026: IDR Rates, ATMs, Cards & Tipping (Updated)** | 144k | 0.28% |
| Power Adapter | What Power Adapter for Bali? Bali Plug & Socket Guide | **Bali Power Adapter Guide: What Plug Type F + Voltage You Need (2026)** | 90k | 0.29% |
| Is Bali Safe | Is Bali Safe? 2026 Safety Tips and Advice Guide | **Is Bali Safe for Tourists in 2026? (Honest Guide + Solo Female Tips)** | 90k | 0.15% |
| Bali Trip Cost | Bali Trip Cost \| How Much Does It Cost... 2025 Guide | **Bali Trip Cost 2026: Honest Budget Breakdown ($30 Backpacker to $500 Luxury)** | 107k | 0.42% |
| 6-Star Hotel | What Is a 6 Star Hotel? All You Need to Know... | **What Is a 6-Star Hotel? The Ultimate Guide to Ultra-Luxury Stays** | 44k | 0.28% |
| Honeymoon Package | Bali Honeymoon Package \| Honeymoon Packages In Bali | **Bali Honeymoon Package 2026: All-Inclusive Luxury from $XXX/night** | 17k | 0.85% |

---

## 5. Site Overview (Current State)

| Metric | Value |
|---|---|
| **Domain Rank (Semrush)** | #129,308 |
| **Organic Keywords** | 5,545 |
| **Monthly Organic Traffic** | ~14,138 |
| **GSC Clicks (28d)** | 91 (↓21%) |
| **GSC Impressions (28d)** | 8,533 (↑128%) |
| **Primary Competitor (overlap)** | bali.com (692 shared keywords) |
| **CMS** | WordPress + Polylang (EN) |
| **Hosting** | GCP gda-ce01 (nginx + LiteSpeed) |
| **SEO Plugin** | Yoast SEO Premium 27.7 |
| **Schema** | WP Schema Pro |

---

## Priority Roadmap

```
Week 1 ─── Rewrite all 8 meta titles → Fix sitemap noindex → Disable WP Rocket
Week 2 ─── Internal link blog → booking pages → Update Nyepi content
Week 3 ─── Honeymoon page SEO overhaul → Audit Yoast category settings
Week 4 ─── Target luxury keywords → Start backlink outreach
```

> Generated by Hermes — no changes made, view-only audit.
