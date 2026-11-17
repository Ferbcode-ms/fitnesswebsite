"use client";

import { useState, ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminLayoutShellProps {
  children: ReactNode;
  userEmail?: string | null;
}

export function AdminLayoutShell({ children, userEmail }: AdminLayoutShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5EFEB] text-[#222222]">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Column */}
      <div className="flex flex-1 flex-col min-w-0">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
