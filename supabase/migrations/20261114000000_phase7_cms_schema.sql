-- ==============================================================================
-- PHASE 7: COMPLETE CMS & DATABASE SCHEMA
-- Women's Fitness Coaching (Next.js + Supabase PostgreSQL)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. ADMIN PROFILES
-- Stores admin authorization for Supabase authenticated users
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view their own profile"
  ON public.admin_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update their own profile"
  ON public.admin_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- 2. SITE SETTINGS (GLOBAL CONFIGURATION)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL DEFAULT '[Brand / Coaching Studio Name]',
  coach_name TEXT NOT NULL DEFAULT '[Coach Name]',
  tagline TEXT NOT NULL DEFAULT '[Women''s Fitness Coaching Tagline Placeholder]',
  description TEXT NOT NULL DEFAULT 'Personalised women''s fitness coaching offering both online fitness coaching and in-person personal training to build strength, fitness, and confidence.',
  contact_email TEXT NOT NULL DEFAULT '[email@placeholder.com]',
  phone_number TEXT NOT NULL DEFAULT '[Phone Number Placeholder]',
  location TEXT NOT NULL DEFAULT '[Studio Location / City Placeholder]',
  logo_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  online_coaching_available BOOLEAN NOT NULL DEFAULT true,
  online_coaching_summary TEXT NOT NULL DEFAULT '[Online Fitness Coaching Availability Placeholder]',
  in_person_training_available BOOLEAN NOT NULL DEFAULT true,
  in_person_summary TEXT NOT NULL DEFAULT '[In-Person Personal Training Availability Placeholder]',
  footer_text TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site settings"
  ON public.site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins manage site settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- ------------------------------------------------------------------------------
-- 3. PAGES (METADATA & SEO)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  canonical_url TEXT,
  og_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published pages"
  ON public.pages FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins manage all pages"
  ON public.pages FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- ------------------------------------------------------------------------------
-- 4. PAGE SECTIONS (STRUCTURED SECTION CONTENT)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.page_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug TEXT NOT NULL REFERENCES public.pages(slug) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  image_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(page_slug, section_key)
);

ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published sections"
  ON public.page_sections FOR SELECT
  TO anon, authenticated
  USING (status = 'published' AND is_enabled = true);

CREATE POLICY "Admins manage sections"
  ON public.page_sections FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- ------------------------------------------------------------------------------
-- 5. CLASSES & PROGRAMMES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  badge TEXT,
  description TEXT NOT NULL,
  specs JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_url TEXT NOT NULL,
  cta_text TEXT NOT NULL DEFAULT 'APPLY FOR PROGRAMME',
  cta_link TEXT NOT NULL DEFAULT '/appointments',
  order_index INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published classes"
  ON public.classes FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins manage classes"
  ON public.classes FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- ------------------------------------------------------------------------------
-- 6. SERVICES (ONLINE COACHING & IN-PERSON TRAINING)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('online', 'in_person', 'hybrid')),
  badge TEXT,
  summary TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  pricing_tier TEXT,
  image_url TEXT,
  cta_text TEXT NOT NULL DEFAULT 'BOOK A CONSULTATION',
  cta_link TEXT NOT NULL DEFAULT '/appointments',
  order_index INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published services"
  ON public.services FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins manage services"
  ON public.services FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- ------------------------------------------------------------------------------
-- 7. TESTIMONIALS (REAL CLIENT REVIEWS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_role TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  page_placement TEXT NOT NULL DEFAULT 'all' CHECK (page_placement IN ('all', 'home', 'about', 'classes')),
  order_index INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published testimonials"
  ON public.testimonials FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins manage testimonials"
  ON public.testimonials FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- ------------------------------------------------------------------------------
-- 8. APPOINTMENTS (INQUIRIES - PRIVATE ADMIN ONLY)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  session_type TEXT NOT NULL,
  location_preference TEXT NOT NULL,
  date_preference TEXT NOT NULL,
  time_of_day TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to submit consultation inquiries
CREATE POLICY "Public insert appointments"
  ON public.appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Strictly protect reading, updating, and deleting appointments to authenticated admins
CREATE POLICY "Admins manage appointments"
  ON public.appointments FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

CREATE POLICY "Admins update appointments"
  ON public.appointments FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

CREATE POLICY "Admins delete appointments"
  ON public.appointments FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- ------------------------------------------------------------------------------
-- 9. BIO LINKS (LINK IN BIO PAGE)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bio_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  href TEXT NOT NULL,
  image_url TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  category TEXT NOT NULL DEFAULT 'quick_link' CHECK (category IN ('quick_link', 'featured_story')),
  order_index INTEGER NOT NULL DEFAULT 0,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.bio_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read enabled bio links"
  ON public.bio_links FOR SELECT
  TO anon, authenticated
  USING (is_enabled = true);

CREATE POLICY "Admins manage bio links"
  ON public.bio_links FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- ------------------------------------------------------------------------------
-- 10. NAVIGATION ITEMS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.navigation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  parent_id UUID REFERENCES public.navigation_items(id) ON DELETE CASCADE,
  location TEXT NOT NULL DEFAULT 'header' CHECK (location IN ('header', 'footer', 'both')),
  order_index INTEGER NOT NULL DEFAULT 0,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read enabled navigation"
  ON public.navigation_items FOR SELECT
  TO anon, authenticated
  USING (is_enabled = true);

CREATE POLICY "Admins manage navigation"
  ON public.navigation_items FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- ------------------------------------------------------------------------------
-- 11. MEDIA ASSETS (CLOUDINARY METADATA)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  public_id TEXT NOT NULL UNIQUE,
  secure_url TEXT NOT NULL,
  resource_type TEXT NOT NULL DEFAULT 'image',
  format TEXT,
  width INTEGER,
  height INTEGER,
  bytes INTEGER,
  alt_text TEXT,
  folder TEXT DEFAULT 'fitness-cms',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read media assets"
  ON public.media_assets FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins manage media assets"
  ON public.media_assets FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- ------------------------------------------------------------------------------
-- INDEXES FOR OPTIMAL QUERY PERFORMANCE
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_page_sections_page_slug ON public.page_sections(page_slug);
CREATE INDEX IF NOT EXISTS idx_classes_order ON public.classes(order_index) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services(order_index) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_testimonials_placement ON public.testimonials(page_placement) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bio_links_order ON public.bio_links(order_index) WHERE is_enabled = true;
CREATE INDEX IF NOT EXISTS idx_navigation_order ON public.navigation_items(order_index) WHERE is_enabled = true;
CREATE INDEX IF NOT EXISTS idx_media_assets_created ON public.media_assets(created_at DESC);
