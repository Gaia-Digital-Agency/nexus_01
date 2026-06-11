# SEO Lite Audit: aquatir.id (Aquatir Caviar)

**Date:** 10 June 2026  
**Hosting:** hostinger-wp | **Tier:** 3

## Overview

Aquatir Caviar is an Indonesian caviar/e-commerce site with 4 years of upload history (active through 2026). The site title is "Aquatir Caviar" with tagline "Beluga and Russian Sturgeon in Bali." It runs on WooCommerce (selling caviar products) and uses a custom theme (`aquatir-git`, v1.0) with 4 inactive themes (including `caviar-git`, `caviar`, Twenty Twenty-Five, and Twenty Twenty-Four). The non-www version redirects to www.

## Robots.txt & Sitemap

- **robots.txt:** **Well-configured** — 6 lines with proper directives:
  - `Disallow: /wp-admin/`
  - `Allow: /wp-admin/admin-ajax.php`
  - `Disallow: /cart/`
  - `Disallow: /checkout/`
  - `Disallow: /my-account/`
  - `Disallow: /shop/`
  - Includes a `Sitemap:` declaration pointing to `https://www.aquatir.id/sitemap_index.xml`
- **Sitemap:** `sitemap_index.xml` works (Yoast-generated, HTTP 200). `sitemap.xml` returns 404. `wp-sitemap.xml` redirects to the www Yoast sitemap index.

This is the **best robots.txt** of all 5 sites audited.

## Plugins (12 active)

Lean and purposeful plugin set. Key plugins:
- **Yoast SEO** — active, generating sitemaps (good SEO plugin choice)
- **LiteSpeed Cache** — caching
- **Redirection** — URL management
- **UpdraftPlus** — backups
- **WooCommerce** — e-commerce functionality
- **Wordfence** — security
- **Advanced Custom Fields + ACF Pro + ACF Repeater** — custom fields
- **Contact Form 7 + recaptcha** — forms
- **WPS Hide Login** — security through obscurity

## Theme

- **Active:** `aquatir-git` (v1.0) — custom theme
- **Inactive:** `caviar-git` (v1.0), `caviar` (v1.0), Twenty Twenty-Five, Twenty Twenty-Four

## Homepage

- **Site Title (WP):** "Aquatir Caviar"
- **Tagline:** "Beluga and Russian Sturgeon in Bali" — descriptive, keyword-rich tagline.
- **WooCommerce:** Active — the site sells caviar products online.

## Key Issues

1. **robots.txt blocks `/shop/`** — this is unusual for a WooCommerce site. Blocking the shop archive page from search engines means category/product listing pages won't be indexed. This may be intentional (e.g., to prevent thin content issues) but should be reviewed.
2. **`sitemap.xml` returns 404** — the raw `sitemap.xml` URL is not handled. Only `sitemap_index.xml` works. Minor issue since the index is correct.
3. **3 inactive custom themes** (`caviar-git`, `caviar`, plus 2 WordPress defaults) — these should be cleaned up.
4. **E-commerce specific** — no checkout/cart/my-account pages indexed (correctly blocked in robots.txt), but the `/shop/` block is worth reviewing.

## Strengths

- **robots.txt is properly configured** — best of all 5 sites audited.
- **Yoast SEO** is a solid choice and generating sitemaps correctly.
- **Tagline is descriptive and keyword-rich**.
- **Moderate plugin count** (12) — not overly bloated.
- **Active in 2026** — clearly maintained.

## Recommendations

1. **Review the `/shop/` disallow in robots.txt** — consider allowing it if you want WooCommerce product archives indexed.
2. **Delete unused themes** (`caviar-git`, `caviar`, Twenty Twenty-Five, Twenty Twenty-Four) to reduce security surface.
3. **Set up a redirect from `sitemap.xml` to `sitemap_index.xml`** for cleaner crawl paths.
4. **Ensure WooCommerce product pages have proper schema markup** (Yoast SEO handles this, but verify).
