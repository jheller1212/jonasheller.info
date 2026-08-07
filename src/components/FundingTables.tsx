"use client";

import { useI18n } from "@/lib/i18n";
import {
  FUNDING_STATS,
  fundingTables,
  formatEur,
  formatEurExact,
  industryFunding,
  subtotalFor,
  type Grant,
} from "@/data/cv";

/**
 * Funding shown as three separate tables with their own subtotals.
 *
 * The Role, Own share and Duration columns render only once at least one row
 * in that table carries the field — an empty column reads worse than no
 * column, and these values are maintained by hand in src/data/cv.ts.
 */
export default function FundingTables() {
  const { t } = useI18n();

  return (
    <div className="space-y-10">
      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
        <strong style={{ color: "var(--color-accent-secondary)" }}>
          {formatEur(FUNDING_STATS.external)}
        </strong>{" "}
        {t("cv.funding.headline")} ·{" "}
        <strong style={{ color: "var(--color-text)" }}>{formatEur(FUNDING_STATS.grantsTotal)}</strong>{" "}
        {t("cv.funding.acrossGrants").replace("{n}", String(FUNDING_STATS.grantCount))}
      </p>

      {fundingTables.map((table) => {
        const has = (field: keyof Grant) => table.grants.some((g) => g[field] !== undefined);
        const showRole = has("role");
        const showShare = has("ownShare");
        const showDuration = has("duration");

        return (
          <section key={table.key} className="break-inside-avoid">
            <div className="flex items-baseline justify-between gap-4 mb-3">
              <h3 className="font-semibold" style={{ color: "var(--color-text)" }}>
                {t(table.labelKey)}
              </h3>
              <span className="text-sm font-semibold" style={{ color: "var(--color-accent-secondary)" }}>
                {t("cv.funding.subtotal")}: {formatEurExact(subtotalFor(table.key))}
              </span>
            </div>

            <div className="overflow-x-auto glass-card rounded-xl">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr
                    className="text-left text-xs uppercase tracking-wide"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <th className="p-3 font-medium">{t("cv.funding.col.year")}</th>
                    <th className="p-3 font-medium">{t("cv.funding.col.funder")}</th>
                    <th className="p-3 font-medium">{t("cv.funding.col.project")}</th>
                    {showRole && <th className="p-3 font-medium">{t("cv.funding.col.role")}</th>}
                    {showDuration && <th className="p-3 font-medium">{t("cv.funding.col.duration")}</th>}
                    <th className="p-3 font-medium text-right">{t("cv.funding.col.amount")}</th>
                    {showShare && (
                      <th className="p-3 font-medium text-right">{t("cv.funding.col.share")}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {table.grants.map((g, i) => (
                    <tr
                      key={`${g.year}-${g.project}`}
                      style={{
                        borderTop: i === 0 ? "none" : "1px solid var(--color-border)",
                        color: "var(--color-text)",
                      }}
                    >
                      <td className="p-3 font-mono text-xs align-top whitespace-nowrap" style={{ color: "var(--color-text-secondary)" }}>
                        {g.year}
                      </td>
                      <td className="p-3 align-top">{g.funder}</td>
                      <td className="p-3 align-top">{g.project}</td>
                      {showRole && <td className="p-3 align-top">{g.role ?? "—"}</td>}
                      {showDuration && <td className="p-3 align-top whitespace-nowrap">{g.duration ?? "—"}</td>}
                      <td className="p-3 align-top text-right font-semibold whitespace-nowrap">
                        {formatEurExact(g.amount)}
                      </td>
                      {showShare && (
                        <td className="p-3 align-top text-right whitespace-nowrap">
                          {g.ownShare !== undefined ? formatEurExact(g.ownShare) : "—"}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
        {t("cv.funding.industry")
          .replace("{year}", industryFunding.since)
          .replace("{amount}", formatEurExact(industryFunding.amount))}
      </p>
    </div>
  );
}
