# Lite SEO Audit: interlacenetwork.com

**Server:** gda-ce01  
**Path:** /var/www/interlacenetwork/public_html/  
**Date:** 10 June 2026

---

## 1. Robots.txt

**✅ Present** — Contains:
```
User-agent: *
Crawl-Delay: 20
```

Missing sitemap reference. Should include `Sitemap: https://www.interlacenetwork.com/sitemap.xml`.

## 2. Homepage Title

**"Interlace Network - - An exclusive online network"**

There is a **double hyphen with extra space** (" - - ") between the site name and the tagline. This appears to be a formatting error in the AIOSEO title settings — either the separator is duplicated or there is a stray hyphen. The title should read "Interlace Network - An exclusive online network" or similar.

## 3. Sitemap

**✅ Present** — All in One SEO sitemap at `/sitemap.xml` (HTTP 200). Contains:
- `post-sitemap.xml` (last modified: 2025-10-28)
- Other sub-sitemaps.

## 4. Active Plugins (SEO-Relevant)

| Plugin | Version | Notes |
|--------|---------|-------|
| **All in One SEO** | 4.9.7.2 | Handles sitemaps, schema, meta. |
| **LiteSpeed Cache** | 7.8.1 | Active. |
| **Elementor** | 4.0.9 | Update available (4.1.2). |
| **Elementor Pro** | 3.27.0 | (listed as pro-elements). |
| **Gravity Forms** | 2.6.4 | Update available (2.10.3) — major version gap. |
| **UpdraftPlus** | 1.26.4 | **Inactive.** |
| **Wordfence** | 8.2.2 | Active. |

Many plugins have pending updates, notably Gravity Forms (2.6.4 → 2.10.3 — a significant version gap).

## 5. Homepage Meta & Schema

- **Canonical:** ✅ `https://www.interlacenetwork.com/`
- **Meta description:** ✅ Present — "Interlace Network will grow to include additional benefits, features, and tools..."
- **Meta keywords:** ✅ "interlace network"
- **Schema:** ✅ AIOSEO schema with BreadcrumbList, Person, WebPage, WebSite.
- **Open Graph:** ✅ Properly configured.
- **Twitter Card:** ✅ summary card.
- **SEO Plugin:** All in One SEO Pack (not Rank Math or Yoast).
- **Last modified:** The page was last updated on 2025-10-28 — about 8 months ago.

## 6. Summary

**Strengths:** AIOSEO handles schema, sitemap, and meta properly. The site has a functional sitemap with multiple sitemap indexes. Proper canonical and Open Graph tags.

**Issues to Address:**
1. **Double hyphen in title** — "Interlace Network - - An exclusive online network" has a formatting error with two hyphens. Fix in AIOSEO title settings.
2. **No sitemap in robots.txt** — Add sitemap URL reference.
3. **Stale content** — Last modified October 2025 (~8 months ago). Content freshness could be improved.
4. **Plugin updates** — Multiple plugins (Elementor, Gravity Forms) have significant version gaps and need updating.
5. **UpdraftPlus inactive** — Backups are not running.

**Overall:** A functional but somewhat neglected site. The double-hyphen title issue is a quick fix. The main concern is content freshness and the large plugin version gaps.
