# Supabase Database Schema & RLS Reference

## Overview
This document specifies the PostgreSQL tables, constraints, relationships, indexes, and Row-Level Security (RLS) policies implemented for the women's fitness coaching platform.

The complete migration file is located at `supabase/migrations/20261114000000_phase7_cms_schema.sql` and the seed data is in `supabase/seed.sql`.

---

## 1. Tables & Schema

### `admin_profiles`
Stores administrator authorization roles linked to Supabase Auth (`auth.users`).
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY, REFERENCES `auth.users(id)` ON DELETE CASCADE | Auth user ID |
| `email` | TEXT | NOT NULL, UNIQUE | Admin email address |
| `full_name` | TEXT | NOT NULL | Administrator's display name |
| `role` | TEXT | DEFAULT 'admin' CHECK IN ('super_admin', 'admin', 'editor') | Permission tier |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

### `site_settings`
Global website configuration and business contact identity.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT uuid_generate_v4() | Row identifier |
| `business_name` | TEXT | NOT NULL | Business name |
| `coach_name` | TEXT | NOT NULL | Head coach name |
| `tagline` | TEXT | NOT NULL | Brand tagline |
| `description` | TEXT | NOT NULL | Global meta description |
| `contact_email` | TEXT | NOT NULL | Primary contact inbox |
| `phone_number` | TEXT | NOT NULL | Studio phone / WhatsApp |
| `location` | TEXT | NOT NULL | Studio physical city/location |
| `logo_url` | TEXT | NULLABLE | Custom vector SVG / PNG logo |
| `instagram_url` | TEXT | NULLABLE | Instagram profile link |
| `facebook_url` | TEXT | NULLABLE | Facebook page link |
| `online_coaching_available` | BOOLEAN | DEFAULT true | Online coaching status |
| `online_coaching_summary` | TEXT | NOT NULL | Online availability note |
| `in_person_training_available` | BOOLEAN | DEFAULT true | In-person training status |
| `in_person_summary` | TEXT | NOT NULL | Studio availability note |
| `footer_text` | TEXT | NULLABLE | Custom footer disclaimer |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

### `pages`
Page metadata and SEO settings.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT uuid_generate_v4() | Identifier |
| `slug` | TEXT | NOT NULL, UNIQUE | Route slug ('home', 'about', etc.) |
| `title` | TEXT | NOT NULL | Administrative page name |
| `meta_title` | TEXT | NOT NULL | SEO document title |
| `meta_description` | TEXT | NOT NULL | Search engine description |
| `canonical_url` | TEXT | NULLABLE | Canonical route |
| `og_image_url` | TEXT | NULLABLE | Social sharing image URL |
| `status` | TEXT | DEFAULT 'published' CHECK IN ('draft', 'published') | Publication state |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

### `page_sections`
Structured modular sections for flexible page layout editing.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT uuid_generate_v4() | Identifier |
| `page_slug` | TEXT | REFERENCES `pages(slug)` ON DELETE CASCADE | Parent page |
| `section_key` | TEXT | NOT NULL | Unique section identifier ('hero', 'story') |
| `title` | TEXT | NOT NULL | Primary section heading |
| `subtitle` | TEXT | NULLABLE | Subtitle or eyebrow |
| `content` | JSONB | DEFAULT '{}'::jsonb | Flexible structured content payload |
| `image_url` | TEXT | NULLABLE | Section photo / background |
| `order_index` | INTEGER | DEFAULT 0 | Layout sorting order |
| `is_enabled` | BOOLEAN | DEFAULT true | Section display toggle |
| `status` | TEXT | DEFAULT 'published' CHECK IN ('draft', 'published') | Publication state |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

### `classes`
Signature training programmes.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT uuid_generate_v4() | Identifier |
| `title` | TEXT | NOT NULL | Programme title |
| `subtitle` | TEXT | NOT NULL | Programme subtitle / duration |
| `badge` | TEXT | NULLABLE | Highlight tag (e.g. 'MOST POPULAR') |
| `description` | TEXT | NOT NULL | Curriculum narrative |
| `specs` | JSONB | DEFAULT '[]'::jsonb | Key highlights / session count |
| `image_url` | TEXT | NOT NULL | Cover photo |
| `cta_text` | TEXT | DEFAULT 'APPLY FOR PROGRAMME' | Button label |
| `cta_link` | TEXT | DEFAULT '/appointments' | Button destination |
| `order_index` | INTEGER | DEFAULT 0 | Sorting order |
| `status` | TEXT | DEFAULT 'published' CHECK IN ('draft', 'published') | Publication state |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

### `services`
Coaching formats (In-person, online, hybrid).
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT uuid_generate_v4() | Identifier |
| `title` | TEXT | NOT NULL | Service title |
| `service_type` | TEXT | CHECK IN ('online', 'in_person', 'hybrid') | Service delivery format |
| `badge` | TEXT | NULLABLE | Tier badge |
| `summary` | TEXT | NOT NULL | Deliverables overview |
| `features` | JSONB | DEFAULT '[]'::jsonb | Inclusions checklist |
| `pricing_tier` | TEXT | NULLABLE | Price descriptor |
| `image_url` | TEXT | NULLABLE | Visual image |
| `cta_text` | TEXT | DEFAULT 'BOOK A CONSULTATION' | Button text |
| `cta_link` | TEXT | DEFAULT '/appointments' | Button destination |
| `order_index` | INTEGER | DEFAULT 0 | Display order |
| `status` | TEXT | DEFAULT 'published' CHECK IN ('draft', 'published') | Publication state |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

### `testimonials`
Client reviews and transformation quotes.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT uuid_generate_v4() | Identifier |
| `quote` | TEXT | NOT NULL | Client quote |
| `client_name` | TEXT | NOT NULL | Name (e.g. 'Sarah J.') |
| `client_role` | TEXT | NOT NULL | Training programme attended |
| `rating` | INTEGER | DEFAULT 5 CHECK (rating >= 1 AND rating <= 5) | Star rating |
| `avatar_url` | TEXT | NULLABLE | Headshot photo |
| `page_placement` | TEXT | DEFAULT 'all' CHECK IN ('all', 'home', 'about', 'classes') | Placement scope |
| `order_index` | INTEGER | DEFAULT 0 | Display sorting |
| `status` | TEXT | DEFAULT 'published' CHECK IN ('draft', 'published') | Publication state |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

### `appointments`
Private consultation inquiries submitted by prospective clients.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT uuid_generate_v4() | Identifier |
| `full_name` | TEXT | NOT NULL | Client's full name |
| `email` | TEXT | NOT NULL | Contact email |
| `phone` | TEXT | NULLABLE | Contact telephone |
| `session_type` | TEXT | NOT NULL | Selected service/session |
| `location_preference`| TEXT | NOT NULL | Online or Studio |
| `date_preference` | TEXT | NOT NULL | Target date |
| `time_of_day` | TEXT | NOT NULL | Morning, afternoon, or evening |
| `notes` | TEXT | NULLABLE | Client fitness goals / questions |
| `status` | TEXT | DEFAULT 'new' CHECK IN ('new', 'contacted', 'completed', 'cancelled') | Workflow state |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Submission timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | Status update timestamp |

### `bio_links`
Quick links and visual story cards for `/link-in-bio`.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT uuid_generate_v4() | Identifier |
| `title` | TEXT | NOT NULL | Button or card title |
| `subtitle` | TEXT | NULLABLE | Optional subtitle |
| `href` | TEXT | NOT NULL | Destination URL |
| `image_url` | TEXT | NULLABLE | Card cover photo |
| `is_primary` | BOOLEAN | DEFAULT false | Highlighted pill flag |
| `category` | TEXT | DEFAULT 'quick_link' CHECK IN ('quick_link', 'featured_story') | Display type |
| `order_index` | INTEGER | DEFAULT 0 | Sorting order |
| `is_enabled` | BOOLEAN | DEFAULT true | Visibility toggle |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

### `navigation_items`
Header and footer navigation menu.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT uuid_generate_v4() | Identifier |
| `label` | TEXT | NOT NULL | Menu link text |
| `href` | TEXT | NOT NULL | Destination path |
| `parent_id` | UUID | REFERENCES `navigation_items(id)` ON DELETE CASCADE | Sub-menu parent |
| `location` | TEXT | DEFAULT 'header' CHECK IN ('header', 'footer', 'both') | Menu location |
| `order_index` | INTEGER | DEFAULT 0 | Menu order |
| `is_enabled` | BOOLEAN | DEFAULT true | Active toggle |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

### `media_assets`
Cloudinary metadata repository with reference protection.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT uuid_generate_v4() | Identifier |
| `public_id` | TEXT | NOT NULL, UNIQUE | Cloudinary public identifier |
| `secure_url` | TEXT | NOT NULL | Full CDN delivery URL |
| `resource_type`| TEXT | DEFAULT 'image' | Asset resource type |
| `format` | TEXT | NULLABLE | File format (webp, jpg, png) |
| `width` | INTEGER | NULLABLE | Pixel width |
| `height` | INTEGER | NULLABLE | Pixel height |
| `bytes` | INTEGER | NULLABLE | File size in bytes |
| `alt_text` | TEXT | NULLABLE | Accessibility alt description |
| `folder` | TEXT | DEFAULT 'fitness-cms' | Cloudinary storage folder |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Upload timestamp |

---

## 2. Row Level Security (RLS) Policies

All tables have RLS explicitly enabled:

1. **`admin_profiles`**:
   - `SELECT`: Restricted to authenticated users for their own row (`auth.uid() = id`).
   - `UPDATE`: Restricted to authenticated users for their own row (`auth.uid() = id`).

2. **Public Content Tables (`site_settings`, `pages`, `page_sections`, `classes`, `services`, `testimonials`, `bio_links`, `navigation_items`, `media_assets`)**:
   - `SELECT`: Allowed for `anon` and `authenticated` WHERE `status = 'published'` AND `is_enabled = true`.
   - `ALL` (`INSERT`, `UPDATE`, `DELETE`): Allowed only for authenticated users whose `auth.uid()` exists in `public.admin_profiles`.

3. **`appointments` (Strict Privacy Rule)**:
   - `INSERT`: Allowed for `anon` and `authenticated` with validation check (allows visitors to submit consultation inquiries).
   - `SELECT`: **Denied to public visitors.** Allowed only for authenticated administrators (`EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())`).
   - `UPDATE`: Allowed only for authenticated administrators.
   - `DELETE`: Allowed only for authenticated administrators.

