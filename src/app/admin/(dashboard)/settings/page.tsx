"use client";

import { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { updateSiteSettingsAction, getSiteSettingsAction } from "@/lib/cms/actions";
import { Save, CheckCircle, AlertCircle, Loader2, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export default function AdminSiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Form fields
  const [businessName, setBusinessName] = useState("Women's Strength & Performance");
  const [coachName, setCoachName] = useState("Sarah Jenkins");
  const [tagline, setTagline] = useState("Elite Women's Strength, Biomechanics & Body Transformation");
  const [description, setDescription] = useState(
    "Personalised women's fitness coaching offering both online fitness coaching and in-person personal training to build strength, fitness, and confidence."
  );
  const [contactEmail, setContactEmail] = useState("coach@fitness.com");
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 234-5678");
  const [location, setLocation] = useState("Private Studio & Online Global");
  const [logoUrl, setLogoUrl] = useState("");

  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");

  const [onlineAvailable, setOnlineAvailable] = useState(true);
  const [onlineSummary, setOnlineSummary] = useState("Accepting applications for 1:1 online coaching clients worldwide.");
  const [inPersonAvailable, setInPersonAvailable] = useState(true);
  const [inPersonSummary, setInPersonSummary] = useState("Limited private 1:1 coaching slots available in our boutique facility.");

  const [footerText, setFooterText] = useState("");

  // Load existing settings on mount
  useEffect(() => {
    let mounted = true;
    async function loadSettings() {
      try {
        const data = await getSiteSettingsAction();
        if (mounted && data) {
          if (data.business_name && !data.business_name.startsWith("[")) {
            setBusinessName(data.business_name);
          }
          if (data.coach_name && !data.coach_name.startsWith("[")) {
            setCoachName(data.coach_name);
          }
          if (data.tagline && !data.tagline.startsWith("[")) {
            setTagline(data.tagline);
          }
          if (data.description) {
            setDescription(data.description);
          }
          if (data.contact_email && !data.contact_email.includes("[email@")) {
            setContactEmail(data.contact_email);
          }
          if (data.phone_number && !data.phone_number.startsWith("[")) {
            setPhoneNumber(data.phone_number);
          }
          if (data.location && !data.location.startsWith("[")) {
            setLocation(data.location);
          }
          if (data.logo_url) {
            setLogoUrl(data.logo_url);
          }
          if (data.instagram_url) {
            setInstagramUrl(data.instagram_url);
          }
          if (data.facebook_url) {
            setFacebookUrl(data.facebook_url);
          }
          if (typeof data.online_coaching_available === "boolean") {
            setOnlineAvailable(data.online_coaching_available);
          }
          if (data.online_coaching_summary && !data.online_coaching_summary.startsWith("[")) {
            setOnlineSummary(data.online_coaching_summary);
          }
          if (typeof data.in_person_training_available === "boolean") {
            setInPersonAvailable(data.in_person_training_available);
          }
          if (data.in_person_summary && !data.in_person_summary.startsWith("[")) {
            setInPersonSummary(data.in_person_summary);
          }
          if (data.footer_text) {
            setFooterText(data.footer_text);
          }
        }
      } catch (err) {
        console.error("Failed to load initial site settings:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadSettings();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);
    setFieldErrors({});

    const res = await updateSiteSettingsAction({
      business_name: businessName,
      coach_name: coachName,
      tagline,
      description,
      contact_email: contactEmail,
      phone_number: phoneNumber,
      location,
      logo_url: logoUrl || null,
      instagram_url: instagramUrl || null,
      facebook_url: facebookUrl || null,
      online_coaching_available: onlineAvailable,
      online_coaching_summary: onlineSummary,
      in_person_training_available: inPersonAvailable,
      in_person_summary: inPersonSummary,
      footer_text: footerText || null,
    });

    if (res.success) {
      setStatusMsg({ type: "success", text: "Global site settings saved successfully." });
    } else {
      setStatusMsg({ type: "error", text: res.message || "Failed to update settings." });
      if (res.errors) {
        setFieldErrors(res.errors);
      }
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin text-[var(--color-burgundy)]" />
          <span>Loading settings from database...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase">
            GLOBAL SITE SETTINGS
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-0.5">
            Configure primary brand naming, coach identity, availability statuses, contact details, and footer text.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--color-burgundy)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-burgundy)]/90 disabled:opacity-50 transition-colors"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          <span>{saving ? "Saving..." : "Save Global Settings"}</span>
        </button>
      </div>

      {statusMsg && (
        <div
          className={`flex items-start gap-2 rounded-lg p-3 text-xs leading-relaxed ${
            statusMsg.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <AdminCard title="Brand & Coach Identity">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Business Name
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
              />
              {fieldErrors.business_name && (
                <p className="mt-1 text-[11px] text-red-600">{fieldErrors.business_name}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Head Coach Name
              </label>
              <input
                type="text"
                required
                value={coachName}
                onChange={(e) => setCoachName(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
              />
              {fieldErrors.coach_name && (
                <p className="mt-1 text-[11px] text-red-600">{fieldErrors.coach_name}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Tagline
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
              />
              {fieldErrors.tagline && (
                <p className="mt-1 text-[11px] text-red-600">{fieldErrors.tagline}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Contact Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] pl-9 pr-3 py-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                />
              </div>
              {fieldErrors.contact_email && (
                <p className="mt-1 text-[11px] text-red-600">{fieldErrors.contact_email}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Studio Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] pl-9 pr-3 py-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                />
              </div>
              {fieldErrors.phone_number && (
                <p className="mt-1 text-[11px] text-red-600">{fieldErrors.phone_number}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Studio Location / City
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] pl-9 pr-3 py-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                />
              </div>
              {fieldErrors.location && (
                <p className="mt-1 text-[11px] text-red-600">{fieldErrors.location}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Global Business Description
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
              />
              {fieldErrors.description && (
                <p className="mt-1 text-[11px] text-red-600">{fieldErrors.description}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Footer Copyright & Disclaimer Note
              </label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                placeholder="Optional custom footer text"
                className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUploader
                label="Custom Brand Logo"
                value={logoUrl}
                onChange={setLogoUrl}
                helperText="Vector SVG or PNG logo (optional — falls back to wordmark if empty)"
              />
            </div>
          </div>
        </AdminCard>

        {/* Social Media Channels */}
        <AdminCard title="Social Channels & Public Profiles">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Instagram URL
              </label>
              <div className="relative">
                <Instagram className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="url"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="https://instagram.com/yourhandle"
                  className="w-full rounded-lg border border-[#E8DFD8] pl-9 pr-3 py-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Facebook URL
              </label>
              <div className="relative">
                <Facebook className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="url"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                  className="w-full rounded-lg border border-[#E8DFD8] pl-9 pr-3 py-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </AdminCard>

        {/* Availability Toggles */}
        <AdminCard title="Coaching Availability & Status Disclosures">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3 p-4 rounded-xl border border-[#E8DFD8] bg-[#FBF8F5]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[var(--color-burgundy)] uppercase">
                  Online 1:1 Coaching
                </span>
                <input
                  type="checkbox"
                  checked={onlineAvailable}
                  onChange={(e) => setOnlineAvailable(e.target.checked)}
                  className="h-4 w-4 rounded accent-[var(--color-burgundy)]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Availability Summary Note
                </label>
                <input
                  type="text"
                  value={onlineSummary}
                  onChange={(e) => setOnlineSummary(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-xl border border-[#E8DFD8] bg-[#FBF8F5]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[var(--color-burgundy)] uppercase">
                  In-Person Personal Training
                </span>
                <input
                  type="checkbox"
                  checked={inPersonAvailable}
                  onChange={(e) => setInPersonAvailable(e.target.checked)}
                  className="h-4 w-4 rounded accent-[var(--color-burgundy)]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Availability Summary Note
                </label>
                <input
                  type="text"
                  value={inPersonSummary}
                  onChange={(e) => setInPersonSummary(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </AdminCard>
      </form>
    </div>
  );
}
