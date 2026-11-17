import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";

export const dynamic = "force-dynamic";

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
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        redirect("/admin/login");
      }

      userEmail = user.email || null;
    } catch (err: unknown) {
      // Allow Next.js internal redirects and dynamic bailout errors to pass through untouched
      if (
        err instanceof Error &&
        (err.message === "NEXT_REDIRECT" ||
          err.message.includes("DYNAMIC_SERVER_USAGE") ||
          (err as { digest?: string }).digest?.startsWith("NEXT_REDIRECT") ||
          (err as { digest?: string }).digest?.includes("DYNAMIC_SERVER_USAGE"))
      ) {
        throw err;
      }
      console.error("Admin dashboard auth check failed:", err);
      redirect("/admin/login");
    }
  }

  return (
    <AdminLayoutShell userEmail={userEmail}>
      {children}
    </AdminLayoutShell>
  );
}
