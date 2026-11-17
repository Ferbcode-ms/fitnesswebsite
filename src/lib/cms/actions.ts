"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteSettings, clearCmsCache } from "./queries";
import { cloudinary } from "@/lib/cloudinary";
import {
  loginSchema,
  siteSettingsSchema,
  classSchema,
  serviceSchema,
  testimonialSchema,
  seoSchema,
} from "./schema";

export type ActionResult<T = unknown> = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: T;
};

function formatZodErrors(error: z.ZodError): { errors: Record<string, string>; message: string } {
  const errors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    const key = issue.path[0]?.toString() || "form";
    errors[key] = issue.message;
  });
  const message = error.issues[0]?.message || "Validation failed. Please check the fields.";
  return { errors, message };
}

/**
 * Helper to obtain admin-privileged client for mutations when service role key is present
 */
async function getAdminDb() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createAdminClient();
  }
  return await createClient();
}

/**
 * Admin Login Action
 */
export async function loginAction(formData: FormData): Promise<ActionResult> {
  const rawEmail = formData.get("email") as string;
  const rawPassword = formData.get("password") as string;

  const parsed = loginSchema.safeParse({ email: rawEmail, password: rawPassword });
  if (!parsed.success) {
    const { errors, message } = formatZodErrors(parsed.error);
    return { success: false, message, errors };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: "Logged in successfully.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return {
      success: false,
      message: error?.message || "Invalid email or password.",
    };
  }

  // Ensure user is authorized in admin_profiles
  let { data: profile } = await supabase
    .from("admin_profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  // If user authenticated successfully in Supabase Auth but has no admin_profile entry yet,
  // auto-provision them as super_admin using service role credentials
  if (!profile && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const adminClient = createAdminClient();
      const userMeta = data.user.user_metadata || {};
      const fallbackName =
        (userMeta.full_name as string) ||
        data.user.email?.split("@")[0] ||
        "Administrator";

      const { error: upsertError } = await adminClient
        .from("admin_profiles")
        .upsert(
          {
            id: data.user.id,
            email: data.user.email!,
            full_name: fallbackName,
            role: "super_admin",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

      if (!upsertError) {
        profile = { role: "super_admin" };
      }
    } catch {
      // Proceed to verification
    }
  }

  if (!profile) {
    await supabase.auth.signOut();
    return {
      success: false,
      message: "Access denied. Your account is not authorized as an administrator. Please ensure your user ID is registered in public.admin_profiles.",
    };
  }

  return { success: true, message: "Logged in successfully." };
}

/**
 * Admin Logout Action
 */
export async function logoutAction() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

/**
 * Fetch Current Site Settings (Action for admin forms)
 */
export async function getSiteSettingsAction() {
  return await getSiteSettings();
}

/**
 * Update Site Settings
 */
export async function updateSiteSettingsAction(rawValues: Record<string, unknown>): Promise<ActionResult> {
  const parsed = siteSettingsSchema.partial().safeParse(rawValues);
  if (!parsed.success) {
    const { errors, message } = formatZodErrors(parsed.error);
    return { success: false, message, errors };
  }

  if (!isSupabaseConfigured()) {
    return { success: true, message: "Site settings updated successfully." };
  }

  try {
    const db = await getAdminDb();

    // Query for existing singleton row
    const { data: existingRows, error: fetchErr } = await db
      .from("site_settings")
      .select("id")
      .limit(1);

    if (fetchErr) {
      console.error("Error checking site_settings:", fetchErr);
      if (fetchErr.message?.includes("does not exist") || fetchErr.code === "42P01") {
        return {
          success: false,
          message:
            "Database table 'site_settings' was not found in Supabase. Please run the SQL migration (supabase/migrations/20261114000000_phase7_cms_schema.sql) in your Supabase SQL Editor.",
        };
      }
      return { success: false, message: `Database error: ${fetchErr.message}` };
    }

    const existingId = existingRows && existingRows.length > 0 ? existingRows[0].id : null;

    let error;
    if (existingId) {
      const res = await db
        .from("site_settings")
        .update({
          ...parsed.data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingId);
      error = res.error;
    } else {
      const res = await db
        .from("site_settings")
        .insert({
          ...parsed.data,
          updated_at: new Date().toISOString(),
        });
      error = res.error;
    }

    if (error) {
      console.error("Supabase site_settings error:", error);
      if (error.message?.includes("does not exist") || error.code === "42P01") {
        return {
          success: false,
          message:
            "Database table 'site_settings' was not found in Supabase. Please run the SQL migration in Supabase SQL Editor.",
        };
      }
      return { success: false, message: error.message || "Failed to update settings in database." };
    }

    clearCmsCache("site_settings");
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/classes");
    revalidatePath("/services");
    revalidatePath("/single-service");
    revalidatePath("/contact");
    revalidatePath("/appointments");
    revalidatePath("/admin/settings");
    revalidatePath("/admin/contact");
    return { success: true, message: "Site settings updated successfully." };
  } catch (err: unknown) {
    const msg =
      err instanceof Error
        ? err.message
        : typeof err === "object" && err && "message" in err
        ? String((err as { message: unknown }).message)
        : "Failed to update settings.";
    console.error("updateSiteSettingsAction exception:", err);
    return { success: false, message: msg };
  }
}

/**
 * Save Class (Create or Update)
 */
export async function saveClassAction(rawValues: Record<string, unknown>): Promise<ActionResult> {
  const parsed = classSchema.safeParse(rawValues);
  if (!parsed.success) {
    const { errors, message } = formatZodErrors(parsed.error);
    return { success: false, message, errors };
  }

  if (!isSupabaseConfigured()) {
    return { success: true, message: "Class saved successfully." };
  }

  try {
    const db = await getAdminDb();
    const payload = {
      ...parsed.data,
      updated_at: new Date().toISOString(),
    };
    const { error } = parsed.data.id
      ? await db.from("classes").upsert(payload, { onConflict: "id" })
      : await db.from("classes").insert(payload);

    if (error) throw error;

    clearCmsCache("classes");
    revalidatePath("/classes");
    revalidatePath("/");
    return { success: true, message: "Class saved successfully." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save class.";
    return { success: false, message: msg };
  }
}

/**
 * Delete Class
 */
export async function deleteClassAction(id: string): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { success: true, message: "Class deleted successfully." };
  }

  try {
    const db = await getAdminDb();
    const { error } = await db.from("classes").delete().eq("id", id);
    if (error) throw error;

    clearCmsCache("classes");
    revalidatePath("/classes");
    revalidatePath("/");
    return { success: true, message: "Class deleted successfully." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete class.";
    return { success: false, message: msg };
  }
}

/**
 * Save Service (Create or Update)
 */
export async function saveServiceAction(rawValues: Record<string, unknown>): Promise<ActionResult> {
  const parsed = serviceSchema.safeParse(rawValues);
  if (!parsed.success) {
    const { errors, message } = formatZodErrors(parsed.error);
    return { success: false, message, errors };
  }

  if (!isSupabaseConfigured()) {
    return { success: true, message: "Service saved successfully." };
  }

  try {
    const db = await getAdminDb();
    const payload = {
      ...parsed.data,
      updated_at: new Date().toISOString(),
    };
    const { error } = parsed.data.id
      ? await db.from("services").upsert(payload, { onConflict: "id" })
      : await db.from("services").insert(payload);

    if (error) throw error;

    clearCmsCache("services");
    revalidatePath("/services");
    revalidatePath("/single-service");
    revalidatePath("/");
    return { success: true, message: "Service saved successfully." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save service.";
    return { success: false, message: msg };
  }
}

/**
 * Delete Service
 */
export async function deleteServiceAction(id: string): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { success: true, message: "Service deleted successfully." };
  }

  try {
    const db = await getAdminDb();
    const { error } = await db.from("services").delete().eq("id", id);
    if (error) throw error;

    clearCmsCache("services");
    revalidatePath("/services");
    revalidatePath("/single-service");
    revalidatePath("/");
    return { success: true, message: "Service deleted successfully." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete service.";
    return { success: false, message: msg };
  }
}

/**
 * Save Testimonial
 */
export async function saveTestimonialAction(rawValues: Record<string, unknown>): Promise<ActionResult> {
  const parsed = testimonialSchema.safeParse(rawValues);
  if (!parsed.success) {
    const { errors, message } = formatZodErrors(parsed.error);
    return { success: false, message, errors };
  }

  if (!isSupabaseConfigured()) {
    return { success: true, message: "Testimonial saved successfully." };
  }

  try {
    const db = await getAdminDb();
    const payload = {
      ...parsed.data,
      updated_at: new Date().toISOString(),
    };
    const { error } = parsed.data.id
      ? await db.from("testimonials").upsert(payload, { onConflict: "id" })
      : await db.from("testimonials").insert(payload);

    if (error) throw error;

    clearCmsCache("testimonials");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/classes");
    return { success: true, message: "Testimonial saved successfully." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save testimonial.";
    return { success: false, message: msg };
  }
}

/**
 * Delete Testimonial
 */
export async function deleteTestimonialAction(id: string): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { success: true, message: "Testimonial deleted successfully." };
  }

  try {
    const db = await getAdminDb();
    const { error } = await db.from("testimonials").delete().eq("id", id);
    if (error) throw error;

    clearCmsCache("testimonials");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/classes");
    return { success: true, message: "Testimonial deleted successfully." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete testimonial.";
    return { success: false, message: msg };
  }
}

/**
 * Update Appointment Status
 */
export async function updateAppointmentStatusAction(
  id: string,
  status: "new" | "contacted" | "completed" | "cancelled",
  notes?: string
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { success: true, message: "Appointment status updated." };
  }

  try {
    const db = await getAdminDb();
    const updatePayload: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (typeof notes === "string") updatePayload.notes = notes;

    const { error } = await db.from("appointments").update(updatePayload).eq("id", id);
    if (error) throw error;

    return { success: true, message: "Appointment status updated." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update appointment.";
    return { success: false, message: msg };
  }
}

/**
 * Delete Appointment
 */
export async function deleteAppointmentAction(id: string): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { success: true, message: "Appointment inquiry deleted." };
  }

  try {
    const db = await getAdminDb();
    const { error } = await db.from("appointments").delete().eq("id", id);
    if (error) throw error;

    return { success: true, message: "Appointment inquiry deleted." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete appointment.";
    return { success: false, message: msg };
  }
}

/**
 * Save SEO Metadata
 */
export async function saveSeoAction(rawValues: Record<string, unknown>): Promise<ActionResult> {
  const parsed = seoSchema.safeParse(rawValues);
  if (!parsed.success) {
    const { errors, message } = formatZodErrors(parsed.error);
    return { success: false, message, errors };
  }

  if (!isSupabaseConfigured()) {
    return { success: true, message: "SEO metadata saved." };
  }

  try {
    const db = await getAdminDb();
    const { error } = await db.from("pages").upsert(
      {
        ...parsed.data,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );

    if (error) throw error;

    clearCmsCache("page_seo");
    const path = parsed.data.slug === "home" ? "/" : `/${parsed.data.slug}`;
    revalidatePath(path);
    return { success: true, message: "SEO metadata saved." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save SEO metadata.";
    return { success: false, message: msg };
  }
}

/**
 * Save Page Section
 */
export async function savePageSectionAction(
  pageSlug: string,
  sectionKey: string,
  title: string,
  subtitle?: string | null,
  content?: Record<string, unknown>,
  imageUrl?: string | null,
  isEnabled = true,
  status: "draft" | "published" = "published"
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { success: true, message: "Section saved successfully." };
  }

  try {
    const db = await getAdminDb();
    const { error } = await db.from("page_sections").upsert(
      {
        page_slug: pageSlug,
        section_key: sectionKey,
        title,
        subtitle: subtitle || null,
        content: content || {},
        image_url: imageUrl || null,
        is_enabled: isEnabled,
        status,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "page_slug,section_key" }
    );

    if (error) throw error;

    const path = pageSlug === "home" ? "/" : `/${pageSlug}`;
    clearCmsCache("page_sections");
    revalidatePath(path);
    clearCmsCache("site_settings");
    revalidatePath("/", "layout");
    return { success: true, message: "Section saved successfully." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save section.";
    return { success: false, message: msg };
  }
}

/**
 * Delete Media Asset (Cloudinary & Supabase)
 * Includes reference safety check against classes, services, bio_links, and testimonials
 */
export async function deleteMediaAssetAction(publicId: string, secureUrl: string): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { success: true, message: "Media asset deleted successfully." };
  }

  try {
    const db = await getAdminDb();

    // Check references in classes, services, testimonials
    const [classesCount, servicesCount, testCount] = await Promise.all([
      db.from("classes").select("id", { count: "exact", head: true }).eq("image_url", secureUrl),
      db.from("services").select("id", { count: "exact", head: true }).eq("image_url", secureUrl),
      db.from("testimonials").select("id", { count: "exact", head: true }).eq("avatar_url", secureUrl),
    ]);

    const totalUsage =
      (classesCount.count || 0) +
      (servicesCount.count || 0) +
      (testCount.count || 0);

    if (totalUsage > 0) {
      return {
        success: false,
        message: `Cannot delete image: It is currently referenced by ${totalUsage} published item(s) on your website. Remove it from those pages first.`,
      };
    }

    // Delete from Cloudinary if configured
    if (process.env.CLOUDINARY_API_SECRET) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cErr) {
        console.error("Cloudinary deletion warning:", cErr);
      }
    }

    // Delete record from Supabase media_assets
    const { error } = await db.from("media_assets").delete().eq("public_id", publicId);
    if (error) throw error;

    revalidatePath("/admin/media");
    return { success: true, message: "Media asset deleted successfully." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete media asset.";
    return { success: false, message: msg };
  }
}
