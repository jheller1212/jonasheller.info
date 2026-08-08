import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Dr. Jonas Heller",
  // Keep the order matching the page itself, and name all three.
  description:
    "Tools and platforms built by Jonas Heller — ScholarFolio for interactive research portfolios, ResearchChatAI for running studies with conversational AI agents, and AI2AI-Chat for AI-to-AI conversations.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects — Dr. Jonas Heller",
    description:
      "Tools and platforms built by Jonas Heller: ScholarFolio, ResearchChatAI, and AI2AI-Chat.",
    url: "https://www.jonasheller.info/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
