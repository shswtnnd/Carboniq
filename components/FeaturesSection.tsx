"use client";

import { motion } from "framer-motion";
import { Scale, Star, Zap } from "lucide-react";

type FeatureCardData = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  glowClass: string;
  ringClass: string;
};

const cards: FeatureCardData[] = [
  {
    title: "Measure Carbon Footprint",
    description: "Measure campus emissions with one clear baseline.",
    icon: Scale,
    glowClass: "from-[#7c3aed]/35 to-[#312e81]/20",
    ringClass: "border-[#8b5cf6]/55 shadow-[0_0_28px_rgba(124,58,237,0.45)]",
  },
  {
    title: "Identify Sources",
    description: "Spot top emission sources in seconds.",
    icon: Star,
    glowClass: "from-[#0ea5e9]/35 to-[#0f172a]/20",
    ringClass: "border-[#38bdf8]/55 shadow-[0_0_28px_rgba(56,189,248,0.42)]",
  },
  {
    title: "Get Recommendations",
    description: "Get practical next steps to reduce emissions.",
    icon: Zap,
    glowClass: "from-[#84cc16]/35 to-[#14532d]/20",
    ringClass: "border-[#84cc16]/55 shadow-[0_0_28px_rgba(132,204,22,0.42)]",
  },
];

function NeonFeatureCard({ card }: { card: FeatureCardData }) {
  const Icon = card.icon;

  return (
    <motion.article
      className={`group relative overflow-hidden rounded-[28px] border bg-[#040812]/78 p-7 backdrop-blur-xl transition-all duration-300 ${card.ringClass}`}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${card.glowClass}`} />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 flex min-h-[290px] flex-col justify-between">
        <div className="mx-auto mt-2 flex h-28 w-28 items-center justify-center rounded-[28px] border border-white/15 bg-black/35 shadow-inner">
          <Icon className="h-12 w-12 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
        </div>

        <div className="pt-8 text-center">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-[42px] font-semibold leading-none tracking-tight text-white">
            {card.title.split(" ").slice(0, 1)}
          </h3>
          <h4 className="mt-1 font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold leading-none tracking-tight text-white">
            {card.title.split(" ").slice(1).join(" ")}
          </h4>
          <p className="mt-3 text-lg text-white/75">{card.description}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturesSection() {
  return (
    <motion.section
      id="features"
      className="relative overflow-hidden bg-transparent px-6 py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl font-extrabold tracking-tight text-white">
            Campus Features That Actually Help
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/85">
            focused tools to measure, identify, and improve your institution&apos;s carbon outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card) => (
            <NeonFeatureCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
