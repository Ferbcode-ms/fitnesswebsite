import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const siteSettingsSchema = z.object({
  business_name: z.string().min(1, "Business name is required."),
  coach_name: z.string().min(1, "Coach name is required."),
  tagline: z.string().min(1, "Tagline is required."),
  description: z.string().min(1, "Description is required."),
  contact_email: z.string().min(3, "Contact email is required."),
  phone_number: z.string().min(1, "Phone number is required."),
  location: z.string().min(1, "Location is required."),
  logo_url: z.string().nullable().optional(),
  instagram_url: z.string().nullable().optional(),
  facebook_url: z.string().nullable().optional(),
  online_coaching_available: z.boolean().default(true),
  online_coaching_summary: z.string().min(1, "Online summary required."),
  in_person_training_available: z.boolean().default(true),
  in_person_summary: z.string().min(1, "In-person summary required."),
  footer_text: z.string().nullable().optional(),
});

export const classSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, "Class title is required."),
  subtitle: z.string().min(2, "Subtitle is required."),
  badge: z.string().nullable().optional(),
  description: z.string().min(10, "Description must be at least 10 characters."),
  specs: z.array(z.string()).default([]),
  image_url: z.string().min(1, "Image is required."),
  cta_text: z.string().default("APPLY FOR PROGRAMME"),
  cta_link: z.string().default("/appointments"),
  order_index: z.number().int().default(0),
  status: z.enum(["draft", "published"]).default("published"),
});

export const serviceSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, "Service title is required."),
  service_type: z.enum(["online", "in_person", "hybrid"]),
  badge: z.string().nullable().optional(),
  summary: z.string().min(10, "Summary must be at least 10 characters."),
  features: z.array(z.string()).default([]),
  pricing_tier: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  cta_text: z.string().default("BOOK A CONSULTATION"),
  cta_link: z.string().default("/appointments"),
  order_index: z.number().int().default(0),
  status: z.enum(["draft", "published"]).default("published"),
});

export const testimonialSchema = z.object({
  id: z.string().uuid().optional(),
  quote: z.string().min(10, "Quote must be at least 10 characters."),
  client_name: z.string().min(2, "Client name is required."),
  client_role: z.string().min(2, "Client role is required."),
  rating: z.number().int().min(1).max(5).default(5),
  avatar_url: z.string().nullable().optional(),
  page_placement: z.enum(["all", "home", "about", "classes"]).default("all"),
  order_index: z.number().int().default(0),
  status: z.enum(["draft", "published"]).default("published"),
});

export const appointmentUpdateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "completed", "cancelled"]),
  notes: z.string().nullable().optional(),
});

export const seoSchema = z.object({
  slug: z.string().min(1, "Page slug is required."),
  title: z.string().min(1, "Page title is required."),
  meta_title: z.string().min(1, "Meta title is required."),
  meta_description: z.string().min(10, "Meta description must be at least 10 characters."),
  canonical_url: z.string().nullable().optional(),
  og_image_url: z.string().nullable().optional(),
  status: z.enum(["draft", "published"]).default("published"),
});

export const homepageSectionSchema = z.object({
  section_key: z.string(),
  title: z.string(),
  subtitle: z.string().nullable().optional(),
  content: z.record(z.string(), z.any()).default({}),
  image_url: z.string().nullable().optional(),
  is_enabled: z.boolean().default(true),
  order_index: z.number().int().default(0),
});
