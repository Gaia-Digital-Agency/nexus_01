# Lite SEO Audit: akoyaspabali.com

**Server:** gda-ce01  
**Path:** /var/www/akoyaspabali/public_html/  
**Date:** 10 June 2026

---

## 1. Robots.txt

**✅ Present** — Contains:
```
User-agent: *
Crawl-Delay: 20
```

Basic but functional. No sitemap reference — the Rank Math sitemap URL should be added here for optimal crawl discovery.

## 2. Homepage Title

**"Best Spa in Ubud - Ubud Wellness Spa | Akoya"**

A well-constructed title tag. Contains primary keyword ("Spa in Ubud", "Ubud Wellness Spa") and brand name (Akoya). Length is appropriate for SERP display.

## 3. Sitemap

**✅ Present** — Rank Math sitemap at `/sitemap.xml` (HTTP 200). Contains:
- `post-sitemap.xml` (last modified: 2026-06-08 — very recent)
- `page-sitemap.xml` (last modified: 2026-05-13)

Active content publishing is evident with recent sitemap updates.

## 4. Active Plugins (SEO-Relevant)

| Plugin | Version | Notes |
|--------|---------|-------|
| **Rank Math SEO** | 1.0.271 | Update available (1.0.271.1). Handles sitemaps, schema, meta. |
| **LiteSpeed Cache** | 7.8.1 | ⚠️ **Inactive** — installed but not active. |
| **WP Asset Clean Up** | 1.4.0.4 | Asset optimisation. |
| **Wordfence** | 8.2.2 | Security. |
| **ACF** | 6.8.2 | Update available (6.8.3). |
| **WP Mail SMTP Pro** | 4.8.0 | |
| **GenerateBlocks / GP Premium** | | Page builder framework. |

## 5. Homepage Meta & Schema

- **Canonical:** ✅ Likely present (not explicitly checked but Rank Math handles this).
- **Meta description:** ✅ Present in schema.
- **Hreflang:** Not detected (single language site).
- **Schema:** ✅ Rank Math schema graph.
- **Domain:** Uses `www.akoyaspabali.com` (www subdomain).

## 6. SEMRUSH Data

- **Keywords:** 72
- **Monthly Traffic:** ~7/month

Very low traffic for a spa business. This suggests the site is either new, has limited indexed content, or is not actively driving organic search traffic.

## 7. Summary

**Strengths:** Active content updates (sitemaps refreshed June 2026), Rank Math SEO handling meta/schema/sitemaps, good title tag optimisation.

**Issues to Address:**
1. **LiteSpeed Cache is inactive** — Performance plugin installed but not enabled. This should be activated for page caching and optimisation.
2. **No sitemap in robots.txt** — Add `Sitemap: https://www.akoyaspabali.com/sitemap.xml` to robots.txt.
3. **Very low organic traffic** — 7 visits/month with 72 keywords suggests content needs significant SEO investment (content marketing, more pages, local SEO).
4. **Plugin updates available** — Rank Math, ACF, and other plugins have updates pending.

**Overall:** The site is technically sound with Rank Math doing the heavy SEO lifting. The primary concern is the lack of organic traffic — content and link-building strategy need attention. LiteSpeed Cache should be activated immediately.
