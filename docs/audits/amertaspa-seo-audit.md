# SEO Lite Audit: amertaspa.com (Amerta Wellness Spa)

**Date:** 10 June 2026  
**Hosting:** hostinger-wp | **Tier:** 3

## Overview

Amerta Wellness Spa is a WordPress site with a rich history—upload data spans 5 years (2019–2026). The site uses a custom child theme (`amerta`, v0.0.1) based on GeneratePress, alongside 6 inactive default WordPress themes that should be cleaned up.

## Robots.txt & Sitemap

- **robots.txt:** Present but minimal — contains only `User-agent: *` and `Crawl-Delay: 20`. No `Disallow` rules, no `Sitemap` declaration, and no `Allow` directives. This is a skeleton file that provides very little guidance to crawlers.
- **Sitemap:** `sitemap_index.xml` works (RankMath-generated). `sitemap.xml` returns 404. `wp-sitemap.xml` redirects to `www.amertaspa.com/sitemap_index.xml`. The site also redirects non-www to www.

## Plugins (21 active)

The site is heavily plugin-loaded with 21 active plugins. Key SEO-related plugins:
- **RankMath SEO** — active and generating sitemaps
- **LiteSpeed Cache** — caching and performance
- **UpdraftPlus** — backups

Other notable plugins: Advanced Custom Fields, Contact Form 7 + entries + recaptcha, Cookie Law Info, Custom Post Type UI, Duplicator Pro, Instagram Feed, WPForms Lite, WP Mail SMTP Pro, WPS Hide Login. The number of plugins is high for a Tier 3 site and introduces potential bloat and security surface.

## Homepage

- **Title Tag (WP):** "Home" — this is non-descriptive and poor for SEO. The site name is "Amerta Wellness Spa" but the homepage title is just "Home", which misses a key ranking opportunity.
- **Tagline:** Empty — no site description is set.
- The homepage ID is 25. The front page appears to be a static page with the title "Home" rather than a dynamic blog feed.

## Key Issues

1. **Homepage title is "Home"** — should be optimised to include the brand name and a primary keyword (e.g., "Amerta Wellness Spa | Bali Spa & Wellness").
2. **No site tagline/description** — the WordPress tagline is empty.
3. **robots.txt is too minimal** — no sitemap URL declared, no disallow rules for admin or non-public areas.
4. **7 inactive themes** — `generatepress`, `twentytwentyfive`, `twentytwentyfour`, `twentytwentyone`, `twentytwentythree`, `twentytwentytwo`, and `ubc` should be removed.
5. **21 active plugins** — high plugin count; audit for unused/duplicate functionality.
6. **Sitemap.xml (non-index) returns 404** — this isn't critical since the index sitemap works, but a cleaner setup would redirect it.

## Recommendations

- Change the homepage title to include the brand name and primary keyword.
- Set a meaningful site tagline in Settings > General.
- Expand robots.txt to include a sitemap URL declaration and disallow rules for `/wp-admin/`.
- Delete unused themes.
- Review and deactivate unnecessary plugins.
