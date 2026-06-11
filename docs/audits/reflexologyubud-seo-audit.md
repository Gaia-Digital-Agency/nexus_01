# SEO Audit Report: reflexologyubud.com

**Date:** 2026-06-10  
**Server:** hostinger-wp (PHP 8.1.34)  
**Upload Years:** 6 years | **Active:** 2026  
**robots.txt:** 13 lines

---

## Overview

Reflexology Ubud is a well-established spa/salon site in Ubud, Bali, with a content-rich homepage. The title tag *"Reflexology Massage - Reflexology Spa | Reflexology Ubud"* is keyword-dense and relevant. LiteSpeed Cache is properly configured (`WP_CACHE: true`) and returning cache HIT headers, indicating good performance. The site uses Yoast SEO with proper schema.org structured data (WebPage, BreadcrumbList, WebSite, Organization). Core auto-updates are enabled.

## Issues

1. **Dual SEO plugins (RankMath + Yoast SEO):** Both are active simultaneously. While Yoast seems to be outputting the meta/schema on the homepage, RankMath being installed creates unnecessary overhead and potential conflict. Only one should remain.
2. **Dual caching plugins (LiteSpeed Cache + WP Super Cache):** Running two caching plugins simultaneously can cause cache collisions, stale cache delivery, and performance degradation. WP Super Cache should be removed.
3. **Unnecessarily long robots.txt:** 13 lines of bot-specific rules, including a 120-second Crawl-Delay for MJ12bot and Yandex. While granular, this is overly complex. The `/author/` and `/servicecategory/` disallows are good but the Yandex block (Allow: /en, Disallow: /) is unusual and may be causing indexing issues.
4. **Table prefix exposes age:** The `4bXazL_` prefix is random and secure — good.
5. **Meta description truncated:** The homepage meta description cuts off mid-sentence (*"...hygienist reflexology spa based"*). It should be a complete sentence for optimal CTR.
6. **Charset is utf8 (not utf8mb4):** The database connection uses `utf8` instead of `utf8mb4`, which can't store emoji or certain special characters. For a modern spa site this is outdated.

## Recommendations

- **Deactivate RankMath** (keep Yoast) OR vice versa — pick one SEO plugin and stick with it.
- **Deactivate WP Super Cache** — LiteSpeed Cache alone is sufficient and already delivering HIT responses.
- Fix the homepage meta description to be a complete, compelling sentence.
- Change `DB_CHARSET` from `utf8` to `utf8mb4` in wp-config (requires DB collation conversion as well).
- Clean up the robots.txt — simplify to essential rules only, remove Yandex blocking which may hurt international traffic.
- The site is well-optimized overall; focus on content freshness and backlink building to grow organic presence.

---

