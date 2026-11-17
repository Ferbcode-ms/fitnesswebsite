import { Container } from "@/components/ui/Container";

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

interface AboutStatsMissionSectionProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
  {
    value: "500+",
    label: "WOMEN TRAINED",
    description: "Across personalized 1-on-1 and online hybrid coaching programmes.",
  },
  {
    value: "10,000+",
    label: "COACHED SESSIONS",
    description: "Hands-on technique refinement, form assessments, and movement audits.",
  },
  {
    value: "5-STAR",
    label: "CLIENT RATING",
    description: "Consistent 100% five-star feedback for empowerment and sustainable results.",
  },
];

export function AboutStatsMissionSection({
  badge = "Our Mission & Commitment",
  heading = "BUILDING CONFIDENCE THROUGH EVIDENCE-BASED STRENGTH",
  subtext = "We exist to demystify strength training for women. Every workout programme, nutritional roadmap, and habit check-in is engineered around your physiology, schedule, and personal goals.",
  stats = DEFAULT_STATS,
}: AboutStatsMissionSectionProps = {}) {
  const displayStats = stats && stats.length > 0 ? stats : DEFAULT_STATS;

  return (
    <section className="relative w-full bg-[var(--color-burgundy)] text-[var(--color-cream)] border-t border-[var(--color-blush)]/15 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-[family-name:var(--font-mono)] text-[12px] md:text-[13px] uppercase tracking-wider text-[var(--color-blush)]">
            {badge}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[28px] sm:text-[38px] md:text-[46px] uppercase leading-[1.1] tracking-[var(--tracking-display)] text-[var(--color-cream)]">
            {heading}
          </h2>
          <p className="mt-4 text-[16px] md:text-[18px] leading-relaxed text-[var(--color-cream)]/85">
            {subtext}
          </p>
        </div>

        {/* 3 Metric Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayStats.map((stat, i) => (
            <div
              key={i}
              className="rounded-[10px] bg-[var(--color-cream)]/5 border border-[var(--color-blush)]/20 p-8 text-center flex flex-col items-center justify-between transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="font-[family-name:var(--font-display)] text-[44px] md:text-[56px] leading-[1.0] text-[var(--color-blush)] tracking-[var(--tracking-display)]">
                {stat.value}
              </div>
              <div className="mt-2 font-[family-name:var(--font-mono)] text-[14px] uppercase tracking-wider text-[var(--color-cream)] font-bold">
                {stat.label}
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-cream)]/75">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

