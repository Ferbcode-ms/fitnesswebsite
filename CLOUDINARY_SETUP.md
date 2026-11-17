# Cloudinary Setup & Image Optimization Guide

## Overview
This document guides administrators and developers through setting up Cloudinary media storage for the women's fitness coaching platform.

The CMS integrates Cloudinary for image uploads, automatic format conversion (WebP/AVIF), responsive delivery, and signed cryptographic uploads to safeguard API secrets.

---

## 1. Setting Up Your Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/) and register for a free account.
2. In your Cloudinary Console dashboard, locate your **Product Environment Credentials**:
   - **Cloud Name** (e.g. `dxy...`)
   - **API Key** (e.g. `789...`)
   - **API Secret** (e.g. `abcdef...`)

---

## 2. Environment Configuration

Add the credentials to your `.env.local` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> **Security Note:** Never prefix `CLOUDINARY_API_SECRET` with `NEXT_PUBLIC_`. The API secret must only ever exist in server-side memory.

---

## 3. How Uploads Work (Signed Upload Architecture)

The media upload workflow operates without exposing credentials to the browser:

```
┌──────────────┐         1. Request upload signature        ┌─────────────────────────┐
│ Browser / CMS├───────────────────────────────────────────►│ /api/admin/media/sign   │
│ Client       │◄───────────────────────────────────────────┤ (Signs params server-   │
└──────┬───────┘   2. Returns signature, timestamp, apiKey  │  side with API Secret)  │
       │                                                    └─────────────────────────┘
       │ 3. Direct upload with file & signature
       ▼
┌─────────────────────────────┐
│ Cloudinary API              │
│ (https://api.cloudinary.com)│
└──────┬──────────────────────┘
       │ 4. Returns secure_url, public_id, width, height
       ▼
┌──────────────┐         5. Register asset metadata         ┌─────────────────────────┐
│ Browser / CMS├───────────────────────────────────────────►│ /api/admin/media/save   │
│ Client       │                                            │ (Inserts into Supabase  │
└──────────────┘                                            │  public.media_assets)   │
                                                            └─────────────────────────┘
```

---

## 4. Automatic Optimization & Remote Patterns

1. **Next.js Remote Patterns:**
   `next.config.ts` is preconfigured to accept Cloudinary CDN URLs:
   ```ts
   images: {
     formats: ["image/avif", "image/webp"],
     remotePatterns: [
       {
         protocol: "https",
         hostname: "res.cloudinary.com",
       },
     ],
   }
   ```

2. **Automatic Quality & Format:**
   Cloudinary URLs generated through `src/lib/cloudinary.ts` include `f_auto,q_auto` to ensure the visitor's browser receives the lightest WebP or AVIF asset with optimal compression.

---

## 5. Accidental Deletion Protection

When an administrator attempts to delete an image in the CMS Media Library (`/admin/media`), `deleteMediaAssetAction` executes an automatic reference check across:
- `public.classes` (`image_url`)
- `public.services` (`image_url`)
- `public.testimonials` (`avatar_url`)
- `public.bio_links` (`image_url`)

If the image is currently displayed on any published page, the deletion is rejected with a descriptive message, preventing broken images on the live website.

