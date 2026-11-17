import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CardTheme = "cream" | "blush" | "sand" | "burgundy" | "white";
export type CardRadius = "none" | "md" | "lg" | "pill";

export interface CardProps {
  as?: ElementType;
  theme?: CardTheme;
  radius?: CardRadius;
  className?: string;
  children: ReactNode;
  id?: string;
}

const themeStyles: Record<CardTheme, string> = {
  cream: "bg-[var(--color-cream)] text-[var(--color-burgundy)]",
  blush: "bg-[var(--color-blush)] text-[var(--color-burgundy)]",
  sand: "bg-[var(--color-sand)] text-[var(--color-espresso)]",
  burgundy: "bg-[var(--color-burgundy)] text-[var(--color-cream)]",
  white: "bg-[var(--color-white)] text-[var(--color-burgundy)]",
};

const radiusStyles: Record<CardRadius, string> = {
  none: "rounded-none",
  md: "rounded-[var(--radius-card-md)]", // 10px
  lg: "rounded-[var(--radius-card-lg)]", // 20px
  pill: "rounded-[var(--radius-pill)]", // 300px
};

/**
 * Foundational surface card primitive matching the flat 0px box-shadow,
 * specific 10px and 20px corner radii, and reference color palette fills.
 */
export function Card({
  as: Component = "div",
  theme = "cream",
  radius = "md",
  className,
  children,
  id,
}: CardProps) {
  return (
    <Component
      id={id}
      className={cn(
        "shadow-none p-6 md:p-8",
        themeStyles[theme],
        radiusStyles[radius],
        className
      )}
    >
      {children}
    </Component>
  );
}
