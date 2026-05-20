"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";
import TeamMemberCard from "@/components/ui/team-member-card";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(135deg, var(--color-hero-gradient-start) 0%, var(--color-hero-gradient-end) 50%, var(--color-bg) 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(var(--color-text) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <TeamMemberCard
          position="left"
          jobPosition={t("hero.subtitle")}
          firstName="Dr. Jonas"
          lastName="Heller"
          imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=80&w=800"
          description={t("hero.value")}
          ctaHref="#contact"
        />
      </div>
    </section>
  );
}
