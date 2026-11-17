# ASSET INVENTORY — Hot Core Pilates (Visual Reference) & Women's Fitness Coaching (Target)

**Reference Website:** `https://manatee-bumblebee-yawb.squarespace.com/`  
**CDN Base URL (Images):** `https://images.squarespace-cdn.com/content/v1/699e72db5fa9450ffd2f2a0b/`  
**CDN Base URL (Video):** `https://video.squarespace-cdn.com/content/v1/699e72db5fa9450ffd2f2a0b/3c877b7b-1fe4-4d56-9e24-a9243b517453/`

> **Copyright & Project Direction Notice:**  
> Original Squarespace assets below are documented strictly for visual/structural reference (aspect ratios, crops, placements, overlays). **Do NOT redistribute or bundle copyrighted reference photos/videos in production.** All final assets for the **Women's Fitness Coaching** website must be owner-supplied or properly licensed fitness coaching media matching the reference compositions and color mood (deep burgundy `#4A1C21`, warm neutrals `#F7EDE4`/`#EDD8C4`, dusty blush `#E9C9CF`), avoiding Pilates-reformer-specific scenes, random bodybuilding, male-focused imagery, or stereotypical bright-pink fitness stock.

---

## 1. Fonts

### Reference Webfonts (`document.fonts`)
| Role | Font Family | Weights / Styles Observed | Source | Notes |
|---|---|---|---|---|
| Display / Headings / Wordmark / Header CTA | `Lilita One` | `400` normal | Google Font / Squarespace `woff2` (`file.squarespace-cdn.com`) | Uppercase, `-0.03em` tracking |
| Heading Italic Accent (`<em>`) | `script` *(custom)* | `100` (computed) italic | Embedded in `static1.squarespace.com/.../custom.css` *(source URL blocked by CORS)* | Lowercase/mixed-case signature script inline accent |
| Navigation Links | `Sometype Mono` | `400` normal (also `400` italic, `700` declared) | Squarespace `woff2` (`file.squarespace-cdn.com`) | Uppercase, `-0.06em` tracking |
| Body / Buttons / Inputs | `Roboto` | `400` normal, `500` normal, `700` declared | Squarespace `woff2` (`file.squarespace-cdn.com`) | `-0.02em` tracking |

### Target Next.js Font Requirements (`next/font/google` + local font)
- **`Lilita_One`** (`weight: "400"`) via `next/font/google`
- **`Sometype_Mono`** (`weight: ["400", "700"]`) via `next/font/google`
- **`Roboto`** (`weight: ["400", "500", "700"]`) via `next/font/google`
- **Script Accent (`--font-script`):** Original `script` font file is **missing/unverified** (CORS-blocked `custom.css`). Recommended Google Fonts alternatives matching the light monoline signature look: **`La_Belle_Aurore`** or **`Sacramento`** (or owner-supplied script `.woff2` via `next/font/local`).

---

## 2. Logo & Icons

| Asset | Reference Implementation | Dimensions & Color | Target Women's Fitness Coaching Replacement |
|---|---|---|---|
| **Site Logo (Header & Footer)** | Text wordmark `HOT CORE PILATES` in `Lilita One` (`39.92px` header, `185.9px` footer) — **no image file** | `#E9C9CF` (or `#4A1C21` on light-top pages) | Text wordmark `[COACH / BRAND NAME]` in `Lilita One` (no image file required unless owner supplies one) |
| **Social Icons (Header & Footer)** | Facebook & Instagram SVG icons | `20×20px`, `#E9C9CF` (header/footer) / `#4A1C21` (mobile drawer) | `lucide-react` or clean inline SVG social icons (`20×20px`) |
| **Mobile Menu Toggle** | 2-line minimal hamburger icon + `×` close icon | `~24×24px`, `#E9C9CF` / `#4A1C21` | Custom 2-line SVG button matching exact stroke weight |
| **Dropdown / Mobile Submenu Chevrons** | Text/SVG chevron `>` / `< BACK` | `#4A1C21` (`31.89px` mobile drawer) | `lucide-react` `ChevronRight` / `ChevronLeft` |
| **Star Ratings** | Unicode characters `★ ★ ★ ★ ★` | `22.64px` `.sqsrte-large`, `#4A1C21` | Same `★ ★ ★ ★ ★` or accessible `aria-label="5 out of 5 stars"` SVG stars |
| **FAQ Accordion Icon** (`/classes`, `/sales-page`) | Squarespace `+` / `×` toggle icon | `~16×16px`, `#4A1C21` | `Plus` / `Minus` or rotating `+` SVG |

---

## 3. Video & Motion Assets

| Section / Page | Reference Filename & URL | Specs | Overlay / Crop | Target Women's Fitness Replacement |
|---|---|---|---|---|
| **Homepage Hero Background** | `video 7 (1).mp4` — `.../3c877b7b-1fe4-4d56-9e24-a9243b517453/playlist.m3u8` | `1942×1080` (`16:9` / `1.798:1`), `5.08s`, muted loop | `#4A1C21` fallback; SVG `clip-path` rounded bottom (~`29px`); no tint overlay | `[MISSING]` Owner-supplied or licensed `16:9` muted looping video of female coach / women's strength training in warm studio lighting |
| **`/single-service` Hero Collage** | `pilates+girl.gif` — `.../130ebc02-0cf7-4f32-9483-f03d4a42d82a/pilates+girl.gif` | Animated GIF | Centered behind H1 text | `[MISSING]` Short looping strength coaching clip/GIF or high-res still |
| **`/sales-page` Results Grid (×5)** | Embedded Squarespace video players (`5.13s` each) | 5 vertical/square video cards with native play/mute/seek | Grid of 5 short preview clips | `[MISSING]` Owner-supplied coaching session / movement clips (no fake client transformations) |

---

## 4. Complete Image Inventory (Homepage & Internal Pages)

### A. Homepage Images (19 Distinct Placements)

| # | Section | Reference Filename & CDN Path | Aspect Ratio / Rendered Size (`1440w`) | Object Fit & Position | Radius / Shape | Target Women's Fitness Coaching Replacement |
|---|---|---|---|---|---|---|
| 1 | Section 1 Top-Right Sticker | `787d8bae-8cad-4525-aad6-e47551b65305/Pilates+element-1.png` | `1:1` (`218.3×199.3px`) | `cover` `50% 50%` | `0px` (transparent PNG with sticker outline) | Custom SVG/PNG dumbbell sticker in `#4A1C21`/`#F7EDE4` |
| 2 | Section 1 `YOU'VE TRIED:` Sticker | `c6d46419-f5af-4bef-ab47-f3207edc6ebe/2.png` | `1:1` (`163.7×164px`) | `contain` `50% 50%` | `0px` (Pilates grip socks illustration) | Custom SVG/PNG training sneaker or stopwatch/notebook sticker (replacing Pilates socks) |
| 3 | Section 1 `YOU WANT:` Sticker | `5560f2a4-9c82-49cb-b4bb-f28f8745ea0a/Pilates+elements.png` | `1:1` (`194.2×194.4px`) | `contain` `50% 50%` | `0px` | Custom SVG/PNG resistance band / strength ball sticker |
| 4 | Section 1 Bottom-Left Sticker | `8ef56db7-5abc-4f85-b6fe-a4f155cfcb5c/4.png` | `1:1` (`163.7×164px`) | `contain` `50% 50%` | `0px` | Custom SVG/PNG kettlebell / barbell plate sticker |
| 5 | Section 2 Avatar 1 (`Sarah T.`) | `cf982356-9725-4e33-82c2-af09fe03a27a/yoga_duo_low_angle_seated_twist.png` | `1:1` (`35.4×35px`) | `cover` `65.4% 34.4%` | Circle (SVG `clipPath`) | `[PLACEHOLDER]` Client avatar #1 (`1:1`, `object-cover`) |
| 6 | Section 2 Avatar 2 (`Emily R.`) | `264b6592-ab48-4175-8372-3d1303848cb7/lifestyle_fitness_portrait_burgundy_activewear.png` | `1:1` (`35.4×35px`) | `cover` `50% 50%` | Circle | `[PLACEHOLDER]` Client avatar #2 |
| 7 | Section 2 Avatar 3 (`Jessica M.`) | `adda979f-4f80-4b50-be76-b7365defd316/variation_02.png` | `1:1` (`35.4×35px`) | `cover` `50% 50%` | Circle | `[PLACEHOLDER]` Client avatar #3 |
| 8 | Section 2 Avatar 4 (`Sarah T.`) | `586a249d-1366-4698-8b94-d5f6e0097458/1771469173009.jpg` | `1:1` (`35.4×35px`) | `cover` `50% 50%` | Circle | `[PLACEHOLDER]` Client avatar #4 |
| 9 | Section 4 Card 1 (`BEGINNER`) | `dafd3a5e-b292-4b56-98d2-f3b28b1aff7b/yoga_duo_closeup_warrior_poses.png` | `~1:1` (`436.5×436px`) | `cover` `49.5% 16%` | `0px` | `[MISSING]` Beginner women's strength / 1-to-1 coaching photo (`1:1`) |
| 10 | Section 4 Card 2 (`INTERMEDIATE`) | `4c797c1b-0c5b-42a3-b75d-167d6982ff95/side_lying_leg_lift_with_ball.png` | `~1:1` (`436.5×427.1px`) | `cover` `80.6% 31.2%` | `0px` | `[MISSING]` Women's dumbbell/resistance workout photo (`1:1`) |
| 11 | Section 4 Card 3 (`ADVANCED`) | `fbe2281d-217d-4aa6-9e15-f41049bcb17d/yoga_duo_overhead_downward_dog.png` | `~1:1` (`436.5×427.1px`) | `cover` `50% 50%` | `0px` | `[MISSING]` Structured strength / group coaching photo (`1:1`) |
| 12 | Section 4 Bottom-Left (`NOT SURE`) | `66e7169e-6472-4402-b1de-672a1650d83d/low_angle_yoga_mat_pilates_ball.png` | `~4:5` (`218.3×256.3px`) | `cover` `50% 50%` | `0px` | `[MISSING]` Minimal gym equipment / dumbbells flatlay (`4:5`) |
| 13 | Section 5 (`Meet Ava`) Portrait | `586a249d-1366-4698-8b94-d5f6e0097458/1771469173009.jpg` | `~3:4` (`484.2×660.1px`) | `cover` `50% 50%` | `0px` | `[MISSING]` Owner-supplied portrait of the female fitness coach (`3:4`) |
| 14 | Section 6 Press Logos (×5) | `1771991790314-.../1.webp`, `.../2+%281%29.webp`, `.../1.webp`, `.../3.webp`, `.../4.webp` | `2:1` (`136×68px` each) | `contain` `50% 50%` | `0px` | `[PLACEHOLDER]` Replace with verified press/certification badges or omit until provided (do not claim fake press) |
| 15 | Section 7 App Background | `26e12207-c299-4ff3-890d-7e12a6b5817a/closeup_angle_yoga_mat_pilates_ball.png` | Full-bleed (`1424.8×1008.1px`) | `cover` `42.56% 14.4%` | `0px` (parallax, overlay `#4A1C21` `0%`) | `[MISSING]` Close-up textured studio gym/training equipment macro photo (`16:11` / landscape) |
| 16 | Section 7 Phone Mockup | `63e2092a-77e2-4483-a7e4-e0217b1e9820/Pilates+app+2.png` | `~9:20` (`367.8×818px`) | `cover` `50% 50%` | Phone frame PNG | Custom/licensed workout-tracking app UI phone mockup |
| 17 | Section 8 Starter Guide Left | `cf13e11c-3b60-4ea2-97cb-6796eb5e7d3b/sensual_studio_portrait_burgundy.png` | `~2:3` (`163.7×242.1px`) | `cover` `50% 50%` | `0px` | `[MISSING]` Women's coaching portrait in warm neutral/burgundy tones (`2:3`) |
| 18 | Section 8 Starter Guide Right & Blog #3 | `04cf3ca8-ee00-403b-a38d-153f1d3c663d/pink_smoothie_no_text.png` | `~2:3` / `4:5` (`163.7×256.3px`, `298×370.1px`) | `cover` / `fill` | `0px` | `[MISSING]` Healthy nutrition / post-workout lifestyle photo (`4:5`) |
| 19 | Section 9 Blog #4 Thumbnail | `ca91c495-fab9-4d8a-8c08-7b9888941a59/Pilates+Editorial+Pose.png` | `1:1` (`297×297px`) | `fill` `50% 50%` | `0px` | `[MISSING]` Editorial strength training blog cover (`1:1`) |
| 20 | Section 10 Split CTA Left | `cf982356-9725-4e33-82c2-af09fe03a27a/yoga_duo_low_angle_seated_twist.png` | `~2:3` (`596.9×882.1px`) | `cover` `50% 50%` | `0px` | `[MISSING]` Coach & client or women's strength session (`2:3` vertical bleed) |
| 21 | Footer 4-Photo Strip | `yoga_duo_low_angle_seated_twist.png`, `overhead_flatlay_no_text.png`, `portrait_3_playful_laugh.png`, `yoga_duo_overhead_downward_dog.png` | `~1:1` (`99.1×107.4px` each) | `cover` `50% 50%` | `0px` | `[MISSING]` 4 cohesive fitness coaching lifestyle squares (`1:1`) |

### B. Additional Assets Found on Internal Pages
- **`/about`:** `variation_08.png` (`b8957bed-ac47-454b-8f55-0d7cea178120/variation_08.png`) — team/FAQ portrait.
- **`/classes`:** `Minimalist+Portrait.png` (`1771991810489-P0MUTFZA0BRL6W6432UH/Minimalist+Portrait.png`), `ae64c2dffe5ec288846fd3bfaaf84b07.jpg` (`1771991816169-3M1QEE0TVCU8589ABN46/ae64c2dffe5ec288846fd3bfaaf84b07.jpg`).
- **`/single-service`:** `plank_with_feet_on_ball.png` (`cc77f7d9-1ab2-429e-b7fc-a3b0cbf26377/plank_with_feet_on_ball.png`), `pilates+girl.gif`.
- **`/the-app`:** `yoga_pose_7_side_plank.png` (`4ca64103-211c-457a-ab0d-9d0cacc3a5a5/yoga_pose_7_side_plank.png`), `Pilates+app+1.png` (`8c50375f-7908-4dae-b0f8-ee192f57219b/Pilates+app+1.png`).
- **`/appointments`:** Embedded Acuity Scheduling iframe (`https://app.acuityscheduling.com/schedule/2a4aaa61/?isInConfig=false`) + `powered-by-acuity-center-*.svg`.

---

## 5. Missing / Required Owner Assets Checklist

To build the Women's Fitness Coaching Next.js application without redistributing Squarespace's copyrighted media or inventing fake details:

1. **Brand & Copy Placeholders Needed from Owner:**
   - Coach name & brand/studio name (replacing `Ava` / `Hot Core Pilates`).
   - Verified qualifications & certifications (replacing Pilates certifications & unverified `Featured in` press logos).
   - Coaching experience & client metrics (replacing `500+`, `10,000+`, `5-STAR` until verified).
   - Studio/coaching location, phone, email, and real social links.
   - Real service pricing (replacing `$997` / `$1297` or membership figures).
   - Genuine client testimonials & avatars (or keep `[Client Testimonial Placeholder]` until supplied).
2. **Visual Media Needed (Must Match Warm Burgundy/Cream Aesthetic):**
   - **1 Hero Video (`16:9`, `~5–10s`, muted loop)** or high-res `16:9` hero photograph of female fitness coach / strength session.
   - **8–10 Core Fitness Coaching Photographs** (female coach training clients, dumbbell/kettlebell/barbell strength work, modern gym, healthy lifestyle nutrition) covering `1:1`, `4:5`, `2:3`, and `3:4` crops.
   - **4 Custom Vector Line-Art Stickers (SVG)** in `#4A1C21` / `#F7EDE4` replacing the 4 Pilates illustrations in Section 1 (dumbbells, sneakers/timer, resistance band, kettlebell).
   - **1–2 Coaching App Mockup PNGs** replacing `Pilates+app+1.png` and `Pilates+app+2.png`.
   - **1 Custom Script Font (`.woff2`) or Google Font choice** (`La Belle Aurore` / `Sacramento`) for `<em>` heading accents.

