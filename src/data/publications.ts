/**
 * Publication list — single source of truth for every publication count and
 * citation on the site.
 *
 * Data flow:
 *   ORCID 0000-0002-3214-0724 --(npm run sync:orcid)--> orcid-works.json
 *                                                        + publications-overlay.ts
 *                                                        = this module
 *
 * Nothing is fetched at build time or in the browser, and Google Scholar is
 * not a source: it mixes in works by same-named authors.
 */

import orcidData from "./orcid-works.json";
import {
  authorPositionOverrides,
  doiOverrides,
  editorialIds,
  extraWorks,
  pagesOverrides,
  reviewIds,
  selectedIds,
  titleOverrides,
  venueOverrides,
  yearOverrides,
} from "./publications-overlay";

/** The section a work is listed under. */
export type PublicationSection =
  | "article"
  | "review"
  | "editorial"
  | "chapter"
  | "conference"
  | "keynote"
  | "report"
  | "thesis"
  | "preprint";

/** A work exactly as it comes out of the sync script or the overlay. */
export interface RawWork {
  id: string;
  title: string;
  year: number | null;
  type: PublicationSection;
  orcidType: string;
  venue: string | null;
  volume: string | null;
  issue: string | null;
  pages: string | null;
  doi: string | null;
  url?: string | null;
  authors: string[];
  authorPosition: number | null;
  authorCount: number;
  isOpenAccess: boolean | null;
  oaStatus: string | null;
  oaUrl: string | null;
}

export interface Publication extends RawWork {
  /** Section after overlay reclassification (reviews split out of articles). */
  section: PublicationSection;
  /** "Journal of Retailing 95 (4), 219-234" */
  citation: string;
  /** Best link for the work: DOI, else the OA landing page, else nothing. */
  href: string | null;
}

const ORCID_ID = orcidData.orcid;
export const ORCID_URL = `https://orcid.org/${ORCID_ID}`;
export const ORCID_LAST_SYNCED = orcidData.fetchedAt;

/* ─────────────────────────── assembly ─────────────────────────── */

function citationOf(work: RawWork, venue: string | null, pages: string | null): string {
  if (!venue) return "";
  let out = venue;
  if (work.volume) {
    out += ` ${work.volume}`;
    if (work.issue) out += ` (${work.issue})`;
  }
  if (pages) out += `, ${pages}`;
  return out;
}

function sectionOf(work: RawWork): PublicationSection {
  if (reviewIds.has(work.id)) return "review";
  if (editorialIds.has(work.id)) return "editorial";
  return work.type;
}

function enrich(work: RawWork): Publication {
  const venue = venueOverrides[work.id] ?? work.venue;
  const pages = pagesOverrides[work.id] ?? work.pages;
  const doi = doiOverrides[work.id] ?? work.doi;
  return {
    ...work,
    title: titleOverrides[work.id] ?? work.title,
    year: yearOverrides[work.id] ?? work.year,
    venue,
    pages,
    doi,
    authorPosition: authorPositionOverrides[work.id] ?? work.authorPosition,
    section: sectionOf(work),
    citation: citationOf(work, venue, pages),
    href: doi ? `https://doi.org/${doi}` : (work.oaUrl ?? work.url ?? null),
  };
}

/** Every output, newest first. */
export const publications: Publication[] = [
  ...(orcidData.works as RawWork[]),
  ...extraWorks,
]
  .map(enrich)
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title));

const byId = new Map(publications.map((p) => [p.id, p]));

// A re-sync can rename an id if a title or lead author changes. Fail the build
// rather than quietly dropping a featured paper from the home page.
const missingSelected = selectedIds.filter((id) => !byId.has(id));
if (missingSelected.length > 0) {
  throw new Error(
    `publications-overlay: selectedIds not found in the publication list: ${missingSelected.join(", ")}. ` +
      `Re-check the ids in src/data/orcid-works.json after the last sync.`,
  );
}

/** The seven papers featured on the home page, in the curated order. */
export const selectedPublications: Publication[] = selectedIds.map(
  (id) => byId.get(id) as Publication,
);

/* ─────────────────────────── sections ─────────────────────────── */

export interface PublicationGroup {
  key: string;
  /** i18n key for the heading. */
  labelKey: string;
  items: Publication[];
}

/** Section order follows academic CV convention: journals first, other last. */
const SECTION_ORDER: { key: string; labelKey: string; sections: PublicationSection[] }[] = [
  { key: "articles", labelKey: "pub.section.articles", sections: ["article"] },
  { key: "reviews", labelKey: "pub.section.reviews", sections: ["review"] },
  { key: "chapters", labelKey: "pub.section.chapters", sections: ["chapter"] },
  { key: "keynotes", labelKey: "pub.section.keynotes", sections: ["keynote"] },
  { key: "conference", labelKey: "pub.section.conference", sections: ["conference"] },
  {
    key: "other",
    labelKey: "pub.section.other",
    sections: ["editorial", "report", "thesis", "preprint"],
  },
];

export const publicationGroups: PublicationGroup[] = SECTION_ORDER.map(
  ({ key, labelKey, sections }) => ({
    key,
    labelKey,
    items: publications.filter((p) => sections.includes(p.section)),
  }),
).filter((group) => group.items.length > 0);

/* ─────────────────────────── counts ─────────────────────────── */

/**
 * Every publication count on the site reads from here. Do not hardcode these
 * numbers anywhere else — the site previously showed 36, 40 and 40 on one page.
 */
/** Talks are counted separately from written outputs, as a CV would. */
const SPOKEN: PublicationSection[] = ["conference", "keynote"];

export const PUBLICATION_STATS = {
  /**
   * Peer-reviewed journal articles, systematic reviews included. Editorials
   * are excluded — they are not peer-reviewed research articles.
   */
  journalArticles: publications.filter((p) => p.section === "article" || p.section === "review")
    .length,
  /**
   * Written research outputs: articles, reviews, editorials, book chapters,
   * reports and the dissertation. Deliberately excludes conference
   * presentations and keynotes, which are counted on their own below so the
   * headline figure is not inflated by talks.
   */
  researchOutputs: publications.filter((p) => !SPOKEN.includes(p.section)).length,
  /** Conference presentations and academic keynotes. */
  conferenceContributions: publications.filter((p) => SPOKEN.includes(p.section)).length,
  /** Outputs deposited in ORCID; the rest come from the overlay. */
  orcidOutputs: orcidData.works.length,
} as const;
