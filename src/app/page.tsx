"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";
import Bento from "@/components/Bento";
import Publications from "@/components/Publications";
import Speaking from "@/components/Speaking";
import Consulting from "@/components/Consulting";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Load smooth scroll only on client, skip on touch devices
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main id="main-content" className="font-[family-name:var(--font-geist-sans)]">
        <Hero />
        <Speaking />
        <Consulting />
        <Terminal />
        <Bento />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
