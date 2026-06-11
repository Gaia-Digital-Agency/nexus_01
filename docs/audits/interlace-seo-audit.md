# Lite SEO Audit: interlace.com

**Server:** gda-ce01  
**Path:** /var/www/interlace/public_html/  
**Date:** 10 June 2026

---

## 1. Robots.txt

**✅ Present** — Contains:
```
User-agent: *
Crawl-Delay: 20
```

## 2. Homepage Title

**⛔ NO WORDPRESS SITE ACTIVE**

The domain `interlace.com` redirects to a **GoDaddy parking/lander page** (`/lander`) that serves placeholder ads. The WordPress installation at `/var/www/interlace/public_html/` has broken `home` and `siteurl` options (both set to empty `https:` strings).

## 3. Sitemap

**⚠️ Minimal** — `/sitemap.xml` returns HTTP 200 but contains only one URL:
```
<url><loc>https://interlace.com/lander</loc></url>
```

This is the GoDaddy parking page, not a WordPress page.

## 4. Active Plugins (SEO-Relevant)

| Plugin | Version | Notes |
|--------|---------|-------|
| **LiteSpeed Cache** | 7.8.1 | Active (irrelevant as WP is not serving). |
| **All in One SEO** | 4.9.7.2 | Active. |
| **Elementor Pro** | 4.0.9 | Active. |
| **Gravity Forms** | 2.6.4 | Active (many add-ons). |
| **Wordfence** | 8.2.2 | Active. |
| **UpdraftPlus** | 1.26.4 | **Inactive.** |

Many plugins have available updates. The WordPress site appears to be set up but the domain is not pointing to it — it resolves to a GoDaddy domain-parking page instead.

## 5. Summary

**Critical Issue:** `interlace.com` is **not pointing to this WordPress installation**. The domain serves a GoDaddy parking/lander page with AdSense ads. The WP site is configured and has plugins installed, but the domain DNS is not directing traffic to the gda-ce01 server. The WP home/siteurl values are also malformed.

**To fix:**
1. Update DNS A records to point `interlace.com` to the gda-ce01 server IP.
2. Fix WordPress home/siteurl in wp_options table.
3. Configure SSL certificate for the domain.
4. Add proper content — currently only a lander page exists in sitemap.

**Overall:** This site is effectively offline/unreachable as a WordPress site. The domain is parked at GoDaddy. No SEO work can begin until the domain is repointed to the server and the WP installation is properly configured.
