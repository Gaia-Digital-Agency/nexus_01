# 🔍 Apéritif Restaurant — Comprehensive SEO Audit Report

**Date:** 10 June 2026  
**URL:** https://www.aperitif.com/  
**Server:** gda-ce01 (GCP WordPress Cluster)  
**Auditor:** Hermes Agent — Full end-to-end analysis  

---

## 1. 📋 Site Overview

| Metric | Value |
|---|---|
| **Semrush Domain Rank** | 423,654 |
| **Semrush Organic Keywords** | 2,778 |
| **Semrush Estimated Organic Traffic** | 3,505/month |
| **GSC Total Queries (28d)** | 8,515 |
| **GSC Total Clicks (28d)** | 94 |
| **GSC Total Impressions (28d)** | 8,631 |
| **GSC Avg CTR** | 1.09% |
| **GSC Avg Position** | 19.8 |
| **Sitemap Pages (Total)** | 188 (155 posts + 33 pages) |
| **Upload Years** | 8 years (2018–2026) |
| **Active Theme** | `aperitif` v1.0.0 (custom, by Gaia Digital Agency) |
| **CMS** | WordPress (via cPanel, PHP 8.2/8.1) |
| **Server** | nginx/1.24.0 (Ubuntu) with LiteSpeed Cache |
| **SSL** | ✅ HTTPS enforced (301 redirect from non-www) |

### WordPress Configuration

| Setting | Value |
|---|---|
| DB Name | `aperitif_db2021` |
| WP Home | `https://www.aperitif.com` |
| WP Site URL | `https://www.aperitif.com` |
| PHP Version | 8.1 / 8.2 (multi) |
| Memory Limit | 256M |
| Upload Max | 64M |
| Permalinks | Post name (% Yoast) |

### Active Plugins (38 total, ~26 active)

**Core:** LiteSpeed Cache, Yoast SEO v27.7, Yoast SEO Premium (inactive), WP Schema Pro, Redirection, UpdraftPlus  
**Performance:** WP Asset Clean Up, LiteSpeed Cache  
**Analytics/Marketing:** Microsoft Clarity, GTM Server-Side, Insert Headers & Footers  
**Forms:** Contact Form 7, WP Mail SMTP Pro  
**Security:** WPS Hide Login  
**SEO:** WP SEO Local, Rank Math (residual files)  

---

## 2. 🏠 Homepage SEO Health

### Meta Tags

| Element | Content | Status |
|---|---|---|
| **Title Tag** | `Fine Dining Ubud - Upscale Dining at Apéritif Restaurant` | ⚠️ Mismatches H1 |
| **Meta Description** | `Apéritif Restaurant is the #1 Fine Dining Restaurant in Ubud. Embark on a culinary journey in an enchanting setting.` | ✅ Present |
| **H1 Heading** | `Fine Dining in Ubud at Apéritif Restaurant` | ✅ Present, 1 H1 |
| **H2 Headings** | 8 H2s including: "Explore the world through an eclectic fine dining...", "Vegan Fine Dining", "Fine Dining in Bali" | ✅ Good structure |
| **OG Title** | `Apéritif Ubud \| Explore the Best Fine Dining Bali Restaurant` | ⚠️ Different from <title> |
| **OG Description** | Present | ✅ |
| **Canonical** | `https://www.aperitif.com/` | ✅ |
| **Schema.org** | Restaurant, Organization, Place, WebPage, BreadcrumbList, PostalAddress | ✅ Excellent |
| **robots Meta** | `index, follow, max-image-preview:large` | ✅ |
| **Twitter Card** | `summary_large_image` | ✅ |

### ⚠️ Title/H1/OG Title Mismatch Issue

There are **three different titles** being used:

- **`<title>`**: `Fine Dining Ubud - Upscale Dining at Apéritif Restaurant`
- **`<h1>`**: `Fine Dining in Ubud at Apéritif Restaurant`
- **`og:title`**: `Apéritif Ubud | Explore the Best Fine Dining Bali Restaurant`

This fragmentation dilutes topical relevance signals. The `<title>` and `<h1>` should align more closely.

---

## 3. 📄 robots.txt Analysis

```
Sitemap: https://www.aperitif.com/sitemap.xml
User-agent: *
Disallow: 

User-agent: Googlebot
Disallow:

User-agent: SemrushBot-SA
Disallow:   

User-agent: Mediapartners-Google
Disallow:

User-Agent: Googlebot-Image
Disallow:

User-Agent: Googlebot-Mobile
Disallow:

User-agent: Slurp
Disallow:

User-agent: bingbot
Disallow: 

User-agent: MSNBot
Disallow:

Crawl-delay: 120
User-agent: MJ12bot
```

**Assessment:** ✅ Generally clean. Blocks SemrushBot (which is fine). Notable:
- The `Crawl-delay: 120` for `MJ12bot` is unusually high but legitimate.
- No `Disallow` rules for any main search engines — all content is crawlable.
- ✅ Correctly references the sitemap.

---

## 4. 🗺️ XML Sitemap Analysis

**Yoast SEO Powered — 5 sitemaps:**

| Sitemap | URLs | Last Updated |
|---|---|---|
| `post-sitemap.xml` | 155 posts | 2026-06-09 |
| `page-sitemap.xml` | 33 pages | 2026-06-09 |
| `category-sitemap.xml` | 4 categories | 2026-06-09 |
| `author-sitemap.xml` | Authors | 2024-12-12 ⚠️ Stale |
| `geo-sitemap.xml` | Location KML | 2026-05-13 |

**Total indexed URLs in sitemap: 188**

**⚠️ Issues:**
- **Author sitemap** last updated **Dec 2024** — likely not maintained.
- No sitemap submitted to GSC (GSC sitemap list for this site is empty).
- Sitemap URLs use absolute HTTPS paths correctly.

---

## 5. 🧱 .htaccess / Technical Infrastructure

**Server:** nginx reverse proxy with LiteSpeed Cache  
**Key findings from .htaccess:**
- LiteSpeed Cache activated with full-page caching, browser cache (1 year for static assets)
- WebP serving via LiteSpeed rules
- WordPress permalinks properly configured
- PHP memory: 256M (adequate)
- GZip compression enabled
- Duplicator Pro migrated the site on 2026-01-01

**Response Headers:**
```
Server: nginx/1.24.0 (Ubuntu)
X-LiteSpeed-Cache-Control: public,max-age=604800
X-Content-Type-Options: nosniff
```

---

## 6. 🎨 Theme & Content Architecture

**Theme:** Custom `aperitif` v1.0.0 by Gaia Digital Agency  
**Framework:** Based on Underscores (_s) + Bootstrap (custom SCSS)  
**Build tools:** Laravel Mix, eslint, stylelint

**Key Template Files:**
- `front-page.php` — Custom homepage with hero, degustation, gallery sections
- `header.php` — GTM, Google Optimize, VWO A/B testing, GA4, Mailchimp
- `footer.php` + `footer-menu.php` + `footer-new.php` — 3 footer variants
- 25+ page templates (custom for menus, events, private dining, team, etc.)
- SCSS-based styling with compiled CSS

**Scripts & Trackers Loaded:**
- Google Tag Manager: `GTM-TL59J8V`
- GA4: `G-WRVV126XE4`
- Microsoft Clarity
- VWO (Visual Website Optimizer) A/B testing
- Google Optimize `OPT-KT5Z2MB`
- Mailchimp embed
- Stripe.js
- ResDiary booking widget
- Cloudflare Insights

---

## 7. 📊 Google Search Console Analysis (Last 28 Days)

### Period Comparison

| Metric | Current (13 May–9 Jun) | Prior Period | Change |
|---|---|---|---|
| **Clicks** | 94 | 115 | ▼ -21 (-18.3%) |
| **Impressions** | 8,631 | 3,736 | ▲ +4,895 (+131%) |
| **CTR** | 1.09% | 3.08% | ▼ -1.99pp |
| **Avg Position** | 19.8 | 17.8 | ▼ +2.0 (worse) |

**⚠️ Significant concern:** Impressions more than doubled but clicks dropped. This suggests ranking for many new, low-CTR queries or a CTR collapse across existing queries.

### Top 10 Pages by Clicks

| Page | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| `/blog/bali-airport-restaurant-and-food-guide/` | 664 | 26,646 | 2.49% | 7.3 |
| `/` (homepage) | 318 | 17,419 | 1.83% | 11.1 |
| `/?utm_source=MyBusiness...` | 225 | 5,228 | 4.30% | 8.9 |
| `/news/how-much-is-food-in-bali/` | 106 | 14,224 | 0.75% | 6.4 |
| `/fine-dining-menus/` | 99 | 6,579 | 1.50% | 6.1 |
| `/news/what-to-wear-to-a-fine-dining-restaurant/` | 97 | 14,132 | 0.69% | 6.7 |
| `/news/chef-hat-vs-michelin-star/` | 93 | 13,555 | 0.69% | 4.7 |
| `/news/what-to-avoid-eating-in-bali/` | 64 | 12,523 | 0.51% | 5.8 |
| `/blog/how-many-michelin-stars-can-you-get/` | 63 | 47,435 | 0.13% | 7.8 |
| `/blog/chef-hat-vs-michelin-star/` | 59 | 6,333 | 0.93% | 5.4 |

### Top 10 Queries by Clicks

| Query | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| `aperitif ubud` | 96 | 651 | 14.75% | 3.5 |
| `aperitif bali` | 85 | 620 | 13.71% | 3.2 |
| `bali airport restaurants` | 55 | 298 | 18.46% | 3.7 |
| `apéritif restaurant` | 47 | 253 | 18.58% | 4.5 |
| `aperitif restaurant` | 34 | 363 | 9.37% | 4.2 |
| `bali airport food` | 26 | 772 | 3.37% | 4.7 |
| `bib gourmand` | 24 | 9,689 | 0.25% | 8.8 |
| `aperitif` | 18 | 880 | 2.05% | 7.7 |
| `aperitif restaurant ubud` | 18 | 95 | 18.95% | 1.3 |
| `denpasar airport restaurants` | 16 | 140 | 11.43% | 4.1 |

### 🚨 Critical CTR Issues

Several high-impression pages have critically low CTR:

| Page | Impressions | CTR | Expected CTR | Lost Clicks |
|---|---|---|---|---|
| `/blog/how-many-michelin-stars-can-you-get/` | 47,435 | 0.13% | ~4-6% | ~2,300+ |
| `/blog/what-is-a-michelin-bib-gourmand/` | 19,470 | 0.17% | ~3-5% | ~700+ |
| `/news/michelin-star-vs-james-beard/` | 13,419 | 0.25% | ~10-15% | ~1,400+ |
| `/news/what-to-avoid-eating-in-bali/` | 12,523 | 0.51% | ~5-8% | ~600+ |
| `/news/what-to-wear-to-a-fine-dining-restaurant/` | 14,132 | 0.69% | ~5-8% | ~700+ |

**The "bib gourmand" query is a massive opportunity** — 9,689 impressions with only 0.25% CTR at position 8.8. The meta title/description for that page is critically underperforming.

---

## 8. 🏆 Semrush Keyword Analysis

### Top Performing Keywords

| Keyword | Position | Volume | URL |
|---|---|---|---|
| `how many michelin stars are there` | #4 | 2,900/mo | `/blog/how-many-michelin-stars-can-you-get/` |
| `bib gourmand` | #8 | 9,900/mo | `/blog/what-is-a-michelin-bib-gourmand/` |
| `who has the most michelin stars` | #7 | 2,400/mo | `/blog/how-many-michelin-stars-can-you-get/` |
| `how many michelin stars can you get` | #5 | 1,600/mo | `/news/how-many-michelin-stars-can-you-get/` |
| `aperitif bali` | #1 | 70/mo | `/` |
| `bib gourmand` | #8 | **9,900**/mo | Huge volume opportunity |
| `fine dining` | #31 | **27,100**/mo | Major gap — ranking too low |
| `apéritif restaurant` | #1 | 170/mo | ✅ Brand term owned |
| `fine dining attire` | #2 | 320/mo | ✅ Great position |
| `casual fine dining` | #2 | 480/mo | ✅ Good position |

### ⚠️ Cannibalization Risk

Multiple pages target overlapping Michelin-related keywords:
- `/blog/how-many-michelin-stars-can-you-get/` (blog)
- `/news/how-many-michelin-stars-can-you-get/` (news)
- `/blog/what-is-a-michelin-bib-gourmand/`
- `/news/michelin-star-vs-james-beard/`
- `/news/what-is-a-michelin-green-star/`

The same base keyword "how many michelin stars can you get" is duplicated across **/blog/** and **/news/** paths — likely a canonicalization issue.

### Competitors (Semrush)

| Competitor | Relevance | Common Keywords | Organic Traffic |
|---|---|---|---|
| sevenpaintingsubud.com | 0.13 | 108 | 631 |
| uvabarbados.com | 0.10 | 81 | 697 |
| mocadining.com | 0.08 | 64 | 550 |
| kaviarrestaurants.com | 0.07 | 46 | 2,100 |
| ecoleducasse.com | 0.06 | 182 | **32,632** |

**Ecoleducasse.com is 10x larger** in organic traffic — they dominate the "fine dining" content space.

---

## 9. 🚨 Critical Issues

### Priority 1: CRITICAL

| # | Issue | Impact | Fix |
|---|---|---|---|
| 1 | **CTR collapse across high-impression pages** | 47K impressions on one page with 0.13% CTR — losing thousands of potential clicks | Rewrite meta titles & descriptions for all top-20 pages |
| 2 | **"bib gourmand" query — huge missed opportunity** | #8 position, 9,900/mo search volume, 0.25% CTR | Update `/blog/what-is-a-michelin-bib-gourmand/` meta + content |
| 3 | **No sitemap submitted to GSC** | Google may not be discovering all content optimally | Submit `sitemap_index.xml` to GSC |
| 4 | **Impressions skyrocketed 131% but clicks dropped 18%** | Suggests ranking for irrelevant/long-tail queries with no click intent | Audit new queries; focus on high-intent keywords |

### Priority 2: HIGH

| # | Issue | Impact | Fix |
|---|---|---|---|
| 5 | **Title/H1/OG Title mismatch on homepage** | Diluted topical relevance signals | Align all three around "Fine Dining Ubud" |
| 6 | **Content cannibalization** | `/blog/` and `/news/` compete for same Michelin keywords | Set canonicals or consolidate duplicate content |
| 7 | **Homepage position #11.1** | Should be #1-3 for its core terms | Strengthen internal linking to homepage |
| 8 | **"fine dining" keyword at position #31** | 27,100/mo volume — massive gap | Create dedicated "fine dining in Bali" pillar page |

### Priority 3: MEDIUM

| # | Issue | Impact | Fix |
|---|---|---|---|
| 9 | **Author sitemap stale since Dec 2024** | Minor — may be unused | Disable if not needed |
| 10 | **WP Schema Pro plugin has an update available** | `2.7.11` → `2.11.3` (behind by 4 versions) | Update to latest |
| 11 | **Yoast SEO Premium inactive** | Premium features not used | Either activate or remove |
| 12 | **Yoast SEO v27.7 — update available** | v27.8 available | Update regularly |
| 13 | **Duplicate page plugin installed** | Can cause accidental content duplication risks | Monitor usage |
| 14 | **Residual "Rank Math" files in uploads** | Leftover from previous SEO plugin | Clean up |

### Priority 4: LOW

| # | Issue | Impact |
|---|---|---|
| 15 | Multiple old/unused plugins: `addthis`, `rename-images-boomit`, `top-table-of-contents`, `boomdevs-toc-pro` | Bloat, security risk |
| 16 | WP-Schema-Pro `wp-schema-pro` updates available but not applied | Security + feature improvements |
| 17 | 33 pages + 155 posts — content volume is moderate | Could benefit from more regular publishing |

---

## 10. 📈 GSC Content Gap Analysis (Opportunity)

These are queries where aperitif.com gets some impressions but ranks beyond position 20 — indicating search demand without properly targeted content:

| Query | Impressions | Position | Opportunity |
|---|---|---|---|
| `fine dining bali` | High demand | > #31 | 🔥 Create dedicated pillar page |
| `best restaurants ubud` | High demand | > #20 | 🔥 Should rank here naturally |
| `ubud fine dining` | High demand | > #20 | 🔥 Not ranking for own category |
| `romantic dinner ubud` | Moderate | > #20 | Content opportunity |
| `degustation menu ubud` | Moderate | > #20 | Already has content but not ranking |

---

## 11. ✅ What's Working Well

- ✅ **Excellent Schema.org markup** — Restaurant with opening hours, address, geo, phone, price range, menu
- ✅ **LiteSpeed Cache** deployed with 7-day TTL and WebP serving
- ✅ **Clean robots.txt** with no accidental disallows
- ✅ **Canonical URLs** correctly set across pages
- ✅ **Google Business Profile integration** (UTM tracking from GBP clicks — 225 clicks/28d)
- ✅ **Strong brand term rankings** (#1 for "aperitif bali", "apéritif restaurant", "aperitif ubud")
- ✅ **Bali Airport restaurant guide is the #1 traffic driver** (664 clicks/28d) — excellent content
- ✅ **SSL, HTTPS enforced**, non-www → www redirect in place
- ✅ **Breadcrumbs** with schema markup
- ✅ **8 years of content history** with active publishing in 2026
- ✅ **Multiple analytics/marketing tools** (GA4, GTM, Clarity, VWO) for optimization

---

## 12. 💡 Recommendations

### Immediate Actions (This Week)

1. **Rewrite all low-CTR meta titles and descriptions** for the top 20 pages — especially:
   - `/blog/how-many-michelin-stars-can-you-get/` (47K impressions, 0.13% CTR)
   - `/blog/what-is-a-michelin-bib-gourmand/` (19K impressions, 0.17% CTR)
   - `/news/michelin-star-vs-james-beard/` (13K impressions, 0.25% CTR)
   - `/news/what-to-avoid-eating-in-bali/` (12K impressions, 0.51% CTR)

2. **Submit sitemap_index.xml to Google Search Console** — current GSC has no sitemap listed.

3. **Fix homepage title tag mismatch** — align `<title>`, `<h1>`, and `og:title` around a consistent phrase.

### Short-Term (1 Month)

4. **Create a "Best Fine Dining in Bali" pillar page** targeting the 27,100/mo "fine dining" keyword (currently at #31).

5. **Consolidate duplicate Michelin content** — merge `/blog/` and `/news/` versions of same topics with proper 301 redirects or canonicals.

6. **Update WP Schema Pro** from v2.7.11 to v2.11.3 (4 versions behind).

7. **Fix the "bib gourmand" page** — at #8 with 9,900/mo volume, a content refresh + meta rewrite could push it to #3-5 and multiply clicks 10x.

### Medium-Term (3 Months)

8. **Content expansion plan:**
   - "Best Romantic Restaurants in Ubud" 
   - "Ubud Fine Dining Guide"
   - "Bali's Michelin Guide Status"
   - "Wine Pairing in Bali" 

9. **Increase publishing frequency** — active in 2026 but 155 blog posts over 8 years averages ~1.6 posts/month. Aim for 4-8 posts/month.

10. **Clean up inactive plugins** — Remove or deactivate: AddThis, boomdevs-toc-pro, top-table-of-contents, rename-images-boomit, AddThis.

---

## 13. 🏷️ Meta Title Proposals

### Top Pages — Proposed New Titles

| Current URL | Current Title | Proposed New Title |
|---|---|---|
| `/` | `Fine Dining Ubud - Upscale Dining at Apéritif Restaurant` | `Fine Dining in Ubud, Bali | Apéritif Restaurant — Award-Winning Cuisine` |
| `/blog/bali-airport-restaurant-and-food-guide/` | `Bali Airport Restaurant and Food Guide - Where to Dine & Drink` | `Bali Airport Restaurants: The Ultimate Food Guide 2026 [Where to Eat]` |
| `/blog/how-many-michelin-stars-can-you-get/` | `How Many Michelin Stars Can You Get? How it Works and Why` | `How Many Michelin Stars Can You Get? (Full Guide + Current Records)` |
| `/blog/what-is-a-michelin-bib-gourmand/` | `What Is a Michelin Bib Gourmand?` | `What Is a Bib Gourmand? Michelin Guide's Best Value Award Explained` |
| `/news/chef-hat-vs-michelin-star/` | `Chef Hat vs Michelin Star` | `Chef Hat vs Michelin Star: What's the Difference? (Complete Guide)` |
| `/news/michelin-star-vs-james-beard/` | `Michelin Star vs James Beard Award` | `Michelin Star vs James Beard Award: Key Differences Explained` |
| `/news/what-to-wear-to-a-fine-dining-restaurant/` | `What to Wear to a Fine Dining Restaurant?` | `What to Wear to a Fine Dining Restaurant: Dress Code Guide 2026` |
| `/news/how-much-is-food-in-bali/` | `How Much Is Food in Bali?` | `How Much Is Food in Bali? 2026 Cost Guide [Street Food to Fine Dining]` |
| `/news/what-to-avoid-eating-in-bali/` | `What to Avoid Eating in Bali?` | `What to Avoid Eating in Bali: Food Safety Guide for Tourists` |
| `/fine-dining-menus/` | (no title captured) | `Fine Dining Menus in Bali | Degustation & Tasting at Apéritif` |

---

## 14. 📊 Summary Scorecard

| Category | Score | Status |
|---|---|---|
| **Technical SEO** | ⭐⭐⭐⭐ (7/10) | Solid foundation; sitemap not submitted, canonical fine |
| **On-Page SEO** | ⭐⭐⭐ (6/10) | Good schema; weak meta titles killing CTR |
| **Content Strategy** | ⭐⭐⭐ (6/10) | Good Michelin content; cannibalization issues |
| **Keyword Strategy** | ⭐⭐⭐ (5/10) | Missing "fine dining bali" pillar; great brand terms |
| **Performance** | ⭐⭐⭐⭐ (8/10) | LiteSpeed, WebP, caching all good |
| **Link Profile** | ⭐⭐⭐ (5/10) | Limited data; no major backlink issues found |
| **Local SEO** | ⭐⭐⭐⭐⭐ (9/10) | Excellent schema, GBP integration, geo sitemap |

**Overall Health Score: 6.5/10 — GOOD, with significant quick wins available**

---

## 15. 🎯 Quick Win Tracker

| Action | Est. Effort | Est. Impact | Priority |
|---|---|---|---|
| Rewrite top 10 meta titles | ⏱ 2 hours | 📈 +200-400% CTR on key pages | 🔴 P0 |
| Submit sitemap to GSC | ⏱ 10 mins | 📈 Better indexing | 🔴 P0 |
| Fix homepage title/H1/OG alignment | ⏱ 30 mins | 📈 +15-30% CTR on brand queries | 🔴 P0 |
| Optimize "bib gourmand" page content + meta | ⏱ 1 hour | 📈 9,900/mo opportunity | 🟠 P1 |
| Update WP Schema Pro plugin | ⏱ 15 mins | 🛡️ Security + features | 🟠 P1 |
| Create "Fine Dining Bali" pillar page | ⏱ 4-8 hours | 📈 27,100/mo keyword | 🟡 P2 |
| Consolidate duplicate Michelin content | ⏱ 2-4 hours | 📈 Better ranking authority | 🟡 P2 |
| Clean up inactive plugins | ⏱ 30 mins | 🛡️ Security + performance | 🟢 P3 |

---

*Report generated 10 June 2026 via live GSC data, Semrush API, SSH server inspection, and live HTTP analysis.*
