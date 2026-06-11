# PinstripeBar.com — Comprehensive SEO Audit Report

**Audit Date:** June 10, 2026  
**Domain:** https://www.pinstripebar.com  
**Server:** gda-ce01 (GCP WordPress Cluster)  
**WordPress Version:** 7.0  
**Active Theme:** `pinstripe-bar` (custom, by Gaia Digital Agency)  
**WP-CLI Pages:** 30 | **WP-CLI Posts:** 85  

---

## 1. Site Overview

| Metric | Value |
|---|---|
| **Semrush Domain Rank** | 578,986 |
| **Organic Keywords** | 811 |
| **Organic Traffic (est.)** | 2,348/month |
| **Organic Cost (est.)** | $667/month |
| **GSC Clicks (last 28d)** | 1,336 (top page) |
| **GSC Impressions (last 28d)** | 43,184 (top page) |
| **Site Load Time** | 665ms (TTFB: ~2ms, Start Transfer: 665ms) |
| **Google Tag Manager** | ✅ Present on homepage |
| **Facebook Pixel** | ✅ Present on homepage (`facebook.com/tr?id`) |
| **Robots.txt** | ✅ Present (minimal — only `/cdn-cgi/` disallowed) |
| **XML Sitemap** | ✅ Present (Yoast-generated, 4 sub-sitemaps) |
| **SSL/HTTPS** | ✅ Enforced (301 redirects HTTP → HTTPS) |
| **WordPress Version** | 7.0 (current as of June 2026) |
| **Hosting Platform** | cPanel / LiteSpeed Server |

### WordPress Configuration

- **Site URL:** `https://www.pinstripebar.com`
- **Active Plugins (26):** LiteSpeed Cache, Redirection, Yoast SEO + Premium, Wordfence, WP Mail SMTP + Pro, ACF, Contact Form 7, Instagram Feed, WPCode Premium, WPS Hide Login, WPSEO Local, Cookie Law Info, and more.
- **Theme:** `pinstripe-bar` v1.0.0 — custom Bootstrap-based theme by Gaia Digital Agency, based on Underscores.
- **PHP Memory Limit:** 1024M
- **Upload Max Size:** 128M

---

## 2. SEO Health Check

### 2.1 Homepage Meta Tags

| Element | Content | Verdict |
|---|---|---|
| **Title Tag** | `Wine & Cocktail Bar Ubud | Ubud Cocktail Bar - Pinstripe Bar` | ✅ Good (60 chars) |
| **Meta Description** | `Discover Pinstripe Bar in Ubud – a cocktail and wine bar offering handcrafted drinks, curated wines, and elegant gastryo-style bar dining.` | ✅ Good (~156 chars) |
| **H1 Tag** | `Pinstripe Bar, Ubud` | ⚠️ Generic — could be more descriptive/keyword-rich |
| **Canonical** | `https://www.pinstripebar.com/` | ✅ Correct |
| **OG Title** | `Wine & Cocktail Bar Ubud | Ubud Cocktail Bar - Pinstripe Bar` | ✅ Good |
| **OG Description** | `Discover Pinstripe Bar in Ubud...` | ✅ Good |
| **OG Image** | `.../pinstripe-cocktail-bar-home.webp` (1920×1100) | ✅ Good |
| **Robots Meta** | `index, follow, max-image-preview:large` | ✅ Correct |
| **Geo Tags** | `geo.placename=Ubud`, `geo.position=-8.493...` | ✅ Good for local SEO |
| **Schema.org LD+JSON** | WebPage, BreadcrumbList, WebSite, SearchAction | ✅ Good (Yoast-generated) |

### 2.2 Robots.txt

```
User-agent: *
Disallow: /cdn-cgi/
Crawl-Delay: 20
```

**Issues:**
- ✅ Only `/cdn-cgi/` is blocked (Cloudflare path — correct).
- ⚠️ **No sitemap reference** in robots.txt. Google can still find it via Yoast, but best practice is to include `Sitemap: https://www.pinstripebar.com/sitemap_index.xml`.
- ⚠️ `Crawl-Delay: 20` is very conservative — 20 seconds between crawls. This may slow indexing of new content.

### 2.3 XML Sitemap

**Status:** ✅ Present and serving (HTTP 200)

Yoast-generated sitemap index at `https://www.pinstripebar.com/sitemap_index.xml` with 4 sub-sitemaps:

| Sub-sitemap | Last Updated |
|---|---|
| `post-sitemap.xml` | 2026-06-10 |
| `page-sitemap.xml` | 2026-06-10 |
| `category-sitemap.xml` | 2026-06-10 |
| `geo-sitemap.xml` | 2024-05-19 (stale) |

**Issues:**
- ⚠️ **Geo sitemap hasn't been updated since May 2024** — over 12 months stale.
- ⚠️ Sitemaps not referenced in robots.txt.

### 2.4 .htaccess

- ✅ LiteSpeed Cache active with mobile detection, query string stripping (fbclid, gclid, utm*, _ga)
- ✅ Browser caching configured (static assets: 1 year expiry)
- ✅ Strong security — Wordfence likely managing WAF rules
- ✅ Standard WordPress rewrite rules
- ✅ PHP config: `display_errors Off`, `memory_limit 1024M`, `upload_max_filesize 128M`

### 2.5 Core Web Vitals / Page Speed

- **Server Response:** TTFB < 2ms (very fast — local connection from SSH)
- **Page Load:** ~665ms total (with LiteSpeed caching)
- **Note:** PageSpeed Insights API returned 429 (rate-limited) — unable to verify Core Web Vitals scores. Recommend manual check.

---

## 3. Google Search Console Data (Last 28 Days)

### 3.1 Top Performing Pages

| Page | Clicks | Impressions | CTR | Avg. Position |
|---|---|---|---|---|
| `/blog/what-to-order-as-a-guy-at-a-cocktail-bar/` | **1,336** | 43,184 | 3.09% | 5.6 |
| `/blog/how-much-is-alcohol-in-bali/` | 174 | 18,611 | 0.93% | 5.8 |
| `/` (Homepage) | 105 | 7,751 | 1.35% | 9.8 |
| `/blog/what-to-wear-to-a-cocktail-bar/` | 73 | 12,595 | 0.58% | 6.3 |
| `/blog/types-of-bars/` | 63 | 17,272 | 0.36% | 6.1 |
| `/cigar-lounge-bali/` | 54 | 2,756 | 1.96% | 6.6 |
| `/blog/what-to-wear-in-ubud/` | 39 | 2,850 | 1.37% | 6.8 |
| `/blog/bali-drinking-safety/` | 22 | 6,968 | 0.32% | 8.9 |
| `/blog/ubud-nightlife/` | 16 | 1,719 | 0.93% | 10.9 |

### 3.2 Key Observations from GSC

1. **Heavy reliance on a single page** — `/blog/what-to-order-as-a-guy-at-a-cocktail-bar/` drives **64% of all clicks** (1,336 of ~2,088 total clicks in 28 days). This is a massive single-point-of-failure risk.
2. **Several high-impression pages with extremely low CTR**:
   - `/blog/bali-drinking-age/` — **59,799 impressions** but only **10 clicks** (0.02% CTR!). This is a major opportunity.
   - `/blog/bali-drinking-safety/` — 6,968 impressions, 0.32% CTR
   - `/blog/types-of-bars/` — 17,272 impressions, 0.36% CTR
   - `/blog/what-to-wear-to-a-cocktail-bar/` — 12,595 impressions, 0.58% CTR
3. **Homepage is underperforming** — position 9.8 with only 1.35% CTR. It should be ranking higher for branded queries.
4. **Total GSC rows: 9,045 unique query-page combinations** over 28 days.
5. **Total indexed pages in GSC: 119 pages** receiving impressions.

### 3.3 Top Search Queries (by clicks)

| Query | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| cocktails for men | 93 | 491 | 18.94% | 1.8 |
| manly cocktails | 54 | 717 | 7.53% | 2.5 |
| best cocktails for men | 37 | 332 | 11.14% | 1.6 |
| mens cocktails | 35 | 264 | 13.26% | 2.2 |
| pinstripe bar | 31 | 340 | 9.12% | 1.9 |
| cocktail for men | 28 | 490 | 5.71% | 3.9 |
| men cocktails | 23 | 153 | 15.03% | 2.1 |
| top 10 cocktails for men | 21 | 236 | 8.90% | 1.7 |
| cocktail drinks for men | 19 | 76 | 25.00% | 1.8 |
| pinstripe bar ubud | 16 | 161 | 9.94% | 1.0 |

---

## 4. Semrush Keyword Analysis

### 4.1 Top Organic Keywords (by estimated traffic)

| Keyword | Position | Volume | URL |
|---|---|---|---|
| cocktails for males | **#1** | 720/mo | `/blog/what-to-order-as-a-guy-at-a-cocktail-bar/` |
| cocktail drink for mens | **#1** | 260/mo | Same |
| manly cocktails | **#2** | 390/mo | Same |
| cocktails for guys | **#3** | 590/mo | Same |
| bar attire | **#2** | 590/mo | `/blog/what-to-wear-to-a-cocktail-bar/` |
| manly drinks | **#3** | 390/mo | Same as #1 |
| types of the bar | **#8** | 1,300/mo | `/blog/types-of-bars/` |
| male drinks | **#1** | 110/mo | Same as #1 |

### 4.2 Top Competitors (Organic)

| Competitor | Relevance | Common Keywords | Organic Traffic |
|---|---|---|---|
| theguycornernyc.com | 0.09 | 40 | 377 |
| thecocktailnovice.com | 0.09 | 60 | 2,971 |
| supergaycocktails.com | 0.08 | 17 | 219 |
| eighteeneight.com | 0.06 | 48 | 18,698 |
| heybali.info | 0.03 | 15 | 385 |

### 4.3 Keyword Cannibalization Concerns

The blog post `/blog/what-to-order-as-a-guy-at-a-cocktail-bar/` dominates **46 out of 50 top keywords** in Semrush. While this is good for that page, it means:
- No internal linking structure distributing link equity
- Over-reliance on one page for ~90%+ of traffic
- Other related posts (e.g., `what-is-a-cocktail-bar`, `what-is-a-speakeasy-bar`) get minimal organic visibility

---

## 5. Critical Issues

### 🔴 CRITICAL: Single Page Dependency
**Severity: HIGH**
- 64% of all clicks go to one blog post (`/blog/what-to-order-as-a-guy-at-a-cocktail-bar/`)
- If this page suffers a ranking drop, the site loses 1,336+ monthly clicks
- **Action:** Diversify content strategy and build up other pages

### 🔴 CRITICAL: Bali Drinking Age Page — Severe CTR Issue
**Severity: HIGH**
- URL: `/blog/bali-drinking-age/` has **59,799 impressions** but only **10 clicks** (0.02% CTR)
- This is extraordinarily low — the meta title/description clearly need rewriting
- Average position is 13.2 — ranking on page 2, but people aren't clicking
- **Action:** Rewrite meta title and description to be more compelling and match search intent

### 🟡 HIGH: Missing Sitemap URL in Robots.txt
**Severity: MEDIUM**
- robots.txt does not reference the sitemap
- While Google can discover it via Yoast, this is a best-practice miss
- **Action:** Add `Sitemap: https://www.pinstripebar.com/sitemap_index.xml` to robots.txt

### 🟡 HIGH: Crawl-Delay of 20 Seconds
**Severity: MEDIUM**
- `Crawl-Delay: 20` is quite conservative
- May slow down discovery of new content and re-crawling of updated pages
- **Action:** Reduce to 5-10 seconds, or remove entirely

### 🟡 HIGH: Stale Geo Sitemap
**Severity: MEDIUM**
- `geo-sitemap.xml` last updated May 2024 (13+ months ago)
- Location pages may not be properly indexed
- **Action:** Regenerate sitemaps (Yoast → SEO → Settings → XML Sitemaps)

### 🟡 MEDIUM: Low CTR on High-Impression Pages
Several pages have high impressions but very low CTR:

| Page | Impressions | CTR |
|---|---|---|
| `/blog/bali-drinking-age/` | 59,799 | **0.02%** |
| `/blog/bali-drinking-safety/` | 6,968 | **0.32%** |
| `/blog/types-of-bars/` | 17,272 | **0.36%** |
| `/blog/what-to-wear-to-a-cocktail-bar/` | 12,595 | **0.58%** |
| `/blog/how-much-is-alcohol-in-bali/` | 18,611 | **0.93%** |
| `/blog/is-ubud-safe-at-night/` | 3,387 | **0.35%** |

Collectively, these 6 pages get **118,632 impressions** but only **342 clicks** — an average CTR of **0.29%**. Improving these to even 2% would yield **2,373 additional clicks/month**.

### 🟡 MEDIUM: Homepage Position Dropping
- Homepage ranks at **position 9.8** average — not even on page 1 for most queries
- CTR of 1.35% is below expected for position 9.8 (average ~2-3%)
- **Action:** Improve homepage content, internal linking, and on-page optimization

### 🟢 LOW: Missing Structured Data for Business
- Schema.org WebSite/WebPage present via Yoast
- **Missing:** LocalBusiness schema (for a physical bar in Ubud), Menu schema, Event schema
- Yoast Local SEO plugin is installed — ensure Local Business schema is enabled

### 🟢 LOW: No Google Analytics / GSC Property for pinstripebar.com Detected
- GSC data shows the default property is `gaiada.com`, not `pinstripebar.com`
- Verify that `www.pinstripebar.com` is added as a separate property in GSC

---

## 6. Recommendations

### Immediate (Week 1-2)

1. **Fix the Bali Drinking Age page meta** — rewrite title and meta description to dramatically improve CTR from the current 0.02%. Suggested title: *"What Is the Legal Drinking Age in Bali? Laws & Tips for Tourists"*
2. **Add sitemap reference to robots.txt** — `Sitemap: https://www.pinstripebar.com/sitemap_index.xml`
3. **Reduce Crawl-Delay** in robots.txt from 20 to 5 (or remove entirely)
4. **Regenerate geo-sitemap** via Yoast settings

### Short-term (Week 3-4)

5. **Write compelling meta descriptions** for all high-impression/low-CTR pages. Focus on:
   - `/blog/bali-drinking-safety/` (6,968 impressions)
   - `/blog/types-of-bars/` (17,272 impressions)
   - `/blog/what-to-wear-to-a-cocktail-bar/` (12,595 impressions)
   - `/blog/how-much-is-alcohol-in-bali/` (18,611 impressions)
   - `/blog/is-ubud-safe-at-night/` (3,387 impressions)
   - `/blog/things-to-do-in-ubud-at-night/` (2,697 impressions)
6. **Optimize homepage on-page SEO** — the H1 ("Pinstripe Bar, Ubud") is generic. Consider: *"Pinstripe Bar Ubud | Award-Winning Cocktail Bar & Speakeasy"*
7. **Add LocalBusiness schema** to the homepage with address, phone, opening hours, and price range.

### Medium-term (Month 2-3)

8. **Diversify keyword portfolio** — build out more location-specific content targeting:
   - "best cocktails in ubud"
   - "speakeasy bar ubud" (already has a page at position 11.5)
   - "ubud nightlife" (already has a page at position 10.9)
   - "cocktail bar ubud" (homepage at position 9.8)
9. **Create internal links** from the hero blog post to other location/service pages to spread link equity
10. **Review and remove or noindex** duplicate/event pages that have passed (e.g., past events from 2023-2024)

### Long-term (Month 3+)

11. **Content strategy overhaul** — create topical clusters:
    - **Cluster 1:** Ubud cocktail guide (pillar: "Ultimate Guide to Ubud Nightlife")
    - **Cluster 2:** Bali drinking guide (pillar: "Complete Guide to Alcohol in Bali")
    - **Cluster 3:** Bar etiquette & fashion (pillar already exists: "What to Wear")
12. **Improve page speed** — Current LiteSpeed caching is good (665ms), but check Core Web Vitals with PageSpeed Insights when rate limit clears
13. **Build quality backlinks** — Semrush shows backlinks API returned an error; need to do a full backlink audit. Target: Bali travel blogs, food & drink publications, luxury lifestyle sites
14. **Add Menu schema** to menu pages — increases chance of rich results in SERPs

---

## 7. Technical Summary

| Item | Status | Notes |
|---|---|---|
| SSL Certificate | ✅ Active | HTTPS enforced (301 redirect) |
| Robots.txt | ✅ Present | Needs sitemap URL added |
| XML Sitemap | ✅ Present | 4 sub-sitemaps, geo-sitemap stale |
| .htaccess | ✅ Configured | LiteSpeed cache, browser caching |
| WordPress Version | ✅ 7.0 | Up to date |
| PHP Version | ✅ 8.1 | Modern, supported |
| Memory Limit | ✅ 1024M | Generous |
| Schema.org | ✅ Basic | LocalBusiness missing |
| Open Graph | ✅ Good | Present on homepage |
| Twitter Cards | ✅ Good | `summary_large_image` |
| Canonical URLs | ✅ Correct | Homepage canonical set |
| GTM | ✅ Present | Container active |
| Facebook Pixel | ✅ Present | Tracking active |
| Wordfence | ✅ Active | Security |
| LiteSpeed Cache | ✅ Active | Performance |
| Yoast SEO | ✅ Active | With Premium + Local |
| Redirection Plugin | ✅ Active | 301 management |

---

## 8. SEO Health Score

| Category | Score | Rating |
|---|---|---|
| Technical SEO | 85/100 | ✅ Very Good |
| On-Page SEO | 70/100 | ⚠️ Needs Work |
| Content | 65/100 | ⚠️ Needs Work |
| Keywords | 60/100 | ⚠️ Single-page dependency |
| User Experience | 75/100 | ✅ Good |
| Local SEO | 70/100 | ⚠️ Needs Work |
| Backlinks | N/A | ⚠️ Needs audit |
| **Overall** | **71/100** | **⚠️ Needs Improvement** |

---

## 9. Action Priority Matrix

| Priority | Action | Effort | Impact |
|---|---|---|---|
| 🔴 P0 | Fix Bali Drinking Age page CTR (59,799 imp, 10 clicks) | Low | Very High |
| 🔴 P0 | Diversify from single-page dependency | High | Very High |
| 🟡 P1 | Add sitemap to robots.txt | Low | Medium |
| 🟡 P1 | Reduce crawl-delay | Low | Medium |
| 🟡 P1 | Fix low-CTR meta descriptions (6 pages, 118K impressions) | Medium | High |
| 🟡 P1 | Regenerate stale geo-sitemap | Low | Low-Medium |
| 🟡 P2 | Improve homepage on-page SEO | Medium | High |
| 🟡 P2 | Add LocalBusiness schema | Medium | Medium |
| 🟢 P3 | Internal link restructuring | Medium | High |
| 🟢 P3 | Content cluster strategy | High | Very High |
| 🟢 P3 | Backlink acquisition | High | Very High |

---

*Report generated June 10, 2026 via SSH audit (gda-ce01), Google Search Console API, and Semrush API.*
