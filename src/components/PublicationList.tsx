"use client";

import { useI18n } from "@/lib/i18n";
import PublicationEntry from "./PublicationEntry";
import { publicationGroups } from "@/data/publications";
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

function GroupHeading({ id, title }: { id: string; title: string }) {
  return (
    <h2
      id={id}
      className="text-xl sm:text-2xl font-bold tracking-tight mb-5"
      style={{ color: "var(--color-text)" }}
    >
      {title}
    </h2>
  );
}

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
      <GroupHeading id={id} title={title} />
      <div className="space-y-3">
        {items.map((m) => (
          <article key={m.title} className="glass-card rounded-xl p-5 break-inside-avoid">
            <h3 className="font-semibold leading-snug mb-1" style={{ color: "var(--color-text)" }}>
              {m.title}
            </h3>
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
 * The complete publication list, grouped by contribution type and ordered
 * newest-first inside each group.
 *
 * Deliberately has no expand/collapse control and no client-side data
 * fetching: every entry is present in the server-rendered HTML so crawlers and
 * automated CV readers see the full record.
 */
export default function PublicationList() {
  const { t } = useI18n();

  return (
    <div className="space-y-14">
      <ManuscriptGroup id="under-review" title={t("pub.underReview")} items={underReview} />
      <ManuscriptGroup id="in-preparation" title={t("pub.inPreparation")} items={inPreparation} />

      {publicationGroups.map((group) => (
        <section key={group.key} id={group.key} className="scroll-mt-24">
          <GroupHeading id={`${group.key}-heading`} title={t(group.labelKey)} />
          <div className="space-y-3">
            {group.items.map((pub) => (
              <PublicationEntry key={pub.id} pub={pub} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
