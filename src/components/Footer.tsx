"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

function ObfuscatedEmail({ user, domain }: { user: string; domain: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span>[email protected]</span>;
  const email = `${user}@${domain}`;
  return (
    <a href={`mailto:${email}`} className="underline underline-offset-4 decoration-1 hover:opacity-70" style={{ color: "var(--color-accent)" }}>
      {email}
    </a>
  );
}

export default function Footer() {
  const [showImpressum, setShowImpressum] = useState(false);
  const { t } = useI18n();

  return (
    <>
      <footer
        className="py-8 px-6 border-t text-center text-sm"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-text-secondary)",
        }}
      >
        <p>
          © {new Date().getFullYear()} Dr. Jonas Heller. {t("footer.rights")}
        </p>
        <button
          onClick={() => setShowImpressum(true)}
          className="mt-2 hover:opacity-70 transition-opacity underline underline-offset-4 decoration-1"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {t("footer.impressum")}
        </button>
      </footer>

      {showImpressum && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowImpressum(false);
          }}
        >
          <div
            className="glass-card rounded-2xl p-8 sm:p-10 max-w-lg w-full max-h-[80vh] overflow-y-auto relative"
            style={{ color: "var(--color-text)" }}
          >
            <button
              onClick={() => setShowImpressum(false)}
              className="absolute top-4 right-4 text-xl hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-6">Impressum</h2>

            <div className="space-y-4 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  Responsible for content
                </p>
                <p>Dr. Jonas Heller</p>
                <p>Maastricht University</p>
                <p>School of Business and Economics</p>
                <p>Tongersestraat 53, 6211 LM Maastricht</p>
                <p>The Netherlands</p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  Contact
                </p>
                <p>
                  <ObfuscatedEmail user="j.heller" domain="maastrichtuniversity.nl" />
                </p>
                <p className="mt-1">
                  Or use the{" "}
                  <button
                    onClick={() => {
                      setShowImpressum(false);
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
                    style={{ color: "var(--color-accent)" }}
                  >
                    contact form
                  </button>{" "}
                  on this website.
                </p>
              </div>

              <hr style={{ borderColor: "var(--color-border)" }} />

              <h3 className="text-base font-bold pt-2" style={{ color: "var(--color-text)" }}>
                Privacy Notice
              </h3>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  Data controller
                </p>
                <p>
                  Dr. Jonas Heller, Maastricht University, Tongersestraat 53, 6211 LM Maastricht, The Netherlands.{" "}
                  <ObfuscatedEmail user="j.heller" domain="maastrichtuniversity.nl" />
                </p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  Contact form / Formspree
                </p>
                <p>
                  When you submit the contact form, your name, email address, and message are transmitted to{" "}
                  <a
                    href="https://formspree.io/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-1 hover:opacity-70"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Formspree Inc.
                  </a>{" "}
                  (US) for processing and forwarded to me by email. Legal basis: Art. 6(1)(a) GDPR (your consent, given via the consent checkbox on the form). Formspree is US-based; the transfer is covered by Standard Contractual Clauses (Art. 46 GDPR). Form submissions are retained for the duration of correspondence and then deleted. Formspree retains data per their own privacy policy.
                </p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  Hosting
                </p>
                <p>
                  This website is hosted on GitHub Pages (GitHub Inc. / Microsoft). Server logs may record IP addresses in accordance with GitHub&apos;s{" "}
                  <a
                    href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-1 hover:opacity-70"
                    style={{ color: "var(--color-accent)" }}
                  >
                    privacy statement
                  </a>
                  .
                </p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  No cookies or tracking
                </p>
                <p>
                  This website uses no cookies, analytics, or third-party tracking. Language preference is stored in localStorage (functional, exempt from consent requirements).
                </p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  Your rights
                </p>
                <p>
                  Under the GDPR (Art. 15–21), you have the right to access, rectification, erasure, restriction of processing, data portability, and objection. To exercise these rights, please contact me via email or the contact form above.
                </p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  Right to complain
                </p>
                <p>
                  You have the right to lodge a complaint with the{" "}
                  <a
                    href="https://www.autoriteitpersoonsgegevens.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-1 hover:opacity-70"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Autoriteit Persoonsgegevens
                  </a>{" "}
                  or your local supervisory authority.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
