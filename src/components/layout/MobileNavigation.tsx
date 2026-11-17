"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { NavItem } from "@/types";
import { Button } from "@/components/ui/Button";

interface MobileNavigationProps {
  settings?: {
    business_name?: string;
  };
}

/**
 * Full-screen warm cream mobile navigation overlay (<= 768px / < lg)
 * matching the Phase 0 drawer interaction and Services submenu drill-down.
 * Preserves scroll lock, keyboard navigation (ESC), focus management, and route change closing.
 */
export function MobileNavigation({ settings }: MobileNavigationProps = {}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<NavItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  // Close menu automatically whenever route changes
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Scroll locking & Escape key listener when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeMenu();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-[6px] text-[var(--color-blush)] focus-visible:outline-2 focus-visible:outline-[var(--color-blush)] rounded-sm"
      >
        <span className="block h-[1.5px] w-6 bg-current" />
        <span className="block h-[1.5px] w-6 bg-current" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[var(--color-cream)] px-[var(--site-gutter)] py-6 text-[var(--color-burgundy)] animate-fadeIn"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between">
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              className="flex h-10 w-10 cursor-pointer items-center justify-center text-[var(--color-burgundy)] focus-visible:outline-2 focus-visible:outline-[var(--color-burgundy)] rounded-full"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            <Link
              href="/"
              onClick={closeMenu}
              suppressHydrationWarning
              className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)] focus-visible:outline-2 focus-visible:outline-[var(--color-burgundy)] rounded-sm"
            >
              <span suppressHydrationWarning>{settings?.business_name || siteConfig.businessName}</span>
            </Link>

            <span className="w-10" aria-hidden="true" />
          </div>

          {/* Navigation Links */}
          <nav aria-label="Mobile primary navigation" className="my-auto">
            {activeSubmenu && activeSubmenu.children ? (
              <div className="flex flex-col items-center gap-5 text-center">
                <button
                  type="button"
                  onClick={() => setActiveSubmenu(null)}
                  className="mb-2 inline-flex cursor-pointer items-center gap-1 font-[family-name:var(--font-mono)] text-base uppercase tracking-[var(--tracking-nav)] text-[var(--color-burgundy)] hover:opacity-75 focus-visible:outline-2 focus-visible:outline-[var(--color-burgundy)] rounded-sm"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  Back to Main Menu
                </button>
                {activeSubmenu.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={closeMenu}
                    suppressHydrationWarning
                    className={`font-[family-name:var(--font-mono)] text-[28px] sm:text-[32px] leading-[1.2] uppercase tracking-[var(--tracking-nav)] focus-visible:outline-2 focus-visible:outline-[var(--color-burgundy)] rounded-sm ${
                      pathname === child.href ? "underline underline-offset-4 font-bold" : ""
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <ul className="flex flex-col items-center gap-5 text-center">
                {navigationConfig.mainNav.map((item) => (
                  <li key={item.label}>
                    {item.children && item.children.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setActiveSubmenu(item)}
                        className="inline-flex cursor-pointer items-center gap-2 font-[family-name:var(--font-mono)] text-[28px] sm:text-[32px] leading-[1.2] uppercase tracking-[var(--tracking-nav)] text-[var(--color-burgundy)] focus-visible:outline-2 focus-visible:outline-[var(--color-burgundy)] rounded-sm"
                      >
                        {item.label}
                        <ChevronRight className="h-6 w-6" aria-hidden="true" />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        suppressHydrationWarning
                        className={`font-[family-name:var(--font-mono)] text-[28px] sm:text-[32px] leading-[1.2] uppercase tracking-[var(--tracking-nav)] focus-visible:outline-2 focus-visible:outline-[var(--color-burgundy)] rounded-sm ${
                          pathname === item.href ? "underline underline-offset-4 font-bold" : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </nav>

          {/* Booking CTA Button */}
          <div className="flex flex-col items-center gap-4 pb-4">
            <Button
              href={navigationConfig.bookingCta.href}
              onClick={closeMenu}
              variant="primary"
              size="lg"
              className="font-[family-name:var(--font-display)] text-[16px] tracking-[var(--tracking-display)] w-full max-w-xs"
            >
              {navigationConfig.bookingCta.label}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
