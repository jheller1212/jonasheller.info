"use client";

import { useI18n } from "@/lib/i18n";
import { teaching } from "@/data/cv";

/**
 * Teaching record. Cohort size and ECTS render per course when present in
 * src/data/cv.ts; a rating like "8.2/10" means little without them, so the
 * Problem-Based Learning note below gives the format context.
 */
export default function TeachingList() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
        {t("cv.teaching.pbl")}
      </p>

      {teaching.map((group) => (
        <div key={group.institution} className="glass-card rounded-xl p-6 break-inside-avoid">
          <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--color-text)" }}>
            {group.institution}
          </h3>
          {group.note && (
            <p className="text-xs mb-3" style={{ color: "var(--color-text-secondary)" }}>
              {group.note}
            </p>
          )}
          <ul className="space-y-2 mt-3">
            {group.courses.map((course) => (
              <li key={course.name} className="text-sm">
                <span style={{ color: "var(--color-text)" }}>{course.name}</span>
                {course.years && (
                  <span style={{ color: "var(--color-text-secondary)" }}> ({course.years})</span>
                )}
                <span
                  className="block text-xs mt-0.5"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {[
                    course.role,
                    course.cohort ? `${course.cohort} ${t("cv.teaching.cohort")}` : null,
                    course.ects ? `${course.ects} ECTS` : null,
                    course.evaluation ? `${t("cv.teaching.evaluation")} ${course.evaluation}` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
