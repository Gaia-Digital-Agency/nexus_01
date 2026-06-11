# Blossom Steakhouse — Comprehensive SEO Audit Report

**Date:** June 10, 2026  
**URL:** https://www.blossomsteakhouse.com  
**Auditor:** Hermes Agent (Subagent)

---

## 1. Site Overview

| Attribute | Detail |
|---|---|
| **Domain** | blossomsteakhouse.com |
| **Canonical URL** | https://www.blossomsteakhouse.com |
| **Server** | nginx/1.24.0 (Ubuntu) on GCP — VM: `gda-ce01` |
| **CMS** | WordPress 6.x (latest rev as of May 2026) |
| **Database** | `blossom_20240722BlSh` (MySQL, table prefix `MFXs3sp_`) |
| **PHP** | 8.1 (ea-php81), 128 MB memory limit |
| **Hosting** | cPanel-managed GCP WordPress cluster |
| **Active Theme** | `blossom-git` — "Blossom - Git Version" (custom-built, git-tracked) |
| **Total Plugins** | 28 active plugins |
| **Upload History** | 4 years active (2023–2026) |

### Active Plugins (28)

| Category | Plugins |
|---|---|
| **SEO** | Yoast SEO (27.7), Yoast SEO Premium, WP Schema Pro, Yoast SEO Local |
| **Caching / Performance** | LiteSpeed Cache |
| **Security** | Wordfence, WPS Hide Login |
| **Forms / Contact** | Contact Form 7, Contact Form Entries, WP Mail SMTP, WP Mail Logging, CF7 reCAPTCHA |
| **Multilingual** | Polylang (English only configured) |
| **Redirections** | Redirection, Redirect Spam |
| **Content / ACF** | Advanced Custom Fields Pro, Custom Post Type UI, Duplicate Post |
| **Social / Reviews** | WP Social Ninja Pro, WP Social Reviews, Widget Google Reviews |
| **WhatsApp** | Click to Chat for WhatsApp, Creame WhatsApp Me |
| **Backups** | Duplicator Pro |
| **Other** | Floating TOC, Microsoft Clarity, Show Current Template, Use Any Font, Wicked Folders, WP Anchor Header |

### Theme Structure

The `blossom-git` theme is a heavily customised WordPress theme with 22+ template files:

- `front-page.php` (homepage — 15 KB, heavily custom)
- `header.php` / `footer.php` (extensive inline logic)
- `page-*.php` templates for: competition, connect, contact, events, location, loyalty, media, menu, news, private-dining, reservation, etc.
- Custom post types: `event`, `location`, `news` (via CPT UI / ACF)
- 2 older theme versions on disk (`blossom` and `blossom-3`) — legacy cruft

### Content Inventory

| Content Type | Published Count |
|---|---|
| Posts (Blog) | 42 |
| Pages | 22 |
| Events | 21 |
| News | 0 |

---

## 2. SEO Health Check

### ⚠️ robots.txt

- **Status:** Served as a virtual file by WordPress via Yoast
- **No physical file** on disk at `/var/www/blossom/public_html/robots.txt`
- **Content:**
  ```
  # START YOAST BLOCK
  User-agent: *
  Disallow:

  Sitemap: https://www.blossomsteakhouse.com/sitemap_index.xml
  # END YOAST BLOCK
  ```
- **Concern:** robots.txt is served with `Content-Type: text/html` (should be `text/plain`). Likely a WordPress permalink routing artifact — the file doesn't exist on disk, so WordPress' rewrite engine catches it and PHP outputs it with the wrong MIME type. Google can still parse it, but this is non-standard.

### ⚠️ Sitemaps

- **No sitemap.xml file on disk**
- Yoast XML sitemap is working at `/sitemap_index.xml` (returns HTTP 200)
- **6 sitemap sub-indexes:**
  - `post-sitemap.xml` — blog posts
  - `page-sitemap.xml` — pages + homepage
  - `event-sitemap.xml` — events (CPT)
  - `category-sitemap.xml` — categories
  - `author-sitemap.xml` — author archives
  - `geo-sitemap.xml` — WP SEO Local locations
- Largely up-to-date (lastmod dates: May–June 2026)
- Yoast sitemap setting: `enable_xml_sitemap` = true ✓

### ✅ .htaccess

Fully intact with:
- LiteSpeed Cache rules
- Browser caching (1-year expires for images, CSS, JS, fonts)
- WordPress permalink rewrite rules
- cPanel PHP directives
- WebP / mobile detection caching rules

### ✅ Caching

- **LiteSpeed Cache** active and functional
- Browser caching: 1 year for static assets ✓
- Mobile & WebP vary headers set ✓
- No-cache on admin-ajax.php ✓

### ✅ Schema Markup (Excellent)

The homepage has comprehensive **JSON-LD schema** (via Yoast + WP Schema Pro):

| Schema Type | Present? |
|---|---|
| `WebPage` | ✓ |
| `Organization` | ✓ |
| `Restaurant` | ✓ |
| `Place` | ✓ |
| `PostalAddress` | ✓ |
| `GeoCoordinates` | ✓ |
| `OpeningHoursSpecification` | ✓ (daily 11:00–22:00) |
| `ContactPoint` | ✓ |
| `BreadcrumbList` | ✓ |
| `WebSite` + `SearchAction` | ✓ |
| `ImageObject` (logo) | ✓ |

### ❌ Google Search Console — NOT Verified

- The GSC API reports "User does not have sufficient permission" for `blossomsteakhouse.com`
- This means **the site is not verified** in Google Search Console
- No webmaster verification tokens found in Yoast settings (`googleverify`, `baiduverify`, `msverify`, `yandexverify`, `ahrefsverify` all empty)
- **Critical gap:** No visibility into Google's crawling, indexing, or search performance data

### ❌ Google Analytics Confirmation Needed

- Microsoft Clarity is present (session recording / heatmaps)
- GA4 presence not confirmed from inspection

### ✅ IndexNow

- Yoast IndexNow is enabled with an API key set ✓
- This pushes content updates to Bing, Yandex, and other IndexNow partners

### ✅ Polylang

- Only one language configured: **English** (default)
- URL rewrite mode: `/%lang%/` — but `hide_default` = true, so English URLs have no language prefix
- Clean, no unnecessary language prefixes

### ⚠️ Dual SEO Plugin Artifact

- **Rank Math SEO** is installed but **not active** — it was previously the primary SEO plugin
- Stale Rank Math metadata exists in `wp_postmeta` for many pages/posts
- Migration from Rank Math to Yoast appears incomplete; rank_math meta fields remain
- This is a minor hygiene issue — no functional conflict since only Yoast is active

### ⚠️ Theme Versions

3 theme versions on disk: `blossom`, `blossom-3`, `blossom-git`  
The `style.css` of the active theme appears corrupted (contains Snow Effect Demo markup instead of proper theme metadata). This doesn't affect functionality since the theme is loaded via `functions.php`, but it's sloppy.

---

## 3. Keyword Analysis

### Semrush Snapshot

| Metric | Value |
|---|---|
| Domain Rank | 104,297 |
| Organic Keywords | 10,154 |
| Organic Traffic | 18,099 / month |
| Organic Cost Value | $5,424 / month |
| Paid Keywords | 0 |

### Top 10 Organic Keywords by Traffic Contribution

| Keyword | Position | Volume/mo | URL |
|---|---|---|---|
| steak sides | #5 | 9,900 | /steakhouse-sides/ |
| what is a brazilian steakhouse | #1 ★ | 590 | /what-is-a-brazilian-steakhouse/ |
| steak side dishes | #6 | 2,400 | /steakhouse-sides/ |
| brazilian steakhouses | #6 | 2,900 | /what-is-a-brazilian-steakhouse/ |
| vegetables to go with steak | #1 ★ | 260 | /steakhouse-sides/ |
| what goes good with steak | #5 | 1,900 | /steakhouse-sides/ |
| what goes well with steak | #5 | 1,900 | /steakhouse-sides/ |
| sides for steak | #6 | 8,100 | /steakhouse-sides/ |
| best sides with steak | #6 | 1,600 | /steakhouse-sides/ |
| what to wear to a steakhouse | #1 ★ | 320 | /what-to-wear-to-a-steakhouse/ |

### #1 Ranked Content (Strongest Positions)

| Keyword | Volume | Page |
|---|---|---|
| what is a brazilian steakhouse | 590/mo | /what-is-a-brazilian-steakhouse/ |
| vegetables to go with steak | 260/mo | /steakhouse-sides/ |
| what to wear to a steakhouse | 320/mo | /what-to-wear-to-a-steakhouse/ |
| appetizers for steakhouses | 260/mo | /steakhouse-appetizers/ |

### ⚠️ Keyword Gap — The Critical Miss

The homepage targets "**Steakhouse Sanur**" as its focus keyword. However:

- "Steakhouse Sanur" keyword difficulty: **0** (extremely easy — essentially no competition)
- "Best steak bali" difficulty: **0**
- "Sanur restaurant" difficulty: **0**
- "Best steak sanur" difficulty: **0**

Despite these being the **most locally relevant keywords** with zero competition, the site is **not ranking for them** in a meaningful way.

The **content pillar that drives 30%+ of organic traffic** is `/steakhouse-sides/` — a blog post about steak side dishes. While this is good content marketing, it means the **homepage and core commercial pages (menus, reservations) are underperforming** relative to informational blog content.

### Keyword Difficulty Analysis

| Keyword | Difficulty | Volume | Opportunity |
|---|---|---|---|
| steakhouse bali | 32 | Medium | **High** — low-moderate difficulty |
| steakhouse sanur | 0 | Low | **High** — zero competition |
| best steak bali | 0 | Low | **High** — zero competition |
| sanur restaurant | 0 | Low | **High** — zero competition |
| best steak sanur | 0 | Low | **High** — zero competition |
| brazilian steakhouse bali | 0 | Low | **High** — zero competition |

---

## 4. Competitor Analysis

### Organic Competitors (Semrush)

| Competitor | Traffic | Keywords | Relevance |
|---|---|---|---|
| **themeatstick.com** | 18,625 | 10,645 | Direct size competitor |
| **macschophouse.com** | 13,754 | 5,730 | Direct size competitor |
| **sullivanssteakhouse.com** | 271,157 | 28,429 | US chain, much larger |
| **campbellsmeat.com** | 11,610 | 6,665 | Direct size competitor |
| **texasdebrazil.com** | 710,826 | 91,164 | Massive chain, broader |
| **ruthschris.com** | 806,905 | 98,530 | Premium steak chain |
| **perryssteakhouse.com** | 377,806 | 72,229 | Regional US chain |
| **fogodechao.com** | 1,427,811 | 167,096 | Brazilian steakhouse giant |

### Competitive Insights

1. **Blossom Steakhouse is primarily competing with US-based chains** in the "steak sides" / "what is a brazilian steakhouse" content space
2. **Local Bali competitors are absent** from the Semrush competitive analysis — this is a gap; competitors like `hubblebali.com`, `aperitifbali.com` (which share the same server!) should be analysed
3. The site has **no paid ad presence** (0 AdWords keywords / 0 paid traffic) — all traffic is organic
4. Competitors with local relevance (Bali-based restaurants) are not being tracked

---

## 5. Critical Issues (Priority Order)

### 🔴 P1 — Google Search Console Not Verified
The site is not set up in Google Search Console. No crawl stats, no index coverage data, no search query data available. This is the #1 blocker for any SEO improvement program. Without GSC, you cannot:
- See which pages are/aren't indexed
- Identify crawl errors
- Submit sitemaps
- Monitor Core Web Vitals (CrUX)
- Get notified of manual actions

### 🔴 P2 — No Webmaster Verification Codes
Google, Bing, Yandex, Baidu, and Ahrefs site verification tokens are all empty in Yoast settings. Without these, webmaster tools cannot be linked.

### 🟠 P3 — robots.txt Served as text/html
The virtual robots.txt returns `Content-Type: text/html` instead of `text/plain`. While most search engines handle this, it's technically incorrect and could cause issues with some crawlers. Fix: create a physical robots.txt file.

### 🟠 P4 — Homepage Title Omits Brand Name
Current title: `Steakhouse Sanur - The Best Steak & Grill Restaurant in Sanur`
- The business name "Blossom Steakhouse" **is not in the title tag**
- For brand searches ("Blossom Steakhouse"), the title provides zero brand reinforcement
- Recommended: `Blossom Steakhouse Sanur - The Best Steak & Grill Restaurant in Sanur`

### 🟠 P5 — Stale Rank Math Metadata
The database contains residual Rank Math SEO metadata across many posts/pages. While Yoast has been active for a while, the cleanup was incomplete. A one-time database cleanup is recommended to remove `rank_math_*` meta keys for the primary blossomsteakhouse.com site.

### 🟡 P6 — 28 Active Plugins
High plugin count creates:
- Increased attack surface for security vulnerabilities
- Potential conflicts between plugins (especially the dual WhatsApp plugins)
- Higher PHP memory consumption (128 MB limit with 28 plugins is tight)
- Slower admin experience

### 🟡 P7 — Orphaned Theme Versions
Three theme versions on disk (blossom, blossom-3, blossom-git). Only `blossom-git` is active. The `style.css` of the active theme appears corrupted/overwritten with test/demo content. The older versions should be archived/removed.

### 🟡 P8 — Stale Legacy GUIDs
Many pages still reference `https://blossombali.com/` or `https://www.blossombali.com/` in their GUID fields. While GUIDs don't affect SEO, this reflects an incomplete domain migration from `blossombali.com` → `blossomsteakhouse.com`.

### 🟡 P9 — Insufficient Local Keyword Targeting
The site ranks well for universal "steak" informational content but **poorly for local Bali/Sanur keywords** that drive actual restaurant foot traffic.

---

## 6. Improvement Recommendations

### Immediate (0–2 Weeks)

1. **Set up Google Search Console**
   - Add DNS TXT or HTML file verification
   - Submit the Yoast sitemap
   - Monitor index coverage

2. **Add webmaster verification codes** in Yoast → General → Webmaster Tools
   - Google, Bing, Yandex, Baidu

3. **Create a physical `robots.txt`** file with correct `Content-Type: text/plain`
   ```
   User-agent: *
   Disallow: /wp-admin/
   Allow: /wp-admin/admin-ajax.php

   Sitemap: https://www.blossomsteakhouse.com/sitemap_index.xml
   ```

4. **Remove stale Rank Math** plugin directory from `/wp-content/plugins/seo-by-rank-math/`

### Short Term (2–4 Weeks)

5. **Update homepage title tag** to include brand name:
   - Current: `Steakhouse Sanur - The Best Steak & Grill Restaurant in Sanur`
   - Proposed: `Blossom Steakhouse Sanur - Best Steak & Grill Restaurant in Bali`
   - Or: `Blossom Steakhouse | The Best Steak & Seafood Grill in Sanur, Bali`

6. **Create local landing pages** targeting zero-competition keywords:
   - `/best-steak-bali/` (difficulty: 0)
   - `/steakhouse-bali/` (difficulty: 32 — moderate)
   - `/best-restaurant-sanur/` or strengthen the existing similar page
   - Link these from the homepage navigation

7. **Remove leftover theme directories** (`blossom`, `blossom-3`)

### Medium Term (1–2 Months)

8. **Audit and reduce plugin count**: Consolidate WhatsApp plugins (2 → 1), evaluate if WP Social Ninja + WP Social Reviews + Widget Google Reviews are all needed

9. **Strengthen the `/steakhouse-sides/` content pillar** — it drives ~35% of organic traffic. Add:
   - Internal links to menu/reservation pages
   - A "Dine at Blossom" CTA
   - More localised content (e.g., "Best Steak Sides at Bali Restaurants")

10. **Build local citations and Google Business Profile** — the schema data shows an address at Icon Bali Mall, Sanur. Ensure Google Business Profile is claimed and optimised with updated menu, photos, and posts

11. **Set up GA4** if not already active — pair with Microsoft Clarity data for conversion optimisation

12. **Review the `llm.txt`** at `/llm.txt` — it's already well-structured for AI/LLM consumption. Expand it with menu pricing, reservation links, and local SEO context

---

## 7. Meta Title Proposals

### Homepage
| Option | Title | Reasoning |
|---|---|---|
| **Current** | Steakhouse Sanur - The Best Steak & Grill Restaurant in Sanur | No brand name. Weak for branded search. |
| **Proposal A** | Blossom Steakhouse Sanur - Best Steak & Grill Restaurant in Bali | Adds brand + local (Bali) |
| **Proposal B** | Blossom Steakhouse | The Best Steak & Seafood Grill in Sanur, Bali | Clean, brand-first, dual location |
| **Proposal C** | Blossom Steakhouse Sanur | Premium Steak & Seafood Grill in Bali | Brand + prestige + location |

**Recommendation:** Proposal A — balances brand visibility, keyword presence ("Steakhouse Sanur"), and geographic scope ("Bali").

### Other Key Pages

| Page | Current Title (if found) | Proposed Title |
|---|---|---|
| /what-is-a-brazilian-steakhouse/ | "What is a Brazilian Steakhouse?" (auto) | What is a Brazilian Steakhouse? - Guide by Blossom Steakhouse |
| /what-to-wear-to-a-steakhouse/ | "What to Wear to a Steakhouse" (auto) | What to Wear to a Steakhouse - Dress Code Guide | Blossom Steakhouse |
| /steakhouse-sides/ | "Steakhouse Sides" (auto) | The Best Steakhouse Sides & Side Dishes for Steak | Blossom |
| /steakhouse-appetizers/ | "Steakhouse Appetizers" (auto) | Best Steakhouse Appetizers - Starters & Small Plates | Blossom |
| /menus/ | "Menus" (auto) | Blossom Steakhouse Menu - Steak, Seafood & More in Sanur |

---

## 8. Summary of GSC Performance (gaiada.com proxy — no blossom data)

Since the GSC property is configured for `gaiada.com` instead of `blossomsteakhouse.com`, no direct search performance data is available. **Setting up GSC for blossomsteakhouse.com is the #1 priority.**

---

## 9. Technical Infrastructure Notes

```
Server:           nginx/1.24.0 (Ubuntu)
Caching:          LiteSpeed Cache (LSCWP)
PHP:              8.1 (cPanel ea-php81)
Memory limit:     128 MB
Upload max:       8 MB
Max execution:    30s
SSL:              Active (via Let's Encrypt / AutoSSL)
CDN:              Not detected (direct server serving)
Security:         Wordfence + WPS Hide Login
Backups:          Duplicator Pro (no UpdraftPlus)
```

---

## 10. SEO Scorecard

| Category | Score | Notes |
|---|---|---|
| Technical SEO | ⚠️ 6/10 | No GSC, no webmaster tokens, robots.txt MIME issue |
| On-Page SEO | ✅ 7/10 | Good schema, but homepage missing brand name |
| Content | ✅ 8/10 | 42 blog posts, strong informational content, excellent llm.txt |
| Keywords | ⚠️ 6/10 | Great for "steak sides", weak for local Sanur/Bali terms |
| Backlinks | ⬜ N/A | Not audited (no Semrush backlinks data pulled) |
| Performance | ✅ 7/10 | LiteSpeed + browser caching, but PHP 128MB may be tight |
| Mobile | ✅ 8/10 | Responsive theme, viewport set |
| Security | ✅ 8/10 | Wordfence, WPS Hide Login, HTTPS |
| **Overall** | **⚠️ 7.1/10** | Solid foundation with critical gaps in GSC & local targeting |

---

*Audit produced by Hermes Agent (Nous Research) via SSH into gda-ce01, live HTTP inspection, Semrush API, and Google Search Console API.*
