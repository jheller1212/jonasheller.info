import type { Metadata } from "next";

const siteUrl = "https://www.jonasheller.info";

export const metadata: Metadata = {
  title: "Keynote Speaker — AR, VR & AI | Dr. Jonas Heller",
  description:
    "Book Dr. Jonas Heller as a keynote speaker on AR, VR, AI, and consumer behavior. Research-backed talks for conferences, leadership summits, and corporate events — in English or German.",
  alternates: {
    canonical: "/speaking",
  },
  openGraph: {
    title: "Keynote Speaker — AR, VR & AI | Dr. Jonas Heller",
    description:
      "Research-backed keynotes on AR, VR, AI, and consumer behavior for conferences and corporate events.",
    url: `${siteUrl}/speaking`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Keynote speaking",
  name: "Keynote Speaking — Dr. Jonas Heller",
  description:
    "Research-backed keynote talks on augmented reality, virtual reality, artificial intelligence, and consumer behavior for conferences, leadership summits, and corporate events.",
  url: `${siteUrl}/speaking`,
  areaServed: "Worldwide",
  availableLanguage: ["English", "German"],
  provider: {
    "@type": "Person",
    name: "Jonas Heller",
    honorificPrefix: "Dr.",
    jobTitle: "Assistant Professor of Marketing",
    url: siteUrl,
    worksFor: {
      "@type": "Organization",
      name: "Maastricht University School of Business and Economics",
    },
  },
};

export default function SpeakingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
