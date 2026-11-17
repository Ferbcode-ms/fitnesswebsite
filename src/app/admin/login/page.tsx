"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { loginAction } from "@/lib/cms/actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setErrorMessage(result.message || "Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5EFEB] p-4 text-[#222222]">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-burgundy)] text-white shadow-md">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase">
            ADMIN CMS LOGIN
          </h1>
          <p className="text-xs text-gray-600 font-mono">
            Women&apos;s Fitness Coaching — Secure Management Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-[#E8DFD8] bg-white p-8 shadow-sm">
          {errorMessage && (
            <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1.5"
              >
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="coach@fitness.com"
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[var(--color-burgundy)] focus:outline-none focus:ring-1 focus:ring-[var(--color-burgundy)]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-[#E8DFD8] bg-white pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[var(--color-burgundy)] focus:outline-none focus:ring-1 focus:ring-[var(--color-burgundy)]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--color-burgundy)] py-3 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-burgundy)]/90 focus:outline-none disabled:opacity-50 transition-colors"
            >
              <span>{loading ? "Authenticating..." : "Sign In To Dashboard"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 border-t border-[#E8DFD8] pt-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Protected by Supabase Row-Level Security</span>
            </div>
            <p className="mt-1 text-[10px] text-gray-400">
              No public registration permitted. Admin accounts are provisioned via database seed or CLI.
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
}
