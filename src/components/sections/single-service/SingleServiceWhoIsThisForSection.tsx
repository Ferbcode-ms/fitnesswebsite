import { Container } from "@/components/ui/Container";
import { MarqueeBanner } from "@/components/ui/MarqueeBanner";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Check, X } from "lucide-react";

interface SingleServiceWhoIsThisForSectionProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  marqueeText?: string;
  whoItsFor?: string[];
  whoItsNotFor?: string[];
}

const DEFAULT_WHO_ITS_FOR = [
  "Women ready to move past generic online influencer workouts and invest in structured programming",
  "Clients looking to build visible muscle tone, increase bone density, and supercharge metabolism",
  "Busy women who need an adaptable training program that fits around work, family, and travel",
  "Anyone dealing with past injuries or joint stiffness who needs careful biomechanical adjustments",
  "Women who want dedicated weekly accountability and direct, non-judgmental guidance",
];

const DEFAULT_WHO_ITS_NOT_FOR = [
  "Those looking for a 14-day quick fix or rapid crash starvation cleanse",
  "Individuals unwilling to track workouts or record short video clips for form feedback",
  "Anyone looking for a passive checklist without willingness to communicate weekly",
  "People seeking extreme, unsustainable cardio marathons rather than progressive strength",
];

function formatHeading(text: string) {
  if (/\bright for you\??\b/i.test(text)) {
    const parts = text.split(/\bright for you\??\b/i);
    return (
      <>
        {parts[0]}<em>right for you?</em>{parts.slice(1).join("right for you?")}
      </>
    );
  }
  return text;
}

export function SingleServiceWhoIsThisForSection({
  badge = "Mutual Commitment",
  heading = "IS PRIVATE COACHING right for you?",
  subtext = "We only take on a limited roster of private 1:1 clients at any time to guarantee personal attention and elite results.",
  marqueeText = "WHO IS THIS FOR",
  whoItsFor = DEFAULT_WHO_ITS_FOR,
  whoItsNotFor = DEFAULT_WHO_ITS_NOT_FOR,
}: SingleServiceWhoIsThisForSectionProps = {}) {
  const displayWhoItsFor = whoItsFor && whoItsFor.length > 0 ? whoItsFor : DEFAULT_WHO_ITS_FOR;
  const displayWhoItsNotFor = whoItsNotFor && whoItsNotFor.length > 0 ? whoItsNotFor : DEFAULT_WHO_ITS_NOT_FOR;

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-blush)] text-[var(--color-burgundy)] border-b border-[var(--color-burgundy)]/15">
      {/* Marquee Banner */}
      <div className="border-b border-[var(--color-burgundy)]/15">
        <MarqueeBanner
          text={marqueeText}
          separator="/"
          theme="blush"
          repeat={4}
          ariaLabel="Who is private coaching for"
        />
      </div>

      <Container className="py-16 md:py-24">
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

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Who it is for */}
          <div className="rounded-[10px] bg-white p-8 md:p-10 border border-[var(--color-burgundy)]/20 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                <Check className="h-3.5 w-3.5" /> Ideal Fit
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-[22px] md:text-[24px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)]">
                You Will Thrive If:
              </h3>
              <ul className="mt-6 space-y-3.5">
                {displayWhoItsFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14px] md:text-[15px] leading-relaxed text-[var(--color-burgundy)]/90">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white mt-0.5">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Who it is not for */}
          <div className="rounded-[10px] bg-[var(--color-cream)] p-8 md:p-10 border border-[var(--color-burgundy)]/20 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-wider text-red-800">
                <X className="h-3.5 w-3.5" /> Not A Fit
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-[22px] md:text-[24px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)]">
                This Programme Is NOT For:
              </h3>
              <ul className="mt-6 space-y-3.5">
                {displayWhoItsNotFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14px] md:text-[15px] leading-relaxed text-[var(--color-burgundy)]/90">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-white mt-0.5">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

