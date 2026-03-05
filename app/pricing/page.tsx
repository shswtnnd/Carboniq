"use client";

import Navbar from "@/components/Navbar";
import { Button, Card, CardBody } from "@heroui/react";
import MinimalAmbientBackground from "@/components/ui/minimal-ambient-background";

const plans = [
  {
    name: "Starter",
    price: "$99/mo",
    summary: "Best for pilot sustainability teams",
    bullets: ["Up to 5 buildings", "Monthly reporting", "Email support"],
  },
  {
    name: "Campus",
    price: "$299/mo",
    summary: "For multi-building institutions",
    bullets: ["Up to 30 buildings", "Advanced analytics", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    summary: "For large systems and districts",
    bullets: ["Unlimited buildings", "Custom integrations", "Dedicated success manager"],
  },
];

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-[#E5E7EB]">
      <MinimalAmbientBackground />
      <Navbar />
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold tracking-tight md:text-5xl">
          Pricing
        </h1>
        <p className="mt-4 text-[#cbd5e1]">Flexible plans for every stage of your climate journey.</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <Card
              key={plan.name}
              className={`border bg-[#111827] ${
                idx === 1 ? "border-[#22C55E]" : "border-white/10"
              }`}
            >
              <CardBody className="space-y-5 p-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#E5E7EB]">{plan.name}</h2>
                  <p className="mt-2 text-3xl font-bold text-[#4ADE80]">{plan.price}</p>
                  <p className="mt-2 text-sm text-[#cbd5e1]">{plan.summary}</p>
                </div>
                <ul className="space-y-2 text-sm text-[#cbd5e1]">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet}>- {bullet}</li>
                  ))}
                </ul>
                <Button className="bg-[#22C55E] text-[#020617] font-semibold">Choose {plan.name}</Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
