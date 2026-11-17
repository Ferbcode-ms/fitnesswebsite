"use client";

import { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { updateSiteSettingsAction, getSiteSettingsAction } from "@/lib/cms/actions";
import { Save, CheckCircle, AlertCircle, Loader2, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export default function AdminContactEditor() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("coach@fitness.com");
  const [phone, setPhone] = useState("+1 (555) 234-5678");
  const [location, setLocation] = useState("Private Studio & Online Global");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getSiteSettingsAction();
        if (mounted && data) {
          if (data.contact_email && !data.contact_email.includes("[email@")) {
            setEmail(data.contact_email);
          }
          if (data.phone_number && !data.phone_number.startsWith("[")) {
            setPhone(data.phone_number);
          }
          if (data.location && !data.location.startsWith("[")) {
            setLocation(data.location);
          }
          if (data.instagram_url) setInstagram(data.instagram_url);
          if (data.facebook_url) setFacebook(data.facebook_url);
        }
      } catch (err) {
        console.error("Failed to load contact settings:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    const res = await updateSiteSettingsAction({
      contact_email: email,
      phone_number: phone,
      location: location,
      instagram_url: instagram || null,
      facebook_url: facebook || null,
    });

    if (res.success) {
      setStatusMsg({ type: "success", text: "Contact settings saved successfully." });
    } else {
      setStatusMsg({ type: "error", text: res.message || "Failed to update contact settings." });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin text-[var(--color-burgundy)]" />
          <span>Loading contact details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase">
            STUDIO CONTACT & SOCIALS
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-0.5">
            Configure direct contact info, inquiry inboxes, studio coordinates, and social handles.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--color-burgundy)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-burgundy)]/90 disabled:opacity-50 transition-colors"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          <span>{saving ? "Saving..." : "Save Changes"}</span>
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

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard title="Direct Channels">
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Primary Contact Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] pl-9 pr-3 py-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  placeholder="coach@fitness.com"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Studio Phone Number / WhatsApp
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] pl-9 pr-3 py-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  placeholder="+1 (555) 234-5678"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Studio Address / City Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] pl-9 pr-3 py-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  placeholder="Private Training Studio, London, UK"
                />
              </div>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Social Media Handles">
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Instagram Profile URL
              </label>
              <div className="relative">
                <Instagram className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] pl-9 pr-3 py-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Facebook Page URL
              </label>
              <div className="relative">
                <Facebook className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] pl-9 pr-3 py-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
            </div>
          </div>
        </AdminCard>
      </form>
    </div>
  );
}
