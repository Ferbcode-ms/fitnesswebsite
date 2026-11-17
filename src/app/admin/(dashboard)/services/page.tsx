"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { saveServiceAction, deleteServiceAction, savePageSectionAction } from "@/lib/cms/actions";
import {
  DEFAULT_COMPARISON_ROWS,
  DEFAULT_COMPARISON_COLUMNS,
  type ComparisonRowItem,
  type ComparisonColumnConfig,
} from "@/components/sections/services/ServicesComparisonTableSection";
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
  Table,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Check,
  Minus,
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
  const [activeTab, setActiveTab] = useState<"sections" | "comparison" | "cards">("sections");

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

  // Comparison Table Dynamic Columns & Rows State
  const [comparisonColumns, setComparisonColumns] = useState<{
    col1: ComparisonColumnConfig;
    col2: ComparisonColumnConfig;
    col3: ComparisonColumnConfig;
  }>(DEFAULT_COMPARISON_COLUMNS);

  const [comparisonRows, setComparisonRows] = useState<ComparisonRowItem[]>(DEFAULT_COMPARISON_ROWS);

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

          if (c?.compColumns) {
            setComparisonColumns({
              col1: { ...DEFAULT_COMPARISON_COLUMNS.col1, ...c.compColumns.col1 },
              col2: { ...DEFAULT_COMPARISON_COLUMNS.col2, ...c.compColumns.col2 },
              col3: { ...DEFAULT_COMPARISON_COLUMNS.col3, ...c.compColumns.col3 },
            });
          }

          if (c?.compRows && Array.isArray(c.compRows) && c.compRows.length > 0) {
            setComparisonRows(c.compRows);
          }
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
        compColumns: comparisonColumns,
        compRows: comparisonRows,
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
          text: `All Services page content and comparison table successfully ${status === "published" ? "published live" : "saved as draft"}.`,
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

  // Comparison Rows Handlers
  const handleAddComparisonRow = () => {
    setComparisonRows([
      ...comparisonRows,
      {
        feature: "New Feature / Benefit",
        inPerson: "true",
        online: "true",
        hybrid: "true",
      },
    ]);
  };

  const handleDeleteComparisonRow = (idx: number) => {
    if (comparisonRows.length <= 1) {
      if (!confirm("This is your only comparison row. Delete it?")) return;
    }
    setComparisonRows(comparisonRows.filter((_, i) => i !== idx));
  };

  const handleMoveComparisonRow = (idx: number, direction: "up" | "down") => {
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === comparisonRows.length - 1) return;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    const updated = [...comparisonRows];
    const [moved] = updated.splice(idx, 1);
    updated.splice(targetIdx, 0, moved);
    setComparisonRows(updated);
  };

  const handleComparisonRowChange = (
    idx: number,
    field: "feature" | "inPerson" | "online" | "hybrid",
    value: string | boolean
  ) => {
    setComparisonRows((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const handleResetComparisonDefaults = () => {
    if (confirm("Reset comparison table to default Hot Core Pilates features & columns?")) {
      setComparisonColumns(DEFAULT_COMPARISON_COLUMNS);
      setComparisonRows(DEFAULT_COMPARISON_ROWS);
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
            Manage your All Services overview page, hero copy, side-by-side comparison table, and service cards.
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
          onClick={() => { setActiveTab("comparison"); setStatusMsg(null); }}
          className={cn(
            "pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors",
            activeTab === "comparison"
              ? "border-[var(--color-burgundy)] text-[var(--color-burgundy)]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          )}
        >
          <Table className="h-4 w-4" />
          <span>Comparison Table ({comparisonRows.length} Rows)</span>
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

          {/* 3. Comparison Table Quick Overview */}
          <AdminCard title="3. Side-By-Side Comparison Section Preview">
            <div className="space-y-4">
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

              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-cream)] border border-[#E8DFD8]">
                <div className="flex items-center gap-2">
                  <Table className="h-4 w-4 text-[var(--color-burgundy)]" />
                  <span className="text-xs font-bold text-[var(--color-burgundy)]">
                    Comparison Table has {comparisonRows.length} active features and 3 configurable columns.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("comparison")}
                  className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] underline hover:opacity-80"
                >
                  Edit Full Table &rarr;
                </button>
              </div>
            </div>
          </AdminCard>
        </div>
      )}

      {/* TAB 2: SIDE-BY-SIDE COMPARISON TABLE MANAGER */}
      {activeTab === "comparison" && (
        <div className="space-y-6">
          {/* 1. Header Copy */}
          <AdminCard title="1. Comparison Section Header Copy">
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
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs font-bold text-gray-900"
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

          {/* 2. Table Column Titles & Actions */}
          <AdminCard title="2. Table Columns & Booking Action Buttons">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Column 1 */}
              <div className="p-3.5 rounded-lg border border-[#E8DFD8] bg-gray-50/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-[var(--color-burgundy)]">
                    Column 1 (In-Person)
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">Col 1</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Column Header</label>
                  <input
                    type="text"
                    value={comparisonColumns.col1.title}
                    onChange={(e) =>
                      setComparisonColumns({
                        ...comparisonColumns,
                        col1: { ...comparisonColumns.col1, title: e.target.value },
                      })
                    }
                    className="w-full rounded border border-[#E8DFD8] bg-white p-1.5 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Button Text</label>
                  <input
                    type="text"
                    value={comparisonColumns.col1.ctaText || ""}
                    onChange={(e) =>
                      setComparisonColumns({
                        ...comparisonColumns,
                        col1: { ...comparisonColumns.col1, ctaText: e.target.value },
                      })
                    }
                    className="w-full rounded border border-[#E8DFD8] bg-white p-1.5 text-xs"
                    placeholder="Book In-Person"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Button Link</label>
                  <input
                    type="text"
                    value={comparisonColumns.col1.ctaLink || ""}
                    onChange={(e) =>
                      setComparisonColumns({
                        ...comparisonColumns,
                        col1: { ...comparisonColumns.col1, ctaLink: e.target.value },
                      })
                    }
                    className="w-full rounded border border-[#E8DFD8] bg-white p-1.5 text-xs font-mono"
                    placeholder="/appointments"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="p-3.5 rounded-lg border-2 border-[var(--color-burgundy)]/30 bg-[var(--color-cream)]/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-[var(--color-burgundy)] flex items-center gap-1.5">
                    Column 2 (Online)
                    <span className="rounded bg-[var(--color-burgundy)] px-1.5 py-0.2 text-[9px] text-white">HIGHLIGHTED</span>
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">Col 2</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Column Header</label>
                  <input
                    type="text"
                    value={comparisonColumns.col2.title}
                    onChange={(e) =>
                      setComparisonColumns({
                        ...comparisonColumns,
                        col2: { ...comparisonColumns.col2, title: e.target.value },
                      })
                    }
                    className="w-full rounded border border-[#E8DFD8] bg-white p-1.5 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Button Text</label>
                  <input
                    type="text"
                    value={comparisonColumns.col2.ctaText || ""}
                    onChange={(e) =>
                      setComparisonColumns({
                        ...comparisonColumns,
                        col2: { ...comparisonColumns.col2, ctaText: e.target.value },
                      })
                    }
                    className="w-full rounded border border-[#E8DFD8] bg-white p-1.5 text-xs"
                    placeholder="View Online"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Button Link</label>
                  <input
                    type="text"
                    value={comparisonColumns.col2.ctaLink || ""}
                    onChange={(e) =>
                      setComparisonColumns({
                        ...comparisonColumns,
                        col2: { ...comparisonColumns.col2, ctaLink: e.target.value },
                      })
                    }
                    className="w-full rounded border border-[#E8DFD8] bg-white p-1.5 text-xs font-mono"
                    placeholder="/single-service"
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="p-3.5 rounded-lg border border-[#E8DFD8] bg-gray-50/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-[var(--color-burgundy)]">
                    Column 3 (Hybrid)
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">Col 3</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Column Header</label>
                  <input
                    type="text"
                    value={comparisonColumns.col3.title}
                    onChange={(e) =>
                      setComparisonColumns({
                        ...comparisonColumns,
                        col3: { ...comparisonColumns.col3, title: e.target.value },
                      })
                    }
                    className="w-full rounded border border-[#E8DFD8] bg-white p-1.5 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Button Text</label>
                  <input
                    type="text"
                    value={comparisonColumns.col3.ctaText || ""}
                    onChange={(e) =>
                      setComparisonColumns({
                        ...comparisonColumns,
                        col3: { ...comparisonColumns.col3, ctaText: e.target.value },
                      })
                    }
                    className="w-full rounded border border-[#E8DFD8] bg-white p-1.5 text-xs"
                    placeholder="Inquire Hybrid"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Button Link</label>
                  <input
                    type="text"
                    value={comparisonColumns.col3.ctaLink || ""}
                    onChange={(e) =>
                      setComparisonColumns({
                        ...comparisonColumns,
                        col3: { ...comparisonColumns.col3, ctaLink: e.target.value },
                      })
                    }
                    className="w-full rounded border border-[#E8DFD8] bg-white p-1.5 text-xs font-mono"
                    placeholder="/appointments"
                  />
                </div>
              </div>
            </div>
          </AdminCard>

          {/* 3. Feature Rows Management */}
          <AdminCard
            title={`3. Comparison Table Features (${comparisonRows.length} Items)`}
            description="Edit feature labels and values for each column. Enter custom text (e.g. 'Private Studio Suite') or use the quick '✓ Yes' / '✕ No' buttons for checkmarks and dashes."
          >
            <div className="space-y-3">
              {comparisonRows.map((row, idx) => {
                const inPersonStr = String(row.inPerson).toLowerCase().trim();
                const isCol1Yes = inPersonStr === "true" || inPersonStr === "yes" || inPersonStr === "✓";
                const isCol1No = inPersonStr === "false" || inPersonStr === "no" || inPersonStr === "✕" || inPersonStr === "-";

                const onlineStr = String(row.online).toLowerCase().trim();
                const isCol2Yes = onlineStr === "true" || onlineStr === "yes" || onlineStr === "✓";
                const isCol2No = onlineStr === "false" || onlineStr === "no" || onlineStr === "✕" || onlineStr === "-";

                const hybridStr = String(row.hybrid).toLowerCase().trim();
                const isCol3Yes = hybridStr === "true" || hybridStr === "yes" || hybridStr === "✓";
                const isCol3No = hybridStr === "false" || hybridStr === "no" || hybridStr === "✕" || hybridStr === "-";

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-[#E8DFD8] bg-white hover:border-[var(--color-burgundy)]/40 transition-colors shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3 pb-2 border-b border-gray-100">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-cream)] text-[10px] font-mono font-bold text-[var(--color-burgundy)]">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={row.feature}
                          onChange={(e) => handleComparisonRowChange(idx, "feature", e.target.value)}
                          placeholder="Feature Name (e.g. Hands-on Real-time Cueing)"
                          className="flex-1 font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--color-burgundy)] rounded border border-[#E8DFD8] p-1.5 focus:border-[var(--color-burgundy)] focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveComparisonRow(idx, "up")}
                          disabled={idx === 0}
                          title="Move Up"
                          className="rounded p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveComparisonRow(idx, "down")}
                          disabled={idx === comparisonRows.length - 1}
                          title="Move Down"
                          className="rounded p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteComparisonRow(idx)}
                          title="Delete Feature"
                          className="rounded p-1 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Columns 1, 2, 3 Inputs & Quick Yes/No Toggles */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Col 1 */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-gray-500 uppercase">{comparisonColumns.col1.title}</span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleComparisonRowChange(idx, "inPerson", "true")}
                              className={cn(
                                "flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold transition-colors",
                                isCol1Yes
                                  ? "bg-[var(--color-burgundy)] text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              )}
                            >
                              <Check className="h-3 w-3" /> Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => handleComparisonRowChange(idx, "inPerson", "false")}
                              className={cn(
                                "flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold transition-colors",
                                isCol1No
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              )}
                            >
                              <Minus className="h-3 w-3" /> No
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={row.inPerson === true ? "true" : row.inPerson === false ? "false" : row.inPerson}
                          onChange={(e) => handleComparisonRowChange(idx, "inPerson", e.target.value)}
                          placeholder="e.g. Private Studio Suite or true/false"
                          className="w-full rounded border border-[#E8DFD8] p-1.5 text-xs bg-white text-gray-800"
                        />
                      </div>

                      {/* Col 2 */}
                      <div className="space-y-1 p-1.5 rounded bg-[var(--color-cream)]/30 border border-[#E8DFD8]/60">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[var(--color-burgundy)] font-bold uppercase">
                            {comparisonColumns.col2.title}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleComparisonRowChange(idx, "online", "true")}
                              className={cn(
                                "flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold transition-colors",
                                isCol2Yes
                                  ? "bg-[var(--color-burgundy)] text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              )}
                            >
                              <Check className="h-3 w-3" /> Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => handleComparisonRowChange(idx, "online", "false")}
                              className={cn(
                                "flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold transition-colors",
                                isCol2No
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              )}
                            >
                              <Minus className="h-3 w-3" /> No
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={row.online === true ? "true" : row.online === false ? "false" : row.online}
                          onChange={(e) => handleComparisonRowChange(idx, "online", e.target.value)}
                          placeholder="e.g. Anywhere in the World or true/false"
                          className="w-full rounded border border-[#E8DFD8] p-1.5 text-xs bg-white text-gray-800"
                        />
                      </div>

                      {/* Col 3 */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-gray-500 uppercase">{comparisonColumns.col3.title}</span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleComparisonRowChange(idx, "hybrid", "true")}
                              className={cn(
                                "flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold transition-colors",
                                isCol3Yes
                                  ? "bg-[var(--color-burgundy)] text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              )}
                            >
                              <Check className="h-3 w-3" /> Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => handleComparisonRowChange(idx, "hybrid", "false")}
                              className={cn(
                                "flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold transition-colors",
                                isCol3No
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              )}
                            >
                              <Minus className="h-3 w-3" /> No
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={row.hybrid === true ? "true" : row.hybrid === false ? "false" : row.hybrid}
                          onChange={(e) => handleComparisonRowChange(idx, "hybrid", e.target.value)}
                          placeholder="e.g. Studio + Remote App or true/false"
                          className="w-full rounded border border-[#E8DFD8] p-1.5 text-xs bg-white text-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8DFD8]">
                <button
                  type="button"
                  onClick={handleAddComparisonRow}
                  className="flex items-center gap-1.5 rounded-lg border border-[var(--color-burgundy)] bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] hover:bg-[var(--color-cream)] transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Feature Row</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetComparisonDefaults}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset to Defaults</span>
                </button>
              </div>
            </div>
          </AdminCard>

          {/* Sticky Bottom Save / Publish Bar */}
          <div className="flex items-center justify-end gap-3 p-4 rounded-xl bg-white border border-[#E8DFD8] shadow-sm">
            <button
              onClick={() => handleSaveSections("draft")}
              disabled={savingSections}
              className="rounded-lg border border-[var(--color-burgundy)] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] hover:bg-[var(--color-cream)] disabled:opacity-50 transition-colors"
            >
              Save Draft
            </button>

            <button
              onClick={() => handleSaveSections("published")}
              disabled={savingSections}
              className="flex items-center gap-2 rounded-lg bg-[var(--color-burgundy)] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-burgundy)]/90 disabled:opacity-50 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>{savingSections ? "Publishing Live..." : "Publish Comparison Table Live"}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: COACHING OFFERINGS CARDS */}
      {activeTab === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <AdminCard key={item.id} className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD8]">
                  <div className="flex items-center gap-1.5">
                    <StatusBadge status={item.status} />
                    <span className="rounded bg-[var(--color-burgundy)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {item.service_type === "in_person" ? "IN-STUDIO" : item.service_type === "online" ? "REMOTE" : "HYBRID"}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--color-burgundy)] uppercase tracking-wider font-semibold">
                    {item.pricing_tier || "Coaching Tier"}
                  </span>
                </div>

                <div>
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
