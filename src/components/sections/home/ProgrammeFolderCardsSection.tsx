import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { optimizeCloudinaryUrl } from "@/lib/utils";

const themeStyles = {
  burgundy: {
    card: "bg-[var(--color-burgundy)] text-[var(--color-cream)]",
    tab: "bg-[var(--color-burgundy)] text-[var(--color-cream)]",
    eyebrow: "text-[var(--color-blush)]",
    title: "text-[var(--color-cream)]",
    body: "text-[var(--color-cream)]/90",
  },
  blush: {
    card: "bg-[var(--color-blush)] text-[var(--color-burgundy)]",
    tab: "bg-[var(--color-blush)] text-[var(--color-burgundy)]",
    eyebrow: "text-[var(--color-burgundy)]/80",
    title: "text-[var(--color-burgundy)]",
    body: "text-[var(--color-burgundy)]/90",
  },
  sand: {
    card: "bg-[var(--color-sand)] text-[var(--color-espresso)]",
    tab: "bg-[var(--color-sand)] text-[var(--color-espresso)]",
    eyebrow: "text-[var(--color-espresso)]/80",
    title: "text-[var(--color-burgundy)]",
    body: "text-[var(--color-espresso)]/90",
  },
};

const tabAlignStyles = {
  left: "self-start ml-4 md:ml-12",
  center: "self-center md:self-start md:ml-[34%]",
  right: "self-end mr-4 md:mr-12 md:self-start md:ml-[66%]",
};

/**
 * Section 4: Class & Programme Manila Folder Cards + Onboarding Callout
 * Background: Warm Cream (#F7EDE4)
 * Stacked folder-tab cards (1091px max width) with staggered tabs and 2-column split.
 */
interface ProgrammeFolderCardsSectionProps {
  classes?: Array<{
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image_url?: string | null;
    cta_text: string;
    cta_link: string;
    specs?: string[];
  }>;
}

export function ProgrammeFolderCardsSection({ classes }: ProgrammeFolderCardsSectionProps = {}) {
  const displayCards =
    classes && classes.length > 0
      ? classes.map((item, idx) => {
          const themes: Array<"burgundy" | "blush" | "sand"> = ["burgundy", "blush", "sand"];
          const aligns: Array<"left" | "center" | "right"> = ["left", "center", "right"];
          return {
            tabLabel: item.title,
            tabAlign: aligns[idx % 3],
            bgTheme: themes[idx % 3],
            eyebrow: item.subtitle,
            title: item.title,
            paragraphs: item.specs && item.specs.length > 0 ? item.specs : [item.description],
            ctaLabel: item.cta_text || "APPLY FOR PROGRAMME",
            ctaHref: item.cta_link || "/appointments",
            ctaVariant: idx === 0 ? ("outline-cream" as const) : ("primary" as const),
            imageSrc: item.image_url ? optimizeCloudinaryUrl(item.image_url, { width: 800 }) || item.image_url : null,
            imageAlt: item.title,
          };
        })
      : [];

  return (
    <section className="relative w-full bg-[var(--color-cream)] py-16 md:py-24 text-[var(--color-burgundy)]">
      <Container variant="narrow">
        {/* Stack of Folder Cards */}
        {displayCards.length > 0 && (
          <div className="flex flex-col gap-16 md:gap-20">
            {displayCards.map((card, idx) => {
              const currentTheme = themeStyles[card.bgTheme];
              const currentAlign = tabAlignStyles[card.tabAlign];
              const hasImage = Boolean(card.imageSrc);

              return (
                <div key={idx} className="flex flex-col">
                  {/* Folder Top Tab */}
                  <div
                    className={`inline-flex px-8 py-3 rounded-t-[14px] font-[family-name:var(--font-mono)] text-[13px] md:text-[14px] font-bold tracking-[var(--tracking-nav)] uppercase select-none ${currentTheme.tab} ${currentAlign}`}
                  >
                    {card.tabLabel}
                  </div>

                  {/* Folder Main Body Card */}
                  <div
                    className={`rounded-[var(--radius-card-md)] p-6 md:p-12 ${currentTheme.card} shadow-sm`}
                  >
                    <div className={hasImage ? "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center" : "max-w-2xl"}>
                      {/* Optional Left: Square Image */}
                      {hasImage && card.imageSrc && (
                        <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-card-md)] bg-[var(--color-burgundy)]/10">
                          <Image
                            src={card.imageSrc}
                            alt={card.imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, 450px"
                            className="object-cover object-center"
                          />
                        </div>
                      )}

                      {/* Copy & CTA */}
                      <div className="flex flex-col items-start text-left">
                        <p
                          className={`font-[family-name:var(--font-mono)] text-[12px] md:text-[13px] uppercase tracking-[var(--tracking-nav)] ${currentTheme.eyebrow}`}
                        >
                          {card.eyebrow}
                        </p>

                        <h3
                          className={`mt-2 font-[family-name:var(--font-display)] text-[24px] md:text-[32px] leading-[1.1] uppercase tracking-[var(--tracking-display)] ${currentTheme.title}`}
                        >
                          {card.title}
                        </h3>

                        <div className="mt-4 flex flex-col gap-3">
                          {card.paragraphs.map((p, pIdx) => (
                            <p
                              key={pIdx}
                              className={`text-[14px] md:text-[15px] leading-[1.6] ${currentTheme.body}`}
                            >
                              {p}
                            </p>
                          ))}
                        </div>

                        <div className="mt-8">
                          <Button
                            href={card.ctaHref}
                            variant={card.ctaVariant}
                            size="md"
                            className="font-[family-name:var(--font-display)] tracking-[var(--tracking-display)]"
                          >
                            {card.ctaLabel}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Callout: NOT SURE WHERE to START? */}
        <div className={displayCards.length > 0 ? "mt-20 md:mt-32 pt-12 md:pt-16 border-t border-[var(--color-burgundy)]/15" : ""}>
          <div className="text-center max-w-2xl mx-auto">
            <EditorialHeading
              as="h2"
              size="h2"
              className="text-[var(--color-burgundy)]"
            >
              NOT SURE WHERE <em>to</em> START?
            </EditorialHeading>

            <p className="mt-4 text-[16px] md:text-[18px] leading-[1.6] text-[var(--color-burgundy)]">
              Every woman&apos;s lifestyle and training baseline is unique.
              Whether you want the flexibility of online coaching or the hands-on
              coaching of in-person training, we&apos;ll build the ideal roadmap for you.
            </p>

            <div className="mt-6 md:mt-8">
              <Button
                href="/appointments"
                variant="primary"
                size="lg"
                className="font-[family-name:var(--font-display)] tracking-[var(--tracking-display)]"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

