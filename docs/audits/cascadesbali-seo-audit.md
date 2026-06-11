# SEO Audit: cascadesbali.com

**Server:** gda-ce01 | **WP Version:** 7.0 | **PHP:** 8.3.31 | **Theme:** cascades-git (custom)  
**Upload years:** 10 | **Active since:** 2016 | **Active 2026:** ✅  
**Plugins total:** 24 | **Sitemap:** ✅ (redirects, www.canonical)  
**SEMRUSH:** 135 keywords, ~25 monthly traffic

---

## Overview

CasCades Restaurant Ubud is the oldest site in this batch (10 years, since 2016) with the strongest SEO profile — 135 keywords tracked and ~25 monthly visits on SEMRush. The restaurant uses a custom cascades-git theme with RankMath SEO (not Yoast). The robots.txt is the most detailed in the batch with 13 rules including targeted crawl-delays for aggressive bots (MJ12bot at 120s), blocking Yandex except /en pages, blocking SemrushBot, and proper sitemap reference. The homepage canonical redirects to www (https://www.cascadesbali.com). PHP 8.3.31 is the most modern version across all sites.

## Issues Found

1. **LiteSpeed Cache is the only caching plugin** — No second-layer caching or page optimization. LiteSpeed Cache v7.8.1 is active.
2. **Homepage redirect (301)** — www canonical redirect is correct behavior, but the curl title returned "301 Moved Permanently" before following redirect. Verify the redirect chain is efficient.
3. **Some draft pages** — "Menu Hide for Now" (draft) should be cleaned up; "home-2" duplicate homepage page should be removed or finalized.
4. **ACF Content Analysis for Yoast installed but RankMath is used** — Leftover plugin from when the site may have used Yoast. Remove it.
5. **WP-Optimize has update available** — v4.5.4 → v4.5.5.
6. **Classic Editor active** — If Gutenberg compat isn't needed, this is fine, but worth noting the site may not be using the block editor.

## Recommendations

1. **Clean up draft pages** — Remove "Menu Hide for Now" draft and resolve "home-2" duplicate page situation.
2. **Remove orphaned plugins** — `acf-content-analysis-for-yoast-seo` is unused with RankMath. Remove it.
3. **Review redirect chain** — Ensure homepage redirect is a single 301 step (non-www → www) with no extra hops.
4. **Consider image optimization** — A restaurant site likely has many images; verify they are optimized for web (WebP, lazy loading via LiteSpeed).
5. **Leverage PHP 8.3** — This site has the most modern PHP version. Ensure all plugins and the custom theme are compatible with PHP 8.3 for performance.
6. **Content expansion** — With 135 keywords and 25 visitors/month, there's room to grow through menu pages, blog posts about Ubud dining, and recipe content.

---

