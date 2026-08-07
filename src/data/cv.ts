/**
 * CV data, shared by /cv and /academic.
 *
 * Funding is split into three tables with separate subtotals (P3.3): mixing a
 * €2,500 event grant into the same list as a Marie Skłodowska-Curie fellowship
 * is what made the old aggregate figure look inflated.
 */

/* ─────────────────────────── profile ─────────────────────────── */

/**
 * Job title as it should appear everywhere. "Assistant Professor" alone reads
 * as a non-tenured junior professorship to a German appointment committee.
 */
export const JOB_TITLE = "Tenured Assistant Professor (Universitair Docent 1), Marketing";

// The rank footnote shown beside the title lives in i18n as "cv.rankFootnote":
// it needs translating, so it must not also exist as a constant here.

// The research-focus paragraph lives in i18n as "academic.research": it is
// rendered on a trilingual page and so must not exist as an English constant
// here.

/* Profile links. Every surface imports these — hardcoding a profile URL is how
   the job title silently went stale in three layouts. */
export const ORCID = "0000-0002-3214-0724";
export const ORCID_PROFILE_URL = `https://orcid.org/${ORCID}`;
export const CRIS_URL = "https://cris.maastrichtuniversity.nl/en/persons/jonas-heller";
export const LINKEDIN_URL = "https://www.linkedin.com/in/hellerjonas/";
export const SCHOLAR_URL = "https://scholar.google.com/citations?user=NOSPtp8AAAAJ";

/**
 * Google Scholar metrics.
 *
 * Hand-maintained and therefore dated: Scholar has no API, and an undated
 * h-index on a CV goes stale silently. Always update `asOf` alongside the
 * numbers. Verified against the live profile on the date shown.
 */
export const SCHOLAR_METRICS = {
  citations: 4212,
  hIndex: 25,
  i10Index: 31,
  asOf: "2026-08",
} as const;

/* ───────────────────────── experience ───────────────────────── */

export const experience = [
  {
    period: "Oct 2020 – Present",
    title: "Tenured Assistant Professor (Universitair Docent 1)",
    org: "Maastricht University",
    detail:
      "Department of Marketing & Supply Chain Management, School of Business and Economics",
    extra: [
      "Co-Founder & Scientific Director of DEXLab — the first innovation laboratory at SBE focusing on AR, VR, AI, service robots, and neuroscientific tools (EEG, GSR, eye-tracking)",
      "Co-Founder of Limburg Immersive Technology Network (LIT Network)",
    ],
  },
  {
    period: "Jul 2022 – Feb 2023",
    title: "Scientific Researcher",
    org: "Jimdo (remote)",
    detail:
      "Research collaborations with academic institutes & quantitative data collection & analysis",
  },
  {
    period: "Oct 2019 – Oct 2020",
    title: "Post-doctoral Researcher",
    org: "Brightlands Institute for a Smart Society (BISS), Maastricht University",
  },
  {
    period: "Mar 2016 – Sep 2019",
    title: "Academic Tutor & Research Assistant",
    org: "University of New South Wales (UNSW), School of Marketing",
  },
  {
    period: "Apr 2014 – Jan 2016",
    title: "Academic Tutor & Lecturer",
    org: "Maastricht University, Marketing & Supply Chain Management",
  },
  {
    period: "Jun 2014 – Aug 2014",
    title: "Project Manager Logistics Services",
    org: "Zalando HQ, Berlin",
  },
  {
    period: "Feb 2014 – Apr 2014",
    title: "Process Manager",
    org: "Zalando, Mönchengladbach",
  },
  {
    period: "Feb 2013 – Jan 2014",
    title: "Project Manager Logistics Services",
    org: "Zalando HQ, Berlin",
  },
];

export const education = [
  {
    period: "Mar 2016 – Sep 2019",
    degree: "Ph.D. in Marketing",
    school: "University of New South Wales (UNSW)",
    detail:
      'Thesis: "Augmented reality\'s impact on consumer decision making in frontline services"',
    honors: "Top 10% dissertation · Dean's Award for Outstanding Dissertation",
    supervisors: "Supervisors: A/Prof. Mathew Chylinski & Prof. Ko de Ruyter",
  },
  {
    period: "Feb 2014 – Aug 2015",
    degree: "M.Sc. in International Business: Supply Chain Management",
    school: "Maastricht University",
    honors: "Cum laude · Top 5% Master thesis",
  },
  {
    period: "Sep 2009 – Aug 2012",
    degree: "B.Sc. in International Business",
    school: "Maastricht University",
    detail: "Major: Supply Chain Management · Minor: Finance",
  },
];

export const awards = [
  // The "up to 5 years post-PhD" qualifier is deliberately not repeated (P3.2):
  // self-labelling as early career undercuts a senior application. The
  // selectivity of the award is stated instead.
  {
    year: "2024",
    title: "SBE Junior Researcher Award",
    detail: "Awarded to one researcher at the School of Business and Economics",
  },
  {
    year: "2022",
    title: "SBE Team Science Award",
    detail: "Outstanding team science, awarded to the research group 'AugmentedReseARch'",
  },
  {
    year: "2020",
    title: "Dean's Award for Outstanding Dissertations, UNSW",
    detail:
      "Dissertation required no to minimal revisions and ranked in the best 10% according to all reviewers",
  },
  {
    year: "2020",
    title: "Service Special Interest Group (SERVSIG) Dissertation Award — Finalist",
  },
  {
    year: "2018",
    title: "Australian and New Zealand Marketing Academy (ANZMAC) Best Paper Award",
  },
  {
    year: "2018",
    title: "UNSW Postgraduate Council Outstanding Research Student Award",
    detail: "One of four winners among all research students across all UNSW faculties",
  },
  {
    year: "2018",
    title: "Winner, UNSW Business School Research Fair",
    detail: "PhD research presentation competition — 1st of 40 UNSW Business School PhD students",
  },
  {
    year: "2017",
    title: "Winner, ANZMAC Strategy Challenge Award",
    detail: "International PhD competition — 1st of all Australian and New Zealand business schools",
  },
  {
    year: "2017",
    title: "Competitive Advantage in a Digital Economy (CADE) Best Paper Award",
  },
  {
    year: "2016",
    title: "Excellence in Teaching Award, Maastricht University",
    detail: "Teaching evaluation average above 8.5/10 across all courses taught 2014–2016",
  },
];

/* ─────────────────────────── funding ─────────────────────────── */

export interface Grant {
  year: string;
  /** Funding body, kept separate from the project title so the table sorts. */
  funder: string;
  project: string;
  /**
   * Amount attributable to Jonas / to Maastricht University, in EUR. This is
   * the figure that feeds the subtotals — never the consortium total.
   */
  amount: number;
  /** PI · Co-PI · Work Package Lead · Co-Organizer. */
  role?: string;
  /**
   * Consortium volume, where the project is larger than the attributable
   * amount above. Rendered in the "total volume" column; `amount` then shows
   * as the own share.
   */
  totalVolume?: number;
  /** Free-text scope note, e.g. how a joint budget is split. */
  scope?: string;
  /** e.g. "2021–2023" */
  duration?: string;
}

export interface FundingTable {
  key: string;
  labelKey: string;
  noteKey?: string;
  grants: Grant[];
}

/** 1. External, competitively awarded funding. */
const externalCompetitive: Grant[] = [
  {
    year: "2025",
    funder: "ERASMUS+",
    project: "ATLAS.TI — Assisting Teaching and Learning with AI-based Solutions",
    amount: 35_000,
    role: "Work Package Lead (WP2)",
    totalVolume: 400_000,
    scope: "Maastricht University portion of a €400,000 consortium project",
  },
  {
    year: "2024",
    funder: "NETSPAR (via Institute GAK)",
    project: "Theme Grant: See4YourFutureSelf",
    amount: 350_000,
    role: "PI",
  },
  {
    year: "2023",
    funder: "Saudi Arabian Cultural Mission (SACM)",
    project:
      "PhD Project: Immersive Horizons — VR's Impact on Customer Engagement, Localization & Strategic Marketing",
    amount: 405_000,
    role: "PI",
  },
  {
    year: "2023",
    funder: "Zayed University, UAE",
    project:
      "Research Incentive Fund: Exploring how XR Technologies Support Value Co-creation in Service",
    amount: 80_000,
    role: "Co-PI",
  },
  {
    year: "2022",
    funder: "China Scholarship Council (CSC)",
    project: "PhD Grant: Digital Realities for Healthy and Sustainable Consumption",
    amount: 220_000,
    role: "Co-PI",
  },
  {
    year: "2022",
    funder: "Comenius (NRO)",
    project: "Teaching Fellowship: Technology-enhanced Personalized Feedback",
    amount: 50_000,
    role: "Co-PI",
  },
  {
    year: "2021",
    funder: "European Commission — Marie Skłodowska-Curie",
    project: "Individual Fellowship: AugmentPension",
    amount: 190_000,
    role: "PI",
  },
  {
    year: "2016",
    funder: "Australian Government",
    project: "International Postgraduate Research Scholarship",
    amount: 180_000,
    role: "PI",
  },
];

/** 2. Internal and strategic funding from UM, GSBE, SBE and UNSW. */
const internalStrategic: Grant[] = [
  {
    year: "2025",
    funder: "UM–Zuyd Strategic Investment Budget",
    project: "Growing Limburg Immersive Technologies Network (Year 2)",
    amount: 100_000,
    role: "Co-PI",
    scope: "50% Maastricht University / 50% Zuyd Hogeschool",
  },
  {
    year: "2025",
    funder: "GSBE",
    project: "PhD Co-funding — Maarten Ramaekers: Preparing Procurement for an AI Driven Future",
    amount: 50_000,
    role: "Co-PI",
  },
  {
    year: "2025",
    funder: "GSBE",
    project:
      "PhD Co-funding — Joana Fernandes Duhamel: Emerging Technologies & Future Self",
    amount: 72_637,
    role: "PI",
  },
  {
    year: "2024",
    funder: "UM–Zuyd Strategic Investment Budget",
    project: "Limburg Immersive Technologies Network (Year 1)",
    amount: 164_000,
    role: "Co-PI",
    scope: "50% Maastricht University / 50% Zuyd Hogeschool",
  },
  {
    year: "2023",
    funder: "SBE",
    project: "Education Innovation Voucher: Realistic Research Settings with AR and VR",
    amount: 10_000,
    role: "Co-PI",
  },
  {
    year: "2022",
    funder: "Maastricht University EDLAB",
    project: "VR Enhanced PBL",
    amount: 50_000,
    role: "Co-PI",
  },
  {
    year: "2022",
    funder: "SBE",
    project: "Education Innovation Voucher: Reality Check — Automated Student Feedback at SBE",
    amount: 10_000,
    role: "Co-PI",
  },
  {
    year: "2022",
    funder: "GSBE",
    project: "PhD Co-funding — Roberta di Palma: VR in Education",
    amount: 82_126,
    role: "Co-PI",
  },
  {
    year: "2021",
    funder: "GSBE",
    project: "PhD Co-funding — Silke Herold: Digital Procurement",
    amount: 46_649,
    role: "Co-PI",
  },
  {
    year: "2020",
    funder: "GSBE",
    project: "Small Scale Research Grant MSCM",
    amount: 4_000,
    role: "PI",
  },
  {
    year: "2019",
    funder: "UNSW",
    project: "Placement Scholarship for Research Excellence",
    amount: 1_900,
    role: "PI",
  },
  {
    year: "2016",
    funder: "UNSW BizLab",
    project: "4× Higher Degree Research Grants",
    amount: 7_500,
    role: "PI",
  },
  {
    year: "2016",
    funder: "UNSW Business School",
    project: "Supplementary Scholarship",
    amount: 22_000,
    role: "PI",
  },
];

/** 3. Conference and event funding. */
const eventFunding: Grant[] = [
  {
    year: "2025",
    funder: "SWOL",
    project: "Scientific Event Grant: 10th International XR Metaverse Conference",
    amount: 2_500,
    role: "Co-Organizer",
  },
  {
    year: "2025",
    funder: "GSBE",
    project: "Conference Funding: 10th International XR Metaverse Conference",
    amount: 2_500,
    role: "Co-Organizer",
  },
];

export const fundingTables: FundingTable[] = [
  { key: "external", labelKey: "cv.funding.external", grants: externalCompetitive },
  { key: "internal", labelKey: "cv.funding.internal", grants: internalStrategic },
  { key: "events", labelKey: "cv.funding.events", grants: eventFunding },
];

/**
 * Contract income rather than a grant, so it is reported separately and never
 * folded into the competitive total. Role: Co-PI.
 */
export const industryFunding = { since: "2022", amount: 50_000 };

const sum = (grants: Grant[]) => grants.reduce((total, g) => total + g.amount, 0);

export const FUNDING_STATS = {
  external: sum(externalCompetitive),
  internal: sum(internalStrategic),
  events: sum(eventFunding),
  /** All three tables combined; excludes industry contract income. */
  grantsTotal: sum(externalCompetitive) + sum(internalStrategic) + sum(eventFunding),
  grantCount: externalCompetitive.length + internalStrategic.length + eventFunding.length,
} as const;

export const subtotalFor = (key: string) =>
  key === "external"
    ? FUNDING_STATS.external
    : key === "internal"
      ? FUNDING_STATS.internal
      : FUNDING_STATS.events;

/** "€1.51M" / "€350K" — compact, locale-neutral. */
export function formatEur(amount: number): string {
  if (amount >= 1_000_000) return `€${(amount / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  if (amount >= 1_000) return `€${Math.round(amount / 1_000)}K`;
  return `€${amount}`;
}

/** "€190,000" — exact, for table rows. */
export function formatEurExact(amount: number): string {
  return `€${amount.toLocaleString("en-US")}`;
}

/* ─────────────────────────── teaching ─────────────────────────── */

export type TeachingRole = "Course Coordinator" | "Tutor" | "Lecturer" | "Coordinator & Tutor";

export interface Course {
  name: string;
  years?: string;
  role?: TeachingRole;
  /** Students per cohort. */
  cohort?: number;
  /** ECTS credits, or contact hours where ECTS does not apply. */
  ects?: number;
  evaluation?: string;
}

export interface TeachingGroup {
  institution: string;
  note?: string;
  courses: Course[];
}

export const teaching: TeachingGroup[] = [
  {
    institution: "Maastricht University — Course Coordination & Tutoring (since 2020)",
    courses: [
      {
        name: "Bachelor's Thesis Supervision",
        years: "2025",
        role: "Course Coordinator",
        evaluation: "9.2/10",
      },
      {
        name: "B.Sc. Marketing Management",
        years: "2024, 2025",
        role: "Coordinator & Tutor",
        evaluation: "6.4/10",
      },
      {
        name: "B.Sc. Marketing Research and Supply Chain Management",
        years: "2024",
        role: "Coordinator & Tutor",
        evaluation: "8.2/10",
      },
      {
        name: "B.Sc. Customer-Centric Supply Chain Management",
        years: "2021",
        role: "Coordinator & Tutor",
        evaluation: "7.7/10",
      },
      {
        name: "M.Sc. Supply Chain Relationships",
        years: "2020, 2021",
        role: "Coordinator & Tutor",
        evaluation: "8.7/10",
      },
    ],
  },
  {
    institution: "Maastricht University — Tutor (2014–2016)",
    note: "Average 8.5/10 across all courses (10 is best)",
    courses: [
      { name: "Fundamentals of Supply Chain Management", years: "2014, 2015", role: "Tutor" },
      { name: "Management of Organizations & Marketing", years: "2014, 2015", role: "Tutor" },
      { name: "Marketing Management", years: "2014, 2015", role: "Tutor" },
      { name: "Marketing & Supply Chain Management Tutorial", years: "2015", role: "Tutor" },
    ],
  },
  {
    institution: "University of New South Wales — Lecturer (2016–2019)",
    note: "Average 5.4/6 (6 is best)",
    courses: [
      {
        name: "Consumer Behavior seminar",
        years: "2016, 2017, 2018",
        role: "Lecturer",
        evaluation: "5.3/6",
      },
      {
        name: "Marketing Research seminar",
        years: "2016, S1 2018, S2 2018",
        role: "Lecturer",
        evaluation: "5.5/6",
      },
      { name: "Laboratory Staff Training on Emerging Technologies", years: "2018", role: "Lecturer" },
    ],
  },
  {
    institution: "Executive Education (via DEXLab)",
    note: "Selected clients: Allianz Insurance, APG, ANWR, CBS, Dutch Ministry of I&W, MSM, UM, UMIO",
    courses: [
      { name: "MBA Digital Strategy", role: "Lecturer" },
      {
        name: "Executive workshops and in-company training on emerging technologies",
        role: "Lecturer",
      },
    ],
  },
];

/* ─────────────────────── supervision & service ─────────────────────── */

/**
 * Teaching and working languages.
 *
 * German is his first language and he already delivers keynotes in German and
 * English — see the speaking page. Dutch is deliberately listed as a working
 * language only, not a teaching language, because that is a stronger claim
 * and has not been confirmed.
 */
export const languages = {
  teaching: ["German (native)", "English (fluent)"],
  working: ["Dutch"],
};

export const supervision = {
  current: [
    'Maarten Ramaekers — "Preparing Procurement for an AI driven future" (with Prof. D. Mahr & Prof. F. Rozemeijer)',
    'Joana Duhamel — "Emerging Technologies for future-self connectedness" (with Dr. Tim Hilken & Prof. Max Louwerse)',
    'Imbrahim Humdi — "VR in hedonic service settings" (with Prof. D. Mahr & Dr. Tim Hilken)',
    'Stefan Bos — "Immersive Technologies to combat poverty" (with Prof. E. Brüggen & Dr. Minou van der Werf)',
    'Roberta di Palma — "VR in Education & Service Marketing" (with Prof. D. Mahr, Dr. Tim Hilken & Prof. Simon Beausaert)',
  ],
  completed: [
    'Silke Herold — "Digital Procurement" (with Prof. D. Mahr & Prof. F. Rozemeijer) — Graduated 2025',
  ],
  other: [
    "50+ Master's and 10+ Bachelor's thesis students supervised on marketing, service, and supply chain management topics (since 2020)",
    "Co-supervised UNSW honours student (A. Carrozzi, 2018–2019) — thesis published in the Journal of Interactive Marketing",
    "International co-supervision and project-level doctoral collaboration beyond Maastricht University",
  ],
};

export const citizenship = [
  "Member of the Maastricht Young Academy (2026–present)",
  'Columnist for Maastricht University Newspaper "Observant" (2025–present)',
  "Member of Assessment Committee of Learning, SBE, Maastricht University (2024–present)",
  "Junior group representative, MSCM department, SBE, Maastricht University (2023/2024)",
];

export const reviewingJournals = [
  "Journal of the Academy of Marketing Science",
  "Journal of Consumer Psychology",
  "Journal of Service Research",
  "Journal of Retailing",
  "Journal of Services Marketing",
  "Journal of Business Research",
  "Journal of Service Management",
  "European Journal of Marketing",
  "Technology, Mind, and Behavior",
  "Australian Journal of Management",
  "International Journal of Human-Computer Studies",
  "Virtual Reality",
  "Computers in Human Behavior",
  "Journal of Wine Research",
];
