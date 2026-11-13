import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

const siteUrl = "https://www.jonasheller.info";

export const metadata: Metadata = {
  title: "PhD in Marketing with Dr. Jonas Heller | Maastricht University",
  description:
    "How to do a PhD in marketing with Dr. Jonas Heller at Maastricht University: funded positions, PhDs with their own scholarship, who fits, and what to send.",
  alternates: {
    canonical: "/phd",
  },
  openGraph: {
    title: "PhD in Marketing with Dr. Jonas Heller",
    description:
      "Funded positions, PhDs with their own scholarship, who fits, and what to send.",
    url: `${siteUrl}/phd`,
    siteName: "Jonas Heller",
    type: "website",
    locale: "en_US",
    images: [OG_IMAGE],
  },
};

export default function PhdLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
