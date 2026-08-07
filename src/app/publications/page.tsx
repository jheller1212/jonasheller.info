"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PublicationList from "@/components/PublicationList";
import { useI18n } from "@/lib/i18n";
import { PUBLICATION_STATS, ORCID_URL, ORCID_LAST_SYNCED } from "@/data/publications";
import { SCHOLAR_METRICS } from "@/data/cv";

export default function PublicationsPage() {
  const { t } = useI18n();

  return (
    <>
      <Nav />
      <main
        id="main-content"
        className="font-[family-name:var(--font-geist-sans)] pt-24 pb-24 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <header className="mb-14">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-accent-secondary)" }}
            >
              {t("pub.eyebrow")}
            </p>
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
              style={{ color: "var(--color-text)" }}
            >
              {t("pubPage.heading")}
            </h1>
            <p
              className="text-lg leading-relaxed max-w-3xl mb-6"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {t("pubPage.intro")}
            </p>

            <div className="flex flex-wrap gap-6 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              <span>
                <strong style={{ color: "var(--color-accent-secondary)" }}>
                  {PUBLICATION_STATS.journalArticles}
                </strong>{" "}
                {t("pubPage.statArticles")}
              </span>
              <span>
                <strong style={{ color: "var(--color-accent-secondary)" }}>
                  {PUBLICATION_STATS.researchOutputs}
                </strong>{" "}
                {t("pubPage.statOutputs")}
              </span>
              <span>
                <strong style={{ color: "var(--color-accent-secondary)" }}>
                  {PUBLICATION_STATS.conferenceContributions}
                </strong>{" "}
                {t("pubPage.statConference")}
              </span>
              <span>
                <strong style={{ color: "var(--color-accent-secondary)" }}>
                  {PUBLICATION_STATS.firstAuthored}
                </strong>{" "}
                {t("pubPage.statFirstAuthored")}
              </span>
              <span>
                <strong style={{ color: "var(--color-accent-secondary)" }}>
                  {PUBLICATION_STATS.articlesSincePhd}
                </strong>{" "}
                {t("pubPage.sincePhd")}
              </span>
              <span>
                <strong style={{ color: "var(--color-accent-secondary)" }}>
                  {SCHOLAR_METRICS.citations.toLocaleString("en-US")}
                </strong>{" "}
                {t("pubPage.statCitations")}
              </span>
              <a
                href={ORCID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent)" }}
              >
                ORCID {ORCID_URL.replace("https://orcid.org/", "")} →
              </a>
            </div>
          </header>

          <PublicationList />

          <p className="mt-14 text-xs" style={{ color: "var(--color-text-secondary)" }}>
            {t("pubPage.lastSynced")} {ORCID_LAST_SYNCED}
            {" · "}
            {t("pubPage.metricsAsOf")
              .replace("{date}", SCHOLAR_METRICS.asOf)
              .replace("{citations}", SCHOLAR_METRICS.citations.toLocaleString("en-US"))
              .replace("{h}", String(SCHOLAR_METRICS.hIndex))
              .replace("{i10}", String(SCHOLAR_METRICS.i10Index))}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/academic"
              className="hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-accent)" }}
            >
              {t("academic.link")}
            </Link>
            <Link
              href="/"
              className="hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-accent)" }}
            >
              {t("projects.back")}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
