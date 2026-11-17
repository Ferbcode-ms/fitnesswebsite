import { cn } from "@/lib/utils";

export type MarqueeTheme = "cream" | "burgundy" | "blush" | "sand";

export interface MarqueeBannerProps {
  text: string;
  separator?: string;
  theme?: MarqueeTheme;
  repeat?: number;
  className?: string;
  ariaLabel?: string;
}

const themeStyles: Record<MarqueeTheme, string> = {
  cream: "bg-[var(--color-cream)] text-[var(--color-burgundy)]",
  burgundy: "bg-[var(--color-burgundy)] text-[var(--color-blush)]",
  blush: "bg-[var(--color-blush)] text-[var(--color-burgundy)]",
  sand: "bg-[var(--color-sand)] text-[var(--color-espresso)]",
};

/**
 * Reusable full-bleed horizontal marquee banner matching Phase 0 specifications:
 * - Fluid clamp font size (`clamp(3.5rem, 15.37vw, 13.835rem)`).
 * - Smooth CSS infinite translation (zero JS overhead).
 * - Screen reader accessible (`aria-label` with `aria-hidden` ticker clones).
 * - Respects `prefers-reduced-motion`.
 */
export function MarqueeBanner({
  text,
  separator = "/",
  theme = "cream",
  repeat = 4,
  className,
  ariaLabel,
}: MarqueeBannerProps) {
  const item = `${text} ${separator} `;
  const sequence = Array.from({ length: repeat }).map((_, i) => (
    <span key={i} className="inline-block px-4 whitespace-nowrap">
      {item}
    </span>
  ));

  return (
    <div
      role="region"
      aria-label={ariaLabel ?? text}
      className={cn(
        "relative w-full overflow-hidden select-none py-4 md:py-6",
        themeStyles[theme],
        className
      )}
    >
      <div className="flex w-max">
        <div
          aria-hidden="true"
          className="animate-marquee font-[family-name:var(--font-display)] text-[length:var(--text-marquee-size)] leading-[1.0] uppercase tracking-[var(--tracking-display)] whitespace-nowrap"
        >
          {sequence}
          {sequence}
        </div>
      </div>
    </div>
  );
}
