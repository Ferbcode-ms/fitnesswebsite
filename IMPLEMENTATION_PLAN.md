# IMPLEMENTATION PLAN — Women's Fitness Coaching Website (Next.js)

> **Project-Wide Rule:**  
> **Visual Reference = Hot Core Pilates** (`https://manatee-bumblebee-yawb.squarespace.com/`)  
> **Actual Business = Women's Fitness Coaching** (female personal trainer & fitness coach for women)  
> Retain 100% of the visual design system, colors, typography, layout structure, spacing, interactions, and routes—while adapting all copy, services, and imagery naturally to women's fitness coaching with explicit `[Placeholder]` markers for unprovided owner details.

---

## 1. Recommended Next.js Architecture

- **Framework:** Next.js App Router (`src/app/`) with TypeScript (`strict: true`, zero `any`).
- **Styling:** Tailwind CSS v4 (or v3) configured with CSS custom properties in `src/app/globals.css` matching exact reference tokens:
  - Colors: `--bg-burgundy: #4A1C21`, `--bg-blush: #E9C9CF`, `--bg-cream: #F7EDE4`, `--bg-sand: #EDD8C4`, `--bg-white: #FFFFFF`, `--text-espresso: #2C1107`, `--border-input: #333333`.
  - Fonts loaded via `next/font/google` (`Lilita_One`, `Sometype_Mono`, `Roboto`, plus `La_Belle_Aurore` or owner-supplied local font for `--font-script`).
- **Rendering Strategy:**
  - **Server Components by default** for all pages and static UI sections.
  - Isolate `"use client"` strictly to interactive islands (`SiteHeader`, `MobileMenuOverlay`, `NewsletterForm`/`StarterGuideForm`, `ContactForm`, `FaqAccordion`, `TestimonialCarousel`, `BlogFilterBar`, `ShopCatalog`).
- **Icons & Forms:** Use `lucide-react` (only where SVG icons are needed) and native HTML5/React validation (avoiding heavy form/animation libraries unless required).
- **Routing (Preserving Reference URL Structure):**
  - `/` (Homepage; `/home` redirects to `/`)
  - `/about` (Coach bio, philosophy, stats placeholders, team/pillars)
  - `/classes` (Women's Fitness Programmes: 1-to-1 Personal Training, Women's Strength Training, Group Fitness Coaching, pricing placeholders, FAQ)
  - `/single-service` (Individual service deep dive — e.g., 1-to-1 Personal Training / Online Fitness Coaching)
  - `/the-app` (Online Fitness Coaching & Personalised Workout Plans app experience)
  - `/blog` & `/blog/[slug]` (Women's fitness, strength & nutrition guidance articles)
  - `/shop` (Personalised Workout Plans & training guides/essentials)
  - `/contact` (Enquiries & coaching consultation form)
  - `/sales-page` (Dedicated coaching programme landing page)
  - `/link-in-bio` (Social link landing page)
  - `/appointments` (Consultation & coaching booking)
  - `/course-1` (Online fitness course layout)
  - `not-found.tsx` (Custom `/404` recovery page matching reference `#4A1C21` / `#E9C9CF` layout)
  - *(Fix reference's broken `/work-with-me` and `/podcast` links by routing programme CTAs cleanly to `/classes` or `/single-service` and updating footer `EXPLORE` links to live routes.)*

---

## 2. Content & Business Adaptation Rules

1. **Services Mapped Naturally (not forced onto every page):**
   - `1-to-1 Personal Training`
   - `Online Fitness Coaching`
   - `Personalised Workout Plans`
   - `Nutrition Guidance`
   - `Group Fitness Coaching`
   - `Women's Strength Training`
2. **Copywriting Guardrails:**
   - Tone: natural, confident, approachable, empowering, trustworthy.
   - Strictly avoid: Pilates-specific terms, generic AI clichés, guaranteed weight-loss claims, medical claims, fake testimonials, fake press logos, or invented qualifications/metrics.
3. **Explicit Placeholders for Unprovided Data:**
   - `[Coach Name]`, `[Brand Name]`, `[Qualifications / Certifications]`, `[Years of Experience]`, `[Client Count]`, `[Studio Location / City]`, `[Pricing Placeholder]`, `[Client Testimonial Placeholder]`, `[Contact Email / Phone / Social Handles]`.

---

## 3. Component Implementation Order

1. **Foundation & Tokens:** `globals.css` (CSS variables, marquee keyframes, focus states, reduced-motion support), `layout.tsx` (Google fonts + metadata), `src/data/` typed content & placeholder data modules.
2. **Global Chrome:** `PillButton`, `EditorialHeading`, `SiteHeader`, `MobileMenuOverlay`, `NewsletterForm`, `SiteFooter`.
3. **Shared Section Primitives:** `MarqueeBanner`, `SplitFeatureSection`, `TestimonialsBento`, `FolderProgrammeCard`, `LeadMagnetFormSection`, `PricingTiersSection`.
4. **Homepage-Specific Sections:** `VideoHero` (with SVG rounded-bottom clip-path), `ComparisonCardsSection` (offset `#F7EDE4` & `#4A1C21` cards + fitness stickers), `PressLogoStrip` (or credentials strip), `AppShowcaseSection`, `BlogPreviewSection`.
5. **Interactive Islands:** `FaqAccordion`, `TestimonialCarousel`, `BlogFilterBar`, `ShopCatalog`, `ContactForm`, `BookingEmbed`.

---

## 4. Page Implementation Order

1. **Phase 1 — Design System + Layout Chrome + Homepage (`/`):** Build tokens, fonts, Header/Footer, and all 11 homepage sections; visually verify against reference desktop (`1440×900`, `1280×800`), tablet (`768×1024`), and mobile (`390×844`, `375×812`).
2. **Phase 2 — Core Service & Brand Pages:** `/about`, `/classes`, `/single-service`, `/the-app`, `/appointments`, `/contact`.
3. **Phase 3 — Content, Commerce & Bonus Pages:** `/blog`, `/blog/[slug]`, `/shop`, `/sales-page`, `/link-in-bio`, `/course-1`, `not-found.tsx` (`/404`), plus `/home` redirect.

---

## 5. Asset Preparation Steps

1. Collect owner-supplied coach portrait (`3:4`), hero looping `16:9` fitness coaching video (or fallback `16:9` image), and 8–10 cohesive women's strength/coaching photographs matching the reference's warm cream/burgundy lighting.
2. Create 4 clean vector SVG stickers (`1:1`, `#4A1C21`/`#F7EDE4` line art with sticker border) for Section 1 (dumbbells, sneakers/timer, resistance band, kettlebell).
3. Prepare phone mockup graphic for Section 7 & `/the-app`.
4. Confirm script font choice (`La Belle Aurore` / `Sacramento` or owner local font) and store all local media in `public/images/` and `public/videos/` with `next/image` optimization.

---

## 6. Animation & Responsive Implementation Plan

- **Animations (Zero bloat, CSS-first):**
  - Header `.shrink`: `transition: background-color 0.2s ease` triggered via `window.scrollY > 10`.
  - Button/Link hover: `transition: opacity 0.1s linear` to `opacity: 0.8`.
  - Marquee: CSS `@keyframes` infinite `translateX` loop (`prefers-reduced-motion: reduce` pauses animation).
  - Scroll reveal: Optional lightweight `IntersectionObserver` (`opacity 0 -> 1`, `0.9s ease`).
  - Accordion/Drawer: CSS grid/max-height & transform transitions (`0.25s–0.3s ease`).
- **Responsive Strategy:**
  - Match exact desktop fluid proportions (`clamp()` / `vw` scaling for `Lilita One` display headings: `~187px` at `1440px`, `~166px` at `1280px`, `~98px` at `768px`, `~52–55px` on mobile).
  - **Fix reference mobile edge-clipping:** On `375px` mobile, clamp Hero H1 slightly (e.g., `clamp(2.8rem, 13vw, 11.7rem)`) with horizontal gutter padding so the trailing period never clips at `375px` width while preserving the exact visual scale.
  - Collapse multi-column bento, folder cards, splits, and forms cleanly to single-column full-width stacks below `768px`, switching header to hamburger + `MobileMenuOverlay` at `≤768px` (or `≤1023px` matching `768px` tablet breakpoint).

---

## 7. Testing & Verification Strategy

1. **TypeScript & Lint:** Run `npx tsc --noEmit` and `npm run lint` after each phase.
2. **Production Build:** Run `npm run build` to verify all routes, static/dynamic pages, and `next/image` configs.
3. **Visual & Interactive QA in Browser:**
   - Compare every homepage section and internal page side-by-side against `reference/screenshots/`.
   - Verify sticky header transition on scroll, `SERVICES` and `BONUS PAGES` hover/keyboard dropdowns, mobile overlay menu + submenu drill-down, FAQ accordion, testimonial carousel, blog filter/search, and form validation.
   - Verify zero horizontal overflow (`scrollWidth <= innerWidth`) across `1440×900`, `1280×800`, `768×1024`, `390×844`, and `375×812`.
4. **Content & Accessibility Audit:** Confirm zero remaining Pilates references, zero medical/weight-loss claims, proper heading hierarchy, semantic buttons/links, form labels, and `prefers-reduced-motion` support.

