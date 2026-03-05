"use client";

import Navbar from "@/components/Navbar";
import { Card, CardBody } from "@heroui/react";
import MinimalAmbientBackground from "@/components/ui/minimal-ambient-background";

const features = [
  {
    title: "Carbon Footprint Tracking",
    description:
      "Track emissions from electricity, fuel, transport, and waste.",
  },
  {
    title: "Environmental Insights",
    description:
      "Understand which parts of the campus produce the most emissions.",
  },
  {
    title: "Actionable Sustainability",
    description:
      "Get recommendations to reduce your environmental impact.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-[#E5E7EB]">
      <MinimalAmbientBackground />
      <Navbar />
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold tracking-tight md:text-5xl">
          Built for climate-focused institutions
        </h1>
        <p className="mt-4 max-w-2xl text-[#cbd5e1]">
          Carboniq gives sustainability teams a single place to monitor emissions,
          prioritize initiatives, and report outcomes confidently.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border border-white/10 bg-[#111827]">
              <CardBody className="space-y-3 p-6">
                <h2 className="text-xl font-semibold text-[#4ADE80]">{feature.title}</h2>
                <p className="text-[#cbd5e1]">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
