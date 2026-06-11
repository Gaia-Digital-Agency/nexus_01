# Lite SEO Audit: isort.id

**Server:** gda-ce01  
**Path:** /var/www/isort/public_html/  
**Date:** 10 June 2026

---

## 1. Robots.txt

**✅ Present** — Contains:
```
User-agent: *
Crawl-Delay: 20

Sitemap: http://34.158.47.112/isort/wp-sitemap.xml
```

**⚠️ CRITICAL ISSUE:** The sitemap URL in robots.txt points to an **internal IP address** (`http://34.158.47.112/isort/wp-sitemap.xml`) instead of the proper domain URL. This internal IP is not publicly accessible for crawling, meaning search engines cannot discover the sitemap through robots.txt. Should be:
```
Sitemap: https://www.isort.id/sitemap.xml
```

## 2. Homepage Title

**"iSort CMMS | Computerized Maintenance Management System"**

A well-constructed title tag. Contains brand name (iSort), core offering (CMMS), and descriptive expansion. Appropriate length for SERP. Good keyword targeting.

## 3. Sitemap

**⚠️ Serves from Internal IP** — `/sitemap.xml` returns HTTP 200 but contains URLs using the internal IP:
```
<url><loc>http://34.158.47.112/isort/</loc></url>
```

All sitemap URLs use the private IP address `34.158.47.112` instead of the public domain `https://www.isort.id`. This means:
- Google will index the IP-based URLs, not the proper domain
- Any crawl budget is wasted on IP addresses
- Links from sitemaps don't benefit the real domain

This needs to be fixed in WordPress Settings → General (Site URL) and the sitemap regenerated.

## 4. Active Plugins (SEO-Relevant)

| Plugin | Version | Notes |
|--------|---------|-------|
| **Rank Math SEO** | 1.0.264.1 | Update available (1.0.271.1). |
| **LiteSpeed Cache** | 7.7 | Update available (7.8.1). |
| **Polylang** | 3.7.7 | Update available (3.8.4). Multilingual (en + id). |
| **ACF** | 6.7.0 | Update available (6.8.3). |
| **Classic Editor** | 1.6.7 | Update available (1.7.0). |
| **Wordfence** | 8.1.4 | Update available (8.2.2). |
| **Insert Headers and Footers** | 2.3.6 | Active. |
| **WP Asset Clean Up** | 1.4.0.3 | Active. |

## 5. Homepage Meta & Schema

- **Canonical:** ✅ `https://www.isort.id/en`
- **Meta description:** ✅ Present — "iSort is a leader in the CMMS industry..."
- **Hreflang:** ✅ en, id, x-default (properly configured).
- **Open Graph:** ✅ Full og:image, og:title, og:description with proper image.
- **Schema:** ✅ Rank Math schema with Person/Organization, WebSite, WebPage, Article markup.
- **Language:** en-US (with id translation).

## 6. Summary

**Strengths:** Proper Rank Math SEO setup with full schema, good title and meta description, proper hreflang for bilingual content, strong schema organization markup.

**Critical Issues:**
1. **🚨 Sitemap URLs use internal IP** — Both robots.txt and the sitemap XML reference `http://34.158.47.112/isort/...` instead of `https://www.isort.id/...`. Fix WordPress Site URL and regenerate sitemaps.
2. **Robots.txt sitemap points to unreachable IP** — Search engines can't follow the sitemap reference.
3. **Plugin updates needed** — Rank Math, LiteSpeed Cache, Polylang, ACF, Wordfence all have available updates.

**Other Notes:**
- The site has been active for 6 years with consistent updates.
- Good use of Polylang for English/Indonesian bilingual content.
- The CMMS niche is relatively specific — targeted SEO should focus on technical/maintenance management keywords.

**Overall:** The site has good SEO fundamentals but is undermined by a critical misconfiguration — the sitemap and all indexed URLs use an internal IP address. This must be fixed as a top priority to ensure search engines properly index the domain.
