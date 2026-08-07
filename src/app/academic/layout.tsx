import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Profile — Dr. Jonas Heller",
  description:
    "Academic record of Dr. Jonas Heller, Tenured Assistant Professor (Universitair Docent 1) of Marketing at Maastricht University: publications, third-party funding, teaching, doctoral supervision, and academic service.",
  alternates: {
    canonical: "/academic",
  },
  openGraph: {
    title: "Academic Profile — Dr. Jonas Heller",
    description:
      "Publications, third-party funding, teaching, doctoral supervision, and academic service.",
    url: "https://www.jonasheller.info/academic",
  },
};

export default function AcademicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
