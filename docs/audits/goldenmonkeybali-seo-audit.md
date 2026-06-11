# SEO Audit Report: goldenmonkeybali.com

**Date:** 2026-06-10  
**Server:** hostinger-wp (PHP 8.1.34)  
**Upload Years:** 6 years | **Active:** 2026  
**Themes installed:** 8 (including goldenmonkey, goldenmonkey-bali, goldenmonkey-ubud, goldenmonkey-canggu.zip + default WordPress themes)

---

## Overview

Golden Monkey Bali is a Cantonese restaurant site with a well-optimized homepage. Title: *"Best Cantonese Restaurant in Bali - Golden Monkey Restaurant"* and the meta description is complete and compelling. RankMath handles SEO with proper schema.org markup (Organization, WebSite, WebPage, Article, Person). Google site verification is present. LiteSpeed Cache is active with `WP_CACHE: true`. The site uses `FS_METHOD: direct` for filesystem access (efficient). Core updates are set to minor only.

## Issues

1. **No robots.txt file (critical):** The file `/robots.txt` does not exist on the server. This means search engines will discover and potentially index everything, including admin paths, author archives, and staging content. WordPress may generate a virtual one via SEO plugins, but a physical file is recommended.
2. **Default `wp_` table prefix:** Using the default `wp_` table prefix makes the site slightly more vulnerable to SQL injection attacks targeting standard table names. Should be changed (though this requires DB access and careful migration).
3. **8 installed themes:** Including `goldenmonkey-ubud`, `goldenmonkey-bali`, `goldenmonkey-bali-git`, `goldenmonkey-canggu.zip`, and default WP themes. Redundant themes create an attack surface — only the active theme and one default fallback should be kept.
4. **No WP_AUTO_UPDATE_CORE to 'true':** Currently set to `'minor'` only, meaning major security releases could be missed.
5. **Mixed site structure:** The site has separate theme directories for bali/ubud/canggu locations suggesting a fragmented setup. The main site (bali) seems well-maintained but the other location sites (sanur, ubud) redirect here.

## Recommendations

- **Create a robots.txt file** with at minimum:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.goldenmonkeybali.com/sitemap.xml
  ```
  Add disallows for `/wp-admin/`, `/author/` if desired.
- Change table prefix from `wp_` to a custom prefix (requires DB migration).
- Delete unused themes (all except the active theme and one default like twentytwentyfive).
- Set `define('WP_AUTO_UPDATE_CORE', true);` for all security updates.
- The overall on-page SEO (titles, descriptions, schema) is good — focus on local SEO (Google Business Profile, local citations) and content about Chinese/Cantonese cuisine in Bali.

---

