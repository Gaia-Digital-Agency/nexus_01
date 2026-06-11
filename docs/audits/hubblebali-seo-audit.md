# Lite SEO Audit: hubblebali.com

**Server:** gda-ce01  
**Path:** /var/www/hubblebali/public_html/  
**Date:** 10 June 2026

---

## 1. Robots.txt

**✅ Present** — Contains:
```
User-agent: *
Crawl-Delay: 20
```

Basic but functional. Missing sitemap reference — should include `Sitemap: https://www.hubblebali.com/sitemap.xml`.

## 2. Homepage Title

**"Hubble Restaurant and Shisha Lounge | Berawa Bali"**

A strong title tag. Contains business name (Hubble), service keywords (Restaurant, Shisha Lounge), and location (Berawa Bali). Appropriate length for SERP display. Good keyword targeting for local search.

## 3. Sitemap

**✅ Present** — Rank Math sitemap at `/sitemap.xml` (HTTP 200). Contains:
- `post-sitemap.xml` (last modified: 2023-03-24 — over 3 years ago)

This is a concern — the sitemap has not been updated since March 2023, indicating no new content has been published in over 3 years.

## 4. Active Plugins (SEO-Relevant)

| Plugin | Version | Notes |
|--------|---------|-------|
| **LiteSpeed Cache** | 7.7 | Update available (7.8.1). |
| **Polylang** | 3.7.7 | Update available (3.8.4). Multilingual (en + id). |
| **Rank Math SEO** | 1.0.264.1 | Update available (1.0.271.1). |
| **Redirection** | 5.7 | ⚠️ **Two redirect plugins active** — also "redirect-redirection" (1.2.8) and "EPS 301 Redirects" (2.83) and "Quick Page/Post Redirect" (5.2.4). Four redirect-related plugins is excessive and could cause conflicts or performance issues. |
| **Duplicator Pro** | 4.5.12.1 | Backups. |
| **Wordfence** | 8.1.4 | Update available (8.2.2). |

## 5. Homepage Meta & Schema

- **Canonical:** ✅ `https://www.hubblebali.com/`
- **Meta description:** ✅ Present — detailed description of the two-floor restaurant, bar, shisha lounge, rooftop.
- **Hreflang:** ✅ en (default) + id (Indonesian).
- **Open Graph:** ✅ Full og:image, og:title, og:description.
- **Twitter Card:** ✅ summary_large_image.
- **Schema:** ✅ Rank Math schema with Restaurant/Organization type, opening hours (09:00-17:00 daily), logo, and full WebPage/Article markup.

## 6. Summary

**Strengths:** Complete SEO setup via Rank Math with Restaurant schema (appropriate for a restaurant site), proper hreflang for bilingual audience, good title and meta description, full Open Graph and Twitter card integration.

**Issues to Address:**
1. **4 redirect plugins active** — This is problematic. EPS 301 Redirects, Redirection, redirect-redirection, Quick Page/Post Redirect Plugin — all serve the same purpose. Consolidate to ONE redirect plugin to avoid rule conflicts and reduce overhead.
2. **No sitemap reference in robots.txt** — Add sitemap URL.
3. **Stale content** — Sitemap last modified March 2023. The site has not had new content in over 3 years, which signals to Google that the site may be abandoned.
4. **Multiple plugin updates** — LiteSpeed Cache, Polylang, Rank Math, Wordfence all have available updates.
5. **Content last updated Sep 2023** — The homepage lastmod is September 2023. Consider refreshing content for freshness signals.

**Overall:** Technically well-optimised from an SEO perspective, but the site appears not to have been actively updated in 3 years. The plugin bloat from 4 redirect plugins needs cleanup. The content freshness issue is the most pressing SEO concern.
