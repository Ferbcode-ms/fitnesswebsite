# REFERENCE ANALYSIS — Hot Core Pilates

**Reference URL:** `https://manatee-bumblebee-yawb.squarespace.com/`  
**Page Title:** `Hot Core Pilates`  
**Platform:** Squarespace 7.1 (Fluid Engine)  
**Inspection Date:** 2026-11-12  
**Access Status:** Publicly accessible (HTTP 200, no login or password gate).

---

## 1. Website Overview

**Hot Core Pilates** is a reformer Pilates studio and fitness membership brand led by founder **Ava**. The site is built on Squarespace 7.1 Fluid Engine using a high-contrast editorial palette of **Deep Burgundy (`#4A1C21`)**, **Dusty Blush Pink (`#E9C9CF`)**, **Warm Cream (`#F7EDE4`)**, and **Warm Sand (`#EDD8C4`)**, paired with bold uppercase display typography (**Lilita One**), casual italic signature script accents (`script` via `<em>` tags), monospaced navigation (**Sometype Mono**), and clean sans-serif body copy (**Roboto**).

### Key Design & Structural Characteristics
- **Fluid Engine 24-column desktop grid** (`26` CSS grid tracks including outer `4vw` gutters; max site width `1500px`). On mobile (`≤767px`), Fluid Engine collapses to an **8-column grid** (`10` tracks including `6vw` outer gutters).
- **Sticky fixed header** (`82.6px` height at `1440px`) that starts transparent over the top section and transitions to solid `#4A1C21` (`.shrink`) upon scrolling.
- **Full-bleed looping background video hero** with SVG clip-path rounded bottom corners (~`29px` radius) transitioning cleanly onto `#E9C9CF`.
- **Distinctive UI motifs:**
  - Pill-shaped buttons (`border-radius: 300px`) across all CTAs and form submit buttons.
  - Overlapping SVG-backed rounded cards (`10px` and `20px` radii) with zero box-shadow.
  - Manila folder-tabbed class cards (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`).
  - Full-width scrolling marquee banners (`CHOOSE YOUR CLASS /`, `CHOOSE YOUR HEAT \`, etc.).
  - Editorial serif/sans-serif mixed headings where select words use `<em>` in the custom `script` font.
- **Note on Template Artifacts:** Several template artifacts exist in the live reference site:
  - Footer `EXPLORE` links `/work-with-me` and `/podcast`, plus Homepage `JOIN THE PROGRAM` links (`/work-with-me`), resolve to the site's `/404` page.
  - Several Homepage buttons (`BOOK YOUR FIRST CLASS`, `START YOUR JOURNEY`, `LEARN MORE`, `DOWNLOAD ON THE APP STORE`, `GET IT ON GOOGLE PLAY`, `READ THE BLOG`) have empty `href=""` attributes in the DOM (linking to `/`).
  - `/about` and `/shop` testimonial carousels still contain template placeholder copy mentioning `"ANNA"` (`"WORKING WITH ANNA..."`).
  - Footer includes hidden blank `squarespace.com` links in line breaks and credits `Template Designed by Row Creative` (`https://www.rowcreative.co/`).

---

## 2. Complete Page Inventory

16 routes were discovered and tested; **14 distinct live pages** loaded (plus `/home` aliasing `/` and `/work-with-me` & `/podcast` returning `/404`):

| Route | Document Title | Status | Desktop `scrollHeight` | Purpose |
|---|---|---|---|---|
| `/` (and `/home`) | `Hot Core Pilates` | Live (200) | `12,215px` | Main landing page |
| `/about` | `About — Hot Core Pilates` | Live (200) | `9,810px` | Brand story, stats, Ava bio, team, testimonials |
| `/classes` | `Classes — Hot Core Pilates` | Live (200) | `9,786px` | Class tiers, memberships, FAQ accordion |
| `/single-service` | `Single Service — Hot Core Pilates` | Live (200) | `9,551px` | 1:1 private coaching offer & pricing |
| `/the-app` | `The APP — Hot Core Pilates` | Live (200) | `8,528px` | Mobile app features, steps, membership tiers |
| `/blog` | `Blog — Hot Core Pilates` | Live (200) | `6,681px` | Blog index, category filter pills, search, author bio |
| `/blog/blog-post-title-four-...` | `Blog Post Four — Hot Core Pilates` | Live (200) | — | Individual blog article template |
| `/shop` | `Shop — Hot Core Pilates` | Live (200) | `7,371px` | Studio essentials storefront, product filters, Amazon/LTK |
| `/contact` | `Contact — Hot Core Pilates` | Live (200) | — | Studio inquiry form & contact intro |
| `/sales-page` | `Sales Page — Hot Core Pilates` | Live (200) | — | Long-form membership funnel with 5 video players & FAQ |
| `/link-in-bio` | `Link in Bio — Hot Core Pilates` | Live (200) | — | Social link-tree & numbered featured links |
| `/appointments` | `Book a Class — Hot Core Pilates` | Live (200) | — | Embedded Acuity Scheduling booking widget |
| `/404` | `404 — Hot Core Pilates` | Live (custom 404) | — | Custom error & recovery links page |
| `/course-1` | `Course 1 — Hot Core Pilates` | Live (200) | — | Squarespace Course progress & curriculum layout |
| `/work-with-me` | `404 — Hot Core Pilates` | Broken (404) | — | Linked from Homepage class cards & Footer |
| `/podcast` | `404 — Hot Core Pilates` | Broken (404) | — | Linked from Footer `EXPLORE` |

---

## 3. Header & Navigation Analysis

Measured at `1440×900` desktop viewport:

- **Container (`<header>`):** `position: fixed; top: 0; left: 0; width: 100% (1424.8px); height: 82.6px; padding: 0; border: 0; box-shadow: none; z-index: 2+`
- **Scroll Behavior:**
  - At `scrollY === 0` on Hero pages (`/`): Transparent background (`rgba(0, 0, 0, 0)`) overlaying the hero media.
  - On scroll (`scrollY > 0`): Squarespace adds `.shrink` class and transitions the header bar background to solid Deep Burgundy `#4A1C21` (`rgb(74, 28, 33)`). Height remains `82.6px` (no collapse).
  - On non-hero / dark-top pages (`/contact`, `/sales-page`, `/404`), header sits over `#4A1C21` theme; on `/about` (`theme="dark"` `#E9C9CF`), header text and CTA adapt to `#4A1C21` on `#E9C9CF`.
- **Logo / Site Title (Left):**
  - Text wordmark (no `<img>` logo): `HOT CORE PILATES` (`<a>` linking to `/`).
  - Position: `x: 57.6px, y: 18.2px`, dimensions `306.1 × 45.6px`.
  - Font: `"Lilita One"`, `39.92px`, weight `400`, line-height `47.904px` (`1.2`), letter-spacing `-1.1976px` (`-0.03em`), uppercase, color `#E9C9CF`.
- **Navigation Links (Right-aligned):**
  - Items in order:
    1. `ABOUT` (`/about`)
    2. `SERVICES` (dropdown `<button>`)
    3. `THE APP` (`/the-app`)
    4. `BLOG` (`/blog`)
    5. `SHOP` (`/shop`)
    6. `CONTACT` (`/contact`)
    7. `BONUS PAGES` (dropdown `<button>`)
  - Font: `"Sometype Mono"`, `14px`, weight `400`, line-height `16.8px` (`1.2`), letter-spacing `-0.84px` (`-0.06em`), uppercase, color `#E9C9CF`.
  - Item padding: `1.4px 0`, horizontal spacing between items: ~`17.3px`.
  - Active page indicator: `1px` underline under the active nav item (observed on `/about`, `/classes`, `/the-app`, `/blog`, `/shop`, `/contact`, `/sales-page`, etc.).
- **Social Icons (between nav & CTA):**
  - Facebook (`http://facebook.com`) and Instagram (`http://instagram.com`) SVG icons, `20×20px`, color `#E9C9CF`, `~17.3px` gap.
- **Header CTA Button:**
  - Label: `BOOK A CLASS` (`-> /appointments`).
  - Dimensions & position: `x: 1211.4px, y: 11.5px`, `155.8 × 59.6px`.
  - Typography: `"Lilita One"`, `15.728px`, weight `400`, letter-spacing `-0.47184px` (`-0.03em`), uppercase.
  - Styling: `background: #4A1C21`, `color: #E9C9CF` (or `#E9C9CF` fill with `#4A1C21` text on dark `#4A1C21` theme pages such as `/contact`, `/sales-page`, `/404`), `padding: 21px 30.8px`, `border-radius: 300px`, `border: none`.
  - Hover state: `opacity: 0.8` (`transition: opacity 0.1s linear`).
- **Dropdown Menus (`SERVICES` & `BONUS PAGES`):**
  - Trigger: Hover on desktop (`pointer-events` / CSS display toggle on `.header-nav-item--folder`).
  - Panel styling: `position: absolute; right: -14px; min-width: 200px; padding: 7px 14px; background: #4A1C21; box-shadow: none;`.
  - Item styling: Right-aligned `"Sometype Mono"`, `14px`, `#E9C9CF`.
  - `SERVICES` items: `Classes` (`/classes`), `Single Service` (`/single-service`).
  - `BONUS PAGES` items: `Sales Page` (`/sales-page`), `Link in Bio` (`/link-in-bio`), `Book a Class` (`/appointments`), `404` (`/404`), `Course 1` (`/course-1`).
- **Mobile Navigation (`≤768px`):**
  - Desktop nav links, social icons, and CTA button are hidden.
  - 2-line hamburger toggle (`Open Menu` / `Close Menu`) positioned on the left; centered `HOT CORE PILATES` wordmark.
  - Clicking opens a full-screen warm cream overlay (`#F7EDE4`) with `#4A1C21` text: top `×` close button + centered `HOT CORE PILATES` title, vertical centered list of `31.892px` `"Sometype Mono"` uppercase links (`ABOUT`, `SERVICES >`, `THE APP`, `BLOG`, `SHOP`, `CONTACT`, `BONUS PAGES >`), Facebook & Instagram icons, and a centered `#4A1C21` `BOOK A CLASS` pill button (`#F7EDE4` text). Tapping `SERVICES >` or `BONUS PAGES >` navigates to a sub-panel with `< BACK` and the submenu items.

---

## 4. Hero Section Analysis (Homepage `/`)

- **Section ID / Theme:** `699e72ee5fa9450ffd2f2eb3` (`theme="black"`)
- **Height & Bounds:** `854px` height (`y: 0` to `854px` at `1440×900`).
- **Layout Type:** Full-bleed background video with bottom-anchored asymmetrical editorial typography and CTA.
- **Background:**
  - Native Squarespace video player (`VideoBackgroundNative`) playing `video 7 (1).mp4` (`1942×1080`, `5.08s`, muted, looping) over `#4A1C21` fallback fill.
  - Bottom section divider uses SVG `clip-path` (`#section-divider-699e72ee5fa9450ffd2f2eb3`) to carve smooth ~`29px` rounded bottom corners revealing the `#E9C9CF` background of Section 1 below.
- **Element Positioning (at `1440×900`):**
  - **Sub-caption (Bottom-Left):** `SCULPT YOUR CORE. OWN YOUR CONFIDENCE.` at `x: 57.6, y: 547.9, w: 327.4, h: 67.9` — `"Roboto"`, `22.64px`, line-height `33.96px` (`1.5`), letter-spacing `-0.34912px`, `#E9C9CF`, left-aligned.
  - **CTA Button (Bottom-Right):** `START TODAY` (`-> /appointments`) at `x: 1211.4, y: 538.2, w: 147.9, h: 58.8` — `"Roboto"`, `14px`, weight `500`, uppercase, `#E9C9CF` text on `#4A1C21` pill (`padding: 21px 30.8px`, `border-radius: 300px`).
  - **Main Heading (`<h1>`, Bottom Full-Width):** `TURN UP the HEAT.` at `x: 57.6, y: 620.1, w: 1309.9, h: 204.7` — centered `"Lilita One"` `187.1px`, line-height `187.1px` (`1.0`), letter-spacing `-5.613px` (`-0.03em`), `#E9C9CF`. The word `the` is wrapped in `<em>` styled with `script` (`187.1px`, italic, `text-transform: none`, `letter-spacing: normal`).
- **Overlay Effects:** None (`bgOverlay: null`); video brightness/contrast naturally holds light `#E9C9CF` text.

---

## 5. Homepage Section-by-Section Breakdown (`1440×900`)

Total `<main>` height: `11,699px` (11 sections) + `<footer>` `516px` = `12,215px`.

### Section 0 — Hero (`y: 0–854`, `h: 854px`, `theme="black"`)
Documented in Section 4 above.

### Section 1 — Pain Points vs Outcomes (`y: 854–2933`, `h: 2079px`, `theme="dark"`)
- **Purpose:** Contrast client frustrations (`YOU'VE TRIED:`) with desired studio outcomes (`YOU WANT:`) and drive first-class booking.
- **Background:** `#E9C9CF` top (`1195px`), overlapping a full-width `#E9C9CF` SVG rectangle from `y: 2049.6` (`h: 882.7px`).
- **Layout:** Single centered Fluid Engine 24-column canvas (`padding: 0`, `gap: 0`).
- **Elements:**
  1. **Top-right decorative sticker:** `Pilates+element-1.png` (dumbbell line-art sticker, `x: 985.3, y: 910.6`, `218.3×199.3px`).
  2. **Intro H2 (centered, `w: 654.8px`):** `TIRED OF WORKOUTS THAT Don’t WORK?` (`55.872px`, `#4A1C21`; `Don’t` in `script`).
  3. **Intro paragraph (centered, `w: 654.8px`):** `At Hot Core Pilates, we build strong bodies and stronger energy. Expect deep core burns, sculpted lines, loud playlists, and that post-class glow you can’t fake.` (`17.456px`, `#4A1C21`).
  4. **Left Card (`YOU'VE TRIED:`):** `#F7EDE4` SVG rounded rectangle (`x: 275.9, y: 1337.7, 327.4×256.3px`, `20px` radius). Overlapped on top-left by grip-socks sticker `2.png` (`x: 166.7, y: 1326.9, 163.7×164px`). Bullet list (`17.456px`, `#4A1C21`): `Random gym sessions`, `Quick-fix challenges`, `Workouts that leave you bored`.
  5. **Right Card (`YOU WANT:`):** `#4A1C21` SVG rounded rectangle (`x: 821.5, y: 1907.2, 382×284.8px`, `20px` radius). Text in `#E9C9CF` (`19.584px` H4 heading + `17.456px` lines without bullet glyphs: `Visible tone`, `Real strength`, `A space that feels empowering — not intimidating`). Overlapped on bottom-right by pilates ball sticker `Pilates+elements.png` (`x: 1079.1, y: 2109, 194.2×194.4px`).
  6. **Bottom Callout:** Left-flanking dumbbell sticker `4.png` (`x: 275.9, y: 2337.8, 163.7×164px`), centered H2 (`w: 654.8px`) `HOT CORE PILATES WAS BUILT for WOMEN WHO WANT RESULTS AND ENERGY.`, `.sqsrte-large` (`22.64px`) `Low-impact. High burn. Maximum confidence.`, and centered pill CTA `BOOK YOUR FIRST CLASS` (`327.4×57px`, `#4A1C21` bg, `#E9C9CF` text, `href=""`).

### Section 2 — Testimonials Bento Grid (`y: 2932–3997`, `h: 1065px`, `theme="light-bold"`)
- **Purpose:** Social proof in an asymmetric 5-card bento grid.
- **Background:** `#4A1C21`; vertical padding `95.04px` top/bottom; `gap: 0px / 20px`.
- **Columns & Cards (all `10px` SVG corner radius, `#4A1C21` text):**
  - **Row 1 (height `399.1px`):**
    1. Left (`x: 168.4, w: 423.2px`, `#EDD8C4`): Title card `THE GLOW is REAL.` (`55.872px` H2, `is` in `script`).
    2. Middle (`x: 611.6, w: 312.4px`, `#FFFFFF`): `★ ★ ★ ★ ★`, `“MY ABS HAVE NEVER FELT THIS STRONG”`, quote, `Emily R.` with circular `35.4×35px` avatar.
    3. Right (`x: 944, w: 312.4px`, `#E9C9CF`): `★ ★ ★ ★ ★`, `“HOT CORE CHANGED MORE THAN JUST MY BODY.”`, quote, `Jessica M.` with circular avatar.
  - **Row 2 (height `390.4px`):**
    4. Left (`x: 168.4, w: 534px`, `#E9C9CF`): `★ ★ ★ ★ ★`, `“THE BURN IS REAL — AND SO ARE THE RESULTS.”`, quote, `Sarah T.` with circular avatar.
    5. Right (`x: 722.4, w: 534px`, `#F7EDE4`): `★ ★ ★ ★ ★`, `“IT’S THE ONLY WORKOUT I’VE STAYED CONSISTENT WITH.”`, quote, `Sarah T.` with circular avatar.

### Section 3 — Scrolling Marquee Banner (`y: 3997–4307`, `h: 310px`, `theme="bright-inverse"`)
- **Purpose:** Visual divider introducing the class lineup.
- **Background:** `#F7EDE4`.
- **Content:** Full-bleed horizontal scrolling `<h1>` text `CHOOSE YOUR CLASS /` (`Lilita One`, `221.36px`, line-height `309.904px`, letter-spacing `-6.6408px`, `#4A1C21`).

### Section 4 — Class Folder Cards & Onboarding Callout (`y: 4307–7505`, `h: 3198px`, `theme="bright-inverse"`)
- **Purpose:** Showcase 3 class levels in stacked manila-folder cards + beginner onboarding CTA.
- **Background:** `#F7EDE4`.
- **Folder Cards (`1091.3px` wide, `10px` radius, `327.4×113.9px` staggered tabs, 2-column inner split with square/near-square image left `436.5px` and centered text/CTA right `491.1px`):**
  1. **Card 1 (`BEGINNER` tab left `x: 166.7`, `#4A1C21` fill, card `h: 549.9px`):** Text in `#F7EDE4`: `SIGNATURE REFORMER` / `HOT FOUNDATIONS`, 3 short paragraphs, outlined pill button `JOIN THE PROGRAM` (`272.8×28.5px`, `0.8px solid #F7EDE4`, transparent bg, `#F7EDE4` text, `href="/work-with-me"`). Image: `yoga_duo_closeup_warrior_poses.png` (`436.5×436`).
  2. **Card 2 (`INTERMEDIATE` tab mid-left `x: 494.1`, `#E9C9CF` fill, card `h: 541px`):** Text in `#4A1C21`: `READY TO TURN UP THE HEAT?` / `HOT SCULPT`, 2 paragraphs, solid `#4A1C21` pill button `JOIN THE PROGRAM` (`#F7EDE4` text, `href="/work-with-me"`). Image: `side_lying_leg_lift_with_ball.png` (`436.5×427.1`).
  3. **Card 3 (`ADVANCED` tab right `x: 821.5`, `#EDD8C4` fill, card `h: 541px`):** Text in `#4A1C21`: `THIS ONE MOVES.` / `HOT POWER FLOW`, 2 paragraphs, solid `#4A1C21` pill button `JOIN THE PROGRAM` (`#F7EDE4` text, `href="/work-with-me"`). Image: `yoga_duo_overhead_downward_dog.png` (`436.5×427.1`).
- **Bottom Callout (`y: 6822–7505`, `h: 683.4px`):** `#F7EDE4` backdrop, centered H2 `NOT SURE WHERE to START?`, centered body text, pill CTA `START YOUR JOURNEY` (`218.3×28.5px`, `#4A1C21` bg, `#F7EDE4` text, `href=""`), and bottom-left editorial photo `low_angle_yoga_mat_pilates_ball.png` (`218.3×256.3px`).

### Section 5 — Founder Bio (`y: 7505–8205`, `h: 700px`, `theme="bright-inverse"`)
- **Purpose:** Introduce founder Ava.
- **Background:** `#F7EDE4`.
- **Columns:** 2-column split (`11px` gap):
  - Left (`x: 167.7, w: 539.3px`): H2 `Meet Ava` (`script`) + `FOUNDER OF HOT CORE PILATES` (`Lilita One`), 3 body paragraphs, solid `#4A1C21` pill button `LEARN MORE` (`209.1×28.5px`, `#F7EDE4` text, `href=""`).
  - Right (`x: 772.9, w: 484.2px, h: 660.1px`): Portrait `1771469173009.jpg` (`object-fit: cover`).

### Section 6 — Press Logo Bar (`y: 8205–8352`, `h: 147px`, `theme="bright-inverse"`)
- **Purpose:** Credibility press strip.
- **Background:** `#F7EDE4`.
- **Content:** Single horizontal row (`11px` gap): `Featured in` label (`17.456px`) followed by 5 `136×68px` press logos (`Forbes`, `Harper's Bazaar`, `The Guardian`, `Vogue`, `Forbes` — `.webp`, `object-fit: contain`).

### Section 7 — Mobile App Showcase (`y: 8352–9360`, `h: 1008px`, `theme="bright"`)
- **Purpose:** Promote the Hot Core mobile app and studio pocket features.
- **Background:** Full-bleed photo `closeup_angle_yoga_mat_pilates_ball.png` (`object-position: 42.56% 14.4%`, overlay `#4A1C21` opacity `0`). Padding `95.04px 0`, grid gap `3px / 20px`.
- **Layout:**
  - Top-Left: H2 `TAKE HOT CORE with YOU` (`#F7EDE4`, `with` in `script`) + two side-by-side `#E9C9CF` pill buttons (`257×60px` each, `#4A1C21` text, `href=""`): `DOWNLOAD ON THE APP STORE` and `GET IT ON GOOGLE PLAY`.
  - Bottom-Left Box: `#4A1C21` SVG rectangle (`1088×440.4px`, `10px` radius) extending behind the phone mockup with `#F7EDE4` text: H4 `YOUR STUDIO. IN YOUR POCKET.`, intro copy, and 2-column bullet list (7 items total).
  - Right: Overlapping iPhone app UI mockup `Pilates+app+2.png` (`x: 888.6, y: 8446.9, 367.8×818px`).

### Section 8 — Lead Magnet / Starter Guide (`y: 9360–10181`, `h: 821px`, `theme="bright-inverse"`)
- **Purpose:** Email capture for the Free 7-Day Hot Core Starter Guide.
- **Background:** `#F7EDE4`; padding `47.52px 0`.
- **Content:**
  - Centered H2 `NOT READY TO BOOK? START HERE.` (`w: 654.8px`), centered intro + 3 bullets + tagline (`w: 436.6px`).
  - Flanked by left photo `sensual_studio_portrait_burgundy.png` (`x: 166.7, y: 9692.3, 163.7×242.1px`) and top-right photo `pink_smoothie_no_text.png` (`x: 1094.4, y: 9436, 163.7×256.3px`).
  - Bottom horizontal 4-column newsletter form (`First Name`, `Last Name`, `Email Address` inputs at `249.6×61.6px`, `#FFFFFF` fill, `0.8px–1px solid #333333`, `0px` radius + `DOWNLOAD NOW` pill button `164.1×56px`, `#4A1C21` bg, `#F7EDE4` text).

### Section 9 — Blog Preview (`y: 10181–10817`, `h: 636px`, `theme="bright-inverse"`)
- **Purpose:** Preview recent blog articles.
- **Background:** `#F7EDE4`; padding `47.52px 0`.
- **Layout:** 3-column distribution:
  - Left (`x: 166.7, w: 272.8px`): Eyebrow `FROM THE BLOG`, H2 `THE HOT EDIT`, pill button `READ THE BLOG` (`163.7×57px`, `href=""`).
  - Middle (`x: 603.3`): `Blog Post Four` (`297×297px` image `Pilates+Editorial+Pose.png`, excerpt `It all begins with an idea.`, `Read more →`).
  - Right (`x: 960.3`): `Blog Post Three` (`298×370.1px` image `pink_smoothie_no_text.png`, excerpt `It all begins with an idea.`, `Read more →`).

### Section 10 — Bottom Split CTA (`y: 10817–11699`, `h: 882px`, `theme="dark"`)
- **Purpose:** Final conversion push before footer.
- **Background:** `#E9C9CF`.
- **Layout:** 50/50 split:
  - Left (`x: 0, w: 596.9px, h: 882.1px`): Full-bleed photo `yoga_duo_low_angle_seated_twist.png`.
  - Right (`x: 717.9`): H2 `READY to FEEL THE HEAT?` (`to` in `script`), 2 short lines (`Stronger core. Sharper mindset. Hotter energy.` / `Your mat is waiting.`), and oversized oval pill CTA `START TODAY` (`154.1×92.6px`, `#4A1C21` bg, `#E9C9CF` text, `-> /appointments`).

### Footer (`y: 11699–12215`, `h: 516px`, `theme="black"`)
- **Background:** `#4A1C21` with `1px` top section divider.
- **Top Row (4 areas):**
  1. **Brand Grid + Socials (Left):** 4 square-ish thumbnails (`99.1×107.4px`, `11px` gap) + Facebook & Instagram icons below.
  2. **Newsletter (`JOIN THE VIP LIST`):** H4 heading, single `#FFFFFF` `Email Address` input (`252×61.6px`), `#EDD8C4` `SIGN UP` pill button (`107.5×56px`, `#2C1107` text).
  3. **Links (`EXPLORE`):** `Home`, `About`, `Work with Me`, `Podcast`, `Blog`, `Contact` (`14px`, `#E9C9CF`).
  4. **Studio Info (`CONTACT`):** `10 Begley Street / HUTT STREET SA 5000 / (08) 8280 4768 / yourwebsite.com` (`14px`, `#E9C9CF`).
- **Bottom Row:** Full-bleed centered wordmark `HOT CORE PILATES` (`185.9px` `"Lilita One"`, `#E9C9CF`) + `Template Designed by Row Creative` (`14px`, `#E9C9CF`).

---

## 6. Internal Pages Structure Summary

- **`/about` (`9,810px`):**
  1. Split Hero (`#E9C9CF`, `885px`): Left portrait (`sensual_studio_portrait_burgundy.png`), Right H1 `WE TRAIN TO be STRONGER.` + copy + `BOOK A CLASS`.
  2. Marquee + Duo Collage (`#4A1C21`, `1085px`): `THE PROBLEM WE SAW \` marquee + 2 images.
  3. Mission & Metrics (`#4A1C21` `light-bold`, `2074px`): Statement H3 + `500+ WOMEN TRAINED`, `10,000+ CLASSES TAUGHT`, `5-STAR AVERAGE CLIENT RATING`.
  4. Pull-Quote Banner (`bright`, `594px`): H2 quote.
  5. Founder Bio (`Meet Ava`), `WHAT MAKES HOT CORE DIFFERENT?` & `WHO IT’S FOR` (`closeup_angle_yoga_mat_pilates_ball.png`, `yoga_duo_low_angle_seated_twist.png`).
  6. `MEET THE TEAM` (`#F7EDE4`, `924px`): 3 instructor cards (`JESS MARTIN`, `MAYA`, `CHLOE`).
  7. 3-slide Testimonial Carousel (`light`, `569px`, placeholder `"ANNA"` copy).
  8. Split CTA (`#E9C9CF`, `882px`): `READY to FEEL THE HEAT?` (`yoga_duo_overhead_downward_dog.png`).
- **`/classes` (`9,786px`):**
  1. Full-bleed Photo Hero (`theme="black"`, `1021px`): `side_lying_leg_lift_with_ball.png`, bottom display H1 `OUR CLASSES`, left copy + `BOOK YOUR CLASS TODAY`.
  2. Intro + Marquee (`bright`, `1055px`): `FIND YOUR FIRE` + `CHOOSE YOUR HEAT \`.
  3. 3 Stacked Class Folder Cards + `NOT SURE WHERE to START?` (`#F7EDE4`, `3221px`).
  4. `THE GLOW is REAL.` Bento Testimonials (`#4A1C21`, `1065px`).
  5. `OUR MEMBERSHIP` 3-Tier Cards (`#E9C9CF`, `1030px`): `4 CLASSES PER MONTH`, `8 CLASSES PER MONTH` (`BEST VALUE` badge), `UNLIMITED MEMBERSHIP` + `JOIN TODAY` pills.
  6. `QUESTIONS?Answers` FAQ Accordion (`white-bold`, `821px`): 5 expandable items + `variation_08.png`.
  7. Bottom CTA (`#F7EDE4`, `1028px`): `READY TO FEEL THE BURN?`.
- **`/single-service` (`9,551px`):**
  1. Collage Hero (`theme="bright"` over `#4A1C21`, `990px`): Centered `STRONGER. SCULPTED. Personally GUIDED.` surrounded by 4 floating media blocks including animated GIF `pilates+girl.gif`, bottom-right `APPLY NOW`.
  2. `WHO IS THIS FOR \` marquee + `IS PRIVATE COACHING Right FOR YOU?` (`#E9C9CF`, `1102px`).
  3. `THE TRANSFORMATION` (`white-bold`, `710px`).
  4. `Introducing THE PRIVATE 1:1 COACHING EXPERIENCE` & `WHAT’S INCLUDED:` (`bright`, `2002px`).
  5. `THE GLOW is REAL.` Bento (`#F7EDE4`, `1008px`), `Meet Ava` (`779px`), 3-Step `HOW TO GET STARTED` (`902px`).
  6. `CHOOSE YOUR COACHING CONTAINER /` marquee + `$997` (3-Month) & `$1297` (6-Month) tiers (`white-bold`, `857px`).
  7. Split CTA (`#E9C9CF`, `685px`).
- **`/the-app` (`8,528px`):**
  1. Full-bleed Hero (`black-bold`, `766px`): `yoga_pose_7_side_plank.png`, centered `YOUR STUDIO. IN Your POCKET.` + dual App Store / Google Play pills.
  2. `WHY DOWNLOAD THE APP` (`#4A1C21`, `890px`, `Pilates+app+1.png`).
  3. `WHAT YOU’LL Find INSIDE` (`#E9C9CF`, `2640px`): 4 feature cards + `Pilates+app+2.png`.
  4. `THE GLOW is REAL.` (`1065px`), 3-step `HOW IT WORKS` (`976px`), `MEMBERSHIP /` marquee + `$997`/`$1297` tiers (`857px`), Split CTA `READY to TRAIN SMARTER?` (`818px`).
- **`/blog` (`6,681px`):**
  1. Full-bleed Hero (`bright`, `728px`): `variation_02.png`, `THE` / `STRENGTH, MOVEMENT, and WELLNESS — INSIDE AND OUT.` / `BLOG`.
  2. Filter Bar (`#E9C9CF`, `207px`): 4 pill buttons (`TRAINING`, `RECIPES`, `NUTRITIONS`, `LIFESTYLE`) + `Search` input.
  3. `LATEST POSTS` (2 featured stories, `1057px`) + `POPULAR Stories` (`#4A1C21`, `1025px`) + `HEY, I’M AVA` (`#F7EDE4`, `1007px`) + 4-post grid (`BLOG POST FOUR`–`ONE`, `1242px`) + Starter Guide form (`#E9C9CF`, `899px`).
  4. Individual post route (`/blog/blog-post-title-four-...`): Full article body + Next post link.
- **`/shop` (`7,371px`):**
  1. Full-bleed Hero (`bright`, `794px`): `The Hot Core Shop`, `STUDIO ESSENTIALS, TRAINING TOOLS` + overlapping `FEATURED PRODUCT` card (`HOT CORE GRIP SOCKS`).
  2. `OUR FAVOURITES` 4-card grid (`1923px`) + 3-slide testimonial carousel (`569px`) + `SHOP OUR FAVOURITES` filterable product catalog (`1137px`) + `SHOP MY AMAZON` / `SHOP MY LTK` split (`769px`) + Starter Guide form (`907px`).
- **`/contact`:** Split layout on `#4A1C21`: Left full-height portrait (`portrait_3_playful_laugh.png`), Right H1 `LET’S GET in TOUCH`, intro paragraphs, and structured Squarespace contact form (Name, Email, Dropdown, Message, `Submit`).
- **`/sales-page`:** Split Hero (`#4A1C21`): Left lounging photo, Right `STAY HOT. STAY CONSISTENT.` + thumbnail + `JOIN NOW`; followed by `DOES THIS SOUNDS FAMILIAR?`, 5 embedded `5s` video players (`WHAT KIND OF results CAN YOU EXPECT?`), Before/After & Perks, `Meet Ava`, pricing, and FAQ.
- **`/link-in-bio`:** Centered portrait hero (`HOT CORE PILATES`), `QUICK Links` stacked pill buttons (`MY WEBSITE`, `CLASSES`, `SHOP`), and numbered `01.`–`03.` featured editorial links.
- **`/appointments`:** `#E9C9CF` Hero (`YOUR strongest SELF STARTS HERE.` + centered photo), `CHOOSE YOUR SESSION BELOW /` marquee, embedded Acuity Scheduling iframe (`https://app.acuityscheduling.com/schedule/2a4aaa61/?isInConfig=false`), and bottom CTA.
- **`/404`:** `#4A1C21` top section with `404`, `Uh-oh, Looks Like You're Lost! 🚧`, flanked by 2 studio photos; `#E9C9CF` bottom section `HERE’S WHAT you CAN DO NEXT:` with fallback contact details.
- **`/course-1`:** Top banner photo (`yoga_pose_7_side_plank.png`), `#F7EDE4` course overview `COURSE 1`, `START COURSE` button, `0% Progress` bar, and lesson outline.

---

## 7. Visual Design System

### Color Palette

| Token Name | HEX | RGB | Usage |
|---|---|---|---|
| `--color-burgundy` | `#4A1C21` | `rgb(74, 28, 33)` | Primary dark background (`black` / `light-bold`), primary buttons, scrolled header, headings & body text on light sections |
| `--color-blush` | `#E9C9CF` | `rgb(233, 201, 207)` | `dark` section background, text/logo on `#4A1C21`, `HOT SCULPT` card, app store buttons, testimonial card accent |
| `--color-cream` | `#F7EDE4` | `rgb(247, 237, 228)` | `bright-inverse` section background, `YOU'VE TRIED:` card, button text on `#4A1C21` (`sqsrte-text-color--white`), mobile menu overlay |
| `--color-sand` | `#EDD8C4` | `rgb(237, 216, 196)` | `THE GLOW is REAL.` card, `HOT POWER FLOW` card & `ADVANCED` tab, footer `SIGN UP` button |
| `--color-white` | `#FFFFFF` | `rgb(255, 255, 255)` | Testimonial card #2 (`Emily R.`), all form `<input>` fields |
| `--color-espresso` | `#2C1107` | `rgb(44, 17, 7)` | Blog summary excerpts, footer `SIGN UP` button text |
| `--color-border-input` | `#333333` | `rgb(51, 51, 51)` | Form input `0.8px–1px` border |

### Typography Scale

| Role | Font Family | Weight | Desktop Size | Line Height | Letter Spacing | Transform |
|---|---|---|---|---|---|---|
| Marquee Display (`h1.Marquee`) | `Lilita One` | `400` | `221.36px` | `309.904px` (`1.4`) | `-0.03em` (`-6.64px`) | `uppercase` |
| Hero H1 | `Lilita One` | `400` | `187.1px` | `187.1px` (`1.0`) | `-0.03em` (`-5.61px`) | `uppercase` |
| Footer Wordmark H2 | `Lilita One` | `400` | `185.9px` | `185.9px` (`1.0`) | `-0.03em` (`-5.58px`) | `uppercase` |
| Section H2 | `Lilita One` | `400` | `55.872px` | `60.34px` (`1.08`) | `-0.03em` (`-1.68px`) | `uppercase` |
| Header Wordmark | `Lilita One` | `400` | `39.92px` | `47.90px` (`1.2`) | `-0.03em` (`-1.20px`) | `uppercase` |
| Card / Subheading H4 | `Lilita One` | `400` | `19.584px` | `22.94px` (`1.17`) | `-0.03em` (`-0.59px`) | `uppercase` |
| Header CTA Button | `Lilita One` | `400` | `15.728px` | `normal` | `-0.03em` (`-0.47px`) | `uppercase` |
| Heading Italic Accent (`em`) | `script` *(custom)* | `100` | Inherited (`1em`) | Inherited | `normal` | `none` |
| Desktop Nav Links | `Sometype Mono` | `400` | `14px` | `16.8px` (`1.2`) | `-0.06em` (`-0.84px`) | `uppercase` |
| Mobile Overlay Nav Links | `Sometype Mono` | `400` | `31.892px` | `1.2em` | `-0.06em` | `uppercase` |
| Large Body (`.sqsrte-large`) | `Roboto` | `400` | `22.64px` | `33.96px` (`1.5`) | `-0.35px` | `none` |
| Standard Body (`p`) | `Roboto` | `400` | `17.456px` | `26.18px` (`1.5`) | `-0.02em` (`-0.35px`) | `none` |
| Small Body / Footer / Excerpt | `Roboto` | `400` | `14px` | `21px` (`1.5`) | `-0.02em` (`-0.28px`) | `none` |
| Action Buttons | `Roboto` | `500` | `14px` | `normal` | `-0.02em` (`-0.28px`) | `uppercase` |

*(Unknown font source note: Exact `.woff2`/`.ttf` source URL for the `'script'` font family could not be retrieved because `static1.squarespace.com/.../custom.css` is blocked by CORS. Closest Google Fonts alternatives for `'script'`: `La Belle Aurore`, `Sacramento`, or `Caveat` weight 400.)*

### Spacing, Radii, Borders & Shadows
- **Max Site Width:** `1500px` (`--sqs-site-max-width`); outer gutter `4vw` (`57.6px` at `1440px`), `6vw` (`23.4px` at `390px`) on mobile.
- **Section Vertical Padding:** `0px` on custom Fluid Engine hero/split/collage sections; `95.04px` top/bottom on Testimonials & App Showcase; `47.52px` top/bottom on Starter Guide & Blog Preview.
- **Grid Gaps:** `0px` (Fluid Engine freeform), `11px` (Founder/Press/Split/Footer), `20px` (Testimonials & App grid).
- **Border Radii:**
  - Pill buttons: `300px`
  - Pain-point cards (`YOU'VE TRIED:` / `YOU WANT:`): `20px`
  - Testimonials, Folder class cards, Folder tabs, App info panel: `10px`
  - Avatars: `50%` (circular SVG clip-path)
  - Form inputs: `0px`
- **Borders:** `0px` on cards/buttons except `HOT FOUNDATIONS` secondary button (`0.8px solid #F7EDE4`) and form inputs (`0.8px–1px solid #333333`).
- **Box Shadows:** `none` globally.

---

## 8. Interactions & Animations

| Element / Feature | Trigger | Observed Behavior | Duration / Timing | Mobile Difference |
|---|---|---|---|---|
| **Sticky Header** | Scroll (`scrollY > 0`) | Gains `.shrink` class; background transitions from transparent to solid `#4A1C21`; height stays `82.6px` | Instant / CSS transition | Same scroll fill; shows hamburger left + centered title |
| **Nav Dropdowns** | Hover (`SERVICES`, `BONUS PAGES`) | Reveals `#4A1C21` `200px` min-width dropdown right-aligned under trigger | Instant display toggle | Replaces hover dropdown with full-screen submenu drill-down (`SERVICES >`, `< BACK`) |
| **Buttons & Links** | Hover | Opacity dims to `0.8` | `0.1s linear` | Tap states only |
| **Scroll Reveal (`preFade` / `fadeIn`)** | Scroll into viewport | Squarespace adds `.fadeIn` with `transition-timing-function: ease`, staggered delays (`~0.26s–0.28s`) | `0.9s ease` | Same fade-in on scroll |
| **Marquee Banners** | Continuous | Horizontal infinite scrolling text loop (`CHOOSE YOUR CLASS /`, etc.) | Continuous CSS/RAF transform | Scales font down proportionally; same continuous loop |
| **Hero Video** | Page load | Auto-plays muted looping 5.08s video (`video 7 (1).mp4`) | `5.08s` loop | Same muted inline video |
| **App Section Background** | Scroll | Subtle vertical parallax positioning on `closeup_angle_yoga_mat_pilates_ball.png` | Scroll-linked | Stacks cleanly |
| **FAQ Accordion** (`/classes`, `/sales-page`) | Click question button | Expands/collapses answer panel vertically | ~`0.25s–0.3s` | Same click-to-toggle |
| **Testimonial Carousel** (`/about`, `/shop`) | Click Next/Prev arrows | Slides horizontally through 3 testimonial quotes | Smooth slide | Touch swipeable |
| **Mobile Menu** | Click 2-line hamburger | Opens full-screen `#F7EDE4` navigation overlay | Slide/fade overlay | Mobile & tablet (`≤768px`) only |
| **Forms** | Focus / Submit | Native input focus + client/server validation (`First Name`, `Last Name`, `Email`, Contact fields) | Standard | Inputs stack to 100% width |

---

## 9. Responsive Behavior Across Viewports

| Viewport | `scrollWidth` / Overflow | `scrollHeight` | Header | Hero H1 | Body Font | Grid Tracks | Key Layout Changes |
|---|---|---|---|---|---|---|---|
| **1440×900** | `1425px` (None) | `12,215px` | `82.6px`, full inline nav + CTA | `187.1px` (`w: 1310`) | `17.456px` | 26 (24 + 2) | Full multi-column layouts & bento grid |
| **1280×800** | `1265px` (None) | `11,398px` | `80.1px`, full inline nav + CTA | `166px` (`w: 1162`) | `17.456px` | 26 | Proportional `vw` scaling; same desktop layout |
| **768×1024** | `753px` (None) | `10,166px` | `129.2px`, switches to mobile hamburger + centered logo | `98.7px` (`w: 691`) | `18.608px` (lead) | 26 | Mobile header activates at `768px`, while Fluid Engine still uses 26-track desktop columns (narrowing testimonial cards to `217px` / `158px`) |
| **390×844** | `390px` (None) | `13,447px` | `83.8px`, hamburger left + centered logo | `55.7px` (`w: 390`) | `14px` | 10 (8 + 2) | All sections stack vertically (`344px` card width); inputs & buttons stack to full width; Hero H1 reaches edge-to-edge |
| **375×812** | `375px` (Clipped by `.fluid-engine`) | `13,450px` | `82px`, hamburger left + centered logo | `53.6px` (`w: 375`) | `14px` | 10 | Same vertical stack; minor flaw on reference: trailing `.` in `TURN UP the HEAT.` clips slightly at the right edge |

---

## 10. Reference Screenshots

Screenshots of all desktop sections, dropdown/mobile menu states, responsive breakpoints, and all 12 accessible internal pages were captured during browser inspection and organized in `reference/screenshots/`.

---

## 11. Project Direction Update — Visual Reference vs. Target Business

Per the project direction update, **Hot Core Pilates** (`https://manatee-bumblebee-yawb.squarespace.com/`) is strictly the **visual design reference**, while the website being built is for a **female personal trainer & women's fitness coaching business**:

- **100% Visual Design Preserved:** Color palette (`#4A1C21`, `#E9C9CF`, `#F7EDE4`, `#EDD8C4`, `#FFFFFF`, `#2C1107`), typography (`Lilita One`, italic `script` `<em>` accents, `Sometype Mono`, `Roboto`), header & `.shrink` scroll transition, hero layout, section cadence, card shapes (`20px`/`10px`), folder-tab programme cards, pill buttons (`300px`), animations, mobile menu overlay, and responsive breakpoints.
- **Content & Imagery Adapted:** All Pilates-specific terminology and media are replaced naturally for **Women's Fitness Coaching** (`1-to-1 Personal Training`, `Online Fitness Coaching`, `Personalised Workout Plans`, `Nutrition Guidance`, `Group Fitness Coaching`, `Women's Strength Training`), avoiding medical/weight-loss claims and using explicit `[Placeholder]` markers for coach name, qualifications, experience, location, pricing, testimonials, and contact details.
