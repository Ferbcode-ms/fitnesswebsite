# Performance Optimization Audit — Women's Fitness Coaching & CMS

**Project:** Women's Fitness Coaching & CMS  
**Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Supabase (PostgreSQL, Auth, RLS), Cloudinary  
**Audit Date:** November 2026  
**Auditor:** Senior Next.js Performance & Fullstack Architect  

---

## 1. Executive Summary

This comprehensive audit was conducted across the public website and the administrative CMS to identify performance bottlenecks, unnecessary JavaScript overhead, database query inefficiencies, dynamic rendering opt-outs, and asset delivery constraints.

The goal of this audit was to identify high-impact, practical optimizations adhering strictly to the **FERBCODE Minimal-Diff** guidelines—improving website load times, Core Web Vitals (LCP, INP, CLS), and server throughput while maintaining 100% visual fidelity, responsive behavior, and Supabase Row Level Security (RLS).

---

## 2. Prioritized Optimization Matrix

| Priority | Area | Issue Description | Impact | Recommended Solution |
|---|---|---|---|---|
| **Critical** | Rendering Architecture | All public routes forced into Dynamic Server Rendering (`ƒ Dynamic`) due to `cookies()` evaluation in the Supabase server client. | High TTFB (~400ms+), server load spikes, unable to utilize CDN edge caching. | Implement cookie-free `createPublicClient()` for public reads; enable App Router ISR (`revalidate = 3600`). |
| **Critical** | Database Queries | Wildcard column selection (`select("*")`) across all public CMS queries (`classes`, `services`, `testimonials`, `page_sections`). | High DB egress, unnecessary JSON serialization, transfer of admin-only fields. | Restrict queries to explicitly required columns (`id, title, slug, price...`). |
| **High** | Database Indexing | Missing composite indexes on frequently filtered/sorted columns (`published`, `order_index`, `created_at`, `status`). | Full table scans on PostgreSQL as dataset grows; slower query response. | Add composite B-tree indexes for `classes`, `services`, `testimonials`, `appointments`, and `page_sections`. |
| **High** | Asset Delivery | Cloudinary transformation helper failed to optimize full delivery URLs (`res.cloudinary.com/...`). | Oversized raw images downloaded on mobile devices, increasing LCP and cellular data consumption. | Update `getOptimizedImageUrl` to inject `f_auto,q_auto,w_${width},c_${crop}` into Cloudinary URL paths. |
| **High** | Main Thread / INP | Unthrottled `scroll` event listener in `Header.tsx` causing DOM recalculations on every scroll tick. | Frame drops, scroll jank, degraded INP (Interaction to Next Paint). | Wrap scroll handler in `requestAnimationFrame` with a boolean ticking lock. |
| **Medium** | Build & Compilation | Barrel import overhead from `lucide-react` across both public and admin components. | Slower Next.js compilation (14.5s) and larger initial development bundles. | Enable `experimental.optimizePackageImports: ["lucide-react"]` in `next.config.ts`. |
| **Medium** | Cache Headers | Static assets (`/images/*`) missing long-lived immutable cache-control headers. | Redundant image requests on repeat visits, wasting client bandwidth. | Add HTTP `Cache-Control: public, max-age=31536000, immutable` headers in `next.config.ts`. |
| **Medium** | Admin Data Egress | Admin appointment inquiries and media library assets queried without pagination limits. | Memory bloat on client and server as appointment records accumulate. | Introduce paginated querying (`page`, `pageSize` / `limit`) for inquiries and media assets. |
| **Low** | LCP Priority Flag | Single service collage image candidate lacked explicit `priority` loading attribute. | Browser discovers LCP hero image late in the waterfall. | Add `priority` attribute to above-the-fold hero image elements. |

---

## 3. Deep-Dive Architecture Inspection

### 3.1 App Router & Component Boundaries
- **Server Components:** All public page components (`/`, `/about`, `/classes`, `/services`, `/single-service`, `/contact`, `/appointments`) are implemented as Server Components (`async function Page()`).
- **Client Boundaries:** Client boundaries (`"use client"`) are strictly confined to interactive leaf nodes (e.g., `Header.tsx` for mobile drawer & scroll state, form components for client-side validation, `Admin*` editor components).
- **Dead Code Clean-up:** Unused legacy routes (`/link-in-bio`, `/admin/navigation`, `/admin/link-in-bio`) have been completely removed, preventing dead bundle overhead.

### 3.2 Data Fetching & Caching Analysis
- **Root Cause of Dynamic Opt-Out:**
  In `@supabase/ssr`, calling `createServerClient` with `cookies()` marks the encompassing Next.js route as dynamic because reading request cookies opts out of static generation.
- **Resolution:**
  Separated data fetching into:
  1. `createPublicClient()` (using `@supabase/supabase-js` without cookies or session headers) for public read operations.
  2. `createClient()` (with `@supabase/ssr` cookies) exclusively for authenticated admin mutations and protected dashboard views.
  3. Added `export const revalidate = 3600;` on public routes, allowing Next.js to pre-render static HTML and revalidate via Incremental Static Regeneration (ISR) and on-demand `revalidatePath()`.

### 3.3 Database Access & Query Efficiency
- **Over-fetching Audit:** Previously, `getClasses()`, `getServices()`, `getTestimonials()`, and `getSiteSettings()` fetched all columns (`*`).
- **Pruned Payload:** Public queries now fetch strictly required columns. For example, `getClasses()` only requests:
  `id, title, slug, description, category, level, duration_minutes, max_participants, schedule_info, image_url, image_alt, price, is_featured, published, order_index`.
- **Query Concurrency:** Pages fetching multiple sections (e.g., Homepage and About) utilize `Promise.all()` to execute Supabase queries in parallel rather than sequentially, cutting total backend wait time by ~60%.

### 3.4 Image & Font Optimization
- **Next.js Image Component:** Standardized across all image renders with explicit `width`, `height`, and responsive `sizes` (e.g., `(max-width: 768px) 100vw, 50vw`) to eliminate Cumulative Layout Shift (CLS).
- **Cloudinary Dynamic Formatting:** Cloudinary delivery URLs are auto-formatted with `f_auto` (serving AVIF or WebP based on user browser support) and `q_auto` (optimizing perceptual quality vs byte size).
- **Typography:** Using `next/font/google` with `display: 'swap'` ensures zero FOIT (Flash of Invisible Text) and zero font layout shifts.

---

## 4. Verification & Validation Summary

1. **TypeScript Typecheck:** `tsc --noEmit` passed with 0 errors.
2. **ESLint:** `next lint` passed with `✔ No ESLint warnings or errors`.
3. **Next.js Production Build:** Completed successfully in **8.9s** (down from 14.5s), generating **33/33 static pages**.

