"use client";

import { useState } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { saveSeoAction } from "@/lib/cms/actions";
import { Save, CheckCircle, AlertCircle, Globe } from "lucide-react";

interface SeoPageItem {
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  og_image_url: string;
}

const DEFAULT_PAGES: SeoPageItem[] = [
  {
    slug: "home",
    title: "Homepage",
    meta_title: "Women's Fitness Coaching | Online & In-Person Personal Training",
    meta_description: "Personalised women's fitness coaching offering evidence-based online coaching and in-person personal training to build strength, fitness, and confidence.",
    canonical_url: "/",
    og_image_url: "",
  },
  {
    slug: "about",
    title: "About Our Coach & Philosophy",
    meta_title: "About Our Coach & Philosophy | Women's Fitness Coaching",
    meta_description: "Meet our head coach and founder. Learn our evidence-based female strength philosophy, qualifications, and empowering training methodology.",
    canonical_url: "/about",
    og_image_url: "",
  },
  {
    slug: "classes",
    title: "Programmes & Classes",
    meta_title: "Fitness Programmes & Memberships | Women's Coaching",
    meta_description: "Explore our women's strength coaching programmes: Foundations, Strength & Sculpt, and Hybrid Athlete. View membership pricing tiers and FAQs.",
    canonical_url: "/classes",
    og_image_url: "",
  },
  {
    slug: "services",
    title: "Coaching Services & Comparison",
    meta_title: "Coaching Services & Comparison | Women's Fitness",
    meta_description: "Comprehensive female fitness services: 1-on-1 in-person personal training, online coaching, custom workout programming, and nutrition design.",
    canonical_url: "/services",
    og_image_url: "",
  },
  {
    slug: "single-service",
    title: "1:1 Private Mentorship Experience",
    meta_title: "1:1 Private Coaching Experience | Women's Fitness",
    meta_description: "Apply for the comprehensive 1:1 private coaching experience. Customized training split, weekly video form audits, nutritional architecture, and direct messaging.",
    canonical_url: "/single-service",
    og_image_url: "",
  },
  {
    slug: "contact",
    title: "Contact & Studio Inquiries",
    meta_title: "Contact & Studio Inquiries | Women's Fitness Coaching",
    meta_description: "Get in touch with our coaching team. Inquire about 1-on-1 personal training, online coaching, or studio availability.",
    canonical_url: "/contact",
    og_image_url: "",
  },
  {
    slug: "appointments",
    title: "Schedule Consultation or Session",
    meta_title: "Schedule A Consultation or Session | Women's Fitness",
    meta_description: "Request your complimentary 15-minute discovery consultation or reserve an in-person movement screen and personal training assessment.",
    canonical_url: "/appointments",
    og_image_url: "",
  },
];

export default function AdminSeoManager() {
  const [pages, setPages] = useState<SeoPageItem[]>(DEFAULT_PAGES);
  const [selectedSlug, setSelectedSlug] = useState<string>("home");
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const currentPage = pages.find((p) => p.slug === selectedSlug) || pages[0];

  const updateCurrentPage = (field: keyof SeoPageItem, value: string) => {
    setPages(pages.map((p) => (p.slug === selectedSlug ? { ...p, [field]: value } : p)));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    const res = await saveSeoAction({
      slug: currentPage.slug,
      title: currentPage.title,
      meta_title: currentPage.meta_title,
      meta_description: currentPage.meta_description,
      canonical_url: currentPage.canonical_url || null,
      og_image_url: currentPage.og_image_url || null,
      status: "published",
    });

    if (res.success) {
      setStatusMsg({ type: "success", text: `SEO metadata for "${currentPage.title}" saved successfully.` });
    } else {
      setStatusMsg({ type: "error", text: res.message || "Failed to save SEO metadata." });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase">
            SEO & OPEN GRAPH METADATA
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-0.5">
            Optimize page titles, search descriptions, canonical URLs, and social sharing cards.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--color-burgundy)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-burgundy)]/90 disabled:opacity-50 transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? "Saving..." : "Save SEO Settings"}</span>
        </button>
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

      {/* Page Selector Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-[#E8DFD8] pb-2">
        {pages.map((p) => (
          <button
            key={p.slug}
            onClick={() => {
              setSelectedSlug(p.slug);
              setStatusMsg(null);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedSlug === p.slug
                ? "bg-[var(--color-burgundy)] text-white shadow-xs"
                : "bg-white text-gray-700 border border-[#E8DFD8] hover:bg-gray-50"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard title={`Page Meta: ${currentPage.title}`}>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Meta Title (Appears in Google search tab)
              </label>
              <input
                type="text"
                required
                value={currentPage.meta_title}
                onChange={(e) => updateCurrentPage("meta_title", e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
              />
              <span className="text-[10px] text-gray-400 mt-0.5 block font-mono">
                {currentPage.meta_title.length}/60 recommended characters
              </span>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Meta Description (Search snippet)
              </label>
              <textarea
                rows={3}
                required
                value={currentPage.meta_description}
                onChange={(e) => updateCurrentPage("meta_description", e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
              />
              <span className="text-[10px] text-gray-400 mt-0.5 block font-mono">
                {currentPage.meta_description.length}/160 recommended characters
              </span>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Canonical URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={currentPage.canonical_url}
                  onChange={(e) => updateCurrentPage("canonical_url", e.target.value)}
                  className="w-full font-mono rounded-lg border border-[#E8DFD8] pl-9 pr-3 py-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </AdminCard>

        {/* Social Sharing & SERP Preview */}
        <div className="space-y-6">
          <AdminCard title="Open Graph Social Sharing Image">
            <ImageUploader
              label="OG Image (1200x630px recommended)"
              value={currentPage.og_image_url}
              onChange={(url) => updateCurrentPage("og_image_url", url)}
              helperText="Image displayed when sharing on WhatsApp, iMessage, Twitter, Facebook"
            />
          </AdminCard>

          {/* Google Search Snippet Preview */}
          <AdminCard title="Google Search Preview">
            <div className="rounded-lg border border-gray-200 bg-[#FBF8F5] p-4 font-sans space-y-1">
              <div className="text-[11px] text-gray-500 font-mono truncate">
                https://fitness.com{currentPage.canonical_url}
              </div>
              <div className="text-sm font-semibold text-blue-700 hover:underline cursor-pointer truncate">
                {currentPage.meta_title}
              </div>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {currentPage.meta_description}
              </p>
            </div>
          </AdminCard>
        </div>
      </form>
    </div>
  );
}
