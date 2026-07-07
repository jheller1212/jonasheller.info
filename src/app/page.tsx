"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Speaking from "@/components/Speaking";
import Consulting from "@/components/Consulting";

// Load smooth scroll only on client, skip on touch devices
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

// Below-the-fold sections: code-split so they don't block the initial bundle.
// SSR stays on (default) so their content remains in the prerendered HTML.
const Terminal = dynamic(() => import("@/components/Terminal"));
const Bento = dynamic(() => import("@/components/Bento"));
const Publications = dynamic(() => import("@/components/Publications"));
const Newsletter = dynamic(() => import("@/components/Newsletter"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main id="main-content" className="font-[family-name:var(--font-geist-sans)]">
        <Hero />
        <TrustedBy />
        <Speaking />
        <Consulting />
        <Terminal />
        <Bento />
        <Publications />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
