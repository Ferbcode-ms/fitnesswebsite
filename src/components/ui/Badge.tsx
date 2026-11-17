import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "burgundy" | "blush" | "sand" | "cream" | "outline";

export interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  burgundy: "bg-[var(--color-burgundy)] text-[var(--color-blush)]",
  blush: "bg-[var(--color-blush)] text-[var(--color-burgundy)]",
  sand: "bg-[var(--color-sand)] text-[var(--color-espresso)]",
  cream: "bg-[var(--color-cream)] text-[var(--color-burgundy)]",
  outline:
    "border border-current bg-transparent text-current",
};

/**
 * Monospace uppercase pill badge primitive used for class levels,
 * feature highlights, and pricing flags like "BEST VALUE".
 */
export function Badge({
  variant = "blush",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-pill)] px-3 py-1 font-[family-name:var(--font-mono)] text-[12px] font-normal uppercase tracking-[var(--tracking-nav)] leading-none select-none",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
