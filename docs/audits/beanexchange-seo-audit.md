# Lite SEO Audit: beanexchange.net

**Server:** hostinger-wp  
**Path:** /home/u521276830/domains/beanexchange.net/public_html/  
**Date:** 10 June 2026

---

## 1. Robots.txt

**Status: ⚠️ MISSING** — No `robots.txt` file exists at the document root. This means search engines crawl without any explicit directives. While not critical, it is recommended to have a basic robots.txt referencing the sitemap.

## 2. Homepage Title

**"Distinguished Roasts,Exceptional Brews | Bean Exchange"**

The title is descriptive and includes the brand name. However, there is a missing space after the comma — "Distinguished Roasts,Exceptional Brews" should read "Distinguished Roasts, Exceptional Brews". This is a minor formatting issue but looks unprofessional in SERP display. Recommended fix: add a space after the comma.

## 3. Sitemap

**✅ Present** — Yoast SEO sitemap serves at `/sitemap.xml` (HTTP 200). Contains:
- `post-sitemap.xml` (last modified: 2024-09-27)
- `page-sitemap.xml` (last modified: 2024-11-27)

No sitemap is referenced in robots.txt (since robots.txt is missing). Would benefit from adding the sitemap URL to robots.txt once created.

## 4. Active Plugins (SEO-Relevant)

| Plugin | Version | Notes |
|--------|---------|-------|
| **Yoast SEO** | 27.7 | Update available (27.8). Handles sitemaps, schema, meta. |
| **LiteSpeed Cache** | 7.8.1 | Performance caching. |
| **Polylang** | 3.8.4 | Multilingual (en + zh). |
| **UpdraftPlus** | 1.26.5 | Backups. |
| **Advanced Custom Fields Pro** | 6.8.3 | |
| **Contact Form 7** | 6.1.6 | |
| **Duplicator Pro** | 4.5.14.2 | |

## 5. Homepage Meta & Schema

- **Canonical:** ✅ `https://beanexchange.net/`
- **Meta description:** ✅ Present — describes coffee bean attributes
- **Hreflang:** ✅ en (default) + zh (Chinese)
- **Open Graph:** ✅ Full og:image, og:title, og:description configured
- **Schema:** ✅ Yoast schema graph with Organization, WebPage, WebSite, BreadcrumbList
- **Language:** en-AU

## 6. Summary

**Strengths:** Good sitemap setup via Yoast, proper hreflang implementation for bilingual content, full Open Graph and schema markup, active content management.

**Issues to Address:**
1. **Missing robots.txt** — Create one referencing the Yoast sitemap.
2. **Title punctuation** — Missing space after comma in homepage title.
3. **Yoast SEO update** — 27.7 → 27.8 available.
4. **Sitemap lastmods are stale** — post-sitemap last modified Sep 2024, page-sitemap Nov 2024. If content has been updated, sitemaps should be regenerated.

**Overall:** A reasonably well-optimised site with minor formatting issues. The missing robots.txt is the most actionable fix.
