"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/* ──────────────────────── data ──────────────────────── */

const experience = [
  {
    period: "Oct 2020 – Present",
    title: "Assistant Professor (tenured)",
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

const education = [
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

const awards = [
  { year: "2024", title: "SBE Junior Researcher Award", detail: "Awarded to a faculty member within 5 years post-PhD" },
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

const funding = [
  { year: "2025", project: 'ERASMUS+ "ATLAS.TI — AI-based Solutions for Teaching & Learning"', amount: "€35,000" },
  { year: "2025", project: "UM–Zuyd Strategic Investment: Growing LIT Network (Year 2)", amount: "€100,000" },
  { year: "2025", project: "GSBE PhD Co-funding — Maarten Ramaekers", amount: "€50,000" },
  { year: "2025", project: "GSBE PhD Co-funding — Joana Fernandes Duhamel", amount: "€72,637" },
  { year: "2025", project: 'SWOL Scientific Event Grant "10th Intl. XR Metaverse Conference"', amount: "€2,500" },
  { year: "2025", project: 'GSBE Conference Funding "10th Intl. XR Metaverse Conference"', amount: "€2,500" },
  { year: "2024", project: 'NETSPAR Theme Grant (via Institute GAK): "See4YourFutureSelf"', amount: "€350,000" },
  { year: "2024", project: "UM–Zuyd Strategic Investment: LIT Network (Year 1)", amount: "€164,000" },
  { year: "2023", project: 'SACM PhD Project: "Immersive Horizons"', amount: "€405,000" },
  { year: "2023", project: 'Zayed University Research Incentive Fund: "XR & Value Co-creation"', amount: "€80,000" },
  { year: "2023", project: 'SBE Education Innovation Voucher: "AR & VR in Research"', amount: "€10,000" },
  { year: "2022", project: 'UM EDLAB: "VR Enhanced PBL"', amount: "€50,000" },
  { year: "2022", project: 'CSC PhD Grant: "Digital Realities for Healthy & Sustainable Consumption"', amount: "€220,000" },
  { year: "2022", project: 'Comenius Teaching Fellowship: "Tech-enhanced Personalized Feedback"', amount: "€50,000" },
  { year: "2022", project: 'SBE Education Innovation Voucher: "Automated Student Feedback"', amount: "€10,000" },
  { year: "2022", project: "GSBE PhD Co-funding — Roberta di Palma", amount: "€82,126" },
  { year: "2021", project: 'Marie Curie Individual Fellowship "AugmentPension"', amount: "€190,000" },
  { year: "2021", project: "GSBE PhD Co-funding — Silke Herold", amount: "€46,649" },
  { year: "2020", project: "GSBE Small Scale Research Grant MSCM", amount: "€4,000" },
  { year: "2019", project: "UNSW Placement Scholarship for Research Excellence", amount: "€1,900" },
  { year: "2016", project: "4× UNSW BizLab Higher Degree Research Grants", amount: "€7,500" },
  { year: "2016", project: "International Postgraduate Research Scholarship", amount: "€180,000" },
  { year: "2016", project: "UNSW Business School Supplementary Scholarship", amount: "€22,000" },
  { year: "2022–", project: "Ongoing: Industry funding for DEXLab workshops", amount: "€50,000" },
];

const teaching = [
  {
    institution: "Maastricht University — Coordinator & Tutor",
    courses: [
      "B.Sc. Marketing Management (2024, 2025) — 8.2/10",
      "B.Sc. Marketing Research & Supply Chain Management (2024) — 8.2/10",
      "B.Sc. Customer-Centric Supply Chain Management (2021) — 7.7/10",
      "M.Sc. Supply Chain Relationships (2020, 2021) — 8.7/10",
    ],
  },
  {
    institution: "Executive Education (via DEXLab)",
    courses: [
      "MBA Digital Strategy, executive workshops, in-company trainings on emerging technologies",
      "Clients include: Allianz Insurance, APG, ANWR, CBS, Dutch Ministry of I&W, MSM, UM, UMIO",
    ],
  },
  {
    institution: "Maastricht University — Tutor (2014–2016, avg 8.5/10)",
    courses: [
      "Fundamentals of Supply Chain Management",
      "Management of Organizations & Marketing",
      "Marketing Management",
      "Marketing & Supply Chain Management Tutorial",
    ],
  },
  {
    institution: "University of New South Wales — Lecturer (2016–2019, avg 5.4/6)",
    courses: [
      "Consumer Behavior seminar — 5.3/6",
      "Marketing Research seminar — 5.5/6",
      "Laboratory Staff Training on Emerging Technologies",
    ],
  },
];

const supervision = {
  current: [
    "Maarten Ramaekers — \"Preparing Procurement for an AI driven future\" (with Prof. D. Mahr & Prof. F. Rozemeijer)",
    "Joana Duhamel — \"Emerging Technologies for future-self connectedness\" (with Dr. Tim Hilken & Prof. Max Louwerse)",
    "Ibrahim Humdi — \"VR in hedonic service settings\" (with Prof. D. Mahr & Dr. Tim Hilken)",
    "Stefan Bos — \"Immersive Technologies to combat poverty\" (with Prof. E. Bruggen & Dr. Minou Werf)",
    "Roberta di Palma — \"VR in Education & Service Marketing\" (with Prof. D. Mahr, Dr. Tim Hilken & Prof. Simon Beausseart)",
  ],
  completed: [
    "Silke Herold — \"Digital Procurement\" (with Prof. D. Mahr & Prof. F. Rozemeijer) — Graduated 2025",
  ],
  other: [
    "50+ Master thesis students supervised on marketing, service, and SCM topics",
    "Co-supervised UNSW honors student (A. Carrozzi) — thesis published in Journal of Interactive Marketing",
    "International co-supervision and project-level doctoral collaboration beyond Maastricht University",
  ],
};

const citizenship = [
  "Member of the Maastricht Young Academy (2026–present)",
  "Columnist for Maastricht University Newspaper \"Observant\" (2025–present)",
  "Member of Assessment Committee of Learning, SBE, Maastricht University (2024–present)",
  "Junior group representative, MSCM department, SBE, Maastricht University (2023/2024)",
];

const reviewingJournals = [
  "Journal of Academy of Marketing Science",
  "Journal of Consumer Psychology",
  "Journal of Service Research",
  "Journal of Retailing",
  "Journal of Service Marketing",
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

/* ──────────────────── components ─────────────────────── */

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <p
        className="text-sm font-semibold tracking-widest uppercase mb-2"
        style={{ color: "var(--color-accent-secondary)" }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-2xl sm:text-3xl font-bold tracking-tight"
        style={{ color: "var(--color-text)" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

/* ───────────────────── page ──────────────────────────── */

export default function CVPage() {
  const [showAllFunding, setShowAllFunding] = useState(false);
  const displayedFunding = showAllFunding ? funding : funding.slice(0, 8);

  return (
    <>
      <Nav />
      <main className="font-[family-name:var(--font-geist-sans)] pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-accent-secondary)" }}
            >
              Curriculum Vitae
            </p>
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
              style={{ color: "var(--color-text)" }}
            >
              Dr. Jonas Heller
            </h1>
            <p
              className="text-lg leading-relaxed max-w-3xl"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Tenured Assistant Professor in Marketing at Maastricht University.
              Co-Founder &amp; Scientific Director of DEXLab and Co-Founder of
              the Limburg Immersive Technologies Network.
            </p>
            <div
              className="flex flex-wrap gap-4 mt-4 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <span>Maastricht, NL</span>
              <a
                href="#contact"
                className="hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent)" }}
              >
                Contact Form
              </a>
              <a
                href="https://www.linkedin.com/in/hellerjonas/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent)" }}
              >
                LinkedIn
              </a>
              <a
                href="https://scholar.google.com/citations?user=NOSPtp8AAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent)" }}
              >
                Google Scholar
              </a>
              <a
                href="https://orcid.org/0000-0002-7183-7045"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent)" }}
              >
                ORCID
              </a>
            </div>
          </motion.div>

          {/* Professional Experience */}
          <section className="mb-16">
            <SectionHeading eyebrow="Experience" title="Professional Experience" />
            <div className="space-y-6">
              {experience.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                    <h3
                      className="font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {item.title}
                    </h3>
                    <span
                      className="text-xs shrink-0"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm mb-1" style={{ color: "var(--color-accent)" }}>
                    {item.org}
                  </p>
                  {item.detail && (
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {item.detail}
                    </p>
                  )}
                  {item.extra && (
                    <ul className="mt-2 space-y-1">
                      {item.extra.map((e, j) => (
                        <li
                          key={j}
                          className="text-sm pl-4 relative before:content-['–'] before:absolute before:left-0"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {e}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-16">
            <SectionHeading eyebrow="Education" title="Academic Degrees" />
            <div className="space-y-6">
              {education.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                    <h3
                      className="font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {item.degree}
                    </h3>
                    <span
                      className="text-xs shrink-0"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm mb-1" style={{ color: "var(--color-accent)" }}>
                    {item.school}
                  </p>
                  {item.detail && (
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {item.detail}
                    </p>
                  )}
                  {item.honors && (
                    <p
                      className="text-sm font-medium mt-1"
                      style={{ color: "var(--color-accent-secondary)" }}
                    >
                      {item.honors}
                    </p>
                  )}
                  {item.supervisors && (
                    <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>
                      {item.supervisors}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Awards */}
          <section className="mb-16">
            <SectionHeading eyebrow="Recognition" title="Awards & Honors" />
            <div className="space-y-3">
              {awards.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-start gap-3"
                >
                  <span
                    className="text-xs font-mono shrink-0 pt-0.5"
                    style={{ color: "var(--color-accent-secondary)" }}
                  >
                    {item.year}
                  </span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
                      {item.title}
                    </p>
                    {item.detail && (
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
                        {item.detail}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Funding */}
          <section className="mb-16">
            <SectionHeading eyebrow="Funding" title="Grants & Scholarships" />
            <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
              Total competitive funding acquired: <strong style={{ color: "var(--color-accent-secondary)" }}>&gt; €2.1 million</strong>
            </p>
            <div className="space-y-2">
              {displayedFunding.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  className="glass-card rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="text-xs font-mono shrink-0 pt-0.5"
                      style={{ color: "var(--color-accent-secondary)" }}
                    >
                      {item.year}
                    </span>
                    <p className="text-sm" style={{ color: "var(--color-text)" }}>
                      {item.project}
                    </p>
                  </div>
                  <span
                    className="text-sm font-semibold shrink-0"
                    style={{ color: "var(--color-text)" }}
                  >
                    {item.amount}
                  </span>
                </motion.div>
              ))}
            </div>
            {funding.length > 8 && (
              <div className="mt-6 text-center">
                <button
                  className="px-6 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text)",
                  }}
                  onClick={() => setShowAllFunding(!showAllFunding)}
                >
                  {showAllFunding ? "Show Less" : `Show All ${funding.length} Grants`}
                </button>
              </div>
            )}
          </section>

          {/* Teaching */}
          <section className="mb-16">
            <SectionHeading eyebrow="Teaching" title="Teaching Experience" />
            <div className="space-y-6">
              {teaching.map((group, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass-card rounded-xl p-6"
                >
                  <h3
                    className="font-semibold text-sm mb-3"
                    style={{ color: "var(--color-text)" }}
                  >
                    {group.institution}
                  </h3>
                  <ul className="space-y-1">
                    {group.courses.map((c, j) => (
                      <li
                        key={j}
                        className="text-sm pl-4 relative before:content-['·'] before:absolute before:left-0"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Supervision */}
          <section className="mb-16">
            <SectionHeading eyebrow="Supervision" title="PhD Supervision" />
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-xl p-6"
              >
                <h3
                  className="font-semibold text-sm mb-3"
                  style={{ color: "var(--color-accent-secondary)" }}
                >
                  Current
                </h3>
                <ul className="space-y-2">
                  {supervision.current.map((s, i) => (
                    <li
                      key={i}
                      className="text-sm pl-4 relative before:content-['·'] before:absolute before:left-0"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card rounded-xl p-6"
              >
                <h3
                  className="font-semibold text-sm mb-3"
                  style={{ color: "var(--color-accent-secondary)" }}
                >
                  Completed
                </h3>
                <ul className="space-y-2">
                  {supervision.completed.map((s, i) => (
                    <li
                      key={i}
                      className="text-sm pl-4 relative before:content-['·'] before:absolute before:left-0"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card rounded-xl p-6"
              >
                <h3
                  className="font-semibold text-sm mb-3"
                  style={{ color: "var(--color-accent-secondary)" }}
                >
                  Additional
                </h3>
                <ul className="space-y-2">
                  {supervision.other.map((s, i) => (
                    <li
                      key={i}
                      className="text-sm pl-4 relative before:content-['·'] before:absolute before:left-0"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* Academic Citizenship */}
          <section className="mb-16">
            <SectionHeading eyebrow="Service" title="Academic Citizenship" />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-xl p-6"
            >
              <ul className="space-y-2">
                {citizenship.map((c, i) => (
                  <li
                    key={i}
                    className="text-sm pl-4 relative before:content-['·'] before:absolute before:left-0"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          </section>

          {/* Peer Reviewing */}
          <section className="mb-16">
            <SectionHeading eyebrow="Reviewing" title="Peer Reviewing" />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {reviewingJournals.map((j, i) => (
                <span
                  key={i}
                  className="glass-card text-xs px-3 py-1.5 rounded-full"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {j}
                </span>
              ))}
            </motion.div>
          </section>

          {/* Back link */}
          <div className="text-center">
            <Link
              href="/"
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-accent)" }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
