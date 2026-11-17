import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";

export const metadata = {
  title: "Admin Dashboard | Women's Fitness Coaching",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userEmail: string | null = null;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/admin/login");
    }

    userEmail = user.email || null;
  }

  return (
    <AdminLayoutShell userEmail={userEmail}>
      {children}
    </AdminLayoutShell>
  );
}
