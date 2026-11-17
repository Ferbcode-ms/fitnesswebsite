import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "span" | "div";
export type HeadingSize = "hero" | "h1" | "marquee" | "site-title" | "h2" | "h3" | "h4" | "custom";

export interface EditorialHeadingProps {
  as?: HeadingLevel;
  size?: HeadingSize;
  className?: string;
  children: ReactNode;
  id?: string;
}

const sizeClasses: Record<HeadingSize, string> = {
  hero: "text-[length:var(--text-hero-h1-size)] leading-[1.0] tracking-[var(--tracking-display)]",
  h1: "text-[length:var(--text-hero-h1-size)] leading-[1.0] tracking-[var(--tracking-display)]",
  marquee: "text-[length:var(--text-marquee-size)] leading-[1.0] tracking-[var(--tracking-display)]",
  "site-title": "text-[length:var(--text-site-title-size)] leading-[1.2] tracking-[var(--tracking-display)]",
  h2: "text-[length:var(--text-h2-size)] leading-[1.1] tracking-[var(--tracking-display)]",
  h3: "text-[length:var(--text-h3-size)] leading-[1.2] tracking-[var(--tracking-display)]",
  h4: "text-[length:var(--text-h4-size)] leading-[1.25] tracking-[var(--tracking-display)]",
  custom: "",
};

/**
 * Editorial display heading rendering bold uppercase Lilita One typography
 * with inline `<em>` tags naturally styled in the signature script accent font.
 * Recreates:
 * - "TURN UP <em>the</em> HEAT."
 * - "THE GLOW <em>is</em> REAL."
 * - "TIRED OF WORKOUTS THAT <em>Don’t</em> WORK?"
 * - "Meet <em>Ava</em>"
 */
export function EditorialHeading({
  as: Component = "h2",
  size = "h2",
  className,
  children,
  id,
}: EditorialHeadingProps) {
  return (
    <Component
      id={id}
      className={cn(
        "font-[family-name:var(--font-display)] uppercase",
        "[&_em]:font-[family-name:var(--font-script)] [&_em]:font-normal [&_em]:not-italic [&_em]:normal-case [&_em]:tracking-normal",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
