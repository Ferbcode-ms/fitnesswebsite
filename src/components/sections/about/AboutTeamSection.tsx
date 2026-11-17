import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { siteConfig } from "@/config/site";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  imageSrc: string;
}

interface AboutTeamSectionProps {
  coachName?: string;
  heading?: string;
  text?: string;
  qualifications?: string[];
  imageSrc?: string;
}

export function AboutTeamSection({
  coachName: customCoachName,
  heading,
  text,
  qualifications,
  imageSrc,
}: AboutTeamSectionProps = {}) {
  const coachName = customCoachName || siteConfig.coachName;
  const portrait = imageSrc || "/images/coach-portrait.jpg";

  const team: TeamMember[] = [
    {
      name: coachName,
      role: heading || "Head Coach & Founder",
      bio:
        text ||
        "CSCS-certified trainer with 8+ years specializing in female biomechanics, progressive strength, and sustainable body recomposition.",
      specialties:
        qualifications && qualifications.length > 0
          ? qualifications
          : ["Barbell & Dumbbell Mechanics", "Recomposition", "Habit Systems"],
      imageSrc: portrait,
    },
    {
      name: "Jess Martin",
      role: "Strength & Conditioning Specialist",
      bio: "Former collegiate athlete focused on power development, athletic conditioning, and teaching women how to lift with zero joint pain.",
      specialties: ["Athletic Performance", "Joint Mobility", "Hypertrophy"],
      imageSrc: "/images/team-1.jpg",
    },
    {
      name: "Maya Lin",
      role: "Pre & Postnatal Coach",
      bio: "Specializing in pelvic floor health, core rehabilitation, and helping new and expecting mothers maintain safe, empowering physical strength.",
      specialties: ["Postpartum Core Recovery", "Pelvic Floor Health", "Functional Movement"],
      imageSrc: "/images/team-2.jpg",
    },
  ];

  return (
    <section className="relative w-full bg-[var(--color-cream)] text-[var(--color-burgundy)] py-16 md:py-24 border-t border-[var(--color-burgundy)]/15">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-mono)] text-[12px] md:text-[13px] uppercase tracking-wider text-[var(--color-burgundy)]/75">
            Coaching Excellence
          </span>
          <EditorialHeading
            as="h2"
            size="h2"
            className="mt-3 text-[var(--color-burgundy)] leading-[1.05]"
          >
            MEET THE <em>coaches</em>
          </EditorialHeading>
          <p className="mt-4 text-[15px] md:text-[17px] leading-relaxed text-[var(--color-burgundy)]/80">
            Backed by accredited certifications, clinical exercise science, and hundreds of client success stories.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div
              key={i}
              className="rounded-[10px] bg-white border border-[var(--color-burgundy)]/20 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="relative h-[320px] w-full bg-[var(--color-burgundy)]/10">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-[22px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)]">
                    {member.name}
                  </h3>
                  <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-burgundy)]/70 font-semibold mt-1">
                    {member.role}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-burgundy)]/85">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-burgundy)]/10">
                  <span className="block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-burgundy)]/60 mb-2">
                    Core Specialties
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-full bg-[var(--color-blush)]/60 px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-burgundy)]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

