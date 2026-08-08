import type { Metadata } from "next";
import { socialMeta, SITE_URL } from "@/lib/seo";
import { publications } from "@/data/publications";
import { ORCID_PROFILE_URL } from "@/data/cv";

export const metadata: Metadata = {
  title: "Publications — Dr. Jonas Heller",
  description:
    "Complete list of publications by Dr. Jonas Heller: peer-reviewed journal articles, review articles, book chapters, conference contributions, and reports. Generated from ORCID 0000-0002-3214-0724.",
  alternates: {
    canonical: "/publications",
  },
  ...socialMeta({
    title: "Publications — Dr. Jonas Heller",
    description:
      "Complete publication record of Dr. Jonas Heller, grouped by contribution type, with DOIs and open-access status.",
    path: "/publications",
  }),
};

/**
 * The peer-reviewed record as structured data.
 *
 * Limited to journal articles and reviews rather than all 80 entries: those
 * are the works a search engine or an assistant is asked about, and emitting
 * every conference talk would triple the payload for little gain. Each entry
 * carries its DOI, which is the identifier that lets a machine resolve the
 * work rather than guess at it.
 */
const scholarlyWorks = publications
  .filter((p) => p.section === "article" || p.section === "review")
  .map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "ScholarlyArticle",
      headline: p.title,
      datePublished: p.year ? String(p.year) : undefined,
      isPartOf: p.venue ? { "@type": "Periodical", name: p.venue } : undefined,
      author: p.authors.map((name) => ({ "@type": "Person", name })),
      ...(p.doi
        ? { sameAs: `https://doi.org/${p.doi}`, identifier: `https://doi.org/${p.doi}` }
        : {}),
      isAccessibleForFree: p.isOpenAccess ?? undefined,
    },
  }));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Publications — Dr. Jonas Heller",
  url: `${SITE_URL}/publications`,
  about: {
    "@type": "Person",
    name: "Jonas Heller",
    identifier: ORCID_PROFILE_URL,
    url: SITE_URL,
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Peer-reviewed journal articles",
    numberOfItems: scholarlyWorks.length,
    itemListElement: scholarlyWorks,
  },
};

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
