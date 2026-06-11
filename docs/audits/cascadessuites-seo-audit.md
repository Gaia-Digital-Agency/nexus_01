# SEO Audit Report: cascadessuites.com

**Date:** 10 June 2026  
**Auditor:** Automated Server Inspection  
**Server:** hostinger-wp (Hostinger)  
**WP Path:** /home/u521276830/domains/cascadessuites.com/public_html/  

---

## 1. Site Overview

| Item | Value |
|---|---|
| **Domain** | cascadessuites.com → www.cascadessuites.com |
| **WP Version** | 6.7.5 |
| **Homepage Title** | CasCades Suites – A Tranquil Retreat in the Heart of Ubud |
| **Tagline** | (empty) |
| **Meta Description** | "Tucked away in lush tropical surroundings, just five minutes from the centre of Ubud, CasCades Suites offers a peaceful escape where comfort and thoughtful design come together." |
| **Site URL (WP)** | https://www.cascadessuites.com |
| **Home URL (WP)** | https://www.cascadessuites.com |
| **Charset** | utf8 |
| **Table Prefix** | wp_ |
| **Multisite** | No |
| **WP_DEBUG** | False |
| **FS_METHOD** | direct |
| **WP_AUTO_UPDATE_CORE** | minor |
| **Web Server** | Hostinger (PHP 8.2.30) |
| **Platform** | hostinger / hpanel |

### Admin Users (5)

| Username | Display Name | Email | Role | Registered |
|---|---|---|---|---|
| cascades-pr | CasCades Suites PR | pr@viceroybali.com | Administrator | 2025-05-21 |
| gda-gusde | GDA Gusde | gusde@gaiada.com | Administrator | 2025-05-19 |
| gda-reva | gda-reva | reva@gaiada.com | Administrator | 2025-02-13 |
| gda-web | GDA Web | web@gaiada.com | Administrator | 2026-04-13 |
| Patrick | Patrick Farrell | gm@viceroybali.com | Administrator | 2025-05-21 |

**Admin Email (from settings):** reva@gaiada.com

### Content Counts

| Content Type | Count |
|---|---|
| Pages | 12 |
| Custom Post Type "room" | Present (via room-sitemap.xml) |

---

## 2. WordPress Configuration

### wp-config.php Highlights
- **DB Name:** `u521276830_Fv0Sr`
- **DB User:** `u521276830_iPiDS`
- **DB Host:** `127.0.0.1`
- **WP_DEBUG:** `false`
- **FS_METHOD:** `direct` — allows file system writes without FTP
- **COOKIEHASH:** `9a280f7a4dff6c97fd8249dbdd745c5b`
- **WP_AUTO_UPDATE_CORE:** `minor` — auto-updates for minor WP releases
- **No explicit WP_HOME / WP_SITEURL** set (uses database values)
- **No multisite**
- **No file editor restrictions** (`DISALLOW_FILE_EDIT` / `DISALLOW_FILE_MODS` absent)
- **No WP_CACHE** constant defined (but LiteSpeed Cache plugin handles this)
- **Database Charset:** `utf8` (not utf8mb4 — older charset)

---

## 3. robots.txt

```
# START YOAST BLOCK
# ---------------------------
User-agent: *
Disallow:

Sitemap: https://www.cascadessuites.com/sitemap_index.xml
# ---------------------------
# END YOAST BLOCK
```

### Analysis
- **Clean — managed by Yoast SEO** — correct approach
- Allows all crawling (`Disallow:` with no value)
- Sitemap URL is correct and points to the live domain
- No `Crawl-Delay` set
- **No issues found**

---

## 4. .htaccess

### Key Sections
1. **LiteSpeed Cache rules** — includes WebP serving, mobile detection, async processing, query string stripping (`fbclid`, `gclid`, `utm*`, `_ga`)
2. **Browser caching** (mod_expires) — 1-year expiry on static assets
3. **WordPress rewrite rules** — standard permalink handling

### Notable
- Mobile-specific caching via LiteSpeed (`ismoible` vary)
- No custom PHP overrides in .htaccess (no cPanel directives)
- No additional security headers set here
- Clean, minimal configuration

---

## 5. Sitemap

| Sitemap URL | Status | Last Modified |
|---|---|---|
| https://www.cascadessuites.com/sitemap_index.xml | **200 OK** | Active |
| https://www.cascadessuites.com/page-sitemap.xml | ✓ | 2026-05-29 |
| https://www.cascadessuites.com/room-sitemap.xml | ✓ | 2026-05-29 |

**Generator:** Yoast SEO  
**Custom Post Type:** `room` is included in sitemap

### Analysis
- Clean, minimal sitemap with 2 sub-sitemaps
- `sitemap.xml` (without index) returns **404** — only `sitemap_index.xml` works (Yoast default)
- Room CPT is properly included — good for a hotel/retreat site
- All sitemaps last modified in May 2026 — site is actively maintained
- **No issues found**

---

## 6. Themes

| Theme | Status | Version | Author |
|---|---|---|---|
| **cascadesuite** | **Active** | 1.0.0 | GAIA Digital Agency |
| cascadebali | Inactive | 1.0.0 | GAIA Digital Agency |
| cascadesuite-git | Inactive | 1.0.0 | GAIA Digital Agency |
| astra | Inactive | 4.13.0 | Brainstorm Force |

### Analysis
- **Active theme `cascadesuite`** has style.css header name "Cascadebali - Git" — likely a rebranded copy of the Cascadebali theme for this site
- **3 custom themes** by GAIA Digital Agency: cascadesuite (active), cascadebali, cascadesuite-git
- **Astra** (popular commercial theme) available but inactive
- **No default WordPress themes** — good security practice
- The `cascadebali` and `cascadesuite-git` themes may be dev/legacy versions — consider cleanup
- Large .zip files present in themes directory (cascadebali.zip: 496MB, cascadesuite.zip: 495MB) — consuming disk space

---

## 7. Active Plugins (24)

| Plugin | Version | Status | Update Available |
|---|---|---|---|
| LiteSpeed Cache | 7.8.1 | Active | None |
| Yoast SEO | **24.4** | Active | **27.8** |
| Yoast SEO Premium | (installed) | **INACTIVE** | — |
| Redirection | 5.7.5 | Active | None |
| UpdraftPlus | 1.26.3 | Active | **1.26.5** |
| WP Schema Pro | 2.7.23 | Active | **2.11.3** |
| Advanced Custom Fields PRO | 6.8.0.1 | Active | **6.8.4** |
| Contact Form 7 | 6.1.5 | Active | **6.1.6** |
| Cookie Law Info | 3.4.2 | Active | **3.5.1** |
| WP Asset CleanUp | 1.4.0.4 | Active | None |
| WP Mail SMTP Pro | 4.3.1 | Active | **4.8.0** |
| WP All Import | 4.0.1 | Active | None |
| WP Hide Login | 1.9.18 | Active | None |
| Query Monitor | 4.0.6 | Active | None |
| Wicked Folders | 4.1.2 | Active | None |
| 3D Flipbook DFlip Lite | 2.4.30 | Active | None |
| Custom Post Type UI | 1.19.0 | Active | **1.19.2** |
| Duplicate Page | 4.5.8 | Active | **4.5.9** |
| Akismet | 5.7 | Active | None |
| reCAPTCHA (CF7) | 1.4.9 | Active | **1.5.0** |
| Instagram Feed | 6.10.1 | Active | **6.11.0** |
| Reviews Feed | 2.5.4 | Active | **2.6.3** |
| OWM Weather | 5.7.2 | Active | None |
| Gutenberg Ramp | 1.1.0 | Active | None |
| WP Image Renamer | 1.0.5 | Active | None |

**Total Plugins Installed:** ~33 (24 active, ~9 inactive)

### Inactive Plugins (installed but not active)
- Yoast SEO Premium
- Custom Facebook Feed
- Custom Twitter Feeds
- Feeds for TikTok
- Feeds for YouTube
- WordPress Importer
- WPCode Premium
- WPForms Lite

### Key Findings
- **Yoast SEO is critically outdated** — version 24.4 vs latest 27.8 (3 major versions behind)
- **Yoast SEO Premium is installed but NOT active** — paying for features not being used, or may be an add-on
- **WP Schema Pro** active — good for structured data
- **LiteSpeed Cache is up to date** (7.8.1) — well-maintained
- Social feeds (Instagram, Reviews, Facebook, Twitter, TikTok, YouTube) — 6 social plugins, some likely redundant
- Multiple plugins with available updates

---

## 8. Traffic & Rankings (from context)

| Metric | Value |
|---|---|
| **Semrush Keywords** | 7 |
| **Semrush Traffic** | ~32 visits/month |
| **Site Age** | ~7 years (uploads since ~2019) |
| **Status** | Active in June 2026 |

---

## 9. Homepage On-Page SEO

### Title Tag
```
CasCades Suites – A Tranquil Retreat in the Heart of Ubud
```
- Length: ~55 characters — **good**
- Branded, descriptive, includes location keyword (Ubud)

### Meta Description
"Tucked away in lush tropical surroundings, just five minutes from the centre of Ubud, CasCades Suites offers a peaceful escape where comfort and thoughtful design come together."
- Length: ~180 characters — **good**
- Includes location, unique selling points
- Well-written

### Schema (Yoast output)
- `WebPage`, `BreadcrumbList`, `WebSite` schemas present
- `SearchAction` defined
- No `Organization` or `LocalBusiness` schema visible in homepage output (WP Schema Pro may handle this elsewhere)

### Open Graph / Twitter
- OG title, description, image all present
- Image: `CasCades-Suites-Bedroom-gallery.webp` (800×600)

---

## 10. SEO Issues & Recommendations

### Critical
| # | Issue | Recommendation |
|---|---|---|
| 1 | **Yoast SEO is 3 major versions behind** (24.4 vs 27.8) | Update immediately — critical for latest features, schema, and compatibility |
| 2 | **Yoast SEO Premium installed but inactive** | Either activate it or remove to reduce clutter |

### High Priority
| # | Issue | Recommendation |
|---|---|---|
| 3 | Very low search visibility (7 keywords, 32 visits/month) | Comprehensive content and keyword strategy needed |
| 4 | WP Schema Pro has significant update pending (2.7.23 → 2.11.3) | Update to ensure schema markup stays current |
| 5 | WP Mail SMTP Pro outdated (4.3.1 → 4.8.0) | Update for security and deliverability |

### Medium Priority
| # | Issue | Recommendation |
|---|---|---|
| 6 | 6 social media feed plugins installed (Instagram, Facebook, Twitter, TikTok, YouTube, Reviews) | Audit and consolidate — likely redundant |
| 7 | 2 large `.zip` files (950MB total) in themes directory | Remove to free disk space |
| 8 | Inactive themes `cascadebali` and `cascadesuite-git` can be removed | Clean up old/legacy themes |
| 9 | Database charset is `utf8` instead of `utf8mb4` | Convert to utf8mb4 for full emoji/Unicode support |
| 10 | No `DISALLOW_FILE_EDIT` in wp-config | Add for hardening |
| 11 | Tagline (blogdescription) is empty | Set a tagline like "Luxury Suites in Ubud, Bali" |

### Low Priority
| # | Issue | Recommendation |
|---|---|---|
| 12 | WP version 6.7.5 vs latest — check if minor updates are applying correctly | Verify auto-update functionality |
| 13 | 5 admin users — review if all need Administrator role | Apply principle of least privilege |
| 14 | No page builder used with ACF PRO — verify CMS flexibility | Ensure editors can manage content easily |

---

## 11. HTTP Headers (Homepage)

| Header | Value |
|---|---|
| Platform | hostinger |
| Panel | hpanel |
| Content-Security-Policy | upgrade-insecure-requests |
| X-Powered-By | PHP/8.2.30 |
| Vary | Accept-Encoding |

Security is minimal but Hostinger handles some settings server-side.

---

## 12. Hosting Environment

| Detail | Value |
|---|---|
| Host | Hostinger (hostinger-wp) |
| PHP | 8.2.30 |
| User | u521276830 |
| Group | o201557946 |
| WP Install | /home/u521276830/domains/cascadessuites.com/public_html/ |

---

*End of Report — cascadessuites.com*
