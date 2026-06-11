# SEO Lite Audit: dapurraja.com (Dapur Raja Balinese Restaurant)

**Date:** 10 June 2026  
**Hosting:** hostinger-wp | **Tier:** 3

## Overview

Dapur Raja is a Balinese Restaurant site with 6 years of upload history (active through 2026). The WordPress site title is "Dapur Raja" and the tagline reads "Balinese Rijsttafel Restaurant In Ubud Bali." It uses a custom theme (`dapurraja`, v2022.09.29) with only one other inactive theme (Twenty Twenty-Five).

## Critical Finding: Full 301 Redirect to New Domain

This site has a **permanent 301 redirect in `.htaccess`** from `dapurraja.com` to `enzosushitrain.com`. All traffic — including the homepage, sitemaps, and all pages — is redirected to the new domain. This appears to be a deliberate domain migration or rebranding from Dapur Raja to Enzo Sushi Train.

```
RewriteCond %{HTTP_HOST} ^(www\.)?dapurraja\.com$ [NC]
RewriteRule ^(.*)$ https://www.enzosushitrain.com/$1 [R=301,L]
```

## Robots.txt & Sitemap

- **robots.txt:** Present but minimal — only `User-agent: *` and `Crawl-Delay: 20`. No `Disallow` rules, no `Sitemap:` declaration.
- **Sitemap:** All sitemap URLs (`sitemap.xml`, `sitemap_index.xml`, `wp-sitemap.xml`) redirect to `enzosushitrain.com` equivalents. The RankMath sitemap was presumably working before the redirect was put in place.

## Plugins (15 active)

Moderate plugin count. Key plugins:
- **RankMath SEO** — installed, would be generating sitemaps if active
- **LiteSpeed Cache** — caching
- **UpdraftPlus** — backups
- **Wordfence** — security
- **Classic Editor** — classic editing experience
- **Contact Form 7 + recaptcha** — forms
- **Hostinger** — hosting integration plugin

## Theme

- **Active:** `dapurraja` (v2022.09.29) — custom theme
- **Inactive:** Twenty Twenty-Five

## Key Issues

1. **Site is fully redirected to enzosushitrain.com** — this is a domain-level 301 redirect. SEO efforts for `dapurraja.com` are moot; the domain passes link equity to the new domain.
2. **robots.txt is skeletal** — but since all traffic is redirected, this only matters if the domain eventually returns to serving content.
3. **Tagline is set** ("Balinese Rijsttafel Restaurant In Ubud Bali") — this is actually good if the redirect were to be removed.

## Recommendations

1. **Ensure the new domain (enzosushitrain.com) has proper SEO setup** — proper sitemap, robots.txt, GSC configuration, and analytics.
2. **Monitor that the redirect stays healthy** — the `.htaccess` rules should remain in place as long as the domain is migrating authority to the new site.
3. **Keep the old domain registered** — don't let it expire or someone could hijack redirect traffic.
4. **No further SEO work needed on dapurraja.com itself** unless the redirect is removed and the site is reactivated.
