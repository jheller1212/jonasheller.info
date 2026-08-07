import type { Metadata } from "next";
import { JOB_TITLE } from "@/data/cv";

const siteUrl = "https://www.jonasheller.info";

export const metadata: Metadata = {
  title: "Consulting & Executive Education — AR, VR & AI | Dr. Jonas Heller",
  description:
    "Strategic consulting, workshops, and executive education on AR, VR, AI, and digital transformation by Dr. Jonas Heller — as delivered for Allianz, APG, and the Dutch Ministry of Infrastructure and Water Management.",
  alternates: {
    canonical: "/consulting",
  },
  openGraph: {
    title: "Consulting & Executive Education — AR, VR & AI | Dr. Jonas Heller",
    description:
      "Strategic consulting, workshops, and executive education on AR, VR, AI, and digital transformation.",
    url: `${siteUrl}/consulting`,
    siteName: "Jonas Heller",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consulting & Executive Education — AR, VR & AI | Dr. Jonas Heller",
    description:
      "Strategic consulting, workshops, and executive education on AR, VR, AI, and digital transformation.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: ["Management consulting", "Executive education", "Corporate training"],
  name: "Consulting & Executive Education — Dr. Jonas Heller",
  description:
    "Strategic advisory, workshops, masterclasses, and executive education on augmented reality, virtual reality, artificial intelligence, and digital transformation.",
  url: `${siteUrl}/consulting`,
  areaServed: "Worldwide",
  availableChannel: {
    "@type": "ServiceChannel",
    availableLanguage: ["English", "German"],
  },
  provider: {
    "@type": "Person",
    name: "Jonas Heller",
    honorificPrefix: "Dr.",
    jobTitle: JOB_TITLE,
    url: siteUrl,
    worksFor: {
      "@type": "Organization",
      name: "Maastricht University School of Business and Economics",
    },
  },
};

export default function ConsultingLayout({ children }: { children: React.ReactNode }) {
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
