import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CV — Dr. Jonas Heller",
  description:
    "Curriculum Vitae of Dr. Jonas Heller — Tenured Assistant Professor (Universitair Docent 1) of Marketing at Maastricht University. Experience, education, awards, third-party funding, teaching, and doctoral supervision.",
  alternates: {
    canonical: "/cv",
  },
  ...socialMeta({
    title: "CV — Dr. Jonas Heller",
    description: "Full academic CV of Dr. Jonas Heller: professional experience, education, awards, third-party funding, teaching, and doctoral supervision.",
    path: "/cv",
  }),
};

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return children;
}
