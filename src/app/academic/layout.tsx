import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Profile — Dr. Jonas Heller",
  description:
    "Academic record of Dr. Jonas Heller, Tenured Assistant Professor (Universitair Docent 1) of Marketing at Maastricht University: publications, third-party funding, teaching, doctoral supervision, and academic service.",
  alternates: {
    canonical: "/academic",
  },
  // This view restates /cv and /publications in one printable page. It exists
  // to be saved as a PDF for application dossiers — the dossier carries the
  // PDF, not the link — so it stays reachable but out of the index rather than
  // competing with /cv for the same queries.
  robots: {
    index: false,
    follow: true,
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
