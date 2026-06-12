# Technical Audit — ayrwater.com

> **In plain terms (for the team):** Your site is generally crawlable and secure, with Google able to find your content and users protected by HTTPS. However, the single biggest risk is the **duplicate Advanced Custom Fields Pro plugin**, which could cause site errors or break functionality, directly impacting your content and potentially search visibility.

**Server:** ce01 · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- HTTP/redirects: `http://ayrwater.com/` 301 → `https://www.ayrwater.com/` (canonical www, 200). WordPress-issued redirect.
- robots.txt: present; `Disallow: /wp-admin/` + `Allow: /wp-admin/admin-ajax.php`; `Sitemap: https://www.ayrwater.com/sitemap_index.xml`.
- sitemap: Rank Math `sitemap_index.xml` (page + news sub-sitemaps), domain URLs.
- HTTPS/headers: HTTP/2, LiteSpeed (`x-litespeed-cache: hit`), `content-security-policy: upgrade-insecure-requests`. No HSTS.
- Platform/version: WordPress 6.8.5, PHP 8.2.30 (LiteSpeed). DB `table_prefix = 'wp_'` (default), `WP_DEBUG=false` (verified via wp-config on ce01).
- Plugins/theme (SSH): Rank Math SEO, ACF Pro **installed twice** (`advanced-custom-fields-pro` + `advanced-custom-fields-pro-2`), Contact Form 7, FluentForm, duplicate-post, auto-block-recovery, custom-attr-block. Themes: 6 `ayrwater*` variants (ayrwater, -new, -newbak, _-, __, _bak) + twentytwentyfive.
- Schema: 1 JSON-LD block on homepage.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Security | Default `wp_` table prefix — marginally eases SQL-injection enumeration. | Med |
| Plugin hygiene | ACF Pro installed twice (`-pro` + `-pro-2`) — version conflict / double-load risk. | High |
| Theme bloat | 6 near-duplicate `ayrwater*` themes on disk (incl. `_bak`, `_-`, `__`) — dead code / attack surface. | Med |
| Security | No HSTS header despite HTTPS enforced. | Med |
| Plugin overlap | Two form plugins active (Contact Form 7 + FluentForm) — redundant. | Low |
| Indexability | robots/sitemap valid, homepage indexable. | Info |

## Could not verify
- Core Web Vitals field data; exact plugin versions / pending-update list (only names enumerated).

## Top technical fixes (analysis only — NOT executed)
1. Remove the duplicate ACF Pro install (`advanced-custom-fields-pro-2`); keep one.
2. Delete the 5 redundant `ayrwater*` backup themes from `wp-content/themes`.
3. Add HSTS on the canonical host; consolidate to one form plugin.
4. (Optional) migrate off default `wp_` prefix.
