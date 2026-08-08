import type { MetadataRoute } from "next";
import { ORCID_LAST_SYNCED } from "@/data/publications";

const siteUrl = "https://www.jonasheller.info";

/**
 * `lastModified` on the publication pages tracks the ORCID sync date, so it
 * moves only when the record actually changes. The remaining pages carry the
 * build date; an invented per-page date would be worse than none.
 */
const buildDate = new Date().toISOString().slice(0, 10);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/publications`,
      lastModified: ORCID_LAST_SYNCED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/cv`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/speaking`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/consulting`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // /academic is deliberately absent: it is a printable restatement of /cv
    // and /publications and is marked noindex, so listing it here would
    // contradict that.
  ];
}
