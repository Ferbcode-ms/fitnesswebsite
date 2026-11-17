import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import {
  Smartphone,
  Video,
  Apple,
  MessageCircle,
  TrendingUp,
  BrainCircuit,
} from "lucide-react";

export interface InclusionItem {
  title: string;
  description: string;
}

interface SingleServiceIncludedSectionProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  inclusions?: InclusionItem[];
}

const DEFAULT_INCLUSIONS: InclusionItem[] = [
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

const ICONS = [Smartphone, Video, Apple, MessageCircle, TrendingUp, BrainCircuit];

function formatHeading(text: string) {
  if (/\bincluded\b/i.test(text)) {
    const parts = text.split(/\bincluded\b/i);
    return (
      <>
        {parts[0]}<em>included</em>{parts.slice(1).join("included")}
      </>
    );
  }
  return text;
}

export function SingleServiceIncludedSection({
  badge = "Total Support Architecture",
  heading = "WHAT'S included",
  subtext = "Every element of private coaching is intentionally designed to remove friction, build confidence, and guarantee results.",
  inclusions = DEFAULT_INCLUSIONS,
}: SingleServiceIncludedSectionProps = {}) {
  const displayInclusions = inclusions && inclusions.length > 0 ? inclusions : DEFAULT_INCLUSIONS;

  return (
    <section className="relative w-full bg-[var(--color-cream)] text-[var(--color-burgundy)] py-16 md:py-24 border-b border-[var(--color-burgundy)]/15">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-mono)] text-[12px] md:text-[13px] uppercase tracking-wider text-[var(--color-burgundy)]/75">
            {badge}
          </span>
          <EditorialHeading
            as="h2"
            size="h2"
            className="mt-3 text-[var(--color-burgundy)] leading-[1.05]"
          >
            {formatHeading(heading)}
          </EditorialHeading>
          <p className="mt-4 text-[15px] md:text-[17px] leading-relaxed text-[var(--color-burgundy)]/85">
            {subtext}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayInclusions.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div
                key={idx}
                className="rounded-[10px] bg-white p-7 border border-[var(--color-burgundy)]/20 shadow-sm flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[var(--color-blush)] text-[var(--color-burgundy)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-[18px] md:text-[20px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)] leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-burgundy)]/80">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

