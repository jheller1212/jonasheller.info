/**
 * Manually maintained publication data.
 *
 * `orcid-works.json` is a machine-written mirror of ORCID and must never be
 * hand-edited — `npm run sync:orcid` overwrites it. Everything ORCID cannot
 * express lives here and is merged in at import time by `publications.ts`.
 */

import type { PublicationSection, RawWork } from "./publications";

/* ─────────────────── selected papers (front page) ─────────────────── */

/**
 * The seven papers shown on the home page, in the order they appear.
 * Everything else stays on /publications.
 */
export const selectedIds = [
  "becker2026", // The Leadership Quarterly 2026
  "barrett2025", // Journal of Service Research 2025
  "ciuchita2023", // Journal of Service Research 2023
  "heller2020a", // Journal of Service Research 2020 — Tangible Service Automation
  "deruyter2020", // Journal of Advertising 2020
  "heller2019", // Journal of Retailing 2019 — Let Me Imagine That for You
  "heller2019a", // Journal of Retailing 2019 — Touching the Untouchable
] as const;

/* ─────────────────────── classification ─────────────────────── */

/**
 * ORCID types everything peer-reviewed as `journal-article`. These two are
 * systematic reviews and get their own section; they still count towards the
 * peer-reviewed journal-article total.
 */
export const reviewIds = new Set(["ciuchita2023", "herold2023"]);

/* ─────────────────────── field overrides ─────────────────────── */

/**
 * ORCID stores several titles in an abbreviated form. These are the titles as
 * printed by the journal.
 */
export const titleOverrides: Record<string, string> = {
  rauschnabel2024:
    "The 4C framework: Towards a holistic understanding of consumer engagement with augmented reality",
  herold2025:
    "Brave new procurement deals: An experimental study of how generative artificial intelligence reshapes buyer–supplier negotiations",
  mahr2025:
    "Immersion and regulation: Extended reality technologies, their impact on innovation and policy recommendations",
  becker2026:
    "Using customized, conversational AI agents in leadership and management research: Benefits, practical illustrations, and best practices",
  heller2020:
    "Reality re-imagined: How augmented reality redefines decision processes and consumer experiences",
};

/** Venues ORCID leaves blank or abbreviates. */
export const venueOverrides: Record<string, string> = {
  becker2026: "The Leadership Quarterly",
  hilken2023: "NIM Marketing Intelligence Review",
  werf2024: "Netspar Design Paper",
  heller2020: "PhD dissertation, University of New South Wales",
  heller2017: "Association for Consumer Research Conference, San Diego",
};

/**
 * Author position as printed by the publisher, for the rare case where the
 * ORCID contributor order does not match. Empty by default: positions are
 * derived from the ORCID author list during sync.
 */
export const authorPositionOverrides: Record<string, number> = {};

/* ──────────────────── works not held in ORCID ──────────────────── */

/**
 * Genuine outputs that are not (yet) deposited in ORCID. Adding them to the
 * ORCID record and re-running the sync is preferable — this list is a
 * stopgap, not a second source of truth.
 */
export const extraWorks: RawWork[] = [
  {
    id: "heller2023ifo",
    title: "Zur aktuellen und zukünftigen wirtschaftlichen Lage von Selbständigen",
    year: 2023,
    // ifo Schnelldienst is a policy outlet, not a peer-reviewed journal.
    type: "report" as PublicationSection,
    orcidType: "journal-article",
    venue: "ifo Schnelldienst",
    volume: "76",
    issue: "01",
    pages: "39-43",
    doi: null,
    url: null,
    authors: ["Heller, J.", "Sauer, S.", "Wohlrabe, K."],
    authorPosition: 1,
    authorCount: 3,
    isOpenAccess: true,
    oaStatus: "bronze",
    oaUrl: null,
  },
  {
    id: "mahr2023transfer",
    title: "Die Innovation synthetischer Kundenerlebnisse: Machen ist wichtiger als Denken",
    year: 2023,
    type: "report" as PublicationSection,
    orcidType: "journal-article",
    venue: "transfer — Zeitschrift für Kommunikation & Markenmanagement",
    volume: "69",
    issue: "3",
    pages: null,
    doi: null,
    url: null,
    authors: ["Mahr, D.", "Heller, J.", "Hilken, T.", "Wigger, M."],
    authorPosition: 2,
    authorCount: 4,
    isOpenAccess: false,
    oaStatus: "closed",
    oaUrl: null,
  },
  {
    id: "becker2025preprint",
    title:
      "Introducing ResearchChatAI: An easy-to-use, open-source tool to build conversational AI agents for management and leadership research",
    year: 2025,
    type: "preprint" as PublicationSection,
    orcidType: "preprint",
    venue: "SSRN Working Paper",
    volume: null,
    issue: null,
    pages: null,
    doi: "10.2139/ssrn.5188853",
    url: null,
    authors: [
      "Becker, M.",
      "de Jong, D.",
      "Briker, R.",
      "Mennens, K.",
      "Heller, J.",
      "Mahr, D.",
      "Grewal, D.",
    ],
    authorPosition: 5,
    authorCount: 7,
    isOpenAccess: true,
    oaStatus: "green",
    oaUrl: null,
  },
  {
    id: "bos2026preprint",
    title:
      "Perspective-taking and meaning-making among public policy professionals experiencing an immersive poverty narrative",
    year: 2026,
    type: "preprint" as PublicationSection,
    orcidType: "preprint",
    venue: "Working paper",
    volume: null,
    issue: null,
    pages: null,
    doi: null,
    url: null,
    authors: ["Bos, S. G.", "Brüggen, L.", "van der Werf, M.", "Heller, J."],
    authorPosition: 4,
    authorCount: 4,
    isOpenAccess: false,
    oaStatus: null,
    oaUrl: null,
  },
];

/* ─────────────────────────── under review ─────────────────────────── */

export type ManuscriptStatus = "Under Review" | "Revise and Resubmit" | "Accepted";

export interface Manuscript {
  title: string;
  /** Target journal. */
  outlet: string;
  status: ManuscriptStatus;
  authors?: string;
}

/**
 * Manuscripts in the review process. German appointment committees expect this
 * section; it is rendered only when non-empty.
 *
 * Add entries as: { title, outlet, status, authors }.
 */
export const underReview: Manuscript[] = [];
