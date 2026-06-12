"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/lib/i18n";

const nameKeys = [0, 1, 2, 3];

export default function TrustedBy() {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const { t } = useI18n();

  return (
    <section aria-labelledby="trusted-by-label" className="px-6 pt-16 sm:pt-20 pb-2">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        <p
          id="trusted-by-label"
          className="text-xs tracking-[0.25em] uppercase mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {t("trusted.label")}
        </p>
        <ul role="list" className="flex flex-wrap items-baseline justify-center gap-x-10 gap-y-3 list-none">
          {nameKeys.map((i) => (
            <li
              key={i}
              className="text-sm sm:text-base font-semibold tracking-[0.14em] uppercase whitespace-nowrap"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {t(`trusted.${i}`)}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
