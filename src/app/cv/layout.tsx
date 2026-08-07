import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV — Dr. Jonas Heller",
  description:
    "Curriculum Vitae of Dr. Jonas Heller — Tenured Assistant Professor (Universitair Docent 1) of Marketing at Maastricht University. Experience, education, awards, third-party funding, teaching, and doctoral supervision.",
  alternates: {
    canonical: "/cv",
  },
  openGraph: {
    title: "CV — Dr. Jonas Heller",
    description:
      "Full academic CV: professional experience, education, awards, external competitive and internal funding, teaching, doctoral supervision, and academic service.",
    url: "https://www.jonasheller.info/cv",
  },
};

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return children;
}
