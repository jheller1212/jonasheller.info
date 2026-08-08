import { FUNDING_STATS, formatEurApprox } from "@/data/cv";

/**
 * Funding figures come from the data module, never from hardcoded strings —
 * the page once showed two different totals side by side.
 *
 * Fills the placeholders the i18n strings use: {external}, {total}, {count}.
 * Kept in one place so a new placeholder cannot be handled on one surface and
 * leak as a raw token on another.
 *
 * Money is rendered as a rounded-down "or more" figure (€2.1M+), matching the
 * CV. Exact amounts live in the funding tables.
 */
export function fillStats(text: string): string {
  return text
    .replace("{external}", formatEurApprox(FUNDING_STATS.external))
    .replace("{total}", formatEurApprox(FUNDING_STATS.grantsTotal))
    .replace("{count}", String(FUNDING_STATS.grantCount));
}
