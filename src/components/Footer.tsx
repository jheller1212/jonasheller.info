"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";

function ObfuscatedEmail({ user, domain }: { user: string; domain: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span>[email protected]</span>;
  const email = `${user}@${domain}`;
  return (
    <a
      href={`mailto:${email}`}
      className="underline underline-offset-4 decoration-1 hover:opacity-70"
      style={{ color: "var(--color-accent)" }}
    >
      {email}
    </a>
  );
}

// Renders a translated string containing one <a>label</a> marker, turning the
// marked segment into a link (href) or a button (onAction)
function LinkifiedText({
  text,
  href,
  onAction,
}: {
  text: string;
  href?: string;
  onAction?: () => void;
}) {
  const linkClass = "underline underline-offset-4 decoration-1 hover:opacity-70";
  return (
    <>
      {text.split(/<a>|<\/a>/).map((part, i) =>
        i === 1 ? (
          href ? (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              style={{ color: "var(--color-accent)" }}
            >
              {part}
            </a>
          ) : (
            <button
              key={i}
              type="button"
              onClick={onAction}
              className={`${linkClass} transition-opacity`}
              style={{ color: "var(--color-accent)" }}
            >
              {part}
            </button>
          )
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function Footer() {
  const [showImpressum, setShowImpressum] = useState(false);
  const { t } = useI18n();
  const dialogRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const hasBeenOpenRef = useRef(false);

  useEffect(() => {
    const open = () => setShowImpressum(true);
    window.addEventListener("open-impressum", open);
    return () => window.removeEventListener("open-impressum", open);
  }, []);

  useEffect(() => {
    if (!showImpressum) return;
    hasBeenOpenRef.current = true;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowImpressum(false);
        return;
      }
      // Trap Tab inside the dialog
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || active === dialog) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    // Move focus into dialog
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [showImpressum]);

  // Return focus to trigger button only when dialog closes (not on initial mount)
  useEffect(() => {
    if (!showImpressum && hasBeenOpenRef.current) openBtnRef.current?.focus();
  }, [showImpressum]);

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
          ref={openBtnRef}
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="impressum-title"
            tabIndex={-1}
            className="glass-card rounded-2xl p-8 sm:p-10 max-w-lg w-full max-h-[80vh] overflow-y-auto relative focus:outline-none"
            style={{ color: "var(--color-text)" }}
          >
            <button
              onClick={() => setShowImpressum(false)}
              className="absolute top-4 right-4 text-xl hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label={t("legal.close")}
            >
              ×
            </button>

            <h2 id="impressum-title" className="text-xl font-bold mb-6">Impressum</h2>

            <div
              className="space-y-4 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  {t("legal.responsible")}
                </p>
                <p>Dr. Jonas Heller</p>
                <p>Maastricht University</p>
                <p>School of Business and Economics</p>
                <p>Tongersestraat 53, 6211 LM Maastricht</p>
                <p>{t("legal.countryNL")}</p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  {t("legal.contact")}
                </p>
                <p>
                  <ObfuscatedEmail
                    user="j.heller"
                    domain="maastrichtuniversity.nl"
                  />
                </p>
                <p className="mt-1">
                  <LinkifiedText
                    text={t("legal.contactForm")}
                    onAction={() => {
                      setShowImpressum(false);
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                </p>
              </div>

              <hr style={{ borderColor: "var(--color-border)" }} />

              <h3
                className="text-base font-bold pt-2"
                style={{ color: "var(--color-text)" }}
              >
                {t("legal.privacyNotice")}
              </h3>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  {t("legal.controller")}
                </p>
                <p>
                  Dr. Jonas Heller, Maastricht University, Tongersestraat 53,
                  6211 LM Maastricht, {t("legal.countryNL")}.{" "}
                  <ObfuscatedEmail
                    user="j.heller"
                    domain="maastrichtuniversity.nl"
                  />
                </p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  {t("legal.formTitle")}
                </p>
                <p>
                  <LinkifiedText
                    text={t("legal.formText")}
                    href="https://formspree.io/legal/privacy-policy"
                  />
                </p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  {t("legal.hosting")}
                </p>
                <p>
                  <LinkifiedText
                    text={t("legal.hostingText")}
                    href="https://vercel.com/legal/privacy-policy"
                  />
                </p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  {t("legal.cookies")}
                </p>
                <p>{t("legal.cookiesText")}</p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  {t("legal.rights")}
                </p>
                <p>{t("legal.rightsText")}</p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  {t("legal.complain")}
                </p>
                <p>
                  <LinkifiedText
                    text={t("legal.complainText")}
                    href="https://www.autoriteitpersoonsgegevens.nl"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
