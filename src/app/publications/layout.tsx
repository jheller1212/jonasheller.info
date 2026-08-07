import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications — Dr. Jonas Heller",
  description:
    "Complete list of publications by Dr. Jonas Heller: peer-reviewed journal articles, review articles, book chapters, conference contributions, and reports. Generated from ORCID 0000-0002-3214-0724.",
  alternates: {
    canonical: "/publications",
  },
  openGraph: {
    title: "Publications — Dr. Jonas Heller",
    description:
      "Complete publication record, grouped by contribution type, with author positions, DOIs, and open-access status.",
    url: "https://www.jonasheller.info/publications",
  },
};

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
