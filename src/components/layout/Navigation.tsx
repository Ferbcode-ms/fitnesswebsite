"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { navigationConfig } from "@/config/navigation";
import { cn } from "@/lib/utils";

/**
 * Desktop navigation consuming centralized navigationConfig.
 * Fully keyboard accessible, supports click-outside, Escape closing,
 * and active path highlighting.
 */
export function Navigation() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-[18px]">
      {navigationConfig.mainNav.map((item) => {
        const hasChildren = Boolean(item.children && item.children.length > 0);
        const isDropdownOpen = openDropdown === item.label;
        const isActive =
          pathname === item.href ||
          item.children?.some((child) => pathname === child.href);

        if (hasChildren && item.children) {
          return (
            <div
              key={item.label}
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                suppressHydrationWarning
                aria-expanded={isDropdownOpen}
                aria-haspopup="menu"
                onClick={() =>
                  setOpenDropdown((prev) => (prev === item.label ? null : item.label))
                }
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setOpenDropdown(null);
                  }
                }}
                className={cn(
                  "cursor-pointer py-[1.4px] font-[family-name:var(--font-mono)] text-[14px] leading-[16.8px] tracking-[var(--tracking-nav)] uppercase text-[var(--color-blush)] transition-opacity duration-100 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[var(--color-blush)] rounded-sm",
                  isActive && "underline underline-offset-4 font-semibold"
                )}
              >
                {item.label}
              </button>

              {isDropdownOpen && (
                <div
                  role="menu"
                  aria-label={`${item.label} submenu`}
                  className="absolute right-[-14px] top-full min-w-[220px] bg-[var(--color-burgundy)] px-[16px] py-[10px] text-right shadow-xl border border-[var(--color-blush)]/20 z-50 rounded-b-[4px]"
                >
                  <ul className="flex flex-col gap-1.5" role="none">
                    {item.children.map((child) => (
                      <li key={child.href} role="none">
                        <Link
                          href={child.href}
                          role="menuitem"
                          suppressHydrationWarning
                          onClick={() => setOpenDropdown(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Escape") setOpenDropdown(null);
                          }}
                          className={cn(
                            "block py-1.5 font-[family-name:var(--font-mono)] text-[14px] leading-[16.8px] tracking-[var(--tracking-nav)] uppercase text-[var(--color-blush)] transition-opacity duration-100 hover:opacity-80 hover:underline focus-visible:outline-2 focus-visible:outline-[var(--color-blush)] rounded-sm",
                            pathname === child.href &&
                              "underline underline-offset-4 font-semibold"
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            suppressHydrationWarning
            className={cn(
              "py-[1.4px] font-[family-name:var(--font-mono)] text-[14px] leading-[16.8px] tracking-[var(--tracking-nav)] uppercase text-[var(--color-blush)] transition-opacity duration-100 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[var(--color-blush)] rounded-sm",
              isActive && "underline underline-offset-4 font-semibold"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
