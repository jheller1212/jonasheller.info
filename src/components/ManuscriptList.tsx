"use client";

import { useI18n } from "@/lib/i18n";
import {
  inPreparation,
  underReview,
  type Manuscript,
  type ManuscriptStatus,
} from "@/data/publications-overlay";

const statusKey: Record<ManuscriptStatus, string> = {
  "Under Review": "pub.status.underReview",
  "Revise and Resubmit": "pub.status.rr",
  Accepted: "pub.status.accepted",
  "In Preparation": "pub.status.inPreparation",
};

function ManuscriptGroup({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: Manuscript[];
}) {
  const { t } = useI18n();
  if (items.length === 0) return null;

  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <h3
        id={id}
        className="text-lg font-bold tracking-tight mb-4"
        style={{ color: "var(--color-text)" }}
      >
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((m) => (
          <article key={m.title} className="glass-card rounded-xl p-5 break-inside-avoid">
            <h4 className="font-semibold leading-snug mb-1" style={{ color: "var(--color-text)" }}>
              {m.title}
            </h4>
            {m.authors && (
              <p className="text-xs mb-2" style={{ color: "var(--color-text-secondary)" }}>
                {m.authors}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <span
                className="px-2 py-0.5 rounded-full whitespace-nowrap"
                style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}
              >
                {t(statusKey[m.status])}
              </span>
              {m.note && (
                <span
                  className="px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{
                    backgroundColor: "var(--color-border)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {m.note}
                </span>
              )}
              <span style={{ color: "var(--color-text-secondary)" }}>
                {t("pub.targetOutlet")}: <em>{m.outlet}</em>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * Work in progress: manuscripts under review and in preparation.
 *
 * Lives on the CV rather than the publication list, which is deliberately
 * limited to the published record.
 */
export default function ManuscriptList() {
  const { t } = useI18n();

  return (
    <div className="space-y-8">
      <ManuscriptGroup id="under-review" title={t("pub.underReview")} items={underReview} />
      <ManuscriptGroup id="in-preparation" title={t("pub.inPreparation")} items={inPreparation} />
    </div>
  );
}
