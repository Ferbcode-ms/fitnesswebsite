"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
  defaultOpenId?: string;
}

/**
 * Accessible FAQ accordion with smooth open/collapse,
 * design token borders, and keyboard navigation.
 */
export function FaqAccordion({
  items,
  className,
  defaultOpenId,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("divide-y divide-[var(--color-burgundy)]/20", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-5 md:py-6">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              id={`faq-btn-${item.id}`}
              className="flex w-full items-center justify-between gap-4 text-left font-[family-name:var(--font-display)] text-[18px] md:text-[22px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)] transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-burgundy)]"
            >
              <span>{item.question}</span>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-burgundy)] text-[var(--color-burgundy)] transition-transform duration-200"
                aria-hidden="true"
              >
                {isOpen ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </span>
            </button>
            <div
              id={`faq-answer-${item.id}`}
              role="region"
              aria-labelledby={`faq-btn-${item.id}`}
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96 pt-4 opacity-100" : "max-h-0 pt-0 opacity-0"
              )}
            >
              <p className="text-[15px] md:text-[17px] font-normal leading-[1.6] text-[var(--color-burgundy)]/85 max-w-3xl">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

