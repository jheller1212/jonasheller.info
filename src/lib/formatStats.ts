import { PUBLICATION_STATS } from "@/data/publications";
import { FUNDING_STATS, formatEurApprox } from "@/data/cv";

/**
 * Publication and funding figures come from the data modules, never from
 * hardcoded strings — the page used to show 36, 40 and 40 side by side.
 *
 * Fills every stat placeholder the i18n strings use: {articles}, {outputs},
 * {external}, {total}, {count}. Kept in one place so a new placeholder can't
 * be handled on one surface and leak as a raw token on another.
 *
 * Money is rendered as a rounded-down "or more" figure (€2.1M+), which is how
 * the CV states it. Exact amounts live in the funding tables.
 */
export function fillStats(text: string): string {
  return text
    .replace("{articles}", String(PUBLICATION_STATS.journalArticles))
    .replace("{outputs}", String(PUBLICATION_STATS.researchOutputs))
    .replace("{external}", formatEurApprox(FUNDING_STATS.external))
    .replace("{total}", formatEurApprox(FUNDING_STATS.grantsTotal))
    .replace("{count}", String(FUNDING_STATS.grantCount));
}
