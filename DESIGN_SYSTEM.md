# DESIGN SYSTEM SPECIFICATION — Women's Fitness Coaching

This design system is reverse-engineered with 100% fidelity from the reference website (**Hot Core Pilates** — `https://manatee-bumblebee-yawb.squarespace.com/`), adapted for a high-end **Women's Fitness Coaching** business (online fitness coaching and in-person personal training).

---

## 1. Color System

The palette features high-contrast editorial tones: rich deep burgundy, soft dusty blush, warm cream, and warm sand. Stereotypical bright pink fitness styling is explicitly avoided in favor of this grounded luxury aesthetic.

### Core Brand Palette

| Token Name | HEX Value | RGB | HSL | Semantic Role | Reference Usage |
|---|---|---|---|---|---|
| `--color-burgundy` | `#4A1C21` | `rgb(74, 28, 33)` | `353°, 42%, 20%` | Primary Dark Surface, Primary Headings, Solid CTA Fill | Header background, `YOU WANT:` card, solid pill buttons, display text on cream |
| `--color-blush` | `#E9C9CF` | `rgb(233, 201, 207)` | `349°, 42%, 85%` | Primary Dark Accent, Text on Dark, Secondary Surface | Section 1 & 10 background, site title wordmark, button text on burgundy |
| `--color-cream` | `#F7EDE4` | `rgb(247, 237, 228)` | `28°, 54%, 93%` | Primary Light Surface, Light Background | Body background (`theme="bright-inverse"`), mobile navigation drawer, `YOU'VE TRIED:` card |
| `--color-sand` | `#EDD8C4` | `rgb(237, 216, 196)` | `29°, 55%, 85%` | Accent Surface, Highlight Pill CTA | Testimonials title card, Advanced class tab, VIP newsletter `SIGN UP` pill |
| `--color-white` | `#FFFFFF` | `rgb(255, 255, 255)` | `0°, 0%, 100%` | Card Surface, Input Background | Testimonials bento card, newsletter text inputs |
| `--color-espresso` | `#2C1107` | `rgb(44, 17, 7)` | `16°, 73%, 10%` | Deep Neutral Text on Sand | Text on sand buttons and blog excerpt copy |
| `--color-border-input` | `#333333` | `rgb(51, 51, 51)` | `0°, 0%, 20%` | Input Border | Form inputs in lead magnet and footer newsletter |

### Semantic Tokens

```css
:root {
  --color-bg-primary: var(--color-cream);
  --color-bg-secondary: var(--color-blush);
  --color-bg-dark: var(--color-burgundy);
  --color-bg-accent: var(--color-sand);
  
  --color-text-primary: var(--color-burgundy);
  --color-text-secondary: var(--color-espresso);
  --color-text-on-dark: var(--color-blush);
  --color-text-on-dark-light: var(--color-cream);
  
  --color-border: rgba(74, 28, 33, 0.15);
  --color-border-dark: rgba(233, 201, 207, 0.2);
}
```

---

## 2. Typography System

The typography pairs a bold, punchy sans-serif display face with casual handwritten script accents, precision monospaced navigation, and clean readable body copy.

### Font Families

| Role | Font Family | Google Font / Source | Weight(s) | Fallback | CSS Variable |
|---|---|---|---|---|---|
| **Display Headings** | `Lilita One` | Google Fonts (`next/font/google`) | `400` | `sans-serif` | `var(--font-display)` |
| **Accent Script** | `La Belle Aurore` | Google Fonts (`next/font/google`) | `400` | `cursive` | `var(--font-script)` |
| **Navigation & Badges** | `Sometype Mono` | Google Fonts (`next/font/google`) | `400`, `700` | `monospace` | `var(--font-mono)` |
| **Body & Buttons** | `Roboto` | Google Fonts (`next/font/google`) | `400`, `500`, `700` | `sans-serif` | `var(--font-body)` |

### Tracking & Letter Spacing

- **Display Headings:** `-0.03em` (`--tracking-display`)
- **Navigation & Badges:** `-0.06em` (`--tracking-nav`)
- **Body & Buttons:** `-0.02em` (`--tracking-body`)

### Fluid Type Scale

| Scale Token | Fluid CSS Clamp / Size | Desktop Target (1440px) | Mobile Target (375px) | Line Height | Usage |
|---|---|---|---|---|---|
| `--text-marquee-size` | `clamp(3.5rem, 15.37vw, 13.835rem)` | `221.36px` | `56px` | `1.0` | Infinite scrolling banners |
| `--text-hero-h1-size` | `clamp(2.8rem, 12.99vw, 11.694rem)` | `187.1px` | `48.7px` | `1.0` | Hero section H1 |
| `--text-footer-wordmark-size` | `clamp(2.5rem, 12.91vw, 11.619rem)` | `185.9px` | `48.4px` | `0.95` | Footer bottom wordmark |
| `--text-h2-size` | `clamp(1.875rem, 3.88vw, 3.492rem)` | `55.872px` | `30px` | `1.1` | Section titles |
| `--text-site-title-size` | `clamp(1.5rem, 2.77vw, 2.495rem)` | `39.92px` | `24px` | `1.2` | Header logo wordmark |
| `--text-h3-size` | `1.5rem` | `24px` | `20px` | `1.2` | Subheadings, stats |
| `--text-h4-size` | `1.224rem` | `19.584px` | `18px` | `1.25` | Card headings, footer titles |
| `--text-body-large-size` | `1.415rem` | `22.64px` | `18px` | `1.4` | Hero caption, pull-quotes |
| `--text-header-cta-size` | `0.983rem` | `15.728px` | `14px` | `1.2` | Header `START TODAY` button |
| `--text-body-size` | `1.091rem` | `17.456px` | `16px` | `1.5` | Standard body paragraphs |
| `--text-body-small-size` | `0.875rem` | `14px` | `13px` | `1.5` | Footers, captions, navigation |
| `--text-caption-size` | `0.75rem` | `12px` | `11px` | `1.4` | Badges, legal notes |

### Inline Script Styling Convention

Inline `<em>` tags within any `EditorialHeading` automatically render in `--font-script`:
```css
.editorial-heading em {
  font-family: var(--font-script);
  font-style: italic;
  font-weight: 400;
  text-transform: none;
  letter-spacing: normal;
}
```
**Examples:**
- `TURN UP <em>the</em> HEAT.`
- `THE GLOW <em>is</em> REAL.`
- `TIRED OF WORKOUTS THAT <em>Don’t</em> WORK?`
- `Meet <em>Ava</em>`

---

## 3. Spacing & Layout System

### Content Widths

| Container Variant | CSS Variable | Max Width | Usage |
|---|---|---|---|
| **Standard** | `--site-max-width` | `1500px` | Main content container, headers, footers |
| **Wide** | `--site-max-width-wide` | `1720px` | Edge-padded visual strips, galleries |
| **Narrow** | `--site-max-width-narrow` | `1080px` | Manila folder cards, centered lead magnets, articles |
| **Full** | `100%` | `100vw` | Full-bleed hero video, marquee banners, split sections |

### Responsive Gutters

- **Desktop (`>768px`):** `--site-gutter: 4vw;`
- **Mobile (`≤768px`):** `--site-gutter: 6vw;`

### Section Vertical Padding

- **Large (`--section-padding-y-lg`):** `95.04px` desktop / `64px` mobile (Testimonials bento, App showcase)
- **Medium (`--section-padding-y-md`):** `47.52px` desktop / `36px` mobile (Lead magnet, Blog preview)
- **Small (`--section-padding-y-sm`):** `24px` desktop / `16px` mobile (Dividers, badges)

### Grid Gaps

- **Extra Small (`--grid-gap-xs`):** `3px`
- **Small (`--grid-gap-sm`):** `11px` (Press strip, thumbnails)
- **Medium (`--grid-gap-md`):** `20px` (Bento grids, comparison cards)
- **Large (`--grid-gap-lg`):** `32px` (Multi-column feature sections)

---

## 4. Shape & Elevation

### Corner Radii

| Token Name | Value | Reference Usage |
|---|---|---|
| `--radius-pill` | `300px` (`rounded-full`) | All CTA buttons, header button, mobile button, badge pills |
| `--radius-card-lg` | `20px` | Section 1 comparison cards (`YOU'VE TRIED:`, `YOU WANT:`) |
| `--radius-card-md` | `10px` | Testimonial bento cards, folder cards, app feature box |
| `--radius-input` | `0px` | Form inputs (strict rectangular inputs with 1px border) |

### Elevation & Box Shadows

- **Strict flat design:** `box-shadow: none` (`--shadow-none`).
- High-contrast background color blocking creates depth without simulated skeuomorphic dropshadows.

---

## 5. Animation & Interaction Conventions

### Micro-Interactions

| Element | State | Transition | Visual Feedback |
|---|---|---|---|
| **Pill Button** | `:hover` | `opacity 0.1s linear` | `opacity: 0.8` |
| **Header Link** | `:hover` | `opacity 0.1s linear` | `opacity: 0.8` |
| **Active Nav Link** | `active` | Instant | `underline underline-offset-4` |
| **Sticky Header** | `scrollY > 15px` | `colors 0.2s ease` | Transparent → solid Deep Burgundy (`#4A1C21`) |
| **Dropdown Menu** | `:hover` / `:focus` | Instant / Fade | Right-aligned `#4A1C21` panel with blush text |
| **Mobile Drawer** | Toggle | Smooth slide / opacity | Full-screen Warm Cream (`#F7EDE4`), body scroll locked |
| **Marquee Banner** | Running | Continuous CSS | `28s linear infinite` translation (`translate3d(-50%, 0, 0)`) |

### Reduced Motion Support

When `prefers-reduced-motion: reduce` is detected:
- Smooth scrolling is disabled (`scroll-behavior: auto`).
- Marquee animations pause into a static display (`animation: none`).
- All transition durations collapse to `0.01ms`.
