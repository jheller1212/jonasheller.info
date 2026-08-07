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
export const JOB_TITLE_SHORT = "Tenured Assistant Professor of Marketing";

/** Shown wherever the title appears; explains the Dutch rank. */
export const RANK_FOOTNOTE =
  "Universitair Docent 1 is the tenured senior rank below Associate Professor in the Dutch academic system.";

export const ORCID = "0000-0002-3214-0724";
export const CRIS_URL = "https://cris.maastrichtuniversity.nl/en/persons/jonas-heller";
export const LINKEDIN_URL = "https://www.linkedin.com/in/hellerjonas/";

/* ───────────────────────── experience ───────────────────────── */

export const experience = [
  {
    period: "Oct 2020 – Present",
    title: "Assistant Professor (tenured, Universitair Docent 1)",
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
  // The "within 5 years post-PhD" qualifier was removed deliberately (P3.2):
  // self-labelling as early career undercuts a senior application.
  { year: "2024", title: "SBE Junior Researcher Award" },
  { year: "2022", title: "SBE Team Science Award", detail: "Awarded to research group 'AugmentedReseARch'" },
  { year: "2020", title: "Dean's Award for Outstanding Dissertations, UNSW", detail: "Top 10% dissertation" },
  { year: "2020", title: "SERVSIG Dissertation Award Finalist" },
  { year: "2018", title: "ANZMAC Best Paper Award" },
  { year: "2018", title: "UNSW Outstanding Research Student Award", detail: "Awarded to 4 students across all faculties" },
  { year: "2018", title: "UNSW Business School Research Fair Winner" },
  { year: "2017", title: "ANZMAC Strategy Challenge Award" },
  { year: "2017", title: "CADE Best Paper Award" },
  { year: "2016", title: "Excellence in Teaching Award, Maastricht University", detail: "Average above 8.5/10 across all courses (2014–2016)" },
];

/* ─────────────────────────── funding ─────────────────────────── */

export interface Grant {
  year: string;
  /** Funding body, kept separate from the project title so the table sorts. */
  funder: string;
  project: string;
  /** Total volume of the grant in EUR. */
  amount: number;
  /** PI · Co-PI · Work Package Lead · Supervisor · Holder. To be completed. */
  role?: string;
  /** Share attributable to Jonas, in EUR, where it differs from the total. */
  ownShare?: number;
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
    project: "ATLAS.TI — AI-based Solutions for Teaching & Learning",
    amount: 35_000,
  },
  {
    year: "2024",
    funder: "NETSPAR (via Institute GAK)",
    project: "Theme Grant: See4YourFutureSelf",
    amount: 350_000,
  },
  {
    year: "2023",
    funder: "SACM",
    project: "PhD Project: Immersive Horizons",
    amount: 405_000,
  },
  {
    year: "2023",
    funder: "Zayed University",
    project: "Research Incentive Fund: XR & Value Co-creation",
    amount: 80_000,
  },
  {
    year: "2022",
    funder: "China Scholarship Council (CSC)",
    project: "PhD Grant: Digital Realities for Healthy & Sustainable Consumption",
    amount: 220_000,
  },
  {
    year: "2022",
    funder: "Comenius (NRO)",
    project: "Teaching Fellowship: Tech-enhanced Personalized Feedback",
    amount: 50_000,
  },
  {
    year: "2021",
    funder: "European Commission — Marie Skłodowska-Curie",
    project: "Individual Fellowship: AugmentPension",
    amount: 190_000,
    role: "PI (Fellow)",
  },
  {
    year: "2016",
    funder: "Australian Government",
    project: "International Postgraduate Research Scholarship",
    amount: 180_000,
    role: "Holder",
  },
];

/** 2. Internal and strategic funding from UM, GSBE, SBE and UNSW. */
const internalStrategic: Grant[] = [
  {
    year: "2025",
    funder: "UM–Zuyd Strategic Investment",
    project: "Growing LIT Network (Year 2)",
    amount: 100_000,
  },
  {
    year: "2025",
    funder: "GSBE",
    project: "PhD Co-funding — Maarten Ramaekers",
    amount: 50_000,
  },
  {
    year: "2025",
    funder: "GSBE",
    project: "PhD Co-funding — Joana Fernandes Duhamel",
    amount: 72_637,
  },
  {
    year: "2024",
    funder: "UM–Zuyd Strategic Investment",
    project: "LIT Network (Year 1)",
    amount: 164_000,
  },
  {
    year: "2023",
    funder: "SBE",
    project: "Education Innovation Voucher: AR & VR in Research",
    amount: 10_000,
  },
  {
    year: "2022",
    funder: "UM EDLAB",
    project: "VR Enhanced PBL",
    amount: 50_000,
  },
  {
    year: "2022",
    funder: "SBE",
    project: "Education Innovation Voucher: Automated Student Feedback",
    amount: 10_000,
  },
  {
    year: "2022",
    funder: "GSBE",
    project: "PhD Co-funding — Roberta di Palma",
    amount: 82_126,
  },
  {
    year: "2021",
    funder: "GSBE",
    project: "PhD Co-funding — Silke Herold",
    amount: 46_649,
  },
  {
    year: "2020",
    funder: "GSBE",
    project: "Small Scale Research Grant MSCM",
    amount: 4_000,
  },
  {
    year: "2019",
    funder: "UNSW",
    project: "Placement Scholarship for Research Excellence",
    amount: 1_900,
    role: "Holder",
  },
  {
    year: "2016",
    funder: "UNSW BizLab",
    project: "4× Higher Degree Research Grants",
    amount: 7_500,
  },
  {
    year: "2016",
    funder: "UNSW Business School",
    project: "Supplementary Scholarship",
    amount: 22_000,
    role: "Holder",
  },
];

/** 3. Conference and event funding. */
const eventFunding: Grant[] = [
  {
    year: "2025",
    funder: "SWOL",
    project: "Scientific Event Grant: 10th Intl. XR Metaverse Conference",
    amount: 2_500,
  },
  {
    year: "2025",
    funder: "GSBE",
    project: "Conference Funding: 10th Intl. XR Metaverse Conference",
    amount: 2_500,
  },
];

export const fundingTables: FundingTable[] = [
  { key: "external", labelKey: "cv.funding.external", grants: externalCompetitive },
  { key: "internal", labelKey: "cv.funding.internal", grants: internalStrategic },
  { key: "events", labelKey: "cv.funding.events", grants: eventFunding },
];

/**
 * Contract income rather than a grant, so it is reported separately and never
 * folded into the competitive total.
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
    institution: "Maastricht University — School of Business and Economics",
    courses: [
      {
        name: "B.Sc. Marketing Management",
        years: "2024, 2025",
        role: "Coordinator & Tutor",
        evaluation: "8.2/10",
      },
      {
        name: "B.Sc. Marketing Research & Supply Chain Management",
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
    institution: "Maastricht University — Tutor",
    note: "Average 8.5/10 across all courses",
    courses: [
      { name: "Fundamentals of Supply Chain Management", years: "2014–2016", role: "Tutor" },
      { name: "Management of Organizations & Marketing", years: "2014–2016", role: "Tutor" },
      { name: "Marketing Management", years: "2014–2016", role: "Tutor" },
      { name: "Marketing & Supply Chain Management Tutorial", years: "2014–2016", role: "Tutor" },
    ],
  },
  {
    institution: "University of New South Wales",
    note: "Average 5.4/6",
    courses: [
      { name: "Consumer Behavior seminar", years: "2016–2019", role: "Lecturer", evaluation: "5.3/6" },
      { name: "Marketing Research seminar", years: "2016–2019", role: "Lecturer", evaluation: "5.5/6" },
      { name: "Laboratory Staff Training on Emerging Technologies", years: "2016–2019", role: "Lecturer" },
    ],
  },
  {
    institution: "Executive Education (via DEXLab)",
    courses: [
      { name: "MBA Digital Strategy", role: "Lecturer" },
      { name: "Executive workshops and in-company training on emerging technologies" },
    ],
  },
];

/* ─────────────────────── supervision & service ─────────────────────── */

export const supervision = {
  current: [
    'Maarten Ramaekers — "Preparing Procurement for an AI driven future" (with Prof. D. Mahr & Prof. F. Rozemeijer)',
    'Joana Duhamel — "Emerging Technologies for future-self connectedness" (with Dr. Tim Hilken & Prof. Max Louwerse)',
    'Ibrahim Humdi — "VR in hedonic service settings" (with Prof. D. Mahr & Dr. Tim Hilken)',
    'Stefan Bos — "Immersive Technologies to combat poverty" (with Prof. E. Bruggen & Dr. Minou Werf)',
    'Roberta di Palma — "VR in Education & Service Marketing" (with Prof. D. Mahr, Dr. Tim Hilken & Prof. Simon Beausaert)',
  ],
  completed: [
    'Silke Herold — "Digital Procurement" (with Prof. D. Mahr & Prof. F. Rozemeijer) — Graduated 2025',
  ],
  other: [
    "50+ Master thesis students supervised on marketing, service, and SCM topics",
    "Co-supervised UNSW honors student (A. Carrozzi) — thesis published in Journal of Interactive Marketing",
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
