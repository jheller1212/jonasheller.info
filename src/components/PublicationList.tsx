"use client";

import { useI18n } from "@/lib/i18n";
import PublicationEntry from "./PublicationEntry";
import { publicationGroups } from "@/data/publications";
import { underReview, type ManuscriptStatus } from "@/data/publications-overlay";

const statusKey: Record<ManuscriptStatus, string> = {
  "Under Review": "pub.status.underReview",
  "Revise and Resubmit": "pub.status.rr",
  Accepted: "pub.status.accepted",
};

function GroupHeading({ children, count }: { children: React.ReactNode; count: number }) {
  return (
    <div className="flex items-baseline gap-3 mb-5">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: "var(--color-text)" }}>
        {children}
      </h2>
      <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
        {count}
      </span>
    </div>
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
      {underReview.length > 0 && (
        <section aria-labelledby="under-review">
          <div className="flex items-baseline gap-3 mb-5">
            <h2
              id="under-review"
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ color: "var(--color-text)" }}
            >
              {t("pub.underReview")}
            </h2>
            <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              {underReview.length}
            </span>
          </div>
          <div className="space-y-3">
            {underReview.map((m, i) => (
              <article key={i} className="glass-card rounded-xl p-5 break-inside-avoid">
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
                    className="px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}
                  >
                    {t(statusKey[m.status])}
                  </span>
                  <span style={{ color: "var(--color-text-secondary)" }}>
                    <em>{m.outlet}</em>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {publicationGroups.map((group) => (
        <section key={group.key} id={group.key} className="scroll-mt-24">
          <GroupHeading count={group.items.length}>{t(group.labelKey)}</GroupHeading>
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
