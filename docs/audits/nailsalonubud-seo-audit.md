# SEO Audit: nailsalonubud.com

**Server:** hostinger-wp | **WP Version:** 7.0 | **Theme:** GeneratePress 3.6.1  
**Upload years:** 6 | **Active since:** 2020 | **Active 2026:** ✅  
**Plugins total:** 35 | **Sitemap:** ✅ (redirects to sitemap_index.xml, 301 → 200)

---

## Overview

Nail Salon Ubud is the sister site to hairsalonubud.com, sharing the same theme (GeneratePress) and many plugins. It has solid Yoast SEO implementation with Schema.org structured data, Open Graph, Twitter Cards, and a proper canonical URL. The homepage title *"Nail Salon Ubud - Nail Art and Nail Bar in Ubud Bali"* is targeted and local. The meta description is clear and descriptive. The site has extensive service pages (Nail Treatment, Massage) and a salon booking system. LiteSpeed Cache is active serving cached pages.

## Issues Found

1. **No robots.txt** — Same as sister site. No robots.txt means no crawl-delay directive and no explicit sitemap reference for crawlers.
2. **WP Super Cache (inactive)** — Installed but inactive while LiteSpeed Cache handles caching. Should be removed.
3. **Google Site Kit (inactive)** — Installed but not configured — good opportunity to activate for GA4/GSC integration.
4. **Dual SEO plugins** — RankMath is inactive while Yoast is active. Inactive plugin = unnecessary attack surface.
5. **Default table prefix** — Uses `4bXazL_` (same as hairsalonubud) — shared DB prefix across sites may indicate shared database or configuration copy. Not a hard problem but worth verifying isolation.
6. **35 plugins is high** — Several inactive plugins (AMP, Jetpack, Wordfence inactive, Ultimate Member) inflate the count.

## Recommendations

1. **Create robots.txt** — Add a robots.txt referencing sitemap_index.xml.
2. **Activate Google Site Kit** — Connect GA4 and GSC for performance data.
3. **Prune inactive plugins** — Remove RankMath, WP Super Cache, AMP, Jetpack, Wordfence (if not needed).
4. **Verify page-level SEO** — Check that service pages (Nail Treatment, Massage) have unique meta titles and descriptions.
5. **DB isolation** — Confirm the database is separate from hairsalonubud despite identical table prefix.

---

