import type { MetadataRoute } from "next";

const siteUrl = "https://www.jonasheller.info";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/speaking`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/consulting`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/cv`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/publications`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // /academic is deliberately absent: it is a printable restatement of /cv
    // and /publications and is marked noindex, so listing it here would
    // contradict that.
  ];
}
