import type { Metadata } from "next";

export const SITE_URL = "https://www.jonasheller.info";

/**
 * The generated Open Graph card.
 *
 * Next only attaches the `opengraph-image` file convention to the segment it
 * sits in. Every route that declares its own `openGraph` block replaces the
 * inherited one, so each must name the image explicitly — otherwise sharing
 * that page produces a blank preview, which is what happened to /cv,
 * /publications, /academic, /speaking, /consulting and /projects.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Dr. Jonas Heller — Professor of Marketing, Maastricht University",
};

/**
 * Open Graph + Twitter metadata for a page, with the card image always
 * attached. Pass the page-specific title, description and path.
 */
export function socialMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: "Jonas Heller",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@HellerJonas",
      images: [OG_IMAGE.url],
    },
  };
}
