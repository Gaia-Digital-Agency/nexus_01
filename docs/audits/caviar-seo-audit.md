# SEO Audit: caviar.id

**Server:** hostinger-wp | **WP Version:** 7.0 | **Theme:** caviar-theme-git (custom)  
**Upload years:** 3 | **Active since:** 2023 | **Active 2026:** ✅  
**Plugins total:** 28 | **Sitemap:** ✅ (redirects to www.caviar.id/sitemap.xml)  
**SEMRUSH:** 19 keywords, 0 monthly traffic

---

## Overview

caviar.id is a WooCommerce-based ecommerce site selling high-end caviar in Indonesia. The custom theme (caviar-theme-git) and Yoast SEO provide good SEO foundation. The homepage title *"High-End Caviar for Home & Restaurant | Caviar Indonesia"* is well-optimized for the local market. The meta description is strong: *"Discover a fine selection of best caviar brands in Indonesia. From Beluga to Siberian Sturgeon, experience the ultimate luxury dining now."* Schema markup is present. The site has a proper sitemap at www subdomain.

## Issues Found

1. **No robots.txt** — Missing robots.txt means no explicit crawl control or sitemap reference for search engines.
2. **Default table prefix (`wp_`)** — Major security concern. Default prefixes make SQL injection attacks easier. This should be changed to a custom prefix.
3. **Low search visibility** — Only 19 keywords tracked on SEMRush with 0 monthly traffic. Very early stage SEO.
4. **Elementor/Elementor Pro inactive** — These page builder plugins are installed but inactive. If not needed, remove them.
5. **Wordfence inactive** — Security plugin not active for an ecommerce site handling payments via WooCommerce PayPal Payments.
6. **Yoast has update available** — v27.7 → v27.8 available.
7. **Hostinger AI Assistant has update available** — v3.0.39 → v3.0.40.

## Recommendations

1. **Create robots.txt** — Essential for controlling crawler behavior, especially for an ecommerce site with product/cart URLs.
2. **Change table prefix** — Migrate from `wp_` to a custom prefix to improve database security.
3. **Invest in content marketing** — With 0 traffic, the priority is creating product descriptions, blog content, and category pages targeting long-tail keywords like "buy beluga caviar Indonesia" and "premium caviar Jakarta."
4. **Activate Wordfence** — Ecommerce sites are prime targets. Wordfence should be active.
5. **Remove unused plugins** — Elementor, Elementor Pro, Akismet, and inactive Hostinger plugins.
6. **Update Yoast SEO** — Keep SEO plugin current for best Schema and sitemap features.

---

