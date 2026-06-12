# Technical Audit — balirca.id

> **In plain terms (for the team):** Your site is generally secure (HTTPS is active, `content-security-policy` is present) and fast (Hostinger CDN is in use), but Google's ability to fully crawl and index your content is significantly hampered. The single biggest risk is that your `robots.txt` file is telling Google *not* to crawl several important sections of your site, including resources and partner pages, while simultaneously listing them in your sitemap, creating a direct conflict that prevents these pages from appearing in search results. Additionally, a `Crawl-Delay` directive in your `robots.txt` is slowing down how quickly Google can discover and update your content.

**Server:** hostinger · **Audited:** 2026-06-11 · **Status:** live

## Verified signals
- **HTTP/redirects:** Initial request (implied non-HTTPS/non-www) redirects with a 301 (Permanent Redirect) to `https://www.balirca.id/`. The redirect is handled by WordPress (`x-redirect-by: WordPress`). The final destination `https://www.balirca.id/` returns a 200 OK status.
- **robots.txt:** Present and accessible. Includes a `Crawl-Delay: 20` directive. Disallows crawling of several paths including `/resource/`, `/member-resources/`, `/sustainable-partners/`, `/local-supplier/`, `/business-resources/`, `/offer/`, `/member/`, `/login/`, `/cuisine/`, and `/location/`. Standard WordPress `Disallow: /wp-admin/` and `Allow: /wp-admin/admin-ajax.php` rules are present.
- **sitemap:** A sitemap index is declared at `https://www.balirca.id/sitemap_index.xml`. The `sitemap_index.xml` file is present, styled by `wordpress-seo` plugin, and lists several sub-sitemaps: `post-sitemap.xml`, `page-sitemap.xml`, `member-sitemap.xml`, `event-sitemap.xml`, `resource-sitemap.xml`, `member-resources-sitemap.xml`, and `sustainable_partners-sitemap.xml`. The `sitemap.xml` URL (without `_index`) returns an HTTP 404 error. Some sitemaps (`resource-sitemap.xml`, `member-resources-sitemap.xml`) show older `lastmod` dates (2023, 2024) compared to others (2026).
- **HTTPS/headers:** Site serves over HTTPS. Uses HTTP/2 protocol and supports HTTP/3 (`alt-svc: h3=":443"`). `content-security-policy: upgrade-insecure-requests` and `permissions-policy` headers are present. `x-ua-compatible: IE=edge` header is present. `cache-control: max-age=3600` is set for the redirect. Hostinger CDN (`server: hcdn`) is in use, with `x-hcdn-cache-status: HIT` for the redirect and `DYNAMIC` for the 200 OK response.
- **Platform/version:** CMS is WordPress (`x-redirect-by: WordPress`, `wp-json` links, `wordpress-seo` sitemap stylesheet). PHP version is 8.2.30 (`x-powered-by: PHP/8.2.30`). Hosting platform is Hostinger (`platform: hostinger`, `panel: hpanel`).
- **Plugins/theme/security:** WordPress SEO (Yoast) plugin is indicated by the sitemap stylesheet. The `generator` meta tag is not present. `content-security-policy: upgrade-insecure-requests` header is present. JSON-LD schema is present. WordPress REST API endpoints are exposed.

## Technical findings
| Area | Finding | Severity |
|---|---|---|
| HTTP/redirects | Initial request redirects via 301 to `https://www.balirca.id/`. | Info |
| HTTP/redirects | Redirect is handled by WordPress, which can sometimes be less efficient than server-level redirects. | Low |
| robots.txt | `Crawl-Delay: 20` directive is present, which can significantly slow down crawling for search engines that respect it. | Med |
| robots.txt | Several paths (`/resource/`, `/member-resources/`, `/sustainable-partners/`, `/local-supplier/`, `/business-resources/`, `/offer/`, `/member/`, `/login/`) are disallowed. If these contain valuable public content, they should be allowed. | Med |
| robots.txt | Taxonomy archives (`/cuisine/`, `/location/`) are disallowed. If these are intended to be indexed, the disallow should be removed. | Med |
| sitemap | The primary sitemap URL `sitemap.xml` returns a 404, while `sitemap_index.xml` is the correct one. This can lead to confusion for crawlers or manual checks. | Med |
| sitemap | Sitemaps for `resource-sitemap.xml` (lastmod 2023-02-21) and `member-resources-sitemap.xml` (lastmod 2024-02-12) show significantly older `lastmod` dates compared to other sitemaps, suggesting content in these sections may not be updated frequently or the sitemap generation for them is not working correctly. | Low |
| sitemap | Some sitemaps (`resource-sitemap.xml`, `member-resources-sitemap.xml`, `sustainable_partners-sitemap.xml`) are disallowed in `robots.txt`. This creates a conflict: sitemaps tell search engines what to crawl, while robots.txt tells them not to. This needs to be aligned. | High |
| HTTPS/headers | `content-security-policy: upgrade-insecure-requests` is present. While it helps, a more robust CSP should be considered to prevent mixed content issues and enhance security. | Low |
| Platform/version | PHP 8.2.30 is a relatively recent and supported version, which is good for performance and security. | Info |
| Plugins/theme/security | Homepage `h1` tag is missing. This is a basic on-page structural element. | Med |
| Plugins/theme/security | WordPress REST API endpoints are exposed by default. While often necessary, it's good practice to secure or limit access if not fully utilized. | Low |
| Plugins/theme/security | Yoast SEO plugin is in use, indicated by the sitemap stylesheet. | Info |

## Could not verify
- CMS/platform specific version (e.g., WordPress 6.x.x)
- Plugin/theme stack beyond Yoast SEO
- Plugin/theme conflicts or bloat
- Security vulnerabilities (e.g., table prefix, debug mode, exposed files, authentication issues) beyond what headers indicate
- Schema presence beyond "yes" (e.g., specific types, validation)
- Speed/Core Web Vitals signals
- Indexability status (e.g., `X-Robots-Tag`, `noindex` meta tags)
- Google Search Console verification status

## Top technical fixes (analysis only — NOT executed)
1.  **Resolve robots.txt and sitemap conflicts:** Align `robots.txt` disallows with sitemap inclusions. If content in disallowed sitemaps (`resource-sitemap.xml`, `member-resources-sitemap.xml`, `sustainable_partners-sitemap.xml`) is intended for indexing, remove the corresponding `Disallow` directives in `robots.txt`. If not, remove them from the sitemap.
2.  **Correct sitemap URL:** Ensure `sitemap.xml` redirects to `sitemap_index.xml` or update all references to use `sitemap_index.xml` consistently to avoid 404 errors.
3.  **Review `Crawl-Delay` directive:** Consider removing or reducing the `Crawl-Delay: 20` in `robots.txt` unless there's a specific server load concern, as it can hinder efficient crawling.
4.  **Add a primary H1 tag to the homepage:** Implement a clear and descriptive `<h1>` tag on the homepage for better content structure and SEO.
5.  **Review disallowed paths in `robots.txt`:** Evaluate if paths like `/resource/`, `/member-resources/`, `/cuisine/`, `/location/` should truly be blocked from search engines. If they contain valuable content, allow them.