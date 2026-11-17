"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, ChevronRight, User, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  onMenuClick: () => void;
  userEmail?: string | null;
}

const pageTitles: Record<string, string> = {
  "/admin": "Overview Dashboard",
  "/admin/homepage": "Homepage Content Editor",
  "/admin/about": "About Page & Story Editor",
  "/admin/classes": "Programmes & Classes Manager",
  "/admin/services": "All Services Page CMS",
  "/admin/single-service": "1:1 Coaching Page CMS",
  "/admin/testimonials": "Client Testimonials & Reviews",
  "/admin/appointments": "Consultation Inquiries & Appointments",
  "/admin/contact": "Studio Contact & Hours",
  "/admin/seo": "SEO & OpenGraph Metadata",
  "/admin/media": "Cloudinary Media Library",
  "/admin/settings": "Global Site Settings",
};

export function AdminHeader({ onMenuClick, userEmail }: AdminHeaderProps) {
  const pathname = usePathname();
  const currentTitle = pageTitles[pathname] || "Admin Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#E8DFD8] bg-[#FBF8F5]/90 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-[#F0E6DF] lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
          <Link href="/admin" className="hover:text-[var(--color-burgundy)]">
            Admin
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
          <span className="font-semibold text-[var(--color-burgundy)] truncate max-w-[200px] sm:max-w-none">
            {currentTitle}
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {/* Role Badge */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
          <ShieldCheck className="h-3 w-3 text-emerald-600" />
          <span>Admin Role</span>
        </div>

        {/* User Account */}
        <div className="flex items-center gap-2 rounded-lg border border-[#E8DFD8] bg-white px-3 py-1.5 shadow-xs">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-burgundy)] text-white text-xs font-bold">
            <User className="h-3.5 w-3.5" />
          </div>
          <span className="hidden md:inline text-xs font-medium text-gray-700 max-w-[160px] truncate">
            {userEmail || "admin@coaching.com"}
          </span>
        </div>
      </div>
    </header>
  );
}
