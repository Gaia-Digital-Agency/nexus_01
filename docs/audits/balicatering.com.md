# Technical Audit — balicatering.com
**Server:** ce01 · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: `http://balicatering.com/` 301 → `https://www.balicatering.com/` (200, nginx/1.24.0).
- robots.txt: Yoast block; `Disallow:` empty (fully crawlable); `Sitemap: https://www.balicatering.com/sitemap_index.xml`.
- sitemap: Yoast index — post, page, author, geo sub-sitemaps (domain URLs).
- HTTPS/headers: HTTP/1.1 over nginx; `content-security-policy: upgrade-insecure-requests`. No HSTS.
- Platform/version: WordPress 7.0; DB `table_prefix = 'bn4eCyG_'` (non-default ✓), `WP_DEBUG=false` (verified on ce01).
- Plugins/theme (SSH): Yoast SEO + Yoast SEO Premium + wpseo-local, LiteSpeed Cache, Duplicator Pro, EWWW Image Optimizer, NextGen Gallery, WP Mail SMTP (+Pro both present), Google Reviews, WPCode Premium, bali-service-area, author-blog-profiles. Theme: `flatsome` (active) + `bali-catering` + defaults.
- Schema: 2 JSON-LD blocks.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Plugin overlap | Both `wp-mail-smtp` and `wp-mail-smtp-pro` present — keep Pro only. | Med |
| Sitemap hygiene | `author-sitemap.xml` exposed — disable if author archives unused. | Low |
| Security | No HSTS header. | Med |
| Security (good) | Non-default table prefix `bn4eCyG_`, WP_DEBUG off. | Info |
| Plugin hygiene | Duplicator Pro present on production — ensure backup archives not left in webroot. | Low |

## Could not verify
- Plugin pending-update versions; CWV field data; whether Duplicator archives sit in a public path.

## Top technical fixes (analysis only — NOT executed)
1. Remove the non-Pro `wp-mail-smtp` duplicate.
2. Add HSTS; disable author sitemap in Yoast.
3. Confirm no Duplicator `.zip`/installer.php left in public_html.
