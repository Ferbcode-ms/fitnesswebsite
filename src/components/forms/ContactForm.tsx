"use client";

import { useState } from "react";
import { AlertCircle, Loader2, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  delivered?: boolean;
  mode?: string;
  message: string;
  errors?: Record<string, string>;
}

const initialData: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  inquiryType: "online-coaching",
  message: "",
};

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialData);
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

    if (!formData.message.trim()) {
      errors.message = "Please share your questions or fitness goals.";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long.";
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
      const res = await fetch("/api/contact", {
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
      setFormData(initialData);
    } catch {
      setStatus("error");
      setResponseDetails({
        success: false,
        message: "Failed to connect to the server. Please check your connection and try again.",
      });
    }
  };

  if (status === "success" && responseDetails) {
    const isLiveDelivered = responseDetails.delivered === true;

    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[10px] bg-[var(--color-cream)] p-8 text-left text-[var(--color-burgundy)] border border-[var(--color-burgundy)]/20 shadow-md"
      >
        <div className="flex items-center gap-3">
          {isLiveDelivered ? (
            <CheckCircle2 className="h-8 w-8 text-emerald-700 shrink-0" />
          ) : (
            <Info className="h-8 w-8 text-amber-700 shrink-0" />
          )}
          <h3 className="font-[family-name:var(--font-display)] text-[22px] sm:text-[24px] uppercase tracking-[var(--tracking-display)]">
            {isLiveDelivered ? "Message Dispatched" : "Inquiry Validated (Demo Environment)"}
          </h3>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-burgundy)]/90">
          {responseDetails.message}
        </p>

        {!isLiveDelivered && (
          <div className="mt-4 rounded-[8px] bg-amber-50 p-4 border border-amber-200 text-[13px] text-amber-900 leading-relaxed font-normal">
            <strong className="font-semibold block mb-1">Developer &amp; Integration Notice:</strong>
            To deliver live emails to an external inbox, connect your email service by setting{" "}
            <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[12px]">RESEND_API_KEY</code> or{" "}
            <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[12px]">CONTACT_EMAIL_WEBHOOK</code>{" "}
            in your <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[12px]">.env.local</code> file.
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setResponseDetails(null);
          }}
          className="mt-6 inline-block font-[family-name:var(--font-mono)] text-[13px] uppercase underline underline-offset-4 tracking-wider text-[var(--color-burgundy)] hover:opacity-75 cursor-pointer font-bold"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left" noValidate>
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

      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-fullName"
          className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-blush)]"
        >
          Full Name <span className="text-red-300" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-fullName"
          name="fullName"
          type="text"
          required
          aria-required="true"
          aria-invalid={Boolean(fieldErrors.fullName)}
          aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Jane Doe"
          className={`w-full rounded-none border bg-white px-4 py-3.5 text-[15px] text-[#2C1107] placeholder:text-[#2C1107]/40 outline-none transition-colors ${
            fieldErrors.fullName
              ? "border-red-500 focus:ring-2 focus:ring-red-400"
              : "border-[#333333] focus:border-[var(--color-blush)] focus:ring-1 focus:ring-[var(--color-blush)]"
          }`}
        />
        {fieldErrors.fullName && (
          <span id="fullName-error" className="text-[12px] text-red-300 font-medium">
            {fieldErrors.fullName}
          </span>
        )}
      </div>

      {/* Email & Phone Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-blush)]"
          >
            Email Address <span className="text-red-300" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={`w-full rounded-none border bg-white px-4 py-3.5 text-[15px] text-[#2C1107] placeholder:text-[#2C1107]/40 outline-none transition-colors ${
              fieldErrors.email
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-[#333333] focus:border-[var(--color-blush)] focus:ring-1 focus:ring-[var(--color-blush)]"
            }`}
          />
          {fieldErrors.email && (
            <span id="email-error" className="text-[12px] text-red-300 font-medium">
              {fieldErrors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-phone"
            className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-blush)]"
          >
            Phone Number (Optional)
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className="w-full rounded-none border border-[#333333] bg-white px-4 py-3.5 text-[15px] text-[#2C1107] placeholder:text-[#2C1107]/40 outline-none focus:border-[var(--color-blush)] focus:ring-1 focus:ring-[var(--color-blush)]"
          />
        </div>
      </div>

      {/* Inquiry Type */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-inquiryType"
          className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-blush)]"
        >
          I am interested in <span className="text-red-300" aria-hidden="true">*</span>
        </label>
        <select
          id="contact-inquiryType"
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          className="w-full rounded-none border border-[#333333] bg-white px-4 py-3.5 text-[15px] text-[#2C1107] outline-none focus:border-[var(--color-blush)] focus:ring-1 focus:ring-[var(--color-blush)]"
        >
          <option value="online-coaching">Online 1-on-1 Fitness Coaching</option>
          <option value="in-person-training">In-Person Personal Training</option>
          <option value="hybrid-programme">Hybrid (Online + Monthly In-Person)</option>
          <option value="nutrition-guidance">Nutrition &amp; Habit Programming</option>
          <option value="general-enquiry">General Question / Partnership</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-blush)]"
        >
          Your Goals or Questions <span className="text-red-300" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          aria-required="true"
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your fitness history, what you hope to achieve, and any current challenges..."
          className={`w-full rounded-none border bg-white px-4 py-3.5 text-[15px] text-[#2C1107] placeholder:text-[#2C1107]/40 outline-none resize-y transition-colors ${
            fieldErrors.message
              ? "border-red-500 focus:ring-2 focus:ring-red-400"
              : "border-[#333333] focus:border-[var(--color-blush)] focus:ring-1 focus:ring-[var(--color-blush)]"
          }`}
        />
        {fieldErrors.message && (
          <span id="message-error" className="text-[12px] text-red-300 font-medium">
            {fieldErrors.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="blush"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto font-[family-name:var(--font-display)] text-[16px] tracking-[var(--tracking-display)] cursor-pointer"
        >
          {status === "submitting" ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending Inquiry...
            </span>
          ) : (
            "Send Inquiry"
          )}
        </Button>
      </div>
    </form>
  );
}
