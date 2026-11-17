# ROUTE INVENTORY — Women's Fitness Coaching Website

All routes are implemented under Next.js App Router (`src/app/`). Only the required public pages exist; no duplicate homepage routes or unused Squarespace template pages are present.

---

## 1. Active Routes

| Route | File Path | Main Nav? | Purpose | Phase 1 State |
|---|---|---|---|---|
| `/` | `src/app/page.tsx` | Yes (`Home`) | Primary landing page | Minimal structural placeholder |
| `/about` | `src/app/about/page.tsx` | Yes (`About`) | Coach background, qualifications & coaching philosophy | Minimal structural placeholder |
| `/classes` | `src/app/classes/page.tsx` | Yes (`Classes`, also in `Services` dropdown) | Women's fitness programmes & group coaching options | Minimal structural placeholder |
| `/services` | `src/app/services/page.tsx` | Yes (`Services` dropdown parent) | Overview of online & in-person coaching services | Minimal structural placeholder |
| `/single-service` | `src/app/single-service/page.tsx` | Yes (inside `Services` dropdown) | Deep dive for 1-to-1 / individual coaching service | Minimal structural placeholder |
| `/contact` | `src/app/contact/page.tsx` | Yes (`Contact`) | Coaching enquiries & consultation contact | Minimal structural placeholder |
| `/appointments` | `src/app/appointments/page.tsx` | Booking CTA (`Book a Session`) | Consultation & personal training session booking | Minimal structural placeholder |
| `/link-in-bio` | `src/app/link-in-bio/page.tsx` | No (direct URL only) | Social media link landing page | Minimal structural placeholder |
| `/_not-found` | `src/app/not-found.tsx` | No | Custom styled 404 page | Structural 404 layout |

---

## 2. Intentionally Excluded Routes

The following routes from the Squarespace visual reference are **excluded** and must return the custom `404` page:

| Excluded Route | Reason for Exclusion |
|---|---|
| `/the-app` | Excluded per Phase 1 scope |
| `/blog` | Excluded per Phase 1 scope |
| `/shop` | Excluded per Phase 1 scope |
| `/sales-page` | Excluded per Phase 1 scope |
| `/course-1` | Excluded per Phase 1 scope |
| `/podcast` | Excluded per Phase 1 scope (was also broken 404 in reference) |
| `/work-with-me` | Excluded per Phase 1 scope (was also broken 404 in reference) |
| `/home` | Duplicate homepage route intentionally omitted (`/` is canonical) |

