import { MarqueeBanner } from "@/components/ui/MarqueeBanner";

interface MarqueeSectionProps {
  text?: string;
  enabled?: boolean;
}

/**
 * Section 3: Scrolling Marquee Banner
 * Background: Warm Cream (#F7EDE4)
 * Full-bleed continuous horizontal scrolling banner introducing the coaching lineup.
 */
export function MarqueeSection({ text, enabled = true }: MarqueeSectionProps = {}) {
  if (!enabled) return null;

  return (
    <section className="w-full bg-[var(--color-cream)] py-8 md:py-14 overflow-hidden border-y border-[var(--color-burgundy)]/10">
      <MarqueeBanner
        text={text || "CHOOSE YOUR PROGRAMME"}
        separator="/"
        theme="cream"
        repeat={4}
        ariaLabel="Choose your fitness coaching programme"
      />
    </section>
  );
}

