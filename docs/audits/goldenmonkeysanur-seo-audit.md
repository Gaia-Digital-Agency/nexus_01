# SEO Audit Report: goldenmonkeysanur.com

**Date:** 2026-06-10  
**Server:** hostinger-wp (PHP 8.1.34)  
**Upload Years:** 6 years | **Active:** 2026  
**Themes installed:** 8 (astra, goldenmonkey-canggu, goldenmonkey-canggu-13-10-2021.zip, goldenmonkey-canggu-19-10-2021.zip, goldenmonkey-canggu-.zip + default WP themes)

---

## Overview

goldenmonkeysanur.com is a **301 redirect-only domain** pointing to `https://www.goldenmonkeybali.com/contact/#sanur`. It has a full WordPress installation underneath but the homepage immediately redirects. The site uses LiteSpeed Cache with `WP_CACHE: true`. A bare-bones robots.txt exists with only a `Crawl-Delay: 20` directive and no sitemap reference. The title/meta served is from the target page (Golden Monkey contact page).

## Issues

1. **Identical auth keys with goldenmonkeyubud.com (critical security):** All 8 salt and key constants (`AUTH_KEY`, `SECURE_AUTH_KEY`, `LOGGED_IN_KEY`, `NONCE_KEY`, and all 4 salts) are **exactly identical** to those on goldenmonkeyubud.com. This means cookies generated on one site are valid on the other. If either site is compromised, both are vulnerable.
2. **Minimal robots.txt:** Only contains `User-agent: *` and `Crawl-Delay: 20` — no sitemap reference, no disallow rules. Despite being a redirect domain, search engines may still crawl and index it.
3. **Redundant WordPress installation:** Full WP core, plugins (LiteSpeed Cache, Redirection, RankMath, UpdraftPlus), and database exist for what is essentially a redirect. This is unnecessary overhead and an additional attack surface.
4. **Weak database password:** The MySQL password `:Fq2$Wea` is short (8 chars) and contains only alphanumeric + one special character. Consider rotating.
5. **Multiple zip theme files left on server:** `goldenmonkey-canggu-13-10-2021.zip`, `goldenmonkey-canggu-19-10-2021.zip`, and `goldenmonkey-canggu-.zip` remain in the themes directory — staging/backup artifacts that should be removed.
6. **Table prefix `gmc2021_`** is good (custom, non-default).

## Recommendations

- **Generate unique auth keys and salts** for goldenmonkeysanur.com immediately. Use the WordPress secret-key API or a strong random generator. Do NOT share keys with any other site.
- Consider whether this redirect domain is necessary at all — if it serves no purpose beyond redirecting to the main site, the WordPress installation could be stripped down to a simple `.htaccess` redirect.
- Add proper robots.txt with `Disallow: /` to prevent indexing of this redirect domain.
- Remove residual `.zip` theme files from the server.
- Rotate the database password to a stronger, longer string (16+ chars with mixed case, numbers, special chars).
- Clean up to 2-3 themes minimum (active theme + one default).

---

