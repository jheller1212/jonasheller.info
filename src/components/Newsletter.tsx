"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/lib/i18n";

export default function Newsletter() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useI18n();

  return (
    <section aria-labelledby="newsletter-title" className="py-14 sm:py-16 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 sm:p-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-xl">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-accent-secondary)" }}
            >
              {t("newsletter.eyebrow")}
            </p>
            <h2
              id="newsletter-title"
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
              style={{ color: "var(--color-text)" }}
            >
              {t("newsletter.title")}
            </h2>
            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {t("newsletter.desc")}
            </p>
          </div>

          <a
            href="https://jonasheller.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("newsletter.cta")} ${t("a11y.newTab")}`}
            className="group flex shrink-0 items-center gap-4"
          >
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 group-hover:border-[var(--color-accent)]"
              style={{ borderColor: "var(--color-border)" }}
            >
              <ArrowRight
                size={20}
                aria-hidden="true"
                className="-rotate-45 transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                style={{ color: "var(--color-text-secondary)" }}
              />
            </span>
            <span
              className="text-sm font-medium tracking-wide transition-colors duration-300 group-hover:text-[var(--color-accent)]"
              style={{ color: "var(--color-text)" }}
            >
              {t("newsletter.cta")}
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
