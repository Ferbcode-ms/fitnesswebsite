"use client";

import { useState } from "react";
import { CheckCircle2, Calendar, Clock, Sparkles, Loader2, AlertCircle, Info, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AppointmentData {
  sessionType: string;
  locationPreference: string;
  datePreference: string;
  timeOfDay: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}

interface ApiResponse {
  success: boolean;
  isConfirmedBooking?: boolean;
  mode?: string;
  message: string;
  whatsappUrl?: string;
  adminPhone?: string;
  errors?: Record<string, string>;
  details?: Partial<AppointmentData>;
}

const initialData: AppointmentData = {
  sessionType: "strategy-call",
  locationPreference: "online",
  datePreference: "",
  timeOfDay: "morning",
  fullName: "",
  email: "",
  phone: "",
  notes: "",
};

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function AppointmentRequestForm() {
  const [formData, setFormData] = useState<AppointmentData>(initialData);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [responseDetails, setResponseDetails] = useState<ApiResponse | null>(null);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Please enter your full name.";
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    if (!formData.datePreference) {
      errors.datePreference = "Please select a preferred consultation date.";
    } else {
      const selectedDate = new Date(formData.datePreference);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.datePreference = "Preferred date cannot be in the past.";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setResponseDetails(null);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        setResponseDetails(data);
        return;
      }

      setStatus("success");
      setResponseDetails(data);

      if (data.whatsappUrl) {
        try {
          window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
        } catch {
          // If browser popup blocker intercepts window.open, user has direct button on screen
        }
      }
    } catch {
      setStatus("error");
      setResponseDetails({
        success: false,
        message: "Failed to connect to the scheduling service. Please try again.",
      });
    }
  };

  if (status === "success" && responseDetails) {
    const sessionLabel =
      formData.sessionType === "strategy-call"
        ? "Free 15-Minute Strategy Call"
        : formData.sessionType === "movement-screen"
        ? "Comprehensive Movement Assessment (60m)"
        : "1-on-1 Personal Training Session";

    const locationLabel =
      formData.locationPreference === "online" ? "Online / Video" : "In-Person Studio Suite";

    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[10px] bg-[var(--color-cream)] p-8 md:p-12 text-left text-[var(--color-burgundy)] border border-[var(--color-burgundy)]/20 shadow-md max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-9 w-9 text-emerald-700 shrink-0" />
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-[24px] md:text-[28px] uppercase tracking-[var(--tracking-display)]">
              Consultation Inquiry Sent!
            </h3>
            <span className="font-[family-name:var(--font-mono)] text-[12px] uppercase text-[var(--color-burgundy)]/75">
              Logged in System &bull; WhatsApp Prepared
            </span>
          </div>
        </div>

        {responseDetails.whatsappUrl && (
          <div className="mt-6 rounded-[8px] bg-emerald-50 border border-emerald-300 p-5 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-emerald-900 text-[15px]">
                Direct WhatsApp Message Ready
              </p>
              <p className="text-xs text-emerald-800 mt-0.5">
                Your prefilled consultation inquiry was sent to WhatsApp to message the coach directly.
              </p>
            </div>
            <a
              href={responseDetails.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all shrink-0 cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" /> Open WhatsApp
            </a>
          </div>
        )}

        <div className="mt-6 space-y-3 rounded-[8px] bg-white p-5 border border-[var(--color-burgundy)]/15 text-[14px]">
          <div className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70 mb-1">
            Request Summary
          </div>
          <div>
            <span className="font-semibold text-[var(--color-burgundy)]">Client:</span>{" "}
            {formData.fullName} ({formData.email})
          </div>
          {formData.phone && (
            <div>
              <span className="font-semibold text-[var(--color-burgundy)]">Phone:</span>{" "}
              {formData.phone}
            </div>
          )}
          <div>
            <span className="font-semibold text-[var(--color-burgundy)]">Session:</span>{" "}
            {sessionLabel}
          </div>
          <div>
            <span className="font-semibold text-[var(--color-burgundy)]">Format:</span>{" "}
            {locationLabel}
          </div>
          <div>
            <span className="font-semibold text-[var(--color-burgundy)]">Requested Date:</span>{" "}
            {formData.datePreference} ({formData.timeOfDay})
          </div>
          {formData.notes && (
            <div>
              <span className="font-semibold text-[var(--color-burgundy)]">Notes:</span>{" "}
              {formData.notes}
            </div>
          )}
        </div>

        <div className="mt-5 rounded-[8px] bg-amber-50 p-4 border border-amber-200 text-[13px] text-amber-900 leading-relaxed">
          <strong className="font-semibold block mb-1">Important Schedule Confirmation Policy:</strong>
          Submitting this inquiry does <em>not</em> constitute a confirmed calendar appointment. Our coaching staff reviews all requests and will contact you via WhatsApp or email (<strong>{formData.email}</strong>) to verify slot availability and finalize your consultation.
        </div>

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setResponseDetails(null);
            setFormData(initialData);
          }}
          className="mt-6 inline-block font-[family-name:var(--font-mono)] text-[13px] uppercase underline underline-offset-4 tracking-wider text-[var(--color-burgundy)] hover:opacity-75 cursor-pointer font-bold"
        >
          Submit another appointment request
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[10px] bg-[var(--color-cream)] p-6 sm:p-10 border border-[var(--color-burgundy)]/20 shadow-sm">
      <div className="mb-8 border-b border-[var(--color-burgundy)]/15 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-blush)] px-3 py-1 font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-wider text-[var(--color-burgundy)]">
          <Sparkles className="h-3.5 w-3.5" /> Book Your Spot
        </div>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-[26px] sm:text-[32px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)]">
          Schedule A 1-on-1 Consultation
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-burgundy)]/80">
          Select your session format and preferred timing. Whether you train online or in person, we customize every detail to your body and goals.
        </p>

        {/* Honest Notice */}
        <div className="mt-4 flex items-start gap-2.5 rounded-[6px] bg-[var(--color-sand)]/40 p-3 text-[13px] text-[var(--color-espresso)] border border-[var(--color-burgundy)]/10">
          <Info className="h-4 w-4 shrink-0 text-[var(--color-burgundy)] mt-0.5" />
          <span>
            <strong>Please note:</strong> This form submits an appointment inquiry. It is not an instant booking. Our coaching team will personally review your preferred date and reach out to confirm availability.
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        {status === "error" && responseDetails?.message && (
          <div
            role="alert"
            aria-live="assertive"
            className="flex items-center gap-2 rounded bg-red-100 p-3.5 text-[14px] text-red-900 border border-red-300"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-red-700" />
            <span>{responseDetails.message}</span>
          </div>
        )}

        {/* 1. Session Type Selection */}
        <div className="flex flex-col gap-2">
          <label className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-burgundy)] font-semibold">
            1. Select Session Type <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                id: "strategy-call",
                title: "15-Min Strategy Call",
                subtitle: "Complimentary intro & roadmap",
              },
              {
                id: "movement-screen",
                title: "Movement Screen (60m)",
                subtitle: "Full biomechanical assessment",
              },
              {
                id: "pt-session",
                title: "1-on-1 Training Session",
                subtitle: "Hands-on coached workout",
              },
            ].map((type) => {
              const selected = formData.sessionType === type.id;
              return (
                <label
                  key={type.id}
                  className={`flex cursor-pointer flex-col justify-between rounded-[8px] border p-4 transition-all ${
                    selected
                      ? "border-[var(--color-burgundy)] bg-[var(--color-sand)] text-[var(--color-espresso)] shadow-sm ring-1 ring-[var(--color-burgundy)]"
                      : "border-[var(--color-burgundy)]/20 bg-white/70 text-[var(--color-burgundy)] hover:border-[var(--color-burgundy)]/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-[family-name:var(--font-display)] text-[15px] uppercase tracking-[var(--tracking-display)]">
                      {type.title}
                    </span>
                    <input
                      type="radio"
                      name="sessionType"
                      value={type.id}
                      checked={selected}
                      onChange={handleChange}
                      className="accent-[var(--color-burgundy)] mt-0.5"
                    />
                  </div>
                  <span className="mt-2 text-[12px] opacity-75">{type.subtitle}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 2. Format & Location Preference */}
        <div className="flex flex-col gap-2">
          <label className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-burgundy)] font-semibold">
            2. Coaching Format <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { id: "online", label: "Online (Live Video Consultation)" },
              { id: "in-person", label: "In-Person Studio (Private Suite)" },
            ].map((loc) => (
              <label
                key={loc.id}
                className={`flex cursor-pointer items-center gap-3 rounded-[8px] border p-3.5 transition-all ${
                  formData.locationPreference === loc.id
                    ? "border-[var(--color-burgundy)] bg-[var(--color-blush)] text-[var(--color-burgundy)] font-medium ring-1 ring-[var(--color-burgundy)]"
                    : "border-[var(--color-burgundy)]/20 bg-white/70 text-[var(--color-burgundy)]"
                }`}
              >
                <input
                  type="radio"
                  name="locationPreference"
                  value={loc.id}
                  checked={formData.locationPreference === loc.id}
                  onChange={handleChange}
                  className="accent-[var(--color-burgundy)]"
                />
                <span className="text-[14px]">{loc.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 3. Preferred Date & Time Window */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="appt-date"
              className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-burgundy)] font-semibold"
            >
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" /> Preferred Date{" "}
              <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="appt-date"
              name="datePreference"
              type="date"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.datePreference)}
              aria-describedby={fieldErrors.datePreference ? "date-error" : undefined}
              value={formData.datePreference}
              onChange={handleChange}
              className={`w-full rounded-none border bg-white px-4 py-3 text-[14px] text-[#2C1107] outline-none transition-colors ${
                fieldErrors.datePreference
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-[#333333] focus:border-[var(--color-burgundy)] focus:ring-1 focus:ring-[var(--color-burgundy)]"
              }`}
            />
            {fieldErrors.datePreference && (
              <span id="date-error" className="text-[12px] text-red-600 font-medium">
                {fieldErrors.datePreference}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="appt-time"
              className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-burgundy)] font-semibold"
            >
              <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Preferred Time Window
            </label>
            <select
              id="appt-time"
              name="timeOfDay"
              value={formData.timeOfDay}
              onChange={handleChange}
              className="w-full rounded-none border border-[#333333] bg-white px-4 py-3 text-[14px] text-[#2C1107] outline-none focus:border-[var(--color-burgundy)] focus:ring-1 focus:ring-[var(--color-burgundy)]"
            >
              <option value="morning">Morning (7:00 AM - 11:00 AM)</option>
              <option value="midday">Mid-Day (11:00 AM - 3:00 PM)</option>
              <option value="evening">Late Afternoon / Evening (3:00 PM - 7:00 PM)</option>
              <option value="flexible">Flexible / Any Available Slot</option>
            </select>
          </div>
        </div>

        {/* 4. Client Contact Details */}
        <div className="border-t border-[var(--color-burgundy)]/15 pt-4">
          <label className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-burgundy)] font-semibold block mb-3">
            3. Your Contact Details
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="appt-name" className="text-[12px] text-[var(--color-burgundy)]/80">
                Full Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="appt-name"
                name="fullName"
                type="text"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.fullName)}
                aria-describedby={fieldErrors.fullName ? "name-error" : undefined}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Sarah Miller"
                className={`w-full rounded-none border bg-white px-3.5 py-2.5 text-[14px] text-[#2C1107] outline-none transition-colors ${
                  fieldErrors.fullName
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-[#333333] focus:border-[var(--color-burgundy)] focus:ring-1 focus:ring-[var(--color-burgundy)]"
                }`}
              />
              {fieldErrors.fullName && (
                <span id="name-error" className="text-[12px] text-red-600 font-medium">
                  {fieldErrors.fullName}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="appt-email" className="text-[12px] text-[var(--color-burgundy)]/80">
                Email Address <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="appt-email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "appt-email-error" : undefined}
                value={formData.email}
                onChange={handleChange}
                placeholder="sarah@example.com"
                className={`w-full rounded-none border bg-white px-3.5 py-2.5 text-[14px] text-[#2C1107] outline-none transition-colors ${
                  fieldErrors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-[#333333] focus:border-[var(--color-burgundy)] focus:ring-1 focus:ring-[var(--color-burgundy)]"
                }`}
              />
              {fieldErrors.email && (
                <span id="appt-email-error" className="text-[12px] text-red-600 font-medium">
                  {fieldErrors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="appt-phone" className="text-[12px] text-[var(--color-burgundy)]/80">
                Phone Number (Optional)
              </label>
              <input
                id="appt-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className="w-full rounded-none border border-[#333333] bg-white px-3.5 py-2.5 text-[14px] text-[#2C1107] outline-none focus:border-[var(--color-burgundy)] focus:ring-1 focus:ring-[var(--color-burgundy)]"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <label htmlFor="appt-notes" className="text-[12px] text-[var(--color-burgundy)]/80">
              Primary Fitness Goals or Questions (Optional)
            </label>
            <textarea
              id="appt-notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. Building strength, postpartum recovery, fat loss, preparing for an event..."
              className="w-full rounded-none border border-[#333333] bg-white px-3.5 py-2.5 text-[14px] text-[#2C1107] outline-none focus:border-[var(--color-burgundy)] focus:ring-1 focus:ring-[var(--color-burgundy)]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={status === "submitting"}
            className="w-full font-[family-name:var(--font-display)] text-[16px] tracking-[var(--tracking-display)] cursor-pointer"
          >
            {status === "submitting" ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending to WhatsApp & Logging...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <MessageCircle className="h-4 w-4" /> Book & Send via WhatsApp
              </span>
            )}
          </Button>
          <p className="mt-2 text-center font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-burgundy)]/70">
            Saves your consultation inquiry to our dashboard &amp; opens WhatsApp directly to chat with coach.
          </p>
        </div>
      </form>
    </div>
  );
}
