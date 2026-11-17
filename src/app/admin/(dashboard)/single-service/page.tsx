"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { savePageSectionAction } from "@/lib/cms/actions";
import {
  Save,
  Eye,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Plus,
  Trash2,
} from "lucide-react";

interface PhaseFormItem {
  number: string;
  name: string;
  weeks: string;
  description: string;
  deliverablesText: string;
}

interface InclusionFormItem {
  title: string;
  description: string;
}

interface ContainerFormItem {
  id: string;
  name: string;
  cadence: string;
  price: string;
  subprice: string;
  description: string;
  featuresText: string;
  isPopular: boolean;
}

const DEFAULT_PHASES: PhaseFormItem[] = [
  {
    number: "01",
    name: "AUDIT & BASELINES",
    weeks: "Weeks 1 – 4",
    description:
      "We identify your movement patterns, joint mobility, lifting technique, and current nutritional baseline. We calibrate your starting weights and establish consistent training routines without overwhelming your nervous system.",
    deliverablesText: "Video movement screen\nApp dashboard setup\nCaloric & protein targets\nForm tutorial library",
  },
  {
    number: "02",
    name: "PROGRESSIVE OVERLOAD",
    weeks: "Weeks 5 – 8",
    description:
      "The hypertrophy and strength phase. Your training split introduces deliberate volume and intensity increments. Weekly video form check-ins refine your lifts and ensure your body responds with visible tone and stamina.",
    deliverablesText: "Weekly Loom video feedback\nMicro-adjustments to macros\nBody composition check-in\nWhatsApp check-in cadence",
  },
  {
    number: "03",
    name: "AUTONOMY & MASTERY",
    weeks: "Weeks 9 – 12+",
    description:
      "Locking in lifetime consistency. You now command compound movements with flawless mechanics and understand how to navigate social dining, deload weeks, and routine changes without losing results.",
    deliverablesText: "Post-program maintenance guide\nStrength progression milestone audit\nLong-term programming blueprint",
  },
];

const DEFAULT_INCLUSIONS: InclusionFormItem[] = [
  {
    title: "CUSTOM MOBILE APP PROGRAMMING",
    description:
      "Every rep, set, warm-up, and rest interval mapped out in our high-performance smartphone app. Video demos and progression notes at your fingertips.",
  },
  {
    title: "WEEKLY VIDEO FORM AUDITS",
    description:
      "Submit video clips of your compound lifts. Your coach records a personalized Loom breakdown analyzing bar path, hip hinge angles, and bracing mechanics.",
  },
  {
    title: "NUTRITIONAL ARCHITECTURE",
    description:
      "Personalized daily macronutrient and caloric targets aligned with your training cycles. Designed for real food, dining out, and steady energy.",
  },
  {
    title: "DIRECT COACH MESSAGING",
    description:
      "Never second-guess an exercise swap or workout question. You get direct WhatsApp access to your coach Monday through Friday for immediate guidance.",
  },
  {
    title: "BI-WEEKLY PROGRESS REVIEWS",
    description:
      "Comprehensive check-in calls and metric dashboards tracking body recomposition, training volume, sleep quality, and energy patterns.",
  },
  {
    title: "HABIT & MINDSET PROTOCOLS",
    description:
      "Actionable systems for stress reduction, circadian rhythm optimization, hydration habits, and overcoming gym intimidation forever.",
  },
];

const DEFAULT_CONTAINERS: ContainerFormItem[] = [
  {
    id: "container-1",
    name: "3-MONTH INTENSIVE",
    cadence: "12 Weeks of Focused Coaching",
    price: "$997",
    subprice: "or 3 monthly payments of $349",
    description:
      "Ideal for the woman who wants to overhaul her lifting mechanics, establish an unbreakable routine, and kickstart significant body recomposition.",
    featuresText: [
      "Full 12-week custom progressive strength split",
      "Weekly Loom video form analysis reviews",
      "Tailored caloric and macronutrient targets",
      "Direct coach WhatsApp messaging (Mon-Fri)",
      "Bi-weekly performance & habit audits",
    ].join("\n"),
    isPopular: false,
  },
  {
    id: "container-2",
    name: "6-MONTH TRANSFORMATION",
    cadence: "24 Weeks of Comprehensive Mentorship",
    price: "$1,897",
    subprice: "or 6 monthly payments of $329",
    description:
      "Our most comprehensive container. Allows for two distinct periodized training phases, reverse dieting if needed, and true lifelong physical mastery.",
    featuresText: [
      "Two periodized 12-week training cycles (Hypertrophy + Strength Peak)",
      "Weekly Loom video form audits with zero turnaround lag",
      "Phase-by-phase nutrition adjustments & reverse dieting protocol",
      "24/7 priority direct coach access",
      "Monthly 30-minute private 1-on-1 strategy video call",
      "Lifetime access to our complete movement exercise vault",
    ].join("\n"),
    isPopular: true,
  },
];

export default function AdminSingleServiceManager() {
  // 1. Hero
  const [heroBadge, setHeroBadge] = useState("Flagship Private Mentorship");
  const [heroHeading, setHeroHeading] = useState("STRONGER. SCULPTED. personally GUIDED.");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "The comprehensive 1:1 coaching experience engineered for women who want individualized strength programming, bespoke nutrition guidance, and direct daily coach accountability."
  );
  const [heroCta1Text, setHeroCta1Text] = useState("Apply For 1:1 Coaching");
  const [heroCta1Link, setHeroCta1Link] = useState("/appointments");
  const [heroCta2Text, setHeroCta2Text] = useState("View Coaching Containers");
  const [heroCta2Link, setHeroCta2Link] = useState("#pricing");
  const [image1Src, setImage1Src] = useState("");
  const [image2Src, setImage2Src] = useState("");
  const [image3Src, setImage3Src] = useState("");

  // 2. Who is this for
  const [whoBadge, setWhoBadge] = useState("Mutual Commitment");
  const [whoHeading, setWhoHeading] = useState("IS PRIVATE COACHING right for you?");
  const [whoSubtitle, setWhoSubtitle] = useState(
    "We only take on a limited roster of private 1:1 clients at any time to guarantee personal attention and elite results."
  );
  const [whoMarqueeText, setWhoMarqueeText] = useState("WHO IS THIS FOR");
  const [whoItsForText, setWhoItsForText] = useState(
    "Women ready to move past generic online influencer workouts and invest in structured programming\nClients looking to build visible muscle tone, increase bone density, and supercharge metabolism\nBusy women who need an adaptable training program that fits around work, family, and travel\nAnyone dealing with past injuries or joint stiffness who needs careful biomechanical adjustments\nWomen who want dedicated weekly accountability and direct, non-judgmental guidance"
  );
  const [whoItsNotForText, setWhoItsNotForText] = useState(
    "Those looking for a 14-day quick fix or rapid crash starvation cleanse\nIndividuals unwilling to track workouts or record short video clips for form feedback\nAnyone looking for a passive checklist without willingness to communicate weekly\nPeople seeking extreme, unsustainable cardio marathons rather than progressive strength"
  );

  // 3. Roadmap / Phases
  const [timelineBadge, setTimelineBadge] = useState("Your Coaching Roadmap");
  const [timelineHeading, setTimelineHeading] = useState("THE transformation");
  const [timelineSubtitle, setTimelineSubtitle] = useState(
    "A step-by-step 12-week progression built to take you from uncertain in the gym to powerful, independent, and energized."
  );
  const [phases, setPhases] = useState<PhaseFormItem[]>(DEFAULT_PHASES);

  // 4. What's Included
  const [includedBadge, setIncludedBadge] = useState("Total Support Architecture");
  const [includedHeading, setIncludedHeading] = useState("WHAT'S included");
  const [includedSubtitle, setIncludedSubtitle] = useState(
    "Every element of private coaching is intentionally designed to remove friction, build confidence, and guarantee results."
  );
  const [inclusions, setInclusions] = useState<InclusionFormItem[]>(DEFAULT_INCLUSIONS);

  // 5. Coaching Containers (Pricing)
  const [pricingMarqueeText, setPricingMarqueeText] = useState("CHOOSE YOUR COACHING CONTAINER");
  const [pricingBadge, setPricingBadge] = useState("Investment & Commitment");
  const [pricingHeading, setPricingHeading] = useState("COACHING containers");
  const [pricingSubtitle, setPricingSubtitle] = useState(
    "Transparent pricing with flexible payment plans. Application is required to ensure coach-client alignment."
  );
  const [containers, setContainers] = useState<ContainerFormItem[]>(DEFAULT_CONTAINERS);

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load from Supabase on mount
  useEffect(() => {
    async function loadData() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data } = await supabase
          .from("page_sections")
          .select("*")
          .eq("page_slug", "single-service")
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
          if (c?.image1Src) setImage1Src(c.image1Src);
          if (c?.image2Src) setImage2Src(c.image2Src);
          if (c?.image3Src) setImage3Src(c.image3Src);

          if (c?.whoBadge) setWhoBadge(c.whoBadge);
          if (c?.whoHeading) setWhoHeading(c.whoHeading);
          if (c?.whoSubtitle) setWhoSubtitle(c.whoSubtitle);
          if (c?.whoMarqueeText) setWhoMarqueeText(c.whoMarqueeText);
          if (Array.isArray(c?.whoItsFor)) setWhoItsForText(c.whoItsFor.join("\n"));
          if (Array.isArray(c?.whoItsNotFor)) setWhoItsNotForText(c.whoItsNotFor.join("\n"));

          if (c?.timelineBadge) setTimelineBadge(c.timelineBadge);
          if (c?.timelineHeading) setTimelineHeading(c.timelineHeading);
          if (c?.timelineSubtitle) setTimelineSubtitle(c.timelineSubtitle);
          if (Array.isArray(c?.timelinePhases) && c.timelinePhases.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setPhases(c.timelinePhases.map((p: any) => ({
              number: p.number || "",
              name: p.name || "",
              weeks: p.weeks || "",
              description: p.description || "",
              deliverablesText: Array.isArray(p.deliverables) ? p.deliverables.join("\n") : "",
            })));
          }

          if (c?.includedBadge) setIncludedBadge(c.includedBadge);
          if (c?.includedHeading) setIncludedHeading(c.includedHeading);
          if (c?.includedSubtitle) setIncludedSubtitle(c.includedSubtitle);
          if (Array.isArray(c?.inclusions) && c.inclusions.length > 0) {
            setInclusions(c.inclusions);
          }

          if (c?.pricingMarqueeText) setPricingMarqueeText(c.pricingMarqueeText);
          if (c?.pricingBadge) setPricingBadge(c.pricingBadge);
          if (c?.pricingHeading) setPricingHeading(c.pricingHeading);
          if (c?.pricingSubtitle) setPricingSubtitle(c.pricingSubtitle);
          if (Array.isArray(c?.containers) && c.containers.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setContainers(c.containers.map((cnt: any, idx: number) => ({
              id: cnt.id || `container-${idx + 1}-${Date.now()}`,
              name: cnt.name || "",
              cadence: cnt.cadence || "",
              price: cnt.price || "",
              subprice: cnt.subprice || "",
              description: cnt.description || "",
              featuresText: Array.isArray(cnt.features) ? cnt.features.join("\n") : "",
              isPopular: Boolean(cnt.isPopular),
            })));
          }
        }
      } catch (err) {
        console.error("Failed to load 1:1 coaching page sections:", err);
      }
    }
    loadData();
  }, []);

  // Handlers for Phases
  const handlePhaseChange = (idx: number, field: keyof PhaseFormItem, value: string) => {
    setPhases((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  // Handlers for Inclusions
  const handleInclusionChange = (idx: number, field: keyof InclusionFormItem, value: string) => {
    setInclusions((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  // Handlers for Containers
  const handleAddContainer = () => {
    setContainers((prev) => [
      ...prev,
      {
        id: `container-${Date.now()}`,
        name: "CUSTOM CONTAINER",
        cadence: "16 Weeks of Coaching",
        price: "$1,400",
        subprice: "or 4 monthly payments of $375",
        description: "Targeted mentorship container built around your personal goals.",
        featuresText: "Custom workout programming\nWeekly form review\nNutrition design",
        isPopular: false,
      },
    ]);
  };

  const handleDeleteContainer = (idx: number) => {
    if (containers.length <= 1) {
      if (!confirm("This is your only coaching container. Are you sure you want to delete it?")) return;
    }
    setContainers((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleContainerChange = (idx: number, field: keyof ContainerFormItem, value: string | boolean) => {
    setContainers((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const handleSaveAll = async (status: "draft" | "published") => {
    setSaving(true);
    setStatusMsg(null);

    try {
      const contentPayload = {
        heroBadge,
        heroCta1Text,
        heroCta1Link,
        heroCta2Text,
        heroCta2Link,
        image1Src,
        image2Src,
        image3Src,
        whoBadge,
        whoHeading,
        whoSubtitle,
        whoMarqueeText,
        whoItsFor: whoItsForText.split("\n").map((s) => s.trim()).filter(Boolean),
        whoItsNotFor: whoItsNotForText.split("\n").map((s) => s.trim()).filter(Boolean),
        timelineBadge,
        timelineHeading,
        timelineSubtitle,
        timelinePhases: phases.map((p) => ({
          number: p.number,
          name: p.name,
          weeks: p.weeks,
          description: p.description,
          deliverables: p.deliverablesText.split("\n").map((s) => s.trim()).filter(Boolean),
        })),
        includedBadge,
        includedHeading,
        includedSubtitle,
        inclusions,
        pricingMarqueeText,
        pricingBadge,
        pricingHeading,
        pricingSubtitle,
        containers: containers.map((c) => ({
          id: c.id,
          name: c.name,
          cadence: c.cadence,
          price: c.price,
          subprice: c.subprice,
          description: c.description,
          features: c.featuresText.split("\n").map((s) => s.trim()).filter(Boolean),
          isPopular: c.isPopular,
        })),
      };

      const res = await savePageSectionAction(
        "single-service",
        "main",
        heroHeading,
        heroSubtitle,
        contentPayload,
        image1Src,
        true,
        status
      );

      if (res.success) {
        setStatusMsg({
          type: "success",
          text: `1:1 Private Coaching page successfully ${status === "published" ? "published live" : "saved as draft"}.`,
        });
      } else {
        setStatusMsg({ type: "error", text: res.message || "Failed to save content." });
      }
    } catch {
      setStatusMsg({ type: "error", text: "An error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div suppressHydrationWarning className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            suppressHydrationWarning
            className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase"
          >
            1:1 COACHING CMS
          </h1>
          <p
            suppressHydrationWarning
            className="text-xs text-gray-500 font-mono mt-0.5"
          >
            Manage your flagship private mentorship page: hero collage, criteria, roadmap, deliverables, and coaching packages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/single-service"
            target="_blank"
            className="flex items-center gap-1.5 rounded-lg border border-[#E8DFD8] bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview Public</span>
          </Link>

          <button
            onClick={() => handleSaveAll("draft")}
            disabled={saving}
            className="rounded-lg border border-[var(--color-burgundy)] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] hover:bg-[var(--color-cream)] disabled:opacity-50 transition-colors"
          >
            Save Draft
          </button>

          <button
            onClick={() => handleSaveAll("published")}
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

      {/* 1. Page Hero Section */}
      <AdminCard title="1. Page Hero Section & Media Collage">
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
              <span className="font-bold text-[11px] text-[var(--color-burgundy)] block">Primary Button (Application)</span>
              <input
                type="text"
                placeholder="Button Label"
                value={heroCta1Text}
                onChange={(e) => setHeroCta1Text(e.target.value)}
                className="w-full rounded border border-[#E8DFD8] p-1.5 text-xs"
              />
              <input
                type="text"
                placeholder="Button Link"
                value={heroCta1Link}
                onChange={(e) => setHeroCta1Link(e.target.value)}
                className="w-full rounded border border-[#E8DFD8] p-1.5 text-xs"
              />
            </div>

            <div className="space-y-2">
              <span className="font-bold text-[11px] text-[var(--color-burgundy)] block">Secondary Button (Pricing Anchor)</span>
              <input
                type="text"
                placeholder="Button Label"
                value={heroCta2Text}
                onChange={(e) => setHeroCta2Text(e.target.value)}
                className="w-full rounded border border-[#E8DFD8] p-1.5 text-xs"
              />
              <input
                type="text"
                placeholder="Button Link"
                value={heroCta2Link}
                onChange={(e) => setHeroCta2Link(e.target.value)}
                className="w-full rounded border border-[#E8DFD8] p-1.5 text-xs"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <span className="block font-bold uppercase tracking-wider text-xs text-[var(--color-burgundy)] mb-3">
              Hero 3-Photo Collage Strip
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ImageUploader
                label="Collage Photo 1 (Left)"
                value={image1Src}
                onChange={setImage1Src}
                helperText="Left strength photo"
              />
              <ImageUploader
                label="Collage Photo 2 (Center - Elevated)"
                value={image2Src}
                onChange={setImage2Src}
                helperText="Center high-focus photo"
              />
              <ImageUploader
                label="Collage Photo 3 (Right)"
                value={image3Src}
                onChange={setImage3Src}
                helperText="Right movement check photo"
              />
            </div>
          </div>
        </div>
      </AdminCard>

      {/* 2. Who is this for Section */}
      <AdminCard title="2. Mutual Commitment (Who This Is For & Not For)">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Section Badge
              </label>
              <input
                type="text"
                value={whoBadge}
                onChange={(e) => setWhoBadge(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={whoHeading}
                onChange={(e) => setWhoHeading(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Marquee Repeating Slogan
              </label>
              <input
                type="text"
                value={whoMarqueeText}
                onChange={(e) => setWhoMarqueeText(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
              Section Subtitle
            </label>
            <textarea
              rows={2}
              value={whoSubtitle}
              onChange={(e) => setWhoSubtitle(e.target.value)}
              className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  You Will Thrive If (Ideal Fit)
                </label>
                <span className="text-[10px] text-gray-400">One bullet per line</span>
              </div>
              <textarea
                rows={5}
                value={whoItsForText}
                onChange={(e) => setWhoItsForText(e.target.value)}
                className="w-full font-mono rounded-lg border border-emerald-200 bg-emerald-50/20 p-2 text-xs text-gray-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-red-800 uppercase tracking-wider">
                  This Programme Is NOT For (Not A Fit)
                </label>
                <span className="text-[10px] text-gray-400">One bullet per line</span>
              </div>
              <textarea
                rows={5}
                value={whoItsNotForText}
                onChange={(e) => setWhoItsNotForText(e.target.value)}
                className="w-full font-mono rounded-lg border border-red-200 bg-red-50/20 p-2 text-xs text-gray-900 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>
      </AdminCard>

      {/* 3. Transformation Timeline */}
      <AdminCard title="3. 12-Week Transformation Roadmap (3 Phases)">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Timeline Badge
              </label>
              <input
                type="text"
                value={timelineBadge}
                onChange={(e) => setTimelineBadge(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Timeline Heading
              </label>
              <input
                type="text"
                value={timelineHeading}
                onChange={(e) => setTimelineHeading(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
              Timeline Subtitle
            </label>
            <textarea
              rows={2}
              value={timelineSubtitle}
              onChange={(e) => setTimelineSubtitle(e.target.value)}
              className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-gray-100">
            {phases.map((p, idx) => (
              <div key={idx} className="rounded-lg border border-[#E8DFD8] p-3.5 bg-gray-50/50 space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
                  <span className="font-bold text-[var(--color-burgundy)] font-mono">PHASE {p.number}</span>
                  <input
                    type="text"
                    placeholder="Weeks"
                    value={p.weeks}
                    onChange={(e) => handlePhaseChange(idx, "weeks", e.target.value)}
                    className="w-24 text-right rounded border border-gray-200 p-1 text-[11px] font-semibold"
                  />
                </div>

                <div>
                  <label className="text-gray-500 block mb-0.5">Phase Name</label>
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => handlePhaseChange(idx, "name", e.target.value)}
                    className="w-full rounded border border-gray-200 p-1.5 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-gray-500 block mb-0.5">Phase Description</label>
                  <textarea
                    rows={3}
                    value={p.description}
                    onChange={(e) => handlePhaseChange(idx, "description", e.target.value)}
                    className="w-full rounded border border-gray-200 p-1.5 text-xs text-gray-700"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="text-gray-500">Deliverables</label>
                    <span className="text-[10px] text-gray-400">One per line</span>
                  </div>
                  <textarea
                    rows={3}
                    value={p.deliverablesText}
                    onChange={(e) => handlePhaseChange(idx, "deliverablesText", e.target.value)}
                    className="w-full font-mono rounded border border-gray-200 p-1.5 text-xs text-gray-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminCard>

      {/* 4. Total Support Architecture (6 Inclusions) */}
      <AdminCard title="4. Total Support Architecture (6 What's Included Pillars)">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Section Badge
              </label>
              <input
                type="text"
                value={includedBadge}
                onChange={(e) => setIncludedBadge(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={includedHeading}
                onChange={(e) => setIncludedHeading(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
              Section Subtitle
            </label>
            <textarea
              rows={2}
              value={includedSubtitle}
              onChange={(e) => setIncludedSubtitle(e.target.value)}
              className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2 border-t border-gray-100">
            {inclusions.map((inc, idx) => (
              <div key={idx} className="rounded-lg border border-[#E8DFD8] p-3 bg-gray-50/50 space-y-2 text-xs">
                <span className="font-mono text-[10px] font-bold text-[var(--color-burgundy)] bg-[var(--color-cream)] px-2 py-0.5 rounded">
                  PILLAR #{idx + 1}
                </span>
                <div>
                  <label className="text-gray-500 block mb-0.5">Pillar Title</label>
                  <input
                    type="text"
                    value={inc.title}
                    onChange={(e) => handleInclusionChange(idx, "title", e.target.value)}
                    className="w-full rounded border border-gray-200 p-1.5 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-gray-500 block mb-0.5">Description</label>
                  <textarea
                    rows={3}
                    value={inc.description}
                    onChange={(e) => handleInclusionChange(idx, "description", e.target.value)}
                    className="w-full rounded border border-gray-200 p-1.5 text-xs text-gray-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminCard>

      {/* 5. Coaching Containers (Pricing) */}
      <AdminCard title={`5. Coaching Containers & Pricing (${containers.length})`}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Section Badge
              </label>
              <input
                type="text"
                value={pricingBadge}
                onChange={(e) => setPricingBadge(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={pricingHeading}
                onChange={(e) => setPricingHeading(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Marquee Slogan
              </label>
              <input
                type="text"
                value={pricingMarqueeText}
                onChange={(e) => setPricingMarqueeText(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
              Section Subtitle
            </label>
            <textarea
              rows={2}
              value={pricingSubtitle}
              onChange={(e) => setPricingSubtitle(e.target.value)}
              className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
            />
          </div>

          {/* Containers Header & Add Button */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
              Container Packages ({containers.length})
            </span>
            <button
              type="button"
              onClick={handleAddContainer}
              className="flex items-center gap-1.5 rounded-lg bg-[var(--color-burgundy)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-burgundy)]/90 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Container</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {containers.map((c, idx) => (
              <div
                key={c.id}
                className={`rounded-xl border p-4 space-y-3 text-xs ${
                  c.isPopular
                    ? "border-[var(--color-burgundy)] bg-white ring-2 ring-[var(--color-burgundy)] shadow-sm"
                    : "border-[#E8DFD8] bg-gray-50/50"
                }`}
              >
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-[var(--color-burgundy)] bg-[var(--color-cream)] px-2 py-0.5 rounded">
                      PACKAGE #{idx + 1}
                    </span>
                    {c.isPopular && (
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <Sparkles className="h-3 w-3 text-amber-500" /> Most Recommended
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 cursor-pointer text-[11px] font-medium text-gray-600">
                      <input
                        type="checkbox"
                        checked={c.isPopular}
                        onChange={(e) => handleContainerChange(idx, "isPopular", e.target.checked)}
                        className="rounded text-[var(--color-burgundy)]"
                      />
                      <span>Featured</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => handleDeleteContainer(idx)}
                      className="p-1 rounded text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete package"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-gray-500 block mb-0.5">Container Name</label>
                    <input
                      type="text"
                      value={c.name}
                      onChange={(e) => handleContainerChange(idx, "name", e.target.value)}
                      className="w-full rounded border border-gray-200 p-1.5 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-0.5">Cadence / Timeline</label>
                    <input
                      type="text"
                      value={c.cadence}
                      onChange={(e) => handleContainerChange(idx, "cadence", e.target.value)}
                      className="w-full rounded border border-gray-200 p-1.5 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-gray-500 block mb-0.5">Price</label>
                    <input
                      type="text"
                      value={c.price}
                      onChange={(e) => handleContainerChange(idx, "price", e.target.value)}
                      className="w-full rounded border border-gray-200 p-1.5 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-0.5">Subprice / Installments</label>
                    <input
                      type="text"
                      value={c.subprice}
                      onChange={(e) => handleContainerChange(idx, "subprice", e.target.value)}
                      className="w-full rounded border border-gray-200 p-1.5 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-500 block mb-0.5">Description</label>
                  <textarea
                    rows={2}
                    value={c.description}
                    onChange={(e) => handleContainerChange(idx, "description", e.target.value)}
                    className="w-full rounded border border-gray-200 p-1.5 text-xs"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="text-gray-500">Inclusions / Features</label>
                    <span className="text-[10px] text-gray-400">One per line</span>
                  </div>
                  <textarea
                    rows={4}
                    value={c.featuresText}
                    onChange={(e) => handleContainerChange(idx, "featuresText", e.target.value)}
                    className="w-full font-mono rounded border border-gray-200 p-1.5 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminCard>
    </div>
  );
}

