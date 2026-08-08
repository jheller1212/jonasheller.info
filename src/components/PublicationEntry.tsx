"use client";

import { useI18n } from "@/lib/i18n";
import type { Publication } from "@/data/publications";

const typeLabelKey: Record<Publication["section"], string> = {
  article: "pub.type.article",
  review: "pub.type.review",
  editorial: "pub.type.editorial",
  chapter: "pub.type.chapter",
  conference: "pub.type.conference",
  keynote: "pub.type.keynote",
  report: "pub.type.report",
  thesis: "pub.type.thesis",
  preprint: "pub.type.preprint",
};

function Badge({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "accent" }) {
  return (
    <span
      className="px-2 py-0.5 rounded-full whitespace-nowrap"
      style={
        tone === "accent"
          ? { backgroundColor: "var(--color-accent)", color: "#fff" }
          : { backgroundColor: "var(--color-border)", color: "var(--color-text-secondary)" }
      }
    >
      {children}
    </span>
  );
}

/**
 * One publication with the metadata an appointment committee looks for:
 * full author list in original order with Jonas highlighted, author position,
 * contribution type, DOI, and open-access status.
 */
export default function PublicationEntry({ pub }: { pub: Publication }) {
  const { t } = useI18n();

  return (
    <article className="glass-card rounded-xl p-5 sm:p-6 break-inside-avoid">
      <h3 className="font-semibold leading-snug mb-2" style={{ color: "var(--color-text)" }}>
        {pub.href ? (
          <a
            href={pub.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline decoration-1 underline-offset-4"
          >
            {pub.title}
          </a>
        ) : (
          pub.title
        )}
      </h3>

      {/* Full author list in original order; Jonas emphasised, not reordered. */}
      <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--color-text-secondary)" }}>
        {pub.authors.map((author, i) => {
          const isJonas = pub.authorPosition === i + 1;
          return (
            <span key={`${author}-${i}`}>
              {i > 0 && ", "}
              <span
                style={
                  isJonas
                    ? { color: "var(--color-text)", fontWeight: 600 }
                    : undefined
                }
              >
                {author}
              </span>
            </span>
          );
        })}
      </p>

      <p className="text-xs mb-3" style={{ color: "var(--color-text-secondary)" }}>
        {pub.year}
        {pub.citation && <> · <em>{pub.citation}</em></>}
      </p>

      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <Badge>{t(typeLabelKey[pub.section])}</Badge>

        {/* No author-position or first-author badge: the author list above
            already shows both, with Jonas's name emphasised. */}

        {pub.isOpenAccess === true && <Badge tone="accent">{t("pub.openAccess")}</Badge>}

        {pub.doi && (
          <a
            href={`https://doi.org/${pub.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-0.5 rounded-full border hover:opacity-70 transition-opacity"
            style={{ borderColor: "var(--color-border)", color: "var(--color-accent)" }}
          >
            DOI: {pub.doi}
          </a>
        )}
      </div>
    </article>
  );
}
