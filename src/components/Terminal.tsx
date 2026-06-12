"use client";

import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/lib/i18n";

const LINE_COUNT = 14;
const INDENT_LINES = new Set([8, 9, 10, 11]);

export default function Terminal() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useI18n();
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTyping, setIsTyping] = useState(false);

  const terminalLines = Array.from({ length: LINE_COUNT }, (_, i) => ({
    prompt: INDENT_LINES.has(i) ? "" : ">",
    text: t(`terminal.line.${i}`),
  }));

  useEffect(() => {
    if (!isVisible) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleLines(LINE_COUNT);
      setCurrentChar(999);
      return;
    }

    setIsTyping(true);

    if (visibleLines >= LINE_COUNT) {
      setIsTyping(false);
      return;
    }

    const fullLine = `${terminalLines[visibleLines].prompt} ${terminalLines[visibleLines].text}`;

    if (currentChar < fullLine.length) {
      const timer = setTimeout(() => setCurrentChar((c) => c + 1), 18);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setVisibleLines((l) => l + 1);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, visibleLines, currentChar]);

  return (
    <section id="about" className="scroll-mt-20 pt-24 sm:pt-32 pb-14 sm:pb-16 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div
          className="rounded-xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: "var(--color-terminal-bg)" }}
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-3 text-xs text-white/40 font-mono">{t("terminal.title")}</span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm sm:text-base leading-relaxed min-h-[320px]">
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="mb-1">
                <span style={{ color: "var(--color-terminal-prompt)" }}>
                  {line.prompt}{" "}
                </span>
                <span style={{ color: "var(--color-terminal-text)" }}>
                  {line.text}
                </span>
              </div>
            ))}

            {/* Currently typing line */}
            {visibleLines < LINE_COUNT && isVisible && (
              <div className="mb-1">
                <span style={{ color: "var(--color-terminal-prompt)" }}>
                  {terminalLines[visibleLines].prompt}{" "}
                </span>
                <span style={{ color: "var(--color-terminal-text)" }}>
                  {terminalLines[visibleLines].text.slice(0, Math.max(0, currentChar - 2))}
                </span>
                <span className="terminal-cursor" style={{ color: "var(--color-terminal-text)" }}>
                  █
                </span>
              </div>
            )}

            {/* Blinking cursor after all done */}
            {visibleLines >= LINE_COUNT && (
              <div className="mt-2">
                <span style={{ color: "var(--color-terminal-prompt)" }}>&gt; </span>
                <span className="terminal-cursor" style={{ color: "var(--color-terminal-text)" }}>
                  █
                </span>
              </div>
            )}
          </div>
        </div>

        <p
          className="mt-8 text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {t("about.bio")}
        </p>
      </div>
    </section>
  );
}
