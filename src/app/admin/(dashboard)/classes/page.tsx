"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { saveClassAction, deleteClassAction, savePageSectionAction } from "@/lib/cms/actions";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  Dumbbell,
  Layout,
  Save,
  Eye,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string | null;
  description: string;
  specs: string[];
  image_url: string;
  cta_text: string;
  cta_link: string;
  order_index: number;
  status: "draft" | "published";
}

interface AdminMembershipTier {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  cadence: string;
  isPopular: boolean;
  featuresText: string;
}

interface AdminFaqItem {
  id: string;
  question: string;
  answer: string;
}

const DEFAULT_CLASSES: ClassItem[] = [
  {
    id: "class-1",
    title: "FOUNDATIONS",
    subtitle: "8-WEEK BEGINNER INTENSIVE",
    badge: "PHASE 01",
    description: "Master compound lifts, establish bulletproof movement biomechanics, and banish gym anxiety in a structured, supportive atmosphere.",
    specs: ["3 Sessions / Week", "Technique & Biomechanics", "Gym Anxiety Reset", "Video Form Feedback"],
    image_url: "/images/card-foundations.jpg",
    cta_text: "APPLY FOR PROGRAMME",
    cta_link: "/appointments",
    order_index: 1,
    status: "published",
  },
  {
    id: "class-2",
    title: "STRENGTH & SCULPT",
    subtitle: "HYPERTROPHY & BODY RECOMPOSITION",
    badge: "MOST POPULAR",
    description: "Progressive overload engineered for female physiology. Build metabolic muscle, bone density, and athletic definition.",
    specs: ["4 Sessions / Week", "Hypertrophy & Overload", "Body Recomposition", "Macro Architecture"],
    image_url: "/images/card-strength.jpg",
    cta_text: "APPLY FOR PROGRAMME",
    cta_link: "/appointments",
    order_index: 2,
    status: "published",
  },
  {
    id: "class-3",
    title: "HYBRID ATHLETE",
    subtitle: "ENDURANCE & CONDITIONING FUSION",
    badge: "ADVANCED",
    description: "For women who want strength, stamina, and cardiovascular resilience without sacrificing muscle mass or joint health.",
    specs: ["4–5 Sessions / Week", "Conditioning & Strength", "Lactate Threshold Work", "Heart Rate Tracking"],
    image_url: "/images/card-hybrid.jpg",
    cta_text: "APPLY FOR PROGRAMME",
    cta_link: "/appointments",
    order_index: 3,
    status: "published",
  },
];

const DEFAULT_MEMBERSHIP_TIERS: AdminMembershipTier[] = [
  {
    id: "tier-1",
    name: "4 SESSIONS / MONTH",
    subtitle: "Foundational Coaching Split",
    price: "$240",
    cadence: "per month",
    isPopular: false,
    featuresText: [
      "1 weekly in-person or live video coached session",
      "Customized weekly workout programming app access",
      "Monthly progress & movement audit",
      "Standard coach email support",
    ].join("\n"),
  },
  {
    id: "tier-2",
    name: "8 SESSIONS / MONTH",
    subtitle: "Consistent Progressive Overload",
    price: "$440",
    cadence: "per month",
    isPopular: true,
    featuresText: [
      "2 weekly in-person or live video coached sessions",
      "Full progressive strength & hypertrophy split",
      "Bi-weekly body composition & mobility check-ins",
      "Dedicated direct messaging with your coach",
      "Nutrition target guidelines & habit tracker",
    ].join("\n"),
  },
  {
    id: "tier-3",
    name: "UNLIMITED ATHLETE",
    subtitle: "Comprehensive 1-on-1 Transformation",
    price: "$680",
    cadence: "per month",
    isPopular: false,
    featuresText: [
      "Up to 3 coached private/hybrid sessions weekly",
      "Customized evidence-based macronutrient architecture",
      "24/7 priority messaging & daily accountability",
      "Unlimited video form reviews & technique audits",
      "Quarterly functional mobility assessment",
    ].join("\n"),
  },
];

const DEFAULT_FAQS: AdminFaqItem[] = [
  {
    id: "faq-1",
    question: "I'VE NEVER LIFTED WEIGHTS BEFORE. ARE THESE PROGRAMMES SUITABLE FOR BEGINNERS?",
    answer:
      "Yes, absolutely. Over 60% of our clients begin with zero formal strength training experience. Every movement is regressed to your current baseline, and we prioritize joint safety, proper bracing, and barbell/dumbbell mechanics before adding load.",
  },
  {
    id: "faq-2",
    question: "WHAT IS THE DIFFERENCE BETWEEN ONLINE COACHING AND IN-PERSON TRAINING?",
    answer:
      "In-person training takes place in our private studio suite with hands-on coaching, tactile cues, and instant feedback. Online coaching delivers your customized programming through our dedicated app with weekly video form reviews, metrics check-ins, and daily WhatsApp messaging.",
  },
  {
    id: "faq-3",
    question: "HOW MANY DAYS PER WEEK DO I NEED TO COMMIT TO SEE RESULTS?",
    answer:
      "Most of our clients achieve outstanding body recomposition and strength gains with 3 to 4 focused 45-minute training sessions per week. We build schedules around your real life, not an unrealistic gym marathon.",
  },
  {
    id: "faq-4",
    question: "DO YOU PROVIDE MEAL PLANS OR RESTRICTIVE DIETS?",
    answer:
      "No restrictive diets or rigid meal plans that leave you feeling deprived. We teach flexible nutrition, protein optimization, and sustainable eating habits that fit family dinners, dining out, and your favourite treats.",
  },
  {
    id: "faq-5",
    question: "WHAT HAPPENS IF I TRAVEL OR GET BUSY WITH WORK?",
    answer:
      "Your coaching travels with you! For online clients, workouts adapt seamlessly for hotel gyms or bodyweight/band routines. For in-person clients, sessions can be rescheduled or transitioned to remote check-ins so you never lose momentum.",
  },
];

export default function AdminClassesManager() {
  const [activeTab, setActiveTab] = useState<"sections" | "programmes">("sections");

  // Programme Cards State
  const [items, setItems] = useState<ClassItem[]>(DEFAULT_CLASSES);
  const [editingItem, setEditingItem] = useState<ClassItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specsText, setSpecsText] = useState("");
  const [savingClass, setSavingClass] = useState(false);

  // Page Sections State
  const [heroHeading, setHeroHeading] = useState("OUR programmes");
  const [heroSubtitle, setHeroSubtitle] = useState("Low-impact strength. High metabolic burn. Science-backed progressive overload structured for women.");
  const [heroBadge, setHeroBadge] = useState("Curated Training Disciplines");
  const [heroCtaText, setHeroCtaText] = useState("Book Your Trial Session");
  const [heroCtaLink, setHeroCtaLink] = useState("/appointments");
  const [heroImage, setHeroImage] = useState("/images/card-strength.jpg");

  // Marquee
  const [marqueeText, setMarqueeText] = useState("FIND YOUR FIRE / CHOOSE YOUR PROGRAMME");

  // Membership Tiers (Dynamic create / delete)
  const [membershipBadge, setMembershipBadge] = useState("Flexible & Transparent");
  const [membershipHeading, setMembershipHeading] = useState("OUR memberships");
  const [membershipSubtext, setMembershipSubtext] = useState("Invest in dedicated coaching with clear structures, zero hidden fees, and month-to-month flexibility.");
  const [membershipTiers, setMembershipTiers] = useState<AdminMembershipTier[]>(DEFAULT_MEMBERSHIP_TIERS);

  // FAQs (Dynamic create / delete)
  const [faqBadge, setFaqBadge] = useState("Got Questions?");
  const [faqHeading, setFaqHeading] = useState("QUESTIONS? answers.");
  const [faqSubtext, setFaqSubtext] = useState("Everything you need to know about our women's strength programmes, membership options, and coaching standards.");
  const [faqImage, setFaqImage] = useState("/images/callout-equipment.jpg");
  const [faqs, setFaqs] = useState<AdminFaqItem[]>(DEFAULT_FAQS);

  // Bottom CTA
  const [bottomCtaTitle, setBottomCtaTitle] = useState("READY TO BUILD REAL CONFIDENCE?");
  const [bottomCtaText, setBottomCtaText] = useState("START TODAY");
  const [bottomCtaLink, setBottomCtaLink] = useState("/appointments");
  const [bottomCtaImage, setBottomCtaImage] = useState("/images/split-cta-bg.jpg");

  const [savingSections, setSavingSections] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch classes & page sections on mount
  useEffect(() => {
    // 1. Fetch class cards
    fetch("/api/admin/classes")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.classes && data.classes.length > 0) {
          setItems(data.classes);
        }
      })
      .catch(() => {});

    // 2. Fetch page sections for classes
    async function loadSections() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data } = await supabase
          .from("page_sections")
          .select("*")
          .eq("page_slug", "classes")
          .eq("section_key", "main")
          .maybeSingle();

        if (data) {
          if (data.title) setHeroHeading(data.title);
          if (data.subtitle) setHeroSubtitle(data.subtitle);
          if (data.image_url) setHeroImage(data.image_url);
          const c = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
          if (c?.heroBadge) setHeroBadge(c.heroBadge);
          if (c?.heroCtaText) setHeroCtaText(c.heroCtaText);
          if (c?.heroCtaLink) setHeroCtaLink(c.heroCtaLink);
          if (c?.marqueeText) setMarqueeText(c.marqueeText);
          if (c?.membershipBadge) setMembershipBadge(c.membershipBadge);
          if (c?.membershipHeading) setMembershipHeading(c.membershipHeading);
          if (c?.membershipSubtext) setMembershipSubtext(c.membershipSubtext);

          // Populate dynamic tiers
          if (Array.isArray(c?.membershipTiers) && c.membershipTiers.length > 0) {
            setMembershipTiers(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              c.membershipTiers.map((t: any, idx: number) => ({
                id: t.id || `tier-${idx + 1}-${Date.now()}`,
                name: t.name || "",
                subtitle: t.subtitle || "",
                price: t.price || "",
                cadence: t.cadence || "per month",
                isPopular: Boolean(t.isPopular),
                featuresText: Array.isArray(t.features) ? t.features.join("\n") : (t.features || ""),
              }))
            );
          }

          if (c?.faqBadge) setFaqBadge(c.faqBadge);
          if (c?.faqHeading) setFaqHeading(c.faqHeading);
          if (c?.faqSubtext) setFaqSubtext(c.faqSubtext);
          if (c?.faqImage) setFaqImage(c.faqImage);

          // Populate dynamic FAQs
          if (Array.isArray(c?.faqs) && c.faqs.length > 0) {
            setFaqs(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              c.faqs.map((f: any, idx: number) => ({
                id: f.id || `faq-${idx + 1}-${Date.now()}`,
                question: f.question || "",
                answer: f.answer || "",
              }))
            );
          }

          if (c?.bottomCtaTitle) setBottomCtaTitle(c.bottomCtaTitle);
          if (c?.bottomCtaText) setBottomCtaText(c.bottomCtaText);
          if (c?.bottomCtaLink) setBottomCtaLink(c.bottomCtaLink);
          if (c?.bottomCtaImage) setBottomCtaImage(c.bottomCtaImage);
        }
      } catch (err) {
        console.error("Failed to load classes sections from supabase:", err);
      }
    }
    loadSections();
  }, []);

  // Membership Tier Handlers
  const handleAddTier = () => {
    setMembershipTiers((prev) => [
      ...prev,
      {
        id: `tier-${Date.now()}`,
        name: "NEW MEMBERSHIP TIER",
        subtitle: "Custom Coaching Focus",
        price: "$300",
        cadence: "per month",
        isPopular: false,
        featuresText: "1 weekly coached session\nFull app workout programming\nMonthly progress audit",
      },
    ]);
  };

  const handleDeleteTier = (index: number) => {
    if (membershipTiers.length <= 1) {
      if (!confirm("This is your only pricing tier. Are you sure you want to delete it?")) return;
    }
    setMembershipTiers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTierChange = (index: number, field: keyof AdminMembershipTier, value: string | boolean) => {
    setMembershipTiers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // FAQ Handlers
  const handleAddFaq = () => {
    setFaqs((prev) => [
      ...prev,
      {
        id: `faq-${Date.now()}`,
        question: "NEW FREQUENTLY ASKED QUESTION?",
        answer: "Provide a clear and concise explanation for prospective clients here.",
      },
    ]);
  };

  const handleDeleteFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFaqChange = (index: number, field: keyof AdminFaqItem, value: string) => {
    setFaqs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Class Item Modals
  const openCreateModal = () => {
    setEditingItem({
      id: "",
      title: "",
      subtitle: "",
      badge: "NEW",
      description: "",
      specs: ["3 Sessions / Week", "Custom Programming"],
      image_url: "/images/card-strength.jpg",
      cta_text: "APPLY FOR PROGRAMME",
      cta_link: "/appointments",
      order_index: items.length + 1,
      status: "published",
    });
    setSpecsText("3 Sessions / Week\nCustom Programming\nWeekly Video Form Review");
    setIsModalOpen(true);
    setStatusMsg(null);
  };

  const openEditModal = (item: ClassItem) => {
    setEditingItem(item);
    setSpecsText(item.specs.join("\n"));
    setIsModalOpen(true);
    setStatusMsg(null);
  };

  const handleSaveClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSavingClass(true);
    setStatusMsg(null);

    const payload = {
      ...(editingItem.id && !editingItem.id.startsWith("class-") ? { id: editingItem.id } : {}),
      title: editingItem.title,
      subtitle: editingItem.subtitle,
      badge: editingItem.badge || null,
      description: editingItem.description,
      specs: specsText.split("\n").map((s) => s.trim()).filter(Boolean),
      image_url: editingItem.image_url,
      cta_text: editingItem.cta_text || "APPLY FOR PROGRAMME",
      cta_link: editingItem.cta_link || "/appointments",
      order_index: Number(editingItem.order_index) || 1,
      status: editingItem.status,
    };

    const res = await saveClassAction(payload);

    if (res.success) {
      setStatusMsg({ type: "success", text: "Programme card saved successfully." });
      if (editingItem.id) {
        setItems(items.map((i) => (i.id === editingItem.id ? { ...editingItem, specs: payload.specs } : i)));
      } else {
        setItems([...items, { ...editingItem, id: `class-${Date.now()}`, specs: payload.specs }]);
      }
      setIsModalOpen(false);
    } else {
      setStatusMsg({ type: "error", text: res.message || "Failed to save programme card." });
    }
    setSavingClass(false);
  };

  const handleDeleteClass = async (id: string) => {
    if (!confirm("Are you sure you want to delete this programme?")) return;

    setStatusMsg(null);
    const res = await deleteClassAction(id);
    if (res.success) {
      setItems(items.filter((i) => i.id !== id));
      setStatusMsg({ type: "success", text: "Programme deleted successfully." });
    } else {
      setStatusMsg({ type: "error", text: res.message || "Failed to delete programme." });
    }
  };

  const handleSaveSections = async (status: "draft" | "published") => {
    setSavingSections(true);
    setStatusMsg(null);

    try {
      const contentPayload = {
        heroBadge,
        heroCtaText,
        heroCtaLink,
        marqueeText,
        membershipBadge,
        membershipHeading,
        membershipSubtext,
        membershipTiers: membershipTiers.map((t) => ({
          id: t.id,
          name: t.name,
          subtitle: t.subtitle,
          price: t.price,
          cadence: t.cadence,
          isPopular: t.isPopular,
          features: t.featuresText.split("\n").map((s) => s.trim()).filter(Boolean),
          ctaText: "Join Today",
          ctaHref: "/appointments",
        })),
        faqBadge,
        faqHeading,
        faqSubtext,
        faqImage,
        faqs: faqs.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
        })),
        bottomCtaTitle,
        bottomCtaText,
        bottomCtaLink,
        bottomCtaImage,
      };

      const res = await savePageSectionAction(
        "classes",
        "main",
        heroHeading,
        heroSubtitle,
        contentPayload,
        heroImage,
        true,
        status
      );

      if (res.success) {
        setStatusMsg({
          type: "success",
          text: `Classes page sections successfully ${status === "published" ? "published live" : "saved as draft"}.`,
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
          <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase">
            CLASSES & PROGRAMMES CMS
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-0.5">
            Manage your hero, curriculum cards, membership pricing tiers, FAQs, and calls-to-action.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/classes"
            target="_blank"
            className="flex items-center gap-1.5 rounded-lg border border-[#E8DFD8] bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview Public</span>
          </Link>

          {activeTab === "programmes" ? (
            <button
              onClick={openCreateModal}
              className="flex items-center gap-1.5 rounded-lg bg-[var(--color-burgundy)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-burgundy)]/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Programme</span>
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
          <span>Page Sections & Content</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab("programmes"); setStatusMsg(null); }}
          className={cn(
            "pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors",
            activeTab === "programmes"
              ? "border-[var(--color-burgundy)] text-[var(--color-burgundy)]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          )}
        >
          <Dumbbell className="h-4 w-4" />
          <span>Signature Programme Cards ({items.length})</span>
        </button>
      </div>

      {/* TAB 1: PAGE SECTIONS & CONTENT */}
      {activeTab === "sections" && (
        <div className="space-y-6">
          {/* 1. Page Hero & Header */}
          <AdminCard title="1. Page Hero & Headline">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  helperText="Full-width hero backdrop"
                  required
                />
              </div>
            </div>
          </AdminCard>

          {/* 2. Marquee */}
          <AdminCard title="2. Animated Marquee Strip">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Marquee Repeating Slogan
              </label>
              <input
                type="text"
                value={marqueeText}
                onChange={(e) => setMarqueeText(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2.5 text-xs font-semibold text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
              />
            </div>
          </AdminCard>

          {/* 3. Membership Pricing Tiers */}
          <AdminCard title={`3. Membership Pricing Tiers (${membershipTiers.length})`}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Section Badge
                  </label>
                  <input
                    type="text"
                    value={membershipBadge}
                    onChange={(e) => setMembershipBadge(e.target.value)}
                    className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={membershipHeading}
                    onChange={(e) => setMembershipHeading(e.target.value)}
                    className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Section Subtitle
                  </label>
                  <input
                    type="text"
                    value={membershipSubtext}
                    onChange={(e) => setMembershipSubtext(e.target.value)}
                    className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Tiers List Header & Add Button */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
                    Pricing Tiers ({membershipTiers.length})
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    All tier buttons link directly to your appointments page with a clean &quot;Join Today&quot; action.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddTier}
                  className="flex items-center gap-1.5 rounded-lg bg-[var(--color-burgundy)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-burgundy)]/90 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Tier</span>
                </button>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {membershipTiers.map((tier, idx) => (
                  <div
                    key={tier.id}
                    className={`rounded-xl border p-4.5 space-y-3 text-xs transition-all flex flex-col justify-between ${
                      tier.isPopular
                        ? "border-[var(--color-burgundy)] bg-white ring-2 ring-[var(--color-burgundy)] shadow-sm"
                        : "border-[#E8DFD8] bg-gray-50/60 hover:bg-white"
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Tier Card Top Bar */}
                      <div className="flex items-center justify-between border-b border-gray-200/80 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-[var(--color-burgundy)] bg-[var(--color-cream)] px-2 py-0.5 rounded">
                            TIER #{idx + 1}
                          </span>
                          {tier.isPopular && (
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              <Sparkles className="h-3 w-3 text-amber-500" /> Popular
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1 cursor-pointer text-[11px] font-medium text-gray-600 hover:text-gray-900 select-none">
                            <input
                              type="checkbox"
                              checked={tier.isPopular}
                              onChange={(e) => handleTierChange(idx, "isPopular", e.target.checked)}
                              className="rounded text-[var(--color-burgundy)] focus:ring-[var(--color-burgundy)]"
                            />
                            <span>Featured</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => handleDeleteTier(idx)}
                            className="p-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete this tier"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Tier Fields */}
                      <div>
                        <label className="text-gray-600 font-semibold block mb-0.5">Plan Name</label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => handleTierChange(idx, "name", e.target.value)}
                          className="w-full rounded border border-[#E8DFD8] bg-white p-1.5 text-xs font-bold text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                          placeholder="e.g. 8 SESSIONS / MONTH"
                        />
                      </div>

                      <div>
                        <label className="text-gray-600 font-semibold block mb-0.5">Subtitle / Focus</label>
                        <input
                          type="text"
                          value={tier.subtitle}
                          onChange={(e) => handleTierChange(idx, "subtitle", e.target.value)}
                          className="w-full rounded border border-[#E8DFD8] bg-white p-1.5 text-xs text-gray-800 focus:border-[var(--color-burgundy)] focus:outline-none"
                          placeholder="e.g. Consistent Progressive Overload"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-gray-600 font-semibold block mb-0.5">Price</label>
                          <input
                            type="text"
                            value={tier.price}
                            onChange={(e) => handleTierChange(idx, "price", e.target.value)}
                            className="w-full rounded border border-[#E8DFD8] bg-white p-1.5 text-xs font-bold text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                            placeholder="e.g. $440"
                          />
                        </div>
                        <div>
                          <label className="text-gray-600 font-semibold block mb-0.5">Cadence</label>
                          <input
                            type="text"
                            value={tier.cadence}
                            onChange={(e) => handleTierChange(idx, "cadence", e.target.value)}
                            className="w-full rounded border border-[#E8DFD8] bg-white p-1.5 text-xs text-gray-800 focus:border-[var(--color-burgundy)] focus:outline-none"
                            placeholder="e.g. per month"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-0.5">
                          <label className="text-gray-600 font-semibold">Features Included</label>
                          <span className="text-[10px] text-gray-400">One per line</span>
                        </div>
                        <textarea
                          rows={4}
                          value={tier.featuresText}
                          onChange={(e) => handleTierChange(idx, "featuresText", e.target.value)}
                          className="w-full font-mono rounded border border-[#E8DFD8] bg-white p-1.5 text-xs text-gray-800 focus:border-[var(--color-burgundy)] focus:outline-none"
                          placeholder="2 weekly coached sessions&#10;Full progressive strength split&#10;Direct messaging with coach"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Dashed Add Tier Card */}
                <button
                  type="button"
                  onClick={handleAddTier}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E8DFD8] p-6 text-gray-500 hover:border-[var(--color-burgundy)] hover:text-[var(--color-burgundy)] hover:bg-[var(--color-cream)]/20 transition-all min-h-[260px]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-burgundy)]">
                    <Plus className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Add Pricing Tier</span>
                  <span className="text-[11px] text-gray-400 text-center">
                    Create a customized membership package
                  </span>
                </button>
              </div>
            </div>
          </AdminCard>

          {/* 4. FAQ Accordion & Side Photo */}
          <AdminCard title={`4. Frequently Asked Questions (FAQ) (${faqs.length})`}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                        FAQ Badge
                      </label>
                      <input
                        type="text"
                        value={faqBadge}
                        onChange={(e) => setFaqBadge(e.target.value)}
                        className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                        FAQ Heading
                      </label>
                      <input
                        type="text"
                        value={faqHeading}
                        onChange={(e) => setFaqHeading(e.target.value)}
                        className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                      FAQ Subtitle
                    </label>
                    <textarea
                      rows={2}
                      value={faqSubtext}
                      onChange={(e) => setFaqSubtext(e.target.value)}
                      className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <ImageUploader
                    label="FAQ Column Side Image"
                    value={faqImage}
                    onChange={setFaqImage}
                    helperText="Equipment or studio atmosphere photo"
                  />
                </div>
              </div>

              {/* Dynamic FAQ Items */}
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
                      FAQ Questions & Answers ({faqs.length} Items)
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Add, reword, or delete questions displayed in the public accordion.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="flex items-center gap-1.5 rounded-lg bg-[var(--color-burgundy)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-burgundy)]/90 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Question</span>
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  {faqs.map((faq, idx) => (
                    <div
                      key={faq.id}
                      className="rounded-xl border border-[#E8DFD8] p-4 bg-gray-50/50 hover:bg-white transition-colors space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between border-b border-gray-200/80 pb-2">
                        <span className="font-mono text-[11px] font-bold text-[var(--color-burgundy)] bg-[var(--color-cream)] px-2 py-0.5 rounded">
                          QUESTION #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteFaq(idx)}
                          className="p-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete this question"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div>
                        <label className="text-gray-600 font-semibold block mb-0.5">Question</label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                          className="w-full rounded border border-[#E8DFD8] bg-white p-2 text-xs font-semibold text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                          placeholder="e.g. WHAT HAPPENS IF I TRAVEL OR GET BUSY WITH WORK?"
                        />
                      </div>

                      <div>
                        <label className="text-gray-600 font-semibold block mb-0.5">Answer</label>
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                          className="w-full rounded border border-[#E8DFD8] bg-white p-2 text-xs text-gray-700 leading-relaxed focus:border-[var(--color-burgundy)] focus:outline-none"
                          placeholder="Explain the answer thoroughly..."
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E8DFD8] p-4 text-xs font-bold uppercase tracking-wider text-gray-500 hover:border-[var(--color-burgundy)] hover:text-[var(--color-burgundy)] hover:bg-[var(--color-cream)]/20 transition-all"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Another Question</span>
                  </button>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* 5. Bottom Split CTA */}
          <AdminCard title="5. Bottom Split CTA">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    CTA Headline
                  </label>
                  <input
                    type="text"
                    value={bottomCtaTitle}
                    onChange={(e) => setBottomCtaTitle(e.target.value)}
                    className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs font-semibold text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                      Button Label
                    </label>
                    <input
                      type="text"
                      value={bottomCtaText}
                      onChange={(e) => setBottomCtaText(e.target.value)}
                      className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                      Button Link
                    </label>
                    <input
                      type="text"
                      value={bottomCtaLink}
                      onChange={(e) => setBottomCtaLink(e.target.value)}
                      className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <ImageUploader
                  label="CTA Side Photo"
                  value={bottomCtaImage}
                  onChange={setBottomCtaImage}
                  helperText="High-energy finish photo"
                />
              </div>
            </div>
          </AdminCard>
        </div>
      )}

      {/* TAB 2: PROGRAMME CARDS */}
      {activeTab === "programmes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <AdminCard key={item.id} className="flex flex-col justify-between">
              <div className="space-y-3">
                {/* Image banner */}
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
                      <Dumbbell className="h-8 w-8" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    <StatusBadge status={item.status} />
                    {item.badge && (
                      <span className="rounded bg-[var(--color-burgundy)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[11px] text-gray-500 uppercase tracking-wider">
                    {item.subtitle}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-wider text-[var(--color-burgundy)]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs */}
                <div className="space-y-1 pt-1 border-t border-[#E8DFD8]">
                  {item.specs.map((spec, i) => (
                    <div key={i} className="text-[11px] text-gray-500 flex items-center gap-1.5">
                      <span className="text-[var(--color-burgundy)] font-bold">✓</span>
                      <span>{spec}</span>
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
                    title="Edit Programme"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClass(item.id)}
                    className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Programme"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      {/* Edit / Create Modal for Programme Cards */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-[#E8DFD8] p-6 shadow-xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD8]">
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase">
                {editingItem.id ? "Edit Class Programme" : "Create New Programme"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClass} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Programme Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                    placeholder="e.g. FOUNDATIONS"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Subtitle / Split *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.subtitle}
                    onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                    placeholder="e.g. 8-WEEK BEGINNER INTENSIVE"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={editingItem.badge || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                    placeholder="e.g. MOST POPULAR"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={editingItem.order_index}
                    onChange={(e) => setEditingItem({ ...editingItem, order_index: Number(e.target.value) })}
                    className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Publish Status
                  </label>
                  <select
                    value={editingItem.status}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as "draft" | "published" })}
                    className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  placeholder="Comprehensive description of the curriculum and targets..."
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Features & Specifications (One per line)
                </label>
                <textarea
                  rows={4}
                  value={specsText}
                  onChange={(e) => setSpecsText(e.target.value)}
                  className="w-full font-mono rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  placeholder="3 Sessions / Week&#10;Technique Biomechanics&#10;Gym Anxiety Reset"
                />
              </div>

              <div>
                <ImageUploader
                  label="Programme Cover Photo *"
                  value={editingItem.image_url}
                  onChange={(url) => setEditingItem({ ...editingItem, image_url: url })}
                  helperText="4:3 aspect ratio recommended"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={editingItem.cta_text}
                    onChange={(e) => setEditingItem({ ...editingItem, cta_text: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    CTA Link
                  </label>
                  <input
                    type="text"
                    value={editingItem.cta_link}
                    onChange={(e) => setEditingItem({ ...editingItem, cta_link: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8DFD8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingClass}
                  className="rounded-lg bg-[var(--color-burgundy)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[var(--color-burgundy)]/90 disabled:opacity-50"
                >
                  {savingClass ? "Saving..." : "Save Programme"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
