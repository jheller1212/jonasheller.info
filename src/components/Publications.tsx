"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import MagneticButton from "./MagneticButton";
import { useI18n } from "@/lib/i18n";
import { publications, Publication } from "@/data/publications";

type SortMode = "relevance" | "year";

function getAuthorRelevance(pub: Publication): number {
  // Authors are "Lastname, F., Lastname, F. I., ..." — drop initials-only
  // segments so the list reduces to surnames in order.
  const authors = pub.authors
    .split(/,\s*/)
    .filter((s) => !/^[A-Z]\.(\s?[A-Z]\.)*$/.test(s.trim()));
  const first = authors[0] ?? "";
  const last = authors[authors.length - 1] ?? "";
  // Check first author
  if (/^Heller/i.test(first)) return 0;
  // Check last author
  if (/^Heller/i.test(last)) return 1;
  // Check second author
  if (authors.length > 1 && /Heller/i.test(authors[1])) return 2;
  // Co-author elsewhere
  return 3;
}

function sortPublications(pubs: Publication[], mode: SortMode): Publication[] {
  return [...pubs].sort((a, b) => {
    if (mode === "relevance") {
      const relA = getAuthorRelevance(a);
      const relB = getAuthorRelevance(b);
      if (relA !== relB) return relA - relB;
    }
    return b.year - a.year;
  });
}

export default function Publications() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [showAll, setShowAll] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("relevance");
  const { t } = useI18n();

  const sorted = sortPublications(publications, sortMode);
  const displayed = showAll ? sorted : sorted.slice(0, 6);

  return (
    <section id="publications" className="scroll-mt-20 py-14 sm:py-16 px-6">
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
            {t("pub.eyebrow")}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--color-text)" }}
          >
            {t("pub.title")}
          </h2>
          <div className="flex items-center gap-6 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <span>{publications.length} {t("pub.count")}</span>
            <div
              className="flex items-center rounded-full border text-xs"
              style={{ borderColor: "var(--color-border)" }}
            >
              {(["relevance", "year"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSortMode(mode)}
                  className="px-3 py-1.5 rounded-full transition-colors font-medium capitalize"
                  style={{
                    backgroundColor: sortMode === mode ? "var(--color-accent)" : "transparent",
                    color: sortMode === mode ? "#fff" : "var(--color-text-secondary)",
                  }}
                >
                  {mode === "relevance" ? t("pub.sortRelevance") : t("pub.sortYear")}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {displayed.map((pub) => (
            <motion.a
              key={pub.id}
              href={pub.url ?? `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${pub.title}"`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-xl p-6 hover:scale-[1.02] transition-transform group"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <h3
                className="font-semibold mb-2 leading-snug group-hover:underline decoration-1 underline-offset-4"
                style={{ color: "var(--color-text)" }}
              >
                {pub.title}
              </h3>
              <p className="text-xs mb-2" style={{ color: "var(--color-text-secondary)" }}>
                {pub.authors}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                <span>{pub.year}</span>
                <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-border)" }}>
                  {pub.journal}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {sorted.length > 6 && (
          <div className="mt-8 text-center">
            <MagneticButton
              className="px-6 py-2 rounded-full text-sm font-semibold border transition-colors"
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
            >
              {showAll ? t("pub.showLess") : `${t("pub.showAll")} ${sorted.length} ${t("pub.papers")}`}
            </MagneticButton>
          </div>
        )}

        <div className="mt-6 flex justify-center gap-4">
          <a
            href="https://scholar.google.com/citations?user=NOSPtp8AAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-accent)" }}
          >
            Google Scholar →
          </a>
        </div>
      </div>
    </section>
  );
}
