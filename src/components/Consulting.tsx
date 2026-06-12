"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/lib/i18n";

export default function Consulting() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { t } = useI18n();

  return (
    <section id="consulting" className="scroll-mt-20 py-14 sm:py-16 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--color-accent-secondary)" }}
          >
            {t("consulting.eyebrow")}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--color-text)" }}
          >
            {t("consulting.title")}
          </h2>
          <p
            className="text-base sm:text-lg max-w-3xl leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {t("consulting.intro")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {(["consulting.workshops", "consulting.training", "consulting.advisory"] as const).map(
            (key) => (
              <motion.div
                key={key}
                className="glass-card rounded-2xl p-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <h3 className="font-bold mb-2" style={{ color: "var(--color-text)" }}>
                  {t(key)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {t(`${key}.desc`)}
                </p>
              </motion.div>
            )
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-text)" }}>
            {t("consulting.clientsTitle")}
          </h3>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--color-text-secondary)" }}>
            {t("consulting.clients")}
          </p>

          <div className="text-center">
            <a
              href="#contact"
              className="inline-block px-8 py-3 rounded-full text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {t("consulting.cta")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
