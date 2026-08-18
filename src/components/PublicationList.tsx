"use client";

import { useI18n } from "@/lib/i18n";
import PublicationEntry from "./PublicationEntry";
import { publicationGroups } from "@/data/publications";

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
