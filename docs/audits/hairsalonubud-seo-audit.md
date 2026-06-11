# SEO Audit: hairsalonubud.com

**Server:** hostinger-wp | **WP Version:** 7.0 | **PHP:** 8.1.34 | **Theme:** GeneratePress 3.6.1  
**Upload years:** 6 | **Active since:** 2020 | **Active 2026:** ✅  
**Plugins total:** 31 | **Sitemap:** ✅ (redirects to sitemap_index.xml, 301 → 200)

---

## Overview

Hair Salon Ubud is a well-established beauty services site operating since 2020. It has solid SEO fundamentals — Yoast SEO (WordPress SEO active v27.7), proper Schema.org structured data (Organization, WebPage, BreadcrumbList), Open Graph tags, and a clean canonical URL. The homepage title *"Visit The Best Hair Salon Ubud | The Finest Hair & Beauty Salon"* is keyword-rich and appropriate for local search. The meta description *"Hair Salon Ubud offers you a wide range of excellent hair and beauty services, visit us today at the heart of Bali"* is well-written with a clear CTA. The site benefits from LiteSpeed Cache (v7.8.1) serving cached pages for fast load times and includes a full-featured booking system (Salon Booking System).

## Issues Found

1. **No robots.txt** — The site has no robots.txt file. While not critical for indexing, this means there is no crawl-delay directive (important for LiteSpeed/SEO crawlers), no way to block low-value paths, and no explicit sitemap reference in robots.txt.
2. **Default table prefix** — While the actual prefix is `4bXazL_` (non-default, good), showing this in the audit for completeness.
3. **Dual SEO plugins** — RankMath is installed (inactive) alongside Yoast (active). The inactive RankMath should be removed to reduce attack surface and database overhead.
4. **WP Database Backup (wp-database-backup) active** — A simpler backup plugin alongside UpdraftPlus creates potential redundancy and confusion.
5. **No Google Search Console / Analytics integration detected** — Google Site Kit is not installed; no obvious GA4 connection.

## Recommendations

1. **Create robots.txt** — Add a basic robots.txt referencing the sitemap and setting sensible crawl-delay.
2. **Remove inactive plugins** — Uninstall RankMath (Yoast is active), AMP, Jetpack, and WP Smushit if not needed.
3. **Consolidate backup strategy** — Stick with UpdraftPlus (active for backups); remove or deactivate wp-database-backup.
4. **Add Google Site Kit or manually connect GA4/GSC** — Performance tracking is essential for understanding traffic sources.
5. **Check for page-level SEO** — Verify that key service pages (Beauty Treatment, Gallery) have unique meta titles/descriptions.

---

