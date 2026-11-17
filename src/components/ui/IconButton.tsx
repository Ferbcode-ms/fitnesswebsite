import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

/**
 * Accessible button primitive for icon-only actions (hamburger, close, modal triggers).
 */
export function IconButton({
  size = "md",
  className,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={rest.type ?? "button"}
      className={cn(
        "inline-flex items-center justify-center cursor-pointer transition-opacity duration-100 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2",
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
