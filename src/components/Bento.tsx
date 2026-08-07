"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/lib/i18n";
import { fillStats } from "@/lib/formatStats";

const highlights = [
  { area: "a", titleKey: "bento.a.title", descKey: "bento.a.desc", link: "https://www.sbe-dexlab.com", linkKey: "bento.a.link", accent: true },
  { area: "b", titleKey: "bento.b.title", descKey: "bento.b.desc", accent: true },
  { area: "c", titleKey: "bento.c.title", descKey: "bento.c.desc" },
  { area: "d", titleKey: "bento.d.title", descKey: "bento.d.desc" },
  { area: "e", titleKey: "bento.e.title", descKey: "bento.e.desc", link: "https://www.litnetwork.nl", linkKey: "bento.e.link" },
  { area: "f", titleKey: "bento.f.title", descKey: "bento.f.desc" },
  { area: "g", titleKey: "bento.g.title", descKey: "bento.g.desc" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Bento() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { t } = useI18n();

  return (
    <section id="research" className="scroll-mt-20 py-14 sm:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
          ref={ref}
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--color-accent-secondary)" }}
          >
            {t("bento.eyebrow")}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            {t("bento.title")}
          </h2>
        </motion.div>

        <motion.div
          className="bento-grid grid gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {highlights.map((item) => (
            <motion.div
              key={item.area}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
              style={{ gridArea: item.area }}
              variants={cardVariants}
            >
              <div>
                <h3
                  className="text-lg sm:text-xl font-bold mb-3"
                  style={{
                    color: item.accent ? "var(--color-accent)" : "var(--color-text)",
                  }}
                >
                  {fillStats(t(item.titleKey))}
                </h3>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {fillStats(t(item.descKey))}
                </p>
              </div>
              {item.link && item.linkKey && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm font-semibold hover:opacity-70 transition-opacity"
                  style={{ color: "var(--color-accent)" }}
                >
                  {t(item.linkKey)}
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
