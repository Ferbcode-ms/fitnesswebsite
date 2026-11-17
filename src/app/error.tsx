"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to client console without breaking production UX
    console.error("Application error:", error);
  }, [error]);

  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-[var(--color-burgundy)] py-24 text-center text-[var(--color-blush)]">
      <Container className="max-w-xl">
        <span className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-blush)]/70">
          Error Encountered
        </span>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-tight uppercase tracking-[var(--tracking-display)]">
          SOMETHING WENT WRONG
        </h1>
        <p className="mt-4 font-[family-name:var(--font-body)] text-[16px] leading-relaxed text-[var(--color-cream)]/85">
          We experienced an unexpected issue loading this page. Please try reloading or head back to the home page.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-blush)] px-7 py-3 font-[family-name:var(--font-display)] text-[15px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)] transition-opacity hover:opacity-85"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-blush)] px-7 py-3 font-[family-name:var(--font-display)] text-[15px] uppercase tracking-[var(--tracking-display)] text-[var(--color-blush)] transition-colors hover:bg-[var(--color-blush)]/10"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}

