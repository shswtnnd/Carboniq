"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import HashScrollLink from "@/components/HashScrollLink";

export default function Hero() {
  const words = [
    { label: "Measure.", delay: 0 },
    { label: "Understand.", delay: 0.15 },
    { label: "Reduce.", delay: 0.3, green: true },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.16),transparent_38%),linear-gradient(to_bottom,rgba(2,6,23,0.42),rgba(2,6,23,0.64))]" />

      <div className="absolute inset-0 z-20 mx-auto flex h-full max-w-7xl items-center justify-center px-6">
        <div className="w-full max-w-4xl space-y-8 text-center">
          <p className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-[#020617]/65 px-5 py-2 text-sm font-semibold text-[#cbd5e1] backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E]/70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
            </span>
            Carbon Intelligence for Campuses
          </p>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-6xl font-extrabold leading-[0.9] tracking-tight text-[#E5E7EB] md:text-7xl xl:text-8xl">
            {words.map((word) => (
              <motion.span
                key={word.label}
                className={`block ${word.green ? "text-[#22C55E] drop-shadow-[0_0_18px_rgba(34,197,94,0.32)]" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: word.delay }}
              >
                {word.label}
              </motion.span>
            ))}
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#d1d5db] md:text-xl">
            Carbon intelligence for campuses and institutions. Track emissions
            across your infrastructure, uncover insights, and take action toward
            sustainability.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              as={Link}
              href="/auth?next=/dashboard"
              radius="full"
              className="group inline-flex h-14 min-w-[220px] items-center justify-center gap-2 rounded-full bg-[#B6FF00] px-8 text-base font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:brightness-95 active:scale-[0.98]"
            >
              <ArrowRight size={20} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
              Get Started Now
            </Button>
            <HashScrollLink href="/#pricing">
              <Button
                radius="full"
                className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-full border border-white/25 bg-white/90 px-8 text-base font-semibold leading-none tracking-tight text-[#0f172a] shadow-[0_10px_30px_rgba(2,6,23,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_40px_rgba(2,6,23,0.35)] active:translate-y-0"
              >
                See Pricing
              </Button>
            </HashScrollLink>
          </div>
        </div>
      </div>
    </section>
  );
}
