"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Navigation } from "@/components/layout/Navigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { cn } from "@/lib/utils";

interface HeaderProps {
  settings?: {
    business_name?: string;
    logo_url?: string | null;
  };
}

/**
 * Structural site header preserving Phase 0 fixed height (82.6px),
 * sticky `.shrink` background transition, and centralized navigation/booking CTA.
 */
export function Header({ settings }: HeaderProps = {}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      data-shrink={isScrolled}
      className={cn(
        "fixed inset-x-0 top-0 z-40 min-h-[var(--header-height-desktop)] transition-colors duration-200",
        isTransparent ? "bg-transparent" : "bg-[var(--color-burgundy)]"
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-pill)] focus:bg-[var(--color-cream)] focus:px-4 focus:py-2 focus:text-[var(--color-burgundy)]"
      >
        Skip to content
      </a>

      <Container className="flex min-h-[var(--header-height-desktop)] items-center justify-between gap-4">
        <div className="flex items-center gap-3 lg:hidden">
          <MobileNavigation settings={settings} />
        </div>

        <Link
          href="/"
          suppressHydrationWarning
          className="font-[family-name:var(--font-display)] text-[length:var(--text-site-title-size)] leading-[1.2] uppercase tracking-[var(--tracking-display)] text-[var(--color-blush)] transition-opacity duration-100 hover:opacity-80 flex items-center gap-2"
        >
          {settings?.logo_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={settings.logo_url}
              alt={settings.business_name || siteConfig.businessName}
              className="h-8 w-auto max-w-[160px] object-contain"
            />
          ) : (
            <span suppressHydrationWarning>{settings?.business_name || siteConfig.businessName}</span>
          )}
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <Navigation />
          <Button
            href={navigationConfig.bookingCta.href}
            variant="blush"
            suppressHydrationWarning
            className="px-[30.8px] py-[18px] font-[family-name:var(--font-display)] text-[length:var(--text-header-cta-size)] font-normal tracking-[var(--tracking-display)] shadow-sm hover:opacity-85 transition-opacity"
          >
            {navigationConfig.bookingCta.label}
          </Button>
        </div>

        <span className="w-10 lg:hidden" aria-hidden="true" />
      </Container>
    </header>
  );
}
