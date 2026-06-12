"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n";

const serviceKeys = ["consulting.workshops", "consulting.training", "consulting.advisory"] as const;

export default function ConsultingPage() {
  const { t } = useI18n();

  return (
    <>
      <Nav />
      <main className="font-[family-name:var(--font-geist-sans)] pt-24 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-3xl"
          >
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-accent-secondary)" }}
            >
              {t("consulting.eyebrow")}
            </p>
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
              style={{ color: "var(--color-text)" }}
            >
              {t("consultingPage.heading")}
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {t("consulting.intro")}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
          >
            {serviceKeys.map((key) => (
              <motion.div
                key={key}
                className="glass-card rounded-2xl p-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <h2 className="font-bold mb-2 text-base" style={{ color: "var(--color-text)" }}>
                  {t(key)}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {t(`${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--color-text)" }}>
              {t("consulting.clientsTitle")}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {t("consulting.clients")}
            </p>
          </motion.div>

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
              {t("consulting.cta")}
            </Link>
            <p className="mt-6 text-sm">
              <Link
                href="/speaking"
                className="underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-text-secondary)", textDecorationColor: "var(--color-border)" }}
              >
                {t("consultingPage.crossLink")}
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
