"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#020617] text-[#E5E7EB]">
      <Navbar transparent />
      <Hero />
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
