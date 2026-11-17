# COMPONENT STATUS — Phase 2 Design System & Visual Foundation

This document tracks all reusable components implemented in Phase 2 versus remaining components scheduled for Phase 3 (page visual implementation).

---

## 1. Implemented Components (Phase 2)

| Component | File Location | Purpose & Reference Source | Key Props | Component Type | Status |
|---|---|---|---|---|---|
| **`Container`** | `src/components/ui/Container.tsx` | Max-width content boundary with fluid gutters (`4vw` desktop, `6vw` mobile). Supports `standard` (1500px), `wide` (1720px), `narrow` (1080px), and `full`. | `variant?: 'standard' \| 'wide' \| 'narrow' \| 'full'`, `as?: ElementType`, `className?: string`, `children: ReactNode` | Server Component | **Implemented & Verified** |
| **`Button`** | `src/components/ui/Button.tsx` | Universal pill button (`300px` radius) matching reference CTAs. Supports `primary` (#4A1C21), `secondary` (outline), `blush` (#E9C9CF), `sand` (#EDD8C4), `outline-cream` (#F7EDE4), and `link`. Includes loading spinner and disabled states. Polymorphic (renders Next.js `Link` when `href` is supplied, `<button>` otherwise). | `variant?: ButtonVariant`, `size?: 'sm' \| 'md' \| 'lg' \| 'oval'`, `href?: string`, `iconLeft?: ReactNode`, `iconRight?: ReactNode`, `isLoading?: boolean`, `disabled?: boolean` | Polymorphic Component | **Implemented & Verified** |
| **`EditorialHeading`** | `src/components/ui/EditorialHeading.tsx` | Bold display heading in `Lilita One` with inline `<em>` tags styled in handwritten script (`La Belle Aurore`). Recreates `TURN UP <em>the</em> HEAT.`, `THE GLOW <em>is</em> REAL.`, `TIRED OF WORKOUTS THAT <em>Don’t</em> WORK?`, etc. | `as?: 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'span' \| 'div'`, `size?: 'hero' \| 'marquee' \| 'site-title' \| 'h2' \| 'h3' \| 'h4'`, `className?: string`, `children: ReactNode` | Server Component | **Implemented & Verified** |
| **`Card`** | `src/components/ui/Card.tsx` | Flat surface card with reference background colors (`cream`, `blush`, `sand`, `burgundy`, `white`) and corner radii (`10px`, `20px`, `pill`). Zero box-shadow. | `theme?: CardTheme`, `radius?: CardRadius`, `as?: ElementType`, `className?: string`, `children: ReactNode` | Server Component | **Implemented & Verified** |
| **`Badge`** | `src/components/ui/Badge.tsx` | Monospace pill badge (`Sometype Mono`, `12px`, uppercase, `-0.06em` tracking) for class levels, status tags, and "BEST VALUE" markers. | `variant?: 'burgundy' \| 'blush' \| 'sand' \| 'cream' \| 'outline'`, `className?: string`, `children: ReactNode` | Server Component | **Implemented & Verified** |
| **`TextLink`** | `src/components/ui/TextLink.tsx` | Accessible text link with consistent hover opacity and typography variants (`mono`, `body`, `display`). | `href: string`, `variant?: 'mono' \| 'body' \| 'display'`, `underline?: boolean`, `className?: string`, `children: ReactNode` | Server Component | **Implemented & Verified** |
| **`IconButton`** | `src/components/ui/IconButton.tsx` | Accessible icon-only button wrapper with `aria-label`, hover opacity, and accessible focus outlines. | `size?: 'sm' \| 'md' \| 'lg'`, `aria-label: string`, `className?: string`, `children: ReactNode` | Server Component | **Implemented & Verified** |
| **`ImageWrapper`** | `src/components/ui/ImageWrapper.tsx` | Image foundation primitive wrapping Next.js `Image`. Enforces aspect ratio retention (`1/1`, `4/5`, `16/9`, `3/4`, `436/436`, `436/427`), prevents CLS, handles object-fit/position, and standardizes corner radii. | `aspectRatio?: ImageAspectRatio`, `radius?: ImageCornerRadius`, `priority?: boolean`, `sizes?: string`, `className?: string`, `imageClassName?: string`, standard Next.js `ImageProps` | Server Component | **Implemented & Verified** |
| **`MarqueeBanner`** | `src/components/ui/MarqueeBanner.tsx` | Pure CSS infinite horizontal scrolling marquee in `Lilita One` (`clamp(3.5rem, 15.37vw, 13.835rem)`). Fluid typography, zero JavaScript runtime, pauses on hover, and pauses gracefully under `prefers-reduced-motion`. | `text: string`, `separator?: string`, `theme?: 'cream' \| 'burgundy' \| 'blush' \| 'sand'`, `repeat?: number`, `className?: string`, `ariaLabel?: string` | Server Component | **Implemented & Verified** |
| **`Header`** | `src/components/layout/Header.tsx` | Fixed sticky header (`82.6px` height) with `.shrink` scroll state transition, brand wordmark, desktop nav, and `START TODAY` pill CTA. | None (consumes centralized `siteConfig` and `navigationConfig`) | Client Component (`"use client"`) | **Implemented & Verified** |
| **`Navigation`** | `src/components/layout/Navigation.tsx` | Desktop primary navigation (`Sometype Mono`, `14px`, uppercase, `-0.06em` tracking). Includes hover/click dropdown for `Services` (`Classes`, `Single Service`) and active route underline indicator. | None (consumes `navigationConfig`) | Client Component (`"use client"`) | **Implemented & Verified** |
| **`MobileNavigation`** | `src/components/layout/MobileNavigation.tsx` | 2-line hamburger button and full-screen `#F7EDE4` warm cream drawer overlay. Features `31.89px` links, submenu drill-down with `< Back`, `START TODAY` CTA, body scroll locking, and ESC key dismissal. | None (consumes `navigationConfig`) | Client Component (`"use client"`) | **Implemented & Verified** |
| **`Footer`** | `src/components/layout/Footer.tsx` | 4-column footer in Deep Burgundy (`#4A1C21`): visual thumbnail strip, VIP newsletter signup, Explore navigation, Contact placeholders, and bottom full-bleed wordmark in `Lilita One`. | None (consumes `siteConfig` and `navigationConfig`) | Server Component (wraps `NewsletterForm`) | **Implemented & Verified** |
| **`NewsletterForm`** | `src/components/forms/NewsletterForm.tsx` | Interactive email subscription form supporting VIP footer signup and lead-magnet capture. Features rectangular input (`0px` radius, `1px` border) and sand pill button (`#EDD8C4`). | `variant?: 'vip-footer' \| 'starter-guide'`, `className?: string` | Client Component (`"use client"`) | **Implemented & Verified** |

---

## 2. Component Props Specification

### `Container`
```typescript
export type ContainerVariant = "standard" | "wide" | "narrow" | "full";

export interface ContainerProps {
  as?: ElementType;
  variant?: ContainerVariant; // standard (1500px) | wide (1720px) | narrow (1080px) | full (100%)
  className?: string;
  children: ReactNode;
  id?: string;
}
```

### `Button`
```typescript
export type ButtonVariant = "primary" | "secondary" | "blush" | "sand" | "outline-cream" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "oval";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string; // If provided, renders as Next.js Link; otherwise <button>
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}
```

### `EditorialHeading`
```typescript
export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "span" | "div";
export type HeadingSize = "hero" | "marquee" | "site-title" | "h2" | "h3" | "h4";

export interface EditorialHeadingProps {
  as?: HeadingLevel;
  size?: HeadingSize;
  className?: string;
  children: ReactNode; // Inline <em> automatically renders in --font-script
  id?: string;
}
```

### `Card`
```typescript
export type CardTheme = "cream" | "blush" | "sand" | "burgundy" | "white";
export type CardRadius = "none" | "md" | "lg" | "pill";

export interface CardProps {
  as?: ElementType;
  theme?: CardTheme;
  radius?: CardRadius; // md (10px) | lg (20px) | pill (300px)
  className?: string;
  children: ReactNode;
  id?: string;
}
```

### `ImageWrapper`
```typescript
export type ImageAspectRatio = "1/1" | "4/5" | "16/9" | "3/4" | "436/436" | "436/427" | "auto";
export type ImageCornerRadius = "none" | "md" | "lg" | "pill";

export interface ImageWrapperProps extends Omit<ImageProps, "className"> {
  aspectRatio?: ImageAspectRatio;
  radius?: ImageCornerRadius;
  className?: string;
  imageClassName?: string;
}
```

### `MarqueeBanner`
```typescript
export type MarqueeTheme = "cream" | "burgundy" | "blush" | "sand";

export interface MarqueeBannerProps {
  text: string;
  separator?: string; // Default: "/"
  theme?: MarqueeTheme;
  repeat?: number; // Number of duplicated strings in the track (default: 4)
  className?: string;
  ariaLabel?: string;
}
```

---

## 3. Remaining Components (Reserved for Phase 3 & Beyond)

These components represent page-specific composite sections and feature blocks scheduled for Phase 3 (Homepage Visual Implementation) and subsequent page builds:

| Component Name | Planned File Location | Target Phase | Purpose in Reference |
|---|---|---|---|
| **`VideoHero`** | `src/components/sections/VideoHero.tsx` | Phase 3 | Full-bleed looping video hero with bottom headline, subcaption, CTA, and SVG bottom rounded divider. |
| **`ComparisonCardsSection`** | `src/components/sections/ComparisonCardsSection.tsx` | Phase 3 | `YOU'VE TRIED:` vs `YOU WANT:` 20px-radius offset cards with SVG dumbbell/ball line art. |
| **`TestimonialsBento`** | `src/components/sections/TestimonialsBento.tsx` | Phase 3 | Asymmetric 5-card bento grid (`10px` radius, `#EDD8C4`, `#FFFFFF`, `#E9C9CF`, `#F7EDE4`) with star ratings. |
| **`FolderProgrammeCard`** | `src/components/sections/FolderProgrammeCard.tsx` | Phase 3 | Manila-folder tabbed cards (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`) with 2-column image/copy split. |
| **`SplitFeatureSection`** | `src/components/sections/SplitFeatureSection.tsx` | Phase 3 | Two-column editorial split (Coach bio `Meet [Coach]` and bottom `READY to FEEL THE HEAT?` split CTA). |
| **`PressLogoStrip`** | `src/components/sections/PressLogoStrip.tsx` | Phase 3 | Horizontal credibility strip (`Featured in` + 5 contained logo badges). |
| **`AppShowcaseSection`** | `src/components/sections/AppShowcaseSection.tsx` | Phase 3 | Full-bleed background with pocket features card, app store buttons, and phone mockup. |
| **`LeadMagnetFormSection`** | `src/components/sections/LeadMagnetFormSection.tsx` | Phase 3 | Centered starter guide offer with 4-column form (`First Name`, `Last Name`, `Email`, `Download Now`). |
| **`BlogPreviewSection`** | `src/components/sections/BlogPreviewSection.tsx` | Phase 3 | `THE EDIT` 3-column article summary cards. |
| **`FaqAccordion`** | `src/components/sections/FaqAccordion.tsx` | Phase 4+ | Expandable 5-item Q&A list with smooth height toggle. |
| **`TestimonialCarousel`** | `src/components/sections/TestimonialCarousel.tsx` | Phase 4+ | 3-slide horizontal quote slider with Prev/Next controls. |
| **`ContactForm`** | `src/components/sections/ContactForm.tsx` | Phase 4+ | Multi-field inquiry form for personal training and coaching. |
