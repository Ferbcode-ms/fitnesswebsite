# PRODUCTION READINESS & DEPLOYMENT GUIDE — Phase 6
## Women's Fitness Coaching Website

**Application:** Next.js 14 / Next.js 15 App Router  
**Production Server:** Node.js 18+ (tested on Node 22 & Next.js 15.5)  
**Readiness Status:** **PRODUCTION READY** (Build passing, 0 lint warnings, 0 type errors, security headers enforced)  

---

## 1. Environment Variables Configuration

Create a `.env.local` file for production deployment by referencing `.env.example`:

| Variable Name | Required? | Default / Example | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes** | `https://yourbrand.com` | Sets canonical domain for SEO, sitemap generation, and OpenGraph tags |
| `RESEND_API_KEY` | Optional | `re_123456789...` | Enables automated email delivery for `/contact` submissions via Resend |
| `CONTACT_EMAIL_WEBHOOK` | Optional | `https://hooks.zapier.com/...` | Webhook URL to pipe inquiries into a CRM or Zapier / Make workflow |
| `ACUITY_API_KEY` | Optional | `acuity_sec_...` | Synchronizes consultation requests with Acuity Scheduling |
| `CALENDLY_TOKEN` | Optional | `calendly_pat_...` | Synchronizes consultation requests with Calendly |
| `NEWSLETTER_API_KEY` | Optional | `ck_...` | Pushes newsletter subscriptions to ConvertKit, Mailchimp, or Klaviyo |

---

## 2. Security Hardening & Headers

### 2.1 HTTP Security Headers
Configured in `next.config.ts` across all application routes (`/(.*)`):
- `X-Frame-Options: SAMEORIGIN` — Protects against clickjacking attacks.
- `X-Content-Type-Options: nosniff` — Prevents MIME-type sniffing.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` — Enforces HTTPS for 2 years.
- `Referrer-Policy: origin-when-cross-origin` — Protects user privacy while retaining referrers.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` — Restricts unauthorized browser API access.
- `poweredByHeader: false` — Suppresses the `X-Powered-By: Next.js` header to obscure server technology.

### 2.2 Source Code & Secrets Hygiene
- **Zero Secrets Committed:** No API keys, passwords, or private tokens exist in source control.
- **Gitignore Exclusions:** `.gitignore` actively excludes `.env`, `.env*.local`, `node_modules`, `.next`, and build artifacts.
- **Client Safety:** All sensitive environment variable checks (`RESEND_API_KEY`, etc.) occur strictly within server-side Route Handlers (`src/app/api/`) and are never exposed to client bundles.

---

## 3. Build & Runtime Commands

| Task | Command | Description |
|---|---|---|
| **TypeScript Validation** | `npm run typecheck` | Validates all types without emitting files (`tsc --noEmit`) |
| **Code Linting** | `npm run lint` | Runs Next.js ESLint rules (`next lint`) |
| **Production Build** | `npm run build` | Compiles optimized static pages and server bundles (`next build`) |
| **Start Production Server** | `npm run start` | Boots the compiled production server (`next start`) |

---

## 4. Deployment Instructions

### Option A: Deployment via Vercel (Recommended)
Next.js is natively developed by Vercel; deployment is seamless:
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. Set the Framework Preset to **Next.js**.
5. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
   - (Optional) `RESEND_API_KEY`, `CONTACT_EMAIL_WEBHOOK`, etc.
6. Click **"Deploy"**. Vercel will automatically run `npm run build` and provision an edge CDN deployment with global caching.

### Option B: Deployment via Custom Node.js VPS / Docker
1. Clone the repository on your server (Ubuntu / Debian / Alpine).
2. Install dependencies:
   ```bash
   npm ci
   ```
3. Create `.env.local` with production values.
4. Build the application:
   ```bash
   npm run build
   ```
5. Run the production server via process manager (e.g. PM2):
   ```bash
   pm2 start npm --name "fitness-web" -- run start -- -p 3000
   ```
6. Configure Nginx or Caddy as a reverse proxy with Let's Encrypt SSL certificates.

---

## 5. Production Verification Checklist

- [x] All 8 public routes load with HTTP 200.
- [x] Non-existent routes load custom 404 page with HTTP 404.
- [x] `/sitemap.xml` returns valid XML containing only intended public routes.
- [x] `/robots.txt` disallows `/api/` and points to sitemap.
- [x] Favicons (`/icon.svg`, `/apple-icon.svg`) render in browser tabs.
- [x] Contact Form submits and validates with honest demo handling.
- [x] Appointment Form submits and validates with honest inquiry handling.
- [x] Zero JavaScript errors in browser console.
- [x] Zero ESLint warnings or errors.
- [x] Zero TypeScript compilation errors.
- [x] Production build succeeds with 13 prerendered routes.
