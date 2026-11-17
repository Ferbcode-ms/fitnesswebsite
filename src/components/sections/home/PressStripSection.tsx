import { Container } from "@/components/ui/Container";

const credentials = [
  "NASM Certified Personal Trainer",
  "Precision Nutrition Specialist",
  "Pre & Postnatal Fitness Certified",
  "Strength & Conditioning Specialist",
  "Women's Health Coaching Accredited",
];

/**
 * Section 6: Credentials & Certification Strip
 * Background: Warm Cream (#F7EDE4)
 * Horizontal row establishing professional coaching credibility and qualifications.
 */
export function PressStripSection() {
  return (
    <section className="w-full bg-[var(--color-cream)] py-10 md:py-12 border-t border-[var(--color-burgundy)]/10 text-[var(--color-burgundy)]">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-[family-name:var(--font-mono)] text-[13px] md:text-[14px] uppercase tracking-[var(--tracking-nav)] text-[var(--color-burgundy)]/80 whitespace-nowrap">
            Professional Accreditations &amp; Standards:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {credentials.map((cred, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--color-burgundy)]/25 px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] md:text-[12px] font-medium tracking-[var(--tracking-nav)] uppercase text-[var(--color-burgundy)] select-none bg-[var(--color-burgundy)]/5"
              >
                {cred}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

