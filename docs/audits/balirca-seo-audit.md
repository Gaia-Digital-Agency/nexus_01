# SEO Audit: balirca.id

**Server:** hostinger-wp | **WP Version:** 7.0 | **Theme:** GeneratePress Child 1.0.0 (GP 3.6.1 parent)  
**Upload years:** 6 | **Active since:** 2020 | **Active 2026:** ✅  
**Plugins total:** 32 | **Sitemap:** ✅ (200 OK, sitemap_index.xml)

---

## Overview

The Bali Restaurant and Cafe Association (BRCA) site is the most comprehensively configured site in this batch. It has a detailed robots.txt with 12 rules including crawl-delay: 20, explicit blocks for member/internal resources, and sitemap reference. The sitemap returns 200. Yoast SEO is active with Schema markup. The homepage title *"Bali Restaurant & Cafe Association | BRCA"* is clear and brand-appropriate. Ultimate Member powers the membership system, and Custom Post Type UI manages custom content types. Instagram Feed is active for social proof.

## Issues Found

1. **WP_DEBUG_LOG is enabled (`true`)** — In production, debug logging should always be `false`. This can fill disk space, expose file paths, and slow the site. Set `WP_DEBUG_LOG` to `false` in wp-config.php.
2. **High plugin count (32)** — Many plugins including inactive ones: ACF Pro (update avail), duplicate-post (inactive), Jetpack (inactive), WP Super Cache (inactive), Wordfence (inactive), WP Mail SMTP (inactive).
3. **Meta description grammar issue** — *"a association"* should be *"an association"*. Minor but worth fixing in the Yoast meta description.
4. **ACF Pro update available** — v6.8.3 → v6.8.4.
5. **GP Premium at v2.4.0** — Verify compatibility with GP 3.6.1.
6. **LiteSpeed Cache inactive** — Caching is not leveraged; WP Super Cache is also inactive.

## Recommendations

1. **Disable WP_DEBUG_LOG** — Set to `false` immediately. Check for existing debug.log files and clear them.
2. **Prune inactive plugins** — Remove Jetpack, Wordfence (inactive), duplicate-post, WP Super Cache (inactive), WP Mail SMTP (inactive version alongside active Pro version).
3. **Fix meta description typo** — Change "a association" to "an association" in Yoast homepage settings.
4. **Activate caching** — Either LiteSpeed Cache or WP Super Cache for better performance.
5. **Update ACF Pro** — Keep field management plugin current.
6. **Audit Ultimate Member pages** — Ensure member-only pages (/member/, /member-resources/) are properly blocked from indexing (already done via robots.txt, but also check noindex tags).

---

