# FUNCTIONALITY AUDIT — Phase 5
## Women's Fitness Coaching Website

**Environment:** Next.js 14 / Next.js 15 (App Router), TypeScript, Tailwind CSS  
**Target Domain:** Female Fitness Coach (Online Coaching & In-Person Personal Training)  
**Scope:** Navigation, Forms, Validation, Interactive State Feedback, Backend Dependencies  
**Audit Status:** Completed & Fully Verified  

---

## 1. Inventory of Interactive Elements

| Component / Feature | Location | Trigger Type | Action & Destination | Status |
|---|---|---|---|---|
| **Site Logo** | Header & Mobile Drawer | Click | Navigates to `/` (Homepage) | WORKING |
| **Main Nav Links** | Header Navigation | Click / Tab | Navigates to `/`, `/about`, `/classes`, `/services`, `/contact` | WORKING |
| **Services Dropdown** | Desktop Header | Hover / Click / Focus | Reveals submenu: `All Services`, `Classes & Programmes`, `1-to-1 Coaching` | WORKING |
| **Dropdown Outside Click** | Desktop Header | Document Click | Closes open desktop dropdown menu | WORKING |
| **Dropdown Escape Key** | Desktop Header | `Escape` Keydown | Closes open dropdown and restores focus | WORKING |
| **Booking CTA Button** | Header & Footer | Click / Enter | Navigates to `/appointments` | WORKING |
| **Mobile Hamburger Toggle** | Mobile Header | Tap / Click | Opens full-screen mobile navigation drawer | WORKING |
| **Mobile Drawer Escape Key** | Mobile Drawer | `Escape` Keydown | Closes mobile drawer and unlocks body scroll | WORKING |
| **Mobile Submenu Drilldown** | Mobile Drawer | Tap / Click | Drills into Services submenu; displays `Back to Main Menu` button | WORKING |
| **Mobile Link Navigation** | Mobile Drawer | Tap / Click | Navigates to target route and automatically closes mobile drawer | WORKING |
| **Skip-to-Content Link** | Header | Keyboard Focus | Jumps keyboard focus directly to `#main-content` | WORKING |
| **Hero Start Today Button** | Homepage Hero | Click / Enter | Navigates to `/appointments` | WORKING |
| **Comparison CTA Button** | Homepage Comparison | Click / Enter | Navigates to `/appointments` | WORKING |
| **Folder Card CTAs** | Homepage & Classes | Click / Enter | Card 1 $\to$ `/services`, Card 2 $\to$ `/appointments`, Card 3 $\to$ `/appointments` | WORKING |
| **Coach Bio Learn More** | Homepage Coach Bio | Click / Enter | Navigates to `/about` | WORKING |
| **App Store Showcase CTAs** | Homepage App Showcase | Click / Enter | Button 1 $\to$ `/single-service`, Button 2 $\to$ `/appointments` | WORKING |
| **Blog Preview CTAs** | Homepage Journal | Click / Enter | Navigates to `/services` (excluded route handled cleanly) | WORKING |
| **Bottom Split CTA Buttons** | Subpage Footers | Click / Enter | Navigates to `/appointments` | WORKING |
| **Testimonial Carousel** | `/about` Page | Click / Keyboard | Cycles between 3 client slides forwards/backwards; updates indicator dots | WORKING |
| **FAQ Accordion Items** | `/classes` Page | Click / Keyboard | Toggles expandable answers with smooth height transitions & ARIA state | WORKING |
| **Contact Form** | `/contact` Page | Form Submit | Client & server validation, dispatches to `/api/contact`, honest demo state | WORKING |
| **Appointment Form** | `/appointments` Page | Form Submit | Radio selections, date picker, dispatches to `/api/appointments`, honest inquiry state | WORKING |
| **VIP Newsletter Form** | Footer | Form Submit | Validates email pattern; displays honest integration notice | WORKING |
| **Starter Guide Form** | Homepage Lead Magnet | Form Submit | Validates first/last name & email; displays honest demo confirmation | WORKING |
| **Link-in-Bio Quick Pills** | `/link-in-bio` Page | Tap / Click | Direct links to booking, services, mentorship, classes, about, contact | WORKING |
| **Link-in-Bio Socials** | `/link-in-bio` Page | Tap / Click | Opens configured external URLs; displays unconfigured status when null | WORKING |
| **Footer Social Links** | Footer | Tap / Click | Renders active external links when provided; displays `(TBA)` when null | WORKING |

---

## 2. Forms & Validation Behavior

### 2.1 Contact Form (`/contact` & `/api/contact`)
- **Required Fields:** Full Name, Email Address, Message.
- **Optional Fields:** Phone Number, Inquiry Type (select dropdown default: `online-coaching`).
- **Validation Rules:**
  - Full Name: Non-empty, minimum 2 characters.
  - Email: RFC-compliant email pattern regex (`user@domain.tld`).
  - Message: Non-empty, minimum 10 characters.
- **Client-Side UX:**
  - Inline error text rendered directly underneath each invalid field with red border highlights.
  - Form errors clear automatically as the user types in the corrected field.
  - Button switches to disabled state with loading spinner (`"Sending Inquiry..."`) during submission.
- **Backend API Route (`/api/contact`):**
  - Re-validates all fields server-side; returns HTTP 400 with a structured `{ errors: { field: message } }` map on validation failure.
  - Inspects `process.env.RESEND_API_KEY`, `process.env.CONTACT_EMAIL_WEBHOOK`, and `process.env.SMTP_HOST`.
- **Honest Delivery Handling:**
  - When no email service is configured (demo mode), the API logs the payload to the server console and responds with `delivered: false` and `mode: "demo_unconfigured"`.
  - The UI displays an honest amber notice:
    > *"Inquiry Validated (Demo Environment): Your message has been validated. Note: No external email provider is configured in environment variables, so this message was not sent to an external inbox. Configure your provider in .env to enable live delivery."*
  - Includes a clear reset button (`"Send another inquiry"`).

### 2.2 Appointment Request Form (`/appointments` & `/api/appointments`)
- **Required Fields:** Session Type (radio), Format (radio), Preferred Date, Full Name, Email Address.
- **Optional Fields:** Preferred Time Window (select), Phone Number, Fitness Goals / Notes (textarea).
- **Validation Rules:**
  - Session Type: Must be one of `strategy-call`, `movement-screen`, `pt-session`.
  - Format: Must be `online` or `in-person`.
  - Preferred Date: Required; cannot be a past date.
  - Email: Valid email format.
  - Full Name: Non-empty string.
- **Client-Side UX:**
  - Custom styled radio cards with visual active states (ring and background tint).
  - Native HTML5 date picker with past date validation.
  - Prominent informational banner:
    > *"Please note: This form submits an appointment inquiry. It is not an instant booking. Our coaching team will personally review your preferred date and reach out to confirm availability."*
- **Backend API Route (`/api/appointments`):**
  - Server-side validation; logs request details to the server console.
  - Responds with `isConfirmedBooking: false` and `mode: "inquiry_logged"`.
- **Honest Booking Handling:**
  - Does NOT invent fictitious available slots.
  - Does NOT claim an automated confirmed calendar event was booked.
  - Displays a detailed inquiry summary with client name, requested session type, format, and requested date/time window.
  - Explains that the coaching team reviews requests and will contact the client within 1 business day.

### 2.3 Newsletter & Starter Guide Forms
- **Newsletter Form (Footer):**
  - Validates email format before submission.
  - Submits and renders confirmation: *"✓ Email Validated (user@example.com). Demo Mode: In production, connect your newsletter API key in .env.local."*
- **Starter Guide Form (Homepage):**
  - Validates First Name, Last Name, and Email.
  - Renders inline errors for missing fields.
  - Submits and renders confirmation: *"✓ Request Validated for [Name]. Demo Environment: In production, connect an automated PDF dispatch webhook or email provider."*

---

## 3. Backend Dependencies & Environment Variables

| Feature | Environment Variable | Status if Unset | Integration Guide |
|---|---|---|---|
| **Contact Form Email Dispatch** | `RESEND_API_KEY` or `SMTP_HOST` | Validates locally; shows honest demo notice; logs payload to server console | Set `RESEND_API_KEY=re_...` in `.env.local` to trigger live emails via Resend |
| **Contact Webhook** | `CONTACT_EMAIL_WEBHOOK` | Fallback if Resend is unset | Set webhook endpoint (e.g. Zapier, Make, or custom HTTP endpoint) |
| **Appointment Calendar Sync** | `ACUITY_API_KEY` or `CALENDLY_TOKEN` | Logs inquiry as unconfirmed request; shows client recap | Set provider credentials in `.env.local` or embed Acuity iframe |
| **Email Marketing** | `NEWSLETTER_API_KEY` | Validates locally with demo notice | Set provider credentials (e.g. ConvertKit, Mailchimp, Klaviyo) |

---

## 4. Navigation & Route Integrity

- **Excluded Routes Handled Cleanly:**
  - Per Phase 1 scope, `/the-app`, `/blog`, `/shop`, and `/sales-page` are excluded.
  - Any request to an unmapped path (e.g. `/shop`, `/blog`, `/random`) correctly resolves to the custom styled `not-found.tsx` page (HTTP 404) with navigation back to Home or Contact.
  - All navigation bars, dropdowns, folder cards, and footer links point strictly to valid internal active routes (`/`, `/about`, `/classes`, `/services`, `/single-service`, `/contact`, `/appointments`, `/link-in-bio`).
- **Social Media Placeholders:**
  - In `siteConfig.ts`, social URLs are initialized to `null`.
  - When `null`, links render with disabled styling and explicit `(TBA)` indicators rather than broken `#` jump anchors.

