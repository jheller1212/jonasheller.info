"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n";

const ACADEMIC_TRANSFER = "https://www.academictransfer.com/en/";
const LINKEDIN_JONAS = "https://www.linkedin.com/in/hellerjonas";
const LINKEDIN_DEXLAB = "https://www.linkedin.com/company/sbedexlab";

const linkStyle = {
  color: "var(--color-accent)",
  textDecorationColor: "var(--color-border)",
};

function Card({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card rounded-2xl p-6 sm:p-8"
    >
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-3" style={{ color: "var(--color-text)" }}>
        {title}
      </h2>
      <div className="text-sm sm:text-base leading-relaxed space-y-3" style={{ color: "var(--color-text-secondary)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function PhdPage() {
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
            className="mb-12"
          >
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-accent-secondary)" }}
            >
              {t("phd.eyebrow")}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: "var(--color-text)" }}>
              {t("phd.heading")}
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {t("phd.intro")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            <Card title={t("phd.funded.title")} delay={0.1}>
              <p>{t("phd.funded.text")}</p>
              <p>
                <a href={ACADEMIC_TRANSFER} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" style={linkStyle}>
                  AcademicTransfer
                </a>
                {" · "}
                <a href={LINKEDIN_JONAS} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" style={linkStyle}>
                  {t("phd.linkedinJonas")}
                </a>
                {" · "}
                <a href={LINKEDIN_DEXLAB} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" style={linkStyle}>
                  {t("phd.linkedinDexlab")}
                </a>
              </p>
            </Card>

            <Card title={t("phd.own.title")} delay={0.2}>
              <p>{t("phd.own.text")}</p>
              <p>{t("phd.own.note")}</p>
            </Card>

            <Card title={t("phd.fit.title")} delay={0.3}>
              <p>{t("phd.fit.text")}</p>
              <p>{t("phd.fit.not")}</p>
            </Card>

            <Card title={t("phd.send.title")} delay={0.4}>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t("phd.send.0")}</li>
                <li>{t("phd.send.1")}</li>
                <li>{t("phd.send.2")}</li>
                <li>{t("phd.send.3")}</li>
              </ul>
              <p>{t("phd.send.how")}</p>
            </Card>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <Link
              href="/#contact"
              className="inline-block px-8 py-3 rounded-full text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {t("phd.cta")}
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
