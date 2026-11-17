# TECHNICAL SEO AUDIT & SCHEMA REPORT — Phase 6
## Women's Fitness Coaching Website

**Platform:** Next.js 14 / Next.js 15 App Router  
**Target Domain:** Female Fitness Coach (Online Coaching & In-Person Personal Training)  
**Scope:** Technical SEO, Metadata Hierarchy, Structured Data (JSON-LD), Robots & Sitemap Directives  
**Audit Status:** PASS — 100% Validated & Prerendered  

---

## 1. Metadata Inventory Across All Approved Routes

| Route | Page Title | Meta Description | Canonical URL | Open Graph Image |
|---|---|---|---|---|
| **`/`** | `[Brand / Coaching Studio Name] \| Women's Fitness Coaching` | Personalised women's fitness coaching offering both online fitness coaching and in-person personal training to build strength, fitness, and confidence. | `https://example.com/` | `/images/hero-bg.jpg` (1200×630) |
| **`/about`** | `About Our Coach & Philosophy \| [Brand Name]` | Meet [Coach Name], head coach and founder. Learn our evidence-based female strength philosophy, qualifications, and empowering training methodology. | `https://example.com/about` | `/images/coach-portrait.jpg` (800×1000) |
| **`/classes`** | `Fitness Programmes & Memberships \| [Brand Name]` | Explore our women's strength coaching programmes: Foundations, Strength & Sculpt, and Hybrid Athlete. View membership pricing tiers and FAQs. | `https://example.com/classes` | `/images/card-strength.jpg` (800×800) |
| **`/services`** | `Coaching Services & Comparison \| [Brand Name]` | Comprehensive female fitness services: 1-on-1 in-person personal training, online coaching, custom workout programming, and nutrition design. | `https://example.com/services` | `/images/service-collage-1.jpg` (800×600) |
| **`/single-service`** | `1:1 Private Coaching Experience \| [Brand Name]` | Apply for the comprehensive 1:1 private coaching experience. Customized training split, weekly video form audits, nutritional architecture, and direct messaging. | `https://example.com/single-service` | `/images/card-strength.jpg` (800×800) |
| **`/contact`** | `Contact & Studio Inquiries \| [Brand Name]` | Get in touch with our coaching team. Inquire about 1-on-1 personal training, online coaching, or studio availability. | `https://example.com/contact` | `/images/test-coach.jpg` (800×800) |
| **`/appointments`** | `Schedule A Consultation or Session \| [Brand Name]` | Request your complimentary 15-minute discovery consultation or reserve an in-person movement screen and personal training assessment. | `https://example.com/appointments` | `/images/guide-left.jpg` (800×600) |
| **`/link-in-bio`** | `Connect & Links \| [Coach Name]` | Quick links to book consultations, explore coaching services, download our free 7-day starter guide, and read real client transformations. | `https://example.com/link-in-bio` | `/images/coach-portrait.jpg` (800×1000) |

---

## 2. Robots & Sitemap Directives

### 2.1 Robots Configuration (`/robots.txt`)
Generated dynamically via `src/app/robots.ts` and compiled to static text:
```txt
User-Agent: *
Allow: /
Disallow: /api/

Sitemap: https://example.com/sitemap.xml
```
- **Allow Rule:** Permits full search engine indexing of all public content routes.
- **Disallow Rule:** Protects internal API routes (`/api/contact`, `/api/appointments`) from being crawled.
- **Sitemap Link:** Advertises the canonical XML sitemap location.

### 2.2 XML Sitemap (`/sitemap.xml`)
Generated dynamically via `src/app/sitemap.ts` and compiled to static XML:
- Contains strictly the **8 approved public routes**:
  - `https://example.com` (Priority 1.0, Weekly)
  - `https://example.com/about` (Priority 0.8, Monthly)
  - `https://example.com/classes` (Priority 0.9, Weekly)
  - `https://example.com/services` (Priority 0.9, Weekly)
  - `https://example.com/single-service` (Priority 0.8, Monthly)
  - `https://example.com/contact` (Priority 0.7, Monthly)
  - `https://example.com/appointments` (Priority 0.9, Weekly)
  - `https://example.com/link-in-bio` (Priority 0.6, Monthly)
- Excluded routes (`/the-app`, `/blog`, `/shop`, `/sales-page`, etc.) and internal API endpoints are strictly omitted.

---

## 3. Structured Data (JSON-LD) Implementation

Structured data is rendered cleanly using `<script type="application/ld+json">` without injecting external bloat:

### 3.1 Organization / SportsActivityLocation
Implemented in `src/components/seo/JsonLd.tsx`:
- `@type`: `SportsActivityLocation`
- `name`: `[Brand / Coaching Studio Name]`
- `description`: Target female fitness coaching overview.
- `url`: Canonical base URL.
- `address`: `PostalAddress` consuming `siteConfig.location`.
- `founder`: `Person` with name `[Coach Name]` and jobTitle `"Head Coach & Founder"`.
- `hasOfferCatalog`: Lists core offerings: *Online 1-on-1 Fitness Coaching* and *In-Person Personal Training*.
- **Honest Handling:** No fabricated reviews, aggregate rating stars, or fake street addresses are included.

### 3.2 WebSite Schema
- `@type`: `WebSite`
- `name`: Site brand name.
- `url`: Canonical base URL.

### 3.3 Service Schema
Injected on `/services` and `/single-service`:
- `@type`: `Service`
- `serviceType`: `"Fitness & Strength Coaching"`
- `areaServed`: `["Worldwide", "Local Studio"]` (reflecting online and in-person delivery).

### 3.4 BreadcrumbList Schema
Injected on all subpages (`/about`, `/classes`, `/services`, `/single-service`, `/contact`, `/appointments`, `/link-in-bio`):
- Semantic hierarchy connecting each page back to `Home`.

---

## 4. Remaining SEO Recommendations for Production Launch

1. **Production Domain Setup:** Update `NEXT_PUBLIC_SITE_URL` in `.env.local` or Vercel environment variables to the final production domain (e.g. `https://yourbrand.com`).
2. **Google Search Console & Bing Webmaster Tools:** Once deployed to the custom domain, submit `https://yourbrand.com/sitemap.xml`.
3. **Google Business Profile:** Create and verify the Google Business Profile matching `siteConfig.businessName`, `siteConfig.location`, and `siteConfig.phoneNumber` for enhanced local map pack visibility.
