import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";

export interface PhaseItem {
  number: string;
  name: string;
  weeks: string;
  description: string;
  deliverables: string[];
}

interface SingleServiceTimelineSectionProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  phases?: PhaseItem[];
}

const DEFAULT_PHASES: PhaseItem[] = [
  {
    number: "01",
    name: "AUDIT & BASELINES",
    weeks: "Weeks 1 – 4",
    description:
      "We identify your movement patterns, joint mobility, lifting technique, and current nutritional baseline. We calibrate your starting weights and establish consistent training routines without overwhelming your nervous system.",
    deliverables: ["Video movement screen", "App dashboard setup", "Caloric & protein targets", "Form tutorial library"],
  },
  {
    number: "02",
    name: "PROGRESSIVE OVERLOAD",
    weeks: "Weeks 5 – 8",
    description:
      "The hypertrophy and strength phase. Your training split introduces deliberate volume and intensity increments. Weekly video form check-ins refine your lifts and ensure your body responds with visible tone and stamina.",
    deliverables: ["Weekly Loom video feedback", "Micro-adjustments to macros", "Body composition check-in", "WhatsApp check-in cadence"],
  },
  {
    number: "03",
    name: "AUTONOMY & MASTERY",
    weeks: "Weeks 9 – 12+",
    description:
      "Locking in lifetime consistency. You now command compound movements with flawless mechanics and understand how to navigate social dining, deload weeks, and routine changes without losing results.",
    deliverables: ["Post-program maintenance guide", "Strength progression milestone audit", "Long-term programming blueprint"],
  },
];

function formatHeading(text: string) {
  if (/\btransformations?\b/i.test(text)) {
    const parts = text.split(/\btransformations?\b/i);
    return (
      <>
        {parts[0]}<em>transformation</em>{parts.slice(1).join("transformation")}
      </>
    );
  }
  return text;
}

export function SingleServiceTimelineSection({
  badge = "Your Coaching Roadmap",
  heading = "THE transformation",
  subtext = "A step-by-step 12-week progression built to take you from uncertain in the gym to powerful, independent, and energized.",
  phases = DEFAULT_PHASES,
}: SingleServiceTimelineSectionProps = {}) {
  const displayPhases = phases && phases.length > 0 ? phases : DEFAULT_PHASES;

  return (
    <section className="relative w-full bg-white text-[var(--color-burgundy)] py-16 md:py-24 border-b border-[var(--color-burgundy)]/15">
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

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {displayPhases.map((phase) => (
            <div
              key={phase.number}
              className="rounded-[10px] bg-[var(--color-cream)]/40 p-8 border border-[var(--color-burgundy)]/20 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[var(--color-burgundy)]/15 pb-4">
                  <span className="font-[family-name:var(--font-display)] text-[36px] text-[var(--color-burgundy)] leading-none">
                    {phase.number}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/75 bg-white px-2.5 py-1 rounded">
                    {phase.weeks}
                  </span>
                </div>

                <h3 className="mt-5 font-[family-name:var(--font-display)] text-[20px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)]">
                  {phase.name}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-burgundy)]/85">
                  {phase.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--color-burgundy)]/10">
                <span className="block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-burgundy)]/60 mb-2">
                  Phase Deliverables
                </span>
                <ul className="space-y-1.5 text-[13px] text-[var(--color-burgundy)]/80">
                  {phase.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-burgundy)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

