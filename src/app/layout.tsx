import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { I18nProvider } from "@/lib/i18n";
import { JOB_TITLE, ORCID_PROFILE_URL, SCHOLAR_URL } from "@/data/cv";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = "https://www.jonasheller.info";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dr. Jonas Heller | AR, VR & AI Marketing Expert | Keynote Speaker & Consultant",
  description:
    "Dr. Jonas Heller is a marketing professor at Maastricht University and keynote speaker specializing in AR, VR, AI and consumer behavior. Available for speaking, consulting, and research collaboration.",
  keywords: [
    "Jonas Heller",
    "Jonas Heller professor",
    "Jonas Heller academic",
    "Jonas Heller consultant",
    "Jonas Heller speaker",
    "Jonas Heller Maastricht University",
    "Jonas Heller marketing",
    "Jonas Heller augmented reality",
    "Jonas Heller researcher",
    "DEXLab",
    "LIT Network",
    "augmented reality marketing",
    "digital marketing professor",
    "AR VR research",
  ],
  authors: [{ name: "Jonas Heller", url: siteUrl }],
  creator: "Jonas Heller",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dr. Jonas Heller — AR, VR & AI Marketing Expert",
    description:
      "Marketing professor, keynote speaker, and consultant on immersive technologies and AI-driven consumer behavior.",
    url: siteUrl,
    siteName: "Jonas Heller",
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Jonas Heller — AR, VR & AI Marketing Expert",
    description:
      "Marketing professor, keynote speaker, and consultant on immersive technologies and AI-driven consumer behavior.",
    creator: "@HellerJonas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jonas Heller",
  givenName: "Jonas",
  familyName: "Heller",
  honorificPrefix: "Dr.",
  url: siteUrl,
  jobTitle: JOB_TITLE,
  identifier: ORCID_PROFILE_URL,
  worksFor: {
    "@type": "Organization",
    name: "Maastricht University School of Business and Economics",
    url: "https://www.maastrichtuniversity.nl",
  },
  affiliation: [
    {
      "@type": "Organization",
      name: "DEXLab",
      description: "Digital Experience Lab",
    },
    {
      "@type": "Organization",
      name: "LIT Network",
    },
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Maastricht University",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "University of New South Wales",
    },
  ],
  knowsAbout: [
    "Augmented Reality",
    "Virtual Reality",
    "Consumer Behavior",
    "AI Marketing",
    "Behavioral Science",
    "Extended Reality",
    "Digital Transformation",
    "Immersive Technologies",
    "Brain-Computer Interfaces",
  ],
  // Google Scholar was removed on the assumption that the profile carried a
  // same-named author's work. It does not: every entry on it was verified
  // against ORCID and the CV in Aug 2026, so it is back as a strong identity
  // signal.
  sameAs: [
    ORCID_PROFILE_URL,
    "https://cris.maastrichtuniversity.nl/en/persons/jonas-heller",
    SCHOLAR_URL,
    "https://www.linkedin.com/in/hellerjonas/",
    "https://www.researchgate.net/profile/Jonas-Heller-2",
    "https://x.com/hellerjonas",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-medium focus:text-white"
          style={{ backgroundColor: "var(--color-accent, #0070f3)" }}
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
