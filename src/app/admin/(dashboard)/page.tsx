import Link from "next/link";
import {
  Dumbbell,
  Sparkles,
  MessageSquareQuote,
  CalendarCheck,
  ArrowUpRight,
  PlusCircle,
  Home,
  UserCheck,
  ImageIcon,
} from "lucide-react";
import { getDashboardStats } from "@/lib/cms/queries";
import { AdminCard } from "@/components/admin/AdminCard";

export default async function AdminOverviewPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      label: "Published Services",
      value: stats.publishedServices,
      description: "Active online & in-studio tiers",
      icon: Sparkles,
      href: "/admin/services",
      color: "bg-amber-500",
    },
    {
      label: "Signature Classes",
      value: stats.publishedClasses,
      description: "Live training programmes",
      icon: Dumbbell,
      href: "/admin/classes",
      color: "bg-emerald-600",
    },
    {
      label: "Client Reviews",
      value: stats.publishedTestimonials,
      description: "Verified testimonials",
      icon: MessageSquareQuote,
      href: "/admin/testimonials",
      color: "bg-blue-600",
    },
    {
      label: "New Appointments",
      value: stats.newAppointments,
      description: "Pending client consultation requests",
      icon: CalendarCheck,
      href: "/admin/appointments",
      color: "bg-purple-600",
      highlight: stats.newAppointments > 0,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-[var(--color-burgundy)] p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#E8DFD8]">
            ADMINISTRATION PORTAL
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold tracking-wider">
            WELCOME TO YOUR FITNESS CMS
          </h1>
          <p className="text-sm text-[#F6ECE6]/85 leading-relaxed">
            Manage your coaching programmes, services, client consultations, website copy, and Cloudinary media assets from one unified dashboard.
          </p>
        </div>
      </div>

      {/* Real Supabase Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`group rounded-xl border border-[#E8DFD8] bg-white p-6 shadow-xs hover:border-[var(--color-burgundy)] hover:shadow-md transition-all duration-200 ${
                card.highlight ? "ring-2 ring-purple-400 bg-purple-50/30" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-cream)] border border-[#E8DFD8] text-[var(--color-burgundy)] group-hover:bg-[var(--color-burgundy)] group-hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-[var(--color-burgundy)] transition-colors" />
              </div>
              <div className="mt-4">
                <div className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-wider text-[var(--color-burgundy)]">
                  {card.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-700 mt-1">
                  {card.label}
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">{card.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Launch & Content Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AdminCard
          title="Quick Content Editors"
          description="Jump directly into your key website pages"
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/admin/homepage"
              className="flex items-center gap-3 rounded-lg border border-[#E8DFD8] p-3.5 hover:bg-[#FBF8F5] hover:border-[var(--color-burgundy)] transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-cream)] text-[var(--color-burgundy)] shrink-0">
                <Home className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-[var(--color-burgundy)] uppercase tracking-wider">
                  Homepage Editor
                </span>
                <span className="block text-[11px] text-gray-500">Hero, folders, stickers & CTA</span>
              </div>
            </Link>

            <Link
              href="/admin/about"
              className="flex items-center gap-3 rounded-lg border border-[#E8DFD8] p-3.5 hover:bg-[#FBF8F5] hover:border-[var(--color-burgundy)] transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-cream)] text-[var(--color-burgundy)] shrink-0">
                <UserCheck className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-[var(--color-burgundy)] uppercase tracking-wider">
                  About & Philosophy
                </span>
                <span className="block text-[11px] text-gray-500">Coach bio & credentials</span>
              </div>
            </Link>

            <Link
              href="/admin/classes"
              className="flex items-center gap-3 rounded-lg border border-[#E8DFD8] p-3.5 hover:bg-[#FBF8F5] hover:border-[var(--color-burgundy)] transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-cream)] text-[var(--color-burgundy)] shrink-0">
                <Dumbbell className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-[var(--color-burgundy)] uppercase tracking-wider">
                  Training Programmes
                </span>
                <span className="block text-[11px] text-gray-500">Foundations, Strength & Sculpt</span>
              </div>
            </Link>

            <Link
              href="/admin/media"
              className="flex items-center gap-3 rounded-lg border border-[#E8DFD8] p-3.5 hover:bg-[#FBF8F5] hover:border-[var(--color-burgundy)] transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-cream)] text-[var(--color-burgundy)] shrink-0">
                <ImageIcon className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-[var(--color-burgundy)] uppercase tracking-wider">
                  Media Library
                </span>
                <span className="block text-[11px] text-gray-500">Upload & optimize Cloudinary photos</span>
              </div>
            </Link>
          </div>
        </AdminCard>

        <AdminCard
          title="Workflow Status"
          description="Publishing and database health"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD8]">
              <span className="text-gray-600">Draft & Publish System</span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD8]">
              <span className="text-gray-600">Row Level Security</span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Enforced
              </span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD8]">
              <span className="text-gray-600">Public Website Cache</span>
              <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                On-Demand Revalidation
              </span>
            </div>

            <div className="pt-2">
              <Link
                href="/admin/appointments"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--color-burgundy)] py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[var(--color-burgundy)]/90 transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                <span>View Recent Inquiries</span>
              </Link>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
