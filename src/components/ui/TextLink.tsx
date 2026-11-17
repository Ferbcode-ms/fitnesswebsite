import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "mono" | "body" | "display";
  underline?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Accessible text link with consistent hover states and typography variants.
 */
export function TextLink({
  href,
  variant = "body",
  underline = true,
  className,
  children,
  ...rest
}: TextLinkProps) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  const classes = cn(
    "transition-opacity duration-100 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2",
    underline && "underline underline-offset-4",
    variant === "mono" && "font-[family-name:var(--font-mono)] text-[14px] uppercase tracking-[var(--tracking-nav)]",
    variant === "body" && "font-[family-name:var(--font-body)] text-[14px]",
    variant === "display" && "font-[family-name:var(--font-display)] uppercase tracking-[var(--tracking-display)]",
    className
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
