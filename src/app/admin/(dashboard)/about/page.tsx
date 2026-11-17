"use client";

import { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { savePageSectionAction } from "@/lib/cms/actions";
import { Save, CheckCircle, AlertCircle, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminAboutEditor() {
  // Hero Section
  const [heroHeading, setHeroHeading] = useState("FOUNDED ON SCIENCE, DRIVEN BY SISTERHOOD.");
  const [heroSubtitle, setHeroSubtitle] = useState("We reject toxic diet trends and punishing cardio loops in favour of progressive strength, metabolic health, and lifelong physical autonomy.");
  const [heroImage, setHeroImage] = useState("/images/about-hero.jpg");

  // Problem Section
  const [problemHeading, setProblemHeading] = useState("THE FITNESS INDUSTRY LIED TO WOMEN.");
  const [problemText, setProblemText] = useState("For decades, women were sold 1,200-calorie starvation diets, endless treadmill hours, and fear-based marketing that equated strength with bulkiness. We are here to change that narrative permanently.");
  const [problemImage1, setProblemImage1] = useState("/images/service-collage-1.jpg");
  const [problemImage2, setProblemImage2] = useState("/images/test-coach.jpg");

  // Mission & Stats Section
  const [missionBadge, setMissionBadge] = useState("Our Mission & Commitment");
  const [missionHeading, setMissionHeading] = useState("BUILDING CONFIDENCE THROUGH EVIDENCE-BASED STRENGTH");
  const [missionText, setMissionText] = useState("We exist to demystify strength training for women. Every workout programme, nutritional roadmap, and habit check-in is engineered around your physiology, schedule, and personal goals.");

  const [stat1Value, setStat1Value] = useState("500+");
  const [stat1Label, setStat1Label] = useState("WOMEN TRAINED");
  const [stat1Desc, setStat1Desc] = useState("Across personalized 1-on-1 and online hybrid coaching programmes.");

  const [stat2Value, setStat2Value] = useState("10,000+");
  const [stat2Label, setStat2Label] = useState("COACHED SESSIONS");
  const [stat2Desc, setStat2Desc] = useState("Hands-on technique refinement, form assessments, and movement audits.");

  const [stat3Value, setStat3Value] = useState("5-STAR");
  const [stat3Label, setStat3Label] = useState("CLIENT RATING");
  const [stat3Desc, setStat3Desc] = useState("Consistent 100% five-star feedback for empowerment and sustainable results.");

  // Philosophy Section
  const [coreBeliefBadge, setCoreBeliefBadge] = useState("Our Core Belief");
  const [coreBeliefQuote, setCoreBeliefQuote] = useState("STRENGTH IS NOT ABOUT SHRINKING YOURSELF. IT'S ABOUT TAKING UP SPACE, LIFTING HEAVIER, AND FUELING YOUR BODY WITH INTENTION.");

  const [differentHeading, setDifferentHeading] = useState("WHAT MAKES US different");
  const [differentText, setDifferentText] = useState("Unlike generic templates or one-size-fits-all influencer guides, we treat every client as an individual athlete.");
  const [differentList, setDifferentList] = useState(
    "Individualized progressive overload tailored to your limb lengths & posture\nEvidence-based nutrition planning with no restrictive crash diets\nDedicated weekly video form reviews and biomechanics audits\nDirect WhatsApp / messaging access with your coach for daily support\nHolistic approach respecting sleep, stress management, and female physiology"
  );

  const [forHeading, setForHeading] = useState("WHO THIS IS for");
  const [forText, setForText] = useState("Designed for women at every stage who want sustainable, empowering strength coaching.");
  const [forList, setForList] = useState(
    "Women tired of spinning their wheels with generic HIIT and endless cardio\nBeginners who want to master barbell and dumbbell lifting safely\nBusy professionals needing efficient, high-yield 45-minute training structures\nMothers returning to fitness seeking postpartum core and pelvic floor strength\nAnyone looking for lifelong consistency and lasting mental resilience"
  );

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadStory() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data } = await supabase
          .from("page_sections")
          .select("*")
          .eq("page_slug", "about")
          .eq("section_key", "story")
          .maybeSingle();

        if (data) {
          if (data.title) setHeroHeading(data.title);
          if (data.subtitle) setHeroSubtitle(data.subtitle);
          if (data.image_url) setHeroImage(data.image_url);
          const c = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
          if (c?.problemHeading) setProblemHeading(c.problemHeading);
          if (c?.problemText) setProblemText(c.problemText);
          if (c?.problemImage1) setProblemImage1(c.problemImage1);
          if (c?.problemImage2) setProblemImage2(c.problemImage2);
          if (c?.missionBadge) setMissionBadge(c.missionBadge);
          if (c?.missionHeading) setMissionHeading(c.missionHeading);
          if (c?.missionText) setMissionText(c.missionText);
          if (Array.isArray(c?.stats) && c.stats.length >= 3) {
            setStat1Value(c.stats[0]?.value || "500+");
            setStat1Label(c.stats[0]?.label || "WOMEN TRAINED");
            setStat1Desc(c.stats[0]?.description || "");
            setStat2Value(c.stats[1]?.value || "10,000+");
            setStat2Label(c.stats[1]?.label || "COACHED SESSIONS");
            setStat2Desc(c.stats[1]?.description || "");
            setStat3Value(c.stats[2]?.value || "5-STAR");
            setStat3Label(c.stats[2]?.label || "CLIENT RATING");
            setStat3Desc(c.stats[2]?.description || "");
          }
          if (c?.coreBeliefBadge) setCoreBeliefBadge(c.coreBeliefBadge);
          if (c?.coreBeliefQuote) setCoreBeliefQuote(c.coreBeliefQuote);
          if (c?.differentHeading) setDifferentHeading(c.differentHeading);
          if (c?.differentText) setDifferentText(c.differentText);
          if (Array.isArray(c?.differentList)) setDifferentList(c.differentList.join("\n"));
          if (c?.forHeading) setForHeading(c.forHeading);
          if (c?.forText) setForText(c.forText);
          if (Array.isArray(c?.forList)) setForList(c.forList.join("\n"));
        }
      } catch (err) {
        console.error("Failed to load about section from supabase:", err);
      }
    }
    loadStory();
  }, []);

  const handleSave = async (status: "draft" | "published") => {
    setSaving(true);
    setStatusMsg(null);

    try {
      const res = await savePageSectionAction(
        "about",
        "story",
        heroHeading,
        heroSubtitle,
        {
          problemHeading,
          problemText,
          problemImage1,
          problemImage2,
          missionBadge,
          missionHeading,
          missionText,
          stats: [
            { value: stat1Value, label: stat1Label, description: stat1Desc },
            { value: stat2Value, label: stat2Label, description: stat2Desc },
            { value: stat3Value, label: stat3Value ? stat3Label : "", description: stat3Desc },
          ],
          coreBeliefBadge,
          coreBeliefQuote,
          differentHeading,
          differentText,
          differentList: differentList.split("\n").filter(Boolean),
          forHeading,
          forText,
          forList: forList.split("\n").filter(Boolean),
        },
        heroImage,
        true,
        status
      );

      if (res.success) {
        setStatusMsg({
          type: "success",
          text: `About page successfully ${status === "published" ? "published live" : "saved as draft"}.`,
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
            ABOUT PAGE & STORY EDITOR
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-0.5">
            Manage your coaching mission, industry perspective, metrics, and core philosophy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/about"
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

      {/* 1. Hero & Vision */}
      <AdminCard title="1. Page Hero & Vision">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Main Headline
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
                Mission Subtitle
              </label>
              <textarea
                rows={3}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2.5 text-sm text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <ImageUploader
              label="About Hero Image"
              value={heroImage}
              onChange={setHeroImage}
              helperText="Banner or studio workout photo"
              required
            />
          </div>
        </div>
      </AdminCard>

      {/* 2. Industry Problem Section */}
      <AdminCard title="2. The Problem We Saw">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
              Callout Heading
            </label>
            <input
              type="text"
              value={problemHeading}
              onChange={(e) => setProblemHeading(e.target.value)}
              className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2.5 text-sm font-semibold text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
              Editorial Narrative
            </label>
            <textarea
              rows={3}
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2.5 text-sm text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
            <div>
              <ImageUploader
                label="Problem Section - Left Photo"
                value={problemImage1}
                onChange={setProblemImage1}
                helperText="Collage left image (e.g. barbell / strength workout)"
              />
            </div>
            <div>
              <ImageUploader
                label="Problem Section - Right Photo"
                value={problemImage2}
                onChange={setProblemImage2}
                helperText="Collage right image (e.g. coach guidance / form cues)"
              />
            </div>
          </div>
        </div>
      </AdminCard>

      {/* 3. Mission & Stats */}
      <AdminCard title="3. Mission & Metric Pillars">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Mission Badge
              </label>
              <input
                type="text"
                value={missionBadge}
                onChange={(e) => setMissionBadge(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Mission Heading
              </label>
              <input
                type="text"
                value={missionHeading}
                onChange={(e) => setMissionHeading(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
              Mission Statement
            </label>
            <textarea
              rows={2}
              value={missionText}
              onChange={(e) => setMissionText(e.target.value)}
              className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
            />
          </div>

          <div className="border-t border-gray-100 pt-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] mb-3">
              3 Metric Pillars
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Stat 1 */}
              <div className="rounded-lg border border-gray-200 p-3 bg-gray-50/50 space-y-2">
                <input
                  type="text"
                  placeholder="e.g. 500+"
                  value={stat1Value}
                  onChange={(e) => setStat1Value(e.target.value)}
                  className="w-full rounded border border-gray-200 bg-white p-1.5 text-xs font-bold text-gray-900"
                />
                <input
                  type="text"
                  placeholder="Label e.g. WOMEN TRAINED"
                  value={stat1Label}
                  onChange={(e) => setStat1Label(e.target.value)}
                  className="w-full rounded border border-gray-200 bg-white p-1.5 text-xs text-gray-900"
                />
                <textarea
                  rows={2}
                  placeholder="Short description"
                  value={stat1Desc}
                  onChange={(e) => setStat1Desc(e.target.value)}
                  className="w-full rounded border border-gray-200 bg-white p-1.5 text-xs text-gray-700"
                />
              </div>

              {/* Stat 2 */}
              <div className="rounded-lg border border-gray-200 p-3 bg-gray-50/50 space-y-2">
                <input
                  type="text"
                  placeholder="e.g. 10,000+"
                  value={stat2Value}
                  onChange={(e) => setStat2Value(e.target.value)}
                  className="w-full rounded border border-gray-200 bg-white p-1.5 text-xs font-bold text-gray-900"
                />
                <input
                  type="text"
                  placeholder="Label e.g. COACHED SESSIONS"
                  value={stat2Label}
                  onChange={(e) => setStat2Label(e.target.value)}
                  className="w-full rounded border border-gray-200 bg-white p-1.5 text-xs text-gray-900"
                />
                <textarea
                  rows={2}
                  placeholder="Short description"
                  value={stat2Desc}
                  onChange={(e) => setStat2Desc(e.target.value)}
                  className="w-full rounded border border-gray-200 bg-white p-1.5 text-xs text-gray-700"
                />
              </div>

              {/* Stat 3 */}
              <div className="rounded-lg border border-gray-200 p-3 bg-gray-50/50 space-y-2">
                <input
                  type="text"
                  placeholder="e.g. 5-STAR"
                  value={stat3Value}
                  onChange={(e) => setStat3Value(e.target.value)}
                  className="w-full rounded border border-gray-200 bg-white p-1.5 text-xs font-bold text-gray-900"
                />
                <input
                  type="text"
                  placeholder="Label e.g. CLIENT RATING"
                  value={stat3Label}
                  onChange={(e) => setStat3Label(e.target.value)}
                  className="w-full rounded border border-gray-200 bg-white p-1.5 text-xs text-gray-900"
                />
                <textarea
                  rows={2}
                  placeholder="Short description"
                  value={stat3Desc}
                  onChange={(e) => setStat3Desc(e.target.value)}
                  className="w-full rounded border border-gray-200 bg-white p-1.5 text-xs text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      </AdminCard>

      {/* 4. Philosophy & Beliefs */}
      <AdminCard title="4. Core Belief & Philosophy Cards">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Core Belief Badge
              </label>
              <input
                type="text"
                value={coreBeliefBadge}
                onChange={(e) => setCoreBeliefBadge(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                Core Belief Pull Quote
              </label>
              <input
                type="text"
                value={coreBeliefQuote}
                onChange={(e) => setCoreBeliefQuote(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900 focus:border-[var(--color-burgundy)] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-4">
            {/* What Makes Us Different */}
            <div className="space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
                Card 1: What Makes Us Different
              </span>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Heading</label>
                <input
                  type="text"
                  value={differentHeading}
                  onChange={(e) => setDifferentHeading(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Subtext</label>
                <textarea
                  rows={2}
                  value={differentText}
                  onChange={(e) => setDifferentText(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Bullet Items (One per line)</label>
                <textarea
                  rows={5}
                  value={differentList}
                  onChange={(e) => setDifferentList(e.target.value)}
                  className="w-full font-mono rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
                />
              </div>
            </div>

            {/* Who This Is For */}
            <div className="space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
                Card 2: Who This Is For
              </span>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Heading</label>
                <input
                  type="text"
                  value={forHeading}
                  onChange={(e) => setForHeading(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Subtext</label>
                <textarea
                  rows={2}
                  value={forText}
                  onChange={(e) => setForText(e.target.value)}
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Bullet Items (One per line)</label>
                <textarea
                  rows={5}
                  value={forList}
                  onChange={(e) => setForList(e.target.value)}
                  className="w-full font-mono rounded-lg border border-[#E8DFD8] bg-white p-2 text-xs text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
