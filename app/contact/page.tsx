"use client";

import Navbar from "@/components/Navbar";
import { Button, Card, CardBody, Input, Textarea } from "@heroui/react";
import MinimalAmbientBackground from "@/components/ui/minimal-ambient-background";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-[#E5E7EB]">
      <MinimalAmbientBackground />
      <Navbar />
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold tracking-tight md:text-5xl">
          Contact Carboniq
        </h1>
        <p className="mt-4 text-[#cbd5e1]">
          Tell us about your campus and sustainability goals. We will follow up shortly.
        </p>

        <Card className="mt-10 border border-white/10 bg-[#111827]">
          <CardBody className="space-y-5 p-6">
            <Input label="Name" placeholder="Your full name" variant="bordered" />
            <Input label="Email" placeholder="you@institution.edu" type="email" variant="bordered" />
            <Textarea
              label="Message"
              placeholder="Share your sustainability goals, reporting needs, or rollout timeline"
              minRows={5}
              variant="bordered"
            />
            <Button className="w-fit bg-[#22C55E] text-[#020617] font-semibold">Submit</Button>
          </CardBody>
        </Card>
      </section>
    </main>
  );
}
