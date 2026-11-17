"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  UserCheck,
  Dumbbell,
  Sparkles,
  HeartHandshake,
  MessageSquareQuote,
  CalendarCheck,
  Mail,
  Search,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  LogOut,
  X,
} from "lucide-react";
import { logoutAction } from "@/lib/cms/actions";

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Homepage Editor", href: "/admin/homepage", icon: Home },
  { label: "About Page", href: "/admin/about", icon: UserCheck },
  { label: "Classes & Programmes", href: "/admin/classes", icon: Dumbbell },
  { label: "All Services Page", href: "/admin/services", icon: Sparkles },
  { label: "1:1 Coaching Page", href: "/admin/single-service", icon: HeartHandshake },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Appointments", href: "/admin/appointments", icon: CalendarCheck },
  { label: "Contact Info", href: "/admin/contact", icon: Mail },
  { label: "SEO & Meta", href: "/admin/seo", icon: Search },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-[#E8DFD8] bg-[#FBF8F5] transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-[#E8DFD8] px-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-burgundy)] text-white font-bold text-sm tracking-wider">
              AG
            </div>
            <div>
              <span className="font-[family-name:var(--font-heading)] text-lg tracking-wider text-[var(--color-burgundy)] font-bold">
                CMS DASHBOARD
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-mono text-[var(--color-burgundy)]/60 -mt-1">
                Women&apos;s Coaching
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-mono uppercase tracking-wider text-[var(--color-burgundy)]/50">
            Content Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-burgundy)] text-white shadow-sm"
                    : "text-[var(--color-burgundy)]/80 hover:bg-[#F0E6DF] hover:text-[var(--color-burgundy)]"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-[var(--color-burgundy)]/70"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-[#E8DFD8] p-4 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-lg border border-[#E8DFD8] bg-white px-3 py-2 text-xs font-semibold text-[var(--color-burgundy)] hover:bg-gray-50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" />
              View Live Website
            </span>
            <span className="font-mono text-[10px] text-gray-400">/</span>
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out of Admin
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
