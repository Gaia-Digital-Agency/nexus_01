# SEO Audit Report: huntermotorcycles.co.id

**Date:** 10 June 2026  
**Auditor:** Automated Server Inspection  
**Server:** gda-ce01 (SSH)  
**WP Path:** /var/www/hunter/public_html/  

---

## 1. Site Overview

| Item | Value |
|---|---|
| **Domain** | huntermotorcycles.co.id → www.huntermotorcycles.co.id |
| **WP Version** | 6.9.1 |
| **Homepage Title** | Hunter Motorcycles – The future is... Indonesian |
| **Tagline** | Proud To Be Indonesian |
| **Site URL (WP)** | https://www.huntermotorcycles.co.id |
| **Home URL (WP)** | https://www.huntermotorcycles.co.id |
| **Charset** | utf8mb4 |
| **Table Prefix** | hmci_ |
| **Multisite** | No |
| **WP_DEBUG** | False |
| **WP_CACHE** | True (LiteSpeed) |
| **Web Server** | nginx/1.24.0 (Ubuntu) |
| **PHP** | 8.1 (ea-php81, via cPanel) |

### Admin Users (6)

| Username | Display Name | Email | Role |
|---|---|---|---|
| David | Hunter David | david@huntermotorcycles.co.id | Administrator |
| gda-anthony | GDA Anthony | anthony@gaiada.com | Administrator |
| gda-gusde | GDA Gusde | gusde@gaiada.com | Administrator |
| gda-reva | GDA Reva | reva@gaiada.com | Administrator |
| gda-seo | GDA SEO | seo@gaiada.com | Administrator |
| gda-web | gda-web | web@gaiada.com | Administrator |

**Admin Email (from settings):** wp@gaiada.com

### Content Counts

| Content Type | Count |
|---|---|
| Pages | 55 |
| Posts | 13 |
| Products (WooCommerce) | 4,646 published |

---

## 2. WordPress Configuration

### wp-config.php Highlights
- **DB Name:** `hunter_2021`
- **DB User:** `hunter_u2021`
- **DB Host:** `localhost`
- **WP_HOME / WP_SITEURL:** Explicitly set to `https://www.huntermotorcycles.co.id`
- **WP_DEBUG:** `false`
- **WP_CACHE:** `true` (LiteSpeed)
- **No multisite** (`WP_ALLOW_MULTISITE` absent)
- **No file editor restrictions** (`DISALLOW_FILE_EDIT` / `DISALLOW_FILE_MODS` absent)
- **No `WP_DISABLE_FATAL_ERROR_HANDLER`** set
- **Database collation:** no custom collate

---

## 3. robots.txt

```
User-agent: *
Crawl-Delay: 20

Sitemap: http://34.158.47.112/hunter/sitemap_index.xml
```

### Issues Found
- **CRITICAL:** The sitemap URL in robots.txt points to an internal IP address (`34.158.47.112`), not the live domain. This is broken — that IP-based URL will not resolve for Googlebot. The correct sitemap is at `https://www.huntermotorcycles.co.id/sitemap_index.xml`.
- `Crawl-Delay: 20` is quite aggressive and may slow down Google's crawling.
- No `Disallow` directives — all content is crawlable.
- No Yoast-managed robots.txt (manual/static file).

---

## 4. .htaccess

### Key Sections
1. **LiteSpeed Cache rules** — includes WebP serving, query string stripping (`fbclid`, `gclid`, `utm*`, `_ga`), async processing
2. **Browser caching** (mod_expires) — 1-year expiry on all static assets (PDF, images, CSS, JS, fonts)
3. **WordPress rewrite rules** — standard permalink handling
4. **PHP settings via cPanel** — memory_limit (2048M), upload_max_filesize (80M), post_max_size (80M), display_errors Off
5. **Additional LiteSpeed config** — `SetEnv noabort 1`

### Notable
- Server uses `mod_expires` alongside LiteSpeed — good for caching
- Large memory limit (2048M) — appropriate for WooCommerce
- No security headers in .htaccess (X-Frame-Options etc. not set here, but nginx may handle)

---

## 5. Sitemap

| Sitemap URL | Status | Last Modified |
|---|---|---|
| https://www.huntermotorcycles.co.id/sitemap_index.xml | **200 OK** | Active |
| https://www.huntermotorcycles.co.id/post-sitemap.xml | ✓ | 2025-04-17 |
| https://www.huntermotorcycles.co.id/page-sitemap.xml | ✓ | 2026-01-07 |
| https://www.huntermotorcycles.co.id/product-sitemap.xml | ✓ | 2025-05-07 |
| https://www.huntermotorcycles.co.id/product-sitemap2.xml | ✓ | 2023-03-29 |
| https://www.huntermotorcycles.co.id/product-sitemap3.xml | ✓ | 2023-03-29 |
| https://www.huntermotorcycles.co.id/product-sitemap4.xml | ✓ | 2023-03-29 |
| https://www.huntermotorcycles.co.id/product-sitemap5.xml | ✓ | 2025-05-07 |
| https://www.huntermotorcycles.co.id/category-sitemap.xml | ✓ | 2025-04-17 |
| https://www.huntermotorcycles.co.id/product_cat-sitemap.xml | ✓ | 2025-05-07 |
| https://www.huntermotorcycles.co.id/product_tag-sitemap.xml | ✓ | 2025-01-30 |
| https://www.huntermotorcycles.co.id/product_shipping_class-sitemap.xml | ✓ | 2025-05-07 |
| https://www.huntermotorcycles.co.id/author-sitemap.xml | ✓ | 2026-05-13 |

**Generator:** Yoast SEO  
**Reports as:** `X-Robots-Tag: noindex, follow` (standard for sitemaps — correct)

### Issues
- Non-www (`huntermotorcycles.co.id/sitemap_index.xml`) returns **301 Redirect** to `www` version — correct
- robots.txt references wrong sitemap URL (IP-based) — **must fix**
- Product sitemaps 2, 3, 4 date from 2023 — some products may not be indexed if stagnant
- Author sitemap is present (with 6 admins) — consider disabling if not needed

---

## 6. Themes

| Theme | Status | Version | Author |
|---|---|---|---|
| **hunter-git (Child)** | **Active** | 1.0.0 | GAIA Digital Agency |
| hunter (Parent) | Parent | 1.0.0 | GAIA Digital Agency |
| twentytwentyfive | Inactive | 1.4 | WordPress |
| twentytwentyfour | Inactive | 1.4 | WordPress |
| twentytwentythree | Inactive | 1.6 | WordPress |
| twentytwentytwo | Inactive | 2.1 | WordPress |
| twentytwentyone | Inactive | 2.7 | WordPress |

### Analysis
- Custom child/parent theme setup by GAIA Digital Agency
- 5 inactive default WordPress themes — consider removing unused themes for security
- Tested up to WP 5.4 (style.css header) — well below current WP 6.9.1, though it may still work

---

## 7. Active Plugins (28)

| Plugin | Version | Status | Update Available |
|---|---|---|---|
| LiteSpeed Cache | 7.7 | Active | **7.8.1** |
| Yoast SEO | 26.9 | Active | **27.8** |
| Redirection | 5.7.1 | Active | **5.7.5** |
| UpdraftPlus | 1.26.1 | Active | **1.26.5** |
| Polylang | 3.7.7 | Active | **3.8.4** |
| WooCommerce | 10.5.1 | Active | **10.8.1** |
| Advanced Custom Fields PRO | 6.7.0.2 | Active | **6.8.4** |
| Wordfence | 8.1.4 | Active | **8.2.2** |
| Facebook for WooCommerce | 3.5.16 | Active | **3.7.1** |
| Google Listings & Ads | 3.5.2 | Active | **3.7.0** |
| All-in-One WP Migration | 7.102 | Active | **7.105** |
| All-in-One WP Migration Unlimited | 2.82 | Active | **2.84** |
| Contact Form 7 | 6.1.5 | Active | **6.1.6** |
| Cookie Law Info | 3.4.0 | Active | **3.5.1** |
| WP Asset CleanUp | 1.4.0.3 | Active | **1.4.0.4** |
| Classic Editor | 1.6.7 | Active | **1.7.0** |
| WP Mail SMTP Pro | 4.7.1 | Active | None |
| WP Mail Logging | 1.15.0 | Active | **1.16.0** |
| YITH WooCommerce Ajax Navigation | 5.17.0 | Active | **5.20.0** |
| Product Variation Swatches for WooCommerce | 2.4.2 | Active | **2.4.4** |
| WP Hide Login | 1.9.18 | Active | None |
| Query Monitor | 3.20.2 | Active | **4.0.6** |
| ACF Repeater | 5.10.2 | Active | None |
| Akismet | 5.6 | Active | **5.7** |
| TinyMCE Advanced | 5.9.2 | Active | None |
| WPForms Lite | (dir exists) | **Inactive** | — |
| dealership (custom) | 0.1 | Active | — |
| CF7 reCAPTCHA | 1.4.9 | Active | **1.5.0** |

**Total Plugins Installed:** 38 (28 active, 10 inactive)

### Inactive Plugins
check-email, coming-soon-bike, coming-soon-bike-2, dealership__, email-log, phoenix-media-rename, post-smtp, variation-swatches-for-woocommerce, wpforms-lite, wp-mail-smtp

### Key Findings
- **20 of 28 active plugins have updates available** — significant maintenance backlog
- **Yoast SEO Premium** is NOT installed (only free Yoast)
- WooCommerce + Polylang suggests a multilingual product catalogue (Indonesian + English)
- Wordfence active — good for security
- No page builder detected (Classic Editor active)

---

## 8. Traffic & Rankings (from context)

| Metric | Value |
|---|---|
| **Semrush Keywords** | 31 |
| **Semrush Traffic** | ~35 visits/month |
| **Site Age** | ~6 years (uploads since ~2020) |
| **Status** | Active in June 2026 |

---

## 9. SEO Issues & Recommendations

### Critical
| # | Issue | Recommendation |
|---|---|---|
| 1 | **robots.txt sitemap URL is broken** (points to IP `34.158.47.112`) | Replace with `https://www.huntermotorcycles.co.id/sitemap_index.xml` or switch to Yoast-managed robots.txt |
| 2 | **Multiple plugin updates pending** (20/28 active plugins) | Schedule a maintenance window to update all plugins |

### High Priority
| # | Issue | Recommendation |
|---|---|---|
| 3 | `Crawl-Delay: 20` in robots.txt may limit Googlebot | Consider removing or increasing to `Crawl-Delay: 10` |
| 4 | Low search visibility (35 visits/month, 31 keywords) | Full content/backlink audit needed |
| 5 | Author sitemap exposed (6 admin accounts) | Disable author archives via Yoast if not needed |

### Medium Priority
| # | Issue | Recommendation |
|---|---|---|
| 6 | Unused WordPress themes (5 default themes) | Remove `twentytwentyone` through `twentytwentyfive` |
| 7 | 10 inactive plugins on server | Remove unused plugin directories |
| 8 | Product sitemaps 2-4 last modified 2023 | Review and update outdated product pages |
| 9 | No `DISALLOW_FILE_EDIT` in wp-config | Add for hardening |
| 10 | No `WP_DISABLE_FATAL_ERROR_HANDLER` | Consider adding for production stability |

### Low Priority
| # | Issue | Recommendation |
|---|---|---|
| 11 | Theme tested up to WP 5.4 (current is 6.9.1) | Verify theme compatibility with current WP version |
| 12 | Low post count (13 posts) for a 6-year-old site | Consider a content marketing strategy |

---

## 10. HTTP Headers (Sitemap Response)

| Header | Value |
|---|---|
| Server | nginx/1.24.0 |
| X-Robots-Tag | noindex, follow |
| X-Frame-Options | SAMEORIGIN |
| X-Content-Type-Options | nosniff |
| X-XSS-Protection | 1; mode=block |

Security headers are present and well-configured.

---

*End of Report — huntermotorcycles.co.id*
