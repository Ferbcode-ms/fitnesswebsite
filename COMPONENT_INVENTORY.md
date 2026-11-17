# COMPONENT INVENTORY — Women's Fitness Coaching Website

Components are designed to **100% preserve the reference visual layout, color tokens, typography, and interactions** while keeping Server Components as the default (`"use client"` only where state, DOM scroll/hover, or browser interaction is genuinely needed).

---

## 1. Layout & Navigation Components

| Component Name | Purpose | Appears On | Key Props | Client-Side Interactivity |
|---|---|---|---|---|
| **`SiteHeader`** | Fixed `82.6px` top navbar with wordmark, 7-item nav, hover dropdowns (`SERVICES`, `BONUS PAGES`), social icons, `BOOK A CLASS` / `BOOK A CONSULT` pill CTA, and `.shrink` scroll state (`transparent` -> `#4A1C21`). | All pages (global layout) | `theme?: 'hero-dark' \| 'blush' \| 'burgundy' \| 'photo-light'` (adapts initial text/CTA colors to match page's top section) | **Yes (`"use client"`)** — scroll listener for `.shrink`, hover/focus dropdown state, active route underline, mobile drawer toggle |
| **`MobileMenuOverlay`** | Full-screen `#F7EDE4` drawer (`≤768px`) with `×` close, centered wordmark, `31.89px` `Sometype Mono` centered links, submenu drill-down (`SERVICES >`, `BONUS PAGES >`, `< BACK`), social icons, and `BOOK A CLASS` pill. | All pages (`≤768px`) | `isOpen: boolean`, `onClose: () => void`, `navItems: NavItem[]` | **Yes (`"use client"`)** — open/close state, submenu stack |
| **`SiteFooter`** | `#4A1C21` footer with `1px` top border, 4-thumbnail strip + social icons, `JOIN THE VIP LIST` email form (`#EDD8C4` `SIGN UP` pill), `EXPLORE` nav links, `CONTACT` placeholders, full-width `185.9px` wordmark, and credit line. | All pages (global layout) | `brandName: string`, `contactInfo`, `exploreLinks` | **No** (wraps `NewsletterForm` client island) |

---

## 2. Typography & Motion Primitives

| Component Name | Purpose | Appears On | Key Props | Client-Side Interactivity |
|---|---|---|---|---|
| **`EditorialHeading`** | Renders `Lilita One` uppercase headings with inline `<em>` words styled in `--font-script` (`italic`, `text-transform: none`, `letter-spacing: normal`) matching `TURN UP the HEAT.`, `THE GLOW is REAL.`, `Meet [Coach]`, etc. | All pages | `as: 'h1' \| 'h2' \| 'h3' \| 'h4'`, `parts: Array<{ text: string; script?: boolean }>`, `className?: string` | **No** (Server Component) |
| **`PillButton`** | Reusable `300px`-radius pill CTA supporting solid `#4A1C21` (`#E9C9CF` / `#F7EDE4` text), blush `#E9C9CF` (`#4A1C21` text), sand `#EDD8C4` (`#2C1107` text), and outline (`0.8px solid #F7EDE4`) variants with `opacity: 0.8` hover (`0.1s linear`). | All pages | `href?: string`, `variant: 'burgundy' \| 'blush' \| 'sand' \| 'outline-cream'`, `size?: 'sm' \| 'md' \| 'lg' \| 'oval'`, `children` | **No** (Server Component using `next/link` or `<button>`) |
| **`MarqueeBanner`** | Full-bleed continuous horizontal scrolling `221.36px` `Lilita One` display banner (respects `prefers-reduced-motion`). | `/`, `/about`, `/classes`, `/single-service`, `/the-app`, `/appointments` | `text: string`, `separator?: string` (`/` or `\`), `theme?: 'cream' \| 'burgundy' \| 'blush'` | **No** (pure CSS `@keyframes` marquee — zero JS overhead) |
| **`RevealOnScroll`** | Replicates Squarespace's `.preFade` -> `.fadeIn` (`0.9s ease` opacity transition) when elements enter viewport. | Optional wrapper for major blocks | `delay?: number`, `children` | **Yes (`"use client"`)** — lightweight `IntersectionObserver` |

---

## 3. Section & Card Components

| Component Name | Purpose | Appears On | Key Props | Client-Side Interactivity |
|---|---|---|---|---|
| **`VideoHero`** | Full-bleed `854px` (`1440w`) looping muted video hero with SVG rounded bottom clip-path (`~29px` over `#E9C9CF`), bottom-left caption, bottom-right `PillButton`, and centered bottom `EditorialHeading` H1. | `/` | `videoSrc`, `posterSrc`, `caption`, `ctaLabel`, `ctaHref`, `headingParts` | **No** (native `<video autoPlay muted loop playsInline>`) |
| **`SplitFeatureSection`** | Two-column editorial split (50/50 bleed photo or padded portrait + text/CTA) supporting both `Meet [Coach]` and bottom `READY to FEEL THE HEAT?` sections. | `/`, `/about`, `/classes`, `/single-service`, `/the-app`, `/contact`, `/sales-page` | `theme`, `imageSide: 'left' \| 'right'`, `bleed?: boolean`, `image`, `eyebrow?`, `heading`, `body`, `cta?` | **No** (Server Component) |
| **`ComparisonCardsSection`** | `#E9C9CF` section with intro heading, offset `20px`-radius cards (`YOU'VE TRIED:` in `#F7EDE4` and `YOU WANT:` in `#4A1C21`), overlapping SVG stickers, and bottom callout + CTA. | `/` | `intro`, `triedCard`, `wantCard`, `stickers`, `bottomCallout` | **No** (Server Component) |
| **`TestimonialsBento`** | `#4A1C21` (`light-bold`) asymmetric 5-card bento grid (`10px` radius, `#EDD8C4`, `#FFFFFF`, `#E9C9CF`, `#F7EDE4`) with 5-star line, H4 quote title, body, and circular avatar + client placeholder name. | `/`, `/classes`, `/single-service`, `/the-app` | `heading`, `items: TestimonialItem[4]` | **No** (Server Component) |
| **`FolderProgrammeCard`** | `1091px` wide `10px`-radius programme/class card with staggered `327×114px` top folder tab (`BEGINNER` / `INTERMEDIATE` / `ADVANCED`), square image left, and centered text + CTA right. | `/`, `/classes` | `tabLabel`, `tabAlign: 'left' \| 'mid' \| 'right'`, `theme: 'burgundy' \| 'blush' \| 'sand'`, `eyebrow`, `title`, `paragraphs`, `image`, `cta` | **No** (Server Component) |
| **`PressLogoStrip`** | Horizontal credibility strip (`Featured in` + 5 contained `136×68px` logos/badges). | `/` | `label: string`, `logos: LogoItem[]` | **No** (Server Component) |
| **`AppShowcaseSection`** | Full-bleed parallax-style background image section with H2, dual `#E9C9CF` App Store / Google Play pill buttons, overlapping `#4A1C21` `10px`-radius pocket features card, and right-aligned phone mockup. | `/` (and adapted blocks on `/the-app`) | `bgImage`, `heading`, `storeLinks`, `cardTitle`, `cardIntro`, `features`, `phoneMockup` | **No** (Server Component) |
| **`LeadMagnetFormSection`** | `#F7EDE4` centered lead-magnet section flanked by 2 offset vertical photos, bullet points, and 4-column horizontal form (`First Name`, `Last Name`, `Email Address`, `DOWNLOAD NOW`). | `/`, `/blog`, `/shop` | `heading`, `intro`, `bullets`, `sideImages`, `formEndpoint` | **No** (wraps `StarterGuideForm` client island) |
| **`BlogPreviewSection`** | 3-column `THE HOT EDIT` / `THE EDIT` section (left intro + CTA, 2 article cards with thumbnail, excerpt, `Read more →`). | `/` | `eyebrow`, `heading`, `cta`, `posts: BlogPost[2]` | **No** (Server Component) |

---

## 4. Interactive Page-Specific Components (`"use client"`)

| Component Name | Purpose | Appears On | Key Props | Client-Side Interactivity |
|---|---|---|---|---|
| **`NewsletterForm`** / **`StarterGuideForm`** | Handles email & name input state, basic validation, and submission feedback (client-side confirmation state or API route). | `/` (Sec 8 & Footer), `/blog`, `/shop`, global Footer | `variant: 'starter-guide' \| 'vip-footer'` | **Yes (`"use client"`)** |
| **`FaqAccordion`** | Expandable 5-item Q&A list (`+` / `×` toggle) with smooth height/opacity transition. | `/classes`, `/sales-page` | `heading`, `items: Array<{ question: string; answer: string }>` | **Yes (`"use client"`)** |
| **`TestimonialCarousel`** | 3-slide horizontal quote slider with Prev/Next arrow controls. | `/about`, `/shop` | `slides: Array<{ quote: string; author: string }>` | **Yes (`"use client"`)** |
| **`BlogFilterBar`** | Category pill filters (`TRAINING`, `RECIPES`, `NUTRITION`, `LIFESTYLE`) + live `Search` input filtering the post grid. | `/blog` | `categories: string[]`, `posts: BlogPost[]` | **Yes (`"use client"`)** |
| **`ShopCatalog`** | Filterable product/plan grid (`All`, `Plans`, `Essentials`) with category dropdown and Sale badge. | `/shop` | `products: ProductItem[]` | **Yes (`"use client"`)** |
| **`ContactForm`** | Structured coaching inquiry form (Name, Email, Interest dropdown, Message, `Submit` pill). | `/contact` | `servicesOptions: string[]` | **Yes (`"use client"`)** |
| **`PricingTiersSection`** | 2-column (`$...` coaching containers) or 3-column (`BEST VALUE` badge) membership/programme comparison cards. | `/classes`, `/single-service`, `/the-app`, `/sales-page` | `tiers: PricingTier[]` | **No** (Server Component) |
| **`BookingEmbed`** | Consultation/session booking container (supports Acuity/Calendly embed or native booking request placeholder). | `/appointments` | `embedUrl?: string` | **Yes (`"use client"`)** if interactive |

