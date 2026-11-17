import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ContainerVariant = "standard" | "wide" | "narrow" | "full";

export interface ContainerProps {
  as?: ElementType;
  variant?: ContainerVariant;
  className?: string;
  children: ReactNode;
  id?: string;
}

const variantMaxWidths: Record<ContainerVariant, string> = {
  standard: "max-w-[var(--site-max-width)]", // 1500px
  wide: "max-w-[var(--site-max-width-wide)]", // 1720px
  narrow: "max-w-[var(--site-max-width-narrow)]", // 1080px
  full: "max-w-full",
};

/**
 * Reusable Container primitive supporting standard (1500px), wide (1720px),
 * and narrow (1080px) content widths observed across the reference site.
 * Fluid horizontal gutters automatically adapt from 4vw (desktop) to 6vw (<=768px).
 */
export function Container({
  as: Component = "div",
  variant = "standard",
  className,
  children,
  id,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        "mx-auto w-full px-[var(--site-gutter)]",
        variantMaxWidths[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}
