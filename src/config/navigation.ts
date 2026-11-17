import type { NavigationConfig } from "@/types";

const coreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Classes", href: "/classes" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services" },
      { label: "1:1 Coaching", href: "/single-service" },
    ],
  },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Single source of truth for primary navigation, dropdown menus,
 * booking destinations, and footer exploration links.
 */
export const navigationConfig: NavigationConfig = {
  mainNav: coreLinks.map((item) => ({
    label: item.label,
    href: item.href,
    ...("children" in item
      ? { children: item.children.map((child) => ({ ...child })) }
      : {}),
  })),
  bookingCta: {
    label: "Book a Session",
    href: "/appointments",
  },
  footerNav: coreLinks.map(({ label, href }) => ({ label, href })),
};

