import { PUBLICATION_STATS } from "@/data/publications";
import { FUNDING_STATS, formatEur } from "@/data/cv";

/**
 * Publication and funding figures come from the data modules, never from
 * hardcoded strings — the page used to show 36, 40 and 40 side by side.
 *
 * Fills every stat placeholder the i18n strings use: {articles}, {outputs},
 * {external}, {total}, {count}. Kept in one place so a new placeholder can't
 * be handled on one surface and leak as a raw token on another.
 */
export function fillStats(text: string): string {
  return text
    .replace("{articles}", String(PUBLICATION_STATS.journalArticles))
    .replace("{outputs}", String(PUBLICATION_STATS.researchOutputs))
    .replace("{external}", formatEur(FUNDING_STATS.external))
    .replace("{total}", formatEur(FUNDING_STATS.grantsTotal))
    .replace("{count}", String(FUNDING_STATS.grantCount));
}
