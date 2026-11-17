# HOMEPAGE IMPLEMENTATION — Women's Fitness Coaching

This document records the complete implementation of the Homepage (`/`), reverse-engineered with pixel-accurate structural fidelity from the reference website (**Hot Core Pilates** — `https://manatee-bumblebee-yawb.squarespace.com/`) and authentically adapted for a **Women's Fitness Coaching** business (online fitness coaching and in-person personal training).

---

## 1. Section Breakdown in Exact Reference Order

| # | Section Name | Component File | Reference Section ID / Bounds | Background Color / Media | Purpose in Reference | Adapted Coaching Purpose | Key Visual Elements |
|---|---|---|---|---|---|---|---|
| **0** | **Hero** | `HeroSection.tsx` | `699e72ee5fa9450ffd2f2eb3`<br>`(y: 0–854px)` | Full-bleed media over `#4A1C21` with dark tonal gradient | Reformer studio video with bottom headline & CTA | Women's fitness coaching hero with bottom headline & CTA | `BUILD YOUR strength.` display headline, bottom-left subcaption, `START TODAY` pill CTA, ~`29px` SVG rounded bottom corner transition onto Section 1 |
| **1** | **Pain Points vs Outcomes** | `ComparisonSection.tsx` | `(y: 854–2933px)` | Dusty Blush (`#E9C9CF`) | Reformer vs conventional workout frustrations | Frustrations (`YOU'VE TRIED:`) vs Coaching Solutions (`YOU WANT:`) | Top-right dumbbell sticker, centered H2 with script accent, `YOU'VE TRIED:` Cream card with sneaker sticker, `YOU WANT:` Burgundy card with plate sticker, bottom callout with kettlebell sticker and consultation pill button |
| **2** | **Testimonials Bento Grid** | `TestimonialsBentoSection.tsx` | `(y: 2932–3997px)` | Deep Burgundy (`#4A1C21`), padding `95px 0` | 5-card studio class reviews | 5-card client coaching transformations & reviews | `THE GLOW is REAL.` Sand title card, 4 testimonial cards (`#FFFFFF`, `#E9C9CF`, `#F7EDE4`), star ratings, quotes, and circular client avatars |
| **3** | **Scrolling Marquee** | `MarqueeSection.tsx` | `(y: 3997–4307px)` | Warm Cream (`#F7EDE4`) | `CHOOSE YOUR CLASS /` divider | Lineup transition banner | Pure CSS infinite horizontal translation `CHOOSE YOUR PROGRAMME /` in `Lilita One` (`clamp(3.5rem, 15.37vw, 13.835rem)`) |
| **4** | **Programme Folder Cards & Callout** | `ProgrammeFolderCardsSection.tsx` | `(y: 4307–7505px)` | Warm Cream (`#F7EDE4`) | 3 stacked manila-folder class cards (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`) + beginner callout | 3 coaching tiers: `ONLINE COACHING` (Burgundy), `IN-PERSON TRAINING` (Blush), `HYBRID COACHING` (Sand) + Onboarding Callout | `1091px` wide cards with staggered top tabs, 2-column square image & copy split, outlined/solid pill CTAs, bottom callout `NOT SURE WHERE to START?` with equipment photo |
| **5** | **Coach Bio** | `CoachBioSection.tsx` | `(y: 7505–8205px)` | Warm Cream (`#F7EDE4`) | Founder Ava introduction | Founder & Head Coach introduction | Two-column split: H2 `Meet [Coach Name]`, philosophy narrative, `LEARN MORE ABOUT COACHING` pill, and editorial coach portrait |
| **6** | **Credentials Strip** | `PressStripSection.tsx` | `(y: 8205–8352px)` | Warm Cream (`#F7EDE4`) | `Featured in` 5 press logos | Verified professional fitness certifications & accreditations | Single horizontal row: `Professional Accreditations & Standards:` with 5 contained pill badges (NASM, Precision Nutrition, Pre/Postnatal, CSCS, Women's Health) |
| **7** | **Coaching App Showcase** | `AppShowcaseSection.tsx` | `(y: 8352–9360px)` | Full-bleed gym studio background with Burgundy overlay | Mobile studio booking app | Customized mobile fitness coaching app | Top-left headline `TAKE YOUR COACH with YOU` + dual store pills, bottom-left Burgundy feature box with 7-item check list, and right smartphone mockup |
| **8** | **Starter Guide Lead Magnet** | `LeadMagnetSection.tsx` | `(y: 9360–10181px)` | Warm Cream (`#F7EDE4`), padding `47px 0` | 7-Day Hot Core Starter Guide | Free 7-Day Female Strength & Habit Starter Guide | Centered H2 with script accent, 3 bullet points, flanking editorial photos, and 4-column horizontal download form (`First Name`, `Last Name`, `Email`, `Download Now`) |
| **9** | **Coaching Journal (The Edit)** | `BlogPreviewSection.tsx` | `(y: 10181–10817px)` | Warm Cream (`#F7EDE4`), padding `47px 0` | `THE HOT EDIT` 3-column blog preview | `THE EDIT` coaching insights & guides | Left column intro & `EXPLORE COACHING` CTA, 2 article cards with covers, excerpts, and `Read More →` links |
| **10** | **Bottom Split CTA** | `BottomSplitCtaSection.tsx` | `(y: 10817–11699px)` | Dusty Blush (`#E9C9CF`) | Final class booking push | Final coaching conversion push | 50/50 split: Full-bleed training photo left, headline `READY to FEEL STRONG?`, supporting lines, and oversized oval pill CTA `START TODAY` right |

---

## 2. Component Architecture

```
src/
├── app/
│   ├── page.tsx                           # Clean composition of all 11 homepage sections
│   ├── layout.tsx                         # RootLayout with persistent Header & Footer
│   └── globals.css                        # Design tokens, @theme, animations, reset
├── components/
│   ├── sections/
│   │   └── home/
│   │       ├── HeroSection.tsx            # Section 0
│   │       ├── ComparisonSection.tsx      # Section 1
│   │       ├── TestimonialsBentoSection.tsx # Section 2
│   │       ├── MarqueeSection.tsx         # Section 3
│   │       ├── ProgrammeFolderCardsSection.tsx # Section 4
│   │       ├── CoachBioSection.tsx        # Section 5
│   │       ├── PressStripSection.tsx      # Section 6
│   │       ├── AppShowcaseSection.tsx     # Section 7
│   │       ├── LeadMagnetSection.tsx      # Section 8
│   │       ├── BlogPreviewSection.tsx     # Section 9
│   │       └── BottomSplitCtaSection.tsx  # Section 10
│   ├── forms/
│   │   ├── StarterGuideForm.tsx           # 4-column lead magnet interactive island
│   │   └── NewsletterForm.tsx             # Footer VIP newsletter interactive island
│   ├── layout/
│   │   ├── Header.tsx                     # Fixed sticky header with scroll transition
│   │   ├── Navigation.tsx                 # Desktop monospace nav + Services dropdown
│   │   ├── MobileNavigation.tsx           # 2-line hamburger + full-screen cream drawer
│   │   └── Footer.tsx                     # 4-column footer + display wordmark
│   └── ui/
│       ├── Container.tsx                  # Standard, wide, narrow, and full bounds
│       ├── Button.tsx                     # Universal pill button primitive (300px radius)
│       ├── EditorialHeading.tsx           # Lilita One display heading with inline script
│       ├── Card.tsx                       # Flat surface container (10px & 20px radii)
│       ├── Badge.tsx                      # Monospace pill badge
│       ├── TextLink.tsx                   # Accessible styled link
│       ├── IconButton.tsx                 # Accessible icon button
│       ├── ImageWrapper.tsx               # Next.js Image wrapper with aspect ratios
│       └── MarqueeBanner.tsx              # Pure CSS continuous marquee ticker
```

---

## 3. Image Assets Inventory

All photography reflects high-end female strength training, 1-on-1 personal coaching, healthy nutrition, and modern private gym settings in warm burgundy and cream tones:

| File Path | Description | Aspect Ratio / Dimensions | Purpose |
|---|---|---|---|
| `public/images/hero-bg.jpg` | Female athlete training in private studio with warm ambient lighting | `16:9` (`1600×900`) | Hero background media |
| `public/images/sticker-dumbbell.svg` | Vector line-art dumbbell sticker | `1:1` (`200×200`) | Section 1 top-right decorative sticker |
| `public/images/sticker-sneaker.svg` | Vector line-art training shoe sticker | `1:1` (`200×200`) | Section 1 `YOU'VE TRIED:` card sticker |
| `public/images/sticker-band.svg` | Vector line-art strength plate / resistance loop sticker | `1:1` (`200×200`) | Section 1 `YOU WANT:` card sticker |
| `public/images/sticker-kettlebell.svg` | Vector line-art kettlebell sticker | `1:1` (`200×200`) | Section 1 bottom callout sticker |
| `public/images/avatar-1.jpg` | Client headshot 1 | `1:1` (`200×200`) | Testimonial bento card 2 |
| `public/images/avatar-2.jpg` | Client headshot 2 | `1:1` (`200×200`) | Testimonial bento card 3 |
| `public/images/avatar-3.jpg` | Client headshot 3 | `1:1` (`200×200`) | Testimonial bento card 4 |
| `public/images/avatar-4.jpg` | Client headshot 4 | `1:1` (`200×200`) | Testimonial bento card 5 |
| `public/images/card-foundations.jpg` | 1-on-1 coaching & form feedback | `1:1` (`800×800`) | Manila folder card 1 (`ONLINE COACHING`) |
| `public/images/card-strength.jpg` | Dumbbell personal training workout | `1:1` (`800×800`) | Manila folder card 2 (`IN-PERSON TRAINING`) |
| `public/images/card-hybrid.jpg` | Female athlete conditioning session | `1:1` (`800×800`) | Manila folder card 3 (`HYBRID COACHING`) |
| `public/images/callout-equipment.jpg` | Minimalist weights & training equipment flatlay | `4:5` (`600×750`) | Section 4 onboarding callout |
| `public/images/coach-portrait.jpg` | Editorial portrait of female fitness coach in activewear | `3:4` (`800×1067`) | Section 5 Coach Bio (`Meet [Coach]`) |
| `public/images/app-bg.jpg` | Modern studio training area | `16:9` (`1600×900`) | Section 7 App showcase background |
| `public/images/app-phone-mockup.svg` | Modern smartphone mockup with coaching workout app UI | `~9:20` (`380×820`) | Section 7 overlapping app mockup |
| `public/images/guide-left.jpg` | Female coach portrait in neutral tones | `2:3` (`600×900`) | Section 8 starter guide flanking image |
| `public/images/guide-right.jpg` | Healthy high-protein post-workout meal bowl | `4:5` (`600×750`) | Section 8 starter guide flanking image |
| `public/images/blog-1.jpg` | Strength training workout thumbnail | `1:1` (`600×600`) | Section 9 The Edit article 1 |
| `public/images/blog-2.jpg` | Meal prep & protein nutrition thumbnail | `4:5` (`600×750`) | Section 9 The Edit article 2 |
| `public/images/split-cta-bg.jpg` | Female trainer coaching client 1-on-1 | `2:3` (`900×1350`) | Section 10 bottom split CTA left image |
| `public/images/footer-1.jpg` to `4` | 4 square fitness lifestyle previews | `1:1` (`300×300`) | Persistent Footer visual preview strip |

---

## 4. Interactive Call-to-Action (CTA) Mapping

Every button and link on the homepage connects to a verified, meaningful destination with zero dead links:

| Section | CTA Label | Component / Element | Destination Route | Action |
|---|---|---|---|---|
| **Header** | `START TODAY` | `Button (variant="blush")` | `/appointments` | Opens booking consultation page |
| **Section 0 (Hero)** | `START TODAY` | `Button (variant="blush")` | `/appointments` | Opens booking consultation page |
| **Section 1 (Comparison)** | `BOOK YOUR CONSULTATION` | `Button (variant="primary")` | `/appointments` | Direct consultation booking |
| **Section 4 (Card 1)** | `EXPLORE ONLINE COACHING` | `Button (variant="outline-cream")` | `/services` | Navigates to services overview |
| **Section 4 (Card 2)** | `BOOK IN-PERSON TRAINING` | `Button (variant="primary")` | `/appointments` | Opens consultation / session booking |
| **Section 4 (Card 3)** | `APPLY FOR HYBRID` | `Button (variant="primary")` | `/appointments` | Direct application / consultation |
| **Section 4 (Callout)** | `START YOUR JOURNEY` | `Button (variant="primary")` | `/appointments` | Direct onboarding booking |
| **Section 5 (Coach Bio)** | `LEARN MORE ABOUT COACHING` | `Button (variant="primary")` | `/about` | Explores coach story & philosophy |
| **Section 7 (App Showcase)** | `DOWNLOAD ON THE APP STORE` | `Button (variant="blush")` | `/appointments` | App onboarding link |
| **Section 7 (App Showcase)** | `GET IT ON GOOGLE PLAY` | `Button (variant="blush")` | `/appointments` | App onboarding link |
| **Section 8 (Lead Magnet)** | `DOWNLOAD NOW` | `StarterGuideForm` submit | Client-side feedback | Validates email and shows confirmation |
| **Section 9 (The Edit)** | `EXPLORE COACHING` | `Button (variant="primary")` | `/services` | Navigates to coaching details |
| **Section 9 (Articles)** | `Read More →` | `TextLink` | `/services` | Reads full coaching guide |
| **Section 10 (Split CTA)** | `START TODAY` | `Button (size="oval")` | `/appointments` | Primary bottom conversion CTA |
| **Footer (VIP List)** | `SIGN UP` | `NewsletterForm` submit | Client-side feedback | Validates email and shows confirmation |

