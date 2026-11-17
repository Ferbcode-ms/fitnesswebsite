import { cache } from "react";
import { createClient, createPublicClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { siteConfig } from "@/config/site";
import { optimizeCloudinaryUrl } from "@/lib/utils";

// In-memory cache to eliminate external database round-trip latency on repeated page visits
const memoryCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour TTL with background revalidation on CMS save

export function clearCmsCache(prefix?: string) {
  if (!prefix) {
    memoryCache.clear();
  } else {
    for (const key of memoryCache.keys()) {
      if (key.startsWith(prefix)) {
        memoryCache.delete(key);
      }
    }
  }
}

export interface ClassItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string | null;
  description: string;
  specs: string[];
  image_url?: string | null;
  cta_text: string;
  cta_link: string;
  order_index: number;
  status: "draft" | "published";
}

export interface ServiceItem {
  id: string;
  title: string;
  service_type: "online" | "in_person" | "hybrid";
  badge?: string | null;
  summary: string;
  features: string[];
  pricing_tier?: string | null;
  image_url?: string | null;
  cta_text: string;
  cta_link: string;
  order_index: number;
  status: "draft" | "published";
}

export interface TestimonialItem {
  id: string;
  quote: string;
  client_name: string;
  client_role: string;
  rating: number;
  avatar_url?: string | null;
  page_placement: "home" | "about" | "classes" | "services" | "all";
  order_index: number;
  status: "draft" | "published";
}

/**
 * Fetch Site Settings (Global)
 */
export const getSiteSettings = cache(async function getSiteSettings() {
  const defaults = {
    business_name: siteConfig.businessName,
    coach_name: siteConfig.coachName,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    contact_email: siteConfig.contactEmail,
    phone_number: siteConfig.phoneNumber,
    location: siteConfig.location,
    logo_url: null,
    instagram_url: siteConfig.social.instagramUrl,
    facebook_url: siteConfig.social.facebookUrl,
    online_coaching_available: siteConfig.availability.onlineCoachingAvailable,
    online_coaching_summary: siteConfig.availability.onlineCoachingSummary,
    in_person_training_available: siteConfig.availability.inPersonTrainingAvailable,
    in_person_summary: siteConfig.availability.inPersonSummary,
    footer_text: null,
  };

  const cacheKey = "site_settings";
  const cached = memoryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data as typeof defaults;
  }

  if (!isSupabaseConfigured()) {
    return defaults;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("id, business_name, coach_name, tagline, description, contact_email, phone_number, location, logo_url, instagram_url, facebook_url, online_coaching_available, online_coaching_summary, in_person_training_available, in_person_summary, footer_text")
      .limit(1);
    if (!error && data && data.length > 0) {
      const row = data[0];
      const result = {
        id: row.id,
        business_name: row.business_name && !row.business_name.startsWith("[") ? row.business_name : defaults.business_name,
        coach_name: row.coach_name && !row.coach_name.startsWith("[") ? row.coach_name : defaults.coach_name,
        tagline: row.tagline && !row.tagline.startsWith("[") ? row.tagline : defaults.tagline,
        description: row.description || defaults.description,
        contact_email: row.contact_email && !row.contact_email.includes("[email@") ? row.contact_email : defaults.contact_email,
        phone_number: row.phone_number && !row.phone_number.startsWith("[") ? row.phone_number : defaults.phone_number,
        location: row.location && !row.location.startsWith("[") ? row.location : defaults.location,
        logo_url: optimizeCloudinaryUrl(row.logo_url) || null,
        instagram_url: row.instagram_url && !row.instagram_url.startsWith("[") ? row.instagram_url : defaults.instagram_url,
        facebook_url: row.facebook_url && !row.facebook_url.startsWith("[") ? row.facebook_url : defaults.facebook_url,
        online_coaching_available: typeof row.online_coaching_available === "boolean" ? row.online_coaching_available : defaults.online_coaching_available,
        online_coaching_summary: row.online_coaching_summary && !row.online_coaching_summary.startsWith("[") ? row.online_coaching_summary : defaults.online_coaching_summary,
        in_person_training_available: typeof row.in_person_training_available === "boolean" ? row.in_person_training_available : defaults.in_person_training_available,
        in_person_summary: row.in_person_summary && !row.in_person_summary.startsWith("[") ? row.in_person_summary : defaults.in_person_summary,
        footer_text: row.footer_text || null,
      };
      memoryCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    }
  } catch (err) {
    console.error("Error fetching site_settings:", err);
  }

  if (cached) {
    return cached.data as typeof defaults;
  }

  return defaults;
});

/**
 * Fetch Published Classes (Public)
 */
export const getClasses = cache(async function getClasses(onlyPublished = true): Promise<ClassItem[]> {
  const cacheKey = `classes_${onlyPublished}`;
  const cached = memoryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data as ClassItem[];
  }

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    let query = supabase
      .from("classes")
      .select("id, title, subtitle, badge, description, specs, image_url, cta_text, cta_link, order_index, status")
      .order("order_index", { ascending: true });
    if (onlyPublished) {
      query = query.eq("status", "published");
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      const result: ClassItem[] = data.map((item) => ({
        ...item,
        image_url: optimizeCloudinaryUrl(item.image_url, { width: 800 }) || item.image_url || null,
        specs: Array.isArray(item.specs)
          ? item.specs
          : typeof item.specs === "string"
          ? JSON.parse(item.specs)
          : [],
      }));
      memoryCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    }
  } catch (err) {
    console.error("Error querying classes:", err);
  }

  if (cached) {
    return cached.data as ClassItem[];
  }

  return [];
});

/**
 * Fetch Published Services (Public)
 */
export const getServices = cache(async function getServices(onlyPublished = true): Promise<ServiceItem[]> {
  const cacheKey = `services_${onlyPublished}`;
  const cached = memoryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data as ServiceItem[];
  }

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    let query = supabase
      .from("services")
      .select("id, title, service_type, badge, summary, features, pricing_tier, image_url, cta_text, cta_link, order_index, status")
      .order("order_index", { ascending: true });
    if (onlyPublished) {
      query = query.eq("status", "published");
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      const result: ServiceItem[] = data.map((item) => ({
        ...item,
        image_url: optimizeCloudinaryUrl(item.image_url, { width: 800 }) || item.image_url || null,
        features: Array.isArray(item.features)
          ? item.features
          : typeof item.features === "string"
          ? JSON.parse(item.features)
          : [],
      }));
      memoryCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    }
  } catch (err) {
    console.error("Error querying services:", err);
  }

  if (cached) {
    return cached.data as ServiceItem[];
  }

  return [];
});

/**
 * Fetch Testimonials (Public)
 */
export const getTestimonials = cache(async function getTestimonials(placement = "all", onlyPublished = true): Promise<TestimonialItem[]> {
  const cacheKey = `testimonials_${placement}_${onlyPublished}`;
  const cached = memoryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data as TestimonialItem[];
  }

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    let query = supabase
      .from("testimonials")
      .select("id, quote, client_name, client_role, rating, avatar_url, page_placement, order_index, status")
      .order("order_index", { ascending: true });
    if (onlyPublished) {
      query = query.eq("status", "published");
    }
    if (placement !== "all") {
      query = query.or(`page_placement.eq.${placement},page_placement.eq.all`);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      const result: TestimonialItem[] = data.map((t) => ({
        ...t,
        avatar_url: optimizeCloudinaryUrl(t.avatar_url, { width: 120, height: 120 }) || t.avatar_url || null,
      }));
      memoryCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    }
  } catch {
    // Graceful fallback
  }

  if (cached) {
    return cached.data as TestimonialItem[];
  }

  return [];
});

/**
 * Fetch Page Sections for a given page
 */
export const getPageSections = cache(async function getPageSections(pageSlug: string, onlyPublished = true) {
  const cacheKey = `page_sections_${pageSlug}_${onlyPublished}`;
  const cached = memoryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data as Array<Record<string, unknown>>;
  }

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    let query = supabase
      .from("page_sections")
      .select("id, page_slug, section_key, title, subtitle, content, image_url, order_index, is_enabled, status")
      .eq("page_slug", pageSlug)
      .order("order_index", { ascending: true });

    if (onlyPublished) {
      query = query.eq("status", "published").eq("is_enabled", true);
    }
    const { data, error } = await query;
    if (!error && data) {
      const result = data.map((s) => ({
        ...s,
        image_url: optimizeCloudinaryUrl(s.image_url, { width: 1600 }) || s.image_url,
        content: typeof s.content === "string" ? JSON.parse(s.content) : s.content || {},
      }));
      memoryCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    }
  } catch (err) {
    console.error("Error querying page_sections:", err);
  }

  if (cached) {
    return cached.data as Array<Record<string, unknown>>;
  }

  return [];
});

/**
 * Fetch Page SEO / Metadata
 */
export const getPageSeo = cache(async function getPageSeo(slug: string) {
  const cacheKey = `page_seo_${slug}`;
  const cached = memoryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("pages")
      .select("slug, title, meta_title, meta_description, canonical_url, og_image_url, status")
      .eq("slug", slug)
      .single();
    if (!error && data) {
      memoryCache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    }
  } catch {
    // Graceful fallback
  }

  if (cached) {
    return cached.data;
  }

  return null;
});

/**
 * Fetch Appointments (Admin only, paginated)
 */
export async function getAppointments(statusFilter?: string, page = 1, pageSize = 50) {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("appointments")
      .select("id, full_name, email, phone, session_type, location_preference, date_preference, time_of_day, notes, status, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (statusFilter && statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error } = await query;
    if (!error && data) return data;
  } catch (err) {
    console.error("Error querying appointments:", err);
  }
  return [];
}

/**
 * Fetch Media Assets (Admin only, paginated)
 */
export async function getMediaAssets(searchTerm?: string, page = 1, pageSize = 24) {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("media_assets")
      .select("id, public_id, secure_url, resource_type, width, height, format, alt_text, created_at")
      .order("created_at", { ascending: false });

    if (searchTerm) {
      query = query.or(`public_id.ilike.%${searchTerm}%,alt_text.ilike.%${searchTerm}%`);
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error } = await query;
    if (!error && data) return data;
  } catch (err) {
    console.error("Error querying media_assets:", err);
  }
  return [];
}

/**
 * Dashboard Statistics (Real Supabase Counts)
 */
export async function getDashboardStats() {
  if (!isSupabaseConfigured()) {
    return {
      publishedServices: 0,
      publishedClasses: 0,
      publishedTestimonials: 0,
      newAppointments: 0,
      recentUpdates: [],
    };
  }

  try {
    const supabase = await createClient();

    const [servicesRes, classesRes, testimonialsRes, appointmentsRes] = await Promise.all([
      supabase.from("services").select("id", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("classes").select("id", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("testimonials").select("id", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "new"),
    ]);

    return {
      publishedServices: servicesRes.count ?? 0,
      publishedClasses: classesRes.count ?? 0,
      publishedTestimonials: testimonialsRes.count ?? 0,
      newAppointments: appointmentsRes.count ?? 0,
      recentUpdates: [],
    };
  } catch {
    return {
      publishedServices: 0,
      publishedClasses: 0,
      publishedTestimonials: 0,
      newAppointments: 0,
      recentUpdates: [],
    };
  }
}
