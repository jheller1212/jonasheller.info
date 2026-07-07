"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/lib/i18n";

const projects = [
  {
    titleKey: "projects.ai2ai.title",
    descKey: "projects.ai2ai.desc",
    url: "https://www.ai2aichat.com",
    gradient: "from-orange-500 to-sky-500",
    logoContent: (
      <div className="flex items-center gap-1">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="9" cy="16" r="1" />
          <circle cx="15" cy="16" r="1" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: -10 }}>
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="9" cy="16" r="1" />
          <circle cx="15" cy="16" r="1" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      </div>
    ),
    nameDisplay: "AI2AI-Chat",
    tags: ["React", "TypeScript", "Supabase", "OpenAI", "Anthropic", "Gemini"],
  },
  {
    titleKey: "projects.scholarfolio.title",
    descKey: "projects.scholarfolio.desc",
    url: "https://www.scholarfolio.org",
    gradient: "from-teal-600 to-emerald-500",
    logoContent: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 10C6 8 8 7 10 7C12 7 14 8 16 9C18 8 20 7 22 7C24 7 26 8 26 10V23C26 24 25 25 23 25C21 25 19 24 16 23C13 24 11 25 9 25C7 25 6 24 6 23V10Z" stroke="#2d7d7d" strokeWidth="1.8" fill="none"/>
        <line x1="16" y1="9" x2="16" y2="23" stroke="#2d7d7d" strokeWidth="1.5"/>
        <path d="M18 16L21 12L24 8" stroke="#2d7d7d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="8" r="1.5" fill="#2d7d7d"/>
      </svg>
    ),
    nameDisplay: "ScholarFolio",
    tags: ["React", "TypeScript", "Supabase", "D3.js", "Stripe", "SerpAPI"],
  },
  {
    titleKey: "projects.researchchat.title",
    descKey: "projects.researchchat.desc",
    url: "https://www.researchchatai.com",
    gradient: "from-pink-400 to-sky-400",
    logoContent: (
      <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
        <circle cx="10" cy="10" r="8" fill="#b0b0c0" />
        <circle cx="26" cy="10" r="8" fill="#f06080" />
        <circle cx="10" cy="26" r="8" fill="#f0b020" />
        <circle cx="26" cy="26" r="8" fill="#66d1fc" />
      </svg>
    ),
    nameDisplay: "ResearchChatAI",
    tags: ["Chatbot Platform", "AI Agents", "No-Code", "Research Studies"],
  },
];

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-10"
    >
      <p
        className="text-sm font-semibold uppercase tracking-wider mb-1"
        style={{ color: "var(--color-accent-secondary)" }}
      >
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--color-text)" }}>
        {title}
      </h2>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { t } = useI18n();

  return (
    <>
      <Nav />
      <main id="main-content" className="font-[family-name:var(--font-geist-sans)] pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
              {t("projects.heading")}
            </h1>
            <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
              {t("projects.intro")}
            </p>
          </motion.div>

          <SectionHeading eyebrow={t("projects.eyebrow")} title={t("projects.sectionTitle")} />

          <div className="space-y-8">
            {projects.map((project, i) => (
              <motion.a
                key={project.titleKey}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden block group cursor-pointer"
                style={{ textDecoration: "none" }}
              >
                {/* Gradient banner */}
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

                <div className="p-8 sm:p-10">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    {/* Logo */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--color-bg)" }}
                    >
                      {project.logoContent}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3
                          className="text-xl sm:text-2xl font-bold group-hover:opacity-80 transition-opacity"
                          style={{ color: "var(--color-text)" }}
                        >
                          {project.nameDisplay}
                        </h3>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-40 group-hover:opacity-70 transition-opacity flex-shrink-0"
                          style={{ color: "var(--color-text)" }}
                        >
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </div>

                      <p
                        className="text-base leading-relaxed mb-4"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {t(project.descKey)}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{
                              background: "var(--color-bg)",
                              color: "var(--color-text-secondary)",
                              border: "1px solid var(--color-border)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Link
              href="/"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-accent)" }}
            >
              ← {t("projects.back")}
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
