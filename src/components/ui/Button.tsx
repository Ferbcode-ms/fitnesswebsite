import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "blush"
  | "sand"
  | "outline-cream"
  | "link";

export type ButtonSize = "sm" | "md" | "lg" | "oval";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  suppressHydrationWarning?: boolean;
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-burgundy)] text-[var(--color-blush)] border border-transparent hover:opacity-80",
  secondary:
    "border border-[var(--color-burgundy)] bg-transparent text-[var(--color-burgundy)] hover:opacity-80",
  blush:
    "bg-[var(--color-blush)] text-[var(--color-burgundy)] border border-transparent hover:opacity-80",
  sand:
    "bg-[var(--color-sand)] text-[var(--color-espresso)] border border-transparent hover:opacity-80",
  "outline-cream":
    "border border-[var(--color-cream)] bg-transparent text-[var(--color-cream)] hover:opacity-80",
  link:
    "bg-transparent text-[var(--color-burgundy)] underline underline-offset-4 hover:opacity-80 p-0 rounded-none h-auto",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-[20px] py-[10px] text-[13px] leading-[1.2]",
  md: "px-[30.8px] py-[16px] text-[14px] leading-[1.2]",
  lg: "px-[30.8px] py-[18px] text-[15.7px] leading-[1.2]",
  oval: "px-[36px] py-[22px] text-[16px] leading-[1.2]",
};

/**
 * Reusable CTA and link primitive with exact pill radius (300px),
 * hover opacity transition (0.1s linear), disabled/loading handling, and accessible focus.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    iconLeft,
    iconRight,
    isLoading = false,
    disabled = false,
    children,
    ...rest
  } = props;

  const isLinkVariant = variant === "link";
  const isDisabled = disabled || isLoading;

  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 select-none uppercase tracking-[-0.02em] font-medium transition-opacity duration-100",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    !isLinkVariant && "rounded-[var(--radius-pill)] cursor-pointer",
    !isLinkVariant && sizeStyles[size],
    variantStyles[variant],
    isDisabled && "opacity-50 pointer-events-none cursor-not-allowed",
    className
  );

  const content = (
    <>
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {!isLoading && iconLeft}
      <span>{children}</span>
      {!isLoading && iconRight}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };

    return (
      <Link
        href={isDisabled ? "#" : href}
        aria-disabled={isDisabled ? true : undefined}
        tabIndex={isDisabled ? -1 : undefined}
        className={baseClasses}
        suppressHydrationWarning
        {...linkRest}
      >
        {content}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonRest.type ?? "button"}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={baseClasses}
      suppressHydrationWarning
      {...buttonRest}
    >
      {content}
    </button>
  );
}
