"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { saveServiceAction, deleteServiceAction, savePageSectionAction } from "@/lib/cms/actions";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  Sparkles,
  Layout,
  Save,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceItem {
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

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "service-1",
    title: "1-on-1 In-Person Personal Training",
    service_type: "in_person",
    badge: "IN-STUDIO",
    summary: "Private 60-minute in-studio coaching sessions with hands-on form correction, real-time autoregulation, and specialized equipment.",
    features: [
      "Private suite access",
      "Hands-on barbell & kettlebell form cueing",
      "Mobility & biomechanical movement screen",
      "Post-session recovery protocol",
    ],
    pricing_tier: "Studio Tier",
    image_url: "/images/service-collage-1.jpg",
    cta_text: "BOOK STUDIO CONSULTATION",
    cta_link: "/appointments",
    order_index: 1,
    status: "published",
  },
  {
    id: "service-2",
    title: "Remote 1:1 Online Coaching",
    service_type: "online",
    badge: "REMOTE",
    summary: "Full-service custom workout programming delivered through our dedicated coaching app with weekly video form reviews and 24/7 direct coach chat.",
    features: [
      "Customised app programming with progressive overload",
      "Weekly asynchronous video form analysis",
      "Nutrition design & flexible macro coaching",
      "Direct coach messaging & weekly adjustments",
    ],
    pricing_tier: "Online Tier",
    image_url: "/images/service-collage-2.jpg",
    cta_text: "APPLY FOR ONLINE COACHING",
    cta_link: "/appointments",
    order_index: 2,
    status: "published",
  },
  {
    id: "service-3",
    title: "Hybrid Coaching Mentorship",
    service_type: "hybrid",
    badge: "HYBRID",
    summary: "The ultimate blend: fortnightly in-person technique check-ins combined with complete weekly remote programming and nutritional oversight.",
    features: [
      "2x monthly private studio technique clinics",
      "Full remote programming on our coaching app",
      "Custom nutrient timing & hormonal periodization",
      "Priority schedule booking & event prep",
    ],
    pricing_tier: "Hybrid Tier",
    image_url: "/images/service-collage-3.jpg",
    cta_text: "EXPLORE HYBRID MENTORSHIP",
    cta_link: "/appointments",
    order_index: 3,
    status: "published",
  },
];

export default function AdminServicesManager() {
  const [activeTab, setActiveTab] = useState<"sections" | "cards">("sections");

  // Services Cards State
  const [items, setItems] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featuresText, setFeaturesText] = useState("");
  const [savingService, setSavingService] = useState(false);

  // Page Sections State
  const [heroBadge, setHeroBadge] = useState("Online & In-Person Solutions");
  const [heroHeading, setHeroHeading] = useState("OUR services");
  const [heroSubtitle, setHeroSubtitle] = useState("Tailored fitness coaching built on female biomechanics, progressive strength training, and sustainable lifestyle design.");
  const [heroCta1Text, setHeroCta1Text] = useState("Book Free Strategy Call");
  const [heroCta1Link, setHeroCta1Link] = useState("/appointments");
  const [heroCta2Text, setHeroCta2Text] = useState("1:1 Private Coaching Deep-Dive");
  const [heroCta2Link, setHeroCta2Link] = useState("/single-service");

  const [servicesBadge, setServicesBadge] = useState("What We Offer");
  const [servicesHeading, setServicesHeading] = useState("CHOOSE YOUR pathway");
  const [servicesSubtitle, setServicesSubtitle] = useState("Every service is backed by exercise physiology and personalized attention to help you achieve sustainable, lifelong results.");

  const [compBadge, setCompBadge] = useState("Side-By-Side Comparison");
  const [compHeading, setCompHeading] = useState("WHICH FORMAT fits you?");
  const [compSubtitle, setCompSubtitle] = useState("Compare features across our three coaching formats to find the ideal balance of hands-on coaching and lifestyle flexibility.");

  const [savingSections, setSavingSections] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    // 1. Fetch individual service cards
    fetch("/api/admin/services")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.services && data.services.length > 0) {
          setItems(data.services);
        }
      })
      .catch(() => {});

    // 2. Fetch page sections for services
    async function loadSections() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data } = await supabase
          .from("page_sections")
          .select("*")
          .eq("page_slug", "services")
          .eq("section_key", "main")
          .maybeSingle();

        if (data) {
          if (data.title) setHeroHeading(data.title);
          if (data.subtitle) setHeroSubtitle(data.subtitle);
          const c = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
          if (c?.heroBadge) setHeroBadge(c.heroBadge);
          if (c?.heroCta1Text) setHeroCta1Text(c.heroCta1Text);
          if (c?.heroCta1Link) setHeroCta1Link(c.heroCta1Link);
          if (c?.heroCta2Text) setHeroCta2Text(c.heroCta2Text);
          if (c?.heroCta2Link) setHeroCta2Link(c.heroCta2Link);

          if (c?.servicesBadge) setServicesBadge(c.servicesBadge);
          if (c?.servicesHeading) setServicesHeading(c.servicesHeading);
          if (c?.servicesSubtitle) setServicesSubtitle(c.servicesSubtitle);

          if (c?.compBadge) setCompBadge(c.compBadge);
          if (c?.compHeading) setCompHeading(c.compHeading);
          if (c?.compSubtitle) setCompSubtitle(c.compSubtitle);
        }
      } catch (err) {
        console.error("Failed to load services sections from supabase:", err);
      }
    }
    loadSections();
  }, []);

  const openCreateModal = () => {
    setEditingItem({
      id: "",
      title: "",
      service_type: "online",
      badge: "NEW OFFERING",
      summary: "",
      features: ["Custom Workout Programming", "Direct Coach Messaging"],
      pricing_tier: "Consultation Tier",
      image_url: "/images/service-collage-1.jpg",
      cta_text: "BOOK A CONSULTATION",
      cta_link: "/appointments",
      order_index: items.length + 1,
      status: "published",
    });
    setFeaturesText("Custom Workout Programming\nWeekly Video Form Review\nDirect Coach Messaging");
    setIsModalOpen(true);
    setStatusMsg(null);
  };

  const openEditModal = (item: ServiceItem) => {
    setEditingItem(item);
    setFeaturesText(item.features.join("\n"));
    setIsModalOpen(true);
    setStatusMsg(null);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSavingService(true);
    setStatusMsg(null);

    const payload = {
      ...(editingItem.id && !editingItem.id.startsWith("service-") ? { id: editingItem.id } : {}),
      title: editingItem.title,
      service_type: editingItem.service_type,
      badge: editingItem.badge || null,
      summary: editingItem.summary,
      features: featuresText.split("\n").map((f) => f.trim()).filter(Boolean),
      pricing_tier: editingItem.pricing_tier || null,
      image_url: editingItem.image_url || null,
      cta_text: editingItem.cta_text || "BOOK A CONSULTATION",
      cta_link: editingItem.cta_link || "/appointments",
      order_index: Number(editingItem.order_index) || 1,
      status: editingItem.status,
    };

    const res = await saveServiceAction(payload);

    if (res.success) {
      setStatusMsg({ type: "success", text: "Service card saved successfully." });
      if (editingItem.id) {
        setItems(items.map((i) => (i.id === editingItem.id ? { ...editingItem, features: payload.features } : i)));
      } else {
        setItems([...items, { ...editingItem, id: `service-${Date.now()}`, features: payload.features }]);
      }
      setIsModalOpen(false);
    } else {
      setStatusMsg({ type: "error", text: res.message || "Failed to save service." });
    }
    setSavingService(false);
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    setStatusMsg(null);
    const res = await deleteServiceAction(id);
    if (res.success) {
      setItems(items.filter((i) => i.id !== id));
      setStatusMsg({ type: "success", text: "Service deleted successfully." });
    } else {
      setStatusMsg({ type: "error", text: res.message || "Failed to delete service." });
    }
  };

  const handleSaveSections = async (status: "draft" | "published") => {
    setSavingSections(true);
    setStatusMsg(null);

    try {
      const contentPayload = {
        heroBadge,
        heroCta1Text,
        heroCta1Link,
        heroCta2Text,
        heroCta2Link,
        servicesBadge,
        servicesHeading,
        servicesSubtitle,
        compBadge,
        compHeading,
        compSubtitle,
      };

      const res = await savePageSectionAction(
        "services",
        "main",
        heroHeading,
        heroSubtitle,
        contentPayload,
        null,
        true,
        status
      );

      if (res.success) {
        setStatusMsg({
          type: "success",
          text: `All Services page content successfully ${status === "published" ? "published live" : "saved as draft"}.`,
        });
      } else {
        setStatusMsg({ type: "error", text: res.message || "Failed to save sections." });
      }
    } catch {
      setStatusMsg({ type: "error", text: "An error occurred while saving." });
    } finally {
      setSavingSections(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            suppressHydrationWarning
            className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase"
          >
            ALL SERVICES CMS
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-0.5">
            Manage your All Services overview page, hero copy, service offering cards, and comparison section.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/services"
            target="_blank"
            className="flex items-center gap-1.5 rounded-lg border border-[#E8DFD8] bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview Public</span>
          </Link>

          {activeTab === "cards" ? (
            <button
              onClick={openCreateModal}
              className="flex items-center gap-1.5 rounded-lg bg-[var(--color-burgundy)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-burgundy)]/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Service</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => handleSaveSections("draft")}
                disabled={savingSections}
                className="rounded-lg border border-[var(--color-burgundy)] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] hover:bg-[var(--color-cream)] disabled:opacity-50 transition-colors"
              >
                Save Draft
              </button>

              <button
                onClick={() => handleSaveSections("published")}
                disabled={savingSections}
                className="flex items-center gap-1.5 rounded-lg bg-[var(--color-burgundy)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-burgundy)]/90 disabled:opacity-50 transition-colors"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{savingSections ? "Publishing..." : "Publish Live"}</span>
              </button>
            </>
          )}
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

      {/* Tabs Switcher */}
      <div className="flex border-b border-[#E8DFD8] gap-4">
        <button
          type="button"
          onClick={() => { setActiveTab("sections"); setStatusMsg(null); }}
          className={cn(
            "pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors",
            activeTab === "sections"
              ? "border-[var(--color-burgundy)] text-[var(--color-burgundy)]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          )}
        >
          <Layout className="h-4 w-4" />
          <span>Page Sections & Headlines</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab("cards"); setStatusMsg(null); }}
          className={cn(
            "pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors",
            activeTab === "cards"
              ? "border-[var(--color-burgundy)] text-[var(--color-burgundy)]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          )}
        >
          <Sparkles className="h-4 w-4" />
          <span>Coaching Offerings Cards ({items.length})</span>
        </button>
      </div>

      {/* TAB 1: PAGE SECTIONS & HEADLINES */}
      {activeTab === "sections" && (
        <div className="space-y-6">
          {/* 1. Services Hero */}
          <AdminCard title="1. Page Hero Section">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Hero Badge
                  </label>
                  <input
                    type="text"
                    value={heroBadge}
                    onChange={(e) => setHeroBadge(e.target.value)}
                    className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Hero Headline
                  </label>
                  <input
                    type="text"
                    value={heroHeading}
                    onChange={(e) => setHeroHeading(e.target.value)}
                    className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs font-semibold text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                  Hero Subtitle
                </label>
                <textarea
                  rows={2}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div className="space-y-2">
                  <span className="font-bold text-[11px] text-[var(--color-burgundy)] block">Primary Button (Call Booking)</span>
                  <input
                    type="text"
                    placeholder="CTA 1 Label"
                    value={heroCta1Text}
                    onChange={(e) => setHeroCta1Text(e.target.value)}
                    className="w-full rounded border border-[#E8DFD8] p-1.5 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="CTA 1 Link"
                    value={heroCta1Link}
                    onChange={(e) => setHeroCta1Link(e.target.value)}
                    className="w-full rounded border border-[#E8DFD8] p-1.5 text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-[11px] text-[var(--color-burgundy)] block">Secondary Button (1:1 Deep-Dive)</span>
                  <input
                    type="text"
                    placeholder="CTA 2 Label"
                    value={heroCta2Text}
                    onChange={(e) => setHeroCta2Text(e.target.value)}
                    className="w-full rounded border border-[#E8DFD8] p-1.5 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="CTA 2 Link"
                    value={heroCta2Link}
                    onChange={(e) => setHeroCta2Link(e.target.value)}
                    className="w-full rounded border border-[#E8DFD8] p-1.5 text-xs"
                  />
                </div>
              </div>
            </div>
          </AdminCard>

          {/* 2. Services Grid Intro */}
          <AdminCard title="2. Services Offerings Section Header">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                  Section Badge
                </label>
                <input
                  type="text"
                  value={servicesBadge}
                  onChange={(e) => setServicesBadge(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={servicesHeading}
                  onChange={(e) => setServicesHeading(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                  Section Subtitle
                </label>
                <input
                  type="text"
                  value={servicesSubtitle}
                  onChange={(e) => setServicesSubtitle(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
                />
              </div>
            </div>
          </AdminCard>

          {/* 3. Comparison Table Intro */}
          <AdminCard title="3. Side-By-Side Comparison Section Header">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                  Section Badge
                </label>
                <input
                  type="text"
                  value={compBadge}
                  onChange={(e) => setCompBadge(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={compHeading}
                  onChange={(e) => setCompHeading(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                  Section Subtitle
                </label>
                <input
                  type="text"
                  value={compSubtitle}
                  onChange={(e) => setCompSubtitle(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
                />
              </div>
            </div>
          </AdminCard>
        </div>
      )}

      {/* TAB 2: COACHING OFFERINGS CARDS */}
      {activeTab === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <AdminCard key={item.id} className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-gray-100 border border-[#E8DFD8]">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <Sparkles className="h-8 w-8" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    <StatusBadge status={item.status} />
                    <span className="rounded bg-[var(--color-burgundy)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {item.service_type === "in_person" ? "IN-STUDIO" : item.service_type === "online" ? "REMOTE" : "HYBRID"}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[11px] text-[var(--color-burgundy)] uppercase tracking-wider font-semibold">
                    {item.pricing_tier || "Coaching Tier"}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-wider text-[var(--color-burgundy)]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>

                <div className="space-y-1 pt-1 border-t border-[#E8DFD8]">
                  {item.features.map((feat, i) => (
                    <div key={i} className="text-[11px] text-gray-500 flex items-center gap-1.5">
                      <span className="text-[var(--color-burgundy)] font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8DFD8] flex items-center justify-between">
                <span className="font-mono text-[10px] text-gray-400">
                  Order #{item.order_index}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="rounded p-1.5 text-gray-600 hover:bg-gray-100 hover:text-[var(--color-burgundy)] transition-colors"
                    title="Edit Service"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteService(item.id)}
                    className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      {/* Edit / Create Modal for Service Cards */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-[#E8DFD8] p-6 shadow-xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD8]">
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase">
                {editingItem.id ? "Edit Coaching Service" : "Create New Coaching Service"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Service Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                    placeholder="e.g. 1-on-1 In-Person Personal Training"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Service Format
                  </label>
                  <select
                    value={editingItem.service_type}
                    onChange={(e) => setEditingItem({ ...editingItem, service_type: e.target.value as "online" | "in_person" | "hybrid" })}
                    className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none bg-white"
                  >
                    <option value="in_person">In-Person Personal Training</option>
                    <option value="online">Remote Online Coaching</option>
                    <option value="hybrid">Hybrid Mentorship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                  Pricing Tier / Label
                </label>
                <input
                  type="text"
                  value={editingItem.pricing_tier || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, pricing_tier: e.target.value })}
                  className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  placeholder="e.g. Studio Tier / Online Mentorship"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                  Summary Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.summary}
                  onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                  className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                  Features & Inclusions (One per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full font-mono rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                />
              </div>

              <ImageUploader
                label="Service Image"
                value={editingItem.image_url || ""}
                onChange={(url) => setEditingItem({ ...editingItem, image_url: url })}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingItem.order_index}
                    onChange={(e) => setEditingItem({ ...editingItem, order_index: parseInt(e.target.value) || 1 })}
                    className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Publish Status
                  </label>
                  <select
                    value={editingItem.status}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as "draft" | "published" })}
                    className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8DFD8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-[#E8DFD8] px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingService}
                  className="rounded-lg bg-[var(--color-burgundy)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[var(--color-burgundy)]/90 disabled:opacity-50"
                >
                  {savingService ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
