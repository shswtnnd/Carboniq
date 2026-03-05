"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MinimalAmbientBackground from "@/components/ui/minimal-ambient-background";

type Feature = {
  title: string;
  description: string;
  visual: "pie" | "bar" | "recommendation";
};

const features: Feature[] = [
  {
    title: "Measure Your Carbon Footprint",
    description:
      "Track emissions from electricity, fuel usage, waste, and transportation to understand the total carbon impact of your campus.",
    visual: "pie",
  },
  {
    title: "Identify High-Impact Sources",
    description:
      "Break down emissions by buildings, departments, or energy sources to quickly identify the largest contributors.",
    visual: "bar",
  },
  {
    title: "Actionable Sustainability Insights",
    description:
      "Receive practical recommendations that help institutions reduce emissions and move toward more sustainable operations.",
    visual: "recommendation",
  },
];

function CardVisual({ type }: { type: Feature["visual"] }) {
  if (type === "pie") {
    return (
      <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#0b1220] p-4">
        <div className="h-16 w-16 rounded-full bg-[conic-gradient(#22C55E_0_42%,#4ADE80_42%_68%,#86efac_68%_84%,#14532d_84%_100%)]" />
        <div className="space-y-1 text-xs text-[#cbd5e1]">
          <p>Electricity</p>
          <p>Transport</p>
          <p>Waste</p>
          <p>Fuel</p>
        </div>
      </div>
    );
  }

  if (type === "bar") {
    return (
      <div className="rounded-xl border border-white/10 bg-[#0b1220] p-4">
        <div className="flex h-20 items-end gap-3">
          <div className="h-10 w-8 rounded-t-md bg-[#22C55E]" />
          <div className="h-14 w-8 rounded-t-md bg-[#4ADE80]" />
          <div className="h-16 w-8 rounded-t-md bg-[#86efac]" />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-[#cbd5e1]">
          <span>Library</span>
          <span>Hostel</span>
          <span>Engineering</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#0b1220] p-4 text-xs text-[#cbd5e1]">
      <p className="mb-2 text-[#86efac]">Recommendation panel</p>
      <ul className="space-y-1">
        <li>- Install solar panels</li>
        <li>- Switch to LED lighting</li>
        <li>- Reduce generator usage</li>
      </ul>
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const [mouse, setMouse] = useState({ x: 50, y: 50, hover: false });

  return (
    <motion.article
      className="group relative rounded-2xl border border-white/12 bg-black p-8 shadow-[0_16px_40px_rgba(2,6,23,0.45)]"
      style={{
        backgroundImage: mouse.hover
          ? `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(34,197,94,0.12), transparent 40%)`
          : undefined,
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setMouse({ x, y, hover: true });
      }}
      onMouseEnter={() => setMouse((prev) => ({ ...prev, hover: true }))}
      onMouseLeave={() => setMouse({ x: 50, y: 50, hover: false })}
      whileHover={{ y: -6, scale: 1.02, rotateX: 4, rotateY: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <div className="flex flex-col gap-4">
        <CardVisual type={feature.visual} />
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-[#E5E7EB]">
          {feature.title}
        </h3>
        <p className="text-base leading-relaxed text-[#cbd5e1]">{feature.description}</p>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-all duration-300 group-hover:border-white/25" />
    </motion.article>
  );
}

export default function FeaturesSection() {
  return (
    <motion.section
      id="features"
      className="relative overflow-hidden bg-[#020617] px-6 py-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <MinimalAmbientBackground />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-extrabold tracking-tight text-[#E5E7EB] md:text-5xl">
            Understand Your Campus Carbon Impact
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#cbd5e1]">
            Carboniq helps institutions measure emissions, analyze environmental impact,
            and take practical steps toward sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
