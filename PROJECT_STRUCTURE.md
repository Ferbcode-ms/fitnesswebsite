# PROJECT STRUCTURE — Women's Fitness Coaching Website

**Framework:** Next.js 15 (App Router) + TypeScript + Tailwind CSS v4  
**Visual Reference:** `https://manatee-bumblebee-yawb.squarespace.com/` (Hot Core Pilates)  
**Target Business:** Women's Fitness Coaching (Online Fitness Coaching & In-Person Personal Training)

---

## Directory Tree

```text
c:\Users\Manpreet\Desktop\fitness\
├── public/
│   ├── fonts/                 # Reserved for owner-supplied local fonts (if any)
│   ├── icons/                 # Reserved for Phase 2+ custom SVG fitness stickers/icons
│   └── images/                # Reserved for Phase 2+ licensed/owner fitness coaching media
├── reference/
│   └── screenshots/           # 30 Phase 0 desktop, tablet, mobile, and internal page screenshots
├── src/
│   ├── app/
│   │   ├── about/page.tsx             # /about placeholder
│   │   ├── appointments/page.tsx      # /appointments placeholder
│   │   ├── classes/page.tsx           # /classes placeholder
│   │   ├── contact/page.tsx           # /contact placeholder
│   │   ├── link-in-bio/page.tsx       # /link-in-bio placeholder (not in main nav)
│   │   ├── services/page.tsx          # /services placeholder
│   │   ├── single-service/page.tsx    # /single-service placeholder
│   │   ├── globals.css                # Tailwind v4 entry + base theme & accessibility styles
│   │   ├── layout.tsx                 # Root layout, Google Fonts, SEO metadata, Header & Footer
│   │   ├── not-found.tsx              # Custom 404 page
│   │   └── page.tsx                   # / homepage placeholder
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx             # Structural #4A1C21 footer (Server Component)
│   │   │   ├── Header.tsx             # Fixed 82.6px header with scroll state (Client Component)
│   │   │   ├── MobileNavigation.tsx   # Full-screen #F7EDE4 mobile menu drawer (Client Component)
│   │   │   └── Navigation.tsx         # Desktop nav with Services dropdown (Client Component)
│   │   ├── sections/                  # Reserved empty until Phase 2 visual section builds
│   │   └── ui/
│   │       ├── Button.tsx             # Pill button primitive (primary, secondary, link variants)
│   │       └── Container.tsx          # Max-width 1500px + fluid 4vw/6vw gutter wrapper
│   ├── config/
│   │   ├── navigation.ts              # Centralized navigation, Services dropdown, booking CTA
│   │   └── site.ts                    # Centralized business, coach, contact & availability placeholders
│   ├── lib/
│   │   └── utils.ts                   # Minimal `cn` class-name utility
│   ├── styles/
│   │   └── variables.css              # Phase 0 design tokens (colors, typography, spacing, radii)
│   └── types/
│       └── index.ts                   # Shared TypeScript interfaces
├── eslint.config.mjs                  # ESLint flat config extending next/core-web-vitals & typescript
├── next.config.ts                     # Next.js configuration (AVIF/WebP image formats)
├── package.json                       # Project dependencies & scripts (dev/build via Turbopack)
├── postcss.config.mjs                 # Tailwind CSS v4 PostCSS plugin
├── tsconfig.json                      # Strict TypeScript config with `@/*` path alias
├── ASSET_INVENTORY.md                 # Phase 0 media & font inventory
├── COMPONENT_INVENTORY.md             # Phase 0 component blueprint
├── IMPLEMENTATION_PLAN.md             # Multi-phase build plan
├── PHASE_1_REPORT.md                  # Phase 1 verification & status report
├── PROJECT_STRUCTURE.md               # This file
├── REFERENCE_ANALYSIS.md              # Phase 0 reverse engineering specification
├── ROUTE_INVENTORY.md                 # Active and excluded route specification
└── TECH_STACK.md                      # Installed dependency inventory
```

---

## Important Directory Explanations

- **`src/app/`**: App Router pages and global shell only. Contains strictly the 8 active routes plus `not-found.tsx`; excluded Squarespace template routes are intentionally omitted.
- **`src/components/layout/`**: Global structural navigation chrome consuming `src/config/site.ts` and `src/config/navigation.ts` with zero hardcoded duplicate links.
- **`src/components/sections/`**: Intentionally kept empty in Phase 1 until visual section implementation begins in Phase 2.
- **`src/components/ui/`**: Reusable foundational primitives (`Button`, `Container`) adhering to Phase 0 pill radii (`300px`), palette tokens, and accessible focus states.
- **`src/config/`**: Single source of truth for business placeholders (`site.ts`) and route hierarchy (`navigation.ts`).
- **`src/styles/variables.css`**: Exact Phase 0 CSS custom properties (`#4A1C21`, `#E9C9CF`, `#F7EDE4`, `#EDD8C4`, `#FFFFFF`, `#2C1107`, typography scale, fluid gutters, radii).
- **`reference/screenshots/`**: Visual reference captures from Phase 0 used for side-by-side QA in Phase 2+.
- **Documentation (`*.md` at root)**: Preserves the Phase 0 file locations (`REFERENCE_ANALYSIS.md`, `ASSET_INVENTORY.md`, `COMPONENT_INVENTORY.md`, `IMPLEMENTATION_PLAN.md`) alongside Phase 1 deliverables without duplicating files.

