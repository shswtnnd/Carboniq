"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import MinimalAmbientBackground from "@/components/ui/minimal-ambient-background";

type Plan = {
  title: string;
  audience: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    title: "Basic Plan",
    audience: "Small colleges",
    price: "INR 999 / month",
    description:
      "Perfect for small schools and colleges beginning their sustainability journey.",
    features: [
      "Carbon footprint calculator",
      "Manual activity data entry",
      "Scope 1, 2 & 3 emission tracking",
      "Basic sustainability insights",
      "Monthly emission summary",
    ],
  },
  {
    title: "Pro Plan",
    audience: "Medium institutions",
    price: "INR 2,999 / month",
    description: "Advanced analytics and reporting for growing institutions.",
    popular: true,
    features: [
      "Everything in Basic",
      "Advanced emission analytics",
      "Department & building breakdown",
      "Automated sustainability reports",
      "Emission trend charts",
      "Priority support",
    ],
  },
  {
    title: "Enterprise Plan",
    audience: "Large universities",
    price: "INR 9,999 / month",
    description: "Designed for large universities and corporate campuses.",
    features: [
      "Everything in Pro",
      "Multi-campus support",
      "Custom sustainability insights",
      "Advanced emission forecasting",
      "Dedicated support",
      "Custom integrations",
    ],
  },
];

export default function PricingSection() {
  return (
    <motion.section
      id="pricing"
      className="relative overflow-hidden bg-[#020617] px-6 py-[120px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <MinimalAmbientBackground />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-extrabold tracking-tight text-[#E5E7EB] md:text-5xl">
            Simple Pricing for Every Campus
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#cbd5e1]">
            Choose the plan that fits your institution size and start measuring
            your campus carbon footprint today.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <motion.article
              key={plan.title}
              className={`group relative rounded-3xl border bg-[#020617] p-10 transition-all duration-300 will-change-transform hover:-translate-y-1.5 ${
                plan.popular
                  ? "border-[#22C55E]/55"
                  : "border-white/10 hover:border-white/20"
              }`}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-all duration-300 group-hover:border-[#4ADE80]/35" />
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-[0_20px_40px_rgba(34,197,94,0.15)]" />

              {plan.popular && (
                <span className="absolute -top-3 left-8 rounded-full border border-[#22C55E]/40 bg-[#052e1f] px-3 py-1 text-xs font-semibold text-[#86efac]">
                  Most Popular
                </span>
              )}

              <p className="text-sm font-semibold text-[#86efac]">{plan.audience}</p>
              <h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-[#E5E7EB]">
                {plan.title}
              </h3>
              <p className="mt-4 text-3xl font-extrabold text-[#E5E7EB]">{plan.price}</p>
              <p className="mt-4 min-h-16 text-sm leading-relaxed text-[#cbd5e1]">
                {plan.description}
              </p>

              <Button
                as={Link}
                href="/dashboard"
                radius="full"
                variant="bordered"
                className="mt-6 w-full rounded-full border border-[#22C55E]/60 text-base font-semibold text-[#86efac] transition-all duration-300 hover:bg-[#22C55E] hover:text-black"
              >
                Get Started Now
              </Button>

              <ul className="mt-7 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[#cbd5e1]">
                    <Check size={16} className="mt-0.5 shrink-0 text-[#4ADE80]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
