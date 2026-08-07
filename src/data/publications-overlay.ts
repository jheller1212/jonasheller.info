/**
 * Manually maintained publication data.
 *
 * `orcid-works.json` is a machine-written mirror of ORCID and must never be
 * hand-edited — `npm run sync:orcid` overwrites it. Everything ORCID cannot
 * express lives here and is merged in at import time by `publications.ts`.
 *
 * Source for everything not in ORCID: Jonas's CV of July 2026.
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
  "heller2020a", // Journal of Service Research 2021 — Tangible Service Automation
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

/**
 * Editorials, which ORCID also types as `journal-article`. They are listed
 * under "Reports & Other Contributions" and are deliberately excluded from the
 * peer-reviewed journal-article count — the CV marks this one [Editorial].
 */
export const editorialIds = new Set(["mahr2023"]);

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
  mahr2023:
    "Augmented reality (AR): The blurring of reality in human–computer interaction",
};

/** Venues ORCID leaves blank or abbreviates. */
export const venueOverrides: Record<string, string> = {
  becker2026: "The Leadership Quarterly",
  hilken2023: "NIM Marketing Intelligence Review",
  mahr2025:
    "In P. Verduyn (Ed.), SEM Policy Brief Collection — Digitalisation: EU Digital Services Act, Maastricht University Press",
  werf2024: "Netspar Design Paper",
  heller2020: "PhD dissertation, University of New South Wales",
  heller2017: "Competitive Advantages in a Digital Economy (CADE), Venice, Italy",
};

/**
 * ORCID records the online-first year for some works. These are the years of
 * the printed issue, as cited in the CV.
 */
export const yearOverrides: Record<string, number> = {
  // Journal of Service Research 24(1) appeared in the 2021 issue.
  heller2020a: 2021,
};

/**
 * DOIs missing from the ORCID record.
 *
 * Empty on purpose. The CV lists 10.26481/mup.rep.sem.2501.10 for the SEM
 * policy brief, but that DOI is not registered — doi.org reports "DOI does not
 * exist", and neither Crossref nor DataCite hold a record. A DOI link that
 * 404s is worse than none on a page a committee checks, so the chapter is
 * cited without one until a registered DOI exists.
 */
export const doiOverrides: Record<string, string> = {};

/** Pages missing from the ORCID record. */
export const pagesOverrides: Record<string, string> = {
  mahr2025: "69-76",
};

/**
 * Author position as printed by the publisher, for the rare case where the
 * ORCID contributor order does not match. Empty by default: positions are
 * derived from the ORCID author list during sync.
 */
export const authorPositionOverrides: Record<string, number> = {};

/* ──────────────────── works not held in ORCID ──────────────────── */

/** Compact constructor for the many conference entries below. */
function conference(
  id: string,
  year: number,
  authors: string[],
  title: string,
  venue: string,
  note?: string,
): RawWork {
  const position = authors.findIndex((a) => a.startsWith("Heller,"));
  return {
    id,
    title,
    year,
    type: "conference" as PublicationSection,
    orcidType: "conference-presentation",
    venue: note ? `${venue} — ${note}` : venue,
    volume: null,
    issue: null,
    pages: null,
    doi: null,
    url: null,
    authors,
    authorPosition: position === -1 ? null : position + 1,
    authorCount: authors.length,
    isOpenAccess: null,
    oaStatus: null,
    oaUrl: null,
  };
}

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
    issue: "1",
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

  /* ── Academic keynotes ── */
  {
    id: "dipalma2023keynote",
    title: "The next frontier of digital experiences",
    year: 2023,
    type: "keynote" as PublicationSection,
    orcidType: "lecture-speech",
    venue: "Frontiers in Services Conference, Maastricht, The Netherlands",
    volume: null,
    issue: null,
    pages: null,
    doi: null,
    url: null,
    authors: ["Di Palma, R.", "Fung, S.", "Heller, J.", "Hilken, T.", "Mahr, D."],
    authorPosition: 3,
    authorCount: 5,
    isOpenAccess: null,
    oaStatus: null,
    oaUrl: null,
  },
  {
    id: "rauschnabel2022keynote",
    title: "Towards a framework for augmented reality engagement",
    year: 2022,
    type: "keynote" as PublicationSection,
    orcidType: "lecture-speech",
    venue: "7th International AR/VR Conference, Lisbon, Portugal",
    volume: null,
    issue: null,
    pages: null,
    doi: null,
    url: null,
    authors: ["Rauschnabel, P. A.", "Felix, R.", "Heller, J.", "Hinsch, C."],
    authorPosition: 3,
    authorCount: 4,
    isOpenAccess: null,
    oaStatus: null,
    oaUrl: null,
  },

  /* ── Conference presentations (10th International XR-Metaverse, 2025) ── */
  conference(
    "hilken2025xr",
    2025,
    ["Hilken, T.", "Chylinski, M.", "Heller, J.", "Alimamy, S.", "Mahr, D."],
    "Virtual time travel: How virtual reality shapes consumer memory and drives nostalgia for past experiences",
    "10th International XR-Metaverse Conference, Maastricht, The Netherlands",
  ),
  conference(
    "dipalma2025xr",
    2025,
    ["Di Palma, R.", "Mahr, D.", "Hilken, T.", "Heller, J.", "Beausaert, S."],
    "Using virtual reality to reimagine service recovery training for frontline employees",
    "10th International XR-Metaverse Conference, Maastricht, The Netherlands",
  ),
  conference(
    "heller2025xrbuying",
    2025,
    ["Heller, J.", "Rozemeijer, F.", "Mahr, D."],
    "The future of buying: Immersive technologies to transform purchasing and supply management — A conceptual framework and future research directions",
    "10th International XR-Metaverse Conference, Maastricht, The Netherlands",
  ),
  conference(
    "heller2025xrcognitive",
    2025,
    ["Heller, J.", "Köcher, S.", "Köcher, S.", "Ciuchita, R."],
    "You win some, you lose some: Performing a cognitive task in virtual reality increases task enjoyment but decreases task performance",
    "10th International XR-Metaverse Conference, Maastricht, The Netherlands",
  ),
  conference(
    "bos2025xr",
    2025,
    ["Bos, S.", "Brüggen, E.", "Heller, J.", "van der Werf, M."],
    "Empathic by design: Can virtual reality change our attitudes and behaviour towards people living in poverty?",
    "10th International XR-Metaverse Conference, Maastricht, The Netherlands",
  ),
  conference(
    "ravi2025xr",
    2025,
    [
      "Vara Prasad Ravi, J.",
      "Meyer, J.-H.",
      "Heller, J.",
      "Hilken, T.",
      "Palau-Saumell, R.",
      "Mahr, D.",
    ],
    "Understanding individuals' service satisfaction with virtual generative agents through their expressed emotions relative to agent interface and interaction style",
    "10th International XR-Metaverse Conference, Maastricht, The Netherlands",
  ),
  conference(
    "heller2025xrretail",
    2025,
    ["Heller, J.", "Hilken, T.", "Rauschnabel, P. A.", "Di Palma, R.", "Mahr, D."],
    "The role of augmented reality in online retail: Examining control modalities and product types",
    "10th International XR-Metaverse Conference, Maastricht, The Netherlands",
  ),
  conference(
    "humdi2025xr",
    2025,
    ["Humdi, I.", "Hilken, T.", "Heller, J.", "Mahr, D."],
    "Shaping experiences: How avatar customization influences immersion and performance across platforms",
    "10th International XR-Metaverse Conference, Maastricht, The Netherlands",
  ),
  conference(
    "andonopoulos2025xr",
    2025,
    ["Andonopoulos, V.", "Heller, J."],
    "Conceptualizing human–computer interaction in the metaverse: A socio-technical systems approach to embodied interaction",
    "10th International XR-Metaverse Conference, Maastricht, The Netherlands",
  ),

  /* ── Other 2025 conferences ── */
  conference(
    "kies2025quis",
    2025,
    ["Kies, A.", "Hilken, T.", "Heller, J.", "Paluch, S."],
    "When cyborgs serve better: Improving service quality through brain–computer interface-enhanced frontline employees",
    "QUIS 2025 — 19th International Research Symposium on Service Excellence in Management, Rome, Italy",
    "Extended abstract",
  ),
  conference(
    "heller2025ama",
    2025,
    ["Heller, J.", "Köcher, S.", "Ciuchita, R.", "Köcher, S."],
    "You win some, you lose some: Performing a cognitive task in virtual reality increases task enjoyment but decreases task performance",
    "2025 AMA Winter Academic Conference",
    "Competitive paper, Track: Artificial Intelligence and Technology",
  ),

  /* ── 2024 ── */
  conference(
    "kies2024frontiers",
    2024,
    ["Kies, A.", "Hilken, T.", "Heller, J.", "Paluch, S."],
    "“Mind over matter”: Harnessing brain–computer interfaces for enhancing frontline employee performance",
    "Frontiers in Service Conference, Bordeaux, France",
  ),
  conference(
    "moonen2024frontiers",
    2024,
    ["Moonen, N.", "Heller, J.", "Hilken, T.", "Han, D.-I. D.", "Mahr, D."],
    "Immersion or social presence? Investigating the effect of virtual reality immersive environments on sommelier learning experiences",
    "Frontiers in Service Conference, Bordeaux, France",
  ),

  /* ── 2023 ── */
  conference(
    "kies2023frontiers",
    2023,
    ["Kies, A.", "Hilken, T.", "Heller, J.", "Paluch, S."],
    "“Just think about it!”: Exploring brain–computer interfaces for frontline employee use",
    "Frontiers in Services Conference, Maastricht, The Netherlands",
  ),
  conference(
    "dipalma2023frontiers",
    2023,
    ["Di Palma, R.", "Mahr, D.", "Beausaert, S.", "Hilken, T.", "Heller, J."],
    "Training service employees' communication skills in virtual reality",
    "Frontiers in Services Conference, Maastricht, The Netherlands",
  ),
  conference(
    "hilken2023frontiers",
    2023,
    ["Hilken, T.", "Chylinski, M.", "Heller, J.", "de Ruyter, K.", "Keeling, D. I.", "Mahr, D."],
    "Creative smart service experiences with augmented reality",
    "Frontiers in Services Conference, Maastricht, The Netherlands",
  ),
  conference(
    "heller2023frontiers",
    2023,
    [
      "Heller, J.",
      "Schaap, E.",
      "Mahr, D.",
      "de Ruyter, K.",
      "Hilken, T.",
      "Keeling, D. I.",
      "Chylinski, M.",
    ],
    "An interdisciplinary co-authorship networking perspective on AR and human behavior: Taking stock and moving ahead",
    "Frontiers in Services Conference, Maastricht, The Netherlands",
  ),
  conference(
    "windhausen2023arvr",
    2023,
    ["Windhausen, A.", "Heller, J.", "Hilken, T.", "Mahr, D."],
    "AR smart glasses: The impact on order pickers' well-being in supply chain logistics",
    "8th International AR/VR Conference, Las Vegas, USA",
    "Track: When XR Meets the Metaverse",
  ),
  conference(
    "rossel2023arvr",
    2023,
    ["Rössel, R.", "Hilken, T.", "Heller, J.", "Mahr, D."],
    "Here, try out this filter: The impact of social media influencers on customer engagement and perceived authenticity of augmented reality marketing",
    "8th International AR/VR Conference, Las Vegas, USA",
    "Track: Marketing/Retail/UX",
  ),
  conference(
    "dipalma2023arvr",
    2023,
    ["Di Palma, R.", "Mahr, D.", "Hilken, T.", "Heller, J."],
    "Exploring the effects of virtual reality presentation skills training on students' motivation outcomes",
    "8th International AR/VR Conference, Las Vegas, USA",
    "Track: Education, Training & Presentations",
  ),

  /* ── 2022 ── */
  conference(
    "schwarz2022arvr",
    2022,
    ["Schwarz, C.", "Hilken, T.", "Heller, J."],
    "The AR–AI interface: Exploring self-based recommender systems in augmented reality for customer decision-making",
    "7th International AR/VR Conference, Lisbon, Portugal",
    "Track: XR Marketing Retail – UX",
  ),
  conference(
    "heller2022arvr",
    2022,
    ["Heller, J.", "Brüggen, E.", "Chylinski, M.", "de Ruyter, K.", "Mahr, D.", "Keeling, D. I."],
    "Visualizing the future: Exploring the impact of augmented reality on subjective time until retirement and the mediating role of imagining your future self",
    "7th International AR/VR Conference, Lisbon, Portugal",
    "Track: XR Psychology & Cognitive Behaviors",
  ),

  /* ── 2020 and earlier ── */
  conference(
    "zimmermann2020arvr",
    2020,
    [
      "Zimmermann, A.",
      "Hilken, T.",
      "Heller, J.",
      "Mahr, D.",
      "Chylinski, M.",
      "Keeling, D. I.",
      "de Ruyter, K.",
    ],
    "The AR–AI interface: Exploring visual search in augmented reality for enhanced customer decision-making",
    "6th International AR/VR Conference (online)",
    "Track: Consumer Behavior",
  ),
  conference(
    "heller2019arvr",
    2019,
    ["Heller, J.", "Chylinski, M.", "de Ruyter, K.", "Mahr, D.", "Keeling, D. I."],
    "Augment your forces, enlighten your customers: Augmented reality at the organizational frontline",
    "5th International AR/VR Conference, Munich, Germany",
    "Track: Human Resources",
  ),
  conference(
    "vanesch2018anzmac",
    2018,
    ["van Esch, P.", "Heller, J."],
    "The effects of inner packaging colour",
    "ANZMAC, Adelaide, Australia",
    "Abstract, Track: Food, Wine and Leisure Marketing — Best Paper Award",
  ),
  conference(
    "vanesch2017ams",
    2017,
    ["van Esch, P.", "Northey, G.", "Yang, S.", "Heller, J."],
    "Religious cognition in social marketing campaigns: Saviour or pariah?",
    "Academy of Marketing Science World Marketing Congress, Christchurch, New Zealand",
    "Competitive paper",
  ),
  conference(
    "vanesch2016anzmac",
    2016,
    [
      "van Esch, P.",
      "Northey, G.",
      "Chylinski, M.",
      "de Ruyter, K.",
      "Sinha, A.",
      "Hilken, T.",
      "Heller, J.",
    ],
    "Augmented reality: Consumer saviour or disruptive agent in the retail power pendulum?",
    "ANZMAC, Christchurch, New Zealand",
    "Competitive paper, Track: Retailing & Distribution",
  ),
  conference(
    "heller2016ipsera",
    2016,
    ["Heller, J.", "Rozemeijer, F.", "Quintens, L."],
    "Buyers better be social: An empirical study on the impact of social media use on buyer's job performance",
    "IPSERA Conference, Dortmund, Germany",
  ),
];

/* ─────────────────────────── under review ─────────────────────────── */

export type ManuscriptStatus =
  | "Under Review"
  | "Revise and Resubmit"
  | "Accepted"
  | "In Preparation";

export interface Manuscript {
  title: string;
  /** Target journal. */
  outlet: string;
  status: ManuscriptStatus;
  authors?: string;
  /** Extra detail, e.g. "2nd round". */
  note?: string;
}

/**
 * Manuscripts in the review process. German appointment committees expect this
 * section; it is rendered only when non-empty.
 */
export const underReview: Manuscript[] = [
  {
    title:
      "When should we use virtual reality? Comparing immersive and non-immersive perspective-taking in poverty simulations",
    authors: "Bos, S., Brüggen, E., Heller, J., van der Werf, M.",
    outlet: "Computers in Human Behavior",
    status: "Under Review",
    note: "2nd round",
  },
  {
    title:
      "Perspective-taking and meaning-making among public policy professionals experiencing an immersive poverty narrative",
    authors: "Bos, S., Brüggen, E., Heller, J., van der Werf, M.",
    outlet: "Humanities and Social Sciences Communications",
    status: "Under Review",
    note: "2nd round",
  },
  {
    title:
      "From augmentation to autonomization: A longitudinal multiple case study of dynamic capability development for AI-enabled procurement transformation",
    authors: "Herold, S., Heller, J., Rozemeijer, F., Mahr, D.",
    outlet: "Journal of Supply Chain Management",
    status: "Revise and Resubmit",
    note: "Major revision",
  },
  {
    title:
      "Effective immediately? A mixed-methods study of immediate feedback in virtual reality training systems",
    authors: "Di Palma, R., Beausaert, S., Mahr, D., Hilken, T., Heller, J.",
    outlet: "International Journal of Human–Computer Interaction",
    status: "Under Review",
  },
];

/** Manuscripts being prepared for submission. */
export const inPreparation: Manuscript[] = [
  {
    title:
      "Enterprise metaverse meetings: The role of device heterogeneity for creative teams' performance and perception",
    authors: "Heller, J., Hilken, T., Aliman, D. N., Hennig-Thurau, T.",
    outlet: "Academy of Management Journal",
    status: "In Preparation",
  },
  {
    title:
      "Meeting your future self: Exploring the impact of augmented reality on psychological connectedness and financial decision-making",
    authors: "Heller, J., Hilken, T., Mahr, D., Brüggen, E.",
    outlet: "Journal of Marketing Research",
    status: "In Preparation",
  },
  {
    title:
      "You win some, you lose some: Performing a cognitive task in virtual reality increases task enjoyment but decreases task performance",
    authors: "Heller, J., Köcher, S., Ciuchita, R., Köcher, S.",
    outlet: "Computers in Human Behavior",
    status: "In Preparation",
  },
];
