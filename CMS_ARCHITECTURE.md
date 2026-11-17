# CMS Architecture & Engineering Reference

## Overview
This document outlines the complete architectural design of the headless Content Management System (CMS) and Admin Dashboard engineered for the women's fitness coaching platform.

The system combines **Next.js 15 App Router**, **Supabase PostgreSQL & Auth**, **Row-Level Security (RLS)**, and **Cloudinary Image Optimization** to deliver a secure, performant, and maintainable editorial experience while preserving the public website's design system.

---

## 1. Architectural Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
├──────────────────────────────┬──────────────────────────────┤
│    Public Client & Pages     │     Admin Dashboard & CMS    │
│  - / (Homepage)              │  - /admin (Overview)         │
│  - /about                    │  - /admin/homepage           │
│  - /classes                  │  - /admin/classes            │
│  - /services                 │  - /admin/services           │
│  - /single-service           │  - /admin/testimonials       │
│  - /contact                  │  - /admin/appointments       │
│  - /appointments             │  - /admin/media (Cloudinary) │
│  - /link-in-bio              │  - /admin/seo & settings     │
└──────────────┬───────────────┴──────────────┬───────────────┘
               │                              │
               ▼                              ▼
    ┌────────────────────┐         ┌────────────────────┐
    │ Dynamic Query Layer│         │   Server Actions   │
    │ (src/lib/cms/      │         │ (Zod Validation &  │
    │  queries.ts)       │         │  revalidatePath)   │
    └──────────┬─────────┘         └──────────┬─────────┘
               │                              │
               ▼                              ▼
    ┌───────────────────────────────────────────────────┐
    │              Supabase Client / SSR                │
    │      (@supabase/ssr with Cookie Session Auth)     │
    └─────────────────────────┬─────────────────────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
    ┌────────────────────┐        ┌────────────────────┐
    │    PostgreSQL DB   │        │     Cloudinary     │
    │  - Row-Level Sec   │        │  - Signed Uploads  │
    │  - 11 Data Tables  │        │  - Auto Format/WebP│
    │  - Zero Leaks      │        │  - Secure Media Lib│
    └────────────────────┘        └────────────────────┘
```

---

## 2. Public Integration & Graceful Fallbacks

A critical principle of the implementation is **zero disruption**:
- If Supabase environment variables are not yet configured or if database tables are unseeded, the public website automatically falls back to the verified Phase 1–6 static content.
- All query functions (`getClasses`, `getServices`, `getTestimonials`, `getSiteSettings`, `getBioLinks`, `getPageSections`) execute asynchronously on the server.
- When an administrator saves or publishes a change in the CMS, `revalidatePath(...)` triggers Next.js On-Demand Incremental Static Regeneration (ISR). The public visitor sees the fresh content immediately without requiring a redeployment.

---

## 3. Security & Route Protection

1. **Authentication Guard:**
   - Next.js Middleware (`src/middleware.ts` & `src/lib/supabase/middleware.ts`) intercepts all `/admin/*` routes.
   - Unauthenticated visitors attempting to view protected admin paths are redirected to `/admin/login`.
   - Authenticated administrators accessing `/admin/login` are redirected to `/admin`.

2. **Server-Side Authorization:**
   - In addition to middleware, `src/app/admin/(dashboard)/layout.tsx` verifies `supabase.auth.getUser()` on the server.
   - Operations that alter data (`saveClassAction`, `deleteServiceAction`, etc.) authenticate the caller before executing database mutations.

3. **Row-Level Security (RLS):**
   - Public visitors have `SELECT` privileges only for rows with `status = 'published'` or `is_enabled = true`.
   - `appointments` table: Public visitors have `INSERT` permissions only (submitting consultation inquiries). `SELECT`, `UPDATE`, and `DELETE` permissions are strictly restricted to authenticated administrators.
   - Media and service role keys are never sent to the browser. Cloudinary uploads use cryptographic signatures generated exclusively on the server (`/api/admin/media/sign`).

---

## 4. File Organization

```
src/
├── app/
│   ├── admin/
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx         # Dashboard layout shell & auth guard
│   │   │   ├── page.tsx           # Overview stats & quick actions
│   │   │   ├── homepage/page.tsx  # Hero & section editor
│   │   │   ├── about/page.tsx     # Coach story & bio editor
│   │   │   ├── classes/page.tsx   # Signature programmes manager
│   │   │   ├── services/page.tsx  # Service tiers & formats manager
│   │   │   ├── testimonials/page.tsx # Client reviews manager
│   │   │   ├── appointments/page.tsx # Private consultation inquiry inbox
│   │   │   ├── contact/page.tsx   # Studio contact & social handles
│   │   │   ├── link-in-bio/page.tsx # Instagram bio links manager
│   │   │   ├── navigation/page.tsx # Header & footer navigation manager
│   │   │   ├── seo/page.tsx       # Meta titles, descriptions & OG images
│   │   │   ├── media/page.tsx     # Cloudinary media library
│   │   │   └── settings/page.tsx  # Global site settings & coaching availability
│   │   └── login/page.tsx         # Admin login & setup guide
│   └── api/
│       └── admin/
│           ├── appointments/route.ts
│           ├── classes/route.ts
│           ├── services/route.ts
│           ├── media/route.ts
│           ├── media/sign/route.ts # Server-side Cloudinary upload signing
│           └── media/save/route.ts # Metadata registry
├── components/admin/
│   ├── AdminSidebar.tsx
│   ├── AdminHeader.tsx
│   ├── AdminLayoutShell.tsx
│   ├── AdminCard.tsx
│   ├── ImageUploader.tsx
│   └── StatusBadge.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── admin.ts
│   │   └── middleware.ts
│   ├── cloudinary.ts
│   └── cms/
│       ├── schema.ts   # Zod validation schemas
│       ├── queries.ts  # Database query layer with fallbacks
│       └── actions.ts  # Next.js Server Actions with ISR
└── supabase/
    ├── migrations/20261114000000_phase7_cms_schema.sql
    └── seed.sql
```

