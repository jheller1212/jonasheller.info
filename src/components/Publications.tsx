"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/lib/i18n";
import PublicationEntry from "./PublicationEntry";
import { selectedPublications, ORCID_URL } from "@/data/publications";

/**
 * Home-page publications section: a fixed, curated set of seven papers.
 *
 * The full record lives at /publications — this section never hides entries
 * behind a toggle, so what a crawler sees is what a reader sees.
 */
export default function Publications() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { t } = useI18n();

  return (
    <section id="publications" className="scroll-mt-20 py-14 sm:py-16 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--color-accent-secondary)" }}
          >
            {t("pub.eyebrow")}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--color-text)" }}
          >
            {t("pub.title")}
          </h2>
          <p className="text-sm max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
            {t("pub.selectedNote")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedPublications.map((pub) => (
            <PublicationEntry key={pub.id} pub={pub} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="/publications"
            className="font-semibold hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-accent)" }}
          >
            {t("pub.viewAll")}
          </Link>
          <a
            href={ORCID_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-accent)" }}
          >
            ORCID →
          </a>
        </div>
      </div>
    </section>
  );
}
