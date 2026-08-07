"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FundingTables from "@/components/FundingTables";
import TeachingList from "@/components/TeachingList";
import { useI18n } from "@/lib/i18n";
import {
  awards,
  citizenship,
  CRIS_URL,
  education,
  experience,
  JOB_TITLE,
  LINKEDIN_URL,
  ORCID,
  reviewingJournals,
  supervision,
} from "@/data/cv";
import { ORCID_URL, PUBLICATION_STATS } from "@/data/publications";

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <p
        className="text-sm font-semibold tracking-widest uppercase mb-2"
        style={{ color: "var(--color-accent-secondary)" }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-2xl sm:text-3xl font-bold tracking-tight"
        style={{ color: "var(--color-text)" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

export default function CVPage() {
  const { t } = useI18n();

  return (
    <>
      <Nav />
      <main id="main-content" className="font-[family-name:var(--font-geist-sans)] pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-accent-secondary)" }}
            >
              Curriculum Vitae
            </p>
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
              style={{ color: "var(--color-text)" }}
            >
              Dr. Jonas Heller
            </h1>
            <p
              className="text-lg leading-relaxed max-w-3xl"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {JOB_TITLE} at Maastricht University. Co-Founder &amp; Scientific Director of DEXLab
              and Co-Founder of the Limburg Immersive Technologies Network.
            </p>
            <p className="text-xs mt-2 italic" style={{ color: "var(--color-text-secondary)" }}>
              {t("cv.rankFootnote")}
            </p>

            <div
              className="flex flex-wrap gap-4 mt-4 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <span>Maastricht, NL</span>
              <a href="#contact" className="hover:opacity-70 transition-opacity" style={{ color: "var(--color-accent)" }}>
                Contact Form
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent)" }}
              >
                LinkedIn
              </a>
              <a
                href={CRIS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent)" }}
              >
                Maastricht University CRIS
              </a>
              <a
                href={ORCID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent)" }}
              >
                ORCID {ORCID}
              </a>
            </div>

            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <Link
                href="/publications"
                className="hover:opacity-70 transition-opacity font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                {t("pub.viewAll")}
              </Link>
              <Link
                href="/academic"
                className="hover:opacity-70 transition-opacity font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                {t("academic.link")}
              </Link>
            </div>
          </motion.div>

          {/* Professional Experience */}
          <section className="mb-16">
            <SectionHeading eyebrow={t("cv.eyebrow.experience")} title={t("cv.section.experience")} />
            <div className="space-y-6">
              {experience.map((item, i) => (
                <motion.div
                  key={`${item.period}-${item.title}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                    <h3 className="font-semibold" style={{ color: "var(--color-text)" }}>
                      {item.title}
                    </h3>
                    <span className="text-xs shrink-0" style={{ color: "var(--color-text-secondary)" }}>
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm mb-1" style={{ color: "var(--color-accent)" }}>
                    {item.org}
                  </p>
                  {item.detail && (
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {item.detail}
                    </p>
                  )}
                  {item.extra && (
                    <ul className="mt-2 space-y-1">
                      {item.extra.map((e) => (
                        <li
                          key={e}
                          className="text-sm pl-4 relative before:content-['–'] before:absolute before:left-0"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {e}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-16">
            <SectionHeading eyebrow={t("cv.eyebrow.education")} title={t("cv.section.education")} />
            <div className="space-y-6">
              {education.map((item, i) => (
                <motion.div
                  key={item.degree}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                    <h3 className="font-semibold" style={{ color: "var(--color-text)" }}>
                      {item.degree}
                    </h3>
                    <span className="text-xs shrink-0" style={{ color: "var(--color-text-secondary)" }}>
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm mb-1" style={{ color: "var(--color-accent)" }}>
                    {item.school}
                  </p>
                  {item.detail && (
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {item.detail}
                    </p>
                  )}
                  {item.honors && (
                    <p
                      className="text-sm font-medium mt-1"
                      style={{ color: "var(--color-accent-secondary)" }}
                    >
                      {item.honors}
                    </p>
                  )}
                  {item.supervisors && (
                    <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>
                      {item.supervisors}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Publications pointer — the full record lives on its own route */}
          <section className="mb-16">
            <SectionHeading eyebrow={t("pub.eyebrow")} title={t("cv.section.publications")} />
            <div className="glass-card rounded-xl p-6">
              <p className="text-sm mb-3" style={{ color: "var(--color-text-secondary)" }}>
                <strong style={{ color: "var(--color-accent-secondary)" }}>
                  {PUBLICATION_STATS.journalArticles}
                </strong>{" "}
                {t("pubPage.statArticles")},{" "}
                <strong style={{ color: "var(--color-text)" }}>
                  {PUBLICATION_STATS.researchOutputs}
                </strong>{" "}
                {t("pubPage.statOutputs")}.
              </p>
              <Link
                href="/publications"
                className="text-sm font-semibold hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent)" }}
              >
                {t("pub.viewAll")}
              </Link>
            </div>
          </section>

          {/* Awards */}
          <section className="mb-16">
            <SectionHeading eyebrow={t("cv.eyebrow.awards")} title={t("cv.section.awards")} />
            <div className="space-y-3">
              {awards.map((item, i) => (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-start gap-3"
                >
                  <span
                    className="text-xs font-mono shrink-0 pt-0.5"
                    style={{ color: "var(--color-accent-secondary)" }}
                  >
                    {item.year}
                  </span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
                      {item.title}
                    </p>
                    {"detail" in item && item.detail && (
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
                        {item.detail}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Funding */}
          <section className="mb-16">
            <SectionHeading eyebrow={t("cv.eyebrow.funding")} title={t("cv.section.funding")} />
            <FundingTables />
          </section>

          {/* Teaching */}
          <section className="mb-16">
            <SectionHeading eyebrow={t("cv.eyebrow.teaching")} title={t("cv.section.teaching")} />
            <TeachingList />
          </section>

          {/* Supervision */}
          <section className="mb-16">
            <SectionHeading eyebrow={t("cv.eyebrow.supervision")} title={t("cv.section.supervision")} />
            <div className="space-y-6">
              {(
                [
                  ["current", supervision.current],
                  ["completed", supervision.completed],
                  ["other", supervision.other],
                ] as const
              ).map(([key, items], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <h3
                    className="font-semibold text-sm mb-3"
                    style={{ color: "var(--color-accent-secondary)" }}
                  >
                    {t(`cv.supervision.${key}`)}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((s) => (
                      <li
                        key={s}
                        className="text-sm pl-4 relative before:content-['·'] before:absolute before:left-0"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Academic Service */}
          <section className="mb-16">
            <SectionHeading eyebrow={t("cv.eyebrow.service")} title={t("cv.section.service")} />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-xl p-6"
            >
              <ul className="space-y-2">
                {citizenship.map((c) => (
                  <li
                    key={c}
                    className="text-sm pl-4 relative before:content-['·'] before:absolute before:left-0"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          </section>

          {/* Peer Reviewing */}
          <section className="mb-16">
            <SectionHeading eyebrow={t("cv.eyebrow.reviewing")} title={t("cv.section.reviewing")} />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {reviewingJournals.map((j) => (
                <span
                  key={j}
                  className="glass-card text-xs px-3 py-1.5 rounded-full"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {j}
                </span>
              ))}
            </motion.div>
          </section>

          {/* Back link */}
          <div className="text-center">
            <Link
              href="/"
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-accent)" }}
            >
              ← {t("projects.back")}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
