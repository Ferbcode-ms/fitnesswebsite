-- ==============================================================================
-- PHASE 8: PERFORMANCE OPTIMIZATION INDEXES & CONSTRAINTS
-- Accelerates public page rendering, ISR revalidation, and admin pagination.
-- ==============================================================================

-- 1. Page Sections: composite index for page-level section queries
CREATE INDEX IF NOT EXISTS idx_page_sections_perf 
  ON public.page_sections (page_slug, status, is_enabled, order_index);

-- 2. Classes: composite index for published classes sorting
CREATE INDEX IF NOT EXISTS idx_classes_perf 
  ON public.classes (status, order_index);

-- 3. Services: composite index for published services sorting
CREATE INDEX IF NOT EXISTS idx_services_perf 
  ON public.services (status, order_index);

-- 4. Testimonials: composite index for placement and ordering
CREATE INDEX IF NOT EXISTS idx_testimonials_perf 
  ON public.testimonials (status, page_placement, order_index);

-- 5. Appointments: index for admin status filtering and descending chronology
CREATE INDEX IF NOT EXISTS idx_appointments_perf 
  ON public.appointments (status, created_at DESC);

-- 6. Pages (SEO & Metadata): index for slug lookup and published status
CREATE INDEX IF NOT EXISTS idx_pages_perf 
  ON public.pages (slug, status);

-- 7. Media Assets: index for descending chronology and pagination
CREATE INDEX IF NOT EXISTS idx_media_assets_perf 
  ON public.media_assets (created_at DESC);

