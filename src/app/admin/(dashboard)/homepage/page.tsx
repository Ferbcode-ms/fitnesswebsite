"use client";

import { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { savePageSectionAction } from "@/lib/cms/actions";
import { Save, CheckCircle, AlertCircle, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminHomepageEditor() {
  const [heroHeading, setHeroHeading] = useState("TURN UP the HEAT.");
  const [heroSubtitle, setHeroSubtitle] = useState("Sculpt Your Core. Own Your Confidence.");
  const [heroImage, setHeroImage] = useState("/images/hero-bg.jpg");
  const [heroCtaText, setHeroCtaText] = useState("Start Today");
  const [heroCtaLink, setHeroCtaLink] = useState("/appointments");

  const [comparisonEnabled, setComparisonEnabled] = useState(true);
  const [comparisonTitle, setComparisonTitle] = useState("WHY THIS COACHING METHOD WORKS");

  const [marqueeEnabled, setMarqueeEnabled] = useState(true);
  const [marqueeText, setMarqueeText] = useState("BUILD STRENGTH / REGAIN ENERGY / ZERO BULLSHIT");

  const [coachBioTitle, setCoachBioTitle] = useState("MEET YOUR COACH & PHILOSOPHY");
  const [coachBioImage, setCoachBioImage] = useState("/images/coach-portrait.jpg");

  const [bottomCtaTitle, setBottomCtaTitle] = useState("READY TO BUILD REAL CONFIDENCE?");
  const [bottomCtaText, setBottomCtaText] = useState("START TODAY");

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadHero() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data } = await supabase
          .from("page_sections")
          .select("*")
          .eq("page_slug", "home")
          .eq("section_key", "hero")
          .maybeSingle();

        if (data) {
          if (data.title) setHeroHeading(data.title);
          if (data.subtitle) setHeroSubtitle(data.subtitle);
          if (data.image_url) setHeroImage(data.image_url);
          const c = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
          if (c?.ctaText) setHeroCtaText(c.ctaText);
          if (c?.ctaLink) setHeroCtaLink(c.ctaLink);
          if (c?.comparisonEnabled !== undefined) setComparisonEnabled(c.comparisonEnabled);
          if (c?.comparisonTitle) setComparisonTitle(c.comparisonTitle);
          if (c?.marqueeEnabled !== undefined) setMarqueeEnabled(c.marqueeEnabled);
          if (c?.marqueeText) setMarqueeText(c.marqueeText);
          if (c?.coachBioTitle) setCoachBioTitle(c.coachBioTitle);
          if (c?.coachBioImage) setCoachBioImage(c.coachBioImage);
          if (c?.bottomCtaTitle) setBottomCtaTitle(c.bottomCtaTitle);
          if (c?.bottomCtaText) setBottomCtaText(c.bottomCtaText);
        }
      } catch (err) {
        console.error("Failed to load hero from supabase:", err);
      }
    }
    loadHero();
  }, []);

  const handleSave = async (status: "draft" | "published") => {
    setSaving(true);
    setStatusMsg(null);

    try {
      const res = await savePageSectionAction(
        "home",
        "hero",
        heroHeading,
        heroSubtitle,
        {
          ctaText: heroCtaText,
          ctaLink: heroCtaLink,
          comparisonEnabled,
          comparisonTitle,
          marqueeEnabled,
          marqueeText,
          coachBioTitle,
          coachBioImage,
          bottomCtaTitle,
          bottomCtaText,
        },
        heroImage,
        true,
        status
      );

      if (res.success) {
        setStatusMsg({
          type: "success",
          text: `Homepage successfully ${status === "published" ? "published live" : "saved as draft"}.`,
        });
      } else {
        setStatusMsg({ type: "error", text: res.message || "Failed to save." });
      }
    } catch {
      setStatusMsg({ type: "error", text: "An error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase">
            HOMEPAGE CONTENT EDITOR
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-0.5">
            Configure headline copy, hero photography, CTA destinations, and section visibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 rounded-lg border border-[#E8DFD8] bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview Public</span>
          </Link>

          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="rounded-lg border border-[var(--color-burgundy)] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] hover:bg-[var(--color-cream)] disabled:opacity-50 transition-colors"
          >
            Save Draft
          </button>

          <button
            onClick={() => handleSave("published")}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-lg bg-[var(--color-burgundy)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-burgundy)]/90 disabled:opacity-50 transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            <span>{saving ? "Publishing..." : "Publish Live"}</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div
          className={`flex items-center gap-2 rounded-lg p-3 text-xs ${
            statusMsg.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Hero Section Card */}
      <AdminCard
        title="Hero Section (Primary Billboard)"
        description="Edit the main headline, description, hero background photo, and call-to-action button"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Main Hero Headline
              </label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2.5 text-sm font-semibold text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Supporting Subtitle / Description
              </label>
              <textarea
                rows={3}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2.5 text-sm text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={heroCtaText}
                  onChange={(e) => setHeroCtaText(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                  CTA Button Link
                </label>
                <input
                  type="text"
                  value={heroCtaLink}
                  onChange={(e) => setHeroCtaLink(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <ImageUploader
              label="Hero Background Photo"
              value={heroImage}
              onChange={setHeroImage}
              helperText="High-res portrait or studio photo (min 1600x900px)"
              required
            />
          </div>
        </div>
      </AdminCard>

      {/* Section Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard title="Comparison Section ('You've Tried vs You Want')">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD8]">
              <span className="text-xs font-semibold text-gray-700">Display Section on Homepage</span>
              <input
                type="checkbox"
                checked={comparisonEnabled}
                onChange={(e) => setComparisonEnabled(e.target.checked)}
                className="h-4 w-4 rounded accent-[var(--color-burgundy)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={comparisonTitle}
                onChange={(e) => setComparisonTitle(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
              />
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Marquee Running Banner">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD8]">
              <span className="text-xs font-semibold text-gray-700">Display Marquee Banner</span>
              <input
                type="checkbox"
                checked={marqueeEnabled}
                onChange={(e) => setMarqueeEnabled(e.target.checked)}
                className="h-4 w-4 rounded accent-[var(--color-burgundy)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Marquee Banner Text
              </label>
              <input
                type="text"
                value={marqueeText}
                onChange={(e) => setMarqueeText(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
              />
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Coach Bio Section Card */}
      <AdminCard title="Coach Bio & Portrait Preview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Bio Section Title
              </label>
              <input
                type="text"
                value={coachBioTitle}
                onChange={(e) => setCoachBioTitle(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
              />
            </div>
          </div>
          <div>
            <ImageUploader
              label="Coach Bio Portrait"
              value={coachBioImage}
              onChange={setCoachBioImage}
              helperText="Square or portrait aspect ratio"
            />
          </div>
        </div>
      </AdminCard>

      {/* Bottom Final CTA */}
      <AdminCard title="Bottom Split CTA Section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
              Final Callout Title
            </label>
            <input
              type="text"
              value={bottomCtaTitle}
              onChange={(e) => setBottomCtaTitle(e.target.value)}
              className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
              Oval Button Text
            </label>
            <input
              type="text"
              value={bottomCtaText}
              onChange={(e) => setBottomCtaText(e.target.value)}
              className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
            />
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
