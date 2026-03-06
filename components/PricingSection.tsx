"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

type PlanFeature = {
  label: string;
  comingSoon?: boolean;
};

type Plan = {
  title: string;
  price: string;
  frequency: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    title: "Basic plan",
    price: "INR 999",
    frequency: "/month",
    description: "Perfect for small schools and colleges beginning their sustainability journey.",
    features: [
      { label: "Carbon footprint calculator" },
      { label: "Manual activity data entry" },
      { label: "Scope 1, 2 & 3 emission tracking" },
      { label: "Basic sustainability insights" },
      { label: "Monthly emission summary" },
    ],
  },
  {
    title: "Pro plan",
    price: "INR 2,999",
    frequency: "/month",
    description: "Advanced analytics and reporting for growing institutions.",
    popular: true,
    features: [
      { label: "Everything in Basic" },
      { label: "Advanced emission analytics" },
      { label: "Department & building breakdown" },
      { label: "Automated sustainability reports" },
      { label: "Emission trend charts" },
      { label: "Priority support" },
    ],
  },
  {
    title: "Enterprise plan",
    price: "INR 9,999",
    frequency: "/month",
    description: "Designed for large universities and corporate campuses.",
    features: [
      { label: "Everything in Pro" },
      { label: "Multi-campus support" },
      { label: "Custom sustainability insights" },
      { label: "Advanced emission forecasting", comingSoon: true },
      { label: "Dedicated support" },
      { label: "Custom integrations" },
    ],
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const isPopular = Boolean(plan.popular);

  return (
    <motion.article
      className={`relative flex h-full flex-col overflow-hidden rounded-[22px] border backdrop-blur-xl ${
        isPopular
          ? "border-[#4c9c73]/70 bg-[linear-gradient(160deg,rgba(0,73,35,0.9),rgba(76,156,115,0.55))]"
          : "border-white/20 bg-[linear-gradient(160deg,rgba(16,22,34,0.9),rgba(10,14,22,0.8))]"
      }`}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="relative z-10 p-6 pb-4 text-center">
        <div className="mx-auto mb-4 w-fit rounded-full border border-white/20 bg-black/25 px-6 py-2">
          <p className="font-[family-name:var(--font-instrument-serif)] text-2xl italic text-[#96FF3A] md:text-3xl">
            {plan.title}
          </p>
        </div>

        <p className="font-[family-name:var(--font-space-grotesk)] text-4xl font-extrabold leading-none text-[#96FF3A] md:text-5xl">
          {plan.price}
          <span className="ml-2 text-xl font-medium text-white/90 md:text-2xl">{plan.frequency}</span>
        </p>
        <p className="mx-auto mt-4 max-w-xs text-base leading-relaxed text-white/90 md:text-lg">{plan.description}</p>
      </div>

      <div className="relative z-10 flex flex-1 flex-col border-t border-white/20 px-6 py-6">
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature.label} className="flex items-center gap-3 text-base text-[#eef9f3] md:text-lg">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#96FF3A]" />
              <span className="flex flex-wrap items-center gap-2">
                {feature.label}
                {feature.comingSoon ? (
                  <span className="rounded-full border border-[#96FF3A]/60 bg-[#96FF3A]/15 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#c8ff8f]">
                    Coming Soon
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>

        <Button
          as={Link}
          href="/auth?next=/dashboard"
          radius="sm"
          className="mt-auto h-14 w-full rounded-lg bg-[#96FF3A] font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-black transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0"
        >
          Get started
        </Button>
      </div>
    </motion.article>
  );
}

export default function PricingSection() {
  return (
    <motion.section
      id="pricing"
      className="relative overflow-hidden bg-transparent px-6 py-[110px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl font-extrabold tracking-tight text-white md:text-6xl">
            Simple Pricing for Every Campus
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-white/95 md:text-2xl">
            Choose the plan that fits your institution size and start measuring your campus carbon
            footprint today.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.title} plan={plan} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
