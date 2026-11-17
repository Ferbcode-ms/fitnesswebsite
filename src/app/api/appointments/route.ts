import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteSettings } from "@/lib/cms/queries";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/lib/utils";

interface AppointmentRequestBody {
  sessionType?: string;
  locationPreference?: string;
  datePreference?: string;
  timeOfDay?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  notes?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(request: Request) {
  try {
    const body: AppointmentRequestBody = await request.json();

    const errors: Record<string, string> = {};

    if (!body.fullName || !body.fullName.trim()) {
      errors.fullName = "Full name is required.";
    }

    if (!body.email || !body.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(body.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!body.datePreference) {
      errors.datePreference = "Preferred date is required.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    // Check if an external calendar backend (e.g. Acuity, Calendly) is configured
    const hasBookingBackend = Boolean(
      process.env.ACUITY_API_KEY || process.env.CALENDLY_TOKEN || process.env.BOOKING_WEBHOOK
    );

    // Insert into Supabase appointments table when configured
    let appointmentId: string | undefined;
    if (isSupabaseConfigured()) {
      try {
        const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY ? createAdminClient() : await createClient();
        const { data: inserted, error: dbErr } = await supabase
          .from("appointments")
          .insert({
            full_name: (body.fullName || "").trim(),
            email: (body.email || "").trim(),
            phone: body.phone?.trim() || null,
            session_type: body.sessionType || "strategy-call",
            location_preference: body.locationPreference || "online",
            date_preference: body.datePreference,
            time_of_day: body.timeOfDay || "morning",
            notes: body.notes?.trim() || null,
            status: "new",
          })
          .select("id")
          .single();

        if (dbErr) {
          console.error("Supabase appointment insert error:", dbErr);
        } else if (inserted) {
          appointmentId = inserted.id;
        }
      } catch (dbErr) {
        console.error("Supabase appointment insert error:", dbErr);
      }
    }

    // Resolve Admin WhatsApp Phone Number from CMS settings, env, or default
    let adminPhone = siteConfig.phoneNumber;
    try {
      const settings = await getSiteSettings();
      if (settings?.phone_number) {
        adminPhone = settings.phone_number;
      }
    } catch (settingsErr) {
      console.error("Failed to load site settings for WhatsApp phone:", settingsErr);
    }
    if (process.env.ADMIN_WHATSAPP_NUMBER) {
      adminPhone = process.env.ADMIN_WHATSAPP_NUMBER;
    }

    // Human-friendly session and location labels
    const sessionLabels: Record<string, string> = {
      "strategy-call": "Free 15-Minute Strategy Call",
      "movement-screen": "Comprehensive Movement Assessment (60m)",
      "pt-session": "1-on-1 Personal Training Session",
    };
    const locationLabels: Record<string, string> = {
      online: "Online / Video",
      "in-person": "In-Person Studio Suite",
    };
    const sessionTitle = sessionLabels[body.sessionType || ""] || body.sessionType || "Consultation";
    const locationTitle = locationLabels[body.locationPreference || ""] || body.locationPreference || "Online";

    // Compose formatted WhatsApp message
    const messageLines = [
      `*NEW CONSULTATION APPOINTMENT REQUEST*`,
      `----------------------------------------`,
      `*Client:* ${(body.fullName || "").trim()}`,
      `*Email:* ${(body.email || "").trim()}`,
      `*Phone:* ${body.phone?.trim() || "Not provided"}`,
      `*Session:* ${sessionTitle}`,
      `*Format:* ${locationTitle}`,
      `*Preferred Date:* ${body.datePreference}`,
      `*Time Preference:* ${body.timeOfDay || "Any time"}`,
    ];
    if (body.notes?.trim()) {
      messageLines.push(`*Client Goals/Notes:* ${body.notes.trim()}`);
    }
    messageLines.push(`----------------------------------------`);
    messageLines.push(`_Submitted via Website Booking Form_`);

    const waText = messageLines.join("\n");
    const waNumber = formatPhoneForWhatsApp(adminPhone);
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

    console.log("[Appointment Request Logged & WhatsApp Prepared]", {
      appointmentId,
      fullName: body.fullName,
      email: body.email,
      phone: body.phone ?? "N/A",
      sessionType: body.sessionType,
      locationPreference: body.locationPreference,
      datePreference: body.datePreference,
      timeOfDay: body.timeOfDay,
      notes: body.notes ?? "",
      adminPhone,
      hasBackend: hasBookingBackend,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      appointmentId,
      whatsappUrl,
      adminPhone,
      isConfirmedBooking: false, // Explicitly false — this is an inquiry/request
      mode: hasBookingBackend ? "live_synced" : "inquiry_logged",
      message:
        "Your appointment inquiry has been received. Our coaching team will reach out directly to confirm schedule availability.",
      details: {
        fullName: body.fullName,
        sessionType: body.sessionType,
        locationPreference: body.locationPreference,
        datePreference: body.datePreference,
        timeOfDay: body.timeOfDay,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while logging your appointment request.",
      },
      { status: 500 }
    );
  }
}

