import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Button } from "@/components/ui/Button";
import { Check, Minus } from "lucide-react";

interface ServicesComparisonTableSectionProps {
  badge?: string;
  heading?: string;
  subtext?: string;
}

function formatHeading(text: string) {
  if (/\bfits?\b/i.test(text)) {
    const parts = text.split(/\bfits?\b/i);
    return (
      <>
        {parts[0]}<em>fits{parts.slice(1).join("fits")}</em>
      </>
    );
  }
  return text;
}

export function ServicesComparisonTableSection({
  badge = "Side-By-Side Comparison",
  heading = "WHICH FORMAT fits you?",
  subtext = "Compare features across our three coaching formats to find the ideal balance of hands-on coaching and lifestyle flexibility.",
}: ServicesComparisonTableSectionProps = {}) {
  const comparisonRows = [
    {
      feature: "Coaching Location",
      inPerson: "Private Studio Suite",
      online: "Anywhere in the World",
      hybrid: "Studio + Remote App",
    },
    {
      feature: "Hands-on Real-time Cueing",
      inPerson: true,
      online: false,
      hybrid: true,
    },
    {
      feature: "Custom Mobile App Delivery",
      inPerson: true,
      online: true,
      hybrid: true,
    },
    {
      feature: "Weekly Video Form Audits",
      inPerson: "In-Person Checks",
      online: true,
      hybrid: true,
    },
    {
      feature: "Custom Nutrition Architecture",
      inPerson: "Available Add-on",
      online: true,
      hybrid: true,
    },
    {
      feature: "Direct WhatsApp Coach Access",
      inPerson: "Business Hours",
      online: true,
      hybrid: true,
    },
    {
      feature: "Travel & Schedule Adaptability",
      inPerson: "Reschedule Policy",
      online: "100% Anywhere",
      hybrid: "High Flexibility",
    },
    {
      feature: "Recommended For",
      inPerson: "Local beginners & tactile learners",
      online: "Self-driven women needing expert guidance",
      hybrid: "Women wanting hands-on technique + app structure",
    },
  ];

  const renderCell = (val: boolean | string) => {
    if (typeof val === "boolean") {
      return val ? (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-burgundy)] text-[var(--color-blush)] mx-auto">
          <Check className="h-4 w-4" />
        </span>
      ) : (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-gray-600 mx-auto">
          <Minus className="h-3 w-3" />
        </span>
      );
    }
    return <span className="text-[13px] md:text-[14px] font-medium">{val}</span>;
  };

  return (
    <section className="relative w-full bg-[var(--color-blush)] text-[var(--color-burgundy)] py-16 md:py-24 border-t border-[var(--color-burgundy)]/15">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-mono)] text-[12px] md:text-[13px] uppercase tracking-wider text-[var(--color-burgundy)]/75">
            {badge}
          </span>
          <EditorialHeading
            as="h2"
            size="h2"
            className="mt-3 text-[var(--color-burgundy)] leading-[1.05]"
          >
            {formatHeading(heading)}
          </EditorialHeading>
          <p className="mt-4 text-[15px] md:text-[17px] leading-relaxed text-[var(--color-burgundy)]/85">
            {subtext}
          </p>
        </div>

        {/* Responsive Comparison Table */}
        <div className="mt-12 overflow-x-auto rounded-[10px] border border-[var(--color-burgundy)]/20 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-burgundy)]/15 bg-[var(--color-cream)]">
                <th className="py-4 px-6 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-burgundy)] font-bold w-1/4">
                  Feature
                </th>
                <th className="py-4 px-6 font-[family-name:var(--font-display)] text-[16px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)] text-center w-1/4">
                  1:1 In-Person
                </th>
                <th className="py-4 px-6 font-[family-name:var(--font-display)] text-[16px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)] text-center w-1/4 bg-[var(--color-sand)]/40">
                  Online Coaching
                </th>
                <th className="py-4 px-6 font-[family-name:var(--font-display)] text-[16px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)] text-center w-1/4">
                  Hybrid Athlete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-burgundy)]/10">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[var(--color-cream)]/30 transition-colors">
                  <td className="py-4 px-6 font-[family-name:var(--font-mono)] text-[13px] font-semibold text-[var(--color-burgundy)]">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-center text-[var(--color-burgundy)]/85">
                    {renderCell(row.inPerson)}
                  </td>
                  <td className="py-4 px-6 text-center text-[var(--color-burgundy)]/85 bg-[var(--color-sand)]/20">
                    {renderCell(row.online)}
                  </td>
                  <td className="py-4 px-6 text-center text-[var(--color-burgundy)]/85">
                    {renderCell(row.hybrid)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-[var(--color-burgundy)]/15 bg-[var(--color-cream)]/50">
                <td className="py-4 px-6"></td>
                <td className="py-4 px-6 text-center">
                  <Button
                    href="/appointments"
                    variant="secondary"
                    size="sm"
                    className="font-[family-name:var(--font-display)] text-[12px]"
                  >
                    Book In-Person
                  </Button>
                </td>
                <td className="py-4 px-6 text-center bg-[var(--color-sand)]/30">
                  <Button
                    href="/single-service"
                    variant="primary"
                    size="sm"
                    className="font-[family-name:var(--font-display)] text-[12px]"
                  >
                    View Online
                  </Button>
                </td>
                <td className="py-4 px-6 text-center">
                  <Button
                    href="/appointments"
                    variant="secondary"
                    size="sm"
                    className="font-[family-name:var(--font-display)] text-[12px]"
                  >
                    Inquire Hybrid
                  </Button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Container>
    </section>
  );
}

