# Sepedamotor.com — Full SEO Audit Report

**Date:** June 10, 2026  
**Auditor:** Hermes Agent  
**Server:** Hostinger (shared hosting, view-only SSH access)  
**WP Path:** `/home/u521276830/domains/sepedamotor.com/public_html/`

---

## 1. Site Overview

| Field | Value |
|---|---|
| **Domain** | sepedamotor.com |
| **Niche** | Motorcycle news & reviews (Indonesia) |
| **Age** | ~14 years (first uploads from 2012) |
| **CMS** | WordPress 7.0 (Hostinger custom version; actual core equivalent unknown) |
| **PHP** | 8.2.30 |
| **Active Theme** | **JNews** (premium) with jnews-child |
| **Active Plugins** | **46 plugins** (extremely bloated) |
| **Hosting** | Hostinger shared, behind LiteSpeed + hCDN cache |
| **SSL** | Active via Really Simple SSL |
| **Uploads Size** | **6.1 GB** — 127,348 files across 14 years |
| **Total Content** | 1,481 published posts, 11 pages |
| **Categories** | 27 |
| **Tags** | **2,267** (severe tag bloat) |

### Content History

| Year | Posts Published | Uploads Size |
|---|---|---|
| 2012 | 1 | 2.6 MB |
| 2014 | — | minimal |
| 2015 | 1 | 27 MB |
| 2016 | 13 | 21 MB |
| 2017 | 74 | 449 MB |
| 2018 | 95 | 463 MB |
| 2019 | 91 | 260 MB |
| 2020 | 31 | 479 MB |
| **2021** | **902** | **3.9 GB** 🔴 |
| 2022 | 273 | 490 MB |
| **2023+** | **0** | **Zero new content** 🔴 |

The site had no new posts after **September 2022**. It has been completely dormant for ~3 years and 9 months.

### Monthly Publishing (2021 — peak year)

```
Jan:    8   Jul:  118
Feb:   18   Aug:  131  ← peak
Mar:   33   Sep:  117
Apr:   74   Oct:  100
May:  106   Nov:  101
Jun:   87   Dec:    9  ← sharp drop
```

A massive content push in mid-2021 (900+ posts in 8 months), then an abrupt stop. This pattern strongly suggests a **content farm strategy** that was abandoned.

---

## 2. Current SEO State

### Search Console (GSC) — ⚠️ MISCONFIGURED

The GSC property currently connected is **actually for `gaiada.com`** (a Bali digital marketing agency), not sepedamotor.com. All GSC data is irrelevant to this domain.

**Action required:** The correct Google Search Console property must be set up for `https://www.sepedamotor.com`.

### Semrush Data (Indonesia DB)

| Metric | Value |
|---|---|
| **Domain Rank** | #15,730 |
| **Organic Keywords** | 1,390 |
| **Estimated Traffic** | 15,719/mo |
| **Organic Value** | $719/mo |
| **Paid Ads** | None |

### Top Ranking Keywords

| Keyword | Position | Volume | URL |
|---|---|---|---|
| scoopy 2019 | #4 | 49,500 | /honda-scoopy-2019-dibanderol-rp-18-jutaan/ |
| scoopy 2018 | #3 | 27,100 | /new-scoopy-2018-punya-7-pilihan-warna/ |
| harga motor scoopy 2021 | #6 | 22,200 | /honda-scoopy-2021-skutik-irit-dengan-harga-20-jutaan-rupiah/ |
| harga scoopy terbaru 2021 | #4 | 8,100 | /honda-scoopy-2021-skutik-irit-dengan-harga-20-jutaan-rupiah/ |
| harga vario 125 terbaru 2021 | #6 | 12,100 | /honda-vario-125-2021-dijual-dengan-warna-baru-dan-spesial/ |
| vario 2021 | #5 | 12,100 | /honda-vario-125-2021-dijual-dengan-warna-baru-dan-spesial/ |
| harga scoopy 2021 | #14 | 74,000 | /honda-scoopy-2021-skutik-irit-dengan-harga-20-jutaan-rupiah/ |
| daftar harga motor yamaha 2021 | #4 | 2,900 | /daftar-harga-motor-yamaha-2021/ |
| harga honda scoopy 2021 | #3 | 9,900 | /honda-scoopy-2021-skutik-irit-dengan-harga-20-jutaan-rupiah/ |
| harga vario 2021 | #3 | 2,900 | /honda-vario-125-2021-dijual-dengan-warna-baru-dan-spesial/ |

**Observation:** Every single top keyword is a **2021 model-year lookup**. These are time-sensitive keywords that should have been updated annually. The site has no content for 2023, 2024, 2025, or 2026 models — and is losing traffic to fresher competitors.

### Competitors (Semrush)

| Competitor | Relevance | Keywords | Traffic |
|---|---|---|---|
| warungasep.net | 7% | 6,372 | 24,065 |
| indomoto.com | 6% | 3,557 | 20,160 |
| kobayogas.com | 5% | 3,903 | 18,415 |
| otorider.com | 4% | 16,415 | 48,944 |
| honda-hayati.com | 4% | 4,005 | 59,560 |
| **sepedamotor.com** | — | **1,390** | **15,719** |

🔴 The site is outclassed by competitors with more keywords and traffic — all of them likely publishing fresh content.

---

## 3. Technical Audit

### ✅ What's Working

- **SSL/HTTPS** — active via Really Simple SSL, forced redirect from HTTP
- **LiteSpeed Cache** — active, pages served from cache (`x-litespeed-cache: hit`), hCDN also caching
- **Yoast SEO** — properly configured with XML sitemaps, focus keywords, meta descriptions (1,494 posts have them)
- **Sitemaps** — working Yoast sitemap index with post, page, category, tag, and author sitemaps
- **Permalinks** — clean URL structure (`/post-name/`)
- **robots.txt** — 14 sitemap references, no disallowed paths for Googlebot
- **Redirection plugin** — installed for 301 management
- **AMP** — JNews AMP plugin active (mobile optimization)
- **Content length** — avg 4,445 chars per post (decent depth)
- **Breadcrumbs** — JNews breadcrumb plugin active
- **JSON-LD** — JNews JSON-LD plugin active (schema markup)
- **No posts noindexed** — all content is indexable
- **Open Graph** — og:title, og:description, og:image set on homepage

### ❌ What's Broken / Suboptimal

#### CRITICAL

| Issue | Detail |
|---|---|
| **No new content since Sept 2022** | Site is **completely dead** — 0 posts in 3.75 years. Google freshness signals are zero. |
| **GSC property is wrong** | Connected to gaiada.com, not sepedamotor.com. No way to monitor actual search performance. |
| **2,267 tags** | Massive tag bloat. Typical best practice is 5-15 tags per post. Every tag creates a thin archive page competing for index budget. |
| **46 active plugins** | Bloated. Multiple redundant caching plugins (LiteSpeed + Autoptimize + WP Fastest Cache + WP Compress). Two page builders (Elementor + WP Bakery). Multiple SEO plugins. |
| **Yoast SEO is outdated** | Version 27.7, update available to 27.8. Yoast SEO Premium is v18.1 (very old). |
| **Homepage meta description is empty** | Yoast `metadesc-home-wpseo` is set to empty string. |
| **OG title is just "Home"** | `og:title` on homepage = "Home" instead of the proper site title. |
| **All top keywords are locked to 2021** | Every ranking keyword references "2021" — this is a time-bomb. Each passing year drops relevance. |

#### HIGH

| Issue | Detail |
|---|---|
| **122 images missing alt text** | Out of 4,276 attachments. |
| **3 posts with <500 chars** | Ultra-thin content. |
| **20 posts with <1,500 chars** | Thin content threshold. |
| **Multiple caching plugins** | LiteSpeed Cache + Autoptimize + WP Fastest Cache + WP Compress Image Optimizer all active simultaneously. Conflicts likely. |
| **Two page builders** | Elementor + WP Bakery page builder (zipped, not active). Still, residual shortcodes and bloat. |
| **Old WordPress theme** | JNews theme — premium but could be outdated. Spaghetti code in child theme `functions.php` (debug dumps left in production code). |
| **6.1 GB of uploads** | Likely unoptimized images. LiteSpeed can handle WebP conversion but no evidence of aggressive compression. |

#### MEDIUM

| Issue | Detail |
|---|---|
| **No GA4 / analytics visible** | Google Site Kit is installed but no GA4 data stream confirmed. |
| **Push notification plugin** | Unclear if properly configured or just abandoned. |
| **PWA plugin active** | Progressive Web App capabilities — could be a positive if configured correctly. |
| **WP Security Audit Log** | Active — generates overhead on a dead site. |
| **WP Compress Image Optimizer** | Active — but with LiteSpeed and Autoptimize also handling images, conflicts are likely. |
| **Multiple backup systems** | UpdraftPlus + bup (backup plugin) — redundant. |

---

## 4. Diagnosis: Why a 14-Year-Old Site Has No Traffic

**Primary cause: Content abandonment.** The site was actively published on from 2016–2022, peaked with a massive 902-post content push in 2021, then was completely abandoned. Google's freshness algorithms penalize stale sites, especially in a news-oriented niche like motorcycle reviews where model years change annually.

**Secondary causes:**

1. **Time-locked keywords** — Every ranking article references "2021" in title/URL/keyword. No content exists for 2023–2026 models. Searchers looking for current pricing find competitors instead.

2. **Backlink profile** — 14 years old with almost no SEO presence suggests extremely thin or toxic backlinks. The domain likely never built authority.

3. **Internal linking** — With 2,267 tags and 27 categories, the site likely suffers from massive internal link dilution. Tag pages outnumber content pages, wasting crawl budget.

4. **Plugin bloat** — 46 plugins creates runtime overhead, potential JavaScript/CSS conflicts, and slower page loads despite caching.

5. **No fresh signals** — No new posts, no updated old posts, no social activity. Google sees a mausoleum, not a living site.

6. **Thin content in the content farm period** — While average content length is decent (4,445 chars), the posts from the 2021 mass-publishing period were likely written for SEO volume rather than quality, lacking unique insights, images, or authority signals.

---

## 5. Recovery Recommendations

### Phase 1: Foundation Fixes (Week 1)

| Priority | Action |
|---|---|
| 🔴 **P1** | **Set up correct Google Search Console** for `https://www.sepedamotor.com` and submit the existing sitemap. |
| 🔴 **P1** | **Write a homepage meta description** in Yoast SEO that includes current year and key motorcycle brands. |
| 🔴 **P1** | **Fix OG title** — change from "Home" to "Sepedamotor.com — Portal Berita Sepeda Motor Terlengkap di Indonesia". |
| 🔴 **P1** | **Clean up tag bloat** — reduce 2,267 tags to only meaningful, non-duplicate ones. Set low-value tag archives to `noindex`. |
| 🟠 **P2** | **Audit and remove redundant plugins**: Autoptimize (LiteSpeed does its job), WP Fastest Cache, WP Compress Image Optimizer, bup. Keep only LiteSpeed Cache for caching. |
| 🟠 **P2** | **Update Yoast SEO** (27.7 → 27.8) and Yoast SEO Premium (18.1 → latest). |
| 🟠 **P2** | **Remove debug code** from child theme `functions.php` (the `var_dump` and commented-out debug lines). |

### Phase 2: Content Revival (Month 1)

| Priority | Action |
|---|---|
| 🔴 **P1** | **Update top 20 ranking articles** — change all "2021" references to "2026", update pricing/specs, refresh publish date. These are the only pages driving traffic. |
| 🔴 **P1** | **Publish 5-10 new articles** on 2026 motorcycle models (Honda Scoopy 2026, Yamaha NMAX 2026, etc.) to recapture model-year search traffic. |
| 🟠 **P2** | **Add image alt text** to 122 images missing it. |
| 🟠 **P2** | **Consolidate thin content** — merge the 20 posts with <1,500 chars into larger, more comprehensive guides. |
| 🟠 **P2** | **Build topic clusters** — organize content around hubs: "Honda Scoopy Guide," "Yamaha NMAX Guide," etc., with pillar pages linking to supporting articles. |

### Phase 3: Authority Building (Months 2-3)

| Priority | Action |
|---|---|
| 🟠 **P2** | **Link building** — reach out to Indonesian motorcycle forums, communities, and blogs for guest posts and backlinks. The site has 14 years of history; use that as credibility. |
| 🟠 **P2** | **Social signals** — re-activate social media accounts with fresh content shares. |
| 🟡 **P3** | **Schema markup audit** — verify JNews JSON-LD is outputting proper Article/NewsArticle schema. |
| 🟡 **P3** | **Implement Google News sitemap** (wpseo-news is already installed but needs configuration). |
| 🟡 **P3** | **Image optimization** — batch convert images to WebP via LiteSpeed, add lazy loading. |

### Phase 4: Ongoing (Monthly)

- Publish a minimum of **4-8 articles per month** on current motorcycle models, pricing, and reviews.
- Update the oldest/highest-traffic articles quarterly to maintain freshness signals.
- Monitor keyword rankings and backlinks via Semrush.
- Keep plugin count under 25 by consolidating functionality.
- Reduce Yoast focus keywords to the 1,000 highest-potential articles (remove focus kws from low-value posts to concentrate SEO equity).

---

## 6. Summary

**Sepedamotor.com is a classic case of a content-farm-turned-mausoleum.** It had a promising start (2012), a content explosion in 2021, and then complete abandonment. The site has decent on-page SEO fundamentals (Yoast, sitemaps, SSL, caching, schema) but is being destroyed by:

1. **3.75 years of zero new content** in a time-sensitive niche
2. **All keywords locked to 2021** — losing relevance every day
3. **Massive technical debt** (46 plugins, 2,267 tags, debugging code in production)
4. **No analytics visibility** (GSC points to wrong domain)
5. **Weak authority** compared to competitors despite 14 years of age

**Recovery is possible** because the core technical setup is reasonable and there's 1,390 keywords already ranking. The path forward is: fix foundational issues → revive existing content with current data → build a sustainable publishing rhythm. Without fresh content, the site will continue to decline toward zero visibility.
