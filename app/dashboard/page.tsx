"use client";

import DashboardCards from "@/components/DashboardCards";
import Charts from "@/components/Charts";
import Sidebar from "@/components/Sidebar";
import { demoData } from "@/data/demoData";
import { Avatar, Card, CardBody, Chip } from "@heroui/react";
import MinimalAmbientBackground from "@/components/ui/minimal-ambient-background";

const electricityShare = Math.round((demoData.sources[0].value / demoData.totalCO2) * 100);

const metrics = [
  {
    label: "Total CO Emissions",
    value: `${demoData.totalCO2.toLocaleString()} tCO2e`,
    trend: "-8.4% vs last year",
  },
  {
    label: "Scope 1 Emissions",
    value: `${demoData.scope1.toLocaleString()} tCO2e`,
    trend: "-5.2% vs last quarter",
  },
  {
    label: "Scope 2 Emissions",
    value: `${demoData.scope2.toLocaleString()} tCO2e`,
    trend: "-11.1% after efficiency upgrade",
  },
  {
    label: "Scope 3 Emissions",
    value: `${demoData.scope3.toLocaleString()} tCO2e`,
    trend: "-3.8% with transport changes",
  },
];

export default function DashboardPage() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#020617] text-[#E5E7EB]">
      <MinimalAmbientBackground className="opacity-45" />
      <Sidebar />

      <section className="relative z-10 w-full p-6 lg:p-10">
        <Card className="border border-white/10 bg-[#111827]">
          <CardBody className="flex flex-row items-center justify-between gap-4 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#94a3b8]">Institution</p>
              <h1 className="mt-1 text-2xl font-semibold text-[#E5E7EB]">{demoData.institution}</h1>
            </div>
            <Avatar name="Admin" className="bg-[#14532d] text-[#bbf7d0]" />
          </CardBody>
        </Card>

        <div className="mt-6">
          <DashboardCards metrics={metrics} />
        </div>

        <Card className="mt-6 border border-[#22C55E]/30 bg-[linear-gradient(135deg,#0f172a,#052e1f)]">
          <CardBody className="gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#86efac]">Key Insight</p>
              <h2 className="mt-2 text-2xl font-bold text-[#E5E7EB]">
                {electricityShare}% of emissions come from electricity usage
              </h2>
              <p className="mt-2 text-[#cbd5e1]">
                Recommendation: rooftop solar rollout across core buildings can reduce total
                campus emissions by around 28%.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip className="bg-[#14532d] text-[#bbf7d0]" variant="flat">
                Priority: Energy
              </Chip>
              <Chip className="bg-[#0f172a] text-[#86efac]" variant="flat">
                Potential Reduction: 28%
              </Chip>
            </div>
          </CardBody>
        </Card>

        <div className="mt-6">
          <Charts data={demoData} />
        </div>
      </section>
    </main>
  );
}
