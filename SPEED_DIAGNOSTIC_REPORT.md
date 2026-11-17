# Website Speed Investigation — Root Cause Performance Audit Report

> **Investigation Date:** November 16, 2026  
> **Auditor:** Senior Next.js Performance Engineering Specialist  
> **Status:** Completed Diagnostic Audit (No application code modified)

---

## 1. Executive Summary

A comprehensive, multi-layer performance audit of the fitness coaching web application was conducted to diagnose reported sluggishness across public routing, page load times, image downloads, and administrative navigation. 

Our investigation tested every tier of the stack: **Next.js 15 App Router compilation and build traces**, **Node.js production runtime response times**, **Cloudinary CDN delivery and payload sizes**, **Supabase REST and Authentication network latency**, **client-side JavaScript bundle compositions**, **CSS and Google Fonts overhead**, and **GSAP/Lenis scroll and animation lifecycles**.

### Primary Bottleneck Discovered:
The single greatest cause of perceived sluggishness is **massive, un-transformed 3.8 MB to 5.5 MB Cloudinary PNG images (totaling ~9.5 MB on the Homepage alone)** combined with **an extreme 9,000 ms to 13,000 ms network latency round-trip to the remote Supabase database instance**, which causes SSR data fetches to block until timing out.

When running as an optimized production build (`next build` + `next start`) with cached ISR HTML, local server TTFB is ultra-fast (**4 ms – 13 ms**). However, whenever SSR rendering occurs (development server, admin routes, on-demand revalidation, or cold builds), the 11-second Supabase latency stalls requests, and the raw 9.5 MB image payload severely saturates user network bandwidth.

---

## 2. Testing Environment & Audit Conditions

| Parameter | Value / Specification |
|---|---|
| **Operating System** | Windows 11 Pro (x64) |
| **Node.js Runtime** | v22.14.0 |
| **Next.js Version** | 15.5.29 (Turbopack in Dev, Webpack in Production Build) |
| **React Framework** | React 19.1.0 / React-DOM 19.1.0 |
| **Styling Engine** | Tailwind CSS v4.0.0 with `@tailwindcss/postcss` |
| **Animation Engines** | GSAP 3.15.1 + Lenis 1.3.27 smooth scrolling |
| **Database & Auth** | Supabase (`@supabase/ssr` 0.12.7, `@supabase/supabase-js` 2.119.0) |
| **Image CDN** | Cloudinary (`cloudinary` 2.11.0, cloud name: `duk94ehtq`) |
| **Test Servers** | 1. Development Server (`next dev --turbopack`)<br>2. Local Production Server (`next build` + `next start -p 3005`) |
| **Remote Deployment Limitation** | `NEXT_PUBLIC_SITE_URL` in `.env.local` is set to `https://example.com`. No live Vercel or cloud deployment URL is configured. All production benchmarks were measured on the local production server build. |

---

## 3. Pages Tested & Route Status

| Route Path | Route Type | Prerender Status | JS First Load | Revalidation | Note |
|---|---|---|---|---|---|
| `/` | Marketing Homepage | Prerendered Static (○) | **161 kB** | 1 hour (3600s) | Heaviest JS bundle due to GSAP ScrollTrigger |
| `/about` | Coach Story & Mission | Prerendered Static (○) | **114 kB** | 1 hour (3600s) | Client components: SiteLayout, SmoothScroll, Carousel |
| `/classes` | Programmes & FAQs | Prerendered Static (○) | **113 kB** | 1 hour (3600s) | Client components: FaqAccordion, FolderCards |
| `/services` | Service Comparison | Prerendered Static (○) | **112 kB** | 1 hour (3600s) | Prerendered static |
| `/contact` | Studio Inquiries & Form | Prerendered Static (○) | **116 kB** | 1 hour (3600s) | Client component: ContactForm |
| `/appointments` | Booking Consultation | Prerendered Static (○) | **117 kB** | 1 hour (3600s) | Client component: AppointmentRequestForm |
| `/single-service` | 1:1 Coaching CMS Page | Prerendered Static (○) | **112 kB** | 1 hour (3600s) | Prerendered static |
| `/link-in-bio` | Social Link Tree | **404 Not Found** | N/A | N/A | **Does not exist** in `src/app/` (tested per prompt) |
| `/admin/login` | Admin Authentication | Prerendered Static (○) | **106 kB** | None | Public login gateway |
| `/admin/*` | Admin Dashboard CMS | Dynamic Server (ƒ) | **107–125 kB** | On-Demand | Protected by Supabase session middleware |

---

## 4. Before-Optimization Performance Measurements

### 4.1. Local Production Server Benchmarks (`next start`)

Measured using direct HTTP round-trip requests against the compiled production server:

| Route | Cold TTFB | Warm TTFB | Total Transferred HTML | DOM Elements | Scripts | Images |
|---|---|---|---|---|---|---|
| **`/` (Homepage)** | **13 ms** | **11 ms** | 111.4 KB | 383 | 40 | 19 |
| **`/about`** | **73 ms** | **9 ms** | 93.8 KB | 325 | 39 | 9 |
| **`/classes`** | **51 ms** | **8 ms** | 139.5 KB | 495 | 52 | 15 |
| **`/services`** | **54 ms** | **13 ms** | 112.1 KB | 421 | 50 | 5 |
| **`/contact`** | **45 ms** | **5 ms** | 50.3 KB | 215 | 32 | 5 |
| **`/single-service`** | **40 ms** | **6 ms** | 136.7 KB | 529 | 60 | 8 |
| **`/appointments`** | **40 ms** | **4 ms** | 62.1 KB | 286 | 30 | 6 |

> **Finding:** When static ISR pages are already built and cached, Next.js serves the initial HTML instantly (<15 ms TTFB). Therefore, the perceived slowdown experienced by users is **NOT** slow HTML document delivery on cached routes. The slowdown originates downstream in **external database round-trips during SSR/admin navigation**, **giant unoptimized remote media assets**, and **client-side script initialization**.

---

## 5. Image Performance Analysis (Critical Bottleneck)

### 5.1. The 9.5 MB Homepage Image Payload

We inspected all 19 image sources on the Homepage. Two remote images served via Cloudinary account `duk94ehtq` were examined:

| Image Asset | Source Component | URL on Cloudinary CDN | Raw Stored Format | Raw Download Size | Optimized Size with `f_auto,q_auto` | Bandwidth Wasted |
|---|---|---|---|---|---|---|
| **Hero Background Image** | `HeroSection.tsx:56` | `.../upload/v1794710487/fitness-cms/zgk0gjpoc1lfrgndhnxd.png` | PNG | **3,884 KB (3.79 MB)** | **82 KB** (WebP/JPEG) | **98%** (3.80 MB) |
| **Coach Bio Portrait** | `CoachBioSection.tsx:75` | `.../upload/v1794710548/fitness-cms/ccy1zc4boyqzgnizomxg.png` | PNG | **5,585 KB (5.45 MB)** | **43 KB** (WebP/JPEG) | **99%** (5.54 MB) |
| **TOTAL** | — | — | — | **9,469 KB (9.24 MB)** | **125 KB** | **98.7% (~9.34 MB)** |

### 5.2. Evidence & Root Cause in Code
1. In `src/lib/cloudinary.ts:49`, an optimization utility function `getOptimizedImageUrl()` exists:
   ```ts
   export function getOptimizedImageUrl(publicIdOrUrl: string, options?: {...})
   ```
   **However, our codebase audit revealed that `getOptimizedImageUrl` is called 0 times across the entire `src/` directory.**
2. When the admin uploads images via the CMS or when Supabase returns `page_sections.image_url`, it returns the raw un-transformed Cloudinary URL (`https://res.cloudinary.com/duk94ehtq/image/upload/v.../zgk0gjpoc1lfrgndhnxd.png`).
3. In `HeroSection.tsx` and `CoachBioSection.tsx`, the raw URL is passed directly into Next.js `<Image src={imageSrc} fill priority sizes="100vw" />`.
4. Because the URL lacks Cloudinary's dynamic transform flags (`f_auto,q_auto,w_1600`), any direct download or fallback fallback serves 3.8 MB to 5.5 MB PNGs.
5. In Next.js Image optimization (`/_next/image`), the Node.js server must download the 3.8 MB and 5.5 MB PNGs into server memory and transform them on the fly. Because `sharp` is **not installed** in `package.json`, Next.js falls back to JavaScript/WASM image processing, creating noticeable CPU lag on the server during image generation.

---

## 6. Supabase Network & Database Performance Analysis (Critical Bottleneck)

### 6.1. Empirical Supabase REST API Latency Measurements

We tested repeated direct REST queries (`GET /rest/v1/site_settings?select=id,business_name&limit=1`) to the configured Supabase instance (`bnjettmxwvtdvdnmnazd.supabase.co`):

| Test Iteration | Query Executed | Measured Latency | Result |
|---|---|---|---|
| **TCP Connect Handshake** | Raw socket to `bnjettmxwvtdvdnmnazd.supabase.co:443` | **1,759 ms** | Handshake alone takes 1.76s |
| **Run 1 (Cold Query)** | `site_settings` single-row fetch | **12,863 ms (12.86s)** | Success (200 OK) |
| **Run 2 (Warm Query)** | `site_settings` single-row fetch | **9,291 ms (9.29s)** | Success (200 OK) |
| **Run 3 (Warm Query)** | `site_settings` single-row fetch | **10,900 ms (10.90s)** | Success (200 OK) |
| **Average Round-Trip** | — | **~11,000 ms (11.0s)** | **Severe latency** |

### 6.2. The 3.5s Timeout Cliff in Server Components
In `src/lib/supabase/server.ts:25`, the following timeout was previously introduced:
```ts
fetch: (url, options = {}) => {
  return fetch(url, {
    ...options,
    signal: options?.signal || AbortSignal.timeout(3500),
  });
}
```
**Impact:**
- Because the physical round-trip to this Supabase database takes between **9,291 ms and 12,863 ms**, **EVERY SINGLE HTTP FETCH TO SUPABASE IN SERVER COMPONENTS TIMEOUTS AT 3,500 MS**.
- When `HomePage`, `AboutPage`, or `ClassesPage` renders dynamically on the server (e.g. during dev mode or ISR revalidation), the server waits the full 3,500 ms, throws an `AbortError`, catches the error in `try/catch`, and falls back to hardcoded `FALLBACK_` constants.
- **Result:** Every un-cached server-side page render experiences a mandatory **3.5 second delay** before rendering HTML.

### 6.3. The 10–13 Second Blocker on `/admin` Routes
In `src/lib/supabase/middleware.ts:55`:
```ts
const { data: { user } } = await supabase.auth.getUser();
```
`middleware.ts` runs `supabase.auth.getUser()` on all `/admin/*` routes. Crucially, `createServerClient` in middleware **does NOT have a 3,500 ms timeout**. 
- Whenever an administrator clicks on an admin route (`/admin`, `/admin/appointments`, `/admin/classes`, etc.), the browser halts for **9 to 13 seconds** waiting for Supabase Auth over the network before the response starts streaming.

---

## 7. JavaScript, React & Animation Analysis

### 7.1. Bundle Size Breakdown (`next build` output)

| Bundle Component | Size (Raw JS) | Size (Gzip / First Load) | Status |
|---|---|---|---|
| **Shared Base (React 19, Next.js runtime)** | 344 kB | 103 kB | Standard Next.js foundation |
| **Framework Chunk (`framework-*.js`)** | 213.9 kB | ~65 kB | React 19 core |
| **GSAP Animation Library (`2910-*.js` + `c15bf2b0-*.js`)** | **114 kB** | **~38 kB** | Loaded on pages using GSAP |
| **Lenis Smooth Scroll (`8182-*.js`)** | **20 kB** | **~7 kB** | Loaded on **EVERY** page |
| **Tailwind CSS Chunk (`65084808ff884dd4.css`)** | **74.9 kB** | **~14 kB** | Loaded globally |
| **Unused `framer-motion` in `package.json`** | ~120 kB | 0 kB in bundle | Present in dependencies, imported 0 times |

### 7.2. Global Animation & Scroll Listeners in Root Layout
1. **`SmoothScroll.tsx` loaded on every page:**
   `SiteLayout.tsx` unconditionally renders `<SmoothScroll />` for all public pages.
   Inside `SmoothScroll.tsx`:
   - `lenis.on("scroll", ScrollTrigger.update);`
   - `gsap.ticker.add(tickerUpdate);`
   - `gsap.ticker.lagSmoothing(0);`
   - Lenis intercepts and normalizes all mousewheel and touch scroll events globally (`touchMultiplier: 1.5`).
2. **`Header.tsx` scroll listener:**
   `Header.tsx` adds a separate window `scroll` event listener with `requestAnimationFrame` ticking to toggle `isScrolled` at `window.scrollY > 80`.
3. **Double Scroll & RAF Loop Conflict:**
   Running Lenis wheel/touch normalization, GSAP Ticker, ScrollTrigger updates, and React state scroll toggling simultaneously causes main-thread frame drops, especially on mobile devices and 60Hz displays where `lagSmoothing(0)` prevents GSAP from compensating for rendering jitter.

### 7.3. Unnecessary `"use client"` in `SiteLayout.tsx`
`SiteLayout.tsx` is marked `"use client"` solely to read `usePathname()` and check `pathname.startsWith("/admin")`. 
Because `SiteLayout` is a Client Component, it forces child layout wrappers to hydrate on the client. Using Next.js Route Groups `(marketing)` and `(admin)` with dedicated layouts would make the public layout a 100% Server Component, reducing client hydration work.

---

## 8. CSS and Web Fonts Analysis

### 8.1. Font Loading Overhead
In `src/app/layout.tsx:14-40`, 4 separate Google Fonts are loaded:
1. `Lilita_One` (weight 400) -> `001f750b538f7a9e-s.woff2` (30.7 KB)
2. `Sometype_Mono` (weights 400, 700) -> `970d71e7dcbc144d-s.woff2` (35.4 KB)
3. `Roboto` (weights 400, 500, 700) -> `1e41be92c43b3255-s.p.woff2` (36.6 KB)
4. `La_Belle_Aurore` (weight 400) -> Woff2 font
- **Total Web Font Weight:** **~130 KB** of WOFF2 font files.
- **Font display:** All fonts use `display: "swap"`, preventing FOIT (Flash of Invisible Text), but causing minor FOUT (Flash of Unstyled Text) during initial render before the 130 KB of font files finish loading.
- **Build-time dependency:** If internet access is interrupted or restricted during build, `next build` fails with `getaddrinfo ENOTFOUND fonts.googleapis.com` because Next.js font optimization downloads font binaries at build time.

---

## 9. Ranked Root Causes of Sluggish Performance

| Rank | Root Cause | Measured Evidence | Impact | Priority | Responsible Files |
|:---:|---|---|:---:|:---:|---|
| **1** | **Massive Un-Transformed Cloudinary PNGs** | **9.24 MB** across 2 homepage images (`zgk0gjp...png`: 3.79 MB; `ccy1zc...png`: 5.45 MB). With `f_auto,q_auto`, size drops to **125 KB (98.7% bandwidth savings)**. | **CRITICAL** | **P0** | `src/components/sections/home/HeroSection.tsx`<br>`src/components/sections/home/CoachBioSection.tsx`<br>`src/lib/cloudinary.ts` |
| **2** | **Supabase Remote DB Latency & 3.5s Timeout Cliff** | Direct REST latency is **9,200 ms – 12,800 ms** (TCP connect: 1,759 ms). `AbortSignal.timeout(3500)` forces every dynamic SSR query to stall for 3.5s before falling back. | **CRITICAL** | **P0** | `src/lib/supabase/server.ts`<br>`src/lib/cms/queries.ts`<br>`src/lib/supabase/middleware.ts` |
| **3** | **Admin Navigation Delay (10–13s)** | `/admin/*` routes execute `supabase.auth.getUser()` in middleware without a fetch timeout, stalling route changes for 10–13 seconds over the network. | **HIGH** | **P1** | `src/lib/supabase/middleware.ts`<br>`src/middleware.ts` |
| **4** | **Global Lenis + GSAP RAF Scroll Interception** | `SmoothScroll.tsx` imports 134 KB of animation libraries (`gsap`, `ScrollTrigger`, `lenis`) in `RootLayout`, running continuous RAF tickers and overriding native mobile scrolling. | **HIGH** | **P1** | `src/components/layout/SmoothScroll.tsx`<br>`src/components/layout/SiteLayout.tsx` |
| **5** | **Missing `sharp` Image Processing Library** | `sharp` is omitted from `package.json`. Next.js on-demand image optimization falls back to CPU-heavy JS/WASM rendering. | **MEDIUM** | **P2** | `package.json` |
| **6** | **Unused Heavy Dependency (`framer-motion`)** | `framer-motion` (v12.6.0) is installed in `package.json` but imported 0 times in `src/`. | **LOW** | **P3** | `package.json` |

---

## 10. Summary of Key Insights

1. **The HTML generation in production is fast (4–13 ms TTFB).** Next.js App Router static prerendering (ISR) is working as designed for built HTML files.
2. **The slowness is an asset & external network issue:**
   - **Asset issue:** Visitors must download almost 10 megabytes of raw PNGs for the Hero and Coach bio.
   - **Network issue:** Any time a dynamic database query is attempted (development mode, CMS saves, or `/admin` routes), Supabase takes 10+ seconds because of high latency to the remote host.
   - **Main thread issue:** Lenis smooth scrolling with GSAP Ticker intercepts every scroll event across all devices, causing touch and scroll friction.

*(All evidence is backed by empirical lab benchmarks recorded in the test environment.)*

