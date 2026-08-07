"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import PublicationList from "@/components/PublicationList";
import FundingTables from "@/components/FundingTables";
import TeachingList from "@/components/TeachingList";
import {
  awards,
  citizenship,
  CRIS_URL,
  education,
  experience,
  JOB_TITLE,
  LINKEDIN_URL,
  ORCID,
  RANK_FOOTNOTE,
  reviewingJournals,
  supervision,
} from "@/data/cv";
import { PUBLICATION_STATS, ORCID_URL } from "@/data/publications";

/**
 * Standalone academic view (P3.5).
 *
 * Deliberately separate from the marketing site: no keynote or consulting
 * navigation, no client logos, no call-to-action buttons. This is the view
 * that goes into an application dossier, and `print.css` rules in globals.css
 * make it paginate cleanly when saved as a PDF.
 */

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-14 scroll-mt-8">
      <h2
        className="text-xl sm:text-2xl font-bold tracking-tight mb-5 pb-2"
        style={{ color: "var(--color-text)", borderBottom: "1px solid var(--color-border)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="text-sm pl-4 relative before:content-['·'] before:absolute before:left-0"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function AcademicPage() {
  const { t } = useI18n();
  // Rendered on the client only: a build-time date would be stale on every
  // later visit, and the print footer needs the date the PDF was made.
  const [generatedOn, setGeneratedOn] = useState("");

  useEffect(() => {
    setGeneratedOn(new Date().toISOString().slice(0, 10));
  }, []);

  return (
    <main
      id="main-content"
      className="academic-view font-[family-name:var(--font-geist-sans)] py-16 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Dr. Jonas Heller
          </h1>
          <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
            {JOB_TITLE}
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
            Department of Marketing &amp; Supply Chain Management, School of Business and
            Economics, Maastricht University
          </p>
          <p className="text-xs mt-2 italic" style={{ color: "var(--color-text-secondary)" }}>
            {t("cv.rankFootnote")}
          </p>

          <div
            className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <span>Maastricht, NL</span>
            <a
              href={ORCID_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-accent)" }}
            >
              ORCID {ORCID}
            </a>
            <a
              href={CRIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-accent)" }}
            >
              Maastricht University CRIS
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-accent)" }}
            >
              LinkedIn
            </a>
          </div>

          <p className="text-sm mt-4" style={{ color: "var(--color-text-secondary)" }}>
            {PUBLICATION_STATS.journalArticles} {t("pubPage.statArticles")} ·{" "}
            {PUBLICATION_STATS.researchOutputs} {t("pubPage.statOutputs")}
          </p>

          <div className="mt-6 no-print">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            >
              {t("academic.print")}
            </button>
            <p className="text-xs mt-2" style={{ color: "var(--color-text-secondary)" }}>
              {t("academic.printHint")}
            </p>
          </div>
        </header>

        <Section id="experience" title={t("cv.section.experience")}>
          <div className="space-y-4">
            {experience.map((item) => (
              <div key={`${item.period}-${item.title}`} className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <h3 className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
                    {item.title}
                  </h3>
                  <span className="text-xs shrink-0" style={{ color: "var(--color-text-secondary)" }}>
                    {item.period}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "var(--color-accent)" }}>
                  {item.org}
                </p>
                {item.detail && (
                  <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {item.detail}
                  </p>
                )}
                {item.extra && <div className="mt-1"><Bullets items={item.extra} /></div>}
              </div>
            ))}
          </div>
        </Section>

        <Section id="education" title={t("cv.section.education")}>
          <div className="space-y-4">
            {education.map((item) => (
              <div key={item.degree} className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <h3 className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
                    {item.degree}
                  </h3>
                  <span className="text-xs shrink-0" style={{ color: "var(--color-text-secondary)" }}>
                    {item.period}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "var(--color-accent)" }}>
                  {item.school}
                </p>
                {item.detail && (
                  <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {item.detail}
                  </p>
                )}
                {item.honors && (
                  <p className="text-sm" style={{ color: "var(--color-accent-secondary)" }}>
                    {item.honors}
                  </p>
                )}
                {item.supervisors && (
                  <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    {item.supervisors}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section id="publications" title={t("cv.section.publications")}>
          <PublicationList />
        </Section>

        <Section id="funding" title={t("cv.section.funding")}>
          <FundingTables />
        </Section>

        <Section id="teaching" title={t("cv.section.teaching")}>
          <TeachingList />
        </Section>

        <Section id="supervision" title={t("cv.section.supervision")}>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--color-accent-secondary)" }}>
                {t("cv.supervision.current")}
              </h3>
              <Bullets items={supervision.current} />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--color-accent-secondary)" }}>
                {t("cv.supervision.completed")}
              </h3>
              <Bullets items={supervision.completed} />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--color-accent-secondary)" }}>
                {t("cv.supervision.other")}
              </h3>
              <Bullets items={supervision.other} />
            </div>
          </div>
        </Section>

        <Section id="awards" title={t("cv.section.awards")}>
          <ul className="space-y-2">
            {awards.map((a) => (
              <li key={`${a.year}-${a.title}`} className="text-sm flex gap-3">
                <span
                  className="font-mono text-xs shrink-0 pt-0.5"
                  style={{ color: "var(--color-accent-secondary)" }}
                >
                  {a.year}
                </span>
                <span style={{ color: "var(--color-text)" }}>
                  {a.title}
                  {"detail" in a && a.detail && (
                    <span style={{ color: "var(--color-text-secondary)" }}> — {a.detail}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="service" title={t("cv.section.service")}>
          <Bullets items={citizenship} />
        </Section>

        <Section id="reviewing" title={t("cv.section.reviewing")}>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {reviewingJournals.join(" · ")}
          </p>
        </Section>

        <footer
          className="pt-6 text-xs"
          style={{ color: "var(--color-text-secondary)", borderTop: "1px solid var(--color-border)" }}
        >
          <p className="print-datestamp">
            Dr. Jonas Heller — {t("academic.heading")} · {t("academic.generated")} {generatedOn} ·
            www.jonasheller.info/academic
          </p>
          <p className="mt-4 no-print">
            <Link href="/" style={{ color: "var(--color-accent)" }}>
              {t("projects.back")}
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
