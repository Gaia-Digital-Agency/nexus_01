# SEO Lite Audit: ubudbeautycentre.com (UBUD BEAUTY CENTRE)

**Date:** 10 June 2026  
**Hosting:** hostinger-wp | **Tier:** 3

## Overview

UBUD BEAUTY CENTRE is a WordPress site with 5 years of upload history (2019–2026). It uses a custom child theme (`ubc`, v0.0.1) with GeneratePress as the parent (inactive). The site is set up for a beauty/salon business in Ubud, Bali.

## Robots.txt & Sitemap

- **robots.txt:** Present but minimal — only `User-agent: *` and `Crawl-Delay: 20`. No `Disallow` rules for admin, checkout, or other non-public areas. No `Sitemap:` declaration linking to the sitemap.
- **Sitemap:** `sitemap_index.xml` works (RankMath-generated, HTTP 200). `sitemap.xml` and `wp-sitemap.xml` both return 404. The non-www version redirects to the www version.

## Plugins (23 active)

Heavy plugin load with 23 active plugins. Key SEO-related:
- **RankMath SEO** — active, generating sitemaps
- **LiteSpeed Cache** — caching
- **Redirection** — URL management
- **UpdraftPlus** — backups

Other notable plugins: Elementor + Elementor Pro (page builder), Advanced Custom Fields + ACF Repeater, Contact Form 7 + entries, Cookie Law Info, Custom Post Type UI, Salon Booking System, Instagram Feed, WP All Export, WP Mail SMTP. This is a very large plugin footprint for a Tier 3 site.

## Homepage

- **Site Title (WP):** "UBUD BEAUTY CENTRE" — reasonably descriptive but all-caps.
- **Tagline:** Empty — no site description/tagline is set.
- The non-www domain redirects to the www version. The homepage is likely built with Elementor.

## Key Issues

1. **No site tagline** — the WordPress tagline/description field is empty. This is a missed opportunity for a brief SEO description in search results.
2. **robots.txt is too minimal** — no sitemap URL, no disallow for `/wp-admin/` or other sensitive paths.
3. **23 active plugins** — very high count; likely includes many that are unused or could be consolidated. Elementor + Pro alone brings significant page weight.
4. **Inactive parent theme (GeneratePress)** — the active `ubc` child theme could be more clearly versioned and maintained.
5. **No sitemap.xml or wp-sitemap.xml** — these return 404 rather than redirecting to the index sitemap.

## Recommendations

- Set a site tagline/tagline description (e.g., "Premium beauty treatments and salon services in Ubud, Bali").
- Expand robots.txt with a `Sitemap:` declaration and appropriate `Disallow` rules.
- Review plugin list — many plugins (WP All Export, Duplicate Page, Better Search Replace) may not be needed in production.
- Redirect `sitemap.xml` to `sitemap_index.xml` for cleaner crawl paths.
