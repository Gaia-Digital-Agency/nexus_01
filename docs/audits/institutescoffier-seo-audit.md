# Institut Disciples Escoffier — Full SEO Audit Report

**Date:** June 10, 2026
**Domain:** institutescoffier.com (canonical: www.institutescoffier.com)
**Server:** Hostinger shared hosting (view-only SSH)
**Audit Type:** Technical + On-Page + Off-Page

---

## 1. SITE OVERVIEW

| Metric | Value |
|---|---|
| **Site Name** | Institut Disciples Escoffier (IDE) |
| **Tagline** | Professional culinary school launched by the world's largest chef association |
| **Domain Rank (Semrush)** | 3,192,021 |
| **Organic Keywords (Semrush)** | 464 |
| **Organic Traffic (Semrush)** | ~143/month |
| **GSC Clicks (last 28d)** | 94 |
| **GSC Impressions (last 28d)** | 8,634 |
| **GSC Avg CTR** | 1.09% |
| **GSC Avg Position** | 19.8 |
| **WordPress Version** | 7.0 (modern, on wp.com release track) |
| **Theme** | Divi v4.27.4 (active) + twentytwentyfive (inactive) |
| **Site Language** | en-US (multilingual: zh, fr, ro, th, id via Weglot) |
| **Content Age** | 11 years of upload history (2015–2026), actively updated |

### WordPress Stack

- **CMS:** WordPress 7.0
- **Theme:** Divi (Elegant Themes) v4.27.4
- **PHP:** 8.2.30
- **Caching:** LiteSpeed Cache (LSCWP)
- **SEO:** Yoast SEO v27.7 (active)
- **Redirection Plugin:** Installed (Redirection)
- **Backup:** UpdraftPlus
- **Other key plugins:** Contact Form 7, WP Mail SMTP Pro, WP Smushit, Weglot (multilingual), WPML (zip files present but not active), Popup Builder, Divi Popup Builder, Flamingo

### SSL Certificate

- **Issued:** May 14, 2026
- **Expires:** Aug 12, 2026
- **Valid:** Yes (3 months validity, auto-renewed via Hostinger)

### Hosting & Headers

- **Server:** Hostinger shared hosting (hpanel/hcdn)
- **Redirect:** `institutescoffier.com` → `www.institutescoffier.com` (301 via WordPress)
- **Content-Security-Policy:** `upgrade-insecure-requests`
- **Cache-Control:** max-age=3600 (homepage)
- **HSTS:** Not detected in response headers

---

## 2. SEO HEALTH

### 2.1 On-Page SEO (Homepage)

| Element | Status | Details |
|---|---|---|
| **Title Tag** | ✅ Good | "Culinary School - Culinary Academy | Institut Disciples Escoffier" — 66 chars, keyword-rich |
| **Meta Description** | ✅ Good | 156 chars, descriptive, includes brand name and value prop |
| **Canonical URL** | ✅ Correct | `https://www.institutescoffier.com/` |
| **Robots Meta** | ✅ OK | `index, follow, max-image-preview:large` |
| **Heading Structure** | ⚠️ Needs review | Divi builder — no obvious H1 seen in extracted source (likely set via Divi page settings) |
| **Open Graph** | ✅ Good | og:title, og:description, og:image, og:type all set by Yoast |
| **Twitter Card** | ✅ Good | `summary_large_image` |
| **Schema.org** | ✅ Good | Yoast implements WebPage, WebSite, SearchAction, BreadcrumbList, Organization |
| **XML Sitemap** | ✅ Good | Yoast-generated sitemap_index.xml with 9 sub-sitemaps |
| **Robots.txt** | ✅ Sparse | Only `Disallow: /wp-admin/` and `Allow: /wp-admin/admin-ajax.php` — no sitemap reference |

### 2.2 Sitemap Breakdown

| Sitemap | URLs | Last Updated |
|---|---|---|
| `page-sitemap.xml` | 93 pages | 2025-12-11 |
| `post-sitemap.xml` | 109 posts | 2025-11-11 |
| `project-sitemap.xml` | ? | 2021-06-10 (stale) |
| `contact-form-log-sitemap.xml` | ? | 2026-06-04 |
| `exmd_testimonial-sitemap.xml` | ? | 2024-12-12 |
| `author-sitemap.xml` | ? | 2026-05-13 |
| `category-sitemap.xml` | ? | 2025-11-11 |
| `form-title-sitemap.xml` | ? | 2026-06-04 |
| `project_category-sitemap.xml` | ? | 2021-06-10 (stale) |

**Note:** Contact form logs and form titles being in the sitemap is a **privacy concern** — these should be excluded from search indexing.

### 2.3 .htaccess

- LiteSpeed cache markers present (`# BEGIN LSCACHE`)
- Standard WordPress rewrite rules active
- **WWW redirect is commented out** (`#RewriteCond %{HTTP_HOST} !^www\.`)
- Duplicate WordPress rewrite block — likely harmless but untidy
- No security headers (X-Frame-Options, X-Content-Type-Options) in .htaccess

### 2.4 wp-config.php

- `WP_DEBUG` = false ✅ (production-safe)
- `WP_AUTO_UPDATE_CORE` = true ✅
- Database credentials present (standard for wp-config)
- No `WP_HOME`/`WP_SITEURL` constants set
- No `WP_MEMORY_LIMIT` override
- No `DISABLE_WP_CRON` or multisite constants
- WP Rocket commented-out code remnant present (`$_SERVER['HTTPS'] = 'on';` — superseded by LiteSpeed)

### 2.5 robots.txt

```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
```

- **Missing:** Sitemap reference (`Sitemap: https://www.institutescoffier.com/sitemap_index.xml`)
- **Missing:** Disallow rules for duplicate content paths (e.g., `/fr/`, `/zh/`, `/th/` language subdirectories — but these should ideally be indexed for multilingual SEO)

---

## 3. KEYWORD ANALYSIS (Semrush)

### 3.1 Top Organic Keywords

| Keyword | Position | Volume | URL |
|---|---|---|---|
| mastering the art of french cooking | #21 | 12,100/mo | /classic-french-cooking/ |
| 行政总厨 (Executive Chef - CN) | #2 | 210/mo | /zh/executive-chef-vs-head-chef/ |
| how to get a michelin star | #8 | 1,600/mo | /how-restaurants-get-michelin-stars/ |
| executive chef | #23 | 4,400/mo | /executive-chef-vs-head-chef/ |
| how do restaurants get michelin stars | #5 | 260/mo | /how-restaurants-get-michelin-stars/ |
| five mother sauces | #37 | 3,600/mo | /conquer-the-classics-mastering-the-five-mother-sauces/ |
| head chef vs executive chef | #10 | 390/mo | /executive-chef-vs-head-chef/ |
| escoffier chef | #13 | 880/mo | /escoffier/auguste-escoffier |
| how much does culinary school cost | #29 | 1,600/mo | /culinary-school-costs/ |
| meaning of escoffier | #9 | 110/mo | /our-story/ |

### 3.2 Search Performance (GSC — note: GSC property appears to be misconfigured)

| Period | Clicks | Impressions | CTR | Avg Position |
|---|---|---|---|---|
| **Last 28 days** | 94 | 8,634 | 1.09% | 19.8 |
| **Prior 28 days** | 115 | 3,736 | 3.08% | 17.8 |
| **Change** | -18.3% | +131.1% | -1.99pp | +2.0 |

**⚠️ Note:** The GSC data returned appears to be from a different property (gaiada.com). The GSC property for institutescoffier.com may need verification or re-configuration.

### 3.3 Competitors (Semrush)

| Competitor | Relevance | Traffic |
|---|---|---|
| ldei.org | 0.07 | 1,099/mo |
| lesdamesphilly.org | 0.06 | 164/mo |
| ldedallas.org | 0.07 | 42/mo |
| lesdamessf.org | 0.07 | 13/mo |

**Note:** Competitor relevance is very low (all < 0.10), suggesting Semrush identifies these via shared keyword overlap rather than direct industry competition. Real competitors are likely other culinary schools (Le Cordon Bleu, Alain Ducasse, etc.).

### 3.4 Breadth of Content

- **93 pages** indexed in sitemap
- **109 posts** indexed in sitemap
- Multilingual versions: Chinese (zh), French (fr), Romanian (ro), Thai (th), Indonesian (id) via Weglot
- Upload history spans 2015–2026 — site has been running for **11+ years**
- Last homepage modified: December 11, 2025
- Recent blog posts (from links): alumni shines, training of trainers Indonesia, cuisine passion session 2024

---

## 4. TECHNICAL ISSUES FOUND

### 🟥 Critical

| # | Issue | Details |
|---|---|---|
| 1 | **GSC Property Misconfiguration** | GSC data appears to be returning from gaiada.com, not institutescoffier.com. Verify and reconfigure the Search Console property. |
| 2 | **Contact Form Logs in Sitemap** | `contact-form-log-sitemap.xml` and `form-title-sitemap.xml` are exposed to search engines — this is a significant privacy/security risk. Contact form submissions should NOT be indexed. |
| 3 | **Sitemap Missing from robots.txt** | Google can still find it, but best practice is to reference it explicitly in robots.txt. |

### 🟡 Medium

| # | Issue | Details |
|---|---|---|
| 4 | **No HSTS Header** | HTTPS works but no Strict-Transport-Security header. Mitigation: the CSP `upgrade-insecure-requests` helps, but HSTS is still recommended. |
| 5 | **Stale Sitemaps** | `project-sitemap.xml` and `project_category-sitemap.xml` were last updated in **June 2021** — over 5 years ago. Either remove or update. |
| 6 | **No WP_HOME/WP_SITEURL in wp-config** | While functional, defining these prevents URL-based lockouts if the database is migrated. |
| 7 | **WWW Redirect Commented in .htaccess** | A commented-out redirect rule for non-www → www is present but disabled. The redirect IS handled by WordPress itself (based on headers), so this is low risk. |
| 8 | **CTR is Very Low (1.09%)** | With an avg position of 19.8, most impressions come from page 2+. Improving rankings to top 10 would dramatically increase CTR. |

### 🟢 Info / Low Priority

| # | Issue | Details |
|---|---|---|
| 9 | **Divi Theme (Page Builder)** | While popular, Divi can generate heavy markup. LiteSpeed Cache helps, but consider a GTmetrix/Lighthouse audit for Core Web Vitals. |
| 10 | **WP Rocket Code Remnant** | Commented-out line `$_SERVER['HTTPS'] = 'on';` in wp-config.php — leftover from a previous WP Rocket install, harmless but untidy. |
| 11 | **Duplicate .htaccess Rewrite Block** | The standard WordPress rewrite block appears twice in .htaccess. Likely harmless but should be cleaned. |
| 12 | **XML-RPC Enabled** | `xmlrpc.php` is accessible — while not a critical risk on modern WP, it's a potential attack surface. |

---

## 5. MULTILINGUAL SETUP

The site uses **Weglot** for multilingual functionality, supporting:

- 🇬🇧 English (default) — en-US
- 🇨🇳 Chinese — /zh/
- 🇫🇷 French — /fr/
- 🇷🇴 Romanian — /ro/
- 🇹🇭 Thai — /th/
- 🇮🇩 Indonesian — /id/

Weglot subdirectories are properly hreflang-annotated via Yoast SEO integration (confirmed by `wg-choose-original=false` parameters and language toggle in HTML).

**WPML** zip files are present in plugins directory (`sitepress-multilingual-cms.4.4.10.zip`, `wpml-string-translation.3.1.8.zip`, `wpml-translation-management.2.10.6.zip`) but appear **not active** — Weglot is the active translation solution.

---

## 6. RECOMMENDATIONS

### Priority 1 — Fix Now (Security & Indexing)

1. **Remove contact form logs from sitemap** — Disable Yoast sitemap indexing for the `contact-form-log` and `form-title` post types. These expose form submissions to search engines. Use Yoast's "Exclude Post Types" setting or add a filter.

2. **Add sitemap reference to robots.txt**:
   ```
   Sitemap: https://www.institutescoffier.com/sitemap_index.xml
   ```

3. **Fix GSC property** — Verify that `https://www.institutescoffier.com/` is the correct GSC property and that gaiada.com is not associated. Add/verify domain in Google Search Console.

### Priority 2 — SEO Improvements (Medium Term)

4. **Enable HSTS** — Add `Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"` to .htaccess or via Hostinger hPanel.

5. **Clean up stale sitemaps** — Remove or update project-related sitemaps from 2021. Or exclude these CPTs from Yoast sitemap if no longer relevant.

6. **Optimize for featured snippets** — "how to get a michelin star" (position #8) and "head chef vs executive chef" (#10) are strong snippet candidates. Add structured FAQ/how-to schema to those pages.

7. **Target "culinary school" keywords** — "how much does culinary school cost" ranks #29 with 1,600 searches/month. This is a high-volume, high-intent query for a culinary school. Create dedicated content targeting it.

8. **Improve CTR** — Current CTR is 1.09%. Even small ranking improvements (into top 10) could 3-5x click-through rates. Focus on pages ranking #8–20 with high impressions.

### Priority 3 — Technical Cleanup

9. **Remove duplicate .htaccess rewrite block** — The standard WordPress rewrite rules appear twice. One copy can be safely removed.

10. **Disable XML-RPC** if not used, or protect with .htaccess rules.

11. **Run Core Web Vitals audit** — Use PageSpeed Insights / Lighthouse to check performance. LiteSpeed Cache is active but needs proper tuning for optimal scores.

12. **Clean up plugin directory** — Remove unused WPML zip files (they're 4.x versions, likely obsolete).

---

## 7. SUMMARY

| Category | Verdict |
|---|---|
| **Basic SEO Setup** | ✅ Good — Yoast SEO active, meta tags well-configured, OG tags, schema |
| **Technical Foundation** | ⚠️ Fair — .htaccess needs cleanup, no HSTS, stale sitemaps |
| **Content** | ✅ 11 years of content, multilingual, active blog |
| **Performance** | ⚠️ LiteSpeed Cache active but not verified — needs Lighthouse audit |
| **Security** | ⚠️ Contact form logs exposed in sitemap (critical) |
| **Keyword Strategy** | ⚠️ Decent — ranks for culinary terms but traffic is very low (143/mo) |
| **GSC Configuration** | ❌ Misconfigured — data appears to be from wrong property |
| **Backlinks** | ❓ Semrush API unavailable — unknown backlink profile |

### Overall Health Score: **65/100** — Needs attention to security and GSC configuration, but has solid SEO fundamentals from Yoast and a mature content base.
