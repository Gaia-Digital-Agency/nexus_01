# Technical Audit — balihiddenvillas.com
**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live (intermittent 403 challenge — accessible on retry)

## Verified signals
- HTTP/redirects: `https://balihiddenvillas.com/` → 200 (PHP 8.3.30). `balihideawayvillas.com` 301s into this domain.
- robots.txt: `Disallow: /wp-admin/`, `Allow: /admin-ajax.php`; `Sitemap: .../sitemap_index.xml`.
- sitemap: index uses `post-type-*` / `taxonomy-*` naming → **SureForms / Spectra-style sitemap**, includes `sureforms_form` post type.
- HTTPS/headers: HTTP/2, Hostinger CDN (`x-hcdn-cache-status: DYNAMIC` — not cached), `content-security-policy: upgrade-insecure-requests`. No HSTS.
- Platform: WordPress (generator meta suppressed); SureForms plugin present. PHP 8.3.30 (newest in portfolio).
- Hostinger API: valid WP install (id 26674212, login `admin`).
- Schema: 1 JSON-LD block.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| Access | Intermittent 403 challenge to crawlers. | Med |
| Performance | CDN serving DYNAMIC (uncached) — no page cache hit; enable caching. | Med |
| Security | Login is generic `admin` (per Hostinger API) — high-value brute-force target. | High |
| Security | No HSTS. | Med |
| Indexability | `sureforms_form` post type in sitemap — exclude form CPT from indexing. | Low |

## Could not verify
- Full plugin list/versions; whether a caching plugin is installed but disabled; CWV.

## Top technical fixes (analysis only — NOT executed)
1. Rename the `admin` user / enforce strong auth + 2FA.
2. Enable page caching (LiteSpeed/CDN) — currently DYNAMIC.
3. Exclude `sureforms_form` from the sitemap; add HSTS.
