import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Read .env.local manually
const envContent = fs.readFileSync(".env.local", "utf8");
const env = {};
for (const line of envContent.split("\n")) {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || "";
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    env[match[1]] = value;
  }
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Updating home hero section in Supabase...");

  const { data, error } = await supabase.from("page_sections").upsert(
    {
      page_slug: "home",
      section_key: "hero",
      title: "TURN UP the HEAT.",
      subtitle: "Sculpt Your Core. Own Your Confidence.",
      content: {
        ctaText: "Start Today",
        ctaLink: "/appointments",
        comparisonEnabled: true,
        comparisonTitle: "WHY THIS COACHING METHOD WORKS",
        marqueeEnabled: true,
        marqueeText: "BUILD STRENGTH / REGAIN ENERGY / ZERO BULLSHIT",
        coachBioTitle: "MEET YOUR COACH & PHILOSOPHY",
        coachBioImage: "/images/coach-portrait.jpg",
        bottomCtaTitle: "READY TO BUILD REAL CONFIDENCE?",
        bottomCtaText: "START TODAY",
      },
      image_url: "/images/hero-bg.jpg",
      is_enabled: true,
      status: "published",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "page_slug,section_key" }
  );

  if (error) {
    console.error("Error updating hero:", error);
    process.exit(1);
  }

  console.log("Hero section successfully updated in Supabase to match reference design!");
}

main();

