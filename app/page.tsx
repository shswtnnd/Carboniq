"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const HomeBackgroundShader = dynamic(() => import("@/components/ui/home-hero-shader"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[radial-gradient(circle_at_32%_35%,rgba(34,197,94,0.15),transparent_32%),linear-gradient(160deg,#020617,#07112a_45%,#020617)]" />
  ),
});

export default function Home() {
  return (
    <main className="relative text-[#E5E7EB]">
      <HomeBackgroundShader className="fixed inset-0" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(2,6,23,0.3),rgba(2,6,23,0.22)_58%,rgba(2,6,23,0.2))]" />
      <div className="relative z-10">
        <Navbar transparent />
        <Hero />
        <FeaturesSection />
        <PricingSection />
        <Footer />
      </div>
    </main>
  );
}
